import {useState} from "react";
import type {FocusEvent} from "react";
import {motion, useReducedMotion} from "framer-motion";

export interface Person {
    name: string;
    /** Second line in the tooltip, for example "Edited 4 min ago" or "Accepted". */
    detail: string;
}

export interface ExpandingStackProps {
    /** Accessible name for the list, for example "Attendees of design review". */
    label: string;
    people: Person[];
    /** Avatar diameter in pixels. */
    size?: number;
    className?: string;
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
export const ExpandingStack = ({label, people, size = 36, className = ""}: ExpandingStackProps) => {
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
            className={`relative shrink-0 ${className}`}
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
