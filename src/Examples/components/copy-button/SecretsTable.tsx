import {useEffect, useRef, useState} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {LuCheck, LuCopy, LuEye, LuEyeOff, LuFileText, LuKeyRound, LuRefreshCw} from "react-icons/lu";

export interface EnvVariable {
    name: string;
    value: string;
    /** Masks the value until the row is revealed. */
    secret: boolean;
    /** When the value last changed, as display text. */
    updated: string;
    /** Adds a rotate action with an inline confirm. */
    rotatable?: boolean;
}

const mask = (value: string) => `${value.slice(0, 6)}${"•".repeat(12)}`;

const randomKey = (): string => {
    const chars = "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    return `sk_test_${Array.from({length: 24}, () => chars[Math.floor(Math.random() * chars.length)]).join("")}`;
};

// One timer shared by the table: only the most recent copy shows a check.
const useCopied = (resetAfter: number, onCopy?: (text: string) => void) => {
    const [copied, setCopied] = useState<string | null>(null);
    const timer = useRef<number | undefined>(undefined);

    useEffect(() => () => window.clearTimeout(timer.current), []);

    const copy = async (key: string, text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(key);
            onCopy?.(text);
            window.clearTimeout(timer.current);
            timer.current = window.setTimeout(() => setCopied(null), resetAfter);
        } catch {
            setCopied(null);
        }
    };

    return {copied, copy};
};

const iconButton =
    "flex size-8 shrink-0 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 dark:hover:bg-white/10 dark:hover:text-white";

export interface SecretsTableProps {
    /** Initial rows. Rotated values are kept in local state and reported through `onRotate`. */
    variables: EnvVariable[];
    title?: string;
    subtitle?: string;
    copyAllLabel?: string;
    /** Text next to the confirm button when rotating a key. */
    rotateWarning?: string;
    /** Returns the new value for a rotated variable. The default makes a random test key. */
    generateValue?: (variable: EnvVariable) => string;
    /** Called after a variable was rotated, with its new value. */
    onRotate?: (name: string, value: string) => void;
    /** Called with the copied text after a successful copy. */
    onCopy?: (text: string) => void;
    /** How long a copy button shows its check, in milliseconds. */
    resetAfter?: number;
    className?: string;
}

