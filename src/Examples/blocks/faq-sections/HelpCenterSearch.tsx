import {useId, useMemo, useRef, useState} from "react";
import type {ChangeEvent, ComponentType, KeyboardEvent, ReactNode} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {LuArrowRight, LuBookOpen, LuCornerDownLeft, LuFileText, LuLifeBuoy, LuSearch, LuX} from "react-icons/lu";

export type HelpCategoryIcon = ComponentType<{className?: string}>;

export interface HelpArticle {
    id: string;
    title: string;
    /** Must match the `name` of one of the categories. */
    category: string;
    summary: string;
    /** Reading time in minutes. */
    minutes: number;
    href?: string;
}

export interface HelpCategory {
    name: string;
    icon: HelpCategoryIcon;
    description: string;
}

export interface HelpContactCard {
    title: string;
    text: string;
    actionLabel: string;
    href: string;
}

const defaultContact: HelpContactCard = {
    title: "Talk to a person",
    text: "Chat with support from 8 AM to 8 PM Eastern, Monday to Friday.",
    actionLabel: "Start a chat",
    href: "#",
};

// Wraps every occurrence of the query in a <mark>.
const highlight = (text: string, query: string): ReactNode => {
    const q = query.trim();
    if (!q) return text;
    const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return text.split(new RegExp(`(${escaped})`, "gi")).map((part, i) =>
        part.toLowerCase() === q.toLowerCase()
            ? <mark key={i} className="rounded bg-yellow-200/80 px-0.5 text-inherit dark:bg-yellow-400/30">{part}</mark>
            : part,
    );
};

export interface HelpCenterSearchProps {
    articles: HelpArticle[];
    categories: HelpCategory[];
    /** Ids of the articles listed under the popular heading, in order. */
    popularIds?: string[];
    /** Called when a reader picks an article from the results or the popular list. */
    onSelect?: (article: HelpArticle) => void;
    /** How many matches the suggestion list shows. */
    maxResults?: number;
    eyebrow?: string;
    title?: string;
    searchLabel?: string;
    placeholder?: string;
    popularTitle?: string;
    articleLinkLabel?: string;
    /** The card next to the popular articles. Pass null to hide it. */
    contact?: HelpContactCard | null;
    className?: string;
}

