import {useEffect, useId, useRef} from "react";
import type {ComponentType, ReactNode, RefObject} from "react";
import {RxCross1} from "react-icons/rx";
import {IoCheckmarkDoneCircleOutline} from "react-icons/io5";

export interface SuccessModalProps {
    /** Whether the modal is shown. Keep this in your own state and set it from your trigger button. */
    open: boolean;
    /** Called by the close button and the Escape key. */
    onClose: () => void;
    title?: ReactNode;
    /** Text under the icon. */
    message?: ReactNode;
    icon?: ComponentType<{className?: string}>;
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

const defaultMessage = (
    <>
        Thank you for <br/>
        <span className="font-[600]">subscribing</span>
    </>
);

/** A modal that scales in to confirm that an action has completed. */
export const SuccessModal = ({
    open,
    onClose,
    title = "Success",
    message = defaultMessage,
    icon: Icon = IoCheckmarkDoneCircleOutline,
    closeLabel = "Close",
    className = "",
}: SuccessModalProps) => {
    const panelRef = useRef<HTMLDivElement>(null);
    const titleId = useId();
    useModalFocus(open, onClose, panelRef);

    return (
        <div
            className={`${
                open ? " visible" : " invisible"
            } w-full h-screen fixed top-0 left-0 z-[200000000] dark:bg-black/40 bg-[#0000002a] flex items-center justify-center transition-all duration-300 ${className}`}
        >
            <div
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                tabIndex={-1}
                className={`${
                    open ? " scale-[1] opacity-100" : " scale-[0] opacity-0"
                } w-[90%] sm:w-[80%] md:w-[30%] dark:bg-slate-800 bg-[#fff] rounded-lg p-4 transition-all duration-300 focus:outline-none`}
            >
                <div className="w-full flex items-end justify-end">
                    <button type="button" aria-label={closeLabel} onClick={onClose} className="flex shrink-0 rounded-full">
                        <RxCross1
                            aria-hidden
                            className="p-2 text-[2.5rem] dark:text-[#abc2d3]/70 dark:hover:bg-slate-900/50 hover:bg-[#e7e7e7] rounded-full transition-all duration-300 cursor-pointer"
                        />
                    </button>
                </div>

                <div className="w-full flex items-center justify-center flex-col">
                    <h2 id={titleId} className="text-[#2cac9f] text-[2rem] font-[500]">
                        {title}
                    </h2>
                    <Icon className="p-2 text-[6rem] text-[#2cac9f]"/>

                    <p className="text-[1.5rem] text-gray-900 dark:text-[#abc2d3] text-center mt-4 mb-2">{message}</p>
                </div>
            </div>
        </div>
    );
};
