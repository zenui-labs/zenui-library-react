import {useCallback, useEffect, useRef, useState} from "react";
import type {ChangeEvent, KeyboardEvent} from "react";
import {AnimatePresence, motion, type Variants} from "framer-motion";
import {LuFile, LuHeart, LuLoader2, LuPaperclip, LuSend, LuThumbsUp, LuX} from "react-icons/lu";
import {FaRegSmile} from "react-icons/fa";
import {FiImage} from "react-icons/fi";

export type Reaction = "love" | "like" | "smile";

export interface ChatUser {
    name: string;
    avatar: string;
}

export interface ChatAttachment {
    id: string;
    name: string;
    /** Size in bytes. */
    size: number;
    /** MIME type. Images get a thumbnail, other files a file icon. */
    type: string;
    url: string;
}

export interface ChatMessage {
    id: string;
    text: string;
    /** "me" puts the message on the right with your avatar. */
    sender: "me" | "other";
    author: ChatUser;
    /** Time shown under the bubble, already formatted, for example "09:41". */
    timestamp: string;
    reaction?: Reaction | null;
    attachments?: ChatAttachment[];
}

export interface ChatWithAttachmentsProps {
    /** Controlled list of messages. Leave it out and pass `defaultMessages` to let the chat manage itself. */
    messages?: ChatMessage[];
    defaultMessages?: ChatMessage[];
    onMessagesChange?: (messages: ChatMessage[]) => void;
    /** Profile used for the messages you send. */
    currentUser: ChatUser;
    /**
     * Uploads the picked files and resolves with their attachments. Without it, files are kept in the browser
     * with object URLs after a short simulated delay.
     */
    uploadFiles?: (files: File[]) => Promise<ChatAttachment[]>;
    /** Called with each message you send, for example to post it to your server. */
    onSend?: (message: ChatMessage) => void;
    /** Called when a reaction is added, changed or removed. */
    onReact?: (messageId: string, reaction: Reaction | null) => void;
    placeholder?: string;
    className?: string;
}

const REACTIONS: {value: Reaction; label: string}[] = [
    {value: "love", label: "Love"},
    {value: "like", label: "Like"},
    {value: "smile", label: "Smile"},
];

const SIMULATED_UPLOAD_MS = 1500;

const formatTime = (date: Date) => date.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"});

const createId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
};

const messageVariants: Variants = {
    hidden: (message: ChatMessage) => ({
        opacity: 0,
        y: 20,
        x: message.sender === "me" ? 50 : -50,
        scale: 0.8,
    }),
    visible: {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        transition: {type: "spring", damping: 18, stiffness: 220},
    },
    exit: {
        opacity: 0,
        y: 10,
        scale: 0.8,
        transition: {duration: 0.2},
    },
};

const reactionVariants: Variants = {
    hidden: {opacity: 0, y: 10},
    visible: {opacity: 1, y: 0},
    exit: {opacity: 0, y: 10},
};

const ReactionIcon = ({reaction}: {reaction: Reaction}) => {
    if (reaction === "love") return <LuHeart size={12} fill="red" color="red"/>;
    if (reaction === "like") return <LuThumbsUp size={12} fill="blue" color="blue"/>;
    return <FaRegSmile size={12} fill="gold" color="gold"/>;
};

const MenuIcon = ({reaction, active}: {reaction: Reaction; active: boolean}) => {
    if (reaction === "love") return <LuHeart size={15} color={active ? "red" : "gray"} className="dark:!text-[#d2e5f5]"/>;
    if (reaction === "like") return <LuThumbsUp size={15} color={active ? "blue" : "gray"} className="dark:!text-[#d2e5f5]"/>;
    return <FaRegSmile size={16} color={active ? "gold" : "gray"} className="dark:!text-[#d2e5f5]"/>;
};

/**
 * A chat thread with a message input that also takes files. Picked files upload as a batch with a
 * placeholder per file, then wait above the input until the message is sent. Incoming messages take an
 * emoji reaction.
 */
