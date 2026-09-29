import {useId, useRef, useState} from "react";
import type {ClipboardEvent, KeyboardEvent} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {LuPlus, LuX} from "react-icons/lu";

const MAX_TAGS = 6;

const suggestions = [
    "accessibility",
    "analytics",
    "authentication",
    "backend",
    "billing",
    "design system",
    "documentation",
    "frontend",
    "infrastructure",
    "mobile",
    "onboarding",
    "performance",
    "security",
];

const tagColors = [
    "bg-sky-50 text-sky-700 ring-sky-600/15 dark:bg-sky-400/10 dark:text-sky-300 dark:ring-sky-400/20",
    "bg-violet-50 text-violet-700 ring-violet-600/15 dark:bg-violet-400/10 dark:text-violet-300 dark:ring-violet-400/20",
    "bg-emerald-50 text-emerald-700 ring-emerald-600/15 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-400/20",
    "bg-amber-50 text-amber-800 ring-amber-600/20 dark:bg-amber-400/10 dark:text-amber-300 dark:ring-amber-400/20",
    "bg-rose-50 text-rose-700 ring-rose-600/15 dark:bg-rose-400/10 dark:text-rose-300 dark:ring-rose-400/20",
];

const colorFor = (tag: string) => tagColors[[...tag].reduce((sum, char) => sum + char.charCodeAt(0), 0) % tagColors.length];
const normalize = (value: string) => value.trim().toLowerCase().replace(/\s+/g, " ");

