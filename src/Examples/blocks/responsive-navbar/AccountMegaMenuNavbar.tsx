import {useEffect, useId, useRef, useState, type ComponentType, type FocusEvent, type ReactNode} from "react";
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import {TbLogout2} from "react-icons/tb";
import {CiMenuFries} from "react-icons/ci";
import {MdOutlineArrowRightAlt, MdOutlineKeyboardArrowRight} from "react-icons/md";

type Icon = ComponentType<{className?: string}>;

export interface MegaMenuItem {
    title: string;
    description: string;
    href: string;
    /** Image next to the item. Takes priority over `icon`. */
    imageSrc?: string;
    icon?: Icon;
    /** Small label next to the title, for example "Featured". */
    badge?: string;
    /** Text of the arrow link under the description. Leave it out for a plain item. */
    ctaLabel?: string;
    /** Tailwind text color for the arrow link, for example "text-[#FF5E5E]". */
    ctaClassName?: string;
}

export interface MegaMenuSection {
    title: string;
    items: MegaMenuItem[];
}

export interface MegaMenu {
    /** Text of the top-level link that opens the mega menu. */
    label: string;
    icon?: Icon;
    /** Columns of links. Two columns fit best. */
    sections: MegaMenuSection[];
    /** Larger items with a wide image, shown in a shaded box under the columns. */
    promos?: MegaMenuItem[];
}

export interface IconNavLink {
    label: string;
    href: string;
    icon: Icon;
}

export interface AccountUser {
    name: string;
    avatarSrc: string;
    /** Shows a green status dot on the avatar. */
    online?: boolean;
}

export interface AccountMenuItem {
    label: string;
    icon: Icon;
    /** Renders the item as a link. Without it the item is a button that calls `onSelect`. */
    href?: string;
    onSelect?: () => void;
}

export interface AccountMegaMenuNavbarProps {
    /** Your logo, usually an image or an inline SVG. */
    logo: ReactNode;
    logoHref?: string;
    megaMenu: MegaMenu;
    /** Links shown after the mega menu. */
    links: IconNavLink[];
    user: AccountUser;
    accountItems: AccountMenuItem[];
    onLogout?: () => void;
    logoutLabel?: string;
    accountMenuLabel?: string;
    menuLabel?: string;
    className?: string;
}

const MegaMenuEntry = ({item, wide = false}: {item: MegaMenuItem; wide?: boolean}) => {
    const ItemIcon = item.icon;

    return (
        <a href={item.href} className="flex gap-[10px] group">
            {item.imageSrc ? (
                <img src={item.imageSrc} alt="" className={wide ? "w-[100px]" : "w-[30px] h-[30px]"}/>
            ) : (
                ItemIcon && <ItemIcon className="text-[1.4rem] shrink-0 dark:text-[#abc2d3] text-gray-600"/>
            )}

            <div>
                <div className={item.badge ? "mb-2 flex items-center gap-[5px]" : ""}>
                    <p className="text-[1rem] dark:text-[#abc2d3] text-gray-600 font-[500]">{item.title}</p>
                    {item.badge && (
                        <span className="py-[3px] px-[8px] text-[0.6rem] text-gray-500 border dark:border-slate-700 dark:text-[#abc2d3] border-gray-300 rounded-full text-center">
                            {item.badge}
                        </span>
                    )}
                </div>
                <p className="text-[0.9rem] dark:text-slate-400 text-gray-400 font-[300]">{item.description}</p>

                {item.ctaLabel && (
                    <span className={`${item.ctaClassName ?? "text-[#FF5E5E]"} mt-2 flex items-center gap-[4px] text-[0.9rem]`}>
                        {item.ctaLabel}
                        <MdOutlineArrowRightAlt aria-hidden className="text-[1.4rem] group-hover:ml-[5px] transition-all duration-300"/>
                    </span>
                )}
            </div>
        </a>
    );
};

/**
 * A navbar with a product mega menu, icon links and an account dropdown. The mega menu opens on hover or click,
 * and below the `md` breakpoint everything moves into a menu with collapsible sections.
 */
