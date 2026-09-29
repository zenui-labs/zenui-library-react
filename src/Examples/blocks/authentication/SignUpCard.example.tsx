import {useMemo, useState} from "react";
import type {ChangeEvent, FormEvent} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {LuArrowLeft, LuCheck, LuLoader, LuMail, LuX} from "react-icons/lu";

interface Rule {
    label: string;
    test: (password: string) => boolean;
}

const rules: Rule[] = [
    {label: "At least 10 characters", test: (p) => p.length >= 10},
    {label: "An uppercase and a lowercase letter", test: (p) => /[a-z]/.test(p) && /[A-Z]/.test(p)},
    {label: "A number", test: (p) => /\d/.test(p)},
    {label: "A symbol such as # or %", test: (p) => /[^A-Za-z0-9]/.test(p)},
];

const strengthLabels = ["Too weak", "Weak", "Fair", "Good", "Strong"] as const;
const strengthColors = ["bg-slate-200 dark:bg-slate-700", "bg-rose-500", "bg-amber-500", "bg-lime-500", "bg-emerald-500"];

// Turns "Acme Design Co." into "acme-design-co" for the workspace URL.
const slugify = (value: string) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 32);

type Step = "form" | "sent";

const SignUpCard = () => {
    const [name, setName] = useState("");
    const [company, setCompany] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [agreed, setAgreed] = useState(false);
    const [touched, setTouched] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [step, setStep] = useState<Step>("form");

    const passed = useMemo(() => rules.map((rule) => rule.test(password)), [password]);
    const score = passed.filter(Boolean).length;
    const slug = slugify(company) || "your-team";

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    const canSubmit = name.trim() !== "" && emailValid && score === rules.length && agreed;

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setTouched(true);
        if (!canSubmit) return;
        setSubmitting(true);
        // Replace with your sign-up request.
        window.setTimeout(() => {
            setSubmitting(false);
            setStep("sent");
        }, 1000);
    };

    const fieldClass = "mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-violet-500 focus:outline-none focus:ring-4 focus:ring-violet-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white";

    return (
        <section className="relative flex w-full items-center justify-center overflow-hidden bg-slate-100 px-4 py-14 dark:bg-slate-950">
            <div aria-hidden="true" className="absolute left-1/2 top-0 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-400/30 via-fuchsia-300/30 to-sky-300/30 blur-3xl dark:from-violet-600/20 dark:via-fuchsia-600/10 dark:to-sky-600/20"/>

            <div className="relative w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-900/5 sm:p-8 dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-none">
                <AnimatePresence mode="wait" initial={false}>
                    {step === "form" ? (
                        <motion.div key="form" exit={{opacity: 0, x: -20}} transition={{duration: 0.2}}>
                            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">Create your workspace</h1>
                            <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400">Free for up to 5 people. No card needed.</p>

                            <form onSubmit={onSubmit} noValidate className="mt-6 space-y-4">
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <div>
                                        <label htmlFor="signup-name" className="text-sm font-medium text-slate-700 dark:text-slate-300">Full name</label>
                                        <input id="signup-name" autoComplete="name" value={name}
                                               onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                                               aria-invalid={touched && !name.trim() ? true : undefined}
                                               aria-describedby={touched && !name.trim() ? "signup-name-error" : undefined}
                                               className={fieldClass} placeholder="Jordan Reyes"/>
                                        {touched && !name.trim() && (
                                            <p id="signup-name-error" className="mt-1.5 text-sm text-rose-600 dark:text-rose-400">Enter your name.</p>
                                        )}
                                    </div>
                                    <div>
                                        <label htmlFor="signup-company" className="text-sm font-medium text-slate-700 dark:text-slate-300">Company</label>
                                        <input id="signup-company" autoComplete="organization" value={company}
                                               onChange={(e: ChangeEvent<HTMLInputElement>) => setCompany(e.target.value)}
                                               aria-describedby="signup-slug"
                                               className={fieldClass} placeholder="Acme Design"/>
                                    </div>
                                </div>
                                <p id="signup-slug" className="-mt-2 truncate text-xs text-slate-500 dark:text-slate-400">
                                    Your workspace: <span className="font-mono text-slate-700 dark:text-slate-300">tandem.app/<span className="text-violet-600 dark:text-violet-400">{slug}</span></span>
                                </p>

                                <div>
                                    <label htmlFor="signup-email" className="text-sm font-medium text-slate-700 dark:text-slate-300">Work email</label>
                                    <input id="signup-email" type="email" autoComplete="email" value={email}
                                           onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                           aria-invalid={touched && !emailValid ? true : undefined}
                                           aria-describedby={touched && !emailValid ? "signup-email-error" : undefined}
                                           className={fieldClass} placeholder="jordan@acme.com"/>
                                    {touched && !emailValid && (
                                        <p id="signup-email-error" className="mt-1.5 text-sm text-rose-600 dark:text-rose-400">Enter a valid work email.</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="signup-password" className="text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                                    <input id="signup-password" type="password" autoComplete="new-password" value={password}
                                           onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                           aria-describedby="signup-password-rules"
                                           aria-invalid={touched && score < rules.length ? true : undefined}
                                           className={fieldClass}/>
                                    <div className="mt-2.5 flex items-center gap-3">
                                        <div className="grid flex-1 grid-cols-4 gap-1.5" aria-hidden="true">
                                            {rules.map((rule, i) => (
                                                <span key={rule.label} className="h-1.5 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                                                    <motion.span className={`block h-full ${strengthColors[score]}`}
                                                                 initial={false}
                                                                 animate={{width: i < score ? "100%" : "0%"}}
                                                                 transition={{duration: 0.3}}/>
                                                </span>
                                            ))}
                                        </div>
                                        <span className="w-16 text-right text-xs font-medium text-slate-500 dark:text-slate-400" aria-live="polite">
                                            {password ? strengthLabels[score] : ""}
                                        </span>
                                    </div>
                                    <ul id="signup-password-rules" className="mt-3 grid gap-1.5 sm:grid-cols-2">
                                        {rules.map((rule, i) => (
                                            <li key={rule.label}
                                                className={`flex items-center gap-1.5 text-xs transition-colors ${passed[i] ? "text-emerald-700 dark:text-emerald-400" : touched ? "text-rose-600 dark:text-rose-400" : "text-slate-500 dark:text-slate-400"}`}>
                                                {passed[i] ? <LuCheck className="h-3.5 w-3.5 shrink-0"/> : <LuX className="h-3.5 w-3.5 shrink-0"/>}
                                                {rule.label}
                                                <span className="sr-only">{passed[i] ? "(met)" : "(not met)"}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <label className={`flex items-start gap-2.5 text-sm ${touched && !agreed ? "text-rose-600 dark:text-rose-400" : "text-slate-600 dark:text-slate-400"}`}>
                                    <input type="checkbox" checked={agreed} onChange={(e: ChangeEvent<HTMLInputElement>) => setAgreed(e.target.checked)}
                                           className="mt-0.5 h-4 w-4 rounded accent-violet-600"/>
                                    <span>
                                        I agree to the <a href="#" className="font-medium text-slate-900 underline underline-offset-4 dark:text-white">terms</a> and <a href="#" className="font-medium text-slate-900 underline underline-offset-4 dark:text-white">privacy policy</a>.
                                    </span>
                                </label>

                                <button type="submit" disabled={submitting}
                                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white shadow-sm shadow-violet-600/20 outline-none transition-colors hover:bg-violet-500 focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 disabled:opacity-70 dark:focus-visible:ring-offset-slate-900">
                                    {submitting && <LuLoader className="h-4 w-4 animate-spin"/>}
                                    {submitting ? "Creating workspace" : "Create workspace"}
                                </button>
                            </form>

                            <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
                                Already have an account? <a href="#" className="font-medium text-violet-700 hover:underline dark:text-violet-400">Sign in</a>
                            </p>
                        </motion.div>
                    ) : (
                        <motion.div key="sent" role="status" initial={{opacity: 0, x: 20}} animate={{opacity: 1, x: 0}} transition={{duration: 0.25}}
                                    className="py-6 text-center">
                            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-100 text-violet-600 dark:bg-violet-500/15 dark:text-violet-300">
                                <LuMail className="h-6 w-6"/>
                            </span>
                            <h1 className="mt-5 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">Check your inbox</h1>
                            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                                We sent a confirmation link to <span className="font-medium text-slate-900 dark:text-white">{email.trim()}</span>.
                                It expires in 24 hours.
                            </p>
                            <button type="button" onClick={() => setStep("form")}
                                    className="mt-6 inline-flex items-center gap-1.5 rounded-lg text-sm font-medium text-slate-600 outline-none hover:text-slate-900 focus-visible:ring-2 focus-visible:ring-violet-500 dark:text-slate-400 dark:hover:text-white">
                                <LuArrowLeft className="h-4 w-4"/> Use a different email
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};

export default SignUpCard;
