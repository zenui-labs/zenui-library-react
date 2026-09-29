import {useId, useRef, useState} from "react";
import type {KeyboardEvent} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {LuHash, LuPlus} from "react-icons/lu";

interface Workspace {
    id: string;
    name: string;
    short: string;
    color: string;
    unread: number;
    mentions: number;
    members: number;
    channels: string[];
}

const workspaces: Workspace[] = [
    {id: "northwind", name: "Northwind", short: "N", color: "bg-indigo-600", unread: 0, mentions: 0, members: 142, channels: ["general", "product", "releases"]},
    {id: "fernhill", name: "Fernhill Goods", short: "FG", color: "bg-emerald-600", unread: 12, mentions: 2, members: 18, channels: ["orders", "suppliers", "photo-shoots"]},
    {id: "tidal", name: "Tidal Studio", short: "TS", color: "bg-sky-600", unread: 3, mentions: 0, members: 9, channels: ["client-work", "invoices"]},
    {id: "rowing", name: "Harbor Rowing Club", short: "HR", color: "bg-rose-600", unread: 0, mentions: 0, members: 64, channels: ["schedule", "race-day", "kit"]},
    {id: "oss", name: "Open source maintainers", short: "OS", color: "bg-zinc-800 dark:bg-zinc-700", unread: 1, mentions: 1, members: 1320, channels: ["triage", "security", "docs"]},
];

