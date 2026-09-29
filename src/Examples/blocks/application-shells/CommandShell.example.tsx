import {useEffect, useMemo, useRef, useState} from "react";
import type {KeyboardEvent, ReactNode} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {
    LuArrowRight,
    LuBookOpen,
    LuClock,
    LuCommand,
    LuFileText,
    LuFolder,
    LuPanelLeft,
    LuPlus,
    LuSearch,
    LuSettings,
    LuStar,
    LuUsers,
} from "react-icons/lu";

type Page = "Home" | "Docs" | "Starred" | "Team" | "Settings";

interface Command {
    id: string;
    label: string;
    group: "Jump to" | "Documents" | "Actions";
    icon: ReactNode;
    hint?: string;
    run: () => void;
}

const nav: {page: Page; icon: ReactNode}[] = [
    {page: "Home", icon: <LuClock className="h-[18px] w-[18px]"/>},
    {page: "Docs", icon: <LuBookOpen className="h-[18px] w-[18px]"/>},
    {page: "Starred", icon: <LuStar className="h-[18px] w-[18px]"/>},
    {page: "Team", icon: <LuUsers className="h-[18px] w-[18px]"/>},
    {page: "Settings", icon: <LuSettings className="h-[18px] w-[18px]"/>},
];

const initialDocs: {title: string; folder: string; edited: string; by: string}[] = [
    {title: "Pricing page rewrite", folder: "Marketing", edited: "12 min ago", by: "Noor"},
    {title: "Onboarding interview notes", folder: "Research", edited: "1 hr ago", by: "Felix"},
    {title: "Q4 hiring plan", folder: "People", edited: "3 hr ago", by: "You"},
    {title: "Incident review, Sep 24 outage", folder: "Engineering", edited: "Yesterday", by: "Ravi"},
    {title: "Brand voice guidelines", folder: "Marketing", edited: "Mon", by: "Noor"},
    {title: "Mobile roadmap, H1 2027", folder: "Product", edited: "Last week", by: "You"},
];

