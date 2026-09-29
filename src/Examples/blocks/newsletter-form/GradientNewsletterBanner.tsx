import {useId, useState} from "react";
import type {ChangeEvent, ComponentType, FormEvent} from "react";
import {MdOutlineMail} from "react-icons/md";

type Status = "idle" | "submitting" | "done" | "error";

export interface GradientNewsletterBannerProps {
    /** Called with the trimmed email. Return a promise to keep the button disabled until it settles. */
    onSubmit?: (email: string) => void | Promise<unknown>;
    /** Icon inside the email field, also drawn large and faint in the top right corner. */
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

/** A dark violet gradient banner with a mint title, an email field and a button that overhangs its corner. */
export const GradientNewsletterBanner = ({
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
}: GradientNewsletterBannerProps) => {
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
            className={`w-full rounded-xl py-[20px] sm:py-[40px] px-[40px] sm:px-[80px] bg-gradient-to-br from-[#161819] to-[#5C26B5] relative overflow-hidden ${className}`}
        >
            <div className="relative z-[1] w-full sm:w-[60%]">
                <div className="w-full sm:w-[60%]">
                    <h2 className="text-[2rem] sm:text-[2.8rem] text-[#71ECD2] font-[400] leading-[45px]">{title}</h2>
                    <p className="text-[0.9rem] text-[#CBCBCB] mt-5">{description}</p>
                </div>

                <form onSubmit={handleSubmit} className="relative mt-12 mb-6">
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
                        className="py-3 pr-4 pl-12 w-full bg-white text-[#161819] outline-none focus-visible:ring-2 focus-visible:ring-[#825FF1]"
                    />
                    <span
                        aria-hidden
                        className="flex p-1.5 bg-[#F8F8F8] text-[#6C777C] text-[2rem] absolute top-[50%] left-2 transform translate-y-[-50%] pointer-events-none"
                    >
                        <Icon/>
                    </span>
                    <button
                        type="submit"
                        disabled={status === "submitting"}
                        className="absolute bottom-[-20px] right-[-20px] bg-[#825FF1] hover:bg-[#7755e8] text-white py-3 px-8 disabled:cursor-wait disabled:opacity-70"
                    >
                        {buttonLabel}
                    </button>
                </form>

                <div role="status" aria-live="polite">
                    {status === "done" && <p className="mt-8 text-sm text-[#71ECD2]">{successMessage}</p>}
                    {status === "error" && <p className="mt-8 text-sm text-rose-300">{errorMessage}</p>}
                </div>
            </div>

            <span aria-hidden className="flex text-[30rem] absolute top-[-100px] right-[-100px] text-white opacity-10 rotate-[-30deg] pointer-events-none">
                <Icon/>
            </span>
        </section>
    );
};
