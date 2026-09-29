import {useEffect, useId, useMemo, useRef, useState} from "react";
import type {FormEvent, KeyboardEvent, ReactNode} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {
    LuArchive,
    LuArrowLeft,
    LuFile,
    LuInbox,
    LuMail,
    LuPaperclip,
    LuPencil,
    LuReply,
    LuSearch,
    LuSend,
    LuStar,
    LuTrash2,
} from "react-icons/lu";

export type MailFolder = "Inbox" | "Starred" | "Sent" | "Drafts" | "Archive";

export interface MailLabel {
    name: string;
    /** Tailwind background class for the dot, for example "bg-violet-500". */
    color: string;
}

export interface MailAttachment {
    name: string;
    /** File size as shown, for example "2.4 MB". */
    size: string;
    href?: string;
}

export interface MailMessage {
    id: number;
    from: string;
    email: string;
    subject: string;
    /** One or two lines shown in the list. */
    preview: string;
    /** Paragraphs of the message. */
    body: string[];
    time: string;
    unread: boolean;
    starred: boolean;
    /** Where the message lives. Starred is a view across folders, not a place. */
    folder: Exclude<MailFolder, "Starred">;
    label?: MailLabel;
    attachment?: MailAttachment;
}

const folderIcons: Record<MailFolder, ReactNode> = {
    Inbox: <LuInbox className="h-4 w-4"/>,
    Starred: <LuStar className="h-4 w-4"/>,
    Sent: <LuSend className="h-4 w-4"/>,
    Drafts: <LuFile className="h-4 w-4"/>,
    Archive: <LuArchive className="h-4 w-4"/>,
};
const folders: MailFolder[] = ["Inbox", "Starred", "Sent", "Drafts", "Archive"];

const inFolder = (m: MailMessage, folder: MailFolder) => (folder === "Starred" ? m.starred && m.folder !== "Archive" : m.folder === folder);
const initials = (name: string) => name.split(" ").map((p) => p[0]).join("").slice(0, 2);

// Short type badge from the file extension, for example "PDF".
const fileType = (name: string) => (name.includes(".") ? name.split(".").pop() ?? "" : "FILE").toUpperCase().slice(0, 4);

export interface MailShellProps {
    messages: MailMessage[];
    /** Labels listed in the sidebar. */
    labels: MailLabel[];
    /** Name of the mailbox owner, shown on the To line. */
    userName: string;
    defaultFolder?: MailFolder;
    /** Message open at start. Defaults to the first message in the starting folder. */
    defaultSelectedId?: number | null;
    onCompose?: () => void;
    onReply?: (message: MailMessage, text: string) => void;
    onArchive?: (message: MailMessage) => void;
    onDelete?: (message: MailMessage) => void;
    appName?: string;
    searchPlaceholder?: string;
    className?: string;
}

