import {useState} from "react";
import {motion, useReducedMotion} from "framer-motion";
import type {Variants} from "framer-motion";
import {LuRotateCcw} from "react-icons/lu";

interface Line {
    text: string;
    /** Accent lines get a color ramp from orange to fuchsia, one step per letter. */
    accent?: boolean;
}

const lines: Line[] = [
    {text: "Design at the"},
    {text: "speed of thought", accent: true},
];

// A gradient with bg-clip-text would restart on every letter, so the ramp is computed per letter instead.
const accentColor = (index: number, count: number) => `hsl(${24 - (index / Math.max(count - 1, 1)) * 92} 90% 57%)`;

const ease = [0.16, 1, 0.3, 1] as const;

const lineGroup: Variants = {
    hidden: {},
    visible: (lineIndex: number) => ({
        transition: {staggerChildren: 0.028, delayChildren: 0.15 + lineIndex * 0.22},
    }),
};

// Letters rise out of a clipped line, tilting back upright as they land.
const letter: Variants = {
    hidden: {y: "110%", rotate: 12},
    visible: {y: "0%", rotate: 0, transition: {duration: 0.9, ease}},
};

const letterReduced: Variants = {
    hidden: {opacity: 0},
    visible: {opacity: 1, transition: {duration: 0.3}},
};

const LetterPullUp = () => {
    const reduceMotion = useReducedMotion();
    const [run, setRun] = useState(0);
    const variants = reduceMotion ? letterReduced : letter;

    return (
        <div className="w-full max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gray-500 dark:text-slate-500">Canvas studio</p>

            <h2 key={run} className="mt-3 text-[2.6rem] font-bold leading-[0.95] tracking-tighter sm:text-7xl">
                <span className="sr-only">{lines.map((line) => line.text).join(" ")}</span>
                {lines.map((line, lineIndex) => (
                    // Each line clips its letters, so they appear to slide up out of nothing.
                    // The bottom padding keeps descenders such as "g" and "p" from being cut off.
                    <motion.span
                        key={line.text}
                        aria-hidden="true"
                        custom={lineIndex}
                        variants={lineGroup}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{once: true, amount: 0.8}}
                        className="block overflow-hidden pb-[0.12em]"
                    >
                        {Array.from(line.text).map((character, index, all) => (
                            <motion.span
                                key={`${character}-${index}`}
                                variants={variants}
                                style={line.accent ? {color: accentColor(index, all.length)} : undefined}
                                className="inline-block origin-bottom-left text-gray-900 dark:text-white"
                            >
                                {character === " " ? "\u00A0" : character}
                            </motion.span>
                        ))}
                    </motion.span>
                ))}
            </h2>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 pt-5 dark:border-slate-800">
                <p className="max-w-sm text-sm leading-6 text-gray-600 dark:text-slate-400">
                    Sketch, prototype and hand off from one shared canvas. Used by 4,800 product teams.
                </p>
                <button
                    type="button"
                    onClick={() => setRun((value) => value + 1)}
                    className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 dark:bg-white dark:text-gray-900 dark:hover:bg-slate-200 dark:focus-visible:ring-offset-slate-950"
                >
                    <LuRotateCcw className="h-4 w-4" aria-hidden="true"/>
                    Replay
                </button>
            </div>
        </div>
    );
};

export default LetterPullUp;
