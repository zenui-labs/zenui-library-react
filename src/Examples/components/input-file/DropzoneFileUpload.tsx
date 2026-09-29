import {useEffect, useRef, useState, type ChangeEvent, type DragEvent} from "react";
import {IoMdCloudUpload} from "react-icons/io";
import {MdDelete} from "react-icons/md";

export interface DropzoneFileUploadProps {
    /** Selected file for a controlled input. Pass null for no file. */
    value?: File | null;
    /** Starting file for an uncontrolled input. */
    defaultValue?: File | null;
    /** Called when a file is picked, dropped or removed. */
    onChange?: (file: File | null) => void;
    /** File types the picker and the drop area allow, as in the `accept` attribute. */
    accept?: string;
    /** Name of the file input, for form submissions. */
    name?: string;
    /** Text under the upload icon. */
    dropLabel?: string;
    /** Text between the drop label and the browse button. */
    separatorLabel?: string;
    /** Text of the button that opens the file picker. */
    browseLabel?: string;
    /** Accessible name of the remove button. */
    removeLabel?: string;
    /** Alt text of the preview image. */
    previewAlt?: string;
    className?: string;
}

// Creates a preview URL for the file and releases it when the file changes or the component unmounts.
const usePreviewUrl = (file: File | null) => {
    const [url, setUrl] = useState("");

    useEffect(() => {
        if (!file) {
            setUrl("");
            return;
        }
        const next = URL.createObjectURL(file);
        setUrl(next);
        return () => URL.revokeObjectURL(next);
    }, [file]);

    return url;
};

// Checks a dropped file against the accept list, which the file picker already enforces on its own.
const matchesAccept = (file: File, accept: string) => {
    const tokens = accept.split(",").map((token) => token.trim().toLowerCase()).filter(Boolean);
    if (tokens.length === 0) return true;
    const fileName = file.name.toLowerCase();
    const fileType = file.type.toLowerCase();
    return tokens.some((token) => {
        if (token.startsWith(".")) return fileName.endsWith(token);
        if (token.endsWith("/*")) return fileType.startsWith(token.slice(0, -1));
        return fileType === token;
    });
};

/** A dashed drop area with a browse button. Drop a file or pick one to see a preview with a remove button. */
export const DropzoneFileUpload = ({
    value,
    defaultValue = null,
    onChange,
    accept = "image/*",
    name = "image",
    dropLabel = "Drag and drop here",
    separatorLabel = "or",
    browseLabel = "Browse",
    removeLabel = "Remove image",
    previewAlt = "Selected image",
    className = "",
}: DropzoneFileUploadProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [internalFile, setInternalFile] = useState<File | null>(defaultValue);
    const file = value !== undefined ? value : internalFile;
    const previewUrl = usePreviewUrl(file);

    const setFile = (next: File | null) => {
        setInternalFile(next);
        onChange?.(next);
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const next = event.target.files?.[0];
        // Clears the input so picking the same file again after removing it still fires a change.
        event.target.value = "";
        if (next) setFile(next);
    };

    const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "copy";
    };

    const handleDrop = (event: DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const next = event.dataTransfer.files[0];
        if (next && matchesAccept(next, accept)) setFile(next);
    };

    return (
        <div className={`flex w-full items-center flex-col gap-5 justify-center ${className}`}>
            <input ref={inputRef} type="file" name={name} accept={accept} className="hidden" onChange={handleFileChange}/>
            {file === null ? (
                <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className="w-full md:w-[90%] flex dark:border-slate-700 dark:bg-slate-900 items-center justify-center flex-col bg-white border border-dashed border-[#3B9DF8] rounded-md py-6"
                >
                    <IoMdCloudUpload className="text-[3rem] text-[#3B9DF8]" aria-hidden/>
                    <p className="mt-2 text-[#424242] dark:text-[#abc2d3]">{dropLabel}</p>
                    <p className="text-[#424242] dark:text-[#abc2d3]">{separatorLabel}</p>

                    <button type="button" className="px-6 py-1.5 text-[#3B9DF8]" onClick={() => inputRef.current?.click()}>
                        {browseLabel}
                    </button>
                </div>
            ) : (
                <div className="relative w-full md:w-[80%] h-[200px]">
                    {previewUrl && <img src={previewUrl} alt={previewAlt} className="w-full h-full object-cover"/>}
                    <button
                        type="button"
                        aria-label={removeLabel}
                        className="absolute top-0 right-0 flex bg-[#000000ad] p-1 text-white cursor-pointer"
                        onClick={() => setFile(null)}
                    >
                        <MdDelete className="size-6" aria-hidden/>
                    </button>
                </div>
            )}
        </div>
    );
};
