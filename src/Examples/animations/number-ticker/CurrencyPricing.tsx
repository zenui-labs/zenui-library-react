import {useId, useState} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import type {Variants} from "framer-motion";
import {LuCheck} from "react-icons/lu";

export type Billing = "monthly" | "yearly";

export interface CurrencyOption {
    /** ISO 4217 code, for example "EUR". */
    code: string;
    /** How many units of this currency one unit of the base currency buys. The base currency uses 1. */
    rate: number;
    /** Round prices to this step. Use 10 for currencies without a minor unit, such as yen. Defaults to 1. */
    step?: number;
}

export interface PricingPlan {
    name: string;
    /** Monthly price in the base currency, before the yearly discount. */
    price: number;
    blurb: string;
    features: string[];
    /** Highlights the card with the accent color. */
    featured?: boolean;
}

export interface PricingLabels {
    monthly: string;
    yearly: string;
    billingLegend: string;
    currencyLegend: string;
    perMonth: string;
    billedMonthly: string;
    billedYearly: (total: string) => string;
    save: (percent: number) => string;
    choose: (planName: string) => string;
}

const defaultLabels: PricingLabels = {
    monthly: "Monthly",
    yearly: "Yearly",
    billingLegend: "Billing period",
    currencyLegend: "Currency",
    perMonth: "per month",
    billedMonthly: "Billed monthly, cancel any time",
    billedYearly: (total) => `Billed ${total} once a year`,
    save: (percent) => `Save ${percent}%`,
    choose: (planName) => `Choose ${planName}`,
};

const charVariants: Variants = {
    enter: (direction: number) => ({y: direction > 0 ? "70%" : "-70%", opacity: 0, filter: "blur(4px)"}),
    center: {y: "0%", opacity: 1, filter: "blur(0px)"},
    exit: (direction: number) => ({y: direction > 0 ? "-70%" : "70%", opacity: 0, filter: "blur(4px)"}),
};

export interface RollingPriceProps {
    value: number;
    /** ISO 4217 code used to format the value. */
    currency: string;
    locale?: string;
}

