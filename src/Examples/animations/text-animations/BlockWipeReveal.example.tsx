import {useState} from "react";
import {motion, useReducedMotion} from "framer-motion";
import {LuRotateCcw} from "react-icons/lu";

interface WipeLine {
    text: string;
    barClassName: string;
    textClassName: string;
}

const lines: WipeLine[] = [
    {text: "Annual report", barClassName: "bg-gray-900 dark:bg-white", textClassName: "text-gray-900 dark:text-white"},
    {text: "Revenue up 24%", barClassName: "bg-emerald-500 dark:bg-emerald-400", textClassName: "text-emerald-600 dark:text-emerald-400"},
    {text: "in every region", barClassName: "bg-gray-900 dark:bg-white", textClassName: "text-gray-900 dark:text-white"},
];

const DURATION = 1.1;
const STAGGER = 0.18;
const ease = [0.77, 0, 0.18, 1] as const;

// A solid bar slides in from the left, covers the line, then leaves to the right.
// The text switches on at the exact moment the bar covers it, so it seems to be printed by the bar.
const BlockWipeReveal = () => {
    const reduceMotion = useReducedMotion();
    const [run, setRun] = useState(0);

    return (
        <div className="w-full max-w-2xl">
            <div key={run}>
                <h2 className="sr-only">{lines.map((line) => line.text).join(" ")}</h2>
                {lines.map((line, index) => {
                    const delay = index * STAGGER;
                    return (
                        <div key={line.text} aria-hidden="true" className="relative w-fit overflow-hidden py-0.5">
                            <motion.span
                                className={`block text-[2rem] font-black uppercase leading-none tracking-tight sm:text-6xl ${line.textClassName}`}
                                initial={{opacity: 0}}
                                whileInView={{opacity: reduceMotion ? 1 : [0, 0, 1, 1]}}
                                viewport={{once: true, amount: 0.8}}
                                transition={reduceMotion ? {duration: 0.4, delay} : {duration: DURATION, delay, times: [0, 0.5, 0.501, 1]}}
                            >
                                {line.text}
                            </motion.span>
                            {!reduceMotion && (
                                <motion.span
                                    className={`absolute inset-0 ${line.barClassName}`}
                                    initial={{x: "-101%"}}
                                    whileInView={{x: ["-101%", "0%", "0%", "101%"]}}
                                    viewport={{once: true, amount: 0.8}}
                                    transition={{duration: DURATION, delay, times: [0, 0.45, 0.55, 1], ease}}
                                />
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="mt-8 grid grid-cols-3 gap-4 border-t border-gray-200 pt-5 text-sm dark:border-slate-800">
                <div>
                    <p className="text-gray-500 dark:text-slate-500">Revenue</p>
                    <p className="mt-1 font-semibold text-gray-900 dark:text-white">$84.2M</p>
                </div>
                <div>
                    <p className="text-gray-500 dark:text-slate-500">Customers</p>
                    <p className="mt-1 font-semibold text-gray-900 dark:text-white">12,480</p>
                </div>
                <div className="flex items-start justify-end">
                    <button
                        type="button"
                        onClick={() => setRun((value) => value + 1)}
                        className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1.5 font-medium text-gray-700 transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800 dark:focus-visible:ring-offset-slate-950"
                    >
                        <LuRotateCcw className="h-4 w-4" aria-hidden="true"/>
                        Replay
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BlockWipeReveal;
