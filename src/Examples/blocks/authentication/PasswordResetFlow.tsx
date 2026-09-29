import {useEffect, useId, useRef, useState} from "react";
import type {FormEvent} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {LuArrowLeft, LuCheck, LuEye, LuEyeOff, LuLoader, LuLock, LuMail, LuMailOpen, LuX} from "react-icons/lu";

/** 0 find your account, 1 check your inbox, 2 choose a password, 3 done. */
export type ResetStep = 0 | 1 | 2 | 3;

export interface ResetStepLabel {
    title: string;
    hint: string;
}

export interface ResetPasswordRule {
    label: string;
    /** Returns true when the password meets this rule. */
    test: (value: string) => boolean;
}

export interface PasswordResetFlowProps {
    /** Sends the reset email. Reject with an Error to show its message under the email field. */
    onRequestLink?: (email: string) => Promise<void> | void;
    /** Saves the new password. Reject with an Error to show its message above the save button. */
    onSavePassword?: (password: string, options: {signOutOthers: boolean}) => Promise<void> | void;
    /** Rules the new password must pass before it can be saved. */
    rules?: ResetPasswordRule[];
    /** Titles and hints for the four steps in the rail. */
    steps?: [ResetStepLabel, ResetStepLabel, ResetStepLabel, ResetStepLabel];
    /** Start on the password step when the page opens from the reset link. */
    defaultStep?: ResetStep;
    defaultEmail?: string;
    appName?: string;
    /** Number of other signed in devices, shown on the sign out checkbox. */
    otherDevices?: number;
    /** Shows a panel on the inbox step with a button that opens the password step, for demos and tests. */
    linkShortcut?: boolean;
    /** When set, the done step shows a button with this label that starts over. */
    resetLabel?: string;
    signInHref?: string;
    className?: string;
}

const defaultResetSteps: [ResetStepLabel, ResetStepLabel, ResetStepLabel, ResetStepLabel] = [
    {title: "Find your account", hint: "Enter your email"},
    {title: "Check your inbox", hint: "Open the reset link"},
    {title: "Choose a password", hint: "Make it strong"},
    {title: "All set", hint: "Sign in again"},
];

const defaultResetRules: ResetPasswordRule[] = [
    {label: "At least 12 characters", test: (v) => v.length >= 12},
    {label: "An uppercase and a lowercase letter", test: (v) => /[a-z]/.test(v) && /[A-Z]/.test(v)},
    {label: "A number or symbol", test: (v) => /[\d\W_]/.test(v)},
];

const inputClass = (invalid: boolean) =>
    `w-full rounded-lg border bg-white py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 dark:bg-slate-950 dark:text-white ${invalid
        ? "border-rose-400 focus:ring-rose-500/10"
        : "border-slate-300 focus:border-sky-600 focus:ring-sky-600/10 dark:border-slate-700 dark:focus:border-sky-400"}`;

