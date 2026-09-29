import {useId, useRef, useState} from "react";
import type {KeyboardEvent} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import type {IconType} from "react-icons";
import {LuAtSign, LuBell, LuBellOff, LuMessageCircle} from "react-icons/lu";

type Level = "all" | "mentions" | "direct" | "none";

interface LevelOption {
    value: Level;
    label: string;
    description: string;
    icon: IconType;
    estimate: string;
}

const levels: LevelOption[] = [
    {value: "all", label: "All activity", description: "Every new message, reaction and file", icon: LuBell, estimate: "About 120 notifications a day, based on the last 30 days"},
    {value: "mentions", label: "Mentions and replies", description: "When someone @mentions you or replies to a thread you follow", icon: LuAtSign, estimate: "About 14 notifications a day, based on the last 30 days"},
    {value: "direct", label: "Direct messages only", description: "Only messages sent to you", icon: LuMessageCircle, estimate: "About 5 notifications a day, based on the last 30 days"},
    {value: "none", label: "Nothing", description: "Mute this channel. You can still open it any time", icon: LuBellOff, estimate: "You will not get notifications from this channel"},
];

const VerticalOptions = () => {
    const [level, setLevel] = useState<Level>("mentions");
    const buttons = useRef<(HTMLButtonElement | null)[]>([]);
    const reduceMotion = useReducedMotion();
    const id = useId();
    const current = levels.find((option) => option.value === level) ?? levels[0];

    const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
        const keys: Record<string, number> = {ArrowDown: index + 1, ArrowRight: index + 1, ArrowUp: index - 1, ArrowLeft: index - 1, Home: 0, End: levels.length - 1};
        if (!(event.key in keys)) return;
        event.preventDefault();
        const next = (keys[event.key] + levels.length) % levels.length;
        setLevel(levels[next].value);
        buttons.current[next]?.focus();
    };

    return (
        <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-5 dark:border-white/10 dark:bg-zinc-900">
            <h3 id={`${id}-title`} className="text-sm font-semibold text-zinc-900 dark:text-white">
                Notifications for #product-launch
            </h3>
            <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">Applies to this channel on all your devices.</p>

            <div
                role="radiogroup"
                aria-labelledby={`${id}-title`}
                aria-orientation="vertical"
                className="mt-4 flex flex-col gap-1 rounded-2xl bg-zinc-100 p-1 ring-1 ring-inset ring-zinc-200/70 dark:bg-white/[0.04] dark:ring-white/[0.06]"
            >
                {levels.map((option, index) => {
                    const checked = option.value === level;
                    const Icon = option.icon;
                    return (
                        <button
                            key={option.value}
                            ref={(node) => {
                                buttons.current[index] = node;
                            }}
                            type="button"
                            role="radio"
                            aria-checked={checked}
                            aria-describedby={`${id}-${option.value}-description`}
                            tabIndex={checked ? 0 : -1}
                            onClick={() => setLevel(option.value)}
                            onKeyDown={(event) => onKeyDown(event, index)}
                            className="group relative flex items-start gap-3 rounded-xl p-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/70"
                        >
                            {checked && (
                                <motion.span
                                    layoutId={`${id}-thumb`}
                                    className="absolute inset-0 rounded-xl bg-white shadow-sm shadow-zinc-950/10 ring-1 ring-zinc-950/5 dark:bg-zinc-800 dark:shadow-black/40 dark:ring-white/10"
                                    transition={reduceMotion ? {duration: 0} : {type: "spring", stiffness: 460, damping: 38}}
                                />
                            )}
                            <span
                                className={`relative flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                                    checked
                                        ? option.value === "none"
                                            ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                                            : "bg-indigo-600 text-white"
                                        : "bg-white/60 text-zinc-500 group-hover:text-zinc-800 dark:bg-white/[0.04] dark:text-zinc-400 dark:group-hover:text-zinc-200"
                                }`}
                                aria-hidden
                            >
                                <Icon className="size-4"/>
                            </span>
                            <span className="relative min-w-0 flex-1">
                                <span className={`block text-sm font-medium transition-colors ${checked ? "text-zinc-900 dark:text-white" : "text-zinc-600 group-hover:text-zinc-900 dark:text-zinc-300 dark:group-hover:text-white"}`}>
                                    {option.label}
                                </span>
                                <span id={`${id}-${option.value}-description`} className="mt-0.5 block text-xs leading-5 text-zinc-500 dark:text-zinc-400">
                                    {option.description}
                                </span>
                            </span>
                            <span
                                className={`relative mt-2 flex size-4 shrink-0 items-center justify-center rounded-full border transition-colors ${
                                    checked ? "border-indigo-600 bg-indigo-600 dark:border-indigo-400 dark:bg-indigo-400" : "border-zinc-300 dark:border-zinc-600"
                                }`}
                                aria-hidden
                            >
                                {checked && <span className="size-1.5 rounded-full bg-white dark:bg-zinc-900"/>}
                            </span>
                        </button>
                    );
                })}
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400" aria-live="polite">
                <span className="size-1.5 rounded-full bg-indigo-500" aria-hidden/>
                <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                        key={current.value}
                        initial={reduceMotion ? {opacity: 0} : {opacity: 0, y: 4}}
                        animate={{opacity: 1, y: 0}}
                        exit={reduceMotion ? {opacity: 0} : {opacity: 0, y: -4}}
                        transition={{duration: 0.14}}
                    >
                        {current.estimate}
                    </motion.span>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default VerticalOptions;
