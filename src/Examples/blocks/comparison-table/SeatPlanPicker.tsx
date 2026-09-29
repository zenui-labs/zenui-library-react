import {useEffect, useId, useState} from "react";
import type {ChangeEvent} from "react";
import {motion, useReducedMotion, useSpring, useTransform} from "framer-motion";
import {LuCheck, LuMinus, LuUsers} from "react-icons/lu";

export interface SeatPlan {
    id: string;
    name: string;
    /** Price per seat a month before any volume discount. */
    perSeat: number;
    /** Seats billed at minimum, even for smaller teams. Defaults to 1. */
    minSeats?: number;
    /** Largest team the plan allows. */
    maxSeats: number;
    /** Ids of the needs this plan covers. */
    includes: string[];
    summary: string;
    /** Button label. Defaults to "Start with <name>". */
    cta?: string;
    /** Where the plan's button links to. Defaults to "#". */
    href?: string;
}

export interface SeatNeed {
    id: string;
    label: string;
}

export interface SeatDiscount {
    /** Team size where the discount starts. */
    minSeats: number;
    /** Share taken off the per-seat price, for example 0.1 for 10%. */
    rate: number;
}

const defaultDiscounts: SeatDiscount[] = [
    {minSeats: 50, rate: 0.1},
    {minSeats: 100, rate: 0.15},
];

const format = (value: number) => `$${Math.round(value).toLocaleString("en-US")}`;

const AnimatedPrice = ({value}: {value: number}) => {
    const reduceMotion = useReducedMotion();
    const spring = useSpring(value, {stiffness: 120, damping: 20});
    const text = useTransform(spring, format);

    useEffect(() => {
        if (reduceMotion) spring.jump(value);
        else spring.set(value);
    }, [value, reduceMotion, spring]);

    return <motion.span>{text}</motion.span>;
};

const ineligibleReason = (plan: SeatPlan, seats: number, required: string[], needs: SeatNeed[]): string | null => {
    if (seats > plan.maxSeats) return `Up to ${plan.maxSeats} seats`;
    const missing = required.filter((n) => !plan.includes.includes(n));
    if (missing.length) return `No ${needs.find((n) => n.id === missing[0])?.label.toLowerCase()}`;
    return null;
};

export interface SeatPlanPickerProps {
    plans: SeatPlan[];
    /** Features a buyer can mark as must have. */
    needs: SeatNeed[];
    title: string;
    description?: string;
    /** Highest value on the slider. The last step reads as that number or more. */
    maxSeats?: number;
    /** Volume discounts on the per-seat price. The largest one that applies wins. */
    discounts?: SeatDiscount[];
    /** Controlled seat count. */
    seats?: number;
    defaultSeats?: number;
    onSeatsChange?: (seats: number) => void;
    /** Controlled list of required need ids. */
    required?: string[];
    defaultRequired?: string[];
    onRequiredChange?: (required: string[]) => void;
    /** Label above the slider. */
    seatLabel?: string;
    /** Plural noun for a seat, used in the slider value and the summary line. */
    seatUnit?: string;
    needsLabel?: string;
    bestFitBadge?: string;
    className?: string;
}

