import type {MouseEvent, ReactNode} from "react";
import {motion, useReducedMotion} from "framer-motion";

export type ShimmerButtonVariant = "dark" | "gradient";

const variants: Record<ShimmerButtonVariant, {button: string; shimmer: string}> = {
    dark: {
        button: "bg-slate-900 text-white shadow-slate-900/20 dark:bg-white dark:text-slate-900 dark:shadow-white/10",
        shimmer: "via-white/40 dark:via-indigo-400/30",
    },
    gradient: {
        button: "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-indigo-600/25 dark:shadow-indigo-950/50",
        shimmer: "via-white/35",
    },
};

export interface ShimmerButtonProps {
    children: ReactNode;
    variant?: ShimmerButtonVariant;
    /** Length of one sweep in seconds. */
    duration?: number;
    /** Pause between sweeps in seconds. */
    repeatDelay?: number;
    /** Wait before the first sweep in seconds. Offset buttons that sit side by side so they do not shine together. */
    delay?: number;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    className?: string;
}

// A band of light sweeps across the button every few seconds to draw the eye to the main action.
export const ShimmerButton = ({
    children,
    variant = "dark",
    duration = 1.4,
    repeatDelay = 2.2,
    delay = 0,
    type = "button",
    disabled,
    onClick,
    className = "",
}: ShimmerButtonProps) => {
    const reduceMotion = useReducedMotion();
    const style = variants[variant];

    return (
        <motion.button
            type={type}
            disabled={disabled}
            onClick={onClick}
            whileHover={reduceMotion ? undefined : {y: -2}}
            whileTap={{scale: 0.97}}
            transition={{type: "spring", stiffness: 400, damping: 25}}
            className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-medium shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 ${style.button} ${className}`}
        >
            {!reduceMotion && (
                <motion.span
                    aria-hidden="true"
                    className={`pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent to-transparent ${style.shimmer}`}
                    style={{skewX: -12}}
                    initial={{x: "-120%"}}
                    animate={{x: "320%"}}
                    transition={{duration, ease: [0.4, 0, 0.2, 1], repeat: Infinity, repeatDelay, delay}}
                />
            )}
            {/* Lifts the label and icons above the band of light. */}
            <span className="relative inline-flex items-center gap-2">{children}</span>
        </motion.button>
    );
};
