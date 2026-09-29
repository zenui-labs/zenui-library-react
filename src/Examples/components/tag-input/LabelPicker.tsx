import {useEffect, useId, useRef, useState} from "react";
import type {KeyboardEvent} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {LuCheck, LuPlus, LuSearch, LuSettings2} from "react-icons/lu";

export type LabelColor = "gray" | "red" | "orange" | "yellow" | "green" | "teal" | "blue" | "violet";

export interface Label {
    name: string;
    color: LabelColor;
    /** Short line shown under the name in the picker. */
    description?: string;
}

/** A read only row under the labels, like assignee or milestone. */
export interface LabelPickerDetail {
    label: string;
    value: string;
}

export interface LabelPickerProps {
    /** Labels that can be applied. */
    labels: Label[];
    /** Names of the applied labels. Pass it with `onChange` to control the picker. */
    value?: string[];
    defaultValue?: string[];
    onChange?: (names: string[]) => void;
    /** Called when someone creates a label from the filter text. */
    onCreate?: (label: Label) => void;
    /** Rows shown under the labels, such as assignee and milestone. */
    details?: LabelPickerDetail[];
    heading?: string;
    searchPlaceholder?: string;
    /** Shown when no label is applied. */
    emptyText?: string;
    /** Shown when the filter matches nothing. */
    noResultsText?: string;
    className?: string;
}

const palette: Record<LabelColor, {dot: string; chip: string}> = {
    gray: {dot: "bg-zinc-400", chip: "bg-zinc-100 text-zinc-700 ring-zinc-500/20 dark:bg-zinc-400/10 dark:text-zinc-300 dark:ring-zinc-400/25"},
    red: {dot: "bg-red-500", chip: "bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-400/10 dark:text-red-300 dark:ring-red-400/25"},
    orange: {dot: "bg-orange-500", chip: "bg-orange-50 text-orange-700 ring-orange-600/20 dark:bg-orange-400/10 dark:text-orange-300 dark:ring-orange-400/25"},
    yellow: {dot: "bg-yellow-400", chip: "bg-yellow-50 text-yellow-800 ring-yellow-600/25 dark:bg-yellow-400/10 dark:text-yellow-200 dark:ring-yellow-400/25"},
    green: {dot: "bg-green-500", chip: "bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-400/10 dark:text-green-300 dark:ring-green-400/25"},
    teal: {dot: "bg-teal-500", chip: "bg-teal-50 text-teal-700 ring-teal-600/20 dark:bg-teal-400/10 dark:text-teal-300 dark:ring-teal-400/25"},
    blue: {dot: "bg-blue-500", chip: "bg-blue-50 text-blue-700 ring-blue-600/20 dark:bg-blue-400/10 dark:text-blue-300 dark:ring-blue-400/25"},
    violet: {dot: "bg-violet-500", chip: "bg-violet-50 text-violet-700 ring-violet-600/20 dark:bg-violet-400/10 dark:text-violet-300 dark:ring-violet-400/25"},
};

const colors = Object.keys(palette) as LabelColor[];

