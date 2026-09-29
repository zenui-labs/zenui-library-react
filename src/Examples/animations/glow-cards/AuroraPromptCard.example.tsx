import {useEffect, useId, useRef, useState} from "react";
import type {FormEvent} from "react";
import {AnimatePresence, motion, useInView, useReducedMotion} from "framer-motion";
import {LuArrowUp, LuSparkles} from "react-icons/lu";

type Phase = "idle" | "thinking" | "answered";

const suggestions = [
    "Summarize this week's support tickets",
    "Which experiments shipped in September",
    "Draft a reply to the Acme renewal email",
];

const answers: Record<string, string> = {
    [suggestions[0]]: "212 tickets this week, down 9%. Most were about invoice downloads after Tuesday's release. Refund requests stayed flat, and median first reply time was 38 minutes.",
    [suggestions[1]]: "Four experiments shipped: one-page checkout, the annual plan nudge, saved carts for guests and the new search ranking. One-page checkout had the largest lift at 4.2%.",
    [suggestions[2]]: "Hi Dana, thanks for the note. We can hold your current per-seat price for the renewal if you confirm 40 seats by October 15. Happy to walk through the new admin features on a call.",
};

const fallback = "I searched 1,284 documents in the Northwind workspace and pinned the three most relevant to the top of your results.";

interface Blob {
    className: string;
    x: string[];
    y: string[];
    duration: number;
}

// Large blurred shapes drift behind the card. The card body leaves a 1px gap, so they read as a soft moving border.
const blobs: Blob[] = [
    {className: "left-[-10%] top-[-20%] h-3/4 w-2/3 bg-cyan-400", x: ["0%", "35%", "10%", "0%"], y: ["0%", "20%", "45%", "0%"], duration: 14},
    {className: "right-[-10%] top-[10%] h-3/4 w-2/3 bg-violet-500", x: ["0%", "-30%", "-10%", "0%"], y: ["0%", "25%", "-15%", "0%"], duration: 17},
    {className: "bottom-[-25%] left-[20%] h-3/4 w-2/3 bg-emerald-400", x: ["0%", "-20%", "25%", "0%"], y: ["0%", "-30%", "-10%", "0%"], duration: 19},
];

