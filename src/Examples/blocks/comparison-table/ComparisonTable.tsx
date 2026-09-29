import {Fragment, useId, useState} from "react";
import {motion} from "framer-motion";
import {LuCheck, LuMinus} from "react-icons/lu";

export type Billing = "monthly" | "yearly";

export interface ComparisonPlan {
    id: string;
    name: string;
    tagline: string;
    /** Price per seat a month on monthly billing. 0 shows "Free forever", null shows "Custom". */
    monthly: number | null;
    /** Price per seat a month on yearly billing. */
    yearly: number | null;
    cta: string;
    /** Where the plan's button links to. Defaults to "#". */
    href?: string;
    /** Tints the column and shows the badge. */
    featured?: boolean;
}

/** true = included, false = not included, string = included with a limit. */
export type ComparisonCell = boolean | string;

export interface ComparisonRow {
    name: string;
    /** One value per plan, keyed by plan id. Missing keys show as not included. */
    values: Record<string, ComparisonCell>;
}

export interface ComparisonGroup {
    name: string;
    rows: ComparisonRow[];
}

export interface PriceDisplay {
    label: string;
    note: string;
}

const defaultFormatPrice = (plan: ComparisonPlan, billing: Billing): PriceDisplay => {
    const amount = billing === "monthly" ? plan.monthly : plan.yearly;
    if (amount === null) return {label: "Custom", note: "Annual contract"};
    if (amount === 0) return {label: "$0", note: "Free forever"};
    return {label: `$${amount}`, note: billing === "yearly" ? "Per seat a month, billed yearly" : "Per seat a month"};
};

export const ComparisonCellValue = ({value}: {value: ComparisonCell}) => {
    if (value === true) {
        return (
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-500/15 dark:text-indigo-300">
                <LuCheck className="h-4 w-4" aria-hidden="true"/>
                <span className="sr-only">Included</span>
            </span>
        );
    }
    if (value === false) {
        return (
            <span className="inline-flex h-6 w-6 items-center justify-center text-slate-300 dark:text-slate-600">
                <LuMinus className="h-4 w-4" aria-hidden="true"/>
                <span className="sr-only">Not included</span>
            </span>
        );
    }
    return <span className="text-sm text-slate-700 dark:text-slate-300">{value}</span>;
};

export interface ComparisonTableProps {
    plans: ComparisonPlan[];
    groups: ComparisonGroup[];
    title?: string;
    description?: string;
    /** Small tag next to the yearly option. Pass an empty string to hide it. */
    yearlyBadge?: string;
    featuredBadge?: string;
    /** Text in the empty top-left cell. */
    cornerNote?: string;
    /** Screen reader caption for the table. */
    caption?: string;
    /** Controlled billing period. */
    billing?: Billing;
    defaultBilling?: Billing;
    onBillingChange?: (billing: Billing) => void;
    /** Turns a plan and billing period into the price and the note under it. */
    formatPrice?: (plan: ComparisonPlan, billing: Billing) => PriceDisplay;
    className?: string;
}

