"use client";

import { ChangeEvent, RefObject, useRef, useState } from "react";
import { ModelRef, StlViewer } from "react-stl-viewer";
import { ColorResult, SwatchesPicker } from "react-color";
import { Euler, Quaternion } from "three";

type AxisRotationSelectorProps = {
    axis: "X" | "Y" | "Z",
    modelRef: RefObject<ModelRef>,
    axisRotationToQuaternion: (rotation: number, modelQuaternion: Quaternion) => Quaternion
}

const AxisRotationSelector = ({ axis, modelRef, axisRotationToQuaternion }: AxisRotationSelectorProps) => {
    const handleAxisRotationChange = (e: ChangeEvent<HTMLInputElement>) => {
        const multiplier = (parseFloat(e.currentTarget.value) - 50) / 50;
        const rotation = multiplier * (Math.PI / 2);

        if (!modelRef.current) return;
        const { model } = modelRef.current;

        model.setRotationFromQuaternion(axisRotationToQuaternion(rotation, model.quaternion));
    };

    return (
        <div className="bg-orange-400 p-2 rounded-sm">
            <p>Rotation {axis}-Axis</p>
            <input type="range" className="w-full" onChange={handleAxisRotationChange} />
        </div>
    );
};

const Upload = () => {
    const [displayedFileName, setDisplayedFileName] = useState<string>();
    const [modelUrl, setModelUrl] = useState<string>();
    const [modelColor, setModelColor] = useState<string>("#D9D9D9");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [z, setZ] = useState(0);

    const stlLoadCurve = (file: File) => {
        setModelUrl(URL.createObjectURL(file))
    }

    const onFileSelect = () => {
        if (!fileInputRef.current) return;

        const { files, value } = fileInputRef.current;
        const file = (files ?? [])[0];
        const fileName = value.split(/(\\|\/)/g).pop();
        const parts = fileName?.split(".");

        if (parts?.length === 2) {
            const name = parts[0];
            setDisplayedFileName(`printerForm_${name}.pdf`)
        } else {
            console.error("Invalid file name format");
        }

        stlLoadCurve(file);
    };

    const handleModelColorChange = (color: ColorResult) => {
        setModelColor(color.hex);
    }

    const modelRef = useRef<ModelRef>(null);
    console.log("mult", new Quaternion(0.3826834, 0, 0, 0.9238795).multiply(new Quaternion(0, 0.3826834, 0, 0.9238795)))

    const rotationsToQuaternion = (xRotation: number, yRotation: number, zRotation: number): Quaternion => {
        const xQuaternion = new Quaternion(Math.sin(xRotation / 2), 0, 0, Math.cos(xRotation / 2));
        const yQuaternion = new Quaternion(0, Math.sin(yRotation / 2), 0, Math.cos(yRotation / 2));
        const zQuaternion = new Quaternion(0, 0, Math.sin(zRotation / 2), Math.cos(zRotation / 2));

        return xQuaternion.multiply(yQuaternion).multiply(zQuaternion).normalize();
    }

    const handleXAxisRotationChange = (e: ChangeEvent<HTMLInputElement>) => {
        const multiplier = (parseFloat(e.currentTarget.value) - 50) / 50;
        const rotation = multiplier * (Math.PI / 2);

        if (!modelRef.current) return;
        const { model } = modelRef.current;

        model.rotation.x = rotation;
        // model.setRotationFromQuaternion(rotationsToQuaternion(rotation, y, z));
    }

    const handleYAxisRotationChange = (e: ChangeEvent<HTMLInputElement>) => {
        const multiplier = (parseFloat(e.currentTarget.value) - 50) / 50;
        const rotation = multiplier * (Math.PI / 2);

        if (!modelRef.current) return;
        const { model } = modelRef.current;

        model.rotation.y = rotation;
    }

    const handleZAxisRotationChange = (e: ChangeEvent<HTMLInputElement>) => {
        const multiplier = (parseFloat(e.currentTarget.value) - 50) / 50;
        const rotation = multiplier * (Math.PI / 2);

        setZ(rotation);

        if (!modelRef.current) return;
        const { model } = modelRef.current;
        model.geometry.center();

        model.setRotationFromEuler(new Euler(x, y, rotation))
    }

    return (
        <div className="min-h-screen w-full bg-emerald-700 flex flex-col  justify-center p-5">
            <input ref={fileInputRef} type="file" id="fileInput" onChange={onFileSelect} placeholder="Upload" accept="*.*" />
            <p>File Name: {displayedFileName}</p>
            <div className="flex flex-col lg:flex-row w-full gap-x-5 bg-orange-800">
                <div className="relative grow bg-blue-700 min-h-[50vh]">
                    {modelUrl && (
                        <StlViewer
                            style={{
                                position: "absolute",
                                inset: "0",
                                backgroundColor: "beige"
                            }}
                            modelProps={{
                                ref: modelRef,
                                color: modelColor,
                            }}
                            orbitControls
                            // shadows
                            url={modelUrl}
                        />
                    )}
                </div>
                <div className="flex flex-col flex-shrink-0 gap-y-5">
                    <div className="bg-blue-400">
                        <p>Model Color:</p>
                        <SwatchesPicker
                            className="w-full"
                            color={modelColor}
                            onChange={handleModelColorChange}
                        />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <AxisRotationSelector
                            axis="X"
                            modelRef={modelRef}
                            axisRotationToQuaternion={(rotation, { y, z }) => new Quaternion(Math.sin(rotation / 2), y, z, Math.cos(rotation / 2))}
                        />
                        <AxisRotationSelector
                            axis="Y"
                            modelRef={modelRef}
                            axisRotationToQuaternion={(rotation, { x, z }) => new Quaternion(x, Math.sin(rotation / 2), z, Math.cos(rotation / 2))}
                        />
                        <AxisRotationSelector
                            axis="Z"
                            modelRef={modelRef}
                            axisRotationToQuaternion={(rotation, { x, y }) => new Quaternion(x, y, Math.sin(rotation / 2), Math.cos(rotation / 2))}
                        />
                        <div className="bg-green-400 p-2 rounded-sm">
                            <p>Rotation X-Axis</p>
                            <input type="range" className="w-full" onChange={handleXAxisRotationChange} />
                        </div>
                        <div className="bg-green-400 p-2 rounded-sm">
                            <p>Rotation Y-Axis</p>
                            <input type="range" className="w-full" onChange={handleYAxisRotationChange} />
                        </div>
                        <div className="bg-green-400 p-2 rounded-sm">
                            <p>Rotation Z-Axis</p>
                            <input type="range" className="w-full" onChange={handleZAxisRotationChange} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Upload;