import {useEffect, useId, useMemo, useRef, useState} from "react";
import type {KeyboardEvent} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import type {IconType} from "react-icons";
import {LuCode, LuHeading1, LuHeading2, LuInfo, LuList, LuListTodo, LuPilcrow, LuQuote, LuSeparatorHorizontal} from "react-icons/lu";

type BlockType = "paragraph" | "h1" | "h2" | "todo" | "bullet" | "quote" | "callout" | "code" | "divider";

interface Block {
    id: number;
    type: BlockType;
    text: string;
    done?: boolean;
}

interface BlockOption {
    type: BlockType;
    label: string;
    description: string;
    icon: IconType;
    hint: string;
    keywords: string;
}

const options: BlockOption[] = [
    {type: "paragraph", label: "Text", description: "Plain paragraph", icon: LuPilcrow, hint: "", keywords: "paragraph body"},
    {type: "h1", label: "Heading 1", description: "Large section title", icon: LuHeading1, hint: "#", keywords: "title h1"},
    {type: "h2", label: "Heading 2", description: "Medium section title", icon: LuHeading2, hint: "##", keywords: "subtitle h2"},
    {type: "todo", label: "To-do list", description: "Track tasks with a checkbox", icon: LuListTodo, hint: "[]", keywords: "task checkbox check"},
    {type: "bullet", label: "Bulleted list", description: "A simple list", icon: LuList, hint: "-", keywords: "unordered points"},
    {type: "quote", label: "Quote", description: "Capture a quote", icon: LuQuote, hint: ">", keywords: "blockquote citation"},
    {type: "callout", label: "Callout", description: "Make a note stand out", icon: LuInfo, hint: "", keywords: "note tip warning"},
    {type: "code", label: "Code", description: "Monospaced snippet", icon: LuCode, hint: "```", keywords: "snippet pre"},
    {type: "divider", label: "Divider", description: "Separate sections", icon: LuSeparatorHorizontal, hint: "---", keywords: "line rule hr"},
];

const placeholders: Record<BlockType, string> = {
    paragraph: "Type / for commands",
    h1: "Heading 1",
    h2: "Heading 2",
    todo: "To-do",
    bullet: "List item",
    quote: "Quote",
    callout: "Write a callout",
    code: "Write some code",
    divider: "",
};

const initialBlocks: Block[] = [
    {id: 1, type: "h1", text: "Launch checklist"},
    {id: 2, type: "paragraph", text: "Everything that needs to happen before the pricing page goes live on Tuesday."},
    {id: 3, type: "todo", text: "Final copy review with legal", done: true},
    {id: 4, type: "todo", text: "Update screenshots in the help center"},
];

const BlockView = ({block, onToggle}: {block: Block; onToggle: () => void}) => {
    switch (block.type) {
        case "h1":
            return <h3 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-white">{block.text}</h3>;
        case "h2":
            return <h4 className="pt-2 text-lg font-semibold text-zinc-900 dark:text-white">{block.text}</h4>;
        case "todo":
            return (
                <label className="flex cursor-pointer items-start gap-2.5 text-[15px] text-zinc-700 dark:text-zinc-300">
                    <input type="checkbox" checked={Boolean(block.done)} onChange={onToggle} className="mt-1 size-4 rounded accent-indigo-600"/>
                    <span className={block.done ? "text-zinc-400 line-through dark:text-zinc-500" : ""}>{block.text}</span>
                </label>
            );
        case "bullet":
            return (
                <p className="flex gap-2.5 text-[15px] text-zinc-700 dark:text-zinc-300">
                    <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-zinc-400" aria-hidden/>
                    {block.text}
                </p>
            );
        case "quote":
            return <blockquote className="border-l-2 border-zinc-900 pl-4 text-[15px] italic text-zinc-700 dark:border-zinc-200 dark:text-zinc-300">{block.text}</blockquote>;
        case "callout":
            return (
                <p className="flex gap-2.5 rounded-lg bg-amber-50 p-3 text-sm text-amber-900 ring-1 ring-inset ring-amber-600/10 dark:bg-amber-400/10 dark:text-amber-100 dark:ring-amber-400/20">
                    <LuInfo className="mt-0.5 size-4 shrink-0" aria-hidden/>
                    {block.text}
                </p>
            );
        case "code":
            return <pre className="overflow-x-auto rounded-lg bg-zinc-950 p-3 font-mono text-[13px] text-zinc-100 dark:bg-black/40">{block.text}</pre>;
        case "divider":
            return <hr className="my-2 border-zinc-200 dark:border-white/10"/>;
        default:
            return <p className="text-[15px] leading-7 text-zinc-700 dark:text-zinc-300">{block.text}</p>;
    }
};

