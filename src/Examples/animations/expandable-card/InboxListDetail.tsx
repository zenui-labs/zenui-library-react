import {useEffect, useId, useRef, useState} from "react";
import {AnimatePresence, motion, MotionConfig} from "framer-motion";
import {LuArchive, LuArrowLeft, LuPaperclip, LuReply, LuStar} from "react-icons/lu";

export interface Message {
    id: string;
    from: string;
    company: string;
    /** One or two letters shown in the avatar. */
    initials: string;
    /** Tailwind background class for the avatar, for example "bg-violet-500". */
    color: string;
    subject: string;
    /** One line of the body shown under the subject in the list. */
    preview: string;
    time: string;
    /** Paragraphs of the full message. */
    body: string[];
    /** File name shown under the body. */
    attachment?: string;
    unread?: boolean;
}

export interface InboxListDetailProps {
    messages: Message[];
    /** Heading of the list, also used as the back button label. */
    title?: string;
    /** Called when a message is opened. */
    onOpen?: (message: Message) => void;
    onReply?: (message: Message) => void;
    onStar?: (message: Message) => void;
    onArchive?: (message: Message) => void;
    /** Text of the reply button in the message view. */
    replyLabel?: (message: Message) => string;
    className?: string;
}

const defaultReplyLabel = (message: Message) => `Reply to ${message.from.split(" ")[0]}`;

const spring = {type: "spring", stiffness: 380, damping: 36} as const;

