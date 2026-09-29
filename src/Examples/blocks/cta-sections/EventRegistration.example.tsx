import {useId, useState} from "react";
import type {ChangeEvent, FormEvent} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {LuCalendarPlus, LuCheck, LuClock, LuLoader, LuVideo} from "react-icons/lu";

type Status = "idle" | "submitting" | "done";

interface Session {
    id: string;
    label: string;
    region: string;
    // Start time in UTC for the calendar link.
    startUtc: string;
    endUtc: string;
    seats: number;
    taken: number;
}

interface AgendaItem {
    time: string;
    title: string;
    speaker: string;
}

const sessions: Session[] = [
    {id: "emea", label: "10:00 London", region: "Europe and Africa", startUtc: "20261023T090000Z", endUtc: "20261023T103000Z", seats: 300, taken: 262},
    {id: "amer", label: "11:00 New York", region: "Americas", startUtc: "20261023T150000Z", endUtc: "20261023T163000Z", seats: 300, taken: 181},
    {id: "apac", label: "10:00 Singapore", region: "Asia Pacific", startUtc: "20261024T020000Z", endUtc: "20261024T033000Z", seats: 200, taken: 196},
];

const agenda: AgendaItem[] = [
    {time: "0:00", title: "Why offline-first changes your data model", speaker: "Priya Natarajan"},
    {time: "0:25", title: "Live build: sync a to-do app with conflict handling", speaker: "Tomás Ibarra"},
    {time: "1:05", title: "Questions from the audience", speaker: "Both hosts"},
];

