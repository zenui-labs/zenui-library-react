import {useEffect, useRef, useState} from "react";
import type {KeyboardEvent, PointerEvent as ReactPointerEvent} from "react";
import {animate, motion, useInView, useMotionValue, useMotionValueEvent, useReducedMotion, useTransform} from "framer-motion";
import {LuMoon, LuSun} from "react-icons/lu";

import {cn} from "@utils/Style.ts";

// A small dashboard written once with Tailwind's dark: classes. The section renders it twice, inside a .dark scope
// and inside a .light scope, and a divider reveals one over the other.

const kpis = [
    {label: "Revenue", value: "$84.1k", change: "+12.4%", good: true},
    {label: "Active users", value: "3,482", change: "+4.1%", good: true},
    {label: "Churn", value: "1.8%", change: "-0.6%", good: true},
];

const invoices = [
    {name: "Northwind", initials: "NW", amount: "$4,200", status: "Paid"},
    {name: "Contoso", initials: "CO", amount: "$1,860", status: "Pending"},
    {name: "Fabrikam", initials: "FA", amount: "$920", status: "Overdue"},
];

const statusClass: Record<string, string> = {
    Paid: "bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300",
    Pending: "bg-amber-50 text-amber-700 dark:bg-amber-400/10 dark:text-amber-300",
    Overdue: "bg-rose-50 text-rose-700 dark:bg-rose-400/10 dark:text-rose-300",
};

