import {useEffect, useId, useRef, useState} from "react";
import type {KeyboardEvent, ReactNode} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {
    LuArrowLeft,
    LuCheck,
    LuChevronRight,
    LuCircleDot,
    LuGitBranch,
    LuLink,
    LuSignal,
    LuUser,
} from "react-icons/lu";

type PageId = "root" | "assignee" | "status" | "priority";
type Status = "Backlog" | "Todo" | "In progress" | "In review" | "Done";
type Priority = "Urgent" | "High" | "Medium" | "Low";

interface Issue {
    assignee: string;
    status: Status;
    priority: Priority;
}

interface MenuItem {
    id: string;
    label: string;
    icon: ReactNode;
    detail?: string;
    checked?: boolean;
    opensPage?: boolean;
    onSelect: () => void;
}

const people = ["Maya Chen", "Diego Ramos", "Priya Nair", "Tom Becker"];

const statusColor: Record<Status, string> = {
    "Backlog": "border-zinc-400 border-dashed",
    "Todo": "border-zinc-400",
    "In progress": "border-amber-500 bg-amber-500/20",
    "In review": "border-violet-500 bg-violet-500/20",
    "Done": "border-emerald-500 bg-emerald-500",
};

const priorityBars: Record<Priority, number> = {Urgent: 4, High: 3, Medium: 2, Low: 1};

const pageTitles: Record<PageId, string> = {
    root: "Actions",
    assignee: "Assign to",
    status: "Change status",
    priority: "Set priority",
};

const initials = (name: string) => name.split(" ").map((part) => part[0]).join("");

const StatusIcon = ({status}: {status: Status}) => (
    <span className={`size-3.5 rounded-full border-[1.5px] ${statusColor[status]}`} aria-hidden/>
);

const PriorityIcon = ({priority}: {priority: Priority}) => (
    <span className="flex h-3.5 items-end gap-[2px]" aria-hidden>
        {[1, 2, 3, 4].map((bar) => (
            <span
                key={bar}
                style={{height: `${bar * 25}%`}}
                className={`w-[3px] rounded-sm ${
                    bar <= priorityBars[priority]
                        ? priority === "Urgent" ? "bg-rose-500" : "bg-zinc-700 dark:bg-zinc-200"
                        : "bg-zinc-300 dark:bg-zinc-600"
                }`}
            />
        ))}
    </span>
);

const Avatar = ({name}: {name: string}) => (
    <span className="flex size-5 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 text-[9px] font-semibold text-white" aria-hidden>
        {initials(name)}
    </span>
);

