import {Fragment, useEffect, useId, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {LuCheck, LuChevronDown, LuInfo, LuMinus} from "react-icons/lu";

type PlanId = "free" | "growth" | "scale" | "enterprise";
type Cell = boolean | string;

interface Plan {
    id: PlanId;
    name: string;
    price: string;
}

interface Feature {
    name: string;
    hint: string;
    values: Record<PlanId, Cell>;
}

interface Group {
    id: string;
    name: string;
    features: Feature[];
}

const plans: Plan[] = [
    {id: "free", name: "Free", price: "$0"},
    {id: "growth", name: "Growth", price: "$79"},
    {id: "scale", name: "Scale", price: "$349"},
    {id: "enterprise", name: "Enterprise", price: "Custom"},
];

const groups: Group[] = [
    {
        id: "collect",
        name: "Data collection",
        features: [
            {name: "Tracked events", hint: "Events sent from your apps and servers each month. Extra events are billed at $0.20 per 1,000.", values: {free: "1M", growth: "10M", scale: "100M", enterprise: "Custom"}},
            {name: "Data sources", hint: "SDKs, warehouse syncs and webhooks that feed events into a project.", values: {free: "2", growth: "10", scale: "Unlimited", enterprise: "Unlimited"}},
            {name: "Warehouse sync", hint: "Two-way sync with Snowflake, BigQuery and Redshift, every 15 minutes.", values: {free: false, growth: true, scale: true, enterprise: true}},
            {name: "Data retention", hint: "How long raw events stay queryable. Aggregates are kept for the life of the project.", values: {free: "90 days", growth: "2 years", scale: "5 years", enterprise: "Custom"}},
        ],
    },
    {
        id: "analyze",
        name: "Analysis",
        features: [
            {name: "Funnels and retention", hint: "Conversion funnels, retention curves and cohort tables on any event.", values: {free: true, growth: true, scale: true, enterprise: true}},
            {name: "Saved reports", hint: "Reports you can pin to dashboards and share with a link.", values: {free: "10", growth: "Unlimited", scale: "Unlimited", enterprise: "Unlimited"}},
            {name: "Experiment analysis", hint: "Significance testing for A/B tests with sequential stopping rules.", values: {free: false, growth: true, scale: true, enterprise: true}},
            {name: "SQL workspace", hint: "Query raw events with SQL and turn results into charts.", values: {free: false, growth: false, scale: true, enterprise: true}},
        ],
    },
    {
        id: "govern",
        name: "Governance",
        features: [
            {name: "Roles and permissions", hint: "Viewer, analyst and admin roles, with project-level access.", values: {free: false, growth: true, scale: true, enterprise: true}},
            {name: "SAML single sign-on", hint: "Sign in through Okta, Entra ID or Google Workspace, with enforced SSO.", values: {free: false, growth: false, scale: true, enterprise: true}},
            {name: "Data residency", hint: "Store and process events only in the EU or US region you choose.", values: {free: false, growth: false, scale: false, enterprise: true}},
        ],
    },
    {
        id: "support",
        name: "Support",
        features: [
            {name: "Support channel", hint: "Where you reach us and how fast we answer on business days.", values: {free: "Community", growth: "Email, 1 day", scale: "Chat, 4 hours", enterprise: "Phone, 1 hour"}},
            {name: "Onboarding", hint: "Help with tracking plans, instrumentation reviews and first dashboards.", values: {free: false, growth: "Guides", scale: "2 sessions", enterprise: "Dedicated team"}},
        ],
    },
];

const Value = ({value}: {value: Cell}) => {
    if (value === true) {
        return (
            <span className="inline-flex text-sky-600 dark:text-sky-400">
                <LuCheck className="h-4 w-4" aria-hidden="true"/>
                <span className="sr-only">Included</span>
            </span>
        );
    }
    if (value === false) {
        return (
            <span className="inline-flex text-slate-300 dark:text-slate-600">
                <LuMinus className="h-4 w-4" aria-hidden="true"/>
                <span className="sr-only">Not included</span>
            </span>
        );
    }
    return <span className="text-sm text-slate-700 dark:text-slate-300">{value}</span>;
};

interface HintProps {
    feature: string;
    hint: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

const Hint = ({feature, hint, open, onOpenChange}: HintProps) => {
    const tooltipId = useId();
    return (
        <span className="relative inline-flex" onMouseEnter={() => onOpenChange(true)} onMouseLeave={() => onOpenChange(false)}>
            <button type="button" aria-label={`About ${feature}`} aria-describedby={open ? tooltipId : undefined}
                    onFocus={() => onOpenChange(true)} onBlur={() => onOpenChange(false)}
                    onClick={() => onOpenChange(!open)}
                    className="flex h-6 w-6 items-center justify-center rounded-md text-slate-400 outline-none transition-colors hover:text-slate-700 focus-visible:ring-2 focus-visible:ring-sky-500 dark:hover:text-slate-200">
                <LuInfo className="h-3.5 w-3.5"/>
            </button>
            <AnimatePresence>
                {open && (
                    <motion.span id={tooltipId} role="tooltip"
                                 initial={{opacity: 0, x: -4}} animate={{opacity: 1, x: 0}} exit={{opacity: 0, x: -4}}
                                 transition={{duration: 0.12}}
                                 style={{y: "-50%"}}
                                 className="absolute left-full top-1/2 z-30 ml-2 w-56 rounded-lg bg-slate-900 px-3 py-2 text-xs font-normal leading-relaxed text-white shadow-lg dark:bg-slate-700">
                        {hint}
                    </motion.span>
                )}
            </AnimatePresence>
        </span>
    );
};

const FeatureMatrix = () => {
    const [openGroups, setOpenGroups] = useState<string[]>(groups.map((g) => g.id));
    const [activeHint, setActiveHint] = useState<string | null>(null);
    const allOpen = openGroups.length === groups.length;

    // Escape closes an open tooltip from anywhere in the table.
    useEffect(() => {
        if (!activeHint) return;
        const onKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") setActiveHint(null);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [activeHint]);

    const toggleGroup = (id: string) =>
        setOpenGroups((current) => (current.includes(id) ? current.filter((g) => g !== id) : [...current, id]));

    return (
        <section className="w-full bg-slate-50 px-4 py-16 sm:px-8 dark:bg-slate-950">
            <div className="mx-auto max-w-6xl">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h2 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">Every Northstar feature, by plan</h2>
                        <p className="mt-2 text-slate-600 dark:text-slate-400">Prices are per project a month. Hover or focus the info icons for details.</p>
                    </div>
                    <button type="button" onClick={() => setOpenGroups(allOpen ? [] : groups.map((g) => g.id))}
                            className="self-start rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 outline-none transition-colors hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-sky-500 sm:self-auto dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
                        {allOpen ? "Collapse all" : "Expand all"}
                    </button>
                </div>

                <div tabIndex={0} role="region" aria-label="Feature matrix, scrollable"
                     className="mt-8 max-h-[620px] overflow-auto rounded-2xl border border-slate-200 bg-white outline-none focus-visible:ring-2 focus-visible:ring-sky-500 dark:border-slate-800 dark:bg-slate-900">
                    <table className="w-full min-w-[760px] border-separate border-spacing-0 text-left">
                        <caption className="sr-only">Northstar features by plan</caption>
                        <thead>
                            <tr>
                                <th scope="col" className="sticky left-0 top-0 z-30 w-[30%] border-b border-slate-200 bg-white/95 px-5 py-4 text-sm font-semibold text-slate-900 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95 dark:text-white">
                                    Feature
                                </th>
                                {plans.map((plan) => (
                                    <th key={plan.id} scope="col"
                                        className={`sticky top-0 z-20 border-b border-slate-200 px-5 py-4 backdrop-blur dark:border-slate-800 ${plan.id === "scale" ? "bg-sky-50/95 dark:bg-sky-950/90" : "bg-white/95 dark:bg-slate-900/95"}`}>
                                        <span className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                                            {plan.name}
                                            {plan.id === "scale" && <span className="rounded-full bg-sky-600 px-1.5 py-0.5 text-[10px] font-medium text-white">Most chosen</span>}
                                        </span>
                                        <span className="text-xs font-normal text-slate-500 dark:text-slate-400">{plan.price}</span>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {groups.map((group) => {
                                const open = openGroups.includes(group.id);
                                return (
                                    <Fragment key={group.id}>
                                        <tr>
                                            <th colSpan={5} scope="colgroup" className="border-b border-slate-200 bg-slate-50 p-0 dark:border-slate-800 dark:bg-slate-950/60">
                                                <button type="button" aria-expanded={open}
                                                        onClick={() => toggleGroup(group.id)}
                                                        className="sticky left-0 flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-slate-600 outline-none hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-500 dark:text-slate-400 dark:hover:text-white">
                                                    <motion.span animate={{rotate: open ? 0 : -90}} transition={{duration: 0.2}} className="inline-flex">
                                                        <LuChevronDown className="h-3.5 w-3.5"/>
                                                    </motion.span>
                                                    {group.name}
                                                    <span className="font-normal normal-case tracking-normal text-slate-400">{group.features.length} features</span>
                                                </button>
                                            </th>
                                        </tr>
                                        {open && group.features.map((feature, i) => {
                                            const key = `${group.id}-${feature.name}`;
                                            return (
                                                <motion.tr key={key}
                                                           initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: i * 0.03}}
                                                           className="group/row">
                                                    <th scope="row"
                                                        className={`sticky left-0 border-b border-slate-100 bg-white px-5 py-3 text-sm font-medium text-slate-900 group-hover/row:bg-slate-50 dark:border-slate-800/70 dark:bg-slate-900 dark:text-white dark:group-hover/row:bg-slate-800/60 ${activeHint === key ? "z-20" : "z-10"}`}>
                                                        <span className="flex items-center gap-1">
                                                            {feature.name}
                                                            <Hint feature={feature.name} hint={feature.hint}
                                                                  open={activeHint === key}
                                                                  onOpenChange={(next) => setActiveHint(next ? key : null)}/>
                                                        </span>
                                                    </th>
                                                    {plans.map((plan) => (
                                                        <td key={plan.id}
                                                            className={`border-b border-slate-100 px-5 py-3 dark:border-slate-800/70 ${plan.id === "scale"
                                                                ? "bg-sky-50/60 dark:bg-sky-500/5"
                                                                : "group-hover/row:bg-slate-50 dark:group-hover/row:bg-slate-800/40"}`}>
                                                            <Value value={feature.values[plan.id]}/>
                                                        </td>
                                                    ))}
                                                </motion.tr>
                                            );
                                        })}
                                    </Fragment>
                                );
                            })}
                            <tr>
                                <td className="sticky left-0 z-10 bg-white px-5 py-5 text-sm text-slate-500 dark:bg-slate-900 dark:text-slate-400">Annual billing saves two months.</td>
                                {plans.map((plan) => (
                                    <td key={plan.id} className={`px-5 py-5 ${plan.id === "scale" ? "bg-sky-50/60 dark:bg-sky-500/5" : ""}`}>
                                        <a href="#"
                                           className={`inline-flex whitespace-nowrap rounded-lg px-3 py-2 text-sm font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 ${plan.id === "scale"
                                               ? "bg-sky-600 text-white hover:bg-sky-500"
                                               : "border border-slate-200 text-slate-900 hover:bg-slate-50 dark:border-slate-700 dark:text-white dark:hover:bg-slate-800"}`}>
                                            {plan.id === "enterprise" ? "Contact sales" : plan.id === "free" ? "Start free" : `Choose ${plan.name}`}
                                        </a>
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
};

export default FeatureMatrix;
