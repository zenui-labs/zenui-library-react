import {useEffect, useRef} from "react";
import type {ComponentType} from "react";
import {BiError} from "react-icons/bi";
import {MdOutlineDone} from "react-icons/md";
import {RxCross1} from "react-icons/rx";

export type PushNotificationVariant = "success" | "error";

const variantIcons: Record<PushNotificationVariant, {icon: ComponentType<{className?: string}>; className: string}> = {
    success: {icon: MdOutlineDone, className: "mt-0.5 rounded-full border border-green-500 p-0.5 text-[1.3rem] text-green-500"},
    error: {icon: BiError, className: "mt-0.5 text-[1.2rem] text-red-500"},
};

export interface PushNotificationProps {
    open: boolean;
    /** Called by the close button or when `autoCloseAfter` runs out. Set `open` to false here. */
    onClose: () => void;
    title: string;
    message?: string;
    /** Picks the icon and its color. */
    variant?: PushNotificationVariant;
    /** Replaces the variant icon. */
    icon?: ComponentType<{className?: string}>;
    /** Closes the notification after this many milliseconds. Leave it out to keep it open until closed. */
    autoCloseAfter?: number;
    /** Shows a close button on hover and keyboard focus. */
    dismissible?: boolean;
    /** Accessible name for the close button. */
    closeLabel?: string;
    className?: string;
}

/**
 * A toast fixed to the bottom left corner that slides up while `open` is true. It can close itself after a delay,
 * show a close button, or both. Adjust `z-index` and the position classes to fit your layout.
 */
export const PushNotification = ({
    open,
    onClose,
    title,
    message,
    variant = "success",
    icon,
    autoCloseAfter,
    dismissible = true,
    closeLabel = "Close notification",
    className = "",
}: PushNotificationProps) => {
    const onCloseRef = useRef(onClose);
    const Icon = icon ?? variantIcons[variant].icon;

    useEffect(() => {
        onCloseRef.current = onClose;
    }, [onClose]);

    useEffect(() => {
        if (!open || autoCloseAfter === undefined) return;
        const timer = window.setTimeout(() => onCloseRef.current(), autoCloseAfter);
        return () => window.clearTimeout(timer);
    }, [open, autoCloseAfter]);

    return (
        <div
            role="status"
            className={`${
                open ? "translate-y-0" : "invisible translate-y-[100px]"
            } group fixed bottom-[20px] left-[20px] z-50 flex items-start justify-between gap-[10px] rounded-md border border-gray-200 bg-white px-5 py-4 text-[#424242] shadow-[0px_0px_7px_0px_#f2f2f2] transition-all duration-300 dark:border-slate-700 dark:bg-slate-800 dark:shadow-none ${className}`}
        >
            <div className={`flex items-start gap-[10px] ${dismissible ? "pr-[20px]" : ""}`}>
                <Icon className={variantIcons[variant].className}/>
                <div>
                    <h3 className="text-[1rem] font-[600] dark:text-[#abc2d3]">{title}</h3>
                    {message && <p className="text-[0.8rem] dark:text-slate-400">{message}</p>}
                </div>
            </div>

            {dismissible && (
                <button
                    type="button"
                    onClick={onClose}
                    aria-label={closeLabel}
                    className="absolute right-1 top-1 cursor-pointer rounded-full p-[5px] text-[1.4rem] leading-none text-gray-900 opacity-0 hover:bg-gray-50 focus-visible:opacity-100 group-hover:opacity-100 dark:text-slate-200 dark:hover:bg-slate-900/50 [@media(hover:none)]:opacity-100"
                >
                    <RxCross1 aria-hidden/>
                </button>
            )}
        </div>
    );
};
