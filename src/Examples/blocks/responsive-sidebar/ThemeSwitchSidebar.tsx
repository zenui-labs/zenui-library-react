import {useEffect, useRef, useState} from "react";
import type {ComponentType, ReactNode} from "react";
import {BsThreeDotsVertical} from "react-icons/bs";
import {IoIosArrowDown, IoIosCode, IoIosSearch} from "react-icons/io";
import {IoMoonOutline, IoSunnyOutline} from "react-icons/io5";

export type SidebarTheme = "light" | "dark";

export interface ThemeSwitchSidebarLogo {
    /** Full logo shown while the sidebar is expanded. */
    src: string;
    /** Small mark shown while the sidebar is collapsed. */
    collapsedSrc: string;
    alt: string;
}

export interface ThemeSwitchSidebarLink {
    label: string;
    /** Renders the entry as a link. Without it the entry is a button. */
    href?: string;
}

export interface ThemeSwitchSidebarItem extends ThemeSwitchSidebarLink {
    icon: ComponentType<{className?: string}>;
    /** Sub links. The item becomes a dropdown that lists them. */
    children?: ThemeSwitchSidebarLink[];
    /** Whether the dropdown starts open. Defaults to true. */
    defaultOpen?: boolean;
}

export interface ThemeSwitchSidebarSection {
    title: string;
    items: ThemeSwitchSidebarItem[];
}

export interface ThemeSwitchSidebarProps {
    logo: ThemeSwitchSidebarLogo;
    sections: ThemeSwitchSidebarSection[];
    /** Controlled expanded state. Leave it out to let the sidebar manage its own state. */
    expanded?: boolean;
    defaultExpanded?: boolean;
    onExpandedChange?: (expanded: boolean) => void;
    /** Controlled theme. The sidebar only reports the choice; apply it to your page in `onThemeChange`. */
    theme?: SidebarTheme;
    defaultTheme?: SidebarTheme;
    onThemeChange?: (theme: SidebarTheme) => void;
    /** Called when an item or sub link is clicked. */
    onSelect?: (link: ThemeSwitchSidebarLink) => void;
    onSearchChange?: (query: string) => void;
    /** Called by the options button next to the logo. */
    onMoreClick?: () => void;
    searchPlaceholder?: string;
    /** Accessible name of the search field, also used as the tooltip of the collapsed search button. */
    searchLabel?: string;
    expandLabel?: string;
    collapseLabel?: string;
    moreLabel?: string;
    lightLabel?: string;
    darkLabel?: string;
    /** Accessible name of the compact theme switch shown while collapsed. */
    darkModeLabel?: string;
    className?: string;
}

const tooltipClass =
    "absolute top-0 left-full ml-4 translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500";
const tooltipTextClass =
    "block text-[0.9rem] w-max dark:bg-slate-800 dark:text-[#abc2d3] bg-gray-600 text-white rounded px-3 py-[5px]";

