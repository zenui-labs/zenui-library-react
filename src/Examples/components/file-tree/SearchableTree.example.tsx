import {useId, useMemo, useRef, useState} from "react";
import type {KeyboardEvent} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import type {IconType} from "react-icons";
import {LuBraces, LuChevronRight, LuFile, LuFileCode, LuFileImage, LuFileText, LuFolder, LuFolderOpen, LuSearch, LuX} from "react-icons/lu";

interface TreeNode {
    name: string;
    children?: TreeNode[];
}

interface Row {
    path: string;
    node: TreeNode;
    level: number;
    parent: string | null;
}

const tree: TreeNode[] = [
    {
        name: "apps",
        children: [
            {
                name: "web",
                children: [
                    {name: "app", children: [{name: "layout.tsx"}, {name: "page.tsx"}, {name: "globals.css"}]},
                    {name: "components", children: [{name: "PricingTable.tsx"}, {name: "SignInForm.tsx"}, {name: "Navbar.tsx"}]},
                    {name: "next.config.js"},
                ],
            },
            {name: "docs", children: [{name: "getting-started.md"}, {name: "pricing.md"}, {name: "api-reference.md"}]},
        ],
    },
    {
        name: "packages",
        children: [
            {name: "ui", children: [{name: "Button.tsx"}, {name: "Dialog.tsx"}, {name: "Tooltip.tsx"}, {name: "tokens.json"}]},
            {name: "billing", children: [{name: "invoices.ts"}, {name: "pricing.ts"}, {name: "stripe.ts"}]},
        ],
    },
    {name: "assets", children: [{name: "logo.svg"}, {name: "pricing-hero.png"}]},
    {name: "package.json"},
    {name: "turbo.json"},
    {name: "README.md"},
];

const fileIcon = (name: string): {icon: IconType; color: string} => {
    const extension = name.split(".").pop() ?? "";
    if (["tsx", "ts", "js"].includes(extension)) return {icon: LuFileCode, color: "text-sky-500"};
    if (extension === "json") return {icon: LuBraces, color: "text-amber-500"};
    if (extension === "css") return {icon: LuFileCode, color: "text-fuchsia-500"};
    if (["png", "svg"].includes(extension)) return {icon: LuFileImage, color: "text-emerald-500"};
    if (extension === "md") return {icon: LuFileText, color: "text-zinc-500 dark:text-zinc-400"};
    return {icon: LuFile, color: "text-zinc-400"};
};

// Keeps a folder when its own name matches (with everything inside it) or when something below it matches.
const prune = (nodes: TreeNode[], query: string): TreeNode[] =>
    nodes.flatMap((node) => {
        if (node.name.toLowerCase().includes(query)) return [node];
        if (!node.children) return [];
        const children = prune(node.children, query);
        return children.length ? [{...node, children}] : [];
    });

const flatten = (nodes: TreeNode[], isOpen: (path: string) => boolean, level = 1, parent: string | null = null): Row[] =>
    nodes.flatMap((node) => {
        const path = parent ? `${parent}/${node.name}` : node.name;
        const row: Row = {path, node, level, parent};
        return node.children && isOpen(path) ? [row, ...flatten(node.children, isOpen, level + 1, path)] : [row];
    });

const countFiles = (nodes: TreeNode[]): number => nodes.reduce((sum, node) => sum + (node.children ? countFiles(node.children) : 1), 0);

const Highlight = ({text, query}: {text: string; query: string}) => {
    const start = query ? text.toLowerCase().indexOf(query) : -1;
    if (start < 0) return <>{text}</>;
    return (
        <>
            {text.slice(0, start)}
            <mark className="rounded-[3px] bg-amber-200/70 px-px text-inherit dark:bg-amber-400/25">{text.slice(start, start + query.length)}</mark>
            {text.slice(start + query.length)}
        </>
    );
};

