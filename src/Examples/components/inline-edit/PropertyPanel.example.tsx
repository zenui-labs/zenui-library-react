import {useEffect, useId, useRef, useState} from "react";
import type {FormEvent, KeyboardEvent, ReactNode} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {LuCalendar, LuCheck, LuCircleDot, LuUser, LuWallet} from "react-icons/lu";

type Status = "Not started" | "In progress" | "Blocked" | "Done";
type Currency = "USD" | "EUR" | "GBP" | "JPY";

interface Option<T extends string> {
    value: T;
    label: string;
    adornment: ReactNode;
}

const statusOptions: Option<Status>[] = [
    {value: "Not started", label: "Not started", adornment: <span className="size-2 rounded-full bg-zinc-400"/>},
    {value: "In progress", label: "In progress", adornment: <span className="size-2 rounded-full bg-sky-500"/>},
    {value: "Blocked", label: "Blocked", adornment: <span className="size-2 rounded-full bg-rose-500"/>},
    {value: "Done", label: "Done", adornment: <span className="size-2 rounded-full bg-emerald-500"/>},
];

const people = ["Ava Lindqvist", "Jonah Reyes", "Mei Watanabe", "Tariq Aziz"] as const;
type Person = (typeof people)[number];

const Avatar = ({name}: {name: string}) => (
    <span className="flex size-5 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-500 text-[9px] font-semibold text-white">
        {name.split(" ").map((part) => part[0]).join("")}
    </span>
);

const ownerOptions: Option<Person>[] = people.map((name) => ({value: name, label: name, adornment: <Avatar name={name}/>}));

const toInputDate = (date: Date) => {
    const offset = date.getTimezoneOffset() * 60_000;
    return new Date(date.getTime() - offset).toISOString().slice(0, 10);
};

