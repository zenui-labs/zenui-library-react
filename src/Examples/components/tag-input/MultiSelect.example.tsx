import {useEffect, useId, useRef, useState} from "react";
import type {KeyboardEvent} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {LuCheck, LuChevronsUpDown, LuSearch, LuX} from "react-icons/lu";

interface Person {
    id: string;
    name: string;
    team: string;
}

const people: Person[] = [
    {id: "maya", name: "Maya Chen", team: "Design"},
    {id: "diego", name: "Diego Ramos", team: "Web"},
    {id: "priya", name: "Priya Nair", team: "Platform"},
    {id: "tom", name: "Tom Becker", team: "Platform"},
    {id: "aisha", name: "Aisha Bello", team: "Product"},
    {id: "lucas", name: "Lucas Moreau", team: "Mobile"},
    {id: "hana", name: "Hana Sato", team: "Data"},
    {id: "kofi", name: "Kofi Mensah", team: "Mobile"},
];

const MAX_CHIPS = 2;
const initials = (name: string) => name.split(" ").map((part) => part[0]).join("");

const Avatar = ({name}: {name: string}) => (
    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-[10px] font-semibold text-zinc-600 ring-1 ring-inset ring-zinc-950/5 dark:bg-zinc-800 dark:text-zinc-300 dark:ring-white/10" aria-hidden>
        {initials(name)}
    </span>
);

