import {useEffect, useId, useRef} from "react";
import type {ReactNode, RefObject} from "react";
import {RxCross1} from "react-icons/rx";

export interface ConsentModalProps {
    /** Whether the modal is shown. Keep this in your own state and set it from your trigger button. */
    open: boolean;
    /** Called by the close button, both actions and the Escape key. */
    onClose: () => void;
    /** Called when the accept button is pressed, right before the modal closes. */
    onAccept?: () => void;
    /** Called when the decline button is pressed, right before the modal closes. */
    onDecline?: () => void;
    title: ReactNode;
    /** Terms or permission text. Paragraphs are spaced apart automatically. */
    children: ReactNode;
    acceptLabel?: string;
    declineLabel?: string;
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

/** A modal that asks the user to accept or decline terms or a permission request. */
export const ConsentModal = ({
    open,
    onClose,
    onAccept,
    onDecline,
    title,
    children,
    acceptLabel = "I accept",
    declineLabel = "Decline",
    closeLabel = "Close",
    className = "",
}: ConsentModalProps) => {
    const panelRef = useRef<HTMLDivElement>(null);
    const titleId = useId();
    useModalFocus(open, onClose, panelRef);

    const accept = () => {
        onAccept?.();
        onClose();
    };

    const decline = () => {
        onDecline?.();
        onClose();
    };

    return (
        <div
            className={`${
                open ? " visible" : " invisible"
            } w-full h-screen fixed top-0 left-0 z-[200000000] dark:bg-black/40 bg-[#0000002a] transition-all duration-300 flex items-center justify-center ${className}`}
        >
            <div
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                tabIndex={-1}
                className={`${
                    open ? " scale-[1] opacity-100" : " scale-[0] opacity-0"
                } w-[90%] sm:w-[80%] md:w-[60%] dark:bg-slate-800 bg-[#fff] rounded-lg transition-all duration-300 mx-auto mt-8 focus:outline-none`}
            >
                <div className="w-full flex items-end p-4 justify-between dark:border-slate-700 border-b border-[#d1d1d1]">
                    <h2 id={titleId} className="text-[1.5rem] font-bold dark:text-[#abc2d3]">
                        {title}
                    </h2>
                    <button type="button" aria-label={closeLabel} onClick={onClose} className="flex shrink-0 rounded-full">
                        <RxCross1
                            aria-hidden
                            className="p-2 text-[2.5rem] dark:text-[#abc2d3]/70 dark:hover:bg-slate-900/50 hover:bg-[#e7e7e7] rounded-full transition-all duration-300 cursor-pointer"
                        />
                    </button>
                </div>

                <div className="p-4 border-b dark:border-slate-700 border-[#d1d1d1] space-y-8 text-[1.2rem] dark:text-[#abc2d3] text-[#424242]">
                    {children}
                </div>

                <div className="flex items-center gap-4 p-4">
                    <button type="button" className="py-2 px-4 rounded-md outline-none bg-[#3B9DF8] text-[#fff]" onClick={accept}>
                        {acceptLabel}
                    </button>
                    <button
                        type="button"
                        className="py-2 px-4 dark:border-slate-700 dark:text-[#abc2d3] dark:hover:bg-slate-900/50 hover:bg-gray-100 border border-[#d1d1d1] rounded-md outline-none text-[#353535]"
                        onClick={decline}
                    >
                        {declineLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};
