import {useId, useState} from "react";
import type {ChangeEvent} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {LuArrowLeftRight, LuCheck, LuChevronDown, LuMinus} from "react-icons/lu";

type PlanId = "hobby" | "pro" | "team" | "enterprise";
type Cell = boolean | string;

interface Plan {
    id: PlanId;
    name: string;
    price: string;
}

interface Feature {
    name: string;
    values: Record<PlanId, Cell>;
}

const plans: Plan[] = [
    {id: "hobby", name: "Hobby", price: "Free"},
    {id: "pro", name: "Pro", price: "$20 a month"},
    {id: "team", name: "Team", price: "$20 a seat"},
    {id: "enterprise", name: "Enterprise", price: "From $2,500 a month"},
];

const features: Feature[] = [
    {name: "Projects", values: {hobby: "3", pro: "Unlimited", team: "Unlimited", enterprise: "Unlimited"}},
    {name: "Bandwidth", values: {hobby: "100 GB", pro: "1 TB", team: "1 TB per seat", enterprise: "Custom"}},
    {name: "Build minutes", values: {hobby: "6,000", pro: "24,000", team: "24,000 per seat", enterprise: "Custom"}},
    {name: "Concurrent builds", values: {hobby: "1", pro: "3", team: "12", enterprise: "Custom"}},
    {name: "Preview deployments", values: {hobby: true, pro: true, team: true, enterprise: true}},
    {name: "Custom domains", values: {hobby: "1", pro: "50", team: "Unlimited", enterprise: "Unlimited"}},
    {name: "Edge functions", values: {hobby: "100K calls", pro: "1M calls", team: "1M calls per seat", enterprise: "Custom"}},
    {name: "Password protection", values: {hobby: false, pro: true, team: true, enterprise: true}},
    {name: "Team roles", values: {hobby: false, pro: false, team: true, enterprise: true}},
    {name: "SAML single sign-on", values: {hobby: false, pro: false, team: false, enterprise: true}},
    {name: "Uptime commitment", values: {hobby: false, pro: false, team: "99.95%", enterprise: "99.99%"}},
    {name: "Support", values: {hobby: "Community", pro: "Email", team: "Email, 1 day", enterprise: "Dedicated engineer"}},
];

const Value = ({value}: {value: Cell}) => {
    if (value === true) {
        return (
            <span className="inline-flex items-center gap-1.5 text-sm text-slate-900 dark:text-white">
                <LuCheck className="h-4 w-4 text-orange-500" aria-hidden="true"/> Included
            </span>
        );
    }
    if (value === false) {
        return (
            <span className="inline-flex items-center gap-1.5 text-sm text-slate-400 dark:text-slate-500">
                <LuMinus className="h-4 w-4" aria-hidden="true"/> Not included
            </span>
        );
    }
    return <span className="text-sm text-slate-900 dark:text-white">{value}</span>;
};

interface PlanSelectProps {
    label: string;
    value: PlanId;
    disabledId: PlanId;
    onChange: (id: PlanId) => void;
}

const PlanSelect = ({label, value, disabledId, onChange}: PlanSelectProps) => {
    const id = useId();
    const plan = plans.find((p) => p.id === value) ?? plans[0];
    return (
        <div className="min-w-0">
            <label htmlFor={id} className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">{label}</label>
            <div className="relative mt-1.5">
                <select id={id} value={value}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value as PlanId)}
                        className="w-full appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-3 pr-9 text-sm font-semibold text-slate-900 outline-none transition-shadow focus:border-orange-400 focus:ring-4 focus:ring-orange-500/15 dark:border-slate-700 dark:bg-slate-900 dark:text-white">
                    {plans.map((p) => (
                        <option key={p.id} value={p.id} disabled={p.id === disabledId}>{p.name}</option>
                    ))}
                </select>
                <LuChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true"/>
            </div>
            <p className="mt-1.5 truncate text-xs text-slate-500 dark:text-slate-400">{plan.price}</p>
        </div>
    );
};

