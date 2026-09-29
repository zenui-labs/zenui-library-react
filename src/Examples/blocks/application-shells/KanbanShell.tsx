import {useId, useState} from "react";
import type {ComponentType, DragEvent, FormEvent} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {LuCalendar, LuChevronLeft, LuChevronRight, LuLayoutGrid, LuList, LuMessageSquare, LuPlus, LuSearch, LuSettings} from "react-icons/lu";

export type KanbanPriority = "Urgent" | "High" | "Medium" | "Low";

export interface KanbanColumn {
    id: string;
    title: string;
    /** Tailwind background class for the dot before the title. */
    dot: string;
}

export interface KanbanTag {
    label: string;
    /** Tailwind classes for the chip background, text and ring. */
    tone: string;
}

export interface KanbanPerson {
    initials: string;
    /** Tailwind background class for the avatar. */
    color: string;
}

export interface KanbanCard {
    id: string;
    title: string;
    tag: KanbanTag;
    assignee: KanbanPerson;
    due?: string;
    comments: number;
    priority: KanbanPriority;
    /** Id of the column the card sits in. */
    column: string;
}

export interface KanbanRailItem {
    label: string;
    icon: ComponentType<{className?: string}>;
    href?: string;
    active?: boolean;
}

const priorityBars: Record<KanbanPriority, number> = {Urgent: 3, High: 3, Medium: 2, Low: 1};

export interface KanbanShellProps {
    columns: KanbanColumn[];
    /** Cards the board starts with. The board keeps its own copy as people move and add cards. */
    cards: KanbanCard[];
    /** Avatars in the header. */
    members: KanbanPerson[];
    /** Icon links in the left rail. */
    rail: KanbanRailItem[];
    title: string;
    /** Small line above the title, for example "Workspace / Team". */
    breadcrumb?: string;
    /** Builds a card from the title typed into a column. Defaults to a Medium card for the first member. */
    createCard?: (title: string, column: string, cards: KanbanCard[]) => KanbanCard;
    onCardsChange?: (cards: KanbanCard[]) => void;
    /** Letter in the logo tile. */
    appInitial?: string;
    newIssueLabel?: string;
    filterPlaceholder?: string;
    addPlaceholder?: string;
    className?: string;
}

