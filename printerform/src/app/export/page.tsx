'use client';
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { CameraPosition } from "../stl-viewer-src/StlViewer/SceneElements/Camera";
import { ModelDimensions } from "../stl-viewer-src";
import { string } from "three/examples/jsm/nodes/Nodes.js";
import { jsPDF } from 'jspdf';
import curvedBackgroundImage from './CURVED_FORM_TEMPLATE.jpg';

type ModelInfo = {
    modelUrl: string,
    modelColor: string,
};

const EPS = 0.01;

function clamp(min: number, value: number, max: number): number {
    return Math.max(Math.min(value, max), min);
}

// export function polarToCartesian(polar: CameraPosition): [number, number, number] {
//     const latitude = clamp(-Math.PI / 2 + EPS, polar.latitude, Math.PI / 2 - EPS);
//     const longitude = clamp(-Math.PI + EPS, polar.longitude, Math.PI - EPS);

//     return [
//         polar.distance * Math.cos(latitude) * Math.sin(longitude),
//         -polar.distance * Math.cos(longitude) * Math.cos(latitude),
//         polar.distance * Math.sin(latitude)
//     ];
// }

type SphericalCoordinate = {
    radius: number,
    phi: number,
    theta: number;
};

function sphericalToCartesian(spherical: SphericalCoordinate): [number, number, number] {
    const phi = clamp(0, spherical.phi, Math.PI / 2);
    const theta = clamp(0, spherical.theta, 2 * Math.PI);

    // return [
    //     spherical.radius * Math.sin(phi) * Math.cos(theta),
    //     spherical.radius * Math.sin(phi) * Math.sin(theta),
    //     spherical.radius * Math.cos(phi)
    // ];
    return [
        spherical.radius * Math.sin(theta),
        spherical.radius * Math.cos(theta),
        0
    ];
}

enum ProjectionKind {
    REVOLVED,
    FOUR_SIDED_CUBE,
    SIX_SIDED_CUBE,
    CURVED
}

class PrintableFactory {
    private modelInfo: ModelInfo;
    private modelDimensions: ModelDimensions;
    private scene: THREE.Scene;
    private camera: THREE.Camera;
    private renderer: THREE.WebGLRenderer;