// Each character keeps its key while it stays the same, so only the characters that change roll.
// Higher prices roll up and lower prices roll down.
export const RollingPrice = ({value, currency, locale = "en-US"}: RollingPriceProps) => {
    const instant = useReducedMotion() ?? false;
    // Remember the last value in state, so the direction survives re-renders.
    const [last, setLast] = useState({value, direction: 1});
    if (last.value !== value) setLast({value, direction: value > last.value ? 1 : -1});
    const direction = last.direction;
    const text = new Intl.NumberFormat(locale, {style: "currency", currency, maximumFractionDigits: 0}).format(value);
    const chars = text.split("");

    return (
        <motion.span layout={!instant} className="relative inline-flex overflow-hidden tabular-nums">
            <span className="sr-only">{text}</span>
            <AnimatePresence initial={false} mode="popLayout" custom={direction}>
                {chars.map((char, index) => (
                    <motion.span
                        key={`${chars.length - index}-${char}`}
                        aria-hidden="true"
                        custom={direction}
                        variants={charVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={instant ? {duration: 0} : {type: "spring", stiffness: 320, damping: 30, delay: index * 0.02}}
                        className="inline-block whitespace-pre"
                    >
                        {char}
                    </motion.span>
                ))}
            </AnimatePresence>
        </motion.span>
    );
};

interface SegmentedProps<T extends string> {
    name: string;
    label: string;
    options: {value: T; label: string}[];
    value: T;
    onChange: (value: T) => void;
}

// Native radios keep arrow key navigation. The highlight glides between options with a shared layout id.
const Segmented = <T extends string>({name, label, options, value, onChange}: SegmentedProps<T>) => (
    <fieldset className="flex rounded-full bg-gray-100 p-1 dark:bg-slate-800">
        <legend className="sr-only">{label}</legend>
        {options.map((option) => (
            <label
                key={option.value}
                className="relative cursor-pointer rounded-full px-3.5 py-1.5 text-sm font-medium text-gray-600 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-indigo-500 dark:text-slate-300"
            >
                <input
                    type="radio"
                    name={name}
                    value={option.value}
                    checked={value === option.value}
                    onChange={() => onChange(option.value)}
                    className="sr-only"
                />
                {value === option.value && (
                    <motion.span
                        layoutId={`${name}-pill`}
                        transition={{type: "spring", stiffness: 420, damping: 34}}
                        className="absolute inset-0 rounded-full bg-white shadow-sm dark:bg-slate-950"
                    />
                )}
                <span className={`relative ${value === option.value ? "text-gray-900 dark:text-white" : ""}`}>{option.label}</span>
            </label>
        ))}
    </fieldset>
);

export interface PlanSelection {
    plan: PricingPlan;
    currency: string;
    billing: Billing;
    /** The monthly price shown on the card, in `currency`. */
    price: number;
}

export interface CurrencyPricingProps {
    plans: PricingPlan[];
    /** The first currency is the default. Rates are relative to the currency plan prices are written in. */
    currencies: CurrencyOption[];
    /** Share taken off monthly prices on yearly billing, from 0 to 1. */
    yearlyDiscount?: number;
    currency?: string;
    defaultCurrency?: string;
    onCurrencyChange?: (currency: string) => void;
    billing?: Billing;
    defaultBilling?: Billing;
    onBillingChange?: (billing: Billing) => void;
    /** Called when a plan button is pressed. */
    onSelectPlan?: (selection: PlanSelection) => void;
    locale?: string;
    labels?: Partial<PricingLabels>;
    className?: string;
}

/** Pricing cards with billing and currency switches. Prices roll to their new value on every change. */
export const CurrencyPricing = ({
    plans,
    currencies,
    yearlyDiscount = 0.2,
    currency: currencyProp,
    defaultCurrency,
    onCurrencyChange,
    billing: billingProp,
    defaultBilling = "monthly",
    onBillingChange,
    onSelectPlan,
    locale = "en-US",
    labels,
    className = "",
}: CurrencyPricingProps) => {
    const id = useId();
    const [innerCurrency, setInnerCurrency] = useState(defaultCurrency ?? currencies[0]?.code ?? "USD");
    const [innerBilling, setInnerBilling] = useState<Billing>(defaultBilling);
    const currency = currencyProp ?? innerCurrency;
    const billing = billingProp ?? innerBilling;
    const text = {...defaultLabels, ...labels};
    const option = currencies.find((item) => item.code === currency) ?? {code: currency, rate: 1};

    const priceFor = (base: number, period: Billing) => {
        const monthly = base * option.rate * (period === "yearly" ? 1 - yearlyDiscount : 1);
        const step = option.step ?? 1;
        return Math.round(monthly / step) * step;
    };

    const format = (value: number) =>
        new Intl.NumberFormat(locale, {style: "currency", currency, maximumFractionDigits: 0}).format(value);

    const changeCurrency = (next: string) => {
        if (currencyProp === undefined) setInnerCurrency(next);
        onCurrencyChange?.(next);
    };

    const changeBilling = (next: Billing) => {
        if (billingProp === undefined) setInnerBilling(next);
        onBillingChange?.(next);
    };

    return (
        <div className={`w-full max-w-4xl ${className}`}>
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Segmented<Billing>
                    name={`${id}-billing`}
                    label={text.billingLegend}
                    value={billing}
                    onChange={changeBilling}
                    options={[{value: "monthly", label: text.monthly}, {value: "yearly", label: text.yearly}]}
                />
                <Segmented<string>
                    name={`${id}-currency`}
                    label={text.currencyLegend}
                    value={currency}
                    onChange={changeCurrency}
                    options={currencies.map((item) => ({value: item.code, label: item.code}))}
                />
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                {plans.map((plan) => {
                    const price = priceFor(plan.price, billing);
                    const yearlyTotal = priceFor(plan.price, "yearly") * 12;
                    return (
                        <div
                            key={plan.name}
                            className={`relative flex flex-col rounded-3xl border p-6 ${
                                plan.featured
                                    ? "border-indigo-500 bg-indigo-600 text-white shadow-xl shadow-indigo-500/25 dark:border-indigo-400 dark:bg-indigo-500 dark:shadow-indigo-950/50"
                                    : "border-gray-200 bg-white text-gray-900 dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                            }`}
                        >
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-semibold">{plan.name}</h3>
                                <AnimatePresence>
                                    {billing === "yearly" && (
                                        <motion.span
                                            initial={{opacity: 0, scale: 0.8, y: 4}}
                                            animate={{opacity: 1, scale: 1, y: 0}}
                                            exit={{opacity: 0, scale: 0.8}}
                                            transition={{type: "spring", stiffness: 400, damping: 24}}
                                            className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                                                plan.featured ? "bg-white/20 text-white" : "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300"
                                            }`}
                                        >
                                            {text.save(Math.round(yearlyDiscount * 100))}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </div>

                            <p className="mt-5 flex items-baseline gap-1.5">
                                <span className="text-4xl font-semibold tracking-tight">
                                    <RollingPrice value={price} currency={currency} locale={locale}/>
                                </span>
                                <span className={`text-sm ${plan.featured ? "text-indigo-100" : "text-gray-500 dark:text-slate-400"}`}>{text.perMonth}</span>
                            </p>
                            <p className={`mt-1 h-5 text-xs ${plan.featured ? "text-indigo-100" : "text-gray-500 dark:text-slate-400"}`}>
                                {billing === "yearly" ? text.billedYearly(format(yearlyTotal)) : text.billedMonthly}
                            </p>
                            <p className={`mt-4 text-sm ${plan.featured ? "text-indigo-50" : "text-gray-600 dark:text-slate-300"}`}>{plan.blurb}</p>

                            <ul className="mt-5 space-y-2.5 text-sm">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex items-center gap-2.5">
                                        <LuCheck className={`h-4 w-4 shrink-0 ${plan.featured ? "text-white" : "text-indigo-600 dark:text-indigo-400"}`} aria-hidden="true"/>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button
                                type="button"
                                onClick={() => onSelectPlan?.({plan, currency, billing, price})}
                                className={`mt-6 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                                    plan.featured
                                        ? "bg-white text-indigo-700 hover:bg-indigo-50 focus-visible:ring-white focus-visible:ring-offset-indigo-600"
                                        : "bg-gray-900 text-white hover:bg-gray-700 focus-visible:ring-indigo-500 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 dark:focus-visible:ring-offset-slate-950"
                                }`}
                            >
                                {text.choose(plan.name)}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
