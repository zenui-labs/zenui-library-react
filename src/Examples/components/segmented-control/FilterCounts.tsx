import {useId, useMemo, useRef, useState} from "react";
import type {KeyboardEvent} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import type {IconType} from "react-icons";
import {LuGitMerge, LuGitPullRequest, LuGitPullRequestClosed, LuGitPullRequestDraft} from "react-icons/lu";

export interface FilterPillOption<T extends string> {
    value: T;
    label: string;
    /** Number shown in the badge next to the label. */
    count: number;
}

export interface FilterPillsProps<T extends string> {
    /** Accessible name for the radio group. */
    label: string;
    options: FilterPillOption<T>[];
    /** Selected value when controlled. */
    value?: T;
    /** Selected value on first render when uncontrolled. Defaults to the first option. */
    defaultValue?: T;
    onChange?: (value: T) => void;
    className?: string;
}

/** A pill-shaped filter bar with a count on each option. It scrolls sideways on narrow screens instead of wrapping. */
export const FilterPills = <T extends string>({label, options, value, defaultValue, onChange, className = ""}: FilterPillsProps<T>) => {
    const buttons = useRef<(HTMLButtonElement | null)[]>([]);
    const reduceMotion = useReducedMotion();
    const id = useId();
    const [internal, setInternal] = useState<T>(defaultValue ?? options[0].value);
    const current = value ?? internal;

    const change = (next: T) => {
        if (value === undefined) setInternal(next);
        onChange?.(next);
    };

    const select = (index: number) => {
        const next = (index + options.length) % options.length;
        change(options[next].value);
        const button = buttons.current[next];
        button?.focus();
        button?.scrollIntoView({block: "nearest", inline: "nearest"});
    };

    const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
        const keys: Record<string, number> = {ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: options.length - 1};
        if (!(event.key in keys)) return;
        event.preventDefault();
        select(keys[event.key]);
    };

    return (
        // Scrolls sideways on narrow screens instead of wrapping.
        <div className={`-mx-1 overflow-x-auto px-1 py-1 [scrollbar-width:none] ${className}`}>
            <div role="radiogroup" aria-label={label} className="inline-flex gap-1 rounded-full border border-zinc-200 bg-white p-1 shadow-sm dark:border-white/10 dark:bg-zinc-900">
                {options.map((option, index) => {
                    const checked = option.value === current;
                    return (
                        <button
                            key={option.value}
                            ref={(node) => {
                                buttons.current[index] = node;
                            }}
                            type="button"
                            role="radio"
                            aria-checked={checked}
                            tabIndex={checked ? 0 : -1}
                            onClick={() => change(option.value)}
                            onKeyDown={(event) => onKeyDown(event, index)}
                            className={`relative flex h-8 shrink-0 items-center gap-2 rounded-full pl-3.5 pr-2 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500/70 focus-visible:ring-offset-1 dark:focus-visible:ring-offset-zinc-900 ${
                                checked ? "text-white dark:text-zinc-900" : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                            }`}
                        >
                            {checked && (
                                <motion.span
                                    layoutId={`${id}-pill`}
                                    className="absolute inset-0 rounded-full bg-zinc-900 shadow-md shadow-zinc-900/20 dark:bg-white dark:shadow-black/40"
                                    transition={reduceMotion ? {duration: 0} : {type: "spring", stiffness: 480, damping: 36}}
                                />
                            )}
                            <span className="relative">{option.label}</span>
                            <span
                                className={`relative min-w-6 rounded-full px-1.5 py-px text-center text-xs tabular-nums transition-colors ${
                                    checked ? "bg-white/20 text-white dark:bg-zinc-900/10 dark:text-zinc-900" : "bg-zinc-100 text-zinc-500 dark:bg-white/[0.06] dark:text-zinc-400"
                                }`}
                            >
                                {option.count}
                            </span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export type PullRequestState = "open" | "draft" | "merged" | "closed";
export type PullRequestFilter = "all" | PullRequestState;

export interface PullRequest {
    id: number;
    title: string;
    author: string;
    state: PullRequestState;
    /** Relative time shown after the author, such as "3h ago". */
    updated: string;
}

const states: Record<PullRequestState, {icon: IconType; className: string; label: string}> = {
    open: {icon: LuGitPullRequest, className: "text-emerald-600 dark:text-emerald-400", label: "Open"},
    draft: {icon: LuGitPullRequestDraft, className: "text-zinc-400 dark:text-zinc-500", label: "Draft"},
    merged: {icon: LuGitMerge, className: "text-violet-600 dark:text-violet-400", label: "Merged"},
    closed: {icon: LuGitPullRequestClosed, className: "text-rose-600 dark:text-rose-400", label: "Closed"},
};

const stateOrder: PullRequestState[] = ["open", "draft", "merged", "closed"];

export interface FilterCountsProps {
    items: PullRequest[];
    /** Selected filter when controlled. */
    value?: PullRequestFilter;
    /** Selected filter on first render when uncontrolled. */
    defaultValue?: PullRequestFilter;
    onChange?: (filter: PullRequestFilter) => void;
    /** Accessible name for the filter bar. */
    label?: string;
    allLabel?: string;
    className?: string;
}

/** A pull request list with a filter bar that counts how many items each state holds. */
export const FilterCounts = ({
    items,
    value,
    defaultValue = "open",
    onChange,
    label = "Filter pull requests",
    allLabel = "All",
    className = "",
}: FilterCountsProps) => {
    const [internal, setInternal] = useState<PullRequestFilter>(defaultValue);
    const filter = value ?? internal;
    const reduceMotion = useReducedMotion();

    const options = useMemo(() => {
        const counts: Record<PullRequestFilter, number> = {all: items.length, open: 0, draft: 0, merged: 0, closed: 0};
        items.forEach((pr) => {
            counts[pr.state] += 1;
        });
        return [
            {value: "all" as const, label: allLabel, count: counts.all},
            ...stateOrder.map((state) => ({value: state, label: states[state].label, count: counts[state]})),
        ] satisfies FilterPillOption<PullRequestFilter>[];
    }, [items, allLabel]);

    const visible = items.filter((pr) => filter === "all" || pr.state === filter);

    const change = (next: PullRequestFilter) => {
        if (value === undefined) setInternal(next);
        onChange?.(next);
    };

    return (
        <div className={`w-full max-w-xl ${className}`}>
            <FilterPills label={label} options={options} value={filter} onChange={change}/>

            <p className="sr-only" aria-live="polite">
                Showing {visible.length} pull requests
            </p>
            <ul className="mt-4 divide-y divide-zinc-100 overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:divide-white/[0.06] dark:border-white/10 dark:bg-zinc-900">
                <AnimatePresence initial={false} mode="popLayout">
                    {visible.map((pr) => {
                        const state = states[pr.state];
                        const Icon = state.icon;
                        return (
                            <motion.li
                                key={pr.id}
                                layout={!reduceMotion}
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                exit={{opacity: 0}}
                                transition={{duration: 0.16}}
                                className="flex items-start gap-3 px-4 py-3"
                            >
                                <Icon className={`mt-0.5 size-4 shrink-0 ${state.className}`} role="img" aria-label={state.label}/>
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">{pr.title}</p>
                                    <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                                        #{pr.id} by {pr.author}, updated {pr.updated}
                                    </p>
                                </div>
                            </motion.li>
                        );
                    })}
                </AnimatePresence>
            </ul>
        </div>
    );
};
