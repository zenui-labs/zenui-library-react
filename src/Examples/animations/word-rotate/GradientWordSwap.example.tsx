import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {animate, AnimatePresence, motion, useInView, useMotionValue, useReducedMotion} from "framer-motion";
import type {AnimationPlaybackControls} from "framer-motion";

interface Word {
    text: string;
    gradient: string;
    bar: string;
}

const words: Word[] = [
    {text: "organized", gradient: "from-sky-500 to-indigo-500 dark:from-sky-400 dark:to-indigo-400", bar: "bg-indigo-500"},
    {text: "searchable", gradient: "from-fuchsia-500 to-rose-500 dark:from-fuchsia-400 dark:to-rose-400", bar: "bg-rose-500"},
    {text: "shared", gradient: "from-amber-500 to-orange-600 dark:from-amber-300 dark:to-orange-400", bar: "bg-orange-500"},
    {text: "always in sync", gradient: "from-emerald-500 to-teal-600 dark:from-emerald-300 dark:to-teal-400", bar: "bg-teal-500"},
];

const DURATION = 3; // seconds per word

// The word slides up out of a blur while the space around it resizes to fit, and each word has its own gradient.
// The segments underneath show progress and jump straight to a word when clicked.
const GradientWordSwap = () => {
    const ref = useRef<HTMLDivElement>(null);
    const measureRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const inView = useInView(ref);
    const reduceMotion = useReducedMotion();
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const [widths, setWidths] = useState<number[]>([]);

    useLayoutEffect(() => {
        const measure = () => setWidths(measureRefs.current.map((element) => element?.offsetWidth ?? 0));
        measure();
        const observer = new ResizeObserver(measure);
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    const running = inView && !paused;
    const progress = useMotionValue(0);
    const controls = useRef<AnimationPlaybackControls | null>(null);
    const runningRef = useRef(running);
    runningRef.current = running;

    // Each word gets a fresh countdown that fills its segment. Clicking a segment restarts it.
    useEffect(() => {
        progress.set(0);
        controls.current = animate(progress, 1, {
            duration: DURATION,
            ease: "linear",
            onComplete: () => setIndex((value) => (value + 1) % words.length),
        });
        if (!runningRef.current) controls.current.pause();
        return () => controls.current?.stop();
    }, [index, progress]);

    // Hovering or scrolling away pauses the countdown where it is.
    useEffect(() => {
        if (running) controls.current?.play();
        else controls.current?.pause();
    }, [running]);

    const word = words[index];

    return (
        <div
            ref={ref}
            onPointerEnter={() => setPaused(true)}
            onPointerLeave={() => setPaused(false)}
            className="relative w-full max-w-2xl text-center"
        >
            <h2 className="text-4xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-6xl">
                <span className="sr-only">Your notes, organized, searchable, shared and always in sync.</span>
                <span aria-hidden="true">
                    Your notes,
                    <br/>
                    <motion.span
                        className="relative inline-flex h-[1.2em] justify-center overflow-hidden align-bottom"
                        initial={false}
                        animate={widths[index] ? {width: widths[index]} : undefined}
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

            <div className="mx-auto mt-8 flex max-w-xs gap-2" role="group" aria-label="Choose a word">
                {words.map((item, position) => {
                    const state = position === index ? "current" : position < index ? "done" : "next";
                    return (
                        <button
                            key={item.text}
                            type="button"
                            onClick={() => setIndex(position)}
                            aria-label={`Show "${item.text}"`}
                            aria-current={position === index ? "true" : undefined}
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
            <p className="mt-2 text-xs text-gray-500 dark:text-slate-400">{paused ? "Paused while you hover" : "Hover to pause"}</p>

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

export default GradientWordSwap;
