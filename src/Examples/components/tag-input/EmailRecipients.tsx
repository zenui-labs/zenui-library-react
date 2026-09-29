import {useId, useRef, useState} from "react";
import type {ClipboardEvent, KeyboardEvent} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {LuInfo, LuX} from "react-icons/lu";

export interface Contact {
    name: string;
    email: string;
}

export interface Recipient {
    email: string;
    name?: string;
    /** False when the address does not look like an email. The chip turns red and asks to be fixed. */
    valid: boolean;
}

export interface RecipientsValue {
    to: Recipient[];
    cc: Recipient[];
}

const EMAIL = /^[^\s@<>]+@[^\s@<>]+\.[a-z]{2,}$/i;
const isExternal = (email: string, domain?: string) => Boolean(domain) && !email.toLowerCase().endsWith(`@${domain}`);
const initials = (text: string) => text.split(/[\s.@]/).filter(Boolean).slice(0, 2).map((part) => part[0].toUpperCase()).join("");

// Accepts "maya@northwind.dev" as well as "Maya Chen <maya@northwind.dev>".
const parse = (raw: string, contacts: Contact[]): Recipient | null => {
    const text = raw.trim().replace(/^["']|["']$/g, "");
    if (!text) return null;
    const match = text.match(/^(.*)<(.+)>$/);
    const email = (match ? match[2] : text).trim().toLowerCase();
    const known = contacts.find((contact) => contact.email === email);
    const name = known?.name ?? (match ? match[1].trim().replace(/^"|"$/g, "") : undefined);
    return {email, name: name || undefined, valid: EMAIL.test(email)};
};

export interface RecipientFieldProps {
    label: string;
    recipients: Recipient[];
    onChange: (next: Recipient[]) => void;
    /** People suggested as you type. */
    contacts: Contact[];
    /** Addresses outside this domain are marked as external. Leave it out to skip the check. */
    companyDomain?: string;
    autoFocus?: boolean;
    placeholder?: string;
    /** Accessible name of the suggestions list. */
    contactsLabel?: string;
}

/** One recipient row with contact suggestions, paste support and chips you can click to edit. */
export const RecipientField = ({
    label,
    recipients,
    onChange,
    contacts,
    companyDomain,
    autoFocus,
    placeholder = "Name or email",
    contactsLabel = "Contacts",
}: RecipientFieldProps) => {
    const [draft, setDraft] = useState("");
    const [active, setActive] = useState(0);
    const [focused, setFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const id = useId();
    const reduceMotion = useReducedMotion();

    const needle = draft.trim().toLowerCase();
    const options = needle
        ? contacts
            .filter((contact) => !recipients.some((item) => item.email === contact.email))
            .filter((contact) => contact.name.toLowerCase().includes(needle) || contact.email.includes(needle))
            .slice(0, 4)
        : [];
    const showOptions = focused && options.length > 0;

    const add = (values: string[]) => {
        const next = [...recipients];
        for (const value of values) {
            const recipient = parse(value, contacts);
            if (recipient && !next.some((item) => item.email === recipient.email)) next.push(recipient);
        }
        onChange(next);
        setDraft("");
        setActive(0);
    };

    // Clicking a chip that needs fixing puts its text back in the field.
    const edit = (recipient: Recipient) => {
        onChange(recipients.filter((item) => item !== recipient));
        setDraft(recipient.email);
        inputRef.current?.focus();
    };

    const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "ArrowDown" && showOptions) {
            event.preventDefault();
            setActive((index) => (index + 1) % options.length);
        } else if (event.key === "ArrowUp" && showOptions) {
            event.preventDefault();
            setActive((index) => (index - 1 + options.length) % options.length);
        } else if (event.key === "Enter" || event.key === "," || event.key === ";" || (event.key === "Tab" && draft.trim())) {
            if (!draft.trim()) return;
            event.preventDefault();
            add([showOptions ? `${options[active].name} <${options[active].email}>` : draft]);
        } else if (event.key === "Backspace" && !draft && recipients.length) {
            event.preventDefault();
            edit(recipients[recipients.length - 1]);
        }
    };

    const onPaste = (event: ClipboardEvent<HTMLInputElement>) => {
        const text = event.clipboardData.getData("text");
        if (!/[,;\n]/.test(text)) return;
        event.preventDefault();
        add(text.split(/[,;\n]+/));
    };

    return (
        <div className="relative flex items-start gap-3 px-4 py-2">
            <label htmlFor={id} className="w-8 shrink-0 pt-1.5 text-sm text-zinc-500 dark:text-zinc-400">
                {label}
            </label>
            <div
                className="flex min-h-8 min-w-0 flex-1 cursor-text flex-wrap items-center gap-1"
                onMouseDown={(event) => {
                    if (event.target === event.currentTarget) {
                        event.preventDefault();
                        inputRef.current?.focus();
                    }
                }}
            >
                <ul className="contents" aria-label={`${label} recipients`}>
                    <AnimatePresence initial={false}>
                        {recipients.map((recipient) => {
                            const external = recipient.valid && isExternal(recipient.email, companyDomain);
                            return (
                                <motion.li
                                    key={recipient.email}
                                    layout={!reduceMotion}
                                    initial={reduceMotion ? {opacity: 0} : {opacity: 0, scale: 0.9}}
                                    animate={{opacity: 1, scale: 1}}
                                    exit={{opacity: 0}}
                                    transition={{duration: 0.14}}
                                    className={`group inline-flex h-7 max-w-full items-center gap-1.5 rounded-full py-0.5 pl-0.5 pr-1 text-sm ring-1 ring-inset ${
                                        !recipient.valid
                                            ? "bg-rose-50 text-rose-700 ring-rose-300 dark:bg-rose-500/10 dark:text-rose-300 dark:ring-rose-400/40"
                                            : external
                                                ? "bg-amber-50 text-amber-900 ring-amber-200 dark:bg-amber-400/10 dark:text-amber-200 dark:ring-amber-400/25"
                                                : "bg-zinc-100 text-zinc-800 ring-zinc-200 dark:bg-white/[0.07] dark:text-zinc-100 dark:ring-white/10"
                                    }`}
                                >
                                    <button
                                        type="button"
                                        onClick={() => edit(recipient)}
                                        title={recipient.email}
                                        aria-label={`${recipient.name ?? recipient.email}${!recipient.valid ? ", invalid address, click to edit" : external ? ", outside your organization" : ""}`}
                                        className="flex min-w-0 items-center gap-1.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60"
                                    >
                                        <span
                                            className={`flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold ${
                                                recipient.valid ? "bg-white text-zinc-600 shadow-sm dark:bg-zinc-800 dark:text-zinc-300" : "bg-rose-500 text-white"
                                            }`}
                                            aria-hidden
                                        >
                                            {recipient.valid ? initials(recipient.name ?? recipient.email) : "!"}
                                        </span>
                                        <span className="truncate">{recipient.name ?? recipient.email}</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => onChange(recipients.filter((item) => item !== recipient))}
                                        aria-label={`Remove ${recipient.name ?? recipient.email}`}
                                        className="flex size-5 shrink-0 items-center justify-center rounded-full opacity-50 transition hover:bg-black/5 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current dark:hover:bg-white/10"
                                    >
                                        <LuX className="size-3" aria-hidden/>
                                    </button>
                                </motion.li>
                            );
                        })}
                    </AnimatePresence>
                </ul>
                <input
                    ref={inputRef}
                    id={id}
                    type="text"
                    inputMode="email"
                    autoFocus={autoFocus}
                    autoComplete="off"
                    spellCheck={false}
                    value={draft}
                    onChange={(event) => {
                        setDraft(event.target.value);
                        setActive(0);
                    }}
                    onKeyDown={onKeyDown}
                    onPaste={onPaste}
                    onFocus={() => setFocused(true)}
                    onBlur={() => {
                        setFocused(false);
                        if (draft.trim()) add([draft]);
                    }}
                    role="combobox"
                    aria-expanded={showOptions}
                    aria-controls={`${id}-list`}
                    aria-autocomplete="list"
                    aria-activedescendant={showOptions ? `${id}-${active}` : undefined}
                    className="h-7 min-w-[10rem] flex-1 bg-transparent px-1 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-100 dark:placeholder:text-zinc-500"
                    placeholder={recipients.length ? "" : placeholder}
                />
            </div>

            <AnimatePresence>
                {showOptions && (
                    <motion.ul
                        id={`${id}-list`}
                        role="listbox"
                        aria-label={contactsLabel}
                        className="absolute left-14 right-4 top-full z-20 -mt-1 rounded-xl border border-zinc-200 bg-white p-1 shadow-xl shadow-zinc-950/10 dark:border-white/10 dark:bg-zinc-900 dark:shadow-black/40"
                        initial={reduceMotion ? {opacity: 0} : {opacity: 0, y: -4}}
                        animate={{opacity: 1, y: 0}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.12}}
                    >
                        {options.map((contact, index) => (
                            <li
                                key={contact.email}
                                id={`${id}-${index}`}
                                role="option"
                                aria-selected={index === active}
                                onMouseDown={(event) => {
                                    event.preventDefault();
                                    add([`${contact.name} <${contact.email}>`]);
                                }}
                                onMouseMove={() => setActive(index)}
                                className={`flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 ${index === active ? "bg-zinc-100 dark:bg-white/[0.07]" : ""}`}
                            >
                                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-[11px] font-semibold text-indigo-700 dark:bg-indigo-400/15 dark:text-indigo-300" aria-hidden>
                                    {initials(contact.name)}
                                </span>
                                <span className="min-w-0">
                                    <span className="block truncate text-sm text-zinc-900 dark:text-zinc-100">{contact.name}</span>
                                    <span className="block truncate text-xs text-zinc-500 dark:text-zinc-400">{contact.email}</span>
                                </span>
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};

export interface EmailRecipientsProps {
    /** People suggested as you type in the To and Cc rows. */
    contacts: Contact[];
    /** Addresses outside this domain are marked as external. Leave it out to skip the check. */
    companyDomain?: string;
    /** Recipients in both rows. Pass it with `onChange` to control the fields. */
    value?: RecipientsValue;
    defaultValue?: RecipientsValue;
    onChange?: (value: RecipientsValue) => void;
    /** Shown as a muted subject line under the recipients. */
    subject?: string;
    title?: string;
    addCcLabel?: string;
    className?: string;
}

/** A To and Cc composer header that suggests contacts and flags invalid or external addresses. */
export const EmailRecipients = ({
    contacts,
    companyDomain,
    value,
    defaultValue = {to: [], cc: []},
    onChange,
    subject,
    title = "New message",
    addCcLabel = "Add Cc",
    className = "",
}: EmailRecipientsProps) => {
    const [innerValue, setInnerValue] = useState<RecipientsValue>(defaultValue);
    const {to, cc} = value ?? innerValue;
    const [showCc, setShowCc] = useState(cc.length > 0);

    const update = (next: RecipientsValue) => {
        if (value === undefined) setInnerValue(next);
        onChange?.(next);
    };

    const all = [...to, ...cc];
    const invalid = all.filter((item) => !item.valid).length;
    const external = all.filter((item) => item.valid && isExternal(item.email, companyDomain)).length;

    return (
        <div className={`w-full max-w-xl min-h-[340px] ${className}`}>
            <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-white/10 dark:bg-zinc-900">
                <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-2.5 dark:border-white/[0.06]">
                    <p className="text-sm font-medium text-zinc-900 dark:text-white">{title}</p>
                    {!showCc && (
                        <button
                            type="button"
                            onClick={() => setShowCc(true)}
                            className="rounded-md px-2 py-0.5 text-xs font-medium text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-white"
                        >
                            {addCcLabel}
                        </button>
                    )}
                </div>
                <div className="divide-y divide-zinc-100 dark:divide-white/[0.06]">
                    <RecipientField
                        label="To"
                        recipients={to}
                        onChange={(next) => update({to: next, cc})}
                        contacts={contacts}
                        companyDomain={companyDomain}
                    />
                    {showCc && (
                        <RecipientField
                            label="Cc"
                            recipients={cc}
                            onChange={(next) => update({to, cc: next})}
                            contacts={contacts}
                            companyDomain={companyDomain}
                            autoFocus
                        />
                    )}
                    {subject && <div className="px-4 py-3 text-sm text-zinc-400 dark:text-zinc-500">Subject: {subject}</div>}
                </div>
            </div>

            <div className="mt-3 space-y-1.5 text-xs" aria-live="polite">
                {invalid > 0 && (
                    <p className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400">
                        <LuInfo className="size-3.5 shrink-0" aria-hidden/>
                        {invalid === 1 ? "1 address needs fixing." : `${invalid} addresses need fixing.`} Click it to edit.
                    </p>
                )}
                {external > 0 && (
                    <p className="flex items-center gap-1.5 text-amber-700 dark:text-amber-300">
                        <LuInfo className="size-3.5 shrink-0" aria-hidden/>
                        {external === 1 ? "1 recipient is" : `${external} recipients are`} outside {companyDomain}.
                    </p>
                )}
            </div>
        </div>
    );
};
