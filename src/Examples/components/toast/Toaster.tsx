import {useCallback, useEffect, useRef, useState, type ComponentType} from "react";
import {MdOutlineDone, MdOutlineInfo} from "react-icons/md";
import {BiError} from "react-icons/bi";
import {IoWarningOutline} from "react-icons/io5";
import {RxCross1} from "react-icons/rx";

import {subscribeToToasts, type ToastData, type ToastType} from "./toast";

export type ToastPosition = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";

// Keyframes are injected once at runtime, so no tailwind.config changes are needed.
const STYLES = `
@keyframes toastSlideInRight   { from { transform: translateX(110%);  opacity: 0; } to { transform: translateX(0);     opacity: 1; } }
@keyframes toastSlideOutRight  { from { transform: translateX(0);     opacity: 1; } to { transform: translateX(110%);  opacity: 0; } }
@keyframes toastSlideInLeft    { from { transform: translateX(-110%); opacity: 0; } to { transform: translateX(0);     opacity: 1; } }
@keyframes toastSlideOutLeft   { from { transform: translateX(0);     opacity: 1; } to { transform: translateX(-110%); opacity: 0; } }
@keyframes toastSlideInTop     { from { transform: translateY(-110%); opacity: 0; } to { transform: translateY(0);     opacity: 1; } }
@keyframes toastSlideOutTop    { from { transform: translateY(0);     opacity: 1; } to { transform: translateY(-110%); opacity: 0; } }
@keyframes toastSlideInBottom  { from { transform: translateY(110%);  opacity: 0; } to { transform: translateY(0);     opacity: 1; } }
@keyframes toastSlideOutBottom { from { transform: translateY(0);     opacity: 1; } to { transform: translateY(110%);  opacity: 0; } }
`;

const injectStyles = () => {
    if (typeof document === "undefined" || document.querySelector("style[data-toast-styles]")) return;
    const tag = document.createElement("style");
    tag.dataset.toastStyles = "";
    tag.textContent = STYLES;
    document.head.appendChild(tag);
};

// Matches the length of the exit animation.
const EXIT_MS = 320;

type IconComponent = ComponentType<{className?: string; "aria-hidden"?: boolean}>;

