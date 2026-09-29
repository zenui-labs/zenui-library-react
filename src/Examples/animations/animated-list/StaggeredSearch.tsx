import {useEffect, useId, useMemo, useState} from "react";
import type {ComponentType, KeyboardEvent} from "react";
import {AnimatePresence, motion, MotionConfig} from "framer-motion";
import type {Variants} from "framer-motion";
import {LuCornerDownLeft, LuSearch} from "react-icons/lu";

export interface SearchResult {
    id: string;
    /** Heading the result is listed under, such as "Pages" or "People". Groups appear in the order they first occur. */
    group: string;
    title: string;
    /** Second line under the title. It is searched as well. */
    meta: string;
    icon: ComponentType<{className?: string}>;
}

const list: Variants = {
    hidden: {},
    show: {transition: {staggerChildren: 0.035}},
};

const row: Variants = {
    hidden: {opacity: 0, y: 10, filter: "blur(4px)"},
    show: {opacity: 1, y: 0, filter: "blur(0px)", transition: {type: "spring", stiffness: 420, damping: 32}},
};

// Wraps the part of the text that matches the query in a highlight.
const Highlight = ({text, query}: {text: string; query: string}) => {
    const start = query ? text.toLowerCase().indexOf(query.toLowerCase()) : -1;
    if (start < 0) return <>{text}</>;
    return (
        <>
            {text.slice(0, start)}
            <mark className="rounded bg-indigo-100 px-0.5 text-inherit dark:bg-indigo-500/25">{text.slice(start, start + query.length)}</mark>
            {text.slice(start + query.length)}
        </>
    );
};

const Skeleton = () => (
    <div className="flex flex-col gap-1 px-2 py-2" aria-hidden="true">
        {[0, 1, 2, 3].map((item) => (
            <div key={item} className="relative flex items-center gap-3 overflow-hidden rounded-xl px-2 py-2">
                <div className="h-8 w-8 rounded-lg bg-gray-100 dark:bg-slate-800"/>
                <div className="flex-1 space-y-1.5">
                    <div className="h-2.5 rounded bg-gray-100 dark:bg-slate-800" style={{width: `${70 - item * 12}%`}}/>
                    <div className="h-2 w-1/3 rounded bg-gray-100 dark:bg-slate-800"/>
                </div>
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/70 to-transparent dark:via-white/5"
                    initial={{x: "-100%"}}
                    animate={{x: "100%"}}
                    transition={{duration: 1, repeat: Infinity, ease: "easeInOut", delay: item * 0.08}}
                />
            </div>
        ))}
    </div>
);

export interface StaggeredSearchProps {
    /** Everything that can be searched. Titles and meta lines are matched against the query. */
    items: SearchResult[];
    /** Called when a result is opened with Enter or a click. */
    onSelect?: (item: SearchResult) => void;
    /** Milliseconds to wait after typing stops before showing results. */
    delay?: number;
    placeholder?: string;
    /** Accessible name for the search field. */
    label?: string;
    /** Second line of the empty state. */
    emptyHint?: string;
    className?: string;
}

