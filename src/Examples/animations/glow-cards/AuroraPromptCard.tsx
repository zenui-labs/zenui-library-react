import {useEffect, useId, useRef, useState} from "react";
import type {ComponentType, FormEvent} from "react";
import {AnimatePresence, motion, useInView, useReducedMotion} from "framer-motion";
import {LuArrowUp, LuSparkles} from "react-icons/lu";

type Phase = "idle" | "thinking" | "answered";

interface Blob {
    className: string;
    x: string[];
    y: string[];
    duration: number;
}

// Large blurred shapes drift behind the card. The card body leaves a 1px gap, so they read as a soft moving border.
const blobs: Blob[] = [
    {className: "left-[-10%] top-[-20%] h-3/4 w-2/3", x: ["0%", "35%", "10%", "0%"], y: ["0%", "20%", "45%", "0%"], duration: 14},
    {className: "right-[-10%] top-[10%] h-3/4 w-2/3", x: ["0%", "-30%", "-10%", "0%"], y: ["0%", "25%", "-15%", "0%"], duration: 17},
    {className: "bottom-[-25%] left-[20%] h-3/4 w-2/3", x: ["0%", "-20%", "25%", "0%"], y: ["0%", "-30%", "-10%", "0%"], duration: 19},
];

export interface AuroraPromptCardProps {
    /** Returns the answer for a question. Return a promise while the answer loads. */
    onAsk: (question: string) => string | Promise<string>;
    /** Example questions shown as chips before the first question. */
    suggestions?: string[];
    title?: string;
    /** Small text on the right of the header, such as the workspace name. */
    context?: string;
    intro?: string;
    placeholder?: string;
    thinkingLabel?: string;
    /** Shown when `onAsk` throws or rejects. */
    errorMessage?: string;
    /** Three colors for the drifting light, from top left to bottom. */
    colors?: [string, string, string];
    icon?: ComponentType<{className?: string}>;
    className?: string;
}

/** An assistant prompt with blurred color drifting behind it. The color grows brighter on focus and while an answer loads. */
export const AuroraPromptCard = ({
    onAsk,
    suggestions = [],
    title = "Ask Atlas",
    context,
    intro = "Ask about tickets, docs or experiments. Try one of these:",
    placeholder = "Ask anything about your workspace",
    thinkingLabel = "Searching",
    errorMessage = "Could not get an answer. Try again.",
    colors = ["#22d3ee", "#8b5cf6", "#34d399"],
    icon: Icon = LuSparkles,
    className = "",
}: AuroraPromptCardProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref);
    const reduceMotion = useReducedMotion();
    const [prompt, setPrompt] = useState("");
    const [focused, setFocused] = useState(false);
    const [phase, setPhase] = useState<Phase>("idle");
    const [asked, setAsked] = useState("");
    const [answer, setAnswer] = useState("");
    const requestRef = useRef(0);
    const inputId = useId();
    const drifting = inView && !reduceMotion;

    // Bumping the counter on unmount makes any answer still in flight get ignored.
    useEffect(() => () => {
        requestRef.current += 1;
    }, []);

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const question = prompt.trim();
        if (!question || phase === "thinking") return;
        const request = ++requestRef.current;
        setAsked(question);
        setPhase("thinking");
        setPrompt("");
        const finish = (text: string) => {
            if (request !== requestRef.current) return;
            setAnswer(text);
            setPhase("answered");
        };
        new Promise<string>((resolve) => resolve(onAsk(question))).then(finish, () => finish(errorMessage));
    };

    return (
        <div ref={ref} className={`relative w-full max-w-lg py-6 ${className}`}>
            <div className="relative">
                <motion.div
                    aria-hidden="true"
                    animate={{opacity: focused || phase === "thinking" ? 0.9 : 0.5, scale: focused ? 1.02 : 1}}
                    transition={{duration: 0.6, ease: [0.16, 1, 0.3, 1]}}
                    className="pointer-events-none absolute -inset-3 overflow-hidden rounded-[36px] blur-2xl"
                >
                    {blobs.map((blob, index) => (
                        <motion.span
                            key={blob.className}
                            className={`absolute rounded-full opacity-80 ${blob.className}`}
                            style={{backgroundColor: colors[index]}}
                            animate={drifting ? {x: blob.x, y: blob.y} : {x: "0%", y: "0%"}}
                            transition={drifting ? {duration: blob.duration, repeat: Infinity, ease: "easeInOut"} : {duration: 1.2}}
                        />
                    ))}
                </motion.div>

                <div className="relative rounded-3xl bg-white/40 p-px dark:bg-white/10">
                    <div className="rounded-[23px] bg-white/95 p-5 backdrop-blur-xl sm:p-6 dark:bg-slate-950/90">
                        <div className="flex items-center gap-2.5">
                            <span
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-white"
                                style={{backgroundImage: `linear-gradient(to bottom right, ${colors[0]}, ${colors[1]}, ${colors[2]})`}}
                            >
                                <Icon className="h-4 w-4" aria-hidden="true"/>
                            </span>
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{title}</h3>
                            {context && <span className="ml-auto text-xs text-gray-500 dark:text-slate-400">{context}</span>}
                        </div>

                        <div aria-live="polite" className="mt-4 min-h-[6.5rem] text-sm leading-6">
                            <AnimatePresence mode="wait">
                                {phase === "idle" && (
                                    <motion.div key="idle" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                                        <p className="text-gray-600 dark:text-slate-300">{intro}</p>
                                        {suggestions.length > 0 && (
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
                                        )}
                                    </motion.div>
                                )}
                                {phase === "thinking" && (
                                    <motion.div key="thinking" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                                        <p className="font-medium text-gray-900 dark:text-white">{asked}</p>
                                        <p className="mt-2 flex items-center gap-1.5 text-gray-500 dark:text-slate-400">
                                            {thinkingLabel}
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
                                    placeholder={placeholder}
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
