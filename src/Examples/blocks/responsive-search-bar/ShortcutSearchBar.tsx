import {useEffect, useId, useRef, useState} from "react";
import type {ChangeEvent, KeyboardEvent as ReactKeyboardEvent} from "react";
import {IoIosSearch} from "react-icons/io";
import {RxCross2} from "react-icons/rx";
import {MdOutlineEmail} from "react-icons/md";
import {FaRegFile} from "react-icons/fa";
import {PiBuildings} from "react-icons/pi";

export interface SearchPerson {
    name: string;
    email: string;
    avatar: string;
    emailCount: number;
    /** Shared files. The badge is hidden when this is missing or zero. */
    fileCount?: number;
}

export interface SearchPlace {
    street: string;
    /** City and state, for example "Austin, TX". */
    location: string;
}

export interface ShortcutSearchBarProps {
    /** Earlier searches shown as removable chips. */
    recentSearches: string[];
    people: SearchPerson[];
    places: SearchPlace[];
    /** Search text when controlled. */
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    onRemoveRecent?: (search: string) => void;
    onPersonSelect?: (person: SearchPerson) => void;
    onPlaceSelect?: (place: SearchPlace) => void;
    /** Letter that opens the panel together with Ctrl. */
    shortcutKey?: string;
    /** Hint shown inside the field. */
    shortcutLabel?: string;
    /** Shows the panel when the component first renders. */
    defaultOpen?: boolean;
    placeholder?: string;
    /** Label read by screen readers for the search field. */
    inputLabel?: string;
    recentTitle?: string;
    peopleTitle?: string;
    placesTitle?: string;
    className?: string;
}

const chipClassName =
    "py-[5px] px-[10px] dark:border-slate-700 dark:text-[#abc2d3] dark:hover:bg-slate-800/50 rounded-full border border-gray-300 text-gray-500 text-[0.7rem] flex items-center gap-[5px] hover:bg-gray-50";

const badgeClassName =
    "flex items-center gap-[5px] rounded-full dark:bg-slate-800 dark:border-slate-700 dark:text-[#abc2d3] bg-white border py-[2px] px-2 border-gray-200 text-[0.8rem] text-gray-500";

