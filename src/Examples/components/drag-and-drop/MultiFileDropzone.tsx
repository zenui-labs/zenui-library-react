import {useEffect, useId, useRef, useState, type ChangeEvent, type DragEvent} from "react";

// react icons
import {CiImageOn} from "react-icons/ci";
import {RxCross2} from "react-icons/rx";
import {IoMdDoneAll} from "react-icons/io";

/**
 * Uploads one file. Call `onProgress` with 0 to 100 as the upload moves, resolve when it is done and stop when
 * `signal` is aborted (the user cancelled, pressed reset or the component unmounted).
 */
export type UploadHandler = (file: File, onProgress: (percent: number) => void, signal: AbortSignal) => Promise<void>;

/** Fakes an upload by adding 10% every 300ms. Pass your own `upload` handler to replace it. */
const simulateUpload: UploadHandler = (_file, onProgress, signal) =>
    new Promise((resolve, reject) => {
        let progress = 0;
        const interval = window.setInterval(() => {
            progress += 10;
            onProgress(Math.min(progress, 100));
            if (progress >= 100) {
                window.clearInterval(interval);
                resolve();
            }
        }, 300);

        signal.addEventListener(
            "abort",
            () => {
                window.clearInterval(interval);
                reject(new DOMException("Upload aborted", "AbortError"));
            },
            {once: true},
        );
    });

type UploadStatus = "uploading" | "uploaded" | "cancelled" | "failed" | "too-large";

interface UploadEntry {
    id: number;
    file: File;
    progress: number;
    status: UploadStatus;
}

const formatFileSize = (sizeInBytes: number) => {
    if (sizeInBytes < 1024 * 1024) {
        // Show size in KB for files less than 1 MB
        return (sizeInBytes / 1024).toFixed(2) + " KB";
    }
    // Show size in MB for files 1 MB or larger
    return (sizeInBytes / (1024 * 1024)).toFixed(2) + " MB";
};

const STATUS_ERRORS: Partial<Record<UploadStatus, string>> = {
    cancelled: "Upload cancelled",
    failed: "Upload failed",
    "too-large": "File is too large",
};

export interface MultiFileDropzoneProps {
    /** Uploads each file. Defaults to a simulated upload so the progress bars can be seen. */
    upload?: UploadHandler;
    /** Called once for every file that finishes uploading. */
    onUploaded?: (file: File) => void;
    /** File types the picker offers, as in the input `accept` attribute. */
    accept?: string;
    /** Largest allowed file in bytes. Bigger files are listed as too large and not uploaded. */
    maxFileSize?: number;
    /** Underlined text that opens the file picker. */
    browseLabel?: string;
    dropLabel?: string;
    /** Small print under the labels. Defaults to the maximum file size. */
    hint?: string;
    /** Illustration shown in the drop zone. */
    illustrationSrc?: string;
    resetLabel?: string;
    className?: string;
}