const Spinner: IconComponent = ({className = ""}) => (
    <svg className={`animate-spin ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
    </svg>
);

const ICONS: Partial<Record<ToastType, {Icon: IconComponent; className: string}>> = {
    success: {Icon: MdOutlineDone, className: "text-green-500 text-[1.15rem]"},
    error: {Icon: BiError, className: "text-red-500 text-[1.15rem]"},
    warning: {Icon: IoWarningOutline, className: "text-yellow-500 text-[1.15rem]"},
    info: {Icon: MdOutlineInfo, className: "text-blue-500 text-[1.15rem]"},
    loading: {Icon: Spinner, className: "text-blue-500 w-[1.1rem] h-[1.1rem]"},
};

const BORDER: Record<ToastType, string> = {
    success: "border-l-green-500",
    error: "border-l-red-500",
    warning: "border-l-yellow-500",
    info: "border-l-blue-500",
    loading: "border-l-blue-500",
    default: "border-l-gray-300 dark:border-l-slate-600",
};

const POSITION_CLASS: Record<ToastPosition, string> = {
    "top-left": "top-5 left-5 items-start",
    "top-center": "top-5 left-1/2 -translate-x-1/2 items-center",
    "top-right": "top-5 right-5 items-end",
    "bottom-left": "bottom-5 left-5 items-start",
    "bottom-center": "bottom-5 left-1/2 -translate-x-1/2 items-center",
    "bottom-right": "bottom-5 right-5 items-end",
};

// The slide direction follows the position: sides slide in sideways, centers drop down or rise up.
const getAnimation = (position: ToastPosition, exiting: boolean) => {
    const direction = position.includes("right") ? "Right"
        : position.includes("left") ? "Left"
            : position.startsWith("top") ? "Top"
                : "Bottom";
    return `toastSlide${exiting ? "Out" : "In"}${direction} 0.3s ease forwards`;
};

const useToastStore = (toasterId: string | undefined) => {
    const [toasts, setToasts] = useState<ToastData[]>([]);
    const timers = useRef(new Set<ReturnType<typeof setTimeout>>());
    const scheduled = useRef(new Set<number>());

    const later = useCallback((run: () => void, ms: number) => {
        const timer = setTimeout(() => {
            timers.current.delete(timer);
            run();
        }, ms);
        timers.current.add(timer);
    }, []);

    const dismiss = useCallback((id: number) => {
        setToasts((prev) => prev.map((item) => (item.id === id ? {...item, exiting: true} : item)));
        later(() => setToasts((prev) => prev.filter((item) => item.id !== id)), EXIT_MS);
    }, [later]);

    useEffect(() => subscribeToToasts((event) => {
        if (event.kind === "add") {
            if (event.item.toasterId === toasterId) setToasts((prev) => [...prev, event.item]);
        } else if (event.kind === "dismiss") {
            dismiss(event.id);
        } else {
            setToasts((prev) => prev.map((item) => (item.id === event.id ? {...item, ...event.data} : item)));
        }
    }), [dismiss, toasterId]);

    // Starts one auto-dismiss timer per toast. A loading toast gets its timer once it settles.
    useEffect(() => {
        toasts.forEach((item) => {
            if (item.duration <= 0 || item.exiting || scheduled.current.has(item.id)) return;
            scheduled.current.add(item.id);
            later(() => dismiss(item.id), item.duration);
        });
    }, [toasts, dismiss, later]);

    useEffect(() => {
        const pending = timers.current;
        return () => {
            pending.forEach(clearTimeout);
            pending.clear();
        };
    }, []);

    return {toasts, dismiss};
};

interface ToastItemProps {
    toast: ToastData;
    position: ToastPosition;
    dismissLabel: string;
    onDismiss: (id: number) => void;
}

const ToastItem = ({toast, position, dismissLabel, onDismiss}: ToastItemProps) => {
    const icon = ICONS[toast.type];

    return (
        <div
            style={{animation: getAnimation(position, toast.exiting)}}
            className={`flex items-start gap-3 px-4 py-3 min-w-[280px] max-w-[340px] bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 border-l-4 ${BORDER[toast.type]} rounded-lg shadow-lg`}
        >
            {icon && <icon.Icon className={`${icon.className} shrink-0 mt-0.5`} aria-hidden/>}
            <div className="flex-1 min-w-0">
                <p className="text-[0.85rem] font-semibold dark:text-[#abc2d3] text-gray-800 leading-snug">{toast.message}</p>
                {toast.description && (
                    <p className="text-[0.75rem] dark:text-slate-400 text-gray-500 mt-0.5 leading-snug">{toast.description}</p>
                )}
                {toast.action && (
                    <button
                        type="button"
                        onClick={() => {
                            toast.action?.onClick();
                            onDismiss(toast.id);
                        }}
                        className="mt-1.5 text-[0.72rem] font-semibold text-blue-500 hover:underline"
                    >
                        {toast.action.label}
                    </button>
                )}
            </div>
            <button
                type="button"
                onClick={() => onDismiss(toast.id)}
                aria-label={dismissLabel}
                className="shrink-0 mt-0.5 text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300 transition-colors"
            >
                <RxCross1 className="text-[0.85rem]" aria-hidden/>
            </button>
        </div>
    );
};

export interface ToasterProps {
    position?: ToastPosition;
    /** Shows only toasts sent with the same `toasterId`. Leave it out when your app has one toaster. */
    toasterId?: string;
    /** Accessible name for the toast region. */
    label?: string;
    /** Accessible label for each close button. */
    dismissLabel?: string;
    className?: string;
}

/** Place once near the root of your app, then call toast() from anywhere. */
export const Toaster = ({
    position = "bottom-right",
    toasterId,
    label = "Notifications",
    dismissLabel = "Dismiss notification",
    className = "",
}: ToasterProps) => {
    const {toasts, dismiss} = useToastStore(toasterId);

    useEffect(() => {
        injectStyles();
    }, []);

    return (
        <section
            aria-live="polite"
            aria-label={label}
            className={`fixed ${POSITION_CLASS[position]} flex flex-col gap-2 z-[9999] pointer-events-none ${className}`}
        >
            {toasts.map((item) => (
                <div key={item.id} className="pointer-events-auto">
                    <ToastItem toast={item} position={position} dismissLabel={dismissLabel} onDismiss={dismiss}/>
                </div>
            ))}
        </section>
    );
};