interface NavControlProps {
    link: ThemeSwitchSidebarLink;
    onSelect?: (link: ThemeSwitchSidebarLink) => void;
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

/** A sidebar with an edge toggle, titled sections, dropdown items and a light and dark switch in the footer. */
export const ThemeSwitchSidebar = ({
    logo,
    sections,
    expanded: expandedProp,
    defaultExpanded = true,
    onExpandedChange,
    theme: themeProp,
    defaultTheme = "light",
    onThemeChange,
    onSelect,
    onSearchChange,
    onMoreClick,
    searchPlaceholder = "Search...",
    searchLabel = "Search",
    expandLabel = "Expand sidebar",
    collapseLabel = "Collapse sidebar",
    moreLabel = "More options",
    lightLabel = "Light",
    darkLabel = "Dark",
    darkModeLabel = "Dark mode",
    className = "",
}: ThemeSwitchSidebarProps) => {
    const [innerExpanded, setInnerExpanded] = useState(defaultExpanded);
    const [innerTheme, setInnerTheme] = useState<SidebarTheme>(defaultTheme);
    const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
    const [query, setQuery] = useState("");
    const searchRef = useRef<HTMLInputElement>(null);
    const focusSearchOnExpand = useRef(false);
    const expanded = expandedProp ?? innerExpanded;
    const isDark = (themeProp ?? innerTheme) === "dark";
    const padding = expanded ? "px-[20px]" : "px-[10px]";

    const setExpanded = (next: boolean) => {
        if (expandedProp === undefined) setInnerExpanded(next);
        onExpandedChange?.(next);
    };

    const setTheme = (next: SidebarTheme) => {
        if (themeProp === undefined) setInnerTheme(next);
        onThemeChange?.(next);
    };

    // The collapsed search button expands the sidebar, then moves focus into the search field.
    useEffect(() => {
        if (expanded && focusSearchOnExpand.current) {
            focusSearchOnExpand.current = false;
            searchRef.current?.focus();
        }
    }, [expanded]);

    const renderItem = (item: ThemeSwitchSidebarItem) => {
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
                    className={`${expanded ? "justify-center" : ""} ${open ? "bg-gray-50 dark:bg-slate-800" : ""} dark:hover:bg-slate-800/50 flex w-full hover:bg-gray-50 p-[5px] rounded-md cursor-pointer transition-all duration-200 relative group flex-col`}
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

                    {/* hover dropdown while collapsed, also opened by keyboard focus */}
                    {!expanded && (
                        <ul className="translate-y-[20px] opacity-0 z-[-1] group-hover:translate-y-0 group-hover:opacity-100 group-hover:z-30 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-focus-within:z-30 absolute top-0 left-[70px] bg-white shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] transition-all duration-300 dark:bg-slate-900 dark:text-[#abc2d3] p-[8px] rounded-md flex flex-col gap-[3px] text-[1rem] text-gray-500">
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
                    className={`${open ? "h-auto my-3 opacity-100 z-[1]" : "opacity-0 z-[-1] h-0 invisible"} ${expanded ? "flex" : "hidden"} dark:text-[#abc2d3] transition-all duration-300 list-none ml-[20px] pl-[10px] border-l dark:border-slate-700 border-gray-300 flex-col gap-[3px] text-[1rem] text-gray-500`}
                >
                    {item.children.map((child) => (
                        <li key={child.label}>
                            <NavControl
                                link={child}
                                onSelect={onSelect}
                                className="block w-full text-left hover:bg-gray-50 dark:hover:bg-slate-800/50 cursor-pointer px-[10px] py-[5px] rounded-md"
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
        <aside
            className={`bg-white shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] dark:bg-slate-900 rounded-md transition-all duration-300 relative ${className}`}
        >
            <div className={`mt-5 ${padding} transition-all duration-300 ease-in-out`}>
                {expanded ? (
                    <div className="flex items-center justify-between">
                        <img src={logo.src} alt={logo.alt} className="w-[130px]"/>
                        <button type="button" aria-label={moreLabel} className="block" onClick={onMoreClick}>
                            <BsThreeDotsVertical
                                aria-hidden
                                className="text-[1.9rem] dark:text-[#abc2d3] dark:hover:bg-slate-800/50 text-gray-500 cursor-pointer p-[5px] rounded-md hover:bg-gray-50"
                            />
                        </button>
                    </div>
                ) : (
                    <img src={logo.collapsedSrc} alt={logo.alt} className="w-[50px] mx-auto"/>
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

            {/* collapse button */}
            <button
                type="button"
                aria-label={expanded ? collapseLabel : expandLabel}
                aria-expanded={expanded}
                className="bg-gray-200 dark:bg-slate-800 dark:shadow-slate-800 p-[5px] rounded-md w-max absolute top-[50px] right-[-20px] cursor-pointer"
                onClick={() => setExpanded(!expanded)}
            >
                <IoIosCode aria-hidden className="text-[1.5rem] dark:text-[#abc2d3] text-gray-500"/>
            </button>

            {sections.map((section, index) => (
                <div key={section.title} className={`${index === 0 ? "mt-6" : "mt-4"} ${padding} transition-all duration-300 ease-in-out`}>
                    <p className={`${expanded ? "text-start" : "text-center"} dark:text-[#abc2d3] text-[0.9rem] text-gray-500`}>
                        {section.title}
                    </p>

                    <div className="mt-3 flex flex-col gap-[5px]">{section.items.map(renderItem)}</div>
                </div>
            ))}

            {/* light & dark mode section */}
            <div
                className={`${expanded ? "justify-between px-[20px]" : "justify-center px-[10px]"} bg-gray-50 py-3 flex items-center mt-10 dark:bg-slate-800 rounded-b-md`}
            >
                <div
                    className={`${expanded ? "flex" : "hidden"} items-center dark:bg-slate-900 bg-gray-200 sm:p-[10px] rounded-md w-full justify-between relative`}
                >
                    <div
                        aria-hidden
                        className={`${isDark ? "w-[50%] translate-x-[94%]" : "w-[50%] translate-x-0"} transition-all duration-300 absolute top-[50%] dark:bg-slate-800/70 transform translate-y-[-50%] left-[4px] bg-white rounded-md h-[85%] w-[100px] z-10`}
                    ></div>
                    <button
                        type="button"
                        aria-pressed={!isDark}
                        className="px-[22px] py-[14px] sm:py-[3px] dark:text-[#abc2d3] rounded-md flex items-center gap-[10px] text-[1rem] text-gray-500 z-20"
                        onClick={() => setTheme("light")}
                    >
                        <IoSunnyOutline aria-hidden className="text-[1.2rem]"/>
                        {lightLabel}
                    </button>
                    <button
                        type="button"
                        aria-pressed={isDark}
                        className="px-[25px] py-[14px] sm:py-[3px] dark:text-[#abc2d3] rounded-md flex items-center gap-[10px] text-[1rem] text-gray-500 z-20"
                        onClick={() => setTheme("dark")}
                    >
                        <IoMoonOutline aria-hidden className="text-[1.2rem]"/>
                        {darkLabel}
                    </button>
                </div>

                {/* light & dark mode switch */}
                <button
                    type="button"
                    role="switch"
                    aria-checked={isDark}
                    aria-label={darkModeLabel}
                    className={`${expanded ? "hidden" : "flex"} bg-gray-200 dark:bg-slate-900 w-full rounded-full items-center p-[3px] cursor-pointer`}
                    onClick={() => setTheme(isDark ? "light" : "dark")}
                >
                    <span className={`${isDark ? "translate-x-[21px]" : "translate-x-0"} block transition-all duration-300`}>
                        {isDark ? (
                            <IoMoonOutline
                                aria-hidden
                                className="text-[1.6rem] cursor-pointer dark:bg-slate-800/70 dark:text-[#abc2d3] bg-white rounded-full p-[5px]"
                            />
                        ) : (
                            <IoSunnyOutline
                                aria-hidden
                                className="text-[1.6rem] cursor-pointer dark:bg-slate-800/70 dark:text-[#abc2d3] bg-white rounded-full p-[5px]"
                            />
                        )}
                    </span>
                </button>
            </div>
        </aside>
    );
};
