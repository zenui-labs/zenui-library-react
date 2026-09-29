import {useEffect, useId, useRef, useState} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {LuCheck, LuCopy, LuEye, LuEyeOff, LuGlobe} from "react-icons/lu";

const useCopy = (resetAfter = 2000) => {
    const [copied, setCopied] = useState(false);
    const timer = useRef<number | undefined>(undefined);

    useEffect(() => () => window.clearTimeout(timer.current), []);

    const copy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            window.clearTimeout(timer.current);
            timer.current = window.setTimeout(() => setCopied(false), resetAfter);
        } catch {
            setCopied(false);
        }
    };

    return {copied, copy};
};

interface CopyFieldProps {
    label: string;
    hint: string;
    value: string;
    secret?: boolean;
}

const CopyField = ({label, hint, value, secret = false}: CopyFieldProps) => {
    const {copied, copy} = useCopy();
    const [revealed, setRevealed] = useState(!secret);
    const id = useId();
    const reduceMotion = useReducedMotion();
    const masked = `${value.slice(0, 8)}${"•".repeat(Math.max(value.length - 12, 8))}${value.slice(-4)}`;

    return (
        <div>
            <label htmlFor={id} className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                {label}
            </label>
            <p id={`${id}-hint`} className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">{hint}</p>
            <div className="mt-2 flex h-11 items-center overflow-hidden rounded-xl border border-zinc-200 bg-zinc-50 transition focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-500/10 dark:border-white/10 dark:bg-white/[0.03] dark:focus-within:border-indigo-400/60 dark:focus-within:ring-indigo-400/10">
                <input
                    id={id}
                    readOnly
                    value={revealed ? value : masked}
                    onFocus={(event) => event.currentTarget.select()}
                    aria-describedby={`${id}-hint`}
                    className="h-full min-w-0 flex-1 bg-transparent px-3.5 font-mono text-[13px] text-zinc-700 outline-none selection:bg-indigo-200 dark:text-zinc-200 dark:selection:bg-indigo-500/40"
                />
                {secret && (
                    <button
                        type="button"
                        onClick={() => setRevealed((value) => !value)}
                        aria-label={revealed ? "Hide key" : "Show key"}
                        aria-pressed={revealed}
                        className="flex h-full w-10 shrink-0 items-center justify-center text-zinc-400 transition hover:text-zinc-800 focus-visible:bg-zinc-100 focus-visible:text-zinc-800 focus-visible:outline-none dark:hover:text-zinc-100 dark:focus-visible:bg-white/5 dark:focus-visible:text-zinc-100"
                    >
                        {revealed ? <LuEyeOff className="size-4" aria-hidden/> : <LuEye className="size-4" aria-hidden/>}
                    </button>
                )}
                <button
                    type="button"
                    onClick={() => copy(value)}
                    className={`flex h-full shrink-0 items-center gap-1.5 border-l px-3.5 text-xs font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500/60 ${
                        copied
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300"
                            : "border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-100 dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
                    }`}
                >
                    <AnimatePresence mode="popLayout" initial={false}>
                        <motion.span
                            key={copied ? "copied" : "copy"}
                            className="flex items-center gap-1.5"
                            initial={reduceMotion ? {opacity: 0} : {opacity: 0, y: 6}}
                            animate={{opacity: 1, y: 0}}
                            exit={reduceMotion ? {opacity: 0} : {opacity: 0, y: -6}}
                            transition={{duration: 0.16}}
                        >
                            {copied ? <LuCheck className="size-3.5" aria-hidden/> : <LuCopy className="size-3.5" aria-hidden/>}
                            <span className="w-11 text-left">{copied ? "Copied" : "Copy"}</span>
                        </motion.span>
                    </AnimatePresence>
                </button>
            </div>
            <span className="sr-only" aria-live="polite">{copied ? `${label} copied to clipboard` : ""}</span>
        </div>
    );
};

const CopyFieldExample = () => (
    <div className="w-full max-w-md space-y-6 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-white/10 dark:bg-zinc-900">
        <div className="flex items-start gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 dark:bg-indigo-400/10 dark:text-indigo-300">
                <LuGlobe className="size-4" aria-hidden/>
            </span>
            <div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Share Atlas mobile app</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Anyone with the link can view. Only members can edit.</p>
            </div>
        </div>
        <CopyField label="Invite link" hint="Expires in 7 days." value="https://app.example.com/join/atlas-7Qm2Kx"/>
        <CopyField
            label="Deploy key"
            hint="Store it somewhere safe. You will not be able to see it again after you leave."
            value="dk_prod_6hT9wQ2mZrV4cX8pLs1B"
            secret
        />
    </div>
);

export default CopyFieldExample;
