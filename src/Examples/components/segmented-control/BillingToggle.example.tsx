import {useId, useRef, useState} from "react";
import type {KeyboardEvent} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {LuCheck} from "react-icons/lu";

type Cycle = "monthly" | "yearly";

interface Plan {
    name: string;
    blurb: string;
    price: Record<Cycle, number>;
    features: string[];
    featured?: boolean;
}

const plans: Plan[] = [
    {
        name: "Starter",
        blurb: "For small teams getting organized.",
        price: {monthly: 12, yearly: 10},
        features: ["Up to 10 members", "Unlimited projects", "Email support"],
    },
    {
        name: "Team",
        blurb: "For teams that ship every week.",
        price: {monthly: 24, yearly: 19},
        features: ["Unlimited members", "Roadmaps and cycles", "Priority support"],
        featured: true,
    },
];

const cycles: {value: Cycle; label: string}[] = [
    {value: "monthly", label: "Monthly"},
    {value: "yearly", label: "Yearly"},
];

// Rolls the number up when the price goes up and down when it goes down.
const RollingPrice = ({value, direction}: {value: number; direction: 1 | -1}) => {
    const reduceMotion = useReducedMotion();
    const offset = reduceMotion ? 0 : 18;

    return (
        <span className="relative inline-flex h-11 overflow-hidden tabular-nums">
            <AnimatePresence initial={false} mode="popLayout" custom={direction}>
                <motion.span
                    key={value}
                    custom={direction}
                    variants={{
                        enter: (dir: number) => ({y: dir * offset, opacity: 0}),
                        center: {y: 0, opacity: 1},
                        exit: (dir: number) => ({y: dir * -offset, opacity: 0}),
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{duration: 0.28, ease: [0.16, 1, 0.3, 1]}}
                >
                    ${value}
                </motion.span>
            </AnimatePresence>
        </span>
    );
};

const BillingToggle = () => {
    const [cycle, setCycle] = useState<Cycle>("yearly");
    const id = useId();
    const reduceMotion = useReducedMotion();
    const buttons = useRef<(HTMLButtonElement | null)[]>([]);

    const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
        if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(event.key)) return;
        event.preventDefault();
        const next: Cycle = cycle === "monthly" ? "yearly" : "monthly";
        setCycle(next);
        buttons.current[cycles.findIndex((option) => option.value === next)]?.focus();
    };

    return (
        <div className="flex w-full max-w-2xl flex-col items-center gap-8">
            <div
                role="radiogroup"
                aria-label="Billing cycle"
                className="relative inline-flex rounded-full border border-zinc-200 bg-white p-1 shadow-sm dark:border-white/10 dark:bg-zinc-900"
            >
                {cycles.map((option, index) => {
                    const checked = option.value === cycle;
                    return (
                        <button
                            key={option.value}
                            ref={(node) => {
                                buttons.current[index] = node;
                            }}
                            type="button"
                            role="radio"
                            aria-checked={checked}
                            tabIndex={checked ? 0 : -1}
                            onClick={() => setCycle(option.value)}
                            onKeyDown={onKeyDown}
                            className={`relative flex h-9 items-center gap-2 rounded-full px-4 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-900 ${
                                checked ? "text-white dark:text-zinc-900" : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                            }`}
                        >
                            {checked && (
                                <motion.span
                                    layoutId={`${id}-pill`}
                                    className="absolute inset-0 rounded-full bg-zinc-900 dark:bg-white"
                                    transition={reduceMotion ? {duration: 0} : {type: "spring", stiffness: 480, damping: 36}}
                                />
                            )}
                            <span className="relative">{option.label}</span>
                            {option.value === "yearly" && (
                                <span
                                    className={`relative rounded-full px-1.5 py-0.5 text-[11px] font-semibold transition-colors ${
                                        checked
                                            ? "bg-emerald-400/20 text-emerald-300 dark:bg-emerald-500/15 dark:text-emerald-700"
                                            : "bg-emerald-50 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300"
                                    }`}
                                >
                                    Save 20%
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>

            <div className="grid w-full gap-4 sm:grid-cols-2">
                {plans.map((plan) => (
                    <div
                        key={plan.name}
                        className={`relative rounded-2xl border p-6 ${
                            plan.featured
                                ? "border-indigo-200 bg-gradient-to-b from-indigo-50/80 to-white dark:border-indigo-400/25 dark:from-indigo-500/10 dark:to-zinc-900"
                                : "border-zinc-200 bg-white dark:border-white/10 dark:bg-zinc-900"
                        }`}
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">{plan.name}</h3>
                            {plan.featured && (
                                <span className="rounded-full bg-indigo-600 px-2 py-0.5 text-[11px] font-medium text-white dark:bg-indigo-500">Most popular</span>
                            )}
                        </div>
                        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{plan.blurb}</p>
                        <p className="mt-5 flex items-end gap-1.5">
                            <span className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-white">
                                <RollingPrice value={plan.price[cycle]} direction={cycle === "monthly" ? 1 : -1}/>
                            </span>
                            <span className="pb-1.5 text-sm text-zinc-500 dark:text-zinc-400">per seat / month</span>
                        </p>
                        <p className="mt-1 h-5 text-xs text-zinc-500 dark:text-zinc-400">
                            {cycle === "yearly" ? `Billed $${plan.price.yearly * 12} per seat each year` : "Billed monthly, cancel anytime"}
                        </p>
                        <ul className="mt-5 space-y-2 border-t border-zinc-200/70 pt-5 dark:border-white/10">
                            {plan.features.map((feature) => (
                                <li key={feature} className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
                                    <LuCheck className="size-4 text-indigo-600 dark:text-indigo-400" aria-hidden/>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BillingToggle;
