import {useEffect, useId, useRef} from "react";

export interface AlertDialogProps {
    open: boolean;
    /** Called when the dialog should close: Cancel, a click on the backdrop, Escape, or after Confirm. */
    onClose: () => void;
    /** Called when Confirm is pressed, before `onClose`. */
    onConfirm?: () => void;
    title?: string;
    message?: string;
    cancelLabel?: string;
    confirmLabel?: string;
    className?: string;
}

/** A small modal that asks the user to confirm an action. Cancel gets focus first, so Enter never confirms by accident. */
export const AlertDialog = ({
    open,
    onClose,
    onConfirm,
    title = "Delete item",
    message = "Are you sure you want to delete this? This action cannot be undone.",
    cancelLabel = "Cancel",
    confirmLabel = "Confirm",
    className = "",
}: AlertDialogProps) => {
    const titleId = useId();
    const messageId = useId();
    const cancelRef = useRef<HTMLButtonElement>(null);
    // Kept in a ref so a new onClose function on each render does not rerun the focus effect.
    const onCloseRef = useRef(onClose);

    useEffect(() => {
        onCloseRef.current = onClose;
    });

    // Moves focus to Cancel, closes on Escape, and returns focus to the opener when the dialog closes.
    useEffect(() => {
        if (!open) return;
        const opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        cancelRef.current?.focus();
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") onCloseRef.current();
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
            opener?.focus();
        };
    }, [open]);

    if (!open) return null;

    const handleConfirm = () => {
        onConfirm?.();
        onClose();
    };

    return (
        <div className="bg-[#00000027] z-[2000000000] fixed flex items-center justify-center top-0 left-0 w-full h-screen">
            <div
                aria-hidden="true"
                className="absolute top-0 left-0 h-full w-full cursor-pointer backdrop-blur-[2px]"
                onClick={onClose}
            />
            <div
                role="alertdialog"
                aria-modal="true"
                aria-labelledby={titleId}
                aria-describedby={messageId}
                className={`max-w-md w-[90vw] dark:bg-slate-800 h-auto bg-white rounded relative z-10 px-4 py-3 ${className}`}
            >
                <h2 id={titleId} className="font-semibold dark:text-[#abc2d3] text-xl mb-2">
                    {title}
                </h2>
                <p id={messageId} className="text-gray-600 dark:text-slate-400 mb-2">
                    {message}
                </p>
                <div className="w-full flex items-center justify-end gap-2">
                    <button
                        ref={cancelRef}
                        type="button"
                        className="font-semibold px-1.5 dark:hover:bg-red-800/20 py-1 hover:bg-gray-100 rounded text-sm uppercase text-red-500"
                        onClick={onClose}
                    >
                        {cancelLabel}
                    </button>
                    <button
                        type="button"
                        className="font-semibold px-1.5 dark:hover:bg-blue-800/20 py-1 hover:bg-gray-100 rounded text-sm uppercase text-blue-600"
                        onClick={handleConfirm}
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};