/** A drop zone for several files at once, with a card per file that shows its upload progress. */
export const MultiFileDropzone = ({
    upload = simulateUpload,
    onUploaded,
    accept = "image/*",
    maxFileSize = 50 * 1024 * 1024,
    browseLabel = "Click to upload",
    dropLabel = "or drag and drop your images here",
    hint,
    illustrationSrc = "https://i.ibb.co.com/XY2YgLh/Searching-for-files-in-a-folder.png",
    resetLabel = "Reset",
    className = "",
}: MultiFileDropzoneProps) => {
    const inputId = useId();
    const [entries, setEntries] = useState<UploadEntry[]>([]);
    const [dragging, setDragging] = useState(false);
    const nextId = useRef(0);
    const controllers = useRef(new Map<number, AbortController>());

    // Stop every running upload when the component unmounts.
    useEffect(() => {
        const running = controllers.current;
        return () => {
            running.forEach((controller) => controller.abort());
            running.clear();
        };
    }, []);

    const updateEntry = (id: number, changes: Partial<UploadEntry>) => {
        setEntries((prev) => prev.map((entry) => (entry.id === id ? {...entry, ...changes} : entry)));
    };

    const startUpload = (entry: UploadEntry) => {
        const controller = new AbortController();
        controllers.current.set(entry.id, controller);

        upload(
            entry.file,
            (percent) => {
                if (!controller.signal.aborted) updateEntry(entry.id, {progress: percent});
            },
            controller.signal,
        )
            .then(() => {
                if (controller.signal.aborted) return;
                updateEntry(entry.id, {progress: 100, status: "uploaded"});
                onUploaded?.(entry.file);
            })
            .catch(() => {
                // An aborted upload already has its final state.
                if (!controller.signal.aborted) updateEntry(entry.id, {status: "failed"});
            })
            .finally(() => controllers.current.delete(entry.id));
    };

    const addFiles = (files: FileList) => {
        const added: UploadEntry[] = Array.from(files).map((file) => ({
            id: nextId.current++,
            file,
            progress: 0,
            status: file.size > maxFileSize ? "too-large" : "uploading",
        }));
        setEntries((prev) => [...prev, ...added]);
        added.filter((entry) => entry.status === "uploading").forEach(startUpload);
    };

    // Handle files when dropped
    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDragging(false);
        if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
    };

    // Handle files when selected with the picker
    const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length) addFiles(e.target.files);
        // Clear the input so picking the same file again still fires a change.
        e.target.value = "";
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    // Ignore leave events that only move between the drop zone and its children.
    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        if (e.relatedTarget instanceof Node && e.currentTarget.contains(e.relatedTarget)) return;
        setDragging(false);
    };

    // Cancel the upload of a specific file
    const cancelUpload = (id: number) => {
        controllers.current.get(id)?.abort();
        updateEntry(id, {status: "cancelled"});
    };

    const reset = () => {
        controllers.current.forEach((controller) => controller.abort());
        controllers.current.clear();
        setEntries([]);
    };

    return (
        <div className={`w-full p-8 mb-4 flex flex-col items-center gap-5 justify-center ${className}`}>
            <div className="flex flex-col justify-center items-center w-full">
                {/* Drop Zone */}
                <div
                    className={`border-2 p-6 rounded-lg dark:bg-slate-800 dark:border-slate-600 w-full h-64 flex flex-col justify-center items-center bg-white  ${
                        dragging
                            ? "border-dashed border-blue-400 !bg-blue-100"
                            : "border-gray-200 border-dashed"
                    } transition-colors duration-300 ease-in-out`}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragEnter={() => setDragging(true)}
                    onDragLeave={handleDragLeave}
                >
                    <img src={illustrationSrc} alt="" className="w-[100px]"/>
                    <label
                        htmlFor={inputId}
                        className="font-[500] dark:text-[#abc2d3] text-center text-gray-700 text-[1rem]"
                    >
                        <span className="underline cursor-pointer">{browseLabel}</span> {dropLabel}
                    </label>
                    <p className="text-[0.8rem] dark:text-[#abc2d3]/60 text-gray-500 mt-2">
                        {hint ?? `Maximum file size ${Math.round(maxFileSize / (1024 * 1024))} MB.`}
                    </p>
                    <input
                        id={inputId}
                        type="file"
                        accept={accept}
                        className="hidden"
                        onChange={handleSelect}
                        multiple
                    />
                </div>

                {/* Uploading list */}
                <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                    {entries.map((entry) => {
                        const error = STATUS_ERRORS[entry.status];

                        return (
                            <li
                                key={entry.id}
                                className="relative p-3 rounded-lg dark:bg-slate-800 dark:border-slate-600 bg-gray-50 border border-gray-200"
                            >
                                <div className="flex flex-col">
                                    <div className="flex items-start justify-between w-full mb-1">
                                        <div className="flex items-start gap-[10px] min-w-0">
                                            <CiImageOn
                                                aria-hidden
                                                className="shrink-0 bg-white dark:bg-slate-900/80 dark:border-slate-600 rounded-md p-1 border border-gray-200 text-[1.7rem] text-gray-500"/>
                                            <div className="min-w-0">
                                                <p className="text-gray-700 font-[500] text-[0.9rem] leading-[20px] sm:leading-[9px] dark:text-[#abc2d3] sm:mt-0.5 break-all">
                                                    {entry.file.name}
                                                </p>
                                                <span className="text-[0.6rem] text-gray-400">
                                                    {formatFileSize(entry.file.size)}
                                                </span>
                                            </div>
                                        </div>
                                        {entry.status === "uploading" && (
                                            <button
                                                type="button"
                                                onClick={() => cancelUpload(entry.id)}
                                                aria-label={`Cancel upload of ${entry.file.name}`}
                                                className="text-gray-500 hover:text-red-500"
                                            >
                                                <RxCross2 aria-hidden/>
                                            </button>
                                        )}

                                        {entry.status === "uploaded" && (
                                            <IoMdDoneAll aria-label="Uploaded" className="shrink-0 text-green-600 text-[1.1rem]"/>
                                        )}
                                    </div>
                                    {error ? (
                                        <p className="text-[0.8rem] text-red-600">{error}</p>
                                    ) : (
                                        <div className="flex items-center justify-between gap-[8px]">
                                            <div
                                                role="progressbar"
                                                aria-label={`Upload progress for ${entry.file.name}`}
                                                aria-valuemin={0}
                                                aria-valuemax={100}
                                                aria-valuenow={entry.progress}
                                                className="w-full dark:bg-slate-800 bg-white h-1.5 rounded-lg overflow-hidden"
                                            >
                                                <div
                                                    className="bg-blue-500 h-full transition-all duration-300"
                                                    style={{width: `${entry.progress}%`}}
                                                />
                                            </div>
                                            <span className="text-[0.7rem] mb-0.5 dark:text-[#abc2d3] text-gray-500">
                                                {entry.progress}%
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>

            {entries.length > 0 && (
                <button
                    type="button"
                    onClick={reset}
                    className="py-2 px-6 bg-red-500 rounded-md text-white"
                >
                    {resetLabel}
                </button>
            )}
        </div>
    );
};
