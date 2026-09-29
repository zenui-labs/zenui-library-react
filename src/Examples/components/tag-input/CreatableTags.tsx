import {useId, useRef, useState} from "react";
import type {KeyboardEvent} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {LuHash, LuPlus, LuX} from "react-icons/lu";

export interface Tag {
    name: string;
    /** How many published posts already use the tag. */
    posts: number;
}

type Option = {type: "tag"; tag: Tag} | {type: "create"; name: string};

export interface CreatableTagsProps {
    /** Existing tags to suggest, with how often each is used. */
    tags: Tag[];
    /** Selected tag names. Pass it with `onChange` to control the field. */
    value?: string[];
    defaultValue?: string[];
    onChange?: (names: string[]) => void;
    /** Called with the slug when someone creates a tag that is not in `tags`. */
    onCreate?: (name: string) => void;
    maxTags?: number;
    /** How many existing tags the menu lists at once. */
    maxOptions?: number;
    label?: string;
    hint?: string;
    placeholder?: string;
    /** Placeholder once the tag limit is reached. */
    fullPlaceholder?: string;
    className?: string;
}

// Tags are lowercase words joined by hyphens, like most blogging platforms use.
const slugify = (value: string) =>
    value
        .toLowerCase()
        .trim()
        .replace(/^#/, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/[\s-]+/g, "-")
        .replace(/^-|-$/g, "");

/** A tag field that lists popular tags with their post counts and offers to create a tag when nothing matches. */
export const CreatableTags = ({
    tags,
    value,
    defaultValue = [],
    onChange,
    onCreate,
    maxTags = 5,
    maxOptions = 6,
    label = "Post tags",
    hint = "Tags with more posts are easier for readers to find. Spaces become hyphens.",
    placeholder = "Search or create a tag",
    fullPlaceholder = "Tag limit reached",
    className = "",
}: CreatableTagsProps) => {
    const [created, setCreated] = useState<Tag[]>([]);
    const [innerSelected, setInnerSelected] = useState<string[]>(defaultValue);
    const selected = value ?? innerSelected;
    // Created tags stay listed until the parent adds them to `tags`.
    const known = [...tags, ...created.filter((tag) => !tags.some((item) => item.name === tag.name))];
    const [draft, setDraft] = useState("");
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const id = useId();
    const reduceMotion = useReducedMotion();

    const setSelected = (next: string[]) => {
        if (value === undefined) setInnerSelected(next);
        onChange?.(next);
    };

    const slug = slugify(draft);
    const full = selected.length >= maxTags;
    const available = known.filter((tag) => !selected.includes(tag.name));
    // Tags that start with the text come first, then the ones that contain it, most used first.
    const matches = slug
        ? available
            .filter((tag) => tag.name.includes(slug))
            .sort((a, b) => Number(b.name.startsWith(slug)) - Number(a.name.startsWith(slug)) || b.posts - a.posts)
        : [...available].sort((a, b) => b.posts - a.posts);
    const options: Option[] = matches.slice(0, maxOptions).map((tag) => ({type: "tag", tag}));
    if (slug && !known.some((tag) => tag.name === slug)) options.push({type: "create", name: slug});
    const showMenu = open && !full && options.length > 0;

    const choose = (option: Option) => {
        const name = option.type === "tag" ? option.tag.name : option.name;
        if (option.type === "create") {
            setCreated((current) => [...current, {name, posts: 0}]);
            onCreate?.(name);
        }
        if (!selected.includes(name)) setSelected([...selected, name]);
        setDraft("");
        setActive(0);
    };

    const remove = (name: string) => {
        setSelected(selected.filter((item) => item !== name));
        inputRef.current?.focus();
    };

    const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "ArrowDown") {
            event.preventDefault();
            setOpen(true);
            if (showMenu) setActive((index) => (index + 1) % options.length);
        } else if (event.key === "ArrowUp" && showMenu) {
            event.preventDefault();
            setActive((index) => (index - 1 + options.length) % options.length);
        } else if (event.key === "Enter" && showMenu) {
            event.preventDefault();
            choose(options[active]);
        } else if (event.key === "Escape") {
            setOpen(false);
        } else if (event.key === "Backspace" && !draft && selected.length) {
            setSelected(selected.slice(0, -1));
        }
    };

    const postsFor = (name: string) => known.find((tag) => tag.name === name)?.posts ?? 0;

    return (
        <div className={`w-full max-w-md min-h-[380px] ${className}`}>
            <div className="flex items-baseline justify-between">
                <label htmlFor={id} className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {label}
                </label>
                <span className="text-xs tabular-nums text-zinc-400 dark:text-zinc-500">
                    {selected.length} of {maxTags}
                </span>
            </div>

            <div className="relative mt-2">
                <div
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            event.preventDefault();
                            inputRef.current?.focus();
                        }
                    }}
                    className="flex min-h-11 cursor-text flex-wrap items-center gap-1.5 rounded-xl border border-zinc-200 bg-white p-1.5 shadow-sm transition focus-within:border-zinc-400 focus-within:ring-4 focus-within:ring-zinc-900/5 dark:border-white/10 dark:bg-zinc-900 dark:focus-within:border-white/30 dark:focus-within:ring-white/5"
                >
                    <ul className="contents" aria-label="Selected tags">
                        <AnimatePresence initial={false}>
                            {selected.map((name) => (
                                <motion.li
                                    key={name}
                                    layout={!reduceMotion}
                                    initial={reduceMotion ? {opacity: 0} : {opacity: 0, y: 4}}
                                    animate={{opacity: 1, y: 0}}
                                    exit={{opacity: 0, transition: {duration: 0.1}}}
                                    className="inline-flex h-7 items-center rounded-md bg-zinc-900 pl-2 pr-0.5 font-mono text-xs text-white dark:bg-white dark:text-zinc-900"
                                >
                                    <span className="text-zinc-400 dark:text-zinc-500">#</span>
                                    {name}
                                    {postsFor(name) === 0 && (
                                        <span className="ml-1.5 rounded bg-emerald-400/20 px-1 font-sans text-[10px] font-medium text-emerald-300 dark:bg-emerald-500/15 dark:text-emerald-700">New</span>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => remove(name)}
                                        aria-label={`Remove ${name}`}
                                        className="ml-0.5 flex size-6 items-center justify-center rounded text-zinc-400 transition hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 dark:text-zinc-500 dark:hover:bg-zinc-900/10 dark:hover:text-zinc-900"
                                    >
                                        <LuX className="size-3" aria-hidden/>
                                    </button>
                                </motion.li>
                            ))}
                        </AnimatePresence>
                    </ul>
                    <input
                        ref={inputRef}
                        id={id}
                        value={draft}
                        onChange={(event) => {
                            setDraft(event.target.value);
                            setActive(0);
                            setOpen(true);
                        }}
                        onKeyDown={onKeyDown}
                        onFocus={() => setOpen(true)}
                        onBlur={() => setOpen(false)}
                        readOnly={full}
                        placeholder={full ? fullPlaceholder : placeholder}
                        role="combobox"
                        aria-expanded={showMenu}
                        aria-controls={`${id}-list`}
                        aria-autocomplete="list"
                        aria-activedescendant={showMenu ? `${id}-${active}` : undefined}
                        className="h-7 min-w-[9rem] flex-1 bg-transparent px-1.5 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 read-only:cursor-default dark:text-zinc-100 dark:placeholder:text-zinc-500"
                    />
                </div>

                <AnimatePresence>
                    {showMenu && (
                        <motion.div
                            className="absolute inset-x-0 top-full z-20 mt-1.5 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xl shadow-zinc-950/10 dark:border-white/10 dark:bg-zinc-900 dark:shadow-black/40"
                            initial={reduceMotion ? {opacity: 0} : {opacity: 0, y: -4}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0}}
                            transition={{duration: 0.12}}
                        >
                            <p className="px-3 pb-1 pt-2.5 text-[11px] font-medium uppercase tracking-wider text-zinc-400 dark:text-zinc-500" aria-hidden>
                                {slug ? "Matching tags" : "Popular tags"}
                            </p>
                            <ul id={`${id}-list`} role="listbox" aria-label="Tags" className="max-h-60 overflow-y-auto p-1">
                                {options.map((option, index) => {
                                    const isActive = index === active;
                                    const key = option.type === "tag" ? option.tag.name : `create-${option.name}`;
                                    return (
                                        <li
                                            key={key}
                                            id={`${id}-${index}`}
                                            role="option"
                                            aria-selected={isActive}
                                            onMouseDown={(event) => {
                                                event.preventDefault();
                                                choose(option);
                                            }}
                                            onMouseMove={() => setActive(index)}
                                            className={`flex cursor-pointer items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm ${
                                                option.type === "create" ? "mt-1 border-t border-zinc-100 dark:border-white/[0.06]" : ""
                                            } ${isActive ? "bg-zinc-100 dark:bg-white/[0.07]" : ""}`}
                                        >
                                            {option.type === "tag" ? (
                                                <>
                                                    <LuHash className="size-3.5 shrink-0 text-zinc-400" aria-hidden/>
                                                    <span className="min-w-0 flex-1 truncate font-mono text-[13px] text-zinc-800 dark:text-zinc-100">{option.tag.name}</span>
                                                    <span className="shrink-0 text-xs tabular-nums text-zinc-400 dark:text-zinc-500">
                                                        {option.tag.posts === 0 ? "No posts yet" : `${option.tag.posts} posts`}
                                                    </span>
                                                </>
                                            ) : (
                                                <>
                                                    <span className="flex size-5 shrink-0 items-center justify-center rounded-md bg-emerald-500 text-white" aria-hidden>
                                                        <LuPlus className="size-3.5"/>
                                                    </span>
                                                    <span className="text-zinc-600 dark:text-zinc-300">
                                                        Create <span className="font-mono text-[13px] font-medium text-zinc-900 dark:text-white">#{option.name}</span>
                                                    </span>
                                                </>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {hint && <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">{hint}</p>}
        </div>
    );
};
