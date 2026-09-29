import {useEffect, useRef, useState} from "react";
import type {ComponentType} from "react";
import {MdOutlineDone} from "react-icons/md";

export interface ProgressNotificationProps {
    open: boolean;
    /** Called when the progress bar runs out. Set `open` to false here. */
    onClose: () => void;
    title: string;
    message?: string;
    icon?: ComponentType<{className?: string}>;
    /** Time in milliseconds before the notification closes itself. */
    duration?: number;
    className?: string;
}

/**
 * A notification fixed to the bottom left corner with a bar that empties while it is open. When the bar runs out,
 * `onClose` is called. Adjust `z-index` and the position classes to fit your layout.
 */
export const ProgressNotification = ({
    open,
    onClose,
    title,
    message,
    icon: Icon = MdOutlineDone,
    duration = 2000,
    className = "",
}: ProgressNotificationProps) => {
    const [progress, setProgress] = useState(100);
    const onCloseRef = useRef(onClose);

    useEffect(() => {
        onCloseRef.current = onClose;
    }, [onClose]);

    useEffect(() => {
        if (!open) {
            // Refill the bar once the slide out transition has finished.
            const reset = window.setTimeout(() => setProgress(100), 500);
            return () => window.clearTimeout(reset);
        }

        const start = Date.now();
        setProgress(100);
        const interval = window.setInterval(() => {
            const remaining = Math.max(0, 100 - ((Date.now() - start) / duration) * 100);
            setProgress(remaining);
            if (remaining <= 0) {
                window.clearInterval(interval);
                onCloseRef.current();
            }
        }, 20);

        return () => window.clearInterval(interval);
    }, [open, duration]);

    return (
        <div
            role="status"
            className={`${
                open ? "translate-y-0" : "invisible translate-y-[100px]"
            } fixed bottom-[20px] left-[20px] z-50 flex items-start justify-between gap-[10px] rounded-md bg-white px-5 py-4 text-[#424242] shadow-[0px_0px_7px_0px_#f2f2f2] transition-all duration-300 dark:border dark:border-slate-700 dark:bg-slate-800 dark:shadow-none ${className}`}
        >
            <div className="flex items-start gap-[10px]">
                <Icon className="mt-0.5 rounded-full border border-green-500 p-0.5 text-[1.3rem] text-green-500"/>
                <div>
                    <h3 className="text-[1rem] font-[600] dark:text-[#abc2d3]">{title}</h3>
                    {message && <p className="text-[0.8rem] dark:text-slate-400">{message}</p>}
                </div>
            </div>

            <div className="absolute bottom-0 left-0 h-[3px] rounded bg-green-500" style={{width: `${progress}%`}} aria-hidden/>
        </div>
    );
};
