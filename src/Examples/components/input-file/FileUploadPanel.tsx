import {useEffect, useRef, useState, type ChangeEvent} from "react";
import {PiFilesThin} from "react-icons/pi";
import {MdDelete} from "react-icons/md";

export interface FileUploadPanelProps {
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
    /** Heading above the upload area. */
    title?: string;
    /** Small print under the heading, usually the allowed file types. */
    hint?: string;
    /** Accessible name of the upload area, which only shows an icon. */
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

/** An upload area with a heading and a line about the allowed file types. Picking an image shows a preview. */
export const FileUploadPanel = ({
    value,
    defaultValue = null,
    onChange,
    accept = "image/png, image/jpeg",
    name = "image",
    title = "Upload your files",
    hint = "JPG, PNG, JPEG",
    browseLabel = "Browse files",
    removeLabel = "Remove image",
    previewAlt = "Selected image",
    className = "",
}: FileUploadPanelProps) => {
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
                <div className="text-center w-full md:w-[90%]">
                    <h3 className="text-[1.5rem] dark:text-[#abc2d3] text-[#424242] font-[600]">{title}</h3>
                    <p className="text-[#777777] dark:text-[#abc2d3]/80 font-[400] text-[1rem]">{hint}</p>

                    <button
                        type="button"
                        aria-label={browseLabel}
                        className="mt-5 w-full md:w-[70%] mx-auto dark:border-slate-700 dark:bg-slate-900 flex items-center justify-center flex-col bg-white border-[2px] border-dashed border-[#3B9DF8] rounded-md py-10 cursor-pointer"
                        onClick={() => inputRef.current?.click()}
                    >
                        <PiFilesThin className="text-[4rem] text-[#424242] dark:text-[#abc2d3]/70" aria-hidden/>
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
