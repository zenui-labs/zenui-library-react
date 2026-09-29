import {useEffect, useId, useMemo, useRef, useState} from "react";
import type {KeyboardEvent, MouseEvent, ReactNode} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import type {IconType} from "react-icons";
import {
    LuArrowDown,
    LuArrowUp,
    LuBell,
    LuCornerDownLeft,
    LuCreditCard,
    LuFolder,
    LuInbox,
    LuKey,
    LuLogOut,
    LuPlus,
    LuSearch,
    LuSearchX,
    LuUserPlus,
} from "react-icons/lu";

// ⌘K is the usual choice. This demo listens for ⌘J so it does not clash with other shortcuts on the page.
const SHORTCUT_KEY = "j";

interface Command {
    id: string;
    label: string;
    group: string;
    icon: IconType;
    shortcut?: string[];
    detail?: string;
    keywords?: string[];
}

const commands: Command[] = [
    {id: "new-issue", label: "Create new issue", group: "Suggestions", icon: LuPlus, shortcut: ["C"], keywords: ["add", "task", "bug"]},
    {id: "invite", label: "Invite teammates", group: "Suggestions", icon: LuUserPlus, keywords: ["member", "team", "people"]},
    {id: "inbox", label: "Go to inbox", group: "Suggestions", icon: LuInbox, shortcut: ["G", "I"], keywords: ["messages", "mentions"]},
    {id: "atlas", label: "Atlas mobile app", group: "Projects", icon: LuFolder, detail: "12 open issues"},
    {id: "billing-migration", label: "Billing migration", group: "Projects", icon: LuFolder, detail: "4 open issues"},
    {id: "marketing-site", label: "Marketing site refresh", group: "Projects", icon: LuFolder, detail: "Updated yesterday"},
    {id: "notifications", label: "Notification settings", group: "Settings", icon: LuBell, keywords: ["email", "alerts"]},
    {id: "billing", label: "Billing and plans", group: "Settings", icon: LuCreditCard, keywords: ["invoice", "payment", "upgrade"]},
    {id: "tokens", label: "API tokens", group: "Settings", icon: LuKey, keywords: ["developer", "keys"]},
    {id: "logout", label: "Log out", group: "Settings", icon: LuLogOut, shortcut: ["⇧", "Q"], keywords: ["sign out"]},
];

const matches = (command: Command, query: string) => {
    const text = [command.label, command.group, ...(command.keywords ?? [])].join(" ").toLowerCase();
    return query
        .toLowerCase()
        .split(/\s+/)
        .filter(Boolean)
        .every((word) => text.includes(word));
};

const Kbd = ({children}: {children: ReactNode}) => (
    <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded-[5px] border border-zinc-200 bg-zinc-50 px-1 font-sans text-[11px] font-medium text-zinc-500 shadow-[0_1px_0_rgba(0,0,0,0.04)] dark:border-white/10 dark:bg-white/5 dark:text-zinc-400">
        {children}
    </kbd>
);

// Bolds the first part of the label that matches the query.
const Highlight = ({text, query}: {text: string; query: string}) => {
    const needle = query.trim().toLowerCase();
    const start = needle ? text.toLowerCase().indexOf(needle) : -1;
    if (start === -1) return <>{text}</>;
    return (
        <>
            {text.slice(0, start)}
            <mark className="bg-transparent font-semibold text-zinc-950 dark:text-white">
                {text.slice(start, start + needle.length)}
            </mark>
            {text.slice(start + needle.length)}
        </>
    );
};

