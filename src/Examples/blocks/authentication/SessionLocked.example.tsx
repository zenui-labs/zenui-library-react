import {useEffect, useRef, useState} from "react";
import type {FormEvent} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {LuArrowRight, LuEye, LuEyeOff, LuFileText, LuLoader, LuLock} from "react-icons/lu";

const formatTime = (date: Date) => date.toLocaleTimeString("en-US", {hour: "numeric", minute: "2-digit"});

const rows: {name: string; owner: string; value: string; change: string}[] = [
    {name: "Q3 forecast", owner: "Priya Nair", value: "$1.24M", change: "+8.2%"},
    {name: "Vendor payments", owner: "Luis Ortega", value: "$318K", change: "-1.4%"},
    {name: "Payroll, September", owner: "Priya Nair", value: "$542K", change: "+0.6%"},
    {name: "Cloud spend", owner: "Wen Zhao", value: "$96K", change: "+12.9%"},
    {name: "Travel and events", owner: "Aba Mensah", value: "$41K", change: "-6.0%"},
];

const SessionLocked = () => {
    const reduce = useReducedMotion();
    const [locked, setLocked] = useState(true);
    const [password, setPassword] = useState("");
    const [show, setShow] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [checking, setChecking] = useState(false);
    const [now, setNow] = useState(() => new Date());
    const timer = useRef<number | undefined>(undefined);
    const inputRef = useRef<HTMLInputElement>(null);
    const lockButtonRef = useRef<HTMLButtonElement>(null);

    // Keep the clock current while the lock screen is visible.
    useEffect(() => {
        if (!locked) return;
        const id = window.setInterval(() => setNow(new Date()), 15000);
        return () => window.clearInterval(id);
    }, [locked]);

    useEffect(() => () => window.clearTimeout(timer.current), []);

    const unlock = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (password.length < 8) {
            setError(password ? "That password is incorrect. Try again." : "Enter your password to continue.");
            inputRef.current?.focus();
            return;
        }
        setError(null);
        setChecking(true);
        // Replace with your re-authentication request. The demo accepts any password of 8 or more characters.
        timer.current = window.setTimeout(() => {
            setChecking(false);
            setLocked(false);
            setPassword("");
        }, 900);
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
        <section className="relative h-[680px] w-full overflow-hidden bg-slate-100 dark:bg-slate-950">
            {/* The app underneath */}
            <div aria-hidden={locked ? true : undefined} className="flex h-full flex-col">
                <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6 dark:border-slate-800 dark:bg-slate-900">
                    <span className="flex items-center gap-2 text-sm font-semibold text-slate-900 dark:text-white">
                        <span className="h-6 w-6 rounded-md bg-gradient-to-br from-cyan-500 to-blue-600"/> Harborview Finance
                    </span>
                    <button ref={lockButtonRef} type="button" onClick={lockAgain} tabIndex={locked ? -1 : undefined}
                            className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 outline-none hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-cyan-500 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800">
                        <LuLock className="h-4 w-4" aria-hidden="true"/> Lock
                    </button>
                </header>
                <main className="flex-1 overflow-hidden p-4 sm:p-6">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Budgets</h2>
                    <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
                        <table className="w-full text-left text-sm">
                            <thead className="bg-slate-50 text-xs text-slate-500 dark:bg-slate-800/50 dark:text-slate-400">
                                <tr>
                                    <th scope="col" className="px-4 py-2.5 font-medium">Budget</th>
                                    <th scope="col" className="hidden px-4 py-2.5 font-medium sm:table-cell">Owner</th>
                                    <th scope="col" className="px-4 py-2.5 text-right font-medium">Amount</th>
                                    <th scope="col" className="px-4 py-2.5 text-right font-medium">Change</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                                {rows.map((row) => (
                                    <tr key={row.name}>
                                        <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">
                                            <span className="flex items-center gap-2"><LuFileText className="h-4 w-4 text-slate-400" aria-hidden="true"/>{row.name}</span>
                                        </td>
                                        <td className="hidden px-4 py-3 text-slate-500 sm:table-cell dark:text-slate-400">{row.owner}</td>
                                        <td className="px-4 py-3 text-right tabular-nums text-slate-900 dark:text-white">{row.value}</td>
                                        <td className={`px-4 py-3 text-right tabular-nums ${row.change.startsWith("-") ? "text-rose-600 dark:text-rose-400" : "text-emerald-600 dark:text-emerald-400"}`}>{row.change}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </div>

            {/* Lock screen */}
            <AnimatePresence>
                {locked && (
                    <motion.div key="lock"
                                initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}
                                transition={{duration: reduce ? 0 : 0.35}}
                                role="dialog" aria-modal="true" aria-labelledby="session-locked-title" aria-describedby="session-locked-desc"
                                className="absolute inset-0 z-10 flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-xl dark:bg-slate-950/60">
                        <motion.div initial={reduce ? false : {y: 16, scale: 0.98}} animate={{y: 0, scale: 1}} exit={reduce ? undefined : {y: -8, scale: 0.98}}
                                    transition={{type: "spring", stiffness: 300, damping: 28}}
                                    className="w-full max-w-sm text-center">
                            <p className="font-light tabular-nums text-white/90 [font-size:clamp(2.5rem,10vw,3.5rem)] [line-height:1]">{formatTime(now)}</p>
                            <p className="mt-1 text-sm text-white/70">{now.toLocaleDateString("en-US", {weekday: "long", month: "long", day: "numeric"})}</p>

                            <div className="mt-8 rounded-3xl border border-white/20 bg-white/85 p-6 text-left shadow-2xl backdrop-blur dark:border-white/10 dark:bg-slate-900/85">
                                <div className="flex items-center gap-3">
                                    <span className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 text-sm font-semibold text-white">
                                        PN
                                        <span className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-white ring-2 ring-white dark:bg-white dark:text-slate-900 dark:ring-slate-900">
                                            <LuLock className="h-2.5 w-2.5" aria-hidden="true"/>
                                        </span>
                                    </span>
                                    <div className="min-w-0">
                                        <h1 id="session-locked-title" className="font-semibold text-slate-900 dark:text-white">Welcome back, Priya</h1>
                                        <p className="truncate text-sm text-slate-500 dark:text-slate-400">priya.nair@harborview.com</p>
                                    </div>
                                </div>
                                <p id="session-locked-desc" className="mt-4 rounded-xl bg-amber-50 px-3 py-2 text-xs leading-relaxed text-amber-900 ring-1 ring-inset ring-amber-200 dark:bg-amber-500/10 dark:text-amber-200 dark:ring-amber-500/30">
                                    We locked your session after 30 minutes of inactivity. Your unsaved edits to Q3 forecast are safe.
                                </p>
                                <form onSubmit={unlock} noValidate className="mt-4">
                                    <label htmlFor="session-locked-password" className="sr-only">Password</label>
                                    <div className="relative">
                                        <input ref={inputRef} id="session-locked-password" type={show ? "text" : "password"} autoComplete="current-password"
                                               value={password} placeholder="Password" disabled={checking}
                                               onChange={(e) => { setPassword(e.target.value); setError(null); }}
                                               aria-invalid={error ? true : undefined}
                                               aria-describedby={error ? "session-locked-error" : undefined}
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
                                    {error && <p id="session-locked-error" role="alert" className="mt-2 text-sm text-rose-600 dark:text-rose-400">{error}</p>}
                                </form>
                                <div className="mt-5 flex items-center justify-between text-xs">
                                    <a href="#" className="rounded font-medium text-slate-600 outline-none hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-cyan-500 dark:text-slate-400 dark:hover:text-white">Forgot password?</a>
                                    <a href="#" className="rounded font-medium text-slate-600 outline-none hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-cyan-500 dark:text-slate-400 dark:hover:text-white">Not Priya? Switch account</a>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default SessionLocked;
