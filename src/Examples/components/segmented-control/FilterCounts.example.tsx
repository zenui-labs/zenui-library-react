import {useId, useMemo, useRef, useState} from "react";
import type {KeyboardEvent} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import type {IconType} from "react-icons";
import {LuGitMerge, LuGitPullRequest, LuGitPullRequestClosed, LuGitPullRequestDraft} from "react-icons/lu";

type State = "open" | "draft" | "merged" | "closed";
type Filter = "all" | State;

interface PullRequest {
    id: number;
    title: string;
    author: string;
    state: State;
    updated: string;
}

const pullRequests: PullRequest[] = [
    {id: 2184, title: "Add retry with backoff to webhook delivery", author: "Tom Becker", state: "open", updated: "12m ago"},
    {id: 2181, title: "Move invoice PDFs to the new renderer", author: "Hana Sato", state: "open", updated: "1h ago"},
    {id: 2179, title: "Dark mode for the billing page", author: "Maya Chen", state: "draft", updated: "3h ago"},
    {id: 2176, title: "Cache team members on the settings page", author: "Diego Ramos", state: "merged", updated: "5h ago"},
    {id: 2172, title: "Fix timezone offset in weekly digest", author: "Priya Nair", state: "merged", updated: "yesterday"},
    {id: 2170, title: "Try a virtualized table for audit logs", author: "Owen Walsh", state: "closed", updated: "yesterday"},
    {id: 2168, title: "Upgrade the payments SDK to v9", author: "Kofi Mensah", state: "open", updated: "2d ago"},
    {id: 2165, title: "Onboarding checklist copy updates", author: "Sofia Rossi", state: "merged", updated: "3d ago"},
];

const filters: {value: Filter; label: string}[] = [
    {value: "all", label: "All"},
    {value: "open", label: "Open"},
    {value: "draft", label: "Draft"},
    {value: "merged", label: "Merged"},
    {value: "closed", label: "Closed"},
];

const stateIcon: Record<State, {icon: IconType; className: string; label: string}> = {
    open: {icon: LuGitPullRequest, className: "text-emerald-600 dark:text-emerald-400", label: "Open"},
    draft: {icon: LuGitPullRequestDraft, className: "text-zinc-400 dark:text-zinc-500", label: "Draft"},
    merged: {icon: LuGitMerge, className: "text-violet-600 dark:text-violet-400", label: "Merged"},
    closed: {icon: LuGitPullRequestClosed, className: "text-rose-600 dark:text-rose-400", label: "Closed"},
};

const FilterCounts = () => {
    const [filter, setFilter] = useState<Filter>("open");
    const buttons = useRef<(HTMLButtonElement | null)[]>([]);
    const reduceMotion = useReducedMotion();
    const id = useId();

    const counts = useMemo(() => {
        const result: Record<Filter, number> = {all: pullRequests.length, open: 0, draft: 0, merged: 0, closed: 0};
        pullRequests.forEach((pr) => {
            result[pr.state] += 1;
        });
        return result;
    }, []);

    const visible = pullRequests.filter((pr) => filter === "all" || pr.state === filter);

    const select = (index: number) => {
        const next = (index + filters.length) % filters.length;
        setFilter(filters[next].value);
        const button = buttons.current[next];
        button?.focus();
        button?.scrollIntoView({block: "nearest", inline: "nearest"});
    };

    const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
        const keys: Record<string, number> = {ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: filters.length - 1};
        if (!(event.key in keys)) return;
        event.preventDefault();
        select(keys[event.key]);
    };

    return (
        <div className="w-full max-w-xl">
            {/* Scrolls sideways on narrow screens instead of wrapping. */}
            <div className="-mx-1 overflow-x-auto px-1 py-1 [scrollbar-width:none]">
                <div role="radiogroup" aria-label="Filter pull requests" className="inline-flex gap-1 rounded-full border border-zinc-200 bg-white p-1 shadow-sm dark:border-white/10 dark:bg-zinc-900">
                    {filters.map((option, index) => {
                        const checked = option.value === filter;
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
                                onClick={() => setFilter(option.value)}
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
                                    {counts[option.value]}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <p className="sr-only" aria-live="polite">
                Showing {visible.length} pull requests
            </p>
            <ul className="mt-4 divide-y divide-zinc-100 overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:divide-white/[0.06] dark:border-white/10 dark:bg-zinc-900">
                <AnimatePresence initial={false} mode="popLayout">
                    {visible.map((pr) => {
                        const state = stateIcon[pr.state];
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

export default FilterCounts;