export const AccountMegaMenuNavbar = ({
    logo,
    logoHref = "/",
    megaMenu,
    links,
    user,
    accountItems,
    onLogout,
    logoutLabel = "Log out",
    accountMenuLabel = "Account menu",
    menuLabel = "Menu",
    className = "",
}: AccountMegaMenuNavbarProps) => {
    const [accountMenuOpen, setAccountMenuOpen] = useState(false);
    const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
    const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
    const [mobileMegaMenuOpen, setMobileMegaMenuOpen] = useState(true);
    const [openSection, setOpenSection] = useState<string | null>(null);
    const accountRef = useRef<HTMLDivElement>(null);
    const ids = useId();
    const megaMenuId = `${ids}-mega`;
    const accountMenuId = `${ids}-account`;
    const mobileMenuId = `${ids}-mobile`;
    const MegaMenuIcon = megaMenu.icon;

    // Closes the account menu on a click outside it or on Escape.
    useEffect(() => {
        if (!accountMenuOpen) return;
        const onPointerDown = (event: PointerEvent) => {
            if (!accountRef.current?.contains(event.target as Node)) setAccountMenuOpen(false);
        };
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setAccountMenuOpen(false);
        };
        document.addEventListener("pointerdown", onPointerDown);
        document.addEventListener("keydown", onKeyDown);
        return () => {
            document.removeEventListener("pointerdown", onPointerDown);
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [accountMenuOpen]);

    // Keeps the mega menu open while focus moves between its links.
    const closeMegaMenuOnBlur = (event: FocusEvent<HTMLLIElement>) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setIsMegaMenuOpen(false);
    };

    const accountItemClass =
        "flex w-full items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-left dark:text-[#abc2d3] dark:hover:bg-slate-900/50 text-gray-600 hover:bg-gray-50";

    return (
        <nav className={`flex items-center justify-between w-full relative ${className}`}>
            <a href={logoHref}>{logo}</a>

            {/* nav links */}
            <ul className="items-center gap-[20px] text-[1rem] text-[#424242] md:flex hidden">
                <li
                    onMouseEnter={() => setIsMegaMenuOpen(true)}
                    onMouseLeave={() => setIsMegaMenuOpen(false)}
                    onBlur={closeMegaMenuOnBlur}
                    onKeyDown={(event) => event.key === "Escape" && setIsMegaMenuOpen(false)}
                >
                    <button
                        type="button"
                        aria-expanded={isMegaMenuOpen}
                        aria-controls={megaMenuId}
                        onClick={() => setIsMegaMenuOpen((open) => !open)}
                        className={`${
                            isMegaMenuOpen ? "text-[#3B9DF8]" : "dark:text-[#abc2d3] text-gray-600"
                        } flex items-center gap-[5px] cursor-pointer`}
                    >
                        {MegaMenuIcon && <MegaMenuIcon className="text-[1.1rem]"/>}
                        {megaMenu.label}
                        <IoIosArrowUp
                            aria-hidden
                            className={`${isMegaMenuOpen ? "rotate-0" : "rotate-[-180deg]"} transition-all duration-300`}
                        />
                    </button>

                    {/* mega menu */}
                    <div
                        id={megaMenuId}
                        className={`${
                            isMegaMenuOpen ? "translate-y-0 opacity-100 z-30 visible" : "translate-y-[20px] opacity-0 z-[-1] invisible"
                        } bg-white rounded-md w-full absolute top-[40px] dark:bg-slate-800 left-0 p-[30px] transition-all duration-300 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] flex flex-wrap gap-[30px]`}
                    >
                        <div className="grid grid-cols-2 gap-[30px]">
                            {megaMenu.sections.map((section) => (
                                <div key={section.title} className="flex flex-col gap-[20px]">
                                    <p className="text-[1.2rem] dark:text-[#abc2d3] text-gray-500 font-[500]">{section.title}</p>
                                    {section.items.map((item) => (
                                        <MegaMenuEntry key={item.title} item={item}/>
                                    ))}
                                </div>
                            ))}
                        </div>

                        {megaMenu.promos && megaMenu.promos.length > 0 && (
                            <div className="flex flex-col gap-[20px] dark:bg-slate-900 bg-gray-50 rounded-md p-[20px] w-full">
                                {megaMenu.promos.map((promo) => (
                                    <MegaMenuEntry key={promo.title} item={promo} wide/>
                                ))}
                            </div>
                        )}
                    </div>
                </li>

                {links.map(({label, href, icon: LinkIcon}) => (
                    <li key={label}>
                        <a
                            href={href}
                            className="flex items-center dark:text-[#abc2d3] hover:text-[#3B9DF8] group gap-[5px] cursor-pointer"
                        >
                            <LinkIcon className="text-[1.1rem] group-hover:text-[#3B9DF8] dark:text-[#abc2d3] text-gray-600"/>
                            {label}
                        </a>
                    </li>
                ))}
            </ul>

            {/* user account */}
            <div className="flex items-center gap-[15px]">
                <div ref={accountRef} className="relative">
                    <button
                        type="button"
                        aria-label={`${accountMenuLabel}, ${user.name}`}
                        aria-expanded={accountMenuOpen}
                        aria-controls={accountMenuId}
                        onClick={() => setAccountMenuOpen((open) => !open)}
                        className="flex items-center gap-[10px] cursor-pointer"
                    >
                        <span className="relative">
                            <img src={user.avatarSrc} alt="" className="w-[35px] h-[35px] rounded-full object-cover"/>
                            {user.online && (
                                <span className="w-[10px] h-[10px] rounded-full bg-green-500 absolute bottom-[0px] right-0 border-2 border-white"/>
                            )}
                        </span>

                        <span className="text-[1rem] dark:text-[#abc2d3] font-[400] text-gray-600 sm:block hidden">{user.name}</span>

                        <IoIosArrowUp
                            aria-hidden
                            className={`${
                                accountMenuOpen ? "rotate-0" : "rotate-[180deg]"
                            } transition-all duration-300 dark:text-[#abc2d3] text-gray-600 sm:block hidden`}
                        />
                    </button>

                    <div
                        id={accountMenuId}
                        className={`${
                            accountMenuOpen ? "translate-y-0 opacity-100 z-[1] visible" : "translate-y-[10px] opacity-0 z-[-1] invisible"
                        } bg-white w-max rounded-md shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] absolute dark:bg-slate-800 top-[45px] right-0 p-[10px] flex flex-col transition-all duration-300 gap-[5px]`}
                    >
                        {accountItems.map(({label, icon: ItemIcon, href, onSelect}) =>
                            href ? (
                                <a key={label} href={href} onClick={() => setAccountMenuOpen(false)} className={accountItemClass}>
                                    <ItemIcon/>
                                    {label}
                                </a>
                            ) : (
                                <button
                                    key={label}
                                    type="button"
                                    onClick={() => {
                                        onSelect?.();
                                        setAccountMenuOpen(false);
                                    }}
                                    className={accountItemClass}
                                >
                                    <ItemIcon/>
                                    {label}
                                </button>
                            ),
                        )}

                        <div className="mt-3 border-t dark:border-slate-700 border-gray-200 pt-[5px]">
                            <button
                                type="button"
                                onClick={() => {
                                    onLogout?.();
                                    setAccountMenuOpen(false);
                                }}
                                className="flex w-full items-center gap-[5px] rounded-md p-[8px] pr-[45px] py-[3px] text-[1rem] text-left dark:text-red-500 dark:hover:bg-red-500/20 text-red-500 hover:bg-red-50"
                            >
                                <TbLogout2/>
                                {logoutLabel}
                            </button>
                        </div>
                    </div>
                </div>

                <button
                    type="button"
                    aria-label={menuLabel}
                    aria-expanded={mobileSidebarOpen}
                    aria-controls={mobileMenuId}
                    onClick={() => setMobileSidebarOpen((open) => !open)}
                    className="md:hidden flex"
                >
                    <CiMenuFries className="text-[1.8rem] dark:text-[#abc2d3] text-[#424242] cursor-pointer"/>
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
                    <li>
                        <button
                            type="button"
                            aria-expanded={mobileMegaMenuOpen}
                            onClick={() => setMobileMegaMenuOpen((open) => !open)}
                            className="hover:text-[#3B9DF8] group dark:text-[#abc2d3] transition-all duration-500 cursor-pointer flex items-center gap-[10px]"
                        >
                            {megaMenu.label}
                            <IoIosArrowDown
                                aria-hidden
                                className={`${
                                    mobileMegaMenuOpen ? "rotate-[180deg]" : "rotate-0"
                                } text-gray-600 group-hover:text-[#3B9DF8] dark:text-[#abc2d3] transition-all duration-300`}
                            />
                        </button>
                    </li>

                    {megaMenu.sections.map((section) => {
                        const open = openSection === section.title;
                        return (
                            <li key={section.title} className={`${mobileMegaMenuOpen ? "block" : "hidden"} font-[500] ml-6`}>
                                <button
                                    type="button"
                                    aria-expanded={open}
                                    onClick={() => setOpenSection(open ? null : section.title)}
                                    className="text-left flex dark:text-[#abc2d3] items-center gap-[5px]"
                                >
                                    {section.title}
                                    <MdOutlineKeyboardArrowRight aria-hidden className="text-[1.2rem]"/>
                                </button>

                                <ul className={`${open ? "flex" : "hidden"} pl-6 mt-3 font-[400] items-start flex-col gap-[10px] text-gray-600`}>
                                    {section.items.map((item) => (
                                        <li key={item.title}>
                                            <a
                                                href={item.href}
                                                onClick={() => setMobileSidebarOpen(false)}
                                                className="hover:text-[#3B9DF8] transition-all duration-500 cursor-pointer dark:text-[#abc2d3]"
                                            >
                                                {item.title}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        );
                    })}

                    {links.map((link) => (
                        <li key={link.label}>
                            <a
                                href={link.href}
                                onClick={() => setMobileSidebarOpen(false)}
                                className="hover:text-[#3B9DF8] dark:text-[#abc2d3] transition-all duration-500 cursor-pointer"
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
