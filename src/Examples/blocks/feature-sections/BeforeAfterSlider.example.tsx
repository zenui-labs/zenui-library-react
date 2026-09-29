import {useRef, useState} from "react";
import type {KeyboardEvent, PointerEvent} from "react";
import {motion} from "framer-motion";
import {LuCheck, LuClock, LuFileSpreadsheet, LuGripVertical, LuSparkles, LuTrendingUp, LuX} from "react-icons/lu";

interface SheetRow {
    ref: string;
    payer: string;
    amount: string;
    status: string;
    problem?: boolean;
}

const sheetRows: SheetRow[] = [
    {ref: "INV-2291", payer: "Northwind Ltd", amount: "4,200.00", status: "??"},
    {ref: "INV-2292", payer: "northwind", amount: "4,200", status: "dup?", problem: true},
    {ref: "", payer: "Contoso GmbH", amount: "12,940.50", status: "check w/ Sam", problem: true},
    {ref: "INV-2295", payer: "Fabrikam", amount: "860.00", status: "paid"},
    {ref: "INV-2297", payer: "Tailspin Toys", amount: "3,115.20", status: "short 15.20", problem: true},
    {ref: "INV-2298", payer: "Litware", amount: "7,000.00", status: ""},
];

interface MatchRow {
    payer: string;
    invoice: string;
    amount: string;
    note: string;
    warn?: boolean;
}

const matchRows: MatchRow[] = [
    {payer: "Northwind Ltd", invoice: "INV-2291", amount: "$4,200.00", note: "Exact match"},
    {payer: "Contoso GmbH", invoice: "INV-2293", amount: "$12,940.50", note: "Matched by amount"},
    {payer: "Fabrikam", invoice: "INV-2295", amount: "$860.00", note: "Exact match"},
    {payer: "Tailspin Toys", invoice: "INV-2297", amount: "$3,115.20", note: "Bank fee of $15.20", warn: true},
    {payer: "Litware", invoice: "INV-2298", amount: "$7,000.00", note: "Exact match"},
];