/** An issue sidebar section that applies colored labels from a filterable popover, and creates new ones. */
export const LabelPicker = ({
    labels: labelsProp,
    value,
    defaultValue = [],
    onChange,
    onCreate,
    details = [],
    heading = "Labels",
    searchPlaceholder = "Filter or create labels",
    emptyText = "None yet",
    noResultsText = "No labels",
    className = "",
}: LabelPickerProps) => {
    const [created, setCreated] = useState<Label[]>([]);
    // Created labels stay listed until the parent adds them to `labels`.
    const labels = [...labelsProp, ...created.filter((label) => !labelsProp.some((item) => item.name === label.name))];
    const [innerApplied, setInnerApplied] = useState<string[]>(defaultValue);
    const applied = value ?? innerApplied;
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [active, setActive] = useState(0);
    const [newColor, setNewColor] = useState<LabelColor>("teal");
    const triggerRef = useRef<HTMLButtonElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const searchRef = useRef<HTMLInputElement>(null);
    const id = useId();
    const reduceMotion = useReducedMotion();

    const needle = query.trim().toLowerCase();
    const visible = labels.filter((label) => label.name.includes(needle));
    const canCreate = needle.length > 0 && !labels.some((label) => label.name === needle);
    const rowCount = visible.length + (canCreate ? 1 : 0);

    useEffect(() => {
        if (!open) return;
        searchRef.current?.focus();
        const onPointerDown = (event: PointerEvent) => {
            const target = event.target as Node;
            if (!panelRef.current?.contains(target) && !triggerRef.current?.contains(target)) setOpen(false);
        };
        document.addEventListener("pointerdown", onPointerDown);
        return () => document.removeEventListener("pointerdown", onPointerDown);
    }, [open]);

    const close = () => {
        setOpen(false);
        setQuery("");
        triggerRef.current?.focus();
    };

    const setApplied = (next: string[]) => {
        if (value === undefined) setInnerApplied(next);
        onChange?.(next);
    };

    const toggle = (name: string) => setApplied(applied.includes(name) ? applied.filter((item) => item !== name) : [...applied, name]);

    const create = () => {
        const label: Label = {name: needle, color: newColor};
        setCreated((current) => [...current, label]);
        onCreate?.(label);
        setApplied([...applied, needle]);
        setQuery("");
        setActive(0);
        setNewColor(colors[(colors.indexOf(newColor) + 3) % colors.length]);
    };

    const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Escape") {
            event.preventDefault();
            close();
            return;
        }
        // The color radios keep their own arrow key behavior.
        if (event.target !== searchRef.current) return;
        if (event.key === "ArrowDown") {
            event.preventDefault();
            setActive((index) => (index + 1) % Math.max(rowCount, 1));
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            setActive((index) => (index - 1 + rowCount) % Math.max(rowCount, 1));
        } else if (event.key === "Enter") {
            event.preventDefault();
            if (active < visible.length) toggle(visible[active].name);
            else if (canCreate) create();
        }
    };

    const appliedLabels = applied.map((name) => labels.find((label) => label.name === name)).filter((label): label is Label => Boolean(label));

    return (
        <div className={`w-full max-w-xs min-h-[440px] ${className}`}>
            <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-white/10 dark:bg-zinc-900">
                <div className="relative">
                    <button
                        ref={triggerRef}
                        type="button"
                        onClick={() => (open ? close() : setOpen(true))}
                        aria-expanded={open}
                        aria-haspopup="dialog"
                        className="group -mx-1.5 flex w-[calc(100%+0.75rem)] items-center justify-between rounded-md px-1.5 py-1 text-xs font-semibold text-zinc-500 transition hover:text-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 dark:text-zinc-400 dark:hover:text-indigo-300"
                    >
                        {heading}
                        <LuSettings2 className="size-4" aria-hidden/>
                    </button>

                    <AnimatePresence>
                        {open && (
                            <motion.div
                                ref={panelRef}
                                role="dialog"
                                aria-label="Apply labels"
                                onKeyDown={onKeyDown}
                                className="absolute right-0 top-full z-30 mt-2 w-72 max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-2xl shadow-zinc-950/15 dark:border-white/10 dark:bg-zinc-900 dark:shadow-black/50"
                                initial={reduceMotion ? {opacity: 0} : {opacity: 0, scale: 0.97, y: -4}}
                                animate={{opacity: 1, scale: 1, y: 0}}
                                exit={reduceMotion ? {opacity: 0} : {opacity: 0, scale: 0.97, y: -4}}
                                transition={{duration: 0.14, ease: [0.16, 1, 0.3, 1]}}
                                style={{transformOrigin: "top right"}}
                            >
                                <div className="border-b border-zinc-100 p-2 dark:border-white/[0.06]">
                                    <div className="flex h-8 items-center gap-2 rounded-lg border border-zinc-200 px-2 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-500/15 dark:border-white/10 dark:focus-within:border-indigo-400/60">
                                        <LuSearch className="size-3.5 text-zinc-400" aria-hidden/>
                                        <input
                                            ref={searchRef}
                                            value={query}
                                            onChange={(event) => {
                                                setQuery(event.target.value);
                                                setActive(0);
                                            }}
                                            placeholder={searchPlaceholder}
                                            aria-label="Filter labels"
                                            aria-controls={`${id}-list`}
                                            aria-activedescendant={rowCount ? `${id}-${active}` : undefined}
                                            className="h-full min-w-0 flex-1 bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-100"
                                        />
                                    </div>
                                </div>
                                <ul id={`${id}-list`} role="listbox" aria-multiselectable="true" aria-label="Labels" className="max-h-64 overflow-y-auto p-1">
                                    {visible.map((label, index) => {
                                        const isApplied = applied.includes(label.name);
                                        return (
                                            <li
                                                key={label.name}
                                                id={`${id}-${index}`}
                                                role="option"
                                                aria-selected={isApplied}
                                                onClick={() => toggle(label.name)}
                                                onMouseMove={() => setActive(index)}
                                                className={`flex cursor-pointer items-start gap-2.5 rounded-lg px-2 py-2 ${index === active ? "bg-zinc-100 dark:bg-white/[0.07]" : ""}`}
                                            >
                                                <span className={`mt-0.5 flex size-4 shrink-0 items-center justify-center ${isApplied ? "text-indigo-600 dark:text-indigo-400" : "text-transparent"}`} aria-hidden>
                                                    <LuCheck className="size-4"/>
                                                </span>
                                                <span className={`mt-1 size-3 shrink-0 rounded-full ${palette[label.color].dot}`} aria-hidden/>
                                                <span className="min-w-0">
                                                    <span className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">{label.name}</span>
                                                    {label.description && <span className="block truncate text-xs text-zinc-500 dark:text-zinc-400">{label.description}</span>}
                                                </span>
                                            </li>
                                        );
                                    })}
                                    {canCreate && (
                                        <li
                                            id={`${id}-${visible.length}`}
                                            role="option"
                                            aria-selected={false}
                                            onClick={create}
                                            onMouseMove={() => setActive(visible.length)}
                                            className={`flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-2 text-sm ${active === visible.length ? "bg-zinc-100 dark:bg-white/[0.07]" : ""}`}
                                        >
                                            <LuPlus className="size-4 shrink-0 text-zinc-400" aria-hidden/>
                                            <span className="text-zinc-600 dark:text-zinc-300">Create</span>
                                            <span className={`inline-flex h-6 items-center rounded-full px-2 text-xs font-medium ring-1 ring-inset ${palette[newColor].chip}`}>{needle}</span>
                                        </li>
                                    )}
                                    {rowCount === 0 && <li className="px-3 py-6 text-center text-sm text-zinc-500 dark:text-zinc-400">{noResultsText}</li>}
                                </ul>
                                {canCreate && (
                                    <fieldset className="border-t border-zinc-100 px-3 py-2.5 dark:border-white/[0.06]">
                                        <legend className="sr-only">Color for the new label</legend>
                                        <div className="flex items-center justify-between gap-1">
                                            {colors.map((color) => (
                                                <label key={color} className="relative flex size-7 cursor-pointer items-center justify-center">
                                                    <input
                                                        type="radio"
                                                        name={`${id}-color`}
                                                        value={color}
                                                        checked={newColor === color}
                                                        onChange={() => setNewColor(color)}
                                                        aria-label={color}
                                                        className="peer sr-only"
                                                    />
                                                    <span
                                                        className={`size-5 rounded-full ring-offset-2 ring-offset-white transition peer-checked:ring-2 peer-checked:ring-zinc-900 peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-500 dark:ring-offset-zinc-900 dark:peer-checked:ring-white ${palette[color].dot}`}
                                                        aria-hidden
                                                    />
                                                </label>
                                            ))}
                                        </div>
                                    </fieldset>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <ul className="mt-2 flex min-h-7 flex-wrap gap-1.5" aria-label="Applied labels">
                    <AnimatePresence initial={false}>
                        {appliedLabels.length === 0 && (
                            <motion.li key="empty" className="text-xs text-zinc-400 dark:text-zinc-500" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                                {emptyText}
                            </motion.li>
                        )}
                        {appliedLabels.map((label) => (
                            <motion.li
                                key={label.name}
                                layout={!reduceMotion}
                                initial={reduceMotion ? {opacity: 0} : {opacity: 0, scale: 0.85}}
                                animate={{opacity: 1, scale: 1}}
                                exit={{opacity: 0, scale: reduceMotion ? 1 : 0.85}}
                                transition={{type: "spring", stiffness: 500, damping: 32}}
                                className={`inline-flex h-6 items-center gap-1.5 rounded-full px-2.5 text-xs font-medium ring-1 ring-inset ${palette[label.color].chip}`}
                            >
                                <span className={`size-1.5 rounded-full ${palette[label.color].dot}`} aria-hidden/>
                                {label.name}
                            </motion.li>
                        ))}
                    </AnimatePresence>
                </ul>

                {details.length > 0 && (
                    <div className="mt-4 space-y-3 border-t border-zinc-100 pt-4 text-xs dark:border-white/[0.06]">
                        {details.map((detail) => (
                            <div key={detail.label} className="flex justify-between">
                                <span className="text-zinc-500 dark:text-zinc-400">{detail.label}</span>
                                <span className="text-zinc-800 dark:text-zinc-200">{detail.value}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
