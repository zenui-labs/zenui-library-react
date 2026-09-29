import {useId, useRef, useState} from "react";
import type {KeyboardEvent} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {LuCornerDownLeft, LuListFilter, LuSearch, LuX} from "react-icons/lu";

type Field = "status" | "assignee" | "priority" | "label";

interface Token {
    id: number;
    field: Field | "text";
    value: string;
    negate: boolean;
}

interface Issue {
    key: string;
    title: string;
    status: string;
    assignee: string;
    priority: string;
    label: string;
}

type Option = {kind: "field"; field: Field} | {kind: "value"; field: Field; value: string} | {kind: "text"; value: string};

const fields: Record<Field, {hint: string; values: string[]}> = {
    status: {hint: "Workflow state", values: ["backlog", "in-progress", "in-review", "done"]},
    assignee: {hint: "Who owns it", values: ["maya", "diego", "priya", "tom"]},
    priority: {hint: "Urgent to low", values: ["urgent", "high", "medium", "low"]},
    label: {hint: "Issue label", values: ["bug", "feature", "docs", "infra"]},
};

const fieldNames = Object.keys(fields) as Field[];

const issues: Issue[] = [
    {key: "WEB-412", title: "Checkout button overlaps footer on iOS", status: "in-progress", assignee: "maya", priority: "urgent", label: "bug"},
    {key: "WEB-409", title: "Add saved payment methods", status: "backlog", assignee: "diego", priority: "high", label: "feature"},
    {key: "WEB-405", title: "Session expires during long uploads", status: "in-review", assignee: "priya", priority: "high", label: "bug"},
    {key: "WEB-398", title: "Document webhook retries", status: "done", assignee: "tom", priority: "low", label: "docs"},
    {key: "WEB-396", title: "Move image resizing to the edge", status: "in-progress", assignee: "priya", priority: "medium", label: "infra"},
    {key: "WEB-391", title: "Search ignores accented characters", status: "backlog", assignee: "maya", priority: "medium", label: "bug"},
    {key: "WEB-387", title: "Dark mode for email receipts", status: "backlog", assignee: "diego", priority: "low", label: "feature"},
];

const matches = (issue: Issue, token: Token) => {
    const hit = token.field === "text" ? issue.title.toLowerCase().includes(token.value.toLowerCase()) : issue[token.field] === token.value;
    return token.negate ? !hit : hit;
};

let nextId = 3;