const BeforePanel = () => (
    <div className="absolute inset-0 bg-[#f8f8f4] p-4 sm:p-6 dark:bg-[#1b1d1a]">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
            <LuFileSpreadsheet className="h-4 w-4 text-green-700 dark:text-green-500"/>
            <span className="truncate font-medium">Reconciliation_OCT_final_v3 (2).xlsx</span>
        </div>
        <div className="mt-4 overflow-hidden border border-slate-300 font-mono text-[11px] sm:text-xs dark:border-slate-700">
            <div className="grid grid-cols-[4.5rem_1fr_5rem_5.5rem] bg-slate-200 text-slate-600 sm:grid-cols-[6rem_1fr_6rem_7rem] dark:bg-slate-800 dark:text-slate-400">
                {["Ref", "Payer", "Amount", "Status"].map((h) => <span key={h} className="border-r border-slate-300 px-2 py-1.5 last:border-r-0 dark:border-slate-700">{h}</span>)}
            </div>
            {sheetRows.map((row, i) => (
                <div key={i}
                     className={`grid grid-cols-[4.5rem_1fr_5rem_5.5rem] border-t border-slate-300 text-slate-700 sm:grid-cols-[6rem_1fr_6rem_7rem] dark:border-slate-700 dark:text-slate-300 ${row.problem ? "bg-rose-100/70 dark:bg-rose-500/10" : "bg-white dark:bg-slate-900"}`}>
                    <span className="truncate border-r border-slate-300 px-2 py-1.5 dark:border-slate-700">{row.ref || "#N/A"}</span>
                    <span className="truncate border-r border-slate-300 px-2 py-1.5 dark:border-slate-700">{row.payer}</span>
                    <span className="truncate border-r border-slate-300 px-2 py-1.5 text-right dark:border-slate-700">{row.amount}</span>
                    <span className="truncate px-2 py-1.5 text-rose-600 dark:text-rose-400">{row.status}</span>
                </div>
            ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2 text-[11px] sm:text-xs">
            <span className="inline-flex items-center gap-1 rounded-full bg-rose-100 px-2.5 py-1 font-medium text-rose-700 dark:bg-rose-500/15 dark:text-rose-300">
                <LuX className="h-3 w-3"/> 3 rows need a human
            </span>
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-200 px-2.5 py-1 font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                <LuClock className="h-3 w-3"/> Last edited 11:48 PM
            </span>
        </div>
    </div>
);

const AfterPanel = () => (
    <div className="absolute inset-0 bg-white p-4 sm:p-6 dark:bg-slate-900">
        <div className="flex items-center justify-between gap-3">
            <p className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                <LuSparkles className="h-4 w-4 text-violet-500"/> October deposits
            </p>
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[11px] font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                5 of 5 matched
            </span>
        </div>
        <ul className="mt-4 space-y-2">
            {matchRows.map((row) => (
                <li key={row.invoice}
                    className="flex items-center gap-3 rounded-xl border border-slate-200 px-3 py-2 dark:border-slate-800">
                    <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${row.warn
                        ? "bg-amber-100 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400"
                        : "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400"}`}>
                        <LuCheck className="h-3.5 w-3.5"/>
                    </span>
                    <span className="min-w-0 flex-1">
                        <span className="block truncate text-xs font-medium text-slate-900 sm:text-sm dark:text-white">{row.payer}</span>
                        <span className="block truncate text-[11px] text-slate-500 dark:text-slate-400">{row.invoice} · {row.note}</span>
                    </span>
                    <span className="shrink-0 text-xs font-medium tabular-nums text-slate-700 sm:text-sm dark:text-slate-200">{row.amount}</span>
                </li>
            ))}
        </ul>
    </div>
);

const BeforeAfterSlider = () => {
    const [position, setPosition] = useState(50);
    const [dragging, setDragging] = useState(false);
    const frameRef = useRef<HTMLDivElement>(null);

    const moveTo = (clientX: number) => {
        const rect = frameRef.current?.getBoundingClientRect();
        if (!rect) return;
        const next = ((clientX - rect.left) / rect.width) * 100;
        setPosition(Math.min(100, Math.max(0, next)));
    };

    const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
        event.currentTarget.setPointerCapture(event.pointerId);
        setDragging(true);
        moveTo(event.clientX);
    };

    const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
        if (dragging) moveTo(event.clientX);
    };

    const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        const step = event.shiftKey ? 10 : 2;
        let next: number | null = null;
        if (event.key === "ArrowLeft" || event.key === "ArrowDown") next = position - step;
        else if (event.key === "ArrowRight" || event.key === "ArrowUp") next = position + step;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = 100;
        if (next === null) return;
        event.preventDefault();
        setPosition(Math.min(100, Math.max(0, next)));
    };

    return (
        <section className="w-full bg-white px-4 py-16 sm:px-8 sm:py-24 dark:bg-slate-950">
            <div className="mx-auto max-w-5xl">
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-sm font-medium text-violet-600 dark:text-violet-400">Automatic reconciliation</p>
                    <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                        From a spreadsheet at midnight to a list that is already done
                    </h2>
                    <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-400">
                        Drag the handle to compare month end before and after Tallyhouse. Payments are matched to invoices as they arrive.
                    </p>
                </div>

                <div
                    ref={frameRef}
                    onPointerDown={onPointerDown}
                    onPointerMove={onPointerMove}
                    onPointerUp={() => setDragging(false)}
                    onPointerCancel={() => setDragging(false)}
                    className={`relative mt-12 h-[380px] touch-pan-y select-none overflow-hidden rounded-3xl border border-slate-200 shadow-2xl shadow-slate-900/10 sm:h-[420px] dark:border-slate-800 ${dragging ? "cursor-grabbing" : "cursor-ew-resize"}`}
                >
                    <BeforePanel/>
                    <div className="absolute inset-0" style={{clipPath: `inset(0 0 0 ${position}%)`}}>
                        <AfterPanel/>
                    </div>

                    <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-slate-900/80 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur"
                          style={{opacity: position > 12 ? 1 : 0}}>
                        Before
                    </span>
                    <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-violet-600 px-2.5 py-1 text-[11px] font-medium text-white"
                          style={{opacity: position < 88 ? 1 : 0}}>
                        After
                    </span>

                    <div className="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgb(15_23_42_/_0.15)]"
                         style={{left: `${position}%`}}>
                        <div
                            role="slider"
                            tabIndex={0}
                            aria-label="Compare before and after"
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-valuenow={Math.round(position)}
                            aria-valuetext={`${Math.round(position)}% before, ${100 - Math.round(position)}% after`}
                            onKeyDown={onKeyDown}
                            className="pointer-events-auto absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 shadow-lg outline-none focus-visible:ring-4 focus-visible:ring-violet-500/40"
                        >
                            <motion.span animate={{scale: dragging ? 0.9 : 1}}>
                                <LuGripVertical className="h-5 w-5"/>
                            </motion.span>
                        </div>
                    </div>
                </div>

                <dl className="mt-10 grid gap-4 sm:grid-cols-3">
                    {[
                        {label: "Days to close the month", before: "9", after: "2"},
                        {label: "Payments matched automatically", before: "0%", after: "96%"},
                        {label: "Hours a week on follow ups", before: "14", after: "3"},
                    ].map((stat) => (
                        <div key={stat.label} className="rounded-2xl border border-slate-200 p-5 dark:border-slate-800">
                            <dt className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</dt>
                            <dd className="mt-2 flex items-baseline gap-3">
                                <span className="text-lg text-slate-400 line-through decoration-rose-400/70">{stat.before}</span>
                                <span className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">{stat.after}</span>
                                <LuTrendingUp className="h-4 w-4 text-violet-500" aria-hidden="true"/>
                            </dd>
                        </div>
                    ))}
                </dl>
            </div>
        </section>
    );
};

export default BeforeAfterSlider;
