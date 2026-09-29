import {useState, type FormEvent, type ReactNode} from "react";
import {FiMenu} from "react-icons/fi";
import {CiSearch} from "react-icons/ci";

export interface SearchAppBarProps {
    /** Brand shown next to the menu button. Pass text or your own logo element. */
    logo?: ReactNode;
    /** Current search text. Pass it with `onChange` to control the field. */
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    /** Runs when the user presses Enter in the search field. */
    onSearch?: (value: string) => void;
    onMenuClick?: () => void;
    placeholder?: string;
    searchLabel?: string;
    menuLabel?: string;
    className?: string;
}

/** An app bar with a menu button, a logo and a search field. */
export const SearchAppBar = ({
    logo = "Logo",
    value,
    defaultValue = "",
    onChange,
    onSearch,
    onMenuClick,
    placeholder = "Search...",
    searchLabel = "Search",
    menuLabel = "Open menu",
    className = "",
}: SearchAppBarProps) => {
    const [innerValue, setInnerValue] = useState(defaultValue);
    const query = value ?? innerValue;

    const handleChange = (next: string) => {
        if (value === undefined) setInnerValue(next);
        onChange?.(next);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSearch?.(query);
    };

    return (
        <div className={`px-4 py-2 bg-[#3B9DF8] w-full flex items-center justify-between ${className}`}>
            <div className="flex items-center gap-4">
                <button type="button" aria-label={menuLabel} onClick={onMenuClick} className="text-white">
                    <FiMenu className="text-white text-[1.7rem] cursor-pointer" aria-hidden/>
                </button>
                <h2 className="text-[1.3rem] text-white font-[600]">{logo}</h2>
            </div>
            <form role="search" className="relative" onSubmit={handleSubmit}>
                <input
                    type="search"
                    aria-label={searchLabel}
                    value={query}
                    onChange={(event) => handleChange(event.target.value)}
                    className="pl-10 py-2 bg-[#104c853d] border-none outline-none text-white placeholder:text-[#ffffffa8]"
                    placeholder={placeholder}
                />
                <CiSearch className="absolute top-2 left-3 text-white text-[1.4rem] pointer-events-none" aria-hidden/>
            </form>
        </div>
    );
};
