import {useId, useMemo, useRef, useState} from "react";
import type {ChangeEvent, KeyboardEvent, ReactNode} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {LuArrowRight, LuBookOpen, LuCornerDownLeft, LuCreditCard, LuFileText, LuLifeBuoy, LuPlug, LuSearch, LuSettings, LuShieldCheck, LuSmartphone, LuUsers, LuX} from "react-icons/lu";

interface Article {
    id: string;
    title: string;
    category: string;
    summary: string;
    minutes: number;
}

const articles: Article[] = [
    {id: "a1", title: "Invite teammates to your workspace", category: "Account", summary: "Send invites by email or share a link that only works for your company domain.", minutes: 2},
    {id: "a2", title: "Change your billing email or card", category: "Billing", summary: "Update payment details from Settings, Billing. Changes apply to the next invoice.", minutes: 1},
    {id: "a3", title: "Download past invoices", category: "Billing", summary: "Every invoice is available as a PDF for seven years, with your tax ID included.", minutes: 1},
    {id: "a4", title: "Connect Slack notifications", category: "Integrations", summary: "Choose which projects post to which channels, and mute updates outside work hours.", minutes: 3},
    {id: "a5", title: "Set up two factor authentication", category: "Security", summary: "Use an authenticator app or a hardware key. Admins can require it for everyone.", minutes: 2},
    {id: "a6", title: "Export all of your data", category: "Account", summary: "Request a full export as CSV and JSON. Large exports arrive by email within an hour.", minutes: 2},
    {id: "a7", title: "Use the mobile app offline", category: "Mobile", summary: "Recent projects sync to your phone and changes upload when you reconnect.", minutes: 3},
    {id: "a8", title: "Sync with Google Calendar", category: "Integrations", summary: "Due dates appear on your calendar and moving an event updates the task.", minutes: 2},
    {id: "a9", title: "Cancel or pause a subscription", category: "Billing", summary: "Pause for up to three months without losing data, or cancel at the end of the period.", minutes: 2},
    {id: "a10", title: "Add guests to a project", category: "Teams", summary: "Guests see only the projects you share with them and never count as a paid seat.", minutes: 2},
    {id: "a11", title: "Change a member's role", category: "Teams", summary: "Switch between Admin, Member and Viewer. Only admins can manage billing.", minutes: 1},
];

interface Category {
    name: string;
    icon: ReactNode;
    description: string;
}

const categories: Category[] = [
    {name: "Account", icon: <LuSettings className="h-5 w-5"/>, description: "Profile, workspace and data export"},
    {name: "Billing", icon: <LuCreditCard className="h-5 w-5"/>, description: "Plans, invoices and payment methods"},
    {name: "Integrations", icon: <LuPlug className="h-5 w-5"/>, description: "Slack, calendars and the API"},
    {name: "Security", icon: <LuShieldCheck className="h-5 w-5"/>, description: "Sign in, SSO and permissions"},
    {name: "Mobile", icon: <LuSmartphone className="h-5 w-5"/>, description: "iOS and Android apps"},
    {name: "Teams", icon: <LuUsers className="h-5 w-5"/>, description: "Roles, guests and shared projects"},
];

const popular = ["a2", "a5", "a4", "a6"];

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

const HelpCenterSearch = () => {
    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [selected, setSelected] = useState<Article | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const uid = useId();
    const listId = `${uid}-results`;

    const results = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return [];
        return articles.filter((a) => `${a.title} ${a.summary} ${a.category}`.toLowerCase().includes(q)).slice(0, 6);
    }, [query]);

    const showList = open && query.trim().length > 0;

    const choose = (article: Article) => {
        setSelected(article);
        setQuery(article.title);
        setOpen(false);
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
        <section className="w-full bg-white dark:bg-slate-950">
            <div className="relative bg-gradient-to-b from-indigo-600 to-violet-700 px-4 pb-24 pt-16 sm:px-8 sm:pt-20 dark:from-indigo-950 dark:to-slate-950">
                <div aria-hidden="true"
                     className="pointer-events-none absolute inset-0 opacity-20 [background-image:radial-gradient(rgb(255_255_255_/_0.6)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent)]"/>
                <div className="relative mx-auto max-w-2xl text-center">
                    <p className="inline-flex items-center gap-2 text-sm font-medium text-indigo-100">
                        <LuBookOpen className="h-4 w-4"/> Taskline help center
                    </p>
                    <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">How can we help?</h2>

                    <div className="relative mt-8 text-left">
                        <label htmlFor={`${uid}-input`} className="sr-only">Search help articles</label>
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
                            placeholder="Search for invoices, Slack, two factor..."
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
                            <a href="#" className="group mt-4 inline-flex items-center gap-1 rounded text-sm font-medium text-indigo-600 outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-indigo-400">
                                Open the full article <LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1"/>
                            </a>
                        </motion.article>
                    )}
                </AnimatePresence>

                <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category) => {
                        const count = articles.filter((a) => a.category === category.name).length;
                        return (
                            <li key={category.name}>
                                <button
                                    type="button"
                                    onClick={() => searchCategory(category.name)}
                                    className="group flex h-full w-full items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm outline-none transition-all hover:-translate-y-0.5 hover:border-indigo-200 hover:shadow-md focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-indigo-500/40"
                                >
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white dark:bg-indigo-500/10 dark:text-indigo-400">
                                        {category.icon}
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
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">Popular articles</h3>
                        <ul className="mt-4 divide-y divide-slate-100 dark:divide-slate-800">
                            {popular.map((id) => {
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
                    <div className="rounded-2xl bg-slate-50 p-6 dark:bg-slate-900">
                        <LuLifeBuoy className="h-6 w-6 text-indigo-600 dark:text-indigo-400"/>
                        <p className="mt-3 font-semibold text-slate-900 dark:text-white">Talk to a person</p>
                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">Chat with support from 8 AM to 8 PM Eastern, Monday to Friday.</p>
                        <a href="#" className="mt-4 inline-flex rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white outline-none transition-colors hover:bg-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900">
                            Start a chat
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HelpCenterSearch;
