import {useEffect, useRef, useState} from "react";
import type {ReactNode} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {
    LuActivity,
    LuCheck,
    LuChevronDown,
    LuCopy,
    LuFlag,
    LuGauge,
    LuLayers,
    LuRadio,
    LuSettings,
    LuUserPlus,
    LuZap,
} from "react-icons/lu";

type StepId = "project" | "install" | "verify" | "invite";

const steps: {id: StepId; title: string; summary: string}[] = [
    {id: "project", title: "Create your project", summary: "Done. Your project key is ready."},
    {id: "install", title: "Add the tracking snippet", summary: "Paste it before the closing head tag on every page."},
    {id: "verify", title: "Send your first event", summary: "We will listen for events from your site."},
    {id: "invite", title: "Invite your team", summary: "Dashboards are better with more eyes on them."},
];

const snippet = `<script defer src="https://cdn.beacon.dev/b.js"
  data-project="bcn_pub_7Qd2xk"></script>`;

const nav: {label: string; icon: ReactNode; active?: boolean}[] = [
    {label: "Get started", icon: <LuFlag className="h-4 w-4"/>, active: true},
    {label: "Live events", icon: <LuActivity className="h-4 w-4"/>},
    {label: "Dashboards", icon: <LuGauge className="h-4 w-4"/>},
    {label: "Funnels", icon: <LuLayers className="h-4 w-4"/>},
    {label: "Settings", icon: <LuSettings className="h-4 w-4"/>},
];

const ProgressRing = ({value}: {value: number}) => {
    const radius = 22;
    const circumference = 2 * Math.PI * radius;
    return (
        <svg viewBox="0 0 56 56" className="h-14 w-14 -rotate-90" aria-hidden="true">
            <circle cx="28" cy="28" r={radius} fill="none" strokeWidth="5" className="stroke-teal-100 dark:stroke-teal-500/15"/>
            <motion.circle cx="28" cy="28" r={radius} fill="none" strokeWidth="5" strokeLinecap="round" className="stroke-teal-500"
                           strokeDasharray={circumference} initial={false} animate={{strokeDashoffset: circumference * (1 - value)}}
                           transition={{type: "spring", stiffness: 90, damping: 20}}/>
        </svg>
    );
};

