import {useEffect, useState} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {LuArrowRight, LuCheck, LuCopy} from "react-icons/lu";

export interface CopyCommandProps {
    command: string;
    /** How long the check mark stays after a copy, in milliseconds. */
    resetAfter?: number;
    onCopy?: (command: string) => void;
    className?: string;
}

/** A terminal-style line with a copy button that confirms with a check mark. */
export const CopyCommand = ({command, resetAfter = 1800, onCopy, className = ""}: CopyCommandProps) => {
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (!copied) return;
        const timer = window.setTimeout(() => setCopied(false), resetAfter);
        return () => window.clearTimeout(timer);
    }, [copied, resetAfter]);

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(command);
            setCopied(true);
            onCopy?.(command);
        } catch {
            // Clipboard access can be blocked in iframes; the command stays selectable.
        }
    };

    return (
        <div className={`flex items-center gap-3 rounded-xl border border-white/10 bg-black/30 py-2 pl-4 pr-2 font-mono text-sm text-slate-200 backdrop-blur ${className}`}>
            <span className="select-none text-indigo-300">$</span>
            <code className="flex-1 truncate">{command}</code>
            <button
                type="button"
                onClick={copy}
                aria-label={copied ? "Copied" : "Copy command"}
                className="relative flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 outline-none transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-indigo-300"
            >
                <AnimatePresence mode="wait" initial={false}>
                    <motion.span key={copied ? "done" : "copy"}
                                 initial={{scale: 0.5, opacity: 0}}
                                 animate={{scale: 1, opacity: 1}}
                                 exit={{scale: 0.5, opacity: 0}}
                                 transition={{duration: 0.15}}>
                        {copied ? <LuCheck className="h-4 w-4 text-emerald-400"/> : <LuCopy className="h-4 w-4"/>}
                    </motion.span>
                </AnimatePresence>
            </button>
            <span className="sr-only" aria-live="polite">{copied ? "Command copied to clipboard" : ""}</span>
        </div>
    );
};

export interface CtaPanelProps {
    /** The shell command shown in the copy box. */
    command: string;
    /** Short reassurances listed under the command. */
    perks: string[];
    title?: string;
    description?: string;
    primaryLabel?: string;
    primaryHref?: string;
    secondaryLabel?: string;
    secondaryHref?: string;
    onCopy?: (command: string) => void;
    className?: string;
}

/** A dark call-to-action panel with two links, a copyable install command and a list of perks. */
export const CtaPanel = ({
    command,
    perks,
    title = "Ship your first monitored deploy in ten minutes",
    description = "Run one command in your repository. Relay detects your framework, adds tracing and opens a dashboard for the service it finds.",
    primaryLabel = "Start free trial",
    primaryHref = "#",
    secondaryLabel = "Talk to sales",
    secondaryHref = "#",
    onCopy,
    className = "",
}: CtaPanelProps) => {
    return (
        <section className={`w-full bg-white px-4 py-16 sm:px-8 dark:bg-slate-950 ${className}`}>
            <div className="relative mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-slate-950 px-6 py-14 ring-1 ring-slate-900/10 sm:px-12 dark:ring-white/10">
                {/* Grid pattern and glow */}
                <div aria-hidden="true"
                     className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.06)_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_at_top_right,black_20%,transparent_70%)]"/>
                <div aria-hidden="true" className="absolute -right-24 -top-32 h-80 w-80 rounded-full bg-indigo-500/40 blur-3xl"/>
                <div aria-hidden="true" className="absolute -bottom-40 left-10 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-3xl"/>

                <div className="relative grid items-center gap-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
                    <div>
                        <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                            {title}
                        </h2>
                        <p className="mt-4 max-w-lg text-base leading-relaxed text-slate-300">
                            {description}
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <a href={primaryHref}
                               className="group inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 outline-none transition-colors hover:bg-indigo-50 focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950">
                                {primaryLabel}
                                <LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5"/>
                            </a>
                            {secondaryLabel && (
                                <a href={secondaryHref}
                                   className="inline-flex items-center rounded-xl border border-white/15 px-5 py-3 text-sm font-semibold text-white outline-none transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-indigo-300">
                                    {secondaryLabel}
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <CopyCommand command={command} onCopy={onCopy}/>
                        <ul className="space-y-2.5">
                            {perks.map((perk) => (
                                <li key={perk} className="flex items-center gap-2.5 text-sm text-slate-300">
                                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-300">
                                        <LuCheck className="h-3 w-3"/>
                                    </span>
                                    {perk}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
};
