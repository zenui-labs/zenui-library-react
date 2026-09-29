import {useState} from "react";
import type {ChangeEvent, FormEvent} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {LuArrowRight, LuCheck, LuLoader, LuMail, LuRotateCcw} from "react-icons/lu";

type Status = "idle" | "submitting" | "done";

interface Topic {
    id: string;
    label: string;
}

interface Issue {
    number: number;
    title: string;
    minutes: number;
}

const topics: Topic[] = [
    {id: "pricing", label: "Pricing"},
    {id: "retention", label: "Retention"},
    {id: "analytics", label: "Product analytics"},
    {id: "growth", label: "Growth loops"},
    {id: "hiring", label: "Hiring"},
];

const recentIssues: Issue[] = [
    {number: 142, title: "Why annual discounts above 20 percent rarely pay off", minutes: 6},
    {number: 141, title: "The three churn signals we now alert on", minutes: 8},
    {number: 140, title: "Reading a cohort chart without fooling yourself", minutes: 5},
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const NewsletterTopics = () => {
    const [email, setEmail] = useState("");
    const [selected, setSelected] = useState<string[]>(["pricing", "retention"]);
    const [status, setStatus] = useState<Status>("idle");
    const [errors, setErrors] = useState<{email?: string; topics?: string}>({});

    const toggleTopic = (id: string) => {
        setSelected((current) => (current.includes(id) ? current.filter((t) => t !== id) : [...current, id]));
        setErrors((current) => ({...current, topics: undefined}));
    };

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const next: {email?: string; topics?: string} = {};
        if (!emailPattern.test(email.trim())) next.email = "Enter an email address like name@company.com";
        if (selected.length === 0) next.topics = "Pick at least one topic";
        setErrors(next);
        if (next.email || next.topics) return;
        setStatus("submitting");
        // Replace with a request to your email provider.
        window.setTimeout(() => setStatus("done"), 900);
    };

    const reset = () => {
        setStatus("idle");
        setEmail("");
    };

    return (
        <section className="w-full bg-white px-4 py-16 sm:px-8 dark:bg-slate-950">
            <div className="mx-auto grid max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-amber-50 via-white to-white lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] dark:border-slate-800 dark:from-amber-500/10 dark:via-slate-900 dark:to-slate-900">
                <div className="p-6 sm:p-10">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-400 text-amber-950 shadow-sm">
                        <LuMail className="h-5 w-5"/>
                    </span>
                    <h2 className="mt-5 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl dark:text-white">
                        The Thursday brief
                    </h2>
                    <p className="mt-3 max-w-md text-slate-600 dark:text-slate-400">
                        One email a week on pricing, retention and product analytics. Read by 18,400 people who run
                        software businesses.
                    </p>

                    <AnimatePresence mode="wait" initial={false}>
                        {status === "done" ? (
                            <motion.div key="done" role="status"
                                        initial={{opacity: 0, y: 8}} animate={{opacity: 1, y: 0}} exit={{opacity: 0}}
                                        className="mt-8 rounded-2xl border border-emerald-200 bg-white p-5 dark:border-emerald-500/30 dark:bg-slate-950/60">
                                <div className="flex items-start gap-3">
                                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                                        <LuCheck className="h-4 w-4"/>
                                    </span>
                                    <div>
                                        <p className="font-semibold text-slate-900 dark:text-white">Check your inbox to confirm</p>
                                        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                                            We sent a link to {email.trim()}. You will get {selected.length === 1 ? "1 topic" : `${selected.length} topics`} every Thursday.
                                        </p>
                                    </div>
                                </div>
                                <button type="button" onClick={reset}
                                        className="mt-4 inline-flex items-center gap-1.5 rounded-lg text-sm font-medium text-slate-600 outline-none hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-amber-500 dark:text-slate-400 dark:hover:text-white">
                                    <LuRotateCcw className="h-3.5 w-3.5"/>
                                    Use a different email
                                </button>
                            </motion.div>
                        ) : (
                            <motion.form key="form" onSubmit={onSubmit} noValidate exit={{opacity: 0, y: -8}} className="mt-8">
                                <fieldset aria-describedby={errors.topics ? "brief-topics-error" : undefined}>
                                    <legend className="text-sm font-medium text-slate-900 dark:text-white">Topics you want</legend>
                                    <div className="mt-3 flex flex-wrap gap-2">
                                        {topics.map((topic) => {
                                            const on = selected.includes(topic.id);
                                            return (
                                                <button key={topic.id} type="button" aria-pressed={on} onClick={() => toggleTopic(topic.id)}
                                                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-1 dark:focus-visible:ring-offset-slate-900 ${on
                                                            ? "border-slate-900 bg-slate-900 text-white dark:border-amber-300 dark:bg-amber-300 dark:text-amber-950"
                                                            : "border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-600"}`}>
                                                    <motion.span initial={false} animate={{width: on ? 14 : 0, opacity: on ? 1 : 0}} className="inline-flex overflow-hidden">
                                                        <LuCheck className="h-3.5 w-3.5 shrink-0"/>
                                                    </motion.span>
                                                    {topic.label}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    {errors.topics && <p id="brief-topics-error" className="mt-2 text-sm text-rose-600 dark:text-rose-400">{errors.topics}</p>}
                                </fieldset>

                                <label htmlFor="brief-email" className="mt-6 block text-sm font-medium text-slate-900 dark:text-white">Email</label>
                                <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                                    <input
                                        id="brief-email"
                                        type="email"
                                        autoComplete="email"
                                        value={email}
                                        placeholder="you@company.com"
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                            setEmail(e.target.value);
                                            if (errors.email) setErrors((current) => ({...current, email: undefined}));
                                        }}
                                        aria-invalid={errors.email ? true : undefined}
                                        aria-describedby={errors.email ? "brief-email-error" : undefined}
                                        className={`min-w-0 flex-1 rounded-xl border bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-shadow placeholder:text-slate-400 focus:ring-4 dark:bg-slate-950 dark:text-white ${errors.email
                                            ? "border-rose-300 focus:ring-rose-500/15 dark:border-rose-500/50"
                                            : "border-slate-200 focus:border-amber-400 focus:ring-amber-400/20 dark:border-slate-700"}`}
                                    />
                                    <button type="submit" disabled={status === "submitting"}
                                            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white outline-none transition-colors hover:bg-slate-700 focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-70 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 dark:focus-visible:ring-offset-slate-900">
                                        {status === "submitting" ? <LuLoader className="h-4 w-4 animate-spin"/> : null}
                                        {status === "submitting" ? "Subscribing" : "Subscribe"}
                                        {status === "idle" ? <LuArrowRight className="h-4 w-4"/> : null}
                                    </button>
                                </div>
                                {errors.email && <p id="brief-email-error" className="mt-2 text-sm text-rose-600 dark:text-rose-400">{errors.email}</p>}
                                <p className="mt-3 text-xs text-slate-500">Unsubscribe with one click. We never share your address.</p>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>

                <aside aria-label="Recent issues" className="border-t border-slate-200 bg-white/60 p-6 sm:p-10 lg:border-l lg:border-t-0 dark:border-slate-800 dark:bg-slate-950/40">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Recent issues</p>
                    <ol className="mt-4 space-y-3">
                        {recentIssues.map((issue, i) => (
                            <motion.li key={issue.number}
                                       initial={{opacity: 0, x: 12}}
                                       whileInView={{opacity: 1, x: 0}}
                                       viewport={{once: true}}
                                       transition={{delay: i * 0.08}}>
                                <a href="#"
                                   className="group block rounded-xl border border-slate-200 bg-white p-4 outline-none transition-all hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md focus-visible:ring-2 focus-visible:ring-amber-500 dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700">
                                    <p className="text-xs font-medium text-amber-600 dark:text-amber-400">Issue {issue.number}</p>
                                    <p className="mt-1 text-sm font-semibold leading-snug text-slate-900 group-hover:underline dark:text-white">{issue.title}</p>
                                    <p className="mt-2 text-xs text-slate-500">{issue.minutes} min read</p>
                                </a>
                            </motion.li>
                        ))}
                    </ol>
                </aside>
            </div>
        </section>
    );
};

export default NewsletterTopics;
