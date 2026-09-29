import {useEffect, useId, useMemo, useState} from "react";
import type {KeyboardEvent} from "react";
import {AnimatePresence, motion, MotionConfig} from "framer-motion";
import type {Variants} from "framer-motion";
import type {IconType} from "react-icons";
import {LuCornerDownLeft, LuFileText, LuFolder, LuSearch, LuSettings, LuUser} from "react-icons/lu";

type Kind = "Pages" | "People" | "Settings";

interface Result {
    id: string;
    kind: Kind;
    title: string;
    meta: string;
    icon: IconType;
}

const catalog: Result[] = [
    {id: "p1", kind: "Pages", title: "Pricing experiments 2026", meta: "Growth / Edited 2h ago", icon: LuFileText},
    {id: "p2", kind: "Pages", title: "Onboarding checklist", meta: "Customer success / Edited yesterday", icon: LuFileText},
    {id: "p3", kind: "Pages", title: "Incident review: payments outage", meta: "Engineering / Edited Mar 14", icon: LuFileText},
    {id: "p4", kind: "Pages", title: "Brand guidelines", meta: "Design / Edited last week", icon: LuFolder},
    {id: "p5", kind: "Pages", title: "Quarterly planning notes", meta: "Leadership / Edited Apr 2", icon: LuFileText},
    {id: "u1", kind: "People", title: "Priya Raman", meta: "Product designer, Lisbon", icon: LuUser},
    {id: "u2", kind: "People", title: "Marcus Oyelaran", meta: "Payments engineer, Lagos", icon: LuUser},
    {id: "u3", kind: "People", title: "Elena Park", meta: "Head of growth, Seattle", icon: LuUser},
    {id: "s1", kind: "Settings", title: "Billing and invoices", meta: "Workspace settings", icon: LuSettings},
    {id: "s2", kind: "Settings", title: "Notification preferences", meta: "Your account", icon: LuSettings},
    {id: "s3", kind: "Settings", title: "Single sign-on", meta: "Security", icon: LuSettings},
];

const kinds: Kind[] = ["Pages", "People", "Settings"];

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

// A command palette whose results cascade in after a short search delay.
// Arrow keys move a highlight that slides between rows, and Enter opens the active result.
const StaggeredSearch = () => {
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
        }, 380);
        return () => window.clearTimeout(timer);
    }, [query, settled]);

    const results = useMemo(() => {
        const term = settled.trim().toLowerCase();
        return catalog.filter((item) => !term || item.title.toLowerCase().includes(term) || item.meta.toLowerCase().includes(term));
    }, [settled]);

    const ordered = kinds.flatMap((kind) => results.filter((item) => item.kind === kind));
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
            setOpened(activeResult.title);
        }
    };

    return (
        <MotionConfig reducedMotion="user">
            <div className="w-full max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl shadow-gray-900/5 dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/40">
                <div className="flex items-center gap-3 border-b border-gray-100 px-4 dark:border-slate-800">
                    <LuSearch className="h-4 w-4 shrink-0 text-gray-400 dark:text-slate-500" aria-hidden="true"/>
                    <input
                        type="text"
                        role="combobox"
                        aria-label="Search pages, people and settings"
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
                        placeholder="Search pages, people, settings"
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
                            <p className="mt-1 text-xs text-gray-500 dark:text-slate-400">Try a person's name or a page title.</p>
                        </motion.div>
                    ) : (
                        // Keying the list by the query replays the cascade for every new search.
                        <motion.ul key={settled} id={listId} role="listbox" aria-label="Results" variants={list} initial="hidden" animate="show" className="p-2">
                            {kinds.map((kind) => {
                                const group = ordered.filter((item) => item.kind === kind);
                                if (!group.length) return null;
                                return (
                                    <li key={kind} role="presentation">
                                        <motion.p variants={row} className="px-2 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wider text-gray-400 dark:text-slate-500">
                                            {kind}
                                        </motion.p>
                                        <ul role="group" aria-label={kind}>
                                            {group.map((item) => {
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
                                                        onClick={() => setOpened(item.title)}
                                                        className="relative flex cursor-pointer items-center gap-3 rounded-xl px-2 py-2"
                                                    >
                                                        {isActive && (
                                                            <motion.span
                                                                layoutId={`${listId}-highlight`}
                                                                transition={{type: "spring", stiffness: 500, damping: 40}}
                                                                className="absolute inset-0 rounded-xl bg-gray-100 dark:bg-slate-800"
                                                            />
                                                        )}
                                                        <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400">
                                                            <Icon className="h-4 w-4" aria-hidden="true"/>
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

export default StaggeredSearch;
