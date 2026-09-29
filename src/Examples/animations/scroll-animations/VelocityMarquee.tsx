import {useRef} from "react";
import type {ComponentType, RefObject} from "react";
import {motion, useAnimationFrame, useInView, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, useVelocity} from "framer-motion";
import type {MotionValue} from "framer-motion";
import {LuSparkle} from "react-icons/lu";

const wrap = (min: number, max: number, value: number) => {
    const range = max - min;
    return ((((value - min) % range) + range) % range) + min;
};

interface RowProps {
    words: string[];
    /** Percent of the row width per second. Negative values move right. */
    baseSpeed: number;
    velocityFactor: MotionValue<number>;
    skew: MotionValue<number>;
    running: boolean;
    separator: ComponentType<{className?: string}>;
    className: string;
}

// The row holds two copies of the words, so wrapping x between -50% and 0% loops without a seam.
// Scrolling down pushes the row forward, scrolling up reverses it, and fast scrolling adds speed.
const MarqueeRow = ({words, baseSpeed, velocityFactor, skew, running, separator: Separator, className}: RowProps) => {
    const baseX = useMotionValue(0);
    const direction = useRef(1);
    const x = useTransform(baseX, (value) => `${wrap(-50, 0, value)}%`);

    useAnimationFrame((_, delta) => {
        if (!running) return;
        const factor = velocityFactor.get();
        if (factor < 0) direction.current = -1;
        else if (factor > 0) direction.current = 1;
        let move = direction.current * baseSpeed * (delta / 1000);
        move += move * Math.abs(factor);
        baseX.set(baseX.get() + move);
    });

    const items = [...words, ...words];

    return (
        <div className="flex overflow-hidden whitespace-nowrap">
            <motion.div style={{x, skewX: skew}} className={`flex w-max shrink-0 items-center ${className}`}>
                {items.map((word, index) => (
                    <span key={`${word}-${index}`} className="flex items-center">
                        <span className="px-4 sm:px-6">{word}</span>
                        <Separator className="h-5 w-5 shrink-0 opacity-60"/>
                    </span>
                ))}
            </motion.div>
        </div>
    );
};

export interface MarqueeNote {
    /** Already formatted, for example "Sep 24". */
    date: string;
    title: string;
    body: string;
}

const useMarqueeMotion = (containerRef: RefObject<HTMLDivElement>) => {
    const {scrollY} = useScroll({container: containerRef});
    const velocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(velocity, {damping: 50, stiffness: 400});
    const velocityFactor = useTransform(smoothVelocity, [-1000, 0, 1000], [-5, 0, 5], {clamp: false});
    const skew = useTransform(smoothVelocity, [-1500, 1500], [-10, 10]);
    return {velocityFactor, skew};
};

export interface VelocityMarqueeProps {
    notes: MarqueeNote[];
    /** Words in the first row, which drifts left. */
    primaryWords: string[];
    /** Words in the second row, drawn in the accent color, which drifts right. */
    accentWords: string[];
    /** Resting speed of both rows, in percent of the row width per second. */
    speed?: number;
    /** Icon placed between words. */
    separator?: ComponentType<{className?: string}>;
    /** Line above the notes that explains the effect. */
    hint?: string;
    /** Accessible name of the scrollable panel. */
    ariaLabel?: string;
    className?: string;
}

export const VelocityMarquee = ({
    notes,
    primaryWords,
    accentWords,
    speed = 3,
    separator = LuSparkle,
    hint = "Scroll faster to speed the rows up. Scroll up to reverse them.",
    ariaLabel = "Notes, scroll to read",
    className = "",
}: VelocityMarqueeProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const inView = useInView(containerRef);
    const reduceMotion = useReducedMotion();
    const {velocityFactor, skew} = useMarqueeMotion(containerRef);
    const still = useMotionValue(0);
    // Rows move only while the panel is on screen, and not at all with reduced motion.
    const running = inView && !reduceMotion;

    return (
        <div className={`w-full max-w-3xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950 ${className}`}>
            <div
                ref={containerRef}
                tabIndex={0}
                aria-label={ariaLabel}
                className="relative h-[440px] overflow-y-auto overscroll-contain focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-lime-500"
            >
                <div aria-hidden="true" className="sticky top-0 z-10 space-y-1 overflow-hidden border-b border-gray-200 bg-white/90 py-4 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
                    <MarqueeRow
                        words={primaryWords}
                        baseSpeed={-speed}
                        velocityFactor={velocityFactor}
                        skew={reduceMotion ? still : skew}
                        running={running}
                        separator={separator}
                        className="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl dark:text-white"
                    />
                    <MarqueeRow
                        words={accentWords}
                        baseSpeed={speed}
                        velocityFactor={velocityFactor}
                        skew={reduceMotion ? still : skew}
                        running={running}
                        separator={separator}
                        className="text-3xl font-bold tracking-tight text-lime-600 sm:text-5xl dark:text-lime-400"
                    />
                </div>

                <div className="px-6 py-6 sm:px-10">
                    <p className="text-sm text-gray-500 dark:text-slate-400">{hint}</p>
                    <ol className="mt-6 space-y-6 border-l border-gray-200 pl-5 dark:border-slate-800">
                        {notes.map((note) => (
                            <li key={note.title} className="relative">
                                <span className="absolute -left-[25px] top-1.5 h-2 w-2 rounded-full bg-lime-500 ring-4 ring-white dark:bg-lime-400 dark:ring-slate-950"/>
                                <p className="text-xs font-medium text-gray-500 dark:text-slate-500">{note.date}</p>
                                <h3 className="mt-1 text-base font-semibold text-gray-900 dark:text-white">{note.title}</h3>
                                <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-slate-400">{note.body}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </div>
    );
};
