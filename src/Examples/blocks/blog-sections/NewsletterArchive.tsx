import {useEffect, useId, useRef, useState} from "react";
import type {FormEvent, KeyboardEvent} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {LuArrowRight, LuCheck, LuLoader, LuMail} from "react-icons/lu";

export interface IssueLink {
    label: string;
    /** Site name shown under the label, for example "stripe.press". */
    source: string;
    href?: string;
}

export interface NewsletterIssue {
    /** Issue number. Also identifies the issue, so it must be unique. */
    number: number;
    /** Display date, for example "Sep 25, 2026". */
    date: string;
    subject: string;
    /** One line teaser shown in the list. */
    preview: string;
    /** Opening paragraph shown in the preview pane. */
    intro: string;
    links: IssueLink[];
    minutes: number;
    /** Link to the full issue. Defaults to "#". */
    href?: string;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialsOf = (name: string) => name.split(" ").map((p) => p[0]).join("");

export interface NewsletterArchiveProps {
    /** Issues, newest first. */
    issues: NewsletterIssue[];
    /** Newsletter name, shown as the sender in the preview. */
    name?: string;
    /** Small pill above the heading, for example the send schedule. */
    badge?: string;
    /** Defaults to the newsletter name followed by "archive". */
    heading?: string;
    description?: string;
    /** Selected issue number when controlled. */
    selectedIssue?: number;
    /** Selected issue number on first render when uncontrolled. Defaults to the first issue. */
    defaultSelectedIssue?: number;
    onSelectIssue?: (issueNumber: number) => void;
    /** Called with the trimmed address after it passes validation. */
    onSubscribe?: (email: string) => void;
    /** Delay in milliseconds before the confirmation shows. Stands in for the request to your provider. */
    subscribeDelay?: number;
    linksLabel?: string;
    readFullLabel?: string;
    className?: string;
}

/** Past issues in a list next to an email-style preview, with arrow key browsing and a validated subscribe form. */
export const NewsletterArchive = ({
    issues,
    name = "Operator Notes",
    badge,
    heading,
    description = "A short weekly letter on running small product teams, read by 26,000 managers and founders.",
    selectedIssue,
    defaultSelectedIssue,
    onSelectIssue,
    onSubscribe,
    subscribeDelay = 900,
    linksLabel = "Worth your time",
    readFullLabel = "Read the full issue",
    className = "",
}: NewsletterArchiveProps) => {
    const id = useId();
    const emailId = `${id}-email`;
    const errorId = `${id}-error`;
    const listId = `${id}-list`;
    const previewId = `${id}-preview`;
    const [innerSelected, setInnerSelected] = useState(defaultSelectedIssue ?? issues[0]?.number);
    const selected = selectedIssue ?? innerSelected;
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "error" | "done">("idle");
    const buttons = useRef<(HTMLButtonElement | null)[]>([]);
    const timer = useRef<number | undefined>(undefined);
    const issue = issues.find((i) => i.number === selected) ?? issues[0];

    useEffect(() => () => window.clearTimeout(timer.current), []);

    const select = (issueNumber: number) => {
        if (selectedIssue === undefined) setInnerSelected(issueNumber);
        onSelectIssue?.(issueNumber);
    };

    const onListKey = (event: KeyboardEvent<HTMLUListElement>) => {
        if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
        event.preventDefault();
        const index = issues.findIndex((i) => i.number === selected);
        const next = event.key === "ArrowDown" ? Math.min(issues.length - 1, index + 1) : Math.max(0, index - 1);
        select(issues[next].number);
        buttons.current[next]?.focus();
    };

    const subscribe = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const value = email.trim();
        if (!emailPattern.test(value)) {
            setStatus("error");
            return;
        }
        setStatus("loading");
        onSubscribe?.(value);
        // Replace with your newsletter provider.
        timer.current = window.setTimeout(() => setStatus("done"), subscribeDelay);
    };

