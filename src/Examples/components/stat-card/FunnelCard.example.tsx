import {useRef, useState} from "react";
import type {KeyboardEvent} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";

interface Step {
    label: string;
    count: number;
    median: string;
}

const steps: Step[] = [
    {label: "Viewed pricing", count: 24_810, median: "Entry point"},
    {label: "Started trial", count: 3_720, median: "2 min after viewing pricing"},
    {label: "Activated", count: 1_860, median: "1.4 days after starting"},
    {label: "Paid", count: 612, median: "11 days after activating"},
];

const number = (value: number) => value.toLocaleString("en-US");
const percent = (value: number) => `${(value * 100).toFixed(value < 0.1 ? 1 : 0)}%`;

const FunnelCard = () => {
    const [selected, setSelected] = useState(3);
    const buttons = useRef<(HTMLButtonElement | null)[]>([]);
    const reduceMotion = useReducedMotion();
    const top = steps[0].count;
    const step = steps[selected];
    const previous = selected > 0 ? steps[selected - 1] : null;

    const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
        const keys: Record<string, number> = {ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: steps.length - 1};
        if (!(event.key in keys)) return;
        event.preventDefault();
        const next = Math.min(steps.length - 1, Math.max(0, keys[event.key]));
        setSelected(next);
        buttons.current[next]?.focus();
    };

    return (
        <div className="w-full max-w-lg rounded-2xl border border-zinc-200 bg-white p-5 dark:border-white/10 dark:bg-zinc-900">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Trial to paid conversion</p>
                    <p className="mt-1 text-2xl font-semibold tabular-nums tracking-tight text-zinc-900 dark:text-white">{percent(steps[3].count / steps[1].count)}</p>
                </div>
                <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs text-zinc-600 dark:bg-white/5 dark:text-zinc-300">Last 30 days</span>
            </div>

            <div role="radiogroup" aria-label="Funnel steps" className="mt-6 grid grid-cols-4 gap-2">
                {steps.map((item, index) => {
                    const share = item.count / top;
                    const checked = index === selected;
                    return (
                        <button
                            key={item.label}
                            ref={(node) => {
                                buttons.current[index] = node;
                            }}
                            type="button"
                            role="radio"
                            aria-checked={checked}
                            aria-label={`${item.label}, ${number(item.count)} people, ${percent(share)} of visitors`}
                            tabIndex={checked ? 0 : -1}
                            onClick={() => setSelected(index)}
                            onKeyDown={(event) => onKeyDown(event, index)}
                            className="group flex flex-col rounded-xl p-1.5 text-left outline-none transition-colors hover:bg-zinc-50 focus-visible:ring-2 focus-visible:ring-indigo-500/70 dark:hover:bg-white/[0.03]"
                        >
                            <span className="relative flex h-36 items-end overflow-hidden rounded-lg bg-zinc-100/80 dark:bg-white/[0.04]" aria-hidden>
                                <motion.span
                                    className={`w-full origin-bottom rounded-lg transition-colors ${
                                        checked ? "bg-gradient-to-t from-indigo-600 to-violet-500" : "bg-indigo-200 group-hover:bg-indigo-300 dark:bg-indigo-400/25 dark:group-hover:bg-indigo-400/40"
                                    }`}
                                    // Tiny steps still get a sliver so they stay visible.
                                    style={{height: `${Math.max(share * 100, 3)}%`}}
                                    initial={reduceMotion ? false : {scaleY: 0}}
                                    whileInView={{scaleY: 1}}
                                    viewport={{once: true}}
                                    transition={{duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1]}}
                                />
                            </span>
                            <span className="mt-2 truncate text-[11px] text-zinc-500 sm:text-xs dark:text-zinc-400" aria-hidden>
                                {item.label}
                            </span>
                            <span className="text-sm font-semibold tabular-nums text-zinc-900 dark:text-white" aria-hidden>
                                {number(item.count)}
                            </span>
                        </button>
                    );
                })}
            </div>

            <div className="mt-4 rounded-xl bg-zinc-50 p-4 dark:bg-white/[0.03]" aria-live="polite">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.dl
                        key={selected}
                        className="grid grid-cols-2 gap-4 text-sm"
                        initial={reduceMotion ? {opacity: 0} : {opacity: 0, y: 4}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.14}}
                    >
                        <div>
                            <dt className="text-xs text-zinc-500 dark:text-zinc-400">{previous ? `From ${previous.label.toLowerCase()}` : "Share of visitors"}</dt>
                            <dd className="mt-0.5 font-semibold tabular-nums text-zinc-900 dark:text-white">
                                {previous ? percent(step.count / previous.count) : "100%"}
                                {previous && (
                                    <span className="ml-1.5 text-xs font-normal text-rose-600 dark:text-rose-400">
                                        {number(previous.count - step.count)} dropped
                                    </span>
                                )}
                            </dd>
                        </div>
                        <div>
                            <dt className="text-xs text-zinc-500 dark:text-zinc-400">From first step</dt>
                            <dd className="mt-0.5 font-semibold tabular-nums text-zinc-900 dark:text-white">{percent(step.count / top)}</dd>
                        </div>
                        <div className="col-span-2">
                            <dt className="text-xs text-zinc-500 dark:text-zinc-400">Median time</dt>
                            <dd className="mt-0.5 text-zinc-800 dark:text-zinc-200">{step.median}</dd>
                        </div>
                    </motion.dl>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default FunnelCard;
