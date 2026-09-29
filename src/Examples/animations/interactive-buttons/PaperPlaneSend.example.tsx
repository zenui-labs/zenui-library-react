import {useEffect, useId, useRef, useState} from "react";
import type {FormEvent} from "react";
import {AnimatePresence, motion, MotionConfig} from "framer-motion";
import {LuCheck, LuSend} from "react-icons/lu";

type Status = "idle" | "sending" | "sent";

// Sending launches the paper plane out of the button along a curved path while a trail fades behind it.
// The button then confirms the send and a fresh plane glides back in.
const PaperPlaneSend = () => {
    const [message, setMessage] = useState("Hi Maya, the revised floor plans are attached. Could you check the kitchen layout before Friday?");
    const [status, setStatus] = useState<Status>("idle");
    const [flight, setFlight] = useState(0);
    const timers = useRef<number[]>([]);
    const messageId = useId();

    useEffect(() => () => timers.current.forEach((timer) => window.clearTimeout(timer)), []);

    const send = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (status !== "idle" || !message.trim()) return;
        setStatus("sending");
        setFlight((value) => value + 1);
        timers.current.push(window.setTimeout(() => setStatus("sent"), 900));
        timers.current.push(window.setTimeout(() => {
            setStatus("idle");
            setMessage("");
        }, 2600));
    };

    const empty = !message.trim();

    return (
        <MotionConfig reducedMotion="user">
            <form onSubmit={send} className="w-full max-w-md rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center gap-2 border-b border-gray-100 px-4 py-3 text-sm dark:border-slate-800">
                    <span className="text-gray-400 dark:text-slate-500">To</span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 py-0.5 pl-0.5 pr-2.5 text-gray-800 dark:bg-slate-800 dark:text-slate-100">
                        <span aria-hidden="true" className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-fuchsia-400 to-rose-500 text-[10px] font-semibold text-white">MC</span>
                        Maya Chen
                    </span>
                </div>
                <label htmlFor={messageId} className="sr-only">Message</label>
                <textarea
                    id={messageId}
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    rows={3}
                    placeholder="Write a message"
                    disabled={status !== "idle"}
                    className="block w-full resize-none bg-transparent px-4 py-3 text-sm leading-6 text-gray-800 placeholder:text-gray-400 focus:outline-none disabled:opacity-60 dark:text-slate-100 dark:placeholder:text-slate-500"
                />
                <div className="flex items-center justify-between gap-3 px-3 pb-3">
                    <p className="pl-1 text-xs text-gray-400 dark:text-slate-500" aria-live="polite">
                        {status === "sent" ? "Sent to Maya Chen" : `${message.length} characters`}
                    </p>

                    <motion.button
                        type="submit"
                        disabled={empty && status === "idle"}
                        aria-disabled={status !== "idle"}
                        whileTap={status === "idle" && !empty ? {scale: 0.94} : undefined}
                        animate={{backgroundColor: status === "sent" ? "#10b981" : "#4f46e5"}}
                        transition={{duration: 0.3}}
                        className="relative inline-flex h-10 w-[104px] items-center justify-center overflow-visible rounded-full text-sm font-medium text-white shadow-md shadow-indigo-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40 dark:shadow-black/40 dark:focus-visible:ring-offset-slate-900"
                    >
                        <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
                            <AnimatePresence initial={false} mode="popLayout">
                                {status === "sent" ? (
                                    <motion.span
                                        key="sent"
                                        initial={{y: 20, opacity: 0}}
                                        animate={{y: 0, opacity: 1}}
                                        exit={{y: -20, opacity: 0}}
                                        transition={{type: "spring", stiffness: 400, damping: 28}}
                                        className="absolute inset-0 flex items-center justify-center gap-1.5"
                                    >
                                        <LuCheck className="h-4 w-4" aria-hidden="true"/>
                                        Sent
                                    </motion.span>
                                ) : (
                                    <motion.span
                                        key="send"
                                        initial={{y: 20, opacity: 0}}
                                        animate={{y: 0, opacity: status === "sending" ? 0.85 : 1}}
                                        exit={{y: -20, opacity: 0}}
                                        transition={{type: "spring", stiffness: 400, damping: 28}}
                                        className="absolute inset-0 flex items-center justify-center gap-2 pl-1"
                                    >
                                        {status === "sending" ? "Sending" : "Send"}
                                        {status === "idle" && (
                                            <motion.span
                                                initial={{x: -18, y: 10, opacity: 0, rotate: -20}}
                                                animate={{x: 0, y: 0, opacity: 1, rotate: 0}}
                                                transition={{type: "spring", stiffness: 260, damping: 18, delay: 0.1}}
                                                className="inline-flex"
                                            >
                                                <LuSend className="h-4 w-4" aria-hidden="true"/>
                                            </motion.span>
                                        )}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </span>

                        {/* The plane that flies away is drawn outside the clipped area so it can leave the button. */}
                        <AnimatePresence>
                            {status === "sending" && (
                                <motion.span key={flight} aria-hidden="true" className="pointer-events-none absolute right-5 top-3">
                                    <motion.span
                                        className="absolute right-2 top-2 h-px w-14 origin-right bg-gradient-to-l from-indigo-400 to-transparent"
                                        initial={{scaleX: 0, opacity: 0, rotate: -35}}
                                        animate={{scaleX: [0, 1, 1], opacity: [0, 0.9, 0], x: [0, 30, 90], y: [0, -24, -70]}}
                                        transition={{duration: 0.9, ease: "easeIn"}}
                                    />
                                    <motion.span
                                        className="block text-indigo-500 dark:text-indigo-300"
                                        initial={{x: 0, y: 0, rotate: 0, scale: 1}}
                                        animate={{x: [0, -6, 40, 120], y: [0, 4, -30, -90], rotate: [0, -12, 8, 18], scale: [1, 0.95, 1.1, 0.7], opacity: [1, 1, 1, 0]}}
                                        transition={{duration: 0.9, times: [0, 0.18, 0.55, 1], ease: "easeIn"}}
                                    >
                                        <LuSend className="h-4 w-4"/>
                                    </motion.span>
                                </motion.span>
                            )}
                        </AnimatePresence>
                    </motion.button>
                </div>
            </form>
        </MotionConfig>
    );
};

export default PaperPlaneSend;
