import {useEffect, useId, useRef, useState} from "react";
import type {ReactNode, RefObject} from "react";
import {RxCross1} from "react-icons/rx";

export interface DeleteConfirmModalProps {
    /** Whether the modal is shown. Keep this in your own state and set it from your trigger button. */
    open: boolean;
    /** Called by the close button, Cancel, the delete button and the Escape key. */
    onClose: () => void;
    /** Called when the delete button is pressed, right before the modal closes. */
    onConfirm?: () => void;
    title?: ReactNode;
    message?: ReactNode;
    /** Text the user has to type, case sensitive, before the delete button turns on. */
    confirmText?: string;
    cancelLabel?: string;
    confirmLabel?: string;
    /** Accessible name of the close button. */
    closeLabel?: string;
    className?: string;
}

// Moves focus into the modal while it is open, closes it on Escape and gives focus back afterwards.
const useModalFocus = (open: boolean, onClose: () => void, focusRef: RefObject<HTMLElement>) => {
    const onCloseRef = useRef(onClose);
    onCloseRef.current = onClose;

    useEffect(() => {
        if (!open) return;
        const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        focusRef.current?.focus();
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") onCloseRef.current();
        };
        window.addEventListener("keydown", onKeyDown);
        return () => {
            window.removeEventListener("keydown", onKeyDown);
            previous?.focus();
        };
    }, [open, focusRef]);
};

/** A delete confirmation modal that keeps the delete button off until the user types `confirmText`. */
export const DeleteConfirmModal = ({
    open,
    onClose,
    onConfirm,
    title = "Delete item",
    message = "Are you sure you want to delete it?",
    confirmText = "DELETE",
    cancelLabel = "Cancel",
    confirmLabel = "Yes, delete",
    closeLabel = "Close",
    className = "",
}: DeleteConfirmModalProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [typed, setTyped] = useState("");
    const id = useId();
    const titleId = `${id}-title`;
    const messageId = `${id}-message`;
    const inputId = `${id}-input`;
    const disabled = typed !== confirmText;
    useModalFocus(open, onClose, inputRef);

    // Start empty on every open so the button is never already on.
    useEffect(() => {
        if (open) setTyped("");
    }, [open]);

    const confirm = () => {
        if (disabled) return;
        onConfirm?.();
        onClose();
    };

    return (
        <div
            className={`${
                open ? " visible" : " invisible"
            } w-full h-screen fixed top-0 left-0 z-[200000000] dark:bg-black/40 bg-[#0000002a] flex items-center justify-center transition-all duration-300 ${className}`}
        >
            <div
                role="alertdialog"
                aria-modal="true"
                aria-labelledby={titleId}
                aria-describedby={messageId}
                className={`${
                    open ? " scale-[1] opacity-100" : " scale-[0] opacity-0"
                } w-[90%] sm:w-[80%] md:w-[30%] dark:bg-slate-800 bg-[#fff] rounded-lg p-5 transition-all duration-300 z-[999]`}
            >
                <div className="w-full flex items-center justify-between">
                    <h2 id={titleId} className="text-[#000] dark:text-[#abc2d3] text-[1.3rem] font-[500]">
                        {title}
                    </h2>
                    <button type="button" aria-label={closeLabel} onClick={onClose} className="flex shrink-0 rounded-full">
                        <RxCross1
                            aria-hidden
                            className="p-2 text-[2rem] dark:text-slate-400 dark:hover:bg-slate-900/50 hover:bg-[#e7e7e7] rounded-full transition-all duration-300 cursor-pointer"
                        />
                    </button>
                </div>

                <div className="w-full">
                    <p id={messageId} className="text-[#424242] dark:text-slate-400 text-[1rem] font-[400]">
                        {message}
                    </p>

                    <div className="mt-5">
                        <label htmlFor={inputId} className="block font-[400] dark:text-[#abc2d3] text-black">
                            Type <b>&quot;{confirmText}&quot;</b> to confirm
                        </label>
                        <input
                            ref={inputRef}
                            id={inputId}
                            type="text"
                            autoComplete="off"
                            value={typed}
                            onChange={(event) => setTyped(event.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === "Enter") confirm();
                            }}
                            className="py-3 px-4 dark:bg-slate-900 dark:border-slate-700 dark:text-[#abc2d3] border border-gray-200 rounded-md mt-1 w-full outline-none focus:border-[#3B9DF8]"
                        />
                    </div>

                    <div className="mt-8 flex w-full items-end justify-end gap-[13px]">
                        <button
                            type="button"
                            onClick={onClose}
                            className="py-2 px-6 dark:border-slate-700 dark:text-[#abc2d3] dark:hover:bg-slate-700/50 rounded font-[500] z-10 border border-[#cecece] text-gray-500"
                        >
                            {cancelLabel}
                        </button>
                        <button
                            type="button"
                            onClick={confirm}
                            disabled={disabled}
                            className={`py-2 px-6 border rounded font-[500] ${
                                disabled
                                    ? "bg-[#FDECEB] dark:bg-red-800/30 dark:border-red-900/30 dark:text-slate-500 border-[#FDECEB] text-red-200 cursor-not-allowed"
                                    : "bg-red-600 text-white border-red-600"
                            }`}
                        >
                            {confirmLabel}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
