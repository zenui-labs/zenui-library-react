import {useEffect, useId, useRef, useState, type ChangeEvent, type InputHTMLAttributes} from "react";

export interface Country {
    name: string;
    /** Dialing code, for example "+1". */
    code: string;
    /** Flag emoji shown before the code. */
    flag: string;
}

export interface CountryCodeDropdownProps {
    countries: Country[];
    selectedCountry: Country;
    onSelect: (country: Country) => void;
    /** Accessible name of the picker button, followed by the selected country. */
    label?: string;
    className?: string;
}

/** A button that shows the selected dialing code and opens a list of countries. */
export const CountryCodeDropdown = ({
    countries,
    selectedCountry,
    onSelect,
    label = "Country code",
    className = "",
}: CountryCodeDropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);
    const toggleRef = useRef<HTMLButtonElement>(null);
    const menuId = useId();

    // Closes the list on a click outside it or on Escape.
    useEffect(() => {
        if (!isOpen) return;
        const handleClick = (event: MouseEvent) => {
            if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false);
        };
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setIsOpen(false);
                toggleRef.current?.focus();
            }
        };
        document.addEventListener("click", handleClick);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("click", handleClick);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen]);

    const handleSelect = (country: Country) => {
        onSelect(country);
        setIsOpen(false);
    };

    return (
        <div ref={rootRef} className={`relative ${className}`}>
            <button
                ref={toggleRef}
                type="button"
                aria-label={`${label}: ${selectedCountry.name} ${selectedCountry.code}`}
                aria-expanded={isOpen}
                aria-controls={menuId}
                className="flex items-center py-2.5 px-4 text-sm font-medium text-gray-900 dark:text-[#8b99a9] border-y border-l border-gray-300 dark:border-[#58667c] rounded-s-lg"
                onClick={() => setIsOpen((current) => !current)}
            >
                <span className="me-2" aria-hidden>{selectedCountry.flag}</span>
                {selectedCountry.code}
                <svg className="w-2.5 h-2.5 ms-2.5" fill="none" viewBox="0 0 10 6" aria-hidden>
                    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"/>
                </svg>
            </button>

            {isOpen && (
                <div id={menuId} className="absolute z-10 mt-1 bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-60">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 max-h-[200px] overflow-y-auto">
                        {countries.map((country) => (
                            <li key={country.name}>
                                <button
                                    type="button"
                                    aria-current={country.name === selectedCountry.name ? "true" : undefined}
                                    className="inline-flex w-full px-4 py-2 text-sm text-gray-700"
                                    onClick={() => handleSelect(country)}
                                >
                                    <span className="inline-flex items-center">
                                        <span className="me-2" aria-hidden>{country.flag}</span>
                                        {country.name} ({country.code})
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export interface PhoneInputProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "value" | "defaultValue" | "onChange" | "type"> {
    countries: Country[];
    /** Selected country, for a controlled picker. */
    country?: Country;
    /** Country selected at first, for an uncontrolled picker. Defaults to the first country. */
    defaultCountry?: Country;
    onCountryChange?: (country: Country) => void;
    /** Phone number for a controlled input, without the dialing code. */
    value?: string;
    /** Starting phone number for an uncontrolled input. */
    defaultValue?: string;
    onChange?: (value: string) => void;
    /** Accessible name for the number field. */
    label?: string;
    /** Accessible name of the country picker. */
    countryLabel?: string;
    className?: string;
}

/** A phone number input with a country code picker in front of the number. */
export const PhoneInput = ({
    countries,
    country,
    defaultCountry,
    onCountryChange,
    value,
    defaultValue = "",
    onChange,
    label = "Phone number",
    countryLabel,
    placeholder = "Enter your phone number",
    className = "",
    ...props
}: PhoneInputProps) => {
    const [internalCountry, setInternalCountry] = useState<Country | undefined>(defaultCountry ?? countries[0]);
    const [internalValue, setInternalValue] = useState(defaultValue);
    const selectedCountry = country ?? internalCountry;
    const phoneNumber = value ?? internalValue;

    const handleCountrySelect = (next: Country) => {
        setInternalCountry(next);
        onCountryChange?.(next);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInternalValue(event.target.value);
        onChange?.(event.target.value);
    };

    return (
        <div className={`relative inline-flex w-full ${className}`}>
            {selectedCountry && (
                <CountryCodeDropdown
                    countries={countries}
                    selectedCountry={selectedCountry}
                    onSelect={handleCountrySelect}
                    label={countryLabel}
                />
            )}
            <input
                type="tel"
                autoComplete="tel-national"
                aria-label={label}
                placeholder={placeholder}
                value={phoneNumber}
                onChange={handleChange}
                className="border border-gray-300 dark:border-[#58667c] px-4 py-2 rounded-e-lg w-full focus:outline-none dark:bg-[rgb(2,6,23)] text-black dark:text-[#8a9daf]"
                {...props}
            />
        </div>
    );
};
