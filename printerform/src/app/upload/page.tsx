"use client";

import { ChangeEvent, DragEvent, MutableRefObject, PropsWithChildren, PropsWithRef, RefObject, forwardRef, useCallback, useEffect, useRef, useState } from "react";
import { ModelRef, StlViewer } from "../stl-viewer-src";
import { ChromePicker, ColorChangeHandler, ColorResult } from "react-color";
import Link from "next/link";
import type { CameraRef } from "../stl-viewer-src";
import { ModalContainer, ModalProvider, PromptModal, useModals } from "../Modals";

type DragDropFileUploadProps = {
    onFileSelect: (file: File) => void;
    onlyAcceptDraggedFiles?: boolean;
    className?: string;
    dragActiveClassName?: string;
    dragInactiveClassName?: string;
};

const DragDropFileUpload = ({
    onFileSelect,
    className,
    onlyAcceptDraggedFiles,
    dragActiveClassName,
    dragInactiveClassName,
    children
}: PropsWithChildren<DragDropFileUploadProps>) => {
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
        <>
            <div
                className={`w-full h-full ${dragActive ? dragActiveClassName : dragInactiveClassName} ${className}`}
                onDragOver={handleFileDrag}
                onDragEnter={handleFileDrag}
                onDragLeave={handleFileDrag}
                onDrop={handleFileDrop}
                onClick={() => fileInputRef.current?.click()}
            >
                {children}
            </div>
            <input
                className="hidden"
                ref={fileInputRef}
                type="file"
                id="input-file-upload"
                onChange={handleFileInputChange}
                tabIndex={-1}
                accept=".stl"
                onClick={(e) => {
                    if (onlyAcceptDraggedFiles) {
                        e.preventDefault();
                    }
                }}
            />
        </ >
    );
};

type AxisType = "x" | "y" | "z";

type AxisRotationSelectorProps = {
    axis: AxisType;
    modelRefs: RefObject<ModelRef>[];
    modelUrl: string;
};

const AxisRotationSelector = forwardRef<AxisRotationSelectorRef, AxisRotationSelectorProps>(({ axis, modelRefs, modelUrl }, ref) => {
    const [resetButtonShown, setResetButtonShown] = useState(false);

    const sliderRef = useRef<HTMLInputElement>(null);
    const numberInputRef = useRef<HTMLInputElement>(null);

    const FULL_ROTATION_RANGE = 2 * Math.PI;
    const BISECTED_ROTATION_RANGE = FULL_ROTATION_RANGE / 2;

    const degreesToRadians = (degrees: number) => degrees * (Math.PI / 180);
    const radiansToDegrees = (radians: number) => radians * (180 / Math.PI);

    const SLIDER_MIN = radiansToDegrees(-BISECTED_ROTATION_RANGE);
    const SLIDER_MAX = radiansToDegrees(BISECTED_ROTATION_RANGE);

    useEffect(() => {
        if (!ref) return;

        (ref as MutableRefObject<AxisRotationSelectorRef | null>).current = { updateInputs };
    }, []);

    useEffect(() => {
        updateInputs(0);
    }, [modelUrl]);

    const updateInputs = useCallback((rotation: number) => {
        if (sliderRef.current) {
            const percent = (rotation + BISECTED_ROTATION_RANGE) / FULL_ROTATION_RANGE;
            const sliderValue = SLIDER_MIN + percent * (SLIDER_MAX - SLIDER_MIN);

            sliderRef.current.value = sliderValue.toString();
        }

        if (numberInputRef.current) {
            numberInputRef.current.value = `${radiansToDegrees(rotation).toFixed(2).toString()}\u00b0`;
        }

        setResetButtonShown(Math.abs(rotation) > Number.EPSILON);
    }, [setResetButtonShown]);

    const applyRotation = (rotation: number) => {
        for (const modelRef of modelRefs) {
            if (!modelRef.current) return;

            const { model } = modelRef.current;

            console.log("old", model.rotation);
            model.rotation[axis] = rotation;
            console.log("new", model.rotation);
        }

        updateInputs(rotation);
    };

    const onSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
        const multiplier = parseFloat(e.currentTarget.value) / radiansToDegrees(BISECTED_ROTATION_RANGE);
        const rotation = multiplier * BISECTED_ROTATION_RANGE;

        applyRotation(rotation);
    };

    const onNumberInput = (input: string) => {
        const numberInput = parseFloat(input);

        if (Number.isNaN(numberInput)) return;

        const rotation = degreesToRadians(numberInput);

        if (Math.abs(rotation) > BISECTED_ROTATION_RANGE) return;

        applyRotation(rotation);
    };

    return (
        <div className="flex flex-col gap-y-2">
            <div className="flex flex-row items-center justify-between">
                <p>{axis.toUpperCase()}-Axis Rotation</p>

                {resetButtonShown && (
                    <button
                        className="font-semibold text-[#808080] transition duration-100 hover:text-red-500"
                        onClick={() => applyRotation(0)}
                    >
                        RESET
                    </button>
                )}
            </div>
            <div className="flex flex-row gap-x-2 items-center">
                <input
                    type="range"
                    className="w-full h-1 bg-[#1e1e1e] rounded-lg appearance-none cursor-pointer"
                    min={SLIDER_MIN}
                    max={SLIDER_MAX}
                    onChange={onSliderChange}
                    ref={sliderRef}
                />
                <input
                    className="text-white text-center w-16 bg-[#1e1e1e] outline-none"
                    onClick={(e) => {
                        e.currentTarget.value = e.currentTarget.value.replace('\u00b0', '');
                        e.currentTarget.select();
                    }}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            onNumberInput(e.currentTarget.value);
                            e.currentTarget.blur();
                        }
                    }}
                    onBlur={(e) => onNumberInput(e.currentTarget.value)}
                    ref={numberInputRef}
                />
            </div>
        </div>
    );
});

