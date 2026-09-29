import {useEffect, useId, useRef, useState} from "react";
import type {ComponentType, KeyboardEvent, ReactNode} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {LuCheck, LuCopy, LuFileCode, LuTerminal} from "react-icons/lu";

const useCopy = (resetAfter: number, onCopy?: (text: string) => void) => {
    const [copied, setCopied] = useState(false);
    const timer = useRef<number | undefined>(undefined);

    useEffect(() => () => window.clearTimeout(timer.current), []);

    const copy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            onCopy?.(text);
            window.clearTimeout(timer.current);
            timer.current = window.setTimeout(() => setCopied(false), resetAfter);
        } catch {
            setCopied(false);
        }
    };

    return {copied, copy};
};

export interface CodeCopyButtonProps {
    text: string;
    /** Accessible name while idle, for example "Copy Revenue.jsx". */
    label: string;
    /** How long the copied state stays, in milliseconds. */
    resetAfter?: number;
    /** Called with the text after a successful copy. */
    onCopy?: (text: string) => void;
}

/** A small copy button for dark code surfaces. The text label hides on narrow screens. */
export const CodeCopyButton = ({text, label, resetAfter = 1600, onCopy}: CodeCopyButtonProps) => {
    const {copied, copy} = useCopy(resetAfter, onCopy);
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

export interface InstallTabsProps {
    /** One install command per package manager, keyed by the manager name. Tabs follow the key order. */
    commands: Record<string, string>;
    /** Selected manager. Pass it with `onChange` to control the tabs. */
    value?: string;
    /** Manager selected on first render. Defaults to the first key of `commands`. */
    defaultValue?: string;
    onChange?: (manager: string) => void;
    /** Accessible name of the tab list. */
    tabsLabel?: string;
    onCopy?: (text: string) => void;
    className?: string;
}

/** An install command with package manager tabs and a copy button for the selected command. */
export const InstallTabs = ({
    commands,
    value,
    defaultValue,
    onChange,
    tabsLabel = "Package manager",
    onCopy,
    className = "",
}: InstallTabsProps) => {
    const managers = Object.keys(commands);
    const [innerValue, setInnerValue] = useState(defaultValue ?? managers[0]);
    const manager = value ?? innerValue;
    const tabRefs = useRef(new Map<string, HTMLButtonElement>());
    const id = useId();

    const select = (next: string) => {
        setInnerValue(next);
        onChange?.(next);
    };

    const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
        const index = managers.indexOf(manager);
        const next = event.key === "ArrowRight" ? managers[(index + 1) % managers.length] : event.key === "ArrowLeft" ? managers[(index - 1 + managers.length) % managers.length] : null;
        if (!next) return;
        event.preventDefault();
        select(next);
        tabRefs.current.get(next)?.focus();
    };

    return (
        <div className={`overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-lg shadow-zinc-950/10 dark:border-white/10 ${className}`}>
            <div className="flex items-center justify-between gap-2 border-b border-white/[0.07] pl-2 pr-1.5">
                <div role="tablist" aria-label={tabsLabel} className="flex">
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
                            onClick={() => select(option)}
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
                <CodeCopyButton text={commands[manager]} label={`Copy ${manager} command`} onCopy={onCopy}/>
            </div>
            <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${manager}`} className="flex items-center gap-3 overflow-x-auto px-4 py-3.5 font-mono text-sm">
                <LuTerminal className="size-4 shrink-0 text-zinc-600" aria-hidden/>
                <code className="whitespace-nowrap text-zinc-100">
                    <span className="select-none text-zinc-500">$ </span>
                    {commands[manager]}
                </code>
            </div>
        </div>
    );
};

// A tiny highlighter for JSX samples: strings, JSX tags and a few keywords.
const highlightJsx = (line: string): ReactNode =>
    line.split(/("[^"]*"|<\/?[A-Za-z]+|\b(?:import|from|export|function|return)\b)/g).map((part, index) => {
        if (/^"/.test(part)) return <span key={index} className="text-emerald-300">{part}</span>;
        if (/^<\/?[A-Za-z]/.test(part)) return <span key={index} className="text-sky-300">{part}</span>;
        if (/^(import|from|export|function|return)$/.test(part)) return <span key={index} className="text-violet-300">{part}</span>;
        return <span key={index}>{part}</span>;
    });

export interface CodeSnippetProps {
    code: string;
    /** File name shown in the header and used in the copy button label. */
    filename: string;
    icon?: ComponentType<{className?: string}>;
    /** Turns one line of code into highlighted nodes. The default colors strings, JSX tags and a few keywords. */
    highlight?: (line: string) => ReactNode;
    onCopy?: (text: string) => void;
    className?: string;
}

/** A code sample with a file name header, line numbers and a copy button. */
export const CodeSnippet = ({code, filename, icon: Icon = LuFileCode, highlight = highlightJsx, onCopy, className = ""}: CodeSnippetProps) => (
    <figure className={`overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950 shadow-lg shadow-zinc-950/10 dark:border-white/10 ${className}`}>
        <figcaption className="flex items-center justify-between border-b border-white/[0.07] py-1.5 pl-4 pr-1.5">
            <span className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                <Icon className="size-3.5 text-sky-400" aria-hidden/>
                {filename}
            </span>
            <CodeCopyButton text={code} label={`Copy ${filename}`} onCopy={onCopy}/>
        </figcaption>
        <pre className="overflow-x-auto py-3 text-[13px] leading-6">
            <code className="grid">
                {code.split("\n").map((line, index) => (
                    <span key={index} className="grid grid-cols-[2.75rem_1fr] pr-4 hover:bg-white/[0.03]">
                        <span className="select-none pr-4 text-right text-zinc-600" aria-hidden>{index + 1}</span>
                        <span className="whitespace-pre text-zinc-200">{highlight(line)}</span>
                    </span>
                ))}
            </code>
        </pre>
    </figure>
);

export interface CodeBlockCopyProps {
    /** One install command per package manager, keyed by the manager name. */
    commands: Record<string, string>;
    /** The usage sample shown under the install command. */
    code: string;
    filename: string;
    /** Selected manager. Pass it with `onChange` to control the tabs. */
    value?: string;
    defaultValue?: string;
    onChange?: (manager: string) => void;
    highlight?: (line: string) => ReactNode;
    /** Called with the copied text after a successful copy from either block. */
    onCopy?: (text: string) => void;
    className?: string;
}

/** An install command with package manager tabs above a highlighted code sample, each with its own copy button. */
export const CodeBlockCopy = ({commands, code, filename, value, defaultValue, onChange, highlight, onCopy, className = ""}: CodeBlockCopyProps) => (
    <div className={`flex w-full max-w-xl flex-col gap-4 ${className}`}>
        <InstallTabs commands={commands} value={value} defaultValue={defaultValue} onChange={onChange} onCopy={onCopy}/>
        <CodeSnippet code={code} filename={filename} highlight={highlight} onCopy={onCopy}/>
    </div>
);
