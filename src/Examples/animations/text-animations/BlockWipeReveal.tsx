import {useState} from "react";
import {motion, useReducedMotion} from "framer-motion";
import {LuRotateCcw} from "react-icons/lu";

export interface WipeLine {
    text: string;
    /** Background classes for the bar that wipes across this line. */
    barClassName?: string;
    /** Color classes for the line's text. */
    textClassName?: string;
}

export interface WipeStat {
    label: string;
    value: string;
}

const defaultBar = "bg-gray-900 dark:bg-white";
const defaultText = "text-gray-900 dark:text-white";
const ease = [0.77, 0, 0.18, 1] as const;

export interface BlockWipeRevealProps {
    /** Each entry is one line of the headline, revealed by its own bar. */
    lines: WipeLine[];
    /** Figures shown in the footer row, next to the replay button. */
    stats?: WipeStat[];
    replayLabel?: string;
    /** Seconds one bar takes to cross its line. */
    duration?: number;
    /** Seconds between one line and the next. */
    stagger?: number;
    className?: string;
}

// A solid bar slides in from the left, covers the line, then leaves to the right.
// The text switches on at the exact moment the bar covers it, so it seems to be printed by the bar.
export const BlockWipeReveal = ({
    lines,
    stats = [],
    replayLabel = "Replay",
    duration = 1.1,
    stagger = 0.18,
    className = "",
}: BlockWipeRevealProps) => {
    const reduceMotion = useReducedMotion();
    const [run, setRun] = useState(0);

    return (
        <div className={`w-full max-w-2xl ${className}`}>
            <div key={run}>
                <h2 className="sr-only">{lines.map((line) => line.text).join(" ")}</h2>
                {lines.map((line, index) => {
                    const delay = index * stagger;
                    return (
                        <div key={`${line.text}-${index}`} aria-hidden="true" className="relative w-fit overflow-hidden py-0.5">
                            <motion.span
                                className={`block text-[2rem] font-black uppercase leading-none tracking-tight sm:text-6xl ${line.textClassName ?? defaultText}`}
                                initial={{opacity: 0}}
                                whileInView={{opacity: reduceMotion ? 1 : [0, 0, 1, 1]}}
                                viewport={{once: true, amount: 0.8}}
                                transition={reduceMotion ? {duration: 0.4, delay} : {duration, delay, times: [0, 0.5, 0.501, 1]}}
                            >
                                {line.text}
                            </motion.span>
                            {!reduceMotion && (
                                <motion.span
                                    className={`absolute inset-0 ${line.barClassName ?? defaultBar}`}
                                    initial={{x: "-101%"}}
                                    whileInView={{x: ["-101%", "0%", "0%", "101%"]}}
                                    viewport={{once: true, amount: 0.8}}
                                    transition={{duration, delay, times: [0, 0.45, 0.55, 1], ease}}
                                />
                            )}
                        </div>
                    );
                })}
            </div>

            {/* One column per figure plus one for the replay button. */}
            <div
                className="mt-8 grid gap-4 border-t border-gray-200 pt-5 text-sm dark:border-slate-800"
                style={{gridTemplateColumns: `repeat(${stats.length + 1}, minmax(0, 1fr))`}}
            >
                {stats.map((stat) => (
                    <div key={stat.label}>
                        <p className="text-gray-500 dark:text-slate-500">{stat.label}</p>
                        <p className="mt-1 font-semibold text-gray-900 dark:text-white">{stat.value}</p>
                    </div>
                ))}
                <div className="flex items-start justify-end">
                    <button
                        type="button"
                        onClick={() => setRun((value) => value + 1)}
                        className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1.5 font-medium text-gray-700 transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:focus-visible:ring-offset-slate-950"
                    >
                        <LuRotateCcw className="h-4 w-4" aria-hidden="true"/>
                        {replayLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};