const SearchableTree = () => {
    const [query, setQuery] = useState("");
    const [expanded, setExpanded] = useState<Set<string>>(() => new Set(["apps", "apps/web"]));
    const [selected, setSelected] = useState("apps/web/app/page.tsx");
    const [focused, setFocused] = useState("apps/web/app/page.tsx");
    const rowRefs = useRef(new Map<string, HTMLLIElement>());
    const inputRef = useRef<HTMLInputElement>(null);
    const inputId = useId();
    const reduceMotion = useReducedMotion();

    const needle = query.trim().toLowerCase();
    const filtered = useMemo(() => (needle ? prune(tree, needle) : tree), [needle]);
    // While searching, every folder on the way to a match is shown open.
    const rows = useMemo(() => flatten(filtered, (path) => Boolean(needle) || expanded.has(path)), [filtered, needle, expanded]);
    const matches = needle ? countFiles(filtered) : 0;
    const tabStop = rows.some((row) => row.path === focused) ? focused : rows[0]?.path;

    const focusRow = (path: string) => {
        setFocused(path);
        rowRefs.current.get(path)?.focus();
    };

    const setOpen = (path: string, open: boolean) => {
        setExpanded((current) => {
            const next = new Set(current);
            if (open) next.add(path);
            else next.delete(path);
            return next;
        });
    };

    const activate = (row: Row) => {
        setFocused(row.path);
        if (!row.node.children) setSelected(row.path);
        else if (!needle) setOpen(row.path, !expanded.has(row.path));
    };

    const onRowKeyDown = (event: KeyboardEvent<HTMLLIElement>, row: Row) => {
        const index = rows.findIndex((item) => item.path === row.path);
        const isFolder = Boolean(row.node.children);
        const isOpen = Boolean(needle) || expanded.has(row.path);

        switch (event.key) {
            case "ArrowDown":
                if (rows[index + 1]) focusRow(rows[index + 1].path);
                break;
            case "ArrowUp":
                if (index === 0) inputRef.current?.focus();
                else focusRow(rows[index - 1].path);
                break;
            case "ArrowRight":
                if (isFolder && !isOpen) setOpen(row.path, true);
                else if (isFolder && rows[index + 1]?.parent === row.path) focusRow(rows[index + 1].path);
                break;
            case "ArrowLeft":
                if (isFolder && isOpen && !needle) setOpen(row.path, false);
                else if (row.parent) focusRow(row.parent);
                break;
            case "Enter":
            case " ":
                activate(row);
                break;
            default:
                // Typing a letter while in the tree sends it to the search field.
                if (event.key.length === 1 && !event.metaKey && !event.ctrlKey) {
                    inputRef.current?.focus();
                }
                return;
        }
        event.preventDefault();
    };

    const onInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "ArrowDown" && rows.length) {
            event.preventDefault();
            focusRow(rows[0].path);
        } else if (event.key === "Escape" && query) {
            event.preventDefault();
            setQuery("");
        }
    };

    return (
        <div className="flex w-full max-w-sm flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-white/10 dark:bg-zinc-900">
            <div className="border-b border-zinc-100 p-2 dark:border-white/[0.06]">
                <label htmlFor={inputId} className="sr-only">Search files</label>
                <div className="flex h-9 items-center gap-2 rounded-lg bg-zinc-100 px-2.5 ring-indigo-500/50 focus-within:bg-white focus-within:ring-2 dark:bg-white/[0.06] dark:focus-within:bg-zinc-950">
                    <LuSearch className="size-4 shrink-0 text-zinc-400" aria-hidden/>
                    <input
                        ref={inputRef}
                        id={inputId}
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        onKeyDown={onInputKeyDown}
                        placeholder="Filter files"
                        autoComplete="off"
                        spellCheck={false}
                        className="h-full min-w-0 flex-1 bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-100 dark:placeholder:text-zinc-500"
                    />
                    {query ? (
                        <button
                            type="button"
                            onClick={() => {
                                setQuery("");
                                inputRef.current?.focus();
                            }}
                            aria-label="Clear filter"
                            className="flex size-5 items-center justify-center rounded text-zinc-400 transition hover:bg-zinc-200 hover:text-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 dark:hover:bg-white/10 dark:hover:text-zinc-200"
                        >
                            <LuX className="size-3.5" aria-hidden/>
                        </button>
                    ) : (
                        <kbd className="hidden rounded border border-zinc-200 bg-white px-1.5 font-mono text-[10px] text-zinc-400 sm:block dark:border-white/10 dark:bg-zinc-900">↓</kbd>
                    )}
                </div>
            </div>

            <div className="relative h-80 overflow-y-auto p-2">
                {rows.length === 0 ? (
                    <div className="flex h-full flex-col items-center justify-center gap-1 px-6 text-center">
                        <LuSearch className="mb-2 size-5 text-zinc-300 dark:text-zinc-600" aria-hidden/>
                        <p className="text-sm font-medium text-zinc-800 dark:text-zinc-100">No files match “{query.trim()}”</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">Try part of a file name, such as “pricing”.</p>
                    </div>
                ) : (
                    <ul role="tree" aria-label="Repository files">
                        <AnimatePresence initial={false}>
                            {rows.map((row) => {
                                const isFolder = Boolean(row.node.children);
                                const isOpen = Boolean(needle) || expanded.has(row.path);
                                const isSelected = selected === row.path;
                                const {icon: Icon, color} = isFolder
                                    ? {icon: isOpen ? LuFolderOpen : LuFolder, color: "text-indigo-500 dark:text-indigo-400"}
                                    : fileIcon(row.node.name);
                                return (
                                    <motion.li
                                        key={row.path}
                                        ref={(element: HTMLLIElement | null) => {
                                            if (element) rowRefs.current.set(row.path, element);
                                            else rowRefs.current.delete(row.path);
                                        }}
                                        role="treeitem"
                                        aria-level={row.level}
                                        aria-expanded={isFolder ? isOpen : undefined}
                                        aria-selected={isFolder ? undefined : isSelected}
                                        tabIndex={tabStop === row.path ? 0 : -1}
                                        onKeyDown={(event) => onRowKeyDown(event, row)}
                                        onFocus={() => setFocused(row.path)}
                                        onClick={() => activate(row)}
                                        initial={reduceMotion ? {opacity: 0} : {opacity: 0, height: 0}}
                                        animate={{opacity: 1, height: 32}}
                                        exit={reduceMotion ? {opacity: 0} : {opacity: 0, height: 0}}
                                        transition={{duration: 0.16, ease: [0.16, 1, 0.3, 1]}}
                                        style={{paddingLeft: `${(row.level - 1) * 14 + 6}px`}}
                                        className={`flex cursor-pointer select-none items-center gap-1.5 overflow-hidden rounded-md pr-2 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500/60 ${
                                            isSelected
                                                ? "bg-indigo-50 font-medium text-indigo-700 dark:bg-indigo-400/10 dark:text-indigo-200"
                                                : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-white/[0.05]"
                                        }`}
                                    >
                                        {isFolder ? (
                                            <LuChevronRight className={`size-3.5 shrink-0 text-zinc-400 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`} aria-hidden/>
                                        ) : (
                                            <span className="w-3.5 shrink-0" aria-hidden/>
                                        )}
                                        <Icon className={`size-4 shrink-0 ${color}`} aria-hidden/>
                                        <span className="truncate">
                                            <Highlight text={row.node.name} query={needle}/>
                                        </span>
                                    </motion.li>
                                );
                            })}
                        </AnimatePresence>
                    </ul>
                )}
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-zinc-100 px-4 py-2.5 text-xs dark:border-white/[0.06]" aria-live="polite">
                <span className="truncate font-mono text-zinc-500 dark:text-zinc-400">{selected}</span>
                {needle && (
                    <span className="shrink-0 tabular-nums text-zinc-400 dark:text-zinc-500">
                        {matches} {matches === 1 ? "file" : "files"}
                    </span>
                )}
            </div>
        </div>
    );
};

export default SearchableTree;
