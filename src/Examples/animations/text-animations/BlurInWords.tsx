import {useState} from "react";
import {motion, useReducedMotion} from "framer-motion";
import type {Variants} from "framer-motion";
import {LuRotateCcw} from "react-icons/lu";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeOnly: Variants = {
    hidden: {opacity: 0},
    visible: {opacity: 1, transition: {duration: 0.4}},
};

export interface BlurInWordsProps {
    /** The headline. It is split on spaces and each word comes into focus in turn. */
    headline: string;
    /** Small pill above the headline, for example a release name. */
    badge?: string;
    /** Supporting line under the headline. */
    description?: string;
    replayLabel?: string;
    /** Set to false to hide the replay button. */
    showReplay?: boolean;
    /** Seconds between one word and the next. */
    stagger?: number;
    /** Seconds each word takes to come into focus. */
    duration?: number;
    /** Starting blur in pixels. */
    blur?: number;
    className?: string;
}

// Each word starts blurred, transparent and slightly low, then settles into focus.
export const BlurInWords = ({
    headline,
    badge,
    description,
    replayLabel = "Replay",
    showReplay = true,
    stagger = 0.07,
    duration = 0.8,
    blur = 10,
    className = "",
}: BlurInWordsProps) => {
    const reduceMotion = useReducedMotion();
    const [run, setRun] = useState(0);

    const group: Variants = {
        hidden: {},
        visible: {transition: {staggerChildren: stagger, delayChildren: 0.1}},
    };
    const word: Variants = {
        hidden: {opacity: 0, y: 14, filter: `blur(${blur}px)`},
        visible: {opacity: 1, y: 0, filter: "blur(0px)", transition: {duration, ease}},
    };
    const wordVariants = reduceMotion ? fadeOnly : word;
    const words = headline.split(" ");

    return (
        <div className={`w-full max-w-2xl text-center ${className}`}>
            {/* Changing the key remounts the block, which plays the animation again. */}
            <motion.div key={run} initial="hidden" whileInView="visible" viewport={{once: true, amount: 0.6}} variants={group}>
                {badge && (
                    <motion.span
                        variants={wordVariants}
                        className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                    >
                        <span className="h-1.5 w-1.5 rounded-full bg-violet-500"/>
                        {badge}
                    </motion.span>
                )}

                <h2 className={`${badge ? "mt-5 " : ""}text-3xl font-semibold leading-[1.1] tracking-tight text-gray-900 sm:text-5xl dark:text-white`}>
                    <span className="sr-only">{headline}</span>
                    <span aria-hidden="true">
                        {words.map((text, index) => (
                            <motion.span key={`${text}-${index}`} variants={wordVariants} className="inline-block">
                                {text}
                                {index < words.length - 1 ? " " : ""}
                            </motion.span>
                        ))}
                    </span>
                </h2>

                {description && (
                    <motion.p variants={wordVariants} className="mx-auto mt-5 max-w-md text-base leading-7 text-gray-600 dark:text-slate-400">
                        {description}
                    </motion.p>
                )}
            </motion.div>

            {showReplay && (
                <button
                    type="button"
                    onClick={() => setRun((value) => value + 1)}
                    className="mt-8 inline-flex items-center gap-2 rounded-full border border-gray-200 px-3.5 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:focus-visible:ring-offset-slate-950"
                >
                    <LuRotateCcw className="h-4 w-4" aria-hidden="true"/>
                    {replayLabel}
                </button>
            )}
        </div>
    );
};
