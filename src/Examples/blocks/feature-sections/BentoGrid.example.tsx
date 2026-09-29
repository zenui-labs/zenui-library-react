import type {ReactNode} from "react";
import {motion} from "framer-motion";
import {LuActivity, LuBell, LuCommand, LuGlobe, LuSearch} from "react-icons/lu";

interface TileProps {
    icon: ReactNode;
    eyebrow: string;
    title: string;
    body: string;
    className?: string;
    children: ReactNode;
}

const Tile = ({icon, eyebrow, title, body, className = "", children}: TileProps) => (
    <motion.article
        initial={{opacity: 0, y: 16}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true, amount: 0.3}}
        transition={{duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
        className={`group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:shadow-none ${className}`}
    >
        <div className="relative z-10">
            <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                {icon}
                {eyebrow}
            </p>
            <h3 className="mt-3 text-lg font-semibold tracking-tight text-slate-900 dark:text-white">{title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{body}</p>
        </div>
        <div className="relative mt-6 flex-1">{children}</div>
    </motion.article>
);

// p95 latency samples for the trace chart, in milliseconds.
const latency: number[] = [182, 176, 190, 171, 168, 204, 240, 212, 188, 166, 158, 162, 149, 153, 141, 138, 146, 132];

const TraceChart = () => {
    const width = 420;
    const height = 120;
    const max = Math.max(...latency);
    const min = Math.min(...latency);
    const points = latency.map((value, i) => {
        const x = (i / (latency.length - 1)) * width;
        const y = height - ((value - min) / (max - min)) * (height - 16) - 8;
        return [x, y] as const;
    });
    const line = points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
    const area = `${line} L${width},${height} L0,${height} Z`;
    const peak = points[6];

    return (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
            <div className="flex items-baseline justify-between">
                <p className="text-xs text-slate-500 dark:text-slate-400">checkout-api, p95 latency</p>
                <p className="text-sm font-semibold tabular-nums text-emerald-600 dark:text-emerald-400">132 ms</p>
            </div>
            <svg viewBox={`0 0 ${width} ${height}`} className="mt-3 h-28 w-full" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                    <linearGradient id="bento-area" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="rgb(99 102 241)" stopOpacity="0.25"/>
                        <stop offset="100%" stopColor="rgb(99 102 241)" stopOpacity="0"/>
                    </linearGradient>
                </defs>
                {[0.25, 0.5, 0.75].map((f) => (
                    <line key={f} x1="0" x2={width} y1={height * f} y2={height * f}
                          className="stroke-slate-200 dark:stroke-slate-800" strokeDasharray="4 6"/>
                ))}
                <motion.path d={area} fill="url(#bento-area)"
                             initial={{opacity: 0}} whileInView={{opacity: 1}} viewport={{once: true}}
                             transition={{duration: 1, delay: 0.6}}/>
                <motion.path d={line} fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                             className="stroke-indigo-500"
                             initial={{pathLength: 0}} whileInView={{pathLength: 1}} viewport={{once: true}}
                             transition={{duration: 1.4, ease: "easeInOut"}}/>
                <circle cx={peak[0]} cy={peak[1]} r="4" className="fill-white stroke-rose-500 dark:fill-slate-950" strokeWidth="2.5"/>
            </svg>
            <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-2 py-0.5 text-xs text-rose-700 dark:bg-rose-500/10 dark:text-rose-300">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-500"/>
                Spike at 14:32 traced to a slow inventory query
            </p>
        </div>
    );
};

const regions: {name: string; x: number; y: number}[] = [
    {name: "Oregon", x: 22, y: 38},
    {name: "Virginia", x: 31, y: 40},
    {name: "Frankfurt", x: 51, y: 32},
    {name: "Mumbai", x: 68, y: 50},
    {name: "Tokyo", x: 84, y: 40},
    {name: "Sydney", x: 86, y: 74},
];

const EdgeMap = () => (
    <div className="relative h-36 overflow-hidden rounded-2xl border border-slate-200 bg-[radial-gradient(circle,rgb(148_163_184/0.45)_1px,transparent_1px)] bg-[size:10px_10px] dark:border-slate-800 dark:bg-[radial-gradient(circle,rgb(71_85_105/0.6)_1px,transparent_1px)]">
        {regions.map((region, i) => (
            <span key={region.name} className="absolute" style={{left: `${region.x}%`, top: `${region.y}%`}}>
                <motion.span
                    className="absolute -left-2 -top-2 h-4 w-4 rounded-full bg-indigo-500/30"
                    animate={{scale: [1, 2.2], opacity: [0.8, 0]}}
                    transition={{duration: 2, repeat: Infinity, delay: i * 0.35, ease: "easeOut"}}
                />
                <span className="absolute -left-1 -top-1 h-2 w-2 rounded-full bg-indigo-500 ring-2 ring-white dark:ring-slate-900"/>
                <span className="sr-only">{region.name}</span>
            </span>
        ))}
    </div>
);

interface Alert {
    service: string;
    message: string;
    tone: "rose" | "amber" | "emerald";
}

const alerts: Alert[] = [
    {service: "payments-worker", message: "Error rate above 2% for 5 minutes", tone: "rose"},
    {service: "search-index", message: "Queue depth rising, 1,240 jobs", tone: "amber"},
    {service: "auth-gateway", message: "Recovered after 3 minutes", tone: "emerald"},
];

const toneDot: Record<Alert["tone"], string> = {
    rose: "bg-rose-500",
    amber: "bg-amber-500",
    emerald: "bg-emerald-500",
};

const AlertStack = () => (
    <ul className="space-y-2">
        {alerts.map((alert, i) => (
            <li key={alert.service}
                className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm transition-transform duration-300 group-hover:translate-x-1 dark:border-slate-800 dark:bg-slate-950"
                style={{transitionDelay: `${i * 60}ms`}}>
                <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${toneDot[alert.tone]}`}/>
                <div className="min-w-0">
                    <p className="truncate font-mono text-xs text-slate-900 dark:text-slate-100">{alert.service}</p>
                    <p className="truncate text-xs text-slate-500 dark:text-slate-400">{alert.message}</p>
                </div>
            </li>
        ))}
    </ul>
);

const CommandPalette = () => (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950">
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-400 dark:border-slate-700 dark:bg-slate-900">
            <LuSearch className="h-4 w-4"/>
            <span className="text-slate-900 dark:text-slate-100">rollback</span>
            <span className="h-4 w-px animate-pulse bg-indigo-500"/>
        </div>
        <ul className="mt-2 space-y-1 text-sm">
            <li className="flex items-center justify-between gap-2 rounded-lg bg-indigo-50 px-3 py-2 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300">
                Roll back to v412
                <kbd className="rounded border border-indigo-200 px-1.5 text-xs dark:border-indigo-400/30">Enter</kbd>
            </li>
            <li className="px-3 py-2 text-slate-600 dark:text-slate-400">Compare with v413</li>
        </ul>
    </div>
);

// Incidents per day for the last 30 days.
const days: number[] = Array.from({length: 30}, (_, i) => (i === 8 ? 2 : i === 21 ? 1 : 0));

const UptimeBars = () => (
    <div>
        <p className="text-2xl font-semibold tabular-nums tracking-tight text-slate-900 dark:text-white">
            99.982<span className="text-base text-slate-400">%</span>
        </p>
        <div className="mt-3 flex h-10 items-end gap-[2px]">
            {days.map((incident, i) => (
                <span key={i}
                      title={incident === 0 ? "No incidents" : `${incident} incident${incident > 1 ? "s" : ""}`}
                      className={`h-full flex-1 rounded-[2px] transition-transform hover:scale-y-110 ${incident === 0 ? "bg-emerald-400 dark:bg-emerald-500/80" : incident === 1 ? "bg-amber-400" : "bg-rose-500"}`}/>
            ))}
        </div>
        <div className="mt-2 flex justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>30 days ago</span>
            <span>Today</span>
        </div>
    </div>
);

const BentoGrid = () => {
    return (
        <section className="w-full bg-slate-50 px-4 py-16 sm:px-8 sm:py-20 dark:bg-slate-950">
            <div className="mx-auto max-w-5xl">
                <div className="max-w-2xl">
                    <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">Observability</p>
                    <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                        Everything on-call needs at 2 a.m., on one screen
                    </h2>
                    <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">
                        Relay connects traces, alerts and deploys, so you can find the change that broke checkout
                        before your customers notice it.
                    </p>
                </div>

                <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    <Tile className="sm:col-span-2" icon={<LuActivity className="h-4 w-4"/>} eyebrow="Tracing"
                          title="Traces you can actually read"
                          body="Every request is grouped by endpoint and annotated with the deploy that shipped it.">
                        <TraceChart/>
                    </Tile>
                    <Tile icon={<LuGlobe className="h-4 w-4"/>} eyebrow="Edge"
                          title="Checks from six regions"
                          body="Synthetic probes run every 30 seconds from where your users are.">
                        <EdgeMap/>
                    </Tile>
                    <Tile icon={<LuBell className="h-4 w-4"/>} eyebrow="Alerts"
                          title="Alerts that group themselves"
                          body="Related failures collapse into one incident instead of forty pages.">
                        <AlertStack/>
                    </Tile>
                    <Tile icon={<LuCommand className="h-4 w-4"/>} eyebrow="Actions"
                          title="Roll back from the keyboard"
                          body="Press Cmd K, type what you need, and confirm.">
                        <CommandPalette/>
                    </Tile>
                    <Tile icon={<LuActivity className="h-4 w-4"/>} eyebrow="Status"
                          title="A status page that updates itself"
                          body="Incidents post automatically and resolve when checks go green.">
                        <UptimeBars/>
                    </Tile>
                </div>
            </div>
        </section>
    );
};

export default BentoGrid;
