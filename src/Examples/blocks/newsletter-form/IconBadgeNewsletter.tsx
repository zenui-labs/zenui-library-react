import {useId, useState} from "react";
import type {ChangeEvent, ComponentType, FormEvent} from "react";
import {MdOutlineMail} from "react-icons/md";

type Status = "idle" | "submitting" | "done" | "error";

export interface IconBadgeNewsletterProps {
    /** Called with the trimmed email. Return a promise to keep the button disabled until it settles. */
    onSubmit?: (email: string) => void | Promise<unknown>;
    /** Icon in the round badge on the top edge. */
    icon?: ComponentType<{className?: string}>;
    title?: string;
    description?: string;
    /** Label read by screen readers for the email field. */
    emailLabel?: string;
    placeholder?: string;
    buttonLabel?: string;
    /** Small print under the form. */
    finePrint?: string;
    successMessage?: string;
    errorMessage?: string;
    className?: string;
}

/** A dark card with a gradient mail badge on its top edge, a centered title and an inline form. */
export const IconBadgeNewsletter = ({
    onSubmit,
    icon: Icon = MdOutlineMail,
    title = "newsletter",
    description = "Stay updated with our latest news and products.",
    emailLabel = "Email address",
    placeholder = "Email address",
    buttonLabel = "Submit",
    finePrint = "Your email is safe with us. We don't send spam.",
    successMessage = "Thanks for subscribing. Check your inbox to confirm.",
    errorMessage = "We could not subscribe you. Try again in a moment.",
    className = "",
}: IconBadgeNewsletterProps) => {
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
        <section className={`w-full rounded-xl dark:bg-slate-900 p-[20px] bg-gray-700 relative ${className}`}>
            <div
                aria-hidden
                className="rounded-full absolute top-[-30px] border-[3px] border-white left-[50%] transform translate-x-[-50%] bg-gradient-to-t from-blue-500 to-purple-500 p-1.5 w-max"
            >
                <span className="flex border border-white p-1.5 rounded-full text-[3rem] text-white">
                    <Icon/>
                </span>
            </div>

            <div className="sm:w-[70%] w-full lg:w-[50%] mx-auto">
                <h2 className="text-[2rem] sm:text-[3rem] mt-8 font-[800] capitalize text-blue-500 leading-[50px] text-center">{title}</h2>
                <p className="text-[1.1rem] mt-2 text-center text-gray-200 font-[300]">{description}</p>

                <form
                    onSubmit={handleSubmit}
                    className="mt-12 sm:flex-row flex-col flex items-end sm:items-center justify-between gap-[15px]"
                >
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
                        className="w-full py-3 dark:bg-transparent dark:placeholder:text-slate-500 dark:text-[#abc2d3] dark:border dark:border-blue-700 px-4 outline-none focus:ring-0 focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md"
                    />
                    <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="w-max px-8 py-3 rounded-md bg-blue-500 text-white disabled:cursor-wait disabled:opacity-70"
                    >
                        {buttonLabel}
                    </button>
                </form>

                <div role="status" aria-live="polite">
                    {status === "done" && <p className="mt-4 text-center text-sm text-emerald-300">{successMessage}</p>}
                    {status === "error" && <p className="mt-4 text-center text-sm text-rose-300">{errorMessage}</p>}
                </div>

                <p className="text-[0.9rem] dark:text-slate-400 text-gray-400 text-center mt-8">{finePrint}</p>
            </div>
        </section>
    );
};
