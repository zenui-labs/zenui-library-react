import {useEffect, useId, useState} from "react";
import type {ChangeEvent, FormEvent} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {LuArrowRight, LuCheck, LuLoader} from "react-icons/lu";

type Status = "idle" | "submitting" | "done";

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

export interface WaitlistAvatar {
    initials: string;
    /** Tailwind background class for the circle, for example "bg-rose-400". */
    color: string;
}

const getTimeLeft = (target: number): TimeLeft => {
    const diff = Math.max(0, target - Date.now());
    return {
        days: Math.floor(diff / 86_400_000),
        hours: Math.floor((diff / 3_600_000) % 24),
        minutes: Math.floor((diff / 60_000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
    };
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface WaitlistLaunchProps {
    /** Launch moment as a Date or a timestamp in milliseconds. */
    launchAt: Date | number;
    /** People already on the list. The confirmation shows the next number. */
    joinedCount: number;
    /** Faces shown next to the count. Five fit well. */
    avatars: WaitlistAvatar[];
    /** Called with the trimmed email. Return a promise to show the loading state until it settles. */
    onSubmit?: (email: string) => void | Promise<unknown>;
    badge?: string;
    title?: string;
    description?: string;
    buttonLabel?: string;
    placeholder?: string;
    invalidEmailMessage?: string;
    failedMessage?: string;
    /** Text after the count, for example "researchers already joined". */
    joinedLabel?: string;
    className?: string;
}

/** A pre-launch section with a live countdown, a validated email form and a confirmation state. */
export const WaitlistLaunch = ({
    launchAt,
    joinedCount,
    avatars,
    onSubmit,
    badge = "Private beta opens soon",
    title = "Fieldnote is almost ready",
    description = "A research notebook that turns interview recordings into tagged, searchable highlights. Join the list and we will send your invite on launch day.",
    buttonLabel = "Join waitlist",
    placeholder = "you@company.com",
    invalidEmailMessage = "Enter an email address like name@company.com",
    failedMessage = "We could not add you to the list. Try again in a moment.",
    joinedLabel = "researchers already joined",
    className = "",
}: WaitlistLaunchProps) => {
    const target = typeof launchAt === "number" ? launchAt : launchAt.getTime();
    const inputId = useId();
    const errorId = useId();
    const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => getTimeLeft(target));
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [status, setStatus] = useState<Status>("idle");

    useEffect(() => {
        setTimeLeft(getTimeLeft(target));
        const timer = window.setInterval(() => setTimeLeft(getTimeLeft(target)), 1000);
        return () => window.clearInterval(timer);
    }, [target]);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const value = email.trim();
        if (!emailPattern.test(value)) {
            setError(invalidEmailMessage);
            return;
        }
        setError("");
        setStatus("submitting");
        try {
            await onSubmit?.(value);
            setStatus("done");
        } catch {
            setStatus("idle");
            setError(failedMessage);
        }
    };

    const units: {label: string; value: number}[] = [
        {label: "Days", value: timeLeft.days},
        {label: "Hours", value: timeLeft.hours},
        {label: "Minutes", value: timeLeft.minutes},
        {label: "Seconds", value: timeLeft.seconds},
    ];

    return (
        <section className={`relative w-full overflow-hidden bg-white px-4 py-20 sm:px-8 dark:bg-slate-950 ${className}`}>
            {/* Concentric rings */}
            <svg aria-hidden="true" viewBox="0 0 800 800"
                 className="pointer-events-none absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 text-slate-200 dark:text-slate-800">
                {[120, 200, 280, 360].map((r) => (
                    <circle key={r} cx="400" cy="400" r={r} fill="none" stroke="currentColor" strokeDasharray={r === 200 ? "4 8" : undefined}/>
                ))}
            </svg>
            <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/20 blur-3xl dark:bg-emerald-500/15"/>

            <div className="relative mx-auto max-w-xl text-center">
                {badge && (
                    <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium text-slate-600 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"/>
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"/>
                        </span>
                        {badge}
                    </p>
                )}
                <h2 className="mt-5 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl dark:text-white">
                    {title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">
                    {description}
                </p>

                <div className="mt-8 flex justify-center gap-3" role="timer" aria-label="Time until launch">
                    {units.map((unit) => (
                        <div key={unit.label}
                             className="w-[72px] rounded-2xl border border-slate-200 bg-white/80 py-3 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
                            <p className="text-2xl font-semibold tabular-nums text-slate-900 dark:text-white">
                                {String(unit.value).padStart(2, "0")}
                            </p>
                            <p className="text-[11px] uppercase tracking-wider text-slate-500">{unit.label}</p>
                        </div>
                    ))}
                </div>

                <div className="mx-auto mt-8 max-w-md">
                    <AnimatePresence mode="wait" initial={false}>
                        {status === "done" ? (
                            <motion.div key="done"
                                        initial={{opacity: 0, scale: 0.96}}
                                        animate={{opacity: 1, scale: 1}}
                                        className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-left dark:border-emerald-500/30 dark:bg-emerald-500/10"
                                        role="status">
                                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                                    <LuCheck className="h-5 w-5"/>
                                </span>
                                <div>
                                    <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-200">
                                        You are number {(joinedCount + 1).toLocaleString("en-US")} on the list
                                    </p>
                                    <p className="text-sm text-emerald-700 dark:text-emerald-300/80">We sent a confirmation to {email.trim()}.</p>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.form key="form" onSubmit={handleSubmit} noValidate exit={{opacity: 0, scale: 0.96}}>
                                <label htmlFor={inputId} className="sr-only">Work email</label>
                                <div className={`flex gap-2 rounded-2xl border bg-white p-1.5 shadow-sm transition-shadow focus-within:ring-4 dark:bg-slate-900 ${error
                                    ? "border-rose-300 focus-within:ring-rose-500/10 dark:border-rose-500/50"
                                    : "border-slate-200 focus-within:border-slate-300 focus-within:ring-slate-900/5 dark:border-slate-800 dark:focus-within:ring-white/5"}`}>
                                    <input
                                        id={inputId}
                                        type="email"
                                        autoComplete="email"
                                        value={email}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                            setEmail(e.target.value);
                                            if (error) setError("");
                                        }}
                                        placeholder={placeholder}
                                        aria-invalid={error ? true : undefined}
                                        aria-describedby={error ? errorId : undefined}
                                        className="min-w-0 flex-1 bg-transparent px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-white"
                                    />
                                    <button
                                        type="submit"
                                        disabled={status === "submitting"}
                                        className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white outline-none transition-colors hover:bg-slate-700 focus-visible:ring-2 focus-visible:ring-emerald-500 disabled:opacity-70 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200"
                                    >
                                        {status === "submitting" ? <LuLoader className="h-4 w-4 animate-spin"/> : null}
                                        {buttonLabel}
                                        {status === "idle" ? <LuArrowRight className="h-4 w-4"/> : null}
                                    </button>
                                </div>
                                {error && <p id={errorId} className="mt-2 text-left text-sm text-rose-600 dark:text-rose-400">{error}</p>}
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>

                <div className="mt-8 flex items-center justify-center gap-3">
                    <div className="flex -space-x-2">
                        {avatars.map((a) => (
                            <span key={a.initials}
                                  className={`flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-semibold text-white ring-2 ring-white dark:ring-slate-950 ${a.color}`}>
                                {a.initials}
                            </span>
                        ))}
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                        <strong className="font-semibold text-slate-900 dark:text-white">{joinedCount.toLocaleString("en-US")}</strong> {joinedLabel}
                    </p>
                </div>
            </div>
        </section>
    );
};
