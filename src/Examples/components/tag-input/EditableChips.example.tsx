import {useEffect, useId, useRef, useState} from "react";
import type {KeyboardEvent} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {LuX} from "react-icons/lu";

interface Chip {
    id: number;
    text: string;
}

const MAX_CHIPS = 10;
const MAX_LENGTH = 28;

let nextId = 5;

const EditableChips = () => {
    const [chips, setChips] = useState<Chip[]>([
        {id: 1, text: "trail running shoes"},
        {id: 2, text: "waterproof"},
        {id: 3, text: "wide fit"},
        {id: 4, text: "vegan leather"},
    ]);
    const [draft, setDraft] = useState("");
    const [editing, setEditing] = useState<number | null>(null);
    const [editText, setEditText] = useState("");
    const [error, setError] = useState("");
    const chipRefs = useRef(new Map<number, HTMLButtonElement>());
    const inputRef = useRef<HTMLInputElement>(null);
    const editRef = useRef<HTMLInputElement>(null);
    const id = useId();
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        if (editing !== null) {
            editRef.current?.focus();
            editRef.current?.select();
        }
    }, [editing]);

    const focusChip = (index: number) => {
        const chip = chips[index];
        if (chip) chipRefs.current.get(chip.id)?.focus();
        else inputRef.current?.focus();
    };

    const isDuplicate = (text: string, exceptId?: number) => chips.some((chip) => chip.id !== exceptId && chip.text === text);

    const add = () => {
        const text = draft.trim().toLowerCase();
        if (!text) return;
        if (isDuplicate(text)) return setError(`“${text}” is already in the list.`);
        if (chips.length >= MAX_CHIPS) return setError(`Keep it to ${MAX_CHIPS} keywords.`);
        setChips((current) => [...current, {id: nextId++, text}]);
        setDraft("");
        setError("");
    };

    const remove = (index: number) => {
        setChips((current) => current.filter((_, position) => position !== index));
        setError("");
        // Focus moves to the chip that takes its place, or the field when the list ends.
        window.setTimeout(() => {
            const next = chips[index + 1] ?? chips[index - 1];
            if (next) chipRefs.current.get(next.id)?.focus();
            else inputRef.current?.focus();
        }, 0);
    };

    // Leaving the field with a duplicate keeps the old text instead of trapping the user in edit mode.
    const commitEdit = (chip: Chip, leaving = false) => {
        const text = editText.trim().toLowerCase();
        if (text && isDuplicate(text, chip.id)) {
            setError(`“${text}” is already in the list.`);
            if (leaving) setEditing(null);
            return;
        }
        setChips((current) => (text ? current.map((item) => (item.id === chip.id ? {...item, text} : item)) : current.filter((item) => item.id !== chip.id)));
        setEditing(null);
        setError("");
        window.setTimeout(() => (text ? chipRefs.current.get(chip.id)?.focus() : inputRef.current?.focus()), 0);
    };

    const onChipKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
        switch (event.key) {
            case "ArrowLeft":
                focusChip(Math.max(index - 1, 0));
                break;
            case "ArrowRight":
                focusChip(index + 1);
                break;
            case "Home":
                focusChip(0);
                break;
            case "End":
                inputRef.current?.focus();
                break;
            case "Enter":
            case "F2":
                setEditText(chips[index].text);
                setEditing(chips[index].id);
                break;
            case "Backspace":
            case "Delete":
                remove(index);
                break;
            default:
                return;
        }
        event.preventDefault();
    };

    const onInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" || event.key === ",") {
            event.preventDefault();
            add();
        } else if ((event.key === "ArrowLeft" || event.key === "Backspace") && event.currentTarget.selectionStart === 0 && event.currentTarget.selectionEnd === 0 && chips.length) {
            event.preventDefault();
            focusChip(chips.length - 1);
        }
    };

    return (
        <div className="w-full max-w-lg min-h-[280px]">
            <div className="flex items-baseline justify-between">
                <label htmlFor={id} className="text-sm font-medium text-zinc-900 dark:text-zinc-100">Search keywords</label>
                <span className="text-xs tabular-nums text-zinc-400 dark:text-zinc-500">{chips.length}/{MAX_CHIPS}</span>
            </div>
            <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">Shown to search engines for the Ridgeline GTX product page.</p>

            <div className="mt-3 rounded-2xl border border-zinc-200 bg-gradient-to-b from-white to-zinc-50 p-2 shadow-sm dark:border-white/10 dark:from-zinc-900 dark:to-zinc-900/60">
                <ul className="flex flex-wrap gap-1.5 p-1" aria-label="Keywords" aria-describedby={`${id}-help`}>
                    <AnimatePresence initial={false}>
                        {chips.map((chip, index) => (
                            <motion.li
                                key={chip.id}
                                layout={!reduceMotion}
                                initial={reduceMotion ? {opacity: 0} : {opacity: 0, scale: 0.85}}
                                animate={{opacity: 1, scale: 1}}
                                exit={reduceMotion ? {opacity: 0} : {opacity: 0, scale: 0.85}}
                                transition={{type: "spring", stiffness: 520, damping: 34}}
                                className="relative"
                            >
                                {editing === chip.id ? (
                                    <input
                                        ref={editRef}
                                        value={editText}
                                        maxLength={MAX_LENGTH}
                                        size={Math.max(editText.length, 4)}
                                        onChange={(event) => {
                                            setEditText(event.target.value);
                                            setError("");
                                        }}
                                        onKeyDown={(event) => {
                                            if (event.key === "Enter") {
                                                event.preventDefault();
                                                commitEdit(chip);
                                            } else if (event.key === "Escape") {
                                                event.preventDefault();
                                                setEditing(null);
                                                setError("");
                                                window.setTimeout(() => chipRefs.current.get(chip.id)?.focus(), 0);
                                            }
                                        }}
                                        onBlur={() => commitEdit(chip, true)}
                                        aria-label={`Edit keyword ${chip.text}`}
                                        className="h-8 rounded-full border border-indigo-400 bg-white px-3 text-sm text-zinc-900 outline-none ring-4 ring-indigo-500/10 dark:border-indigo-400/60 dark:bg-zinc-950 dark:text-zinc-100"
                                    />
                                ) : (
                                    <span className="group inline-flex h-8 items-center rounded-full border border-zinc-200 bg-white text-sm text-zinc-800 shadow-sm transition hover:border-zinc-300 has-[:focus-visible]:border-indigo-400 has-[:focus-visible]:ring-4 has-[:focus-visible]:ring-indigo-500/10 dark:border-white/10 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:border-white/20">
                                        <button
                                            ref={(element) => {
                                                if (element) chipRefs.current.set(chip.id, element);
                                                else chipRefs.current.delete(chip.id);
                                            }}
                                            type="button"
                                            tabIndex={-1}
                                            onClick={() => {
                                                setEditText(chip.text);
                                                setEditing(chip.id);
                                            }}
                                            onKeyDown={(event) => onChipKeyDown(event, index)}
                                            aria-label={`${chip.text}. Enter to edit, Delete to remove`}
                                            className="h-full rounded-l-full pl-3 pr-1 outline-none"
                                        >
                                            {chip.text}
                                        </button>
                                        <button
                                            type="button"
                                            tabIndex={-1}
                                            onClick={() => remove(index)}
                                            aria-label={`Remove ${chip.text}`}
                                            className="mr-1 flex size-6 items-center justify-center rounded-full text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-800 dark:hover:bg-white/10 dark:hover:text-zinc-100"
                                        >
                                            <LuX className="size-3.5" aria-hidden/>
                                        </button>
                                    </span>
                                )}
                            </motion.li>
                        ))}
                    </AnimatePresence>
                    <li className="flex min-w-[10rem] flex-1">
                        <input
                            ref={inputRef}
                            id={id}
                            value={draft}
                            maxLength={MAX_LENGTH}
                            onChange={(event) => {
                                setDraft(event.target.value);
                                setError("");
                            }}
                            onKeyDown={onInputKeyDown}
                            onBlur={add}
                            placeholder={chips.length >= MAX_CHIPS ? "List is full" : "Add keyword"}
                            readOnly={chips.length >= MAX_CHIPS}
                            className="h-8 w-full rounded-full bg-transparent px-3 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:bg-white focus:ring-1 focus:ring-zinc-200 read-only:cursor-default dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:bg-zinc-950 dark:focus:ring-white/10"
                        />
                    </li>
                </ul>
            </div>

            <div className="mt-2 flex min-h-5 items-start justify-between gap-4 text-xs">
                <p id={`${id}-help`} className="text-zinc-500 dark:text-zinc-400">
                    Click a keyword to edit it. From the field, press Left to move into the list.
                </p>
                {draft && (
                    <span className={`shrink-0 tabular-nums ${draft.length >= MAX_LENGTH ? "text-amber-600 dark:text-amber-400" : "text-zinc-400"}`}>
                        {draft.length}/{MAX_LENGTH}
                    </span>
                )}
            </div>
            <p role="alert" className="mt-1 min-h-4 text-xs text-rose-600 dark:text-rose-400">{error}</p>
        </div>
    );
};

export default EditableChips;