const SlashMenu = () => {
    const [blocks, setBlocks] = useState<Block[]>(initialBlocks);
    const [draft, setDraft] = useState("");
    const [draftType, setDraftType] = useState<BlockType>("paragraph");
    const [active, setActive] = useState(0);
    const [dismissed, setDismissed] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const optionRefs = useRef<(HTMLLIElement | null)[]>([]);
    const nextId = useRef(initialBlocks.length + 1);
    const reduceMotion = useReducedMotion();
    const menuId = useId();

    const slashQuery = draft.startsWith("/") ? draft.slice(1).toLowerCase() : null;
    const menuOpen = slashQuery !== null && !dismissed;

    const filtered = useMemo(() => {
        if (slashQuery === null) return [];
        return options.filter((option) => `${option.label} ${option.keywords}`.toLowerCase().includes(slashQuery.trim()));
    }, [slashQuery]);

    useEffect(() => {
        optionRefs.current[active]?.scrollIntoView({block: "nearest"});
    }, [active]);

    const addBlock = (type: BlockType, text: string) => {
        setBlocks((list) => [...list, {id: nextId.current++, type, text}]);
    };

    const applyOption = (option: BlockOption) => {
        if (option.type === "divider") {
            addBlock("divider", "");
            setDraftType("paragraph");
        } else {
            setDraftType(option.type);
        }
        setDraft("");
        setActive(0);
        inputRef.current?.focus();
    };

    const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (menuOpen) {
            const count = filtered.length;
            if (event.key === "ArrowDown" && count) {
                event.preventDefault();
                setActive((index) => (index + 1) % count);
                return;
            }
            if (event.key === "ArrowUp" && count) {
                event.preventDefault();
                setActive((index) => (index - 1 + count) % count);
                return;
            }
            if ((event.key === "Enter" || event.key === "Tab") && filtered[active]) {
                event.preventDefault();
                applyOption(filtered[active]);
                return;
            }
            if (event.key === "Escape") {
                event.preventDefault();
                setDismissed(true);
                return;
            }
        }

        if (event.key === "Enter" && draft.trim()) {
            event.preventDefault();
            addBlock(draftType, draft.trim());
            setDraft("");
            // Lists continue on the next line, everything else goes back to plain text.
            if (draftType !== "todo" && draftType !== "bullet") setDraftType("paragraph");
        } else if (event.key === "Backspace" && !draft) {
            event.preventDefault();
            if (draftType !== "paragraph") setDraftType("paragraph");
            else setBlocks((list) => list.slice(0, -1));
        }
    };

    const current = options.find((option) => option.type === draftType);

    return (
        <div className="w-full max-w-xl rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-8 dark:border-white/10 dark:bg-zinc-900">
            <p className="mb-4 flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                <span className="rounded-md bg-zinc-100 px-1.5 py-0.5 font-medium dark:bg-white/5">Docs</span>
                <span aria-hidden>/</span>
                Marketing
            </p>

            <div className="space-y-3">
                <AnimatePresence initial={false}>
                    {blocks.map((block) => (
                        <motion.div
                            key={block.id}
                            initial={reduceMotion ? {opacity: 0} : {opacity: 0, y: 6}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0}}
                            transition={{duration: 0.18}}
                        >
                            <BlockView
                                block={block}
                                onToggle={() => setBlocks((list) => list.map((item) => (item.id === block.id ? {...item, done: !item.done} : item)))}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>

                <div className="relative">
                    <div className="flex items-center gap-2">
                        {draftType !== "paragraph" && current && (
                            <span className="flex shrink-0 items-center gap-1 rounded-md bg-indigo-50 px-1.5 py-0.5 text-[11px] font-medium text-indigo-700 dark:bg-indigo-400/10 dark:text-indigo-300">
                                <current.icon className="size-3" aria-hidden/>
                                {current.label}
                            </span>
                        )}
                        <input
                            ref={inputRef}
                            value={draft}
                            onChange={(event) => {
                                setDraft(event.target.value);
                                setActive(0);
                                setDismissed(false);
                            }}
                            onKeyDown={onKeyDown}
                            placeholder={placeholders[draftType]}
                            aria-label="New block"
                            role="combobox"
                            aria-expanded={menuOpen}
                            aria-controls={menuId}
                            aria-autocomplete="list"
                            aria-activedescendant={menuOpen && filtered[active] ? `${menuId}-${filtered[active].type}` : undefined}
                            className={`w-full min-w-0 rounded-md bg-transparent py-1 text-zinc-800 outline-none placeholder:text-zinc-400 dark:text-zinc-100 dark:placeholder:text-zinc-500 ${
                                draftType === "h1" ? "text-2xl font-semibold" : draftType === "h2" ? "text-lg font-semibold" : draftType === "code" ? "font-mono text-[13px]" : "text-[15px]"
                            }`}
                        />
                    </div>

                    <AnimatePresence>
                        {menuOpen && (
                            <motion.div
                                className="absolute left-0 top-full z-20 mt-1 w-full max-w-72 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-xl shadow-zinc-950/10 dark:border-white/10 dark:bg-zinc-900 dark:shadow-black/50"
                                initial={reduceMotion ? {opacity: 0} : {opacity: 0, y: -4, scale: 0.98}}
                                animate={{opacity: 1, y: 0, scale: 1}}
                                exit={{opacity: 0}}
                                transition={{duration: 0.12}}
                                style={{transformOrigin: "top left"}}
                            >
                                <p className="border-b border-zinc-100 px-3 py-2 text-[11px] font-medium uppercase tracking-wider text-zinc-400 dark:border-white/[0.06] dark:text-zinc-500">
                                    Basic blocks
                                </p>
                                <ul id={menuId} role="listbox" aria-label="Block types" className="max-h-64 overflow-y-auto p-1">
                                    {filtered.map((option, index) => {
                                        const Icon = option.icon;
                                        const selected = index === active;
                                        return (
                                            <li
                                                key={option.type}
                                                id={`${menuId}-${option.type}`}
                                                ref={(node) => {
                                                    optionRefs.current[index] = node;
                                                }}
                                                role="option"
                                                aria-selected={selected}
                                                onMouseMove={() => setActive(index)}
                                                onMouseDown={(event) => event.preventDefault()}
                                                onClick={() => applyOption(option)}
                                                className={`flex cursor-pointer items-center gap-3 rounded-lg px-2 py-1.5 ${selected ? "bg-zinc-100 dark:bg-white/[0.06]" : ""}`}
                                            >
                                                <span className="flex size-9 shrink-0 items-center justify-center rounded-md border border-zinc-200 bg-white text-zinc-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-zinc-300" aria-hidden>
                                                    <Icon className="size-4"/>
                                                </span>
                                                <span className="min-w-0 flex-1">
                                                    <span className="block text-sm font-medium text-zinc-900 dark:text-zinc-100">{option.label}</span>
                                                    <span className="block truncate text-xs text-zinc-500 dark:text-zinc-400">{option.description}</span>
                                                </span>
                                                {option.hint && <span className="shrink-0 font-mono text-[11px] text-zinc-400 dark:text-zinc-500">{option.hint}</span>}
                                            </li>
                                        );
                                    })}
                                </ul>
                                {filtered.length === 0 && <p className="px-3 py-4 text-sm text-zinc-500 dark:text-zinc-400">No blocks match “{slashQuery}”</p>}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <p className="mt-8 border-t border-zinc-100 pt-3 text-xs text-zinc-500 dark:border-white/[0.06] dark:text-zinc-400">
                Type / to insert a block. Enter adds the line, Backspace on an empty line removes the last block.
            </p>
        </div>
    );
};

export default SlashMenu;
