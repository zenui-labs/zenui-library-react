import type {PointerEvent, ReactNode} from "react";
import {motion, useMotionValue, useReducedMotion, useSpring, useTransform} from "framer-motion";
import type {MotionValue} from "framer-motion";
import {LuArrowRight, LuMapPin} from "react-icons/lu";

interface LayerProps {
    x: MotionValue<number>;
    y: MotionValue<number>;
    /** How far the layer travels, in px. Closer layers move more. */
    depth: number;
    children: ReactNode;
    className?: string;
}

// Moves one layer of the scene opposite to the pointer. Different depths create the parallax.
const Layer = ({x, y, depth, children, className = ""}: LayerProps) => {
    const translateX = useTransform(x, [-0.5, 0.5], [depth, -depth]);
    const translateY = useTransform(y, [-0.5, 0.5], [depth * 0.6, -depth * 0.6]);
    return (
        <motion.div aria-hidden="true" style={{x: translateX, y: translateY}} className={`absolute ${className}`}>
            {children}
        </motion.div>
    );
};

const spring = {stiffness: 160, damping: 20, mass: 0.7};

export interface ParallaxCardProps {
    title: string;
    description: string;
    /** Place shown with a pin above the title. */
    location: string;
    /** Price as it should read, including the currency. */
    price: string;
    /** Text after the price. */
    priceSuffix?: string;
    /** Small pill in the top left corner of the scene. */
    badge?: string;
    actionLabel?: string;
    onAction?: () => void;
    /** Multiplies how far the layers travel. 1 keeps the default depths. */
    depthScale?: number;
    className?: string;
}

// A card that tilts while each layer of the mountain scene moves at a different depth.
export const ParallaxCard = ({
    title,
    description,
    location,
    price,
    priceSuffix = "per person",
    badge,
    actionLabel = "View trip",
    onAction,
    depthScale = 1,
    className = "",
}: ParallaxCardProps) => {
    const reduceMotion = useReducedMotion();

    // Pointer offset from the card center, from -0.5 to 0.5.
    const pointerX = useMotionValue(0);
    const pointerY = useMotionValue(0);
    const x = useSpring(pointerX, spring);
    const y = useSpring(pointerY, spring);
    const rotateX = useTransform(y, [-0.5, 0.5], [8, -8]);
    const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);

    const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
        if (reduceMotion) return;
        const rect = event.currentTarget.getBoundingClientRect();
        pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
        pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
    };

    const handlePointerLeave = () => {
        pointerX.set(0);
        pointerY.set(0);
    };

    return (
        <div
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            className={`w-full max-w-[20rem] [perspective:1100px] ${className}`}
        >
            <motion.article
                style={{rotateX, rotateY}}
                className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl shadow-gray-900/10 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/40"
            >
                {/* The scene is slightly larger than its frame so moving layers never show an edge. */}
                <div className="relative h-56 overflow-hidden bg-gradient-to-b from-sky-300 via-orange-200 to-rose-200 dark:from-slate-950 dark:via-indigo-950 dark:to-violet-900">
                    <Layer x={x} y={y} depth={6 * depthScale} className="right-12 top-8">
                        <div className="h-14 w-14 rounded-full bg-gradient-to-b from-amber-200 to-orange-400 shadow-[0_0_60px_rgba(251,146,60,0.6)] dark:from-slate-100 dark:to-slate-300 dark:shadow-[0_0_50px_rgba(226,232,240,0.45)]"/>
                    </Layer>
                    <Layer x={x} y={y} depth={10 * depthScale} className="-inset-x-6 bottom-6">
                        <svg viewBox="0 0 400 120" preserveAspectRatio="none" className="block h-28 w-full text-indigo-300 dark:text-indigo-900">
                            <path d="M0 120 L0 70 L60 30 L110 65 L170 10 L230 60 L280 35 L340 70 L400 40 L400 120 Z" fill="currentColor"/>
                        </svg>
                    </Layer>
                    <Layer x={x} y={y} depth={18 * depthScale} className="-inset-x-8 -bottom-2">
                        <svg viewBox="0 0 400 100" preserveAspectRatio="none" className="block h-24 w-full text-indigo-500 dark:text-slate-800">
                            <path d="M0 100 L0 60 L50 35 L95 70 L150 30 L205 75 L260 45 L320 80 L370 50 L400 65 L400 100 Z" fill="currentColor"/>
                        </svg>
                    </Layer>
                    <Layer x={x} y={y} depth={28 * depthScale} className="-inset-x-10 -bottom-4">
                        <svg viewBox="0 0 400 60" preserveAspectRatio="none" className="block h-14 w-full text-indigo-800 dark:text-slate-950">
                            <path d="M0 60 L0 35 Q100 5 200 30 T400 25 L400 60 Z" fill="currentColor"/>
                        </svg>
                    </Layer>
                    {badge && (
                        <span className="absolute left-4 top-4 rounded-full bg-white/80 px-2.5 py-1 text-xs font-medium text-gray-900 backdrop-blur dark:bg-slate-900/70 dark:text-white">
                            {badge}
                        </span>
                    )}
                </div>

                <div className="p-5">
                    <p className="flex items-center gap-1.5 text-xs font-medium text-indigo-600 dark:text-indigo-400">
                        <LuMapPin className="h-3.5 w-3.5" aria-hidden="true"/>
                        {location}
                    </p>
                    <h3 className="mt-1.5 text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-slate-400">{description}</p>
                    <div className="mt-4 flex items-center justify-between">
                        <p className="text-sm text-gray-500 dark:text-slate-400">
                            <span className="text-base font-semibold text-gray-900 dark:text-white">{price}</span> {priceSuffix}
                        </p>
                        <button
                            type="button"
                            onClick={onAction}
                            className="inline-flex items-center gap-1.5 rounded-full bg-gray-900 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 dark:focus-visible:ring-offset-slate-900"
                        >
                            {actionLabel}
                            <LuArrowRight className="h-4 w-4" aria-hidden="true"/>
                        </button>
                    </div>
                </div>
            </motion.article>
        </div>
    );
};
