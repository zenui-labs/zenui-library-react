import {useId, useRef, useState} from "react";
import type {ComponentType, KeyboardEvent, ReactNode} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {LuCheck, LuGitBranch, LuLayers} from "react-icons/lu";

export type FeatureTabIcon = ComponentType<{className?: string}>;

export interface FeatureTab {
    id: string;
    /** Small uppercase label above the title. */
    label: string;
    title: string;
    body: string;
    icon: FeatureTabIcon;
    /** What the preview window shows while this tab is selected. */
    preview: ReactNode;
}

export interface RoadmapRow {
    name: string;
    /** Zero-based column where the bar starts. */
    start: number;
    /** Number of columns the bar covers. */
    length: number;
    /** Tailwind background class for the bar, for example "bg-violet-500". */
    color: string;
    /** Short tag at the end of the bar, for example a delay. */
    badge?: string;
}

export interface RoadmapPreviewProps {
    /** One label per column. Use an empty string for unlabeled columns. */
    columns: string[];
    rows: RoadmapRow[];
}

export const RoadmapPreview = ({columns, rows}: RoadmapPreviewProps) => {
    const gridTemplateColumns = `repeat(${columns.length}, minmax(0, 1fr))`;
    return (
        <div className="space-y-3">
            <div className="grid text-[10px] font-medium uppercase tracking-wider text-slate-400" style={{gridTemplateColumns}}>
                {columns.map((m, i) => <span key={i}>{m}</span>)}
            </div>
            {rows.map((row, i) => (
                <div key={row.name} className="grid items-center" style={{gridTemplateColumns}}>
                    <motion.div
                        initial={{scaleX: 0}}
                        animate={{scaleX: 1}}
                        transition={{delay: 0.1 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
                        style={{gridColumn: `${row.start + 1} / span ${row.length}`, transformOrigin: "left"}}
                        className={`flex h-8 items-center justify-between rounded-lg px-2.5 text-xs font-medium text-white ${row.color}`}
                    >
                        <span className="truncate">{row.name}</span>
                        {row.badge && <span className="rounded bg-white/25 px-1.5 text-[10px]">{row.badge}</span>}
                    </motion.div>
                </div>
            ))}
        </div>
    );
};

export interface BoardCard {
    title: string;
    /** Issue or pull request number shown under the title. */
    number: number;
}

export interface BoardColumn {
    title: string;
    cards: BoardCard[];
}

export interface BoardPreviewProps {
    columns: BoardColumn[];
}

export const BoardPreview = ({columns}: BoardPreviewProps) => (
    <div className="grid grid-cols-3 gap-3">
        {columns.map((column, c) => (
            <div key={column.title} className="rounded-xl bg-slate-100 p-2 dark:bg-slate-800/60">
                <p className="px-1 pb-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                    {column.title} <span className="text-slate-400 dark:text-slate-500">{column.cards.length}</span>
                </p>
                <div className="space-y-2">
                    {column.cards.map((card, i) => (
                        <motion.div key={card.title}
                                    initial={{opacity: 0, y: 8}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.1 + (c * 2 + i) * 0.06}}
                                    className="rounded-lg border border-slate-200 bg-white p-2 text-xs text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
                            {card.title}
                            <p className="mt-1.5 flex items-center gap-1 font-mono text-[10px] text-slate-400">
                                <LuGitBranch className="h-3 w-3"/> #{card.number}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        ))}
    </div>
);

export interface ReleasePreviewProps {
    title: string;
    notes: string[];
    /** Badge next to the title. */
    status?: string;
    /** Small print under the list. */
    footer?: string;
}

export const ReleasePreview = ({title, notes, status = "Draft ready", footer}: ReleasePreviewProps) => (
    <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">{title}</p>
            {status && (
                <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                    {status}
                </span>
            )}
        </div>
        <ul className="mt-3 space-y-2.5">
            {notes.map((note, i) => (
                <motion.li key={note}
                           initial={{opacity: 0, x: -8}}
                           animate={{opacity: 1, x: 0}}
                           transition={{delay: 0.15 + i * 0.1}}
                           className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-600 dark:bg-violet-500/20 dark:text-violet-300">
                        <LuCheck className="h-3 w-3"/>
                    </span>
                    {note}
                </motion.li>
            ))}
        </ul>
        {footer && (
            <p className="mt-4 border-t border-slate-100 pt-3 text-xs text-slate-400 dark:border-slate-800">{footer}</p>
        )}
    </div>
);

export interface FeatureTabsProps {
    features: FeatureTab[];
    /** Id of the selected tab when you control it. */
    value?: string;
    /** Id of the tab selected on first render. Defaults to the first feature. */
    defaultValue?: string;
    onChange?: (id: string) => void;
    badge?: string;
    badgeIcon?: FeatureTabIcon;
    title?: string;
    /** Text in the preview window's address bar. */
    windowLabel?: string;
    /** Accessible name for the tab list. */
    tabListLabel?: string;
    className?: string;
}

/** Vertical tabs next to a preview window. Arrow keys move between tabs. */
export const FeatureTabs = ({
    features,
    value,
    defaultValue,
    onChange,
    badge = "One tool from idea to release",
    badgeIcon: BadgeIcon = LuLayers,
    title = "Plan, build and ship without switching tabs",
    windowLabel = "lattice.app / payments",
    tabListLabel = "Product areas",
    className = "",
}: FeatureTabsProps) => {
    const uid = useId();
    const [internal, setInternal] = useState<string | undefined>(defaultValue ?? features[0]?.id);
    const active = value ?? internal;
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const activeFeature = features.find((f) => f.id === active);

    const select = (id: string) => {
        if (value === undefined) setInternal(id);
        onChange?.(id);
    };

    // Arrow keys move between tabs, following the WAI-ARIA tabs pattern.
    const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        const index = features.findIndex((f) => f.id === active);
        let next = index;
        if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % features.length;
        else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index - 1 + features.length) % features.length;
        else return;
        event.preventDefault();
        select(features[next].id);
        tabRefs.current[next]?.focus();
    };

    return (
        <section className={`w-full bg-white px-4 py-16 sm:px-8 sm:py-20 dark:bg-slate-950 ${className}`}>
            <div className="mx-auto max-w-5xl">
                <div className="mx-auto max-w-2xl text-center">
                    {badge && (
                        <p className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700 dark:border-violet-500/30 dark:bg-violet-500/10 dark:text-violet-300">
                            <BadgeIcon className="h-3.5 w-3.5"/> {badge}
                        </p>
                    )}
                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">{title}</h2>
                </div>

                <div className="mt-12 grid items-start gap-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
                    <div role="tablist" aria-label={tabListLabel} aria-orientation="vertical" onKeyDown={onKeyDown}
                         className="flex flex-col gap-2">
                        {features.map((feature, i) => {
                            const selected = feature.id === active;
                            const Icon = feature.icon;
                            return (
                                <button
                                    key={feature.id}
                                    ref={(el) => {
                                        tabRefs.current[i] = el;
                                    }}
                                    type="button"
                                    role="tab"
                                    id={`${uid}-tab-${feature.id}`}
                                    aria-selected={selected}
                                    aria-controls={`${uid}-panel-${feature.id}`}
                                    tabIndex={selected ? 0 : -1}
                                    onClick={() => select(feature.id)}
                                    className="relative rounded-2xl p-4 text-left outline-none transition-colors hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-violet-500 dark:hover:bg-slate-900"
                                >
                                    {selected && (
                                        <motion.span layoutId={`${uid}-highlight`}
                                                     transition={{type: "spring", bounce: 0.15, duration: 0.5}}
                                                     className="absolute inset-0 rounded-2xl border border-slate-200 bg-slate-50 shadow-sm dark:border-slate-800 dark:bg-slate-900"/>
                                    )}
                                    <span className="relative flex gap-4">
                                        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${selected ? "bg-violet-600 text-white" : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"}`}>
                                            <Icon className="h-5 w-5"/>
                                        </span>
                                        <span className="min-w-0">
                                            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">{feature.label}</span>
                                            <span className="mt-0.5 block font-semibold text-slate-900 dark:text-white">{feature.title}</span>
                                            <span className={`mt-1 block text-sm leading-relaxed text-slate-600 dark:text-slate-400 ${selected ? "" : "hidden md:block md:truncate"}`}>
                                                {feature.body}
                                            </span>
                                        </span>
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-violet-50 via-white to-sky-50 p-3 dark:border-slate-800 dark:from-violet-500/10 dark:via-slate-950 dark:to-sky-500/10">
                        <div className="rounded-2xl border border-slate-200 bg-white/80 shadow-xl shadow-violet-500/5 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
                            <div className="flex items-center gap-1.5 border-b border-slate-100 px-4 py-3 dark:border-slate-800">
                                <span className="h-2.5 w-2.5 rounded-full bg-slate-200 dark:bg-slate-700"/>
                                <span className="h-2.5 w-2.5 rounded-full bg-slate-200 dark:bg-slate-700"/>
                                <span className="h-2.5 w-2.5 rounded-full bg-slate-200 dark:bg-slate-700"/>
                                <span className="ml-3 text-xs text-slate-400">{windowLabel}</span>
                            </div>
                            <div className="min-h-[260px] p-5">
                                <AnimatePresence mode="wait">
                                    {activeFeature && (
                                        <motion.div key={activeFeature.id}
                                                    role="tabpanel"
                                                    id={`${uid}-panel-${activeFeature.id}`}
                                                    aria-labelledby={`${uid}-tab-${activeFeature.id}`}
                                                    initial={{opacity: 0, y: 10}}
                                                    animate={{opacity: 1, y: 0}}
                                                    exit={{opacity: 0, y: -10}}
                                                    transition={{duration: 0.25}}>
                                            {activeFeature.preview}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
