import type {ComponentType, ReactNode} from "react";
import {motion, useReducedMotion} from "framer-motion";
import {LuArrowRight, LuCheck, LuReceipt} from "react-icons/lu";

export type FeatureRowIcon = ComponentType<{className?: string}>;

export interface FeatureRow {
    id: string;
    /** Label in the pill above the title. */
    eyebrow: string;
    icon: FeatureRowIcon;
    title: string;
    body: string;
    /** Checklist items under the body. */
    points: string[];
    linkLabel: string;
    href?: string;
    /** The mockup next to the text, for example one of the visuals exported from this file. */
    visual: ReactNode;
}

export interface ReceiptLine {
    item: string;
    price: string;
}

export interface ReceiptScanProps {
    merchant: string;
    /** Date and time printed under the merchant. */
    timestamp: string;
    lines: ReceiptLine[];
    total: string;
    /** First line of the card that pops out after the scan, for example the expense category. */
    matchCategory: string;
    /** Second line of that card, for example the card used. */
    matchDetail: string;
    matchLabel?: string;
}

export const ReceiptScan = ({merchant, timestamp, lines, total, matchCategory, matchDetail, matchLabel = "Matched"}: ReceiptScanProps) => {
    const reduceMotion = useReducedMotion();
    return (
        <div className="relative mx-auto w-full max-w-[260px] rounded-[2rem] border border-slate-200 bg-slate-900 p-2.5 shadow-2xl shadow-emerald-900/10 dark:border-slate-700">
            <div className="relative overflow-hidden rounded-[1.5rem] bg-white p-4 dark:bg-slate-100">
                <p className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">{merchant}</p>
                <p className="text-center text-[10px] text-slate-400">{timestamp}</p>
                <dl className="mt-4 space-y-1.5 font-mono text-[11px] text-slate-600">
                    {lines.map((line) => (
                        <div key={line.item} className="flex justify-between">
                            <dt>{line.item}</dt>
                            <dd>{line.price}</dd>
                        </div>
                    ))}
                </dl>
                <div className="mt-3 flex justify-between border-t border-dashed border-slate-300 pt-2 font-mono text-xs font-semibold text-slate-900">
                    <span>Total</span>
                    <span>{total}</span>
                </div>
                <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-transparent via-emerald-400/30 to-emerald-400/0"
                    initial={{y: -64}}
                    whileInView={reduceMotion ? undefined : {y: 280}}
                    viewport={{once: true}}
                    transition={{duration: 1.6, ease: "easeInOut", delay: 0.3}}
                />
            </div>
            <motion.div
                initial={{opacity: 0, y: 12, scale: 0.95}}
                whileInView={{opacity: 1, y: 0, scale: 1}}
                viewport={{once: true}}
                transition={{delay: reduceMotion ? 0 : 1.7, type: "spring", bounce: 0.3}}
                className="absolute -right-4 bottom-10 w-44 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl sm:-right-10 dark:border-slate-700 dark:bg-slate-800"
            >
                <p className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <LuCheck className="h-3.5 w-3.5"/> {matchLabel}
                </p>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">{matchCategory}</p>
                <p className="text-xs text-slate-400">{matchDetail}</p>
            </motion.div>
        </div>
    );
};

export interface ApprovalRule {
    /** The condition, shown as a colored tag. */
    label: string;
    /** What happens when the condition matches. */
    detail: string;
    tone: "amber" | "sky" | "emerald";
}

const toneClass: Record<ApprovalRule["tone"], string> = {
    amber: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
    sky: "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300",
    emerald: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
};

export interface ApprovalFlowProps {
    title: string;
    /** The event that starts the flow, shown in the dashed box. */
    trigger: string;
    rules: ApprovalRule[];
}

