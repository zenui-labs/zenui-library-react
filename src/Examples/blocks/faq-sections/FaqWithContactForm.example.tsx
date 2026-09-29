import {useEffect, useId, useRef, useState} from "react";
import type {ChangeEvent, FormEvent} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {LuCheck, LuClock, LuMinus, LuPlus, LuRotateCcw, LuSend} from "react-icons/lu";

interface Faq {
    id: string;
    question: string;
    answer: string;
}

const faqs: Faq[] = [
    {id: "ship", question: "When will my order ship?", answer: "Orders placed before 2 PM Eastern ship the same weekday from our warehouse in Ohio. You get a tracking link by email as soon as the label prints."},
    {id: "returns", question: "What is your return policy?", answer: "Return any unused item within 60 days for a full refund. Start a return from your order page and print the prepaid label. Refunds land 3 to 5 days after we receive the box."},
    {id: "size", question: "How do I pick the right size?", answer: "Each product page has a fit guide measured on the actual garment. If you are between sizes, our fit team suggests going up for outerwear and down for knitwear."},
    {id: "intl", question: "Do you ship internationally?", answer: "We ship to 38 countries. Duties and taxes are calculated at checkout, so there are no surprise fees at delivery."},
    {id: "repair", question: "Do you repair worn items?", answer: "Yes. Send us anything from our workshop line and we will patch, re-stitch or replace zippers for free during the first two years."},
];

type Status = "idle" | "submitting" | "success" | "error";

interface FormState {
    email: string;
    message: string;
}

interface FormErrors {
    email?: string;
    message?: string;
}

const validate = (values: FormState): FormErrors => {
    const errors: FormErrors = {};
    if (!values.email.trim()) errors.email = "Enter your email so we can reply.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "That email address looks incomplete.";
    if (values.message.trim().length < 10) errors.message = "Add a few more words so we can help.";
    return errors;
};

const team = [
    {initials: "RA", color: "from-rose-400 to-orange-400"},
    {initials: "JK", color: "from-sky-400 to-indigo-500"},
    {initials: "ML", color: "from-emerald-400 to-teal-500"},
];

