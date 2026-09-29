import {useId, useState} from "react";
import type {ChangeEvent, FormEvent} from "react";

type Status = "idle" | "submitting" | "done" | "error";

export interface CenteredNewsletterFormProps {
    /** Called with the trimmed email. Return a promise to keep the button disabled until it settles. */
    onSubmit?: (email: string) => void | Promise<unknown>;
    title?: string;
    /** Label read by screen readers for the email field. */
    emailLabel?: string;
    placeholder?: string;
    buttonLabel?: string;
    successMessage?: string;
    errorMessage?: string;
    className?: string;
}

/** A centered title above a pill shaped email field with the button inside it. */
export const CenteredNewsletterForm = ({
    onSubmit,
    title = "Subscribe to our newsletter",
    emailLabel = "Email address",
    placeholder = "Email address",
    buttonLabel = "Subscribe",
    successMessage = "Thanks for subscribing. Check your inbox to confirm.",
    errorMessage = "We could not subscribe you. Try again in a moment.",
    className = "",
}: CenteredNewsletterFormProps) => {
    const emailId = useId();
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<Status>("idle");

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        if (status === "done" || status === "error") setStatus("idle");
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setStatus("submitting");
        try {
            await onSubmit?.(email.trim());
            setEmail("");
            setStatus("done");
        } catch {
            setStatus("error");
        }
    };

    return (
        <section className={`w-full rounded-xl p-[20px] ${className}`}>
            <h2 className="text-[1.5rem] sm:text-[2rem] font-[600] text-center text-[#FF354D]">{title}</h2>

            <form onSubmit={handleSubmit} className="relative mt-6 w-full sm:w-[70%] mx-auto">
                <label htmlFor={emailId} className="sr-only">{emailLabel}</label>
                <input
                    id={emailId}
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={handleChange}
                    placeholder={placeholder}
                    className="py-4 pl-6 pr-[130px] dark:bg-slate-900 dark:placeholder:text-slate-500 dark:text-[#abc2d3] dark:border-slate-700 border rounded-full outline-none focus:ring-0 border-[#FF354D] w-full"
                />
                <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="py-3 px-6 absolute top-[50%] translate-y-[-50%] transform right-1.5 hover:bg-[#ea253c] bg-[#FF354D] text-white rounded-full disabled:cursor-wait disabled:opacity-70"
                >
                    {buttonLabel}
                </button>
            </form>

            <div role="status" aria-live="polite">
                {status === "done" && <p className="mt-3 text-center text-sm text-emerald-600 dark:text-emerald-400">{successMessage}</p>}
                {status === "error" && <p className="mt-3 text-center text-sm text-rose-600 dark:text-rose-400">{errorMessage}</p>}
            </div>
        </section>
    );
};