const EmptyStateShell = () => {
    const reduce = useReducedMotion();
    const [done, setDone] = useState<StepId[]>(["project"]);
    const [open, setOpen] = useState<StepId | null>("install");
    const [copied, setCopied] = useState(false);
    const [listening, setListening] = useState(false);
    const [events, setEvents] = useState<{id: number; name: string; path: string; time: string}[]>([]);
    const timers = useRef<number[]>([]);

    useEffect(() => () => timers.current.forEach((id) => window.clearTimeout(id)), []);

    const later = (fn: () => void, ms: number) => {
        timers.current.push(window.setTimeout(fn, ms));
    };

    const complete = (id: StepId) => {
        setDone((prev) => (prev.includes(id) ? prev : [...prev, id]));
        const next = steps.find((s) => s.id !== id && !done.includes(s.id) && s.id !== "project");
        setOpen(next ? next.id : null);
    };

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(snippet);
        } catch {
            // Clipboard can be blocked in iframes. The snippet is still selectable.
        }
        setCopied(true);
        later(() => setCopied(false), 1800);
    };

    const sendTest = () => {
        setListening(true);
        // Replace with a real listener, for example a server-sent events stream.
        later(() => {
            setEvents([{id: 1, name: "pageview", path: "/", time: "just now"}]);
            setListening(false);
            complete("verify");
        }, 1800);
        later(() => setEvents((prev) => [{id: 2, name: "click", path: "/pricing", time: "just now"}, ...prev]), 2600);
    };

    const progress = done.length / steps.length;

    return (
        <div className="flex h-[720px] w-full overflow-hidden bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
            <aside className="hidden w-60 shrink-0 flex-col border-r border-slate-200 p-3 md:flex dark:border-slate-800">
                <div className="flex items-center gap-2 px-2 py-1.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-500 text-white"><LuRadio className="h-4 w-4" aria-hidden="true"/></span>
                    <span className="text-sm font-semibold">Beacon</span>
                    <span className="ml-auto rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">Trial, 14 days</span>
                </div>
                <nav aria-label="Main" className="mt-6">
                    <ul className="space-y-0.5">
                        {nav.map((item) => (
                            <li key={item.label}>
                                <a href="#" aria-current={item.active ? "page" : undefined}
                                   className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${item.active
                                       ? "bg-teal-50 font-medium text-teal-800 dark:bg-teal-500/10 dark:text-teal-300"
                                       : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-900"}`}>
                                    <span aria-hidden="true">{item.icon}</span>
                                    <span className="flex-1">{item.label}</span>
                                    {item.label === "Get started" && <span className="text-xs tabular-nums">{done.length}/{steps.length}</span>}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="mt-auto rounded-xl bg-slate-50 p-3 text-xs text-slate-600 dark:bg-slate-900 dark:text-slate-400">
                    Stuck on setup? <a href="#" className="font-medium text-teal-700 underline-offset-2 hover:underline dark:text-teal-400">Book a 15 minute call</a>
                </div>
            </aside>

            <main className="flex-1 overflow-y-auto">
                <div className="flex h-12 items-center gap-2 border-b border-slate-200 px-4 md:hidden dark:border-slate-800">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-500 text-white"><LuRadio className="h-3.5 w-3.5" aria-hidden="true"/></span>
                    <span className="text-sm font-semibold">Beacon</span>
                    <span className="ml-auto text-xs text-slate-500 dark:text-slate-400">Setup {done.length} of {steps.length}</span>
                </div>
                <div className="mx-auto max-w-3xl px-4 py-8 sm:px-8">
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <ProgressRing value={progress}/>
                            <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold tabular-nums">{Math.round(progress * 100)}%</span>
                        </div>
                        <div>
                            <h1 className="text-2xl font-semibold tracking-tight">Set up Beacon for marlowe.shop</h1>
                            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{steps.length - done.length === 0 ? "You are all set." : `${steps.length - done.length} steps left. Most teams finish in under 10 minutes.`}</p>
                        </div>
                    </div>

                    <ol className="mt-8 divide-y divide-slate-200 overflow-hidden rounded-2xl border border-slate-200 dark:divide-slate-800 dark:border-slate-800">
                        {steps.map((step, i) => {
                            const isDone = done.includes(step.id);
                            const isOpen = open === step.id;
                            return (
                                <li key={step.id} className={isOpen ? "bg-slate-50/70 dark:bg-slate-900/50" : ""}>
                                    <button type="button" onClick={() => setOpen(isOpen ? null : step.id)} aria-expanded={isOpen} aria-controls={`empty-shell-${step.id}`}
                                            className="flex w-full items-center gap-4 px-4 py-4 text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-500 sm:px-5">
                                        <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors ${isDone
                                            ? "bg-teal-500 text-white"
                                            : "border-2 border-dashed border-slate-300 text-slate-400 dark:border-slate-700"}`}>
                                            {isDone ? <LuCheck className="h-4 w-4" aria-hidden="true"/> : i + 1}
                                        </span>
                                        <span className="min-w-0 flex-1">
                                            <span className={`block text-sm font-medium ${isDone ? "text-slate-500 line-through decoration-slate-300 dark:text-slate-400 dark:decoration-slate-600" : ""}`}>{step.title}</span>
                                            {!isOpen && <span className="block truncate text-xs text-slate-500 dark:text-slate-400">{step.summary}</span>}
                                        </span>
                                        <LuChevronDown className={`h-4 w-4 shrink-0 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`} aria-hidden="true"/>
                                    </button>
                                    <AnimatePresence initial={false}>
                                        {isOpen && (
                                            <motion.div id={`empty-shell-${step.id}`} initial={{height: 0, opacity: 0}} animate={{height: "auto", opacity: 1}} exit={{height: 0, opacity: 0}}
                                                        transition={{duration: reduce ? 0 : 0.2}} className="overflow-hidden">
                                                <div className="px-4 pb-5 pl-[60px] sm:px-5 sm:pl-[64px]">
                                                    <p className="text-sm text-slate-600 dark:text-slate-400">{step.summary}</p>

                                                    {step.id === "install" && (
                                                        <>
                                                            <div className="relative mt-3 rounded-xl bg-slate-900 p-4 pr-14 dark:bg-black">
                                                                <pre className="overflow-x-auto text-xs leading-relaxed text-slate-200"><code>{snippet}</code></pre>
                                                                <button type="button" onClick={copy} aria-label={copied ? "Copied" : "Copy snippet"}
                                                                        className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 outline-none hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-teal-400">
                                                                    {copied ? <LuCheck className="h-4 w-4 text-teal-400"/> : <LuCopy className="h-4 w-4"/>}
                                                                </button>
                                                            </div>
                                                            <button type="button" onClick={() => complete("install")}
                                                                    className="mt-3 rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-semibold text-white outline-none hover:bg-slate-700 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 dark:focus-visible:ring-offset-slate-950">
                                                                I added the snippet
                                                            </button>
                                                        </>
                                                    )}

                                                    {step.id === "verify" && (
                                                        <div className="mt-3 flex flex-wrap items-center gap-3">
                                                            <button type="button" onClick={sendTest} disabled={listening || isDone}
                                                                    className="inline-flex items-center gap-2 rounded-lg bg-teal-600 px-3 py-1.5 text-sm font-semibold text-white outline-none hover:bg-teal-700 focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 disabled:opacity-60 dark:focus-visible:ring-offset-slate-950">
                                                                <LuZap className="h-4 w-4" aria-hidden="true"/> Send a test event
                                                            </button>
                                                            <span className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400" role="status">
                                                                {listening && (
                                                                    <>
                                                                        <span className="relative flex h-2.5 w-2.5">
                                                                            {!reduce && <motion.span className="absolute inset-0 rounded-full bg-teal-500" animate={{scale: [1, 2.4], opacity: [0.7, 0]}} transition={{duration: 1, repeat: Infinity}}/>}
                                                                            <span className="relative h-2.5 w-2.5 rounded-full bg-teal-500"/>
                                                                        </span>
                                                                        Listening for events
                                                                    </>
                                                                )}
                                                                {isDone && "First event received"}
                                                            </span>
                                                        </div>
                                                    )}

                                                    {step.id === "invite" && (
                                                        <button type="button" onClick={() => complete("invite")}
                                                                className="mt-3 inline-flex items-center gap-2 rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium outline-none hover:bg-white focus-visible:ring-2 focus-visible:ring-teal-500 dark:border-slate-700 dark:hover:bg-slate-800">
                                                            <LuUserPlus className="h-4 w-4" aria-hidden="true"/> Invite teammates
                                                        </button>
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </li>
                            );
                        })}
                    </ol>

                    <section aria-labelledby="empty-shell-live" className="mt-8">
                        <div className="flex items-center justify-between">
                            <h2 id="empty-shell-live" className="text-sm font-semibold">Live events</h2>
                            <span className="text-xs text-slate-500 dark:text-slate-400">{events.length} in the last hour</span>
                        </div>
                        {events.length === 0 ? (
                            <div className="mt-3 flex flex-col items-center rounded-2xl border border-dashed border-slate-300 px-6 py-12 text-center dark:border-slate-700">
                                <div className="relative flex h-16 w-16 items-center justify-center" aria-hidden="true">
                                    {[0, 1, 2].map((ring) => (
                                        <span key={ring} className="absolute rounded-full border border-teal-500/30" style={{inset: `${ring * -10}px`, opacity: 1 - ring * 0.3}}/>
                                    ))}
                                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-50 text-teal-600 dark:bg-teal-500/10 dark:text-teal-300"><LuRadio className="h-5 w-5"/></span>
                                </div>
                                <p className="mt-6 font-medium">No events yet</p>
                                <p className="mt-1 max-w-xs text-sm text-slate-500 dark:text-slate-400">Once the snippet is on your site, visits and clicks will stream in here in real time.</p>
                            </div>
                        ) : (
                            <ul className="mt-3 divide-y divide-slate-100 rounded-2xl border border-slate-200 dark:divide-slate-800 dark:border-slate-800">
                                <AnimatePresence initial={false}>
                                    {events.map((e) => (
                                        <motion.li key={e.id} layout initial={{opacity: 0, y: -8}} animate={{opacity: 1, y: 0}}
                                                   className="flex items-center gap-3 px-4 py-3 text-sm">
                                            <span className="h-2 w-2 rounded-full bg-teal-500" aria-hidden="true"/>
                                            <span className="font-mono text-xs">{e.name}</span>
                                            <span className="text-slate-500 dark:text-slate-400">{e.path}</span>
                                            <span className="ml-auto text-xs text-slate-400">{e.time}</span>
                                        </motion.li>
                                    ))}
                                </AnimatePresence>
                            </ul>
                        )}
                    </section>
                </div>
            </main>
        </div>
    );
};

export default EmptyStateShell;
