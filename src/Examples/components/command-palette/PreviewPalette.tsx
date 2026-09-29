import {useEffect, useId, useMemo, useRef, useState} from "react";
import type {KeyboardEvent, ReactNode} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {LuArrowDown, LuArrowUp, LuCornerDownLeft, LuFileText, LuHash, LuSearch, LuSearchX, LuUser} from "react-icons/lu";

export interface DocResult {
    kind: "doc";
    id: string;
    title: string;
    /** Folders the doc lives in, shown as a breadcrumb. */
    path: string[];
    excerpt: string;
    author: string;
    /** Display text, for example "Updated 3 days ago". */
    updated: string;
    readTime: string;
}

export interface PersonResult {
    kind: "person";
    id: string;
    /** The person's name. */
    title: string;
    role: string;
    team: string;
    localTime: string;
    /** "Available" shows a green dot, anything else shows amber. */
    status: string;
}

export interface ChannelResult {
    kind: "channel";
    id: string;
    /** Channel name without the leading #. */
    title: string;
    topic: string;
    members: number;
    lastMessage: {author: string; text: string; time: string};
}

export type PreviewResult = DocResult | PersonResult | ChannelResult;

export interface PreviewPaletteProps {
    results: PreviewResult[];
    /** Called when a result is opened with Enter or a click. */
    onSelect?: (result: PreviewResult) => void;
    /** Group headings. Groups keep the order their first result appears in. */
    groupLabels?: Partial<Record<PreviewResult["kind"], string>>;
    placeholder?: string;
    emptyHint?: string;
    className?: string;
}

const defaultGroupLabels: Record<PreviewResult["kind"], string> = {doc: "Documents", person: "People", channel: "Channels"};

const initials = (name: string) => name.split(" ").map((part) => part[0]).join("");

const searchText = (result: PreviewResult) => {
    if (result.kind === "doc") return [result.title, ...result.path, result.author].join(" ");
    if (result.kind === "person") return [result.title, result.role, result.team].join(" ");
    return [result.title, result.topic].join(" ");
};

const Kbd = ({children}: {children: ReactNode}) => (
    <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded-[5px] border border-zinc-200 bg-white px-1 font-sans text-[11px] font-medium text-zinc-500 dark:border-white/10 dark:bg-white/5 dark:text-zinc-400">
        {children}
    </kbd>
);

const ResultIcon = ({result, active}: {result: PreviewResult; active: boolean}) => {
    if (result.kind === "person") {
        return (
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 text-[10px] font-semibold text-white" aria-hidden>
                {initials(result.title)}
            </span>
        );
    }
    const Icon = result.kind === "doc" ? LuFileText : LuHash;
    return (
        <span
            className={`flex size-7 shrink-0 items-center justify-center rounded-md border transition-colors ${
                active
                    ? "border-indigo-200 bg-indigo-50 text-indigo-600 dark:border-indigo-400/30 dark:bg-indigo-400/10 dark:text-indigo-300"
                    : "border-zinc-200 bg-white text-zinc-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-400"
            }`}
            aria-hidden
        >
            <Icon className="size-3.5"/>
        </span>
    );
};

const subtitle = (result: PreviewResult) => {
    if (result.kind === "doc") return result.path.join(" / ");
    if (result.kind === "person") return result.role;
    return `${result.members} members`;
};

