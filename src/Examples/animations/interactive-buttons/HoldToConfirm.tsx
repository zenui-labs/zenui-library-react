import {useEffect, useId, useRef, useState} from "react";
import type {ComponentType, KeyboardEvent} from "react";
import {animate, AnimatePresence, motion, useMotionValue, useTransform} from "framer-motion";
import type {AnimationPlaybackControls} from "framer-motion";
import {LuCheck, LuTrash2} from "react-icons/lu";

export interface HoldToConfirmProps {
    /** Called once the button has been held for the full duration. */
    onConfirm?: () => void;
    label?: string;
    /** Shown on the button and announced to screen readers after the action runs. */
    confirmedLabel?: string;
    /** Help text under the button, linked to it with aria-describedby. Pass an empty string to hide it. */
    hint?: string;
    icon?: ComponentType<{className?: string; "aria-hidden"?: boolean | "true" | "false"}>;
    /** How long the button must be held, in seconds. */
    duration?: number;
    /** Milliseconds before the button returns to its starting state after confirming. Pass null to keep it confirmed. */
    resetAfter?: number | null;
    className?: string;
}

// A destructive action that only runs after the button is held down.
// Letting go early springs the progress back to zero.
export const HoldToConfirm = ({
    onConfirm,
    label = "Hold to delete project",
    confirmedLabel = "Project deleted",
    hint = "Press and hold for about a second. Works with Space and Enter too.",
    icon: Icon = LuTrash2,
    duration = 1.2,
    resetAfter = 2400,
    className = "",
}: HoldToConfirmProps) => {
    const progress = useMotionValue(0);
    // Clipping is cheaper than animating width and keeps the white label aligned with the red one.
    const clipPath = useTransform(progress, (value) => `inset(0 ${100 - value * 100}% 0 0)`);
    const [status, setStatus] = useState<"idle" | "holding" | "done">("idle");
    const controls = useRef<AnimationPlaybackControls | null>(null);
    const resetTimer = useRef<number | null>(null);
    const hintId = useId();

    useEffect(() => () => {
        controls.current?.stop();
        if (resetTimer.current !== null) window.clearTimeout(resetTimer.current);
    }, []);

    const startHold = () => {
        if (status === "done") return;
        setStatus("holding");
        controls.current?.stop();
        controls.current = animate(progress, 1, {
            duration: duration * (1 - progress.get()),
            ease: "linear",
            onComplete: () => {
                setStatus("done");
                onConfirm?.();
                if (resetAfter === null) return;
                // Return to the starting state so the button can be used again.
                resetTimer.current = window.setTimeout(() => {
                    progress.set(0);
                    setStatus("idle");
                }, resetAfter);
            },
        });
    };

    const cancelHold = () => {
        if (status !== "holding") return;
        setStatus("idle");
        controls.current?.stop();
        controls.current = animate(progress, 0, {type: "spring", stiffness: 300, damping: 30});
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
        if ((event.key === " " || event.key === "Enter") && !event.repeat) {
            event.preventDefault();
            startHold();
        }
    };

    const handleKeyUp = (event: KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === " " || event.key === "Enter") cancelHold();
    };

    const done = status === "done";

    return (
        <div className={`flex flex-col items-center gap-3 ${className}`}>
            <motion.button
                type="button"
                aria-describedby={hint ? hintId : undefined}
                onPointerDown={startHold}
                onPointerUp={cancelHold}
                onPointerLeave={cancelHold}
                onPointerCancel={cancelHold}
                onKeyDown={handleKeyDown}
                onKeyUp={handleKeyUp}
                onBlur={cancelHold}
                onContextMenu={(event) => event.preventDefault()}
                animate={{scale: status === "holding" ? 0.97 : 1}}
                transition={{type: "spring", stiffness: 400, damping: 25}}
                className={`relative inline-flex min-w-[13rem] select-none items-center justify-center overflow-hidden rounded-xl border px-5 py-3 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 [-webkit-touch-callout:none] ${
                    done
                        ? "border-emerald-600 bg-emerald-600 text-white focus-visible:ring-emerald-500 dark:border-emerald-500 dark:bg-emerald-500"
                        : "border-red-200 bg-red-50 text-red-700 focus-visible:ring-red-500 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300"
                }`}
            >
                <span className="relative inline-flex items-center gap-2">
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                            key={done ? "done" : "idle"}
                            className="inline-flex items-center gap-2"
                            initial={{opacity: 0, y: 6}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: -6}}
                            transition={{duration: 0.15}}
                        >
                            {done ? <LuCheck className="h-4 w-4" aria-hidden="true"/> : <Icon className="h-4 w-4" aria-hidden="true"/>}
                            {done ? confirmedLabel : label}
                        </motion.span>
                    </AnimatePresence>
                </span>
                {/* A red copy of the label is revealed from the left while the button is held. */}
                {!done && (
                    <motion.span
                        aria-hidden="true"
                        style={{clipPath}}
                        className="absolute inset-0 flex items-center justify-center gap-2 bg-red-600 text-white dark:bg-red-500"
                    >
                        <Icon className="h-4 w-4"/>
                        {label}
                    </motion.span>
                )}
            </motion.button>
            {hint && (
                <p id={hintId} className="text-xs text-gray-500 dark:text-slate-400">
                    {hint}
                </p>
            )}
            <p className="sr-only" aria-live="assertive">
                {done ? confirmedLabel : ""}
            </p>
        </div>
    );
};