const hosts: {initials: string; color: string}[] = [
    {initials: "PN", color: "bg-fuchsia-500"},
    {initials: "TI", color: "bg-sky-500"},
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const calendarLink = (session: Session) => {
    const params = new URLSearchParams({
        action: "TEMPLATE",
        text: "Build week: offline-first apps workshop",
        dates: `${session.startUtc}/${session.endUtc}`,
        details: "Live workshop hosted by Priya Natarajan and Tomás Ibarra.",
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

const EventRegistration = () => {
    const formId = useId();
    const [sessionId, setSessionId] = useState<string>("amer");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState<{name?: string; email?: string}>({});
    const [status, setStatus] = useState<Status>("idle");

    const session = sessions.find((s) => s.id === sessionId) ?? sessions[0];
    const seatsLeft = session.seats - session.taken;

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const next: {name?: string; email?: string} = {};
        if (!name.trim()) next.name = "Enter your name";
        if (!emailPattern.test(email.trim())) next.email = "Enter an email address like name@company.com";
        setErrors(next);
        if (next.name || next.email) return;
        setStatus("submitting");
        // Replace with a request to your event platform.
        window.setTimeout(() => setStatus("done"), 1000);
    };

    const inputClass = (invalid: boolean) =>
        `mt-1.5 w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-900 outline-none transition-shadow placeholder:text-slate-400 focus:ring-4 dark:bg-slate-950 dark:text-white ${invalid
            ? "border-rose-300 focus:ring-rose-500/15 dark:border-rose-500/50"
            : "border-slate-200 focus:border-fuchsia-400 focus:ring-fuchsia-500/15 dark:border-slate-700"}`;

    return (
        <section className="w-full bg-white px-4 py-16 sm:px-8 sm:py-20 dark:bg-slate-950">
            <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-16">
                <div>
                    <div className="flex items-center gap-4">
                        <div className="w-16 overflow-hidden rounded-xl border border-slate-200 text-center shadow-sm dark:border-slate-800">
                            <p className="bg-fuchsia-600 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">Oct</p>
                            <p className="py-1.5 text-2xl font-semibold text-slate-900 dark:text-white">23</p>
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                            <p className="flex items-center gap-1.5"><LuVideo className="h-4 w-4"/> Online, free</p>
                            <p className="mt-1 flex items-center gap-1.5"><LuClock className="h-4 w-4"/> 90 minutes, three time zones</p>
                        </div>
                    </div>

                    <h2 className="mt-8 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                        Build week: a live workshop on offline-first apps
                    </h2>
                    <p className="mt-4 max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-400">
                        Two engineers from the Driftwood sync team build a working app from an empty repository and answer
                        your questions as they go. Everyone who registers gets the recording and the source code.
                    </p>

                    <div className="mt-6 flex items-center gap-3">
                        <div className="flex -space-x-2">
                            {hosts.map((h) => (
                                <span key={h.initials} className={`flex h-9 w-9 items-center justify-center rounded-full text-xs font-semibold text-white ring-2 ring-white dark:ring-slate-950 ${h.color}`}>
                                    {h.initials}
                                </span>
                            ))}
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-400">Hosted by Priya Natarajan and Tomás Ibarra</p>
                    </div>

                    <h3 className="mt-10 text-sm font-semibold uppercase tracking-wider text-slate-500">Agenda</h3>
                    <ol className="mt-4 border-l border-slate-200 dark:border-slate-800">
                        {agenda.map((item) => (
                            <li key={item.time} className="relative pb-6 pl-6 last:pb-0">
                                <span aria-hidden="true" className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-fuchsia-500 dark:border-slate-950"/>
                                <p className="font-mono text-xs text-fuchsia-600 dark:text-fuchsia-400">{item.time}</p>
                                <p className="mt-0.5 font-medium text-slate-900 dark:text-white">{item.title}</p>
                                <p className="text-sm text-slate-500 dark:text-slate-400">{item.speaker}</p>
                            </li>
                        ))}
                    </ol>
                </div>

                <div className="relative self-start rounded-3xl border border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:bg-slate-900">
                    <AnimatePresence mode="wait" initial={false}>
                        {status === "done" ? (
                            <motion.div key="done" role="status" initial={{opacity: 0, scale: 0.97}} animate={{opacity: 1, scale: 1}} className="text-center">
                                <motion.span initial={{scale: 0}} animate={{scale: 1}} transition={{type: "spring", stiffness: 300, damping: 16, delay: 0.1}}
                                             className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white">
                                    <LuCheck className="h-7 w-7"/>
                                </motion.span>
                                <p className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">You are registered, {name.trim().split(" ")[0]}</p>
                                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                    Your link for the {session.label} session is on its way to {email.trim()}.
                                </p>
                                <a href={calendarLink(session)} target="_blank" rel="noreferrer"
                                   className="mt-6 inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 outline-none transition-colors hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-fuchsia-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-800">
                                    <LuCalendarPlus className="h-4 w-4"/>
                                    Add to Google Calendar
                                </a>
                            </motion.div>
                        ) : (
                            <motion.form key="form" onSubmit={onSubmit} noValidate exit={{opacity: 0, scale: 0.97}}>
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Save your seat</h3>

                                <fieldset className="mt-5">
                                    <legend className="text-sm font-medium text-slate-900 dark:text-white">Session</legend>
                                    <div className="mt-2 space-y-2">
                                        {sessions.map((s) => {
                                            const left = s.seats - s.taken;
                                            return (
                                                <label key={s.id}
                                                       className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-colors has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-fuchsia-500 ${sessionId === s.id
                                                           ? "border-fuchsia-500 bg-white dark:border-fuchsia-400 dark:bg-slate-950"
                                                           : "border-slate-200 bg-white/60 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-950/40 dark:hover:border-slate-700"}`}>
                                                    <input type="radio" name={`${formId}-session`} value={s.id} checked={sessionId === s.id}
                                                           onChange={() => setSessionId(s.id)}
                                                           className="h-4 w-4 accent-fuchsia-600"/>
                                                    <span className="flex-1">
                                                        <span className="block text-sm font-medium text-slate-900 dark:text-white">{s.label}</span>
                                                        <span className="block text-xs text-slate-500 dark:text-slate-400">{s.region}</span>
                                                    </span>
                                                    <span className={`text-xs font-medium ${left <= 10 ? "text-rose-600 dark:text-rose-400" : "text-slate-500 dark:text-slate-400"}`}>
                                                        {left} left
                                                    </span>
                                                </label>
                                            );
                                        })}
                                    </div>
                                </fieldset>

                                <div className="mt-4">
                                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                                        <motion.div className="h-full origin-left rounded-full bg-gradient-to-r from-fuchsia-500 to-rose-500"
                                                    initial={false}
                                                    animate={{scaleX: session.taken / session.seats}}
                                                    transition={{type: "spring", stiffness: 120, damping: 20}}/>
                                    </div>
                                    <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400" aria-live="polite">
                                        {session.taken} of {session.seats} seats taken, {seatsLeft} left
                                    </p>
                                </div>

                                <label htmlFor={`${formId}-name`} className="mt-5 block text-sm font-medium text-slate-900 dark:text-white">Full name</label>
                                <input id={`${formId}-name`} type="text" autoComplete="name" value={name}
                                       onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                           setName(e.target.value);
                                           if (errors.name) setErrors((c) => ({...c, name: undefined}));
                                       }}
                                       aria-invalid={errors.name ? true : undefined}
                                       aria-describedby={errors.name ? `${formId}-name-error` : undefined}
                                       className={inputClass(Boolean(errors.name))}/>
                                {errors.name && <p id={`${formId}-name-error`} className="mt-1.5 text-sm text-rose-600 dark:text-rose-400">{errors.name}</p>}

                                <label htmlFor={`${formId}-email`} className="mt-4 block text-sm font-medium text-slate-900 dark:text-white">Work email</label>
                                <input id={`${formId}-email`} type="email" autoComplete="email" value={email} placeholder="you@company.com"
                                       onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                           setEmail(e.target.value);
                                           if (errors.email) setErrors((c) => ({...c, email: undefined}));
                                       }}
                                       aria-invalid={errors.email ? true : undefined}
                                       aria-describedby={errors.email ? `${formId}-email-error` : undefined}
                                       className={inputClass(Boolean(errors.email))}/>
                                {errors.email && <p id={`${formId}-email-error`} className="mt-1.5 text-sm text-rose-600 dark:text-rose-400">{errors.email}</p>}

                                <button type="submit" disabled={status === "submitting"}
                                        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-fuchsia-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-600/20 outline-none transition-colors hover:bg-fuchsia-500 focus-visible:ring-2 focus-visible:ring-fuchsia-500 focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-70 dark:focus-visible:ring-offset-slate-900">
                                    {status === "submitting" && <LuLoader className="h-4 w-4 animate-spin"/>}
                                    {status === "submitting" ? "Registering" : `Register for ${session.label}`}
                                </button>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default EventRegistration;
