import {useId, useState} from "react";
import type {ChangeEvent, FormEvent} from "react";

type Status = "idle" | "submitting" | "done" | "error";

export interface JoinNewsletterSplitProps {
    /** Illustration shown next to the copy. */
    imageSrc: string;
    /** Leave empty when the illustration is decorative. */
    imageAlt?: string;
    /** Called with the trimmed email. Return a promise to keep the button disabled until it settles. */
    onSubmit?: (email: string) => void | Promise<unknown>;
    title?: string;
    description?: string;
    /** Label read by screen readers for the email field. */
    emailLabel?: string;
    placeholder?: string;
    buttonLabel?: string;
    successMessage?: string;
    errorMessage?: string;
    className?: string;
}

/** An illustration next to a short invitation and a rounded email field with the button attached on the right. */
export const JoinNewsletterSplit = ({
    imageSrc,
    imageAlt = "",
    onSubmit,
    title = "Join us",
    description = "Subscribe to our weekly newsletter and be part of our journey of self discovery and love.",
    emailLabel = "Email address",
    placeholder = "Email address",
    buttonLabel = "Submit",
    successMessage = "Thanks for subscribing. Check your inbox to confirm.",
    errorMessage = "We could not subscribe you. Try again in a moment.",
    className = "",
}: JoinNewsletterSplitProps) => {
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
            <div className="flex lg:flex-row flex-col items-center justify-between gap-[50px] lg:gap-[20px]">
                <div className="w-full sm:w-[80%] lg:w-[50%]">
                    <img src={imageSrc} alt={imageAlt} className="w-full"/>
                </div>

                <div className="w-full lg:w-[50%]">
                    <h2 className="text-[2rem] dark:text-[#abc2d3] sm:text-[3rem] font-[500] text-[#424242] leading-[50px]">{title}</h2>
                    <p className="text-[1.1rem] dark:text-slate-400 mt-3">{description}</p>

                    <form onSubmit={handleSubmit} className="mt-12 relative">
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
                            className="w-full py-4 pl-4 dark:bg-transparent dark:placeholder:text-slate-500 dark:text-[#abc2d3] pr-[120px] outline-none focus:ring-0 border rounded-full border-[#00b0ff] focus:border-[#029de0]"
                        />
                        <button
                            type="submit"
                            disabled={status === "submitting"}
                            className="px-8 py-3 absolute top-0 right-0 h-full rounded-full rounded-tl-[0px] hover:bg-[#02aaf2] bg-[#00b0ff] text-white disabled:cursor-wait disabled:opacity-70"
                        >
                            {buttonLabel}
                        </button>
                    </form>

                    <div role="status" aria-live="polite">
                        {status === "done" && <p className="mt-3 pl-4 text-sm text-emerald-600 dark:text-emerald-400">{successMessage}</p>}
                        {status === "error" && <p className="mt-3 pl-4 text-sm text-rose-600 dark:text-rose-400">{errorMessage}</p>}
                    </div>
                </div>
            </div>
        </section>
    );
};