type AxisRotationSelectorRef = {
    updateInputs: (rotation: number) => void;
};

const Upload = () => {
    const [projectFilename, setProjectFilename] = useState<string>();
    const [modelUrl, setModelUrl] = useState<string>();
    const [previewModelUrl, setPreviewModelUrl] = useState<string>();
    const [modelColor, setModelColor] = useState("#8E2929");
    const [colorPickerOpen, setColorPickerOpen] = useState(false);
    const [rotationGizmoShown, setRotationGizmoShown] = useState(false);


    const modelRef = useRef<ModelRef>(null);
    const previewModelRef = useRef<ModelRef>(null);

    const cameraRef = useRef<CameraRef>(null);
    const previewCameraRef = useRef<CameraRef>(null);

    const reuploadInputRef = useRef<HTMLInputElement>(null);

    const xRef = useRef<AxisRotationSelectorRef>(null);
    const yRef = useRef<AxisRotationSelectorRef>(null);
    const zRef = useRef<AxisRotationSelectorRef>(null);

    const rotationSelectorRefs: { [key in AxisType]: RefObject<AxisRotationSelectorRef> } = {
        "x": xRef,
        "y": yRef,
        "z": zRef,
    };

    const { showModal } = useModals();

    const stlLoadCurve = (file: File) => {
        setModelUrl(URL.createObjectURL(file));
        setPreviewModelUrl(URL.createObjectURL(file));
    };

    const onFileSelect = (file: File) => {
        const defaultExportFileName = `printerForm-${file.name}.pdf`;
        setProjectFilename(defaultExportFileName);
        document.title = defaultExportFileName;

        stlLoadCurve(file);

        if (modelRef.current && previewModelRef.current) {
            for (const axis of ['x', 'y', 'z']) {
                previewModelRef.current.model.rotation[axis as AxisType] = 0;
                modelRef.current.model.rotation[axis as AxisType] = 0;
            }
        }

        setRotationGizmoShown(false);
    };

    const handleModelColorChange: ColorChangeHandler = (color: ColorResult, e) => {
        setModelColor(color.hex);
    };

    const handleReupload = (e: ChangeEvent<HTMLInputElement>) => {
        if (!e.currentTarget.files) return;

        onFileSelect(e.currentTarget.files[0]);
    };

    useEffect(() => {
        const globalKeyDown = (e: KeyboardEvent) => {
            if (e.key.toUpperCase() === "R") {
                setRotationGizmoShown(old => !old);
            }
        };

        document.addEventListener("keydown", globalKeyDown);

        return () => document.removeEventListener("keydown", globalKeyDown);
    }, []);

    return (
        <>
            <ModalContainer />
            <div className="flex flex-col h-screen w-full"
                onClick={() => {
                    setColorPickerOpen(false);
                }}
            >
                <div className="relative flex flex-row items-center justify-between bg-[#2c2c2c] h-12">
                    <Link className="flex h-full items-center justify-center bg-red-500 p-5" href="/">
                        Home
                    </Link>

                    {modelUrl && (
                        <input
                            className="text-white text-center grow bg-transparent px-3 outline-none overflow-ellipsis"
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
                    )}

                    {modelUrl && (
                        <div className="flex flex-row h-full">
                            <button
                                className="flex h-full items-center justify-center p-5 bg-blue-900 cursor-pointer"
                                onClick={(e) => {
                                    if (!reuploadInputRef.current) return;

                                    reuploadInputRef.current.click();
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

                <div className="bg-[#1E1E1E] flex w-full h-full flex-col justify-center">
                    {!modelUrl && (
                        <div className="m-12 h-full">
                            <DragDropFileUpload
                                className="flex w-full h-full items-center justify-center cursor-pointer rounded-lg border-dashed border-2 transition duration-200"
                                dragActiveClassName="bg-[#262626] border-blue-500"
                                dragInactiveClassName="bg-[#2c2c2c] border-gray-500"
                                onFileSelect={onFileSelect}
                            >
                                <p className="text-white">Drag/select STL model file here</p>
                            </DragDropFileUpload>
                        </div>
                    )}

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
                                    <p className="absolute top-2 left-2">PRINCIPAL VIEW <span className="text-blue-500 font-bold">WIP</span></p>
                                </div>
                            </div>

                            <DragDropFileUpload
                                onFileSelect={(file) => {
                                    showModal(
                                        <PromptModal
                                            title="Model Reupload"
                                            bodyText={`Are you sure you would like to replace the current model with "${file.name}"?`}
                                            onConfirm={() => onFileSelect(file)}
                                        />
                                    );
                                }}
                                className="relative grow transition duration-200"
                                dragActiveClassName="after:content-[''] after:absolute after:inset-0 after:shadow-[inset_0_0_20px_#006bff] after:pointer-events-none"
                                onlyAcceptDraggedFiles
                            >
                                <StlViewer
                                    className="absolute inset-0 bg-[#1E1E1E] cursor-grab active:cursor-grabbing"
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
                                    }}
                                    onOrbitChange={() => {
                                        if (!cameraRef.current || !previewCameraRef.current) return;

                                        previewCameraRef.current.camera.copy(cameraRef.current.camera);
                                    }}
                                    onRotationControlChange={(rotation) => {
                                        for (const [axis, axisRotationSelectorRef] of Object.entries(rotationSelectorRefs)) {
                                            if (!axisRotationSelectorRef.current) {
                                                console.log("skipping " + axis);
                                                console.log(axisRotationSelectorRef);
                                                continue;
                                            }

                                            axisRotationSelectorRef.current.updateInputs(rotation[axis as AxisType]);
                                        }
                                    }}
                                    shadows
                                    showAxisGizmo
                                    showGrid
                                    showRotationGizmo={rotationGizmoShown}
                                    objectRespectsFloor={false}
                                    orbitControls
                                    url={modelUrl}
                                />
                            </DragDropFileUpload>

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
                                    <div className="flex flex-col p-4 gap-y-6">
                                        <AxisRotationSelector
                                            axis="x"
                                            modelRefs={[modelRef, previewModelRef]}
                                            modelUrl={modelUrl}
                                            ref={xRef}
                                        />
                                        <AxisRotationSelector
                                            axis="y"
                                            modelRefs={[modelRef, previewModelRef]}
                                            modelUrl={modelUrl}
                                            ref={yRef}
                                        />
                                        <AxisRotationSelector
                                            axis="z"
                                            modelRefs={[modelRef, previewModelRef]}
                                            modelUrl={modelUrl}
                                            ref={zRef}
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