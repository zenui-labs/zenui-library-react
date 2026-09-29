import {useId, useState, type ReactNode} from "react";

export interface RadioOption {
    value: string;
    label: ReactNode;
    disabled?: boolean;
}

export interface CircleRadioProps {
    /** Group name shared by every radio in the set. */
    name: string;
    value: string;
    label: ReactNode;
    checked: boolean;
    onSelect: (value: string) => void;
    disabled?: boolean;
    /** Border and fill color of the indicator. */
    accentColor?: string;
    className?: string;
}

/** A single circular radio with its label. Use it on its own or through `CircleRadioGroup`. */
export const CircleRadio = ({
    name,
    value,
    label,
    checked,
    onSelect,
    disabled = false,
    accentColor = "#3B9DF8",
    className = "",
}: CircleRadioProps) => (
    <label className={`flex items-center gap-[10px] ${disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"} ${className}`}>
        <input
            type="radio"
            name={name}
            value={value}
            checked={checked}
            disabled={disabled}
            onChange={() => onSelect(value)}
            className="peer sr-only"
        />
        <span
            aria-hidden
            className="w-[35px] h-[35px] border rounded-full flex items-center justify-center peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-[#3B9DF8]/50 dark:peer-focus-visible:ring-offset-slate-900"
            style={{borderColor: accentColor}}
        >
            <span
                className={`${checked ? "scale-[1]" : "bg-transparent scale-[0.7]"} w-[25px] h-[25px] transition-all duration-200 rounded-full`}
                style={checked ? {backgroundColor: accentColor} : undefined}
            />
        </span>
        <span className="text-[1.2rem] font-bold dark:text-[#abc2d3] text-[#424242]">{label}</span>
    </label>
);

export interface CircleRadioGroupProps {
    options: RadioOption[];
    /** Selected value for a controlled group. */
    value?: string;
    /** Starting value for an uncontrolled group. */
    defaultValue?: string;
    onChange?: (value: string) => void;
    /** Form field name. A generated one is used when left out. */
    name?: string;
    /** Accessible name for the group, read by screen readers. */
    label?: string;
    accentColor?: string;
    className?: string;
}

/** A set of circular radios for choosing one option. Works controlled with `value` or uncontrolled with `defaultValue`. */
export const CircleRadioGroup = ({
    options,
    value,
    defaultValue = "",
    onChange,
    name,
    label,
    accentColor,
    className = "",
}: CircleRadioGroupProps) => {
    const generatedName = useId();
    const [internalValue, setInternalValue] = useState(defaultValue);
    const selected = value ?? internalValue;

    const handleSelect = (next: string) => {
        setInternalValue(next);
        onChange?.(next);
    };

    return (
        <div role="radiogroup" aria-label={label} className={`flex flex-col gap-4 ${className}`}>
            {options.map((option) => (
                <CircleRadio
                    key={option.value}
                    name={name ?? generatedName}
                    value={option.value}
                    label={option.label}
                    checked={selected === option.value}
                    disabled={option.disabled}
                    onSelect={handleSelect}
                    accentColor={accentColor}
                />
            ))}
        </div>
    );
};
