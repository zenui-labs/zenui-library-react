import {useState} from "react";
import type {ChangeEvent, FormEvent} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {LuBell, LuChevronDown} from "react-icons/lu";

type Kind = "New" | "Improved" | "Fixed";

interface Change {
    kind: Kind;
    text: string;
}

interface Release {
    version: string;
    date: string;
    title: string;
    summary: string;
    changes: Change[];
    latest?: boolean;
}

const releases: Release[] = [
    {
        version: "3.18",
        date: "Sep 24, 2026",
        title: "Recurring issues and faster search",
        summary: "Set an issue to repeat weekly or monthly, and search now returns results as you type across every project.",
        latest: true,
        changes: [
            {kind: "New", text: "Recurring issues with custom schedules"},
            {kind: "Improved", text: "Search is 4 times faster on workspaces with over 50,000 issues"},
            {kind: "Fixed", text: "Due dates no longer shift by a day for users east of UTC"},
        ],
    },
    {
        version: "3.17",
        date: "Sep 10, 2026",
        title: "Project templates",
        summary: "Save any project as a template with its views, labels and automations, then reuse it across teams.",
        changes: [
            {kind: "New", text: "Project templates with default assignees"},
            {kind: "Improved", text: "Bulk edit now supports up to 500 issues at once"},
        ],
    },
    {
        version: "3.16",
        date: "Aug 27, 2026",
        title: "Audit log export",
        summary: "Admins on the Business plan can export the audit log as CSV or stream it to their SIEM.",
        changes: [
            {kind: "New", text: "Audit log export and streaming"},
            {kind: "Fixed", text: "Slack previews show the correct issue status"},
            {kind: "Fixed", text: "Keyboard shortcuts work again inside the command menu"},
        ],
    },
    {
        version: "3.15",
        date: "Aug 12, 2026",
        title: "Cycle reports",
        summary: "See scope changes, carry-over and completion rate for every cycle, with a chart you can paste into a doc.",
        changes: [
            {kind: "New", text: "Cycle reports with scope change tracking"},
            {kind: "Improved", text: "Faster load times for the roadmap view"},
        ],
    },
];

const kindStyles: Record<Kind, string> = {
    New: "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-300 dark:ring-emerald-400/20",
    Improved: "bg-sky-50 text-sky-700 ring-sky-600/20 dark:bg-sky-500/10 dark:text-sky-300 dark:ring-sky-400/20",
    Fixed: "bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-500/10 dark:text-amber-300 dark:ring-amber-400/20",
};

const ReleaseEntry = ({release}: {release: Release}) => (
    <div className="relative grid gap-3 pb-12 pl-8 md:grid-cols-[140px_minmax(0,1fr)] md:gap-8 md:pl-0">
        {/* Dot on the timeline */}
        <span aria-hidden="true"
              className="absolute left-0 top-1 flex h-4 w-4 items-center justify-center md:left-[148px]">
            {release.latest && <span className="absolute h-4 w-4 animate-ping rounded-full bg-indigo-400/60"/>}
            <span className={`relative h-3 w-3 rounded-full ring-4 ring-white dark:ring-slate-950 ${release.latest ? "bg-indigo-500" : "bg-slate-300 dark:bg-slate-600"}`}/>
        </span>

        <div className="md:pr-6 md:text-right">
            <p className="font-mono text-sm font-semibold text-slate-900 dark:text-white">v{release.version}</p>
            <time className="text-sm text-slate-500 dark:text-slate-400">{release.date}</time>
        </div>

        <div className="md:pl-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                {release.title}
                {release.latest && (
                    <span className="ml-2 rounded-full bg-indigo-600 px-2 py-0.5 align-middle text-[11px] font-medium text-white">Latest</span>
                )}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{release.summary}</p>
            <ul className="mt-4 space-y-2">
                {release.changes.map((change) => (
                    <li key={change.text} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                        <span className={`mt-px w-[68px] shrink-0 rounded-md py-0.5 text-center text-xs font-medium ring-1 ring-inset ${kindStyles[change.kind]}`}>
                            {change.kind}
                        </span>
                        {change.text}
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

const ChangelogTimeline = () => {
    const [showAll, setShowAll] = useState(false);
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);
    const visible = showAll ? releases : releases.slice(0, 2);

    const onSubscribe = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (email.trim()) setSubscribed(true);
    };

    return (
        <section className="w-full bg-white px-4 py-16 sm:px-8 dark:bg-slate-950">
            <div className="mx-auto max-w-4xl">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">Changelog</h2>
                        <p className="mt-2 text-slate-600 dark:text-slate-400">New features and fixes, every two weeks.</p>
                    </div>
                    {subscribed ? (
                        <p role="status" className="inline-flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-400">
                            <LuBell className="h-4 w-4"/> Subscribed. Updates will go to {email.trim()}.
                        </p>
                    ) : (
                        <form onSubmit={onSubscribe} className="flex gap-2">
                            <label htmlFor="changelog-email" className="sr-only">Email for release updates</label>
                            <input id="changelog-email" type="email" required value={email}
                                   onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                   placeholder="you@company.com"
                                   className="w-48 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 dark:border-slate-800 dark:bg-slate-900 dark:text-white"/>
                            <button type="submit"
                                    className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white outline-none hover:bg-slate-700 focus-visible:ring-2 focus-visible:ring-indigo-500 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200">
                                Subscribe
                            </button>
                        </form>
                    )}
                </div>

                <div className="relative mt-12">
                    {/* Vertical line */}
                    <span aria-hidden="true"
                          className="absolute bottom-0 left-[7.5px] top-2 w-px bg-gradient-to-b from-indigo-500 via-slate-200 to-transparent md:left-[156px] dark:via-slate-800"/>
                    <ol>
                        <AnimatePresence initial={false}>
                            {visible.map((release) => (
                                <motion.li key={release.version}
                                           initial={{opacity: 0, y: -8}}
                                           animate={{opacity: 1, y: 0}}
                                           exit={{opacity: 0}}
                                           transition={{duration: 0.3}}>
                                    <ReleaseEntry release={release}/>
                                </motion.li>
                            ))}
                        </AnimatePresence>
                    </ol>
                </div>

                <div className="pl-8 md:pl-[196px]">
                    <button type="button" onClick={() => setShowAll((v) => !v)} aria-expanded={showAll}
                            className="inline-flex items-center gap-1.5 rounded-lg text-sm font-semibold text-indigo-600 outline-none hover:text-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-indigo-400">
                        {showAll ? "Show recent releases only" : `Show ${releases.length - 2} older releases`}
                        <LuChevronDown className={`h-4 w-4 transition-transform ${showAll ? "rotate-180" : ""}`}/>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default ChangelogTimeline;