export const ApprovalFlow = ({title, trigger, rules}: ApprovalFlowProps) => (
    <div className="w-full rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">{title}</p>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                {rules.length} {rules.length === 1 ? "rule" : "rules"}
            </span>
        </div>
        <div className="mt-4 rounded-2xl border border-dashed border-slate-300 p-3 text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">
            {trigger}
        </div>
        <ul className="relative mt-3 space-y-3 pl-6 before:absolute before:bottom-4 before:left-2 before:top-0 before:w-px before:bg-slate-200 dark:before:bg-slate-700">
            {rules.map((rule, i) => (
                <motion.li
                    key={rule.label}
                    initial={{opacity: 0, x: 16}}
                    whileInView={{opacity: 1, x: 0}}
                    viewport={{once: true}}
                    transition={{delay: 0.15 + i * 0.12, duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
                    className="relative flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-800 dark:bg-slate-800/50"
                >
                    <span aria-hidden="true" className="absolute -left-[1.15rem] top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-emerald-500 ring-4 ring-white dark:ring-slate-900"/>
                    <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${toneClass[rule.tone]}`}>{rule.label}</span>
                    <span className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                        <LuArrowRight className="h-3 w-3 text-slate-400"/> {rule.detail}
                    </span>
                </motion.li>
            ))}
        </ul>
    </div>
);

export interface CardLimitProps {
    /** Name printed on the card. */
    brand: string;
    last4: string;
    /** Who or what the card is for. */
    holder: string;
    spent: number;
    limit: number;
    /** Small print under the progress bar. */
    footnote?: string;
    cardType?: string;
    limitLabel?: string;
    formatAmount?: (amount: number) => string;
}

const formatDollars = (amount: number) => `$${amount.toLocaleString("en-US")}`;

export const CardLimit = ({
    brand,
    last4,
    holder,
    spent,
    limit,
    footnote,
    cardType = "Virtual",
    limitLabel = "Monthly limit",
    formatAmount = formatDollars,
}: CardLimitProps) => {
    const used = limit > 0 ? Math.min(1, Math.max(0, spent / limit)) : 0;
    return (
        <div className="relative w-full">
            <motion.div
                initial={{rotate: -8, y: 20, opacity: 0}}
                whileInView={{rotate: -4, y: 0, opacity: 1}}
                viewport={{once: true}}
                transition={{duration: 0.6, ease: [0.16, 1, 0.3, 1]}}
                className="relative mx-auto aspect-[1.6] w-full max-w-sm overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-600 to-slate-900 p-5 text-white shadow-2xl shadow-emerald-900/20"
            >
                <div aria-hidden="true" className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10"/>
                <div className="relative flex h-full flex-col justify-between">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold tracking-tight">{brand}</span>
                        <span className="rounded-md bg-white/15 px-2 py-0.5 text-[11px] font-medium">{cardType}</span>
                    </div>
                    <div>
                        <p className="font-mono text-sm tracking-[0.2em] text-white/80">•••• •••• •••• {last4}</p>
                        <p className="mt-1 text-xs text-white/70">{holder}</p>
                    </div>
                </div>
            </motion.div>
            <div className="relative mx-auto -mt-6 w-[88%] max-w-xs rounded-2xl border border-slate-200 bg-white p-4 shadow-xl dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-baseline justify-between">
                    <p className="text-xs text-slate-500 dark:text-slate-400">{limitLabel}</p>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        {formatAmount(spent)} <span className="font-normal text-slate-400">/ {formatAmount(limit)}</span>
                    </p>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <motion.div
                        className="h-full origin-left rounded-full bg-gradient-to-r from-emerald-400 to-teal-500"
                        initial={{scaleX: 0}}
                        whileInView={{scaleX: used}}
                        viewport={{once: true}}
                        transition={{duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1]}}
                    />
                </div>
                {footnote && <p className="mt-2 text-[11px] text-slate-400">{footnote}</p>}
            </div>
        </div>
    );
};

export interface FeatureRowItemProps {
    row: FeatureRow;
    /** Puts the visual on the left from the lg breakpoint up. */
    flipped?: boolean;
}

/** One text and mockup row. AlternatingRows flips every second one. */
export const FeatureRowItem = ({row, flipped = false}: FeatureRowItemProps) => {
    const Icon = row.icon;
    return (
        <article className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <motion.div
                initial={{opacity: 0, y: 20}}
                whileInView={{opacity: 1, y: 0}}
                viewport={{once: true, amount: 0.4}}
                transition={{duration: 0.6, ease: [0.16, 1, 0.3, 1]}}
                className={flipped ? "lg:order-2" : ""}
            >
                <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                    <Icon className="h-4 w-4"/> {row.eyebrow}
                </p>
                <h3 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl dark:text-white">{row.title}</h3>
                <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-400">{row.body}</p>
                <ul className="mt-6 space-y-3">
                    {row.points.map((point) => (
                        <li key={point} className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-300">
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400">
                                <LuCheck className="h-3 w-3"/>
                            </span>
                            {point}
                        </li>
                    ))}
                </ul>
                <a
                    href={row.href ?? "#"}
                    className="group mt-8 inline-flex items-center gap-1.5 rounded-md text-sm font-semibold text-slate-900 outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-4 dark:text-white dark:focus-visible:ring-offset-slate-950"
                >
                    {row.linkLabel}
                    <LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1"/>
                </a>
            </motion.div>

            <div className={`relative ${flipped ? "lg:order-1" : ""}`}>
                <div aria-hidden="true"
                     className="absolute inset-0 -z-0 rounded-[2.5rem] bg-gradient-to-br from-emerald-50 via-teal-50/50 to-transparent dark:from-emerald-500/10 dark:via-teal-500/5"/>
                <div className="relative flex min-h-[340px] items-center justify-center px-6 py-10 sm:px-12">
                    {row.visual}
                </div>
            </div>
        </article>
    );
};

export interface AlternatingRowsProps {
    rows: FeatureRow[];
    eyebrow?: string;
    eyebrowIcon?: FeatureRowIcon;
    title?: string;
    description?: string;
    className?: string;
}

/** Text and mockups that swap sides row by row. */
export const AlternatingRows = ({
    rows,
    eyebrow = "Spend management",
    eyebrowIcon: EyebrowIcon = LuReceipt,
    title = "Close the month without chasing receipts",
    description = "Capture, approve and control company spend in one place, so finance spends its time on numbers instead of reminders.",
    className = "",
}: AlternatingRowsProps) => (
    <section className={`w-full overflow-hidden bg-white px-4 py-16 sm:px-8 sm:py-24 dark:bg-slate-950 ${className}`}>
        <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
                {eyebrow && (
                    <p className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                        <EyebrowIcon className="h-4 w-4"/> {eyebrow}
                    </p>
                )}
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">{title}</h2>
                {description && <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">{description}</p>}
            </div>

            <div className="mt-16 space-y-20 sm:mt-20 lg:space-y-28">
                {rows.map((row, i) => <FeatureRowItem key={row.id} row={row} flipped={i % 2 === 1}/>)}
            </div>
        </div>
    </section>
);
