import {useId, useState, type FormEvent, type ReactNode} from "react";
import {IoIosSearch} from "react-icons/io";
import {CiMenuFries} from "react-icons/ci";

export interface NavLink {
    label: string;
    href: string;
}

export interface StandardNavbarProps {
    /** Your logo, usually an image or an inline SVG. */
    logo: ReactNode;
    logoHref?: string;
    links: NavLink[];
    onSignIn?: () => void;
    onSignUp?: () => void;
    signInLabel?: string;
    signUpLabel?: string;
    /** Called with the text when a visitor submits the search field in the mobile menu. */
    onSearch?: (query: string) => void;
    searchPlaceholder?: string;
    searchLabel?: string;
    menuLabel?: string;
    className?: string;
}

const linkClass =
    "before:w-0 hover:before:w-full before:bg-[#3B9DF8] before:h-[2px] before:transition-all before:duration-300 before:absolute relative before:rounded-full before:bottom-[-2px] dark:text-[#abc2d3] hover:text-[#3B9DF8] transition-all duration-300 before:left-0 cursor-pointer";

/**
 * A rounded navbar with underlined links and sign in and sign up buttons. Below the `md` breakpoint the links move
 * into a menu with a search field.
 */
export const StandardNavbar = ({
    logo,
    logoHref = "/",
    links,
    onSignIn,
    onSignUp,
    signInLabel = "Sign in",
    signUpLabel = "Sign up",
    onSearch,
    searchPlaceholder = "Search...",
    searchLabel = "Search",
    menuLabel = "Menu",
    className = "",
}: StandardNavbarProps) => {
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const menuId = useId();

    const handleSearch = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const query = new FormData(event.currentTarget).get("q");
        onSearch?.(typeof query === "string" ? query.trim() : "");
    };

    return (
        <nav
            className={`flex items-center justify-between w-full relative dark:bg-slate-900 bg-white shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] rounded-full px-[10px] py-[8px] ${className}`}
        >
            <a href={logoHref}>{logo}</a>

            {/* nav links */}
            <ul className="items-center gap-[20px] text-[1rem] text-[#424242] md:flex hidden">
                {links.map((link) => (
                    <li key={link.label}>
                        <a href={link.href} className={linkClass}>
                            {link.label}
                        </a>
                    </li>
                ))}
            </ul>

            {/* action buttons */}
            <div className="items-center gap-[10px] flex">
                <button
                    type="button"
                    onClick={onSignIn}
                    className="py-[7px] text-[1rem] px-[16px] dark:text-[#abc2d3] rounded-full hover:text-[#3B9DF8] transition-all duration-300 sm:flex hidden"
                >
                    {signInLabel}
                </button>
                <button
                    type="button"
                    onClick={onSignUp}
                    className="py-[7px] text-[1rem] px-[16px] rounded-full bg-[#3B9DF8] text-white hover:bg-blue-400 transition-all duration-300 sm:flex hidden"
                >
                    {signUpLabel}
                </button>

                <button
                    type="button"
                    aria-label={menuLabel}
                    aria-expanded={mobileSidebarOpen}
                    aria-controls={menuId}
                    onClick={() => setMobileSidebarOpen((open) => !open)}
                    className="md:hidden flex mr-1"
                >
                    <CiMenuFries className="text-[1.8rem] dark:text-[#abc2d3] text-[#424242] cursor-pointer"/>
                </button>
            </div>

            {/* mobile menu */}
            <aside
                id={menuId}
                className={`${
                    mobileSidebarOpen ? "translate-x-0 opacity-100 z-20 visible" : "translate-x-[200px] opacity-0 z-[-1] invisible"
                } md:hidden bg-white shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] p-4 text-center absolute top-[65px] dark:bg-slate-700 right-0 w-full sm:w-[50%] rounded-md transition-all duration-300`}
            >
                <form role="search" onSubmit={handleSearch} className="relative mb-5">
                    <input
                        type="search"
                        name="q"
                        aria-label={searchLabel}
                        className="py-1.5 pr-4 dark:bg-slate-800 dark:text-[#abc2d3] dark:border-slate-900/50 w-full pl-10 rounded-full border border-gray-200 outline-none focus:border-[#3B9DF8]"
                        placeholder={searchPlaceholder}
                    />
                    <IoIosSearch aria-hidden className="absolute dark:text-slate-400 top-[8px] left-3 text-gray-500 text-[1.3rem]"/>
                </form>
                <ul className="items-center gap-[20px] text-[1rem] text-gray-600 flex flex-col">
                    {links.map((link) => (
                        <li key={link.label}>
                            <a href={link.href} onClick={() => setMobileSidebarOpen(false)} className={linkClass}>
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </aside>
        </nav>
    );
};