/** A help center hero with a search combobox, highlighted matches, category cards and popular articles. */
export const HelpCenterSearch = ({
    articles,
    categories,
    popularIds = [],
    onSelect,
    maxResults = 6,
    eyebrow = "Taskline help center",
    title = "How can we help?",
    searchLabel = "Search help articles",
    placeholder = "Search for invoices, Slack, two factor...",
    popularTitle = "Popular articles",
    articleLinkLabel = "Open the full article",
    contact = defaultContact,
    className = "",
}: HelpCenterSearchProps) => {
    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [selected, setSelected] = useState<HelpArticle | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const uid = useId();
    const listId = `${uid}-results`;

    const results = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return [];
        return articles.filter((a) => `${a.title} ${a.summary} ${a.category}`.toLowerCase().includes(q)).slice(0, maxResults);
    }, [articles, query, maxResults]);

    const showList = open && query.trim().length > 0;

    const choose = (article: HelpArticle) => {
        setSelected(article);
        setQuery(article.title);
        setOpen(false);
        onSelect?.(article);
    };

    const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "ArrowDown") {
            event.preventDefault();
            setOpen(true);
            if (results.length) setActiveIndex((i) => (i + 1) % results.length);
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            if (results.length) setActiveIndex((i) => (i - 1 + results.length) % results.length);
        } else if (event.key === "Enter" && showList && results[activeIndex]) {
            event.preventDefault();
            choose(results[activeIndex]);
        } else if (event.key === "Escape") {
            if (showList) setOpen(false);
            else setQuery("");
        }
    };

    const searchCategory = (name: string) => {
        setQuery(name);
        setOpen(true);
        setActiveIndex(0);
        setSelected(null);
        inputRef.current?.focus();
    };

    return (
        <section className={`w-full bg-white dark:bg-slate-950 ${className}`}>
            <div className="relative bg-gradient-to-b from-indigo-600 to-violet-700 px-4 pb-24 pt-16 sm:px-8 sm:pt-20 dark:from-indigo-950 dark:to-slate-950">
                <div aria-hidden="true"
                     className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(rgb(255_255_255_/_0.6)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent)]"/>
                <div className="relative mx-auto max-w-2xl text-center">
                    {eyebrow && (
                        <p className="inline-flex items-center gap-2 text-sm font-medium text-indigo-100">
                            <LuBookOpen className="h-4 w-4"/> {eyebrow}
                        </p>
                    )}
                    <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>

                    <div className="relative mt-8 text-left">
                        <label htmlFor={`${uid}-input`} className="sr-only">{searchLabel}</label>
                        <LuSearch className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"/>
                        <input
                            ref={inputRef}
                            id={`${uid}-input`}
                            type="text"
                            role="combobox"
                            aria-expanded={showList}
                            aria-controls={listId}
                            aria-autocomplete="list"
                            aria-activedescendant={showList && results[activeIndex] ? `${uid}-option-${results[activeIndex].id}` : undefined}
                            autoComplete="off"
                            value={query}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setQuery(e.target.value);
                                setOpen(true);
                                setActiveIndex(0);
                                setSelected(null);
                            }}
                            onFocus={() => setOpen(true)}
                            onBlur={() => setOpen(false)}
                            onKeyDown={onKeyDown}
                            placeholder={placeholder}
                            className="w-full rounded-2xl border-0 bg-white py-4 pl-12 pr-12 text-base text-slate-900 shadow-2xl shadow-indigo-950/30 outline-none ring-4 ring-white/20 placeholder:text-slate-400 focus:ring-white/40 dark:bg-slate-900 dark:text-white dark:ring-white/10"
                        />
                        {query && (
                            <button
                                type="button"
                                onClick={() => {
                                    setQuery("");
                                    setSelected(null);
                                    inputRef.current?.focus();
                                }}
                                aria-label="Clear search"
                                className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-slate-400 outline-none hover:bg-slate-100 hover:text-slate-700 focus-visible:ring-2 focus-visible:ring-indigo-500 dark:hover:bg-slate-800 dark:hover:text-white"
                            >
                                <LuX className="h-4 w-4"/>
                            </button>
                        )}

                        <AnimatePresence>
                            {showList && (
                                <motion.div
                                    initial={{opacity: 0, y: -6}}
                                    animate={{opacity: 1, y: 0}}
                                    exit={{opacity: 0, y: -6}}
                                    transition={{duration: 0.15}}
                                    className="absolute inset-x-0 top-full z-20 mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900"
                                >
                                    <ul id={listId} role="listbox" aria-label="Suggested articles" className="max-h-80 overflow-y-auto p-2">
                                        {results.map((article, i) => (
                                            <li
                                                key={article.id}
                                                id={`${uid}-option-${article.id}`}
                                                role="option"
                                                aria-selected={i === activeIndex}
                                                onMouseDown={(e) => e.preventDefault()}
                                                onClick={() => choose(article)}
                                                onMouseEnter={() => setActiveIndex(i)}
                                                className={`flex cursor-pointer items-start gap-3 rounded-xl px-3 py-2.5 ${i === activeIndex ? "bg-indigo-50 dark:bg-indigo-500/10" : ""}`}
                                            >
                                                <LuFileText className="mt-0.5 h-4 w-4 shrink-0 text-slate-400"/>
                                                <span className="min-w-0 flex-1">
                                                    <span className="block truncate text-sm font-medium text-slate-900 dark:text-white">{highlight(article.title, query)}</span>
                                                    <span className="block truncate text-xs text-slate-500 dark:text-slate-400">{article.category} · {highlight(article.summary, query)}</span>
                                                </span>
                                                {i === activeIndex && <LuCornerDownLeft className="mt-0.5 h-4 w-4 shrink-0 text-indigo-500" aria-hidden="true"/>}
                                            </li>
                                        ))}
                                    </ul>
                                    {results.length === 0 && (
                                        <div className="px-4 py-8 text-center">
                                            <p className="text-sm font-medium text-slate-900 dark:text-white">No articles match "{query.trim()}"</p>
                                            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Try a different word, or contact support below.</p>
                                        </div>
                                    )}
                                    <p className="border-t border-slate-100 px-4 py-2 text-[11px] text-slate-400 dark:border-slate-800" aria-live="polite">
                                        {results.length} result{results.length === 1 ? "" : "s"} · Use arrow keys and Enter
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            <div className="relative mx-auto -mt-12 max-w-5xl px-4 pb-16 sm:px-8 sm:pb-24">
                <AnimatePresence>
                    {selected && (
                        <motion.article
                            initial={{opacity: 0, y: 12}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0, y: 12}}
                            className="mb-6 rounded-3xl border border-indigo-200 bg-white p-6 shadow-xl shadow-indigo-900/5 dark:border-indigo-500/30 dark:bg-slate-900"
                            aria-live="polite"
                        >
                            <p className="text-xs font-medium uppercase tracking-wider text-indigo-600 dark:text-indigo-400">{selected.category} · {selected.minutes} min read</p>
                            <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">{selected.title}</h3>
                            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{selected.summary}</p>
                            <a href={selected.href ?? "#"} className="group mt-4 inline-flex items-center gap-1 rounded text-sm font-medium text-indigo-600 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-indigo-400">
                                {articleLinkLabel} <LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1"/>
                            </a>
                        </motion.article>
                    )}
                </AnimatePresence>

                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category) => {
                        const count = articles.filter((a) => a.category === category.name).length;
                        const Icon = category.icon;
                        return (
                            <li key={category.name}>
                                <button
                                    type="button"
                                    onClick={() => searchCategory(category.name)}
                                    className="group flex h-full w-full items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm outline-none transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500/40"
                                >
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white dark:bg-indigo-500/10 dark:text-indigo-400">
                                        <Icon className="h-5 w-5"/>
                                    </span>
                                    <span>
                                        <span className="block font-semibold text-slate-900 dark:text-white">{category.name}</span>
                                        <span className="mt-0.5 block text-sm text-slate-500 dark:text-slate-400">{category.description}</span>
                                        <span className="mt-2 block text-xs font-medium text-slate-400">{count} article{count === 1 ? "" : "s"}</span>
                                    </span>
                                </button>
                            </li>
                        );
                    })}
                </ul>

                <div className="mt-12 grid gap-8 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
                    <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{popularTitle}</h3>
                        <ul className="mt-4 divide-y divide-slate-100 dark:divide-slate-800">
                            {popularIds.map((id) => {
                                const article = articles.find((a) => a.id === id);
                                if (!article) return null;
                                return (
                                    <li key={id}>
                                        <button
                                            type="button"
                                            onClick={() => choose(article)}
                                            className="group flex w-full items-center justify-between gap-4 rounded-lg py-3 text-left text-sm text-slate-700 outline-none hover:text-indigo-600 focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-slate-300 dark:hover:text-indigo-400"
                                        >
                                            {article.title}
                                            <LuArrowRight className="h-4 w-4 shrink-0 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-indigo-500 dark:text-slate-600"/>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    {contact && (
                        <div className="rounded-2xl bg-slate-50 p-6 dark:bg-slate-900">
                            <LuLifeBuoy className="h-6 w-6 text-indigo-600 dark:text-indigo-400"/>
                            <p className="mt-3 font-semibold text-slate-900 dark:text-white">{contact.title}</p>
                            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{contact.text}</p>
                            <a href={contact.href} className="mt-4 inline-flex rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white outline-none transition-colors hover:bg-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900">
                                {contact.actionLabel}
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
