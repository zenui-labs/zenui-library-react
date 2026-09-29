import {useMemo, useState} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {LuCheck, LuChevronRight, LuFolder, LuSearch} from "react-icons/lu";

type Change = "added" | "modified" | "deleted";

interface ChangedFile {
    path: string;
    change: Change;
    additions: number;
    deletions: number;
}

interface FolderGroup {
    folder: string;
    files: ChangedFile[];
}

const changes: ChangedFile[] = [
    {path: "src/auth/refreshToken.ts", change: "modified", additions: 42, deletions: 18},
    {path: "src/auth/session.ts", change: "modified", additions: 7, deletions: 3},
    {path: "src/auth/safariStorage.ts", change: "added", additions: 64, deletions: 0},
    {path: "src/api/client.ts", change: "modified", additions: 12, deletions: 9},
    {path: "src/api/legacyAuth.ts", change: "deleted", additions: 0, deletions: 88},
    {path: "tests/auth/refreshToken.test.ts", change: "added", additions: 96, deletions: 0},
    {path: "tests/auth/session.test.ts", change: "modified", additions: 15, deletions: 4},
    {path: "docs/authentication.md", change: "modified", additions: 9, deletions: 2},
];

const changeStyles: Record<Change, {letter: string; label: string; className: string}> = {
    added: {letter: "A", label: "Added", className: "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-400/20"},
    modified: {letter: "M", label: "Modified", className: "bg-amber-50 text-amber-700 ring-amber-600/20 dark:bg-amber-400/10 dark:text-amber-300 dark:ring-amber-400/20"},
    deleted: {letter: "D", label: "Deleted", className: "bg-rose-50 text-rose-700 ring-rose-600/20 dark:bg-rose-400/10 dark:text-rose-300 dark:ring-rose-400/20"},
};

const fileName = (path: string) => path.slice(path.lastIndexOf("/") + 1);
const folderName = (path: string) => path.slice(0, path.lastIndexOf("/"));

// Five small blocks that show the ratio of added to removed lines, like a pull request diffstat.
const DiffBar = ({additions, deletions}: {additions: number; deletions: number}) => {
    const total = additions + deletions || 1;
    const green = Math.round((additions / total) * 5);
    return (
        <span className="flex gap-px" aria-hidden>
            {Array.from({length: 5}, (_, index) => (
                <span
                    key={index}
                    className={`size-1.5 rounded-[1px] ${index < green ? "bg-emerald-500" : "bg-rose-500"}`}
                />
            ))}
        </span>
    );
};

