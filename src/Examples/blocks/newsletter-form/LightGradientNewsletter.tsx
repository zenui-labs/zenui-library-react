import {useId, useState} from "react";
import type {ChangeEvent, ComponentType, FormEvent} from "react";
import {MdOutlineMail} from "react-icons/md";

type Status = "idle" | "submitting" | "done" | "error";

export interface LightGradientNewsletterProps {
    /** Called with the trimmed email. Return a promise to keep the button disabled until it settles. */
    onSubmit?: (email: string) => void | Promise<unknown>;
    /** Icon inside the email field. */
    icon?: ComponentType<{className?: string}>;
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

/** A light banner that fades to blue, with a large title and a form whose button overhangs its corner. */
export const LightGradientNewsletter = ({
    onSubmit,
    icon: Icon = MdOutlineMail,
    title = "Subscribe to our newsletter",
    description = "Get a weekly update about our product in your inbox. No spam, we promise.",
    emailLabel = "Email address",
    placeholder = "Email address",
    buttonLabel = "Subscribe",
    successMessage = "Thanks for subscribing. Check your inbox to confirm.",
    errorMessage = "We could not subscribe you. Try again in a moment.",
    className = "",
}: LightGradientNewsletterProps) => {
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
        <section
            className={`w-full rounded-xl py-[20px] sm:py-[40px] px-[40px] sm:px-[80px] bg-gradient-to-br from-[#fff] dark:from-slate-800 via-[#fff] to-[#6D96FF] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] ${className}`}
        >
            <h2 className="text-[2rem] dark:text-[#abc2d3] sm:text-[3.5rem] w-full sm:w-[60%] text-[#161819] font-[400] leading-[45px] sm:leading-[70px]">
                {title}
            </h2>

            <div className="w-full lg:flex-row flex-col flex items-start mt-12 justify-between gap-[30px]">
                <p className="text-[0.9rem] dark:text-slate-400 text-[#555555]">{description}</p>

                <div className="w-full sm:w-[80%]">
                    <form onSubmit={handleSubmit} className="relative mb-6">
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
                            className="py-3 bg-white text-[#161819] dark:bg-slate-800 dark:placeholder:text-slate-500 dark:text-[#abc2d3] pr-4 pl-12 w-full outline-none focus-visible:ring-2 focus-visible:ring-[#6D96FF]"
                        />
                        <span
                            aria-hidden
                            className="flex p-1.5 bg-[#F8F8F8] dark:bg-slate-900 dark:text-slate-300 text-[#6C777C] text-[2rem] absolute top-[50%] left-2 transform translate-y-[-50%] pointer-events-none"
                        >
                            <Icon/>
                        </span>
                        <button
                            type="submit"
                            disabled={status === "submitting"}
                            className="absolute dark:bg-slate-700 dark:text-[#abc2d3] dark:hover:bg-slate-700 dark:hover:text-[#abc2d3] bottom-[-20px] right-[-20px] bg-[#161819] hover:bg-[#161819] text-white py-3 px-8 disabled:cursor-wait disabled:opacity-70"
                        >
                            {buttonLabel}
                        </button>
                    </form>

                    <div role="status" aria-live="polite">
                        {status === "done" && <p className="mt-8 text-sm font-medium text-[#161819] dark:text-emerald-300">{successMessage}</p>}
                        {status === "error" && <p className="mt-8 text-sm font-medium text-rose-700 dark:text-rose-300">{errorMessage}</p>}
                    </div>
                </div>
            </div>
        </section>
    );
};
