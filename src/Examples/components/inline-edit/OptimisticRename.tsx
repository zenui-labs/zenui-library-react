import {useEffect, useRef, useState} from "react";
import type {FormEvent, KeyboardEvent, ReactNode} from "react";
import {AnimatePresence, motion, useAnimationControls, useReducedMotion} from "framer-motion";
import {LuCheck, LuHash, LuLock, LuPencil} from "react-icons/lu";

export interface Channel {
    id: string;
    name: string;
    members: number;
    private?: boolean;
}

/**
 * Saves a new name. Reject with an Error to roll the row back and show its message.
 * `taken` holds the names of the other channels in the list.
 */
export type RenameHandler = (id: string, name: string, taken: string[]) => Promise<void> | void;

type RowState = {kind: "idle"} | {kind: "saving"} | {kind: "saved"} | {kind: "failed"; message: string; attempted: string};

// Channel names are lowercase with hyphens, so spaces and capitals are converted as you type.
const toChannelName = (value: string) => value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-_]/g, "");

export interface ChannelRowProps {
    channel: Channel;
    /** Names of the other channels, passed on to `onSave`. */
    others: string[];
    /** Updates the shown name. Called with the new name first, then with the old one if saving fails. */
    onRename: (id: string, name: string) => void;
    onSave?: RenameHandler;
}

