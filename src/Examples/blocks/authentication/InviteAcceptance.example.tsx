import {useEffect, useRef, useState} from "react";
import type {FormEvent} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {LuCheck, LuClock, LuLoader, LuShieldCheck} from "react-icons/lu";

type Status = "open" | "joining" | "joined" | "declined";

const members: {initials: string; color: string}[] = [
    {initials: "MC", color: "bg-pink-500"},
    {initials: "TA", color: "bg-sky-500"},
    {initials: "RB", color: "bg-amber-500"},
    {initials: "JK", color: "bg-emerald-500"},
];

const InviteAcceptance = () => {
    const reduce = useReducedMotion();
    const [status, setStatus] = useState<Status>("open");
    const [confirmDecline, setConfirmDecline] = useState(false);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{name?: string; password?: string}>({});
    const timer = useRef<number | undefined>(undefined);

    useEffect(() => () => window.clearTimeout(timer.current), []);

    const accept = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const next: {name?: string; password?: string} = {};
        if (name.trim().length < 2) next.name = "Enter the name your teammates will see.";
        if (password.length < 10) next.password = "Use at least 10 characters.";
        setErrors(next);
        if (Object.keys(next).length > 0) return;
        setStatus("joining");
        // Replace with your accept-invite request.
        timer.current = window.setTimeout(() => setStatus("joined"), 1100);
    };

    const reset = () => {
        setStatus("open");
        setConfirmDecline(false);
        setName("");
        setPassword("");
        setErrors({});
    };

    const field = (invalid: boolean) =>
        `mt-1.5 w-full rounded-xl border bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-4 dark:bg-gray-950 dark:text-white ${invalid
            ? "border-rose-400 focus:ring-rose-500/10"
            : "border-gray-300 focus:border-pink-500 focus:ring-pink-500/10 dark:border-gray-700"}`;

    return (
        <section className="relative flex min-h-[760px] w-full items-center justify-center overflow-hidden bg-gray-50 px-4 py-16 dark:bg-gray-950">
            <div aria-hidden="true" className="absolute -left-40 top-10 h-96 w-96 rounded-full bg-pink-300/40 blur-3xl dark:bg-pink-600/20"/>
            <div aria-hidden="true" className="absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-sky-300/40 blur-3xl dark:bg-sky-600/20"/>

            <div className="relative w-full max-w-md overflow-hidden rounded-[28px] border border-gray-200 bg-white shadow-2xl shadow-gray-900/10 dark:border-gray-800 dark:bg-gray-900 dark:shadow-none">
                <div className="relative h-28 bg-[linear-gradient(135deg,#ec4899_0%,#8b5cf6_50%,#0ea5e9_100%)]">
                    <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle,rgb(255_255_255/0.25)_1px,transparent_1px)] bg-[size:14px_14px] opacity-60"/>
                </div>

                <div className="-mt-10 flex items-center justify-center gap-3 px-6" aria-hidden="true">
                    <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-pink-500 text-lg font-semibold text-white shadow-lg ring-4 ring-white dark:ring-gray-900">MC</span>
                    <svg viewBox="0 0 64 8" className="h-2 w-16 text-gray-300 dark:text-gray-600">
                        <motion.line x1="0" y1="4" x2="64" y2="4" stroke="currentColor" strokeWidth="2" strokeDasharray="4 5"
                                     animate={reduce || status !== "joining" ? {strokeDashoffset: 0} : {strokeDashoffset: [0, -18]}}
                                     transition={{duration: 0.6, repeat: status === "joining" && !reduce ? Infinity : 0, ease: "linear"}}/>
                    </svg>
                    <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-900 shadow-lg ring-4 ring-white dark:bg-white dark:ring-gray-900">
                        <svg viewBox="0 0 24 24" className="h-7 w-7 text-white dark:text-gray-900"><path d="M4 20V4l8 10 8-10v16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round"/></svg>
                    </span>
                </div>

                <div className="p-6 pt-5 sm:p-8 sm:pt-6">
                    <AnimatePresence mode="wait" initial={false}>
                        {status === "joined" && (
                            <motion.div key="joined" initial={{opacity: 0, y: 8}} animate={{opacity: 1, y: 0}} className="text-center" role="status">
                                <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300">
                                    <LuCheck className="h-5 w-5" aria-hidden="true"/>
                                </span>
                                <h1 className="mt-4 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">You joined Northwind Design</h1>
                                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Maya can see you are in. Your first file, Brand refresh 2027, is waiting.</p>
                                <a href="#" className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white outline-none hover:bg-gray-700 focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 dark:focus-visible:ring-offset-gray-900">
                                    Open Northwind Design
                                </a>
                                <button type="button" onClick={reset} className="mt-3 rounded text-xs text-gray-500 outline-none hover:text-gray-900 focus-visible:ring-2 focus-visible:ring-pink-500 dark:hover:text-white">Replay demo</button>
                            </motion.div>
                        )}

                        {status === "declined" && (
                            <motion.div key="declined" initial={{opacity: 0, y: 8}} animate={{opacity: 1, y: 0}} className="text-center" role="status">
                                <h1 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Invitation declined</h1>
                                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">We let Maya know. If this was a mistake, ask her to send a new invite.</p>
                                <button type="button" onClick={reset} className="mt-6 rounded-lg px-3 py-1.5 text-sm font-medium text-pink-700 outline-none hover:bg-pink-50 focus-visible:ring-2 focus-visible:ring-pink-500 dark:text-pink-400 dark:hover:bg-pink-500/10">Replay demo</button>
                            </motion.div>
                        )}

                        {(status === "open" || status === "joining") && (
                            <motion.div key="open" exit={{opacity: 0, y: -8}}>
                                <div className="text-center">
                                    <h1 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                                        Maya Chen invited you to join <span className="whitespace-nowrap">Northwind Design</span>
                                    </h1>
                                    <div className="mt-3 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="flex -space-x-1.5" aria-hidden="true">
                                            {members.map((m) => (
                                                <span key={m.initials} className={`flex h-6 w-6 items-center justify-center rounded-full text-[9px] font-semibold text-white ring-2 ring-white dark:ring-gray-900 ${m.color}`}>{m.initials}</span>
                                            ))}
                                        </span>
                                        <span>22 members</span>
                                        <span className="rounded-full bg-pink-50 px-2 py-0.5 text-xs font-medium text-pink-700 ring-1 ring-inset ring-pink-200 dark:bg-pink-500/10 dark:text-pink-300 dark:ring-pink-500/30">Editor</span>
                                    </div>
                                </div>

                                <p className="mt-6 rounded-xl bg-gray-50 px-3 py-2.5 text-sm text-gray-600 dark:bg-gray-800/60 dark:text-gray-300">
                                    Joining as <span className="font-medium text-gray-900 dark:text-white">sam.rivera@northwind.design</span>
                                </p>

                                <form onSubmit={accept} noValidate className="mt-5 space-y-4">
                                    <div>
                                        <label htmlFor="invite-accept-name" className="text-sm font-medium text-gray-700 dark:text-gray-300">Full name</label>
                                        <input id="invite-accept-name" autoComplete="name" value={name} placeholder="Sam Rivera" disabled={status === "joining"}
                                               onChange={(e) => { setName(e.target.value); setErrors((p) => ({...p, name: undefined})); }}
                                               aria-invalid={errors.name ? true : undefined}
                                               aria-describedby={errors.name ? "invite-accept-name-error" : undefined}
                                               className={field(Boolean(errors.name))}/>
                                        {errors.name && <p id="invite-accept-name-error" className="mt-1.5 text-sm text-rose-600 dark:text-rose-400">{errors.name}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor="invite-accept-password" className="text-sm font-medium text-gray-700 dark:text-gray-300">Create a password</label>
                                        <input id="invite-accept-password" type="password" autoComplete="new-password" value={password} disabled={status === "joining"}
                                               onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({...p, password: undefined})); }}
                                               aria-invalid={errors.password ? true : undefined}
                                               aria-describedby={errors.password ? "invite-accept-password-error" : "invite-accept-password-hint"}
                                               className={field(Boolean(errors.password))}/>
                                        {errors.password
                                            ? <p id="invite-accept-password-error" className="mt-1.5 text-sm text-rose-600 dark:text-rose-400">{errors.password}</p>
                                            : <p id="invite-accept-password-hint" className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">At least 10 characters.</p>}
                                    </div>
                                    <button type="submit" disabled={status === "joining"}
                                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-violet-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-pink-500/25 outline-none transition hover:brightness-110 focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2 disabled:opacity-70 dark:focus-visible:ring-offset-gray-900">
                                        {status === "joining" && <LuLoader className="h-4 w-4 animate-spin" aria-hidden="true"/>}
                                        {status === "joining" ? "Joining workspace" : "Accept and join"}
                                    </button>
                                </form>

                                <div className="mt-4 min-h-[36px] text-center text-sm">
                                    {confirmDecline ? (
                                        <div className="flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Confirm decline">
                                            <span className="text-gray-600 dark:text-gray-300">Decline this invite?</span>
                                            <button type="button" onClick={() => setStatus("declined")}
                                                    className="rounded-lg bg-rose-600 px-2.5 py-1 text-xs font-semibold text-white outline-none hover:bg-rose-700 focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900">
                                                Decline
                                            </button>
                                            <button type="button" onClick={() => setConfirmDecline(false)}
                                                    className="rounded-lg px-2.5 py-1 text-xs font-medium text-gray-600 outline-none hover:bg-gray-100 focus-visible:ring-2 focus-visible:ring-pink-500 dark:text-gray-300 dark:hover:bg-gray-800">
                                                Keep invite
                                            </button>
                                        </div>
                                    ) : (
                                        <button type="button" onClick={() => setConfirmDecline(true)} disabled={status === "joining"}
                                                className="rounded px-1 font-medium text-gray-500 outline-none hover:text-gray-900 focus-visible:ring-2 focus-visible:ring-pink-500 disabled:opacity-50 dark:text-gray-400 dark:hover:text-white">
                                            Decline invitation
                                        </button>
                                    )}
                                </div>

                                <div className="mt-5 flex flex-wrap justify-center gap-x-4 gap-y-1 border-t border-gray-100 pt-4 text-xs text-gray-400 dark:border-gray-800">
                                    <span className="inline-flex items-center gap-1"><LuClock className="h-3.5 w-3.5" aria-hidden="true"/> Expires in 6 days</span>
                                    <span className="inline-flex items-center gap-1"><LuShieldCheck className="h-3.5 w-3.5" aria-hidden="true"/> SSO not required</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default InviteAcceptance;
