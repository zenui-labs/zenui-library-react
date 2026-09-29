import {useId, useState} from "react";
import type {ChangeEvent, FormEvent} from "react";

type Status = "idle" | "submitting" | "done" | "error";

export interface DiscountNewsletterBannerProps {
    /** Called with the trimmed email. Return a promise to keep the button disabled until it settles. */
    onSubmit?: (email: string) => void | Promise<unknown>;
    /** Decorative image that hangs over the top left corner. */
    topLeftImageSrc?: string;
    /** Decorative stroke drawn under the end of the title. */
    underlineImageSrc?: string;
    /** Decorative image that hangs over the bottom right corner. */
    bottomRightImageSrc?: string;
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

/** A dark banner that offers a discount for subscribing, with decorative shapes on two corners. */
export const DiscountNewsletterBanner = ({
    onSubmit,
    topLeftImageSrc,
    underlineImageSrc,
    bottomRightImageSrc,
    title = "Subscribe and get 25% off",
    description = "Get a weekly update about our product in your inbox. No spam, we promise.",
    emailLabel = "Email address",
    placeholder = "Enter your email...",
    buttonLabel = "Submit",
    successMessage = "Thanks for subscribing. Your code is on its way.",
    errorMessage = "We could not subscribe you. Try again in a moment.",
    className = "",
}: DiscountNewsletterBannerProps) => {
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
        <section className={`w-full rounded-xl p-[30px] sm:p-[50px] bg-[#303456] relative ${className}`}>
            {topLeftImageSrc && (
                <img src={topLeftImageSrc} alt="" aria-hidden className="w-[80px] sm:w-[150px] absolute top-[-20px] left-[-20px]"/>
            )}

            <div className="w-full flex-col flex items-center justify-center">
                <h2 className="text-[1rem] sm:text-[2rem] lg:text-[3rem] text-white text-center relative w-max">
                    {title}
                    {underlineImageSrc && (
                        <img src={underlineImageSrc} alt="" aria-hidden className="w-[100px] sm:w-[200px] absolute bottom-0 right-0"/>
                    )}
                </h2>
                <p className="text-[0.8rem] sm:text-[0.9rem] text-gray-400 w-full sm:w-[50%] mx-auto mt-4 text-center">{description}</p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="flex lg:flex-row flex-col items-center justify-between gap-[20px] w-full sm:w-[65%] mx-auto mt-12"
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
                    className="py-4 px-4 w-full bg-[#6C6F87] text-white placeholder:text-gray-300 border-2 border-gray-400 outline-none focus:border-white"
                />
                <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full lg:w-fit py-4 px-12 bg-white text-black disabled:cursor-wait disabled:opacity-70"
                >
                    {buttonLabel}
                </button>
            </form>

            <div role="status" aria-live="polite" className="w-full sm:w-[65%] mx-auto">
                {status === "done" && <p className="mt-4 text-center text-sm text-emerald-300">{successMessage}</p>}
                {status === "error" && <p className="mt-4 text-center text-sm text-rose-300">{errorMessage}</p>}
            </div>

            {bottomRightImageSrc && (
                <img src={bottomRightImageSrc} alt="" aria-hidden className="w-[80px] sm:w-[150px] absolute bottom-[-20px] right-[-20px]"/>
            )}
        </section>
    );
};
