import {useId, useState} from "react";
import {motion, useReducedMotion} from "framer-motion";
import {LuInfo} from "react-icons/lu";

interface Kpi {
    label: string;
    value: string;
    change: number;
    // Set when a drop is good news.
    lowerIsBetter?: boolean;
    definition: string;
    bars: number[];
}

const kpis: Kpi[] = [
    {label: "Revenue", value: "$48.2k", change: 8.1, definition: "Gross sales minus refunds.", bars: [5, 6, 5, 7, 6, 8, 9]},
    {label: "Orders", value: "1,284", change: 5.4, definition: "Orders placed, including unpaid ones.", bars: [6, 7, 6, 7, 7, 8, 8]},
    {label: "Avg. order", value: "$37.54", change: 2.6, definition: "Revenue divided by paid orders.", bars: [6, 6, 7, 6, 7, 7, 7]},
    {label: "Conversion", value: "3.12%", change: -0.4, definition: "Sessions that ended in an order.", bars: [7, 7, 6, 7, 6, 6, 6]},
    {label: "Refund rate", value: "1.9%", change: -0.7, lowerIsBetter: true, definition: "Orders refunded in full or in part.", bars: [7, 6, 6, 5, 5, 4, 4]},
    {label: "New customers", value: "412", change: 11.9, definition: "First order from this email address.", bars: [4, 5, 5, 6, 7, 7, 9]},
    {label: "Returning", value: "38%", change: 1.2, definition: "Orders from customers with a previous order.", bars: [6, 6, 6, 7, 6, 7, 7]},
    {label: "Fulfillment", value: "1.6 days", change: 9.3, lowerIsBetter: true, definition: "Median time from order to shipment.", bars: [4, 5, 5, 6, 6, 7, 7]},
];

const Definition = ({label, text}: {label: string; text: string}) => {
    const [open, setOpen] = useState(false);
    const id = useId();
    return (
        <span className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
            <button
                type="button"
                aria-label={`About ${label}`}
                aria-describedby={open ? id : undefined}
                onFocus={() => setOpen(true)}
                onBlur={() => setOpen(false)}
                onKeyDown={(event) => event.key === "Escape" && setOpen(false)}
                className="flex size-4 items-center justify-center rounded text-zinc-300 transition hover:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 dark:text-zinc-600 dark:hover:text-zinc-300"
            >
                <LuInfo className="size-3.5" aria-hidden/>
            </button>
            {open && (
                <span id={id} role="tooltip" className="absolute bottom-full left-1/2 z-20 mb-2 w-44 -translate-x-1/2 rounded-lg bg-zinc-900 px-2.5 py-2 text-[11px] leading-4 text-white shadow-lg dark:bg-white dark:text-zinc-900">
                    {text}
                </span>
            )}
        </span>
    );
};

const CompactKpis = () => {
    const reduceMotion = useReducedMotion();
    const titleId = useId();

    return (
        <section aria-labelledby={titleId} className="w-full max-w-3xl overflow-visible rounded-2xl border border-zinc-200 bg-white dark:border-white/10 dark:bg-zinc-900">
            <header className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-100 px-5 py-3 dark:border-white/[0.06]">
                <h3 id={titleId} className="text-sm font-semibold text-zinc-900 dark:text-white">
                    Store overview
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Last 7 days vs previous 7</p>
            </header>
            <dl className="grid grid-cols-2 sm:grid-cols-4">
                {kpis.map((kpi, index) => {
                    const up = kpi.change >= 0;
                    const good = kpi.lowerIsBetter ? !up : up;
                    const peak = Math.max(...kpi.bars);
                    return (
                        <div
                            key={kpi.label}
                            // Two columns on phones, four from sm up. Borders are drawn per cell so the grid lines stay one pixel.
                            className={`group flex flex-col gap-1 border-zinc-100 p-4 transition-colors hover:bg-zinc-50/70 dark:border-white/[0.06] dark:hover:bg-white/[0.02] ${
                                index % 2 === 0 ? "border-r" : ""
                            } ${index < kpis.length - 2 ? "border-b" : ""} ${index % 4 === 3 ? "sm:border-r-0" : "sm:border-r"} ${index < 4 ? "sm:border-b" : "sm:border-b-0"}`}
                        >
                            <dt className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                                <span className="truncate">{kpi.label}</span>
                                <Definition label={kpi.label} text={kpi.definition}/>
                            </dt>
                            <dd className="flex items-end justify-between gap-2">
                                <span className="text-lg font-semibold tabular-nums tracking-tight text-zinc-900 dark:text-white">{kpi.value}</span>
                                <span className="flex h-5 items-end gap-[2px]" aria-hidden>
                                    {kpi.bars.map((bar, barIndex) => (
                                        <motion.span
                                            key={barIndex}
                                            className={`w-[3px] origin-bottom rounded-full ${
                                                barIndex === kpi.bars.length - 1
                                                    ? good ? "bg-emerald-500" : "bg-rose-500"
                                                    : "bg-zinc-200 group-hover:bg-zinc-300 dark:bg-white/10 dark:group-hover:bg-white/20"
                                            }`}
                                            style={{height: `${(bar / peak) * 100}%`}}
                                            initial={reduceMotion ? false : {scaleY: 0}}
                                            whileInView={{scaleY: 1}}
                                            viewport={{once: true}}
                                            transition={{duration: 0.4, delay: index * 0.03 + barIndex * 0.025}}
                                        />
                                    ))}
                                </span>
                            </dd>
                            <dd className={`text-xs font-medium tabular-nums ${good ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                                <span className="sr-only">{up ? "Up" : "Down"} </span>
                                <span aria-hidden>{up ? "▲" : "▼"} </span>
                                {Math.abs(kpi.change)}%
                            </dd>
                        </div>
                    );
                })}
            </dl>
        </section>
    );
};

export default CompactKpis;