const FaqWithContactForm = () => {
    const [openId, setOpenId] = useState<string | null>("ship");
    const [values, setValues] = useState<FormState>({email: "", message: ""});
    const [errors, setErrors] = useState<FormErrors>({});
    const [status, setStatus] = useState<Status>("idle");
    const timer = useRef<number | undefined>(undefined);
    const reduceMotion = useReducedMotion();
    const uid = useId();

    useEffect(() => () => window.clearTimeout(timer.current), []);

    const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = event.target;
        setValues((v) => ({...v, [name]: value}));
        if (errors[name as keyof FormErrors]) setErrors((e) => ({...e, [name]: undefined}));
    };

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const found = validate(values);
        setErrors(found);
        if (found.email || found.message) return;
        setStatus("submitting");
        // Simulated request. Addresses at example.com fail, so the error state can be tried.
        timer.current = window.setTimeout(() => {
            setStatus(values.email.endsWith("@example.com") ? "error" : "success");
        }, 1200);
    };

    const reset = () => {
        setValues({email: "", message: ""});
        setStatus("idle");
    };

    const inputClass = (invalid: boolean) =>
        `w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition-shadow focus:ring-4 disabled:opacity-60 dark:bg-slate-950 dark:text-white ${invalid
            ? "border-rose-400 focus:ring-rose-500/15 dark:border-rose-500/60"
            : "border-slate-200 focus:border-orange-400 focus:ring-orange-500/15 dark:border-slate-700"}`;

    return (
        <section className="w-full bg-white px-4 py-16 sm:px-8 sm:py-24 dark:bg-slate-950">
            <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-16">
                <div>
                    <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Help</p>
                    <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-white">Orders, returns and repairs</h2>

                    <div className="mt-10 border-t border-slate-200 dark:border-slate-800">
                        {faqs.map((faq) => {
                            const isOpen = openId === faq.id;
                            return (
                                <div key={faq.id} className="border-b border-slate-200 dark:border-slate-800">
                                    <h3>
                                        <button
                                            type="button"
                                            id={`${uid}-${faq.id}-button`}
                                            aria-expanded={isOpen}
                                            aria-controls={`${uid}-${faq.id}-panel`}
                                            onClick={() => setOpenId(isOpen ? null : faq.id)}
                                            className="group flex w-full items-center justify-between gap-6 py-5 text-left outline-none"
                                        >
                                            <span className="rounded font-medium text-slate-900 group-focus-visible:ring-2 group-focus-visible:ring-orange-500 group-focus-visible:ring-offset-4 dark:text-white dark:group-focus-visible:ring-offset-slate-950">
                                                {faq.question}
                                            </span>
                                            <span className="relative h-5 w-5 shrink-0 text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white">
                                                <AnimatePresence initial={false} mode="wait">
                                                    <motion.span
                                                        key={isOpen ? "minus" : "plus"}
                                                        initial={{rotate: -90, opacity: 0}}
                                                        animate={{rotate: 0, opacity: 1}}
                                                        exit={{rotate: 90, opacity: 0}}
                                                        transition={{duration: 0.15}}
                                                        className="absolute inset-0"
                                                    >
                                                        {isOpen ? <LuMinus className="h-5 w-5"/> : <LuPlus className="h-5 w-5"/>}
                                                    </motion.span>
                                                </AnimatePresence>
                                            </span>
                                        </button>
                                    </h3>
                                    <AnimatePresence initial={false}>
                                        {isOpen && (
                                            <motion.div
                                                id={`${uid}-${faq.id}-panel`}
                                                role="region"
                                                aria-labelledby={`${uid}-${faq.id}-button`}
                                                initial={{height: 0, opacity: 0}}
                                                animate={{height: "auto", opacity: 1}}
                                                exit={{height: 0, opacity: 0}}
                                                transition={{duration: 0.3, ease: [0.16, 1, 0.3, 1]}}
                                                className="overflow-hidden"
                                            >
                                                <p className="max-w-xl pb-6 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{faq.answer}</p>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <aside className="lg:sticky lg:top-8 lg:self-start" aria-labelledby={`${uid}-contact-title`}>
                    <div className="rounded-3xl border border-slate-200 bg-gradient-to-b from-orange-50 to-white p-6 sm:p-8 dark:border-slate-800 dark:from-orange-500/10 dark:to-slate-900">
                        <div className="flex items-center justify-between">
                            <div className="flex -space-x-2">
                                {team.map((member) => (
                                    <span key={member.initials}
                                          className={`flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br text-xs font-semibold text-white ring-2 ring-white dark:ring-slate-900 ${member.color}`}>
                                        {member.initials}
                                    </span>
                                ))}
                            </div>
                            <span className="flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-xs font-medium text-slate-600 shadow-sm dark:bg-slate-800 dark:text-slate-300">
                                <span className="relative flex h-2 w-2">
                                    {!reduceMotion && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"/>}
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"/>
                                </span>
                                Online now
                            </span>
                        </div>
                        <h3 id={`${uid}-contact-title`} className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">Ask the store team</h3>
                        <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-400">
                            <LuClock className="h-4 w-4"/> Usually replies within 2 hours
                        </p>

                        <AnimatePresence mode="wait" initial={false}>
                            {status === "success" ? (
                                <motion.div
                                    key="success"
                                    initial={{opacity: 0, scale: 0.97}}
                                    animate={{opacity: 1, scale: 1}}
                                    exit={{opacity: 0}}
                                    role="status"
                                    className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center dark:border-emerald-500/30 dark:bg-emerald-500/10"
                                >
                                    <span className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white">
                                        <LuCheck className="h-5 w-5"/>
                                    </span>
                                    <p className="mt-3 font-medium text-slate-900 dark:text-white">Message sent</p>
                                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">We will reply to {values.email}.</p>
                                    <button
                                        type="button"
                                        onClick={reset}
                                        className="mt-4 inline-flex items-center gap-1.5 rounded-lg text-sm font-medium text-emerald-700 outline-none hover:text-emerald-900 focus-visible:ring-2 focus-visible:ring-emerald-500 dark:text-emerald-300"
                                    >
                                        <LuRotateCcw className="h-3.5 w-3.5"/> Send another question
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.form
                                    key="form"
                                    initial={{opacity: 0}}
                                    animate={{opacity: 1}}
                                    exit={{opacity: 0}}
                                    onSubmit={onSubmit}
                                    noValidate
                                    className="mt-6 space-y-4"
                                >
                                    <div>
                                        <label htmlFor={`${uid}-email`} className="text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                                        <input
                                            id={`${uid}-email`}
                                            name="email"
                                            type="email"
                                            autoComplete="email"
                                            value={values.email}
                                            onChange={onChange}
                                            disabled={status === "submitting"}
                                            aria-invalid={Boolean(errors.email)}
                                            aria-describedby={errors.email ? `${uid}-email-error` : undefined}
                                            placeholder="you@company.com"
                                            className={`mt-1.5 ${inputClass(Boolean(errors.email))}`}
                                        />
                                        {errors.email && <p id={`${uid}-email-error`} className="mt-1.5 text-xs text-rose-600 dark:text-rose-400">{errors.email}</p>}
                                    </div>
                                    <div>
                                        <label htmlFor={`${uid}-message`} className="text-sm font-medium text-slate-700 dark:text-slate-300">Your question</label>
                                        <textarea
                                            id={`${uid}-message`}
                                            name="message"
                                            rows={4}
                                            value={values.message}
                                            onChange={onChange}
                                            disabled={status === "submitting"}
                                            aria-invalid={Boolean(errors.message)}
                                            aria-describedby={errors.message ? `${uid}-message-error` : undefined}
                                            placeholder="Order number and what you need help with"
                                            className={`mt-1.5 resize-none ${inputClass(Boolean(errors.message))}`}
                                        />
                                        {errors.message && <p id={`${uid}-message-error`} className="mt-1.5 text-xs text-rose-600 dark:text-rose-400">{errors.message}</p>}
                                    </div>

                                    {status === "error" && (
                                        <p role="alert" className="rounded-xl bg-rose-50 px-3.5 py-2.5 text-sm text-rose-700 dark:bg-rose-500/10 dark:text-rose-300">
                                            We could not send that. Check your connection and try again.
                                        </p>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={status === "submitting"}
                                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white outline-none transition-colors hover:bg-slate-700 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 dark:focus-visible:ring-offset-slate-900"
                                    >
                                        {status === "submitting" ? (
                                            <>
                                                <motion.span
                                                    aria-hidden="true"
                                                    className="h-4 w-4 rounded-full border-2 border-current border-t-transparent"
                                                    animate={{rotate: 360}}
                                                    transition={{duration: 0.8, ease: "linear", repeat: Infinity}}
                                                />
                                                Sending
                                            </>
                                        ) : (
                                            <>
                                                <LuSend className="h-4 w-4"/> Send question
                                            </>
                                        )}
                                    </button>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                </aside>
            </div>
        </section>
    );
};

export default FaqWithContactForm;
