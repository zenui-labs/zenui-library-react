import {useId} from "react";
import type {FormEvent} from "react";

export interface FloatingLabelContactValues {
    name: string;
    email: string;
    message: string;
}

export interface FloatingLabelContactFormProps {
    title?: string;
    description?: string;
    nameLabel?: string;
    emailLabel?: string;
    messageLabel?: string;
    submitLabel?: string;
    /** Runs with the field values when the form is submitted. The page does not reload. */
    onSubmit?: (values: FloatingLabelContactValues) => void;
    /** Background behind a floated label. Match it to the surface the form sits on. */
    labelBackgroundClassName?: string;
    className?: string;
}

const fieldClass =
    "peer border-[#e5eaf2] border rounded-md outline-none px-4 py-3 w-full dark:bg-transparent dark:border-slate-700 dark:text-[#abc2d3] focus:border-[#3B9DF8] transition-colors duration-300";

// The label floats while the field has focus or holds a value. The blank placeholder makes :placeholder-shown work.
const labelClass =
    "pointer-events-none absolute top-3 left-5 text-[#777777] transition-all duration-300 peer-focus:-top-3 peer-focus:left-2 peer-focus:scale-[0.9] peer-focus:px-1 peer-focus:text-[#3B9DF8] peer-[:not(:placeholder-shown)]:-top-3 peer-[:not(:placeholder-shown)]:left-2 peer-[:not(:placeholder-shown)]:scale-[0.9] peer-[:not(:placeholder-shown)]:px-1";

/** A centered contact form with floating labels for name, email and message. */
export const FloatingLabelContactForm = ({
    title = "Contact us",
    description = "Have a question or a project in mind? Send us a message and we will get back to you.",
    nameLabel = "Your name",
    emailLabel = "Email address",
    messageLabel = "Write message",
    submitLabel = "Submit",
    onSubmit,
    labelBackgroundClassName = "bg-white dark:bg-slate-950",
    className = "",
}: FloatingLabelContactFormProps) => {
    const id = useId();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        onSubmit?.({
            name: String(data.get("name") ?? ""),
            email: String(data.get("email") ?? ""),
            message: String(data.get("message") ?? ""),
        });
    };

    return (
        <section className={`w-full ${className}`}>
            {/* title */}
            <div className="w-full flex flex-col items-center justify-center text-center">
                <h2 className="text-[2rem] font-bold text-[#3B9DF8] leading-[36px]">{title}</h2>
                <p className="text-[1rem] dark:text-slate-400 text-[#424242] mt-1">{description}</p>
            </div>

            {/* form area */}
            <form className="w-full mt-[50px]" onSubmit={handleSubmit}>
                <div className="flex flex-col sm:flex-row items-center gap-[20px]">
                    <div className="relative w-full sm:w-[50%]">
                        <input id={`${id}-name`} name="name" type="text" autoComplete="name" placeholder=" " required className={fieldClass}/>
                        <label htmlFor={`${id}-name`} className={`${labelClass} ${labelBackgroundClassName}`}>
                            {nameLabel}
                        </label>
                    </div>

                    <div className="relative w-full sm:w-[50%]">
                        <input id={`${id}-email`} name="email" type="email" autoComplete="email" placeholder=" " required className={fieldClass}/>
                        <label htmlFor={`${id}-email`} className={`${labelClass} ${labelBackgroundClassName}`}>
                            {emailLabel}
                        </label>
                    </div>
                </div>

                <div className="relative w-full mt-[20px]">
                    <textarea id={`${id}-message`} name="message" placeholder=" " required className={`${fieldClass} min-h-[200px] block`}/>
                    <label htmlFor={`${id}-message`} className={`${labelClass} ${labelBackgroundClassName}`}>
                        {messageLabel}
                    </label>
                </div>

                {/* The fill slides in from the left on hover. */}
                <button
                    type="submit"
                    className="py-2 px-6 border border-[#3B9DF8] text-[#3B9DF8] rounded font-[500] relative overflow-hidden z-10 mt-[10px] transition-colors duration-300 hover:text-white after:absolute after:inset-0 after:-z-10 after:bg-[#3B9DF8] after:-translate-x-full after:transition-transform after:duration-300 after:ease-in-out hover:after:translate-x-0"
                >
                    {submitLabel}
                </button>
            </form>
        </section>
    );
};
