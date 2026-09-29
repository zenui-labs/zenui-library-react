import {useId, useMemo, useState} from "react";
import type {ChangeEvent} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {LuMessageSquare, LuPlus, LuSearch} from "react-icons/lu";

export interface FaqEntry {
    id: string;
    /** The topic this question is listed under. It must match one of the topics shown in the side list. */
    topic: string;
    question: string;
    answer: string;
}

export interface FaqSupportCard {
    title: string;
    text: string;
    actionLabel: string;
    href: string;
}

export interface FaqAccordionItemProps {
    item: FaqEntry;
    open: boolean;
    onToggle: () => void;
}

/** One question with an animated answer panel. Place it inside a bordered container. */
export const FaqAccordionItem = ({item, open, onToggle}: FaqAccordionItemProps) => {
    const id = useId();
    return (
        <div className="border-b border-slate-200 last:border-b-0 dark:border-slate-800">
            <h3>
                <button
                    type="button"
                    id={`${id}-button`}
                    aria-expanded={open}
                    aria-controls={`${id}-panel`}
                    onClick={onToggle}
                    className="flex w-full items-center justify-between gap-6 rounded-lg py-5 text-left text-base font-medium text-slate-900 outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:text-white"
                >
                    {item.question}
                    <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${open
                        ? "rotate-45 border-sky-600 bg-sky-600 text-white"
                        : "border-slate-200 text-slate-500 dark:border-slate-700 dark:text-slate-400"}`}>
                        <LuPlus className="h-4 w-4"/>
                    </span>
                </button>
            </h3>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        id={`${id}-panel`}
                        role="region"
                        aria-labelledby={`${id}-button`}
                        initial={{height: 0, opacity: 0}}
                        animate={{height: "auto", opacity: 1}}
                        exit={{height: 0, opacity: 0}}
                        transition={{duration: 0.3, ease: [0.16, 1, 0.3, 1]}}
                        className="overflow-hidden"
                    >
                        <p className="pb-5 pr-12 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{item.answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const defaultSupport: FaqSupportCard = {
    title: "Still have a question?",
    text: "Our support team replies in under 2 hours on weekdays.",
    actionLabel: "Contact support",
    href: "#",
};

export interface FaqSectionProps {
    questions: FaqEntry[];
    /** Topic order in the side list. Defaults to the order topics first appear in `questions`. */
    topics?: string[];
    /** Topic selected on first render. Defaults to the first topic. */
    defaultTopic?: string;
    /** Question open on first render. Defaults to the first question; pass null to start with all closed. */
    defaultOpenId?: string | null;
    title?: string;
    description?: string;
    searchPlaceholder?: string;
    emptyText?: string;
    /** The card under the list. Pass null to hide it. */
    support?: FaqSupportCard | null;
    className?: string;
}

/** An accordion FAQ grouped by topic, with search across every question and answer. */
export const FaqSection = ({
    questions,
    topics,
    defaultTopic,
    defaultOpenId,
    title = "Frequently asked questions",
    description = "Answers about plans, billing and security. Search, or pick a topic.",
    searchPlaceholder = "Search questions",
    emptyText = "No questions match your search. Try a shorter phrase.",
    support = defaultSupport,
    className = "",
}: FaqSectionProps) => {
    const topicList = useMemo(
        () => topics ?? Array.from(new Set(questions.map((item) => item.topic))),
        [topics, questions],
    );
    const [topic, setTopic] = useState<string>(defaultTopic ?? topicList[0] ?? "");
    const [query, setQuery] = useState("");
    const [openId, setOpenId] = useState<string | null>(defaultOpenId === undefined ? questions[0]?.id ?? null : defaultOpenId);
    const searchId = useId();

    const searching = query.trim().length > 0;
    const visible = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (q) return questions.filter((item) => `${item.question} ${item.answer}`.toLowerCase().includes(q));
        return questions.filter((item) => item.topic === topic);
    }, [questions, topic, query]);

    return (
        <section className={`w-full bg-white px-4 py-16 sm:px-8 sm:py-20 dark:bg-slate-950 ${className}`}>
            <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
                <div className="md:sticky md:top-8 md:self-start">
                    <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">{title}</h2>
                    {description && (
                        <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{description}</p>
                    )}

                    <div className="relative mt-6">
                        <label htmlFor={searchId} className="sr-only">{searchPlaceholder}</label>
                        <LuSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"/>
                        <input
                            id={searchId}
                            type="search"
                            value={query}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
                            placeholder={searchPlaceholder}
                            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-sky-500/10 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                        />
                    </div>

                    <nav aria-label="Question topics" className="mt-4">
                        <ul className="flex flex-wrap gap-1 md:flex-col">
                            {topicList.map((t) => {
                                const selected = !searching && t === topic;
                                const count = questions.filter((q) => q.topic === t).length;
                                return (
                                    <li key={t}>
                                        <button
                                            type="button"
                                            aria-current={selected ? "true" : undefined}
                                            onClick={() => {
                                                setQuery("");
                                                setTopic(t);
                                                setOpenId(null);
                                            }}
                                            className={`flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-sky-500 ${selected
                                                ? "bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300"
                                                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white"}`}
                                        >
                                            {t}
                                            <span className="text-xs tabular-nums text-slate-400">{count}</span>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </div>

                <div>
                    <p className="mb-2 text-sm text-slate-500 dark:text-slate-400" aria-live="polite">
                        {searching ? `${visible.length} result${visible.length === 1 ? "" : "s"} for "${query.trim()}"` : topic}
                    </p>
                    <div className="rounded-2xl border border-slate-200 px-5 dark:border-slate-800">
                        {visible.length > 0 ? (
                            visible.map((item) => (
                                <FaqAccordionItem key={item.id} item={item} open={openId === item.id}
                                                  onToggle={() => setOpenId((current) => (current === item.id ? null : item.id))}/>
                            ))
                        ) : (
                            <p className="py-10 text-center text-sm text-slate-500 dark:text-slate-400">{emptyText}</p>
                        )}
                    </div>

                    {support && (
                        <div className="mt-6 flex flex-col items-start gap-4 rounded-2xl bg-gradient-to-br from-sky-50 to-indigo-50 p-5 sm:flex-row sm:items-center dark:from-sky-500/10 dark:to-indigo-500/10">
                            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-sky-600 shadow-sm dark:bg-slate-900 dark:text-sky-400">
                                <LuMessageSquare className="h-5 w-5"/>
                            </span>
                            <div className="flex-1">
                                <p className="font-medium text-slate-900 dark:text-white">{support.title}</p>
                                <p className="text-sm text-slate-600 dark:text-slate-400">{support.text}</p>
                            </div>
                            <a href={support.href} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white outline-none transition-colors hover:bg-slate-700 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 dark:focus-visible:ring-offset-slate-950">
                                {support.actionLabel}
                            </a>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
