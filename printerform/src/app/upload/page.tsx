"use client";

import { ChangeEvent, DragEvent, RefObject, useRef, useState } from "react";
import { ModelRef, StlViewer } from "../stl-viewer-src";
import { ColorResult, SwatchesPicker } from "react-color";

type AxisType = "x" | "y" | "z"

type AxisRotationSelectorProps = {
    axis: AxisType,
    modelRef: RefObject<ModelRef>
}

type DragDropFileUploadProps = {
    onFileSelect: (file: File) => void
}

const DragDropFileUpload = ({ onFileSelect }: DragDropFileUploadProps) => {
    const [dragActive, setDragActive] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            onFileSelect(e.dataTransfer.files[0]);
        }
    }

    const handleFileDrag = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }

    const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files && e.currentTarget.files[0]) {
            onFileSelect(e.currentTarget.files[0]);
        }
    }

    return (
        <label htmlFor="input-file-upload">
            <div
                className={`flex items-center justify-center min-h-[60vh] cursor-pointer rounded-lg border-dashed border-4 transition duration-200 ${dragActive ? "bg-gray-200 border-blue-500" : "bg-gray-100 border-gray-500"}`}
                onDrop={handleFileDrop}
                onDragOver={handleFileDrag}
                onDragEnter={handleFileDrag}
                onDragLeave={handleFileDrag}
            >
                <input className="hidden" ref={fileInputRef} type="file" id="input-file-upload" onChange={handleFileInputChange} tabIndex={-1} accept=".stl" />
                <p className="text-black">Drag files here</p>
            </div>
        </label>
    )
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
            <p>{axis.toUpperCase()}-Axis Rotation</p>
            <input type="range" className="w-full" onChange={handleAxisRotationChange} />
        </div>
    );
};

const Upload = () => {
    const [displayedFileName, setDisplayedFileName] = useState<string>();
    const [modelUrl, setModelUrl] = useState<string>();
    const [modelColor, setModelColor] = useState<string>("#D9D9D9");

    const stlLoadCurve = (file: File) => {
        setModelUrl(URL.createObjectURL(file))
    }

    const onFileSelect = (file: File) => {
        setDisplayedFileName(`printerForm-${file.name}.pdf`);
        stlLoadCurve(file);
    };

    const handleModelColorChange = (color: ColorResult) => {
        setModelColor(color.hex);
    }

    const modelRef = useRef<ModelRef>(null);

    return (
        <div className="min-h-screen w-full bg-emerald-700 flex flex-col  justify-center p-5 md:p-12 lg:p-24">
            <p>File Name: {displayedFileName}</p>
            {!modelUrl && <DragDropFileUpload onFileSelect={onFileSelect} />}

            {modelUrl && (
                <div className="flex flex-col lg:flex-row w-full gap-x-5 bg-orange-800">
                    <div className="relative grow bg-blue-700 min-h-[60vh]">
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
            )}
        </div>
    );
};

export default Upload;