import {useEffect, useRef, useState} from "react";
import type {ComponentType, ReactNode} from "react";
import {GoSidebarCollapse} from "react-icons/go";
import {IoIosArrowDown, IoIosSearch} from "react-icons/io";
import {CiLogout} from "react-icons/ci";
import {BsThreeDots} from "react-icons/bs";
import {RiAccountCircleLine} from "react-icons/ri";

export interface ProfileSidebarLogo {
    /** Full logo shown while the sidebar is expanded. */
    src: string;
    /** Small mark shown while the sidebar is collapsed. */
    collapsedSrc: string;
    alt: string;
}

export interface ProfileSidebarLink {
    label: string;
    /** Renders the entry as a link. Without it the entry is a button. */
    href?: string;
}

export interface ProfileSidebarItem extends ProfileSidebarLink {
    icon: ComponentType<{className?: string}>;
    /** Sub links. The item becomes a dropdown that lists them. */
    children?: ProfileSidebarLink[];
    /** Whether the dropdown starts open. Defaults to true. */
    defaultOpen?: boolean;
}

export interface ProfileSidebarUser {
    name: string;
    avatarSrc: string;
}

export interface ProfileSidebarProps {
    logo: ProfileSidebarLogo;
    items: ProfileSidebarItem[];
    /** Items shown below a divider, for example notifications and settings. */
    secondaryItems?: ProfileSidebarItem[];
    user: ProfileSidebarUser;
    /** Controlled expanded state. Leave it out to let the sidebar manage its own state. */
    expanded?: boolean;
    defaultExpanded?: boolean;
    onExpandedChange?: (expanded: boolean) => void;
    /** Called when an item or sub link is clicked. */
    onSelect?: (link: ProfileSidebarLink) => void;
    onSearchChange?: (query: string) => void;
    onProfileClick?: () => void;
    onLogout?: () => void;
    searchPlaceholder?: string;
    /** Accessible name of the search field, also used as the tooltip of the collapsed search button. */
    searchLabel?: string;
    expandLabel?: string;
    collapseLabel?: string;
    accountMenuLabel?: string;
    profileLabel?: string;
    logoutLabel?: string;
    className?: string;
}

const tooltipClass =
    "absolute top-0 left-full ml-4 translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500";
const tooltipTextClass =
    "block text-[0.9rem] w-max dark:bg-slate-800 dark:text-[#abc2d3] bg-gray-600 text-white rounded px-3 py-[5px]";
// Hover menus also open while one of their entries has keyboard focus.
const hoverMenuClass =
    "translate-y-[20px] opacity-0 z-[-1] group-hover:translate-y-0 group-hover:opacity-100 group-hover:z-30 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-focus-within:z-30 absolute top-0 bg-white shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] transition-all duration-300 p-[8px] rounded-md flex flex-col gap-[3px]";

interface NavControlProps {
    link: ProfileSidebarLink;
    onSelect?: (link: ProfileSidebarLink) => void;
    className: string;
    children: ReactNode;
}

const NavControl = ({link, onSelect, className, children}: NavControlProps) =>
    link.href ? (
        <a href={link.href} className={className} onClick={() => onSelect?.(link)}>
            {children}
        </a>
    ) : (
        <button type="button" className={className} onClick={() => onSelect?.(link)}>
            {children}
        </button>
    );

