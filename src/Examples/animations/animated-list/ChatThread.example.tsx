import {useEffect, useRef, useState} from "react";
import {AnimatePresence, motion, MotionConfig, useInView} from "framer-motion";
import {LuCheck, LuRotateCcw} from "react-icons/lu";

type Author = "support" | "you";

interface Message {
    id: number;
    author: Author;
    text: string;
}

const script: Message[] = [
    {id: 1, author: "support", text: "Hi Jordan, I'm Sam from Fieldnote billing. What can I help with?"},
    {id: 2, author: "you", text: "Our March invoice shows 14 seats, but we only have 11 people."},
    {id: 3, author: "support", text: "Let me check. Three seats were added on March 2 and never removed."},
    {id: 4, author: "support", text: "I removed them and refunded $54.00 to the card ending in 4242."},
    {id: 5, author: "you", text: "That was quick, thank you."},
    {id: 6, author: "support", text: "Happy to help. The refund shows up in 3 to 5 business days."},
];

// Longer replies keep the typing indicator up a little longer.
const typingTime = (text: string) => Math.min(1900, 700 + text.length * 14);

const TypingDots = () => (
    <span className="flex items-center gap-1" aria-hidden="true">
        {[0, 1, 2].map((dot) => (
            <motion.span
                key={dot}
                className="h-1.5 w-1.5 rounded-full bg-gray-400 dark:bg-slate-500"
                animate={{y: [0, -4, 0], opacity: [0.5, 1, 0.5]}}
                transition={{duration: 0.9, repeat: Infinity, delay: dot * 0.15, ease: "easeInOut"}}
            />
        ))}
    </span>
);

const Avatar = ({visible}: {visible: boolean}) => (
    <span
        aria-hidden="true"
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-[11px] font-semibold text-white ${visible ? "" : "invisible"}`}
    >
        SM
    </span>
);

// A support conversation that plays itself: replies are preceded by a typing indicator
// and each bubble springs in from its own side. Playback waits until the thread is on screen.
const ChatThread = () => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, {amount: 0.4});
    const [count, setCount] = useState(0);
    const [typing, setTyping] = useState(false);

    useEffect(() => {
        if (!inView || count >= script.length) return;
        const next = script[count];
        const timers: number[] = [];

        if (next.author === "support") {
            timers.push(window.setTimeout(() => setTyping(true), 500));
            timers.push(window.setTimeout(() => {
                setTyping(false);
                setCount((value) => value + 1);
            }, 500 + typingTime(next.text)));
        } else {
            timers.push(window.setTimeout(() => setCount((value) => value + 1), 1500));
        }

        return () => {
            timers.forEach((timer) => window.clearTimeout(timer));
            setTyping(false);
        };
    }, [count, inView]);

    const visible = script.slice(0, count);
    const finished = count >= script.length;
    const lastYours = visible.reduce((last, message) => (message.author === "you" ? message.id : last), 0);

    return (
        <MotionConfig reducedMotion="user">
            <div ref={ref} className="w-full max-w-sm overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center gap-3 border-b border-gray-100 px-4 py-3 dark:border-slate-800">
                    <span className="relative">
                        <Avatar visible/>
                        <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500 dark:border-slate-900"/>
                    </span>
                    <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">Sam Morgan</p>
                        <p className="text-xs text-gray-500 dark:text-slate-400">Billing support, usually replies in 2 min</p>
                    </div>
                </div>

                <ol
                    role="log"
                    aria-live="polite"
                    aria-label="Conversation with Sam Morgan"
                    className="flex h-[340px] flex-col justify-end gap-1.5 overflow-hidden px-4 py-4"
                >
                    <AnimatePresence initial={false}>
                        {visible.map((message, index) => {
                            const fromYou = message.author === "you";
                            const nextAuthor = visible[index + 1]?.author;
                            const lastInGroup = nextAuthor !== message.author && !(typing && !fromYou && index === visible.length - 1);
                            return (
                                <motion.li
                                    key={message.id}
                                    layout="position"
                                    initial={{opacity: 0, y: 16, scale: 0.9}}
                                    animate={{opacity: 1, y: 0, scale: 1}}
                                    transition={{type: "spring", stiffness: 420, damping: 30}}
                                    style={{transformOrigin: fromYou ? "100% 100%" : "0% 100%"}}
                                    className={`flex items-end gap-2 ${fromYou ? "justify-end" : "justify-start"} ${lastInGroup ? "mb-1.5" : ""}`}
                                >
                                    {!fromYou && <Avatar visible={lastInGroup}/>}
                                    <div className={`flex max-w-[78%] flex-col ${fromYou ? "items-end" : "items-start"}`}>
                                        <p
                                            className={`rounded-2xl px-3.5 py-2 text-sm leading-5 ${
                                                fromYou
                                                    ? `bg-indigo-600 text-white ${lastInGroup ? "rounded-br-md" : ""}`
                                                    : `bg-gray-100 text-gray-800 dark:bg-slate-800 dark:text-slate-100 ${lastInGroup ? "rounded-bl-md" : ""}`
                                            }`}
                                        >
                                            <span className="sr-only">{fromYou ? "You: " : "Sam: "}</span>
                                            {message.text}
                                        </p>
                                        {fromYou && message.id === lastYours && (
                                            <motion.span
                                                initial={{opacity: 0}}
                                                animate={{opacity: 1}}
                                                transition={{delay: 0.6}}
                                                className="mt-1 inline-flex items-center gap-1 text-[11px] text-gray-400 dark:text-slate-500"
                                            >
                                                <LuCheck className="h-3 w-3" aria-hidden="true"/>
                                                Seen
                                            </motion.span>
                                        )}
                                    </div>
                                </motion.li>
                            );
                        })}

                        {typing && (
                            <motion.li
                                key="typing"
                                layout="position"
                                initial={{opacity: 0, scale: 0.8}}
                                animate={{opacity: 1, scale: 1}}
                                exit={{opacity: 0, scale: 0.8, transition: {duration: 0.12}}}
                                style={{transformOrigin: "0% 100%"}}
                                className="flex items-end gap-2"
                            >
                                <Avatar visible/>
                                <span className="rounded-2xl rounded-bl-md bg-gray-100 px-3.5 py-3 dark:bg-slate-800">
                                    <TypingDots/>
                                    <span className="sr-only">Sam is typing</span>
                                </span>
                            </motion.li>
                        )}
                    </AnimatePresence>
                </ol>

                <div className="flex h-14 items-center justify-between gap-3 border-t border-gray-100 px-4 dark:border-slate-800">
                    <p className="text-xs text-gray-400 dark:text-slate-500">
                        {finished ? "Conversation resolved" : "Sam is looking into this"}
                    </p>
                    <button
                        type="button"
                        onClick={() => setCount(0)}
                        disabled={!finished}
                        className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                        <LuRotateCcw className="h-3.5 w-3.5" aria-hidden="true"/>
                        Replay
                    </button>
                </div>
            </div>
        </MotionConfig>
    );
};

export default ChatThread;
