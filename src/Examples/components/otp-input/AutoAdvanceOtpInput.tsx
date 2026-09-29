import {useRef, useState, type ChangeEvent, type ClipboardEvent, type KeyboardEvent} from "react";

export interface AutoAdvanceOtpInputProps {
    /** Number of digit boxes. */
    length?: number;
    /** The code for a controlled input. Each character fills one box; a space marks an empty box. */
    value?: string;
    /** Starting code for an uncontrolled input. */
    defaultValue?: string;
    /** Called with the code on every change. Empty boxes before the last digit show as spaces. */
    onChange?: (code: string) => void;
    /** Called once every box holds a digit. */
    onComplete?: (code: string) => void;
    /** Accessible name for the group of boxes. */
    label?: string;
    placeholder?: string;
    className?: string;
}

const toDigits = (code: string, length: number) =>
    Array.from({length}, (_, index) => (/^[0-9]$/.test(code[index] ?? "") ? code[index] : ""));

const toCode = (digits: string[]) => digits.map((digit) => digit || " ").join("").trimEnd();

/**
 * An OTP input that moves to the next box after each digit. Backspace on an empty box goes back, the arrow keys
 * move between boxes, and a pasted code fills the boxes with its digits only.
 */
export const AutoAdvanceOtpInput = ({
    length = 4,
    value,
    defaultValue = "",
    onChange,
    onComplete,
    label = "Verification code",
    placeholder = "0",
    className = "",
}: AutoAdvanceOtpInputProps) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const inputs = useRef<(HTMLInputElement | null)[]>([]);
    const digits = toDigits(value ?? internalValue, length);

    const focusBox = (index: number) => inputs.current[index]?.focus();

    const update = (next: string[]) => {
        const code = toCode(next);
        setInternalValue(code);
        onChange?.(code);
        if (next.every(Boolean)) onComplete?.(next.join(""));
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        // Keep only the newest digit typed into the box, and ignore anything that is not a digit.
        const typed = event.target.value.replace(/[^0-9]/g, "");
        if (event.target.value !== "" && typed === "") return;

        const next = [...digits];
        next[index] = typed.slice(-1);
        update(next);

        if (typed && index < length - 1) focusBox(index + 1);
    };

    const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
        event.preventDefault();
        const pasted = event.clipboardData.getData("text").replace(/[^0-9]/g, "").slice(0, length);
        if (!pasted) return;

        const next = [...digits];
        for (let i = 0; i < pasted.length; i++) next[i] = pasted[i];
        update(next);
        focusBox(Math.min(pasted.length, length - 1));
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>, index: number) => {
        if (event.key === "Backspace" && !digits[index] && index > 0) {
            event.preventDefault();
            focusBox(index - 1);
        } else if (event.key === "ArrowLeft" && index > 0) {
            event.preventDefault();
            focusBox(index - 1);
        } else if (event.key === "ArrowRight" && index < length - 1) {
            event.preventDefault();
            focusBox(index + 1);
        }
    };

    return (
        <div
            role="group"
            aria-label={label}
            className={`grid gap-[10px] w-full ${className}`}
            style={{gridTemplateColumns: `repeat(${length}, minmax(0, 1fr))`}}
        >
            {digits.map((digit, index) => (
                <input
                    key={index}
                    ref={(element) => {
                        inputs.current[index] = element;
                    }}
                    type="text"
                    inputMode="numeric"
                    autoComplete={index === 0 ? "one-time-code" : "off"}
                    aria-label={`Digit ${index + 1} of ${length}`}
                    value={digit}
                    placeholder={placeholder}
                    onChange={(event) => handleChange(event, index)}
                    onKeyDown={(event) => handleKeyDown(event, index)}
                    onPaste={handlePaste}
                    className="min-w-0 p-3 text-center dark:bg-transparent dark:border-slate-700 dark:text-[#abc2d3] dark:placeholder:text-slate-500 border border-[#bcbcbc] rounded-md outline-none focus:border-[#3B9DF8]"
                />
            ))}
        </div>
    );
};
