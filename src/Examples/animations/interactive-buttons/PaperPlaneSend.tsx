import {useEffect, useId, useRef, useState} from "react";
import type {FormEvent, MouseEvent} from "react";
import {AnimatePresence, motion, MotionConfig} from "framer-motion";
import {LuCheck, LuSend} from "react-icons/lu";

export type SendStatus = "idle" | "sending" | "sent";

export interface PaperPlaneButtonProps {
    /** "sending" launches the plane, "sent" shows the confirmation, "idle" glides a new plane in. */
    status: SendStatus;
    disabled?: boolean;
    sendLabel?: string;
    sendingLabel?: string;
    sentLabel?: string;
    type?: "button" | "submit";
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    className?: string;
}

// When the status turns to "sending", the paper plane leaves the button along a curved path
// while a trail fades behind it. "sent" confirms the send and "idle" brings a fresh plane back in.
export const PaperPlaneButton = ({
    status,
    disabled = false,
    sendLabel = "Send",
    sendingLabel = "Sending",
    sentLabel = "Sent",
    type = "submit",
    onClick,
    className = "",
}: PaperPlaneButtonProps) => {
    // Counts launches so each send mounts a new plane, even if the last one is still leaving.
    const [flight, setFlight] = useState(0);
    const [previousStatus, setPreviousStatus] = useState(status);
    if (status !== previousStatus) {
        setPreviousStatus(status);
        if (status === "sending") setFlight((value) => value + 1);
    }

    return (
        <MotionConfig reducedMotion="user">
            <motion.button
                type={type}
                onClick={onClick}
                disabled={disabled && status === "idle"}
                aria-disabled={status !== "idle"}
                whileTap={status === "idle" && !disabled ? {scale: 0.94} : undefined}
                animate={{backgroundColor: status === "sent" ? "#10b981" : "#4f46e5"}}
                transition={{duration: 0.3}}
                className={`relative inline-flex h-10 w-[104px] items-center justify-center overflow-visible rounded-full text-sm font-medium text-white shadow-md shadow-indigo-500/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40 dark:shadow-black/40 dark:focus-visible:ring-offset-slate-900 ${className}`}
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
                                {sentLabel}
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
                                {status === "sending" ? sendingLabel : sendLabel}
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
        </MotionConfig>
    );
};

export interface Recipient {
    name: string;
    initials: string;
    /** Background classes for the avatar chip. */
    avatarClassName?: string;
}

export interface PaperPlaneSendProps {
    recipient: Recipient;
    /** Text already in the message box when the composer first renders. */
    defaultMessage?: string;
    /** Called with the message when it is sent. The composer clears itself afterwards. */
    onSend?: (message: string) => void;
    placeholder?: string;
    toLabel?: string;
    className?: string;
}

// An email composer whose send button launches a paper plane, confirms the send,
// then clears the message and glides a new plane back in.
export const PaperPlaneSend = ({
    recipient,
    defaultMessage = "",
    onSend,
    placeholder = "Write a message",
    toLabel = "To",
    className = "",
}: PaperPlaneSendProps) => {
    const [message, setMessage] = useState(defaultMessage);
    const [status, setStatus] = useState<SendStatus>("idle");
    const timers = useRef<number[]>([]);
    const messageId = useId();

    useEffect(() => () => timers.current.forEach((timer) => window.clearTimeout(timer)), []);

    const send = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (status !== "idle" || !message.trim()) return;
        setStatus("sending");
        onSend?.(message);
        timers.current.push(window.setTimeout(() => setStatus("sent"), 900));
        timers.current.push(window.setTimeout(() => {
            setStatus("idle");
            setMessage("");
        }, 2600));
    };

    const empty = !message.trim();

    return (
        <MotionConfig reducedMotion="user">
            <form onSubmit={send} className={`w-full max-w-md rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900 ${className}`}>
                <div className="flex items-center gap-2 border-b border-gray-100 px-4 py-3 text-sm dark:border-slate-800">
                    <span className="text-gray-400 dark:text-slate-500">{toLabel}</span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 py-0.5 pl-0.5 pr-2.5 text-gray-800 dark:bg-slate-800 dark:text-slate-100">
                        <span
                            aria-hidden="true"
                            className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-semibold text-white ${recipient.avatarClassName ?? "bg-gradient-to-br from-fuchsia-400 to-rose-500"}`}
                        >
                            {recipient.initials}
                        </span>
                        {recipient.name}
                    </span>
                </div>
                <label htmlFor={messageId} className="sr-only">Message</label>
                <textarea
                    id={messageId}
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    rows={3}
                    placeholder={placeholder}
                    disabled={status !== "idle"}
                    className="block w-full resize-none bg-transparent px-4 py-3 text-sm leading-6 text-gray-800 placeholder:text-gray-400 focus:outline-none disabled:opacity-60 dark:text-slate-100 dark:placeholder:text-slate-500"
                />
                <div className="flex items-center justify-between gap-3 px-3 pb-3">
                    <p className="pl-1 text-xs text-gray-400 dark:text-slate-500" aria-live="polite">
                        {status === "sent" ? `Sent to ${recipient.name}` : `${message.length} characters`}
                    </p>

                    <PaperPlaneButton status={status} disabled={empty}/>
                </div>
            </form>
        </MotionConfig>
    );
};
