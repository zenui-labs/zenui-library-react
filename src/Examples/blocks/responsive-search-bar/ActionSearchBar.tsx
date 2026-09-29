import {useEffect, useId, useRef, useState} from "react";
import type {ChangeEvent, ComponentType, KeyboardEvent} from "react";
import {IoIosSearch} from "react-icons/io";
import {RxCross2} from "react-icons/rx";
import {FaPlus} from "react-icons/fa6";
import {BsThreeDotsVertical} from "react-icons/bs";

type Icon = ComponentType<{className?: string}>;

export interface RecentSearch {
    id: string | number;
    title: string;
    /** Short type label shown next to the title, for example "Article". */
    tag: string;
    icon: Icon;
    /** Background and text color classes for the round icon, for example "bg-red-100 text-red-500". */
    iconClassName?: string;
}

export interface QuickAction {
    label: string;
    icon: Icon;
}

export interface ActionSearchBarProps {
    /** Filters shown as removable chips under "Searching for". */
    filters: string[];
    recents: RecentSearch[];
    /** Shortcuts in the gray bar at the bottom of the panel. */
    actions: QuickAction[];
    /** Search text when controlled. */
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    onRemoveFilter?: (filter: string) => void;
    onAddFilter?: () => void;
    onRecentSelect?: (recent: RecentSearch) => void;
    /** Called by the three dot button on a recent search. */
    onRecentMenu?: (recent: RecentSearch) => void;
    onAction?: (action: QuickAction) => void;
    /** Shows the panel when the component first renders. */
    defaultOpen?: boolean;
    placeholder?: string;
    /** Label read by screen readers for the search field. */
    inputLabel?: string;
    filtersTitle?: string;
    addFilterLabel?: string;
    recentTitle?: string;
    className?: string;
}

const chipClassName =
    "py-[5px] px-[10px] rounded-full border border-gray-300 text-gray-500 text-[0.7rem] dark:border-slate-700 dark:text-[#abc2d3] dark:hover:bg-slate-800/50 flex items-center gap-[5px] hover:bg-gray-50";

const actionIconClassName =
    "p-[5px] dark:bg-slate-900 dark:border-slate-700 dark:text-[#abc2d3] text-[2rem] text-gray-500 rounded-full border border-gray-300 bg-white";

/** A search field that opens a panel with active filters, recent searches and quick actions. */
export const ActionSearchBar = ({
    filters,
    recents,
    actions,
    value,
    defaultValue = "",
    onChange,
    onRemoveFilter,
    onAddFilter,
    onRecentSelect,
    onRecentMenu,
    onAction,
    defaultOpen = false,
    placeholder = "Search...",
    inputLabel = "Search",
    filtersTitle = "Searching for",
    addFilterLabel = "Add new",
    recentTitle = "Recent",
    className = "",
}: ActionSearchBarProps) => {
    const panelId = useId();
    const rootRef = useRef<HTMLDivElement>(null);
    const [innerValue, setInnerValue] = useState(defaultValue);
    const [open, setOpen] = useState(defaultOpen);
    const query = value ?? innerValue;

    // Closes the panel when a click lands outside this search bar.
    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
        };
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, []);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (value === undefined) setInnerValue(event.target.value);
        onChange?.(event.target.value);
        setOpen(true);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Escape") setOpen(false);
    };

    return (
        <div ref={rootRef} className={`relative w-full sm:w-[80%] ${className}`}>
            <input
                type="text"
                value={query}
                onChange={handleChange}
                onClick={() => setOpen(true)}
                onFocus={() => setOpen(true)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                aria-label={inputLabel}
                aria-expanded={open}
                aria-controls={panelId}
                className="px-4 py-2 border dark:border-slate-700 dark:bg-slate-900 dark:text-[#abc2d3] dark:placeholder:text-slate-500 border-[#e5eaf2] rounded-md w-full pl-[40px] outline-none focus:border-[#3B9DF8]"
            />
            <IoIosSearch className="absolute dark:text-slate-500 top-[9px] left-2 text-[1.5rem] text-[#adadad]" aria-hidden/>

            <div
                id={panelId}
                aria-hidden={!open}
                className={`${open ? "opacity-100 h-auto translate-y-0 mt-2" : "translate-y-[-10px] opacity-0 h-0 invisible"} bg-white shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] w-full transition-all duration-500 dark:bg-slate-900 overflow-hidden flex flex-col rounded-md`}
            >
                <div className="p-4">
                    <p className="text-[0.9rem] dark:text-[#abc2d3] text-gray-500">{filtersTitle}</p>
                    <div className="flex items-center gap-[10px] flex-wrap mt-2">
                        {filters.map((filter) => (
                            <span key={filter} className={chipClassName}>
                                {filter}
                                <button
                                    type="button"
                                    onClick={() => onRemoveFilter?.(filter)}
                                    aria-label={`Remove ${filter}`}
                                    className="cursor-pointer hover:text-red-500"
                                >
                                    <RxCross2 aria-hidden/>
                                </button>
                            </span>
                        ))}
                        <button type="button" onClick={onAddFilter} className={`${chipClassName} cursor-pointer group`}>
                            {addFilterLabel}
                            <FaPlus className="group-hover:text-green-500" aria-hidden/>
                        </button>
                    </div>

                    <div className="border-t dark:border-slate-700 border-gray-200 mt-5 pt-[15px]">
                        <p className="text-[0.9rem] dark:text-[#abc2d3] text-gray-500">{recentTitle}</p>

                        <ul className="mt-4">
                            {recents.map((recent) => {
                                const RecentIcon = recent.icon;
                                return (
                                    <li
                                        key={recent.id}
                                        className="flex items-center justify-between w-full hover:bg-gray-50 dark:hover:bg-slate-800/50 p-[8px] rounded-md"
                                    >
                                        <button
                                            type="button"
                                            onClick={() => onRecentSelect?.(recent)}
                                            className="flex items-center gap-[10px] text-left cursor-pointer"
                                        >
                                            <span className={`${recent.iconClassName ?? "bg-gray-100 text-gray-500"} rounded-full p-[13px] text-[1rem]`} aria-hidden>
                                                <RecentIcon/>
                                            </span>
                                            <span className="text-[0.9rem] sm:text-[1rem] dark:text-[#abc2d3]">{recent.title}</span>
                                            <span className="py-[2px] px-[10px] rounded-full border border-gray-300 dark:text-[#abc2d3] dark:border-slate-700 text-gray-500 text-[0.6rem] flex items-center gap-[5px]">
                                                {recent.tag}
                                            </span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => onRecentMenu?.(recent)}
                                            aria-label={`More options for ${recent.title}`}
                                            className="text-gray-500 text-[1.7rem] cursor-pointer dark:text-[#abc2d3] p-[5px] hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full"
                                        >
                                            <BsThreeDotsVertical className="block" aria-hidden/>
                                        </button>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>

                <div className="p-[10px] bg-gray-100 dark:bg-slate-800 flex items-center gap-[15px] flex-wrap">
                    {actions.map((action) => {
                        const ActionIcon = action.icon;
                        return (
                            <button
                                key={action.label}
                                type="button"
                                onClick={() => onAction?.(action)}
                                className="flex items-center gap-[10px] cursor-pointer"
                            >
                                <span aria-hidden className="flex">
                                    <ActionIcon className={actionIconClassName}/>
                                </span>
                                <span className="text-[1rem] dark:text-[#abc2d3] text-gray-700">{action.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