/** A plan comparison table grouped by category, with a monthly and yearly price switch. */
export const ComparisonTable = ({
    plans,
    groups,
    title = "Compare plans",
    description = "Every plan includes unlimited issues and the mobile apps. Switch or cancel at any time.",
    yearlyBadge = "Save 17%",
    featuredBadge = "Popular",
    cornerNote = "Prices in USD",
    caption = "Features included in each plan",
    billing: billingProp,
    defaultBilling = "yearly",
    onBillingChange,
    formatPrice = defaultFormatPrice,
    className = "",
}: ComparisonTableProps) => {
    const [internalBilling, setInternalBilling] = useState<Billing>(defaultBilling);
    const billing = billingProp ?? internalBilling;
    const pillId = `billing-pill-${useId()}`;

    const setBilling = (next: Billing) => {
        if (billingProp === undefined) setInternalBilling(next);
        onBillingChange?.(next);
    };

    return (
        <section className={`w-full bg-white px-4 py-16 sm:px-8 dark:bg-slate-950 ${className}`}>
            <div className="mx-auto max-w-5xl">
                <div className="flex flex-col items-center text-center">
                    <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">{title}</h2>
                    {description && <p className="mt-3 max-w-lg text-slate-600 dark:text-slate-400">{description}</p>}

                    <div className="mt-8 inline-flex rounded-full border border-slate-200 bg-slate-100 p-1 dark:border-slate-800 dark:bg-slate-900" role="radiogroup" aria-label="Billing period">
                        {(["monthly", "yearly"] as const).map((option) => (
                            <button key={option} type="button" role="radio" aria-checked={billing === option}
                                    onClick={() => setBilling(option)}
                                    className="relative rounded-full px-4 py-1.5 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
                                {billing === option && (
                                    <motion.span layoutId={pillId} className="absolute inset-0 rounded-full bg-white shadow-sm dark:bg-slate-700"
                                                 transition={{type: "spring", bounce: 0.2, duration: 0.4}}/>
                                )}
                                <span className={`relative ${billing === option ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-400"}`}>
                                    {option === "monthly" ? "Monthly" : "Yearly"}
                                    {option === "yearly" && yearlyBadge && <span className="ml-1.5 text-xs text-emerald-600 dark:text-emerald-400">{yearlyBadge}</span>}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="mt-10 overflow-x-auto rounded-3xl border border-slate-200 dark:border-slate-800">
                    <table className="w-full min-w-[640px] border-collapse text-left">
                        <caption className="sr-only">{caption}</caption>
                        <thead>
                            <tr>
                                <td className="w-[28%] p-5 align-bottom text-sm text-slate-500 dark:text-slate-400">{cornerNote}</td>
                                {plans.map((plan) => {
                                    const p = formatPrice(plan, billing);
                                    return (
                                        <th key={plan.id} scope="col"
                                            className={`w-[24%] p-5 align-top font-normal ${plan.featured ? "bg-indigo-50/70 dark:bg-indigo-500/10" : ""}`}>
                                            <div className="flex items-center gap-2">
                                                <span className="text-base font-semibold text-slate-900 dark:text-white">{plan.name}</span>
                                                {plan.featured && (
                                                    <span className="rounded-full bg-indigo-600 px-2 py-0.5 text-[11px] font-medium text-white">{featuredBadge}</span>
                                                )}
                                            </div>
                                            <p className="text-xs text-slate-500 dark:text-slate-400">{plan.tagline}</p>
                                            <p className="mt-4 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
                                                <motion.span key={`${plan.id}-${billing}`} initial={{opacity: 0, y: -6}} animate={{opacity: 1, y: 0}} className="inline-block">
                                                    {p.label}
                                                </motion.span>
                                            </p>
                                            <p className="mt-1 h-8 text-xs text-slate-500 dark:text-slate-400">{p.note}</p>
                                            <a href={plan.href ?? "#"}
                                               className={`mt-3 block rounded-lg px-3 py-2 text-center text-sm font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 ${plan.featured
                                                   ? "bg-indigo-600 text-white hover:bg-indigo-500"
                                                   : "border border-slate-200 text-slate-900 hover:bg-slate-50 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800"}`}>
                                                {plan.cta}
                                            </a>
                                        </th>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {groups.map((group) => (
                                <Fragment key={group.name}>
                                    <tr>
                                        <th colSpan={plans.length + 1} scope="colgroup"
                                            className="border-t border-slate-200 bg-slate-50 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400">
                                            {group.name}
                                        </th>
                                    </tr>
                                    {group.rows.map((row) => (
                                        <tr key={row.name} className="border-t border-slate-100 transition-colors hover:bg-slate-50/60 dark:border-slate-800/70 dark:hover:bg-slate-900/40">
                                            <th scope="row" className="px-5 py-3.5 text-sm font-medium text-slate-900 dark:text-white">{row.name}</th>
                                            {plans.map((plan) => (
                                                <td key={plan.id} className={`px-5 py-3.5 ${plan.featured ? "bg-indigo-50/70 dark:bg-indigo-500/10" : ""}`}>
                                                    <ComparisonCellValue value={row.values[plan.id] ?? false}/>
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </Fragment>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};
