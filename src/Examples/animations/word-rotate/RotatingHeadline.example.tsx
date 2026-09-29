import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {AnimatePresence, motion, useInView, useReducedMotion} from "framer-motion";
import type {Variants} from "framer-motion";

const words = ["fast", "friendly", "accessible", "on brand"];
const INTERVAL = 2600;

const letter: Variants = {
    hidden: {y: "70%", opacity: 0, filter: "blur(6px)"},
    visible: (index: number) => ({
        y: "0%",
        opacity: 1,
        filter: "blur(0px)",
        transition: {delay: index * 0.035, duration: 0.5, ease: [0.16, 1, 0.3, 1]},
    }),
    exit: (index: number) => ({
        y: "-60%",
        opacity: 0,
        filter: "blur(6px)",
        transition: {delay: index * 0.02, duration: 0.25, ease: [0.7, 0, 0.84, 0]},
    }),
};

// The highlighted word changes every few seconds. Its pill resizes to fit the next word,
// and letters enter one by one. Rotation stops while the headline is off screen.
const RotatingHeadline = () => {
    const ref = useRef<HTMLDivElement>(null);
    const measureRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const [index, setIndex] = useState(0);
    const [widths, setWidths] = useState<number[]>([]);
    const inView = useInView(ref);
    const reduceMotion = useReducedMotion();

    // Measure every word once (and again when fonts or the viewport change) so the pill can animate its width.
    useLayoutEffect(() => {
        const measure = () => setWidths(measureRefs.current.map((element) => element?.offsetWidth ?? 0));
        measure();
        const observer = new ResizeObserver(measure);
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (!inView) return;
        const timer = window.setInterval(() => setIndex((value) => (value + 1) % words.length), INTERVAL);
        return () => window.clearInterval(timer);
    }, [inView]);

    const word = words[index];

    return (
        <div ref={ref} className="relative w-full max-w-2xl text-center">
            <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">Form builder</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
                <span className="sr-only">Build forms that feel fast, friendly, accessible and on brand.</span>
                <span aria-hidden="true" className="block">
                    Build forms that feel
                    <br/>
                    <motion.span
                        className="relative mt-2 inline-flex h-[1.35em] items-center justify-center overflow-hidden rounded-2xl bg-indigo-50 align-bottom text-indigo-600 ring-1 ring-inset ring-indigo-100 dark:bg-indigo-500/10 dark:text-indigo-300 dark:ring-indigo-500/20"
                        initial={false}
                        animate={widths[index] ? {width: widths[index] + 32} : undefined}
                        transition={reduceMotion ? {duration: 0} : {type: "spring", stiffness: 260, damping: 30}}
                    >
                        <AnimatePresence mode="popLayout" initial={false}>
                            <motion.span key={word} className="flex whitespace-pre px-4" initial="hidden" animate="visible" exit="exit">
                                {word.split("").map((character, position) => (
                                    <motion.span
                                        key={`${word}-${position}`}
                                        custom={position}
                                        variants={reduceMotion ? undefined : letter}
                                        className="inline-block"
                                    >
                                        {character}
                                    </motion.span>
                                ))}
                            </motion.span>
                        </AnimatePresence>
                    </motion.span>
                </span>
            </h2>
            <p className="mx-auto mt-5 max-w-md text-base leading-7 text-gray-600 dark:text-slate-400">
                Drag in fields, set validation rules and publish to any page. Responses sync to your spreadsheet as they arrive.
            </p>

            {/* Hidden copies used only to measure each word at the headline's font size. */}
            <div aria-hidden="true" className="pointer-events-none invisible absolute h-0 overflow-hidden text-3xl font-semibold tracking-tight sm:text-5xl">
                {words.map((item, position) => (
                    <span
                        key={item}
                        ref={(element) => {
                            measureRefs.current[position] = element;
                        }}
                        className="inline-flex whitespace-pre"
                    >
                        {/* Letters are split the same way as the visible word, so the widths match exactly. */}
                        {item.split("").map((character, letterIndex) => (
                            <span key={letterIndex} className="inline-block">{character}</span>
                        ))}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default RotatingHeadline;
