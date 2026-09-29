import {useId, useState} from "react";
import type {ChangeEvent, ComponentType, FormEvent, ReactNode} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {LuInfo, LuEye, LuEyeOff, LuGithub, LuLoader} from "react-icons/lu";

export type SignInIcon = ComponentType<{className?: string}>;

export interface SignInValues {
    email: string;
    password: string;
    remember: boolean;
}

export interface SignInProvider {
    id: string;
    label: string;
    icon: SignInIcon;
}

export interface SignInStat {
    label: string;
    value: string;
    /** Trend values drawn as a small line chart, oldest first. Leave out to hide the chart. */
    series?: number[];
}

export interface SignInTestimonial {
    quote: string;
    name: string;
    role: string;
    /** Shown in the avatar circle, for example "IK". */
    initials: string;
}

export interface SignInSplitProps {
    /** Shown in the brand panel above the quote. */
    stat: SignInStat;
    testimonial: SignInTestimonial;
    brandName?: string;
    /** Replaces the default triangle mark next to the brand name. */
    logo?: ReactNode;
    title?: string;
    /** Social sign-in buttons. Pass an empty array to hide them and the divider. */
    providers?: SignInProvider[];
    onProviderSelect?: (id: string) => void;
    /** Runs after the fields pass validation. Reject with an Error to show its message above the form. */
    onSubmit?: (values: SignInValues) => Promise<void> | void;
    defaultValues?: Partial<SignInValues>;
    signUpHref?: string;
    forgotPasswordHref?: string;
    ssoHref?: string;
    rememberLabel?: string;
    className?: string;
}

type FormErrors = Partial<Record<"email" | "password" | "form", string>>;

const validate = (values: SignInValues): FormErrors => {
    const errors: FormErrors = {};
    if (!values.email.trim()) errors.email = "Enter your work email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = "That email address is missing a part.";
    if (!values.password) errors.password = "Enter your password.";
    else if (values.password.length < 8) errors.password = "Passwords are at least 8 characters.";
    return errors;
};

export const GoogleMark = ({className = "h-4 w-4"}: {className?: string}) => (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <path fill="#4285F4" d="M22.5 12.3c0-.8-.1-1.5-.2-2.2H12v4.2h5.9a5 5 0 0 1-2.2 3.3v2.7h3.6c2-1.9 3.2-4.7 3.2-8Z"/>
        <path fill="#34A853" d="M12 23c3 0 5.5-1 7.3-2.7l-3.6-2.7c-1 .7-2.2 1-3.7 1-2.8 0-5.2-1.9-6.1-4.5H2.2v2.8A11 11 0 0 0 12 23Z"/>
        <path fill="#FBBC05" d="M5.9 14.1a6.6 6.6 0 0 1 0-4.2V7.1H2.2a11 11 0 0 0 0 9.8l3.7-2.8Z"/>
        <path fill="#EA4335" d="M12 5.4c1.6 0 3 .6 4.1 1.6l3.1-3.1A11 11 0 0 0 2.2 7.1l3.7 2.8C6.8 7.3 9.2 5.4 12 5.4Z"/>
    </svg>
);

const defaultProviders: SignInProvider[] = [
    {id: "google", label: "Google", icon: GoogleMark},
    {id: "github", label: "GitHub", icon: LuGithub},
];

// Draws the series in a 200 by 60 box, between y 10 and y 50.
const toPath = (series: number[]) => {
    const min = Math.min(...series);
    const max = Math.max(...series);
    const range = max - min || 1;
    const step = 200 / (series.length - 1);
    return series.map((value, index) => `${index ? "L" : "M"}${+(index * step).toFixed(1)} ${+(50 - ((value - min) / range) * 40).toFixed(1)}`).join(" ");
};

const inputBase = "w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 transition-shadow focus:outline-none focus:ring-4 dark:bg-slate-900 dark:text-white";
const inputOk = "border-slate-300 focus:border-teal-600 focus:ring-teal-600/10 dark:border-slate-700 dark:focus:border-teal-400";
const inputError = "border-rose-400 focus:border-rose-500 focus:ring-rose-500/10 dark:border-rose-500/60";

