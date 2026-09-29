import {useEffect, useRef, useState} from "react";
import type {KeyboardEvent} from "react";
import {AnimatePresence, motion, type Variants} from "framer-motion";
import {LuHeart, LuSend, LuThumbsUp} from "react-icons/lu";
import {FaRegSmile} from "react-icons/fa";

export type Reaction = "love" | "like" | "smile";

export interface ChatUser {
    name: string;
    avatar: string;
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
}

export interface ChatWithReactionsProps {
    /** Controlled list of messages. Leave it out and pass `defaultMessages` to let the chat manage itself. */
    messages?: ChatMessage[];
    defaultMessages?: ChatMessage[];
    onMessagesChange?: (messages: ChatMessage[]) => void;
    /** Profile used for the messages you send. */
    currentUser: ChatUser;
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

const formatTime = (date: Date) => date.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"});

const createId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

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
 * A chat thread with a message input. Messages slide in from their sender's side, and incoming messages
 * take an emoji reaction from a small menu.
 */
export const ChatWithReactions = ({
    messages: messagesProp,
    defaultMessages = [],
    onMessagesChange,
    currentUser,
    onSend,
    onReact,
    placeholder = "Type a message",
    className = "",
}: ChatWithReactionsProps) => {
    const [innerMessages, setInnerMessages] = useState(defaultMessages);
    const messages = messagesProp ?? innerMessages;
    const [newMessage, setNewMessage] = useState("");
    const [reactingTo, setReactingTo] = useState<string | null>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const count = useRef(messages.length);

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

    const handleSendMessage = () => {
        if (newMessage.trim() === "") return;

        const message: ChatMessage = {
            id: createId(),
            text: newMessage,
            sender: "me",
            author: currentUser,
            timestamp: formatTime(new Date()),
            reaction: null,
        };
        updateMessages([...messages, message]);
        onSend?.(message);
        setNewMessage("");
        inputRef.current?.focus();
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && !e.nativeEvent.isComposing) {
            e.preventDefault();
            handleSendMessage();
        }
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
        <div className={`flex flex-col w-full ${className}`}>
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
                                        className={`px-4 py-2 rounded-xl text-black dark:text-[#d2e5f5] text-sm ${
                                            message.sender === "me"
                                                ? "bg-blue-50 dark:bg-blue-900/90 rounded-br-none"
                                                : "bg-gray-50 dark:bg-slate-800 rounded-bl-none"
                                        }`}
                                    >
                                        {message.text}
                                    </div>
                                    <div
                                        className={`${message.sender === "me" ? "text-right" : "text-left"} mt-1 text-xs text-gray-500 dark:text-[#abc2d3]/80`}
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
                                        className="bg-white absolute dark:bg-slate-800 dark:shadow-slate-900 -right-2 bottom-2 rounded-full min-h-[25px] min-w-[25px] flex items-center cursor-pointer justify-center shadow-md shadow-gray-100"
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
                                            className="absolute z-30 dark:bg-slate-800 dark:border-slate-700 -bottom-6 right-0 bg-white rounded-full p-1 flex border border-[#e5eaf2] shadow-lg"
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
            <div className="bg-white dark:bg-[#020617] p-0 md:p-4">
                <div className="flex gap-2">
                    <input
                        ref={inputRef}
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder}
                        aria-label={placeholder}
                        className="flex-1 px-4 py-3 border dark:bg-slate-900 dark:border-slate-700 dark:text-[#d2e5f5] rounded-full focus:outline-none focus:ring-2 focus:ring-[#0FABCA]"
                    />
                    <motion.button
                        type="button"
                        whileTap={{scale: 0.95}}
                        onClick={handleSendMessage}
                        aria-label="Send message"
                        className="bg-[#0FABCA]/80 text-white min-w-[50px] rounded-full hover:bg-[#0FABCA] flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0FABCA] focus-visible:ring-offset-2"
                    >
                        <LuSend size={20}/>
                    </motion.button>
                </div>
            </div>
        </div>
    );
};
