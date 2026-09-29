import {useEffect, useRef, useState, type ChangeEvent} from "react";
import {FiUpload} from "react-icons/fi";
import {MdDelete} from "react-icons/md";

export interface IconFileUploadProps {
    /** Selected file for a controlled input. Pass null for no file. */
    value?: File | null;
    /** Starting file for an uncontrolled input. */
    defaultValue?: File | null;
    /** Called when a file is picked or removed. */
    onChange?: (file: File | null) => void;
    /** File types the picker allows, as in the `accept` attribute. */
    accept?: string;
    /** Name of the file input, for form submissions. */
    name?: string;
    /** Text under the upload icon. */
    label?: string;
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

/** A bordered upload area with an icon. Picking an image replaces it with a preview and a remove button. */
export const IconFileUpload = ({
    value,
    defaultValue = null,
    onChange,
    accept = "image/*",
    name = "image",
    label = "Browse to upload your file",
    removeLabel = "Remove image",
    previewAlt = "Selected image",
    className = "",
}: IconFileUploadProps) => {
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

    return (
        <div className={`flex w-full items-center flex-col gap-5 justify-center ${className}`}>
            <input ref={inputRef} type="file" name={name} accept={accept} className="hidden" onChange={handleFileChange}/>
            {file === null ? (
                <button
                    type="button"
                    className="w-full md:w-[90%] flex items-center dark:border-slate-600 justify-center flex-col gap-4 border-[#e5eaf2] border rounded-md py-6 cursor-pointer"
                    onClick={() => inputRef.current?.click()}
                >
                    <FiUpload className="text-[2rem] text-[#777777] dark:text-[#abc2d3]" aria-hidden/>
                    <span className="text-[#777777] dark:text-[#abc2d3]">{label}</span>
                </button>
            ) : (
                <div className="relative w-full md:w-[80%] h-[300px]">
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