const CommandPalette = () => {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [active, setActive] = useState(0);
    const [lastRun, setLastRun] = useState<string | null>(null);
    const [isMac, setIsMac] = useState(true);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const optionRefs = useRef(new Map<string, HTMLLIElement>());
    const wasOpen = useRef(false);
    const reduceMotion = useReducedMotion();
    const listId = useId();

    useEffect(() => {
        setIsMac(/Mac|iPhone|iPad/.test(navigator.userAgent));
    }, []);

    // Global shortcut toggles the palette from anywhere on the page.
    useEffect(() => {
        const onKeyDown = (event: globalThis.KeyboardEvent) => {
            if ((event.metaKey || event.ctrlKey) && event.key?.toLowerCase() === SHORTCUT_KEY) {
                event.preventDefault();
                setOpen((value) => !value);
            }
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, []);

    // Start fresh on every open and give focus back to the trigger on close.
    useEffect(() => {
        if (open) {
            setQuery("");
            setActive(0);
            inputRef.current?.focus();
        } else if (wasOpen.current) {
            triggerRef.current?.focus();
        }
        wasOpen.current = open;
    }, [open]);

    const groups = useMemo(() => {
        const found = commands.filter((command) => matches(command, query));
        const names = [...new Set(found.map((command) => command.group))];
        return names.map((name) => ({name, items: found.filter((command) => command.group === name)}));
    }, [query]);

    const results = useMemo(() => groups.flatMap((group) => group.items), [groups]);
    const activeCommand = results[active];

    useEffect(() => {
        if (activeCommand) optionRefs.current.get(activeCommand.id)?.scrollIntoView({block: "nearest"});
    }, [activeCommand]);

    const run = (command: Command) => {
        setLastRun(command.label);
        setOpen(false);
    };

    const onInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        const count = results.length;
        if (event.key === "ArrowDown" && count) {
            event.preventDefault();
            setActive((index) => (index + 1) % count);
        } else if (event.key === "ArrowUp" && count) {
            event.preventDefault();
            setActive((index) => (index - 1 + count) % count);
        } else if (event.key === "Enter" && activeCommand) {
            event.preventDefault();
            run(activeCommand);
        } else if (event.key === "Escape") {
            event.preventDefault();
            setOpen(false);
        } else if (event.key === "Tab") {
            // The input is the only focus stop inside the dialog.
            event.preventDefault();
        }
    };

    const onBackdropMouseDown = (event: MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) setOpen(false);
    };

    const modifier = isMac ? "⌘" : "Ctrl";

    return (
        <div className="flex w-full max-w-sm flex-col items-center gap-3">
            <button
                ref={triggerRef}
                type="button"
                onClick={() => setOpen(true)}
                aria-haspopup="dialog"
                className="group flex w-full items-center gap-3 rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-left text-sm text-zinc-500 shadow-sm transition hover:border-zinc-300 hover:text-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-white/10 dark:bg-zinc-900 dark:text-zinc-400 dark:shadow-none dark:hover:border-white/20 dark:hover:text-zinc-200 dark:focus-visible:ring-offset-zinc-950"
            >
                <LuSearch className="size-4 shrink-0" aria-hidden/>
                <span className="flex-1 truncate">Search or jump to</span>
                <span className="flex items-center gap-1" aria-hidden>
                    <Kbd>{modifier}</Kbd>
                    <Kbd>{SHORTCUT_KEY.toUpperCase()}</Kbd>
                </span>
            </button>
            <p className="text-xs text-zinc-500 dark:text-zinc-400" aria-live="polite">
                {lastRun ? (
                    <>Ran <span className="font-medium text-zinc-800 dark:text-zinc-200">{lastRun}</span></>
                ) : (
                    <>Press {modifier} {SHORTCUT_KEY.toUpperCase()} to open the command palette</>
                )}
            </p>

            <AnimatePresence>
                {open && (
                    <motion.div
                        key="backdrop"
                        className="fixed inset-0 z-50 flex items-start justify-center bg-zinc-950/40 px-4 pt-[12vh] backdrop-blur-[2px] dark:bg-black/60"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.15}}
                        onMouseDown={onBackdropMouseDown}
                    >
                        <motion.div
                            role="dialog"
                            aria-modal="true"
                            aria-label="Command palette"
                            className="w-full max-w-xl overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl shadow-zinc-950/20 dark:border-white/10 dark:bg-zinc-900 dark:shadow-black/50"
                            initial={reduceMotion ? {opacity: 0} : {opacity: 0, scale: 0.97, y: -8}}
                            animate={{opacity: 1, scale: 1, y: 0}}
                            exit={reduceMotion ? {opacity: 0} : {opacity: 0, scale: 0.98, y: -4}}
                            transition={{duration: 0.18, ease: [0.16, 1, 0.3, 1]}}
                        >
                            <div className="flex items-center gap-3 border-b border-zinc-100 px-4 dark:border-white/[0.06]">
                                <LuSearch className="size-[18px] shrink-0 text-zinc-400" aria-hidden/>
                                <input
                                    ref={inputRef}
                                    value={query}
                                    onChange={(event) => {
                                        setQuery(event.target.value);
                                        setActive(0);
                                    }}
                                    onKeyDown={onInputKeyDown}
                                    placeholder="Type a command or search"
                                    role="combobox"
                                    aria-expanded="true"
                                    aria-controls={listId}
                                    aria-autocomplete="list"
                                    aria-activedescendant={activeCommand ? `${listId}-${activeCommand.id}` : undefined}
                                    className="h-14 flex-1 bg-transparent text-[15px] text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-100 dark:placeholder:text-zinc-500"
                                />
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="rounded-md px-1.5 py-0.5 text-[11px] font-medium text-zinc-500 ring-1 ring-zinc-200 transition hover:bg-zinc-50 hover:text-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 dark:text-zinc-400 dark:ring-white/10 dark:hover:bg-white/5 dark:hover:text-zinc-200"
                                    aria-label="Close command palette"
                                    tabIndex={-1}
                                >
                                    Esc
                                </button>
                            </div>

                            <ul id={listId} role="listbox" aria-label="Commands" className="max-h-[min(22rem,55vh)] scroll-py-2 overflow-y-auto p-2">
                                {groups.map((group) => (
                                    <li key={group.name} role="presentation">
                                        <p id={`${listId}-${group.name}`} className="px-3 pb-1.5 pt-3 text-[11px] font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                                            {group.name}
                                        </p>
                                        <ul role="group" aria-labelledby={`${listId}-${group.name}`}>
                                            {group.items.map((command) => {
                                                const index = results.indexOf(command);
                                                const selected = index === active;
                                                const Icon = command.icon;
                                                return (
                                                    <li
                                                        key={command.id}
                                                        id={`${listId}-${command.id}`}
                                                        ref={(node) => {
                                                            if (node) optionRefs.current.set(command.id, node);
                                                            else optionRefs.current.delete(command.id);
                                                        }}
                                                        role="option"
                                                        aria-selected={selected}
                                                        onMouseMove={() => !selected && setActive(index)}
                                                        onClick={() => run(command)}
                                                        className="relative flex cursor-pointer select-none items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-700 dark:text-zinc-300"
                                                    >
                                                        {selected && <span className="absolute inset-0 rounded-lg bg-zinc-100 dark:bg-white/[0.06]"/>}
                                                        <span
                                                            className={`relative flex size-7 shrink-0 items-center justify-center rounded-md border transition-colors ${
                                                                selected
                                                                    ? "border-indigo-200 bg-indigo-50 text-indigo-600 dark:border-indigo-400/30 dark:bg-indigo-400/10 dark:text-indigo-300"
                                                                    : "border-zinc-200 bg-white text-zinc-500 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-400"
                                                            }`}
                                                        >
                                                            <Icon className="size-3.5" aria-hidden/>
                                                        </span>
                                                        <span className="relative flex-1 truncate">
                                                            <Highlight text={command.label} query={query}/>
                                                        </span>
                                                        {command.detail && (
                                                            <span className="relative text-xs text-zinc-400 dark:text-zinc-500">{command.detail}</span>
                                                        )}
                                                        {command.shortcut && (
                                                            <span className="relative flex gap-1" aria-hidden>
                                                                {command.shortcut.map((key) => (
                                                                    <Kbd key={key}>{key}</Kbd>
                                                                ))}
                                                            </span>
                                                        )}
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </li>
                                ))}
                            </ul>

                            {results.length === 0 && (
                                <div className="flex flex-col items-center px-6 pb-12 pt-8 text-center">
                                    <span className="flex size-10 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 dark:bg-white/5 dark:text-zinc-400">
                                        <LuSearchX className="size-5" aria-hidden/>
                                    </span>
                                    <p className="mt-3 text-sm font-medium text-zinc-900 dark:text-zinc-100">No results for “{query.trim()}”</p>
                                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Try a project name, a setting or an action.</p>
                                </div>
                            )}

                            <div className="flex items-center gap-4 border-t border-zinc-100 bg-zinc-50/60 px-4 py-2.5 text-xs text-zinc-500 dark:border-white/[0.06] dark:bg-white/[0.02] dark:text-zinc-400">
                                <span className="flex items-center gap-1.5">
                                    <Kbd><LuArrowUp className="size-3" aria-hidden/></Kbd>
                                    <Kbd><LuArrowDown className="size-3" aria-hidden/></Kbd>
                                    Navigate
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Kbd><LuCornerDownLeft className="size-3" aria-hidden/></Kbd>
                                    Open
                                </span>
                                <span className="ml-auto hidden items-center gap-1.5 sm:flex">
                                    <Kbd>Esc</Kbd>
                                    Close
                                </span>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CommandPalette;