/** A board with an icon rail, drag and drop between columns, move buttons for keyboard users, inline issue creation and a filter. */
export const KanbanShell = ({
    columns,
    cards: initialCards,
    members,
    rail,
    title,
    breadcrumb,
    createCard,
    onCardsChange,
    appInitial = "T",
    newIssueLabel = "New issue",
    filterPlaceholder = "Filter issues",
    addPlaceholder = "What needs to be done?",
    className = "",
}: KanbanShellProps) => {
    const [cards, setCardsState] = useState<KanbanCard[]>(initialCards);
    const [dragId, setDragId] = useState<string | null>(null);
    const [overColumn, setOverColumn] = useState<string | null>(null);
    const [adding, setAdding] = useState<string | null>(null);
    const [draft, setDraft] = useState("");
    const [query, setQuery] = useState("");
    const [announcement, setAnnouncement] = useState("");
    const uid = useId().replace(/:/g, "");
    const filterId = `kanban-shell-filter-${uid}`;
    const colId = (id: string) => `kanban-col-${id}-${uid}`;
    const addId = (id: string) => `kanban-add-${id}-${uid}`;

    const setCards = (next: KanbanCard[]) => {
        setCardsState(next);
        onCardsChange?.(next);
    };

    const move = (id: string, to: string) => {
        setCards(cards.map((c) => (c.id === id ? {...c, column: to} : c)));
        const columnTitle = columns.find((c) => c.id === to)?.title ?? to;
        setAnnouncement(`${id} moved to ${columnTitle}`);
    };

    const shift = (card: KanbanCard, direction: 1 | -1) => {
        const index = columns.findIndex((c) => c.id === card.column);
        const target = columns[index + direction];
        if (target) move(card.id, target.id);
    };

    const onDrop = (event: DragEvent<HTMLElement>, to: string) => {
        event.preventDefault();
        const id = event.dataTransfer.getData("text/plain") || dragId;
        if (id) move(id, to);
        setDragId(null);
        setOverColumn(null);
    };

    const addCard = (event: FormEvent<HTMLFormElement>, column: string) => {
        event.preventDefault();
        const text = draft.trim();
        if (!text) return;
        const card = createCard
            ? createCard(text, column, cards)
            : {id: `NEW-${cards.length + 1}`, title: text, tag: {label: "New", tone: "bg-zinc-50 text-zinc-700 ring-zinc-200 dark:bg-zinc-500/10 dark:text-zinc-300 dark:ring-zinc-500/30"},
                assignee: members[0] ?? {initials: "?", color: "bg-zinc-400"}, comments: 0, priority: "Medium" as const, column};
        setCards([...cards, card]);
        setDraft("");
        setAdding(null);
    };

    const q = query.trim().toLowerCase();
    const visible = cards.filter((c) => !q || c.title.toLowerCase().includes(q) || c.id.toLowerCase().includes(q));

    return (
        <div className={`flex h-[720px] w-full overflow-hidden bg-zinc-100 text-zinc-900 dark:bg-zinc-950 dark:text-white ${className}`}>
            <nav aria-label="Workspace" className="hidden w-16 shrink-0 flex-col items-center gap-2 border-r border-zinc-200 bg-white py-4 sm:flex dark:border-zinc-800 dark:bg-zinc-900">
                <span className="mb-3 flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-sm font-bold text-white">{appInitial}</span>
                {rail.map((item) => (
                    <a key={item.label} href={item.href ?? "#"} aria-label={item.label} title={item.label} aria-current={item.active ? "page" : undefined}
                       className={`flex h-10 w-10 items-center justify-center rounded-xl outline-none transition-colors focus-visible:ring-2 focus-visible:ring-violet-500 ${item.active
                           ? "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300"
                           : "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"}`}>
                        <item.icon className="h-5 w-5"/>
                    </a>
                ))}
                <a href="#" aria-label="Settings" title="Settings" className="mt-auto flex h-10 w-10 items-center justify-center rounded-xl text-zinc-500 outline-none hover:bg-zinc-100 focus-visible:ring-2 focus-visible:ring-violet-500 dark:text-zinc-400 dark:hover:bg-zinc-800">
                    <LuSettings className="h-5 w-5"/>
                </a>
            </nav>

            <div className="flex min-w-0 flex-1 flex-col">
                <header className="shrink-0 border-b border-zinc-200 bg-white px-4 py-3 sm:px-6 dark:border-zinc-800 dark:bg-zinc-900">
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="min-w-0 flex-1">
                            {breadcrumb && <p className="text-xs text-zinc-500 dark:text-zinc-400">{breadcrumb}</p>}
                            <h1 className="truncate text-lg font-semibold">{title}</h1>
                        </div>
                        <div className="flex -space-x-2" aria-label={`${members.length} members`} role="img">
                            {members.map((p) => (
                                <span key={p.initials} className={`flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-semibold text-white ring-2 ring-white dark:ring-zinc-900 ${p.color}`}>{p.initials}</span>
                            ))}
                        </div>
                        <button type="button" onClick={() => { setAdding(columns[0]?.id ?? null); setDraft(""); }}
                                className="inline-flex items-center gap-1.5 rounded-lg bg-zinc-900 px-3 py-2 text-sm font-semibold text-white outline-none hover:bg-zinc-700 focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 dark:focus-visible:ring-offset-zinc-900">
                            <LuPlus className="h-4 w-4" aria-hidden="true"/> {newIssueLabel}
                        </button>
                    </div>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                        <div className="relative">
                            <label htmlFor={filterId} className="sr-only">{filterPlaceholder}</label>
                            <LuSearch className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" aria-hidden="true"/>
                            <input id={filterId} type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={filterPlaceholder}
                                   className="w-44 rounded-lg border border-zinc-200 bg-zinc-50 py-1.5 pl-8 pr-2 text-sm placeholder:text-zinc-400 focus:border-violet-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-violet-500/10 dark:border-zinc-800 dark:bg-zinc-950"/>
                        </div>
                        <div className="ml-auto flex rounded-lg border border-zinc-200 p-0.5 dark:border-zinc-800" role="group" aria-label="View">
                            <button type="button" aria-pressed="true" className="flex items-center gap-1.5 rounded-md bg-zinc-100 px-2.5 py-1 text-xs font-medium outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:bg-zinc-800">
                                <LuLayoutGrid className="h-3.5 w-3.5" aria-hidden="true"/> Board
                            </button>
                            <button type="button" aria-pressed="false" className="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium text-zinc-500 outline-none hover:text-zinc-900 focus-visible:ring-2 focus-visible:ring-violet-500 dark:text-zinc-400 dark:hover:text-white">
                                <LuList className="h-3.5 w-3.5" aria-hidden="true"/> List
                            </button>
                        </div>
                    </div>
                </header>

                <p className="sr-only" aria-live="polite">{announcement}</p>

                <div className="flex flex-1 snap-x gap-4 overflow-x-auto p-4 sm:p-6">
                    {columns.map((col, colIndex) => {
                        const items = visible.filter((c) => c.column === col.id);
                        const isOver = overColumn === col.id && dragId !== null;
                        return (
                            <section key={col.id} aria-labelledby={colId(col.id)}
                                     onDragOver={(e) => { e.preventDefault(); setOverColumn(col.id); }}
                                     onDragLeave={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOverColumn(null); }}
                                     onDrop={(e) => onDrop(e, col.id)}
                                     className={`flex w-[272px] shrink-0 snap-start flex-col rounded-2xl p-2 transition-colors ${isOver
                                         ? "bg-violet-100/70 ring-2 ring-inset ring-violet-400 dark:bg-violet-500/10"
                                         : "bg-zinc-200/50 dark:bg-zinc-900/60"}`}>
                                <div className="flex items-center gap-2 px-2 py-1.5">
                                    <span className={`h-2 w-2 rounded-full ${col.dot}`} aria-hidden="true"/>
                                    <h2 id={colId(col.id)} className="text-sm font-semibold">{col.title}</h2>
                                    <span className="rounded-full bg-white px-1.5 text-xs tabular-nums text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">{items.length}</span>
                                    <button type="button" onClick={() => { setAdding(col.id); setDraft(""); }} aria-label={`Add issue to ${col.title}`}
                                            className="ml-auto flex h-7 w-7 items-center justify-center rounded-md text-zinc-500 outline-none hover:bg-white focus-visible:ring-2 focus-visible:ring-violet-500 dark:hover:bg-zinc-800">
                                        <LuPlus className="h-4 w-4"/>
                                    </button>
                                </div>

                                <ul className="mt-1 flex-1 space-y-2 overflow-y-auto px-0.5 pb-1">
                                    <AnimatePresence initial={false}>
                                        {items.map((card) => (
                                            <motion.li key={card.id} layout initial={{opacity: 0, scale: 0.96}} animate={{opacity: 1, scale: 1}} exit={{opacity: 0, scale: 0.96}}
                                                       transition={{type: "spring", stiffness: 500, damping: 40}}>
                                                <div draggable
                                                     onDragStart={(e) => { e.dataTransfer.setData("text/plain", card.id); e.dataTransfer.effectAllowed = "move"; setDragId(card.id); }}
                                                     onDragEnd={() => { setDragId(null); setOverColumn(null); }}
                                                     className={`group relative cursor-grab rounded-xl border border-zinc-200 bg-white p-3 shadow-sm transition-shadow focus-within:ring-2 focus-within:ring-violet-500 hover:shadow-md active:cursor-grabbing dark:border-zinc-800 dark:bg-zinc-900 ${dragId === card.id ? "opacity-40" : ""}`}>
                                                    <div className="flex items-center justify-between">
                                                        <span className="font-mono text-[11px] text-zinc-400">{card.id}</span>
                                                        <span className="flex items-end gap-0.5" role="img" aria-label={`${card.priority} priority`}>
                                                            {[1, 2, 3].map((bar) => (
                                                                <span key={bar} className={`w-1 rounded-sm ${bar === 1 ? "h-1.5" : bar === 2 ? "h-2.5" : "h-3.5"} ${bar <= priorityBars[card.priority]
                                                                    ? card.priority === "Urgent" ? "bg-rose-500" : "bg-zinc-600 dark:bg-zinc-300"
                                                                    : "bg-zinc-200 dark:bg-zinc-700"}`}/>
                                                            ))}
                                                        </span>
                                                    </div>
                                                    <h3 className="mt-1.5 text-sm font-medium leading-snug">
                                                        <a href="#" className="outline-none">{card.title}</a>
                                                    </h3>
                                                    <div className="mt-3 flex items-center gap-2">
                                                        <span className={`rounded-md px-1.5 py-0.5 text-[11px] font-medium ring-1 ring-inset ${card.tag.tone}`}>{card.tag.label}</span>
                                                        {card.due && (
                                                            <span className="flex items-center gap-1 text-[11px] text-zinc-500 dark:text-zinc-400"><LuCalendar className="h-3 w-3" aria-hidden="true"/>{card.due}</span>
                                                        )}
                                                        {card.comments > 0 && (
                                                            <span className="flex items-center gap-1 text-[11px] text-zinc-500 dark:text-zinc-400"><LuMessageSquare className="h-3 w-3" aria-hidden="true"/>{card.comments}<span className="sr-only"> comments</span></span>
                                                        )}
                                                        <span className={`ml-auto flex h-6 w-6 items-center justify-center rounded-full text-[9px] font-semibold text-white ${card.assignee.color}`}>{card.assignee.initials}</span>
                                                    </div>
                                                    <div className="absolute -top-2 right-2 flex gap-0.5 rounded-lg border border-zinc-200 bg-white p-0.5 opacity-0 shadow-sm transition-opacity focus-within:opacity-100 group-hover:opacity-100 dark:border-zinc-700 dark:bg-zinc-800">
                                                        <button type="button" onClick={() => shift(card, -1)} disabled={colIndex === 0} aria-label={`Move ${card.id} to ${columns[colIndex - 1]?.title ?? "previous column"}`}
                                                                className="flex h-6 w-6 items-center justify-center rounded-md text-zinc-500 outline-none hover:bg-zinc-100 focus-visible:ring-2 focus-visible:ring-violet-500 disabled:opacity-30 dark:hover:bg-zinc-700">
                                                            <LuChevronLeft className="h-3.5 w-3.5"/>
                                                        </button>
                                                        <button type="button" onClick={() => shift(card, 1)} disabled={colIndex === columns.length - 1} aria-label={`Move ${card.id} to ${columns[colIndex + 1]?.title ?? "next column"}`}
                                                                className="flex h-6 w-6 items-center justify-center rounded-md text-zinc-500 outline-none hover:bg-zinc-100 focus-visible:ring-2 focus-visible:ring-violet-500 disabled:opacity-30 dark:hover:bg-zinc-700">
                                                            <LuChevronRight className="h-3.5 w-3.5"/>
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.li>
                                        ))}
                                    </AnimatePresence>
                                    {items.length === 0 && adding !== col.id && (
                                        <li className="rounded-xl border-2 border-dashed border-zinc-300 px-3 py-6 text-center text-xs text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
                                            {q ? "No matching issues" : "Drop an issue here"}
                                        </li>
                                    )}
                                </ul>

                                {adding === col.id && (
                                    <form onSubmit={(e) => addCard(e, col.id)} className="mt-1 rounded-xl border border-violet-300 bg-white p-2 shadow-sm dark:border-violet-500/50 dark:bg-zinc-900">
                                        <label htmlFor={addId(col.id)} className="sr-only">Issue title</label>
                                        <textarea id={addId(col.id)} rows={2} autoFocus value={draft} onChange={(e) => setDraft(e.target.value)}
                                                  onKeyDown={(e) => {
                                                      if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); e.currentTarget.form?.requestSubmit(); }
                                                      if (e.key === "Escape") setAdding(null);
                                                  }}
                                                  placeholder={addPlaceholder}
                                                  className="block w-full resize-none bg-transparent px-1 text-sm placeholder:text-zinc-400 focus:outline-none"/>
                                        <div className="mt-2 flex justify-end gap-1">
                                            <button type="button" onClick={() => setAdding(null)} className="rounded-md px-2 py-1 text-xs font-medium text-zinc-500 outline-none hover:bg-zinc-100 focus-visible:ring-2 focus-visible:ring-violet-500 dark:hover:bg-zinc-800">Cancel</button>
                                            <button type="submit" disabled={!draft.trim()} className="rounded-md bg-violet-600 px-2.5 py-1 text-xs font-semibold text-white outline-none hover:bg-violet-700 focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-1 disabled:opacity-40">Add issue</button>
                                        </div>
                                    </form>
                                )}
                            </section>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

