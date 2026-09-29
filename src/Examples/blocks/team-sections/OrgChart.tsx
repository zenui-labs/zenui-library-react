import {useId, useState} from "react";
import type {ReactNode} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {LuChevronDown} from "react-icons/lu";

export interface OrgPerson {
    name: string;
    role: string;
    /** Tailwind gradient stops for the initials tile, for example "from-indigo-500 to-violet-600". */
    tone: string;
}

export interface OrgGroup {
    /** Stable id used to track which groups are expanded. */
    id: string;
    /** Small uppercase label above the lead. */
    name: string;
    lead: OrgPerson;
    reports: OrgPerson[];
}

const numberWords = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];

const initials = (name: string) => name.split(" ").map((p) => p[0]).join("");

export interface OrgPersonCardProps {
    person: OrgPerson;
    size?: "md" | "lg";
}

/** A person tile with initials, name and role. */
export const OrgPersonCard = ({person, size = "md"}: OrgPersonCardProps) => (
    <div className={`relative flex items-center gap-3 rounded-2xl border border-slate-200 bg-white text-left shadow-sm dark:border-slate-800 dark:bg-slate-900 ${size === "lg" ? "p-4 pr-6" : "p-3 pr-4"}`}>
        <span className={`flex shrink-0 items-center justify-center rounded-xl bg-gradient-to-br font-semibold text-white ${person.tone} ${size === "lg" ? "h-12 w-12 text-base" : "h-10 w-10 text-sm"}`}>
            {initials(person.name)}
        </span>
        <span className="min-w-0">
            <span className={`block truncate font-semibold text-slate-900 dark:text-white ${size === "lg" ? "text-base" : "text-sm"}`}>{person.name}</span>
            <span className="block truncate text-xs text-slate-500 dark:text-slate-400">{person.role}</span>
        </span>
    </div>
);

export interface OrgChartProps {
    /** The person at the top of the tree. */
    head: OrgPerson;
    /** Groups under the head. The connector line is drawn for three columns on wide screens. */
    groups: OrgGroup[];
    /** Ids of the expanded groups when you control them. */
    expanded?: string[];
    /** Ids of the groups expanded on first render. */
    defaultExpanded?: string[];
    onExpandedChange?: (ids: string[]) => void;
    eyebrow?: string;
    title?: ReactNode;
    /** Line under the title. Defaults to a sentence with the headcount and number of groups. */
    description?: ReactNode;
    expandAllLabel?: string;
    collapseAllLabel?: string;
    className?: string;
}

/** A top-down leadership tree with connector lines and groups that expand to show each leader's reports. */
export const OrgChart = ({
    head,
    groups,
    expanded: expandedProp,
    defaultExpanded = [],
    onExpandedChange,
    eyebrow = "How we are organized",
    title = "Who leads what at Lumen",
    description,
    expandAllLabel = "Expand all",
    collapseAllLabel = "Collapse all",
    className = "",
}: OrgChartProps) => {
    const uid = useId();
    const reduceMotion = useReducedMotion();
    const [internal, setInternal] = useState<string[]>(defaultExpanded);
    const open = expandedProp ?? internal;
    const allOpen = open.length === groups.length;

    const setOpen = (next: string[]) => {
        if (expandedProp === undefined) setInternal(next);
        onExpandedChange?.(next);
    };

    const toggle = (id: string) => setOpen(open.includes(id) ? open.filter((d) => d !== id) : [...open, id]);

    const headcount = 1 + groups.reduce((sum, d) => sum + 1 + d.reports.length, 0);
    const groupCount = numberWords[groups.length] ?? String(groups.length);

    return (
        <section className={`w-full bg-slate-50 px-4 py-16 sm:px-8 sm:py-20 dark:bg-slate-950 ${className}`}>
            <div className="mx-auto max-w-6xl">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{eyebrow}</p>
                        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">{title}</h2>
                        <p className="mt-2 text-slate-600 dark:text-slate-400">{description ?? `${headcount} leaders across ${groupCount} groups. Expand a group to see its managers.`}</p>
                    </div>
                    <button type="button" onClick={() => setOpen(allOpen ? [] : groups.map((d) => d.id))}
                            className="self-start rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 outline-none transition-colors hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-indigo-500 sm:self-auto dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
                        {allOpen ? collapseAllLabel : expandAllLabel}
                    </button>
                </div>

                <div className="mt-12">
                    {/* Top of the tree */}
                    <div className="flex justify-center">
                        <OrgPersonCard person={head} size="lg"/>
                    </div>
                    <div aria-hidden="true" className="mx-auto h-8 w-px bg-slate-300 dark:bg-slate-700"/>
                    {/* Horizontal connector between the three columns, only when they sit side by side */}
                    <div aria-hidden="true" className="relative hidden h-px md:block">
                        <span className="absolute inset-x-[16.666%] top-0 h-px bg-slate-300 dark:bg-slate-700"/>
                    </div>

                    <ul className="grid gap-8 md:grid-cols-3 md:gap-6">
                        {groups.map((dept) => {
                            const expanded = open.includes(dept.id);
                            const panelId = `${uid}-${dept.id}`;
                            return (
                                <li key={dept.id} className="flex flex-col items-center">
                                    <span aria-hidden="true" className="hidden h-8 w-px bg-slate-300 md:block dark:bg-slate-700"/>
                                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">{dept.name}</p>
                                    <OrgPersonCard person={dept.lead}/>

                                    <button type="button" aria-expanded={expanded} aria-controls={panelId} onClick={() => toggle(dept.id)}
                                            className="relative z-10 -mt-3 inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-600 shadow-sm outline-none transition-colors hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:text-white">
                                        {expanded ? "Hide" : "Show"} {dept.reports.length} reports
                                        <motion.span animate={{rotate: expanded ? 180 : 0}} transition={{duration: 0.2}} className="inline-flex">
                                            <LuChevronDown className="h-3.5 w-3.5"/>
                                        </motion.span>
                                    </button>

                                    <AnimatePresence initial={false}>
                                        {expanded && (
                                            <motion.div id={panelId}
                                                        initial={reduceMotion ? {opacity: 0} : {height: 0, opacity: 0}}
                                                        animate={reduceMotion ? {opacity: 1} : {height: "auto", opacity: 1}}
                                                        exit={reduceMotion ? {opacity: 0} : {height: 0, opacity: 0}}
                                                        transition={{duration: 0.28, ease: [0.22, 1, 0.36, 1]}}
                                                        className="w-full max-w-xs overflow-hidden">
                                                <ul className="ml-6 pb-1">
                                                    {dept.reports.map((person, i) => (
                                                        <motion.li key={person.name}
                                                                   initial={reduceMotion ? false : {opacity: 0, x: -8}}
                                                                   animate={{opacity: 1, x: 0}}
                                                                   transition={{delay: 0.05 + i * 0.05}}
                                                                   className="relative pl-5 pt-3">
                                                            <span aria-hidden="true"
                                                                  className={`absolute left-0 top-0 w-px bg-slate-300 dark:bg-slate-700 ${i === dept.reports.length - 1 ? "h-[calc(50%+0.375rem)]" : "h-full"}`}/>
                                                            <span aria-hidden="true" className="absolute left-0 top-[calc(50%+0.375rem)] h-px w-5 bg-slate-300 dark:bg-slate-700"/>
                                                            <OrgPersonCard person={person}/>
                                                        </motion.li>
                                                    ))}
                                                </ul>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </section>
    );
};

