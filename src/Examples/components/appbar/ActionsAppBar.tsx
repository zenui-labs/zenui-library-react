import {useState, type ComponentType, type FormEvent, type ReactNode} from "react";
import {FiMenu} from "react-icons/fi";
import {FaRegCircleUser} from "react-icons/fa6";
import {CiSearch} from "react-icons/ci";

export interface AppBarAction {
    /** Accessible name of the button, for example "Cart". */
    label: string;
    icon: ComponentType<{className?: string}>;
    /** Number shown in the red badge. Leave it out or pass 0 to hide the badge. */
    count?: number;
    onClick?: () => void;
}

export interface ActionsAppBarProps {
    /** Icon buttons with optional count badges, shown before the profile button. */
    actions: AppBarAction[];
    /** Brand shown next to the menu button. Pass text or your own logo element. */
    logo?: ReactNode;
    /** Current search text. Pass it with `onChange` to control the field. */
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    /** Runs when the user presses Enter in the search field. */
    onSearch?: (value: string) => void;
    onMenuClick?: () => void;
    onProfileClick?: () => void;
    placeholder?: string;
    searchLabel?: string;
    menuLabel?: string;
    profileLabel?: string;
    className?: string;
}

/** An app bar with a menu button, logo and search on the left, and icon buttons with badges on the right. */
export const ActionsAppBar = ({
    actions,
    logo = "Logo",
    value,
    defaultValue = "",
    onChange,
    onSearch,
    onMenuClick,
    onProfileClick,
    placeholder = "Search...",
    searchLabel = "Search",
    menuLabel = "Open menu",
    profileLabel = "Open profile",
    className = "",
}: ActionsAppBarProps) => {
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
        <div className={`px-4 py-2 bg-[#3B9DF8] w-full gap-2 flex-wrap flex items-center justify-between ${className}`}>
            <div className="flex items-center gap-5">
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

            <div className="flex items-center gap-4">
                {actions.map(({label, icon: Icon, count, onClick}) => (
                    <button
                        key={label}
                        type="button"
                        aria-label={count ? `${label}, ${count}` : label}
                        onClick={onClick}
                        className="relative"
                    >
                        <Icon className="text-[1.8rem] text-[#ffffff]"/>
                        {count ? (
                            <span
                                className="absolute top-[-30%] right-[-10%] text-white min-w-[20px] min-h-[20px] text-center"
                                aria-hidden
                            >
                                <span className="text-[0.6rem] bg-[#cf0e0e] py-1 px-1 rounded-full w-full h-full">{count}</span>
                            </span>
                        ) : null}
                    </button>
                ))}
                <button type="button" aria-label={profileLabel} onClick={onProfileClick}>
                    <FaRegCircleUser className="text-[1.4rem] text-[#ffffff]" aria-hidden/>
                </button>
            </div>
        </div>
    );
};