export const ChannelRow = ({channel, others, onRename, onSave}: ChannelRowProps) => {
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState(channel.name);
    const [state, setState] = useState<RowState>({kind: "idle"});
    const inputRef = useRef<HTMLInputElement>(null);
    const editButtonRef = useRef<HTMLButtonElement>(null);
    const mounted = useRef(true);
    const controls = useAnimationControls();
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
        };
    }, []);

    useEffect(() => {
        if (editing) inputRef.current?.select();
    }, [editing]);

    useEffect(() => {
        if (state.kind !== "saved") return;
        const timer = window.setTimeout(() => setState({kind: "idle"}), 1600);
        return () => window.clearTimeout(timer);
    }, [state]);

    const open = (initial = channel.name) => {
        setDraft(initial);
        setEditing(true);
    };

    const close = () => {
        setEditing(false);
        window.setTimeout(() => editButtonRef.current?.focus(), 0);
    };

    const submit = async (event?: FormEvent) => {
        event?.preventDefault();
        const name = draft.replace(/^-+|-+$/g, "");
        close();
        if (!name || name === channel.name) return;
        const previous = channel.name;
        // Show the new name right away and roll back if the server says no.
        onRename(channel.id, name);
        setState({kind: "saving"});
        try {
            await onSave?.(channel.id, name, others);
            if (mounted.current) setState({kind: "saved"});
        } catch (error) {
            if (!mounted.current) return;
            onRename(channel.id, previous);
            setState({kind: "failed", message: error instanceof Error ? error.message : "Rename failed.", attempted: name});
            if (!reduceMotion) controls.start({x: [0, -6, 6, -4, 4, 0], transition: {duration: 0.4}});
        }
    };

    const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Escape") {
            event.preventDefault();
            close();
        }
    };

    return (
        <li className="px-2 py-1">
            <motion.div animate={controls} className="group flex h-11 items-center gap-2.5 rounded-xl px-3 transition-colors hover:bg-zinc-50 dark:hover:bg-white/[0.03]">
                {channel.private ? <LuLock className="size-4 shrink-0 text-zinc-400" aria-label="Private"/> : <LuHash className="size-4 shrink-0 text-zinc-400" aria-hidden/>}
                {editing ? (
                    <form onSubmit={submit} className="min-w-0 flex-1">
                        <input
                            ref={inputRef}
                            value={draft}
                            maxLength={32}
                            onChange={(event) => setDraft(toChannelName(event.target.value))}
                            onKeyDown={onKeyDown}
                            onBlur={() => submit()}
                            aria-label={`New name for ${channel.name}`}
                            className="h-8 w-full rounded-lg border border-emerald-400 bg-white px-2 text-sm text-zinc-900 outline-none ring-4 ring-emerald-500/10 dark:border-emerald-400/60 dark:bg-zinc-950 dark:text-zinc-100"
                        />
                    </form>
                ) : (
                    <span
                        onDoubleClick={() => open()}
                        className={`min-w-0 flex-1 truncate text-sm font-medium transition-opacity ${state.kind === "saving" ? "text-zinc-500 opacity-70 dark:text-zinc-400" : "text-zinc-900 dark:text-zinc-100"}`}
                    >
                        {channel.name}
                    </span>
                )}

                {!editing && (
                    <span className="flex shrink-0 items-center gap-2">
                        <AnimatePresence mode="wait" initial={false}>
                            {state.kind === "saving" && (
                                <motion.span key="saving" className="flex items-center gap-1.5 text-xs text-zinc-400" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                                    <span className="size-3 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-600 dark:border-zinc-600 dark:border-t-zinc-200" aria-hidden/>
                                    Saving
                                </motion.span>
                            )}
                            {state.kind === "saved" && (
                                <motion.span key="saved" className="flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                                    <LuCheck className="size-3.5" aria-hidden/>
                                    Renamed
                                </motion.span>
                            )}
                            {(state.kind === "idle" || state.kind === "failed") && (
                                <motion.span key="members" className="hidden text-xs tabular-nums text-zinc-400 sm:block dark:text-zinc-500" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                                    {channel.members} members
                                </motion.span>
                            )}
                        </AnimatePresence>
                        <button
                            ref={editButtonRef}
                            type="button"
                            onClick={() => open()}
                            disabled={state.kind === "saving"}
                            aria-label={`Rename ${channel.name}`}
                            className="flex size-8 items-center justify-center rounded-lg text-zinc-400 transition hover:bg-zinc-200/70 hover:text-zinc-800 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/60 disabled:opacity-30 sm:opacity-0 sm:group-hover:opacity-100 dark:hover:bg-white/10 dark:hover:text-zinc-100"
                        >
                            <LuPencil className="size-3.5" aria-hidden/>
                        </button>
                    </span>
                )}
            </motion.div>

            <AnimatePresence initial={false}>
                {state.kind === "failed" && !editing && (
                    <motion.div
                        role="alert"
                        className="overflow-hidden"
                        initial={reduceMotion ? {opacity: 0} : {opacity: 0, height: 0}}
                        animate={{opacity: 1, height: "auto"}}
                        exit={reduceMotion ? {opacity: 0} : {opacity: 0, height: 0}}
                        transition={{duration: 0.2}}
                    >
                        <div className="mx-3 mb-1 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg bg-rose-50 px-3 py-2 text-xs text-rose-700 dark:bg-rose-500/10 dark:text-rose-300">
                            <span className="flex-1">Couldn’t rename. {state.message}</span>
                            <button
                                type="button"
                                onClick={() => {
                                    open(state.attempted);
                                    setState({kind: "idle"});
                                }}
                                className="font-semibold underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/60"
                            >
                                Edit name
                            </button>
                            <button
                                type="button"
                                onClick={() => setState({kind: "idle"})}
                                className="text-rose-500 hover:text-rose-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/60 dark:text-rose-400 dark:hover:text-rose-200"
                            >
                                Dismiss
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </li>
    );
};

export interface OptimisticRenameProps {
    /** Starting list. The component keeps its own copy and updates it as names change. */
    channels: Channel[];
    /** Saves a new name. The row shows the name right away and rolls back if this rejects. */
    onRename?: RenameHandler;
    title?: string;
    hint?: string;
    /** Small print shown under the card. */
    footnote?: ReactNode;
    className?: string;
}

/** A channel list where renames show at once and roll back with a shake and a reason when the server rejects them. */
export const OptimisticRename = ({
    channels: initialChannels,
    onRename,
    title = "Channels",
    hint = "Double-click a name to rename",
    footnote,
    className = "",
}: OptimisticRenameProps) => {
    const [channels, setChannels] = useState<Channel[]>(initialChannels);

    const rename = (id: string, name: string) => setChannels((current) => current.map((channel) => (channel.id === id ? {...channel, name} : channel)));

    return (
        <div className={`w-full max-w-md min-h-[360px] ${className}`}>
            <div className="rounded-2xl border border-zinc-200 bg-white py-2 shadow-sm dark:border-white/10 dark:bg-zinc-900">
                <div className="flex items-baseline justify-between px-5 pb-2 pt-2">
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">{title}</h3>
                    {hint && <span className="text-xs text-zinc-400 dark:text-zinc-500">{hint}</span>}
                </div>
                <ul aria-label={title}>
                    {channels.map((channel) => (
                        <ChannelRow
                            key={channel.id}
                            channel={channel}
                            others={channels.filter((item) => item.id !== channel.id).map((item) => item.name)}
                            onRename={rename}
                            onSave={onRename}
                        />
                    ))}
                </ul>
            </div>
            {footnote && <p className="mt-3 px-1 text-xs text-zinc-500 dark:text-zinc-400">{footnote}</p>}
        </div>
    );
};
