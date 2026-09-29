import {useEffect, useId, useState} from "react";
import type {ChangeEvent} from "react";
import {motion, useReducedMotion, useSpring, useTransform} from "framer-motion";
import {LuCheck, LuMinus, LuUsers} from "react-icons/lu";

type PlanId = "basic" | "pro" | "enterprise";
type Need = "sso" | "audit" | "priority";

interface Plan {
    id: PlanId;
    name: string;
    perSeat: number;
    minSeats: number;
    maxSeats: number;
    includes: Need[];
    summary: string;
}

const plans: Plan[] = [
    {id: "basic", name: "Basic", perSeat: 8, minSeats: 1, maxSeats: 10, includes: [], summary: "Shared inbox and help center for small teams"},
    {id: "pro", name: "Pro", perSeat: 19, minSeats: 1, maxSeats: 150, includes: ["audit"], summary: "Automations, reporting and multiple brands"},
    {id: "enterprise", name: "Enterprise", perSeat: 34, minSeats: 25, maxSeats: 1000, includes: ["sso", "audit", "priority"], summary: "Security reviews, sandboxes and a named manager"},
];

const needs: {id: Need; label: string}[] = [
    {id: "sso", label: "SAML single sign-on"},
    {id: "audit", label: "Audit log"},
    {id: "priority", label: "Priority support"},
];

const MAX_SEATS = 250;

// Volume discount applied to the per-seat price.
const discountFor = (seats: number) => (seats >= 100 ? 0.15 : seats >= 50 ? 0.1 : 0);

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

const ineligibleReason = (plan: Plan, seats: number, required: Need[]): string | null => {
    if (seats > plan.maxSeats) return `Up to ${plan.maxSeats} seats`;
    const missing = required.filter((n) => !plan.includes.includes(n));
    if (missing.length) return `No ${needs.find((n) => n.id === missing[0])?.label.toLowerCase()}`;
    return null;
};

const SeatPlanPicker = () => {
    const sliderId = useId();
    const [seats, setSeats] = useState(18);
    const [required, setRequired] = useState<Need[]>(["audit"]);

    const discount = discountFor(seats);
    const eligible = plans.filter((p) => ineligibleReason(p, seats, required) === null);
    // Enterprise is billed for at least 25 seats, even for smaller teams.
    const billedSeats = (plan: Plan) => Math.max(seats, plan.minSeats);
    const total = (plan: Plan) => billedSeats(plan) * plan.perSeat * (1 - discount);
    const bestFit = eligible.length ? eligible.reduce((a, b) => (total(a) <= total(b) ? a : b)) : plans[plans.length - 1];

    const toggleNeed = (id: Need) =>
        setRequired((current) => (current.includes(id) ? current.filter((n) => n !== id) : [...current, id]));

    const fill = `${((seats - 1) / (MAX_SEATS - 1)) * 100}%`;

    return (
        <section className="w-full bg-white px-4 py-16 sm:px-8 dark:bg-slate-950">
            <div className="mx-auto max-w-5xl">
                <div className="text-center">
                    <h2 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">Find the right Helpline plan</h2>
                    <p className="mx-auto mt-3 max-w-xl text-slate-600 dark:text-slate-400">
                        Set your team size and the features you need. We will compare monthly totals and mark the plan that fits.
                    </p>
                </div>

                <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-slate-200 bg-slate-50 p-5 sm:p-7 dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-end justify-between gap-4">
                        <label htmlFor={sliderId} className="text-sm font-medium text-slate-900 dark:text-white">Support agents</label>
                        <p className="flex items-center gap-2 text-2xl font-semibold tabular-nums text-slate-900 dark:text-white">
                            <LuUsers className="h-5 w-5 text-rose-500" aria-hidden="true"/>
                            {seats}
                            {seats === MAX_SEATS && <span className="text-base">+</span>}
                        </p>
                    </div>
                    <input id={sliderId} type="range" min={1} max={MAX_SEATS} value={seats}
                           onChange={(e: ChangeEvent<HTMLInputElement>) => setSeats(Number(e.target.value))}
                           aria-valuetext={`${seats} agents`}
                           style={{background: `linear-gradient(to right, rgb(244 63 94) ${fill}, rgb(148 163 184 / 0.3) ${fill})`}}
                           className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full accent-rose-500 outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-4 dark:focus-visible:ring-offset-slate-900 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:bg-rose-500 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:bg-rose-500 [&::-webkit-slider-thumb]:shadow-md"/>
                    <div className="mt-2 flex justify-between text-xs text-slate-500 dark:text-slate-400">
                        <span>1</span>
                        <span>50 seats, 10% off</span>
                        <span>100 seats, 15% off</span>
                        <span>{MAX_SEATS}</span>
                    </div>

                    <fieldset className="mt-6">
                        <legend className="text-sm font-medium text-slate-900 dark:text-white">Must have</legend>
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
                        const reason = ineligibleReason(plan, seats, required);
                        const isBest = plan.id === bestFit.id && reason === null;
                        return (
                            <div key={plan.id}
                                 className={`relative flex flex-col rounded-2xl border p-6 transition-all duration-300 ${isBest
                                     ? "border-rose-400 bg-white shadow-xl shadow-rose-500/10 dark:border-rose-500/60 dark:bg-slate-900"
                                     : "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"} ${reason ? "opacity-60" : ""}`}>
                                {isBest && (
                                    <motion.span layoutId="best-fit-badge"
                                                 className="absolute -top-3 left-6 rounded-full bg-rose-500 px-2.5 py-1 text-xs font-semibold text-white shadow"
                                                 transition={{type: "spring", stiffness: 300, damping: 30}}>
                                        Best fit
                                    </motion.span>
                                )}
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{plan.name}</h3>
                                <p className="mt-1 min-h-[40px] text-sm text-slate-500 dark:text-slate-400">{plan.summary}</p>

                                <p className="mt-5 text-3xl font-semibold tabular-nums tracking-tight text-slate-900 dark:text-white">
                                    <AnimatedPrice value={total(plan)}/>
                                    <span className="ml-1 text-sm font-normal text-slate-500 dark:text-slate-400">a month</span>
                                </p>
                                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                    {billedSeats(plan)} seats at ${plan.perSeat}{discount > 0 ? `, less ${discount * 100}%` : ""}
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
                                    <a href="#"
                                       className={`rounded-lg px-3 py-2 text-center text-sm font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 ${isBest
                                           ? "bg-rose-500 text-white hover:bg-rose-600"
                                           : "border border-slate-200 text-slate-900 hover:bg-slate-50 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800"}`}>
                                        {plan.id === "enterprise" ? "Talk to sales" : `Start with ${plan.name}`}
                                    </a>
                                )}
                            </div>
                        );
                    })}
                </div>
                <p className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400" aria-live="polite">
                    {bestFit.name} is the lowest monthly total for {seats} agents with your requirements.
                    {seats < bestFit.minSeats ? ` It is billed for a minimum of ${bestFit.minSeats} seats.` : ""}
                </p>
            </div>
        </section>
    );
};

export default SeatPlanPicker;
