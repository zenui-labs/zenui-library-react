import {useEffect, useRef, useState} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {LuCopy, LuEye, LuEyeOff, LuLink, LuX} from "react-icons/lu";

type CopyState = "idle" | "copied" | "error";

// Copies text and reports the result, then returns to idle after a moment.
const useCopy = (resetAfter = 1800) => {
    const [state, setState] = useState<CopyState>("idle");
    const timer = useRef<number | null>(null);

    useEffect(() => () => {
        if (timer.current !== null) window.clearTimeout(timer.current);
    }, []);

    const copy = async (text: string) => {
        if (timer.current !== null) window.clearTimeout(timer.current);
        try {
            await navigator.clipboard.writeText(text);
            setState("copied");
        } catch {
            setState("error");
        }
        timer.current = window.setTimeout(() => setState("idle"), resetAfter);
    };

    return {state, copy};
};

// The copy icon shrinks away while a tick is drawn in its place.
const CopyGlyph = ({state}: {state: CopyState}) => {
    const reduceMotion = useReducedMotion();
    return (
        <span className="relative flex h-4 w-4 items-center justify-center" aria-hidden="true">
            <motion.span className="absolute" initial={false} animate={state === "idle" ? {scale: 1, opacity: 1} : {scale: 0.4, opacity: 0}} transition={{duration: 0.15}}>
                <LuCopy className="h-4 w-4"/>
            </motion.span>
            <motion.span className="absolute text-rose-500" initial={false} animate={state === "error" ? {scale: 1, opacity: 1} : {scale: 0.4, opacity: 0}} transition={{duration: 0.15}}>
                <LuX className="h-4 w-4"/>
            </motion.span>
            <svg viewBox="0 0 24 24" className="absolute h-4 w-4 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <motion.path
                    d="M5 12.5l4.5 4.5L19 7.5"
                    initial={false}
                    animate={{pathLength: state === "copied" ? 1 : 0, opacity: state === "copied" ? 1 : 0}}
                    transition={reduceMotion ? {duration: 0} : {duration: 0.3, delay: state === "copied" ? 0.08 : 0}}
                />
            </svg>
        </span>
    );
};

const CommandCopy = () => {
    const {state, copy} = useCopy();
    const command = "npm install @northwind/charts";

    return (
        <div className="flex w-full items-center gap-3 rounded-xl bg-gray-950 py-2 pl-4 pr-2 font-mono text-sm text-gray-100 ring-1 ring-white/10">
            <span className="select-none text-emerald-400" aria-hidden="true">$</span>
            <code className="min-w-0 flex-1 truncate">{command}</code>
            <div className="relative">
                <AnimatePresence>
                    {state !== "idle" && (
                        <motion.span
                            aria-hidden="true"
                            initial={{opacity: 0, y: 6, scale: 0.9}}
                            animate={{opacity: 1, y: 0, scale: 1}}
                            exit={{opacity: 0, y: 4, scale: 0.95}}
                            transition={{type: "spring", stiffness: 500, damping: 30}}
                            className={`absolute bottom-full right-0 mb-2 whitespace-nowrap rounded-md px-2 py-1 font-sans text-xs font-medium shadow-lg ${
                                state === "copied" ? "bg-white text-gray-900" : "bg-rose-500 text-white"
                            }`}
                        >
                            {state === "copied" ? "Copied" : "Copy blocked by the browser"}
                        </motion.span>
                    )}
                </AnimatePresence>
                <motion.button
                    type="button"
                    aria-label="Copy command"
                    onClick={() => copy(command)}
                    whileTap={{scale: 0.9}}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                    <CopyGlyph state={state}/>
                </motion.button>
            </div>
            <span className="sr-only" aria-live="polite">{state === "copied" ? "Copied" : state === "error" ? "Copy failed" : ""}</span>
        </div>
    );
};

