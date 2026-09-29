import {useEffect, useRef, useState} from "react";
import type {ReactNode} from "react";
import {AnimatePresence, motion, MotionConfig, useInView} from "framer-motion";
import type {Variants} from "framer-motion";

export interface MarkerPhrase {
    text: string;
    /** Background classes for the highlighter stroke behind this phrase, for example "bg-yellow-200". */
    marker: string;
}

const ease = [0.65, 0, 0.35, 1] as const;

const marker: Variants = {
    hidden: {scaleX: 0, originX: 0, rotate: -1},
    visible: {scaleX: 1, originX: 0, rotate: -1, transition: {duration: 0.45, ease}},
    exit: {scaleX: 0, originX: 1, rotate: -1, transition: {duration: 0.35, ease, delay: 0.12}},
};

const text: Variants = {
    hidden: {opacity: 0, y: 6},
    visible: {opacity: 1, y: 0, transition: {duration: 0.3, delay: 0.25}},
    exit: {opacity: 0, transition: {duration: 0.15}},
};

// Joins phrases as "a, b and c" for the sentence screen readers hear.
const formatList = (items: string[]) =>
    items.length > 1 ? `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}` : items.join("");

export interface MarkerSwipeProps {
    phrases: MarkerPhrase[];
    /** Headline text before the highlighted phrase. */
    lead?: string;
    /** Small line above the headline. Pass an empty string to hide it. */
    eyebrow?: string;
    /** Paragraph under the headline. */
    description?: ReactNode;
    /** Time each phrase stays on screen, in milliseconds. */
    interval?: number;
    className?: string;
}

// A highlighter stroke sweeps in from the left, the phrase appears on top of it,
// and on the way out the stroke leaves to the right, like a marker being dragged across a page.
export const MarkerSwipe = ({
    phrases,
    lead = "Plan the trip together, then",
    eyebrow = "Wayfare for groups",
    description = "One shared plan for flights, budgets and the group chat's restaurant debates. Free for groups of up to eight.",
    interval = 2800,
    className = "",
}: MarkerSwipeProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref);
    const [index, setIndex] = useState(0);
    const count = phrases.length;

    useEffect(() => {
        if (!inView) return;
        const timer = window.setInterval(() => setIndex((value) => (value + 1) % count), interval);
        return () => window.clearInterval(timer);
    }, [inView, count, interval]);

    const phrase = phrases[index % count];

    return (
        <MotionConfig reducedMotion="user">
            <div
                ref={ref}
                className={`w-full max-w-xl rounded-3xl border border-stone-200 bg-stone-50 p-6 dark:border-stone-800 dark:bg-stone-900 sm:p-10 ${className}`}
            >
                {eyebrow && <p className="text-sm font-medium text-stone-500 dark:text-stone-400">{eyebrow}</p>}
                <h2 className="mt-3 font-serif text-3xl leading-tight text-stone-900 dark:text-stone-50 sm:text-5xl">
                    <span className="sr-only">{`${lead} ${formatList(phrases.map((item) => item.text))}.`}</span>
                    <span aria-hidden="true">
                        {lead}
                        <br/>
                        <span className="relative inline-block min-h-[1.25em]">
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.span key={phrase.text} className="relative inline-block px-1" initial="hidden" animate="visible" exit="exit">
                                    <motion.span
                                        variants={marker}
                                        className={`absolute inset-x-0 bottom-[0.08em] top-[0.28em] rounded-[0.2em_0.5em_0.3em_0.6em] ${phrase.marker}`}
                                    />
                                    <motion.span variants={text} className="relative inline-block whitespace-nowrap italic">
                                        {phrase.text}
                                    </motion.span>
                                </motion.span>
                            </AnimatePresence>
                        </span>
                    </span>
                </h2>
                {description && (
                    <p className="mt-5 max-w-md text-base leading-7 text-stone-600 dark:text-stone-400">{description}</p>
                )}
            </div>
        </MotionConfig>
    );
};
