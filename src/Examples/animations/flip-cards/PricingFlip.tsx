import {useId, useState} from "react";
import type {KeyboardEvent} from "react";
import {motion, useReducedMotion} from "framer-motion";
import {LuCheck} from "react-icons/lu";

export type Billing = "monthly" | "yearly";

export interface Plan {
    name: string;
    /** One line under the plan name. */
    blurb: string;
    /** Price per month when billed monthly. */
    monthly: number;
    /** Price per year when billed yearly. */
    yearly: number;
    features: string[];
    /** Highlights the plan and shows the featured badge. */
    featured?: boolean;
}

export interface PricingFlipProps {
    plans: Plan[];
    /** Controlled billing period. Leave it out to let the component manage its own state. */
    value?: Billing;
    defaultValue?: Billing;
    onChange?: (billing: Billing) => void;
    /** Called when a plan's button is pressed, with the billing period that is showing. */
    onSelect?: (plan: Plan, billing: Billing) => void;
    currencySymbol?: string;
    /** Small note next to the yearly option. */
    yearlyBadge?: string;
    featuredBadge?: string;
    /** Builds the label of each plan's button. */
    ctaLabel?: (plan: Plan) => string;
    className?: string;
}

const faceClass = "col-start-1 row-start-1 [-webkit-backface-visibility:hidden] [backface-visibility:hidden]";

interface PriceProps {
    amount: number;
    currencySymbol: string;
    period: string;
    note: string;
    featured?: boolean;
}

const Price = ({amount, currencySymbol, period, note, featured}: PriceProps) => (
    <div>
        <p className="flex items-baseline gap-1">
            <span className={`text-4xl font-semibold tracking-tight tabular-nums ${featured ? "text-white" : "text-gray-900 dark:text-white"}`}>
                {currencySymbol}
                {amount}
            </span>
            <span className={`text-sm ${featured ? "text-indigo-100" : "text-gray-500 dark:text-slate-400"}`}>/{period}</span>
        </p>
        <p className={`mt-1 text-xs ${featured ? "text-indigo-100" : "text-gray-500 dark:text-slate-400"}`}>{note}</p>
    </div>
);

// Switching the billing period flips each price vertically, one card after another.
export const PricingFlip = ({
    plans,
    value,
    defaultValue = "monthly",
    onChange,
    onSelect,
    currencySymbol = "$",
    yearlyBadge = "2 months free",
    featuredBadge = "Most popular",
    ctaLabel = (plan) => `Choose ${plan.name}`,
    className = "",
}: PricingFlipProps) => {
    const reduceMotion = useReducedMotion();
    const [internalBilling, setInternalBilling] = useState<Billing>(defaultValue);
    const billing = value ?? internalBilling;
    const labelId = useId();

    const setBilling = (next: Billing) => {
        if (value === undefined) setInternalBilling(next);
        onChange?.(next);
    };
    const yearly = billing === "yearly";

    // Arrow keys move between the two options, like native radio buttons.
    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
        event.preventDefault();
        const next: Billing = yearly ? "monthly" : "yearly";
        setBilling(next);
        event.currentTarget.querySelector<HTMLButtonElement>(`[data-option="${next}"]`)?.focus();
    };

    return (
        <div className={`flex w-full max-w-4xl flex-col items-center gap-8 ${className}`}>
            <div role="radiogroup" aria-labelledby={labelId} onKeyDown={handleKeyDown} className="relative flex rounded-full border border-gray-200 bg-gray-100 p-1 dark:border-slate-700 dark:bg-slate-800">
                <span id={labelId} className="sr-only">Billing period</span>
                {(["monthly", "yearly"] as const).map((option) => (
                    <button
                        key={option}
                        type="button"
                        role="radio"
                        aria-checked={billing === option}
                        tabIndex={billing === option ? 0 : -1}
                        data-option={option}
                        onClick={() => setBilling(option)}
                        className="relative rounded-full px-5 py-2 text-sm font-medium capitalize text-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 aria-checked:text-gray-900 dark:text-slate-300 dark:aria-checked:text-white"
                    >
                        {billing === option && (
                            <motion.span
                                layoutId={`billing-pill-${labelId}`}
                                className="absolute inset-0 rounded-full bg-white shadow-sm dark:bg-slate-600"
                                transition={{type: "spring", stiffness: 400, damping: 32}}
                            />
                        )}
                        <span className="relative">
                            {option}
                            {option === "yearly" && <span className="ml-1.5 text-xs text-emerald-600 dark:text-emerald-400">{yearlyBadge}</span>}
                        </span>
                    </button>
                ))}
            </div>

            <ul className="grid w-full grid-cols-1 gap-5 md:grid-cols-3">
                {plans.map((plan, index) => (
                    <li
                        key={plan.name}
                        className={`flex flex-col rounded-3xl border p-6 ${
                            plan.featured
                                ? "border-indigo-500 bg-gradient-to-b from-indigo-600 to-violet-700 text-white shadow-xl shadow-indigo-600/25 dark:border-indigo-400"
                                : "border-gray-200 bg-white dark:border-slate-700 dark:bg-slate-900"
                        }`}
                    >
                        <div className="flex items-center justify-between">
                            <h3 className={`text-base font-semibold ${plan.featured ? "text-white" : "text-gray-900 dark:text-white"}`}>{plan.name}</h3>
                            {plan.featured && <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-medium">{featuredBadge}</span>}
                        </div>
                        <p className={`text-sm ${plan.featured ? "text-indigo-100" : "text-gray-500 dark:text-slate-400"}`}>{plan.blurb}</p>

                        {/* Only the price block flips, so the rest of the card stays readable. */}
                        <div className="mt-6 [perspective:600px]" aria-live="polite">
                            <motion.div
                                className="grid [transform-style:preserve-3d]"
                                initial={false}
                                animate={{rotateX: yearly ? -180 : 0}}
                                transition={
                                    reduceMotion
                                        ? {duration: 0}
                                        : {type: "spring", stiffness: 160, damping: 17, delay: index * 0.08}
                                }
                            >
                                <div className={faceClass} aria-hidden={yearly}>
                                    <Price amount={plan.monthly} currencySymbol={currencySymbol} period="mo" note="Billed monthly" featured={plan.featured}/>
                                </div>
                                <div className={`${faceClass} [transform:rotateX(180deg)]`} aria-hidden={!yearly}>
                                    <Price
                                        amount={plan.yearly}
                                        currencySymbol={currencySymbol}
                                        period="yr"
                                        note={`Save ${currencySymbol}${plan.monthly * 12 - plan.yearly} a year`}
                                        featured={plan.featured}
                                    />
                                </div>
                            </motion.div>
                        </div>

                        <ul className="mt-6 space-y-2.5 text-sm">
                            {plan.features.map((feature) => (
                                <li key={feature} className={`flex items-center gap-2 ${plan.featured ? "text-indigo-50" : "text-gray-600 dark:text-slate-300"}`}>
                                    <LuCheck className={`h-4 w-4 ${plan.featured ? "text-white" : "text-indigo-500 dark:text-indigo-400"}`} aria-hidden="true"/>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <button
                            type="button"
                            onClick={() => onSelect?.(plan, billing)}
                            className={`mt-8 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                                plan.featured
                                    ? "bg-white text-indigo-700 hover:bg-indigo-50 focus-visible:ring-white focus-visible:ring-offset-indigo-600"
                                    : "bg-gray-900 text-white hover:bg-gray-700 focus-visible:ring-indigo-500 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 dark:focus-visible:ring-offset-slate-900"
                            }`}
                        >
                            {ctaLabel(plan)}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

