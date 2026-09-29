import {useState} from "react";
import type {FocusEvent} from "react";
import {motion, useReducedMotion} from "framer-motion";
import {LuFileText, LuVideo} from "react-icons/lu";

interface Person {
    name: string;
    detail: string;
}

interface ExpandingStackProps {
    label: string;
    people: Person[];
    size?: number;
}

const gradients = [
    "from-rose-400 to-orange-400",
    "from-sky-400 to-indigo-500",
    "from-emerald-400 to-teal-500",
    "from-violet-400 to-fuchsia-500",
    "from-amber-400 to-rose-500",
    "from-cyan-400 to-blue-500",
];

const gradientFor = (name: string) => gradients[[...name].reduce((sum, char) => sum + char.charCodeAt(0), 0) % gradients.length];
const initials = (name: string) => name.split(" ").map((part) => part[0]).join("").slice(0, 2);

// Avatars overlap at rest and fan out on hover or keyboard focus, so every name becomes reachable.
const ExpandingStack = ({label, people, size = 36}: ExpandingStackProps) => {
    const [expanded, setExpanded] = useState(false);
    const reduceMotion = useReducedMotion();
    const collapsedStep = size * 0.55;
    const expandedStep = size + 6;
    const step = expanded ? expandedStep : collapsedStep;
    const spring = reduceMotion ? {duration: 0} : {type: "spring" as const, stiffness: 420, damping: 32};

    const onBlur = (event: FocusEvent<HTMLUListElement>) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setExpanded(false);
    };

    return (
        <motion.ul
            aria-label={label}
            className="relative shrink-0"
            style={{height: size}}
            initial={false}
            animate={{width: (people.length - 1) * step + size}}
            transition={spring}
            onMouseEnter={() => setExpanded(true)}
            onMouseLeave={() => setExpanded(false)}
            onFocus={() => setExpanded(true)}
            onBlur={onBlur}
        >
            {people.map((person, index) => (
                <motion.li
                    key={person.name}
                    className="absolute left-0 top-0"
                    style={{zIndex: people.length - index}}
                    initial={false}
                    animate={{x: index * step}}
                    transition={spring}
                >
                    <button
                        type="button"
                        aria-label={`${person.name}, ${person.detail}`}
                        className="group relative block rounded-full outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-900"
                    >
                        <span
                            className={`flex items-center justify-center rounded-full bg-gradient-to-br font-semibold text-white ring-2 ring-white transition-transform duration-200 group-hover:-translate-y-0.5 dark:ring-zinc-900 ${gradientFor(person.name)}`}
                            style={{width: size, height: size, fontSize: size * 0.33}}
                            aria-hidden
                        >
                            {initials(person.name)}
                        </span>
                        <span
                            className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-zinc-900 px-2.5 py-1.5 text-left opacity-0 shadow-lg transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 dark:bg-white"
                            aria-hidden
                        >
                            <span className="block text-xs font-medium text-white dark:text-zinc-900">{person.name}</span>
                            <span className="block text-[11px] text-zinc-400 dark:text-zinc-500">{person.detail}</span>
                        </span>
                    </button>
                </motion.li>
            ))}
        </motion.ul>
    );
};

const editors: Person[] = [
    {name: "Maya Chen", detail: "Edited 4 min ago"},
    {name: "Diego Ramos", detail: "Edited 1 hour ago"},
    {name: "Aisha Bello", detail: "Edited yesterday"},
    {name: "Hana Sato", detail: "Commented yesterday"},
    {name: "Tom Becker", detail: "Viewed Sep 24"},
];

const attendees: Person[] = [
    {name: "Priya Nair", detail: "Organizer"},
    {name: "Lucas Moreau", detail: "Accepted"},
    {name: "Sofia Rossi", detail: "Accepted"},
    {name: "Kofi Mensah", detail: "Maybe"},
];

const ExpandingStackExample = () => (
    <div className="w-full max-w-md divide-y divide-zinc-100 rounded-2xl border border-zinc-200 bg-white dark:divide-white/[0.06] dark:border-white/10 dark:bg-zinc-900">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3 p-5">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-300" aria-hidden>
                <LuFileText className="size-5"/>
            </span>
            <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">Q4 launch plan</p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">5 contributors</p>
            </div>
            <div className="basis-full pl-14 sm:basis-auto sm:pl-0">
                <ExpandingStack label="Contributors to Q4 launch plan" people={editors} size={32}/>
            </div>
        </div>
        <div className="p-5">
            <div className="flex items-center gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-400/10 dark:text-emerald-300" aria-hidden>
                    <LuVideo className="size-5"/>
                </span>
                <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">Design review</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Thursday, 2:00 to 2:45 PM</p>
                </div>
            </div>
            <div className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-zinc-50 p-3 dark:bg-white/[0.03]">
                <ExpandingStack label="Attendees of design review" people={attendees} size={40}/>
                <span className="hidden text-xs text-zinc-500 sm:inline dark:text-zinc-400">Hover or tab to see names</span>
            </div>
        </div>
    </div>
);

export default ExpandingStackExample;