/** Environment variables with per row copy and reveal, key rotation with an inline confirm and a copy as .env action. */
export const SecretsTable = ({
    variables: initialVariables,
    title = "Environment variables",
    subtitle,
    copyAllLabel = "Copy as .env",
    rotateWarning = "Old key stops working.",
    generateValue = randomKey,
    onRotate,
    onCopy,
    resetAfter = 1500,
    className = "",
}: SecretsTableProps) => {
    const [variables, setVariables] = useState<EnvVariable[]>(initialVariables);
    const [revealed, setRevealed] = useState<Set<string>>(() => new Set());
    const [confirming, setConfirming] = useState<string | null>(null);
    const [rotated, setRotated] = useState<string | null>(null);
    const {copied, copy} = useCopied(resetAfter, onCopy);
    const reduceMotion = useReducedMotion();

    const toggleReveal = (name: string) =>
        setRevealed((current) => {
            const next = new Set(current);
            if (next.has(name)) next.delete(name);
            else next.add(name);
            return next;
        });

    const rotate = (variable: EnvVariable) => {
        const {name} = variable;
        const value = generateValue(variable);
        setVariables((current) => current.map((item) => (item.name === name ? {...item, value, updated: "Just now"} : item)));
        setRevealed((current) => new Set(current).add(name));
        setConfirming(null);
        setRotated(name);
        onRotate?.(name, value);
    };

    const envFile = variables.map((item) => `${item.name}=${item.value}`).join("\n");

    return (
        <div className={`w-full max-w-3xl overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-white/10 dark:bg-zinc-900 ${className}`}>
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 px-5 py-4 dark:border-white/[0.06]">
                <div>
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">{title}</h3>
                    {subtitle && <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">{subtitle}</p>}
                </div>
                <button
                    type="button"
                    onClick={() => copy("env-file", envFile)}
                    className="inline-flex h-9 items-center gap-2 rounded-lg border border-zinc-200 px-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 dark:border-white/10 dark:text-zinc-200 dark:hover:bg-white/5"
                >
                    {copied === "env-file" ? <LuCheck className="size-4 text-emerald-600 dark:text-emerald-400" aria-hidden/> : <LuFileText className="size-4 text-zinc-400" aria-hidden/>}
                    {copied === "env-file" ? "Copied" : copyAllLabel}
                </button>
            </div>

            <table className="w-full text-left text-sm">
                <thead className="hidden text-xs text-zinc-500 sm:table-header-group dark:text-zinc-400">
                    <tr className="border-b border-zinc-100 dark:border-white/[0.06]">
                        <th scope="col" className="px-5 py-2.5 font-medium">Key</th>
                        <th scope="col" className="px-3 py-2.5 font-medium">Value</th>
                        <th scope="col" className="hidden px-3 py-2.5 font-medium md:table-cell">Updated</th>
                        <th scope="col" className="px-5 py-2.5 text-right font-medium"><span className="sr-only">Actions</span></th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100 dark:divide-white/[0.06]">
                    {variables.map((item) => {
                        const isRevealed = !item.secret || revealed.has(item.name);
                        const isCopied = copied === item.name;
                        return (
                            <tr key={item.name} className="flex flex-col gap-1 px-5 py-3 sm:table-row sm:p-0">
                                <th scope="row" className="font-mono text-xs font-medium text-zinc-900 sm:px-5 sm:py-3 dark:text-zinc-100">
                                    <span className="flex items-center gap-2">
                                        {item.secret && <LuKeyRound className="size-3.5 shrink-0 text-amber-500" aria-label="Secret"/>}
                                        <span className="break-all">{item.name}</span>
                                    </span>
                                </th>
                                <td className="min-w-0 sm:max-w-0 sm:px-3 sm:py-3 sm:w-full">
                                    <AnimatePresence mode="wait" initial={false}>
                                        <motion.code
                                            key={`${item.value}-${isRevealed}`}
                                            className={`block truncate rounded-md px-2 py-1 font-mono text-xs ${
                                                rotated === item.name ? "bg-emerald-50 text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-200" : "bg-zinc-50 text-zinc-600 dark:bg-white/[0.04] dark:text-zinc-300"
                                            }`}
                                            initial={reduceMotion ? {opacity: 0} : {opacity: 0, filter: "blur(4px)"}}
                                            animate={{opacity: 1, filter: "blur(0px)"}}
                                            exit={{opacity: 0}}
                                            transition={{duration: 0.18}}
                                        >
                                            {isRevealed ? item.value : mask(item.value)}
                                        </motion.code>
                                    </AnimatePresence>
                                </td>
                                <td className="hidden whitespace-nowrap px-3 py-3 text-xs text-zinc-500 md:table-cell dark:text-zinc-400">{item.updated}</td>
                                <td className="sm:px-5 sm:py-3">
                                    <div className="flex items-center justify-end gap-0.5">
                                        {confirming === item.name ? (
                                            <motion.div
                                                className="flex items-center gap-1.5 whitespace-nowrap"
                                                initial={reduceMotion ? {opacity: 0} : {opacity: 0, x: 8}}
                                                animate={{opacity: 1, x: 0}}
                                            >
                                                <span className="text-xs text-zinc-500 dark:text-zinc-400">{rotateWarning}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => rotate(item)}
                                                    autoFocus
                                                    className="h-7 rounded-md bg-rose-600 px-2.5 text-xs font-medium text-white transition hover:bg-rose-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/60 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-zinc-900"
                                                >
                                                    Rotate
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setConfirming(null)}
                                                    className="h-7 rounded-md px-2 text-xs font-medium text-zinc-600 transition hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 dark:text-zinc-300 dark:hover:bg-white/5"
                                                >
                                                    Cancel
                                                </button>
                                            </motion.div>
                                        ) : (
                                            <>
                                                {item.secret && (
                                                    <button type="button" onClick={() => toggleReveal(item.name)} aria-label={`${isRevealed ? "Hide" : "Show"} ${item.name}`} aria-pressed={isRevealed} className={iconButton}>
                                                        {isRevealed ? <LuEyeOff className="size-4" aria-hidden/> : <LuEye className="size-4" aria-hidden/>}
                                                    </button>
                                                )}
                                                {item.rotatable && (
                                                    <button type="button" onClick={() => setConfirming(item.name)} aria-label={`Rotate ${item.name}`} className={iconButton}>
                                                        <LuRefreshCw className="size-4" aria-hidden/>
                                                    </button>
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={() => copy(item.name, item.value)}
                                                    aria-label={isCopied ? `${item.name} copied` : `Copy ${item.name}`}
                                                    className={`${iconButton} ${isCopied ? "!text-emerald-600 dark:!text-emerald-400" : ""}`}
                                                >
                                                    <AnimatePresence mode="popLayout" initial={false}>
                                                        <motion.span
                                                            key={isCopied ? "check" : "copy"}
                                                            className="flex"
                                                            initial={reduceMotion ? {opacity: 0} : {opacity: 0, scale: 0.5}}
                                                            animate={{opacity: 1, scale: 1}}
                                                            exit={{opacity: 0, scale: reduceMotion ? 1 : 0.5}}
                                                            transition={{type: "spring", stiffness: 600, damping: 30}}
                                                        >
                                                            {isCopied ? <LuCheck className="size-4" aria-hidden/> : <LuCopy className="size-4" aria-hidden/>}
                                                        </motion.span>
                                                    </AnimatePresence>
                                                </button>
                                            </>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            <p className="sr-only" aria-live="polite">
                {copied === "env-file" ? "All variables copied" : copied ? `${copied} copied` : ""}
                {rotated ? ` ${rotated} was rotated.` : ""}
            </p>
        </div>
    );
};
