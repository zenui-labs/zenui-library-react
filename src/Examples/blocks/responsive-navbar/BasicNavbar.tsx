import {useId, useState, type ComponentType, type FormEvent, type ReactNode} from "react";
import {IoIosSearch} from "react-icons/io";
import {CiMenuFries} from "react-icons/ci";

export interface NavLink {
    label: string;
    href: string;
}

export interface SocialLink {
    /** Read by screen readers, for example "GitHub". */
    label: string;
    href: string;
    icon: ComponentType<{className?: string}>;
}

export interface BasicNavbarProps {
    /** Your logo, usually an image or an inline SVG. */
    logo: ReactNode;
    logoHref?: string;
    links: NavLink[];
    socialLinks?: SocialLink[];
    /** Called with the text when a visitor submits the search field. */
    onSearch?: (query: string) => void;
    searchPlaceholder?: string;
    searchLabel?: string;
    menuLabel?: string;
    className?: string;
}

// Reads the query from the submitted form so the desktop and mobile fields share one handler.
const submitSearch = (event: FormEvent<HTMLFormElement>, onSearch?: (query: string) => void) => {
    event.preventDefault();
    const query = new FormData(event.currentTarget).get("q");
    onSearch?.(typeof query === "string" ? query.trim() : "");
};

/**
 * A simple navbar with links, a search field and social icons. Below the `md` breakpoint the links and search
 * move into a menu that opens from the menu button.
 */
export const BasicNavbar = ({
    logo,
    logoHref = "/",
    links,
    socialLinks = [],
    onSearch,
    searchPlaceholder = "Search...",
    searchLabel = "Search",
    menuLabel = "Menu",
    className = "",
}: BasicNavbarProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuId = useId();

    return (
        <nav className={`flex items-center justify-between w-full relative ${className}`}>
            <a href={logoHref}>{logo}</a>

            {/* nav links */}
            <ul className="items-center gap-[20px] text-[1rem] text-[#424242] md:flex hidden">
                {links.map((link) => (
                    <li key={link.label}>
                        <a
                            href={link.href}
                            className="hover:border-b-[#3B9DF8] border-b-[2px] border-transparent transition-all duration-500 cursor-pointer dark:text-[#abc2d3] hover:text-[#3B9DF8]"
                        >
                            {link.label}
                        </a>
                    </li>
                ))}
            </ul>

            {/* search bar and community links */}
            <div className="flex items-center gap-[10px]">
                <form role="search" onSubmit={(event) => submitSearch(event, onSearch)} className="relative md:flex hidden">
                    <input
                        type="search"
                        name="q"
                        aria-label={searchLabel}
                        className="py-1.5 dark:bg-transparent dark:border-slate-700 dark:placeholder:text-slate-500 dark:text-[#abc2d3] pr-4 border border-[#424242] pl-10 rounded-full outline-none focus:border-[#3B9DF8]"
                        placeholder={searchPlaceholder}
                    />
                    <IoIosSearch aria-hidden className="absolute top-[9px] dark:text-slate-500 left-3 text-[#424242] text-[1.3rem]"/>
                </form>

                {socialLinks.map(({label, href, icon: Icon}) => (
                    <a key={label} href={href} aria-label={label}>
                        <Icon className="text-[1.6rem] dark:text-[#abc2d3] text-[#424242] cursor-pointer hover:text-[#3B9DF8] transition-all duration-500"/>
                    </a>
                ))}

                <button
                    type="button"
                    aria-label={menuLabel}
                    aria-expanded={isMenuOpen}
                    aria-controls={menuId}
                    onClick={() => setIsMenuOpen((open) => !open)}
                    className="md:hidden flex"
                >
                    <CiMenuFries className="text-[1.6rem] dark:text-[#abc2d3] text-[#424242] cursor-pointer"/>
                </button>
            </div>

            {/* mobile menu */}
            <aside
                id={menuId}
                className={`${
                    isMenuOpen ? "translate-x-0 opacity-100 z-20 visible" : "translate-x-[200px] opacity-0 z-[-1] invisible"
                } md:hidden bg-[#3B9DF8] p-4 text-center absolute top-[60px] dark:bg-slate-700 right-0 w-full sm:w-[300px] rounded-md transition-all duration-300`}
            >
                <form role="search" onSubmit={(event) => submitSearch(event, onSearch)} className="w-full relative mb-5">
                    <input
                        type="search"
                        name="q"
                        aria-label={searchLabel}
                        className="py-1.5 pr-4 dark:bg-slate-800 dark:text-[#abc2d3] pl-12 w-full rounded-full outline-none focus:border-[#3B9DF8]"
                        placeholder={searchPlaceholder}
                    />
                    <IoIosSearch aria-hidden className="absolute top-[9px] dark:text-slate-400 left-5 text-[#424242] text-[1.3rem]"/>
                </form>

                <ul className="items-center gap-[20px] text-[1rem] text-white flex flex-col">
                    {links.map((link) => (
                        <li key={link.label}>
                            <a
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="hover:border-b-[#3B9DF8] dark:text-[#abc2d3] border-b-[2px] border-transparent transition-all duration-500 cursor-pointer"
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>
            </aside>
        </nav>
    );
};
