import {useId} from "react";
import type {ComponentType, ReactNode} from "react";
import {motion} from "framer-motion";
import {LuSearch} from "react-icons/lu";

export type BentoIcon = ComponentType<{className?: string}>;

export interface BentoTileData {
    icon: BentoIcon;
    /** Small uppercase label above the title. */
    eyebrow: string;
    title: string;
    body: string;
    /** The illustration shown under the text, for example one of the visuals exported from this file. */
    visual: ReactNode;
    /** Spans two columns from the sm breakpoint up. */
    wide?: boolean;
}

export interface BentoTileProps {
    icon: BentoIcon;
    eyebrow: string;
    title: string;
    body: string;
    className?: string;
    children: ReactNode;
}

export const BentoTile = ({icon: Icon, eyebrow, title, body, className = "", children}: BentoTileProps) => (
    <motion.article
        initial={{opacity: 0, y: 16}}
        whileInView={{opacity: 1, y: 0}}
        viewport={{once: true, amount: 0.3}}
        transition={{duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
        className={`group relative flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:shadow-none ${className}`}
    >
        <div className="relative z-10">
            <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                <Icon className="h-4 w-4"/>
                {eyebrow}
            </p>
            <h3 className="mt-3 text-lg font-semibold tracking-tight text-slate-900 dark:text-white">{title}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{body}</p>
        </div>
        <div className="relative mt-6 flex-1">{children}</div>
    </motion.article>
);

export interface TraceChartProps {
    /** Caption above the chart, for example the service and metric. */
    label: string;
    /** The current value shown on the right, already formatted. */
    value: string;
    samples: number[];
    /** Index of the sample to mark with a dot. Defaults to the highest sample. */
    markerIndex?: number;
    /** Short explanation of the marked sample, shown as a badge under the chart. */
    note?: string;
}

export const TraceChart = ({label, value, samples, markerIndex, note}: TraceChartProps) => {
    const gradientId = `bento-area-${useId().replace(/:/g, "")}`;
    const width = 420;
    const height = 120;
    const max = Math.max(...samples);
    const min = Math.min(...samples);
    const range = max - min || 1;
    const points = samples.map((sample, i) => {
        const x = (i / (samples.length - 1)) * width;
        const y = height - ((sample - min) / range) * (height - 16) - 8;
        return [x, y] as const;
    });
    const line = points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
    const area = `${line} L${width},${height} L0,${height} Z`;
    const marker = points[markerIndex ?? samples.indexOf(max)];

    return (
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950">
            <div className="flex items-baseline justify-between">
                <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
                <p className="text-sm font-semibold tabular-nums text-emerald-600 dark:text-emerald-400">{value}</p>
            </div>
            <svg viewBox={`0 0 ${width} ${height}`} className="mt-3 h-28 w-full" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                    <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="rgb(99 102 241)" stopOpacity="0.25"/>
                        <stop offset="100%" stopColor="rgb(99 102 241)" stopOpacity="0"/>
                    </linearGradient>
                </defs>
                {[0.25, 0.5, 0.75].map((f) => (
                    <line key={f} x1="0" x2={width} y1={height * f} y2={height * f}
                          className="stroke-slate-200 dark:stroke-slate-800" strokeDasharray="4 6"/>
                ))}
                <motion.path d={area} fill={`url(#${gradientId})`}
                             initial={{opacity: 0}} whileInView={{opacity: 1}} viewport={{once: true}}
                             transition={{duration: 1, delay: 0.6}}/>
                <motion.path d={line} fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                             className="stroke-indigo-500"
                             initial={{pathLength: 0}} whileInView={{pathLength: 1}} viewport={{once: true}}
                             transition={{duration: 1.4, ease: "easeInOut"}}/>
                {marker && (
                    <circle cx={marker[0]} cy={marker[1]} r="4" className="fill-white stroke-rose-500 dark:fill-slate-950" strokeWidth="2.5"/>
                )}
            </svg>
            {note && (
                <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-2 py-0.5 text-xs text-rose-700 dark:bg-rose-500/10 dark:text-rose-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-500"/>
                    {note}
                </p>
            )}
        </div>
    );
};

export interface MapPoint {
    name: string;
    /** Horizontal position as a percentage of the map width. */
    x: number;
    /** Vertical position as a percentage of the map height. */
    y: number;
}

export interface EdgeMapProps {
    regions: MapPoint[];
}

export const EdgeMap = ({regions}: EdgeMapProps) => (
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

export interface AlertItem {
    service: string;
    message: string;
    severity: "critical" | "warning" | "resolved";
}

const severityDot: Record<AlertItem["severity"], string> = {
    critical: "bg-rose-500",
    warning: "bg-amber-500",
    resolved: "bg-emerald-500",
};

export interface AlertStackProps {
    alerts: AlertItem[];
}

export const AlertStack = ({alerts}: AlertStackProps) => (
    <ul className="space-y-2">
        {alerts.map((alert, i) => (
            <li key={alert.service}
                className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-3 py-2.5 shadow-sm transition-transform duration-300 group-hover:translate-x-1 dark:border-slate-800 dark:bg-slate-950"
                style={{transitionDelay: `${i * 60}ms`}}>
                <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${severityDot[alert.severity]}`}/>
                <div className="min-w-0">
                    <p className="truncate font-mono text-xs text-slate-900 dark:text-slate-100">{alert.service}</p>
                    <p className="truncate text-xs text-slate-500 dark:text-slate-400">{alert.message}</p>
                </div>
            </li>
        ))}
    </ul>
);

export interface CommandPaletteProps {
    /** Text shown in the search field. */
    query: string;
    /** Result labels. The first one is shown as selected. */
    results: string[];
    /** Key hint next to the selected result. */
    shortcut?: string;
}

export const CommandPalette = ({query, results, shortcut = "Enter"}: CommandPaletteProps) => (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950">
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-400 dark:border-slate-700 dark:bg-slate-900">
            <LuSearch className="h-4 w-4"/>
            <span className="text-slate-900 dark:text-slate-100">{query}</span>
            <span className="h-4 w-px animate-pulse bg-indigo-500"/>
        </div>
        <ul className="mt-2 space-y-1 text-sm">
            {results.map((result, i) =>
                i === 0 ? (
                    <li key={result} className="flex items-center justify-between gap-2 rounded-lg bg-indigo-50 px-3 py-2 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300">
                        {result}
                        <kbd className="rounded border border-indigo-200 px-1.5 text-xs dark:border-indigo-400/30">{shortcut}</kbd>
                    </li>
                ) : (
                    <li key={result} className="px-3 py-2 text-slate-600 dark:text-slate-400">{result}</li>
                ),
            )}
        </ul>
    </div>
);

export interface UptimeBarsProps {
    /** Uptime percentage, shown without rounding. */
    uptime: number;
    /** Incident count per day, oldest first. 0 is green, 1 is amber, 2 or more is red. */
    incidents: number[];
    startLabel?: string;
    endLabel?: string;
}

export const UptimeBars = ({uptime, incidents, startLabel = "30 days ago", endLabel = "Today"}: UptimeBarsProps) => (
    <div>
        <p className="text-2xl font-semibold tabular-nums tracking-tight text-slate-900 dark:text-white">
            {uptime}<span className="text-base text-slate-400">%</span>
        </p>
        <div className="mt-3 flex h-10 items-end gap-[2px]">
            {incidents.map((incident, i) => (
                <span key={i}
                      title={incident === 0 ? "No incidents" : `${incident} incident${incident > 1 ? "s" : ""}`}
                      className={`h-full flex-1 rounded-[2px] transition-transform hover:scale-y-110 ${incident === 0 ? "bg-emerald-400 dark:bg-emerald-500/80" : incident === 1 ? "bg-amber-400" : "bg-rose-500"}`}/>
            ))}
        </div>
        <div className="mt-2 flex justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>{startLabel}</span>
            <span>{endLabel}</span>
        </div>
    </div>
);

export interface BentoGridProps {
    tiles: BentoTileData[];
    eyebrow?: string;
    title?: string;
    description?: string;
    className?: string;
}

/** A feature grid with tiles of different sizes. Mark a tile as `wide` to span two columns. */
export const BentoGrid = ({
    tiles,
    eyebrow = "Observability",
    title = "Everything on-call needs at 2 a.m., on one screen",
    description = "Relay connects traces, alerts and deploys, so you can find the change that broke checkout before your customers notice it.",
    className = "",
}: BentoGridProps) => (
    <section className={`w-full bg-slate-50 px-4 py-16 sm:px-8 sm:py-20 dark:bg-slate-950 ${className}`}>
        <div className="mx-auto max-w-5xl">
            <div className="max-w-2xl">
                {eyebrow && <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{eyebrow}</p>}
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">{title}</h2>
                {description && <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">{description}</p>}
            </div>

            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {tiles.map((tile) => (
                    <BentoTile key={tile.title} className={tile.wide ? "sm:col-span-2" : ""} icon={tile.icon}
                               eyebrow={tile.eyebrow} title={tile.title} body={tile.body}>
                        {tile.visual}
                    </BentoTile>
                ))}
            </div>
        </div>
    </section>
);
