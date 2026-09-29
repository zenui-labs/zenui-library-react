import {useId, useRef, useState} from "react";
import type {KeyboardEvent} from "react";
import {motion, useReducedMotion} from "framer-motion";
import type {IconType} from "react-icons";
import {LuCalendarDays, LuGanttChart, LuKanban, LuLayoutList} from "react-icons/lu";

interface SegmentOption<T extends string> {
    value: T;
    label: string;
    icon?: IconType;
}

interface SegmentedControlProps<T extends string> {
    label: string;
    options: SegmentOption<T>[];
    value: T;
    onChange: (value: T) => void;
    size?: "sm" | "md";
}

// A radio group styled as a segmented control. Arrow keys move the selection, Home and End jump to the ends.
const SegmentedControl = <T extends string>({label, options, value, onChange, size = "md"}: SegmentedControlProps<T>) => {
    const id = useId();
    const reduceMotion = useReducedMotion();
    const buttons = useRef<(HTMLButtonElement | null)[]>([]);

    const select = (index: number) => {
        const next = (index + options.length) % options.length;
        onChange(options[next].value);
        buttons.current[next]?.focus();
    };

    const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
        const keys: Record<string, number> = {
            ArrowRight: index + 1,
            ArrowDown: index + 1,
            ArrowLeft: index - 1,
            ArrowUp: index - 1,
            Home: 0,
            End: options.length - 1,
        };
        if (!(event.key in keys)) return;
        event.preventDefault();
        select(keys[event.key]);
    };

    return (
        <div
            role="radiogroup"
            aria-label={label}
            className="inline-flex rounded-xl bg-zinc-100 p-1 ring-1 ring-inset ring-zinc-200/70 dark:bg-white/[0.04] dark:ring-white/[0.06]"
        >
            {options.map((option, index) => {
                const checked = option.value === value;
                const Icon = option.icon;
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
                        onClick={() => onChange(option.value)}
                        onKeyDown={(event) => onKeyDown(event, index)}
                        className={`relative flex items-center justify-center gap-2 rounded-lg font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500/70 ${
                            size === "sm" ? "h-7 px-3 text-xs" : "h-9 px-3.5 text-sm"
                        } ${checked ? "text-zinc-900 dark:text-white" : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"}`}
                    >
                        {checked && (
                            <motion.span
                                layoutId={`${id}-indicator`}
                                className="absolute inset-0 rounded-lg bg-white shadow-sm shadow-zinc-950/10 ring-1 ring-zinc-950/5 dark:bg-zinc-700/80 dark:shadow-black/40 dark:ring-white/10"
                                transition={reduceMotion ? {duration: 0} : {type: "spring", stiffness: 500, damping: 38}}
                            />
                        )}
                        {Icon && <Icon className={`relative ${size === "sm" ? "size-3.5" : "size-4"}`} aria-hidden/>}
                        <span className={Icon ? "sr-only sm:not-sr-only sm:relative" : "relative"}>{option.label}</span>
                    </button>
                );
            })}
        </div>
    );
};

type View = "board" | "list" | "calendar" | "timeline";
type Scope = "mine" | "team" | "all";

const views: SegmentOption<View>[] = [
    {value: "board", label: "Board", icon: LuKanban},
    {value: "list", label: "List", icon: LuLayoutList},
    {value: "calendar", label: "Calendar", icon: LuCalendarDays},
    {value: "timeline", label: "Timeline", icon: LuGanttChart},
];

const scopes: SegmentOption<Scope>[] = [
    {value: "mine", label: "Assigned to me"},
    {value: "team", label: "My team"},
    {value: "all", label: "Everyone"},
];

const issueCount: Record<Scope, number> = {mine: 8, team: 31, all: 142};

const ViewSwitcher = () => {
    const [view, setView] = useState<View>("board");
    const [scope, setScope] = useState<Scope>("team");

    return (
        <div className="flex w-full max-w-2xl flex-col items-center gap-5">
            <SegmentedControl label="Layout" options={views} value={view} onChange={(next) => setView(next)}/>
            <SegmentedControl label="Show issues" options={scopes} value={scope} onChange={(next) => setScope(next)} size="sm"/>
            <p className="text-sm text-zinc-500 dark:text-zinc-400" aria-live="polite">
                Showing <span className="font-medium tabular-nums text-zinc-900 dark:text-zinc-100">{issueCount[scope]} issues</span> as a{" "}
                <span className="font-medium text-zinc-900 dark:text-zinc-100">{view}</span>
            </p>
        </div>
    );
};

export default ViewSwitcher;