const FilterTokens = () => {
    const [tokens, setTokens] = useState<Token[]>([
        {id: 1, field: "status", value: "done", negate: true},
        {id: 2, field: "label", value: "bug", negate: false},
    ]);
    const [draft, setDraft] = useState("");
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const id = useId();
    const reduceMotion = useReducedMotion();

    // "priority:hi" is read as field "priority" with the partial value "hi".
    const [rawField, rawValue] = draft.includes(":") ? [draft.slice(0, draft.indexOf(":")), draft.slice(draft.indexOf(":") + 1)] : [null, draft];
    const typedField = fieldNames.find((field) => field === rawField?.trim().toLowerCase());
    const text = rawValue.trim().toLowerCase();

    const options: Option[] = typedField
        ? fields[typedField].values.filter((value) => value.includes(text)).map((value) => ({kind: "value", field: typedField, value}))
        : [
            ...fieldNames.filter((field) => field.startsWith(text)).map((field): Option => ({kind: "field", field})),
            ...(text ? [{kind: "text", value: draft.trim()} as Option] : []),
        ];
    const showMenu = open && options.length > 0;
    const results = issues.filter((issue) => tokens.every((token) => matches(issue, token)));

    const addToken = (field: Token["field"], value: string) => {
        setTokens((current) => [...current.filter((token) => !(token.field === field && token.value === value)), {id: nextId++, field, value, negate: false}]);
        setDraft("");
        setActive(0);
    };

    const choose = (option: Option) => {
        if (option.kind === "field") {
            setDraft(`${option.field}:`);
            setActive(0);
        } else if (option.kind === "value") addToken(option.field, option.value);
        else addToken("text", option.value);
        inputRef.current?.focus();
    };

    const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "ArrowDown" && showMenu) {
            event.preventDefault();
            setActive((index) => (index + 1) % options.length);
        } else if (event.key === "ArrowUp" && showMenu) {
            event.preventDefault();
            setActive((index) => (index - 1 + options.length) % options.length);
        } else if ((event.key === "Enter" || event.key === "Tab") && showMenu && draft) {
            event.preventDefault();
            choose(options[active]);
        } else if (event.key === "Backspace" && !draft && tokens.length) {
            event.preventDefault();
            const last = tokens[tokens.length - 1];
            setTokens((current) => current.slice(0, -1));
            // Put the removed filter back as text so it can be adjusted.
            setDraft(last.field === "text" ? last.value : `${last.field}:${last.value}`);
        } else if (event.key === "Escape") {
            setOpen(false);
        }
    };

    const toggleNegate = (tokenId: number) =>
        setTokens((current) => current.map((token) => (token.id === tokenId ? {...token, negate: !token.negate} : token)));

    return (
        <div className="w-full max-w-2xl min-h-[420px]">
            <div className="relative">
                <div
                    onMouseDown={(event) => {
                        if (event.target === event.currentTarget) {
                            event.preventDefault();
                            inputRef.current?.focus();
                        }
                    }}
                    className="flex min-h-11 cursor-text flex-wrap items-center gap-1.5 rounded-xl border border-zinc-200 bg-white py-1.5 pl-3 pr-1.5 shadow-sm transition focus-within:border-indigo-400 focus-within:ring-4 focus-within:ring-indigo-500/10 dark:border-white/10 dark:bg-zinc-900 dark:focus-within:border-indigo-400/60"
                >
                    <LuListFilter className="size-4 shrink-0 text-zinc-400" aria-hidden/>
                    <ul className="contents" aria-label="Active filters">
                        <AnimatePresence initial={false}>
                            {tokens.map((token) => (
                                <motion.li
                                    key={token.id}
                                    layout={!reduceMotion}
                                    initial={reduceMotion ? {opacity: 0} : {opacity: 0, scale: 0.9}}
                                    animate={{opacity: 1, scale: 1}}
                                    exit={{opacity: 0, transition: {duration: 0.1}}}
                                    className="inline-flex h-7 items-stretch overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50 text-xs dark:border-white/10 dark:bg-white/[0.04]"
                                >
                                    {token.field === "text" ? (
                                        <span className="flex items-center gap-1 px-2 text-zinc-800 dark:text-zinc-100">
                                            <LuSearch className="size-3 text-zinc-400" aria-hidden/>
                                            {token.negate ? "without" : "contains"} “{token.value}”
                                        </span>
                                    ) : (
                                        <span className="flex items-center px-2 font-medium capitalize text-zinc-500 dark:text-zinc-400">{token.field}</span>
                                    )}
                                    {token.field !== "text" && (
                                        <>
                                            <button
                                                type="button"
                                                onClick={() => toggleNegate(token.id)}
                                                aria-label={`${token.field} ${token.negate ? "is not" : "is"} ${token.value}. Switch to ${token.negate ? "is" : "is not"}`}
                                                className={`border-x border-zinc-200 px-1.5 transition hover:bg-zinc-200/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500/60 dark:border-white/10 dark:hover:bg-white/10 ${
                                                    token.negate ? "text-rose-600 dark:text-rose-400" : "text-zinc-400 dark:text-zinc-500"
                                                }`}
                                            >
                                                {token.negate ? "is not" : "is"}
                                            </button>
                                            <span className="flex items-center px-2 font-medium text-zinc-900 dark:text-zinc-100">{token.value}</span>
                                        </>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => setTokens((current) => current.filter((item) => item.id !== token.id))}
                                        aria-label={`Remove filter ${token.field} ${token.value}`}
                                        className="flex w-6 items-center justify-center border-l border-zinc-200 text-zinc-400 transition hover:bg-zinc-200/70 hover:text-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500/60 dark:border-white/10 dark:hover:bg-white/10 dark:hover:text-zinc-100"
                                    >
                                        <LuX className="size-3" aria-hidden/>
                                    </button>
                                </motion.li>
                            ))}
                        </AnimatePresence>
                    </ul>
                    <input
                        ref={inputRef}
                        value={draft}
                        onChange={(event) => {
                            setDraft(event.target.value);
                            setActive(0);
                            setOpen(true);
                        }}
                        onKeyDown={onKeyDown}
                        onFocus={() => setOpen(true)}
                        onBlur={() => setOpen(false)}
                        placeholder={tokens.length ? "Add filter" : "Filter issues, try priority:"}
                        aria-label="Filter issues"
                        role="combobox"
                        aria-expanded={showMenu}
                        aria-controls={`${id}-list`}
                        aria-autocomplete="list"
                        aria-activedescendant={showMenu ? `${id}-${active}` : undefined}
                        spellCheck={false}
                        className="h-7 min-w-[9rem] flex-1 bg-transparent px-1 font-mono text-[13px] text-zinc-900 outline-none placeholder:font-sans placeholder:text-sm placeholder:text-zinc-400 dark:text-zinc-100 dark:placeholder:text-zinc-500"
                    />
                    {tokens.length > 0 && (
                        <button
                            type="button"
                            onClick={() => {
                                setTokens([]);
                                inputRef.current?.focus();
                            }}
                            className="h-7 rounded-lg px-2 text-xs font-medium text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 dark:text-zinc-400 dark:hover:bg-white/5 dark:hover:text-white"
                        >
                            Clear
                        </button>
                    )}
                </div>

                <AnimatePresence>
                    {showMenu && (
                        <motion.ul
                            id={`${id}-list`}
                            role="listbox"
                            aria-label={typedField ? `Values for ${typedField}` : "Filter fields"}
                            className="absolute left-0 top-full z-20 mt-1.5 w-full max-w-xs rounded-xl border border-zinc-200 bg-white p-1 shadow-xl shadow-zinc-950/10 dark:border-white/10 dark:bg-zinc-900 dark:shadow-black/40"
                            initial={reduceMotion ? {opacity: 0} : {opacity: 0, y: -4}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0}}
                            transition={{duration: 0.12}}
                        >
                            {options.map((option, index) => (
                                <li
                                    key={option.kind === "field" ? option.field : option.kind === "value" ? option.value : "text"}
                                    id={`${id}-${index}`}
                                    role="option"
                                    aria-selected={index === active}
                                    onMouseDown={(event) => {
                                        event.preventDefault();
                                        choose(option);
                                    }}
                                    onMouseMove={() => setActive(index)}
                                    className={`flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-2 text-sm ${index === active ? "bg-zinc-100 dark:bg-white/[0.07]" : ""}`}
                                >
                                    {option.kind === "field" && (
                                        <>
                                            <span className="font-mono text-[13px] text-zinc-900 dark:text-zinc-100">{option.field}:</span>
                                            <span className="text-xs text-zinc-400 dark:text-zinc-500">{fields[option.field].hint}</span>
                                        </>
                                    )}
                                    {option.kind === "value" && (
                                        <span className="font-mono text-[13px] text-zinc-900 dark:text-zinc-100">
                                            <span className="text-zinc-400 dark:text-zinc-500">{option.field}:</span>
                                            {option.value}
                                        </span>
                                    )}
                                    {option.kind === "text" && (
                                        <span className="flex items-center gap-2 text-zinc-700 dark:text-zinc-200">
                                            <LuSearch className="size-3.5 text-zinc-400" aria-hidden/>
                                            Titles containing “{option.value}”
                                        </span>
                                    )}
                                    {index === active && <LuCornerDownLeft className="ml-auto size-3.5 text-zinc-400" aria-hidden/>}
                                </li>
                            ))}
                        </motion.ul>
                    )}
                </AnimatePresence>
            </div>

            <div className="mt-4 overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-white/10 dark:bg-zinc-900">
                <p className="border-b border-zinc-100 px-4 py-2 text-xs text-zinc-500 dark:border-white/[0.06] dark:text-zinc-400" aria-live="polite">
                    {results.length} of {issues.length} issues
                </p>
                <ul className="divide-y divide-zinc-100 dark:divide-white/[0.06]">
                    <AnimatePresence initial={false}>
                        {results.map((issue) => (
                            <motion.li
                                key={issue.key}
                                layout={reduceMotion ? false : "position"}
                                initial={{opacity: 0}}
                                animate={{opacity: 1}}
                                exit={{opacity: 0}}
                                transition={{duration: 0.15}}
                                className="flex items-center gap-3 px-4 py-2.5 text-sm"
                            >
                                <span className="w-16 shrink-0 font-mono text-xs text-zinc-400 dark:text-zinc-500">{issue.key}</span>
                                <span className="min-w-0 flex-1 truncate text-zinc-800 dark:text-zinc-100">{issue.title}</span>
                                <span className="hidden shrink-0 text-xs text-zinc-500 sm:block dark:text-zinc-400">{issue.status}</span>
                            </motion.li>
                        ))}
                    </AnimatePresence>
                    {results.length === 0 && <li className="px-4 py-6 text-center text-sm text-zinc-500 dark:text-zinc-400">No issues match these filters.</li>}
                </ul>
            </div>
        </div>
    );
};

export default FilterTokens;
