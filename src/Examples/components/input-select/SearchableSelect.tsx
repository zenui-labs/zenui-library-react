import {useEffect, useId, useRef, useState, type KeyboardEvent} from "react";
import {IoIosArrowDown} from "react-icons/io";
import {IoCheckmark} from "react-icons/io5";

export type OptionId = string | number;

export interface SearchOption {
    id: OptionId;
    label: string;
}

export interface SearchableSelectProps {
    options: SearchOption[];
    /** Id of the selected option, for a controlled select. Pass `null` for no selection. */
    value?: OptionId | null;
    /** Id selected at first, for an uncontrolled select. */
    defaultValue?: OptionId | null;
    onChange?: (value: OptionId) => void;
    placeholder?: string;
    /** Accessible name of the search field. */
    label?: string;
    /** Shown when no option matches the search. */
    emptyText?: string;
    className?: string;
}

/** A search field that filters a list of options. Picking an option marks it with a check. */
export const SearchableSelect = ({
    options,
    value,
    defaultValue = null,
    onChange,
    placeholder = "Search...",
    label = "Search options",
    emptyText = "No results found",
    className = "",
}: SearchableSelectProps) => {
    const [query, setQuery] = useState("");
    const [open, setOpen] = useState(false);
    const [internalValue, setInternalValue] = useState<OptionId | null>(defaultValue);
    const rootRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const listId = useId();
    const selected = value === undefined ? internalValue : value;

    const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(query.toLowerCase()));
    const isSelected = (option: SearchOption) => selected === option.id;

    const selectOption = (option: SearchOption) => {
        setInternalValue(option.id);
        onChange?.(option.id);
    };

    // Closes the list on a click or focus outside this select.
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
            inputRef.current?.focus();
        }
    };

    return (
        <div ref={rootRef} onKeyDown={handleKeyDown} className={`relative w-full max-w-md ${className}`}>
            <div className="relative">
                <input
                    ref={inputRef}
                    type="text"
                    aria-label={label}
                    aria-controls={listId}
                    placeholder={placeholder}
                    value={query}
                    onChange={(event) => {
                        setQuery(event.target.value);
                        setOpen(true);
                    }}
                    onFocus={() => setOpen(true)}
                    onClick={() => setOpen(true)}
                    className="w-full dark:border-slate-600 dark:bg-transparent dark:text-[#abc2d3] border border-gray-300 rounded-md pl-3 pr-10 py-2 focus:outline-none"
                />

                <IoIosArrowDown
                    aria-hidden="true"
                    className={`${
                        open ? "rotate-[180deg]" : "rotate-0"
                    } pointer-events-none transition-all duration-300 text-[1.3rem] absolute top-[50%] transform translate-y-[-50%] right-3 text-gray-500`}
                />
            </div>

            {open && (
                <div
                    id={listId}
                    className="absolute left-0 w-full mt-1 border dark:border-slate-700 dark:bg-slate-800 border-gray-200 rounded-md bg-white shadow-lg z-20"
                >
                    <ul className="w-full overflow-auto">
                        {filteredOptions.map((option) => (
                            <li key={option.id}>
                                <button
                                    type="button"
                                    aria-pressed={isSelected(option)}
                                    onClick={() => selectOption(option)}
                                    className="w-full text-left cursor-pointer px-3 py-2 dark:hover:bg-slate-900/40 flex items-center hover:bg-gray-200 dark:text-[#abc2d3]"
                                >
                                    <IoCheckmark
                                        aria-hidden="true"
                                        className={`${
                                            isSelected(option) ? "scale-[1] opacity-100" : "scale-[0.5] opacity-0"
                                        } mr-2 transition-all text-[1.3rem] duration-300`}
                                    />
                                    {option.label}
                                </button>
                            </li>
                        ))}
                    </ul>

                    {filteredOptions.length === 0 && (
                        <p role="status" className="text-center dark:text-[#abc2d3] text-[0.9rem] text-[#424242] py-8">
                            {emptyText}
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};
