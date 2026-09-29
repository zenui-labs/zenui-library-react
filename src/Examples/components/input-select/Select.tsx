import {useEffect, useId, useRef, useState, type KeyboardEvent} from "react";
import {IoChevronDown} from "react-icons/io5";

export interface SelectProps {
    /** Options listed in the menu. */
    options: string[];
    /** Selected option, for a controlled select. */
    value?: string;
    /** Option selected at first, for an uncontrolled select. */
    defaultValue?: string;
    onChange?: (value: string) => void;
    /** Text shown on the button while nothing is selected. */
    placeholder?: string;
    className?: string;
}

/** A button that opens a menu of options. The picked option becomes the button text. */
export const Select = ({
    options,
    value,
    defaultValue,
    onChange,
    placeholder = "Select an option",
    className = "",
}: SelectProps) => {
    const [internalValue, setInternalValue] = useState(defaultValue ?? "");
    const [open, setOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);
    const menuId = useId();
    const selected = value ?? internalValue;

    // Closes the menu on a click or focus outside this select.
    useEffect(() => {
        if (!open) return;
        const handleOutside = (event: Event) => {
            if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", handleOutside);
        document.addEventListener("focusin", handleOutside);
        return () => {
            document.removeEventListener("mousedown", handleOutside);
            document.removeEventListener("focusin", handleOutside);
        };
    }, [open]);

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Escape" && open) {
            setOpen(false);
            triggerRef.current?.focus();
        }
    };

    const handleSelect = (option: string) => {
        setInternalValue(option);
        onChange?.(option);
        setOpen(false);
        triggerRef.current?.focus();
    };

    return (
        <div ref={rootRef} onKeyDown={handleKeyDown} className={`relative w-full max-w-md ${className}`}>
            <button
                ref={triggerRef}
                type="button"
                aria-expanded={open}
                aria-controls={menuId}
                onClick={() => setOpen((current) => !current)}
                className="bg-[#fff] dark:bg-transparent dark:border-slate-600 dark:text-[#abc2d3] border border-[#d1d1d1] rounded-md w-full justify-between px-3 py-2 flex items-center gap-8 text-left cursor-pointer"
            >
                {selected || placeholder}
                <IoChevronDown
                    aria-hidden="true"
                    className={`${open ? "rotate-[180deg]" : "rotate-0"} transition-all duration-300 text-[1.2rem]`}
                />
            </button>

            <ul
                id={menuId}
                className={`${
                    open ? "z-[1] opacity-100 scale-[1] visible" : "z-[-1] opacity-0 scale-[0.8] invisible"
                } w-full absolute top-12 left-0 right-0 z-40 dark:bg-slate-800 dark:text-[#abc2d3] bg-[#fff] rounded-xl flex flex-col overflow-hidden transition-all duration-300 ease-in-out`}
                style={{boxShadow: "0 15px 60px -15px rgba(0, 0, 0, 0.3)"}}
            >
                {options.map((option) => (
                    <li key={option}>
                        <button
                            type="button"
                            aria-pressed={option === selected}
                            onClick={() => handleSelect(option)}
                            className="w-full text-left py-2 px-4 dark:hover:bg-slate-900/40 hover:bg-[#ececec] transition-all duration-200"
                        >
                            {option}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
