import {useEffect, useId, useRef, useState} from "react";
import type {FormEvent, KeyboardEvent} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {LuChevronRight, LuFile, LuFilePlus, LuFileText, LuFolder, LuFolderOpen, LuFolderPlus, LuPencil, LuTrash2} from "react-icons/lu";

interface Node {
    id: string;
    name: string;
    kind: "file" | "folder";
    children?: Node[];
}

interface Editing {
    id: string;
    /** True for an item that was just created and is removed again if the name is left empty. */
    isNew: boolean;
}

interface Removed {
    node: Node;
    parentId: string | null;
    index: number;
}

const initialTree: Node[] = [
    {
        id: "f-guides",
        name: "Guides",
        kind: "folder",
        children: [
            {id: "n-onboarding", name: "Onboarding checklist", kind: "file"},
            {id: "n-release", name: "Release process", kind: "file"},
        ],
    },
    {
        id: "f-meetings",
        name: "Meeting notes",
        kind: "folder",
        children: [
            {id: "n-planning", name: "Q3 planning", kind: "file"},
            {id: "n-retro", name: "Launch retro", kind: "file"},
        ],
    },
    {id: "n-roadmap", name: "Roadmap", kind: "file"},
];

const sortNodes = (nodes: Node[]) =>
    [...nodes].sort((a, b) => (a.kind === b.kind ? a.name.localeCompare(b.name) : a.kind === "folder" ? -1 : 1));

const find = (nodes: Node[], id: string, parentId: string | null = null): {node: Node; parentId: string | null; siblings: Node[]} | null => {
    for (const node of nodes) {
        if (node.id === id) return {node, parentId, siblings: nodes};
        const hit = node.children ? find(node.children, id, node.id) : null;
        if (hit) return hit;
    }
    return null;
};

const update = (nodes: Node[], parentId: string | null, change: (siblings: Node[]) => Node[]): Node[] =>
    parentId === null
        ? change(nodes)
        : nodes.map((node) =>
            node.id === parentId
                ? {...node, children: change(node.children ?? [])}
                : node.children
                    ? {...node, children: update(node.children, parentId, change)}
                    : node,
        );

let counter = 0;
const newId = () => `new-${Date.now()}-${counter++}`;

const RenameField = ({initial, siblings, onDone}: {initial: string; siblings: Node[]; onDone: (name: string | null) => void}) => {
    const [value, setValue] = useState(initial);
    const [error, setError] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const done = useRef(false);
    const errorId = useId();

    useEffect(() => {
        inputRef.current?.focus();
        inputRef.current?.select();
    }, []);

    const commit = (event?: FormEvent) => {
        event?.preventDefault();
        const name = value.trim();
        if (!name) return finish(null);
        if (name.includes("/")) return setError("Names can’t contain a slash.");
        if (siblings.some((node) => node.name.toLowerCase() === name.toLowerCase() && node.name !== initial)) {
            return setError(`“${name}” already exists here.`);
        }
        finish(name);
    };

    const finish = (name: string | null) => {
        if (done.current) return;
        done.current = true;
        onDone(name);
    };

    const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Escape") {
            event.preventDefault();
            finish(null);
        }
    };

    return (
        <form onSubmit={commit} className="relative min-w-0 flex-1">
            <input
                ref={inputRef}
                value={value}
                onChange={(event) => {
                    setValue(event.target.value);
                    setError("");
                }}
                onKeyDown={onKeyDown}
                onBlur={() => (error ? finish(null) : commit())}
                aria-label="Name"
                aria-invalid={Boolean(error)}
                aria-describedby={error ? errorId : undefined}
                className={`h-7 w-full rounded-md border bg-white px-2 text-sm text-zinc-900 outline-none ring-4 dark:bg-zinc-950 dark:text-zinc-100 ${
                    error ? "border-rose-400 ring-rose-500/10" : "border-indigo-400 ring-indigo-500/10 dark:border-indigo-400/60"
                }`}
            />
            {error && (
                <p id={errorId} role="alert" className="absolute left-0 right-0 top-full z-10 mt-1 rounded-md bg-rose-600 px-2 py-1 text-xs text-white shadow-lg">
                    {error}
                </p>
            )}
        </form>
    );
};