/** A search field that opens with Ctrl and a letter and shows recent searches, people and places. */
export const ShortcutSearchBar = ({
    recentSearches,
    people,
    places,
    value,
    defaultValue = "",
    onChange,
    onRemoveRecent,
    onPersonSelect,
    onPlaceSelect,
    shortcutKey = "e",
    shortcutLabel = "Ctrl + E",
    defaultOpen = false,
    placeholder = "Search...",
    inputLabel = "Search",
    recentTitle = "Last search",
    peopleTitle = "People",
    placesTitle = "Listing",
    className = "",
}: ShortcutSearchBarProps) => {
    const panelId = useId();
    const rootRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [innerValue, setInnerValue] = useState(defaultValue);
    const [open, setOpen] = useState(defaultOpen);
    const query = value ?? innerValue;

    // Opens the panel and focuses the field on Ctrl + the shortcut key.
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.key.toLowerCase() === shortcutKey.toLowerCase()) {
                // Stops the browser from focusing its own search bar.
                event.preventDefault();
                setOpen(true);
                inputRef.current?.focus();
            }
        };
        window.addEventListener("keydown", handleKeyDown, {capture: true});
        return () => window.removeEventListener("keydown", handleKeyDown, {capture: true});
    }, [shortcutKey]);

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

    const handleKeyDown = (event: ReactKeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Escape") setOpen(false);
    };

    return (
        <div ref={rootRef} className={`relative w-full sm:w-[80%] ${className}`}>
            <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={handleChange}
                onClick={() => setOpen(true)}
                onFocus={() => setOpen(true)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                aria-label={inputLabel}
                aria-keyshortcuts={`Control+${shortcutKey.toUpperCase()}`}
                aria-expanded={open}
                aria-controls={panelId}
                className="px-4 py-2 border dark:border-slate-700 dark:bg-slate-900 dark:text-[#abc2d3] dark:placeholder:text-slate-500 border-[#e5eaf2] rounded-md w-full pl-[40px] pr-[80px] outline-none focus:border-[#3B9DF8]"
            />
            <IoIosSearch className="absolute dark:text-slate-500 top-[9px] left-2 text-[1.5rem] text-[#adadad]" aria-hidden/>

            <kbd className="absolute top-[5px] dark:border-slate-700 dark:bg-slate-800 right-1.5 text-[0.6rem] font-bold font-sans border border-gray-100 p-[8px] rounded-md text-gray-500">
                {shortcutLabel}
            </kbd>

            <div
                id={panelId}
                aria-hidden={!open}
                className={`${open ? "opacity-100 h-auto translate-y-0 mt-2" : "translate-y-[-10px] opacity-0 h-0 invisible"} bg-white border border-gray-200 w-full dark:bg-slate-900 dark:border-slate-700 transition-all duration-500 overflow-hidden flex flex-col rounded-md`}
            >
                <div className="p-4">
                    <p className="text-[0.9rem] dark:text-[#abc2d3] text-gray-500">{recentTitle}</p>
                    <div className="flex items-center gap-[10px] flex-wrap mt-2">
                        {recentSearches.map((search) => (
                            <span key={search} className={chipClassName}>
                                {search}
                                <button
                                    type="button"
                                    onClick={() => onRemoveRecent?.(search)}
                                    aria-label={`Remove ${search}`}
                                    className="cursor-pointer hover:text-red-500"
                                >
                                    <RxCross2 aria-hidden/>
                                </button>
                            </span>
                        ))}
                    </div>

                    <div className="border-t dark:border-slate-700 border-gray-200 mt-5 pt-[15px]">
                        <p className="text-[0.9rem] dark:text-[#abc2d3] text-gray-500">
                            {peopleTitle} <span className="text-[0.8rem] dark:text-slate-400 text-gray-400">({people.length})</span>
                        </p>

                        <ul className="mt-4 h-[300px] overflow-y-auto">
                            {people.map((person) => (
                                <li key={person.email}>
                                    <button
                                        type="button"
                                        onClick={() => onPersonSelect?.(person)}
                                        className="flex flex-wrap gap-[10px] items-center justify-between w-full text-left hover:bg-gray-100 p-[10px] cursor-pointer dark:hover:bg-slate-800/50 rounded-md group"
                                    >
                                        <span className="flex items-center gap-[15px]">
                                            <img src={person.avatar} alt="" className="w-[50px] h-[50px] rounded-full object-cover"/>
                                            <span>
                                                <span className="block text-[1.1rem] font-[500] text-gray-800 dark:text-[#abc2d3]">{person.name}</span>
                                                <span className="block text-[0.8rem] break-all text-gray-500 dark:text-slate-400">{person.email}</span>
                                            </span>
                                        </span>

                                        <span className="flex items-center gap-[10px] z-[-1] opacity-0 group-hover:opacity-100 group-hover:z-[1] group-focus-visible:opacity-100 group-focus-visible:z-[1] transition-all duration-300">
                                            <span className={badgeClassName}>
                                                <MdOutlineEmail className="text-[1rem]" aria-hidden/>
                                                {person.emailCount}
                                                <span className="sr-only">emails</span>
                                            </span>
                                            {person.fileCount ? (
                                                <span className={badgeClassName}>
                                                    <FaRegFile className="text-[0.9rem]" aria-hidden/>
                                                    {person.fileCount}
                                                    <span className="sr-only">files</span>
                                                </span>
                                            ) : null}
                                        </span>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="border-t dark:border-slate-700 border-gray-200 mt-3 pt-[15px] p-[20px]">
                    <p className="text-[0.9rem] dark:text-[#abc2d3] text-gray-500">
                        {placesTitle} <span className="text-[0.8rem] dark:text-slate-400 text-gray-400">({places.length})</span>
                    </p>

                    <ul className="mt-4 h-[200px] overflow-y-auto">
                        {places.map((place) => (
                            <li key={`${place.street}-${place.location}`}>
                                <button
                                    type="button"
                                    onClick={() => onPlaceSelect?.(place)}
                                    className="flex items-center justify-between w-full text-left hover:bg-gray-100 p-[10px] dark:hover:bg-slate-800/50 cursor-pointer rounded-md"
                                >
                                    <span className="flex items-center gap-[15px]">
                                        <span className="w-[40px] h-[40px] dark:border-slate-700 rounded-full border border-gray-300 flex items-center justify-center" aria-hidden>
                                            <PiBuildings className="text-[1.4rem] text-gray-600 dark:text-[#abc2d3]"/>
                                        </span>
                                        <span>
                                            <span className="block text-[1.1rem] font-[500] text-gray-800 dark:text-[#abc2d3]">{place.street}</span>
                                            <span className="block text-[0.8rem] text-gray-500 dark:text-slate-400">{place.location}</span>
                                        </span>
                                    </span>
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
