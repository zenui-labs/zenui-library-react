import {useEffect, useId, useRef, useState} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {LuBot, LuRotateCcw} from "react-icons/lu";

interface Faq {
    id: string;
    question: string;
    answer: string;
}

const faqs: Faq[] = [
    {id: "cancel", question: "Can I skip a week or cancel?", answer: "Yes, any time before Wednesday at noon for the following week. Skipping is one tap in the app, and cancelling takes two. There is no fee for either."},
    {id: "allergies", question: "How do you handle allergies?", answer: "Set allergies in your profile and we hide every recipe that contains them. Our kitchen handles nuts and gluten, so we label each kit with the facilities it passed through."},
    {id: "portions", question: "How big are the portions?", answer: "Each serving is 550 to 750 calories. Choose 2 or 4 servings per recipe, and switch between them from week to week."},
    {id: "packaging", question: "Is the packaging recyclable?", answer: "92% of it by weight. Ice packs are filled with plant based gel that you can pour down the drain, and the insulation is compostable."},
    {id: "delivery", question: "What if I am not home for delivery?", answer: "Boxes stay cold for up to 48 hours. Add delivery notes, such as a side door or a building code, from your account page."},
];

interface Message {
    id: number;
    from: "user" | "bot";
    text: string;
}

const greeting: Message = {id: 0, from: "bot", text: "Hi, I am the Harvest Box assistant. Pick a question below and I will answer it here."};

