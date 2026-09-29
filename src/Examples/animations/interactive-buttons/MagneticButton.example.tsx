import {useRef} from "react";
import type {PointerEvent, ReactNode} from "react";
import {motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform} from "framer-motion";
import {LuArrowRight, LuArrowUpRight} from "react-icons/lu";

interface MagneticProps {
    children: ReactNode;
    /** How far the button follows the pointer, as a share of the pointer's distance from center. */
    strength?: number;
    className: string;
    label?: string;
}

const spring = {stiffness: 220, damping: 16, mass: 0.6};

// The button leans toward the pointer and its label moves a little further, which reads as depth.
// A soft glow tracks the pointer inside the button. Touch and reduced motion skip the pull.
const Magnetic = ({children, strength = 0.35, className, label}: MagneticProps) => {
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
    const glow = useMotionTemplate`radial-gradient(120px circle at ${glowX}% ${glowY}%, rgba(129,140,248,0.45), transparent 70%)`;

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
                type="button"
                aria-label={label}
                style={{x, y}}
                whileTap={{scale: 0.95}}
                className={`group relative overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 ${className}`}
            >
                <motion.span aria-hidden="true" style={{background: glow}} className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"/>
                <motion.span style={{x: labelX, y: labelY}} className="relative inline-flex items-center gap-2">
                    {children}
                </motion.span>
            </motion.button>
        </div>
    );
};

const MagneticButton = () => (
    <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-4">
        <Magnetic className="rounded-full bg-gray-900 px-7 py-3.5 text-sm font-medium text-white shadow-lg shadow-gray-900/20 focus-visible:ring-gray-900 dark:bg-white dark:text-slate-900 dark:shadow-black/40 dark:focus-visible:ring-white">
            Book a demo
            <LuArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true"/>
        </Magnetic>
        <Magnetic
            strength={0.5}
            label="Open case study"
            className="flex h-14 w-14 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-900 shadow-sm focus-visible:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-white"
        >
            <LuArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:rotate-45" aria-hidden="true"/>
        </Magnetic>
    </div>
);

export default MagneticButton;
