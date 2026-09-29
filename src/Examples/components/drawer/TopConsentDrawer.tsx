import {useEffect, useId, useRef} from "react";
import type {ReactNode, RefObject} from "react";

export interface TopConsentDrawerProps {
    /** Whether the drawer is shown. Keep this in your own state and set it from your trigger button. */
    open: boolean;
    /** Called by Accept, Decline, the Escape key and a click outside the drawer. */
    onClose: () => void;
    /** Called when Accept is pressed, right before the drawer closes. */
    onAccept?: () => void;
    /** Called when Decline is pressed, right before the drawer closes. */
    onDecline?: () => void;
    message?: ReactNode;
    acceptLabel?: string;
    declineLabel?: string;
    /** Accessible name of the drawer. */
    label?: string;
    className?: string;
}

// Moves focus into the drawer while it is open, closes it on Escape and gives focus back afterwards.
const useDrawerFocus = (open: boolean, onClose: () => void, focusRef: RefObject<HTMLElement>) => {
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

const defaultMessage =
    "This site uses cookies and related technologies, as described in our privacy policy, for purposes that may include site operation, analytics, enhanced user experience, or advertising. You may choose to consent to our use of these technologies, or manage your own preferences.";

/** A cookie consent drawer that slides down from the top of the screen. */
export const TopConsentDrawer = ({
    open,
    onClose,
    onAccept,
    onDecline,
    message = defaultMessage,
    acceptLabel = "Accept",
    declineLabel = "Decline",
    label = "Cookie consent",
    className = "",
}: TopConsentDrawerProps) => {
    const panelRef = useRef<HTMLDivElement>(null);
    const messageId = useId();
    useDrawerFocus(open, onClose, panelRef);

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
            // A click on the backdrop, outside the panel, closes the drawer.
            onClick={(event) => {
                if (event.target === event.currentTarget) onClose();
            }}
            className={`${
                open ? " visible" : " invisible"
            } w-full h-screen fixed flex items-start justify-start top-0 left-0 z-[200000000] dark:bg-black/40 transition-all duration-300 ${className}`}
        >
            <div
                ref={panelRef}
                role="dialog"
                aria-modal="true"
                aria-label={label}
                aria-describedby={messageId}
                tabIndex={-1}
                className={`${
                    open ? " translate-y-[0px] opacity-100" : " translate-y-[-200px] opacity-0"
                } w-full dark:bg-slate-800 bg-[#fff] transition-all shadow-[0px_0px_20px_0px_rgb(0,0,0,0.2)] duration-300 mx-auto focus:outline-none`}
            >
                <div className="flex md:flex-row flex-col justify-between w-full gap-5 px-8 py-10">
                    <p id={messageId} className="text-[1.2rem] dark:text-[#abc2d3] text-[#424242] w-full md:w-[70%]">
                        {message}
                    </p>

                    <div className="flex items-end justify-end gap-4 flex-col lg:flex-row w-full md:w-[20%]">
                        <button
                            type="button"
                            className="py-2 w-full px-4 dark:border-slate-800 border border-[#d1d1d1] rounded-md outline-none focus-visible:ring-2 focus-visible:ring-[#3B9DF8]/40 bg-[#3B9DF8] text-[#fff]"
                            onClick={accept}
                        >
                            {acceptLabel}
                        </button>
                        <button
                            type="button"
                            className="py-2 w-full dark:border-slate-700 dark:text-[#abc2d3] dark:hover:bg-slate-900/50 hover:bg-gray-100 px-4 border border-[#d1d1d1] rounded-md outline-none focus-visible:ring-2 focus-visible:ring-[#3B9DF8]/40 text-[#353535]"
                            onClick={decline}
                        >
                            {declineLabel}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
