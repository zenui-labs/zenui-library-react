import {useEffect, useRef, useState, type ButtonHTMLAttributes} from "react";

export type AnimatedSwitchSize = "lg" | "md" | "sm" | "xs";

const sizes: Record<AnimatedSwitchSize, {track: string; thumb: string; stretched: string; on: string; off: string}> = {
    lg: {track: "w-[70px] h-[40px]", thumb: "w-[30px] h-[30px]", stretched: "w-[37px] h-[30px]", on: "translate-x-[15px]", off: "translate-x-[-15px]"},
    md: {track: "w-[65px] h-[37px]", thumb: "w-[28px] h-[28px]", stretched: "w-[35px] h-[28px]", on: "translate-x-[13px]", off: "translate-x-[-13px]"},
    sm: {track: "w-[60px] h-[33px]", thumb: "w-[25px] h-[25px]", stretched: "w-[29px] h-[25px]", on: "translate-x-[13px]", off: "translate-x-[-13px]"},
    xs: {track: "w-[55px] h-[30px]", thumb: "w-[22px] h-[22px]", stretched: "w-[25px] h-[22px]", on: "translate-x-[13px]", off: "translate-x-[-13px]"},
};

export interface AnimatedSwitchProps
    extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "role" | "className" | "onChange" | "children"> {
    /** Accessible name, for example "Email notifications". */
    label: string;
    /** Controlled state. Leave it out to let the switch manage its own state. */
    checked?: boolean;
    defaultChecked?: boolean;
    /** Called once the stretch finishes and the switch flips. */
    onChange?: (checked: boolean) => void;
    size?: AnimatedSwitchSize;
    /** Track color while the switch is on. */
    color?: string;
    /** How long the thumb stretches before it slides, in milliseconds. */
    stretchDuration?: number;
    className?: string;
}

/** A switch whose thumb stretches on press and then slides to the other side. */
export const AnimatedSwitch = ({
    label,
    checked,
    defaultChecked = false,
    onChange,
    size = "lg",
    color = "#3B9DF8",
    stretchDuration = 300,
    className = "",
    onClick,
    ...props
}: AnimatedSwitchProps) => {
    const [internalChecked, setInternalChecked] = useState(defaultChecked);
    const [stretching, setStretching] = useState(false);
    const timer = useRef<number | undefined>(undefined);
    const isOn = checked ?? internalChecked;
    const styles = sizes[size];

    useEffect(() => () => window.clearTimeout(timer.current), []);

    const handleClick = () => {
        // Ignore presses during the stretch so a double click cannot skip a state.
        if (stretching) return;
        setStretching(true);
        timer.current = window.setTimeout(() => {
            setStretching(false);
            if (checked === undefined) setInternalChecked(!isOn);
            onChange?.(!isOn);
        }, stretchDuration);
    };

    return (
        <button
            {...props}
            type="button"
            role="switch"
            aria-checked={isOn}
            aria-label={label}
            onClick={(event) => {
                onClick?.(event);
                handleClick();
            }}
            style={isOn ? {backgroundColor: color, borderColor: color} : undefined}
            className={`${
                isOn ? "" : "bg-[#f0f0f0] border-gray-200 dark:border-slate-700 dark:bg-slate-800"
            } ${styles.track} block shrink-0 border relative p-1 rounded-full cursor-pointer transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        >
            <span className="absolute inset-0 flex items-center justify-center">
                <span
                    className={`${isOn ? `${styles.on} !bg-white` : styles.off} ${
                        stretching ? styles.stretched : styles.thumb
                    } block dark:bg-slate-300 rounded-full bg-white transition-all duration-200`}
                />
            </span>
        </button>
    );
};
