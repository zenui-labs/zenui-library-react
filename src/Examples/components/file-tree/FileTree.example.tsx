import {useMemo, useRef, useState} from "react";
import type {CSSProperties, KeyboardEvent} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import type {IconType} from "react-icons";
import {LuBraces, LuChevronRight, LuFile, LuFileCode, LuFileImage, LuFileText, LuFolder, LuFolderOpen} from "react-icons/lu";

interface TreeNode {
    name: string;
    children?: TreeNode[];
}

interface VisibleNode {
    path: string;
    node: TreeNode;
    level: number;
    parent: string | null;
}

const tree: TreeNode[] = [
    {
        name: "src",
        children: [
            {
                name: "components",
                children: [{name: "Button.tsx"}, {name: "CommandPalette.tsx"}, {name: "FileTree.tsx"}],
            },
            {name: "hooks", children: [{name: "useHotkeys.ts"}, {name: "useMediaQuery.ts"}]},
            {name: "App.tsx"},
            {name: "main.tsx"},
            {name: "index.css"},
        ],
    },
    {name: "public", children: [{name: "favicon.svg"}, {name: "og-image.png"}]},
    {name: "package.json"},
    {name: "tsconfig.json"},
    {name: "README.md"},
];

const fileIcon = (name: string): {icon: IconType; color: string} => {
    const extension = name.split(".").pop() ?? "";
    if (["tsx", "ts"].includes(extension)) return {icon: LuFileCode, color: "text-sky-500"};
    if (extension === "json") return {icon: LuBraces, color: "text-amber-500"};
    if (extension === "css") return {icon: LuFileCode, color: "text-fuchsia-500"};
    if (["png", "svg"].includes(extension)) return {icon: LuFileImage, color: "text-emerald-500"};
    if (extension === "md") return {icon: LuFileText, color: "text-zinc-500 dark:text-zinc-400"};
    return {icon: LuFile, color: "text-zinc-400"};
};

// Lists the rows that are currently on screen, in order, so arrow keys can walk them.
const flatten = (nodes: TreeNode[], expanded: Set<string>, level = 1, parent: string | null = null): VisibleNode[] =>
    nodes.flatMap((node) => {
        const path = parent ? `${parent}/${node.name}` : node.name;
        const self: VisibleNode = {path, node, level, parent};
        return node.children && expanded.has(path) ? [self, ...flatten(node.children, expanded, level + 1, path)] : [self];
    });

