import {useEffect, useId, useRef, useState} from "react";
import type {FormEvent, KeyboardEvent, ReactNode} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {LuCalendar, LuCheck, LuCircleDot, LuUser, LuWallet} from "react-icons/lu";

export interface PickerOption<T extends string = string> {
    value: T;
    label: string;
    /** Small visual shown before the label, such as a status dot or an avatar. */
    adornment: ReactNode;
}

export interface Money {
    amount: number;
    /** ISO 4217 code, such as USD or EUR. */
    currency: string;
}

export interface ProjectProperties {
    status: string;
    /** Must match one of the `owners` names. */
    owner: string;
    /** Local date as YYYY-MM-DD, or an empty string for no date. */
    due: string;
    budget: Money;
}

export interface PropertyLabels {
    status: string;
    owner: string;
    due: string;
    budget: string;
}

const describeDate = (value: string, emptyText: string) => {
    if (!value) return {text: emptyText, hint: "", overdue: false};
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

const Avatar = ({name}: {name: string}) => (
    <span className="flex size-5 items-center justify-center rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-500 text-[9px] font-semibold text-white">
        {name.split(" ").map((part) => part[0]).join("")}
    </span>
);

export interface PickerProps<T extends string> {
    label: string;
    value: T;
    options: PickerOption<T>[];
    onChange: (value: T) => void;
}

// A button that opens a small listbox in place. Arrow keys move, Enter picks, Escape closes.
export const Picker = <T extends string>({label, value, options, onChange}: PickerProps<T>) => {
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

export interface DateFieldProps {
    label: string;
    /** Local date as YYYY-MM-DD, or an empty string for no date. */
    value: string;
    onChange: (value: string) => void;
    emptyText?: string;
}

export const DateField = ({label, value, onChange, emptyText = "No due date"}: DateFieldProps) => {
    const [editing, setEditing] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const info = describeDate(value, emptyText);

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
                aria-label={label}
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
        <button ref={buttonRef} type="button" onClick={() => setEditing(true)} aria-label={`${label}: ${info.text}. Edit`} className={rowButton}>
            <span className={value ? "" : "text-zinc-400 dark:text-zinc-500"}>{info.text}</span>
            {info.hint && (
                <span className={`rounded-md px-1.5 py-0.5 text-[11px] font-medium ${info.overdue ? "bg-rose-50 text-rose-600 dark:bg-rose-400/10 dark:text-rose-300" : "bg-zinc-100 text-zinc-500 dark:bg-white/[0.06] dark:text-zinc-400"}`}>
                    {info.hint}
                </span>
            )}
        </button>
    );
};

export interface MoneyFieldProps {
    label: string;
    value: Money;
    onChange: (value: Money) => void;
    /** Currency codes offered in the picker. */
    currencies?: string[];
    errorText?: string;
}

export const MoneyField = ({
    label,
    value,
    onChange,
    currencies = ["USD", "EUR", "GBP", "JPY"],
    errorText = "Enter an amount like 12500 or 12,500.50",
}: MoneyFieldProps) => {
    const {amount, currency} = value;
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState(String(amount));
    const [draftCurrency, setDraftCurrency] = useState(currency);
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
            else setError(errorText);
            return;
        }
        onChange({amount: Number(cleaned), currency: draftCurrency});
        close(!leaving);
    };

    if (!editing) {
        return (
            <button ref={buttonRef} type="button" onClick={open} aria-label={`${label}: ${formatted}. Edit`} className={`${rowButton} tabular-nums`}>
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
                    onChange={(event) => setDraftCurrency(event.target.value)}
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

export interface PropertyPanelProps {
    /** Project name shown as the heading. */
    title: string;
    eyebrow?: string;
    statusOptions: PickerOption[];
    /** People who can own the project. Each gets an initials avatar. */
    owners: string[];
    /** Current properties. Pass it with `onChange` to control the panel. */
    value?: ProjectProperties;
    defaultValue?: ProjectProperties;
    onChange?: (value: ProjectProperties) => void;
    currencies?: string[];
    labels?: Partial<PropertyLabels>;
    className?: string;
}

const defaultLabels: PropertyLabels = {status: "Status", owner: "Owner", due: "Due date", budget: "Budget"};

/** Project properties that each edit with the right control: a list, a date field, and an amount with a currency. */
export const PropertyPanel = ({
    title,
    eyebrow = "Project",
    statusOptions,
    owners,
    value: valueProp,
    defaultValue,
    onChange,
    currencies,
    labels,
    className = "",
}: PropertyPanelProps) => {
    const [innerValue, setInnerValue] = useState<ProjectProperties>(
        () => defaultValue ?? {status: statusOptions[0]?.value ?? "", owner: owners[0] ?? "", due: "", budget: {amount: 0, currency: "USD"}},
    );
    const properties = valueProp ?? innerValue;
    const text = {...defaultLabels, ...labels};
    const ownerOptions: PickerOption[] = owners.map((name) => ({value: name, label: name, adornment: <Avatar name={name}/>}));

    const update = <K extends keyof ProjectProperties>(key: K, next: ProjectProperties[K]) => {
        const updated = {...properties, [key]: next};
        if (valueProp === undefined) setInnerValue(updated);
        onChange?.(updated);
    };

    const rows: {label: string; icon: ReactNode; field: ReactNode}[] = [
        {
            label: text.status,
            icon: <LuCircleDot className="size-4"/>,
            field: <Picker label={text.status} value={properties.status} options={statusOptions} onChange={(next) => update("status", next)}/>,
        },
        {
            label: text.owner,
            icon: <LuUser className="size-4"/>,
            field: <Picker label={text.owner} value={properties.owner} options={ownerOptions} onChange={(next) => update("owner", next)}/>,
        },
        {
            label: text.due,
            icon: <LuCalendar className="size-4"/>,
            field: <DateField label={text.due} value={properties.due} onChange={(next) => update("due", next)}/>,
        },
        {
            label: text.budget,
            icon: <LuWallet className="size-4"/>,
            field: <MoneyField label={text.budget} value={properties.budget} currencies={currencies} onChange={(next) => update("budget", next)}/>,
        },
    ];

    return (
        <div className={`w-full max-w-md min-h-[380px] ${className}`}>
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-zinc-900">
                {eyebrow && <p className="text-xs font-medium text-violet-600 dark:text-violet-400">{eyebrow}</p>}
                <h3 className="mt-1 text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">{title}</h3>
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