    constructor(modelInfo: ModelInfo) {
        this.modelInfo = modelInfo;
        this.modelDimensions = { width: 0, length: 0, height: 0, boundingRadius: 0 };

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight);
        this.renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
    }

    public async initializeRenderEnvironment() {
        this.modelDimensions = await this.loadModel();

        this.createLights(350, this.cameraOffsetsFromModelDimensions(this.modelDimensions));
        this.configureCamera(this.modelDimensions);

        this.configureRenderer(null);

        this.renderer.render(this.scene, this.camera);
    }

    private appropriateCameraDistance(modelDimensions: ModelDimensions): number {
        return Math.max(modelDimensions.height, modelDimensions.length, modelDimensions.width);
    }

    public producePrintable(projectionKind: ProjectionKind, loadingCallback: (percentComplete: number) => any, onComplete: () => any) {
        switch (projectionKind) {
            case ProjectionKind.REVOLVED:
                this.produceRevolvedPrintable(loadingCallback, onComplete);
                return;
            case ProjectionKind.FOUR_SIDED_CUBE:
                this.produceCubedPrintable(loadingCallback, onComplete);
                return;
            case ProjectionKind.SIX_SIDED_CUBE:
                this.produceRevolvedPrintable(loadingCallback, onComplete);
                return;
            case ProjectionKind.CURVED:
                this.produceCurvedPrintable(loadingCallback, onComplete);
                return;
            default:
                throw new Error(`Invalid projection kind provided: ${projectionKind}. Available options are ${Object.keys(ProjectionKind)}`);

        }
    }

    public produceRevolvedPrintable(loadingCallback: (percentComplete: number) => any, onComplete: () => any) {
        // FIXME: The black streak problem goes away when there is one pixel being sampled per slice. I wonder what could be causing the streaking with smaller NUM_SLICES values.
        const NUM_SLICES = this.renderer.domElement.width;

        const outputCanvas = document.createElement('canvas');
        // REPLACE THIS WITH HARD CODED CONSTANT VALUES FOR BOTH CANVASES
        outputCanvas.width = this.renderer.domElement.width;
        outputCanvas.height = this.renderer.domElement.height;

        const outputContext = outputCanvas.getContext('2d');

        if (outputContext === null) {
            return;
        }

        const MAX_TIME_PER_CHUNK = 10;
        let index = 0;

        const doChunk = () => {
            const startTime = new Date().getTime();
            while (index < NUM_SLICES && (new Date().getTime() - startTime <= MAX_TIME_PER_CHUNK)) {
                const sliceWidth = this.renderer.domElement.width / NUM_SLICES;
                const sampleHorizontalOffset = this.renderer.domElement.width / 2 - sliceWidth / 2;
                const sliceHeight = this.renderer.domElement.height;

                this.positionCamera(this.camera, this.modelDimensions, { phi: Math.PI / 2, theta: index * (2 * Math.PI) / NUM_SLICES, radius: this.appropriateCameraDistance(this.modelDimensions) });
                // this.positionCamera(this.camera, this.modelDimensions, { phi: Math.PI / 2, theta: -Math.PI + i * Math.PI / NUM_SLICES, radius: this.appropriateCameraDistance(this.modelDimensions) });
                // this.positionCamera(this.camera, this.modelDimensions, { latitude: 0, longitude: -Math.PI + i * Math.PI / NUM_SLICES, distance: this.appropriateCameraDistance(this.modelDimensions) });

                this.scene.background = new THREE.Color(0xffffff);
                this.scene.background.setHex(Math.random() * 0xffffff);
                this.renderer.render(this.scene, this.camera);

                const rendererContext = this.renderer.domElement.getContext('webgl2');
                if (rendererContext === null) {
                    return;
                }

                const slice = new Uint8Array(sliceWidth * sliceHeight * 4);
                rendererContext.readPixels(sampleHorizontalOffset, 0, sliceWidth, sliceHeight, rendererContext.RGBA, rendererContext.UNSIGNED_BYTE, slice);

                const sliceData = new ImageData(sliceWidth, sliceHeight);

                slice.forEach((pixelValue, i) => sliceData.data[i] = pixelValue);

                outputContext.putImageData(sliceData, index * sliceWidth, 0);

                loadingCallback((index + 1) / NUM_SLICES);

                ++index;
            }

            if (index === NUM_SLICES) {
                onComplete();
            }

            if (index < NUM_SLICES) {
                setTimeout(doChunk, 1);
            }
        };

        doChunk();

        document.body.appendChild(outputCanvas);
    }

    //xinyu 4 side cube
    public produceCubedPrintable(loadingCallback: (percentComplete: number) => any, onComplete: () => any) {
        const NUM_VIEWS = 4; // Front, left, back, right
    
        const A4_WIDTH_MM = 297; // A4 paper width in mm (landscape)
        const A4_HEIGHT_MM = 210; // A4 paper height in mm (landscape)
        const MM_TO_PX = 3.7795275591; // Conversion from mm to pixels (72 DPI)
    
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4'
        });
    
        // Calculate A4 paper size in pixels
        const A4_WIDTH_PX = Math.floor(A4_WIDTH_MM * MM_TO_PX);
        const A4_HEIGHT_PX = Math.floor(A4_HEIGHT_MM * MM_TO_PX);
    
        // Set the canvas size to A4 dimensions in pixels
        const outputCanvas = document.createElement('canvas');
        outputCanvas.width = A4_WIDTH_PX;
        outputCanvas.height = A4_HEIGHT_PX;
        
        const outputContext = outputCanvas.getContext('2d');
        if (outputContext === null) {
            return;
        }
    
        const MAX_TIME_PER_CHUNK = 10;
        let index = 0;
    
        // Define camera angles for front, left, back, and right views (90-degree increments)
        const cameraAngles = [
            0,               // Front (theta = 0)
            Math.PI / 2,     // Left (theta = 90 degrees)
            Math.PI,         // Back (theta = 180 degrees)
            3 * Math.PI / 2  // Right (theta = 270 degrees)
        ];
    
        const doChunk = () => {
            const startTime = new Date().getTime();
            while (index < NUM_VIEWS && (new Date().getTime() - startTime <= MAX_TIME_PER_CHUNK)) {
                const viewWidth = this.renderer.domElement.width;
                const viewHeight = this.renderer.domElement.height;
    
                // Position camera at each of the 4 angles
                this.positionCamera(this.camera, this.modelDimensions, {
                    phi: Math.PI / 2,  // Keep phi fixed at 90 degrees (horizontal plane)
                    theta: cameraAngles[index],  // Use specific theta values for front, left, back, right
                    radius: this.appropriateCameraDistance(this.modelDimensions)
                });
    
                this.renderer.render(this.scene, this.camera);
    
                const rendererContext = this.renderer.domElement.getContext('webgl2');
                if (rendererContext === null) {
                    return;
                }
    
                // Determine the largest square that can be cropped from the center of the view
                const squareSize = Math.min(viewWidth, viewHeight);
                const xOffset = (viewWidth - squareSize) / 2; // Crop equally from both sides (horizontal)
                const yOffset = (viewHeight - squareSize) / 2; // Crop equally from top and bottom (vertical)
    
                const squareSlice = new Uint8Array(squareSize * squareSize * 4);
                rendererContext.readPixels(xOffset, yOffset, squareSize, squareSize, rendererContext.RGBA, rendererContext.UNSIGNED_BYTE, squareSlice);
    
                const sliceData = new ImageData(squareSize, squareSize);
                squareSlice.forEach((pixelValue, i) => sliceData.data[i] = pixelValue);
    
                // Create a temporary canvas to hold the square slice
                const tempCanvas = document.createElement('canvas');
                tempCanvas.width = squareSize;
                tempCanvas.height = squareSize;
                const tempContext = tempCanvas.getContext('2d');
                tempContext.putImageData(sliceData, 0, 0);
    
                // Calculate size and positioning for the 1x4 grid layout
                const gridCols = 4;
                const cellWidth = A4_WIDTH_PX / gridCols;   // Width of each cell in the grid (1 row, 4 columns)
                const cellHeight = A4_HEIGHT_PX;            // Full height of the canvas for each image
    
                // Calculate scaling factor to fit the square within the grid cell
                const scaleFactor = Math.min(cellWidth / squareSize, cellHeight / squareSize);
                const scaledWidth = squareSize * scaleFactor;
                const scaledHeight = squareSize * scaleFactor;
    
                // Calculate position to center the image within its grid cell
                const col = index % gridCols;               // Which column the image will go in
                const xPos = col * cellWidth + (cellWidth - scaledWidth) / 2; // Center horizontally
                const yPos = (A4_HEIGHT_PX - scaledHeight);               // Center vertically
    
                // Draw the scaled image on the output canvas
                outputContext.drawImage(tempCanvas, 0, 0, squareSize, squareSize, xPos, yPos, scaledWidth, scaledHeight);
    
                loadingCallback((index + 1) / NUM_VIEWS); // Update progress
                ++index;
            }
    
            if (index === NUM_VIEWS) {
                // Once all 4 images are drawn on the same canvas, add it to the PDF
                const canvasDataUrl = outputCanvas.toDataURL('image/png');
                pdf.addImage(canvasDataUrl, 'PNG', 0, 0, A4_WIDTH_MM, A4_HEIGHT_MM);
    
                // Save the PDF after adding the page
                pdf.save('cubed_printable.pdf');
                onComplete();
            }
    
            if (index < NUM_VIEWS) {
                setTimeout(doChunk, 1);
            }
        };
    
        doChunk();
    }
    
    public produceCurvedPrintable(loadingCallback: (percentComplete: number) => any, onComplete: () => any) {
        const img = new Image();
        img.src = curvedBackgroundImage.src;
    
        img.onload = () => {
          const canvasWidth = img.width;
          const canvasHeight = img.height;
    
          const outputCanvas = document.createElement('canvas');
          outputCanvas.width = canvasWidth;
          outputCanvas.height = canvasHeight;
    
          const outputContext = outputCanvas.getContext('2d');
          if (outputContext === null) return;
    
          outputContext.drawImage(img, 0, 0, canvasWidth, canvasHeight);
    
          const renderSide = (cameraAngle: number, flipHorizontally: boolean, flipVertically: boolean, offsetY: number, scale: number
          ) => {
            this.positionCamera(this.camera, this.modelDimensions, {phi: Math.PI / 2, theta: cameraAngle, radius: this.appropriateCameraDistance(this.modelDimensions)
            });
    
            // Color of WebGL context should be transparent on the template
            const rendererContext = this.renderer.domElement.getContext('webgl2');
            if (rendererContext !== null) {
              rendererContext.clearColor(0, 0, 0, 0);
              rendererContext.clear(rendererContext.COLOR_BUFFER_BIT);
            }
            this.renderer.render(this.scene, this.camera);
    
            if (rendererContext) {
              const pixels = new Uint8Array(canvasWidth * canvasHeight * 4);
              rendererContext.readPixels(0, 0, canvasWidth, canvasHeight, rendererContext.RGBA, rendererContext.UNSIGNED_BYTE, pixels);
              const imageData = new ImageData(new Uint8ClampedArray(pixels), canvasWidth, canvasHeight);
  
              const tempCanvas = document.createElement('canvas');
              tempCanvas.width = canvasWidth;
              tempCanvas.height = canvasHeight;
              const tempContext = tempCanvas.getContext('2d');
              if (tempContext === null) return;
    
              tempContext.putImageData(imageData, 0, 0);
              outputContext.save();
    
              // transformations for flipping horizontally and vertically
              if (flipHorizontally) {
                outputContext.translate(canvasWidth, 0);
                outputContext.scale(-1, 1);
              }
              if (flipVertically) {
                outputContext.translate(0, canvasHeight);
                outputContext.scale(1, -1);
              }
              const modelWidth = canvasWidth * scale;
              const modelHeight = (canvasHeight / 2) * scale;
    
              outputContext.drawImage(tempCanvas, 0, 0, canvasWidth, canvasHeight / 2, (canvasWidth - modelWidth) / 2, offsetY, modelWidth, modelHeight);
  
              outputContext.restore();
            } else {
              console.error("Renderer context is null. Couldn't read pixels.");
            }
          };
    
          // top model
          renderSide(0, true, false, -50, 1);
    
          // bottom model
          renderSide(Math.PI, false, true, (canvasHeight / 2) - 1500, 0.85);
    
          // generating PDF
          const pdf = new jsPDF({orientation: 'portrait', unit: 'px', format: [canvasWidth, canvasHeight], putOnlyUsedFonts: true, floatPrecision: 16});
    
          const imgData = outputCanvas.toDataURL('image/png');
          pdf.addImage(imgData, 'PNG', 0, 0, canvasWidth, canvasHeight);
          pdf.save('curved.pdf');
    
          onComplete();
          document.body.appendChild(outputCanvas);
        };
    
        img.onerror = (error) => {
          console.error('Error loading image:', error);
        };
  }

    private positionCamera(camera: THREE.Camera, modelDimensions: ModelDimensions, position: SphericalCoordinate) {
        // const center = [modelDimensions.width / 2, modelDimensions.length / 2, 0];
        const center = [0, 0, 0];
        const coords = sphericalToCartesian(position);

        // console.log('camera pos', coords[0] + center[0], coords[1] + center[1], coords[2] + center[2]);

        // camera.position.set(coords[0], coords[1], coords[2]);
        camera.position.set(coords[0] + center[0], coords[1] + center[1], coords[2] + center[2]);

        // FIXME TODO THIS WAS THE GODDAMN FIX WHAT IN THE HELL OMG ITS BECAUSE THE 'center' IS NOT ACTUALLY THE DAMN CENTER ITS LITERALLY JUST THE ORIGIN
        camera.lookAt(center[0], center[1], center[2]);
    }

    private configureCamera(modelDimensions: ModelDimensions) {
        this.camera.up.applyAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2);

        // this.positionCamera(this.camera, modelDimensions, {
        //     latitude: 0,
        //     longitude: 0,
        //     distance: modelDimensions.boundingRadius
        // });
        this.positionCamera(this.camera, modelDimensions, { phi: Math.PI / 2, theta: -Math.PI, radius: this.appropriateCameraDistance(modelDimensions) });

        // this.positionCamera(this.camera, modelDimensions, { latitude: 0, longitude: -Math.PI, distance: this.appropriateCameraDistance(this.modelDimensions) });
    }

    private cameraOffsetsFromModelDimensions(modelDimensions: ModelDimensions): [number, number, number] {
        const SCALE = 1;

        return [
            (modelDimensions.width * SCALE) / 2,
            (modelDimensions.length * SCALE) / 2,
            0
        ];
    }

    private configureRenderer(animationLoopCallback: XRFrameRequestCallback | null) {
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setAnimationLoop(animationLoopCallback);
        this.renderer.shadowMap.enabled = true;
    }

    private createLights(distance: number, offsetXYZ: [number, number, number]) {
        const [offsetX, offsetY, offsetZ] = offsetXYZ;
        [
            [-distance + offsetX, offsetY, distance + offsetZ],
            [offsetX, -distance + offsetY, distance + offsetZ],
            [offsetX, distance + offsetY, offsetZ]
        ].map((position) => {
            const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
            directionalLight.position.set(position[0], position[1], position[2]);

            this.scene.add(directionalLight);
        });

        this.scene.add(new THREE.AmbientLight());

        const spotLight = new THREE.SpotLight();
        spotLight.position.set(offsetX, offsetY, distance + offsetZ);
        this.scene.add(new THREE.SpotLight());
    }

    private async loadModel(): Promise<ModelDimensions> {
        const loader = new STLLoader();

        const bufferGeometry = await loader.loadAsync(this.modelInfo.modelUrl);

        const material = new THREE.MeshStandardMaterial({ color: this.modelInfo.modelColor, side: 2 });
        const mesh = new THREE.Mesh(bufferGeometry, material);

        mesh.castShadow = true;
        mesh.receiveShadow = true;

        this.scene.add(mesh);

        return this.getModelDimensions(mesh, bufferGeometry);
    }

    private getModelDimensions(mesh: THREE.Mesh, geometry: THREE.BufferGeometry): ModelDimensions {
        new THREE.Box3().setFromObject(mesh); // this appears to set the correct property on geometry.boundingBox
        const { min, max } = geometry.boundingBox ?? { min: { x: 0, y: 0, z: 0 }, max: { x: 0, y: 0, z: 0 } };
        geometry.computeVertexNormals();
        geometry.computeBoundingSphere();
        const dims = {
            width: max.x - min.x,
            length: max.y - min.y,
            height: max.z - min.z
        };
        geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(
            -min.x - dims.width / 2,
            -min.y - dims.length / 2,
            -min.z - dims.height / 2
        ));

        return { ...dims, boundingRadius: geometry.boundingSphere!.radius };
    }
}

