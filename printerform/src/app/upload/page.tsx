"use client";

import { ChangeEvent, DragEvent, RefObject, useRef, useState } from "react";
import { ModelRef, StlViewer } from "../stl-viewer-src";
import { ChromePicker, ColorChangeHandler, ColorResult, SwatchesPicker } from "react-color";
import Link from "next/link";
import type { CameraRef } from "../stl-viewer-src";
import { ModalContainer, ModalProvider, PromptModal, useModals } from "../Modals";

type AxisType = "x" | "y" | "z";

type AxisRotationSelectorProps = {
    axis: AxisType,
    modelRefs: RefObject<ModelRef>[];
};

type DragDropFileUploadProps = {
    onFileSelect: (file: File) => void;
};

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
    };

    const handleFileDrag = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files && e.currentTarget.files[0]) {
            onFileSelect(e.currentTarget.files[0]);
        }
    };

    return (
        <label htmlFor="input-file-upload">
            <div
                className={`flex grow w-full h-full items-center justify-center cursor-pointer rounded-lg border-dashed border-4 transition duration-200 ${dragActive ? "bg-gray-200 border-blue-500" : "bg-gray-100 border-gray-500"}`}
                onDrop={handleFileDrop}
                onDragOver={handleFileDrag}
                onDragEnter={handleFileDrag}
                onDragLeave={handleFileDrag}
            >
                <input className="hidden" ref={fileInputRef} type="file" id="input-file-upload" onChange={handleFileInputChange} tabIndex={-1} accept=".stl" />
                <p className="text-black">Drag files here</p>
            </div>
        </label>
    );
};

const AxisRotationSelector = ({ axis, modelRefs }: AxisRotationSelectorProps) => {
    const handleAxisRotationChange = (e: ChangeEvent<HTMLInputElement>) => {
        const multiplier = (parseFloat(e.currentTarget.value) - 50) / 50;
        const ROTATION_RANGE = 2 * Math.PI;
        const rotation = multiplier * (ROTATION_RANGE / 2);

        for (const modelRef of modelRefs) {
            if (!modelRef.current) return;

            const { model } = modelRef.current;

            model.rotation[axis] = rotation;
        }
    };

    return (
        <div>
            <p>{axis.toUpperCase()}-Axis Rotation</p>
            <input type="range" className="w-full" onChange={handleAxisRotationChange} />
        </div>
    );
};

