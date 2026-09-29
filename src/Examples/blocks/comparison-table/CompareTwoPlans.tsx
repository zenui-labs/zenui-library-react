import {useId, useState} from "react";
import type {ChangeEvent} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {LuArrowLeftRight, LuCheck, LuChevronDown, LuMinus} from "react-icons/lu";

/** true = included, false = not included, string = included with a limit. */
export type TwoPlanCell = boolean | string;

export interface TwoPlanOption {
    id: string;
    name: string;
    /** Price text under the picker, for example "$20 a month". */
    price: string;
}

export interface TwoPlanFeature {
    name: string;
    /** One value per plan, keyed by plan id. Missing keys show as not included. */
    values: Record<string, TwoPlanCell>;
}

/** The ids of the two plans being compared, left then right. */
export type PlanPair = [string, string];

const cellOf = (feature: TwoPlanFeature, id: string): TwoPlanCell => feature.values[id] ?? false;

const Value = ({value}: {value: TwoPlanCell}) => {
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
    plans: TwoPlanOption[];
    label: string;
    value: string;
    disabledId: string;
    onChange: (id: string) => void;
}

const PlanSelect = ({plans, label, value, disabledId, onChange}: PlanSelectProps) => {
    const id = useId();
    const plan = plans.find((p) => p.id === value) ?? plans[0];
    return (
        <div className="min-w-0">
            <label htmlFor={id} className="text-xs font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">{label}</label>
            <div className="relative mt-1.5">
                <select id={id} value={value}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)}
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

export interface CompareTwoPlansProps {
    plans: TwoPlanOption[];
    features: TwoPlanFeature[];
    /** Controlled pair of plan ids. */
    value?: PlanPair;
    /** Starting pair when uncontrolled. Defaults to the first two plans. */
    defaultValue?: PlanPair;
    onChange?: (pair: PlanPair) => void;
    /** Starts with the only differences switch on. */
    defaultOnlyDifferences?: boolean;
    title?: string;
    description?: string;
    planALabel?: string;
    planBLabel?: string;
    onlyDifferencesLabel?: string;
    /** Shown when the switch is on and the two plans match. */
    emptyMessage?: string;
    className?: string;
}

/** Two plan pickers with a swap button and a switch that hides the rows the plans share. */
export const CompareTwoPlans = ({
    plans,
    features,
    value,
    defaultValue,
    onChange,
    defaultOnlyDifferences = false,
    title = "Compare two plans",
    description,
    planALabel = "Plan A",
    planBLabel = "Plan B",
    onlyDifferencesLabel = "Only differences",
    emptyMessage = "These plans include the same features.",
    className = "",
}: CompareTwoPlansProps) => {
    const [internalPair, setInternalPair] = useState<PlanPair>(
        defaultValue ?? [plans[0]?.id ?? "", plans[1]?.id ?? plans[0]?.id ?? ""],
    );
    const [left, right] = value ?? internalPair;
    const [onlyDiff, setOnlyDiff] = useState(defaultOnlyDifferences);

    const setPair = (next: PlanPair) => {
        if (value === undefined) setInternalPair(next);
        onChange?.(next);
    };
    const setLeft = (id: string) => setPair([id, right]);
    const setRight = (id: string) => setPair([left, id]);

    const differs = (f: TwoPlanFeature) => cellOf(f, left) !== cellOf(f, right);
    const diffCount = features.filter(differs).length;
    const rows = onlyDiff ? features.filter(differs) : features;
    const leftName = plans.find((p) => p.id === left)?.name ?? "";
    const rightName = plans.find((p) => p.id === right)?.name ?? "";

    const swap = () => {
        setPair([right, left]);
    };

    return (
        <section className={`w-full bg-white px-4 py-16 sm:px-8 dark:bg-slate-950 ${className}`}>
            <div className="mx-auto max-w-3xl">
                <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">{title}</h2>
                {description && <p className="mt-2 text-slate-600 dark:text-slate-400">{description}</p>}

                <div className="sticky top-0 z-10 -mx-4 mt-8 border-b border-slate-200 bg-white/90 px-4 pb-4 pt-2 backdrop-blur sm:mx-0 sm:rounded-2xl sm:border sm:p-5 dark:border-slate-800 dark:bg-slate-950/90">
                    <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2 sm:gap-4">
                        <PlanSelect plans={plans} label={planALabel} value={left} disabledId={right} onChange={setLeft}/>
                        <button type="button" onClick={swap} aria-label="Swap plans"
                                className="mt-1 flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 text-slate-500 outline-none transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-orange-500 dark:border-slate-700 dark:hover:bg-slate-800 dark:hover:text-white">
                            <LuArrowLeftRight className="h-4 w-4"/>
                        </button>
                        <PlanSelect plans={plans} label={planBLabel} value={right} disabledId={left} onChange={setRight}/>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-3 border-t border-slate-100 pt-4 dark:border-slate-800">
                        <p className="text-sm text-slate-600 dark:text-slate-400" aria-live="polite">
                            <strong className="font-semibold text-slate-900 dark:text-white">{diffCount}</strong> of {features.length} features differ
                        </p>
                        <label className="flex cursor-pointer items-center gap-2.5 text-sm font-medium text-slate-700 dark:text-slate-300">
                            {onlyDifferencesLabel}
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
                                                <Value value={cellOf(feature, left)}/>
                                            </span>
                                            <span role="cell" className={`rounded-lg px-2.5 py-1.5 ${changed ? "bg-orange-50 ring-1 ring-inset ring-orange-200 dark:bg-orange-500/10 dark:ring-orange-500/25" : ""}`}>
                                                <Value value={cellOf(feature, right)}/>
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
                        {emptyMessage}
                    </p>
                )}
            </div>
        </section>
    );
};