/** Forgot password, check your inbox, choose a new password and confirmation in one card, with a step rail. */
export const PasswordResetFlow = ({
    onRequestLink,
    onSavePassword,
    rules = defaultResetRules,
    steps = defaultResetSteps,
    defaultStep = 0,
    defaultEmail = "",
    appName = "Northstar",
    otherDevices,
    linkShortcut = false,
    resetLabel,
    signInHref = "#",
    className = "",
}: PasswordResetFlowProps) => {
    const uid = useId();
    const reduce = useReducedMotion();
    const [step, setStep] = useState<ResetStep>(defaultStep);
    const [direction, setDirection] = useState(1);
    const [email, setEmail] = useState(defaultEmail);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [show, setShow] = useState(false);
    const [signOutOthers, setSignOutOthers] = useState(true);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [saveError, setSaveError] = useState<string | null>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const mounted = useRef(true);

    // Skips state updates when a request finishes after the component is gone.
    useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
        };
    }, []);
    // Move focus to the new heading after a step change, but not on first render.
    const moved = useRef(false);
    useEffect(() => {
        if (!moved.current) return;
        // Wait for the outgoing step to finish its exit so the new heading exists.
        const id = window.setTimeout(() => headingRef.current?.focus({preventScroll: true}), 260);
        return () => window.clearTimeout(id);
    }, [step]);

    const go = (next: ResetStep) => {
        moved.current = true;
        setDirection(next > step ? 1 : -1);
        setStep(next);
    };

    // Runs a request with the loading state, then moves on, or passes the error message to `onError`.
    const withLoading = async (next: ResetStep, request: () => Promise<void> | void, onError: (message: string) => void) => {
        setLoading(true);
        try {
            await request();
            if (mounted.current) go(next);
        } catch (error) {
            if (mounted.current) onError(error instanceof Error ? error.message : "Something went wrong. Try again.");
        } finally {
            if (mounted.current) setLoading(false);
        }
    };

    const requestLink = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
            setEmailError("Enter the email address on your account.");
            return;
        }
        void withLoading(1, () => onRequestLink?.(email.trim()), setEmailError);
    };

    const passed = rules.map((r) => r.test(password));
    const allPassed = passed.every(Boolean);
    const matches = confirm.length > 0 && confirm === password;

    const savePassword = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitted(true);
        setSaveError(null);
        if (allPassed && matches) void withLoading(3, () => onSavePassword?.(password, {signOutOthers}), setSaveError);
    };

    const restart = () => {
        setPassword("");
        setConfirm("");
        setSubmitted(false);
        setSaveError(null);
        go(0);
    };

    const offset = reduce ? 0 : 24;

    return (
        <section className={`flex min-h-[680px] w-full items-center justify-center bg-gradient-to-b from-sky-50 to-white px-4 py-14 dark:from-slate-900 dark:to-slate-950 ${className}`}>
            <div className="grid w-full max-w-3xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-sky-900/5 md:grid-cols-[240px_minmax(0,1fr)] dark:border-slate-800 dark:bg-slate-900 dark:shadow-none">
                {/* Step rail */}
                <aside className="border-b border-slate-200 bg-slate-50/80 p-5 md:border-b-0 md:border-r md:p-7 dark:border-slate-800 dark:bg-slate-950/40">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">Reset password</p>
                    <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">Step {step + 1} of {steps.length}</p>
                    <div className="mt-4 h-1 overflow-hidden rounded-full bg-slate-200 md:hidden dark:bg-slate-800" aria-hidden="true">
                        <motion.div className="h-full rounded-full bg-sky-600" animate={{width: `${((step + 1) / steps.length) * 100}%`}}/>
                    </div>
                    <ol className="mt-6 hidden space-y-5 md:block">
                        {steps.map((s, i) => {
                            const done = i < step;
                            const current = i === step;
                            return (
                                <li key={s.title} aria-current={current ? "step" : undefined} className="relative flex gap-3">
                                    {i < steps.length - 1 && (
                                        <span aria-hidden="true" className="absolute left-[13px] top-8 h-[calc(100%_-_4px)] w-px bg-slate-200 dark:bg-slate-800">
                                            <motion.span className="block w-px origin-top bg-sky-600" initial={false} animate={{scaleY: done ? 1 : 0}} style={{height: "100%"}}/>
                                        </span>
                                    )}
                                    <span className={`relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold transition-colors ${done
                                        ? "bg-sky-600 text-white"
                                        : current
                                            ? "bg-white text-sky-700 ring-2 ring-sky-600 dark:bg-slate-900 dark:text-sky-300"
                                            : "bg-white text-slate-400 ring-1 ring-slate-300 dark:bg-slate-900 dark:ring-slate-700"}`}>
                                        {done ? <LuCheck className="h-3.5 w-3.5" aria-hidden="true"/> : i + 1}
                                    </span>
                                    <span className="pt-0.5">
                                        <span className={`block text-sm font-medium ${current || done ? "text-slate-900 dark:text-white" : "text-slate-400"}`}>{s.title}</span>
                                        <span className="block text-xs text-slate-500 dark:text-slate-400">{s.hint}</span>
                                    </span>
                                </li>
                            );
                        })}
                    </ol>
                </aside>

                <div className="relative min-h-[420px] overflow-hidden p-6 sm:p-10">
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div key={step}
                                    initial={{opacity: 0, x: direction * offset}}
                                    animate={{opacity: 1, x: 0}}
                                    exit={{opacity: 0, x: direction * -offset}}
                                    transition={{duration: 0.22, ease: "easeOut"}}>
                            {step === 0 && (
                                <form onSubmit={requestLink} noValidate>
                                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300"><LuLock className="h-5 w-5" aria-hidden="true"/></span>
                                    <h1 ref={headingRef} tabIndex={-1} className="mt-5 text-2xl font-semibold tracking-tight text-slate-900 outline-none dark:text-white">Forgot your password?</h1>
                                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Enter the email you use for {appName} and we will send you a link to choose a new one.</p>
                                    <label htmlFor={`${uid}-email`} className="mt-6 block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                                    <div className="relative mt-1.5">
                                        <LuMail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" aria-hidden="true"/>
                                        <input id={`${uid}-email`} type="email" autoComplete="email" value={email} placeholder="you@company.com"
                                               onChange={(e) => { setEmail(e.target.value); setEmailError(null); }}
                                               aria-invalid={emailError ? true : undefined}
                                               aria-describedby={emailError ? `${uid}-email-error` : undefined}
                                               className={`${inputClass(Boolean(emailError))} pl-9 pr-3`}/>
                                    </div>
                                    {emailError && <p id={`${uid}-email-error`} className="mt-1.5 text-sm text-rose-600 dark:text-rose-400">{emailError}</p>}
                                    <button type="submit" disabled={loading}
                                            className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white outline-none transition-colors hover:bg-sky-700 focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2 disabled:opacity-70 dark:focus-visible:ring-offset-slate-900">
                                        {loading && <LuLoader className="h-4 w-4 animate-spin" aria-hidden="true"/>}
                                        Send reset link
                                    </button>
                                    <a href={signInHref} className="mt-5 inline-flex items-center gap-1.5 rounded text-sm font-medium text-slate-600 outline-none hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-sky-600 dark:text-slate-400 dark:hover:text-white">
                                        <LuArrowLeft className="h-4 w-4" aria-hidden="true"/> Back to sign in
                                    </a>
                                </form>
                            )}

                            {step === 1 && (
                                <div>
                                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-700 dark:bg-sky-500/10 dark:text-sky-300"><LuMailOpen className="h-5 w-5" aria-hidden="true"/></span>
                                    <h1 ref={headingRef} tabIndex={-1} className="mt-5 text-2xl font-semibold tracking-tight text-slate-900 outline-none dark:text-white">Check your inbox</h1>
                                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                                        If an account exists for <span className="font-medium text-slate-900 dark:text-white">{email.trim()}</span>, you will get an email with a reset link in the next minute. The link works for one hour.
                                    </p>
                                    {linkShortcut && (
                                        <div className="mt-6 rounded-xl border border-dashed border-slate-300 p-4 dark:border-slate-700">
                                            <p className="text-xs font-medium uppercase tracking-wider text-slate-400">Demo only</p>
                                            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">In your app the link opens the next step. Here, use this button.</p>
                                            <button type="button" onClick={() => go(2)}
                                                    className="mt-3 rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white outline-none hover:bg-slate-700 focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 dark:focus-visible:ring-offset-slate-900">
                                                Open the reset link
                                            </button>
                                        </div>
                                    )}
                                    <button type="button" onClick={() => go(0)}
                                            className="mt-6 inline-flex items-center gap-1.5 rounded text-sm font-medium text-slate-600 outline-none hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-sky-600 dark:text-slate-400 dark:hover:text-white">
                                        <LuArrowLeft className="h-4 w-4" aria-hidden="true"/> Try a different email
                                    </button>
                                </div>
                            )}

                            {step === 2 && (
                                <form onSubmit={savePassword} noValidate>
                                    <h1 ref={headingRef} tabIndex={-1} className="text-2xl font-semibold tracking-tight text-slate-900 outline-none dark:text-white">Choose a new password</h1>
                                    <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">For {email.trim() || "your account"}</p>

                                    <label htmlFor={`${uid}-password`} className="mt-6 block text-sm font-medium text-slate-700 dark:text-slate-300">New password</label>
                                    <div className="relative mt-1.5">
                                        <input id={`${uid}-password`} type={show ? "text" : "password"} autoComplete="new-password" value={password}
                                               onChange={(e) => setPassword(e.target.value)}
                                               aria-invalid={submitted && !allPassed ? true : undefined}
                                               aria-describedby={`${uid}-rules`}
                                               className={`${inputClass(submitted && !allPassed)} pl-3 pr-10`}/>
                                        <button type="button" onClick={() => setShow((v) => !v)} aria-label={show ? "Hide password" : "Show password"} aria-pressed={show}
                                                className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-slate-400 outline-none hover:text-slate-700 focus-visible:ring-2 focus-visible:ring-sky-600 dark:hover:text-slate-200">
                                            {show ? <LuEyeOff className="h-4 w-4"/> : <LuEye className="h-4 w-4"/>}
                                        </button>
                                    </div>
                                    <ul id={`${uid}-rules`} className="mt-3 grid gap-1.5 sm:grid-cols-2">
                                        {rules.map((rule, i) => (
                                            <li key={rule.label} className={`flex items-center gap-2 text-xs transition-colors ${passed[i] ? "text-emerald-700 dark:text-emerald-400" : submitted ? "text-rose-600 dark:text-rose-400" : "text-slate-500 dark:text-slate-400"}`}>
                                                <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full transition-colors ${passed[i] ? "bg-emerald-500 text-white" : "bg-slate-200 text-slate-400 dark:bg-slate-800"}`}>
                                                    {passed[i] ? <LuCheck className="h-2.5 w-2.5" aria-hidden="true"/> : <LuX className="h-2.5 w-2.5" aria-hidden="true"/>}
                                                </span>
                                                {rule.label}
                                                <span className="sr-only">{passed[i] ? ", met" : ", not met"}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <label htmlFor={`${uid}-confirm`} className="mt-5 block text-sm font-medium text-slate-700 dark:text-slate-300">Confirm password</label>
                                    <input id={`${uid}-confirm`} type={show ? "text" : "password"} autoComplete="new-password" value={confirm}
                                           onChange={(e) => setConfirm(e.target.value)}
                                           aria-invalid={submitted && !matches ? true : undefined}
                                           aria-describedby={submitted && !matches ? `${uid}-confirm-error` : undefined}
                                           className={`mt-1.5 ${inputClass(submitted && !matches)} px-3`}/>
                                    {submitted && !matches && <p id={`${uid}-confirm-error`} className="mt-1.5 text-sm text-rose-600 dark:text-rose-400">The passwords do not match yet.</p>}

                                    <label className="mt-5 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                                        <input type="checkbox" checked={signOutOthers} onChange={(e) => setSignOutOthers(e.target.checked)} className="h-4 w-4 rounded accent-sky-600"/>
                                        {otherDevices ? `Sign out of my ${otherDevices} other ${otherDevices === 1 ? "device" : "devices"}` : "Sign out of my other devices"}
                                    </label>

                                    {saveError && (
                                        <p role="alert" className="mt-5 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300">{saveError}</p>
                                    )}

                                    <button type="submit" disabled={loading}
                                            className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white outline-none transition-colors hover:bg-sky-700 focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2 disabled:opacity-70 dark:focus-visible:ring-offset-slate-900">
                                        {loading && <LuLoader className="h-4 w-4 animate-spin" aria-hidden="true"/>}
                                        Save new password
                                    </button>
                                </form>
                            )}

                            {step === 3 && (
                                <div className="flex min-h-[340px] flex-col items-center justify-center text-center">
                                    <motion.span initial={reduce ? false : {scale: 0.4, rotate: -20}} animate={{scale: 1, rotate: 0}}
                                                 transition={{type: "spring", stiffness: 260, damping: 14}}
                                                 className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-lg shadow-emerald-500/30">
                                        <LuCheck className="h-7 w-7" aria-hidden="true"/>
                                    </motion.span>
                                    <h1 ref={headingRef} tabIndex={-1} className="mt-5 text-2xl font-semibold tracking-tight text-slate-900 outline-none dark:text-white">Password updated</h1>
                                    <p className="mt-2 max-w-xs text-sm text-slate-500 dark:text-slate-400">
                                        {signOutOthers ? "We signed you out everywhere else. " : ""}Use your new password next time you sign in.
                                    </p>
                                    <a href={signInHref} className="mt-6 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white outline-none hover:bg-slate-700 focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 dark:focus-visible:ring-offset-slate-900">
                                        Continue to sign in
                                    </a>
                                    {resetLabel && (
                                        <button type="button" onClick={restart} className="mt-3 rounded text-xs text-slate-500 outline-none hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-sky-600 dark:hover:text-white">
                                            {resetLabel}
                                        </button>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};