const TagInput = () => {
    const [tags, setTags] = useState<string[]>(["frontend", "performance"]);
    const [draft, setDraft] = useState("");
    const [armed, setArmed] = useState(false);
    const [active, setActive] = useState(0);
    const [focused, setFocused] = useState(false);
    const [message, setMessage] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const inputId = useId();
    const listId = useId();
    const reduceMotion = useReducedMotion();

    const full = tags.length >= MAX_TAGS;
    const needle = normalize(draft);
    const options = suggestions.filter((tag) => !tags.includes(tag) && tag.includes(needle)).slice(0, 5);
    const showOptions = focused && !full && options.length > 0;

    const add = (values: string[]) => {
        const next = [...tags];
        let note = "";
        for (const raw of values) {
            const tag = normalize(raw);
            if (!tag) continue;
            if (next.includes(tag)) note = `“${tag}” is already added`;
            else if (next.length >= MAX_TAGS) note = `You can add up to ${MAX_TAGS} tags`;
            else next.push(tag);
        }
        setTags(next);
        setMessage(note);
        setDraft("");
        setActive(0);
        setArmed(false);
    };

    const remove = (tag: string) => {
        setTags((current) => current.filter((item) => item !== tag));
        setMessage("");
        inputRef.current?.focus();
    };

    const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Backspace" && draft === "" && tags.length) {
            // First press marks the last tag, second press removes it.
            event.preventDefault();
            if (armed) remove(tags[tags.length - 1]);
            setArmed(!armed);
            return;
        }
        setArmed(false);
        if (event.key === "ArrowDown" && showOptions) {
            event.preventDefault();
            setActive((index) => (index + 1) % options.length);
        } else if (event.key === "ArrowUp" && showOptions) {
            event.preventDefault();
            setActive((index) => (index - 1 + options.length) % options.length);
        } else if (event.key === "Enter") {
            // Enter takes the highlighted suggestion, or the typed text when nothing is suggested.
            event.preventDefault();
            add([showOptions ? options[active] : draft]);
        } else if (event.key === ",") {
            // Comma always adds exactly what was typed.
            event.preventDefault();
            add([draft]);
        } else if (event.key === "Escape") {
            setDraft("");
        }
    };

    const onPaste = (event: ClipboardEvent<HTMLInputElement>) => {
        const text = event.clipboardData.getData("text");
        if (!/[,\n]/.test(text)) return;
        event.preventDefault();
        add(text.split(/[,\n]/));
    };

    return (
        <div className="w-full max-w-md min-h-[300px]">
            <label htmlFor={inputId} className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Topics
            </label>
            <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">Press Enter or comma to add. Backspace twice removes the last one.</p>

            <div className="relative mt-2">
                <div
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            event.preventDefault();
                            inputRef.current?.focus();
                        }
                    }}
                    className={`flex min-h-11 w-full cursor-text flex-wrap items-center gap-1.5 rounded-xl border bg-white px-2 py-1.5 transition dark:bg-zinc-900 ${
                        focused
                            ? "border-indigo-400 ring-4 ring-indigo-500/10 dark:border-indigo-400/60 dark:ring-indigo-400/10"
                            : "border-zinc-200 hover:border-zinc-300 dark:border-white/10 dark:hover:border-white/20"
                    }`}
                >
                    <ul className="contents" aria-label="Selected topics">
                        <AnimatePresence initial={false}>
                            {tags.map((tag, index) => (
                                <motion.li
                                    key={tag}
                                    layout={!reduceMotion}
                                    initial={reduceMotion ? {opacity: 0} : {opacity: 0, scale: 0.85}}
                                    animate={{opacity: 1, scale: 1}}
                                    exit={reduceMotion ? {opacity: 0} : {opacity: 0, scale: 0.85}}
                                    transition={{duration: 0.15}}
                                    className={`inline-flex h-7 items-center gap-1 rounded-lg pl-2.5 pr-1 text-xs font-medium ring-1 ring-inset transition-shadow ${colorFor(tag)} ${
                                        armed && index === tags.length - 1 ? "outline outline-2 outline-offset-1 outline-zinc-900 dark:outline-white" : ""
                                    }`}
                                >
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => remove(tag)}
                                        aria-label={`Remove ${tag}`}
                                        className="flex size-5 items-center justify-center rounded-md opacity-60 transition hover:bg-black/5 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current dark:hover:bg-white/10"
                                    >
                                        <LuX className="size-3" aria-hidden/>
                                    </button>
                                </motion.li>
                            ))}
                        </AnimatePresence>
                    </ul>
                    <input
                        ref={inputRef}
                        id={inputId}
                        value={draft}
                        onChange={(event) => {
                            setDraft(event.target.value);
                            setActive(0);
                            setArmed(false);
                            setMessage("");
                        }}
                        onKeyDown={onKeyDown}
                        onPaste={onPaste}
                        onFocus={() => setFocused(true)}
                        onBlur={() => {
                            setFocused(false);
                            setArmed(false);
                        }}
                        placeholder={full ? "" : tags.length ? "Add another" : "Add a topic"}
                        readOnly={full}
                        role="combobox"
                        aria-expanded={showOptions}
                        aria-controls={listId}
                        aria-autocomplete="list"
                        aria-activedescendant={showOptions ? `${listId}-${active}` : undefined}
                        aria-describedby={`${inputId}-status`}
                        className="h-7 min-w-[8rem] flex-1 bg-transparent px-1 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 read-only:cursor-default dark:text-zinc-100 dark:placeholder:text-zinc-500"
                    />
                </div>

                <AnimatePresence>
                    {showOptions && (
                        <motion.ul
                            id={listId}
                            role="listbox"
                            aria-label="Suggested topics"
                            className="absolute inset-x-0 top-full z-20 mt-1.5 rounded-xl border border-zinc-200 bg-white p-1 shadow-xl shadow-zinc-950/10 dark:border-white/10 dark:bg-zinc-900 dark:shadow-black/40"
                            initial={reduceMotion ? {opacity: 0} : {opacity: 0, y: -4}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0}}
                            transition={{duration: 0.12}}
                        >
                            {options.map((option, index) => (
                                <li
                                    key={option}
                                    id={`${listId}-${index}`}
                                    role="option"
                                    aria-selected={index === active}
                                    onMouseDown={(event) => {
                                        event.preventDefault();
                                        add([option]);
                                    }}
                                    onMouseMove={() => setActive(index)}
                                    className={`flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-2 text-sm text-zinc-700 dark:text-zinc-200 ${
                                        index === active ? "bg-zinc-100 dark:bg-white/[0.07]" : ""
                                    }`}
                                >
                                    <LuPlus className="size-3.5 text-zinc-400" aria-hidden/>
                                    {option}
                                </li>
                            ))}
                        </motion.ul>
                    )}
                </AnimatePresence>
            </div>

            <div id={`${inputId}-status`} className="mt-2 flex justify-between text-xs" aria-live="polite">
                <span className="text-amber-600 dark:text-amber-400">{message}</span>
                <span className={`tabular-nums ${full ? "text-zinc-900 dark:text-zinc-100" : "text-zinc-400 dark:text-zinc-500"}`}>
                    {tags.length}/{MAX_TAGS}
                </span>
            </div>
        </div>
    );
};

export default TagInput;
