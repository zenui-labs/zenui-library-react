import {useEffect, useRef, useState} from "react";
import {animate, AnimatePresence, motion, MotionConfig, useMotionValue} from "framer-motion";
import type {AnimationPlaybackControls, PanInfo} from "framer-motion";
import type {IconType} from "react-icons";
import {LuCheck, LuInfo, LuUpload, LuX} from "react-icons/lu";

type Tone = "success" | "error" | "info";

interface ToastData {
    id: number;
    tone: Tone;
    title: string;
    detail: string;
}

const presets: Record<Tone, Omit<ToastData, "id">[]> = {
    success: [
        {tone: "success", title: "Post published", detail: "\"Designing for slow networks\" is live."},
        {tone: "success", title: "Changes saved", detail: "Billing details updated for Acme Studio."},
    ],
    error: [
        {tone: "error", title: "Upload failed", detail: "brand-guide.pdf is larger than 25 MB."},
        {tone: "error", title: "Calendar sync failed", detail: "Google Calendar needs you to sign in again."},
    ],
    info: [
        {tone: "info", title: "Link copied", detail: "Anyone with the link can view this file."},
        {tone: "info", title: "Invite sent", detail: "Tomás will get an email in a minute."},
    ],
};

const toneStyles: Record<Tone, {icon: IconType; badge: string; bar: string}> = {
    success: {icon: LuCheck, badge: "bg-emerald-500 text-white", bar: "bg-emerald-500"},
    error: {icon: LuX, badge: "bg-red-500 text-white", bar: "bg-red-500"},
    info: {icon: LuInfo, badge: "bg-sky-500 text-white", bar: "bg-sky-500"},
};

const DURATION = 5; // seconds
const TOAST_HEIGHT = 68;
const GAP = 10;
const MAX_VISIBLE = 3;

interface ToastProps {
    toast: ToastData;
    index: number;
    expanded: boolean;
    onDismiss: (id: number) => void;
}

const Toast = ({toast, index, expanded, onDismiss}: ToastProps) => {
    const style = toneStyles[toast.tone];
    const Icon = style.icon;
    const progress = useMotionValue(1);
    const controls = useRef<AnimationPlaybackControls | null>(null);

    // Each toast runs its own countdown. It pauses while the stack is expanded.
    useEffect(() => {
        controls.current = animate(progress, 0, {duration: DURATION, ease: "linear", onComplete: () => onDismiss(toast.id)});
        return () => controls.current?.stop();
    }, [progress, onDismiss, toast.id]);

    useEffect(() => {
        if (expanded) controls.current?.pause();
        else controls.current?.play();
    }, [expanded]);

    const hidden = index >= MAX_VISIBLE;
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
            <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${style.badge}`}>
                <Icon className="h-4 w-4" aria-hidden="true"/>
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

// Toasts stack on top of each other like cards. Hover or focus the stack to fan it out
// and pause the timers, and swipe a toast sideways to dismiss it.
const ToastStack = () => {
    const [toasts, setToasts] = useState<ToastData[]>([]);
    const [hovered, setHovered] = useState(false);
    const [focused, setFocused] = useState(false);
    const nextId = useRef(1);
    const counts = useRef<Record<Tone, number>>({success: 0, error: 0, info: 0});

    const push = (tone: Tone) => {
        const options = presets[tone];
        const preset = options[counts.current[tone]++ % options.length];
        setToasts((current) => [{...preset, id: nextId.current++}, ...current].slice(0, 6));
    };

    // Stable identity so each toast's countdown effect does not restart on every render.
    const dismissRef = useRef((id: number) => setToasts((current) => current.filter((toast) => toast.id !== id)));
    const dismiss = dismissRef.current;

    const expanded = (hovered || focused) && toasts.length > 0;

    const triggers: {tone: Tone; label: string; icon: IconType}[] = [
        {tone: "success", label: "Publish", icon: LuCheck},
        {tone: "error", label: "Upload", icon: LuUpload},
        {tone: "info", label: "Share", icon: LuInfo},
    ];

    return (
        <MotionConfig reducedMotion="user">
            <div className="relative flex h-[380px] w-full max-w-sm flex-col">
                <div className="flex flex-wrap justify-center gap-2">
                    {triggers.map(({tone, label, icon: Icon}) => (
                        <button
                            key={tone}
                            type="button"
                            onClick={() => push(tone)}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-3.5 py-2 text-sm font-medium text-gray-800 shadow-sm transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 active:scale-[0.98] dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
                        >
                            <Icon className="h-4 w-4 text-gray-400 dark:text-slate-500" aria-hidden="true"/>
                            {label}
                        </button>
                    ))}
                </div>
                <p className="mt-3 text-center text-xs text-gray-500 dark:text-slate-400">
                    {toasts.length ? "Hover the stack to expand it, swipe a toast to dismiss" : "Press a button to show a toast"}
                </p>

                <section aria-label="Notifications" className="relative mt-auto">
                    <ol
                        aria-live="polite"
                        onPointerEnter={() => setHovered(true)}
                        onPointerLeave={() => setHovered(false)}
                        onFocus={() => setFocused(true)}
                        onBlur={(event) => {
                            if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false);
                        }}
                        className="relative"
                        style={{height: expanded ? Math.min(toasts.length, MAX_VISIBLE) * (TOAST_HEIGHT + GAP) : TOAST_HEIGHT + 24}}
                    >
                        <AnimatePresence initial={false}>
                            {toasts.map((toast, index) => (
                                <Toast key={toast.id} toast={toast} index={index} expanded={expanded} onDismiss={dismiss}/>
                            ))}
                        </AnimatePresence>
                    </ol>
                </section>
            </div>
        </MotionConfig>
    );
};

export default ToastStack;
