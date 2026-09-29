import {useEffect, useRef, useState, type ChangeEvent} from "react";
import {CgProfile} from "react-icons/cg";

export interface AvatarUploadProps {
    /** Selected file for a controlled input. Pass null for no file. */
    value?: File | null;
    /** Starting file for an uncontrolled input. */
    defaultValue?: File | null;
    /** Called when a new picture is picked. */
    onChange?: (file: File | null) => void;
    /** URL of the current profile picture, shown until a new file is picked. */
    imageUrl?: string;
    /** File types the picker allows, as in the `accept` attribute. */
    accept?: string;
    /** Name of the file input, for form submissions. */
    name?: string;
    /** Text of the upload button. */
    buttonLabel?: string;
    /** Alt text of the profile picture. */
    imageAlt?: string;
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

/** A round profile picture with a button that replaces it. Shows a placeholder icon until there is a picture. */
export const AvatarUpload = ({
    value,
    defaultValue = null,
    onChange,
    imageUrl = "",
    accept = "image/*",
    name = "image",
    buttonLabel = "Upload profile",
    imageAlt = "Profile picture",
    className = "",
}: AvatarUploadProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [internalFile, setInternalFile] = useState<File | null>(defaultValue);
    const file = value !== undefined ? value : internalFile;
    const previewUrl = usePreviewUrl(file);
    const shownUrl = file ? previewUrl : imageUrl;

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const next = event.target.files?.[0];
        // Clears the input so picking the same file again still fires a change.
        event.target.value = "";
        if (!next) return;
        setInternalFile(next);
        onChange?.(next);
    };

    return (
        <div className={`text-center ${className}`}>
            <input ref={inputRef} type="file" name={name} accept={accept} className="hidden" onChange={handleFileChange}/>
            <div className="w-[150px] h-[150px] rounded-full dark:border-slate-700 border border-[#e5eaf2] flex items-center justify-center">
                {shownUrl === "" ? (
                    <CgProfile className="text-[10rem] text-[#e5eaf2] dark:text-slate-500" aria-hidden/>
                ) : (
                    <img src={shownUrl} alt={imageAlt} className="w-full h-full object-cover rounded-full"/>
                )}
            </div>

            <button
                type="button"
                className="px-4 py-2 bg-[#3B9DF8] text-white rounded-md mt-5"
                onClick={() => inputRef.current?.click()}
            >
                {buttonLabel}
            </button>
        </div>
    );
};
