import {useRef, useState} from "react";
import type {KeyboardEvent, ReactNode} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {LuCalendar, LuCheck, LuGitBranch, LuLayers, LuRocket} from "react-icons/lu";

type FeatureId = "plan" | "build" | "ship";

interface Feature {
    id: FeatureId;
    label: string;
    title: string;
    body: string;
    icon: ReactNode;
}

const features: Feature[] = [
    {
        id: "plan",
        label: "Plan",
        title: "Roadmaps that stay honest",
        body: "Drag a project and every dependent date moves with it. Slips show up in red before the review meeting.",
        icon: <LuCalendar className="h-5 w-5"/>,
    },
    {
        id: "build",
        label: "Build",
        title: "A board that mirrors your branches",
        body: "Issues move to review when a pull request opens and close when it merges. Nobody updates tickets by hand.",
        icon: <LuGitBranch className="h-5 w-5"/>,
    },
    {
        id: "ship",
        label: "Ship",
        title: "Release notes written from real work",
        body: "Lattice drafts the changelog from merged issues, so the release post takes minutes instead of an afternoon.",
        icon: <LuRocket className="h-5 w-5"/>,
    },
];

interface RoadmapRow {
    name: string;
    start: number;
    length: number;
    color: string;
    late?: boolean;
}

const roadmap: RoadmapRow[] = [
    {name: "Billing v2", start: 0, length: 5, color: "bg-violet-500"},
    {name: "SSO for teams", start: 2, length: 4, color: "bg-sky-500"},
    {name: "Mobile inbox", start: 4, length: 5, color: "bg-amber-500", late: true},
    {name: "Audit log", start: 6, length: 3, color: "bg-emerald-500"},
];

const PlanPreview = () => (
    <div className="space-y-3">
        <div className="grid grid-cols-10 text-[10px] font-medium uppercase tracking-wider text-slate-400">
            {["Jan", "", "Feb", "", "Mar", "", "Apr", "", "May", ""].map((m, i) => <span key={i}>{m}</span>)}
        </div>
        {roadmap.map((row, i) => (
            <div key={row.name} className="grid grid-cols-10 items-center">
                <motion.div
                    initial={{scaleX: 0}}
                    animate={{scaleX: 1}}
                    transition={{delay: 0.1 + i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1]}}
                    style={{gridColumn: `${row.start + 1} / span ${row.length}`, transformOrigin: "left"}}
                    className={`flex h-8 items-center justify-between rounded-lg px-2.5 text-xs font-medium text-white ${row.color}`}
                >
                    <span className="truncate">{row.name}</span>
                    {row.late && <span className="rounded bg-white/25 px-1.5 text-[10px]">+6 days</span>}
                </motion.div>
            </div>
        ))}
    </div>
);

const columns: {title: string; cards: string[]}[] = [
    {title: "In progress", cards: ["Retry failed webhooks", "Invoice PDF layout"]},
    {title: "In review", cards: ["Proration for seat changes"]},
    {title: "Done", cards: ["Tax ID validation", "Card update flow"]},
];

const BuildPreview = () => (
    <div className="grid grid-cols-3 gap-3">
        {columns.map((column, c) => (
            <div key={column.title} className="rounded-xl bg-slate-100 p-2 dark:bg-slate-800/60">
                <p className="px-1 pb-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                    {column.title} <span className="text-slate-400 dark:text-slate-500">{column.cards.length}</span>
                </p>
                <div className="space-y-2">
                    {column.cards.map((card, i) => (
                        <motion.div key={card}
                                    initial={{opacity: 0, y: 8}}
                                    animate={{opacity: 1, y: 0}}
                                    transition={{delay: 0.1 + (c * 2 + i) * 0.06}}
                                    className="rounded-lg border border-slate-200 bg-white p-2 text-xs text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
                            {card}
                            <p className="mt-1.5 flex items-center gap-1 font-mono text-[10px] text-slate-400">
                                <LuGitBranch className="h-3 w-3"/> #{412 + c * 7 + i}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        ))}
    </div>
);

const notes: string[] = [
    "Seat changes are now prorated to the day",
    "Invoices include your tax ID when one is saved",
    "Failed webhooks retry up to 8 times over 24 hours",
];

const ShipPreview = () => (
    <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900">
        <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">Release 3.18</p>
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                Draft ready
            </span>
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
        <p className="mt-4 border-t border-slate-100 pt-3 text-xs text-slate-400 dark:border-slate-800">
            Generated from 23 merged issues across 3 teams
        </p>
    </div>
);

const previews: Record<FeatureId, ReactNode> = {
    plan: <PlanPreview/>,
    build: <BuildPreview/>,
    ship: <ShipPreview/>,
};

const FeatureTabs = () => {
    const [active, setActive] = useState<FeatureId>("plan");
    const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

    // Arrow keys move between tabs, following the WAI-ARIA tabs pattern.
    const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        const index = features.findIndex((f) => f.id === active);
        let next = index;
        if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % features.length;
        else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index - 1 + features.length) % features.length;
        else return;
        event.preventDefault();
        setActive(features[next].id);
        tabRefs.current[next]?.focus();
    };

    return (
        <section className="w-full bg-white px-4 py-16 sm:px-8 sm:py-20 dark:bg-slate-950">
            <div className="mx-auto max-w-5xl">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700 dark:border-violet-500/30 dark:bg-violet-500/10 dark:text-violet-300">
                        <LuLayers className="h-3.5 w-3.5"/> One tool from idea to release
                    </p>
                    <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                        Plan, build and ship without switching tabs
                    </h2>
                </div>

                <div className="mt-12 grid items-start gap-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
                    <div role="tablist" aria-label="Product areas" aria-orientation="vertical" onKeyDown={onKeyDown}
                         className="flex flex-col gap-2">
                        {features.map((feature, i) => {
                            const selected = feature.id === active;
                            return (
                                <button
                                    key={feature.id}
                                    ref={(el) => {
                                        tabRefs.current[i] = el;
                                    }}
                                    type="button"
                                    role="tab"
                                    id={`feature-tab-${feature.id}`}
                                    aria-selected={selected}
                                    aria-controls={`feature-panel-${feature.id}`}
                                    tabIndex={selected ? 0 : -1}
                                    onClick={() => setActive(feature.id)}
                                    className="relative rounded-2xl p-4 text-left outline-none transition-colors hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-violet-500 dark:hover:bg-slate-900"
                                >
                                    {selected && (
                                        <motion.span layoutId="feature-tab-highlight"
                                                     transition={{type: "spring", bounce: 0.15, duration: 0.5}}
                                                     className="absolute inset-0 rounded-2xl border border-slate-200 bg-slate-50 shadow-sm dark:border-slate-800 dark:bg-slate-900"/>
                                    )}
                                    <span className="relative flex gap-4">
                                        <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${selected ? "bg-violet-600 text-white" : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"}`}>
                                            {feature.icon}
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
                                <span className="ml-3 text-xs text-slate-400">lattice.app / payments</span>
                            </div>
                            <div className="min-h-[260px] p-5">
                                <AnimatePresence mode="wait">
                                    <motion.div key={active}
                                                role="tabpanel"
                                                id={`feature-panel-${active}`}
                                                aria-labelledby={`feature-tab-${active}`}
                                                initial={{opacity: 0, y: 10}}
                                                animate={{opacity: 1, y: 0}}
                                                exit={{opacity: 0, y: -10}}
                                                transition={{duration: 0.25}}>
                                        {previews[active]}
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeatureTabs;