    return (
        <section className={`w-full bg-stone-100 px-4 py-14 sm:px-8 dark:bg-stone-950 ${className}`}>
            <div className="mx-auto max-w-6xl">
                <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-end">
                    <div>
                        {badge && (
                            <p className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-medium text-stone-600 shadow-sm ring-1 ring-stone-200 dark:bg-stone-900 dark:text-stone-300 dark:ring-stone-800">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true"/> {badge}
                            </p>
                        )}
                        <h2 className={`${badge ? "mt-4 " : ""}text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl dark:text-white`}>{heading ?? `${name} archive`}</h2>
                        {description && (
                            <p className="mt-3 max-w-lg text-stone-600 dark:text-stone-400">
                                {description}
                            </p>
                        )}
                    </div>

                    <AnimatePresence mode="wait" initial={false}>
                        {status === "done" ? (
                            <motion.p key="done" role="status" initial={{opacity: 0, y: 6}} animate={{opacity: 1, y: 0}}
                                      className="flex items-center gap-3 rounded-2xl bg-emerald-50 p-4 text-sm text-emerald-800 ring-1 ring-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-500/30">
                                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white"><LuCheck className="h-4 w-4" aria-hidden="true"/></span>
                                Almost done. Confirm your subscription from the email we sent to {email.trim()}.
                            </motion.p>
                        ) : (
                            <motion.form key="form" onSubmit={subscribe} noValidate exit={{opacity: 0, y: -6}}>
                                <label htmlFor={emailId} className="text-sm font-medium text-stone-700 dark:text-stone-300">Get the next issue</label>
                                <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                                    <div className="relative flex-1">
                                        <LuMail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" aria-hidden="true"/>
                                        <input id={emailId} type="email" autoComplete="email" value={email} placeholder="you@company.com"
                                               onChange={(e) => { setEmail(e.target.value); if (status === "error") setStatus("idle"); }}
                                               aria-invalid={status === "error" ? true : undefined}
                                               aria-describedby={status === "error" ? errorId : undefined}
                                               className={`w-full rounded-xl border bg-white py-2.5 pl-9 pr-3 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-4 dark:bg-stone-900 dark:text-white ${status === "error"
                                                   ? "border-rose-400 focus:ring-rose-500/10"
                                                   : "border-stone-300 focus:border-stone-900 focus:ring-stone-900/5 dark:border-stone-700 dark:focus:border-stone-400"}`}/>
                                    </div>
                                    <button type="submit" disabled={status === "loading"}
                                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-stone-900 px-4 py-2.5 text-sm font-semibold text-white outline-none transition-colors hover:bg-stone-700 focus-visible:ring-2 focus-visible:ring-stone-900 focus-visible:ring-offset-2 disabled:opacity-70 dark:bg-white dark:text-stone-900 dark:hover:bg-stone-200 dark:focus-visible:ring-white dark:focus-visible:ring-offset-stone-950">
                                        {status === "loading" && <LuLoader className="h-4 w-4 animate-spin" aria-hidden="true"/>}
                                        Subscribe
                                    </button>
                                </div>
                                {status === "error" && <p id={errorId} className="mt-2 text-sm text-rose-600 dark:text-rose-400">Enter an email address like name@company.com.</p>}
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>

                <div className="mt-10 grid gap-4 md:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
                    <div>
                        <h3 id={listId} className="sr-only">Past issues</h3>
                        <ul aria-labelledby={listId} onKeyDown={onListKey} className="space-y-2">
                            {issues.map((item, i) => {
                                const current = item.number === selected;
                                return (
                                    <li key={item.number}>
                                        <button type="button" ref={(el) => { buttons.current[i] = el; }}
                                                aria-current={current ? "true" : undefined}
                                                aria-controls={previewId}
                                                onClick={() => select(item.number)}
                                                className={`relative w-full rounded-2xl p-4 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-stone-900 dark:focus-visible:ring-white ${current
                                                    ? "text-stone-900 dark:text-white"
                                                    : "text-stone-600 hover:bg-white/60 dark:text-stone-400 dark:hover:bg-stone-900/60"}`}>
                                            {current && (
                                                <motion.span layoutId={`${id}-active`} transition={{type: "spring", bounce: 0.15, duration: 0.4}}
                                                             className="absolute inset-0 rounded-2xl bg-white shadow-sm ring-1 ring-stone-200 dark:bg-stone-900 dark:ring-stone-800"/>
                                            )}
                                            <span className="relative flex items-center justify-between font-mono text-xs text-stone-400">
                                                <span>No. {item.number}</span>
                                                <time>{item.date}</time>
                                            </span>
                                            <span className="relative mt-1.5 block font-semibold">{item.subject}</span>
                                            <span className="relative mt-1 line-clamp-1 block text-sm text-stone-500 dark:text-stone-400">{item.preview}</span>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                        <p className="mt-3 hidden px-4 text-xs text-stone-400 md:block">Use the up and down arrow keys to browse issues.</p>
                    </div>

                    <div id={previewId} aria-live="polite"
                         className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-stone-200 dark:bg-stone-900 dark:ring-stone-800">
                        {issue && (
                            <>
                                <div className="flex items-center gap-3 border-b border-stone-100 px-5 py-3 text-xs text-stone-500 dark:border-stone-800 dark:text-stone-400">
                                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-stone-900 text-[10px] font-bold text-white dark:bg-white dark:text-stone-900">{initialsOf(name)}</span>
                                    <span className="min-w-0 flex-1 truncate"><span className="font-medium text-stone-800 dark:text-stone-200">{name}</span> to you</span>
                                    <span className="shrink-0">{issue.minutes} min read</span>
                                </div>
                                <AnimatePresence mode="wait" initial={false}>
                                    <motion.div key={issue.number}
                                                initial={{opacity: 0, y: 10}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: -10}}
                                                transition={{duration: 0.2}}
                                                className="px-5 py-7 sm:px-10 sm:py-10">
                                        <p className="font-mono text-xs text-stone-400">Issue {issue.number}, {issue.date}</p>
                                        <h4 className="mt-2 text-2xl font-semibold tracking-tight text-stone-900 dark:text-white">{issue.subject}</h4>
                                        <p className="mt-4 leading-7 text-stone-700 dark:text-stone-300">{issue.intro}</p>
                                        {issue.links.length > 0 && (
                                            <>
                                                <p className="mt-8 text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">{linksLabel}</p>
                                                <ul className="mt-3 divide-y divide-stone-100 dark:divide-stone-800">
                                                    {issue.links.map((link) => (
                                                        <li key={link.label}>
                                                            <a href={link.href ?? "#"} className="group flex items-center justify-between gap-4 rounded-lg py-3 outline-none focus-visible:ring-2 focus-visible:ring-stone-900 dark:focus-visible:ring-white">
                                                                <span>
                                                                    <span className="block text-sm font-medium text-stone-900 group-hover:underline dark:text-white">{link.label}</span>
                                                                    <span className="block text-xs text-stone-500 dark:text-stone-400">{link.source}</span>
                                                                </span>
                                                                <LuArrowRight className="h-4 w-4 shrink-0 text-stone-400 transition-transform group-hover:translate-x-1" aria-hidden="true"/>
                                                            </a>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </>
                                        )}
                                        <a href={issue.href ?? "#"} className="mt-8 inline-flex items-center gap-1.5 rounded-lg text-sm font-semibold text-stone-900 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-stone-900 dark:text-white dark:focus-visible:ring-white">
                                            {readFullLabel} <LuArrowRight className="h-4 w-4" aria-hidden="true"/>
                                        </a>
                                    </motion.div>
                                </AnimatePresence>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};
