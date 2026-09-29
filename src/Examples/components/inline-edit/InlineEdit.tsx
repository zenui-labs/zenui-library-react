import {useEffect, useId, useRef, useState} from "react";
import type {FormEvent, KeyboardEvent} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {LuCheck, LuLoader, LuPencil} from "react-icons/lu";

export interface InlineFieldProps {
    label: string;
    /** Saved value. Pass it with `onChange` to control the field. */
    value?: string;
    defaultValue?: string;
    /** Called with the new value once `onSave` has finished. */
    onChange?: (value: string) => void;
    /** Runs while the field shows its saving state. Reject to keep the field open and show the error message. */
    onSave?: (value: string) => Promise<void> | void;
    /** Fixed text shown before the value, such as a URL base. */
    prefix?: string;
    type?: "text" | "email";
    /** Return an error message to block saving, or null when the value is fine. */
    validate?: (value: string) => string | null;
    /** Keyboard hint shown next to the buttons on wider screens. */
    hint?: string;
}

type Phase = "view" | "edit" | "saving";

export const InlineField = ({
    label,
    value: valueProp,
    defaultValue = "",
    onChange,
    onSave,
    prefix,
    type = "text",
    validate,
    hint = "Enter to save, Esc to cancel",
}: InlineFieldProps) => {
    const [innerValue, setInnerValue] = useState(defaultValue);
    const value = valueProp ?? innerValue;
    const [draft, setDraft] = useState(value);
    const [phase, setPhase] = useState<Phase>("view");
    const [error, setError] = useState<string | null>(null);
    const [justSaved, setJustSaved] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const editButtonRef = useRef<HTMLButtonElement>(null);
    const returnFocus = useRef(false);
    const id = useId();
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        if (phase === "edit") {
            inputRef.current?.focus();
            inputRef.current?.select();
        }
        if (phase === "view" && returnFocus.current) {
            editButtonRef.current?.focus();
            returnFocus.current = false;
        }
    }, [phase]);

    useEffect(() => {
        if (!justSaved) return;
        const timer = window.setTimeout(() => setJustSaved(false), 1800);
        return () => window.clearTimeout(timer);
    }, [justSaved]);

    const startEditing = () => {
        setDraft(value);
        setError(null);
        setPhase("edit");
    };

    const cancel = () => {
        returnFocus.current = true;
        setError(null);
        setPhase("view");
    };

    const submit = async (event?: FormEvent<HTMLFormElement>) => {
        event?.preventDefault();
        const next = draft.trim();
        const problem = validate?.(next) ?? null;
        if (problem) {
            setError(problem);
            inputRef.current?.focus();
            return;
        }
        returnFocus.current = true;
        if (next === value) {
            setPhase("view");
            return;
        }
        setPhase("saving");
        try {
            await onSave?.(next);
        } catch (reason) {
            returnFocus.current = false;
            setError(reason instanceof Error ? reason.message : "Could not save. Try again.");
            setPhase("edit");
            return;
        }
        if (valueProp === undefined) setInnerValue(next);
        onChange?.(next);
        setPhase("view");
        setJustSaved(true);
    };

    const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Escape") {
            event.preventDefault();
            cancel();
        }
    };

    return (
        <div className="grid gap-1 px-5 py-4 sm:grid-cols-[9rem_1fr] sm:items-start sm:gap-6">
            <p id={`${id}-label`} className="pt-2 text-sm font-medium text-zinc-500 dark:text-zinc-400">{label}</p>
            {phase === "view" ? (
                <div className="flex min-h-9 items-center gap-2">
                    <button
                        ref={editButtonRef}
                        type="button"
                        onClick={startEditing}
                        aria-label={`Edit ${label.toLowerCase()}, currently ${prefix ?? ""}${value}`}
                        className="group -ml-2 flex min-w-0 items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm text-zinc-900 transition hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 dark:text-zinc-100 dark:hover:bg-white/5"
                    >
                        <span className="truncate">
                            {prefix && <span className="text-zinc-400 dark:text-zinc-500">{prefix}</span>}
                            {value}
                        </span>
                        <LuPencil className="size-3.5 shrink-0 text-zinc-400 opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden/>
                    </button>
                    <AnimatePresence>
                        {justSaved && (
                            <motion.span
                                className="flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400"
                                initial={reduceMotion ? {opacity: 0} : {opacity: 0, x: -4}}
                                animate={{opacity: 1, x: 0}}
                                exit={{opacity: 0}}
                                role="status"
                            >
                                <LuCheck className="size-3.5" aria-hidden/>
                                Saved
                            </motion.span>
                        )}
                    </AnimatePresence>
                </div>
            ) : (
                <form onSubmit={submit} noValidate>
                    <div
                        className={`flex h-9 items-center rounded-lg border bg-white text-sm transition focus-within:ring-4 dark:bg-zinc-900 ${
                            error
                                ? "border-rose-400 focus-within:ring-rose-500/10 dark:border-rose-400/70"
                                : "border-indigo-400 focus-within:ring-indigo-500/10 dark:border-indigo-400/60"
                        }`}
                    >
                        {prefix && <span className="pl-3 text-zinc-400 dark:text-zinc-500">{prefix}</span>}
                        <input
                            ref={inputRef}
                            type={type}
                            value={draft}
                            disabled={phase === "saving"}
                            onChange={(event) => {
                                setDraft(event.target.value);
                                setError(null);
                            }}
                            onKeyDown={onKeyDown}
                            aria-labelledby={`${id}-label`}
                            aria-invalid={Boolean(error)}
                            aria-describedby={error ? `${id}-error` : undefined}
                            className={`h-full min-w-0 flex-1 bg-transparent pr-3 text-zinc-900 outline-none disabled:opacity-60 dark:text-zinc-100 ${prefix ? "pl-0.5" : "pl-3"}`}
                        />
                    </div>
                    {error && (
                        <p id={`${id}-error`} className="mt-1.5 text-xs text-rose-600 dark:text-rose-400">{error}</p>
                    )}
                    <div className="mt-2 flex items-center gap-2">
                        <button
                            type="submit"
                            disabled={phase === "saving"}
                            className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-zinc-900 px-3 text-xs font-medium text-white transition hover:bg-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-70 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus-visible:ring-offset-zinc-900"
                        >
                            {phase === "saving" && <LuLoader className="size-3.5 animate-spin" aria-hidden/>}
                            {phase === "saving" ? "Saving" : "Save"}
                        </button>
                        <button
                            type="button"
                            onClick={cancel}
                            disabled={phase === "saving"}
                            className="h-8 rounded-lg px-3 text-xs font-medium text-zinc-600 transition hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 disabled:opacity-50 dark:text-zinc-300 dark:hover:bg-white/5"
                        >
                            Cancel
                        </button>
                        {hint && <span className="ml-auto hidden text-[11px] text-zinc-400 sm:inline dark:text-zinc-500">{hint}</span>}
                    </div>
                </form>
            )}
        </div>
    );
};

