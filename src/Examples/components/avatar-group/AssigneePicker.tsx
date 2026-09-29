import {useEffect, useId, useMemo, useRef, useState} from "react";
import type {KeyboardEvent} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {LuCheck, LuChevronDown, LuSearch, LuUserPlus} from "react-icons/lu";

export interface Person {
    id: string;
    name: string;
    role: string;
}

const gradients = ["from-rose-400 to-orange-400", "from-sky-400 to-indigo-500", "from-emerald-400 to-teal-500", "from-violet-400 to-fuchsia-500", "from-amber-400 to-rose-500", "from-cyan-400 to-blue-500"];
const gradientFor = (name: string) => gradients[[...name].reduce((sum, char) => sum + char.charCodeAt(0), 0) % gradients.length];
const initials = (name: string) => name.split(" ").map((part) => part[0]).join("").slice(0, 2);

export interface AssigneePickerProps {
    /** Everyone who can be assigned. */
    people: Person[];
    /** Selected person ids, when you control the selection from the parent. */
    value?: string[];
    defaultValue?: string[];
    onChange?: (ids: string[]) => void;
    /** Small line above the title, for example an issue key. */
    eyebrow?: string;
    title?: string;
    label?: string;
    /** Summary text when no one is assigned. */
    placeholder?: string;
    searchPlaceholder?: string;
    clearLabel?: string;
    /** Avatars shown in the field before the rest collapse into a count. */
    maxVisible?: number;
    className?: string;
}

