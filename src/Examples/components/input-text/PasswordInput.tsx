import {useId, useState, type InputHTMLAttributes} from "react";
import {IoEyeOffOutline, IoEyeOutline} from "react-icons/io5";

export interface PasswordInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "type"> {
    /** Visible label above the field. */
    label?: string;
    /** Shows the password as plain text at first. */
    defaultVisible?: boolean;
    /** Accessible name of the toggle while the password is hidden. */
    showLabel?: string;
    /** Accessible name of the toggle while the password is shown. */
    hideLabel?: string;
    className?: string;
}

/** A password input with a button that shows or hides the password. */
export const PasswordInput = ({
    label = "Password",
    defaultVisible = false,
    showLabel = "Show password",
    hideLabel = "Hide password",
    id,
    placeholder = "Password",
    className = "",
    ...props
}: PasswordInputProps) => {
    const [visible, setVisible] = useState(defaultVisible);
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const Icon = visible ? IoEyeOutline : IoEyeOffOutline;

    return (
        <div className={`w-full ${className}`}>
            <label htmlFor={inputId} className="text-[15px] dark:text-[#abc2d3] text-[#424242] font-[400]">
                {label}
            </label>
            <div className="w-full relative">
                <input
                    id={inputId}
                    type={visible ? "text" : "password"}
                    placeholder={placeholder}
                    className="peer border-[#e5eaf2] dark:border-slate-600 dark:bg-slate-900 dark:placeholder:text-slate-500 border dark:text-[#abc2d3] rounded-md outline-none pl-4 pr-12 py-3 w-full mt-1 focus:border-[#3B9DF8] transition-colors duration-300"
                    {...props}
                />
                <button
                    type="button"
                    aria-label={visible ? hideLabel : showLabel}
                    aria-controls={inputId}
                    onClick={() => setVisible((current) => !current)}
                    className="absolute top-4 right-4 flex text-[1.5rem] dark:text-slate-400 text-[#777777] cursor-pointer"
                >
                    <Icon aria-hidden/>
                </button>
            </div>
        </div>
    );
};
