import {useId, useState, type ChangeEvent, type FocusEvent, type InputHTMLAttributes} from "react";
import {IoEyeOffOutline, IoEyeOutline} from "react-icons/io5";
import {MdDone} from "react-icons/md";
import {RxCross1} from "react-icons/rx";

export interface PasswordRule {
    /** Hint shown in the dropdown, for example "Should contain numbers." Also used as the React key. */
    label: string;
    /** Returns true when the password meets the rule. */
    test: (password: string) => boolean;
}

export interface PasswordHintDropdownProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "type" | "value" | "defaultValue" | "onChange"> {
    /** Rules listed in the dropdown. Each one turns green once the password meets it. */
    rules: PasswordRule[];
    /** Value for a controlled input. */
    value?: string;
    /** Starting value for an uncontrolled input. */
    defaultValue?: string;
    /** Called on every change with the new value and whether it meets every rule. */
    onChange?: (value: string, isStrong: boolean) => void;
    /** Visible label above the field. */
    label?: string;
    /** Heading at the top of the dropdown. */
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

/** A password input that opens a checklist of rules below the field while it has focus. */
export const PasswordHintDropdown = ({
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
    onFocus,
    onBlur,
    className = "",
    ...props
}: PasswordHintDropdownProps) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const [isEyeOpen, setIsEyeOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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

    const handleFocus = (event: FocusEvent<HTMLInputElement>) => {
        setIsDropdownOpen(true);
        onFocus?.(event);
    };

    const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
        setIsDropdownOpen(false);
        onBlur?.(event);
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
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    placeholder={placeholder}
                    aria-describedby={hintsId}
                    className="peer border-[#e5eaf2] dark:border-slate-600 dark:bg-slate-900 dark:placeholder:text-slate-500 dark:text-[#abc2d3] border rounded-md outline-none pl-4 pr-12 py-3 w-full mt-1 focus:border-[#3B9DF8] transition-colors duration-300"
                    {...props}
                />

                <div
                    id={hintsId}
                    className={`${
                        isDropdownOpen
                            ? "opacity-100 translate-y-0 z-30 visible"
                            : "opacity-0 translate-y-[-10px] z-[-1] invisible"
                    } bg-white shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] dark:bg-slate-800 rounded-md py-3 px-4 absolute top-[60px] left-0 w-full transition-all duration-300`}
                >
                    <h3 className="text-gray-900 dark:text-[#abc2d3] font-[500] text-[1rem]">{title}</h3>

                    <ul className="w-full mt-2 flex-col flex gap-[6px]">
                        {rules.map((rule) => {
                            const met = rule.test(password);
                            return (
                                <li
                                    key={rule.label}
                                    className={`${
                                        met ? "text-green-500" : "dark:text-slate-400 text-gray-500"
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
