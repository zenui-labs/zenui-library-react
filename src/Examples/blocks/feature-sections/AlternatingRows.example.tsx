import type {ReactNode} from "react";
import {motion, useReducedMotion} from "framer-motion";
import {LuArrowRight, LuCheck, LuCreditCard, LuReceipt, LuScanLine, LuWorkflow} from "react-icons/lu";

interface Row {
    id: string;
    eyebrow: string;
    icon: ReactNode;
    title: string;
    body: string;
    points: string[];
    link: string;
    visual: ReactNode;
}

const ReceiptVisual = () => {
    const reduceMotion = useReducedMotion();
    return (
        <div className="relative mx-auto w-full max-w-[260px] rounded-[2rem] border border-slate-200 bg-slate-900 p-2.5 shadow-2xl shadow-emerald-900/10 dark:border-slate-700">
            <div className="relative overflow-hidden rounded-[1.5rem] bg-white p-4 dark:bg-slate-100">
                <p className="text-center text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">Blue Bottle Cafe</p>
                <p className="text-center text-[10px] text-slate-400">Oct 14, 2026 · 8:42 AM</p>
                <dl className="mt-4 space-y-1.5 font-mono text-[11px] text-slate-600">
                    {[["Oat latte", "5.75"], ["Almond croissant", "4.50"], ["Cold brew", "5.25"], ["Tax", "1.43"]].map(([item, price]) => (
                        <div key={item} className="flex justify-between">
                            <dt>{item}</dt>
                            <dd>{price}</dd>
                        </div>
                    ))}
                </dl>
                <div className="mt-3 flex justify-between border-t border-dashed border-slate-300 pt-2 font-mono text-xs font-semibold text-slate-900">
                    <span>Total</span>
                    <span>$16.93</span>
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
                    <LuCheck className="h-3.5 w-3.5"/> Matched
                </p>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-300">Meals · Client visit</p>
                <p className="text-xs text-slate-400">Card ending 4021</p>
            </motion.div>
        </div>
    );
};

interface Rule {
    label: string;
    detail: string;
    tone: string;
}

const rules: Rule[] = [
    {label: "Over $500", detail: "Route to finance", tone: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300"},
    {label: "Software", detail: "Needs IT review", tone: "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300"},
    {label: "Under $75", detail: "Auto approve", tone: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"},
];

const ApprovalVisual = () => (
    <div className="w-full rounded-3xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-900/5 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">Approval policy</p>
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-500 dark:bg-slate-800 dark:text-slate-400">3 rules</span>
        </div>
        <div className="mt-4 rounded-2xl border border-dashed border-slate-300 p-3 text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400">
            When an expense is submitted
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
                    <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${rule.tone}`}>{rule.label}</span>
                    <span className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                        <LuArrowRight className="h-3 w-3 text-slate-400"/> {rule.detail}
                    </span>
                </motion.li>
            ))}
        </ul>
    </div>
);

const CardVisual = () => (
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
                    <span className="text-sm font-semibold tracking-tight">Ledgerly</span>
                    <span className="rounded-md bg-white/15 px-2 py-0.5 text-[11px] font-medium">Virtual</span>
                </div>
                <div>
                    <p className="font-mono text-sm tracking-[0.2em] text-white/80">•••• •••• •••• 4021</p>
                    <p className="mt-1 text-xs text-white/70">Design team · Figma seats</p>
                </div>
            </div>
        </motion.div>
        <div className="relative mx-auto -mt-6 w-[88%] max-w-xs rounded-2xl border border-slate-200 bg-white p-4 shadow-xl dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-baseline justify-between">
                <p className="text-xs text-slate-500 dark:text-slate-400">Monthly limit</p>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">$1,240 <span className="font-normal text-slate-400">/ $2,000</span></p>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <motion.div
                    className="h-full origin-left rounded-full bg-gradient-to-r from-emerald-400 to-teal-500"
                    initial={{scaleX: 0}}
                    whileInView={{scaleX: 0.62}}
                    viewport={{once: true}}
                    transition={{duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1]}}
                />
            </div>
            <p className="mt-2 text-[11px] text-slate-400">Resets Nov 1 · Locks at the limit</p>
        </div>
    </div>
);

const rows: Row[] = [
    {
        id: "capture",
        eyebrow: "Receipt capture",
        icon: <LuScanLine className="h-4 w-4"/>,
        title: "Snap a receipt and it files itself",
        body: "Ledgerly reads the merchant, amount and tax from a photo, matches it to the card charge and picks the category your team used last time.",
        points: ["Works with paper, email and PDF receipts", "Matches 94% of receipts without a tap", "Flags duplicates before they reach review"],
        link: "See how capture works",
        visual: <ReceiptVisual/>,
    },
    {
        id: "approvals",
        eyebrow: "Approvals",
        icon: <LuWorkflow className="h-4 w-4"/>,
        title: "Rules that send each expense to the right person",
        body: "Write policies once in plain terms. Small purchases clear on their own, and anything unusual lands with the right approver along with the context they need.",
        points: ["Conditions on amount, category and team", "Reminders after 48 hours without a decision", "A full history for every approval"],
        link: "Explore approval rules",
        visual: <ApprovalVisual/>,
    },
    {
        id: "cards",
        eyebrow: "Corporate cards",
        icon: <LuCreditCard className="h-4 w-4"/>,
        title: "A card for every subscription, with a limit that holds",
        body: "Issue virtual cards in seconds, tie them to a vendor and a budget, and freeze them when a tool is no longer needed. Nobody has to share the company card again.",
        points: ["Per vendor and per month limits", "Instant freeze from web or mobile", "Unlimited virtual cards at no cost"],
        link: "Compare card plans",
        visual: <CardVisual/>,
    },
];

const AlternatingRows = () => (
    <section className="w-full overflow-hidden bg-white px-4 py-16 sm:px-8 sm:py-24 dark:bg-slate-950">
        <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-2xl text-center">
                <p className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                    <LuReceipt className="h-4 w-4"/> Spend management
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                    Close the month without chasing receipts
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">
                    Capture, approve and control company spend in one place, so finance spends its time on numbers instead of reminders.
                </p>
            </div>

            <div className="mt-16 space-y-20 sm:mt-20 lg:space-y-28">
                {rows.map((row, i) => {
                    const flipped = i % 2 === 1;
                    return (
                        <article key={row.id} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                            <motion.div
                                initial={{opacity: 0, y: 20}}
                                whileInView={{opacity: 1, y: 0}}
                                viewport={{once: true, amount: 0.4}}
                                transition={{duration: 0.6, ease: [0.16, 1, 0.3, 1]}}
                                className={flipped ? "lg:order-2" : ""}
                            >
                                <p className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300">
                                    {row.icon} {row.eyebrow}
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
                                    href="#"
                                    className="group mt-8 inline-flex items-center gap-1.5 rounded-md text-sm font-semibold text-slate-900 outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-4 dark:text-white dark:focus-visible:ring-offset-slate-950"
                                >
                                    {row.link}
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
                })}
            </div>
        </div>
    </section>
);

export default AlternatingRows;
