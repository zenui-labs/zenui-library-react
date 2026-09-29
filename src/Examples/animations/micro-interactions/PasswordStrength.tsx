import {useId, useState} from "react";
import type {FormEvent} from "react";
import {motion, useAnimate, useReducedMotion} from "framer-motion";

export interface PasswordRule {
    label: string;
    test: (value: string) => boolean;
}

// Colors for the empty state and the four strength steps.
const levelStyles = [
    {bar: "bg-gray-300 dark:bg-slate-600", text: "text-gray-500 dark:text-slate-400"},
    {bar: "bg-rose-500", text: "text-rose-600 dark:text-rose-400"},
    {bar: "bg-amber-500", text: "text-amber-600 dark:text-amber-400"},
    {bar: "bg-lime-500", text: "text-lime-600 dark:text-lime-400"},
    {bar: "bg-emerald-500", text: "text-emerald-600 dark:text-emerald-400"},
];

// An eye whose slash is drawn in when the password is hidden.
const EyeIcon = ({hidden}: {hidden: boolean}) => (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/>
        <motion.circle cx="12" cy="12" r="3" initial={false} animate={{scale: hidden ? 0.6 : 1}} style={{transformOrigin: "center"}}/>
        <motion.path d="M4 4l16 16" initial={false} animate={{pathLength: hidden ? 1 : 0, opacity: hidden ? 1 : 0}} transition={{duration: 0.25}}/>
    </svg>
);

export interface PasswordStrengthProps {
    rules: PasswordRule[];
    /** How many rules must pass before the password can be saved. */
    minRules?: number;
    /** Pass it with `onChange` to control the field. */
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    /** Called with the password when it is strong enough to save. */
    onSubmit?: (password: string) => void;
    label?: string;
    placeholder?: string;
    /** Five labels: the empty state, then weak to strong. */
    levelLabels?: [string, string, string, string, string];
    /** Shown when the password is saved before enough rules pass. */
    weakMessage?: string;
    submitLabel?: string;
    /** Button text after a successful save. */
    savedLabel?: string;
    className?: string;
}