/** The detail pane for one result. Use it on its own to show a doc, person or channel card. */
export const ResultPreview = ({result}: {result: PreviewResult}) => {
    if (result.kind === "doc") {
        return (
            <div className="flex h-full flex-col">
                <p className="text-xs text-zinc-500 dark:text-zinc-400">{result.path.join(" / ")}</p>
                <h3 className="mt-1.5 text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">{result.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600 dark:text-zinc-300">{result.excerpt}</p>
                <div className="mt-4 space-y-2" aria-hidden>
                    <span className="block h-2 w-full rounded-full bg-zinc-200/70 dark:bg-white/[0.06]"/>
                    <span className="block h-2 w-5/6 rounded-full bg-zinc-200/70 dark:bg-white/[0.06]"/>
                    <span className="block h-2 w-2/3 rounded-full bg-zinc-200/70 dark:bg-white/[0.06]"/>
                </div>
                <dl className="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-5 text-xs text-zinc-500 dark:text-zinc-400">
                    <div className="flex gap-1">
                        <dt className="sr-only">Author</dt>
                        <dd className="font-medium text-zinc-700 dark:text-zinc-200">{result.author}</dd>
                    </div>
                    <div>
                        <dt className="sr-only">Last updated</dt>
                        <dd>{result.updated}</dd>
                    </div>
                    <div>
                        <dt className="sr-only">Reading time</dt>
                        <dd>{result.readTime}</dd>
                    </div>
                </dl>
            </div>
        );
    }

    if (result.kind === "person") {
        const available = result.status === "Available";
        return (
            <div className="flex h-full flex-col items-center text-center">
                <span className="relative mt-4">
                    <span className="flex size-16 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 text-lg font-semibold text-white" aria-hidden>
                        {initials(result.title)}
                    </span>
                    <span className={`absolute bottom-0.5 right-0.5 size-3.5 rounded-full ring-2 ring-zinc-50 dark:ring-zinc-900 ${available ? "bg-emerald-500" : "bg-amber-500"}`} aria-hidden/>
                </span>
                <h3 className="mt-3 text-base font-semibold text-zinc-900 dark:text-white">{result.title}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{result.role}, {result.team}</p>
                <dl className="mt-5 w-full divide-y divide-zinc-200/70 rounded-xl border border-zinc-200/70 text-left text-sm dark:divide-white/[0.06] dark:border-white/[0.06]">
                    <div className="flex justify-between gap-3 px-3 py-2">
                        <dt className="text-zinc-500 dark:text-zinc-400">Status</dt>
                        <dd className="text-right text-zinc-800 dark:text-zinc-200">{result.status}</dd>
                    </div>
                    <div className="flex justify-between gap-3 px-3 py-2">
                        <dt className="text-zinc-500 dark:text-zinc-400">Local time</dt>
                        <dd className="text-right text-zinc-800 dark:text-zinc-200">{result.localTime}</dd>
                    </div>
                </dl>
            </div>
        );
    }

    return (
        <div className="flex h-full flex-col">
            <h3 className="flex items-center gap-1.5 text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">
                <LuHash className="size-4 text-zinc-400" aria-hidden/>
                {result.title}
            </h3>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{result.topic}</p>
            <p className="mt-5 text-[11px] font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Latest message</p>
            <div className="mt-2 rounded-xl border border-zinc-200/70 bg-white p-3 dark:border-white/[0.06] dark:bg-white/[0.02]">
                <p className="flex items-baseline justify-between gap-2 text-xs">
                    <span className="font-medium text-zinc-800 dark:text-zinc-200">{result.lastMessage.author}</span>
                    <span className="text-zinc-400 dark:text-zinc-500">{result.lastMessage.time}</span>
                </p>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">{result.lastMessage.text}</p>
            </div>
            <p className="mt-auto pt-5 text-xs text-zinc-500 dark:text-zinc-400">{result.members} members</p>
        </div>
    );
};

/** Grouped search results with a preview pane that follows the highlighted row. */
export const PreviewPalette = ({
    results,
    onSelect,
    groupLabels,
    placeholder = "Search docs, people and channels",
    emptyHint = "Try a teammate, a channel or a doc title.",
    className = "",
}: PreviewPaletteProps) => {
    const [query, setQuery] = useState("");
    const [active, setActive] = useState(0);
    const [opened, setOpened] = useState<string | null>(null);
    const optionRefs = useRef(new Map<string, HTMLLIElement>());
    const reduceMotion = useReducedMotion();
    const listId = useId();
    const labels = {...defaultGroupLabels, ...groupLabels};

    const groups = useMemo(() => {
        const words = query.toLowerCase().split(/\s+/).filter(Boolean);
        const found = results.filter((result) => words.every((word) => searchText(result).toLowerCase().includes(word)));
        const kinds = [...new Set(found.map((result) => result.kind))];
        return kinds.map((kind) => ({kind, items: found.filter((result) => result.kind === kind)}));
    }, [results, query]);

    const flat = useMemo(() => groups.flatMap((group) => group.items), [groups]);
    const current = flat[active];

    useEffect(() => {
        if (current) optionRefs.current.get(current.id)?.scrollIntoView({block: "nearest"});
    }, [current]);

    const open = (result: PreviewResult) => {
        setOpened(result.title);
        onSelect?.(result);
    };

    const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        const count = flat.length;
        if (event.key === "ArrowDown" && count) {
            event.preventDefault();
            setActive((index) => (index + 1) % count);
        } else if (event.key === "ArrowUp" && count) {
            event.preventDefault();
            setActive((index) => (index - 1 + count) % count);
        } else if (event.key === "Enter" && current) {
            event.preventDefault();
            open(current);
        } else if (event.key === "Escape" && query) {
            event.preventDefault();
            setQuery("");
            setActive(0);
        }
    };

    return (
        <div className={`w-full max-w-3xl ${className}`}>
            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl shadow-zinc-950/[0.06] dark:border-white/10 dark:bg-zinc-900 dark:shadow-black/40">
                <div className="flex items-center gap-3 border-b border-zinc-100 px-4 dark:border-white/[0.06]">
                    <LuSearch className="size-[18px] shrink-0 text-zinc-400" aria-hidden/>
                    <input
                        value={query}
                        onChange={(event) => {
                            setQuery(event.target.value);
                            setActive(0);
                        }}
                        onKeyDown={onKeyDown}
                        placeholder={placeholder}
                        aria-label="Search the workspace"
                        role="combobox"
                        aria-expanded="true"
                        aria-controls={listId}
                        aria-autocomplete="list"
                        aria-activedescendant={current ? `${listId}-${current.id}` : undefined}
                        className="h-14 min-w-0 flex-1 bg-transparent text-[15px] text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-100 dark:placeholder:text-zinc-500"
                    />
                    <span className="hidden shrink-0 text-xs tabular-nums text-zinc-400 sm:block dark:text-zinc-500">
                        {flat.length} {flat.length === 1 ? "result" : "results"}
                    </span>
                </div>

                <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
                    <div className="h-80 overflow-y-auto p-2">
                        <ul id={listId} role="listbox" aria-label="Results" className="scroll-py-2">
                            {groups.map((group) => (
                                <li key={group.kind} role="presentation">
                                    <p id={`${listId}-${group.kind}`} className="px-3 pb-1.5 pt-3 text-[11px] font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                                        {labels[group.kind]}
                                    </p>
                                    <ul role="group" aria-labelledby={`${listId}-${group.kind}`}>
                                        {group.items.map((result) => {
                                            const index = flat.indexOf(result);
                                            const selected = index === active;
                                            return (
                                                <li
                                                    key={result.id}
                                                    id={`${listId}-${result.id}`}
                                                    ref={(node) => {
                                                        if (node) optionRefs.current.set(result.id, node);
                                                        else optionRefs.current.delete(result.id);
                                                    }}
                                                    role="option"
                                                    aria-selected={selected}
                                                    onMouseMove={() => !selected && setActive(index)}
                                                    onClick={() => open(result)}
                                                    className={`flex cursor-pointer select-none items-center gap-3 rounded-lg px-3 py-2 transition-colors ${
                                                        selected ? "bg-zinc-100 dark:bg-white/[0.06]" : ""
                                                    }`}
                                                >
                                                    <ResultIcon result={result} active={selected}/>
                                                    <span className="min-w-0 flex-1">
                                                        <span className="block truncate text-sm font-medium text-zinc-800 dark:text-zinc-100">{result.title}</span>
                                                        <span className="block truncate text-xs text-zinc-500 dark:text-zinc-400">{subtitle(result)}</span>
                                                    </span>
                                                    {result.kind === "person" && <LuUser className="size-3.5 shrink-0 text-zinc-300 dark:text-zinc-600" aria-hidden/>}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </li>
                            ))}
                        </ul>

                        {flat.length === 0 && (
                            <div className="flex flex-col items-center px-6 py-16 text-center">
                                <span className="flex size-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 dark:bg-white/5 dark:text-zinc-400">
                                    <LuSearchX className="size-5" aria-hidden/>
                                </span>
                                <p className="mt-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">Nothing matches “{query.trim()}”</p>
                                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{emptyHint}</p>
                            </div>
                        )}
                    </div>

                    {/* The preview follows the highlighted row. It is hidden on small screens, where the subtitle carries the context. */}
                    <aside className="relative hidden h-80 overflow-hidden border-l border-zinc-100 bg-zinc-50/70 md:block dark:border-white/[0.06] dark:bg-white/[0.02]" aria-label="Preview">
                        <AnimatePresence mode="wait" initial={false}>
                            {current && (
                                <motion.div
                                    key={current.id}
                                    className="h-full overflow-y-auto p-5"
                                    initial={reduceMotion ? {opacity: 0} : {opacity: 0, y: 6}}
                                    animate={{opacity: 1, y: 0}}
                                    exit={{opacity: 0}}
                                    transition={{duration: 0.14, ease: "easeOut"}}
                                >
                                    <ResultPreview result={current}/>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </aside>
                </div>

                <div className="flex items-center gap-4 border-t border-zinc-100 bg-zinc-50/60 px-4 py-2.5 text-xs text-zinc-500 dark:border-white/[0.06] dark:bg-white/[0.02] dark:text-zinc-400">
                    <span className="flex items-center gap-1.5">
                        <Kbd><LuArrowUp className="size-3" aria-hidden/></Kbd>
                        <Kbd><LuArrowDown className="size-3" aria-hidden/></Kbd>
                        Browse
                    </span>
                    <span className="flex items-center gap-1.5">
                        <Kbd><LuCornerDownLeft className="size-3" aria-hidden/></Kbd>
                        Open
                    </span>
                    <span className="ml-auto truncate" aria-live="polite">
                        {opened ? <>Opened <span className="font-medium text-zinc-800 dark:text-zinc-200">{opened}</span></> : null}
                    </span>
                </div>
            </div>
        </div>
    );
};
