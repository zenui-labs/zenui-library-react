import {useState} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import type {Variants} from "framer-motion";
import {LuCheck} from "react-icons/lu";

type Currency = "USD" | "EUR" | "GBP" | "JPY";
type Billing = "monthly" | "yearly";

// Rates are fixed for the demo. Load real rates from your billing provider.
const rates: Record<Currency, number> = {USD: 1, EUR: 0.92, GBP: 0.79, JPY: 149};
const currencies: Currency[] = ["USD", "EUR", "GBP", "JPY"];

interface Plan {
    name: string;
    usd: number;
    blurb: string;
    features: string[];
    featured?: boolean;
}

const plans: Plan[] = [
    {name: "Starter", usd: 12, blurb: "For solo builders shipping side projects.", features: ["3 projects", "10 GB storage", "Community support"]},
    {name: "Pro", usd: 29, blurb: "For small teams that ship every week.", features: ["Unlimited projects", "100 GB storage", "Preview deployments"], featured: true},
    {name: "Business", usd: 79, blurb: "For companies with compliance needs.", features: ["SSO and SCIM", "1 TB storage", "99.99% uptime SLA"]},
];

const priceFor = (usd: number, currency: Currency, billing: Billing) => {
    const monthly = usd * rates[currency] * (billing === "yearly" ? 0.8 : 1);
    // Yen has no minor unit, so round it to a tidy step.
    return currency === "JPY" ? Math.round(monthly / 10) * 10 : Math.round(monthly);
};

const format = (value: number, currency: Currency) =>
    new Intl.NumberFormat("en-US", {style: "currency", currency, maximumFractionDigits: 0}).format(value);

const charVariants: Variants = {
    enter: (direction: number) => ({y: direction > 0 ? "70%" : "-70%", opacity: 0, filter: "blur(4px)"}),
    center: {y: "0%", opacity: 1, filter: "blur(0px)"},
    exit: (direction: number) => ({y: direction > 0 ? "-70%" : "70%", opacity: 0, filter: "blur(4px)"}),
};

interface RollingPriceProps {
    value: number;
    currency: Currency;
    instant: boolean;
}

// Each character keeps its key while it stays the same, so only the characters that change roll.
// Higher prices roll up and lower prices roll down.
const RollingPrice = ({value, currency, instant}: RollingPriceProps) => {
    // Remember the last value in state, so the direction survives re-renders.
    const [last, setLast] = useState({value, direction: 1});
    if (last.value !== value) setLast({value, direction: value > last.value ? 1 : -1});
    const direction = last.direction;
    const text = format(value, currency);
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

const CurrencyPricing = () => {
    const reduceMotion = useReducedMotion() ?? false;
    const [currency, setCurrency] = useState<Currency>("USD");
    const [billing, setBilling] = useState<Billing>("monthly");

    return (
        <div className="w-full max-w-4xl">
            <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Segmented<Billing>
                    name="billing"
                    label="Billing period"
                    value={billing}
                    onChange={setBilling}
                    options={[{value: "monthly", label: "Monthly"}, {value: "yearly", label: "Yearly"}]}
                />
                <Segmented<Currency>
                    name="currency"
                    label="Currency"
                    value={currency}
                    onChange={setCurrency}
                    options={currencies.map((code) => ({value: code, label: code}))}
                />
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                {plans.map((plan) => {
                    const price = priceFor(plan.usd, currency, billing);
                    const yearlyTotal = priceFor(plan.usd, currency, "yearly") * 12;
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
                                            Save 20%
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </div>

                            <p className="mt-5 flex items-baseline gap-1.5">
                                <span className="text-4xl font-semibold tracking-tight">
                                    <RollingPrice value={price} currency={currency} instant={reduceMotion}/>
                                </span>
                                <span className={`text-sm ${plan.featured ? "text-indigo-100" : "text-gray-500 dark:text-slate-400"}`}>per month</span>
                            </p>
                            <p className={`mt-1 h-5 text-xs ${plan.featured ? "text-indigo-100" : "text-gray-500 dark:text-slate-400"}`}>
                                {billing === "yearly" ? `Billed ${format(yearlyTotal, currency)} once a year` : "Billed monthly, cancel any time"}
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
                                className={`mt-6 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
                                    plan.featured
                                        ? "bg-white text-indigo-700 hover:bg-indigo-50 focus-visible:ring-white focus-visible:ring-offset-indigo-600"
                                        : "bg-gray-900 text-white hover:bg-gray-700 focus-visible:ring-indigo-500 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 dark:focus-visible:ring-offset-slate-950"
                                }`}
                            >
                                Choose {plan.name}
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CurrencyPricing;