/** A password field with a segmented strength meter and a checklist that ticks off as rules are met. */
export const PasswordStrength = ({
    rules,
    minRules = 3,
    value: valueProp,
    defaultValue = "",
    onChange,
    onSubmit,
    label = "Create a password",
    placeholder = "At least 12 characters",
    levelLabels = ["Enter a password", "Weak", "Fair", "Good", "Strong"],
    weakMessage = "Choose a stronger password. Meet at least three of the rules below.",
    submitLabel = "Save password",
    savedLabel = "Password saved",
    className = "",
}: PasswordStrengthProps) => {
    const reduceMotion = useReducedMotion();
    const [innerValue, setInnerValue] = useState(defaultValue);
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState("");
    const [created, setCreated] = useState(false);
    const [scope, animate] = useAnimate<HTMLDivElement>();
    const inputId = useId();
    const meterId = useId();
    const errorId = useId();
    const value = valueProp ?? innerValue;

    const passed = rules.map((rule) => rule.test(value));
    const passedCount = passed.filter(Boolean).length;
    // Scales the passed rules onto four steps, so any number of rules fills the meter.
    const score = value ? Math.max(1, Math.round((passedCount / Math.max(rules.length, 1)) * 4)) : 0;
    const level = levelStyles[score];

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!value || passedCount < minRules) {
            setError(weakMessage);
            setCreated(false);
            // A short shake draws the eye back to the field.
            if (!reduceMotion) animate(scope.current, {x: [0, -8, 8, -6, 6, -3, 0]}, {duration: 0.45});
            return;
        }
        setError("");
        setCreated(true);
        onSubmit?.(value);
    };

    return (
        <form onSubmit={handleSubmit} noValidate className={`w-full max-w-sm ${className}`}>
            <label htmlFor={inputId} className="text-sm font-medium text-gray-900 dark:text-white">
                {label}
            </label>
            <div
                ref={scope}
                className={`mt-2 flex items-center rounded-xl border bg-white pr-1.5 transition-colors focus-within:ring-4 dark:bg-slate-900 ${
                    error
                        ? "border-rose-400 focus-within:ring-rose-500/15 dark:border-rose-500/60"
                        : "border-gray-200 focus-within:border-indigo-500 focus-within:ring-indigo-500/15 dark:border-slate-700 dark:focus-within:border-indigo-400"
                }`}
            >
                <input
                    id={inputId}
                    type={visible ? "text" : "password"}
                    autoComplete="new-password"
                    value={value}
                    onChange={(event) => {
                        if (valueProp === undefined) setInnerValue(event.target.value);
                        onChange?.(event.target.value);
                        setError("");
                        setCreated(false);
                    }}
                    aria-describedby={`${meterId}${error ? ` ${errorId}` : ""}`}
                    aria-invalid={error ? true : undefined}
                    className="min-w-0 flex-1 rounded-xl bg-transparent px-3.5 py-2.5 font-mono text-sm text-gray-900 placeholder:font-sans placeholder:text-gray-400 focus:outline-none dark:text-white dark:placeholder:text-slate-500"
                    placeholder={placeholder}
                />
                <button
                    type="button"
                    aria-pressed={visible}
                    aria-label="Show password"
                    onClick={() => setVisible((current) => !current)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                >
                    <EyeIcon hidden={!visible}/>
                </button>
            </div>

            <div className="mt-3 grid grid-cols-4 gap-1.5" aria-hidden="true">
                {[1, 2, 3, 4].map((segment) => (
                    <div key={segment} className="h-1.5 overflow-hidden rounded-full bg-gray-100 dark:bg-slate-800">
                        <motion.div
                            className={`h-full origin-left rounded-full transition-colors duration-300 ${level.bar}`}
                            initial={false}
                            animate={{scaleX: segment <= score ? 1 : 0}}
                            transition={reduceMotion ? {duration: 0} : {type: "spring", stiffness: 300, damping: 30, delay: segment <= score ? (segment - 1) * 0.05 : 0}}
                        />
                    </div>
                ))}
            </div>
            <p id={meterId} className={`mt-2 text-xs font-medium transition-colors ${level.text}`}>
                Strength: {levelLabels[score]}
            </p>

            <ul className="mt-4 space-y-2">
                {rules.map((rule, index) => (
                    <li key={rule.label} className={`flex items-center gap-2.5 text-sm transition-colors ${passed[index] ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-slate-400"}`}>
                        <motion.span
                            className={`flex h-5 w-5 items-center justify-center rounded-full transition-colors duration-200 ${passed[index] ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-400 dark:bg-slate-800 dark:text-slate-500"}`}
                            initial={false}
                            animate={{scale: passed[index] && !reduceMotion ? [1, 1.25, 1] : 1}}
                            transition={{duration: 0.3}}
                        >
                            <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                                <motion.path d="M5 12.5l4.5 4.5L19 7.5" initial={false} animate={{pathLength: passed[index] ? 1 : 0, opacity: passed[index] ? 1 : 0}} transition={{duration: reduceMotion ? 0 : 0.25}}/>
                                <motion.circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" initial={false} animate={{scale: passed[index] ? 0 : 1}} style={{transformOrigin: "center"}}/>
                            </svg>
                        </motion.span>
                        {rule.label}
                        <span className="sr-only">{passed[index] ? ", met" : ", not met"}</span>
                    </li>
                ))}
            </ul>

            {error && (
                <p id={errorId} role="alert" className="mt-4 text-sm text-rose-600 dark:text-rose-400">
                    {error}
                </p>
            )}
            <button
                type="submit"
                className="mt-5 w-full rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:focus-visible:ring-offset-slate-950"
            >
                {created ? savedLabel : submitLabel}
            </button>
        </form>
    );
};