const ConversationalFaq = () => {
    const [messages, setMessages] = useState<Message[]>([greeting]);
    const [asked, setAsked] = useState<Set<string>>(new Set());
    const [typing, setTyping] = useState(false);
    const logRef = useRef<HTMLDivElement>(null);
    const timer = useRef<number | undefined>(undefined);
    const nextId = useRef(1);
    const chipRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
    const restartRef = useRef<HTMLButtonElement>(null);
    const hintId = useId();
    const reduceMotion = useReducedMotion();

    useEffect(() => () => window.clearTimeout(timer.current), []);

    // Keep the newest message in view by scrolling the chat panel itself, never the page.
    useEffect(() => {
        const log = logRef.current;
        if (log) log.scrollTo({top: log.scrollHeight, behavior: reduceMotion ? "auto" : "smooth"});
    }, [messages, typing, reduceMotion]);

    const remaining = faqs.filter((f) => !asked.has(f.id));

    const ask = (faq: Faq) => {
        if (typing) return;
        // The chip disappears once asked, so hand focus to a neighboring chip or the restart button.
        const index = remaining.findIndex((f) => f.id === faq.id);
        const neighbor = remaining[index + 1] ?? remaining[index - 1];
        requestAnimationFrame(() => {
            const target = neighbor ? chipRefs.current.get(neighbor.id) : restartRef.current;
            target?.focus();
        });
        setAsked((prev) => new Set(prev).add(faq.id));
        setMessages((m) => [...m, {id: nextId.current++, from: "user", text: faq.question}]);
        setTyping(true);
        timer.current = window.setTimeout(() => {
            setTyping(false);
            setMessages((m) => [...m, {id: nextId.current++, from: "bot", text: faq.answer}]);
        }, reduceMotion ? 200 : 900);
    };

    const restart = () => {
        window.clearTimeout(timer.current);
        setTyping(false);
        setMessages([greeting]);
        setAsked(new Set());
    };

    return (
        <section className="w-full bg-gradient-to-b from-lime-50 to-white px-4 py-16 sm:px-8 sm:py-24 dark:from-slate-900 dark:to-slate-950">
            <div className="mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
                <div>
                    <p className="text-sm font-medium text-lime-700 dark:text-lime-400">Questions</p>
                    <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                        Ask us anything about your box
                    </h2>
                    <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-400">
                        The answers to what new subscribers ask most, in the format you would get from our support team.
                    </p>
                    <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
                        Something else? <a href="#" className="rounded font-medium text-slate-900 underline decoration-lime-500 decoration-2 underline-offset-4 outline-none focus-visible:ring-2 focus-visible:ring-lime-500 dark:text-white">Chat with a person</a>
                    </p>
                </div>

                <div className="overflow-hidden rounded-[1.75rem] border border-slate-200 bg-white shadow-2xl shadow-lime-900/10 dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
                    <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3.5 dark:border-slate-800">
                        <div className="flex items-center gap-3">
                            <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-lime-500 text-white">
                                <LuBot className="h-5 w-5"/>
                                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white bg-emerald-500 dark:border-slate-900"/>
                            </span>
                            <div>
                                <p className="text-sm font-semibold text-slate-900 dark:text-white">Harvest Box help</p>
                                <p className="text-xs text-slate-500 dark:text-slate-400">Answers from our FAQ</p>
                            </div>
                        </div>
                        <button
                            ref={restartRef}
                            type="button"
                            onClick={restart}
                            disabled={messages.length === 1}
                            className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-slate-500 outline-none transition-colors hover:bg-slate-100 hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-lime-500 disabled:pointer-events-none disabled:opacity-40 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                        >
                            <LuRotateCcw className="h-3.5 w-3.5"/> Start over
                        </button>
                    </div>

                    <div ref={logRef} role="log" aria-live="polite" aria-label="Conversation"
                         className="h-80 space-y-3 overflow-y-auto px-5 py-5">
                        <AnimatePresence initial={false}>
                            {messages.map((message) => (
                                <motion.div
                                    key={message.id}
                                    initial={{opacity: 0, y: 10, scale: 0.98}}
                                    animate={{opacity: 1, y: 0, scale: 1}}
                                    transition={{duration: 0.25, ease: [0.16, 1, 0.3, 1]}}
                                    className={`flex ${message.from === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <p className={`max-w-[85%] px-4 py-2.5 text-sm leading-relaxed ${message.from === "user"
                                        ? "rounded-2xl rounded-br-md bg-slate-900 text-white dark:bg-lime-500 dark:text-slate-950"
                                        : "rounded-2xl rounded-bl-md bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100"}`}>
                                        <span className="sr-only">{message.from === "user" ? "You: " : "Assistant: "}</span>
                                        {message.text}
                                    </p>
                                </motion.div>
                            ))}
                            {typing && (
                                <motion.div key="typing" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} className="flex">
                                    <span className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-slate-100 px-4 py-3.5 dark:bg-slate-800" aria-label="Assistant is typing">
                                        {[0, 1, 2].map((dot) => (
                                            <motion.span
                                                key={dot}
                                                className="h-1.5 w-1.5 rounded-full bg-slate-400"
                                                animate={reduceMotion ? undefined : {y: [0, -4, 0]}}
                                                transition={{duration: 0.6, repeat: Infinity, delay: dot * 0.15}}
                                            />
                                        ))}
                                    </span>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="border-t border-slate-100 bg-slate-50/60 px-5 py-4 dark:border-slate-800 dark:bg-slate-950/40">
                        <p id={hintId} className="text-xs font-medium text-slate-500 dark:text-slate-400">
                            {remaining.length > 0 ? "Suggested questions" : "That is every question we have. Start over or chat with a person."}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2" role="group" aria-labelledby={hintId}>
                            <AnimatePresence initial={false}>
                                {remaining.map((faq) => (
                                    <motion.button
                                        key={faq.id}
                                        ref={(el: HTMLButtonElement | null) => {
                                            if (el) chipRefs.current.set(faq.id, el);
                                            else chipRefs.current.delete(faq.id);
                                        }}
                                        layout
                                        type="button"
                                        initial={{opacity: 0, scale: 0.9}}
                                        animate={{opacity: 1, scale: 1}}
                                        exit={{opacity: 0, scale: 0.9}}
                                        transition={{duration: 0.2}}
                                        onClick={() => ask(faq)}
                                        aria-disabled={typing}
                                        className="rounded-full border border-lime-300 bg-white px-3.5 py-1.5 text-sm text-slate-700 outline-none transition-colors hover:border-lime-500 hover:bg-lime-50 focus-visible:ring-2 focus-visible:ring-lime-500 aria-disabled:cursor-wait aria-disabled:opacity-60 dark:border-lime-500/30 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-lime-500/10"
                                    >
                                        {faq.question}
                                    </motion.button>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ConversationalFaq;