export const ChatWithAttachments = ({
    messages: messagesProp,
    defaultMessages = [],
    onMessagesChange,
    currentUser,
    uploadFiles,
    onSend,
    onReact,
    placeholder = "Type a message",
    className = "",
}: ChatWithAttachmentsProps) => {
    const [innerMessages, setInnerMessages] = useState(defaultMessages);
    const messages = messagesProp ?? innerMessages;
    const [newMessage, setNewMessage] = useState("");
    const [reactingTo, setReactingTo] = useState<string | null>(null);
    const [attachments, setAttachments] = useState<ChatAttachment[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadCount, setUploadCount] = useState(0);

    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const count = useRef(messages.length);
    const mounted = useRef(true);
    // Object URLs made by the built-in uploader, released when they are removed or the chat unmounts.
    const objectUrls = useRef(new Set<string>());

    useEffect(() => {
        mounted.current = true;
        const urls = objectUrls.current;
        return () => {
            mounted.current = false;
            urls.forEach((url) => URL.revokeObjectURL(url));
            urls.clear();
        };
    }, []);

    const updateMessages = (next: ChatMessage[]) => {
        if (messagesProp === undefined) setInnerMessages(next);
        onMessagesChange?.(next);
    };

    // Keep the newest message in view. Only the thread scrolls, never the page, and not on first render.
    useEffect(() => {
        if (messages.length > count.current) {
            const container = scrollRef.current;
            container?.scrollTo({top: container.scrollHeight, behavior: "smooth"});
        }
        count.current = messages.length;
    }, [messages.length]);

    const simulateUpload = useCallback(
        (files: File[]) =>
            new Promise<ChatAttachment[]>((resolve) => {
                window.setTimeout(() => {
                    if (!mounted.current) return resolve([]);
                    resolve(files.map((file) => {
                        const url = URL.createObjectURL(file);
                        objectUrls.current.add(url);
                        return {id: createId(), name: file.name, size: file.size, type: file.type, url};
                    }));
                }, SIMULATED_UPLOAD_MS);
            }),
        [],
    );

    const handleSendMessage = () => {
        if (newMessage.trim() === "" && attachments.length === 0) return;

        const message: ChatMessage = {
            id: createId(),
            text: newMessage,
            sender: "me",
            author: currentUser,
            timestamp: formatTime(new Date()),
            reaction: null,
            attachments: [...attachments],
        };
        updateMessages([...messages, message]);
        onSend?.(message);
        setNewMessage("");
        setAttachments([]);
        inputRef.current?.focus();
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleFileUpload = async (e: ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files ?? []);
        e.target.value = "";
        if (files.length === 0) return;

        setUploadCount(files.length);
        setIsUploading(true);
        try {
            const uploaded = await (uploadFiles ?? simulateUpload)(files);
            if (!mounted.current) return;
            setAttachments((current) => [...current, ...uploaded]);
        } finally {
            if (mounted.current) setIsUploading(false);
        }
    };

    const handleRemoveAttachment = (attachment: ChatAttachment) => {
        if (objectUrls.current.delete(attachment.url)) URL.revokeObjectURL(attachment.url);
        setAttachments((current) => current.filter((item) => item.id !== attachment.id));
    };

    const handleReaction = (messageId: string, reaction: Reaction) => {
        // Picking the current reaction again removes it.
        const current = messages.find((message) => message.id === messageId)?.reaction;
        const updated = current === reaction ? null : reaction;
        updateMessages(messages.map((message) => (message.id === messageId ? {...message, reaction: updated} : message)));
        onReact?.(messageId, updated);
        setReactingTo(null);
    };

    const toggleReactionMenu = (messageId: string) => {
        setReactingTo(reactingTo === messageId ? null : messageId);
    };

    return (
        <div className={`flex flex-col w-full h-full ${className}`}>
            <div ref={scrollRef} className="flex-1 p-2 md:p-4 overflow-y-auto">
                <AnimatePresence>
                    {messages.map((message) => (
                        <motion.div
                            key={message.id}
                            variants={messageVariants}
                            custom={message}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            layout
                            className={`mb-4 flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
                        >
                            <div className="relative max-w-md flex items-end gap-2">
                                {message.sender === "other" && (
                                    <img src={message.author.avatar} alt={message.author.name} className="w-8 h-8 rounded-full"/>
                                )}
                                <div>
                                    <div
                                        className={`p-3 rounded-xl text-black dark:text-[#d2e5f5] text-sm ${
                                            message.sender === "me"
                                                ? "bg-blue-50 dark:bg-blue-900/90 rounded-br-none"
                                                : "bg-gray-50 dark:bg-slate-800 rounded-bl-none"
                                        }`}
                                    >
                                        {/* File attachments in the message */}
                                        {message.attachments && message.attachments.length > 0 && (
                                            <div className="mb-2">
                                                {message.attachments.map((attachment) => (
                                                    <div
                                                        key={attachment.id}
                                                        className="flex items-center p-2 mb-2 bg-white rounded-md border border-gray-200 dark:bg-slate-800 dark:border-slate-700"
                                                    >
                                                        <div className="p-2 bg-gray-100 dark:bg-slate-900 rounded-md">
                                                            {attachment.type.startsWith("image/") ? <FiImage size={16} aria-hidden/> : <LuFile size={16} aria-hidden/>}
                                                        </div>
                                                        <div className="ml-2 flex-1 max-w-[330px]">
                                                            <span className="text-xs break-words font-medium">{attachment.name}</span>
                                                            <p className="text-xs dark:text-[#d2e5f5]/70 text-gray-500">{formatFileSize(attachment.size)}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        {message.text}
                                    </div>
                                    <div
                                        className={`${message.sender === "me" ? "text-right" : "text-left"} mt-1 text-xs text-gray-500 dark:text-[#abc2d3]/70`}
                                    >
                                        {message.timestamp}
                                    </div>
                                </div>
                                {message.sender === "me" && (
                                    <img src={message.author.avatar} alt={message.author.name} className="w-8 h-8 rounded-full"/>
                                )}

                                {/* Reaction display, which also reopens the menu */}
                                {message.reaction && (
                                    <button
                                        type="button"
                                        title={message.reaction}
                                        aria-label={`Reaction: ${message.reaction}. Change reaction`}
                                        aria-expanded={reactingTo === message.id}
                                        onClick={() => toggleReactionMenu(message.id)}
                                        className="bg-white absolute -right-2 bottom-2 rounded-full min-h-[25px] min-w-[25px] flex items-center cursor-pointer justify-center shadow-md shadow-gray-100 dark:bg-slate-700 dark:shadow-slate-800"
                                    >
                                        <ReactionIcon reaction={message.reaction}/>
                                    </button>
                                )}

                                {/* Reaction button */}
                                {message.sender === "other" && !message.reaction && (
                                    <button
                                        type="button"
                                        onClick={() => toggleReactionMenu(message.id)}
                                        title="Add reaction"
                                        aria-label="Add reaction"
                                        aria-expanded={reactingTo === message.id}
                                        className="absolute bottom-2 -right-2 bg-gray-100 rounded-full p-1 shadow-sm hover:bg-gray-200 dark:bg-slate-700 dark:text-[#d2e5f5] dark:hover:bg-slate-800 transition-colors"
                                    >
                                        <FaRegSmile size={14}/>
                                    </button>
                                )}

                                {/* Reaction menu */}
                                <AnimatePresence>
                                    {reactingTo === message.id && (
                                        <motion.div
                                            variants={reactionVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            className="absolute z-30 -bottom-6 right-0 bg-white rounded-full p-1 flex border border-[#e5eaf2] dark:bg-slate-800 dark:border-slate-700 shadow-lg"
                                        >
                                            {REACTIONS.map(({value, label}) => (
                                                <button
                                                    key={value}
                                                    type="button"
                                                    aria-label={label}
                                                    aria-pressed={message.reaction === value}
                                                    onClick={() => handleReaction(message.id, value)}
                                                    className="min-w-[25px] min-h-[25px] flex items-center justify-center hover:bg-gray-100 dark:hover:bg-slate-900 rounded-full"
                                                >
                                                    <MenuIcon reaction={value} active={message.reaction === value}/>
                                                </button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* Message input */}
            <div className="bg-white dark:bg-slate-900 dark:border-slate-700 p-4 pb-3 border border-[#e5eaf2] rounded-lg">
                {/* Attachments waiting to be sent */}
                {(attachments.length > 0 || isUploading) && (
                    <div className="mb-2 flex flex-wrap gap-2">
                        {isUploading &&
                            Array.from({length: uploadCount}).map((_, index) => (
                                <div
                                    key={index}
                                    role="status"
                                    className="bg-gray-50 dark:bg-slate-800 dark:border-slate-700 dark:text-[#d2e5f5] p-2 rounded-md border border-gray-200 flex items-center gap-2"
                                >
                                    <LuLoader2 className="animate-spin" size={16} aria-hidden/>
                                    <span className="text-sm">Uploading...</span>
                                </div>
                            ))}

                        {attachments.map((file) =>
                            file.type.startsWith("image/") ? (
                                <div key={file.id} className="relative group">
                                    <img
                                        src={file.url}
                                        alt={file.name}
                                        className="w-[80px] object-cover h-[60px] dark:border-slate-700 border border-[#e5eaf2] p-1 rounded-lg"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveAttachment(file)}
                                        aria-label={`Remove ${file.name}`}
                                        className="p-1 invisible dark:bg-slate-700 dark:text-[#d2e5f5] group-hover:visible group-focus-within:visible absolute top-0 right-0 bg-gray-100 hover:bg-gray-200 rounded-full scale-[0.8] group-hover:scale-100 group-focus-within:scale-100 transition-all duration-200 ease-in"
                                    >
                                        <LuX size={14}/>
                                    </button>
                                </div>
                            ) : (
                                <div
                                    key={file.id}
                                    className="pl-2 pr-3.5 py-2 dark:border-slate-700 rounded-lg border border-[#e5eaf2] flex items-center gap-2 group relative"
                                >
                                    <LuFile className="text-[2.2rem] text-gray-600 dark:text-[#d2e5f5]/70" aria-hidden/>
                                    <div>
                                        <p className="text-sm dark:text-[#d2e5f5] max-w-xs truncate">{file.name}</p>
                                        <p className="text-xs mt-0.5 dark:text-[#d2e5f5]/70 text-gray-500">{formatFileSize(file.size)}</p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveAttachment(file)}
                                        aria-label={`Remove ${file.name}`}
                                        className="p-1 invisible dark:bg-slate-700 dark:text-[#d2e5f5] group-hover:visible group-focus-within:visible scale-[0.8] group-hover:scale-100 group-focus-within:scale-100 transition-all duration-200 absolute top-0 right-0 bg-gray-100 hover:bg-gray-200 rounded-full ease-in"
                                    >
                                        <LuX size={14}/>
                                    </button>
                                </div>
                            ),
                        )}
                    </div>
                )}

                <div className="flex gap-2">
                    <input
                        ref={inputRef}
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        aria-label={placeholder}
                        className="w-[70%] md:flex-1 pr-4 py-1 border-none dark:bg-transparent dark:text-[#d2e5f5] focus:outline-none focus:ring-0"
                    />

                    {/* Hidden file input, opened by the paperclip button */}
                    <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" multiple tabIndex={-1}/>

                    <motion.button
                        type="button"
                        whileTap={{scale: 0.95}}
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                        aria-label="Attach files"
                        className="bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-[#d2e5f5] dark:hover:bg-slate-600/50 min-w-[30px] p-2.5 rounded-full hover:bg-gray-200 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0FABCA] disabled:opacity-60"
                    >
                        <LuPaperclip size={18}/>
                    </motion.button>

                    <motion.button
                        type="button"
                        whileTap={{scale: 0.95}}
                        onClick={handleSendMessage}
                        aria-label="Send message"
                        className="bg-[#0FABCA]/80 text-white min-w-[30px] p-2.5 rounded-full hover:bg-[#0FABCA] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0FABCA] focus-visible:ring-offset-2"
                    >
                        <LuSend size={18}/>
                    </motion.button>
                </div>
            </div>
        </div>
    );
};
