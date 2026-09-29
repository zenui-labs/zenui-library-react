import {useEffect, useId, useRef, useState, type ComponentType, type KeyboardEvent} from "react";
import {IoChevronDown} from "react-icons/io5";

export interface IconSelectOption {
    label: string;
    icon: ComponentType<{className?: string}>;
}

export interface IconSelectProps {
    /** Options listed in the menu, each with an icon. */
    options: IconSelectOption[];
    /** Label of the selected option, for a controlled select. */
    value?: string;
    /** Label selected at first, for an uncontrolled select. */
    defaultValue?: string;
    onChange?: (value: string) => void;
    /** Text shown on the button while nothing is selected. */
    placeholder?: string;
    className?: string;
}

/** A button that opens a menu of options with icons. The picked option's label becomes the button text. */
export const IconSelect = ({
    options,
    value,
    defaultValue,
    onChange,
    placeholder = "Select an option",
    className = "",
}: IconSelectProps) => {
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

    const handleSelect = (label: string) => {
        setInternalValue(label);
        onChange?.(label);
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
                className="bg-[#fff] dark:border-slate-600 dark:bg-transparent dark:text-[#abc2d3] border border-[#d1d1d1] rounded-md w-full justify-between px-3 py-2 flex items-center gap-8 text-left cursor-pointer"
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
                } w-full absolute top-12 dark:bg-slate-800 dark:text-[#abc2d3] left-0 right-0 z-40 bg-[#fff] rounded-xl flex flex-col overflow-hidden transition-all duration-300 ease-in-out`}
                style={{boxShadow: "0 15px 60px -15px rgba(0, 0, 0, 0.3)"}}
            >
                {options.map(({label, icon: Icon}) => (
                    <li key={label}>
                        <button
                            type="button"
                            aria-pressed={label === selected}
                            onClick={() => handleSelect(label)}
                            className="w-full text-left py-2 px-4 dark:hover:bg-slate-900/40 hover:bg-[#ececec] transition-all duration-200 flex items-center gap-2"
                        >
                            <Icon/>
                            {label}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};