/** A sidebar with a collapse button, dropdown items and a profile footer with an account menu. */
export const ProfileSidebar = ({
    logo,
    items,
    secondaryItems = [],
    user,
    expanded: expandedProp,
    defaultExpanded = true,
    onExpandedChange,
    onSelect,
    onSearchChange,
    onProfileClick,
    onLogout,
    searchPlaceholder = "Search...",
    searchLabel = "Search",
    expandLabel = "Expand sidebar",
    collapseLabel = "Collapse",
    accountMenuLabel = "Account options",
    profileLabel = "Profile",
    logoutLabel = "Logout",
    className = "",
}: ProfileSidebarProps) => {
    const [innerExpanded, setInnerExpanded] = useState(defaultExpanded);
    const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
    const [query, setQuery] = useState("");
    const searchRef = useRef<HTMLInputElement>(null);
    const focusSearchOnExpand = useRef(false);
    const expanded = expandedProp ?? innerExpanded;
    const padding = expanded ? "px-[20px]" : "px-[10px]";

    const setExpanded = (next: boolean) => {
        if (expandedProp === undefined) setInnerExpanded(next);
        onExpandedChange?.(next);
    };

    // The collapsed search button expands the sidebar, then moves focus into the search field.
    useEffect(() => {
        if (expanded && focusSearchOnExpand.current) {
            focusSearchOnExpand.current = false;
            searchRef.current?.focus();
        }
    }, [expanded]);

    const renderItem = (item: ProfileSidebarItem) => {
        const Icon = item.icon;
        const label = (
            <span className="flex items-center gap-[8px]">
                <Icon className="text-[1.3rem] dark:text-[#abc2d3] text-gray-500"/>
                <span className={`${expanded ? "inline" : "hidden"} text-[1rem] font-[400] text-gray-500 dark:text-[#abc2d3]`}>
                    {item.label}
                </span>
            </span>
        );

        if (!item.children) {
            return (
                <NavControl
                    key={item.label}
                    link={item}
                    onSelect={onSelect}
                    className={`${expanded ? "justify-between" : "justify-center"} flex items-center w-full text-left hover:bg-gray-50 p-[5px] dark:hover:bg-slate-800/50 rounded-md cursor-pointer transition-all duration-200 relative group`}
                >
                    {label}

                    {/* tooltip */}
                    <span className={`${expanded ? "hidden" : "inline"} ${tooltipClass}`}>
                        <span className={tooltipTextClass}>{item.label}</span>
                    </span>
                </NavControl>
            );
        }

        const open = openGroups[item.label] ?? item.defaultOpen ?? true;

        return (
            <div key={item.label} className="flex flex-col gap-[5px]">
                <div
                    className={`${expanded ? "justify-center" : ""} ${open ? "bg-gray-50 dark:bg-slate-800" : ""} flex w-full hover:bg-gray-50 p-[5px] dark:hover:bg-slate-800/50 rounded-md cursor-pointer transition-all duration-200 relative group flex-col`}
                >
                    <button
                        type="button"
                        aria-label={item.label}
                        aria-expanded={expanded ? open : undefined}
                        className={`${expanded ? "justify-between" : "justify-center"} flex items-center gap-[8px] w-full`}
                        onClick={() => setOpenGroups((current) => ({...current, [item.label]: !open}))}
                    >
                        {label}
                        <IoIosArrowDown
                            aria-hidden
                            className={`${open ? "rotate-[180deg]" : "rotate-0"} ${expanded ? "inline" : "hidden"} transition-all duration-300 text-[1rem] text-gray-500`}
                        />
                    </button>

                    {/* hover dropdown while collapsed */}
                    {!expanded && (
                        <ul className={`${hoverMenuClass} left-[70px] dark:bg-slate-900 dark:text-[#abc2d3] text-[1rem] text-gray-500`}>
                            {item.children.map((child) => (
                                <li key={child.label}>
                                    <NavControl
                                        link={child}
                                        onSelect={onSelect}
                                        className="block w-full text-left whitespace-nowrap hover:bg-gray-50 dark:hover:bg-slate-800/50 px-[20px] py-[5px] rounded-md"
                                    >
                                        {child.label}
                                    </NavControl>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* open dropdown while expanded */}
                <ul
                    className={`${open ? "h-auto my-3 opacity-100 z-[1]" : "opacity-0 z-[-1] h-0 invisible"} ${expanded ? "flex" : "hidden"} transition-all duration-300 list-disc marker:text-blue-400 ml-[35px] flex-col gap-[3px] text-[1rem] dark:text-[#abc2d3] text-gray-500`}
                >
                    {item.children.map((child) => (
                        <li key={child.label}>
                            <NavControl
                                link={child}
                                onSelect={onSelect}
                                className="block w-full text-left hover:bg-gray-50 dark:hover:bg-slate-800/50 px-[10px] py-[5px] rounded-md"
                            >
                                {child.label}
                            </NavControl>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    return (
        <aside className={`bg-white shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] dark:bg-slate-900 rounded-md transition-all duration-300 ${className}`}>
            <div className={`mt-5 ${padding} transition-all duration-300 ease-in-out`}>
                {expanded ? (
                    <div className="flex items-center justify-between">
                        <img src={logo.src} alt={logo.alt} className="w-[130px]"/>
                        <div className="relative group">
                            <button type="button" className="block" aria-expanded onClick={() => setExpanded(false)}>
                                <GoSidebarCollapse aria-hidden className="text-[1.5rem] dark:text-[#abc2d3] text-gray-600 cursor-pointer"/>

                                {/* tooltip */}
                                <span className="absolute -top-1 left-full ml-8 translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500">
                                    <span className={tooltipTextClass}>{collapseLabel}</span>
                                </span>
                            </button>
                        </div>
                    </div>
                ) : (
                    <button
                        type="button"
                        className="block mx-auto"
                        aria-label={expandLabel}
                        aria-expanded={false}
                        onClick={() => setExpanded(true)}
                    >
                        <img src={logo.collapsedSrc} alt="" className="w-[50px] mx-auto cursor-pointer"/>
                    </button>
                )}

                {/* search bar */}
                {expanded ? (
                    <div className="relative mt-5">
                        <input
                            ref={searchRef}
                            value={query}
                            onChange={(event) => {
                                setQuery(event.target.value);
                                onSearchChange?.(event.target.value);
                            }}
                            aria-label={searchLabel}
                            className="px-4 py-2 dark:border-slate-700 dark:bg-transparent dark:text-[#abc2d3] dark:placeholder:text-slate-500 border border-[#e5eaf2] rounded-md w-full pl-[40px] outline-none focus:border-[#3B9DF8]"
                            placeholder={searchPlaceholder}
                        />
                        <IoIosSearch aria-hidden className="absolute top-[9px] left-2 text-[1.5rem] text-[#adadad]"/>
                    </div>
                ) : (
                    <button
                        type="button"
                        className="block w-full relative group"
                        onClick={() => {
                            focusSearchOnExpand.current = true;
                            setExpanded(true);
                        }}
                    >
                        <IoIosSearch
                            aria-hidden
                            className="text-[2rem] dark:hover:bg-slate-800/50 dark:text-[#abc2d3] mx-auto text-gray-500 mt-2 p-[5px] rounded-md hover:bg-gray-100 cursor-pointer w-full"
                        />

                        {/* tooltip */}
                        <span className={tooltipClass}>
                            <span className={tooltipTextClass}>{searchLabel}</span>
                        </span>
                    </button>
                )}
            </div>

            {/* main items */}
            <div className={`mt-6 ${padding} transition-all duration-300 ease-in-out`}>
                <div className="mt-3 flex flex-col gap-[5px]">{items.map(renderItem)}</div>
            </div>

            {/* secondary items */}
            {secondaryItems.length > 0 && (
                <div className={`${padding} mt-6 dark:border-slate-700 border-t border-gray-200 transition-all duration-300 ease-in-out`}>
                    <div className="mt-3 flex flex-col gap-[5px]">{secondaryItems.map(renderItem)}</div>
                </div>
            )}

            {/* profile section */}
            <div
                className={`${expanded ? "justify-between" : "justify-center"} bg-gray-100 py-3 px-[20px] flex items-center mt-10 dark:bg-slate-800 rounded-b-md`}
            >
                <div className="flex items-center gap-[10px]">
                    <img
                        src={user.avatarSrc}
                        alt={expanded ? "" : user.name}
                        className="w-[30px] h-[30px] rounded-full object-cover"
                    />
                    <p className={`${expanded ? "inline" : "hidden"} dark:text-[#abc2d3] text-[0.9rem] text-gray-800 font-[500]`}>
                        {user.name}
                    </p>
                </div>

                <div className={`${expanded ? "inline" : "hidden"} relative group`}>
                    <button type="button" aria-label={accountMenuLabel} className="block">
                        <BsThreeDots aria-hidden className="text-[1.2rem] dark:text-[#abc2d3] text-gray-500 cursor-pointer"/>
                    </button>

                    <ul className={`${hoverMenuClass} left-[30px] dark:bg-slate-900`}>
                        <li>
                            <button
                                type="button"
                                className="flex w-full items-center whitespace-nowrap dark:text-[#abc2d3] dark:hover:bg-slate-800/50 gap-[7px] text-[0.9rem] text-gray-600 hover:bg-gray-50 px-[8px] py-[4px] rounded-md cursor-pointer"
                                onClick={onProfileClick}
                            >
                                <RiAccountCircleLine aria-hidden/>
                                {profileLabel}
                            </button>
                        </li>
                        <li>
                            <button
                                type="button"
                                className="flex w-full items-center whitespace-nowrap dark:text-[#abc2d3] dark:hover:bg-slate-800/50 gap-[7px] text-[0.9rem] text-red-500 hover:bg-gray-50 px-[8px] py-[4px] rounded-md cursor-pointer"
                                onClick={onLogout}
                            >
                                <CiLogout aria-hidden/>
                                {logoutLabel}
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </aside>
    );
};
