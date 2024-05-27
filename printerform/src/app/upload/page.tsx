"use client";

import { ChangeEvent, RefObject, useRef, useState } from "react";
import { ModelRef, StlViewer } from "../stl-viewer-src";
import { ColorResult, SwatchesPicker } from "react-color";

type AxisType = "x" | "y" | "z"

type AxisRotationSelectorProps = {
    axis: AxisType,
    modelRef: RefObject<ModelRef>
}

const AxisRotationSelector = ({ axis, modelRef }: AxisRotationSelectorProps) => {
    const handleAxisRotationChange = (e: ChangeEvent<HTMLInputElement>) => {
        const multiplier = (parseFloat(e.currentTarget.value) - 50) / 50;
        const rotation = multiplier * (Math.PI / 2);

        if (!modelRef.current) return;
        const { model } = modelRef.current;

        model.rotation[axis] = rotation;
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

    return (
        <div className="min-h-screen w-full bg-emerald-700 flex flex-col  justify-center p-5">
            <input ref={fileInputRef} type="file" id="fileInput" onChange={onFileSelect} placeholder="Upload" accept=".stl" />
            <p>File Name: {displayedFileName}</p>
            <div className="flex flex-col lg:flex-row w-full gap-x-5 bg-orange-800">
                <div className="relative grow bg-blue-700 min-h-[60vh]">
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
                            objectRespectsFloor={false}
                            orbitControls
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
                            axis="x"
                            modelRef={modelRef}
                        />
                        <AxisRotationSelector
                            axis="y"
                            modelRef={modelRef}
                        />
                        <AxisRotationSelector
                            axis="z"
                            modelRef={modelRef}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Upload;