const WorkspaceRail = () => {
    const [selected, setSelected] = useState("northwind");
    const [read, setRead] = useState<string[]>([]);
    const tabs = useRef<(HTMLButtonElement | null)[]>([]);
    const reduceMotion = useReducedMotion();
    const id = useId();
    const current = workspaces.find((workspace) => workspace.id === selected) ?? workspaces[0];

    const select = (index: number) => {
        const next = (index + workspaces.length) % workspaces.length;
        const workspace = workspaces[next];
        setSelected(workspace.id);
        setRead((list) => (list.includes(workspace.id) ? list : [...list, workspace.id]));
        tabs.current[next]?.focus();
    };

    const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
        const keys: Record<string, number> = {ArrowDown: index + 1, ArrowUp: index - 1, Home: 0, End: workspaces.length - 1};
        if (!(event.key in keys)) return;
        event.preventDefault();
        select(keys[event.key]);
    };

    return (
        <div className="flex h-[26rem] w-full max-w-xl overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-white/10 dark:bg-zinc-900">
            <div className="flex w-[4.5rem] shrink-0 flex-col items-center gap-2 bg-zinc-100 py-3 dark:bg-zinc-950">
                <div role="tablist" aria-label="Workspaces" aria-orientation="vertical" className="flex flex-col items-center gap-2">
                    {workspaces.map((workspace, index) => {
                        const isSelected = workspace.id === selected;
                        const unread = read.includes(workspace.id) ? 0 : workspace.unread;
                        const mentions = read.includes(workspace.id) ? 0 : workspace.mentions;
                        return (
                            <div key={workspace.id} className="group relative flex w-full justify-center">
                                {/* Indicator: tall for the selected workspace, a dot for unread, grows on hover. */}
                                <span className="absolute left-0 top-1/2 flex h-10 -translate-y-1/2 items-center" aria-hidden>
                                    {isSelected ? (
                                        <motion.span
                                            layoutId={`${id}-indicator`}
                                            className="h-9 w-1 rounded-r-full bg-zinc-900 dark:bg-white"
                                            transition={reduceMotion ? {duration: 0} : {type: "spring", stiffness: 500, damping: 36}}
                                        />
                                    ) : (
                                        <span className={`w-1 rounded-r-full bg-zinc-900 transition-all duration-200 dark:bg-white ${unread ? "h-2 group-hover:h-5" : "h-0 group-hover:h-5"}`}/>
                                    )}
                                </span>

                                <button
                                    ref={(node) => {
                                        tabs.current[index] = node;
                                    }}
                                    type="button"
                                    role="tab"
                                    id={`${id}-tab-${workspace.id}`}
                                    aria-selected={isSelected}
                                    aria-controls={`${id}-panel`}
                                    aria-label={`${workspace.name}${mentions ? `, ${mentions} mentions` : unread ? `, ${unread} unread` : ""}`}
                                    tabIndex={isSelected ? 0 : -1}
                                    onClick={() => select(index)}
                                    onKeyDown={(event) => onKeyDown(event, index)}
                                    className={`relative flex size-11 items-center justify-center text-sm font-semibold text-white outline-none transition-[border-radius,transform] duration-200 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-100 active:translate-y-px dark:focus-visible:ring-offset-zinc-950 ${workspace.color} ${
                                        isSelected ? "rounded-xl" : "rounded-2xl group-hover:rounded-xl"
                                    }`}
                                >
                                    {workspace.short}
                                    <AnimatePresence>
                                        {(mentions > 0 || unread > 0) && (
                                            <motion.span
                                                initial={reduceMotion ? {opacity: 0} : {scale: 0}}
                                                animate={{scale: 1, opacity: 1}}
                                                exit={reduceMotion ? {opacity: 0} : {scale: 0}}
                                                transition={{type: "spring", stiffness: 500, damping: 28}}
                                                className={`absolute -bottom-1 -right-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-1 text-[10px] font-bold tabular-nums ring-[3px] ring-zinc-100 dark:ring-zinc-950 ${
                                                    mentions ? "bg-rose-500 text-white" : "bg-zinc-500 text-white dark:bg-zinc-400 dark:text-zinc-950"
                                                }`}
                                                aria-hidden
                                            >
                                                {mentions || unread}
                                            </motion.span>
                                        )}
                                    </AnimatePresence>
                                </button>

                                <span className="pointer-events-none absolute left-full top-1/2 z-20 -ml-1 -translate-y-1/2 whitespace-nowrap rounded-md bg-zinc-900 px-2 py-1 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100 dark:bg-white dark:text-zinc-900" aria-hidden>
                                    {workspace.name}
                                </span>
                            </div>
                        );
                    })}
                </div>

                <span className="my-1 h-px w-8 bg-zinc-300 dark:bg-white/10" aria-hidden/>
                <button
                    type="button"
                    aria-label="Add a workspace"
                    className="flex size-11 items-center justify-center rounded-2xl border-2 border-dashed border-zinc-300 text-zinc-500 transition-all duration-200 hover:rounded-xl hover:border-emerald-500 hover:text-emerald-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-emerald-400 dark:hover:text-emerald-400"
                >
                    <LuPlus className="size-5" aria-hidden/>
                </button>
            </div>

            <div id={`${id}-panel`} role="tabpanel" aria-labelledby={`${id}-tab-${current.id}`} className="min-w-0 flex-1 overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={current.id}
                        className="p-5"
                        initial={reduceMotion ? {opacity: 0} : {opacity: 0, x: 8}}
                        animate={{opacity: 1, x: 0}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.15}}
                    >
                        <div className="flex items-center gap-3">
                            <span className={`flex size-10 shrink-0 items-center justify-center rounded-xl text-sm font-semibold text-white ${current.color}`} aria-hidden>
                                {current.short}
                            </span>
                            <div className="min-w-0">
                                <h3 className="truncate text-sm font-semibold text-zinc-900 dark:text-white">{current.name}</h3>
                                <p className="text-xs text-zinc-500 dark:text-zinc-400">{current.members.toLocaleString("en-US")} members</p>
                            </div>
                        </div>
                        <p className="mt-6 text-[11px] font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500">Channels</p>
                        <ul className="mt-2 space-y-0.5">
                            {current.channels.map((channel, index) => (
                                <li
                                    key={channel}
                                    className={`flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm ${
                                        index === 0 ? "bg-zinc-100 font-medium text-zinc-900 dark:bg-white/[0.06] dark:text-white" : "text-zinc-600 dark:text-zinc-400"
                                    }`}
                                >
                                    <LuHash className="size-3.5 shrink-0 text-zinc-400" aria-hidden/>
                                    <span className="truncate">{channel}</span>
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default WorkspaceRail;
