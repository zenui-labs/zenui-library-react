import {useEffect, useId, useRef} from "react";
import type {ReactNode, RefObject} from "react";
import {RxCross1} from "react-icons/rx";

export interface FocusedModalProps {
    /** Whether the modal is shown. Keep this in your own state and set it from your trigger button. */
    open: boolean;
    /** Called by the close button, Cancel, the confirm button and the Escape key. */
    onClose: () => void;
    /** Called when the confirm button is pressed, right before the modal closes. */
    onConfirm?: () => void;
    title: ReactNode;
    /** Short line under the title. */
    subtitle?: ReactNode;
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

/** A modal over a blurred, frosted glass backdrop, so the page stays visible but out of focus. */
export const FocusedModal = ({
    open,
    onClose,
    onConfirm,
    title,
    subtitle,
    children,
    cancelLabel = "Cancel",
    confirmLabel = "Continue",
    closeLabel = "Close",
    className = "",
}: FocusedModalProps) => {
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
                open ? "visible" : "invisible"
            } w-full h-screen fixed top-0 left-0 z-[200000000] backdrop-blur-md dark:bg-black/50 bg-white/30 flex items-center justify-center transition-all duration-300 ${className}`}
        >
            <div
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                tabIndex={-1}
                className={`${
                    open ? "scale-[1] opacity-100" : "scale-[0] opacity-0"
                } w-[90%] md:w-[35%] dark:bg-slate-800 bg-white/90 backdrop-blur-xl border dark:border-slate-700 border-gray-200 rounded-lg p-5 shadow-2xl transition-all duration-300 focus:outline-none`}
            >
                <div className="w-full flex justify-between items-start">
                    <div>
                        <h2 id={titleId} className="text-[1.7rem] dark:text-[#abc2d3] font-[600] text-[#202020]">
                            {title}
                        </h2>
                        {subtitle && <p className="text-[1rem] dark:text-[#abc2d3]/80 text-[#525252] mt-1">{subtitle}</p>}
                    </div>

                    <button type="button" aria-label={closeLabel} onClick={onClose} className="flex shrink-0 rounded-full">
                        <RxCross1
                            aria-hidden
                            className="p-2 text-[2.5rem] dark:text-[#abc2d3]/80 dark:hover:bg-slate-900/70 hover:bg-gray-100 rounded-full transition-all duration-300 cursor-pointer"
                        />
                    </button>
                </div>

                <div className="mt-6 text-[1rem] dark:text-[#abc2d3]/90 text-gray-700 leading-relaxed">{children}</div>

                <div className="flex items-center gap-2 md:gap-3 w-full justify-end mt-8">
                    <button
                        type="button"
                        className="px-5 py-2.5 dark:hover:bg-slate-900/50 hover:bg-gray-100 border dark:border-slate-700 dark:text-[#abc2d3] border-gray-300 rounded-lg text-[#585858] font-[500] transition-all duration-200"
                        onClick={onClose}
                    >
                        {cancelLabel}
                    </button>
                    <button
                        type="button"
                        className="px-5 py-2.5 bg-[#3B9DF8] rounded-lg text-white font-[500] hover:opacity-90 transition-all duration-200"
                        onClick={confirm}
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};
