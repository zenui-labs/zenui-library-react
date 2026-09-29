import {useState, type ButtonHTMLAttributes} from "react";

export type CircleSwitchSize = "lg" | "md" | "sm" | "xs";

const sizes: Record<CircleSwitchSize, {track: string; thumb: string; on: string; off: string}> = {
    lg: {track: "w-[70px] h-[40px] p-[0.160rem]", thumb: "w-[32px] h-[32px]", on: "translate-x-[30px]", off: "translate-x-[2px]"},
    md: {track: "w-[65px] h-[36px] p-[0.180rem]", thumb: "w-[28px] h-[28px]", on: "translate-x-[28px]", off: "translate-x-[2px]"},
    sm: {track: "w-[60px] h-[33px] p-[0.180rem]", thumb: "w-[25px] h-[25px]", on: "translate-x-[26px]", off: "translate-x-[2px]"},
    xs: {
        track: "w-[57px] h-[30px] px-[0.150rem] py-[0.160rem]",
        thumb: "w-[23px] h-[23px]",
        on: "translate-x-[27px]",
        off: "translate-x-[1px]",
    },
};

export interface CircleSwitchProps
    extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "role" | "className" | "onChange" | "children"> {
    /** Accessible name, for example "Email notifications". */
    label: string;
    /** Controlled state. Leave it out to let the switch manage its own state. */
    checked?: boolean;
    defaultChecked?: boolean;
    onChange?: (checked: boolean) => void;
    size?: CircleSwitchSize;
    /** Track color while the switch is on. */
    color?: string;
    className?: string;
}

/** A pill shaped switch with a round thumb that slides across. */
export const CircleSwitch = ({
    label,
    checked,
    defaultChecked = false,
    onChange,
    size = "lg",
    color = "#3B9DF8",
    className = "",
    onClick,
    ...props
}: CircleSwitchProps) => {
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
            } ${styles.track} block shrink-0 border dark:border-slate-700 transition-colors cursor-pointer duration-500 border-[#e5eaf2] rounded-full relative disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        >
            <span
                className={`${
                    isOn ? `${styles.on} !bg-white` : styles.off
                } ${styles.thumb} block pb-1 dark:bg-slate-300 transition-all duration-500 rounded-full bg-[#fff]`}
                style={{boxShadow: "1px 2px 5px 2px rgb(0,0,0,0.1)"}}
            />
        </button>
    );
};