/** A field that shows assignees as a stack and opens a searchable multi-select list. */
export const AssigneePicker = ({
    people,
    value,
    defaultValue = [],
    onChange,
    eyebrow,
    title,
    label = "Assignees",
    placeholder = "Unassigned",
    searchPlaceholder = "Search people",
    clearLabel = "Clear all",
    maxVisible = 3,
    className = "",
}: AssigneePickerProps) => {
    const [internalSelected, setInternalSelected] = useState<string[]>(defaultValue);
    const selected = value ?? internalSelected;
    const setSelected = (next: string[]) => {
        if (value === undefined) setInternalSelected(next);
        onChange?.(next);
    };
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [active, setActive] = useState(0);
    const rootRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const reduceMotion = useReducedMotion();
    const listId = useId();

    const chosen = people.filter((person) => selected.includes(person.id));
    const visible = chosen.slice(0, maxVisible);
    const overflow = chosen.length - visible.length;

    const results = useMemo(() => {
        const needle = query.trim().toLowerCase();
        return people.filter((person) => `${person.name} ${person.role}`.toLowerCase().includes(needle));
    }, [people, query]);

    useEffect(() => {
        if (!open) return;
        setQuery("");
        setActive(0);
        inputRef.current?.focus();
        const onPointerDown = (event: PointerEvent) => {
            if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
        };
        document.addEventListener("pointerdown", onPointerDown);
        return () => document.removeEventListener("pointerdown", onPointerDown);
    }, [open]);

    const toggle = (id: string) => {
        setSelected(selected.includes(id) ? selected.filter((item) => item !== id) : [...selected, id]);
    };

    const close = () => {
        setOpen(false);
        triggerRef.current?.focus();
    };

    const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        const count = results.length;
        if (event.key === "ArrowDown" && count) {
            event.preventDefault();
            setActive((index) => (index + 1) % count);
        } else if (event.key === "ArrowUp" && count) {
            event.preventDefault();
            setActive((index) => (index - 1 + count) % count);
        } else if (event.key === "Enter" && results[active]) {
            event.preventDefault();
            toggle(results[active].id);
        } else if (event.key === "Escape") {
            event.preventDefault();
            close();
        }
    };

    const summary = chosen.length === 0 ? placeholder : chosen.length === 1 ? chosen[0].name : `${chosen.length} assignees`;

    return (
        <div className={`w-full max-w-sm rounded-2xl border border-zinc-200 bg-white p-5 dark:border-white/10 dark:bg-zinc-900 ${className}`}>
            {eyebrow && <p className="text-xs text-zinc-500 dark:text-zinc-400">{eyebrow}</p>}
            {title && <p className="mt-0.5 text-sm font-medium text-zinc-900 dark:text-zinc-100">{title}</p>}

            {/* Closes when focus moves outside the picker, for example with Tab. */}
            <div
                ref={rootRef}
                className={`relative ${eyebrow || title ? "mt-5" : ""}`}
                onBlur={(event) => {
                    if (open && !event.currentTarget.contains(event.relatedTarget as Node | null)) setOpen(false);
                }}
            >
                <p id={`${listId}-label`} className="mb-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                    {label}
                </p>
                <button
                    ref={triggerRef}
                    type="button"
                    onClick={() => setOpen((value) => !value)}
                    aria-haspopup="listbox"
                    aria-expanded={open}
                    aria-labelledby={`${listId}-label ${listId}-summary`}
                    className="flex w-full items-center gap-3 rounded-xl border border-zinc-200 bg-white px-2.5 py-2 text-left transition hover:border-zinc-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 dark:border-white/10 dark:bg-white/[0.02] dark:hover:border-white/20"
                >
                    {chosen.length ? (
                        <span className="flex -space-x-2" aria-hidden>
                            <AnimatePresence initial={false} mode="popLayout">
                                {visible.map((person, index) => (
                                    <motion.span
                                        key={person.id}
                                        layout={!reduceMotion}
                                        initial={reduceMotion ? {opacity: 0} : {opacity: 0, scale: 0.5}}
                                        animate={{opacity: 1, scale: 1}}
                                        exit={reduceMotion ? {opacity: 0} : {opacity: 0, scale: 0.5}}
                                        transition={{type: "spring", stiffness: 500, damping: 30}}
                                        style={{zIndex: maxVisible - index}}
                                        className={`relative flex size-7 items-center justify-center rounded-full bg-gradient-to-br text-[10px] font-semibold text-white ring-2 ring-white dark:ring-zinc-900 ${gradientFor(person.name)}`}
                                    >
                                        {initials(person.name)}
                                    </motion.span>
                                ))}
                                {overflow > 0 && (
                                    <motion.span
                                        key="overflow"
                                        layout={!reduceMotion}
                                        initial={{opacity: 0}}
                                        animate={{opacity: 1}}
                                        exit={{opacity: 0}}
                                        className="relative flex size-7 items-center justify-center rounded-full bg-zinc-100 text-[10px] font-semibold text-zinc-600 ring-2 ring-white dark:bg-zinc-800 dark:text-zinc-300 dark:ring-zinc-900"
                                    >
                                        +{overflow}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </span>
                    ) : (
                        <span className="flex size-7 items-center justify-center rounded-full border border-dashed border-zinc-300 text-zinc-400 dark:border-zinc-600" aria-hidden>
                            <LuUserPlus className="size-3.5"/>
                        </span>
                    )}
                    <span id={`${listId}-summary`} className="min-w-0 flex-1 truncate text-sm text-zinc-700 dark:text-zinc-200">
                        {summary}
                    </span>
                    <LuChevronDown className={`size-4 shrink-0 text-zinc-400 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden/>
                </button>

                <AnimatePresence>
                    {open && (
                        <motion.div
                            className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xl shadow-zinc-950/10 dark:border-white/10 dark:bg-zinc-900 dark:shadow-black/50"
                            initial={reduceMotion ? {opacity: 0} : {opacity: 0, y: -4, scale: 0.98}}
                            animate={{opacity: 1, y: 0, scale: 1}}
                            exit={{opacity: 0}}
                            transition={{duration: 0.14}}
                            style={{transformOrigin: "top"}}
                        >
                            <div className="relative border-b border-zinc-100 dark:border-white/[0.06]">
                                <LuSearch className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" aria-hidden/>
                                <input
                                    ref={inputRef}
                                    value={query}
                                    onChange={(event) => {
                                        setQuery(event.target.value);
                                        setActive(0);
                                    }}
                                    onKeyDown={onKeyDown}
                                    placeholder={searchPlaceholder}
                                    aria-label={searchPlaceholder}
                                    role="combobox"
                                    aria-expanded="true"
                                    aria-controls={listId}
                                    aria-autocomplete="list"
                                    aria-activedescendant={results[active] ? `${listId}-${results[active].id}` : undefined}
                                    className="h-10 w-full bg-transparent pl-9 pr-3 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-100 dark:placeholder:text-zinc-500"
                                />
                            </div>
                            <ul id={listId} role="listbox" aria-label="People" aria-multiselectable="true" className="max-h-60 overflow-y-auto p-1">
                                {results.map((person, index) => {
                                    const isSelected = selected.includes(person.id);
                                    return (
                                        <li
                                            key={person.id}
                                            id={`${listId}-${person.id}`}
                                            role="option"
                                            aria-selected={isSelected}
                                            onMouseMove={() => setActive(index)}
                                            onMouseDown={(event) => event.preventDefault()}
                                            onClick={() => toggle(person.id)}
                                            className={`flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 ${index === active ? "bg-zinc-100 dark:bg-white/[0.06]" : ""}`}
                                        >
                                            <span className={`flex size-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br text-[10px] font-semibold text-white ${gradientFor(person.name)}`} aria-hidden>
                                                {initials(person.name)}
                                            </span>
                                            <span className="min-w-0 flex-1">
                                                <span className="block truncate text-sm text-zinc-900 dark:text-zinc-100">{person.name}</span>
                                                <span className="block truncate text-xs text-zinc-500 dark:text-zinc-400">{person.role}</span>
                                            </span>
                                            <span
                                                className={`flex size-4 shrink-0 items-center justify-center rounded border transition-colors ${
                                                    isSelected ? "border-indigo-600 bg-indigo-600 text-white dark:border-indigo-400 dark:bg-indigo-400 dark:text-zinc-900" : "border-zinc-300 dark:border-zinc-600"
                                                }`}
                                                aria-hidden
                                            >
                                                {isSelected && <LuCheck className="size-3" strokeWidth={3}/>}
                                            </span>
                                        </li>
                                    );
                                })}
                            </ul>
                            {results.length === 0 && <p className="px-3 py-6 text-center text-sm text-zinc-500 dark:text-zinc-400">No one matches “{query.trim()}”</p>}
                            <div className="flex items-center justify-between border-t border-zinc-100 px-3 py-2 text-xs text-zinc-500 dark:border-white/[0.06] dark:text-zinc-400">
                                <span aria-live="polite">{chosen.length} selected</span>
                                {chosen.length > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => setSelected([])}
                                        className="rounded px-1 font-medium text-zinc-600 transition hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 dark:text-zinc-300 dark:hover:text-white"
                                    >
                                        {clearLabel}
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