/** A seat slider and must-have features that recalculate each plan's monthly total and mark the best fit. */
export const SeatPlanPicker = ({
    plans,
    needs,
    title,
    description = "Set your team size and the features you need. We will compare monthly totals and mark the plan that fits.",
    maxSeats = 250,
    discounts = defaultDiscounts,
    seats: seatsProp,
    defaultSeats = 18,
    onSeatsChange,
    required: requiredProp,
    defaultRequired = [],
    onRequiredChange,
    seatLabel = "Support agents",
    seatUnit = "agents",
    needsLabel = "Must have",
    bestFitBadge = "Best fit",
    className = "",
}: SeatPlanPickerProps) => {
    const sliderId = useId();
    const badgeId = `best-fit-badge-${useId()}`;
    const [internalSeats, setInternalSeats] = useState(defaultSeats);
    const [internalRequired, setInternalRequired] = useState<string[]>(defaultRequired);
    const seats = seatsProp ?? internalSeats;
    const required = requiredProp ?? internalRequired;

    const setSeats = (next: number) => {
        if (seatsProp === undefined) setInternalSeats(next);
        onSeatsChange?.(next);
    };

    const tiers = [...discounts].sort((a, b) => a.minSeats - b.minSeats);
    const discount = tiers.reduce((rate, tier) => (seats >= tier.minSeats ? tier.rate : rate), 0);
    const eligible = plans.filter((p) => ineligibleReason(p, seats, required, needs) === null);
    // Some plans bill a minimum number of seats, even for smaller teams.
    const billedSeats = (plan: SeatPlan) => Math.max(seats, plan.minSeats ?? 1);
    const total = (plan: SeatPlan) => billedSeats(plan) * plan.perSeat * (1 - discount);
    const bestFit = eligible.length ? eligible.reduce((a, b) => (total(a) <= total(b) ? a : b)) : plans[plans.length - 1];

    const toggleNeed = (id: string) => {
        const next = required.includes(id) ? required.filter((n) => n !== id) : [...required, id];
        if (requiredProp === undefined) setInternalRequired(next);
        onRequiredChange?.(next);
    };

    const fill = `${((seats - 1) / (maxSeats - 1)) * 100}%`;

    if (!bestFit) return null;

    return (
        <section className={`w-full bg-white px-4 py-16 sm:px-8 dark:bg-slate-950 ${className}`}>
            <div className="mx-auto max-w-5xl">
                <div className="text-center">
                    <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">{title}</h2>
                    {description && (
                        <p className="mx-auto mt-3 max-w-xl text-slate-600 dark:text-slate-400">
                            {description}
                        </p>
                    )}
                </div>

                <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-7 dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-end justify-between gap-4">
                        <label htmlFor={sliderId} className="text-sm font-medium text-slate-900 dark:text-white">{seatLabel}</label>
                        <p className="flex items-center gap-2 text-2xl font-semibold tabular-nums text-slate-900 dark:text-white">
                            <LuUsers className="h-5 w-5 text-rose-500" aria-hidden="true"/>
                            {seats}
                            {seats === maxSeats && <span className="text-base">+</span>}
                        </p>
                    </div>
                    <input id={sliderId} type="range" min={1} max={maxSeats} value={seats}
                           onChange={(e: ChangeEvent<HTMLInputElement>) => setSeats(Number(e.target.value))}
                           aria-valuetext={`${seats} ${seatUnit}`}
                           style={{background: `linear-gradient(to right, rgb(244 63 94) ${fill}, rgb(148 163 184 / 0.3) ${fill})`}}
                           className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full accent-rose-500 outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-4 dark:focus-visible:ring-offset-slate-900 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-rose-500 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-rose-500 [&::-webkit-slider-thumb]:shadow-md"/>
                    <div className="mt-2 flex justify-between text-xs text-slate-500 dark:text-slate-400">
                        <span>1</span>
                        {tiers.map((tier) => (
                            <span key={tier.minSeats}>{tier.minSeats} seats, {Math.round(tier.rate * 100)}% off</span>
                        ))}
                        <span>{maxSeats}</span>
                    </div>

                    <fieldset className="mt-6">
                        <legend className="text-sm font-medium text-slate-900 dark:text-white">{needsLabel}</legend>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {needs.map((need) => {
                                const on = required.includes(need.id);
                                return (
                                    <label key={need.id}
                                           className={`flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1.5 text-sm transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-rose-500 ${on
                                               ? "border-rose-300 bg-rose-50 text-rose-900 dark:border-rose-500/40 dark:bg-rose-500/10 dark:text-rose-200"
                                               : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300"}`}>
                                        <input type="checkbox" checked={on} onChange={() => toggleNeed(need.id)} className="h-3.5 w-3.5 accent-rose-500"/>
                                        {need.label}
                                    </label>
                                );
                            })}
                        </div>
                    </fieldset>
                </div>

                <div className="mt-8 grid gap-4 md:grid-cols-3">
                    {plans.map((plan) => {
                        const reason = ineligibleReason(plan, seats, required, needs);
                        const isBest = plan.id === bestFit.id && reason === null;
                        return (
                            <div key={plan.id}
                                 className={`relative flex flex-col rounded-2xl border p-6 transition-all duration-300 ${isBest
                                     ? "border-rose-400 bg-white shadow-xl shadow-rose-500/10 dark:border-rose-500/60 dark:bg-slate-900"
                                     : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"} ${reason ? "opacity-60" : ""}`}>
                                {isBest && (
                                    <motion.span layoutId={badgeId}
                                                 className="absolute -top-3 left-6 rounded-full bg-rose-500 px-2.5 py-1 text-xs font-semibold text-white shadow"
                                                 transition={{type: "spring", stiffness: 300, damping: 30}}>
                                        {bestFitBadge}
                                    </motion.span>
                                )}
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{plan.name}</h3>
                                <p className="mt-1 min-h-[40px] text-sm text-slate-500 dark:text-slate-400">{plan.summary}</p>

                                <p className="mt-5 text-3xl font-semibold tabular-nums tracking-tight text-slate-900 dark:text-white">
                                    <AnimatedPrice value={total(plan)}/>
                                    <span className="ml-1 text-sm font-normal text-slate-500 dark:text-slate-400">a month</span>
                                </p>
                                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                    {billedSeats(plan)} seats at ${plan.perSeat}{discount > 0 ? `, less ${Math.round(discount * 100)}%` : ""}
                                </p>

                                <ul className="mt-5 space-y-2 border-t border-slate-100 pt-5 text-sm dark:border-slate-800">
                                    {needs.map((need) => {
                                        const has = plan.includes.includes(need.id);
                                        return (
                                            <li key={need.id} className={`flex items-center gap-2 ${has ? "text-slate-700 dark:text-slate-300" : "text-slate-400 dark:text-slate-500"}`}>
                                                {has ? <LuCheck className="h-4 w-4 text-rose-500" aria-hidden="true"/> : <LuMinus className="h-4 w-4" aria-hidden="true"/>}
                                                <span>{need.label}<span className="sr-only">{has ? ", included" : ", not included"}</span></span>
                                            </li>
                                        );
                                    })}
                                </ul>

                                <div className="mt-6 flex-1"/>
                                {reason ? (
                                    <p className="rounded-lg bg-slate-100 px-3 py-2 text-center text-sm text-slate-500 dark:bg-slate-800 dark:text-slate-400">{reason}</p>
                                ) : (
                                    <a href={plan.href ?? "#"}
                                       className={`rounded-lg px-3 py-2 text-center text-sm font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 ${isBest
                                           ? "bg-rose-500 text-white hover:bg-rose-600"
                                           : "border border-slate-200 text-slate-900 hover:bg-slate-50 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800"}`}>
                                        {plan.cta ?? `Start with ${plan.name}`}
                                    </a>
                                )}
                            </div>
                        );
                    })}
                </div>
                <p className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400" aria-live="polite">
                    {bestFit.name} is the lowest monthly total for {seats} {seatUnit} with your requirements.
                    {seats < (bestFit.minSeats ?? 1) ? ` It is billed for a minimum of ${bestFit.minSeats} seats.` : ""}
                </p>
            </div>
        </section>
    );
};

