import {useId, useState} from "react";
import type {ChangeEvent, FormEvent, ReactNode} from "react";

type Status = "idle" | "submitting" | "done" | "error";

export interface WeeklyNewsletterSignupProps {
    /** Illustration shown next to the copy. */
    imageSrc: string;
    /** Leave empty when the illustration is decorative. */
    imageAlt?: string;
    /** Called with the trimmed email. Return a promise to keep the button disabled until it settles. */
    onSubmit?: (email: string) => void | Promise<unknown>;
    /** Small bold line above the title. */
    eyebrow?: string;
    title?: string;
    description?: ReactNode;
    /** Label read by screen readers for the email field. */
    emailLabel?: string;
    placeholder?: string;
    buttonLabel?: string;
    successMessage?: string;
    errorMessage?: string;
    className?: string;
}

/** A newsletter section with an illustration, a large accent title and an email field with an inline button. */
export const WeeklyNewsletterSignup = ({
    imageSrc,
    imageAlt = "",
    onSubmit,
    eyebrow = "Get our weekly",
    title = "newsletter",
    description = (
        <>
            Get weekly updates on the newest design stories, case studies and tips right in your mailbox.{" "}
            <b>Subscribe now.</b>
        </>
    ),
    emailLabel = "Email address",
    placeholder = "Email address",
    buttonLabel = "Subscribe",
    successMessage = "Thanks for subscribing. Check your inbox to confirm.",
    errorMessage = "We could not subscribe you. Try again in a moment.",
    className = "",
}: WeeklyNewsletterSignupProps) => {
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
        <section className={`w-full rounded-xl sm:p-[20px] ${className}`}>
            <div className="flex lg:flex-row flex-col items-center justify-between gap-[20px]">
                <div className="w-full sm:w-[80%] lg:w-[50%]">
                    <img src={imageSrc} alt={imageAlt} className="w-full"/>
                </div>

                <div className="w-full lg:w-[45%]">
                    <b className="text-[1.3rem] dark:text-[#abc2d3] sm:text-[2rem]">{eyebrow}</b>
                    <h2 className="text-[2.1rem] sm:text-[3.2rem] font-[800] uppercase text-[#FF354D] leading-[50px]">{title}</h2>
                    <p className="text-[1rem] dark:text-slate-400 sm:text-[1.3rem] mt-5 sm:mt-8">{description}</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="relative mt-10 w-full sm:w-[85%] mx-auto">
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
                    className="py-3 px-4 dark:bg-slate-900 dark:border-slate-700 dark:placeholder:text-slate-500 dark:text-[#abc2d3] pr-[130px] border border-[#e5eaf2] rounded-md outline-none focus:ring-0 focus:border-[#FF354D] w-full"
                />
                <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="py-3 px-6 h-full absolute top-0 right-0 hover:bg-[#ea253c] bg-[#FF354D] text-white rounded-r-md disabled:cursor-wait disabled:opacity-70"
                >
                    {buttonLabel}
                </button>
            </form>

            <div role="status" aria-live="polite" className="w-full sm:w-[85%] mx-auto">
                {status === "done" && <p className="mt-3 text-sm text-emerald-600 dark:text-emerald-400">{successMessage}</p>}
                {status === "error" && <p className="mt-3 text-sm text-rose-600 dark:text-rose-400">{errorMessage}</p>}
            </div>
        </section>
    );
};