const CompareTwoPlans = () => {
    const [left, setLeft] = useState<PlanId>("pro");
    const [right, setRight] = useState<PlanId>("team");
    const [onlyDiff, setOnlyDiff] = useState(false);

    const differs = (f: Feature) => f.values[left] !== f.values[right];
    const diffCount = features.filter(differs).length;
    const rows = onlyDiff ? features.filter(differs) : features;
    const leftName = plans.find((p) => p.id === left)?.name ?? "";
    const rightName = plans.find((p) => p.id === right)?.name ?? "";

    const swap = () => {
        setLeft(right);
        setRight(left);
    };

    return (
        <section className="w-full bg-white px-4 py-16 sm:px-8 dark:bg-slate-950">
            <div className="mx-auto max-w-3xl">
                <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">Compare two plans</h2>
                <p className="mt-2 text-slate-600 dark:text-slate-400">Pick any two Cinder plans to see exactly what changes when you move between them.</p>

                <div className="sticky top-0 z-10 -mx-4 mt-8 border-b border-slate-200 bg-white/90 px-4 pb-4 pt-2 backdrop-blur sm:mx-0 sm:rounded-2xl sm:border sm:p-5 dark:border-slate-800 dark:bg-slate-950/90">
                    <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 sm:gap-4">
                        <PlanSelect label="Plan A" value={left} disabledId={right} onChange={setLeft}/>
                        <button type="button" onClick={swap} aria-label="Swap plans"
                                className="mt-1 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 outline-none transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-orange-500 dark:border-slate-700 dark:hover:bg-slate-800 dark:hover:text-white">
                            <LuArrowLeftRight className="h-4 w-4"/>
                        </button>
                        <PlanSelect label="Plan B" value={right} disabledId={left} onChange={setRight}/>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
                        <p className="text-sm text-slate-600 dark:text-slate-400" aria-live="polite">
                            <strong className="font-semibold text-slate-900 dark:text-white">{diffCount}</strong> of {features.length} features differ
                        </p>
                        <label className="flex cursor-pointer items-center gap-2.5 text-sm font-medium text-slate-700 dark:text-slate-300">
                            Only differences
                            <button type="button" role="switch" aria-checked={onlyDiff} onClick={() => setOnlyDiff((v) => !v)}
                                    className={`relative h-6 w-10 rounded-full outline-none transition-colors focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950 ${onlyDiff ? "bg-orange-500" : "bg-slate-300 dark:bg-slate-700"}`}>
                                <motion.span className="absolute left-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow"
                                             animate={{x: onlyDiff ? 16 : 0}} transition={{type: "spring", stiffness: 500, damping: 32}}/>
                            </button>
                        </label>
                    </div>
                </div>

                <div role="table" aria-label={`${leftName} compared with ${rightName}`} className="mt-4">
                    <div role="rowgroup" className="sr-only">
                        <div role="row">
                            <span role="columnheader">Feature</span>
                            <span role="columnheader">{leftName}</span>
                            <span role="columnheader">{rightName}</span>
                        </div>
                    </div>
                    <motion.div role="rowgroup" layout>
                        <AnimatePresence initial={false}>
                            {rows.map((feature) => {
                                const changed = differs(feature);
                                return (
                                    <motion.div key={feature.name} role="row" layout
                                                initial={{opacity: 0, height: 0}}
                                                animate={{opacity: 1, height: "auto"}}
                                                exit={{opacity: 0, height: 0}}
                                                transition={{duration: 0.22}}
                                                className="overflow-hidden">
                                        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 border-b border-slate-100 py-3.5 sm:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_minmax(0,1fr)] sm:items-center dark:border-slate-800">
                                            <span role="rowheader" className="col-span-2 flex items-center gap-2 text-sm font-medium text-slate-500 sm:col-span-1 dark:text-slate-400">
                                                <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${changed ? "bg-orange-500" : "bg-transparent"}`}/>
                                                {feature.name}
                                                {changed && <span className="sr-only">(differs)</span>}
                                            </span>
                                            <span role="cell" className={`rounded-lg px-2.5 py-1.5 ${changed ? "bg-slate-50 dark:bg-slate-900" : ""}`}>
                                                <Value value={feature.values[left]}/>
                                            </span>
                                            <span role="cell" className={`rounded-lg px-2.5 py-1.5 ${changed ? "bg-orange-50 ring-1 ring-inset ring-orange-200 dark:bg-orange-500/10 dark:ring-orange-500/25" : ""}`}>
                                                <Value value={feature.values[right]}/>
                                            </span>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </motion.div>
                </div>

                {rows.length === 0 && (
                    <p className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
                        These plans include the same features.
                    </p>
                )}
            </div>
        </section>
    );
};

export default CompareTwoPlans;
