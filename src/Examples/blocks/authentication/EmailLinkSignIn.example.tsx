import {useEffect, useRef, useState} from "react";
import type {FormEvent} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {LuArrowLeft, LuArrowRight, LuLoader, LuMail, LuRefreshCw} from "react-icons/lu";

type Step = "email" | "sent";

const RESEND_SECONDS = 30;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EmailLinkSignIn = () => {
    const reduce = useReducedMotion();
    const [step, setStep] = useState<Step>("email");
    const [email, setEmail] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [sending, setSending] = useState(false);
    const [cooldown, setCooldown] = useState(0);
    const [resent, setResent] = useState(false);
    const timer = useRef<number | undefined>(undefined);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => () => window.clearTimeout(timer.current), []);

    // Count down one second at a time while a resend is blocked.
    useEffect(() => {
        if (cooldown <= 0) return;
        const id = window.setTimeout(() => setCooldown((c) => c - 1), 1000);
        return () => window.clearTimeout(id);
    }, [cooldown]);

    const send = (event?: FormEvent<HTMLFormElement>) => {
        event?.preventDefault();
        if (!emailPattern.test(email.trim())) {
            setError(email.trim() ? "That does not look like a full email address." : "Enter the email you use for Fieldnote.");
            inputRef.current?.focus();
            return;
        }
        setError(null);
        setSending(true);
        // Replace with a request that emails a one-time sign-in link.
        timer.current = window.setTimeout(() => {
            setSending(false);
            setResent(step === "sent");
            setStep("sent");
            setCooldown(RESEND_SECONDS);
        }, 900);
    };

    const domain = email.split("@")[1]?.toLowerCase() ?? "";
    const inbox = domain.includes("gmail")
        ? {label: "Open Gmail", href: "https://mail.google.com"}
        : domain.includes("outlook") || domain.includes("hotmail")
            ? {label: "Open Outlook", href: "https://outlook.live.com"}
            : null;

    return (
        <section className="relative flex min-h-[640px] w-full items-center justify-center overflow-hidden bg-slate-50 px-4 py-16 dark:bg-slate-950">
            <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_0%,rgb(99_102_241/0.18),transparent)] dark:bg-[radial-gradient(60%_50%_at_50%_0%,rgb(99_102_241/0.25),transparent)]"/>
            <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_right,rgb(148_163_184/0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgb(148_163_184/0.12)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"/>

            <div className="relative w-full max-w-sm">
                <div className="flex justify-center">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-b from-indigo-500 to-indigo-700 text-white shadow-lg shadow-indigo-600/30 ring-1 ring-inset ring-white/20">
                        <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
                            <path d="M6 4h9l3 3v13H6z" fill="currentColor" fillOpacity="0.35"/>
                            <path d="M9 10h6M9 13.5h6M9 17h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                        </svg>
                    </span>
                </div>

                <div className="mt-6 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-xl shadow-slate-900/5 backdrop-blur sm:p-8 dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-none">
                    <AnimatePresence mode="wait" initial={false}>
                        {step === "email" ? (
                            <motion.div key="email"
                                        initial={reduce ? {opacity: 0} : {opacity: 0, x: -16}}
                                        animate={{opacity: 1, x: 0}}
                                        exit={reduce ? {opacity: 0} : {opacity: 0, x: -16}}
                                        transition={{duration: 0.2}}>
                                <h1 className="text-center text-xl font-semibold tracking-tight text-slate-900 dark:text-white">Sign in to Fieldnote</h1>
                                <p className="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">
                                    No password needed. We will email you a link that signs you in.
                                </p>
                                <form onSubmit={send} noValidate className="mt-6">
                                    <label htmlFor="email-link-email" className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                                    <div className="relative mt-1.5">
                                        <LuMail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true"/>
                                        <input ref={inputRef} id="email-link-email" type="email" autoComplete="email" inputMode="email"
                                               value={email} placeholder="you@company.com"
                                               onChange={(e) => { setEmail(e.target.value); setError(null); }}
                                               aria-invalid={error ? true : undefined}
                                               aria-describedby={error ? "email-link-error" : undefined}
                                               className={`w-full rounded-xl border bg-white py-2.5 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 transition-shadow focus:outline-none focus:ring-4 dark:bg-slate-950 dark:text-white ${error
                                                   ? "border-rose-400 focus:ring-rose-500/10"
                                                   : "border-slate-300 focus:border-indigo-500 focus:ring-indigo-500/10 dark:border-slate-700"}`}/>
                                    </div>
                                    {error && <p id="email-link-error" className="mt-1.5 text-sm text-rose-600 dark:text-rose-400">{error}</p>}
                                    <button type="submit" disabled={sending}
                                            className="group mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm outline-none transition-colors hover:bg-indigo-500 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-75 dark:focus-visible:ring-offset-slate-900">
                                        {sending ? <LuLoader className="h-4 w-4 animate-spin" aria-hidden="true"/> : null}
                                        {sending ? "Sending link" : "Email me a sign-in link"}
                                        {!sending && <LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true"/>}
                                    </button>
                                </form>
                                <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
                                    Prefer a password? <a href="#" className="rounded font-medium text-indigo-600 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-indigo-400">Sign in with password</a>
                                </p>
                            </motion.div>
                        ) : (
                            <motion.div key="sent"
                                        initial={reduce ? {opacity: 0} : {opacity: 0, x: 16}}
                                        animate={{opacity: 1, x: 0}}
                                        exit={reduce ? {opacity: 0} : {opacity: 0, x: 16}}
                                        transition={{duration: 0.2}}
                                        className="text-center">
                                <div className="relative mx-auto h-20 w-24" aria-hidden="true">
                                    <motion.svg viewBox="0 0 96 80" className="h-full w-full"
                                                initial={reduce ? false : {y: 8, opacity: 0}} animate={{y: 0, opacity: 1}}
                                                transition={{type: "spring", stiffness: 260, damping: 18}}>
                                        <rect x="8" y="22" width="80" height="52" rx="8" className="fill-indigo-100 dark:fill-indigo-500/20"/>
                                        <motion.g initial={reduce ? false : {y: 22}} animate={{y: 0}} transition={{delay: 0.2, type: "spring", stiffness: 200, damping: 16}}>
                                            <rect x="20" y="8" width="56" height="44" rx="5" className="fill-white stroke-indigo-200 dark:fill-slate-800 dark:stroke-indigo-500/40"/>
                                            <path d="M30 22h36M30 30h24" strokeWidth="4" strokeLinecap="round" className="stroke-indigo-300 dark:stroke-indigo-400/60"/>
                                        </motion.g>
                                        <path d="M8 34 48 56 88 34v32a8 8 0 0 1-8 8H16a8 8 0 0 1-8-8Z" className="fill-indigo-500 dark:fill-indigo-500"/>
                                    </motion.svg>
                                </div>
                                <h1 className="mt-5 text-xl font-semibold tracking-tight text-slate-900 dark:text-white">Check your email</h1>
                                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                                    We sent a sign-in link to <span className="font-medium text-slate-900 dark:text-white">{email.trim()}</span>.
                                    It expires in 15 minutes.
                                </p>

                                {inbox && (
                                    <a href={inbox.href} target="_blank" rel="noreferrer"
                                       className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white outline-none transition-colors hover:bg-slate-700 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 dark:focus-visible:ring-offset-slate-900">
                                        {inbox.label}
                                    </a>
                                )}

                                <div className="mt-6 rounded-xl bg-slate-50 p-4 text-left text-sm dark:bg-slate-950/60">
                                    <p className="font-medium text-slate-700 dark:text-slate-300">Did not get it?</p>
                                    <p className="mt-1 text-slate-500 dark:text-slate-400">Check spam, or send another link.</p>
                                    <button type="button" onClick={() => send()} disabled={cooldown > 0 || sending}
                                            className="mt-3 inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 outline-none transition-colors hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800">
                                        <LuRefreshCw className={`h-3.5 w-3.5 ${sending ? "animate-spin" : ""}`} aria-hidden="true"/>
                                        {cooldown > 0 ? `Resend in 0:${String(cooldown).padStart(2, "0")}` : "Resend link"}
                                    </button>
                                    <p role="status" className="mt-2 min-h-[1rem] text-xs text-emerald-600 dark:text-emerald-400">
                                        {resent && cooldown > RESEND_SECONDS - 5 ? "A new link is on its way." : ""}
                                    </p>
                                </div>

                                <button type="button" onClick={() => { setStep("email"); setResent(false); }}
                                        className="mt-4 inline-flex items-center gap-1.5 rounded text-sm font-medium text-slate-600 outline-none hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-slate-400 dark:hover:text-white">
                                    <LuArrowLeft className="h-4 w-4" aria-hidden="true"/> Use a different email
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <p className="mt-6 text-center text-xs text-slate-500 dark:text-slate-400">
                    By continuing you agree to the <a href="#" className="rounded underline underline-offset-2 outline-none hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-indigo-500 dark:hover:text-white">Terms</a> and{" "}
                    <a href="#" className="rounded underline underline-offset-2 outline-none hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-indigo-500 dark:hover:text-white">Privacy Policy</a>.
                </p>
            </div>
        </section>
    );
};

export default EmailLinkSignIn;
