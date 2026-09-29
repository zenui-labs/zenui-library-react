import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {animate, AnimatePresence, motion, useInView, useMotionValue, useReducedMotion} from "framer-motion";
import type {AnimationPlaybackControls} from "framer-motion";

export interface GradientWord {
    text: string;
    /** Tailwind gradient stops for the text, for example "from-sky-500 to-indigo-500". */
    gradient: string;
    /** Background class that fills this word's progress segment, for example "bg-indigo-500". */
    bar: string;
}

// Joins words as "a, b and c" for the sentence screen readers hear.
const formatList = (items: string[]) =>
    items.length > 1 ? `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}` : items.join("");

export interface GradientWordSwapProps {
    words: GradientWord[];
    /** Headline text before the rotating word. */
    lead?: string;
    /** Seconds each word stays on screen. */
    duration?: number;
    /** Accessible name for the row of progress segments. */
    segmentsLabel?: string;
    /** Hint under the segments while the words rotate. */
    hint?: string;
    /** Hint under the segments while the pointer is over the component. */
    pausedHint?: string;
    className?: string;
}

// The word slides up out of a blur while the space around it resizes to fit, and each word has its own gradient.
// The segments underneath show progress and jump straight to a word when clicked.
export const GradientWordSwap = ({
    words,
    lead = "Your notes,",
    duration = 3,
    segmentsLabel = "Choose a word",
    hint = "Hover to pause",
    pausedHint = "Paused while you hover",
    className = "",
}: GradientWordSwapProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const measureRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const inView = useInView(ref);
    const reduceMotion = useReducedMotion();
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const [widths, setWidths] = useState<number[]>([]);
    const count = words.length;
    const wordsKey = words.map((item) => item.text).join("\n");

    useLayoutEffect(() => {
        const measure = () => setWidths(measureRefs.current.slice(0, count).map((element) => element?.offsetWidth ?? 0));
        measure();
        const observer = new ResizeObserver(measure);
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [count, wordsKey]);

    const running = inView && !paused;
    const progress = useMotionValue(0);
    const controls = useRef<AnimationPlaybackControls | null>(null);
    const runningRef = useRef(running);
    runningRef.current = running;

    // Each word gets a fresh countdown that fills its segment. Clicking a segment restarts it.
    useEffect(() => {
        progress.set(0);
        controls.current = animate(progress, 1, {
            duration,
            ease: "linear",
            onComplete: () => setIndex((value) => (value + 1) % count),
        });
        if (!runningRef.current) controls.current.pause();
        return () => controls.current?.stop();
    }, [index, progress, duration, count]);

    // Hovering or scrolling away pauses the countdown where it is.
    useEffect(() => {
        if (running) controls.current?.play();
        else controls.current?.pause();
    }, [running]);

    const current = index % count;
    const word = words[current];

    return (
        <div
            ref={ref}
            onPointerEnter={() => setPaused(true)}
            onPointerLeave={() => setPaused(false)}
            className={`relative w-full max-w-2xl text-center ${className}`}
        >
            <h2 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                <span className="sr-only">{`${lead} ${formatList(words.map((item) => item.text))}.`}</span>
                <span aria-hidden="true">
                    {lead}
                    <br/>
                    <motion.span
                        className="relative inline-flex h-[1.2em] justify-center overflow-hidden align-bottom"
                        initial={false}
                        animate={widths[current] ? {width: widths[current]} : undefined}
                        transition={reduceMotion ? {duration: 0} : {type: "spring", stiffness: 200, damping: 26}}
                    >
                        <AnimatePresence mode="popLayout" initial={false}>
                            <motion.span
                                key={word.text}
                                initial={reduceMotion ? {opacity: 0} : {y: "60%", opacity: 0, filter: "blur(10px)"}}
                                animate={{y: "0%", opacity: 1, filter: "blur(0px)"}}
                                exit={reduceMotion ? {opacity: 0} : {y: "-60%", opacity: 0, filter: "blur(10px)"}}
                                transition={{duration: 0.55, ease: [0.16, 1, 0.3, 1]}}
                                className={`whitespace-nowrap bg-gradient-to-r bg-clip-text pb-[0.1em] text-transparent ${word.gradient}`}
                            >
                                {word.text}
                            </motion.span>
                        </AnimatePresence>
                    </motion.span>
                </span>
            </h2>

            <div className="mx-auto mt-8 flex max-w-xs gap-2" role="group" aria-label={segmentsLabel}>
                {words.map((item, position) => {
                    const state = position === current ? "current" : position < current ? "done" : "next";
                    return (
                        <button
                            key={item.text}
                            type="button"
                            onClick={() => setIndex(position)}
                            aria-label={`Show "${item.text}"`}
                            aria-current={position === current ? "true" : undefined}
                            className="group flex-1 rounded-full py-2 focus-visible:outline-none"
                        >
                            <span className="relative block h-1 overflow-hidden rounded-full bg-gray-200 ring-offset-2 group-hover:bg-gray-300 group-focus-visible:ring-2 group-focus-visible:ring-indigo-500 dark:bg-slate-800 dark:ring-offset-slate-950 dark:group-hover:bg-slate-700">
                                {state === "done" && <span className={`absolute inset-0 opacity-40 ${item.bar}`}/>}
                                {state === "current" && (
                                    <motion.span style={{scaleX: progress}} className={`absolute inset-0 origin-left ${item.bar}`}/>
                                )}
                            </span>
                        </button>
                    );
                })}
            </div>
            <p className="mt-2 text-xs text-gray-500 dark:text-slate-400">{paused ? pausedHint : hint}</p>

            {/* Hidden copies at the headline's size, used to measure each word. */}
            <div aria-hidden="true" className="pointer-events-none invisible absolute h-0 overflow-hidden text-4xl font-semibold tracking-tight sm:text-6xl">
                {words.map((item, position) => (
                    <span
                        key={item.text}
                        ref={(element) => {
                            measureRefs.current[position] = element;
                        }}
                        className="inline-block whitespace-nowrap"
                    >
                        {item.text}
                    </span>
                ))}
            </div>
        </div>
    );
};
