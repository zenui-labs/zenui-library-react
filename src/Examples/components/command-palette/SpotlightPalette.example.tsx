import {useEffect, useId, useMemo, useRef, useState} from "react";
import type {KeyboardEvent} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import type {IconType} from "react-icons";
import {
    LuAppWindow,
    LuBellOff,
    LuCalculator,
    LuCheck,
    LuCopy,
    LuFileText,
    LuMonitorUp,
    LuSearch,
    LuStickyNote,
    LuTimer,
} from "react-icons/lu";

interface Item {
    id: string;
    label: string;
    kind: "App" | "File" | "Action";
    icon: IconType;
    tint: string;
    detail?: string;
}

const items: Item[] = [
    {id: "notes", label: "Notes", kind: "App", icon: LuStickyNote, tint: "from-amber-300 to-amber-500"},
    {id: "calendar", label: "Calendar", kind: "App", icon: LuAppWindow, tint: "from-rose-400 to-red-500"},
    {id: "figma", label: "Figma", kind: "App", icon: LuAppWindow, tint: "from-violet-400 to-fuchsia-500"},
    {id: "invoice", label: "Invoice 2026-09 Northwind.pdf", kind: "File", icon: LuFileText, tint: "from-sky-400 to-blue-500", detail: "Documents / Billing"},
    {id: "brief", label: "Brand refresh brief.docx", kind: "File", icon: LuFileText, tint: "from-sky-400 to-blue-500", detail: "Shared / Marketing"},
    {id: "focus", label: "Start a 25 minute focus timer", kind: "Action", icon: LuTimer, tint: "from-emerald-400 to-teal-500"},
    {id: "share", label: "Share screen", kind: "Action", icon: LuMonitorUp, tint: "from-indigo-400 to-indigo-600"},
];

interface QuickAction {
    id: string;
    label: string;
    icon: IconType;
    toggle?: boolean;
}

const quickActions: QuickAction[] = [
    {id: "note", label: "New note", icon: LuStickyNote},
    {id: "timer", label: "Focus timer", icon: LuTimer},
    {id: "share", label: "Share screen", icon: LuMonitorUp},
    {id: "dnd", label: "Do not disturb", icon: LuBellOff, toggle: true},
];

// A small recursive descent parser for + - * / ^ %, parentheses and "x% of y".
// It never calls eval, so anything it does not understand simply returns null.
const calculate = (input: string): number | null => {
    const source = input.replace(/,/g, "").replace(/×/g, "*").replace(/÷/g, "/").trim().toLowerCase();
    const percentOf = source.match(/^(-?\d+(?:\.\d+)?)\s*%\s*of\s*(-?\d+(?:\.\d+)?)$/);
    if (percentOf) return (Number(percentOf[1]) / 100) * Number(percentOf[2]);
    if (!/[+\-*/^%]/.test(source) || !/^[\d\s.+\-*/^%()]+$/.test(source)) return null;

    const tokens = source.match(/\d*\.?\d+|[+\-*/^%()]/g) ?? [];
    let position = 0;
    const peek = () => tokens[position];
    const next = () => tokens[position++];

    const primary = (): number => {
        const token = next();
        if (token === "(") {
            const value = expression();
            if (next() !== ")") throw new Error("Missing bracket");
            return value;
        }
        if (token === "-") return -primary();
        const value = Number(token);
        if (Number.isNaN(value)) throw new Error("Unexpected token");
        if (peek() === "%") {
            next();
            return value / 100;
        }
        return value;
    };
    const power = (): number => {
        const base = primary();
        if (peek() === "^") {
            next();
            return base ** power();
        }
        return base;
    };
    const term = (): number => {
        let value = power();
        while (peek() === "*" || peek() === "/") value = next() === "*" ? value * power() : value / power();
        return value;
    };
    function expression(): number {
        let value = term();
        while (peek() === "+" || peek() === "-") value = next() === "+" ? value + term() : value - term();
        return value;
    }

    try {
        const value = expression();
        return position === tokens.length && Number.isFinite(value) ? value : null;
    } catch {
        return null;
    }
};

const formatNumber = (value: number) => value.toLocaleString("en-US", {maximumFractionDigits: 8});

