import {useId, useState} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";

export interface ChecklistTask {
    id: string;
    label: string;
    /** Small line under the label, such as a due date. */
    meta?: string;
}

export interface DrawnChecklistProps {
    title: string;
    tasks: ChecklistTask[];
    /** Ids of the checked tasks. Pass it with `onChange` to control the list. */
    value?: string[];
    defaultValue?: string[];
    onChange?: (checkedIds: string[]) => void;
    /** Shown once every task is checked. */
    completeMessage?: string;
    className?: string;
}

const RING = 2 * Math.PI * 16;

/** A checklist where checking a task draws the tick, strikes through the label and moves the progress ring. */
export const DrawnChecklist = ({
    title,
    tasks,
    value,
    defaultValue = [],
    onChange,
    completeMessage = "Everything on the list is done.",
    className = "",
}: DrawnChecklistProps) => {
    const reduceMotion = useReducedMotion();
    const [innerValue, setInnerValue] = useState<string[]>(defaultValue);
    const done = new Set(value ?? innerValue);
    const titleId = useId();
    const doneCount = tasks.filter((task) => done.has(task.id)).length;
    const progress = tasks.length ? doneCount / tasks.length : 0;
    const allDone = tasks.length > 0 && doneCount === tasks.length;

    const toggle = (id: string) => {
        const next = new Set(done);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        const ids = tasks.filter((task) => next.has(task.id)).map((task) => task.id);
        if (value === undefined) setInnerValue(ids);
        onChange?.(ids);
    };

    const draw = reduceMotion ? {duration: 0} : {duration: 0.3, ease: [0.65, 0, 0.35, 1] as const};

    return (
        <section aria-labelledby={titleId} className={`w-full max-w-md rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900 ${className}`}>
            <header className="flex items-center justify-between gap-4">
                <div>
                    <h3 id={titleId} className="text-base font-semibold text-gray-900 dark:text-white">{title}</h3>
                    <p className="text-sm text-gray-500 dark:text-slate-400" aria-live="polite">
                        {doneCount} of {tasks.length} done
                    </p>
                </div>
                <svg viewBox="0 0 40 40" className="h-11 w-11 -rotate-90" aria-hidden="true">
                    <circle cx="20" cy="20" r="16" fill="none" strokeWidth="4" className="stroke-gray-100 dark:stroke-slate-800"/>
                    <motion.circle
                        cx="20"
                        cy="20"
                        r="16"
                        fill="none"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray={RING}
                        className={allDone ? "stroke-emerald-500" : "stroke-violet-500"}
                        initial={false}
                        animate={{strokeDashoffset: RING * (1 - progress)}}
                        transition={{type: "spring", stiffness: 120, damping: 20}}
                    />
                </svg>
            </header>

            <ul className="mt-4 space-y-1">
                {tasks.map((task) => {
                    const checked = done.has(task.id);
                    return (
                        <li key={task.id}>
                            <label className="group flex cursor-pointer items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-gray-50 dark:hover:bg-slate-800/60">
                                <input type="checkbox" checked={checked} onChange={() => toggle(task.id)} className="peer sr-only"/>
                                <motion.span
                                    className="mt-0.5 flex rounded-md peer-focus-visible:ring-2 peer-focus-visible:ring-violet-500 peer-focus-visible:ring-offset-2 dark:peer-focus-visible:ring-offset-slate-900"
                                    whileTap={{scale: 0.85}}
                                >
                                    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                                        <motion.rect
                                            x="1.5"
                                            y="1.5"
                                            width="21"
                                            height="21"
                                            rx="6"
                                            strokeWidth="2"
                                            initial={false}
                                            animate={{scale: checked ? [1, 0.88, 1] : 1}}
                                            transition={{duration: 0.25}}
                                            style={{transformOrigin: "center"}}
                                            className={`transition-colors duration-200 ${
                                                checked
                                                    ? "fill-violet-600 stroke-violet-600 dark:fill-violet-500 dark:stroke-violet-500"
                                                    : "fill-white stroke-gray-300 group-hover:stroke-gray-400 dark:fill-slate-900 dark:stroke-slate-600"
                                            }`}
                                        />
                                        <motion.path
                                            d="M7 12.5l3.2 3.2L17 8.8"
                                            fill="none"
                                            stroke="white"
                                            strokeWidth="2.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            initial={false}
                                            animate={{pathLength: checked ? 1 : 0, opacity: checked ? 1 : 0}}
                                            transition={checked ? {...draw, delay: reduceMotion ? 0 : 0.08} : {duration: 0.12}}
                                        />
                                    </svg>
                                </motion.span>
                                <span className="min-w-0 flex-1">
                                    {/* The strike line is a background that grows across every wrapped line in reading order. */}
                                    <motion.span
                                        className={`bg-[linear-gradient(currentColor,currentColor)] bg-no-repeat text-sm transition-colors duration-300 [background-position:0_55%] ${
                                            checked ? "text-gray-400 dark:text-slate-500" : "text-gray-900 dark:text-white"
                                        }`}
                                        initial={false}
                                        animate={{backgroundSize: checked ? "100% 1px" : "0% 1px"}}
                                        transition={checked ? {...draw, duration: reduceMotion ? 0 : 0.4, delay: reduceMotion ? 0 : 0.2} : {duration: 0.15}}
                                    >
                                        {task.label}
                                    </motion.span>
                                    {task.meta && <span className="block text-xs text-gray-500 dark:text-slate-400">{task.meta}</span>}
                                </span>
                            </label>
                        </li>
                    );
                })}
            </ul>

            <AnimatePresence>
                {allDone && (
                    <motion.p
                        initial={{opacity: 0, height: 0}}
                        animate={{opacity: 1, height: "auto"}}
                        exit={{opacity: 0, height: 0}}
                        className="overflow-hidden text-sm font-medium text-emerald-600 dark:text-emerald-400"
                    >
                        <span className="block pt-3">{completeMessage}</span>
                    </motion.p>
                )}
            </AnimatePresence>
        </section>
    );
};
