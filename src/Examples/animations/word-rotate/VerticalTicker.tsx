import {useEffect, useRef, useState} from "react";
import type {ReactNode} from "react";
import {animate, motion, useInView, useMotionValue, useReducedMotion, useTransform} from "framer-motion";

const ROW = 1.25; // em

export interface VerticalTickerProps {
    /** Words on the drum, in the order they turn. */
    words: string[];
    /** Headline text before the drum. */
    lead?: string;
    /** Paragraph under the headline. */
    description?: ReactNode;
    /** Time each word stays in the middle row, in milliseconds. */
    interval?: number;
    className?: string;
}

// A drum of words that turns one row at a time. The words above and below the current one
// stay visible and fade out, so readers see where the list is going.
export const VerticalTicker = ({
    words,
    lead = "Built for",
    description = "One shared workspace for planning, docs and reviews. Hover the list to hold it still.",
    interval = 2200,
    className = "",
}: VerticalTickerProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref);
    const reduceMotion = useReducedMotion();
    const [hovered, setHovered] = useState(false);
    const [active, setActive] = useState(0);
    const count = words.length;
    // Position in rows. It runs past the end onto a copy of the list, then jumps back without animating.
    const position = useMotionValue(0);
    const y = useTransform(position, (value) => `${-value * ROW}em`);

    useEffect(() => {
        if (!inView || hovered) return;
        const timer = window.setInterval(() => {
            const next = Math.round(position.get()) + 1;
            setActive(next % count);
            if (reduceMotion) {
                position.set(next % count);
                return;
            }
            animate(position, next, {
                type: "spring",
                stiffness: 120,
                damping: 18,
                onComplete: () => {
                    if (next >= count) position.set(next - count);
                },
            });
        }, interval);
        return () => window.clearInterval(timer);
    }, [inView, hovered, reduceMotion, position, count, interval]);

    // One copy before and after the list keeps a neighbor above and below at both ends.
    const rows = [words[count - 1], ...words, ...words.slice(0, 2)];

    return (
        <div
            ref={ref}
            onPointerEnter={() => setHovered(true)}
            onPointerLeave={() => setHovered(false)}
            className={`w-full max-w-3xl ${className}`}
        >
            <h2 className="flex flex-col items-center gap-x-4 text-center text-4xl font-semibold tracking-tight text-gray-900 dark:text-white sm:flex-row sm:justify-center sm:text-left sm:text-6xl">
                <span className="sr-only">{`${lead} ${words.join(", ")}.`}</span>
                <span aria-hidden="true">{lead}</span>
                <span
                    aria-hidden="true"
                    className="relative block h-[3.75em] overflow-hidden [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)] [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]"
                    style={{lineHeight: `${ROW}em`}}
                >
                    <motion.span className="block" style={{y}}>
                        {rows.map((word, index) => {
                            const isActive = (index - 1 + count) % count === active;
                            return (
                                <span
                                    key={`${word}-${index}`}
                                    className={`block whitespace-nowrap transition-colors duration-500 ${
                                        isActive ? "text-indigo-600 dark:text-indigo-400" : "text-gray-300 dark:text-slate-600"
                                    }`}
                                    style={{height: `${ROW}em`}}
                                >
                                    {word}
                                </span>
                            );
                        })}
                    </motion.span>
                </span>
            </h2>
            {description && (
                <p className="mx-auto mt-4 max-w-md text-center text-base leading-7 text-gray-600 dark:text-slate-400">{description}</p>
            )}
        </div>
    );
};
