import {useEffect, useId, useRef, useState} from "react";
import type {FormEvent, ReactNode} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {LuArrowRight, LuEye, LuEyeOff, LuLoader, LuLock} from "react-icons/lu";

export interface SessionUser {
    name: string;
    email: string;
    /** Shown in the avatar, for example "PN". */
    initials: string;
}

export interface SessionLockedProps {
    user: SessionUser;
    /** The app shown under the header. It is hidden from assistive technology while the screen is locked. */
    children: ReactNode;
    /**
     * Checks the password. Resolve with true to unlock and false for a wrong password. Reject with an Error
     * to show its message.
     */
    onUnlock: (password: string) => Promise<boolean> | boolean;
    /** Controlled lock state. Leave out to let the component manage it. */
    locked?: boolean;
    defaultLocked?: boolean;
    onLockedChange?: (locked: boolean) => void;
    appName?: string;
    /** Replaces the default gradient square next to the app name. */
    logo?: ReactNode;
    /** Notice on the lock card that says why the session locked. */
    message?: ReactNode;
    /** Shorter passwords are rejected without calling `onUnlock`. */
    minPasswordLength?: number;
    forgotPasswordHref?: string;
    switchAccountHref?: string;
    className?: string;
}

const formatTime = (date: Date) => date.toLocaleTimeString("en-US", {hour: "numeric", minute: "2-digit"});