const MultiSelect = () => {
    const [selected, setSelected] = useState<string[]>(["maya", "priya", "lucas"]);
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [active, setActive] = useState(0);
    const rootRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const optionRefs = useRef<(HTMLLIElement | null)[]>([]);
    const labelId = useId();
    const listId = useId();
    const reduceMotion = useReducedMotion();

    const results = people.filter((person) => `${person.name} ${person.team}`.toLowerCase().includes(query.trim().toLowerCase()));
    const chosen = people.filter((person) => selected.includes(person.id));

    useEffect(() => {
        if (!open) return;
        const onPointerDown = (event: PointerEvent) => {
            if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
        };
        document.addEventListener("pointerdown", onPointerDown);
        return () => document.removeEventListener("pointerdown", onPointerDown);
    }, [open]);

    useEffect(() => {
        optionRefs.current[active]?.scrollIntoView({block: "nearest"});
    }, [active]);

    const toggle = (id: string) =>
        setSelected((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));

    const close = () => {
        setOpen(false);
        setQuery("");
        triggerRef.current?.focus();
    };

    const onSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        const count = results.length;
        if (event.key === "ArrowDown" && count) setActive((index) => (index + 1) % count);
        else if (event.key === "ArrowUp" && count) setActive((index) => (index - 1 + count) % count);
        else if (event.key === "Enter" && results[active]) toggle(results[active].id);
        else return;
        event.preventDefault();
    };

    return (
        <div
            ref={rootRef}
            className="relative w-full max-w-sm min-h-[380px]"
            onKeyDown={(event) => {
                if (open && event.key === "Escape") close();
            }}
            onBlur={(event) => {
                // Close when keyboard focus moves somewhere outside the picker.
                if (open && event.relatedTarget && !event.currentTarget.contains(event.relatedTarget)) {
                    setOpen(false);
                    setQuery("");
                }
            }}
        >
            <p id={labelId} className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Reviewers</p>
            <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">Everyone selected gets a review request.</p>

            <button
                ref={triggerRef}
                type="button"
                onClick={() => (open ? close() : setOpen(true))}
                onKeyDown={(event) => {
                    if (event.key === "ArrowDown") {
                        event.preventDefault();
                        setOpen(true);
                    }
                }}
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-labelledby={labelId}
                aria-describedby={`${labelId}-value`}
                className={`mt-2 flex min-h-11 w-full items-center gap-2 rounded-xl border bg-white px-2.5 py-1.5 text-left transition focus-visible:outline-none dark:bg-zinc-900 ${
                    open
                        ? "border-indigo-400 ring-4 ring-indigo-500/10 dark:border-indigo-400/60 dark:ring-indigo-400/10"
                        : "border-zinc-200 hover:border-zinc-300 focus-visible:border-indigo-400 focus-visible:ring-4 focus-visible:ring-indigo-500/10 dark:border-white/10 dark:hover:border-white/20"
                }`}
            >
                <span id={`${labelId}-value`} className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5">
                    {chosen.length === 0 && <span className="px-1 text-sm text-zinc-400 dark:text-zinc-500">Select people</span>}
                    {chosen.slice(0, MAX_CHIPS).map((person) => (
                        <span key={person.id} className="inline-flex h-7 items-center gap-1.5 rounded-full bg-zinc-100 pl-0.5 pr-2.5 text-xs font-medium text-zinc-700 dark:bg-white/[0.07] dark:text-zinc-200">
                            <Avatar name={person.name}/>
                            {person.name}
                        </span>
                    ))}
                    {chosen.length > MAX_CHIPS && (
                        <span className="inline-flex h-7 items-center rounded-full bg-indigo-50 px-2.5 text-xs font-medium text-indigo-700 dark:bg-indigo-400/10 dark:text-indigo-300">
                            +{chosen.length - MAX_CHIPS} more
                        </span>
                    )}
                </span>
                <LuChevronsUpDown className="size-4 shrink-0 text-zinc-400" aria-hidden/>
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        className="absolute inset-x-0 z-20 mt-1.5 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xl shadow-zinc-950/10 dark:border-white/10 dark:bg-zinc-900 dark:shadow-black/40"
                        initial={reduceMotion ? {opacity: 0} : {opacity: 0, y: -4, scale: 0.99}}
                        animate={{opacity: 1, y: 0, scale: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.14}}
                    >
                        <div className="relative border-b border-zinc-100 dark:border-white/[0.06]">
                            <LuSearch className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" aria-hidden/>
                            <input
                                autoFocus
                                value={query}
                                onChange={(event) => {
                                    setQuery(event.target.value);
                                    setActive(0);
                                }}
                                onKeyDown={onSearchKeyDown}
                                placeholder="Search people or teams"
                                role="combobox"
                                aria-label="Search reviewers"
                                aria-expanded="true"
                                aria-controls={listId}
                                aria-autocomplete="list"
                                aria-activedescendant={results[active] ? `${listId}-${results[active].id}` : undefined}
                                className="h-10 w-full bg-transparent pl-9 pr-3 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-100 dark:placeholder:text-zinc-500"
                            />
                        </div>
                        <ul id={listId} role="listbox" aria-multiselectable="true" aria-labelledby={labelId} className="max-h-52 overflow-y-auto p-1">
                            {results.map((person, index) => {
                                const isSelected = selected.includes(person.id);
                                return (
                                    <li
                                        key={person.id}
                                        ref={(node) => {
                                            optionRefs.current[index] = node;
                                        }}
                                        id={`${listId}-${person.id}`}
                                        role="option"
                                        aria-selected={isSelected}
                                        onMouseDown={(event) => event.preventDefault()}
                                        onClick={() => toggle(person.id)}
                                        onMouseMove={() => setActive(index)}
                                        className={`flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm ${
                                            index === active ? "bg-zinc-100 dark:bg-white/[0.07]" : ""
                                        }`}
                                    >
                                        <span
                                            className={`flex size-4 shrink-0 items-center justify-center rounded border transition-colors ${
                                                isSelected
                                                    ? "border-indigo-500 bg-indigo-500 text-white dark:border-indigo-400 dark:bg-indigo-400 dark:text-zinc-900"
                                                    : "border-zinc-300 bg-white dark:border-zinc-600 dark:bg-transparent"
                                            }`}
                                            aria-hidden
                                        >
                                            {isSelected && <LuCheck className="size-3"/>}
                                        </span>
                                        <Avatar name={person.name}/>
                                        <span className="flex-1 truncate text-zinc-800 dark:text-zinc-100">{person.name}</span>
                                        <span className="text-xs text-zinc-400 dark:text-zinc-500">{person.team}</span>
                                    </li>
                                );
                            })}
                            {results.length === 0 && (
                                <li className="px-3 py-8 text-center text-sm text-zinc-500 dark:text-zinc-400">No one matches “{query.trim()}”</li>
                            )}
                        </ul>
                        <div className="flex items-center justify-between border-t border-zinc-100 px-2 py-1.5 dark:border-white/[0.06]">
                            <button
                                type="button"
                                onClick={() => setSelected([])}
                                disabled={selected.length === 0}
                                className="flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 disabled:pointer-events-none disabled:opacity-40 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-zinc-100"
                            >
                                <LuX className="size-3.5" aria-hidden/>
                                Clear
                            </button>
                            <span className="text-xs tabular-nums text-zinc-400 dark:text-zinc-500" aria-live="polite">{selected.length} selected</span>
                            <button
                                type="button"
                                onClick={close}
                                className="rounded-md bg-zinc-900 px-2.5 py-1 text-xs font-medium text-white transition hover:bg-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 focus-visible:ring-offset-1 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus-visible:ring-offset-zinc-900"
                            >
                                Done
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MultiSelect;
