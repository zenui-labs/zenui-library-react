import {useState} from "react";
import {motion, useReducedMotion} from "framer-motion";
import type {Variants} from "framer-motion";
import {LuRotateCcw} from "react-icons/lu";

const headline = "Release notes your customers actually read";
const subline = "Draft, review and publish product updates from the same place you plan them.";

const ease = [0.22, 1, 0.36, 1] as const;

const group: Variants = {
    hidden: {},
    visible: {transition: {staggerChildren: 0.07, delayChildren: 0.1}},
};

// Each word starts blurred, transparent and slightly low, then settles into focus.
const word: Variants = {
    hidden: {opacity: 0, y: 14, filter: "blur(10px)"},
    visible: {opacity: 1, y: 0, filter: "blur(0px)", transition: {duration: 0.8, ease}},
};

const fadeOnly: Variants = {
    hidden: {opacity: 0},
    visible: {opacity: 1, transition: {duration: 0.4}},
};

const BlurInWords = () => {
    const reduceMotion = useReducedMotion();
    const [run, setRun] = useState(0);
    const wordVariants = reduceMotion ? fadeOnly : word;
    const words = headline.split(" ");

    return (
        <div className="w-full max-w-2xl text-center">
            {/* Changing the key remounts the block, which plays the animation again. */}
            <motion.div key={run} initial="hidden" whileInView="visible" viewport={{once: true, amount: 0.6}} variants={group}>
                <motion.span
                    variants={wordVariants}
                    className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                >
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-500"/>
                    Changelog 4.2
                </motion.span>

                <h2 className="mt-5 text-3xl font-semibold leading-[1.1] tracking-tight text-gray-900 sm:text-5xl dark:text-white">
                    <span className="sr-only">{headline}</span>
                    <span aria-hidden="true">
                        {words.map((text, index) => (
                            <motion.span key={`${text}-${index}`} variants={wordVariants} className="inline-block">
                                {text}
                                {index < words.length - 1 ? "\u00A0" : ""}
                            </motion.span>
                        ))}
                    </span>
                </h2>

                <motion.p variants={wordVariants} className="mx-auto mt-5 max-w-md text-base leading-7 text-gray-600 dark:text-slate-400">
                    {subline}
                </motion.p>
            </motion.div>

            <button
                type="button"
                onClick={() => setRun((value) => value + 1)}
                className="mt-8 inline-flex items-center gap-2 rounded-full border border-gray-200 px-3.5 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:focus-visible:ring-offset-slate-950"
            >
                <LuRotateCcw className="h-4 w-4" aria-hidden="true"/>
                Replay
            </button>
        </div>
    );
};

export default BlurInWords;
