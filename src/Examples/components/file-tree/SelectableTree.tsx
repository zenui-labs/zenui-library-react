import {useEffect, useMemo, useRef, useState} from "react";
import type {ComponentType} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {LuCheck, LuChevronRight, LuFile, LuFileImage, LuFileText, LuFilm, LuFolder, LuMinus} from "react-icons/lu";

type IconComponent = ComponentType<{className?: string}>;

export interface SyncNode {
    /** Unique across the whole tree. Selection is a list of file ids. */
    id: string;
    name: string;
    /** Size in megabytes. Folders add up their children. */
    size?: number;
    /** Set on folders. Files leave it out. */
    children?: SyncNode[];
    /** Replaces the icon picked from the file extension. */
    icon?: IconComponent;
}

type CheckState = "checked" | "unchecked" | "mixed";

const leafIds = (node: SyncNode): string[] => (node.children ? node.children.flatMap(leafIds) : [node.id]);
const sizeOf = (node: SyncNode): number => (node.children ? node.children.reduce((sum, child) => sum + sizeOf(child), 0) : node.size ?? 0);
const formatSize = (mb: number) => (mb >= 1000 ? `${(mb / 1000).toFixed(1)} GB` : mb >= 1 ? `${Math.round(mb)} MB` : `${Math.round(mb * 1000)} KB`);

const fileIcon = (name: string): IconComponent => {
    if (/\.(mov|mp4)$/.test(name)) return LuFilm;
    if (/\.(zip|png|jpg)$/.test(name)) return LuFileImage;
    if (/\.(pdf|docx|key|xlsx)$/.test(name)) return LuFileText;
    return LuFile;
};

// A native checkbox under a drawn box, so it keeps keyboard, form and screen reader behavior.
const Checkbox = ({state, label, onChange}: {state: CheckState; label: string; onChange: () => void}) => {
    const ref = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (ref.current) ref.current.indeterminate = state === "mixed";
    }, [state]);

    return (
        <span className="relative flex size-4 shrink-0">
            <input
                ref={ref}
                type="checkbox"
                checked={state === "checked"}
                onChange={onChange}
                aria-label={label}
                className="peer absolute inset-0 cursor-pointer appearance-none rounded-[5px] border border-zinc-300 bg-white transition checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 focus-visible:ring-offset-1 dark:border-white/20 dark:bg-zinc-900 dark:checked:border-indigo-500 dark:checked:bg-indigo-500 dark:indeterminate:border-indigo-500 dark:indeterminate:bg-indigo-500 dark:focus-visible:ring-offset-zinc-900"
            />
            {state === "checked" && <LuCheck className="pointer-events-none relative m-auto size-3 text-white" strokeWidth={3} aria-hidden/>}
            {state === "mixed" && <LuMinus className="pointer-events-none relative m-auto size-3 text-white" strokeWidth={3} aria-hidden/>}
        </span>
    );
};

export interface SelectableTreeProps {
    nodes: SyncNode[];
    /** Free space on the device in megabytes. The meter turns red when the selection is larger. */
    freeSpace: number;
    /** Ids of the selected files. Pass it with `onChange` to control the selection. */
    value?: string[];
    defaultValue?: string[];
    onChange?: (ids: string[]) => void;
    /** Ids of folders that start open. */
    defaultExpanded?: string[];
    title?: string;
    description?: string;
    selectAllLabel?: string;
    clearAllLabel?: string;
    className?: string;
}