// A command palette whose results cascade in after a short search delay.
// Arrow keys move a highlight that slides between rows, and Enter opens the active result.
export const StaggeredSearch = ({
    items,
    onSelect,
    delay = 380,
    placeholder = "Search pages, people, settings",
    label = "Search pages, people and settings",
    emptyHint = "Try a person's name or a page title.",
    className = "",
}: StaggeredSearchProps) => {
    const [query, setQuery] = useState("");
    const [settled, setSettled] = useState("");
    const [active, setActive] = useState(0);
    const [opened, setOpened] = useState<string | null>(null);
    const listId = useId();
    const loading = query !== settled;

    // Wait until typing pauses, like a real network search would.
    useEffect(() => {
        if (query === settled) return;
        const timer = window.setTimeout(() => {
            setSettled(query);
            setActive(0);
        }, delay);
        return () => window.clearTimeout(timer);
    }, [query, settled, delay]);

    const results = useMemo(() => {
        const term = settled.trim().toLowerCase();
        return items.filter((item) => !term || item.title.toLowerCase().includes(term) || item.meta.toLowerCase().includes(term));
    }, [items, settled]);

    const groups = [...new Set(items.map((item) => item.group))];
    const ordered = groups.flatMap((group) => results.filter((item) => item.group === group));

    const open = (item: SearchResult) => {
        setOpened(item.title);
        onSelect?.(item);
    };
    const activeResult = ordered[active];

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (!ordered.length || loading) return;
        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            const next = (active + (event.key === "ArrowDown" ? 1 : -1) + ordered.length) % ordered.length;
            setActive(next);
            // Keep the active row visible inside the scrolling list.
            document.getElementById(`${listId}-${ordered[next].id}`)?.scrollIntoView({block: "nearest"});
        } else if (event.key === "Enter" && activeResult) {
            event.preventDefault();
            open(activeResult);
        }
    };

    return (
        <MotionConfig reducedMotion="user">
            <div className={`w-full max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl shadow-gray-900/5 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/40 ${className}`}>
                <div className="flex items-center gap-3 border-b border-gray-100 px-4 dark:border-slate-800">
                    <LuSearch className="h-4 w-4 shrink-0 text-gray-400 dark:text-slate-500" aria-hidden="true"/>
                    <input
                        type="text"
                        role="combobox"
                        aria-label={label}
                        aria-expanded="true"
                        aria-controls={listId}
                        aria-activedescendant={activeResult && !loading ? `${listId}-${activeResult.id}` : undefined}
                        aria-autocomplete="list"
                        value={query}
                        onChange={(event) => {
                            setQuery(event.target.value);
                            setOpened(null);
                        }}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        className="h-12 min-w-0 flex-1 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none dark:text-white dark:placeholder:text-slate-500"
                    />
                    <AnimatePresence>
                        {loading && (
                            <motion.span
                                initial={{opacity: 0, scale: 0.6}}
                                animate={{opacity: 1, scale: 1, rotate: 360}}
                                exit={{opacity: 0, scale: 0.6}}
                                transition={{rotate: {duration: 0.8, repeat: Infinity, ease: "linear"}}}
                                className="h-4 w-4 shrink-0 rounded-full border-2 border-gray-200 border-t-indigo-500 dark:border-slate-700 dark:border-t-indigo-400"
                                aria-hidden="true"
                            />
                        )}
                    </AnimatePresence>
                </div>

                <div className="h-[320px] overflow-y-auto">
                    {loading ? (
                        <Skeleton/>
                    ) : ordered.length === 0 ? (
                        <motion.div
                            initial={{opacity: 0, y: 8}}
                            animate={{opacity: 1, y: 0}}
                            className="flex h-full flex-col items-center justify-center px-6 text-center"
                        >
                            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-400 dark:bg-slate-800 dark:text-slate-500">
                                <LuSearch className="h-5 w-5" aria-hidden="true"/>
                            </span>
                            <p className="mt-3 text-sm font-medium text-gray-900 dark:text-white">No results for "{settled}"</p>
                            <p className="mt-1 text-xs text-gray-500 dark:text-slate-400">{emptyHint}</p>
                        </motion.div>
                    ) : (
                        // Keying the list by the query replays the cascade for every new search.
                        <motion.ul key={settled} id={listId} role="listbox" aria-label="Results" variants={list} initial="hidden" animate="show" className="p-2">
                            {groups.map((group) => {
                                const matches = ordered.filter((item) => item.group === group);
                                if (!matches.length) return null;
                                return (
                                    <li key={group} role="presentation">
                                        <motion.p variants={row} className="px-2 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-slate-500">
                                            {group}
                                        </motion.p>
                                        <ul role="group" aria-label={group}>
                                            {matches.map((item) => {
                                                const index = ordered.indexOf(item);
                                                const isActive = index === active;
                                                const Icon = item.icon;
                                                return (
                                                    <motion.li
                                                        key={item.id}
                                                        id={`${listId}-${item.id}`}
                                                        role="option"
                                                        aria-selected={isActive}
                                                        variants={row}
                                                        onPointerMove={() => setActive(index)}
                                                        onClick={() => open(item)}
                                                        className="relative flex cursor-pointer items-center gap-3 rounded-xl px-2 py-2"
                                                    >
                                                        {isActive && (
                                                            <motion.span
                                                                layoutId={`${listId}-highlight`}
                                                                transition={{type: "spring", stiffness: 500, damping: 40}}
                                                                className="absolute inset-0 rounded-xl bg-gray-100 dark:bg-slate-800"
                                                            />
                                                        )}
                                                        <span aria-hidden="true" className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
                                                            <Icon className="h-4 w-4"/>
                                                        </span>
                                                        <span className="relative min-w-0 flex-1">
                                                            <span className="block truncate text-sm text-gray-900 dark:text-white">
                                                                <Highlight text={item.title} query={settled.trim()}/>
                                                            </span>
                                                            <span className="block truncate text-xs text-gray-500 dark:text-slate-400">{item.meta}</span>
                                                        </span>
                                                        {isActive && <LuCornerDownLeft className="relative h-4 w-4 shrink-0 text-gray-400 dark:text-slate-500" aria-hidden="true"/>}
                                                    </motion.li>
                                                );
                                            })}
                                        </ul>
                                    </li>
                                );
                            })}
                        </motion.ul>
                    )}
                </div>

                <div className="flex h-10 items-center justify-between border-t border-gray-100 px-4 text-[11px] text-gray-400 dark:border-slate-800 dark:text-slate-500">
                    <span aria-live="polite">
                        {opened ? `Opening ${opened}` : loading ? "Searching" : `${ordered.length} ${ordered.length === 1 ? "result" : "results"}`}
                    </span>
                    <span className="hidden sm:inline">Up and down to move, Enter to open</span>
                </div>
            </div>
        </MotionConfig>
    );
};