const series = [32, 38, 35, 44, 41, 52, 49, 58, 63, 60, 71, 78];
const W = 320;
const H = 96;
const points = series.map((value, index) => [(index / (series.length - 1)) * W, H - 6 - ((value - 28) / 54) * (H - 16)] as const);
const line = points.map(([x, y], index) => `${index ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
const area = `${line} L${W} ${H} L0 ${H} Z`;

const Scene = ({gradientId}: {gradientId: string}) => (
    <div className="flex h-full flex-col gap-3 bg-zinc-50 p-3 text-zinc-900 640px:gap-4 640px:p-5 dark:bg-zinc-950 dark:text-zinc-50">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-[0.65rem] font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Acme Inc</p>
                <p className="text-[0.95rem] font-semibold tracking-tight 640px:text-base">Overview</p>
            </div>
            <div className="flex rounded-lg bg-zinc-200/70 p-0.5 text-[0.68rem] font-medium dark:bg-white/[0.06]">
                {["Week", "Month", "Year"].map((label) => (
                    <span key={label}
                          className={cn("rounded-md px-2 py-1", label === "Month" ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-white" : "text-zinc-500 dark:text-zinc-400")}>
                        {label}
                    </span>
                ))}
            </div>
        </div>

        <div className="grid grid-cols-3 gap-2 640px:gap-3">
            {kpis.map((kpi) => (
                <div key={kpi.label} className="rounded-xl border border-zinc-200 bg-white p-2.5 640px:p-3 dark:border-white/10 dark:bg-zinc-900">
                    <p className="truncate text-[0.62rem] text-zinc-500 640px:text-[0.7rem] dark:text-zinc-400">{kpi.label}</p>
                    <p className="mt-1 text-[0.9rem] font-semibold tabular-nums tracking-tight 640px:text-lg">{kpi.value}</p>
                    <span className="mt-1 inline-block rounded-full bg-emerald-50 px-1.5 py-0.5 text-[0.6rem] font-medium text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
                        {kpi.change}
                    </span>
                </div>
            ))}
        </div>

        <div className="grid flex-1 gap-3 640px:grid-cols-[1.35fr_1fr]">
            <div className="flex flex-col rounded-xl border border-zinc-200 bg-white p-3 dark:border-white/10 dark:bg-zinc-900">
                <div className="flex items-baseline justify-between">
                    <p className="text-[0.72rem] font-medium">Monthly recurring revenue</p>
                    <p className="text-[0.62rem] text-zinc-500 dark:text-zinc-400">12 months</p>
                </div>
                <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="mt-2 h-full min-h-[64px] w-full text-indigo-500 dark:text-indigo-400" aria-hidden="true">
                    <defs>
                        <linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="currentColor" stopOpacity="0.28"/>
                            <stop offset="100%" stopColor="currentColor" stopOpacity="0"/>
                        </linearGradient>
                    </defs>
                    <path d={area} fill={`url(#${gradientId})`}/>
                    <path d={line} fill="none" stroke="currentColor" strokeWidth={2} vectorEffect="non-scaling-stroke" strokeLinejoin="round"/>
                </svg>
            </div>

            <div className="hidden flex-col gap-2 rounded-xl border border-zinc-200 bg-white p-3 640px:flex dark:border-white/10 dark:bg-zinc-900">
                <p className="text-[0.72rem] font-medium">Recent invoices</p>
                {invoices.map((invoice) => (
                    <div key={invoice.name} className="flex items-center gap-2">
                        <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-[0.55rem] font-semibold text-zinc-600 dark:bg-white/10 dark:text-zinc-300">
                            {invoice.initials}
                        </span>
                        <span className="min-w-0 flex-1 truncate text-[0.7rem]">{invoice.name}</span>
                        <span className="text-[0.68rem] tabular-nums text-zinc-500 dark:text-zinc-400">{invoice.amount}</span>
                        <span className={cn("rounded-full px-1.5 py-0.5 text-[0.58rem] font-medium", statusClass[invoice.status])}>{invoice.status}</span>
                    </div>
                ))}
                <div className="mt-auto flex items-center justify-between border-t border-zinc-100 pt-2 dark:border-white/5">
                    <span className="text-[0.68rem] text-zinc-600 dark:text-zinc-300">Email alerts</span>
                    <span className="flex h-4 w-7 items-center rounded-full bg-indigo-500 p-0.5">
                        <span className="ml-auto size-3 rounded-full bg-white"/>
                    </span>
                </div>
            </div>
        </div>
    </div>
);

/**
 * Before and after divider over the same dashboard in both themes. Drag anywhere on the frame or use the arrow keys
 * on the handle. It sweeps once when it first scrolls into view to show that it moves.
 */
const ComparisonCard = () => {
    const frameRef = useRef<HTMLDivElement>(null);
    const dragging = useRef(false);
    const touched = useRef(false);
    const reduceMotion = useReducedMotion();
    const inView = useInView(frameRef, {once: true, amount: 0.6});
    const position = useMotionValue(50);
    const [value, setValue] = useState(50);

    useMotionValueEvent(position, "change", (latest) => setValue(Math.round(latest)));
    const darkClip = useTransform(position, (p) => `inset(0 ${100 - p}% 0 0)`);
    const handleLeft = useTransform(position, (p) => `${p}%`);
    const darkLabel = useTransform(position, [8, 22], [0, 1]);
    const lightLabel = useTransform(position, [78, 92], [1, 0]);

    useEffect(() => {
        if (!inView || reduceMotion || touched.current) return;
        const controls = animate(position, [50, 26, 74, 50], {duration: 2.6, ease: "easeInOut", delay: 0.3});
        return () => controls.stop();
    }, [inView, reduceMotion, position]);

    const moveTo = (clientX: number) => {
        const rect = frameRef.current?.getBoundingClientRect();
        if (!rect) return;
        position.set(Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100)));
    };

    const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
        touched.current = true;
        position.stop();
        dragging.current = true;
        event.currentTarget.setPointerCapture(event.pointerId);
        moveTo(event.clientX);
    };

    const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        const step = event.shiftKey ? 10 : 4;
        const current = position.get();
        const next = {ArrowLeft: current - step, ArrowRight: current + step, Home: 0, End: 100}[event.key];
        if (next === undefined) return;
        event.preventDefault();
        touched.current = true;
        position.stop();
        position.set(Math.min(100, Math.max(0, next)));
    };

    return (
        <div
            ref={frameRef}
            onPointerDown={onPointerDown}
            onPointerMove={(event) => dragging.current && moveTo(event.clientX)}
            onPointerUp={() => (dragging.current = false)}
            onPointerCancel={() => (dragging.current = false)}
            className="relative aspect-[10/9] w-full cursor-ew-resize touch-pan-y select-none overflow-hidden 640px:aspect-[16/11]"
        >
            <div className="light absolute inset-0" aria-hidden="true">
                <Scene gradientId="compare-light"/>
            </div>
            <motion.div className="dark absolute inset-0" style={{clipPath: darkClip}} aria-hidden="true">
                <Scene gradientId="compare-dark"/>
            </motion.div>

            <motion.span style={{opacity: darkLabel}}
                         className="pointer-events-none absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-black/70 px-2.5 py-1 text-[0.7rem] font-medium text-white backdrop-blur">
                <LuMoon className="size-3"/> Dark
            </motion.span>
            <motion.span style={{opacity: lightLabel}}
                         className="pointer-events-none absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-white/85 px-2.5 py-1 text-[0.7rem] font-medium text-zinc-900 shadow-sm backdrop-blur">
                <LuSun className="size-3"/> Light
            </motion.span>

            <motion.div className="pointer-events-none absolute inset-y-0 w-0" style={{left: handleLeft}}>
                <div className="absolute inset-y-0 -left-px w-0.5 bg-gradient-to-b from-transparent via-accent to-transparent shadow-[0_0_16px_rgb(var(--accent)/0.7)]"/>
                <div
                    role="slider"
                    tabIndex={0}
                    aria-label="Compare dark and light themes"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={value}
                    aria-valuetext={`${value}% dark, ${100 - value}% light`}
                    onKeyDown={onKeyDown}
                    className="pointer-events-auto absolute left-0 top-1/2 flex h-9 w-[58px] -translate-x-1/2 -translate-y-1/2 items-center justify-between rounded-full border border-white/20 bg-zinc-950/85 px-2 text-white shadow-[0_8px_24px_-6px_rgb(0_0_0/0.6)] outline-none backdrop-blur focus-visible:ring-2 focus-visible:ring-accent"
                >
                    <LuMoon className="size-3.5"/>
                    <span className="h-3.5 w-px bg-white/25"/>
                    <LuSun className="size-3.5"/>
                </div>
            </motion.div>
        </div>
    );
};

export default ComparisonCard;