const CommandShell = () => {
    const reduce = useReducedMotion();
    const [collapsed, setCollapsed] = useState(false);
    const [page, setPage] = useState<Page>("Home");
    const [docs, setDocs] = useState(initialDocs);
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [active, setActive] = useState(0);
    const [toast, setToast] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!toast) return;
        const id = window.setTimeout(() => setToast(null), 2200);
        return () => window.clearTimeout(id);
    }, [toast]);

    useEffect(() => {
        if (open) inputRef.current?.focus();
    }, [open]);

    const close = () => {
        setOpen(false);
        setQuery("");
        setActive(0);
        triggerRef.current?.focus();
    };

    const commands = useMemo<Command[]>(() => [
        ...nav.map((n) => ({id: `go-${n.page}`, label: `Go to ${n.page}`, group: "Jump to" as const, icon: n.icon, run: () => setPage(n.page)})),
        ...docs.map((d) => ({id: `doc-${d.title}`, label: d.title, group: "Documents" as const, icon: <LuFileText className="h-[18px] w-[18px]"/>, hint: d.folder, run: () => setToast(`Opened ${d.title}`)})),
        {id: "new-doc", label: "Create a new document", group: "Actions", icon: <LuPlus className="h-[18px] w-[18px]"/>, run: () => {
            const title = `Untitled document ${docs.filter((d) => d.folder === "Drafts").length + 1}`;
            setDocs((prev) => [{title, folder: "Drafts", edited: "Just now", by: "You"}, ...prev]);
            setPage("Home");
            setToast(`Created ${title}`);
        }},
        {id: "toggle-sidebar", label: "Toggle sidebar", group: "Actions", icon: <LuPanelLeft className="h-[18px] w-[18px]"/>, hint: "[", run: () => setCollapsed((c) => !c)},
        {id: "invite", label: "Invite a teammate", group: "Actions", icon: <LuUsers className="h-[18px] w-[18px]"/>, run: () => setPage("Team")},
    ], [docs]);

    const results = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return commands.filter((c) => c.group !== "Documents").concat(commands.filter((c) => c.group === "Documents").slice(0, 3));
        const words = q.split(/\s+/);
        return commands.filter((c) => words.every((w) => `${c.label} ${c.hint ?? ""}`.toLowerCase().includes(w)));
    }, [commands, query]);

    const groups = (["Jump to", "Documents", "Actions"] as const).map((g) => ({name: g, items: results.filter((r) => r.group === g)})).filter((g) => g.items.length);
    const ordered = groups.flatMap((g) => g.items);

    const runAt = (index: number) => {
        const command = ordered[index];
        if (!command) return;
        close();
        command.run();
    };

    const onPaletteKey = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "ArrowDown") {
            event.preventDefault();
            setActive((a) => (ordered.length ? (a + 1) % ordered.length : 0));
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            setActive((a) => (ordered.length ? (a - 1 + ordered.length) % ordered.length : 0));
        } else if (event.key === "Enter") {
            event.preventDefault();
            runAt(active);
        } else if (event.key === "Escape") {
            event.preventDefault();
            close();
        } else if (event.key === "Tab") {
            // Keep focus in the palette while it is open.
            event.preventDefault();
            inputRef.current?.focus();
        }
    };

    // The shortcut is scoped to this app shell so it does not take over the host page.
    const onShellKey = (event: KeyboardEvent<HTMLDivElement>) => {
        if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
            event.preventDefault();
            setOpen((o) => !o);
        } else if (event.key === "[" && !open && !(event.target instanceof HTMLInputElement)) {
            setCollapsed((c) => !c);
        }
    };

    return (
        <div onKeyDown={onShellKey} className="relative flex h-[680px] w-full overflow-hidden bg-white text-stone-900 dark:bg-stone-950 dark:text-stone-100">
            <motion.aside initial={false} animate={{width: collapsed ? 64 : 232}} transition={reduce ? {duration: 0} : {type: "spring", bounce: 0, duration: 0.3}}
                          className="hidden shrink-0 flex-col overflow-hidden border-r border-stone-200 bg-stone-50 py-3 sm:flex dark:border-stone-800 dark:bg-stone-900/60">
                <div className="flex items-center gap-2 px-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-stone-900 font-serif text-lg italic text-white dark:bg-stone-100 dark:text-stone-900">Q</span>
                    {!collapsed && <span className="truncate text-sm font-semibold">Quire</span>}
                </div>
                <nav aria-label="Main" className="mt-6 flex-1 px-3">
                    <ul className="space-y-1">
                        {nav.map((n) => {
                            const current = n.page === page;
                            return (
                                <li key={n.page}>
                                    <button type="button" onClick={() => setPage(n.page)} aria-current={current ? "page" : undefined}
                                            aria-label={collapsed ? n.page : undefined} title={collapsed ? n.page : undefined}
                                            className={`flex h-9 w-full items-center gap-3 rounded-lg px-2.5 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-amber-500 ${current
                                                ? "bg-white font-medium text-stone-900 shadow-sm ring-1 ring-stone-200 dark:bg-stone-800 dark:text-white dark:ring-stone-700"
                                                : "text-stone-600 hover:bg-stone-200/60 dark:text-stone-400 dark:hover:bg-stone-800/60"}`}>
                                        <span className="shrink-0" aria-hidden="true">{n.icon}</span>
                                        {!collapsed && <span className="truncate">{n.page}</span>}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                    {!collapsed && (
                        <>
                            <p className="mt-6 px-2.5 text-[11px] font-medium uppercase tracking-wider text-stone-400">Folders</p>
                            <ul className="mt-2 space-y-0.5 text-sm text-stone-600 dark:text-stone-400">
                                {["Marketing", "Research", "Engineering", "Product"].map((f) => (
                                    <li key={f} className="flex h-8 items-center gap-2.5 truncate px-2.5"><LuFolder className="h-4 w-4 shrink-0 text-stone-400" aria-hidden="true"/>{f}</li>
                                ))}
                            </ul>
                        </>
                    )}
                </nav>
                <div className="px-3">
                    <button type="button" onClick={() => setCollapsed((c) => !c)} aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"} aria-expanded={!collapsed}
                            className="flex h-9 w-full items-center gap-3 rounded-lg px-2.5 text-sm text-stone-500 outline-none hover:bg-stone-200/60 focus-visible:ring-2 focus-visible:ring-amber-500 dark:hover:bg-stone-800/60">
                        <LuPanelLeft className="h-[18px] w-[18px] shrink-0" aria-hidden="true"/>
                        {!collapsed && <span className="flex flex-1 justify-between">Collapse <kbd className="font-sans text-xs text-stone-400">[</kbd></span>}
                    </button>
                </div>
            </motion.aside>

            <div className="flex min-w-0 flex-1 flex-col">
                <header className="flex h-14 shrink-0 items-center gap-3 border-b border-stone-200 px-4 sm:px-6 dark:border-stone-800">
                    <button ref={triggerRef} type="button" onClick={() => setOpen(true)} aria-haspopup="dialog" aria-expanded={open}
                            className="flex h-9 w-full max-w-md items-center gap-2 rounded-lg border border-stone-200 bg-stone-50 px-3 text-sm text-stone-500 outline-none transition-colors hover:border-stone-300 focus-visible:ring-2 focus-visible:ring-amber-500 dark:border-stone-800 dark:bg-stone-900 dark:text-stone-400 dark:hover:border-stone-700">
                        <LuSearch className="h-4 w-4" aria-hidden="true"/>
                        <span className="flex-1 truncate text-left">Search or run a command</span>
                        <kbd className="hidden items-center gap-0.5 rounded border border-stone-200 bg-white px-1.5 font-sans text-[11px] text-stone-500 sm:flex dark:border-stone-700 dark:bg-stone-800">
                            <LuCommand className="h-3 w-3" aria-hidden="true"/>K
                        </kbd>
                    </button>
                    <span className="ml-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-200 text-xs font-semibold text-amber-900 dark:bg-amber-500/25 dark:text-amber-200">EK</span>
                </header>

                <main className="flex-1 overflow-y-auto px-4 py-8 sm:px-10">
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div key={page} initial={{opacity: 0, y: 6}} animate={{opacity: 1, y: 0}} exit={{opacity: 0}} transition={{duration: 0.15}} className="mx-auto max-w-3xl">
                            <h1 className="font-serif text-3xl tracking-tight">{page === "Home" ? "Good afternoon, Eva" : page}</h1>
                            <p className="mt-2 text-sm text-stone-500 dark:text-stone-400">
                                {page === "Home"
                                    ? "Press Ctrl K or Cmd K anywhere in the app to jump to a document or run a command."
                                    : `Your ${page.toLowerCase()} will appear here.`}
                            </p>
                            {page === "Home" && (
                                <section aria-labelledby="command-shell-recent" className="mt-8">
                                    <h2 id="command-shell-recent" className="text-xs font-semibold uppercase tracking-wider text-stone-400">Recently edited</h2>
                                    <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                                        <AnimatePresence initial={false}>
                                            {docs.map((d) => (
                                                <motion.li key={d.title} layout initial={{opacity: 0, scale: 0.97}} animate={{opacity: 1, scale: 1}}>
                                                    <a href="#" onClick={(e) => { e.preventDefault(); setToast(`Opened ${d.title}`); }}
                                                       className="group flex items-start gap-3 rounded-xl border border-stone-200 p-4 outline-none transition-colors hover:border-stone-300 hover:bg-stone-50 focus-visible:ring-2 focus-visible:ring-amber-500 dark:border-stone-800 dark:hover:border-stone-700 dark:hover:bg-stone-900">
                                                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300"><LuFileText className="h-4 w-4" aria-hidden="true"/></span>
                                                        <span className="min-w-0 flex-1">
                                                            <span className="block truncate text-sm font-medium">{d.title}</span>
                                                            <span className="block text-xs text-stone-500 dark:text-stone-400">{d.folder}, edited {d.edited} by {d.by}</span>
                                                        </span>
                                                        <LuArrowRight className="mt-1 h-4 w-4 shrink-0 text-stone-300 transition-transform group-hover:translate-x-0.5 group-hover:text-stone-500" aria-hidden="true"/>
                                                    </a>
                                                </motion.li>
                                            ))}
                                        </AnimatePresence>
                                    </ul>
                                </section>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </main>
            </div>

            <AnimatePresence>
                {open && (
                    <motion.div key="palette" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 0.12}}
                                className="absolute inset-0 z-20 flex items-start justify-center bg-stone-900/30 px-4 pt-16 backdrop-blur-[2px] dark:bg-black/50"
                                onMouseDown={(e) => { if (e.target === e.currentTarget) close(); }}>
                        <motion.div role="dialog" aria-modal="true" aria-label="Command menu" onKeyDown={onPaletteKey}
                                    initial={reduce ? false : {opacity: 0, scale: 0.97, y: -8}} animate={{opacity: 1, scale: 1, y: 0}} exit={reduce ? undefined : {opacity: 0, scale: 0.97}}
                                    transition={{duration: 0.15}}
                                    className="w-full max-w-lg overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-2xl dark:border-stone-700 dark:bg-stone-900">
                            <div className="flex items-center gap-3 border-b border-stone-200 px-4 dark:border-stone-800">
                                <LuSearch className="h-4 w-4 shrink-0 text-stone-400" aria-hidden="true"/>
                                <input ref={inputRef} value={query} onChange={(e) => { setQuery(e.target.value); setActive(0); }}
                                       placeholder="Type a command or search documents"
                                       role="combobox" aria-expanded="true" aria-controls="command-shell-list" aria-autocomplete="list"
                                       aria-activedescendant={ordered[active] ? `command-shell-${ordered[active].id}` : undefined}
                                       aria-label="Search commands"
                                       className="h-12 flex-1 bg-transparent text-sm placeholder:text-stone-400 focus:outline-none"/>
                                <kbd className="rounded border border-stone-200 px-1.5 font-sans text-[10px] text-stone-400 dark:border-stone-700">Esc</kbd>
                            </div>
                            <div id="command-shell-list" role="listbox" aria-label="Commands" className="max-h-80 overflow-y-auto p-2">
                                {groups.length === 0 && (
                                    <p className="px-3 py-10 text-center text-sm text-stone-500 dark:text-stone-400">No results for &ldquo;{query}&rdquo;</p>
                                )}
                                {groups.map((g) => (
                                    <div key={g.name} role="group" aria-label={g.name} className="mb-1">
                                        <p className="px-3 pb-1 pt-2 text-[11px] font-medium text-stone-400">{g.name}</p>
                                        {g.items.map((c) => {
                                            const index = ordered.indexOf(c);
                                            const isActive = index === active;
                                            return (
                                                <div key={c.id} id={`command-shell-${c.id}`} role="option" aria-selected={isActive}
                                                     onMouseMove={() => setActive(index)} onClick={() => runAt(index)}
                                                     className={`relative flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm ${isActive ? "text-stone-900 dark:text-white" : "text-stone-600 dark:text-stone-300"}`}>
                                                    {isActive && (
                                                        <motion.span layoutId="command-shell-active" transition={{type: "spring", bounce: 0, duration: 0.2}}
                                                                     className="absolute inset-0 rounded-lg bg-stone-100 dark:bg-stone-800"/>
                                                    )}
                                                    <span className="relative text-stone-400" aria-hidden="true">{c.icon}</span>
                                                    <span className="relative flex-1 truncate">{c.label}</span>
                                                    {c.hint && <span className="relative text-xs text-stone-400">{c.hint}</span>}
                                                </div>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                            <div className="flex items-center gap-4 border-t border-stone-200 px-4 py-2 text-[11px] text-stone-400 dark:border-stone-800">
                                <span>Up and down to move</span><span>Enter to run</span><span className="hidden sm:inline">Esc to close</span>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <div role="status" className="pointer-events-none absolute inset-x-0 bottom-4 z-30 flex justify-center px-4">
                <AnimatePresence>
                    {toast && (
                        <motion.p key={toast} initial={{opacity: 0, y: 12}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: 12}}
                                  className="rounded-lg bg-stone-900 px-4 py-2 text-sm text-white shadow-lg dark:bg-stone-100 dark:text-stone-900">
                            {toast}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default CommandShell;