const ChangedFiles = () => {
    const [query, setQuery] = useState("");
    const [collapsed, setCollapsed] = useState<Set<string>>(() => new Set());
    const [viewed, setViewed] = useState<Set<string>>(() => new Set(["src/auth/session.ts", "docs/authentication.md"]));
    const reduceMotion = useReducedMotion();

    const groups = useMemo<FolderGroup[]>(() => {
        const needle = query.trim().toLowerCase();
        const matching = changes.filter((file) => file.path.toLowerCase().includes(needle));
        const folders = [...new Set(matching.map((file) => folderName(file.path)))];
        return folders.map((folder) => ({folder, files: matching.filter((file) => folderName(file.path) === folder)}));
    }, [query]);

    const toggleSet = (setter: typeof setViewed, key: string) =>
        setter((current) => {
            const next = new Set(current);
            if (next.has(key)) next.delete(key);
            else next.add(key);
            return next;
        });

    const totals = changes.reduce((sum, file) => ({add: sum.add + file.additions, del: sum.del + file.deletions}), {add: 0, del: 0});
    const progress = (viewed.size / changes.length) * 100;

    return (
        <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-white/10 dark:bg-zinc-900">
            <div className="border-b border-zinc-100 p-4 dark:border-white/[0.06]">
                <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                        {changes.length} files changed
                        <span className="ml-2 font-mono text-xs font-medium">
                            <span className="text-emerald-600 dark:text-emerald-400">+{totals.add}</span>{" "}
                            <span className="text-rose-600 dark:text-rose-400">-{totals.del}</span>
                        </span>
                    </p>
                    <p className="text-xs tabular-nums text-zinc-500 dark:text-zinc-400">
                        {viewed.size} of {changes.length} viewed
                    </p>
                </div>
                <div
                    className="mt-3 h-1 overflow-hidden rounded-full bg-zinc-100 dark:bg-white/[0.06]"
                    role="progressbar"
                    aria-label="Files viewed"
                    aria-valuemin={0}
                    aria-valuemax={changes.length}
                    aria-valuenow={viewed.size}
                >
                    <motion.div
                        className="h-full rounded-full bg-indigo-500"
                        animate={{width: `${progress}%`}}
                        transition={reduceMotion ? {duration: 0} : {type: "spring", stiffness: 200, damping: 30}}
                    />
                </div>
                <label className="relative mt-3 block">
                    <span className="sr-only">Filter changed files</span>
                    <LuSearch className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" aria-hidden/>
                    <input
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder="Filter files"
                        className="h-9 w-full rounded-lg border border-zinc-200 bg-zinc-50 pl-9 pr-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-indigo-400 focus:bg-white focus:ring-2 focus:ring-indigo-500/20 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:border-indigo-400/60 dark:focus:bg-transparent"
                    />
                </label>
            </div>

            <ul className="h-72 overflow-y-auto p-2">
                {groups.map(({folder, files}) => {
                    const open = !collapsed.has(folder);
                    return (
                        <li key={folder}>
                            <button
                                type="button"
                                onClick={() => toggleSet(setCollapsed, folder)}
                                aria-expanded={open}
                                className="flex h-8 w-full items-center gap-1.5 rounded-md px-2 text-left text-xs font-medium text-zinc-500 transition hover:bg-zinc-50 hover:text-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500/60 dark:text-zinc-400 dark:hover:bg-white/[0.03] dark:hover:text-zinc-200"
                            >
                                <LuChevronRight className={`size-3.5 transition-transform duration-200 ${open ? "rotate-90" : ""}`} aria-hidden/>
                                <LuFolder className="size-3.5" aria-hidden/>
                                <span className="truncate font-mono">{folder}</span>
                                <span className="ml-auto tabular-nums">{files.length}</span>
                            </button>
                            <AnimatePresence initial={false}>
                                {open && (
                                    <motion.ul
                                        className="overflow-hidden"
                                        initial={reduceMotion ? {opacity: 0} : {height: 0, opacity: 0}}
                                        animate={{height: "auto", opacity: 1}}
                                        exit={reduceMotion ? {opacity: 0} : {height: 0, opacity: 0}}
                                        transition={{duration: 0.2, ease: [0.16, 1, 0.3, 1]}}
                                    >
                                        {files.map((file) => {
                                            const style = changeStyles[file.change];
                                            const isViewed = viewed.has(file.path);
                                            return (
                                                <li key={file.path} className="group flex h-9 items-center gap-2.5 rounded-md pl-7 pr-2 hover:bg-zinc-50 dark:hover:bg-white/[0.03]">
                                                    <span
                                                        className={`flex size-4 shrink-0 items-center justify-center rounded text-[10px] font-bold ring-1 ring-inset ${style.className}`}
                                                        title={style.label}
                                                    >
                                                        {style.letter}
                                                        <span className="sr-only">, {style.label}</span>
                                                    </span>
                                                    <span
                                                        className={`min-w-0 flex-1 truncate font-mono text-[13px] ${
                                                            file.change === "deleted" ? "text-zinc-400 line-through dark:text-zinc-500" : "text-zinc-800 dark:text-zinc-200"
                                                        } ${isViewed ? "opacity-50" : ""}`}
                                                    >
                                                        {fileName(file.path)}
                                                    </span>
                                                    <span className="hidden items-center gap-2 font-mono text-xs sm:flex">
                                                        <span className="text-emerald-600 dark:text-emerald-400">+{file.additions}</span>
                                                        <span className="text-rose-600 dark:text-rose-400">-{file.deletions}</span>
                                                        <DiffBar additions={file.additions} deletions={file.deletions}/>
                                                    </span>
                                                    <label className="relative flex cursor-pointer items-center">
                                                        <input
                                                            type="checkbox"
                                                            checked={isViewed}
                                                            onChange={() => toggleSet(setViewed, file.path)}
                                                            aria-label={`Mark ${fileName(file.path)} as viewed`}
                                                            className="peer size-4 cursor-pointer appearance-none rounded border border-zinc-300 bg-white transition checked:border-indigo-500 checked:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/50 focus-visible:ring-offset-1 dark:border-zinc-600 dark:bg-transparent dark:checked:border-indigo-400 dark:checked:bg-indigo-400 dark:focus-visible:ring-offset-zinc-900"
                                                        />
                                                        <LuCheck className="pointer-events-none absolute left-0.5 top-0.5 size-3 text-white opacity-0 peer-checked:opacity-100 dark:text-zinc-900" aria-hidden/>
                                                    </label>
                                                </li>
                                            );
                                        })}
                                    </motion.ul>
                                )}
                            </AnimatePresence>
                        </li>
                    );
                })}
                {groups.length === 0 && (
                    <li className="px-4 py-12 text-center text-sm text-zinc-500 dark:text-zinc-400">No changed files match “{query.trim()}”</li>
                )}
            </ul>
        </div>
    );
};

export default ChangedFiles;
