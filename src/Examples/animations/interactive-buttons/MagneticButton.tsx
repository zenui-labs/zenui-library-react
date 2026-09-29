import {useRef} from "react";
import type {MouseEvent, PointerEvent, ReactNode} from "react";
import {motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform} from "framer-motion";

export type MagneticButtonVariant = "solid" | "icon";

const variants: Record<MagneticButtonVariant, string> = {
    solid: "rounded-full bg-gray-900 px-7 py-3.5 text-sm font-medium text-white shadow-lg shadow-gray-900/20 focus-visible:ring-gray-900 dark:bg-white dark:text-slate-900 dark:shadow-black/40 dark:focus-visible:ring-white",
    icon: "flex h-14 w-14 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 shadow-sm focus-visible:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white",
};

export interface MagneticButtonProps {
    children: ReactNode;
    /** "icon" is a round button sized for a single icon. */
    variant?: MagneticButtonVariant;
    /** How far the button follows the pointer, as a share of the pointer's distance from center. */
    strength?: number;
    /** Color of the glow that follows the pointer inside the button, as any CSS color. */
    glowColor?: string;
    /** Accessible name. Required when the button shows only an icon. */
    label?: string;
    type?: "button" | "submit" | "reset";
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    /** Classes added to the button itself, not to the padded area around it that catches the pointer. */
    className?: string;
}

const spring = {stiffness: 220, damping: 16, mass: 0.6};

// The button leans toward the pointer and its label moves a little further, which reads as depth.
// A soft glow tracks the pointer inside the button. Touch and reduced motion skip the pull.
export const MagneticButton = ({
    children,
    variant = "solid",
    strength = 0.35,
    glowColor = "rgba(129,140,248,0.45)",
    label,
    type = "button",
    onClick,
    className = "",
}: MagneticButtonProps) => {
    const ref = useRef<HTMLButtonElement>(null);
    const reduceMotion = useReducedMotion();
    const offsetX = useMotionValue(0);
    const offsetY = useMotionValue(0);
    const x = useSpring(offsetX, spring);
    const y = useSpring(offsetY, spring);
    const labelX = useTransform(x, (value) => value * 0.45);
    const labelY = useTransform(y, (value) => value * 0.45);
    const glowX = useMotionValue(50);
    const glowY = useMotionValue(50);
    const glow = useMotionTemplate`radial-gradient(120px circle at ${glowX}% ${glowY}%, ${glowColor}, transparent 70%)`;

    const handleMove = (event: PointerEvent<HTMLDivElement>) => {
        if (event.pointerType !== "mouse" || reduceMotion || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        offsetX.set(dx * strength);
        offsetY.set(dy * strength);
        glowX.set(((event.clientX - rect.left) / rect.width) * 100);
        glowY.set(((event.clientY - rect.top) / rect.height) * 100);
    };

    const reset = () => {
        offsetX.set(0);
        offsetY.set(0);
    };

    return (
        // The padded wrapper widens the area that catches the pointer, so the pull starts before contact.
        <div className="p-4" onPointerMove={handleMove} onPointerLeave={reset}>
            <motion.button
                ref={ref}
                type={type}
                aria-label={label}
                onClick={onClick}
                style={{x, y}}
                whileTap={{scale: 0.95}}
                className={`group relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 ${variants[variant]} ${className}`}
            >
                <motion.span aria-hidden="true" style={{background: glow}} className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"/>
                <motion.span style={{x: labelX, y: labelY}} className="relative inline-flex items-center gap-2">
                    {children}
                </motion.span>
            </motion.button>
        </div>
    );
};