// The row you open becomes the message view. Avatar, sender and subject are shared between both,
// so they travel into place instead of cutting to a new screen.
export const InboxListDetail = ({
    messages,
    title = "Inbox",
    onOpen,
    onReply,
    onStar,
    onArchive,
    replyLabel = defaultReplyLabel,
    className = "",
}: InboxListDetailProps) => {
    const uid = useId();
    const [openId, setOpenId] = useState<string | null>(null);
    const [read, setRead] = useState<string[]>([]);
    const backRef = useRef<HTMLButtonElement>(null);
    const rowRefs = useRef<Record<string, HTMLButtonElement | null>>({});
    const lastOpened = useRef<string | null>(null);
    const open = messages.find((message) => message.id === openId) ?? null;

    useEffect(() => {
        if (!openId) return;
        backRef.current?.focus();
        const handleKey = (event: globalThis.KeyboardEvent) => {
            if (event.key === "Escape") setOpenId(null);
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [openId]);

    const openMessage = (id: string) => {
        lastOpened.current = id;
        setRead((current) => (current.includes(id) ? current : [...current, id]));
        setOpenId(id);
        const message = messages.find((item) => item.id === id);
        if (message) onOpen?.(message);
    };

    return (
        <MotionConfig transition={spring} reducedMotion="user">
            <div className={`relative h-[32rem] w-full max-w-md overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl shadow-gray-900/5 dark:border-slate-800 dark:bg-slate-950 dark:shadow-black/40 ${className}`}>
                <div aria-hidden={open !== null} className="flex h-full flex-col">
                    <div className="flex items-center justify-between px-5 pb-3 pt-5">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
                        <span className="text-xs text-gray-500 dark:text-slate-400">
                            {messages.filter((message) => message.unread && !read.includes(message.id)).length} unread
                        </span>
                    </div>
                    <ul className="flex-1 space-y-1 overflow-y-auto px-2 pb-2">
                        {messages.map((message) => {
                            const unread = message.unread && !read.includes(message.id);
                            return (
                                <li key={message.id}>
                                    <motion.button
                                        ref={(element) => {
                                            rowRefs.current[message.id] = element;
                                        }}
                                        type="button"
                                        layoutId={`${uid}-message-${message.id}`}
                                        onClick={() => openMessage(message.id)}
                                        tabIndex={open ? -1 : 0}
                                        style={{borderRadius: 16}}
                                        className="flex w-full items-start gap-3 bg-white p-3 text-left transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:bg-slate-950 dark:hover:bg-slate-900"
                                    >
                                        <motion.span
                                            layoutId={`${uid}-avatar-${message.id}`}
                                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white ${message.color}`}
                                        >
                                            {message.initials}
                                        </motion.span>
                                        <span className="min-w-0 flex-1">
                                            <span className="flex items-baseline justify-between gap-2">
                                                <motion.span layoutId={`${uid}-from-${message.id}`} className={`truncate text-sm ${unread ? "font-semibold text-gray-900 dark:text-white" : "text-gray-700 dark:text-slate-300"}`}>
                                                    {message.from}
                                                </motion.span>
                                                <span className="shrink-0 text-xs text-gray-400 dark:text-slate-500">{message.time}</span>
                                            </span>
                                            <motion.span layoutId={`${uid}-subject-${message.id}`} className={`block truncate text-sm ${unread ? "font-medium text-gray-900 dark:text-white" : "text-gray-600 dark:text-slate-400"}`}>
                                                {message.subject}
                                            </motion.span>
                                            <span className="mt-0.5 block truncate text-xs text-gray-500 dark:text-slate-500">{message.preview}</span>
                                        </span>
                                        {unread && (
                                            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-indigo-500">
                                                <span className="sr-only">Unread</span>
                                            </span>
                                        )}
                                    </motion.button>
                                </li>
                            );
                        })}
                    </ul>
                </div>

                <AnimatePresence
                    onExitComplete={() => {
                        if (lastOpened.current) rowRefs.current[lastOpened.current]?.focus();
                    }}
                >
                    {open && (
                        <motion.article
                            key={open.id}
                            layoutId={`${uid}-message-${open.id}`}
                            aria-labelledby={`${uid}-subject-title-${open.id}`}
                            style={{borderRadius: 0}}
                            className="absolute inset-0 z-10 flex flex-col bg-white dark:bg-slate-950"
                        >
                            <div className="flex items-center gap-1 border-b border-gray-100 px-3 py-2.5 dark:border-slate-800">
                                <button
                                    ref={backRef}
                                    type="button"
                                    onClick={() => setOpenId(null)}
                                    className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-slate-300 dark:hover:bg-slate-900"
                                >
                                    <LuArrowLeft className="h-4 w-4" aria-hidden="true"/>
                                    {title}
                                </button>
                                <span className="ml-auto flex gap-1">
                                    {[
                                        {label: "Star", icon: LuStar, action: onStar},
                                        {label: "Archive", icon: LuArchive, action: onArchive},
                                    ].map(({label, icon: Icon, action}) => (
                                        <button
                                            key={label}
                                            type="button"
                                            onClick={() => action?.(open)}
                                            aria-label={label}
                                            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white"
                                        >
                                            <Icon className="h-4 w-4" aria-hidden="true"/>
                                        </button>
                                    ))}
                                </span>
                            </div>

                            <div className="flex-1 overflow-y-auto px-5 py-5">
                                <motion.h4 id={`${uid}-subject-title-${open.id}`} layoutId={`${uid}-subject-${open.id}`} className="text-xl font-semibold leading-snug text-gray-900 dark:text-white">
                                    {open.subject}
                                </motion.h4>
                                <div className="mt-4 flex items-center gap-3">
                                    <motion.span layoutId={`${uid}-avatar-${open.id}`} className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-semibold text-white ${open.color}`}>
                                        {open.initials}
                                    </motion.span>
                                    <div>
                                        <motion.p layoutId={`${uid}-from-${open.id}`} className="text-sm font-semibold text-gray-900 dark:text-white">
                                            {open.from}
                                        </motion.p>
                                        <p className="text-xs text-gray-500 dark:text-slate-400">
                                            {open.company}, {open.time}
                                        </p>
                                    </div>
                                </div>

                                {/* The body arrives after the header has settled. */}
                                <motion.div
                                    initial={{opacity: 0, y: 12}}
                                    animate={{opacity: 1, y: 0, transition: {delay: 0.12, duration: 0.3}}}
                                    exit={{opacity: 0, transition: {duration: 0.1}}}
                                    className="mt-5 space-y-3 text-sm leading-6 text-gray-700 dark:text-slate-300"
                                >
                                    {open.body.map((paragraph) => (
                                        <p key={paragraph}>{paragraph}</p>
                                    ))}
                                    {open.attachment && (
                                        <p className="flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5 text-xs text-gray-700 dark:border-slate-800 dark:text-slate-300">
                                            <LuPaperclip className="h-4 w-4" aria-hidden="true"/>
                                            {open.attachment}
                                        </p>
                                    )}
                                </motion.div>
                            </div>

                            <motion.div
                                initial={{opacity: 0, y: 16}}
                                animate={{opacity: 1, y: 0, transition: {delay: 0.18, duration: 0.3}}}
                                exit={{opacity: 0, transition: {duration: 0.1}}}
                                className="border-t border-gray-100 p-3 dark:border-slate-800"
                            >
                                <button
                                    type="button"
                                    onClick={() => onReply?.(open)}
                                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 py-2.5 text-sm font-medium text-white transition-colors hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 dark:focus-visible:ring-offset-slate-950"
                                >
                                    <LuReply className="h-4 w-4" aria-hidden="true"/>
                                    {replyLabel(open)}
                                </button>
                            </motion.div>
                        </motion.article>
                    )}
                </AnimatePresence>
            </div>
        </MotionConfig>
    );
};