/** A sign-in form with social buttons and inline validation, next to a brand panel with a stat and a customer quote. */
export const SignInSplit = ({
    stat,
    testimonial,
    brandName = "Summit",
    logo,
    title = "Sign in to your workspace",
    providers = defaultProviders,
    onProviderSelect,
    onSubmit,
    defaultValues,
    signUpHref = "#",
    forgotPasswordHref = "#",
    ssoHref = "#",
    rememberLabel = "Keep me signed in for 30 days",
    className = "",
}: SignInSplitProps) => {
    const uid = useId();
    const emailId = `${uid}-email`;
    const passwordId = `${uid}-password`;
    const [values, setValues] = useState<SignInValues>({email: "", password: "", remember: true, ...defaultValues});
    const [errors, setErrors] = useState<FormErrors>({});
    const [showPassword, setShowPassword] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const line = stat.series && stat.series.length > 1 ? toPath(stat.series) : null;

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        const {name, value, type, checked} = event.target;
        setValues((prev) => ({...prev, [name]: type === "checkbox" ? checked : value}));
        if (name === "email" || name === "password") setErrors((prev) => ({...prev, [name]: undefined, form: undefined}));
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const next = validate(values);
        setErrors(next);
        if (Object.keys(next).length > 0 || !onSubmit) return;
        setSubmitting(true);
        try {
            await onSubmit(values);
        } catch (error) {
            setErrors({form: error instanceof Error ? error.message : "Something went wrong. Try again."});
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section className={`grid w-full bg-white md:grid-cols-2 dark:bg-slate-950 ${className}`}>
            <div className="flex flex-col justify-center px-6 py-12 sm:px-12">
                <div className="mx-auto w-full max-w-sm">
                    <a href="#" className="inline-flex items-center gap-2 rounded-lg font-semibold text-slate-900 outline-none focus-visible:ring-2 focus-visible:ring-teal-600 dark:text-white">
                        {logo ?? (
                            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600 text-white">
                                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true"><path d="M4 18 12 4l8 14H4Z" fill="currentColor"/></svg>
                            </span>
                        )}
                        {brandName}
                    </a>
                    <h1 className="mt-8 text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">{title}</h1>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                        New to {brandName}? <a href={signUpHref} className="font-medium text-teal-700 underline-offset-4 hover:underline dark:text-teal-400">Create an account</a>
                    </p>

                    {providers.length > 0 && (
                        <>
                            <div className="mt-8 grid grid-cols-2 gap-3">
                                {providers.map(({id, label, icon: Icon}) => (
                                    <button key={id} type="button" onClick={() => onProviderSelect?.(id)}
                                            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 px-3 py-2.5 text-sm font-medium text-slate-700 outline-none transition-colors hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-teal-600 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900">
                                        <Icon className="h-4 w-4"/> {label}
                                    </button>
                                ))}
                            </div>

                            <div className="my-6 flex items-center gap-3 text-xs text-slate-400">
                                <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800"/>
                                or continue with email
                                <span className="h-px flex-1 bg-slate-200 dark:bg-slate-800"/>
                            </div>
                        </>
                    )}

                    <form onSubmit={handleSubmit} noValidate className={`space-y-4 ${providers.length > 0 ? "" : "mt-8"}`}>
                        <AnimatePresence>
                            {errors.form && (
                                <motion.div role="alert"
                                            initial={{opacity: 0, height: 0}}
                                            animate={{opacity: 1, height: "auto"}}
                                            exit={{opacity: 0, height: 0}}
                                            className="overflow-hidden">
                                    <p className="flex gap-2 rounded-lg border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300">
                                        <LuInfo className="mt-0.5 h-4 w-4 shrink-0"/>
                                        {errors.form}
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <div>
                            <label htmlFor={emailId} className="block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
                            <input id={emailId} name="email" type="email" autoComplete="email" value={values.email} onChange={onChange}
                                   placeholder="you@company.com"
                                   aria-invalid={errors.email ? true : undefined}
                                   aria-describedby={errors.email ? `${emailId}-error` : undefined}
                                   className={`mt-1.5 ${inputBase} ${errors.email ? inputError : inputOk}`}/>
                            {errors.email && <p id={`${emailId}-error`} className="mt-1.5 text-sm text-rose-600 dark:text-rose-400">{errors.email}</p>}
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor={passwordId} className="block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
                                <a href={forgotPasswordHref} className="rounded text-sm font-medium text-teal-700 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-teal-600 dark:text-teal-400">Forgot password?</a>
                            </div>
                            <div className="relative mt-1.5">
                                <input id={passwordId} name="password" type={showPassword ? "text" : "password"} autoComplete="current-password"
                                       value={values.password} onChange={onChange}
                                       aria-invalid={errors.password ? true : undefined}
                                       aria-describedby={errors.password ? `${passwordId}-error` : undefined}
                                       className={`${inputBase} pr-10 ${errors.password ? inputError : inputOk}`}/>
                                <button type="button" onClick={() => setShowPassword((v) => !v)}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                        aria-pressed={showPassword}
                                        className="absolute right-1.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-slate-400 outline-none hover:text-slate-700 focus-visible:ring-2 focus-visible:ring-teal-600 dark:hover:text-slate-200">
                                    {showPassword ? <LuEyeOff className="h-4 w-4"/> : <LuEye className="h-4 w-4"/>}
                                </button>
                            </div>
                            {errors.password && <p id={`${passwordId}-error`} className="mt-1.5 text-sm text-rose-600 dark:text-rose-400">{errors.password}</p>}
                        </div>

                        <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                            <input type="checkbox" name="remember" checked={values.remember} onChange={onChange}
                                   className="h-4 w-4 rounded border-slate-300 accent-teal-600 focus:ring-2 focus:ring-teal-600 dark:border-slate-600"/>
                            {rememberLabel}
                        </label>

                        <button type="submit" disabled={submitting}
                                className="flex w-full items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm outline-none transition-colors hover:bg-teal-700 focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70 dark:focus-visible:ring-offset-slate-950">
                            {submitting && <LuLoader className="h-4 w-4 animate-spin"/>}
                            {submitting ? "Signing in" : "Sign in"}
                        </button>
                    </form>

                    <p className="mt-6 text-xs text-slate-500">
                        Using SSO? <a href={ssoHref} className="font-medium text-slate-700 underline underline-offset-4 dark:text-slate-300">Sign in with your identity provider</a>
                    </p>
                </div>
            </div>

            {/* Brand panel, hidden on small screens */}
            <div className="relative hidden overflow-hidden bg-teal-950 p-10 md:flex md:flex-col md:justify-between">
                <div aria-hidden="true" className="absolute -right-20 -top-20 h-72 w-72 rounded-full bg-teal-400/30 blur-3xl"/>
                <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle,rgb(255_255_255/0.08)_1px,transparent_1px)] bg-[size:18px_18px]"/>

                <div className="relative rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                    <p className="text-xs text-teal-200/80">{stat.label}</p>
                    <p className="mt-1 text-2xl font-semibold text-white">{stat.value}</p>
                    {line && (
                        <svg viewBox="0 0 200 60" className="mt-3 h-16 w-full" aria-hidden="true">
                            <path d={line} fill="none" stroke="rgb(94 234 212)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d={`${line} V60 H0Z`} fill="rgb(94 234 212 / 0.15)"/>
                        </svg>
                    )}
                </div>

                <figure className="relative">
                    <blockquote className="text-lg leading-relaxed text-white">
                        &ldquo;{testimonial.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-5 flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-400 text-sm font-semibold text-teal-950">{testimonial.initials}</span>
                        <span className="text-sm">
                            <span className="block font-semibold text-white">{testimonial.name}</span>
                            <span className="block text-teal-200/70">{testimonial.role}</span>
                        </span>
                    </figcaption>
                </figure>
            </div>
        </section>
    );
};
