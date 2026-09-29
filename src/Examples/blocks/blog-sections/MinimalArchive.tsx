import {useId, useState} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {LuArrowUpRight} from "react-icons/lu";

/** Essays show no tag, notes get a small tag, talks get a tag and a video length. */
export type ArchiveKind = "Essay" | "Note" | "Talk";

export interface ArchiveEntry {
    slug: string;
    kind: ArchiveKind;
    title: string;
    /** Short date without the year, for example "Sep 21". */
    date: string;
    /** Entries are grouped under this year, in the order they first appear. */
    year: number;
    /** Reading time, or video length for talks. */
    minutes: number;
    /** Link to the piece. Defaults to "#". */
    href?: string;
}

export interface ArchiveAuthor {
    name: string;
    /** One line under the name, for example a role. */
    bio: string;
    /** Text in the avatar. Defaults to the first letter of each word in the name. */
    initials?: string;
}

const kinds: ("All" | ArchiveKind)[] = ["All", "Essay", "Note", "Talk"];

const initialsOf = (name: string) => name.split(" ").map((p) => p[0]).join("");

export interface MinimalArchiveProps {
    entries: ArchiveEntry[];
    author: ArchiveAuthor;
    heading?: string;
    /** What the writing covers, shown after the count: "10 pieces on ...". */
    subject?: string;
    /** RSS feed link. Leave empty to hide the subscribe line. */
    rssHref?: string;
    /** Filter selected on first render. */
    defaultKind?: "All" | ArchiveKind;
    className?: string;
}

/** A text-only writing archive grouped by year, with a filter for essays, notes and talks. */
export const MinimalArchive = ({
    entries,
    author,
    heading = "Writing",
    subject = "software, teams and interfaces",
    rssHref = "#",
    defaultKind = "All",
    className = "",
}: MinimalArchiveProps) => {
    const tabId = useId();
    const [kind, setKind] = useState<"All" | ArchiveKind>(defaultKind);
    const reduce = useReducedMotion();
    const filtered = entries.filter((e) => kind === "All" || e.kind === kind);
    const years = Array.from(new Set(filtered.map((e) => e.year)));

    return (
        <section className={`w-full bg-white px-5 py-16 sm:px-8 dark:bg-neutral-950 ${className}`}>
            <div className="mx-auto max-w-2xl">
                <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 font-mono text-xs font-semibold text-white dark:bg-white dark:text-neutral-900">
                        {author.initials ?? initialsOf(author.name)}
                    </span>
                    <div className="text-sm">
                        <p className="font-medium text-neutral-900 dark:text-white">{author.name}</p>
                        <p className="text-neutral-500 dark:text-neutral-400">{author.bio}</p>
                    </div>
                </div>

                <h2 className="mt-10 text-2xl font-medium tracking-tight text-neutral-900 dark:text-white">{heading}</h2>
                <p className="mt-2 text-neutral-500 dark:text-neutral-400">
                    {entries.length} pieces on {subject}.
                    {rssHref && (
                        <>
                            {" "}Subscribe by{" "}
                            <a href={rssHref} className="rounded text-neutral-900 underline decoration-neutral-300 underline-offset-4 outline-none hover:decoration-neutral-900 focus-visible:ring-2 focus-visible:ring-neutral-400 dark:text-white dark:decoration-neutral-700 dark:hover:decoration-white">RSS</a>.
                        </>
                    )}
                </p>

                <div role="group" aria-label="Filter by type" className="mt-8 flex gap-5 border-b border-neutral-200 text-sm dark:border-neutral-800">
                    {kinds.map((k) => {
                        const count = k === "All" ? entries.length : entries.filter((e) => e.kind === k).length;
                        const current = kind === k;
                        return (
                            <button key={k} type="button" aria-pressed={current} onClick={() => setKind(k)}
                                    className={`relative -mb-px pb-3 outline-none transition-colors focus-visible:text-neutral-900 focus-visible:underline dark:focus-visible:text-white ${current
                                        ? "text-neutral-900 dark:text-white"
                                        : "text-neutral-400 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-300"}`}>
                                {k === "All" ? "All" : `${k}s`}
                                <sup className="ml-0.5 font-mono text-[10px]">{count}</sup>
                                {current && (
                                    <motion.span layoutId={`${tabId}-tab`} transition={{type: "spring", bounce: 0.2, duration: 0.35}}
                                                 className="absolute inset-x-0 bottom-0 h-px bg-neutral-900 dark:bg-white"/>
                                )}
                            </button>
                        );
                    })}
                </div>

                <AnimatePresence mode="wait" initial={false}>
                    <motion.div key={kind}
                                initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}
                                transition={{duration: 0.15}}>
                        {years.map((year) => (
                            <div key={year} className="grid gap-x-8 border-b border-neutral-100 py-6 last:border-b-0 sm:grid-cols-[64px_minmax(0,1fr)] dark:border-neutral-900">
                                <h3 className="mb-2 font-mono text-sm text-neutral-400 sm:sticky sm:top-4 sm:mb-0 sm:self-start sm:pt-2.5 dark:text-neutral-500">{year}</h3>
                                <ul>
                                    {filtered.filter((e) => e.year === year).map((entry, i) => (
                                        <motion.li key={entry.slug}
                                                   initial={reduce ? false : {opacity: 0, x: -6}}
                                                   animate={{opacity: 1, x: 0}}
                                                   transition={{delay: i * 0.03, duration: 0.2}}>
                                            <a href={entry.href ?? "#"}
                                               className="group -mx-3 flex items-baseline gap-4 rounded-lg px-3 py-2.5 outline-none transition-colors hover:bg-neutral-50 focus-visible:ring-2 focus-visible:ring-neutral-400 dark:hover:bg-neutral-900">
                                                <span className="min-w-0 flex-1">
                                                    <span className="text-neutral-900 dark:text-neutral-100">{entry.title}</span>
                                                    {entry.kind !== "Essay" && (
                                                        <span className="ml-2 rounded border border-neutral-200 px-1 py-px align-[2px] font-mono text-[10px] uppercase tracking-wide text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
                                                            {entry.kind}
                                                        </span>
                                                    )}
                                                </span>
                                                <span className="hidden shrink-0 font-mono text-xs text-neutral-400 sm:inline dark:text-neutral-500">
                                                    {entry.kind === "Talk" ? `${entry.minutes} min video` : `${entry.minutes} min`}
                                                </span>
                                                <time className="w-14 shrink-0 text-right font-mono text-xs text-neutral-400 tabular-nums dark:text-neutral-500">{entry.date}</time>
                                                <LuArrowUpRight className="h-3.5 w-3.5 shrink-0 self-center text-neutral-400 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden="true"/>
                                            </a>
                                        </motion.li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};