export interface InlineEditField {
    /** Stable key, passed back to `onSave`. */
    id: string;
    label: string;
    defaultValue: string;
    prefix?: string;
    type?: "text" | "email";
    validate?: (value: string) => string | null;
}

export interface InlineEditProps {
    fields: InlineEditField[];
    title?: string;
    description?: string;
    /** Runs while a field shows its saving state. Reject to keep the field open with the error message. */
    onSave?: (id: string, value: string) => Promise<void> | void;
    className?: string;
}

/** A settings card whose values turn into a field when clicked. Enter saves and Escape cancels. */
export const InlineEdit = ({
    fields,
    title = "Workspace",
    description = "Click a value to change it.",
    onSave,
    className = "",
}: InlineEditProps) => (
    <div className={`w-full max-w-xl rounded-2xl border border-zinc-200 bg-white dark:border-white/10 dark:bg-zinc-900 ${className}`}>
        <div className="border-b border-zinc-100 px-5 py-4 dark:border-white/[0.06]">
            <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">{title}</h3>
            {description && <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">{description}</p>}
        </div>
        <div className="divide-y divide-zinc-100 dark:divide-white/[0.06]">
            {fields.map((field) => (
                <InlineField
                    key={field.id}
                    label={field.label}
                    defaultValue={field.defaultValue}
                    prefix={field.prefix}
                    type={field.type}
                    validate={field.validate}
                    onSave={onSave ? (value) => onSave(field.id, value) : undefined}
                />
            ))}
        </div>
    </div>
);
