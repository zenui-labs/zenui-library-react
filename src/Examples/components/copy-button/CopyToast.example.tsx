import {useEffect, useRef, useState} from "react";
import type {IconType} from "react-icons";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {LuBuilding2, LuCheck, LuCopy, LuHash, LuMail, LuMapPin, LuPhone, LuX} from "react-icons/lu";

interface Detail {
    label: string;
    value: string;
    icon: IconType;
    mono?: boolean;
}

interface Toast {
    id: number;
    message: string;
    ok: boolean;
}

const details: Detail[] = [
    {label: "Email", value: "billing@harborline.co", icon: LuMail},
    {label: "Phone", value: "+1 (415) 555-0142", icon: LuPhone},
    {label: "Tax ID", value: "US 84-2917305", icon: LuHash, mono: true},
    {label: "Address", value: "220 Brannan St, Suite 400, San Francisco, CA 94107", icon: LuMapPin},
];

const TOAST_MS = 2600;
let toastId = 0;

const CopyToast = () => {
    const [toasts, setToasts] = useState<Toast[]>([]);
    const [lastCopied, setLastCopied] = useState<string | null>(null);
    const timers = useRef(new Map<number, number>());
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        const pending = timers.current;
        return () => pending.forEach((timer) => window.clearTimeout(timer));
    }, []);

    const dismiss = (id: number) => {
        window.clearTimeout(timers.current.get(id));
        timers.current.delete(id);
        setToasts((current) => current.filter((toast) => toast.id !== id));
    };

    const push = (message: string, ok: boolean) => {
        const id = ++toastId;
        // Keep at most three toasts on screen.
        setToasts((current) => [...current.slice(-2), {id, message, ok}]);
        timers.current.set(id, window.setTimeout(() => dismiss(id), TOAST_MS));
    };

    const copy = async (detail: Detail) => {
        try {
            await navigator.clipboard.writeText(detail.value);
            setLastCopied(detail.label);
            push(`${detail.label} copied`, true);
        } catch {
            push(`Could not copy ${detail.label.toLowerCase()}`, false);
        }
    };

    return (
        <div className="relative flex w-full max-w-md flex-col items-center pb-32">
            <div className="w-full overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-white/10 dark:bg-zinc-900">
                <div className="flex items-center gap-3 border-b border-zinc-100 px-5 py-4 dark:border-white/[0.06]">
                    <span className="flex size-10 items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 to-sky-600 text-white shadow-inner" aria-hidden>
                        <LuBuilding2 className="size-5"/>
                    </span>
                    <div className="min-w-0">
                        <h3 className="truncate text-sm font-semibold text-zinc-900 dark:text-white">Harborline Logistics</h3>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">Billing contact</p>
                    </div>
                </div>
                <ul className="p-1.5">
                    {details.map((detail) => {
                        const Icon = detail.icon;
                        const justCopied = lastCopied === detail.label && toasts.length > 0;
                        return (
                            <li key={detail.label}>
                                <button
                                    type="button"
                                    onClick={() => copy(detail)}
                                    className="group flex w-full items-start gap-3 rounded-xl px-3.5 py-3 text-left transition hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/60 active:scale-[0.99] dark:hover:bg-white/[0.04]"
                                >
                                    <Icon className="mt-0.5 size-4 shrink-0 text-zinc-400" aria-hidden/>
                                    <span className="min-w-0 flex-1">
                                        <span className="block text-xs text-zinc-500 dark:text-zinc-400">{detail.label}</span>
                                        <span className={`mt-0.5 block break-words text-sm text-zinc-900 dark:text-zinc-100 ${detail.mono ? "font-mono" : ""}`}>{detail.value}</span>
                                    </span>
                                    <span
                                        className={`mt-2 flex size-7 shrink-0 items-center justify-center rounded-lg transition ${
                                            justCopied
                                                ? "bg-teal-50 text-teal-600 dark:bg-teal-400/10 dark:text-teal-300"
                                                : "text-zinc-400 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 max-sm:opacity-100"
                                        }`}
                                        aria-hidden
                                    >
                                        {justCopied ? <LuCheck className="size-3.5"/> : <LuCopy className="size-3.5"/>}
                                    </span>
                                    <span className="sr-only">Copy {detail.label.toLowerCase()}</span>
                                </button>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <ol className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center gap-2" aria-live="polite" aria-label="Notifications">
                <AnimatePresence initial={false}>
                    {toasts.map((toast) => (
                        <motion.li
                            key={toast.id}
                            layout={!reduceMotion}
                            initial={reduceMotion ? {opacity: 0} : {opacity: 0, y: 16, scale: 0.96}}
                            animate={{opacity: 1, y: 0, scale: 1}}
                            exit={reduceMotion ? {opacity: 0} : {opacity: 0, scale: 0.96, transition: {duration: 0.15}}}
                            transition={{type: "spring", stiffness: 480, damping: 34}}
                            className="pointer-events-auto flex items-center gap-2.5 rounded-full bg-zinc-900 py-1.5 pl-2 pr-1.5 text-sm text-white shadow-lg shadow-zinc-950/20 dark:bg-white dark:text-zinc-900"
                        >
                            <span className={`flex size-5 items-center justify-center rounded-full ${toast.ok ? "bg-teal-500" : "bg-rose-500"} text-white`} aria-hidden>
                                {toast.ok ? <LuCheck className="size-3" strokeWidth={3}/> : <LuX className="size-3" strokeWidth={3}/>}
                            </span>
                            {toast.message}
                            <button
                                type="button"
                                onClick={() => dismiss(toast.id)}
                                aria-label="Dismiss"
                                className="flex size-6 items-center justify-center rounded-full text-zinc-400 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 dark:text-zinc-500 dark:hover:bg-zinc-900/10 dark:hover:text-zinc-900"
                            >
                                <LuX className="size-3.5" aria-hidden/>
                            </button>
                        </motion.li>
                    ))}
                </AnimatePresence>
            </ol>
        </div>
    );
};

export default CopyToast;
