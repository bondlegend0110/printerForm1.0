'use client';
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { CameraPosition } from "../stl-viewer-src/StlViewer/SceneElements/Camera";
import { ModelDimensions } from "../stl-viewer-src";
import { string } from "three/examples/jsm/nodes/Nodes.js";

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

enum ProjectionKind {
    REVOLVED,
    FOUR_SIDED_CUBE,
    SIX_SIDED_CUBE
}

type ProjectionSelection = {
    key: ProjectionKind;
    previewThumbnailImgSrc: string;
    projectionTitle: string;
    projectionDescription: string;
    produceProjection: (factory: PrintableFactory, loadingCallback: (percentComplete: number) => any, onComplete: () => any) => any;
};

const ALL_PROJECTIONS: ProjectionSelection[] = [
    {
        key: ProjectionKind.REVOLVED,
        previewThumbnailImgSrc: "https://picsum.photos/500",
        produceProjection: (factory: PrintableFactory, loadingCallback: (percentComplete: number) => any, onComplete: () => any) => factory.produceRevolvedPrintable(loadingCallback, onComplete),
        projectionDescription: "Best for objects with cylindrical symmetry",
        projectionTitle: "Revolved Projection"
    },
    {
        key: ProjectionKind.FOUR_SIDED_CUBE,
        previewThumbnailImgSrc: "https://picsum.photos/500",
        produceProjection: (factory: PrintableFactory, loadingCallback: (percentComplete: number) => any, onComplete: () => any) => factory.produceRevolvedPrintable(loadingCallback, onComplete),
        projectionDescription: "Suits a variety of geometries well",
        projectionTitle: "Four Sided Cube Projection"
    },
    {
        key: ProjectionKind.SIX_SIDED_CUBE,
        previewThumbnailImgSrc: "https://picsum.photos/500",
        produceProjection: (factory: PrintableFactory, loadingCallback: (percentComplete: number) => any, onComplete: () => any) => factory.produceRevolvedPrintable(loadingCallback, onComplete),
        projectionDescription: "Suits a variety of geometries well",
        projectionTitle: "Six Sided Cube Projection"
    },
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

        projectionSelection.produceProjection(printableFactory, (percentComplete) => {
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
        });
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