const AuroraPromptCard = () => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref);
    const reduceMotion = useReducedMotion();
    const [prompt, setPrompt] = useState("");
    const [focused, setFocused] = useState(false);
    const [phase, setPhase] = useState<Phase>("idle");
    const [asked, setAsked] = useState("");
    const inputId = useId();
    const drifting = inView && !reduceMotion;
    const answer = answers[asked] ?? fallback;

    useEffect(() => {
        if (phase !== "thinking") return;
        const id = window.setTimeout(() => setPhase("answered"), 1400);
        return () => window.clearTimeout(id);
    }, [phase]);

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const question = prompt.trim();
        if (!question || phase === "thinking") return;
        setAsked(question);
        setPhase("thinking");
        setPrompt("");
    };

    return (
        <div ref={ref} className="relative w-full max-w-lg py-6">
            <div className="relative">
                <motion.div
                    aria-hidden="true"
                    animate={{opacity: focused || phase === "thinking" ? 0.9 : 0.5, scale: focused ? 1.02 : 1}}
                    transition={{duration: 0.6, ease: [0.16, 1, 0.3, 1]}}
                    className="pointer-events-none absolute -inset-3 overflow-hidden rounded-[36px] blur-2xl"
                >
                    {blobs.map((blob) => (
                        <motion.span
                            key={blob.className}
                            className={`absolute rounded-full opacity-80 ${blob.className}`}
                            animate={drifting ? {x: blob.x, y: blob.y} : {x: "0%", y: "0%"}}
                            transition={drifting ? {duration: blob.duration, repeat: Infinity, ease: "easeInOut"} : {duration: 1.2}}
                        />
                    ))}
                </motion.div>

                <div className="relative rounded-3xl bg-white/40 p-px dark:bg-white/10">
                    <div className="rounded-[23px] bg-white/95 p-5 backdrop-blur-xl sm:p-6 dark:bg-slate-950/90">
                        <div className="flex items-center gap-2.5">
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-400 via-violet-500 to-emerald-400 text-white">
                                <LuSparkles className="h-4 w-4" aria-hidden="true"/>
                            </span>
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Ask Atlas</h3>
                            <span className="ml-auto text-xs text-gray-500 dark:text-slate-400">Northwind workspace</span>
                        </div>

                        <div aria-live="polite" className="mt-4 min-h-[6.5rem] text-sm leading-6">
                            <AnimatePresence mode="wait">
                                {phase === "idle" && (
                                    <motion.div key="idle" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                                        <p className="text-gray-600 dark:text-slate-300">Ask about tickets, docs or experiments. Try one of these:</p>
                                        <div className="mt-3 flex flex-wrap gap-2">
                                            {suggestions.map((suggestion) => (
                                                <button
                                                    key={suggestion}
                                                    type="button"
                                                    onClick={() => setPrompt(suggestion)}
                                                    className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-700 transition-colors hover:border-violet-300 hover:text-violet-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-violet-500/60 dark:hover:text-violet-300"
                                                >
                                                    {suggestion}
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                                {phase === "thinking" && (
                                    <motion.div key="thinking" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                                        <p className="font-medium text-gray-900 dark:text-white">{asked}</p>
                                        <p className="mt-2 flex items-center gap-1.5 text-gray-500 dark:text-slate-400">
                                            Searching
                                            {[0, 1, 2].map((dot) => (
                                                <motion.span
                                                    key={dot}
                                                    className="h-1 w-1 rounded-full bg-current"
                                                    animate={reduceMotion ? undefined : {opacity: [0.2, 1, 0.2]}}
                                                    transition={{duration: 1, repeat: Infinity, delay: dot * 0.18}}
                                                />
                                            ))}
                                        </p>
                                    </motion.div>
                                )}
                                {phase === "answered" && (
                                    <motion.div key="answer" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                                        <p className="font-medium text-gray-900 dark:text-white">{asked}</p>
                                        {/* Words fade in one after another, like a streamed reply. */}
                                        <p className="mt-2 text-gray-600 dark:text-slate-300">
                                            {answer.split(" ").map((word, index) => (
                                                <motion.span
                                                    key={`${word}-${index}`}
                                                    initial={reduceMotion ? false : {opacity: 0, filter: "blur(3px)"}}
                                                    animate={{opacity: 1, filter: "blur(0px)"}}
                                                    transition={{duration: 0.3, delay: index * 0.025}}
                                                >
                                                    {word}{" "}
                                                </motion.span>
                                            ))}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        <form onSubmit={submit} className="mt-4">
                            <label htmlFor={inputId} className="sr-only">Ask a question</label>
                            <div className="flex items-end gap-2 rounded-2xl border border-gray-200 bg-white p-2 transition-colors focus-within:border-violet-400 dark:border-slate-700 dark:bg-slate-900 dark:focus-within:border-violet-500">
                                <textarea
                                    id={inputId}
                                    rows={2}
                                    value={prompt}
                                    onChange={(event) => setPrompt(event.target.value)}
                                    onFocus={() => setFocused(true)}
                                    onBlur={() => setFocused(false)}
                                    onKeyDown={(event) => {
                                        if (event.key === "Enter" && !event.shiftKey) {
                                            event.preventDefault();
                                            event.currentTarget.form?.requestSubmit();
                                        }
                                    }}
                                    placeholder="Ask anything about your workspace"
                                    className="min-h-[3rem] flex-1 resize-none bg-transparent px-2 py-1.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none dark:text-white dark:placeholder:text-slate-500"
                                />
                                <button
                                    type="submit"
                                    disabled={!prompt.trim() || phase === "thinking"}
                                    aria-label="Send question"
                                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-900 text-white transition-colors hover:bg-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 dark:disabled:bg-slate-800 dark:disabled:text-slate-500"
                                >
                                    <LuArrowUp className="h-4 w-4" aria-hidden="true"/>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuroraPromptCard;
