import {useEffect, useRef, useState} from "react";
import type {ComponentType, ReactNode} from "react";
import {IoIosSearch} from "react-icons/io";
import {FaPlus} from "react-icons/fa6";

export interface SectionedSidebarLogo {
    /** Full logo shown while the sidebar is expanded. */
    src: string;
    /** Small mark shown while the sidebar is collapsed. */
    collapsedSrc: string;
    alt: string;
}

export interface SectionedSidebarItem {
    label: string;
    icon: ComponentType<{className?: string}>;
    /** Renders the row as a link. Without it the row is a button. */
    href?: string;
    /** Count shown at the end of the row, for example unread messages. */
    badge?: number | string;
    /** Accessible name for a plus button at the end of the row. The button only shows when this is set. */
    addLabel?: string;
}

export interface SectionedSidebarSection {
    title: string;
    items: SectionedSidebarItem[];
}

export interface SectionedSidebarProps {
    logo: SectionedSidebarLogo;
    sections: SectionedSidebarSection[];
    /** Controlled expanded state. Leave it out to let the sidebar manage its own state. */
    expanded?: boolean;
    defaultExpanded?: boolean;
    onExpandedChange?: (expanded: boolean) => void;
    /** Called when a row is clicked. */
    onSelect?: (item: SectionedSidebarItem) => void;
    /** Called when the plus button of a row is clicked. */
    onAdd?: (item: SectionedSidebarItem) => void;
    onSearchChange?: (query: string) => void;
    searchPlaceholder?: string;
    /** Accessible name of the search field, also used as the tooltip of the collapsed search button. */
    searchLabel?: string;
    expandLabel?: string;
    collapseLabel?: string;
    className?: string;
}

const tooltipClass =
    "absolute top-0 left-full ml-4 translate-x-[20px] opacity-0 z-[-1] group-hover:translate-x-0 group-hover:opacity-100 group-hover:z-[1] transition-all duration-500";
const tooltipTextClass =
    "block text-[0.9rem] w-max dark:bg-slate-800 dark:text-[#abc2d3] bg-gray-600 text-white rounded px-3 py-[5px]";

interface NavControlProps {
    item: SectionedSidebarItem;
    onSelect?: (item: SectionedSidebarItem) => void;
    className: string;
    children: ReactNode;
}

const NavControl = ({item, onSelect, className, children}: NavControlProps) =>
    item.href ? (
        <a href={item.href} className={className} onClick={() => onSelect?.(item)}>
            {children}
        </a>
    ) : (
        <button type="button" className={className} onClick={() => onSelect?.(item)}>
            {children}
        </button>
    );

/** A sidebar with titled sections, count badges and plus buttons. Click the logo to collapse it to an icon rail. */
export const SectionedSidebar = ({
    logo,
    sections,
    expanded: expandedProp,
    defaultExpanded = true,
    onExpandedChange,
    onSelect,
    onAdd,
    onSearchChange,
    searchPlaceholder = "Search...",
    searchLabel = "Search",
    expandLabel = "Expand sidebar",
    collapseLabel = "Collapse sidebar",
    className = "",
}: SectionedSidebarProps) => {
    const [innerExpanded, setInnerExpanded] = useState(defaultExpanded);
    const [query, setQuery] = useState("");
    const searchRef = useRef<HTMLInputElement>(null);
    const focusSearchOnExpand = useRef(false);
    const expanded = expandedProp ?? innerExpanded;

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

    return (
        <aside
            className={`${expanded ? "py-[20px] px-[30px]" : "py-[15px] px-[10px]"} bg-white shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] rounded-md transition-all duration-300 dark:bg-slate-900 ${className}`}
        >
            <button
                type="button"
                className={expanded ? "block" : "block mx-auto"}
                aria-label={expanded ? collapseLabel : expandLabel}
                aria-expanded={expanded}
                onClick={() => setExpanded(!expanded)}
            >
                {expanded ? (
                    <img src={logo.src} alt="" className="w-[130px] cursor-pointer"/>
                ) : (
                    <img src={logo.collapsedSrc} alt="" className="w-[50px] mx-auto cursor-pointer"/>
                )}
            </button>

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
                    <IoIosSearch
                        aria-hidden
                        className="absolute dark:text-slate-500 top-[9px] left-2 text-[1.5rem] text-[#adadad]"
                    />
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
                        className="text-[2rem] dark:text-slate-500 dark:hover:bg-slate-800 mx-auto text-gray-500 mt-2 p-[5px] rounded-md hover:bg-gray-100 cursor-pointer w-full"
                    />

                    {/* tooltip */}
                    <span className={tooltipClass}>
                        <span className={tooltipTextClass}>{searchLabel}</span>
                    </span>
                </button>
            )}

            {sections.map((section) => (
                <div key={section.title} className="mt-6">
                    <p className={`${expanded ? "text-[1rem]" : "text-[0.9rem] text-center"} dark:text-[#abc2d3] text-gray-500 font-[400]`}>
                        {section.title}
                    </p>

                    <div className="mt-3 flex flex-col gap-[5px]">
                        {section.items.map((item) => {
                            const Icon = item.icon;
                            return (
                                <div
                                    key={item.label}
                                    className={`${expanded ? "justify-between" : "justify-center"} flex items-center gap-[5px] w-full hover:bg-gray-50 p-[5px] dark:hover:bg-slate-800/50 rounded-md cursor-pointer transition-all duration-200 relative group`}
                                >
                                    <NavControl
                                        item={item}
                                        onSelect={onSelect}
                                        className={`${expanded ? "justify-between" : "justify-center"} flex flex-1 items-center text-left`}
                                    >
                                        <span className="flex items-center gap-[8px]">
                                            <Icon className="text-[1.3rem] dark:text-[#abc2d3] text-gray-800"/>
                                            <span className={`${expanded ? "inline" : "hidden"} text-[1.1rem] font-[400] text-gray-800 dark:text-[#abc2d3]`}>
                                                {item.label}
                                            </span>
                                        </span>
                                        {item.badge !== undefined && (
                                            <span className={`${expanded ? "inline" : "hidden"} py-[1px] px-[9px] bg-blue-100 text-blue-700 rounded-full dark:bg-blue-800/20`}>
                                                {item.badge}
                                            </span>
                                        )}

                                        {/* tooltip */}
                                        <span className={`${expanded ? "hidden" : "inline"} ${tooltipClass}`}>
                                            <span className={tooltipTextClass}>{item.label}</span>
                                        </span>
                                    </NavControl>

                                    {item.addLabel && (
                                        <button
                                            type="button"
                                            aria-label={item.addLabel}
                                            className={`${expanded ? "inline-flex" : "hidden"} rounded-full`}
                                            onClick={() => onAdd?.(item)}
                                        >
                                            <FaPlus
                                                aria-hidden
                                                className="p-[7px] dark:bg-blue-800/20 bg-blue-100 text-blue-700 rounded-full text-[1.6rem]"
                                            />
                                        </button>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            ))}
        </aside>
    );
};