const FileTree = () => {
    const [expanded, setExpanded] = useState<Set<string>>(() => new Set(["src", "src/components"]));
    const [selected, setSelected] = useState("src/components/FileTree.tsx");
    const [focused, setFocused] = useState("src/components/FileTree.tsx");
    const rowRefs = useRef(new Map<string, HTMLLIElement>());
    const reduceMotion = useReducedMotion();

    const visible = useMemo(() => flatten(tree, expanded), [expanded]);

    const focusRow = (path: string) => {
        setFocused(path);
        rowRefs.current.get(path)?.focus();
    };

    const toggle = (path: string, open?: boolean) => {
        setExpanded((current) => {
            const next = new Set(current);
            const shouldOpen = open ?? !next.has(path);
            if (shouldOpen) next.add(path);
            else next.delete(path);
            return next;
        });
        // Keep a tab stop in the tree when the focused row gets hidden.
        if (open === false || expanded.has(path)) {
            setFocused((current) => (current.startsWith(`${path}/`) ? path : current));
        }
    };

    const activate = (item: VisibleNode) => {
        if (item.node.children) toggle(item.path);
        else setSelected(item.path);
        setFocused(item.path);
    };

    const onKeyDown = (event: KeyboardEvent<HTMLLIElement>, item: VisibleNode) => {
        const index = visible.findIndex((row) => row.path === item.path);
        const isFolder = Boolean(item.node.children);
        const isOpen = expanded.has(item.path);

        switch (event.key) {
            case "ArrowDown":
                if (visible[index + 1]) focusRow(visible[index + 1].path);
                break;
            case "ArrowUp":
                if (visible[index - 1]) focusRow(visible[index - 1].path);
                break;
            case "ArrowRight":
                if (isFolder && !isOpen) toggle(item.path, true);
                else if (isFolder && visible[index + 1]?.parent === item.path) focusRow(visible[index + 1].path);
                break;
            case "ArrowLeft":
                if (isFolder && isOpen) toggle(item.path, false);
                else if (item.parent) focusRow(item.parent);
                break;
            case "Home":
                focusRow(visible[0].path);
                break;
            case "End":
                focusRow(visible[visible.length - 1].path);
                break;
            case "Enter":
            case " ":
                activate(item);
                break;
            default:
                return;
        }
        event.preventDefault();
        event.stopPropagation();
    };

    const renderNodes = (nodes: TreeNode[], level: number, parent: string | null) =>
        nodes.map((node) => {
            const path = parent ? `${parent}/${node.name}` : node.name;
            const item: VisibleNode = {path, node, level, parent};
            const isFolder = Boolean(node.children);
            const isOpen = expanded.has(path);
            const isSelected = selected === path;
            const {icon: Icon, color} = isFolder ? {icon: isOpen ? LuFolderOpen : LuFolder, color: "text-indigo-500 dark:text-indigo-400"} : fileIcon(node.name);

            return (
                <li
                    key={path}
                    ref={(element) => {
                        if (element) rowRefs.current.set(path, element);
                        else rowRefs.current.delete(path);
                    }}
                    role="treeitem"
                    aria-level={level}
                    aria-expanded={isFolder ? isOpen : undefined}
                    aria-selected={isFolder ? undefined : isSelected}
                    tabIndex={focused === path ? 0 : -1}
                    onKeyDown={(event) => onKeyDown(event, item)}
                    onFocus={(event) => {
                        if (event.target === event.currentTarget) setFocused(path);
                    }}
                    className="outline-none [&:focus-visible>div]:ring-2 [&:focus-visible>div]:ring-inset [&:focus-visible>div]:ring-indigo-500/60"
                >
                    <div
                        onClick={() => activate(item)}
                        style={{paddingLeft: `${(level - 1) * 16 + 8}px`}}
                        className={`relative flex h-8 cursor-pointer select-none items-center gap-1.5 rounded-md pr-2 text-sm transition-colors ${
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
                        <span className="truncate">{node.name}</span>
                    </div>
                    {isFolder && (
                        <AnimatePresence initial={false}>
                            {isOpen && (
                                <motion.ul
                                    role="group"
                                    className="relative overflow-hidden before:absolute before:bottom-1 before:left-[var(--guide)] before:top-0 before:w-px before:bg-zinc-200 dark:before:bg-white/10"
                                    style={{"--guide": `${(level - 1) * 16 + 14}px`} as CSSProperties}
                                    initial={reduceMotion ? {opacity: 0} : {height: 0, opacity: 0}}
                                    animate={{height: "auto", opacity: 1}}
                                    exit={reduceMotion ? {opacity: 0} : {height: 0, opacity: 0}}
                                    transition={{duration: 0.2, ease: [0.16, 1, 0.3, 1]}}
                                >
                                    {renderNodes(node.children ?? [], level + 1, path)}
                                </motion.ul>
                            )}
                        </AnimatePresence>
                    )}
                </li>
            );
        });

    return (
        <div className="flex w-full max-w-md flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-white/10 dark:bg-zinc-900">
            <div className="flex items-center justify-between border-b border-zinc-100 px-4 py-3 dark:border-white/[0.06]">
                <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Explorer</p>
                <button
                    type="button"
                    onClick={() => {
                        setExpanded(new Set());
                        setFocused((current) => current.split("/")[0]);
                    }}
                    className="rounded-md px-2 py-1 text-xs text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-zinc-100"
                >
                    Collapse all
                </button>
            </div>
            <ul role="tree" aria-label="Project files" className="h-80 overflow-y-auto p-2">
                {renderNodes(tree, 1, null)}
            </ul>
            <div className="border-t border-zinc-100 px-4 py-2.5 font-mono text-xs text-zinc-500 dark:border-white/[0.06] dark:text-zinc-400" aria-live="polite">
                {selected}
            </div>
        </div>
    );
};

export default FileTree;