/** Folders, a searchable message list and a reading pane. On small screens the list and the message become separate views. */
export const MailShell = ({
    messages: initialMessages,
    labels,
    userName,
    defaultFolder = "Inbox",
    defaultSelectedId,
    onCompose,
    onReply,
    onArchive,
    onDelete,
    appName = "Northwind Mail",
    searchPlaceholder = "Search mail",
    className = "",
}: MailShellProps) => {
    const [messages, setMessages] = useState<MailMessage[]>(initialMessages);
    const [folder, setFolder] = useState<MailFolder>(defaultFolder);
    const [selectedId, setSelectedId] = useState<number | null>(
        defaultSelectedId !== undefined ? defaultSelectedId : initialMessages.find((m) => inFolder(m, defaultFolder))?.id ?? null,
    );
    const [query, setQuery] = useState("");
    const [reply, setReply] = useState("");
    const [toast, setToast] = useState<string | null>(null);
    const [mobileReading, setMobileReading] = useState(false);
    const rowRefs = useRef<Map<number, HTMLButtonElement>>(new Map());
    const uid = useId().replace(/:/g, "");
    const searchId = `mail-shell-search-${uid}`;
    const replyId = `mail-shell-reply-${uid}`;

    useEffect(() => {
        if (!toast) return;
        const id = window.setTimeout(() => setToast(null), 2400);
        return () => window.clearTimeout(id);
    }, [toast]);

    const list = useMemo(() => {
        const q = query.trim().toLowerCase();
        return messages.filter((m) => inFolder(m, folder) && (q === "" || `${m.from} ${m.subject} ${m.preview}`.toLowerCase().includes(q)));
    }, [messages, folder, query]);

    const selected = messages.find((m) => m.id === selectedId && inFolder(m, folder)) ?? null;
    const unreadCount = messages.filter((m) => m.folder === "Inbox" && m.unread).length;

    const open = (id: number) => {
        setSelectedId(id);
        setMobileReading(true);
        setMessages((prev) => prev.map((m) => (m.id === id ? {...m, unread: false} : m)));
    };

    const update = (id: number, patch: Partial<MailMessage>) => setMessages((prev) => prev.map((m) => (m.id === id ? {...m, ...patch} : m)));

    // Archive or delete, then select the next message so the reader keeps its place.
    const moveOut = (id: number, action: "archive" | "delete") => {
        const index = list.findIndex((m) => m.id === id);
        const next = list[index + 1] ?? list[index - 1];
        const message = messages.find((m) => m.id === id);
        if (message && action === "archive") onArchive?.(message);
        if (message && action === "delete") onDelete?.(message);
        if (action === "archive") update(id, {folder: "Archive"});
        else setMessages((prev) => prev.filter((m) => m.id !== id));
        setSelectedId(next ? next.id : null);
        if (!next) setMobileReading(false);
        setToast(action === "archive" ? "Conversation archived" : "Conversation deleted");
    };

    const onListKey = (event: KeyboardEvent<HTMLUListElement>) => {
        if (event.key !== "ArrowDown" && event.key !== "ArrowUp") return;
        event.preventDefault();
        const index = list.findIndex((m) => m.id === selectedId);
        const next = list[event.key === "ArrowDown" ? Math.min(list.length - 1, index + 1) : Math.max(0, index - 1)];
        if (!next) return;
        setSelectedId(next.id);
        update(next.id, {unread: false});
        rowRefs.current.get(next.id)?.focus();
    };

    const sendReply = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!reply.trim() || !selected) return;
        onReply?.(selected, reply);
        setReply("");
        setToast(`Reply sent to ${selected.from}`);
    };

    const pickFolder = (f: MailFolder) => {
        setFolder(f);
        setMobileReading(false);
        const first = messages.find((m) => inFolder(m, f));
        setSelectedId(first ? first.id : null);
    };

    return (
        <div className={`relative flex h-[720px] w-full overflow-hidden bg-white text-slate-900 dark:bg-slate-950 dark:text-white ${className}`}>
            {/* Folders */}
            <aside className="hidden w-56 shrink-0 flex-col border-r border-slate-200 bg-slate-50 p-3 lg:flex dark:border-slate-800 dark:bg-slate-900/50">
                <div className="flex items-center gap-2 px-2 py-1.5 text-sm font-semibold">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white"><LuMail className="h-4 w-4" aria-hidden="true"/></span>
                    {appName}
                </div>
                <button type="button" onClick={onCompose}
                        className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm outline-none hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900">
                    <LuPencil className="h-4 w-4" aria-hidden="true"/> Compose
                </button>
                <nav aria-label="Mail folders" className="mt-4">
                    <ul className="space-y-0.5">
                        {folders.map((f) => (
                            <li key={f}>
                                <button type="button" onClick={() => pickFolder(f)} aria-current={folder === f ? "page" : undefined}
                                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 ${folder === f
                                            ? "bg-blue-100 font-medium text-blue-900 dark:bg-blue-500/15 dark:text-blue-200"
                                            : "text-slate-600 hover:bg-slate-200/60 dark:text-slate-400 dark:hover:bg-slate-800"}`}>
                                    <span aria-hidden="true">{folderIcons[f]}</span>
                                    <span className="flex-1 text-left">{f}</span>
                                    {f === "Inbox" && unreadCount > 0 && <span className="text-xs font-semibold tabular-nums">{unreadCount}</span>}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
                <p className="mt-6 px-3 text-xs font-medium uppercase tracking-wider text-slate-400">Labels</p>
                <ul className="mt-2 space-y-1 px-3 text-sm text-slate-600 dark:text-slate-400">
                    {labels.map((l) => (
                        <li key={l.name} className="flex items-center gap-2.5 py-1"><span className={`h-2 w-2 rounded-full ${l.color}`} aria-hidden="true"/>{l.name}</li>
                    ))}
                </ul>
            </aside>

            {/* Message list */}
            <section aria-label={`${folder} messages`}
                     className={`w-full shrink-0 flex-col border-r border-slate-200 md:flex md:w-80 dark:border-slate-800 ${mobileReading ? "hidden" : "flex"}`}>
                <div className="border-b border-slate-200 p-3 dark:border-slate-800">
                    <div className="flex items-center justify-between">
                        <h1 className="px-1 text-lg font-semibold">{folder}</h1>
                        <label className="lg:hidden">
                            <span className="sr-only">Folder</span>
                            <select value={folder} onChange={(e) => pickFolder(e.target.value as MailFolder)}
                                    className="rounded-md border border-slate-200 bg-white px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-slate-700 dark:bg-slate-900">
                                {folders.map((f) => <option key={f} value={f}>{f}</option>)}
                            </select>
                        </label>
                    </div>
                    <div className="relative mt-3">
                        <label htmlFor={searchId} className="sr-only">{searchPlaceholder}</label>
                        <LuSearch className="pointer-events-none absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true"/>
                        <input id={searchId} type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder={searchPlaceholder}
                               className="w-full rounded-lg border border-slate-200 bg-slate-50 py-1.5 pl-8 pr-2 text-sm placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/10 dark:border-slate-800 dark:bg-slate-900 dark:focus:bg-slate-900"/>
                    </div>
                </div>
                <ul onKeyDown={onListKey} className="flex-1 overflow-y-auto">
                    <AnimatePresence initial={false}>
                        {list.map((m) => {
                            const current = m.id === selected?.id;
                            return (
                                <motion.li key={m.id} layout exit={{opacity: 0, x: -40, height: 0}} transition={{duration: 0.2}} className="overflow-hidden">
                                    <button type="button" ref={(el) => { if (el) rowRefs.current.set(m.id, el); else rowRefs.current.delete(m.id); }}
                                            onClick={() => open(m.id)} aria-current={current ? "true" : undefined}
                                            className={`relative w-full border-b border-slate-100 px-4 py-3 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500 dark:border-slate-900 ${current
                                                ? "bg-blue-50 dark:bg-blue-500/10"
                                                : "hover:bg-slate-50 dark:hover:bg-slate-900"}`}>
                                        {current && <span className="absolute inset-y-0 left-0 w-0.5 bg-blue-600" aria-hidden="true"/>}
                                        <span className="flex items-center gap-2">
                                            {m.unread && <span className="h-2 w-2 shrink-0 rounded-full bg-blue-600"><span className="sr-only">Unread</span></span>}
                                            <span className={`min-w-0 flex-1 truncate text-sm ${m.unread ? "font-semibold" : "font-medium text-slate-700 dark:text-slate-300"}`}>{m.from}</span>
                                            <span className="shrink-0 text-xs text-slate-400">{m.time}</span>
                                        </span>
                                        <span className={`mt-0.5 block truncate text-sm ${m.unread ? "font-medium" : "text-slate-700 dark:text-slate-300"}`}>{m.subject}</span>
                                        <span className="mt-0.5 line-clamp-2 block text-xs leading-relaxed text-slate-500 dark:text-slate-400">{m.preview}</span>
                                        <span className="mt-1.5 flex items-center gap-2">
                                            {m.label && (
                                                <span className="inline-flex items-center gap-1 rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                                                    <span className={`h-1.5 w-1.5 rounded-full ${m.label.color}`} aria-hidden="true"/>{m.label.name}
                                                </span>
                                            )}
                                            {m.attachment && <LuPaperclip className="h-3 w-3 text-slate-400" role="img" aria-label="Has attachment"/>}
                                            {m.starred && <LuStar className="ml-auto h-3.5 w-3.5 fill-amber-400 text-amber-400" role="img" aria-label="Starred"/>}
                                        </span>
                                    </button>
                                </motion.li>
                            );
                        })}
                    </AnimatePresence>
                    {list.length === 0 && (
                        <li className="flex flex-col items-center px-6 py-16 text-center">
                            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400 dark:bg-slate-900"><LuInbox className="h-5 w-5" aria-hidden="true"/></span>
                            <p className="mt-3 text-sm font-medium">{query ? "No messages match your search" : `Nothing in ${folder}`}</p>
                            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{query ? "Try a name or a subject." : "Messages you move here will show up in this list."}</p>
                        </li>
                    )}
                </ul>
            </section>

            {/* Reading pane */}
            <section aria-label="Message" className={`min-w-0 flex-1 flex-col md:flex ${mobileReading ? "flex" : "hidden"}`}>
                {selected ? (
                    <>
                        <div className="flex h-14 shrink-0 items-center gap-1 border-b border-slate-200 px-2 sm:px-4 dark:border-slate-800">
                            <button type="button" onClick={() => setMobileReading(false)} aria-label="Back to list"
                                    className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 outline-none hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-blue-500 md:hidden dark:text-slate-300 dark:hover:bg-slate-800">
                                <LuArrowLeft className="h-5 w-5"/>
                            </button>
                            {[
                                {label: "Archive", icon: <LuArchive className="h-4 w-4"/>, onClick: () => moveOut(selected.id, "archive"), hidden: selected.folder === "Archive"},
                                {label: "Delete", icon: <LuTrash2 className="h-4 w-4"/>, onClick: () => moveOut(selected.id, "delete"), hidden: false},
                                {label: "Mark as unread", icon: <LuMail className="h-4 w-4"/>, onClick: () => update(selected.id, {unread: true}), hidden: false},
                            ].filter((a) => !a.hidden).map((a) => (
                                <button key={a.label} type="button" onClick={a.onClick} aria-label={a.label} title={a.label}
                                        className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 outline-none hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-slate-300 dark:hover:bg-slate-800">
                                    {a.icon}
                                </button>
                            ))}
                            <button type="button" onClick={() => update(selected.id, {starred: !selected.starred})} aria-pressed={selected.starred}
                                    aria-label={selected.starred ? "Remove star" : "Star conversation"}
                                    className="ml-auto flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 outline-none hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-blue-500 dark:text-slate-300 dark:hover:bg-slate-800">
                                <LuStar className={`h-4 w-4 ${selected.starred ? "fill-amber-400 text-amber-400" : ""}`}/>
                            </button>
                        </div>
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.article key={selected.id} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 0.12}}
                                            className="flex-1 overflow-y-auto px-4 py-6 sm:px-8">
                                <h2 className="text-xl font-semibold tracking-tight">{selected.subject}</h2>
                                <div className="mt-5 flex items-start gap-3">
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-semibold text-white">{initials(selected.from)}</span>
                                    <div className="min-w-0 flex-1 text-sm">
                                        <p className="font-medium">{selected.from} <span className="font-normal text-slate-500 dark:text-slate-400">&lt;{selected.email}&gt;</span></p>
                                        <p className="text-slate-500 dark:text-slate-400">To {userName}, {selected.time}</p>
                                    </div>
                                </div>
                                <div className="mt-6 space-y-4 text-[15px] leading-7 text-slate-700 dark:text-slate-300">
                                    {selected.body.map((p) => <p key={p}>{p}</p>)}
                                </div>
                                {selected.attachment && (
                                    <a href={selected.attachment.href ?? "#"} className="mt-6 inline-flex items-center gap-3 rounded-xl border border-slate-200 p-3 pr-5 text-sm outline-none hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-blue-500 dark:border-slate-800 dark:hover:bg-slate-900">
                                        <span className="flex h-10 w-9 items-center justify-center rounded-md bg-rose-100 text-[10px] font-bold text-rose-700 dark:bg-rose-500/15 dark:text-rose-300">{fileType(selected.attachment.name)}</span>
                                        <span><span className="block font-medium">{selected.attachment.name}</span><span className="block text-xs text-slate-500">{selected.attachment.size}</span></span>
                                    </a>
                                )}
                            </motion.article>
                        </AnimatePresence>
                        <form onSubmit={sendReply} className="shrink-0 border-t border-slate-200 p-3 sm:p-4 dark:border-slate-800">
                            <div className="rounded-xl border border-slate-200 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/10 dark:border-slate-800">
                                <label htmlFor={replyId} className="sr-only">Reply to {selected.from}</label>
                                <textarea id={replyId} rows={2} value={reply} onChange={(e) => setReply(e.target.value)}
                                          placeholder={`Reply to ${selected.from.split(" ")[0]}`}
                                          className="block w-full resize-none rounded-t-xl bg-transparent px-3 py-2.5 text-sm placeholder:text-slate-400 focus:outline-none"/>
                                <div className="flex items-center justify-between px-2 pb-2">
                                    <span className="flex items-center gap-1 text-xs text-slate-400"><LuReply className="h-3.5 w-3.5" aria-hidden="true"/> {selected.email}</span>
                                    <button type="submit" disabled={!reply.trim()}
                                            className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white outline-none hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40 dark:focus-visible:ring-offset-slate-950">
                                        <LuSend className="h-3.5 w-3.5" aria-hidden="true"/> Send
                                    </button>
                                </div>
                            </div>
                        </form>
                    </>
                ) : (
                    <div className="flex flex-1 flex-col items-center justify-center p-8 text-center">
                        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 dark:bg-slate-900"><LuMail className="h-6 w-6" aria-hidden="true"/></span>
                        <p className="mt-4 font-medium">No conversation selected</p>
                        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Pick a message from the list to read it here.</p>
                    </div>
                )}
            </section>

            <div role="status" className="pointer-events-none absolute inset-x-0 bottom-4 z-10 flex justify-center px-4">
                <AnimatePresence>
                    {toast && (
                        <motion.p key={toast} initial={{opacity: 0, y: 16}} animate={{opacity: 1, y: 0}} exit={{opacity: 0, y: 16}}
                                  className="rounded-lg bg-slate-900 px-4 py-2.5 text-sm text-white shadow-lg dark:bg-white dark:text-slate-900">
                            {toast}
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

