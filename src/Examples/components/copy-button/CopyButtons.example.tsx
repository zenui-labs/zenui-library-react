import {useEffect, useRef, useState} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {LuCheck, LuCopy, LuLink, LuX} from "react-icons/lu";

type CopyState = "idle" | "copied" | "failed";

// Copies text and reports the result for a short while. Falls back to a hidden textarea
// when the Clipboard API is not available, for example on pages served over plain http.
const useCopy = (resetAfter = 1800) => {
    const [state, setState] = useState<CopyState>("idle");
    const timer = useRef<number | undefined>(undefined);

    useEffect(() => () => window.clearTimeout(timer.current), []);

    const copy = async (text: string) => {
        let ok = true;
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(text);
            } else {
                const textarea = document.createElement("textarea");
                textarea.value = text;
                textarea.setAttribute("readonly", "");
                textarea.style.position = "fixed";
                textarea.style.opacity = "0";
                document.body.appendChild(textarea);
                textarea.select();
                ok = document.execCommand("copy");
                textarea.remove();
            }
        } catch {
            ok = false;
        }
        setState(ok ? "copied" : "failed");
        window.clearTimeout(timer.current);
        timer.current = window.setTimeout(() => setState("idle"), resetAfter);
    };

    return {state, copy};
};

const StateIcon = ({state, className}: {state: CopyState; className: string}) => {
    const reduceMotion = useReducedMotion();
    const Icon = state === "copied" ? LuCheck : state === "failed" ? LuX : LuCopy;
    return (
        <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
                key={state}
                className="flex"
                initial={reduceMotion ? {opacity: 0} : {opacity: 0, scale: 0.5, rotate: -30}}
                animate={{opacity: 1, scale: 1, rotate: 0}}
                exit={reduceMotion ? {opacity: 0} : {opacity: 0, scale: 0.5}}
                transition={{type: "spring", stiffness: 600, damping: 30}}
            >
                <Icon className={className} aria-hidden/>
            </motion.span>
        </AnimatePresence>
    );
};

const IconCopyButton = ({value, label}: {value: string; label: string}) => {
    const {state, copy} = useCopy();
    const tip = state === "copied" ? "Copied" : state === "failed" ? "Copy failed" : label;
    return (
        <button
            type="button"
            onClick={() => copy(value)}
            aria-label={label}
            className={`group relative flex size-8 items-center justify-center rounded-lg border transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 ${
                state === "copied"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-600 dark:border-emerald-400/30 dark:bg-emerald-400/10 dark:text-emerald-300"
                    : "border-zinc-200 bg-white text-zinc-500 hover:border-zinc-300 hover:text-zinc-900 active:scale-95 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-white/20 dark:hover:text-white"
            }`}
        >
            <StateIcon state={state} className="size-3.5"/>
            <span
                className={`pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-zinc-900 px-2 py-1 text-[11px] font-medium text-white transition-opacity dark:bg-white dark:text-zinc-900 ${
                    state === "idle" ? "opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100" : "opacity-100"
                }`}
                aria-hidden
            >
                {tip}
            </span>
            <span className="sr-only" aria-live="polite">{state === "copied" ? "Copied" : state === "failed" ? "Copy failed" : ""}</span>
        </button>
    );
};

const LabelCopyButton = ({value}: {value: string}) => {
    const {state, copy} = useCopy();
    return (
        <button
            type="button"
            onClick={() => copy(value)}
            className={`inline-flex h-9 items-center gap-2 rounded-lg px-3.5 text-sm font-medium shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white active:scale-[0.98] dark:focus-visible:ring-offset-zinc-950 ${
                state === "copied"
                    ? "bg-emerald-600 text-white dark:bg-emerald-500"
                    : "bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200"
            }`}
        >
            {state === "idle" ? <LuLink className="size-4" aria-hidden/> : <StateIcon state={state} className="size-4"/>}
            <span className="relative inline-grid" aria-live="polite">
                {/* Both labels share one grid cell so the button keeps its width. */}
                <span className={`col-start-1 row-start-1 transition-opacity ${state === "idle" ? "opacity-100" : "opacity-0"}`}>Copy invite link</span>
                <span className={`col-start-1 row-start-1 transition-opacity ${state === "idle" ? "opacity-0" : "opacity-100"}`}>
                    {state === "failed" ? "Copy failed" : "Link copied"}
                </span>
            </span>
        </button>
    );
};

const swatches = [
    {name: "Indigo 500", hex: "#6366F1", className: "bg-indigo-500"},
    {name: "Emerald 500", hex: "#10B981", className: "bg-emerald-500"},
    {name: "Amber 400", hex: "#FBBF24", className: "bg-amber-400"},
    {name: "Rose 500", hex: "#F43F5E", className: "bg-rose-500"},
    {name: "Zinc 900", hex: "#18181B", className: "bg-zinc-900 dark:ring-1 dark:ring-inset dark:ring-white/15"},
];

const Swatch = ({name, hex, className}: {name: string; hex: string; className: string}) => {
    const {state, copy} = useCopy();
    return (
        <button
            type="button"
            onClick={() => copy(hex)}
            aria-label={`Copy ${name}, ${hex}`}
            className="group flex flex-col items-start gap-2 rounded-xl p-1.5 text-left transition hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 dark:hover:bg-white/5"
        >
            <span className={`relative flex h-14 w-full items-center justify-center rounded-lg ${className}`}>
                <span className={`flex size-7 items-center justify-center rounded-full bg-white/90 text-zinc-900 shadow transition ${state === "idle" ? "scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100" : "scale-100 opacity-100"}`}>
                    <StateIcon state={state} className="size-3.5"/>
                </span>
            </span>
            <span className="px-0.5">
                <span className="block text-xs font-medium text-zinc-800 dark:text-zinc-100">{name}</span>
                <span className="block font-mono text-[11px] uppercase text-zinc-500 dark:text-zinc-400">{state === "copied" ? "Copied" : hex}</span>
            </span>
        </button>
    );
};

const CopyButtons = () => (
    <div className="flex w-full max-w-xl flex-col gap-8">
        <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white py-1.5 pl-3 pr-1.5 dark:border-white/10 dark:bg-zinc-900">
                <span className="text-xs text-zinc-500 dark:text-zinc-400">Order</span>
                <code className="font-mono text-sm text-zinc-900 dark:text-zinc-100">ord_8F2K4D91</code>
                <IconCopyButton value="ord_8F2K4D91" label="Copy order ID"/>
            </div>
            <LabelCopyButton value="https://app.example.com/join/atlas-team"/>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
            {swatches.map((swatch) => (
                <Swatch key={swatch.hex} {...swatch}/>
            ))}
        </div>
    </div>
);

export default CopyButtons;
