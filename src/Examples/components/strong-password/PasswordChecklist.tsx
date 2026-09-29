import {useId, useState, type ChangeEvent, type InputHTMLAttributes} from "react";
import {IoEyeOffOutline, IoEyeOutline} from "react-icons/io5";
import {MdDone} from "react-icons/md";
import {RxCross1} from "react-icons/rx";

export interface PasswordRule {
    /** Hint shown in the list, for example "Should contain numbers." Also used as the React key. */
    label: string;
    /** Returns true when the password meets the rule. */
    test: (password: string) => boolean;
}

export interface PasswordChecklistProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "type" | "value" | "defaultValue" | "onChange"> {
    /** Rules listed under the field. Each one turns green once the password meets it. */
    rules: PasswordRule[];
    /** Value for a controlled input. */
    value?: string;
    /** Starting value for an uncontrolled input. */
    defaultValue?: string;
    /** Called on every change with the new value and whether it meets every rule. */
    onChange?: (value: string, isStrong: boolean) => void;
    /** Visible label above the field. */
    label?: string;
    /** Heading above the list of rules. */
    title?: string;
    /** Screen reader text before a rule that is met. */
    metLabel?: string;
    /** Screen reader text before a rule that is not met yet. */
    unmetLabel?: string;
    /** Accessible name of the toggle while the password is hidden. */
    showLabel?: string;
    /** Accessible name of the toggle while the password is shown. */
    hideLabel?: string;
    className?: string;
}

/** A password input with a live checklist of the rules the password has to meet. */
export const PasswordChecklist = ({
    rules,
    value,
    defaultValue = "",
    onChange,
    label = "Password",
    title = "Your password must contain:",
    metLabel = "Done:",
    unmetLabel = "Not done:",
    showLabel = "Show password",
    hideLabel = "Hide password",
    id,
    placeholder = "Password",
    className = "",
    ...props
}: PasswordChecklistProps) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const [isEyeOpen, setIsEyeOpen] = useState(false);
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const hintsId = `${inputId}-hints`;

    const password = value ?? internalValue;
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
                    aria-describedby={hintsId}
                    className="peer border-[#e5eaf2] dark:border-slate-600 dark:bg-transparent dark:placeholder:text-slate-500 dark:text-[#abc2d3] border rounded-md outline-none pl-4 pr-12 py-3 w-full mt-1 focus:border-[#3B9DF8] transition-colors duration-300"
                    {...props}
                />

                <div id={hintsId}>
                    <h3 className="text-gray-900 dark:text-[#abc2d3] font-[500] text-[1rem] mt-4">{title}</h3>

                    <ul className="w-full mt-2 flex-col flex gap-[6px]">
                        {rules.map((rule) => {
                            const met = rule.test(password);
                            return (
                                <li
                                    key={rule.label}
                                    className={`${
                                        met ? "text-green-500" : "dark:text-slate-500 text-gray-500"
                                    } text-[0.8rem] flex items-center gap-[8px]`}
                                >
                                    {met ? <MdDone className="text-[1rem]" aria-hidden/> : <RxCross1 aria-hidden/>}
                                    <span className="sr-only">{met ? metLabel : unmetLabel}</span>
                                    {rule.label}
                                </li>
                            );
                        })}
                    </ul>
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
