import {useState, type FormEvent, type InputHTMLAttributes} from "react";

export interface SubscribeInputProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "value" | "defaultValue" | "onChange" | "type"> {
    /** Called with the email address when the form is submitted. */
    onSubscribe?: (email: string) => void;
    /** Accessible name for the field. */
    label?: string;
    buttonLabel?: string;
    className?: string;
}

/** An email field with a subscribe button, for newsletter or membership sign-ups. */
export const SubscribeInput = ({
    onSubscribe,
    label = "Email address",
    buttonLabel = "Subscribe",
    placeholder = "Email",
    className = "",
    ...props
}: SubscribeInputProps) => {
    const [email, setEmail] = useState("");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubscribe?.(email.trim());
    };

    return (
        <form onSubmit={handleSubmit} className={`w-full relative ${className}`}>
            <input
                type="email"
                required
                autoComplete="email"
                aria-label={label}
                placeholder={placeholder}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="border bg-transparent dark:border-slate-500 dark:placeholder:text-slate-500 dark:text-[#abc2d3] border-[#e5eaf2] py-3 pl-4 pr-[115px] outline-none w-full rounded-md"
                {...props}
            />
            <button
                type="submit"
                className="bg-[#3B9DF8] text-white absolute top-0 right-0 h-full px-5 flex items-center justify-center rounded-r-md cursor-pointer hover:bg-gray-400"
            >
                {buttonLabel}
            </button>
        </form>
    );
};