const CommandMenu = () => {
    const [issue, setIssue] = useState<Issue>({assignee: "Priya Nair", status: "In progress", priority: "High"});
    const [pages, setPages] = useState<PageId[]>(["root"]);
    const [query, setQuery] = useState("");
    const [active, setActive] = useState(0);
    const [notice, setNotice] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const listId = useId();
    const reduceMotion = useReducedMotion();
    const page = pages[pages.length - 1];

    useEffect(() => {
        if (!notice) return;
        const timer = window.setTimeout(() => setNotice(""), 2200);
        return () => window.clearTimeout(timer);
    }, [notice]);

    const goTo = (next: PageId) => {
        setPages((stack) => [...stack, next]);
        setQuery("");
        setActive(0);
        inputRef.current?.focus();
    };

    const goBack = () => {
        if (pages.length === 1) return;
        setPages((stack) => stack.slice(0, -1));
        setQuery("");
        setActive(0);
        inputRef.current?.focus();
    };

    const update = (patch: Partial<Issue>, message: string) => {
        setIssue((current) => ({...current, ...patch}));
        setPages(["root"]);
        setQuery("");
        setActive(0);
        setNotice(message);
        inputRef.current?.focus();
    };

    const copy = (text: string, message: string) => {
        navigator.clipboard?.writeText(text).catch(() => undefined);
        setNotice(message);
    };

    const getItems = (): MenuItem[] => {
        if (page === "assignee") {
            return people.map((name) => ({
                id: name,
                label: name,
                icon: <Avatar name={name}/>,
                checked: issue.assignee === name,
                onSelect: () => update({assignee: name}, `Assigned to ${name}`),
            }));
        }
        if (page === "status") {
            return (Object.keys(statusColor) as Status[]).map((status) => ({
                id: status,
                label: status,
                icon: <StatusIcon status={status}/>,
                checked: issue.status === status,
                onSelect: () => update({status}, `Status changed to ${status}`),
            }));
        }
        if (page === "priority") {
            return (Object.keys(priorityBars) as Priority[]).map((priority) => ({
                id: priority,
                label: priority,
                icon: <PriorityIcon priority={priority}/>,
                checked: issue.priority === priority,
                onSelect: () => update({priority}, `Priority set to ${priority}`),
            }));
        }
        return [
            {id: "assignee", label: "Assign to", icon: <LuUser className="size-4"/>, detail: issue.assignee, opensPage: true, onSelect: () => goTo("assignee")},
            {id: "status", label: "Change status", icon: <LuCircleDot className="size-4"/>, detail: issue.status, opensPage: true, onSelect: () => goTo("status")},
            {id: "priority", label: "Set priority", icon: <LuSignal className="size-4"/>, detail: issue.priority, opensPage: true, onSelect: () => goTo("priority")},
            {id: "link", label: "Copy issue link", icon: <LuLink className="size-4"/>, onSelect: () => copy("https://tracker.example.com/issue/ENG-482", "Issue link copied")},
            {id: "branch", label: "Copy git branch name", icon: <LuGitBranch className="size-4"/>, onSelect: () => copy("priya/eng-482-token-refresh-safari", "Branch name copied")},
        ];
    };

    const results = getItems().filter((item) => item.label.toLowerCase().includes(query.trim().toLowerCase()));
    const activeItem = results[Math.min(active, results.length - 1)];

    const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        const count = results.length;
        if (event.key === "ArrowDown" && count) {
            event.preventDefault();
            setActive((index) => (index + 1) % count);
        } else if (event.key === "ArrowUp" && count) {
            event.preventDefault();
            setActive((index) => (index - 1 + count) % count);
        } else if ((event.key === "Enter" || (event.key === "ArrowRight" && activeItem?.opensPage)) && activeItem) {
            event.preventDefault();
            activeItem.onSelect();
        } else if (event.key === "Backspace" && query === "" && pages.length > 1) {
            event.preventDefault();
            goBack();
        } else if (event.key === "Escape") {
            event.preventDefault();
            if (query) setQuery("");
            else goBack();
        }
    };

    return (
        <div className="w-full max-w-md">
            <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-2 px-1 text-xs text-zinc-500 dark:text-zinc-400">
                <span className="font-mono font-medium text-zinc-400 dark:text-zinc-500">ENG-482</span>
                <span className="font-medium text-zinc-800 dark:text-zinc-200">Fix token refresh on Safari</span>
                <span className="ml-auto flex items-center gap-2.5">
                    <span className="flex items-center gap-1.5" title={issue.status}><StatusIcon status={issue.status}/>{issue.status}</span>
                    <span className="flex items-center gap-1.5" title={`${issue.priority} priority`}><PriorityIcon priority={issue.priority}/></span>
                    <span title={`Assigned to ${issue.assignee}`}><Avatar name={issue.assignee}/></span>
                </span>
            </div>

            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl shadow-zinc-950/5 dark:border-white/10 dark:bg-zinc-900 dark:shadow-black/30">
                <div className="flex items-center gap-2 border-b border-zinc-100 px-3 pt-3 dark:border-white/[0.06]">
                    {pages.length > 1 && (
                        <button
                            type="button"
                            onClick={goBack}
                            aria-label="Back"
                            className="flex size-6 items-center justify-center rounded-md text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-zinc-100"
                        >
                            <LuArrowLeft className="size-3.5"/>
                        </button>
                    )}
                    <nav aria-label="Menu path" className="flex items-center gap-1 text-xs">
                        {pages.map((id, index) => (
                            <span key={`${id}-${index}`} className="flex items-center gap-1">
                                {index > 0 && <LuChevronRight className="size-3 text-zinc-300 dark:text-zinc-600" aria-hidden/>}
                                <span
                                    className={`rounded-md px-1.5 py-0.5 ${
                                        index === pages.length - 1
                                            ? "bg-zinc-100 font-medium text-zinc-800 dark:bg-white/10 dark:text-zinc-100"
                                            : "text-zinc-500 dark:text-zinc-400"
                                    }`}
                                >
                                    {pageTitles[id]}
                                </span>
                            </span>
                        ))}
                    </nav>
                </div>
                <input
                    ref={inputRef}
                    value={query}
                    onChange={(event) => {
                        setQuery(event.target.value);
                        setActive(0);
                    }}
                    onKeyDown={onKeyDown}
                    placeholder={page === "root" ? "What do you want to do?" : `${pageTitles[page]}...`}
                    role="combobox"
                    aria-expanded="true"
                    aria-controls={listId}
                    aria-autocomplete="list"
                    aria-label={pageTitles[page]}
                    aria-activedescendant={activeItem ? `${listId}-${activeItem.id}` : undefined}
                    className="h-12 w-full border-b border-zinc-100 bg-transparent px-4 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 dark:border-white/[0.06] dark:text-zinc-100 dark:placeholder:text-zinc-500"
                />

                <AnimatePresence mode="wait" initial={false}>
                    <motion.ul
                        key={page}
                        id={listId}
                        role="listbox"
                        aria-label={pageTitles[page]}
                        className="h-[232px] overflow-y-auto p-1.5"
                        initial={reduceMotion ? {opacity: 0} : {opacity: 0, x: page === "root" ? -12 : 12}}
                        animate={{opacity: 1, x: 0}}
                        exit={{opacity: 0}}
                        transition={{duration: 0.14}}
                    >
                        {results.map((item) => {
                            const selected = item === activeItem;
                            return (
                                <li
                                    key={item.id}
                                    id={`${listId}-${item.id}`}
                                    role="option"
                                    aria-selected={selected}
                                    onMouseMove={() => setActive(results.indexOf(item))}
                                    onClick={item.onSelect}
                                    className={`flex h-10 cursor-pointer select-none items-center gap-3 rounded-lg px-2.5 text-sm transition-colors ${
                                        selected ? "bg-zinc-100 text-zinc-900 dark:bg-white/[0.07] dark:text-white" : "text-zinc-600 dark:text-zinc-300"
                                    }`}
                                >
                                    <span className="flex size-5 items-center justify-center text-zinc-500 dark:text-zinc-400">{item.icon}</span>
                                    <span className="flex-1 truncate">{item.label}</span>
                                    {item.detail && <span className="text-xs text-zinc-400 dark:text-zinc-500">{item.detail}</span>}
                                    {item.opensPage && <LuChevronRight className="size-4 text-zinc-400" aria-hidden/>}
                                    {item.checked && <LuCheck className="size-4 text-indigo-600 dark:text-indigo-400" aria-label="Current"/>}
                                </li>
                            );
                        })}
                        {results.length === 0 && (
                            <li role="presentation" className="px-3 py-10 text-center text-sm text-zinc-500 dark:text-zinc-400">
                                Nothing matches “{query.trim()}”
                            </li>
                        )}
                    </motion.ul>
                </AnimatePresence>

                <div className="flex h-9 items-center justify-between border-t border-zinc-100 px-4 text-xs text-zinc-500 dark:border-white/[0.06] dark:text-zinc-400">
                    <span aria-live="polite" className="font-medium text-emerald-600 dark:text-emerald-400">{notice}</span>
                    <span>{pages.length > 1 ? "Backspace to go back" : "Enter to open"}</span>
                </div>
            </div>
        </div>
    );
};

export default CommandMenu;
