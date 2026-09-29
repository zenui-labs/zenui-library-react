import {useEffect, useId, useMemo, useRef, useState} from "react";
import type {ComponentType, KeyboardEvent} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {LuClock, LuSearch, LuX} from "react-icons/lu";

export type BadgeTone = "green" | "amber" | "zinc";

export interface SearchCategory {
    value: string;
    label: string;
    icon: ComponentType<{className?: string}>;
}

export interface SearchHit {
    id: string;
    /** Matches the `value` of one of the categories. */
    category: string;
    title: string;
    /** Second line under the title. It is searched too. */
    meta: string;
    badge?: {label: string; tone: BadgeTone};
}

export interface NavLink {
    label: string;
    /** Leave it out for a placeholder link that does not navigate. */
    href?: string;
}

export interface StatTile {
    label: string;
    value: string;
}

export interface HeaderSearchProps {
    items: SearchHit[];
    /** Filter chips shown above the results, after the "All" chip. */
    categories: SearchCategory[];
    /** Searches shown when the field is focused and empty. */
    defaultRecent?: string[];
    /** Called when a result is picked with Enter or a click. */
    onSelect?: (hit: SearchHit) => void;
    placeholder?: string;
    /** Accessible name of the search field. */
    label?: string;
    allLabel?: string;
    emptyHint?: string;
    recentEmptyText?: string;
    /** How long the loading rows show after each keystroke, in ms. Stands in for a network request. */
    loadingDelay?: number;
    className?: string;
}

const toneClass: Record<BadgeTone, string> = {
    green: "bg-emerald-50 text-emerald-700 ring-emerald-600/15 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-400/20",
    amber: "bg-amber-50 text-amber-700 ring-amber-600/15 dark:bg-amber-400/10 dark:text-amber-300 dark:ring-amber-400/20",
    zinc: "bg-zinc-100 text-zinc-600 ring-zinc-500/15 dark:bg-white/5 dark:text-zinc-400 dark:ring-white/10",
};

const Highlight = ({text, query}: {text: string; query: string}) => {
    const needle = query.trim().toLowerCase();
    const start = needle ? text.toLowerCase().indexOf(needle) : -1;
    if (start === -1) return <>{text}</>;
    return (
        <>
            {text.slice(0, start)}
            <mark className="rounded-sm bg-amber-200/60 text-inherit dark:bg-amber-400/25">{text.slice(start, start + needle.length)}</mark>
            {text.slice(start + needle.length)}
        </>
    );
};

