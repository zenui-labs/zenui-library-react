import {useEffect, useId, useRef, useState} from "react";
import {AnimatePresence, motion, MotionConfig} from "framer-motion";

export type SubmitStatus = "idle" | "loading" | "success" | "error";

const Spinner = () => (
    <motion.svg viewBox="0 0 24 24" className="h-5 w-5" animate={{rotate: 360}} transition={{duration: 0.9, repeat: Infinity, ease: "linear"}} aria-hidden="true">
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeOpacity={0.25} strokeWidth={2.5}/>
        <motion.circle
            cx="12"
            cy="12"
            r="9"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            initial={{pathLength: 0.15}}
            animate={{pathLength: [0.15, 0.6, 0.15]}}
            transition={{duration: 1.4, repeat: Infinity, ease: "easeInOut"}}
        />
    </motion.svg>
);

const Check = () => (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
        <motion.path
            d="M5 12.5 10 17.5 19 7"
            stroke="currentColor"
            strokeWidth={2.6}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{pathLength: 0}}
            animate={{pathLength: 1}}
            transition={{duration: 0.35, ease: "easeOut", delay: 0.12}}
        />
    </svg>
);

export interface MorphSubmitButtonProps {
    /** Runs the request. The button spins until the promise settles, then shows a check or the error state. */
    onSubmit: () => Promise<unknown>;
    label?: string;
    retryLabel?: string;
    /** Accessible name while the request runs, when the button shows only a spinner. */
    loadingLabel?: string;
    /** Accessible name after success, when the button shows only a check. */
    successLabel?: string;
    loadingMessage?: string;
    successMessage?: string;
    errorMessage?: string;
    /** Width of the button in pixels when it shows a label. */
    width?: number;
    /** How long the check stays before the button returns to its label, in milliseconds. */
    successDuration?: number;
    className?: string;
}

// A save button that shrinks into a spinner while the request runs, then draws a check.
// A failed request shakes the button and explains what went wrong.
export const MorphSubmitButton = ({
    onSubmit,
    label = "Save changes",
    retryLabel = "Try again",
    loadingLabel = "Saving",
    successLabel = "Saved",
    loadingMessage = "Saving changes",
    successMessage = "Changes saved",
    errorMessage = "Could not reach the server. Your changes are kept. Try again.",
    width = 196,
    successDuration = 1800,
    className = "",
}: MorphSubmitButtonProps) => {
    const [status, setStatus] = useState<SubmitStatus>("idle");
    const timers = useRef<number[]>([]);
    const mounted = useRef(true);
    const statusId = useId();

    useEffect(() => {
        mounted.current = true;
        const pending = timers.current;
        return () => {
            mounted.current = false;
            pending.forEach((timer) => window.clearTimeout(timer));
        };
    }, []);

    const submit = () => {
        if (status === "loading" || status === "success") return;
        setStatus("loading");
        onSubmit().then(
            () => {
                if (!mounted.current) return;
                setStatus("success");
                timers.current.push(window.setTimeout(() => setStatus("idle"), successDuration));
            },
            () => {
                if (mounted.current) setStatus("error");
            },
        );
    };

    const widths: Record<SubmitStatus, number> = {idle: width, loading: 48, success: 48, error: width};

    const tone = {
        idle: "bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:ring-indigo-500",
        loading: "bg-indigo-600 text-white focus-visible:ring-indigo-500",
        success: "bg-emerald-500 text-white focus-visible:ring-emerald-500",
        error: "bg-red-600 text-white hover:bg-red-500 focus-visible:ring-red-500",
    }[status];

    const messages: Record<SubmitStatus, string> = {
        idle: "",
        loading: loadingMessage,
        success: successMessage,
        error: errorMessage,
    };

    return (
        <MotionConfig reducedMotion="user">
            <div className={`flex flex-col items-center gap-5 ${className}`}>
                <div className="flex h-12 items-center justify-center">
                    <motion.button
                        type="button"
                        onClick={submit}
                        aria-busy={status === "loading"}
                        aria-describedby={statusId}
                        aria-label={status === "loading" ? loadingLabel : status === "success" ? successLabel : undefined}
                        initial={false}
                        animate={{
                            width: widths[status],
                            x: status === "error" ? [0, -8, 7, -5, 3, 0] : 0,
                        }}
                        transition={{
                            width: {type: "spring", stiffness: 320, damping: 30},
                            x: {duration: 0.45, ease: "easeOut"},
                        }}
                        className={`relative flex h-12 items-center justify-center overflow-hidden rounded-full text-sm font-medium shadow-lg shadow-indigo-500/20 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:shadow-black/40 dark:focus-visible:ring-offset-slate-950 ${tone}`}
                    >
                        <AnimatePresence mode="popLayout" initial={false}>
                            <motion.span
                                key={status}
                                initial={{opacity: 0, scale: 0.6, filter: "blur(4px)"}}
                                animate={{opacity: 1, scale: 1, filter: "blur(0px)"}}
                                exit={{opacity: 0, scale: 0.6, filter: "blur(4px)"}}
                                transition={{duration: 0.2}}
                                className="flex items-center justify-center whitespace-nowrap"
                            >
                                {status === "idle" && label}
                                {status === "loading" && <Spinner/>}
                                {status === "success" && <Check/>}
                                {status === "error" && retryLabel}
                            </motion.span>
                        </AnimatePresence>
                    </motion.button>
                </div>

                <p id={statusId} aria-live="polite" className={`h-4 text-center text-xs ${status === "error" ? "text-red-600 dark:text-red-400" : "text-gray-500 dark:text-slate-400"}`}>
                    {messages[status]}
                </p>
            </div>
        </MotionConfig>
    );
};
