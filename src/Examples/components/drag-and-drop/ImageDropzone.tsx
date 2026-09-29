import {useId, useState, type ChangeEvent, type DragEvent} from "react";

// react icons
import {IoCloudUploadOutline} from "react-icons/io5";

export interface ImageDropzoneProps {
    /** Called with the chosen image, or with null when it is removed. */
    onChange?: (file: File | null) => void;
    title?: string;
    /** Text between the title and the browse button. */
    separatorLabel?: string;
    browseLabel?: string;
    /** Large text shown while a file is dragged over the zone. */
    dropLabel?: string;
    removeLabel?: string;
    /** Shown when the dropped or chosen file is not an image. */
    errorText?: string;
    className?: string;
}

/** A drop zone for one image. Drop a file or browse for one, and the zone shows it as a preview. */
export const ImageDropzone = ({
    onChange,
    title = "Drag and drop your image here",
    separatorLabel = "or",
    browseLabel = "Browse file",
    dropLabel = "Drop here",
    removeLabel = "Remove image",
    errorText = "Please upload an image file.",
    className = "",
}: ImageDropzoneProps) => {
    const inputId = useId();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [isDragging, setIsDragging] = useState(false);

    // Validate the file and show it as a preview
    const handleFile = (file: File | undefined) => {
        if (!file) return;

        if (file.type.startsWith("image/")) {
            setErrorMessage("");
            const reader = new FileReader();
            reader.onload = () => {
                if (typeof reader.result === "string") setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
            onChange?.(file);
        } else {
            setErrorMessage(errorText);
            setSelectedImage(null);
            onChange?.(null);
        }
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
        handleFile(e.dataTransfer.files[0]);
    };

    const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
        handleFile(e.target.files?.[0]);
        // Clear the input so picking the same file again still fires a change.
        e.target.value = "";
    };

    // Allow the drop
    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    // Ignore leave events that only move between the drop zone and its children.
    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        if (e.relatedTarget instanceof Node && e.currentTarget.contains(e.relatedTarget)) return;
        setIsDragging(false);
    };

    const removeImage = () => {
        setSelectedImage(null);
        onChange?.(null);
    };

    return (
        <div className={`flex justify-center items-center w-full flex-col ${className}`}>
            <div
                className={`${
                    isDragging
                        ? "border-blue-300 !bg-blue-50"
                        : "border-gray-300"
                } ${
                    selectedImage ? "" : "border-dashed border-2 p-6"
                } rounded-lg w-full h-64 flex flex-col dark:bg-slate-800 dark:border-slate-600 justify-center items-center bg-white`}
                onDragEnter={() => setIsDragging(true)}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                {selectedImage ? (
                    <img
                        src={selectedImage}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-lg"
                    />
                ) : isDragging ? (
                    <p className="text-[2rem] text-blue-700 font-[600]">{dropLabel}</p>
                ) : (
                    <>
                        <IoCloudUploadOutline aria-hidden className="text-[3rem] mb-4 text-gray-400"/>
                        <p className="text-gray-500 text-center dark:text-[#abc2d3] text-[1.1rem] font-[500] mb-2">
                            {title}
                        </p>
                        <p className="text-gray-400">{separatorLabel}</p>
                        <label
                            htmlFor={inputId}
                            className="cursor-pointer dark:bg-slate-500 dark:text-[#abc2d3] py-2 px-4 bg-gray-200 rounded-md mt-2"
                        >
                            {browseLabel}
                        </label>
                        <input
                            id={inputId}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleSelect}
                        />
                    </>
                )}
            </div>

            {errorMessage && (
                <p role="alert" className="text-red-500 mt-4">{errorMessage}</p>
            )}

            {selectedImage && (
                <div className="mt-4">
                    <button
                        type="button"
                        onClick={removeImage}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg"
                    >
                        {removeLabel}
                    </button>
                </div>
            )}
        </div>
    );
};