const describeDate = (value: string) => {
    if (!value) return {text: "No due date", hint: "", overdue: false};
    const date = new Date(`${value}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const days = Math.round((date.getTime() - today.getTime()) / 86_400_000);
    const text = date.toLocaleDateString("en-US", {weekday: "short", month: "short", day: "numeric"});
    const hint = days === 0 ? "Today" : days === 1 ? "Tomorrow" : days > 0 ? `In ${days} days` : `${Math.abs(days)} days overdue`;
    return {text, hint, overdue: days < 0};
};

const rowButton =
    "flex min-h-9 w-full items-center gap-2 rounded-lg px-2 text-left text-sm text-zinc-900 transition hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/60 dark:text-zinc-100 dark:hover:bg-white/[0.06]";

interface PickerProps<T extends string> {
    label: string;
    value: T;
    options: Option<T>[];
    onChange: (value: T) => void;
}

// A button that opens a small listbox in place. Arrow keys move, Enter picks, Escape closes.
const Picker = <T extends string>({label, value, options, onChange}: PickerProps<T>) => {
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(0);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const id = useId();
    const reduceMotion = useReducedMotion();
    const current = options.find((option) => option.value === value) ?? options[0];

    useEffect(() => {
        if (open) listRef.current?.focus();
    }, [open]);

    const close = (next?: T) => {
        if (next !== undefined) onChange(next);
        setOpen(false);
        buttonRef.current?.focus();
    };

    const onKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
        if (event.key === "ArrowDown") setActive((index) => (index + 1) % options.length);
        else if (event.key === "ArrowUp") setActive((index) => (index - 1 + options.length) % options.length);
        else if (event.key === "Enter" || event.key === " ") close(options[active].value);
        else if (event.key === "Escape" || event.key === "Tab") close();
        else return;
        event.preventDefault();
    };

    return (
        <div className="relative">
            <button
                ref={buttonRef}
                type="button"
                onClick={() => {
                    setActive(options.indexOf(current));
                    setOpen(true);
                }}
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-label={`${label}: ${current.label}`}
                className={rowButton}
            >
                <span className="flex size-5 items-center justify-center" aria-hidden>{current.adornment}</span>
                {current.label}
            </button>
            <AnimatePresence>
                {open && (
                    <motion.ul
                        ref={listRef}
                        id={`${id}-list`}
                        role="listbox"
                        tabIndex={-1}
                        aria-label={label}
                        aria-activedescendant={`${id}-${active}`}
                        onKeyDown={onKeyDown}
                        onBlur={() => setOpen(false)}
                        className="absolute left-0 top-full z-20 mt-1 w-56 rounded-xl border border-zinc-200 bg-white p-1 shadow-xl shadow-zinc-950/10 outline-none dark:border-white/10 dark:bg-zinc-900 dark:shadow-black/40"
                        initial={reduceMotion ? {opacity: 0} : {opacity: 0, y: -4}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.12}}
                    >
                        {options.map((option, index) => (
                            <li
                                key={option.value}
                                id={`${id}-${index}`}
                                role="option"
                                aria-selected={option.value === value}
                                onMouseDown={(event) => {
                                    event.preventDefault();
                                    close(option.value);
                                }}
                                onMouseMove={() => setActive(index)}
                                className={`flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-zinc-800 dark:text-zinc-100 ${index === active ? "bg-zinc-100 dark:bg-white/[0.07]" : ""}`}
                            >
                                <span className="flex size-5 items-center justify-center" aria-hidden>{option.adornment}</span>
                                <span className="flex-1">{option.label}</span>
                                {option.value === value && <LuCheck className="size-4 text-violet-600 dark:text-violet-400" aria-hidden/>}
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};

const DateField = ({value, onChange}: {value: string; onChange: (value: string) => void}) => {
    const [editing, setEditing] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const info = describeDate(value);

    // Focus returns to the value after Enter or Escape, but not when the user clicked somewhere else.
    const finish = (next?: string, refocus = true) => {
        if (next !== undefined) onChange(next);
        setEditing(false);
        if (refocus) window.setTimeout(() => buttonRef.current?.focus(), 0);
    };

    if (editing) {
        return (
            <input
                type="date"
                autoFocus
                defaultValue={value}
                aria-label="Due date"
                onKeyDown={(event) => {
                    if (event.key === "Enter") finish(event.currentTarget.value);
                    if (event.key === "Escape") finish();
                }}
                onBlur={(event) => finish(event.currentTarget.value, false)}
                className="h-9 w-full rounded-lg border border-violet-400 bg-white px-2 text-sm text-zinc-900 outline-none ring-4 ring-violet-500/10 dark:border-violet-400/60 dark:bg-zinc-950 dark:text-zinc-100 dark:[color-scheme:dark]"
            />
        );
    }

    return (
        <button ref={buttonRef} type="button" onClick={() => setEditing(true)} aria-label={`Due date: ${info.text}. Edit`} className={rowButton}>
            <span className={value ? "" : "text-zinc-400 dark:text-zinc-500"}>{info.text}</span>
            {info.hint && (
                <span className={`rounded-md px-1.5 py-0.5 text-[11px] font-medium ${info.overdue ? "bg-rose-50 text-rose-600 dark:bg-rose-400/10 dark:text-rose-300" : "bg-zinc-100 text-zinc-500 dark:bg-white/[0.06] dark:text-zinc-400"}`}>
                    {info.hint}
                </span>
            )}
        </button>
    );
};

const currencies: Currency[] = ["USD", "EUR", "GBP", "JPY"];

const MoneyField = ({amount, currency, onChange}: {amount: number; currency: Currency; onChange: (amount: number, currency: Currency) => void}) => {
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState(String(amount));
    const [draftCurrency, setDraftCurrency] = useState<Currency>(currency);
    const [error, setError] = useState("");
    const buttonRef = useRef<HTMLButtonElement>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const id = useId();
    const formatted = new Intl.NumberFormat("en-US", {style: "currency", currency}).format(amount);

    const open = () => {
        setDraft(String(amount));
        setDraftCurrency(currency);
        setError("");
        setEditing(true);
    };

    const close = (refocus = true) => {
        setEditing(false);
        if (refocus) window.setTimeout(() => buttonRef.current?.focus(), 0);
    };

    const submit = (event?: FormEvent, leaving = false) => {
        event?.preventDefault();
        const cleaned = draft.replace(/[,\s]/g, "");
        if (!/^\d+(\.\d{1,2})?$/.test(cleaned)) {
            // Leaving with an invalid amount keeps the saved value.
            if (leaving) close(false);
            else setError("Enter an amount like 12500 or 12,500.50");
            return;
        }
        onChange(Number(cleaned), draftCurrency);
        close(!leaving);
    };

    if (!editing) {
        return (
            <button ref={buttonRef} type="button" onClick={open} aria-label={`Budget: ${formatted}. Edit`} className={`${rowButton} tabular-nums`}>
                {formatted}
            </button>
        );
    }

    return (
        <form
            ref={formRef}
            onSubmit={submit}
            onKeyDown={(event) => {
                if (event.key === "Escape") {
                    event.preventDefault();
                    close();
                }
            }}
            // Save when focus leaves both the currency and the amount.
            onBlur={(event) => {
                if (!formRef.current?.contains(event.relatedTarget as Node | null)) submit(undefined, true);
            }}
        >
            <div className={`flex h-9 overflow-hidden rounded-lg border bg-white ring-4 dark:bg-zinc-950 ${error ? "border-rose-400 ring-rose-500/10" : "border-violet-400 ring-violet-500/10 dark:border-violet-400/60"}`}>
                <select
                    value={draftCurrency}
                    onChange={(event) => setDraftCurrency(event.target.value as Currency)}
                    aria-label="Currency"
                    className="border-r border-zinc-200 bg-zinc-50 px-2 text-xs font-medium text-zinc-700 outline-none focus-visible:bg-violet-50 dark:border-white/10 dark:bg-white/[0.04] dark:text-zinc-200 dark:focus-visible:bg-violet-400/10"
                >
                    {currencies.map((code) => (
                        <option key={code}>{code}</option>
                    ))}
                </select>
                <input
                    autoFocus
                    value={draft}
                    inputMode="decimal"
                    onChange={(event) => {
                        setDraft(event.target.value);
                        setError("");
                    }}
                    onFocus={(event) => event.currentTarget.select()}
                    aria-label="Amount"
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? `${id}-error` : undefined}
                    className="min-w-0 flex-1 bg-transparent px-2.5 text-right text-sm tabular-nums text-zinc-900 outline-none dark:text-zinc-100"
                />
            </div>
            {error && <p id={`${id}-error`} className="mt-1 text-xs text-rose-600 dark:text-rose-400">{error}</p>}
        </form>
    );
};

const PropertyPanel = () => {
    const [status, setStatus] = useState<Status>("In progress");
    const [owner, setOwner] = useState<Person>("Mei Watanabe");
    const [due, setDue] = useState(() => toInputDate(new Date(Date.now() + 12 * 86_400_000)));
    const [budget, setBudget] = useState<{amount: number; currency: Currency}>({amount: 18500, currency: "EUR"});

    const rows: {label: string; icon: ReactNode; field: ReactNode}[] = [
        {label: "Status", icon: <LuCircleDot className="size-4"/>, field: <Picker<Status> label="Status" value={status} options={statusOptions} onChange={setStatus}/>},
        {label: "Owner", icon: <LuUser className="size-4"/>, field: <Picker<Person> label="Owner" value={owner} options={ownerOptions} onChange={setOwner}/>},
        {label: "Due date", icon: <LuCalendar className="size-4"/>, field: <DateField value={due} onChange={setDue}/>},
        {
            label: "Budget",
            icon: <LuWallet className="size-4"/>,
            field: <MoneyField amount={budget.amount} currency={budget.currency} onChange={(amount, currency) => setBudget({amount, currency})}/>,
        },
    ];

    return (
        <div className="w-full max-w-md min-h-[380px]">
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-zinc-900">
                <p className="text-xs font-medium text-violet-600 dark:text-violet-400">Project</p>
                <h3 className="mt-1 text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">Q4 brand refresh</h3>
                <dl className="mt-4 space-y-1">
                    {rows.map((row) => (
                        <div key={row.label} className="grid grid-cols-[7.5rem_1fr] items-start gap-2 sm:grid-cols-[8.5rem_1fr]">
                            <dt className="flex h-9 items-center gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                                <span className="text-zinc-400 dark:text-zinc-500" aria-hidden>{row.icon}</span>
                                {row.label}
                            </dt>
                            <dd className="min-w-0">{row.field}</dd>
                        </div>
                    ))}
                </dl>
            </div>
        </div>
    );
};

export default PropertyPanel;