const ApiKeyCopy = () => {
    const {state, copy} = useCopy();
    const [visible, setVisible] = useState(false);
    const key = "nw_test_4f9a27c1e08b5d63";
    const shown = visible ? key : `${key.slice(0, 8)}${"•".repeat(12)}${key.slice(-4)}`;

    return (
        <div className="w-full">
            <p className="mb-1.5 text-xs font-medium text-gray-700 dark:text-slate-300">Test API key</p>
            <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white p-1.5 pl-3.5 dark:border-slate-700 dark:bg-slate-900">
                <code className="min-w-0 flex-1 truncate font-mono text-sm text-gray-800 dark:text-slate-200">{shown}</code>
                <button
                    type="button"
                    aria-pressed={visible}
                    aria-label={visible ? "Hide key" : "Show key"}
                    onClick={() => setVisible((value) => !value)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                >
                    {visible ? <LuEyeOff className="h-4 w-4" aria-hidden="true"/> : <LuEye className="h-4 w-4" aria-hidden="true"/>}
                </button>
                {/* The button resizes smoothly as its label changes. */}
                <motion.button
                    layout
                    type="button"
                    onClick={() => copy(key)}
                    transition={{type: "spring", stiffness: 500, damping: 35}}
                    className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 ${
                        state === "copied"
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
                            : state === "error"
                                ? "bg-rose-50 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300"
                                : "bg-gray-900 text-white hover:bg-gray-700 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                    }`}
                >
                    <motion.span layout="position">
                        <CopyGlyph state={state}/>
                    </motion.span>
                    <motion.span layout="position" key={state} initial={{opacity: 0}} animate={{opacity: 1}}>
                        {state === "copied" ? "Copied" : state === "error" ? "Try again" : "Copy"}
                    </motion.span>
                </motion.button>
            </div>
            <span className="sr-only" aria-live="polite">{state === "copied" ? "Copied" : state === "error" ? "Copy failed" : ""}</span>
        </div>
    );
};

const LinkCopy = () => {
    const reduceMotion = useReducedMotion();
    const {state, copy} = useCopy(2200);
    const link = "https://northwind.app/invite/7QX-2M4";

    return (
        <div className="w-full">
            <p className="mb-1.5 text-xs font-medium text-gray-700 dark:text-slate-300">Invite link</p>
            <button
                type="button"
                onClick={() => copy(link)}
                className="group relative flex w-full items-center gap-3 overflow-hidden rounded-xl border border-gray-200 bg-white px-3.5 py-3 text-left text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:border-slate-700 dark:bg-slate-900"
            >
                {/* A colored layer sweeps across the field when the link is copied. */}
                <motion.span
                    aria-hidden="true"
                    className="absolute inset-0 origin-left bg-violet-600 dark:bg-violet-500"
                    initial={false}
                    animate={{scaleX: state === "copied" ? 1 : 0}}
                    transition={reduceMotion ? {duration: 0} : {type: "spring", stiffness: 180, damping: 26}}
                />
                <LuLink className={`relative h-4 w-4 shrink-0 transition-colors ${state === "copied" ? "text-white" : "text-gray-400 dark:text-slate-500"}`} aria-hidden="true"/>
                <span className={`relative min-w-0 flex-1 truncate transition-colors ${state === "copied" ? "text-white" : "text-gray-800 dark:text-slate-200"}`}>
                    {state === "copied" ? "Link copied to your clipboard" : state === "error" ? "Copy blocked. Select the link and copy it manually." : link}
                </span>
                <span className={`relative text-xs font-medium transition-colors ${state === "copied" ? "text-violet-100" : "text-violet-600 group-hover:text-violet-500 dark:text-violet-400"}`}>
                    {state === "copied" ? "Done" : "Copy"}
                </span>
            </button>
            <span className="sr-only" aria-live="polite">{state === "copied" ? "Copied" : state === "error" ? "Copy failed" : ""}</span>
        </div>
    );
};

const CopyButtons = () => (
    <div className="flex w-full max-w-md flex-col gap-6">
        <CommandCopy/>
        <ApiKeyCopy/>
        <LinkCopy/>
    </div>
);

export default CopyButtons;
