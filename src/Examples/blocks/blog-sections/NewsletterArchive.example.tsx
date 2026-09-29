import {useEffect, useRef, useState} from "react";
import type {FormEvent, KeyboardEvent} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {LuArrowRight, LuCheck, LuLoader, LuMail} from "react-icons/lu";

interface ReadingLink {
    label: string;
    source: string;
}

interface Issue {
    number: number;
    date: string;
    subject: string;
    preview: string;
    intro: string;
    links: ReadingLink[];
    minutes: number;
}

const issues: Issue[] = [
    {
        number: 142,
        date: "Sep 25, 2026",
        subject: "The case for fewer dashboards",
        preview: "Plus: a font made for tables, and the best writing on on-call this month.",
        intro: "This week I kept coming back to one question from a reader: how many dashboards does a 30 person team actually need? My answer is three. Here is how we got there, along with the links that shaped my thinking.",
        links: [
            {label: "Tabular figures and why your numbers wiggle", source: "typography.guide"},
            {label: "On-call without burnout, a year of data", source: "incident.io"},
            {label: "The metrics we deleted, and why", source: "posthog.com"},
        ],
        minutes: 6,
    },
    {
        number: 141,
        date: "Sep 18, 2026",
        subject: "What a good handoff doc looks like",
        preview: "A template I have used for eight years, and three that I stopped using.",
        intro: "Handoffs fail quietly. Nobody notices until the person who knew the answer is on vacation. Below is the one page template I give every new lead, with notes on each section.",
        links: [
            {label: "Writing for the reader who is in a hurry", source: "stripe.press"},
            {label: "Runbooks that people actually open", source: "increment.com"},
        ],
        minutes: 5,
    },
    {
        number: 140,
        date: "Sep 11, 2026",
        subject: "Pricing pages are product pages",
        preview: "Five teardowns, from Linear to Figma, and what they all get right.",
        intro: "I spent the week reading pricing pages so you do not have to. The common thread: the best ones answer who it is for before they say how much it costs.",
        links: [
            {label: "A teardown of 40 SaaS pricing pages", source: "growth.design"},
            {label: "Anchoring, explained with coffee", source: "behavioraleconomics.com"},
            {label: "Why we removed our free plan", source: "basecamp.com"},
        ],
        minutes: 8,
    },
    {
        number: 139,
        date: "Sep 4, 2026",
        subject: "Notes from a week without Slack",
        preview: "What broke, what did not, and the one habit I kept.",
        intro: "I turned off Slack for five working days and told my team to email me instead. Fewer things broke than I expected, and one thing got much better.",
        links: [{label: "The cost of interrupted work", source: "ics.uci.edu"}],
        minutes: 4,
    },
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const NewsletterArchive = () => {
    const [selected, setSelected] = useState(issues[0].number);
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "error" | "done">("idle");
    const buttons = useRef<(HTMLButtonElement | null)[]>([]);
    const timer = useRef<number | undefined>(undefined);
    const issue = issues.find((i) => i.number === selected) ?? issues[0];

    useEffect(() => () => window.clearTimeout(timer.current), []);

    const onListKey = (event: KeyboardEvent<HTMLUListElement>) => {
        if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
        event.preventDefault();
        const index = issues.findIndex((i) => i.number === selected);
        const next = event.key === "ArrowDown" ? Math.min(issues.length - 1, index + 1) : Math.max(0, index - 1);
        setSelected(issues[next].number);
        buttons.current[next]?.focus();
    };

    const subscribe = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!emailPattern.test(email.trim())) {
            setStatus("error");
            return;
        }
        setStatus("loading");
        // Replace with your newsletter provider.
        timer.current = window.setTimeout(() => setStatus("done"), 900);
    };

    return (
        <section className="w-full bg-stone-100 px-4 py-14 sm:px-8 dark:bg-stone-950">
            <div className="mx-auto max-w-6xl">
                <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-end">
                    <div>
                        <p className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-medium text-stone-600 shadow-sm ring-1 ring-stone-200 dark:bg-stone-900 dark:text-stone-300 dark:ring-stone-800">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true"/> Every Thursday, 142 issues so far
                        </p>
                        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-stone-900 sm:text-4xl dark:text-white">Operator Notes archive</h2>
                        <p className="mt-3 max-w-lg text-stone-600 dark:text-stone-400">
                            A short weekly letter on running small product teams, read by 26,000 managers and founders.
                        </p>
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
                                <label htmlFor="newsletter-archive-email" className="text-sm font-medium text-stone-700 dark:text-stone-300">Get the next issue</label>
                                <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                                    <div className="relative flex-1">
                                        <LuMail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" aria-hidden="true"/>
                                        <input id="newsletter-archive-email" type="email" autoComplete="email" value={email} placeholder="you@company.com"
                                               onChange={(e) => { setEmail(e.target.value); if (status === "error") setStatus("idle"); }}
                                               aria-invalid={status === "error" ? true : undefined}
                                               aria-describedby={status === "error" ? "newsletter-archive-error" : undefined}
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
                                {status === "error" && <p id="newsletter-archive-error" className="mt-2 text-sm text-rose-600 dark:text-rose-400">Enter an email address like name@company.com.</p>}
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>

                <div className="mt-10 grid gap-4 md:grid-cols-[minmax(0,340px)_minmax(0,1fr)]">
                    <div>
                        <h3 id="newsletter-archive-list" className="sr-only">Past issues</h3>
                        <ul aria-labelledby="newsletter-archive-list" onKeyDown={onListKey} className="space-y-2">
                            {issues.map((item, i) => {
                                const current = item.number === selected;
                                return (
                                    <li key={item.number}>
                                        <button type="button" ref={(el) => { buttons.current[i] = el; }}
                                                aria-current={current ? "true" : undefined}
                                                aria-controls="newsletter-archive-preview"
                                                onClick={() => setSelected(item.number)}
                                                className={`relative w-full rounded-2xl p-4 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-stone-900 dark:focus-visible:ring-white ${current
                                                    ? "text-stone-900 dark:text-white"
                                                    : "text-stone-600 hover:bg-white/60 dark:text-stone-400 dark:hover:bg-stone-900/60"}`}>
                                            {current && (
                                                <motion.span layoutId="newsletter-archive-active" transition={{type: "spring", bounce: 0.15, duration: 0.4}}
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

                    <div id="newsletter-archive-preview" aria-live="polite"
                         className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-stone-200 dark:bg-stone-900 dark:ring-stone-800">
                        <div className="flex items-center gap-3 border-b border-stone-100 px-5 py-3 text-xs text-stone-500 dark:border-stone-800 dark:text-stone-400">
                            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-stone-900 text-[10px] font-bold text-white dark:bg-white dark:text-stone-900">ON</span>
                            <span className="min-w-0 flex-1 truncate"><span className="font-medium text-stone-800 dark:text-stone-200">Operator Notes</span> to you</span>
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
                                <p className="mt-8 text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">Worth your time</p>
                                <ul className="mt-3 divide-y divide-stone-100 dark:divide-stone-800">
                                    {issue.links.map((link) => (
                                        <li key={link.label}>
                                            <a href="#" className="group flex items-center justify-between gap-4 rounded-lg py-3 outline-none focus-visible:ring-2 focus-visible:ring-stone-900 dark:focus-visible:ring-white">
                                                <span>
                                                    <span className="block text-sm font-medium text-stone-900 group-hover:underline dark:text-white">{link.label}</span>
                                                    <span className="block text-xs text-stone-500 dark:text-stone-400">{link.source}</span>
                                                </span>
                                                <LuArrowRight className="h-4 w-4 shrink-0 text-stone-400 transition-transform group-hover:translate-x-1" aria-hidden="true"/>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                                <a href="#" className="mt-8 inline-flex items-center gap-1.5 rounded-lg text-sm font-semibold text-stone-900 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-stone-900 dark:text-white dark:focus-visible:ring-white">
                                    Read the full issue <LuArrowRight className="h-4 w-4" aria-hidden="true"/>
                                </a>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default NewsletterArchive;
