import {useEffect, useId, useRef} from "react";
import type {ReactNode, RefObject} from "react";
import {RxCross1} from "react-icons/rx";

export interface InfoModalProps {
    /** Whether the modal is shown. Keep this in your own state and set it from your trigger button. */
    open: boolean;
    /** Called by the close button, Cancel, Confirm and the Escape key. */
    onClose: () => void;
    /** Called when Confirm is pressed, right before the modal closes. */
    onConfirm?: () => void;
    title: ReactNode;
    /** Body of the modal. */
    children: ReactNode;
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

/** A modal with a header, body and actions that slides down from the top of the page. */
export const InfoModal = ({
    open,
    onClose,
    onConfirm,
    title,
    children,
    cancelLabel = "Cancel",
    confirmLabel = "Confirm",
    closeLabel = "Close",
    className = "",
}: InfoModalProps) => {
    const panelRef = useRef<HTMLDivElement>(null);
    const titleId = useId();
    useModalFocus(open, onClose, panelRef);

    const confirm = () => {
        onConfirm?.();
        onClose();
    };

    return (
        <div
            className={`${
                open ? " visible" : " invisible"
            } w-full h-screen fixed top-0 left-0 z-[200000000] dark:bg-black/40 bg-[#0000002a] transition-all duration-300 ${className}`}
        >
            <div
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                tabIndex={-1}
                className={`${
                    open ? " translate-y-[0px] opacity-100" : " translate-y-[-200px] opacity-0"
                } w-[80%] sm:w-[90%] md:w-[40%] bg-[#fff] dark:bg-slate-800 rounded-lg transition-all duration-300 mx-auto mt-8 focus:outline-none`}
            >
                <div className="w-full flex items-end p-4 justify-between dark:border-slate-700 border-b border-[#d1d1d1]">
                    <h2 id={titleId} className="text-[1.5rem] dark:text-[#abc2d3] font-bold">
                        {title}
                    </h2>
                    <button type="button" aria-label={closeLabel} onClick={onClose} className="flex shrink-0 rounded-full">
                        <RxCross1
                            aria-hidden
                            className="p-2 text-[2.5rem] dark:text-[#abc2d3]/70 dark:hover:bg-slate-900/50 hover:bg-[#e7e7e7] rounded-full transition-all duration-300 cursor-pointer"
                        />
                    </button>
                </div>

                <div className="p-4 border-b dark:border-slate-700 border-[#d1d1d1] text-[1rem] dark:text-[#abc2d3] text-[#424242]">
                    {children}
                </div>

                <div className="flex items-end justify-end gap-4 p-4">
                    <button
                        type="button"
                        className="py-2 px-4 dark:hover:bg-slate-900/50 hover:bg-gray-100 border dark:text-[#abc2d3] dark:border-slate-700 border-[#d1d1d1] rounded-md outline-none text-[#353535]"
                        onClick={onClose}
                    >
                        {cancelLabel}
                    </button>
                    <button
                        type="button"
                        className="py-2 px-4 border dark:border-slate-800 border-[#d1d1d1] rounded-md outline-none bg-[#3B9DF8] text-[#fff]"
                        onClick={confirm}
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};