/** A checkbox tree for choosing what to sync, with folder sizes and a meter for the space the selection needs. */
export const SelectableTree = ({
    nodes,
    freeSpace,
    value,
    defaultValue = [],
    onChange,
    defaultExpanded = [],
    title = "Choose folders to sync",
    description = "Unchecked items stay online only on this device.",
    selectAllLabel = "Select all",
    clearAllLabel = "Clear all",
    className = "",
}: SelectableTreeProps) => {
    const [innerSelected, setInnerSelected] = useState<string[]>(defaultValue);
    const selectedList = value ?? innerSelected;
    const selected = useMemo(() => new Set(selectedList), [selectedList]);
    const [expanded, setExpanded] = useState<Set<string>>(() => new Set(defaultExpanded));
    const reduceMotion = useReducedMotion();

    const allLeaves = useMemo(() => nodes.flatMap(leafIds), [nodes]);
    const sizeById = useMemo(() => {
        const sizes = new Map<string, number>();
        const indexSizes = (node: SyncNode) => {
            sizes.set(node.id, sizeOf(node));
            node.children?.forEach(indexSizes);
        };
        nodes.forEach(indexSizes);
        return sizes;
    }, [nodes]);

    const syncedSize = useMemo(() => [...selected].reduce((sum, id) => sum + (sizeById.get(id) ?? 0), 0), [selected, sizeById]);
    const over = syncedSize > freeSpace;
    const usage = Math.min(syncedSize / freeSpace, 1);

    const setSelected = (next: Set<string>) => {
        const ids = [...next];
        if (value === undefined) setInnerSelected(ids);
        onChange?.(ids);
    };

    const stateOf = (node: SyncNode): CheckState => {
        const leaves = leafIds(node);
        const count = leaves.filter((id) => selected.has(id)).length;
        return count === 0 ? "unchecked" : count === leaves.length ? "checked" : "mixed";
    };

    const toggle = (node: SyncNode) => {
        const leaves = leafIds(node);
        const turnOn = stateOf(node) !== "checked";
        const next = new Set(selected);
        leaves.forEach((id) => (turnOn ? next.add(id) : next.delete(id)));
        setSelected(next);
    };

    const toggleOpen = (id: string) =>
        setExpanded((current) => {
            const next = new Set(current);
            if (next.has(id)) next.delete(id);
            else next.add(id);
            return next;
        });

    const renderNodes = (nodes: SyncNode[], level: number) => (
        <ul className={level > 1 ? "relative ml-[15px] border-l border-zinc-200 pl-2 dark:border-white/10" : undefined}>
            {nodes.map((node) => {
                const isFolder = Boolean(node.children);
                const isOpen = expanded.has(node.id);
                const state = stateOf(node);
                const Icon = node.icon ?? (isFolder ? LuFolder : fileIcon(node.name));
                return (
                    <li key={node.id}>
                        <div className={`group flex h-9 items-center gap-2 rounded-lg pr-2 transition-colors hover:bg-zinc-50 dark:hover:bg-white/[0.03] ${isFolder ? "" : "pl-6"}`}>
                            {isFolder && (
                                <button
                                    type="button"
                                    onClick={() => toggleOpen(node.id)}
                                    aria-expanded={isOpen}
                                    aria-label={`${isOpen ? "Collapse" : "Expand"} ${node.name}`}
                                    className="flex size-5 shrink-0 items-center justify-center rounded text-zinc-400 transition hover:bg-zinc-200/70 hover:text-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 dark:hover:bg-white/10 dark:hover:text-zinc-200"
                                >
                                    <LuChevronRight className={`size-3.5 transition-transform duration-200 ${isOpen ? "rotate-90" : ""}`} aria-hidden/>
                                </button>
                            )}
                            <Checkbox state={state} label={`Sync ${node.name}`} onChange={() => toggle(node)}/>
                            <Icon className={`size-4 shrink-0 ${isFolder ? "text-indigo-500 dark:text-indigo-400" : "text-zinc-400"}`} aria-hidden/>
                            <span className={`min-w-0 flex-1 truncate text-sm ${state === "unchecked" ? "text-zinc-500 dark:text-zinc-500" : "text-zinc-800 dark:text-zinc-100"}`}>
                                {node.name}
                            </span>
                            <span className="shrink-0 text-xs tabular-nums text-zinc-400 dark:text-zinc-500">{formatSize(sizeOf(node))}</span>
                        </div>
                        {isFolder && (
                            <AnimatePresence initial={false}>
                                {isOpen && (
                                    <motion.div
                                        className="overflow-hidden"
                                        initial={reduceMotion ? {opacity: 0} : {height: 0, opacity: 0}}
                                        animate={{height: "auto", opacity: 1}}
                                        exit={reduceMotion ? {opacity: 0} : {height: 0, opacity: 0}}
                                        transition={{duration: 0.2, ease: [0.16, 1, 0.3, 1]}}
                                    >
                                        {renderNodes(node.children ?? [], level + 1)}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        )}
                    </li>
                );
            })}
        </ul>
    );

    return (
        <div className={`w-full max-w-md overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-white/10 dark:bg-zinc-900 ${className}`}>
            <div className="flex items-start justify-between gap-4 px-5 pb-3 pt-5">
                <div>
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">{title}</h3>
                    {description && <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">{description}</p>}
                </div>
                <button
                    type="button"
                    onClick={() => setSelected(selected.size === allLeaves.length ? new Set() : new Set(allLeaves))}
                    className="shrink-0 rounded-md px-2 py-1 text-xs font-medium text-indigo-600 transition hover:bg-indigo-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 dark:text-indigo-300 dark:hover:bg-indigo-400/10"
                >
                    {selected.size === allLeaves.length ? clearAllLabel : selectAllLabel}
                </button>
            </div>

            <div className="max-h-72 overflow-y-auto px-3 pb-3">{renderNodes(nodes, 1)}</div>

            <div className="border-t border-zinc-100 bg-zinc-50/70 px-5 py-4 dark:border-white/[0.06] dark:bg-white/[0.02]">
                <div className="flex items-baseline justify-between text-xs">
                    <span className="font-medium text-zinc-700 dark:text-zinc-200" aria-live="polite">
                        {formatSize(syncedSize)} selected
                    </span>
                    <span className="tabular-nums text-zinc-500 dark:text-zinc-400">{formatSize(freeSpace)} free</span>
                </div>
                <div
                    className="mt-2 h-1.5 overflow-hidden rounded-full bg-zinc-200 dark:bg-white/10"
                    role="meter"
                    aria-label="Space used by synced files"
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-valuenow={Math.round(usage * 100)}
                >
                    <motion.div
                        className={`h-full origin-left rounded-full ${over ? "bg-rose-500" : "bg-indigo-500"}`}
                        initial={false}
                        animate={{scaleX: usage}}
                        transition={{type: "spring", stiffness: 260, damping: 30}}
                    />
                </div>
                {over && (
                    <p className="mt-2 text-xs text-rose-600 dark:text-rose-400">
                        Not enough space. Uncheck {formatSize(syncedSize - freeSpace)} to continue.
                    </p>
                )}
            </div>
        </div>
    );
};