const Upload = () => {
    const [projectFilename, setProjectFilename] = useState<string>();
    const [modelUrl, setModelUrl] = useState<string>();
    const [previewModelUrl, setPreviewModelUrl] = useState<string>();
    const [modelColor, setModelColor] = useState("#8E2929");
    const [colorPickerOpen, setColorPickerOpen] = useState(false);

    const modals = useModals();

    const stlLoadCurve = (file: File) => {
        setModelUrl(URL.createObjectURL(file));
        setPreviewModelUrl(URL.createObjectURL(file));
    };

    const onFileSelect = (file: File) => {
        setProjectFilename(`printerForm-${file.name}.pdf`);
        stlLoadCurve(file);
    };

    const handleModelColorChange: ColorChangeHandler = (color: ColorResult, e) => {
        setModelColor(color.hex);
    };

    const handleReupload = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.currentTarget.files) return;

        onFileSelect(e.currentTarget.files[0]);
    };

    const modelRef = useRef<ModelRef>(null);
    const previewModelRef = useRef<ModelRef>(null);

    const cameraRef = useRef<CameraRef>(null);
    const previewCameraRef = useRef<CameraRef>(null);

    const reuploadInputRef = useRef<HTMLInputElement>(null);

    return (
        <>
            <ModalContainer />
            <div className="flex flex-col min-h-screen w-full" onClick={() => {
                setColorPickerOpen(false);
            }}>
                <div className="relative flex flex-row items-center justify-between bg-[#2c2c2c] h-12">
                    <Link className="flex h-full items-center justify-center bg-red-500 p-5" href="/">
                        Home
                    </Link>

                    <input
                        className="text-white text-center grow bg-transparent px-3 outline-none overflow-ellipsis pointer-events-auto"
                        type="text"
                        spellCheck={false}
                        value={projectFilename}
                        onFocus={(e) => e.currentTarget.select()}
                        onChange={(e) => {
                            const newFilename = e.currentTarget.value;
                            setProjectFilename(newFilename);
                        }}
                        onBlur={(e) => {
                            document.title = e.currentTarget.value;
                        }}
                    />

                    {modelUrl && (
                        <div className="flex flex-row h-full">
                            <button
                                className="flex h-full items-center justify-center p-5 bg-blue-900 cursor-pointer"
                                onClick={(e) => {
                                    e.preventDefault();

                                    modals.showModal(
                                        <PromptModal
                                            title="Model Reupload"
                                            bodyText="Are you sure you would like to reupload a new model?"
                                            onConfirm={() => {
                                                if (!reuploadInputRef.current) return;

                                                console.log('click');
                                                reuploadInputRef.current.click();
                                            }}
                                        />
                                    );
                                }}
                            >
                                Reupload
                            </button>

                            <input
                                className="hidden"
                                ref={reuploadInputRef}
                                type="file"
                                id="file-reupload-input"
                                accept=".stl"
                                onChange={handleReupload}
                            />

                            <button className="flex h-full items-center justify-center p-5 bg-blue-700 cursor-pointer">
                                Export
                            </button>
                        </div>
                    )}
                </div>

                <div className="grow bg-emerald-700 flex h-full flex-col justify-center">
                    {!modelUrl && <DragDropFileUpload onFileSelect={onFileSelect} />}

                    {modelUrl && (
                        <div className="relative flex grow flex-row w-full bg-[#2c2c2c]">
                            <div className="absolute bottom-4 left-4 z-30">
                                <div className="relative overflow-hidden border-gray-500 hover:border-blue-500 transition duration-100 rounded-xl border-2 w-80 h-48 shadow-xl">
                                    <StlViewer
                                        className="absolute inset-0 bg-[#444444]"
                                        modelProps={{
                                            ref: previewModelRef,
                                            color: modelColor,
                                        }}
                                        floorProps={{
                                            gridLength: 400,
                                            gridWidth: 100
                                        }}
                                        cameraProps={{
                                            ref: previewCameraRef
                                        }}
                                        shadows
                                        objectRespectsFloor={false}
                                        url={previewModelUrl as string}
                                    />
                                    <p className="absolute top-2 left-2">PRINCIPLE FRONT VIEW</p>
                                </div>
                            </div>
                            <div className="relative grow">
                                <StlViewer
                                    style={{
                                        position: "absolute",
                                        inset: "0",
                                        backgroundColor: "#1E1E1E"
                                    }}
                                    modelProps={{
                                        ref: modelRef,
                                        color: modelColor,
                                    }}
                                    floorProps={{
                                        gridLength: 400,
                                        gridWidth: 100
                                    }}
                                    cameraProps={{
                                        ref: cameraRef,
                                        onOrbitChange: () => {
                                            if (!cameraRef.current || !previewCameraRef.current) return;

                                            previewCameraRef.current.camera.copy(cameraRef.current.camera);
                                        }
                                    }}
                                    shadows
                                    objectRespectsFloor={false}
                                    orbitControls
                                    url={modelUrl}
                                />
                            </div>
                            <div className="flex flex-col flex-shrink-0 min-w-72">
                                <div className="divide-y divide-[#444444] border-y border-[#444444]">
                                    <div className="p-4 gap-y-4 flex flex-col">
                                        <p>Model Color:</p>
                                        <div className="relative flex flex-row items-center">
                                            <button
                                                className="w-14 h-6 rounded-sm"
                                                style={{ backgroundColor: modelColor }}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setColorPickerOpen(old => !old);
                                                    e.stopPropagation();
                                                }}
                                            />
                                            <input
                                                className="text-white grow bg-transparent pl-5 outline-none overflow-ellipsis pointer-events-auto"
                                                type="text"
                                                value={modelColor}
                                            />
                                            {colorPickerOpen && (
                                                <div
                                                    className="absolute top-0 left-0 w-0"
                                                    onClick={e => e.stopPropagation()}
                                                >
                                                    <ChromePicker
                                                        className="-translate-x-[calc(100%+1rem)]"
                                                        styles={{ default: { picker: { backgroundColor: "#2c2c2c", fontFamily: 'inherit' } } }}
                                                        color={modelColor}
                                                        onChange={handleModelColorChange}
                                                        disableAlpha
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex flex-col p-4 gap-y-2">
                                        <AxisRotationSelector
                                            axis="x"
                                            modelRefs={[modelRef, previewModelRef]}
                                        />
                                        <AxisRotationSelector
                                            axis="y"
                                            modelRefs={[modelRef, previewModelRef]}
                                        />
                                        <AxisRotationSelector
                                            axis="z"
                                            modelRefs={[modelRef, previewModelRef]}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default () => <ModalProvider><Upload /></ModalProvider>;