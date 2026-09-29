import {useEffect, useId, useRef, useState} from "react";
import type {FormEvent} from "react";
import {AnimatePresence, motion, useInView, useReducedMotion} from "framer-motion";
import {LuArrowUp, LuSparkles} from "react-icons/lu";

const prompts = [
    "summarize this contract in plain English",
    "draft a friendly reply to Maya",
    "find every invoice over $5,000 from June",
    "turn these notes into a project brief",
];

type Phase = "typing" | "holding" | "deleting";

// A prompt box whose placeholder types out example requests, holds, then deletes them.
// It stops as soon as the field has focus or text, and while it is off screen.
const TypewriterPrompt = () => {
    const ref = useRef<HTMLFormElement>(null);
    const inView = useInView(ref);
    const reduceMotion = useReducedMotion();
    const [value, setValue] = useState("");
    const [focused, setFocused] = useState(false);
    const [sent, setSent] = useState<string | null>(null);
    const [prompt, setPrompt] = useState(0);
    const [length, setLength] = useState(0);
    const [phase, setPhase] = useState<Phase>("typing");
    const inputId = useId();

    const idle = inView && !focused && !value;
    const text = prompts[prompt];

    useEffect(() => {
        if (!idle) return;

        // With reduced motion, whole suggestions swap in place instead of being typed.
        if (reduceMotion) {
            const timer = window.setTimeout(() => setPrompt((index) => (index + 1) % prompts.length), 3000);
            return () => window.clearTimeout(timer);
        }

        let delay: number;
        let next: () => void;
        if (phase === "typing") {
            if (length < text.length) {
                // Slightly uneven timing reads as a person typing, and spaces come a touch faster.
                delay = text[length] === " " ? 40 : 45 + Math.random() * 55;
                next = () => setLength((count) => count + 1);
            } else {
                delay = 0;
                next = () => setPhase("holding");
            }
        } else if (phase === "holding") {
            delay = 1800;
            next = () => setPhase("deleting");
        } else if (length > 0) {
            delay = 22;
            next = () => setLength((count) => count - 1);
        } else {
            delay = 350;
            next = () => {
                setPrompt((index) => (index + 1) % prompts.length);
                setPhase("typing");
            };
        }
        const timer = window.setTimeout(next, delay);
        return () => window.clearTimeout(timer);
    }, [idle, reduceMotion, phase, length, text]);

    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!value.trim()) return;
        setSent(value.trim());
        setValue("");
    };

    const shown = reduceMotion ? text : text.slice(0, length);

    return (
        <div className="w-full max-w-xl">
            <form
                ref={ref}
                onSubmit={submit}
                className="group relative flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-2 pl-4 shadow-lg shadow-gray-900/5 transition focus-within:border-violet-400 focus-within:ring-4 focus-within:ring-violet-500/10 dark:border-slate-700 dark:bg-slate-900 dark:shadow-black/30 dark:focus-within:border-violet-500"
            >
                <LuSparkles className="h-5 w-5 shrink-0 text-violet-500 dark:text-violet-400" aria-hidden="true"/>
                <div className="relative min-w-0 flex-1">
                    <label htmlFor={inputId} className="sr-only">Ask Atlas anything</label>
                    <input
                        id={inputId}
                        value={value}
                        onChange={(event) => setValue(event.target.value)}
                        onFocus={() => setFocused(true)}
                        onBlur={() => setFocused(false)}
                        autoComplete="off"
                        className="relative z-10 h-10 w-full bg-transparent text-[15px] text-gray-900 focus:outline-none dark:text-white"
                    />
                    {/* The animated placeholder. Screen readers get the label instead. */}
                    {!value && (
                        <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center overflow-hidden whitespace-nowrap text-[15px] text-gray-400 dark:text-slate-500">
                            {focused ? (
                                "Ask Atlas anything"
                            ) : (
                                <>
                                    <span className="text-gray-500 dark:text-slate-400">Ask Atlas to&nbsp;</span>
                                    <span className="truncate">{shown}</span>
                                    <motion.span
                                        className="ml-px inline-block h-5 w-[2px] shrink-0 rounded-full bg-violet-500 dark:bg-violet-400"
                                        animate={phase === "holding" && !reduceMotion ? {opacity: [1, 1, 0, 0]} : {opacity: 1}}
                                        transition={phase === "holding" ? {duration: 1, repeat: Infinity, times: [0, 0.5, 0.5, 1]} : {duration: 0}}
                                    />
                                </>
                            )}
                        </div>
                    )}
                </div>
                <button
                    type="submit"
                    disabled={!value.trim()}
                    aria-label="Send"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-white transition hover:bg-violet-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:bg-gray-200 disabled:text-gray-400 dark:focus-visible:ring-offset-slate-900 dark:disabled:bg-slate-800 dark:disabled:text-slate-500"
                >
                    <LuArrowUp className="h-5 w-5" aria-hidden="true"/>
                </button>
            </form>

            <div className="mt-4 flex h-6 justify-center" aria-live="polite">
                <AnimatePresence>
                    {sent && (
                        <motion.p
                            key={sent}
                            initial={{opacity: 0, y: 6}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0}}
                            className="truncate text-sm text-gray-500 dark:text-slate-400"
                        >
                            Atlas is working on "{sent}"
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default TypewriterPrompt;
