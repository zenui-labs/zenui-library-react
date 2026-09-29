import {useState, type ButtonHTMLAttributes} from "react";

export type SquareSwitchSize = "lg" | "md" | "sm" | "xs";

const sizes: Record<SquareSwitchSize, {track: string; thumb: string; on: string}> = {
    lg: {track: "w-[70px] h-[40px] py-[0.210rem] px-[0.209rem]", thumb: "w-[31px] h-[31px]", on: "translate-x-[29px]"},
    md: {track: "w-[65px] h-[38px] py-[0.210rem] px-[0.230rem]", thumb: "w-[29px] h-[29px]", on: "translate-x-[26px]"},
    sm: {track: "w-[65px] h-[34px] py-[0.138rem] px-[0.200rem]", thumb: "w-[26px] h-[27px]", on: "translate-x-[30px]"},
    xs: {track: "w-[55px] h-[30px] py-[0.100rem] px-[0.200rem]", thumb: "w-[23px] h-[24px]", on: "translate-x-[24px]"},
};

export interface SquareSwitchProps
    extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "role" | "className" | "onChange" | "children"> {
    /** Accessible name, for example "Email notifications". */
    label: string;
    /** Controlled state. Leave it out to let the switch manage its own state. */
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: (checked: boolean) => void;
    size?: SquareSwitchSize;
    /** Track color while the switch is on. */
    color?: string;
    className?: string;
}

/** A switch with a rounded square thumb that turns a quarter turn as it slides. */
export const SquareSwitch = ({
    label,
    checked,
    defaultChecked = false,
    onChange,
    size = "lg",
    color = "#3B9DF8",
    className = "",
    onClick,
    ...props
}: SquareSwitchProps) => {
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const isOn = checked ?? internalChecked;
    const styles = sizes[size];

    return (
        <button
            {...props}
            type="button"
            role="switch"
            aria-checked={isOn}
            aria-label={label}
            onClick={(event) => {
                onClick?.(event);
                if (checked === undefined) setInternalChecked(!isOn);
                onChange?.(!isOn);
            }}
            style={isOn ? {backgroundColor: color} : undefined}
            className={`${
                isOn ? "" : "bg-[#f0f0f0] dark:bg-slate-800"
            } ${styles.track} block shrink-0 dark:border-slate-700 cursor-pointer border transition-colors duration-500 border-[#e5eaf2] rounded-lg relative disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        >
            <span
                className={`${
                    isOn ? `${styles.on} rotate-[90deg] !bg-white` : "translate-x-[0px] rotate-[0deg]"
                } ${styles.thumb} block transition-all dark:bg-slate-300 duration-500 rounded-md bg-[#fff]`}
                style={{boxShadow: "1px 2px 5px 2px rgb(0,0,0,0.1)"}}
            />
        </button>
    );
};
