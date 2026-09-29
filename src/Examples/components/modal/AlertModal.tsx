import {useEffect, useId, useRef} from "react";
import type {ReactNode, RefObject} from "react";
import {RxCross1} from "react-icons/rx";

export interface AlertModalProps {
    /** Whether the modal is shown. Keep this in your own state and set it from your trigger button. */
    open: boolean;
    /** Called by the close button, Cancel, Confirm and the Escape key. */
    onClose: () => void;
    /** Called when Confirm is pressed, right before the modal closes. */
    onConfirm?: () => void;
    title?: ReactNode;
    description?: ReactNode;
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

/** A small confirmation modal that scales in over the page. */
export const AlertModal = ({
    open,
    onClose,
    onConfirm,
    title = "Are you sure about it?",
    description = "You can't undo this action.",
    cancelLabel = "Cancel",
    confirmLabel = "Confirm",
    closeLabel = "Close",
    className = "",
}: AlertModalProps) => {
    const panelRef = useRef<HTMLDivElement>(null);
    const titleId = useId();
    const descriptionId = useId();
    useModalFocus(open, onClose, panelRef);

    const confirm = () => {
        onConfirm?.();
        onClose();
    };

    return (
        <div
            className={`${
                open ? " visible scale-[1] opacity-100" : " invisible scale-[0] opacity-0"
            } w-full h-screen fixed top-0 left-0 z-[200000000] dark:bg-black/40 bg-[#0000002a] flex items-center justify-center transition-all duration-300 ${className}`}
        >
            <div
                ref={panelRef}
                role="alertdialog"
                aria-modal="true"
                aria-labelledby={titleId}
                aria-describedby={descriptionId}
                tabIndex={-1}
                className="w-[90%] md:w-[30%] dark:bg-slate-800 bg-[#fff] rounded-lg p-4 focus:outline-none"
            >
                <div className="w-full flex justify-between">
                    <div>
                        <h2 id={titleId} className="text-[1.7rem] dark:text-[#abc2d3] font-[500] text-[#202020]">
                            {title}
                        </h2>
                        <p id={descriptionId} className="text-[1rem] dark:text-[#abc2d3]/80 text-[#525252]">
                            {description}
                        </p>
                    </div>

                    <button type="button" aria-label={closeLabel} onClick={onClose} className="flex shrink-0 rounded-full">
                        <RxCross1
                            aria-hidden
                            className="p-2 text-[2.5rem] dark:text-[#abc2d3]/80 dark:hover:bg-slate-900/70 hover:bg-[#e7e7e7] rounded-full transition-all duration-300 cursor-pointer"
                        />
                    </button>
                </div>

                <div className="flex items-center gap-2 md:gap-3 w-full justify-end mt-6">
                    <button
                        type="button"
                        className="px-4 py-2 dark:hover:bg-slate-900/50 hover:bg-gray-100 border dark:border-slate-700 dark:text-[#abc2d3] border-[#a8a8a8] rounded-lg text-[#585858]"
                        onClick={onClose}
                    >
                        {cancelLabel}
                    </button>
                    <button type="button" className="px-4 py-2 bg-[#3B9DF8] rounded-lg text-[#fff]" onClick={confirm}>
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};