/** A header search field with recent searches, category filters, a loading state and highlighted matches. */
export const HeaderSearch = ({
    items,
    categories,
    defaultRecent = [],
    onSelect,
    placeholder = "Search",
    label = "Search",
    allLabel = "All",
    emptyHint = "Check the spelling or try another word.",
    recentEmptyText = "No recent searches.",
    loadingDelay = 380,
    className = "",
}: HeaderSearchProps) => {
    const [query, setQuery] = useState("");
    // null means every category.
    const [scope, setScope] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [active, setActive] = useState(0);
    const [recent, setRecent] = useState<string[]>(defaultRecent);
    const rootRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const reduceMotion = useReducedMotion();
    const listId = useId();

    const scopes: {value: string | null; label: string}[] = [{value: null, label: allLabel}, ...categories];
    const iconFor = (category: string) => categories.find((item) => item.value === category)?.icon;

    // Each keystroke restarts the timer, so the loading rows stay until typing pauses.
    useEffect(() => {
        if (!query.trim() || loadingDelay <= 0) {
            setLoading(false);
            return;
        }
        setLoading(true);
        const timer = window.setTimeout(() => setLoading(false), loadingDelay);
        return () => window.clearTimeout(timer);
    }, [query, loadingDelay]);

    useEffect(() => {
        if (!open) return;
        const onPointerDown = (event: PointerEvent) => {
            if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
        };
        document.addEventListener("pointerdown", onPointerDown);
        return () => document.removeEventListener("pointerdown", onPointerDown);
    }, [open]);

    const hits = useMemo(() => {
        const needle = query.trim().toLowerCase();
        if (!needle) return [];
        return items.filter((hit) => (scope === null || hit.category === scope) && `${hit.title} ${hit.meta}`.toLowerCase().includes(needle));
    }, [items, query, scope]);

    const showRecent = !query.trim();
    const options = showRecent ? recent : loading ? [] : hits.map((hit) => hit.id);
    const activeId = options[active];
    const activeDescendant = open && activeId ? `${listId}-${showRecent ? `recent-${active}` : activeId}` : undefined;

    const choose = (hit: SearchHit) => {
        setRecent((list) => [hit.title, ...list.filter((item) => item !== hit.title)].slice(0, 4));
        setOpen(false);
        setQuery("");
        inputRef.current?.blur();
        onSelect?.(hit);
    };

    const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        const count = options.length;
        if (event.key === "ArrowDown") {
            event.preventDefault();
            setOpen(true);
            if (count) setActive((index) => (index + 1) % count);
        } else if (event.key === "ArrowUp" && count) {
            event.preventDefault();
            setActive((index) => (index - 1 + count) % count);
        } else if (event.key === "Enter" && open && activeId) {
            event.preventDefault();
            if (showRecent) {
                setQuery(activeId);
                setActive(0);
            } else {
                const hit = hits.find((item) => item.id === activeId);
                if (hit) choose(hit);
            }
        } else if (event.key === "Escape") {
            event.preventDefault();
            if (open) setOpen(false);
            else setQuery("");
        }
    };

    return (
        <div ref={rootRef} className={`relative ${className}`}>
            <LuSearch className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" aria-hidden/>
            <input
                ref={inputRef}
                value={query}
                onChange={(event) => {
                    setQuery(event.target.value);
                    setActive(0);
                    setOpen(true);
                }}
                onFocus={() => setOpen(true)}
                onKeyDown={onKeyDown}
                placeholder={placeholder}
                aria-label={label}
                role="combobox"
                aria-expanded={open}
                aria-controls={listId}
                aria-autocomplete="list"
                aria-activedescendant={activeDescendant}
                className="h-9 w-full rounded-lg border border-zinc-200 bg-zinc-50 pl-9 pr-9 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-indigo-400/60 dark:focus:bg-zinc-900"
            />
            {query && (
                <button
                    type="button"
                    onClick={() => {
                        setQuery("");
                        inputRef.current?.focus();
                    }}
                    aria-label="Clear search"
                    className="absolute right-2 top-1/2 flex size-5 -translate-y-1/2 items-center justify-center rounded text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 dark:hover:bg-white/10 dark:hover:text-zinc-200"
                >
                    <LuX className="size-3.5" aria-hidden/>
                </button>
            )}

            <AnimatePresence>
                {open && (
                    <motion.div
                        className="absolute right-0 top-full z-20 mt-2 w-full overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xl shadow-zinc-950/10 sm:w-[26rem] dark:border-white/10 dark:bg-zinc-900 dark:shadow-black/50"
                        initial={reduceMotion ? {opacity: 0} : {opacity: 0, y: -4, scale: 0.98}}
                        animate={{opacity: 1, y: 0, scale: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.14}}
                        style={{transformOrigin: "top right"}}
                    >
                        {showRecent ? (
                            <div className="p-2">
                                <div className="flex items-center justify-between px-2 pb-1 pt-1.5">
                                    <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Recent searches</p>
                                    {recent.length > 0 && (
                                        <button
                                            type="button"
                                            onClick={() => setRecent([])}
                                            className="rounded px-1 text-xs text-zinc-500 transition hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 dark:text-zinc-400 dark:hover:text-white"
                                        >
                                            Clear
                                        </button>
                                    )}
                                </div>
                                <ul id={listId} role="listbox" aria-label="Recent searches">
                                    {recent.map((item, index) => (
                                        <li
                                            key={item}
                                            id={`${listId}-recent-${index}`}
                                            role="option"
                                            aria-selected={index === active}
                                            onMouseMove={() => setActive(index)}
                                            onClick={() => {
                                                setQuery(item);
                                                setActive(0);
                                                inputRef.current?.focus();
                                            }}
                                            className={`flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-2 text-sm text-zinc-700 dark:text-zinc-300 ${
                                                index === active ? "bg-zinc-100 dark:bg-white/[0.06]" : ""
                                            }`}
                                        >
                                            <LuClock className="size-4 text-zinc-400" aria-hidden/>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                {recent.length === 0 && <p className="px-2 py-3 text-sm text-zinc-500 dark:text-zinc-400">{recentEmptyText}</p>}
                            </div>
                        ) : (
                            <>
                                <div role="group" aria-label="Filter results" className="flex gap-1 overflow-x-auto border-b border-zinc-100 p-2 [scrollbar-width:none] dark:border-white/[0.06]">
                                    {scopes.map((item) => (
                                        <button
                                            key={item.value ?? "all"}
                                            type="button"
                                            aria-pressed={scope === item.value}
                                            onClick={() => {
                                                setScope(item.value);
                                                setActive(0);
                                                inputRef.current?.focus();
                                            }}
                                            className={`shrink-0 rounded-md px-2.5 py-1 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 ${
                                                scope === item.value
                                                    ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                                                    : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-800 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-zinc-100"
                                            }`}
                                        >
                                            {item.label}
                                        </button>
                                    ))}
                                </div>

                                {loading ? (
                                    <div className="space-y-1 p-2" aria-busy="true" aria-label="Loading results">
                                        {[0, 1, 2].map((row) => (
                                            <div key={row} className="flex items-center gap-3 px-2 py-2">
                                                <span className="size-8 animate-pulse rounded-lg bg-zinc-100 dark:bg-white/[0.06]"/>
                                                <span className="flex-1 space-y-1.5">
                                                    <span className="block h-2.5 w-1/2 animate-pulse rounded-full bg-zinc-100 dark:bg-white/[0.06]"/>
                                                    <span className="block h-2 w-1/3 animate-pulse rounded-full bg-zinc-100 dark:bg-white/[0.06]"/>
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                ) : hits.length ? (
                                    <ul id={listId} role="listbox" aria-label="Results" className="max-h-72 overflow-y-auto p-2">
                                        {hits.map((hit, index) => {
                                            const Icon = iconFor(hit.category);
                                            return (
                                                <li
                                                    key={hit.id}
                                                    id={`${listId}-${hit.id}`}
                                                    role="option"
                                                    aria-selected={index === active}
                                                    onMouseMove={() => setActive(index)}
                                                    onClick={() => choose(hit)}
                                                    className={`flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 ${index === active ? "bg-zinc-100 dark:bg-white/[0.06]" : ""}`}
                                                >
                                                    <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-400" aria-hidden>
                                                        {Icon && <Icon className="size-4"/>}
                                                    </span>
                                                    <span className="min-w-0 flex-1">
                                                        <span className="block truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                                            <Highlight text={hit.title} query={query}/>
                                                        </span>
                                                        <span className="block truncate text-xs text-zinc-500 dark:text-zinc-400">
                                                            <Highlight text={hit.meta} query={query}/>
                                                        </span>
                                                    </span>
                                                    {hit.badge && (
                                                        <span className={`hidden shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium ring-1 ring-inset min-[400px]:inline ${toneClass[hit.badge.tone]}`}>
                                                            {hit.badge.label}
                                                        </span>
                                                    )}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                ) : (
                                    <div className="px-4 py-8 text-center">
                                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">No matches for “{query.trim()}”</p>
                                        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                                            {scope === null ? emptyHint : "Try searching all categories."}
                                        </p>
                                    </div>
                                )}
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export interface SearchPopoverProps extends Omit<HeaderSearchProps, "className"> {
    /** App name shown at the left of the header. Its first letter becomes the logo. */
    brand: string;
    navItems: NavLink[];
    /** Placeholder dashboard tiles under the header. */
    stats: StatTile[];
    /** Text under the page before anything is picked. */
    hint?: string;
    className?: string;
}

/** An app header with the search field on the right and a placeholder dashboard below it. */
export const SearchPopover = ({brand, navItems, stats, hint, onSelect, className = "", ...searchProps}: SearchPopoverProps) => {
    const [picked, setPicked] = useState<string | null>(null);

    return (
        <div className={`w-full max-w-3xl overflow-visible rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-white/10 dark:bg-zinc-950 ${className}`}>
            <header className="relative flex flex-wrap items-center gap-3 rounded-t-2xl border-b border-zinc-200 bg-white px-4 py-3 dark:border-white/10 dark:bg-zinc-900">
                <span className="flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-white">
                    <span className="flex size-7 items-center justify-center rounded-lg bg-zinc-900 text-xs text-white dark:bg-white dark:text-zinc-900" aria-hidden>
                        {brand.charAt(0)}
                    </span>
                    {brand}
                </span>
                <nav aria-label="Main" className="hidden items-center gap-1 text-sm text-zinc-500 md:flex dark:text-zinc-400">
                    {navItems.map((item) => (
                        <a
                            key={item.label}
                            href={item.href ?? "#"}
                            onClick={item.href ? undefined : (event) => event.preventDefault()}
                            className="rounded-md px-2.5 py-1.5 transition hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 dark:hover:bg-white/5 dark:hover:text-white"
                        >
                            {item.label}
                        </a>
                    ))}
                </nav>

                <HeaderSearch
                    {...searchProps}
                    onSelect={(hit) => {
                        setPicked(hit.title);
                        onSelect?.(hit);
                    }}
                    className="order-last w-full sm:order-none sm:ml-auto sm:w-72"
                />
            </header>

            <div className="grid gap-3 p-4 sm:grid-cols-3" aria-hidden>
                {stats.map((stat) => (
                    <div key={stat.label} className="rounded-xl border border-zinc-200 bg-white p-4 dark:border-white/10 dark:bg-zinc-900">
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">{stat.label}</p>
                        <p className="mt-1 text-lg font-semibold tabular-nums text-zinc-900 dark:text-white">{stat.value}</p>
                    </div>
                ))}
                <div className="h-28 rounded-xl border border-dashed border-zinc-200 sm:col-span-3 dark:border-white/10"/>
            </div>
            <p className="px-4 pb-4 text-xs text-zinc-500 dark:text-zinc-400" aria-live="polite">
                {picked ? <>Opened <span className="font-medium text-zinc-800 dark:text-zinc-200">{picked}</span></> : hint}
            </p>
        </div>
    );
};
