import {useEffect, useId, useRef, useState} from "react";
import type {KeyboardEvent} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {LuPencilLine, LuStickyNote, LuUndo2} from "react-icons/lu";

const MAX_LENGTH = 280;
const UNDO_SECONDS = 6;

interface Saved {
    previous: string;
    at: number;
}

const NoteWithUndo = () => {
    const [note, setNote] = useState("Prefers email over calls. Renewal is tied to the Q1 budget review, so follow up in the first week of January.");
    const [draft, setDraft] = useState(note);
    const [editing, setEditing] = useState(false);
    const [saved, setSaved] = useState<Saved | null>(null);
    const [editedLabel, setEditedLabel] = useState("Edited by Dana Ruiz on Sep 12");
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const viewRef = useRef<HTMLButtonElement>(null);
    const id = useId();
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        if (!editing) return;
        const field = textareaRef.current;
        field?.focus();
        field?.setSelectionRange(field.value.length, field.value.length);
    }, [editing]);

    // The undo bar closes by itself once its countdown ends.
    useEffect(() => {
        if (!saved) return;
        const timer = window.setTimeout(() => setSaved(null), UNDO_SECONDS * 1000);
        return () => window.clearTimeout(timer);
    }, [saved]);

    const start = () => {
        setDraft(note);
        setEditing(true);
    };

    const cancel = () => {
        setEditing(false);
        window.setTimeout(() => viewRef.current?.focus(), 0);
    };

    const save = () => {
        const next = draft.trim();
        setEditing(false);
        window.setTimeout(() => viewRef.current?.focus(), 0);
        if (next === note) return;
        setSaved({previous: note, at: Date.now()});
        setNote(next);
        setEditedLabel("Edited by you just now");
    };

    const undo = () => {
        if (!saved) return;
        setNote(saved.previous);
        setEditedLabel("Restored the previous note");
        setSaved(null);
        viewRef.current?.focus();
    };

    const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Escape") {
            event.preventDefault();
            cancel();
        } else if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
            event.preventDefault();
            save();
        }
    };

    const remaining = MAX_LENGTH - draft.length;

    return (
        <div className="w-full max-w-md min-h-[340px]">
            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-white/10 dark:bg-zinc-900">
                <div className="flex items-center gap-3 px-5 pt-5">
                    <span className="flex size-10 items-center justify-center rounded-full bg-orange-100 text-sm font-semibold text-orange-700 dark:bg-orange-400/15 dark:text-orange-300" aria-hidden>
                        GH
                    </span>
                    <div>
                        <p className="text-sm font-semibold text-zinc-900 dark:text-white">Grace Holloway</p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">Head of Operations, Tidewater Freight</p>
                    </div>
                </div>

                <div className="px-5 pb-5 pt-4">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                        <LuStickyNote className="size-3.5" aria-hidden/>
                        <span id={`${id}-label`}>Account note</span>
                    </div>

                    {editing ? (
                        <div className="mt-2">
                            {/* The hidden copy in the same grid cell sets the height, so the field grows with the text. */}
                            <div className="grid text-sm leading-6 [&>*]:[grid-area:1/1]">
                                <span className="invisible whitespace-pre-wrap break-words px-3 py-2" aria-hidden>{draft} </span>
                                <textarea
                                    ref={textareaRef}
                                    value={draft}
                                    maxLength={MAX_LENGTH}
                                    onChange={(event) => setDraft(event.target.value)}
                                    onKeyDown={onKeyDown}
                                    aria-labelledby={`${id}-label`}
                                    aria-describedby={`${id}-count`}
                                    rows={2}
                                    className="resize-none overflow-hidden rounded-xl border border-orange-300 bg-orange-50/40 px-3 py-2 text-zinc-900 outline-none ring-4 ring-orange-500/10 dark:border-orange-400/40 dark:bg-orange-400/[0.04] dark:text-zinc-100"
                                />
                            </div>
                            <div className="mt-2 flex flex-wrap items-center gap-2">
                                <button
                                    type="button"
                                    onClick={save}
                                    className="h-8 rounded-lg bg-zinc-900 px-3 text-xs font-medium text-white transition hover:bg-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/60 focus-visible:ring-offset-2 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus-visible:ring-offset-zinc-900"
                                >
                                    Save note
                                </button>
                                <button
                                    type="button"
                                    onClick={cancel}
                                    className="h-8 rounded-lg px-3 text-xs font-medium text-zinc-600 transition hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/60 dark:text-zinc-300 dark:hover:bg-white/5"
                                >
                                    Cancel
                                </button>
                                <span id={`${id}-count`} className={`ml-auto text-xs tabular-nums ${remaining < 20 ? "text-orange-600 dark:text-orange-400" : "text-zinc-400 dark:text-zinc-500"}`}>
                                    {remaining} left
                                    <span className="sr-only">. Press Command or Control and Enter to save.</span>
                                </span>
                            </div>
                        </div>
                    ) : (
                        <button
                            ref={viewRef}
                            type="button"
                            onClick={start}
                            aria-label={note ? `Edit account note: ${note}` : "Add an account note"}
                            className="group relative mt-2 block w-full rounded-xl border border-transparent px-3 py-2 text-left text-sm leading-6 text-zinc-700 transition hover:border-zinc-200 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/60 dark:text-zinc-300 dark:hover:border-white/10 dark:hover:bg-white/[0.03]"
                        >
                            <span className={`block whitespace-pre-wrap break-words pr-6 ${note ? "" : "italic text-zinc-400 dark:text-zinc-500"}`}>{note || "Add a note about this account"}</span>
                            <LuPencilLine className="absolute right-3 top-3 size-3.5 text-zinc-400 opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100" aria-hidden/>
                        </button>
                    )}
                    <p className="mt-2 px-3 text-[11px] text-zinc-400 dark:text-zinc-500">{editedLabel}</p>
                </div>
            </div>

            <AnimatePresence>
                {saved && (
                    <motion.div
                        key={saved.at}
                        role="status"
                        className="relative mt-3 flex items-center gap-3 overflow-hidden rounded-xl bg-zinc-900 py-2 pl-3.5 pr-2 text-sm text-white shadow-lg dark:bg-zinc-100 dark:text-zinc-900"
                        initial={reduceMotion ? {opacity: 0} : {opacity: 0, y: 16}}
                        animate={{opacity: 1, y: 0}}
                        exit={reduceMotion ? {opacity: 0} : {opacity: 0, y: 16}}
                        transition={{type: "spring", stiffness: 480, damping: 36}}
                    >
                        <span className="flex-1">Note saved</span>
                        <button
                            type="button"
                            onClick={undo}
                            className="inline-flex h-7 items-center gap-1.5 rounded-lg px-2.5 text-xs font-semibold text-orange-300 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 dark:text-orange-700 dark:hover:bg-zinc-900/5"
                        >
                            <LuUndo2 className="size-3.5" aria-hidden/>
                            Undo
                        </button>
                        {/* Shrinking bar shows how long undo stays available. */}
                        <motion.span
                            className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-orange-400"
                            initial={{scaleX: 1}}
                            animate={{scaleX: 0}}
                            transition={{duration: UNDO_SECONDS, ease: "linear"}}
                            aria-hidden
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default NoteWithUndo;