type ProjectionSelection = {
    key: ProjectionKind;
    previewThumbnailImgSrc: string;
    projectionTitle: string;
    projectionDescription: string;
};

const ALL_PROJECTIONS: ProjectionSelection[] = [
    {
        key: ProjectionKind.REVOLVED,
        previewThumbnailImgSrc: "https://picsum.photos/500",
        projectionDescription: "Best for objects with cylindrical symmetry",
        projectionTitle: "Revolved Projection"
    },
    {
        key: ProjectionKind.FOUR_SIDED_CUBE,
        previewThumbnailImgSrc: "https://picsum.photos/500",
        projectionDescription: "Suits a variety of geometries well",
        projectionTitle: "Four Sided Cube Projection"
    },
    {
        key: ProjectionKind.SIX_SIDED_CUBE,
        previewThumbnailImgSrc: "https://picsum.photos/500",
        projectionDescription: "Suits a variety of geometries well",
        projectionTitle: "Six Sided Cube Projection"
    },
    {
      key: ProjectionKind.CURVED,
      previewThumbnailImgSrc: "https://picsum.photos/500",
      projectionDescription: "Front and back of the model printed in a curved form",
      projectionTitle: "Curved Volume Form"
  } 

];

const Export = () => {
    const searchParams = useSearchParams();
    const [projectionSelections, setProjectionSelections] = useState<ProjectionSelection[]>([]);
    const [projectionLoadingInfo, setProjectionLoadingInfo] = useState<{ remainingProjections: number, numTotalQueuedProjections: number; }>({ remainingProjections: 0, numTotalQueuedProjections: 0 });
    // const [isLoading, setIsLoading] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const loadingBarRef = useRef<HTMLDivElement>(null);

    const runQueuedProjections = (printableFactory: PrintableFactory, queuedProjections: ProjectionSelection[]) => {
        const projectionSelection = queuedProjections[0];

        printableFactory.producePrintable(projectionSelection.key, (percentComplete) => {
            if (!loadingBarRef.current) {
                return;
            }

            setLoadingProgress(percentComplete * 100);
        }, () => {
            const shrunkProjectionQueue = [...queuedProjections.slice(1)];
            setProjectionLoadingInfo(old => ({ ...old, remainingProjections: shrunkProjectionQueue.length }));

            setLoadingProgress(0);

            if (shrunkProjectionQueue.length > 0) {
                runQueuedProjections(printableFactory, shrunkProjectionQueue);
            }
        }
        );
    };

    const handleProjectionDownload = async () => {
        const selectedProjections = projectionSelections;
        setProjectionLoadingInfo({ remainingProjections: projectionSelections.length, numTotalQueuedProjections: projectionSelections.length });
        setProjectionSelections([]);

        const modelUrl = searchParams.get('modelUrl');
        if (modelUrl === null) return;
        const modelColor = searchParams.get('modelColor') ?? "#dedede";

        const printableFactory = new PrintableFactory({ modelUrl: modelUrl, modelColor: modelColor });

        await printableFactory.initializeRenderEnvironment();

        runQueuedProjections(printableFactory, selectedProjections);
    };

    const isLoading = loadingProgress > 0;

    return (
        <div
            className="flex flex-col h-screen w-full "
        >
            <div className="bg-[#1e1e1e] h-full overflow-auto">
                <div className="flex flex-row items-center sticky h-16 top-0 bg-[#1e1e1e]">
                    <div className="px-8 w-full">
                        <h1 className="font-bold text-3xl">Select Model Projection(s)</h1>
                    </div>

                    <button type="button" className=" bg-[#2c2c2c] px-4 h-full">
                        Return to Editor (inop)
                    </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pl-8 pr-8 pb-8">
                    {ALL_PROJECTIONS.map((projectionSelection) => {
                        return (
                            <div
                                className={`rounded-md overflow-hidden ${projectionSelections.find(selection => selection.key === projectionSelection.key) ? 'border-blue-600' : 'border-[#2c2c2c] hover:border-blue-300'} transition duration-200 border-2 h-96`}
                                onClick={() => {
                                    if (projectionSelections.find(selection => selection.key === projectionSelection.key)) {
                                        setProjectionSelections(projectionSelections.filter(selection => selection.key !== projectionSelection.key));
                                    } else {
                                        setProjectionSelections(old => [...old, projectionSelection]);
                                    }
                                }}
                            >
                                <img src={projectionSelection.previewThumbnailImgSrc} className="h-52 w-full" />

                                <div className="w-full h-full bg-[#222222] p-4 flex flex-col gap-y-2">
                                    <h2 className="text-xl font-bold">{projectionSelection.projectionTitle}</h2>
                                    <p>{projectionSelection.projectionDescription}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <div>
                <div className={`h-2 w-full ${!isLoading && 'bg-[#1e1e1e]'}`}>
                    <div className={`relative h-full overflow-hidden bg-[#222222]`}>
                        <div id="progress-bar" ref={loadingBarRef} className="h-full bg-blue-500 transition-all duration-200" style={{ width: `${loadingProgress}%` }} />
                    </div>
                </div>

                <div className="bg-[#2c2c2c] px-5 py-3 flex flex-row justify-between items-center">
                    {projectionLoadingInfo.remainingProjections === 0 ? (
                        <p className="text-xl"><span className={`font-bold transition duration-200 ${projectionSelections.length === 0 ? 'text-red-600' : 'text-blue-500'}`}>{projectionSelections.length}</span> Projections Selected</p>
                    ) : (
                        <div className="flex flex-row items-center gap-x-4">
                            <p className="text-xl">Producing Projection Printable {projectionLoadingInfo.numTotalQueuedProjections - projectionLoadingInfo.remainingProjections + 1}/{projectionLoadingInfo.numTotalQueuedProjections}</p>
                            <p>|</p>
                            <p className="font-bold text-2xl text-blue-400">{Math.round(loadingProgress)}%</p>
                        </div>
                    )}
                    <button
                        type="button"
                        className={`${projectionSelections.length === 0 || isLoading ? "bg-gray-300 text-gray-500 cursor-not-allowed" : "bg-blue-500"} transition duration-200 rounded-md p-5`}
                        onClick={projectionSelections.length === 0 || isLoading ? undefined : handleProjectionDownload}
                    >
                        Download Projections
                    </button>
                </div>
            </div>
        </div >
    );
};
export default Export;;