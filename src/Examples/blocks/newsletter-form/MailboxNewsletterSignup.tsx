import {useId, useState} from "react";
import type {ChangeEvent, ComponentType, FormEvent, ReactNode} from "react";
import {AiOutlineMail} from "react-icons/ai";

type Status = "idle" | "submitting" | "done" | "error";

export interface MailboxNewsletterSignupProps {
    /** Illustration shown next to the form. */
    imageSrc: string;
    /** Leave empty when the illustration is decorative. */
    imageAlt?: string;
    /** Called with the trimmed email. Return a promise to keep the button disabled until it settles. */
    onSubmit?: (email: string) => void | Promise<unknown>;
    /** Icon inside the email field. */
    icon?: ComponentType<{className?: string}>;
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

/** An illustration next to a stacked form with an icon in the email field and a full width button. */
export const MailboxNewsletterSignup = ({
    imageSrc,
    imageAlt = "",
    onSubmit,
    icon: Icon = AiOutlineMail,
    eyebrow = "Subscribe to our",
    title = "newsletter",
    description = (
        <>
            Get weekly updates on the newest design stories, case studies and tips right in your mailbox.{" "}
            <b>Subscribe now.</b>
        </>
    ),
    emailLabel = "Email address",
    placeholder = "Email address",
    buttonLabel = "Submit",
    successMessage = "Thanks for subscribing. Check your inbox to confirm.",
    errorMessage = "We could not subscribe you. Try again in a moment.",
    className = "",
}: MailboxNewsletterSignupProps) => {
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
            <div className="flex lg:flex-row flex-col items-center justify-between gap-[20px]">
                <div className="w-full sm:w-[80%] lg:w-[50%]">
                    <img src={imageSrc} alt={imageAlt} className="w-full"/>
                </div>

                <div className="w-full lg:w-[50%]">
                    <b className="text-[1rem] dark:text-[#abc2d3] sm:text-[1.8rem] text-[#424242]">{eyebrow}</b>
                    <h2 className="text-[2rem] dark:text-[#abc2d3] sm:text-[3rem] font-[800] capitalize text-[#424242] leading-[50px]">{title}</h2>
                    <p className="text-[1.1rem] dark:text-[#abc2d3] mt-3">{description}</p>

                    <form onSubmit={handleSubmit} className="mt-5">
                        <div className="relative">
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
                                className="w-full py-3 dark:border-slate-700 dark:bg-slate-900 dark:placeholder:text-slate-500 dark:text-[#abc2d3] pr-4 pl-14 outline-none focus:ring-0 border rounded-md border-[#00b0ff] focus:border-[#029de0]"
                            />
                            <span aria-hidden className="flex absolute top-[50%] transform translate-y-[-50%] left-3 text-[#00b0ff] text-[1.7rem] pointer-events-none">
                                <Icon/>
                            </span>
                        </div>

                        <button
                            type="submit"
                            disabled={status === "submitting"}
                            className="w-full py-3 rounded-md bg-[#00b0ff] hover:bg-[#029de0] text-white mt-4 disabled:cursor-wait disabled:opacity-70"
                        >
                            {buttonLabel}
                        </button>
                    </form>

                    <div role="status" aria-live="polite">
                        {status === "done" && <p className="mt-3 text-sm text-emerald-600 dark:text-emerald-400">{successMessage}</p>}
                        {status === "error" && <p className="mt-3 text-sm text-rose-600 dark:text-rose-400">{errorMessage}</p>}
                    </div>
                </div>
            </div>
        </section>
    );
};
