import {useEffect, useId, useRef, useState} from "react";
import type {ChangeEvent, DragEvent, MouseEvent} from "react";

// react icons
import {IoIosImages} from "react-icons/io";
import {IoRefresh} from "react-icons/io5";
import {RxCross1} from "react-icons/rx";

export interface CropSize {
    width: number;
    height: number;
}

interface CropArea extends CropSize {
    x: number;
    y: number;
}

type Interaction = "idle" | "moving" | "resizing";

export interface CropImageModalProps {
    /** Data URL or image URL to crop. The modal is open while this is set. */
    image: string | null;
    /** Called with the cropped image as a PNG data URL. */
    onCrop: (croppedImage: string) => void;
    /** Called when the modal is closed without cropping. */
    onCancel: () => void;
    /** Largest starting size of the crop area, in displayed pixels. */
    initialCropSize?: CropSize;
    /** Smallest width and height the crop area can be resized to, in displayed pixels. */
    minCropSize?: number;
    title?: string;
    cropAreaLabel?: string;
    cancelLabel?: string;
    saveLabel?: string;
    className?: string;
}

export const CropImageModal = ({
    image,
    onCrop,
    onCancel,
    initialCropSize = {width: 300, height: 200},
    minCropSize = 50,
    title = "Crop image",
    cropAreaLabel = "Crop area",
    cancelLabel = "Cancel",
    saveLabel = "Crop & save",
    className = "",
}: CropImageModalProps) => {
    const titleId = useId();
    const [cropArea, setCropArea] = useState<CropArea>({
        x: 0,
        y: 0,
        width: 400,
        height: 200,
    });
    const [interaction, setInteraction] = useState<Interaction>("idle");
    const [offset, setOffset] = useState({x: 0, y: 0});
    const imageRef = useRef<HTMLImageElement>(null);
    const cropperRef = useRef<HTMLDivElement>(null);
    const {width: initialWidth, height: initialHeight} = initialCropSize;

    // Center the crop area on the image once it has loaded
    useEffect(() => {
        const imageElement = imageRef.current;
        if (!image || !imageElement) return;

        const handleImageLoad = () => {
            const imgWidth = imageElement.clientWidth;
            const imgHeight = imageElement.clientHeight;
            const cropWidth = Math.min(initialWidth, imgWidth * 0.8);
            const cropHeight = Math.min(initialHeight, imgHeight * 0.8);

            setCropArea({
                x: (imgWidth - cropWidth) / 2,
                y: (imgHeight - cropHeight) / 2,
                width: cropWidth,
                height: cropHeight,
            });
        };

        if (imageElement.complete) {
            handleImageLoad();
            return;
        }

        imageElement.addEventListener("load", handleImageLoad);
        return () => imageElement.removeEventListener("load", handleImageLoad);
    }, [image, initialWidth, initialHeight]);

    // Close with the Escape key while the modal is open
    useEffect(() => {
        if (!image) return;
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") onCancel();
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [image, onCancel]);

    const startMove = (e: MouseEvent<HTMLDivElement>) => {
        if (!cropperRef.current) return;
        const rect = cropperRef.current.getBoundingClientRect();
        setOffset({x: e.clientX - rect.left - cropArea.x, y: e.clientY - rect.top - cropArea.y});
        setInteraction("moving");
    };

    const startResize = (e: MouseEvent<HTMLDivElement>) => {
        // Keeps the crop area from starting a move at the same time
        e.stopPropagation();
        setInteraction("resizing");
    };

    const stopInteraction = () => setInteraction("idle");

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        const imageElement = imageRef.current;
        if (!imageElement || !cropperRef.current) return;
        const rect = cropperRef.current.getBoundingClientRect();

        if (interaction === "moving") {
            const newX = e.clientX - rect.left - offset.x;
            const newY = e.clientY - rect.top - offset.y;
            const maxX = imageElement.clientWidth - cropArea.width;
            const maxY = imageElement.clientHeight - cropArea.height;

            setCropArea((prev) => ({
                ...prev,
                x: Math.max(0, Math.min(newX, maxX)),
                y: Math.max(0, Math.min(newY, maxY)),
            }));
        } else if (interaction === "resizing") {
            const newWidth = e.clientX - rect.left - cropArea.x;
            const newHeight = e.clientY - rect.top - cropArea.y;
            const maxWidth = imageElement.clientWidth - cropArea.x;
            const maxHeight = imageElement.clientHeight - cropArea.y;

            setCropArea((prev) => ({
                ...prev,
                width: Math.max(minCropSize, Math.min(newWidth, maxWidth)),
                height: Math.max(minCropSize, Math.min(newHeight, maxHeight)),
            }));
        }
    };

    const cropImage = (): string | null => {
        const imageElement = imageRef.current;
        if (!imageElement) return null;

        const canvas = document.createElement("canvas");
        canvas.width = cropArea.width;
        canvas.height = cropArea.height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return null;

        const scaleX = imageElement.naturalWidth / imageElement.clientWidth;
        const scaleY = imageElement.naturalHeight / imageElement.clientHeight;

        ctx.drawImage(
            imageElement,
            cropArea.x * scaleX,
            cropArea.y * scaleY,
            cropArea.width * scaleX,
            cropArea.height * scaleY,
            0,
            0,
            cropArea.width,
            cropArea.height
        );

        return canvas.toDataURL();
    };

    const saveAndClose = () => {
        const result = cropImage();
        if (result) onCrop(result);
        else onCancel();
    };

    return (
        <div
            className={`${
                image ? " visible" : " invisible"
            } w-full h-screen fixed top-0 left-0 z-[200000000] bg-[#0000002a] dark:bg-black/70 flex items-center justify-center transition-all duration-300 ${className}`}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                className={`${
                    image
                        ? " scale-[1] opacity-100"
                        : " scale-[0] opacity-0"
                } w-[90%] sm:w-[80%] md:w-[60%] dark:bg-slate-900 max-h-[80vh] bg-[#fff] rounded-lg p-4 transition-all duration-300 flex flex-col`}
            >
                <div className="w-full flex items-center justify-between">
                    <h4 id={titleId} className="text-[20px] font-[600] dark:text-[#d2e5f5] text-gray-800">{title}</h4>
                    <button type="button" aria-label="Close" onClick={onCancel} className="rounded-full">
                        <RxCross1 className="p-2 text-[2.3rem] dark:hover:bg-slate-800 dark:text-[#d2e5f5]/70 hover:bg-[#e7e7e7] rounded-full transition-all duration-300 cursor-pointer"/>
                    </button>
                </div>

                <div className="flex-grow flex items-center justify-center mt-4 max-h-[calc(80vh-120px)] overflow-hidden">
                    <div
                        ref={cropperRef}
                        onMouseMove={interaction === "idle" ? undefined : handleMouseMove}
                        onMouseUp={stopInteraction}
                        onMouseLeave={stopInteraction}
                        className="relative rounded-md overflow-hidden"
                        style={{maxWidth: "100%", maxHeight: "100%"}}
                    >
                        {image && (
                            <>
                                <img
                                    ref={imageRef}
                                    src={image}
                                    alt="Upload"
                                    draggable={false}
                                    className="max-h-[calc(80vh-160px)] max-w-full object-contain rounded-md"
                                />
                                <div
                                    className="absolute border-2 border-[#0FABCA]"
                                    style={{
                                        left: cropArea.x,
                                        top: cropArea.y,
                                        width: cropArea.width,
                                        height: cropArea.height,
                                        boxShadow: "0 0 0 9999px rgba(0,0,0,0.5)",
                                        cursor: "move",
                                    }}
                                    onMouseDown={startMove}
                                >
                                    <div className="absolute select-none inset-0 bg-white bg-opacity-20 flex items-center justify-center text-gray-800 text-sm">
                                        {cropAreaLabel}
                                    </div>
                                    {/* Drag this corner to resize the crop area */}
                                    <div
                                        aria-hidden="true"
                                        onMouseDown={startResize}
                                        className="absolute bottom-0 right-0 w-3 h-3 bg-[#0FABCA] cursor-se-resize"
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className="flex justify-end gap-2 mt-10">
                    <button
                        type="button"
                        className="px-4 py-2 dark:bg-slate-800 dark:text-[#abc2d3] dark:hover:bg-slate-800/80 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition-colors"
                        onClick={onCancel}
                    >
                        {cancelLabel}
                    </button>
                    <button
                        type="button"
                        className="px-4 py-2 bg-[#0FABCA] text-white rounded hover:bg-[#0FABCA]/90 transition-colors"
                        onClick={saveAndClose}
                    >
                        {saveLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

export interface ImageCropperProps {
    /** Cropped image as a data URL (controlled). */
    value?: string | null;
    /** Starting cropped image when uncontrolled. */
    defaultValue?: string | null;
    /** Called with the new cropped image, or null when the cropper is reset. */
    onChange?: (croppedImage: string | null) => void;
    /** File types the picker accepts. */
    accept?: string;
    title?: string;
    hint?: string;
    browseLabel?: string;
    resetLabel?: string;
    /** Props passed through to the crop modal. */
    modalProps?: Omit<CropImageModalProps, "image" | "onCrop" | "onCancel">;
    className?: string;
}

export const ImageCropper = ({
    value,
    defaultValue = null,
    onChange,
    accept = "image/*",
    title = "Choose a file or drag and drop it here",
    hint = "JPG, PNG and JPEG formats",
    browseLabel = "Browse file",
    resetLabel = "Reset cropped image",
    modalProps,
    className = "",
}: ImageCropperProps) => {
    const [image, setImage] = useState<string | null>(null);
    const [internalCropped, setInternalCropped] = useState<string | null>(defaultValue);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const isControlled = value !== undefined;
    const croppedImage = isControlled ? value : internalCropped;

    const setCroppedImage = (next: string | null) => {
        if (!isControlled) setInternalCropped(next);
        onChange?.(next);
    };

    const readFile = (file: File | undefined) => {
        if (!file || !file.type.startsWith("image/")) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            const result = event.target?.result;
            if (typeof result === "string") setImage(result);
        };
        reader.readAsDataURL(file);
    };

    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        readFile(e.target.files?.[0]);
        // Lets the same file be picked again after a cancel
        e.target.value = "";
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        readFile(e.dataTransfer.files[0]);
    };

    return (
        <div className={`p-10 relative ${className}`}>
            <button
                type="button"
                aria-label={resetLabel}
                onClick={() => setCroppedImage(null)}
                className="absolute top-2 right-2 rounded-full"
            >
                <IoRefresh className="dark:bg-slate-800 dark:text-[#abc2d3] bg-gray-200 hover:rotate-[60deg] transition-all duration-300 p-1 text-[1.6rem] cursor-pointer rounded-full"/>
            </button>

            {croppedImage ? (
                <div className="mt-4">
                    <img
                        src={croppedImage}
                        alt="Cropped"
                        className="max-w-full mx-auto rounded"
                    />
                </div>
            ) : (
                <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className="w-full flex items-center justify-center dark:border-slate-700 dark:bg-slate-900 flex-col bg-white border-[2px] px-4 sm:px-0 border-dashed border-gray-300 rounded-md py-6 "
                >
                    <IoIosImages className="text-[3rem] dark:text-[#abc2d3] text-gray-400"/>

                    <p className="mt-4 dark:text-[#d2e5f5] text-center md:text-start text-black font-[500] leading-[30px]">{title}</p>

                    <p className="text-gray-400 text-center md:text-start dark:text-slate-400 font-[300] text-[0.8rem]">{hint}</p>

                    <input
                        ref={fileInputRef}
                        type="file"
                        onChange={handleFileUpload}
                        accept={accept}
                        className="hidden"
                    />

                    <button
                        type="button"
                        className="border border-gray-300 dark:border-slate-700 dark:text-[#abc2d3] dark:hover:bg-slate-800 text-[0.95rem] font-[500] text-gray-700 py-1 px-4 mt-6 rounded-md hover:bg-gray-50"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        {browseLabel}
                    </button>
                </div>
            )}

            <CropImageModal
                {...modalProps}
                image={image}
                onCrop={(cropped) => {
                    setCroppedImage(cropped);
                    setImage(null);
                }}
                onCancel={() => setImage(null)}
            />
        </div>
    );
};
