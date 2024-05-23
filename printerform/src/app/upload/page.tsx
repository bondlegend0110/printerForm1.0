"use client";

import { ChangeEvent, CSSProperties, useRef, useState } from "react";
import { ModelProps, ModelRef, StlViewer } from "react-stl-viewer";
import { ColorChangeHandler, ColorResult, SwatchesPicker } from "react-color";
import { Quaternion } from "three";

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

    const stlViewSetRotation = (quaternion: Quaternion) => {
        // TODO: Understand how quaternion rotation works to get manual rotation to work
        // stl_viewer_front.rotate(0,a[0][0]-b[0][0],a[0][1]-b[0][1],a[0][2]-b[0][2]);
        // stl_viewer_back.rotate(0,-a[1][0]-b[1][0],a[1][1]-b[1][1],a[1][2]-b[1][2]);
        // stl_viewer_left.rotate(0,-a[2][0]-b[2][0],a[2][1]-b[2][1],a[2][2]-b[3][2]);
        // stl_viewer_right.rotate(0,a[3][0]-b[3][0],-a[3][1]-b[3][1],a[3][2]-b[2][2]);
        // b[0]=a[0];
        // b[1]=[-a[1][0],a[1][1],a[1][2]];
        // b[2]=[-a[2][0],a[2][1],a[2][2]];
        // b[3]=[a[3][0],-a[3][1],a[3][2]];
    }

    const handleXAxisRotationChange = (e: ChangeEvent<HTMLInputElement>) => {
        const multiplier = (parseFloat(e.currentTarget.value) - 50) / 50;
        const rotation = Math.sign(multiplier) * (1 / 50) * (Math.PI / 2);
        console.log(rotation);

        if (!modelRef.current) return;
        const { model } = modelRef.current;
        model.rotateX(rotation);

        console.log(model.quaternion)
    }
    console.log(modelRef.current?.model.quaternion)

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
                            shadows
                            url={modelUrl}
                        />
                    )}
                </div>
                <div className="flex-shrink-0">
                    <div className="bg-blue-400">
                        <p>Model Color:</p>
                        <SwatchesPicker
                            className="w-full"
                            color={modelColor}
                            onChange={handleModelColorChange}
                        />
                    </div>
                    <div className="bg-red-400">
                        <p>Rotation X-Axis</p>
                        <input type="range" className="w-full" onChange={handleXAxisRotationChange} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Upload;