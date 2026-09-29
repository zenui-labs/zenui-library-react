import {useCallback, useEffect, useRef, useState} from "react";
import type {ComponentType} from "react";
import {animate, AnimatePresence, motion, MotionConfig, useMotionValue} from "framer-motion";
import type {AnimationPlaybackControls, PanInfo} from "framer-motion";
import {LuCheck, LuInfo, LuX} from "react-icons/lu";

export type ToastTone = "success" | "error" | "info";

export interface ToastItem {
    /** Unique per toast. */
    id: number;
    tone: ToastTone;
    title: string;
    detail: string;
}

const toneStyles: Record<ToastTone, {icon: ComponentType<{className?: string}>; badge: string; bar: string}> = {
    success: {icon: LuCheck, badge: "bg-emerald-500 text-white", bar: "bg-emerald-500"},
    error: {icon: LuX, badge: "bg-red-500 text-white", bar: "bg-red-500"},
    info: {icon: LuInfo, badge: "bg-sky-500 text-white", bar: "bg-sky-500"},
};

const TOAST_HEIGHT = 68;
const GAP = 10;

interface ToastProps {
    toast: ToastItem;
    index: number;
    expanded: boolean;
    duration: number;
    maxVisible: number;
    onDismiss: (id: number) => void;
}

const Toast = ({toast, index, expanded, duration, maxVisible, onDismiss}: ToastProps) => {
    const style = toneStyles[toast.tone];
    const Icon = style.icon;
    const progress = useMotionValue(1);
    const controls = useRef<AnimationPlaybackControls | null>(null);

    // Each toast runs its own countdown. It pauses while the stack is expanded.
    useEffect(() => {
        controls.current = animate(progress, 0, {duration, ease: "linear", onComplete: () => onDismiss(toast.id)});
        return () => controls.current?.stop();
    }, [progress, onDismiss, toast.id, duration]);

    useEffect(() => {
        if (expanded) controls.current?.pause();
        else controls.current?.play();
    }, [expanded]);

    const hidden = index >= maxVisible;
    const collapsedY = -index * 12;
    const expandedY = -index * (TOAST_HEIGHT + GAP);

    const handleDragEnd = (_: PointerEvent | MouseEvent | TouchEvent, info: PanInfo) => {
        if (Math.abs(info.offset.x) > 90 || Math.abs(info.velocity.x) > 500) onDismiss(toast.id);
    };

    return (
        <motion.li
            initial={{opacity: 0, y: 48, scale: 0.96}}
            animate={{
                opacity: hidden ? 0 : 1,
                y: expanded ? expandedY : collapsedY,
                scale: expanded ? 1 : 1 - index * 0.05,
            }}
            exit={{opacity: 0, scale: 0.9, transition: {duration: 0.18}}}
            transition={{type: "spring", stiffness: 380, damping: 34}}
            drag="x"
            dragSnapToOrigin
            dragElastic={0.6}
            onDragEnd={handleDragEnd}
            style={{zIndex: 50 - index, height: TOAST_HEIGHT, originY: 1}}
            aria-hidden={hidden || undefined}
            className="absolute inset-x-0 bottom-0 flex cursor-grab touch-pan-y items-center gap-3 overflow-hidden rounded-2xl border border-gray-200 bg-white px-3.5 shadow-lg shadow-gray-900/5 active:cursor-grabbing dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/30"
        >
            <span aria-hidden="true" className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${style.badge}`}>
                <Icon className="h-4 w-4"/>
            </span>
            <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">{toast.title}</p>
                <p className="truncate text-xs text-gray-500 dark:text-slate-400">{toast.detail}</p>
            </div>
            <button
                type="button"
                onClick={() => onDismiss(toast.id)}
                tabIndex={hidden ? -1 : 0}
                aria-label={`Dismiss "${toast.title}"`}
                className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-slate-500 dark:hover:bg-slate-800 dark:hover:text-slate-200"
            >
                <LuX className="h-4 w-4" aria-hidden="true"/>
            </button>
            <motion.span aria-hidden="true" style={{scaleX: progress}} className={`absolute bottom-0 left-0 h-0.5 w-full origin-left opacity-60 ${style.bar}`}/>
        </motion.li>
    );
};

export interface ToastStackProps {
    /** Toasts to show, newest first. */
    toasts: ToastItem[];
    /** Called when a toast times out, is swiped away or its close button is pressed. */
    onDismiss: (id: number) => void;
    /** Seconds each toast stays up while the stack is collapsed. */
    duration?: number;
    /** How many toasts show before older ones fade out. */
    maxVisible?: number;
    /** Accessible name for the notifications region. */
    label?: string;
    className?: string;
}

// Toasts stack on top of each other like cards. Hover or focus the stack to fan it out
// and pause the timers, and swipe a toast sideways to dismiss it.
export const ToastStack = ({toasts, onDismiss, duration = 5, maxVisible = 3, label = "Notifications", className = ""}: ToastStackProps) => {
    const [hovered, setHovered] = useState(false);
    const [focused, setFocused] = useState(false);

    // Stable identity so each toast's countdown effect does not restart when the parent re-renders.
    const onDismissRef = useRef(onDismiss);
    onDismissRef.current = onDismiss;
    const dismiss = useCallback((id: number) => onDismissRef.current(id), []);

    const expanded = (hovered || focused) && toasts.length > 0;

    return (
        <MotionConfig reducedMotion="user">
            <section aria-label={label} className={`relative ${className}`}>
                <ol
                    aria-live="polite"
                    onPointerEnter={() => setHovered(true)}
                    onPointerLeave={() => setHovered(false)}
                    onFocus={() => setFocused(true)}
                    onBlur={(event) => {
                        if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
                    }}
                    className="relative"
                    style={{height: expanded ? Math.min(toasts.length, maxVisible) * (TOAST_HEIGHT + GAP) : TOAST_HEIGHT + 24}}
                >
                    <AnimatePresence initial={false}>
                        {toasts.map((toast, index) => (
                            <Toast
                                key={toast.id}
                                toast={toast}
                                index={index}
                                expanded={expanded}
                                duration={duration}
                                maxVisible={maxVisible}
                                onDismiss={dismiss}
                            />
                        ))}
                    </AnimatePresence>
                </ol>
            </section>
        </MotionConfig>
    );
};
