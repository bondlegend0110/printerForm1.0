import { Dispatch, forwardRef, MutableRefObject, RefObject, SetStateAction, useEffect, useRef, useState } from "react";
import AxisRotationSelector, { AxisRotationSelectorRef, AxisType } from "./AxisRotationSelector";
import { ChromePicker, ColorChangeHandler, ColorResult } from "react-color";
import { Euler } from "three";
import { ModelRef,CameraRef } from "@/app/stl-viewer-src";

export type PropertiesControlPanelRef = {
    updateRotations: (rotation: Euler) => void;
    setColorPickerOpen: Dispatch<SetStateAction<boolean>>;
    setViewDirection: (direction: string) => void;
};

export type PropertiesControlPanelProps = {
    modelColor: {
        value: string,
        set: Dispatch<SetStateAction<string>>
    },
    modelRefs: RefObject<ModelRef>[]
    setViewDirection: (direction: string) => void;
    cameraRef: RefObject<CameraRef>;
};

const PropertiesControlPanel = forwardRef<PropertiesControlPanelRef, PropertiesControlPanelProps>(({
    modelColor,
    modelRefs,
    cameraRef
}, ref) => {
    const [colorPickerOpen, setColorPickerOpen] = useState(false);

    const xRef = useRef<AxisRotationSelectorRef>(null);
    const yRef = useRef<AxisRotationSelectorRef>(null);
    const zRef = useRef<AxisRotationSelectorRef>(null);

    const rotationSelectorRefs: { [key in AxisType]: RefObject<AxisRotationSelectorRef> } = {
        "x": xRef,
        "y": yRef,
        "z": zRef,
    };

    const handleModelColorChange: ColorChangeHandler = (color: ColorResult, e) => {
        modelColor.set(color.hex);
    };

    const updateRotations = (rotation: Euler) => {
        for (const [axis, axisRotationSelectorRef] of Object.entries(rotationSelectorRefs)) {
            if (!axisRotationSelectorRef.current) {
                console.log(axisRotationSelectorRef);
                continue;
            }

            axisRotationSelectorRef.current.updateInputs(rotation[axis as AxisType]);
        }
    }
    type SphericalCoordinate = { 
        radius: number,
        phi: number,
        theta: number;
    };
    function clamp(min: number, value: number, max: number): number {
        return Math.max(Math.min(value, max), min);
    }
    function sphericalToCartesian(spherical: SphericalCoordinate): [number, number, number] {
        const phi = clamp(spherical.phi, 0, Math.PI);  // Full range: 0 to π
        const theta = spherical.theta % (2 * Math.PI); // Wrap theta between 0 and 2π
    
        const x = spherical.radius * Math.sin(phi) * Math.cos(theta);
        const y = spherical.radius * Math.cos(phi);  // Y-axis depends on phi
        const z = spherical.radius * Math.sin(phi) * Math.sin(theta);
        return [x, y, z];
    }

    const setViewDirection = (direction: string) => {
        if (!cameraRef.current) return;
    
        let angle: SphericalCoordinate = { radius: 5, phi: Math.PI / 2, theta: 0 }; // Default to front view
        switch (direction) {
            case "front":
                angle = { radius: 100, phi: 0, theta: 0 }; // Front view
                break;
            case "back":
                angle = { radius: 100, phi: Math.PI, theta: 0}; // Back view
                break;
            case "left":
                angle = { radius: 100, phi: Math.PI / 2, theta: 0 }; // Left view
                break;
            case "right":
                angle = { radius: 100, phi: Math.PI/2, theta: Math.PI }; // Right view
                break;
            case "top":
                // angle = { radius: 100, phi: 0, theta: 0 }; // Top view
                angle = { radius: 100, phi: Math.PI / 2, theta: Math.PI / 2 };
                break;
            case "bottom":
                // angle = { radius: 100, phi: Math.PI, theta: 0 }; // Bottom view
                angle = { radius: 100, phi: Math.PI / 2, theta: 3 * Math.PI / 2 };
                break;
            default:
                break;
        }
        // Convert spherical coordinates to Cartesian coordinates
        const coords = sphericalToCartesian(angle);
    
        // Position the camera
        cameraRef.current.camera.position.set(coords[0], coords[1], coords[2]);
        cameraRef.current.camera.lookAt(0, 0, 0); // Look at the center
    
        console.log(`Attempting to set view direction to: ${direction}`);
        console.log(`Angle: ${angle}`);
        cameraRef.current.camera.updateProjectionMatrix(); // Update the projection matrix if needed
    };

    useEffect(() => {
        if (!ref) return;

        (ref as MutableRefObject<PropertiesControlPanelRef | null>).current = {
            updateRotations,
            setColorPickerOpen,
            setViewDirection
        }
    }, [])

    return (
        <div className="flex flex-col flex-shrink-0 min-w-72 text-white">
            <div className="divide-y divide-[#444444] border-y border-[#444444]">
                <div className="p-4 gap-y-4 flex flex-col">
                    <p>Model Color:</p>
                    <div className="relative flex flex-row items-center">
                        <button
                            className="w-14 h-6 rounded-sm"
                            style={{ backgroundColor: modelColor.value }}
                            onClick={(e) => {
                                e.preventDefault();
                                setColorPickerOpen(old => !old);
                                e.stopPropagation();
                            }}
                        />
                        <input
                            className="text-white grow bg-transparent pl-5 outline-none overflow-ellipsis pointer-events-auto"
                            type="text"
                            value={modelColor.value}
                        />
                        {colorPickerOpen && (
                            <div
                                className="absolute top-0 left-0 w-0"
                                onClick={e => e.stopPropagation()}
                            >
                                <ChromePicker
                                    className="-translate-x-[calc(100%+1rem)]"
                                    styles={{ default: { picker: { backgroundColor: "#2c2c2c", fontFamily: 'inherit' } } }}
                                    color={modelColor.value}
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
                        modelRefs={modelRefs}
                        ref={xRef}
                    />
                    <AxisRotationSelector
                        axis="y"
                        modelRefs={modelRefs}
                        ref={yRef}
                    />
                    <AxisRotationSelector
                        axis="z"
                        modelRefs={modelRefs}
                        ref={zRef}
                    />
                </div>
            </div>
            <div className="flex flex-row space-x-2">
                <button
                    className="text-white bg-[#444444] hover:bg-[#555555] rounded-md px-2 py-1"
                    onClick={() => setViewDirection("front")}
                >
                    Front
                </button>
                <button
                    className="text-white bg-[#444444] hover:bg-[#555555] rounded-md px-2 py-1"
                    onClick={() => setViewDirection("back")}
                >
                    Back
                </button>
                <button
                    className="text-white bg-[#444444] hover:bg-[#555555] rounded-md px-2 py-1"
                    onClick={() => setViewDirection("left")}
                >
                    Left
                </button>
                <button
                    className="text-white bg-[#444444] hover:bg-[#555555] rounded-md px-2 py-1"
                    onClick={() => setViewDirection("right")}
                >
                    Right
                </button>
                <button
                    className="text-white bg-[#444444] hover:bg-[#555555] rounded-md px-2 py-1"
                    onClick={() => setViewDirection("top")}
                >
                    Top
                </button>
                <button
                    className="text-white bg-[#444444] hover:bg-[#555555] rounded-md px-2 py-1"
                    onClick={() => setViewDirection("bottom")}
                >
                    Bottom
                </button>
            </div>
        </div>
    )
});

export default PropertiesControlPanel;