const EditableTree = () => {
    const [tree, setTree] = useState<Node[]>(initialTree);
    const [expanded, setExpanded] = useState<Set<string>>(() => new Set(["f-guides", "f-meetings"]));
    const [selected, setSelected] = useState("n-release");
    const [editing, setEditing] = useState<Editing | null>(null);
    const [removed, setRemoved] = useState<Removed | null>(null);
    const rowRefs = useRef(new Map<string, HTMLButtonElement>());
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        if (!removed) return;
        const timer = window.setTimeout(() => setRemoved(null), 6000);
        return () => window.clearTimeout(timer);
    }, [removed]);

    const focusLater = (id: string) => window.setTimeout(() => rowRefs.current.get(id)?.focus(), 0);

    const create = (kind: Node["kind"]) => {
        // New items go into the selected folder, or next to the selected file.
        const hit = find(tree, selected);
        const parentId = hit?.node.kind === "folder" ? hit.node.id : hit?.parentId ?? null;
        const node: Node = {id: newId(), name: "", kind, children: kind === "folder" ? [] : undefined};
        setTree((current) => update(current, parentId, (siblings) => [...siblings, node]));
        if (parentId) setExpanded((current) => new Set(current).add(parentId));
        setEditing({id: node.id, isNew: true});
    };

    const finishEditing = (id: string, name: string | null) => {
        const isNew = editing?.isNew ?? false;
        setEditing(null);
        const hit = find(tree, id);
        if (!hit) return;
        if (name === null && isNew) {
            setTree((current) => update(current, hit.parentId, (siblings) => siblings.filter((node) => node.id !== id)));
            focusLater(selected);
            return;
        }
        if (name !== null) {
            setTree((current) => update(current, hit.parentId, (siblings) => siblings.map((node) => (node.id === id ? {...node, name} : node))));
            setSelected(id);
        }
        focusLater(id);
    };

    const remove = (id: string) => {
        const hit = find(tree, id);
        if (!hit) return;
        const index = hit.siblings.findIndex((node) => node.id === id);
        setTree((current) => update(current, hit.parentId, (siblings) => siblings.filter((node) => node.id !== id)));
        setRemoved({node: hit.node, parentId: hit.parentId, index});
    };

    const undo = () => {
        if (!removed) return;
        setTree((current) =>
            update(current, removed.parentId, (siblings) => [...siblings.slice(0, removed.index), removed.node, ...siblings.slice(removed.index)]),
        );
        setSelected(removed.node.id);
        focusLater(removed.node.id);
        setRemoved(null);
    };

    const onRowKeyDown = (event: KeyboardEvent<HTMLButtonElement>, node: Node) => {
        if (event.key === "F2") {
            event.preventDefault();
            setEditing({id: node.id, isNew: false});
        } else if (event.key === "Delete" || (event.key === "Backspace" && event.metaKey)) {
            event.preventDefault();
            remove(node.id);
        }
    };

    const renderNodes = (nodes: Node[], level: number) =>
        sortNodes(nodes).map((node) => {
            const isFolder = node.kind === "folder";
            const isOpen = expanded.has(node.id);
            const isSelected = selected === node.id;
            const isEditing = editing?.id === node.id;
            const Icon = isFolder ? (isOpen ? LuFolderOpen : LuFolder) : level === 1 ? LuFile : LuFileText;

            return (
                <motion.li
                    key={node.id}
                    layout={reduceMotion ? false : "position"}
                    initial={reduceMotion ? {opacity: 0} : {opacity: 0, x: -6}}
                    animate={{opacity: 1, x: 0}}
                    exit={{opacity: 0}}
                    transition={{duration: 0.18}}
                >
                    <div
                        style={{paddingLeft: `${(level - 1) * 16 + 6}px`}}
                        className={`group relative flex h-9 items-center gap-1.5 rounded-lg pr-1.5 transition-colors ${
                            isSelected && !isEditing ? "bg-zinc-100 dark:bg-white/[0.07]" : "hover:bg-zinc-50 dark:hover:bg-white/[0.03]"
                        }`}
                    >
                        <LuChevronRight
                            className={`size-3.5 shrink-0 text-zinc-400 transition-transform duration-200 ${isFolder ? "" : "invisible"} ${isOpen ? "rotate-90" : ""}`}
                            aria-hidden
                        />
                        <Icon className={`size-4 shrink-0 ${isFolder ? "text-amber-500" : "text-zinc-400 dark:text-zinc-500"}`} aria-hidden/>
                        {isEditing ? (
                            <RenameField
                                initial={node.name}
                                siblings={find(tree, node.id)?.siblings ?? []}
                                onDone={(name) => finishEditing(node.id, name)}
                            />
                        ) : (
                            <>
                                <button
                                    ref={(element) => {
                                        if (element) rowRefs.current.set(node.id, element);
                                        else rowRefs.current.delete(node.id);
                                    }}
                                    type="button"
                                    onClick={() => {
                                        setSelected(node.id);
                                        if (isFolder) setExpanded((current) => {
                                            const next = new Set(current);
                                            if (next.has(node.id)) next.delete(node.id);
                                            else next.add(node.id);
                                            return next;
                                        });
                                    }}
                                    onDoubleClick={() => setEditing({id: node.id, isNew: false})}
                                    onKeyDown={(event) => onRowKeyDown(event, node)}
                                    aria-expanded={isFolder ? isOpen : undefined}
                                    aria-current={isSelected ? "true" : undefined}
                                    className="min-w-0 flex-1 truncate rounded text-left text-sm text-zinc-800 outline-none after:absolute after:inset-0 after:rounded-lg focus-visible:after:ring-2 focus-visible:after:ring-inset focus-visible:after:ring-indigo-500/60 dark:text-zinc-200"
                                >
                                    {node.name}
                                </button>
                                <span className="relative z-10 flex shrink-0 items-center gap-0.5 opacity-0 transition-opacity focus-within:opacity-100 group-hover:opacity-100">
                                    <button
                                        type="button"
                                        onClick={() => setEditing({id: node.id, isNew: false})}
                                        aria-label={`Rename ${node.name}`}
                                        className="flex size-6 items-center justify-center rounded-md text-zinc-400 transition hover:bg-zinc-200/80 hover:text-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 dark:hover:bg-white/10 dark:hover:text-zinc-100"
                                    >
                                        <LuPencil className="size-3.5" aria-hidden/>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => remove(node.id)}
                                        aria-label={`Delete ${node.name}`}
                                        className="flex size-6 items-center justify-center rounded-md text-zinc-400 transition hover:bg-rose-50 hover:text-rose-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/60 dark:hover:bg-rose-400/10 dark:hover:text-rose-400"
                                    >
                                        <LuTrash2 className="size-3.5" aria-hidden/>
                                    </button>
                                </span>
                            </>
                        )}
                    </div>
                    {isFolder && isOpen && (
                        <ul>
                            {node.children && node.children.length > 0 ? (
                                <AnimatePresence initial={false}>{renderNodes(node.children, level + 1)}</AnimatePresence>
                            ) : (
                                <li style={{paddingLeft: `${level * 16 + 26}px`}} className="py-1.5 text-xs italic text-zinc-400 dark:text-zinc-500">
                                    Empty folder
                                </li>
                            )}
                        </ul>
                    )}
                </motion.li>
            );
        });

    return (
        <div className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-white/10 dark:bg-zinc-900">
            <div className="flex items-center justify-between border-b border-zinc-100 py-2 pl-4 pr-2 dark:border-white/[0.06]">
                <p className="text-sm font-semibold text-zinc-900 dark:text-white">Team wiki</p>
                <div className="flex items-center gap-0.5">
                    <button
                        type="button"
                        onClick={() => create("file")}
                        aria-label="New page"
                        title="New page"
                        className="flex size-8 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-white"
                    >
                        <LuFilePlus className="size-4" aria-hidden/>
                    </button>
                    <button
                        type="button"
                        onClick={() => create("folder")}
                        aria-label="New folder"
                        title="New folder"
                        className="flex size-8 items-center justify-center rounded-lg text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-white"
                    >
                        <LuFolderPlus className="size-4" aria-hidden/>
                    </button>
                </div>
            </div>

            <ul aria-label="Wiki pages" className="h-72 overflow-y-auto p-2">
                <AnimatePresence initial={false}>{renderNodes(tree, 1)}</AnimatePresence>
            </ul>

            <div className="flex h-11 items-center border-t border-zinc-100 px-4 text-[11px] text-zinc-400 dark:border-white/[0.06] dark:text-zinc-500">
                Double-click or press F2 to rename. Delete removes.
            </div>

            <AnimatePresence>
                {removed && (
                    <motion.div
                        role="status"
                        className="absolute inset-x-2 bottom-2 flex items-center justify-between gap-3 rounded-xl bg-zinc-900 py-1.5 pl-3.5 pr-1.5 text-sm text-white shadow-lg dark:bg-white dark:text-zinc-900"
                        initial={reduceMotion ? {opacity: 0} : {opacity: 0, y: 12}}
                        animate={{opacity: 1, y: 0}}
                        exit={reduceMotion ? {opacity: 0} : {opacity: 0, y: 12}}
                        transition={{type: "spring", stiffness: 500, damping: 36}}
                    >
                        <span className="truncate">Deleted “{removed.node.name}”</span>
                        <button
                            type="button"
                            onClick={undo}
                            className="shrink-0 rounded-lg px-2.5 py-1 text-xs font-semibold text-indigo-300 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 dark:text-indigo-600 dark:hover:bg-zinc-100"
                        >
                            Undo
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default EditableTree;
