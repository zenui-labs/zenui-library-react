import {useId, useState, type ChangeEvent, type InputHTMLAttributes} from "react";
import {IoCheckmarkDoneCircleSharp, IoEyeOffOutline, IoEyeOutline} from "react-icons/io5";
import {MdErrorOutline} from "react-icons/md";

export interface PasswordMessageRule {
    /** Message shown while the password fails this rule. */
    message: string;
    /** Returns true when the password meets the rule. */
    test: (password: string) => boolean;
}

export interface PasswordStrengthMessageProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "type" | "value" | "defaultValue" | "onChange"> {
    /** Rules checked in order. The message of the first rule that fails is shown. */
    rules: PasswordMessageRule[];
    /** Value for a controlled input. */
    value?: string;
    /** Starting value for an uncontrolled input. */
    defaultValue?: string;
    /** Called on every change with the new value and whether it meets every rule. */
    onChange?: (value: string, isStrong: boolean) => void;
    /** Visible label above the field. */
    label?: string;
    /** Message shown once the password meets every rule. */
    successMessage?: string;
    /** Accessible name of the toggle while the password is hidden. */
    showLabel?: string;
    /** Accessible name of the toggle while the password is shown. */
    hideLabel?: string;
    className?: string;
}

/** A password input that shows one message under the field: the first rule that fails, or a success message. */
export const PasswordStrengthMessage = ({
    rules,
    value,
    defaultValue = "",
    onChange,
    label = "Password",
    successMessage = "Very strong password.",
    showLabel = "Show password",
    hideLabel = "Hide password",
    id,
    placeholder = "Password",
    className = "",
    ...props
}: PasswordStrengthMessageProps) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const [isEyeOpen, setIsEyeOpen] = useState(false);
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const messageId = `${inputId}-message`;

    const password = value ?? internalValue;
    const failedRule = rules.find((rule) => !rule.test(password));
    const EyeIcon = isEyeOpen ? IoEyeOutline : IoEyeOffOutline;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const next = event.target.value;
        setInternalValue(next);
        onChange?.(next, rules.every((rule) => rule.test(next)));
    };

    return (
        <div className={`w-full ${className}`}>
            <label htmlFor={inputId} className="text-[15px] dark:text-[#abc2d3] text-[#424242] font-[400]">
                {label}
            </label>
            <div className="w-full relative">
                <input
                    id={inputId}
                    type={isEyeOpen ? "text" : "password"}
                    value={password}
                    onChange={handleChange}
                    placeholder={placeholder}
                    aria-describedby={messageId}
                    aria-invalid={password !== "" && failedRule !== undefined}
                    className="peer border-[#e5eaf2] dark:border-slate-600 dark:bg-transparent dark:placeholder:text-slate-500 dark:text-[#abc2d3] border rounded-md outline-none pl-4 pr-12 py-3 w-full mt-1 focus:border-[#3B9DF8] transition-colors duration-300"
                    {...props}
                />

                <div id={messageId} aria-live="polite" className="text-[0.9rem]">
                    {password !== "" &&
                        (failedRule ? (
                            <p className="mt-1 text-red-500 flex items-center gap-[5px]">
                                <MdErrorOutline className="text-[1.1rem] shrink-0" aria-hidden/>
                                {failedRule.message}
                            </p>
                        ) : (
                            <p className="mt-1 text-green-600 flex items-center gap-[5px]">
                                <IoCheckmarkDoneCircleSharp className="text-[1.1rem] shrink-0" aria-hidden/>
                                {successMessage}
                            </p>
                        ))}
                </div>

                <button
                    type="button"
                    aria-label={isEyeOpen ? hideLabel : showLabel}
                    aria-controls={inputId}
                    onClick={() => setIsEyeOpen((open) => !open)}
                    className="absolute top-4 right-4 flex dark:text-slate-500 text-[1.5rem] text-[#777777] cursor-pointer"
                >
                    <EyeIcon aria-hidden/>
                </button>
            </div>
        </div>
    );
};