const SpotlightPalette = () => {
    const [query, setQuery] = useState("");
    const [active, setActive] = useState(0);
    const [copied, setCopied] = useState(false);
    const [dnd, setDnd] = useState(false);
    const [status, setStatus] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const reduceMotion = useReducedMotion();
    const listId = useId();

    const result = useMemo(() => calculate(query), [query]);
    const matches = useMemo(() => {
        const needle = query.trim().toLowerCase();
        if (!needle || result !== null) return [];
        return items.filter((item) => item.label.toLowerCase().includes(needle) || item.kind.toLowerCase().startsWith(needle));
    }, [query, result]);

    // Row 0 is the calculator when there is a result, then the matching items.
    const rowCount = (result !== null ? 1 : 0) + matches.length;

    useEffect(() => {
        if (!copied) return;
        const timer = window.setTimeout(() => setCopied(false), 1600);
        return () => window.clearTimeout(timer);
    }, [copied]);

    const copyResult = async () => {
        if (result === null) return;
        try {
            await navigator.clipboard.writeText(String(result));
        } catch {
            // Clipboard access can be blocked in frames. The confirmation still shows what would be copied.
        }
        setCopied(true);
        setStatus(`Copied ${formatNumber(result)}`);
    };

    const runItem = (item: Item) => {
        setStatus(item.kind === "Action" ? `Ran ${item.label.toLowerCase()}` : `Opened ${item.label}`);
        setQuery("");
        inputRef.current?.focus();
    };

    const runQuickAction = (action: QuickAction) => {
        if (action.toggle) {
            setDnd((value) => !value);
            setStatus(dnd ? "Do not disturb is off" : "Do not disturb is on until 5 PM");
        } else {
            setStatus(`Ran ${action.label.toLowerCase()}`);
        }
    };

    const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "ArrowDown" && rowCount) {
            event.preventDefault();
            setActive((index) => (index + 1) % rowCount);
        } else if (event.key === "ArrowUp" && rowCount) {
            event.preventDefault();
            setActive((index) => (index - 1 + rowCount) % rowCount);
        } else if (event.key === "Enter" && rowCount) {
            event.preventDefault();
            if (result !== null && active === 0) void copyResult();
            else runItem(matches[active - (result !== null ? 1 : 0)]);
        } else if (event.key === "Escape") {
            setQuery("");
        }
    };

    const activeId = rowCount ? `${listId}-row-${active}` : undefined;

    return (
        <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl bg-gradient-to-br from-sky-200 via-indigo-200 to-rose-200 p-4 sm:p-10 dark:from-sky-950 dark:via-indigo-950 dark:to-rose-950">
            <div className="pointer-events-none absolute -left-16 -top-16 size-64 rounded-full bg-white/50 blur-3xl dark:bg-indigo-500/20" aria-hidden/>
            <div className="pointer-events-none absolute -bottom-20 -right-10 size-72 rounded-full bg-rose-300/50 blur-3xl dark:bg-fuchsia-500/10" aria-hidden/>

            <div className="relative overflow-hidden rounded-2xl border border-white/60 bg-white/70 shadow-2xl shadow-indigo-950/20 backdrop-blur-2xl dark:border-white/10 dark:bg-zinc-900/70 dark:shadow-black/50">
                <div className="flex items-center gap-3 px-4 sm:px-5">
                    <LuSearch className="size-5 shrink-0 text-zinc-400 dark:text-zinc-500" aria-hidden/>
                    <input
                        ref={inputRef}
                        value={query}
                        onChange={(event) => {
                            setQuery(event.target.value);
                            setActive(0);
                            setCopied(false);
                        }}
                        onKeyDown={onKeyDown}
                        placeholder="Search or calculate"
                        aria-label="Search apps, files and actions, or type a sum"
                        role="combobox"
                        aria-expanded={rowCount > 0}
                        aria-controls={listId}
                        aria-autocomplete="list"
                        aria-activedescendant={activeId}
                        className="h-16 min-w-0 flex-1 bg-transparent text-lg text-zinc-900 outline-none placeholder:text-zinc-400 sm:text-xl dark:text-white dark:placeholder:text-zinc-500"
                    />
                </div>

                <div className="border-t border-zinc-900/[0.06] dark:border-white/[0.06]">
                    {query.trim() === "" ? (
                        <div className="p-3 sm:p-4">
                            <p className="px-1 pb-2 text-[11px] font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Quick actions</p>
                            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                                {quickActions.map((action) => {
                                    const Icon = action.icon;
                                    const on = action.toggle && dnd;
                                    return (
                                        <button
                                            key={action.id}
                                            type="button"
                                            onClick={() => runQuickAction(action)}
                                            aria-pressed={action.toggle ? dnd : undefined}
                                            className={`flex flex-col items-start gap-3 rounded-xl border p-3 text-left text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/70 ${
                                                on
                                                    ? "border-indigo-500/30 bg-indigo-500 text-white shadow-lg shadow-indigo-500/30"
                                                    : "border-zinc-900/[0.06] bg-white/60 text-zinc-800 hover:bg-white dark:border-white/[0.06] dark:bg-white/[0.04] dark:text-zinc-100 dark:hover:bg-white/[0.08]"
                                            }`}
                                        >
                                            <Icon className={`size-5 ${on ? "text-white" : "text-zinc-500 dark:text-zinc-400"}`} aria-hidden/>
                                            {action.label}
                                        </button>
                                    );
                                })}
                            </div>
                            <p className="px-1 pt-3 text-xs text-zinc-500 dark:text-zinc-400">Try “18% of 2,450”, “(12 + 4) * 3” or “fig”.</p>
                        </div>
                    ) : (
                        <ul id={listId} role="listbox" aria-label="Results" className="max-h-80 overflow-y-auto p-2">
                            {result !== null && (
                                <li
                                    id={`${listId}-row-0`}
                                    role="option"
                                    aria-selected={active === 0}
                                    onMouseMove={() => setActive(0)}
                                    onClick={() => void copyResult()}
                                    className={`flex cursor-pointer items-center gap-4 rounded-xl p-3 transition-colors ${active === 0 ? "bg-zinc-900/[0.05] dark:bg-white/[0.07]" : ""}`}
                                >
                                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-zinc-600 to-zinc-800 text-white shadow-sm" aria-hidden>
                                        <LuCalculator className="size-5"/>
                                    </span>
                                    <span className="min-w-0 flex-1">
                                        <span className="block truncate text-xs text-zinc-500 dark:text-zinc-400">{query.trim()} =</span>
                                        <AnimatePresence mode="popLayout" initial={false}>
                                            <motion.span
                                                key={result}
                                                className="block truncate text-2xl font-semibold tabular-nums tracking-tight text-zinc-900 dark:text-white"
                                                initial={reduceMotion ? {opacity: 0} : {opacity: 0, y: 8}}
                                                animate={{opacity: 1, y: 0}}
                                                exit={reduceMotion ? {opacity: 0} : {opacity: 0, y: -8}}
                                                transition={{duration: 0.16}}
                                            >
                                                {formatNumber(result)}
                                            </motion.span>
                                        </AnimatePresence>
                                    </span>
                                    <span className="flex shrink-0 items-center gap-1.5 rounded-lg bg-white/70 px-2 py-1 text-xs font-medium text-zinc-600 ring-1 ring-zinc-900/[0.06] dark:bg-white/5 dark:text-zinc-300 dark:ring-white/10">
                                        {copied ? <LuCheck className="size-3.5 text-emerald-500" aria-hidden/> : <LuCopy className="size-3.5" aria-hidden/>}
                                        {copied ? "Copied" : "Copy"}
                                    </span>
                                </li>
                            )}
                            {matches.map((item, index) => {
                                const row = index + (result !== null ? 1 : 0);
                                const Icon = item.icon;
                                return (
                                    <li
                                        key={item.id}
                                        id={`${listId}-row-${row}`}
                                        role="option"
                                        aria-selected={active === row}
                                        onMouseMove={() => setActive(row)}
                                        onClick={() => runItem(item)}
                                        className={`flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 transition-colors ${active === row ? "bg-zinc-900/[0.05] dark:bg-white/[0.07]" : ""}`}
                                    >
                                        <span className={`flex size-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br text-white shadow-sm ${item.tint}`} aria-hidden>
                                            <Icon className="size-4"/>
                                        </span>
                                        <span className="min-w-0 flex-1">
                                            <span className="block truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">{item.label}</span>
                                            {item.detail && <span className="block truncate text-xs text-zinc-500 dark:text-zinc-400">{item.detail}</span>}
                                        </span>
                                        <span className="shrink-0 text-xs text-zinc-400 dark:text-zinc-500">{item.kind}</span>
                                    </li>
                                );
                            })}
                            {rowCount === 0 && (
                                <li role="presentation" className="px-3 py-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
                                    No apps, files or actions match “{query.trim()}”
                                </li>
                            )}
                        </ul>
                    )}
                </div>
            </div>
            <p className="relative mt-3 min-h-4 text-center text-xs text-zinc-700 dark:text-zinc-300" aria-live="polite">
                {status}
            </p>
        </div>
    );
};

export default SpotlightPalette;
