import {useEffect, useRef, useState} from "react";
import {AnimatePresence, motion, MotionConfig, useInView} from "framer-motion";
import type {Variants} from "framer-motion";

interface Phrase {
    text: string;
    marker: string;
}

const phrases: Phrase[] = [
    {text: "book the flights", marker: "bg-yellow-200 dark:bg-yellow-400/30"},
    {text: "split the costs", marker: "bg-lime-200 dark:bg-lime-400/25"},
    {text: "share the itinerary", marker: "bg-pink-200 dark:bg-pink-400/25"},
    {text: "vote on dinner", marker: "bg-sky-200 dark:bg-sky-400/25"},
];

const INTERVAL = 2800;
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

// A highlighter stroke sweeps in from the left, the phrase appears on top of it,
// and on the way out the stroke leaves to the right, like a marker being dragged across a page.
const MarkerSwipe = () => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (!inView) return;
        const timer = window.setInterval(() => setIndex((value) => (value + 1) % phrases.length), INTERVAL);
        return () => window.clearInterval(timer);
    }, [inView]);

    const phrase = phrases[index];

    return (
        <MotionConfig reducedMotion="user">
            <div ref={ref} className="w-full max-w-xl rounded-3xl border border-stone-200 bg-stone-50 p-6 dark:border-stone-800 dark:bg-stone-900 sm:p-10">
                <p className="text-sm font-medium text-stone-500 dark:text-stone-400">Wayfare for groups</p>
                <h2 className="mt-3 font-serif text-3xl leading-tight text-stone-900 dark:text-stone-50 sm:text-5xl">
                    <span className="sr-only">Plan the trip together, then book the flights, split the costs, share the itinerary and vote on dinner.</span>
                    <span aria-hidden="true">
                        Plan the trip together, then
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
                <p className="mt-5 max-w-md text-base leading-7 text-stone-600 dark:text-stone-400">
                    One shared plan for flights, budgets and the group chat's restaurant debates. Free for groups of up to eight.
                </p>
            </div>
        </MotionConfig>
    );
};

export default MarkerSwipe;
