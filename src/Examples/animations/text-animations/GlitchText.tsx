import {useCallback, useEffect, useRef} from "react";
import type {ComponentType} from "react";
import {useAnimate, useInView, useReducedMotion} from "framer-motion";
import {LuRefreshCw, LuWifiOff} from "react-icons/lu";

const FRAMES = 7;

const random = (min: number, max: number) => min + Math.random() * (max - min);

// A horizontal slice of the text, described as a clip-path inset from the top and bottom.
const randomSlice = () => {
    const top = random(0, 85);
    const height = random(6, 28);
    return `inset(${top.toFixed(1)}% 0 ${Math.max(0, 100 - top - height).toFixed(1)}% 0)`;
};

type Icon = ComponentType<{className?: string}>;

export interface GlitchTextProps {
    /** The headline that glitches. Keep it short, for example an error code. */
    text: string;
    /** Label in the pill above the headline. */
    status?: string;
    statusIcon?: Icon;
    /** Supporting text under the headline. */
    description?: string;
    actionLabel?: string;
    actionIcon?: Icon;
    /** Called when the action button is pressed. The button also plays a burst. */
    onAction?: () => void;
    /** Milliseconds between automatic bursts. */
    interval?: number;
    className?: string;
}

// Two colored copies of the text sit on top of the original. A burst shows random slices of each copy,
// shifted sideways, for about 400 ms. Nothing moves between bursts, so the effect stays cheap.
export const GlitchText = ({
    text,
    status,
    statusIcon: StatusIcon = LuWifiOff,
    description,
    actionLabel = "Retry connection",
    actionIcon: ActionIcon = LuRefreshCw,
    onAction,
    interval = 4200,
    className = "",
}: GlitchTextProps) => {
    const [scope, animate] = useAnimate<HTMLDivElement>();
    const inView = useInView(scope, {amount: 0.5});
    const reduceMotion = useReducedMotion();
    const busy = useRef(false);

    const burst = useCallback(async () => {
        if (busy.current || reduceMotion || !scope.current) return;
        busy.current = true;
        const layer = () => ({
            clipPath: [...Array.from({length: FRAMES}, randomSlice), "inset(50% 0 50% 0)"],
            x: [...Array.from({length: FRAMES}, () => random(-10, 10)), 0],
        });
        await Promise.all([
            animate(".glitch-cyan", layer(), {duration: 0.42, ease: "linear"}),
            animate(".glitch-rose", layer(), {duration: 0.42, ease: "linear"}),
            animate(".glitch-base", {x: [0, -2, 3, -1, 0], skewX: [0, 6, -4, 2, 0]}, {duration: 0.3, ease: "linear"}),
        ]);
        busy.current = false;
    }, [animate, reduceMotion, scope]);

    // Automatic bursts only while the headline is on screen and the tab is visible.
    useEffect(() => {
        if (!inView || reduceMotion) return;
        const timer = window.setInterval(() => {
            if (document.visibilityState === "visible") void burst();
        }, interval);
        const first = window.setTimeout(() => void burst(), 600);
        return () => {
            window.clearInterval(timer);
            window.clearTimeout(first);
        };
    }, [burst, inView, reduceMotion, interval]);

    const copyClassName = "pointer-events-none absolute inset-0 select-none [clip-path:inset(50%_0_50%_0)]";

    return (
        <div className={`w-full max-w-xl text-center ${className}`}>
            {status && (
                <span className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-700 dark:bg-rose-500/10 dark:text-rose-300">
                    <span aria-hidden="true" className="flex">
                        <StatusIcon className="h-3.5 w-3.5"/>
                    </span>
                    {status}
                </span>
            )}

            <div ref={scope} onPointerEnter={() => void burst()} className={`relative mx-auto w-fit ${status ? "mt-5" : ""}`}>
                <h2 className="glitch-base font-mono text-5xl font-black tracking-tight text-gray-900 sm:text-8xl dark:text-white">
                    {text}
                </h2>
                <span aria-hidden="true" className={`glitch-cyan font-mono text-5xl font-black tracking-tight text-cyan-500 mix-blend-multiply sm:text-8xl dark:text-cyan-400 dark:mix-blend-screen ${copyClassName}`}>
                    {text}
                </span>
                <span aria-hidden="true" className={`glitch-rose font-mono text-5xl font-black tracking-tight text-rose-500 mix-blend-multiply sm:text-8xl dark:text-rose-400 dark:mix-blend-screen ${copyClassName}`}>
                    {text}
                </span>
            </div>

            {description && <p className="mx-auto mt-5 max-w-sm text-base leading-7 text-gray-600 dark:text-slate-400">{description}</p>}

            <button
                type="button"
                onClick={() => {
                    void burst();
                    onAction?.();
                }}
                className="mt-7 inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 active:scale-[0.98] dark:bg-white dark:text-gray-900 dark:hover:bg-slate-200 dark:focus-visible:ring-offset-slate-950"
            >
                <span aria-hidden="true" className="flex">
                    <ActionIcon className="h-4 w-4"/>
                </span>
                {actionLabel}
            </button>
        </div>
    );
};
