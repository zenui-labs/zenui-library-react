import {useId, useRef, useState} from "react";
import type {KeyboardEvent} from "react";
import {motion, useReducedMotion} from "framer-motion";
import type {IconType} from "react-icons";
import {LuAlignCenter, LuAlignLeft, LuAlignRight, LuBold, LuItalic, LuStrikethrough, LuUnderline} from "react-icons/lu";

type Mark = "bold" | "italic" | "underline" | "strike";
type Align = "left" | "center" | "right";

const marks: {value: Mark; label: string; icon: IconType; shortcut: string}[] = [
    {value: "bold", label: "Bold", icon: LuBold, shortcut: "B"},
    {value: "italic", label: "Italic", icon: LuItalic, shortcut: "I"},
    {value: "underline", label: "Underline", icon: LuUnderline, shortcut: "U"},
    {value: "strike", label: "Strikethrough", icon: LuStrikethrough, shortcut: "X"},
];

const aligns: {value: Align; label: string; icon: IconType}[] = [
    {value: "left", label: "Align left", icon: LuAlignLeft},
    {value: "center", label: "Align center", icon: LuAlignCenter},
    {value: "right", label: "Align right", icon: LuAlignRight},
];

const markClass: Record<Mark, string> = {bold: "font-semibold", italic: "italic", underline: "underline underline-offset-4", strike: "line-through"};
const alignClass: Record<Align, string> = {left: "text-left", center: "text-center", right: "text-right"};

// Arrow keys move focus between the style buttons, the way a toolbar does. Space or Enter toggles one.
const useArrowFocus = (count: number) => {
    const refs = useRef<(HTMLButtonElement | null)[]>([]);
    const [focusIndex, setFocusIndex] = useState(0);
    const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
        const keys: Record<string, number> = {ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: count - 1};
        if (!(event.key in keys)) return;
        event.preventDefault();
        const next = (keys[event.key] + count) % count;
        setFocusIndex(next);
        refs.current[next]?.focus();
    };
    return {refs, focusIndex, setFocusIndex, onKeyDown};
};

const ToggleGroup = () => {
    const [active, setActive] = useState<Mark[]>(["bold"]);
    const [align, setAlign] = useState<Align>("left");
    const markFocus = useArrowFocus(marks.length);
    const alignRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const reduceMotion = useReducedMotion();
    const id = useId();

    const toggleMark = (mark: Mark) => {
        setActive((list) => (list.includes(mark) ? list.filter((item) => item !== mark) : [...list, mark]));
    };

    const onEditorKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
        if (!(event.metaKey || event.ctrlKey)) return;
        const mark = marks.find((item) => item.shortcut.toLowerCase() === event.key.toLowerCase() && item.value !== "strike");
        if (!mark) return;
        event.preventDefault();
        toggleMark(mark.value);
    };

    const onAlignKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
        const keys: Record<string, number> = {ArrowRight: index + 1, ArrowLeft: index - 1, Home: 0, End: aligns.length - 1};
        if (!(event.key in keys)) return;
        event.preventDefault();
        const next = (keys[event.key] + aligns.length) % aligns.length;
        setAlign(aligns[next].value);
        alignRefs.current[next]?.focus();
    };

    return (
        <div className="w-full max-w-md overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-white/10 dark:bg-zinc-900">
            <div role="toolbar" aria-label="Text formatting" className="flex flex-wrap items-center gap-2 border-b border-zinc-100 bg-zinc-50/70 p-2 dark:border-white/[0.06] dark:bg-white/[0.02]">
                {/* Multiple choice: any number of marks can be on at once. */}
                <div role="group" aria-label="Text style" className="inline-flex gap-0.5 rounded-lg bg-zinc-100 p-0.5 ring-1 ring-inset ring-zinc-200/70 dark:bg-white/[0.04] dark:ring-white/[0.06]">
                    {marks.map((mark, index) => {
                        const on = active.includes(mark.value);
                        const Icon = mark.icon;
                        return (
                            <motion.button
                                key={mark.value}
                                ref={(node) => {
                                    markFocus.refs.current[index] = node;
                                }}
                                type="button"
                                aria-pressed={on}
                                aria-label={mark.label}
                                title={mark.value === "strike" ? mark.label : `${mark.label} (Ctrl or ⌘ ${mark.shortcut})`}
                                tabIndex={index === markFocus.focusIndex ? 0 : -1}
                                onFocus={() => markFocus.setFocusIndex(index)}
                                onClick={() => toggleMark(mark.value)}
                                onKeyDown={(event) => markFocus.onKeyDown(event, index)}
                                whileTap={reduceMotion ? undefined : {scale: 0.92}}
                                className={`flex size-8 items-center justify-center rounded-md outline-none transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500/70 ${
                                    on
                                        ? "bg-white text-zinc-900 shadow-sm ring-1 ring-zinc-950/5 dark:bg-zinc-700 dark:text-white dark:ring-white/10"
                                        : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
                                }`}
                            >
                                <Icon className="size-4" aria-hidden/>
                            </motion.button>
                        );
                    })}
                </div>

                <span className="h-6 w-px bg-zinc-200 dark:bg-white/10" aria-hidden/>

                {/* Single choice: exactly one alignment, with a sliding thumb. */}
                <div role="radiogroup" aria-label="Alignment" className="inline-flex gap-0.5 rounded-lg bg-zinc-100 p-0.5 ring-1 ring-inset ring-zinc-200/70 dark:bg-white/[0.04] dark:ring-white/[0.06]">
                    {aligns.map((item, index) => {
                        const checked = item.value === align;
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.value}
                                ref={(node) => {
                                    alignRefs.current[index] = node;
                                }}
                                type="button"
                                role="radio"
                                aria-checked={checked}
                                aria-label={item.label}
                                title={item.label}
                                tabIndex={checked ? 0 : -1}
                                onClick={() => setAlign(item.value)}
                                onKeyDown={(event) => onAlignKeyDown(event, index)}
                                className={`relative flex size-8 items-center justify-center rounded-md outline-none transition-colors focus-visible:ring-2 focus-visible:ring-indigo-500/70 ${
                                    checked ? "text-zinc-900 dark:text-white" : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
                                }`}
                            >
                                {checked && (
                                    <motion.span
                                        layoutId={`${id}-align`}
                                        className="absolute inset-0 rounded-md bg-white shadow-sm ring-1 ring-zinc-950/5 dark:bg-zinc-700 dark:ring-white/10"
                                        transition={reduceMotion ? {duration: 0} : {type: "spring", stiffness: 520, damping: 40}}
                                    />
                                )}
                                <Icon className="relative size-4" aria-hidden/>
                            </button>
                        );
                    })}
                </div>
            </div>

            <label htmlFor={`${id}-editor`} className="sr-only">
                Announcement text
            </label>
            <textarea
                id={`${id}-editor`}
                rows={4}
                defaultValue="The office is closed on Monday for the public holiday. Support stays online as usual."
                onKeyDown={onEditorKeyDown}
                className={`block w-full resize-none bg-transparent px-5 py-4 text-[15px] leading-7 text-zinc-800 outline-none placeholder:text-zinc-400 dark:text-zinc-100 ${alignClass[align]} ${active
                    .map((mark) => markClass[mark])
                    .join(" ")}`}
            />
            <p className="border-t border-zinc-100 px-5 py-2.5 text-xs text-zinc-500 dark:border-white/[0.06] dark:text-zinc-400" aria-live="polite">
                {active.length ? `${active.length} ${active.length === 1 ? "style" : "styles"} on` : "No styles"}, aligned {align}
            </p>
        </div>
    );
};

export default ToggleGroup;
