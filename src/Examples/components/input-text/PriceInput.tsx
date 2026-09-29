import {useEffect, useId, useRef, useState, type ComponentType, type InputHTMLAttributes} from "react";
import {IoIosArrowDown} from "react-icons/io";

export interface Currency {
    /** Short code shown in the picker, for example "USD". */
    code: string;
    /** Currency symbol shown at the start of the field. */
    icon: ComponentType<{className?: string}>;
}

export interface PriceInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "type"> {
    currencies: Currency[];
    /** Selected currency code, for a controlled picker. */
    currency?: string;
    /** Currency code selected at first, for an uncontrolled picker. Defaults to the first currency. */
    defaultCurrency?: string;
    onCurrencyChange?: (code: string) => void;
    /** Accessible name for the amount field. */
    label?: string;
    /** Accessible name of the currency picker button. */
    currencyLabel?: string;
    className?: string;
}

/** A number input for an amount, with a currency picker. The symbol on the left follows the selected currency. */
export const PriceInput = ({
    currencies,
    currency,
    defaultCurrency,
    onCurrencyChange,
    label = "Price",
    currencyLabel = "Currency",
    placeholder = "0",
    className = "",
    ...props
}: PriceInputProps) => {
    const [internalCurrency, setInternalCurrency] = useState(defaultCurrency ?? currencies[0]?.code ?? "");
    const [open, setOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);
    const toggleRef = useRef<HTMLButtonElement>(null);
    const menuId = useId();
    const selectedCode = currency ?? internalCurrency;
    const selected = currencies.find((item) => item.code === selectedCode);
    const SelectedIcon = selected?.icon;

    // Closes the picker on a click outside it or on Escape.
    useEffect(() => {
        if (!open) return;
        const handleClick = (event: MouseEvent) => {
            if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
        };
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setOpen(false);
                toggleRef.current?.focus();
            }
        };
        document.addEventListener("click", handleClick);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("click", handleClick);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [open]);

    const handleSelect = (code: string) => {
        setInternalCurrency(code);
        onCurrencyChange?.(code);
        setOpen(false);
    };

    return (
        <div ref={rootRef} className={`w-full relative ${className}`}>
            <input
                type="number"
                inputMode="decimal"
                aria-label={label}
                placeholder={placeholder}
                className="border dark:border-slate-600 bg-transparent dark:text-[#abc2d3] dark:placeholder:text-slate-500 border-[#e5eaf2] py-3 pl-[65px] pr-[80px] outline-none w-full rounded-md"
                {...props}
            />

            <div className="bg-gray-100 w-[50px] dark:bg-slate-900 dark:border dark:border-slate-600 absolute top-0 h-full left-0 flex items-center justify-center rounded-l-md" aria-hidden>
                {SelectedIcon && <SelectedIcon className="text-[1.2rem] dark:text-slate-400 text-gray-600"/>}
            </div>

            <div className="absolute top-0 right-0 h-full">
                <button
                    ref={toggleRef}
                    type="button"
                    aria-label={`${currencyLabel}: ${selectedCode}`}
                    aria-expanded={open}
                    aria-controls={menuId}
                    onClick={() => setOpen((current) => !current)}
                    className="h-full flex dark:border-slate-600 items-center justify-center cursor-pointer border-l border-[#e5eaf2] px-4"
                >
                    <span className="flex items-center gap-[8px] dark:text-slate-300 text-[#424242]">
                        {selectedCode}
                        <IoIosArrowDown
                            className={`${open ? "rotate-[180deg]" : "rotate-0"} transition-all duration-200`}
                            aria-hidden
                        />
                    </span>
                </button>

                <ul
                    id={menuId}
                    className={`${
                        open ? "translate-y-0 opacity-100 z-30 visible" : "translate-y-[-10px] opacity-0 z-[-1] invisible"
                    } list-none absolute top-[53px] dark:bg-slate-800 dark:text-slate-300 right-0 bg-white shadow-[0px_0px_3px_0px_rgba(0,0,0,0.1)] w-[87px] flex flex-col items-center transition-all duration-200 justify-center py-1 rounded-md`}
                >
                    {currencies.map((item) => (
                        <li key={item.code} className="w-full">
                            <button
                                type="button"
                                aria-current={item.code === selectedCode ? "true" : undefined}
                                onClick={() => handleSelect(item.code)}
                                className="py-2 px-4 w-full dark:hover:bg-slate-700/30 hover:bg-gray-100 text-center cursor-pointer"
                            >
                                {item.code}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
