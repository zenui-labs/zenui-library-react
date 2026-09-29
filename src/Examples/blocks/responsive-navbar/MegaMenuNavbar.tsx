import {useId, useState, type ComponentType, type FormEvent, type ReactNode} from "react";
import {IoIosArrowDown, IoIosSearch} from "react-icons/io";
import {CiMenuFries} from "react-icons/ci";
import {MdKeyboardArrowDown} from "react-icons/md";
import {BsArrowRight} from "react-icons/bs";

type Icon = ComponentType<{className?: string}>;

export interface NavLink {
    label: string;
    href: string;
}

export interface DropdownHighlight {
    label: string;
    icon: Icon;
    /** Tailwind classes for the round icon badge, for example "bg-blue-200 text-blue-900". */
    iconClassName: string;
}

export interface NavDropdown {
    links: NavLink[];
    /** Short selling points shown next to the links. */
    highlights?: DropdownHighlight[];
    imageSrc?: string;
    imageAlt?: string;
    /** Left edge of the panel relative to its menu item, in pixels. */
    offset?: number;
}

export interface MegaMenuNavLink extends NavLink {
    /** Opens a panel on hover or keyboard focus. */
    dropdown?: NavDropdown;
}

export interface SocialLink {
    /** Read by screen readers, for example "GitHub". */
    label: string;
    href: string;
    icon: Icon;
}

export interface MegaMenuNavbarProps {
    /** Your logo, usually an image or an inline SVG. */
    logo: ReactNode;
    logoHref?: string;
    links: MegaMenuNavLink[];
    socialLinks?: SocialLink[];
    /** Called with the text when a visitor submits the search field. */
    onSearch?: (query: string) => void;
    searchPlaceholder?: string;
    searchLabel?: string;
    menuLabel?: string;
    className?: string;
}

const HighlightList = ({highlights, className}: {highlights: DropdownHighlight[]; className: string}) => (
    <div className={className}>
        {highlights.map(({label, icon: HighlightIcon, iconClassName}) => (
            <div key={label} className="flex items-center gap-[10px] dark:text-[#abc2d3] text-[1rem] text-[#424242]">
                <HighlightIcon className={`${iconClassName} p-1.5 rounded-full text-[2rem] shrink-0`}/>
                {label}
            </div>
        ))}
    </div>
);

const DropdownLinks = ({links, onNavigate}: {links: NavLink[]; onNavigate?: () => void}) => (
    <ul className="flex flex-col gap-[7px] text-[#424242]">
        {links.map((link) => (
            <li key={link.label}>
                <a
                    href={link.href}
                    onClick={onNavigate}
                    className="flex items-center gap-[7px] dark:text-[#abc2d3] hover:text-[#3B9DF8] transition-all duration-300"
                >
                    <BsArrowRight aria-hidden className="text-[#424242] dark:text-[#abc2d3] text-[0.9rem]"/>
                    {link.label}
                </a>
            </li>
        ))}
    </ul>
);

// Reads the query from the submitted form.
const submitSearch = (event: FormEvent<HTMLFormElement>, onSearch?: (query: string) => void) => {
    event.preventDefault();
    const query = new FormData(event.currentTarget).get("q");
    onSearch?.(typeof query === "string" ? query.trim() : "");
};

/**
 * A navbar whose items can open wide dropdown panels with links, highlights and an image. Panels open on hover
 * or when a link inside gets keyboard focus. Below the `md` breakpoint the panels become collapsible sections.
 */
