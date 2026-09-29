import {useEffect, useRef, useState} from "react";
import {animate, motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform} from "framer-motion";
import type {AnimationPlaybackControls, MotionValue} from "framer-motion";
import {LuCheck, LuDownload} from "react-icons/lu";

type Status = "idle" | "downloading" | "done";

const HEIGHT = 56;
const WAVE = 12;
const HOVER_LEVEL = 0.18;

// Two identical wave periods side by side, so sliding the shape by half its width loops without a seam.
const WAVE_PATH = "M0 12 C 25 12 25 2 50 2 S 75 12 100 12 S 125 2 150 2 S 175 12 200 12 V 24 H 0 Z";

interface LabelText {
    label: string;
    progressLabel: string;
    doneLabel: string;
}

interface LabelProps extends LabelText {
    status: Status;
    percent: MotionValue<string>;
}

const Label = ({status, percent, label, progressLabel, doneLabel}: LabelProps) => {
    if (status === "downloading") {
        return (
            <>
                <LuDownload className="h-4 w-4" aria-hidden="true"/>
                {progressLabel} <motion.span className="w-9 text-left tabular-nums">{percent}</motion.span>
            </>
        );
    }
    if (status === "done") {
        return (
            <>
                <LuCheck className="h-4 w-4" aria-hidden="true"/>
                {doneLabel}
            </>
        );
    }
    return (
        <>
            <LuDownload className="h-4 w-4" aria-hidden="true"/>
            {label}
        </>
    );
};

export interface LiquidFillButtonProps {
    /** Line under the button before the download starts, such as the file name, type and size. */
    caption: string;
    /** Line under the button while the download runs. Defaults to `caption`. */
    progressCaption?: string;
    doneCaption?: string;
    label?: string;
    /** Shown before the percentage while the download runs. */
    progressLabel?: string;
    doneLabel?: string;
    /** Called when the button is pressed and the fill starts. */
    onDownload?: () => void;
    /** Called when the fill reaches the top. */
    onComplete?: () => void;
    /** How long the fill takes to reach the top, in seconds. */
    duration?: number;
    /** Milliseconds the finished state stays before the liquid drains and the button resets. */
    resetAfter?: number;
    className?: string;
}

// Liquid rises a little on hover. Clicking fills the button to the top as the download progresses,
// and the label turns white exactly where the liquid covers it.
export const LiquidFillButton = ({
    caption,
    progressCaption = caption,
    doneCaption = "Download complete",
    label = "Download report",
    progressLabel = "Downloading",
    doneLabel = "Saved to Downloads",
    onDownload,
    onComplete,
    duration = 3,
    resetAfter = 2200,
    className = "",
}: LiquidFillButtonProps) => {
    const reduceMotion = useReducedMotion();
    const [status, setStatus] = useState<Status>("idle");
    const [hovered, setHovered] = useState(false);
    const hoverTarget = useMotionValue(0);
    const hoverLevel = useSpring(hoverTarget, {stiffness: 170, damping: 14});
    const progress = useMotionValue(0);
    const level = useTransform([hoverLevel, progress], ([hover, value]: number[]) => hover + (1 - hover) * value);
    const liquidY = useTransform(level, (value) => (1 - value) * (HEIGHT + WAVE));
    const clip = useTransform(level, (value) => `${(1 - value) * 100}%`);
    const clipPath = useMotionTemplate`inset(${clip} 0 0 0)`;
    const percent = useTransform(progress, (value) => `${Math.round(value * 100)}%`);
    const controls = useRef<AnimationPlaybackControls | null>(null);
    const resetTimer = useRef<number | null>(null);
    const text: LabelText = {label, progressLabel, doneLabel};

    useEffect(() => {
        hoverTarget.set(hovered && status === "idle" ? HOVER_LEVEL : 0);
    }, [hovered, status, hoverTarget]);

    useEffect(() => () => {
        controls.current?.stop();
        if (resetTimer.current !== null) window.clearTimeout(resetTimer.current);
    }, []);

    const start = () => {
        if (status !== "idle") return;
        setStatus("downloading");
        onDownload?.();
        // Uneven steps read like a real download rather than a timer.
        controls.current = animate(progress, [0, 0.22, 0.31, 0.58, 0.66, 0.9, 1], {
            duration,
            times: [0, 0.18, 0.3, 0.5, 0.62, 0.85, 1],
            ease: "easeInOut",
            onComplete: () => {
                setStatus("done");
                onComplete?.();
                resetTimer.current = window.setTimeout(() => {
                    controls.current = animate(progress, 0, {duration: 0.9, ease: [0.65, 0, 0.35, 1]});
                    setStatus("idle");
                }, resetAfter);
            },
        });
    };

    const waving = !reduceMotion && (status !== "idle" || hovered);

    return (
        <div className={`flex flex-col items-center gap-3 ${className}`}>
            <motion.button
                type="button"
                onClick={start}
                onPointerEnter={() => setHovered(true)}
                onPointerLeave={() => setHovered(false)}
                onFocus={() => setHovered(true)}
                onBlur={() => setHovered(false)}
                aria-disabled={status !== "idle"}
                whileTap={status === "idle" ? {scale: 0.97} : undefined}
                style={{height: HEIGHT}}
                className="relative inline-flex min-w-[15rem] items-center justify-center overflow-hidden rounded-2xl border border-teal-600/30 bg-white px-6 text-sm font-medium text-teal-900 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 aria-disabled:cursor-default dark:border-teal-400/30 dark:bg-slate-900 dark:text-teal-200 dark:focus-visible:ring-offset-slate-950"
            >
                <span className="relative inline-flex items-center gap-2">
                    <Label status={status} percent={percent} {...text}/>
                </span>

                <motion.span aria-hidden="true" style={{y: liquidY}} className="pointer-events-none absolute inset-x-0 top-0">
                    <span className="absolute inset-x-0 -top-[12px] h-[12px] overflow-hidden">
                        <motion.svg
                            viewBox="0 0 200 24"
                            preserveAspectRatio="none"
                            className="h-[24px] w-[200%] fill-teal-500 dark:fill-teal-400"
                            animate={waving ? {x: ["0%", "-50%"]} : {x: "0%"}}
                            transition={waving ? {duration: 1.4, ease: "linear", repeat: Infinity} : {duration: 0.3}}
                        >
                            <path d={WAVE_PATH}/>
                        </motion.svg>
                    </span>
                    <span className="block bg-gradient-to-b from-teal-500 to-emerald-600 dark:from-teal-400 dark:to-emerald-500" style={{height: HEIGHT}}/>
                </motion.span>

                {/* A white copy of the label, clipped to the part of the button under the liquid. */}
                <motion.span aria-hidden="true" style={{clipPath}} className="pointer-events-none absolute inset-0 flex items-center justify-center gap-2 text-white dark:text-slate-950">
                    <Label status={status} percent={percent} {...text}/>
                </motion.span>
            </motion.button>
            <p aria-live="polite" className="text-xs text-gray-500 dark:text-slate-400">
                {status === "downloading" ? progressCaption : status === "done" ? doneCaption : caption}
            </p>
        </div>
    );
};
