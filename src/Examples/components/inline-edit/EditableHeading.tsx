import {Fragment, useEffect, useState} from "react";
import type {KeyboardEvent} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {LuCheck, LuFileText} from "react-icons/lu";

export interface AutoTextProps {
    /** Accessible name for the field. */
    label: string;
    value: string;
    placeholder: string;
    maxLength: number;
    /** Allows line breaks. Command or Control and Enter then commits. */
    multiline?: boolean;
    /** Text styles, shared by the field and its hidden sizing copy. */
    className?: string;
    onCommit: (value: string) => void;
}

// A textarea that looks like plain text and grows with its content. A hidden copy of the
// text sits in the same grid cell and sets the height, so no measuring code is needed.
export const AutoText = ({label, value, placeholder, maxLength, multiline = false, className = "", onCommit}: AutoTextProps) => {
    const [draft, setDraft] = useState(value);
    const [focused, setFocused] = useState(false);

    useEffect(() => setDraft(value), [value]);

    const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Escape") {
            event.preventDefault();
            setDraft(value);
            // Blur on the next tick so the blur handler sees the restored value.
            const field = event.currentTarget;
            window.setTimeout(() => field.blur(), 0);
        } else if (event.key === "Enter" && (!multiline || event.metaKey || event.ctrlKey)) {
            event.preventDefault();
            event.currentTarget.blur();
        }
    };

    const shared = `col-start-1 row-start-1 whitespace-pre-wrap break-words rounded-lg px-2 py-1 ${className}`;

    return (
        <div className="relative -mx-2">
            <div className="grid">
                <span aria-hidden className={`invisible ${shared}`}>
                    {(draft || placeholder) + " "}
                </span>
                <textarea
                    rows={1}
                    value={draft}
                    maxLength={maxLength}
                    placeholder={placeholder}
                    aria-label={label}
                    onChange={(event) => setDraft(event.target.value.replace(multiline ? /\r/g : /\n/g, ""))}
                    onKeyDown={onKeyDown}
                    onFocus={() => setFocused(true)}
                    onBlur={() => {
                        setFocused(false);
                        const next = draft.trim();
                        if (next && next !== value) onCommit(next);
                        else setDraft(value);
                    }}
                    className={`${shared} resize-none overflow-hidden bg-transparent outline-none transition placeholder:text-zinc-300 hover:bg-zinc-100 focus:bg-white focus:ring-2 focus:ring-indigo-500/50 dark:placeholder:text-zinc-600 dark:hover:bg-white/5 dark:focus:bg-zinc-900`}
                />
            </div>
            {focused && (
                <span className="pointer-events-none absolute -bottom-5 right-2 text-[11px] tabular-nums text-zinc-400 dark:text-zinc-500">
                    {draft.length}/{maxLength}
                </span>
            )}
        </div>
    );
};

export interface HeadingContent {
    title: string;
    summary: string;
}

export interface EditableHeadingProps {
    /** Current title and summary. Pass it with `onChange` to control the heading. */
    value?: HeadingContent;
    defaultValue?: HeadingContent;
    /** Called when the title or summary is committed on blur or Enter. */
    onChange?: (value: HeadingContent) => void;
    /** Path shown above the title, such as a space and a folder. */
    breadcrumbs: string[];
    /** Footer text shown until the first edit in this session. */
    lastEdited: string;
    titlePlaceholder?: string;
    summaryPlaceholder?: string;
    titleMaxLength?: number;
    summaryMaxLength?: number;
    /** Keyboard hint appended to the footer on wider screens. */
    hint?: string;
    className?: string;
}

/** A document title and summary that look like plain text and edit in place. Changes save when a field loses focus. */
export const EditableHeading = ({
    value: valueProp,
    defaultValue = {title: "", summary: ""},
    onChange,
    breadcrumbs,
    lastEdited,
    titlePlaceholder = "Untitled",
    summaryPlaceholder = "Add a short summary",
    titleMaxLength = 80,
    summaryMaxLength = 240,
    hint = "Enter saves the title, Esc discards changes",
    className = "",
}: EditableHeadingProps) => {
    const [innerValue, setInnerValue] = useState<HeadingContent>(defaultValue);
    const content = valueProp ?? innerValue;
    const [editedAt, setEditedAt] = useState<string | null>(null);
    const [flash, setFlash] = useState(false);

    useEffect(() => {
        if (!flash) return;
        const timer = window.setTimeout(() => setFlash(false), 1600);
        return () => window.clearTimeout(timer);
    }, [flash]);

    const commit = (key: keyof HeadingContent) => (text: string) => {
        const next = {...content, [key]: text};
        if (valueProp === undefined) setInnerValue(next);
        onChange?.(next);
        setEditedAt(new Date().toLocaleTimeString("en-US", {hour: "numeric", minute: "2-digit"}));
        setFlash(true);
    };

    return (
        <article className={`w-full max-w-xl rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 dark:border-white/10 dark:bg-zinc-900 ${className}`}>
            <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                <LuFileText className="size-3.5" aria-hidden/>
                {breadcrumbs.map((crumb, index) => (
                    <Fragment key={`${index}-${crumb}`}>
                        {index > 0 && <span aria-hidden>/</span>}
                        <span>{crumb}</span>
                    </Fragment>
                ))}
                <AnimatePresence>
                    {flash && (
                        <motion.span
                            className="ml-auto flex items-center gap-1 font-medium text-emerald-600 dark:text-emerald-400"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            role="status"
                        >
                            <LuCheck className="size-3.5" aria-hidden/>
                            Saved
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>

            <div className="mt-4">
                <AutoText
                    label="Document title"
                    value={content.title}
                    placeholder={titlePlaceholder}
                    maxLength={titleMaxLength}
                    onCommit={commit("title")}
                    className="text-2xl font-semibold leading-tight tracking-tight text-zinc-900 sm:text-[28px] dark:text-white"
                />
            </div>
            <div className="mt-5">
                <AutoText
                    label="Summary"
                    value={content.summary}
                    placeholder={summaryPlaceholder}
                    maxLength={summaryMaxLength}
                    multiline
                    onCommit={commit("summary")}
                    className="text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-300"
                />
            </div>

            <p className="mt-8 border-t border-zinc-100 pt-4 text-xs text-zinc-400 dark:border-white/[0.06] dark:text-zinc-500">
                {editedAt ? `Last edited by you at ${editedAt}` : lastEdited}
                {hint && <span className="hidden sm:inline"> · {hint}</span>}
            </p>
        </article>
    );
};
