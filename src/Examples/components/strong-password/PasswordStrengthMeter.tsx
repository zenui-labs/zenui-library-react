import {useId, useState, type ChangeEvent, type InputHTMLAttributes} from "react";
import {IoEyeOffOutline, IoEyeOutline} from "react-icons/io5";

export interface PasswordRule {
    /** Short name of the rule, for example "One uppercase letter". Also used as the React key. */
    label: string;
    /** Returns true when the password meets the rule. */
    test: (password: string) => boolean;
}

export interface PasswordStrengthMeterProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "type" | "value" | "defaultValue" | "onChange"> {
    /** Rules to check. The meter has one bar per rule and fills a bar for each rule the password meets. */
    rules: PasswordRule[];
    /** Value for a controlled input. */
    value?: string;
    /** Starting value for an uncontrolled input. */
    defaultValue?: string;
    /** Called on every change with the new value and whether it meets every rule. */
    onChange?: (value: string, isStrong: boolean) => void;
    /** Visible label above the field. */
    label?: string;
    /** Class names for a filled bar. */
    activeBarClassName?: string;
    /** Text read by screen readers for the meter. */
    getStatusText?: (passed: number, total: number) => string;
    /** Accessible name of the toggle while the password is hidden. */
    showLabel?: string;
    /** Accessible name of the toggle while the password is shown. */
    hideLabel?: string;
    className?: string;
}

const defaultStatusText = (passed: number, total: number) => `${passed} of ${total} password requirements met`;

/** A password input with a segmented strength meter under the field. */
export const PasswordStrengthMeter = ({
    rules,
    value,
    defaultValue = "",
    onChange,
    label = "Password",
    activeBarClassName = "bg-green-500",
    getStatusText = defaultStatusText,
    showLabel = "Show password",
    hideLabel = "Hide password",
    id,
    placeholder = "Password",
    className = "",
    ...props
}: PasswordStrengthMeterProps) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const [isEyeOpen, setIsEyeOpen] = useState(false);
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const statusId = `${inputId}-status`;

    const password = value ?? internalValue;
    const passed = rules.filter((rule) => rule.test(password)).length;
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
                    aria-describedby={statusId}
                    className="peer border-[#e5eaf2] dark:border-slate-600 dark:bg-transparent dark:placeholder:text-slate-500 dark:text-[#abc2d3] border rounded-md outline-none pl-4 pr-12 py-3 w-full mt-1 focus:border-[#3B9DF8] transition-colors duration-300"
                    {...props}
                />

                <div className="w-full mt-2 flex items-center gap-[5px]" aria-hidden>
                    {rules.map((rule, index) => (
                        <div
                            key={rule.label}
                            className={`${
                                index < passed ? activeBarClassName : "dark:bg-slate-700 bg-gray-200"
                            } h-[9px] w-full rounded-md`}
                        />
                    ))}
                </div>
                <p id={statusId} aria-live="polite" className="sr-only">
                    {getStatusText(passed, rules.length)}
                </p>

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
