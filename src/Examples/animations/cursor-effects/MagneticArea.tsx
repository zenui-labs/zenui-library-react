import {createContext, useContext, useRef} from "react";
import type {PointerEvent, ReactNode} from "react";
import {motion, useMotionValue, useMotionValueEvent, useReducedMotion, useSpring} from "framer-motion";
import type {MotionValue} from "framer-motion";

interface Point {
    x: number;
    y: number;
}

/** Offset for the element's content, to pass as `style` on a `motion` element inside it. */
export type MagneticOffset = {
    x: MotionValue<number>;
    y: MotionValue<number>;
};

// The area shares one pointer value with every magnetic element inside it.
const PointerContext = createContext<MotionValue<Point | null> | null>(null);

export interface MagneticProps {
    /** How strongly the element leans toward the pointer, from 0 to 1. */
    strength?: number;
    /** Extra reach around the element, in px, where the pull starts. */
    reach?: number;
    /** How far the content leans compared with the element, from 0 to 1. */
    depth?: number;
    className?: string;
    /** Renders the element. Put `offset` on an inner `motion` element for the extra lean. */
    children: (offset: MagneticOffset) => ReactNode;
}

const spring = {stiffness: 220, damping: 16, mass: 0.5};

// Every magnetic element listens to one shared pointer value from the area around it.
// Inside its reach it leans toward the pointer, and its content leans a little further for depth.
export const Magnetic = ({strength = 0.35, reach = 70, depth = 0.4, className = "", children}: MagneticProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const fallback = useMotionValue<Point | null>(null);
    const pointer = useContext(PointerContext) ?? fallback;
    const x = useSpring(0, spring);
    const y = useSpring(0, spring);
    const innerX = useSpring(0, spring);
    const innerY = useSpring(0, spring);

    useMotionValueEvent(pointer, "change", (point) => {
        const element = ref.current;
        if (!element) return;
        // The measured box includes the current offset, so remove it to get the resting position.
        const rect = element.getBoundingClientRect();
        const left = rect.left - x.get();
        const top = rect.top - y.get();
        const centerX = left + rect.width / 2;
        const centerY = top + rect.height / 2;
        const inRange =
            point !== null &&
            point.x > left - reach && point.x < left + rect.width + reach &&
            point.y > top - reach && point.y < top + rect.height + reach;

        if (!inRange || point === null) {
            x.set(0);
            y.set(0);
            innerX.set(0);
            innerY.set(0);
            return;
        }
        const dx = point.x - centerX;
        const dy = point.y - centerY;
        x.set(dx * strength);
        y.set(dy * strength);
        innerX.set(dx * strength * depth);
        innerY.set(dy * strength * depth);
    });

    return (
        <motion.div ref={ref} style={{x, y}} className={className}>
            {children({x: innerX, y: innerY})}
        </motion.div>
    );
};

export interface MagneticAreaProps {
    /** Content of the area. Wrap the elements that should pull in `Magnetic`. */
    children: ReactNode;
    className?: string;
}

// Tracks the pointer once for the whole section. With reduced motion the elements stay still.
export const MagneticArea = ({children, className = ""}: MagneticAreaProps) => {
    const reduceMotion = useReducedMotion();
    const pointer = useMotionValue<Point | null>(null);

    const handlePointerMove = (event: PointerEvent<HTMLElement>) => {
        if (reduceMotion || event.pointerType !== "mouse") return;
        pointer.set({x: event.clientX, y: event.clientY});
    };

    return (
        <PointerContext.Provider value={pointer}>
            <section
                onPointerMove={handlePointerMove}
                onPointerLeave={() => pointer.set(null)}
                className={`relative w-full max-w-2xl overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-b from-gray-50 to-white px-6 py-12 text-center sm:px-12 dark:border-slate-800 dark:from-slate-900 dark:to-slate-950 ${className}`}
            >
                {children}
            </section>
        </PointerContext.Provider>
    );
};