export const MegaMenuNavbar = ({
    logo,
    logoHref = "/",
    links,
    socialLinks = [],
    onSearch,
    searchPlaceholder = "Search...",
    searchLabel = "Search",
    menuLabel = "Menu",
    className = "",
}: MegaMenuNavbarProps) => {
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [openSection, setOpenSection] = useState<string | null>(null);
    const mobileMenuId = useId();
    const closeMobileMenu = () => setMobileSidebarOpen(false);

    return (
        <nav className={`flex items-center justify-between w-full relative h-auto ${className}`}>
            <a href={logoHref}>{logo}</a>

            {/* nav links */}
            <ul className="items-center gap-[20px] text-[1rem] text-[#424242] md:flex hidden">
                {links.map(({label, href, dropdown}) =>
                    dropdown ? (
                        <li
                            key={label}
                            className="transition-all duration-500 dark:text-[#abc2d3] hover:text-[#3B9DF8] flex items-center gap-[3px] group relative"
                        >
                            <a href={href} className="cursor-pointer">
                                {label}
                            </a>
                            <MdKeyboardArrowDown
                                aria-hidden
                                className="text-[1.5rem] dark:text-[#abc2d3] text-[#424242] group-hover:text-[#3B9DF8] transition-all duration-500 group-hover:rotate-[180deg] group-focus-within:rotate-[180deg]"
                            />

                            <article
                                style={{left: dropdown.offset ?? -100}}
                                className="p-6 bg-white rounded-md shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] w-[500px] absolute top-[40px] z-[-1] dark:bg-slate-800 translate-y-[-20px] opacity-0 invisible group-hover:translate-y-0 group-hover:opacity-100 group-hover:z-30 group-hover:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-focus-within:z-30 group-focus-within:visible transition-all duration-300"
                            >
                                <div className="grid grid-cols-2">
                                    <DropdownLinks links={dropdown.links}/>

                                    {dropdown.highlights && dropdown.highlights.length > 0 && (
                                        <HighlightList
                                            highlights={dropdown.highlights}
                                            className="flex flex-col gap-[10px] dark:border-slate-700 border-l border-[#e5eaf2] pl-[30px]"
                                        />
                                    )}
                                </div>

                                {dropdown.imageSrc && (
                                    <img
                                        src={dropdown.imageSrc}
                                        alt={dropdown.imageAlt ?? ""}
                                        className="w-full object-cover mt-4 rounded-sm h-[150px]"
                                    />
                                )}
                            </article>
                        </li>
                    ) : (
                        <li key={label}>
                            <a
                                href={href}
                                className="transition-all duration-500 cursor-pointer dark:text-[#abc2d3] hover:text-[#3B9DF8]"
                            >
                                {label}
                            </a>
                        </li>
                    ),
                )}
            </ul>

            <div className="flex items-center gap-[10px]">
                <form role="search" onSubmit={(event) => submitSearch(event, onSearch)} className="relative md:flex hidden">
                    <input
                        type="search"
                        name="q"
                        aria-label={searchLabel}
                        className="py-1.5 pr-4 dark:bg-transparent dark:border-slate-700 dark:placeholder:text-slate-500 dark:text-[#abc2d3] border border-[#424242] pl-10 rounded-full outline-none focus:border-[#3B9DF8]"
                        placeholder={searchPlaceholder}
                    />
                    <IoIosSearch aria-hidden className="absolute top-[9px] dark:text-slate-500 left-3 text-[#424242] text-[1.3rem]"/>
                </form>

                {socialLinks.map(({label, href, icon: SocialIcon}) => (
                    <a key={label} href={href} aria-label={label}>
                        <SocialIcon className="text-[1.6rem] text-[#424242] dark:text-[#abc2d3] cursor-pointer hover:text-[#3B9DF8] transition-all duration-500"/>
                    </a>
                ))}

                <button
                    type="button"
                    aria-label={menuLabel}
                    aria-expanded={mobileSidebarOpen}
                    aria-controls={mobileMenuId}
                    onClick={() => setMobileSidebarOpen((open) => !open)}
                    className="md:hidden flex"
                >
                    <CiMenuFries className="text-[1.6rem] dark:text-[#abc2d3] text-[#424242] cursor-pointer"/>
                </button>
            </div>

            {/* mobile menu */}
            <aside
                id={mobileMenuId}
                className={`${
                    mobileSidebarOpen ? "translate-x-0 opacity-100 z-20 visible" : "translate-x-[200px] opacity-0 z-[-1] invisible"
                } md:hidden bg-white shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] p-4 text-center absolute dark:bg-slate-700 top-[55px] right-0 sm:w-[300px] w-full rounded-md transition-all duration-300`}
            >
                <ul className="items-start gap-[20px] text-[1rem] text-gray-600 flex flex-col">
                    {links.map(({label, href, dropdown}) => {
                        if (!dropdown) {
                            return (
                                <li key={label}>
                                    <a
                                        href={href}
                                        onClick={closeMobileMenu}
                                        className="hover:text-[#3B9DF8] dark:text-[#abc2d3] transition-all duration-500 cursor-pointer flex items-center gap-[10px]"
                                    >
                                        {label}
                                    </a>
                                </li>
                            );
                        }

                        const open = openSection === label;
                        return (
                            <li key={label} className="flex flex-col items-start gap-[20px]">
                                <button
                                    type="button"
                                    aria-expanded={open}
                                    onClick={() => setOpenSection(open ? null : label)}
                                    className="hover:text-[#3B9DF8] group dark:text-[#abc2d3] transition-all duration-500 cursor-pointer flex items-center gap-[10px]"
                                >
                                    {label}
                                    <IoIosArrowDown
                                        aria-hidden
                                        className={`${
                                            open ? "rotate-[180deg]" : "rotate-0"
                                        } text-gray-600 group-hover:text-[#3B9DF8] dark:text-[#abc2d3] transition-all duration-300`}
                                    />
                                </button>

                                <div className={`${open ? "block" : "hidden"} font-[500] ml-6 text-left`}>
                                    <DropdownLinks links={dropdown.links} onNavigate={closeMobileMenu}/>
                                    {dropdown.highlights && dropdown.highlights.length > 0 && (
                                        <HighlightList highlights={dropdown.highlights} className="flex flex-col gap-[10px] mt-4"/>
                                    )}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </aside>
        </nav>
    );
};