/** A lock screen over your app after inactivity, with a clock, the signed in user and a password field. */
export const SessionLocked = ({
    user,
    children,
    onUnlock,
    locked: lockedProp,
    defaultLocked = true,
    onLockedChange,
    appName = "Harborview Finance",
    logo,
    message = "We locked your session after 30 minutes of inactivity.",
    minPasswordLength = 8,
    forgotPasswordHref = "#",
    switchAccountHref = "#",
    className = "",
}: SessionLockedProps) => {
    const uid = useId();
    const reduce = useReducedMotion();
    const firstName = user.name.split(" ")[0];
    const [lockedState, setLockedState] = useState(defaultLocked);
    const locked = lockedProp ?? lockedState;
    const setLocked = (next: boolean) => {
        if (lockedProp === undefined) setLockedState(next);
        onLockedChange?.(next);
    };
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [checking, setChecking] = useState(false);
    const [now, setNow] = useState(() => new Date());
    const mounted = useRef(true);
    const inputRef = useRef<HTMLInputElement>(null);
    const lockButtonRef = useRef<HTMLButtonElement>(null);

    // Keep the clock current while the lock screen is visible.
    useEffect(() => {
        if (!locked) return;
        const id = window.setInterval(() => setNow(new Date()), 15000);
        return () => window.clearInterval(id);
    }, [locked]);

    // Skips state updates when a check finishes after the component is gone.
    useEffect(() => {
        mounted.current = true;
        return () => {
            mounted.current = false;
        };
    }, []);

    const unlock = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (password.length < minPasswordLength) {
            setError(password ? "That password is incorrect. Try again." : "Enter your password to continue.");
            inputRef.current?.focus();
            return;
        }
        setError(null);
        setChecking(true);
        let next: string | null = null;
        try {
            if (!(await onUnlock(password))) next = "That password is incorrect. Try again.";
        } catch (err) {
            next = err instanceof Error ? err.message : "We could not check your password. Try again.";
        }
        if (!mounted.current) return;
        setChecking(false);
        if (next) {
            setError(next);
            // The input is enabled again on the next frame, so focus it then.
            window.requestAnimationFrame(() => inputRef.current?.focus());
            return;
        }
        setLocked(false);
        setPassword("");
    };

    const lockAgain = () => {
        setLocked(true);
        setNow(new Date());
    };

    // After the user locks or unlocks, move focus to the control that makes sense next.
    const previous = useRef(locked);
    useEffect(() => {
        if (previous.current === locked) return;
        previous.current = locked;
        if (locked) inputRef.current?.focus();
        else lockButtonRef.current?.focus();
    }, [locked]);

    return (
        <section className={`relative h-[680px] w-full overflow-hidden bg-slate-100 dark:bg-slate-950 ${className}`}>
            {/* The app underneath */}
            <div aria-hidden={locked ? true : undefined} className="flex h-full flex-col">
                <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 dark:border-slate-800 dark:bg-slate-900">
                    <span className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                        {logo ?? <span className="h-6 w-6 rounded-md bg-gradient-to-br from-cyan-500 to-blue-600"/>} {appName}
                    </span>
                    <button ref={lockButtonRef} type="button" onClick={lockAgain} tabIndex={locked ? -1 : undefined}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 outline-none hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-cyan-500 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">
                        <LuLock className="h-4 w-4" aria-hidden="true"/> Lock
                    </button>
                </header>
                <main className="flex-1 overflow-hidden p-4 sm:p-6">
                    {children}
                </main>
            </div>

            {/* Lock screen */}
            <AnimatePresence>
                {locked && (
                    <motion.div key="lock"
                                initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}
                                transition={{duration: reduce ? 0 : 0.35}}
                                role="dialog" aria-modal="true" aria-labelledby={`${uid}-title`} aria-describedby={`${uid}-desc`}
                                className="absolute inset-0 z-10 flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-xl dark:bg-slate-950/60">
                        <motion.div initial={reduce ? false : {y: 16, scale: 0.98}} animate={{y: 0, scale: 1}} exit={reduce ? undefined : {y: -8, scale: 0.98}}
                                    transition={{type: "spring", stiffness: 300, damping: 28}}
                                    className="w-full max-w-sm text-center">
                            <p className="font-light tabular-nums text-white/90 [font-size:clamp(2.5rem,10vw,3.5rem)] [line-height:1]">{formatTime(now)}</p>
                            <p className="mt-1 text-sm text-white/70">{now.toLocaleDateString("en-US", {weekday: "long", month: "long", day: "numeric"})}</p>

                            <div className="mt-8 rounded-3xl border border-white/20 bg-white/85 p-6 text-left shadow-2xl backdrop-blur dark:border-white/10 dark:bg-slate-900/85">
                                <div className="flex items-center gap-3">
                                    <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-sm font-semibold text-white">
                                        {user.initials}
                                        <span className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-white ring-2 ring-white dark:bg-white dark:text-slate-900 dark:ring-slate-900">
                                            <LuLock className="h-2.5 w-2.5" aria-hidden="true"/>
                                        </span>
                                    </span>
                                    <div className="min-w-0">
                                        <h1 id={`${uid}-title`} className="font-semibold text-slate-900 dark:text-white">Welcome back, {firstName}</h1>
                                        <p className="truncate text-sm text-slate-500 dark:text-slate-400">{user.email}</p>
                                    </div>
                                </div>
                                <p id={`${uid}-desc`} className="mt-4 rounded-xl bg-amber-50 px-3 py-2 text-xs leading-relaxed text-amber-900 ring-1 ring-inset ring-amber-200 dark:bg-amber-500/10 dark:text-amber-200 dark:ring-amber-500/30">
                                    {message}
                                </p>
                                <form onSubmit={(event) => void unlock(event)} noValidate className="mt-4">
                                    <label htmlFor={`${uid}-password`} className="sr-only">Password</label>
                                    <div className="relative">
                                        <input ref={inputRef} id={`${uid}-password`} type={show ? "text" : "password"} autoComplete="current-password"
                                               value={password} placeholder="Password" disabled={checking}
                                               onChange={(e) => { setPassword(e.target.value); setError(null); }}
                                               aria-invalid={error ? true : undefined}
                                               aria-describedby={error ? `${uid}-error` : undefined}
                                               className={`w-full rounded-xl border bg-white py-2.5 pl-3 pr-20 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 disabled:opacity-60 dark:bg-slate-950 dark:text-white ${error
                                                   ? "border-rose-400 focus:ring-rose-500/15"
                                                   : "border-slate-300 focus:border-cyan-500 focus:ring-cyan-500/15 dark:border-slate-700"}`}/>
                                        <div className="absolute right-1.5 top-1/2 flex -translate-y-1/2 gap-1">
                                            <button type="button" onClick={() => setShow((v) => !v)} aria-label={show ? "Hide password" : "Show password"} aria-pressed={show}
                                                    className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 outline-none hover:text-slate-700 focus-visible:ring-2 focus-visible:ring-cyan-500 dark:hover:text-slate-200">
                                                {show ? <LuEyeOff className="h-4 w-4"/> : <LuEye className="h-4 w-4"/>}
                                            </button>
                                            <button type="submit" disabled={checking} aria-label="Unlock"
                                                    className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white outline-none transition-colors hover:bg-slate-700 focus-visible:ring-2 focus-visible:ring-cyan-500 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200">
                                                {checking ? <LuLoader className="h-4 w-4 animate-spin"/> : <LuArrowRight className="h-4 w-4"/>}
                                            </button>
                                        </div>
                                    </div>
                                    {error && <p id={`${uid}-error`} role="alert" className="mt-2 text-sm text-rose-600 dark:text-rose-400">{error}</p>}
                                </form>
                                <div className="mt-5 flex items-center justify-between text-xs">
                                    <a href={forgotPasswordHref} className="rounded font-medium text-slate-600 outline-none hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-cyan-500 dark:text-slate-400 dark:hover:text-white">Forgot password?</a>
                                    <a href={switchAccountHref} className="rounded font-medium text-slate-600 outline-none hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-cyan-500 dark:text-slate-400 dark:hover:text-white">Not {firstName}? Switch account</a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};
