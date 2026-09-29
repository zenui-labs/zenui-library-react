import {useEffect, useId, useRef, useState} from "react";
import type {KeyboardEvent} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {LuCheck, LuCopy, LuFileCode, LuTerminal} from "react-icons/lu";

type Manager = "npm" | "pnpm" | "yarn" | "bun";

const commands: Record<Manager, string> = {
    npm: "npm install @acme/charts",
    pnpm: "pnpm add @acme/charts",
    yarn: "yarn add @acme/charts",
    bun: "bun add @acme/charts",
};

const managers = Object.keys(commands) as Manager[];

const snippet = `import {LineChart} from "@acme/charts";

export function Revenue({data}) {
  return (
    <LineChart
      data={data}
      x="month"
      y="revenue"
      curve="monotone"
    />
  );
}`;

const useCopy = (resetAfter = 1600) => {
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

const CopyIconButton = ({text, label}: {text: string; label: string}) => {
    const {copied, copy} = useCopy();
    const reduceMotion = useReducedMotion();
    return (
        <button
            type="button"
            onClick={() => copy(text)}
            aria-label={copied ? "Copied" : label}
            className="relative flex h-8 items-center gap-1.5 rounded-lg px-2 text-xs font-medium text-zinc-400 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70"
        >
            <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                    key={copied ? "done" : "idle"}
                    className="flex items-center gap-1.5"
                    initial={reduceMotion ? {opacity: 0} : {opacity: 0, y: 6}}
                    animate={{opacity: 1, y: 0}}
                    exit={reduceMotion ? {opacity: 0} : {opacity: 0, y: -6}}
                    transition={{duration: 0.16}}
                >
                    {copied ? <LuCheck className="size-3.5 text-emerald-400" aria-hidden/> : <LuCopy className="size-3.5" aria-hidden/>}
                    <span className={copied ? "" : "sr-only sm:not-sr-only"}>{copied ? "Copied" : "Copy"}</span>
                </motion.span>
            </AnimatePresence>
            <span className="sr-only" aria-live="polite">{copied ? "Copied to clipboard" : ""}</span>
        </button>
    );
};

// A tiny highlighter for the sample: strings, JSX tags and a few keywords.
const highlight = (line: string) =>
    line.split(/("[^"]*"|<\/?[A-Za-z]+|\b(?:import|from|export|function|return)\b)/g).map((part, index) => {
        if (/^"/.test(part)) return <span key={index} className="text-emerald-300">{part}</span>;
        if (/^<\/?[A-Za-z]/.test(part)) return <span key={index} className="text-sky-300">{part}</span>;
        if (/^(import|from|export|function|return)$/.test(part)) return <span key={index} className="text-violet-300">{part}</span>;
        return <span key={index}>{part}</span>;
    });

const CodeBlockCopy = () => {
    const [manager, setManager] = useState<Manager>("pnpm");
    const tabRefs = useRef(new Map<Manager, HTMLButtonElement>());
    const id = useId();

    const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
        const index = managers.indexOf(manager);
        const next = event.key === "ArrowRight" ? managers[(index + 1) % managers.length] : event.key === "ArrowLeft" ? managers[(index - 1 + managers.length) % managers.length] : null;
        if (!next) return;
        event.preventDefault();
        setManager(next);
        tabRefs.current.get(next)?.focus();
    };

    return (
        <div className="flex w-full max-w-xl flex-col gap-4">
            <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-lg shadow-zinc-950/10 dark:border-white/10">
                <div className="flex items-center justify-between gap-2 border-b border-white/[0.07] pl-2 pr-1.5">
                    <div role="tablist" aria-label="Package manager" className="flex">
                        {managers.map((option) => (
                            <button
                                key={option}
                                ref={(element) => {
                                    if (element) tabRefs.current.set(option, element);
                                    else tabRefs.current.delete(option);
                                }}
                                type="button"
                                role="tab"
                                id={`${id}-tab-${option}`}
                                aria-selected={manager === option}
                                aria-controls={`${id}-panel`}
                                tabIndex={manager === option ? 0 : -1}
                                onClick={() => setManager(option)}
                                onKeyDown={onTabKeyDown}
                                className={`relative px-3 py-2.5 font-mono text-xs transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sky-400/70 ${
                                    manager === option ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                                }`}
                            >
                                {option}
                                {manager === option && <motion.span layoutId={`${id}-underline`} className="absolute inset-x-2 -bottom-px h-px bg-sky-400"/>}
                            </button>
                        ))}
                    </div>
                    <CopyIconButton text={commands[manager]} label={`Copy ${manager} command`}/>
                </div>
                <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${manager}`} className="flex items-center gap-3 overflow-x-auto px-4 py-3.5 font-mono text-sm">
                    <LuTerminal className="size-4 shrink-0 text-zinc-600" aria-hidden/>
                    <code className="whitespace-nowrap text-zinc-100">
                        <span className="select-none text-zinc-500">$ </span>
                        {commands[manager]}
                    </code>
                </div>
            </div>

            <figure className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-lg shadow-zinc-950/10 dark:border-white/10">
                <figcaption className="flex items-center justify-between border-b border-white/[0.07] py-1.5 pl-4 pr-1.5">
                    <span className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                        <LuFileCode className="size-3.5 text-sky-400" aria-hidden/>
                        Revenue.jsx
                    </span>
                    <CopyIconButton text={snippet} label="Copy Revenue.jsx"/>
                </figcaption>
                <pre className="overflow-x-auto py-3 text-[13px] leading-6">
                    <code className="grid">
                        {snippet.split("\n").map((line, index) => (
                            <span key={index} className="grid grid-cols-[2.75rem_1fr] pr-4 hover:bg-white/[0.03]">
                                <span className="select-none pr-4 text-right text-zinc-600" aria-hidden>{index + 1}</span>
                                <span className="whitespace-pre text-zinc-200">{highlight(line)}</span>
                            </span>
                        ))}
                    </code>
                </pre>
            </figure>
        </div>
    );
};

export default CodeBlockCopy;
