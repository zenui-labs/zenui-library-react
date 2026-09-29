import {useEffect, useId, useRef, useState, type ComponentType} from "react";
import {BsThreeDots} from "react-icons/bs";

type Icon = ComponentType<{className?: string}>;

export interface PostStat {
    icon: Icon;
    /** Accessible name, for example "Likes". */
    label: string;
    count: number;
    onClick?: () => void;
}

export interface PostMenuItem {
    icon: Icon;
    label: string;
    onSelect?: () => void;
    /** Shows the item in red, for example for delete. */
    destructive?: boolean;
}

export interface PostCardProps {
    authorName: string;
    avatarSrc: string;
    avatarAlt: string;
    /** Relative time, for example "2 weeks ago". */
    time: string;
    body: string;
    stats: PostStat[];
    /** Items in the menu behind the three dots button. Leave it out to hide the button. */
    menuItems?: PostMenuItem[];
    className?: string;
}

/** A post card with the author's photo, a menu of actions, the post text and counters for likes, saves and comments. */
export const PostCard = ({
    authorName,
    avatarSrc,
    avatarAlt,
    time,
    body,
    stats,
    menuItems = [],
    className = "",
}: PostCardProps) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const menuId = useId();

    // Close the menu on a click outside it or on Escape.
    useEffect(() => {
        if (!menuOpen) return;
        const handlePointer = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) setMenuOpen(false);
        };
        const handleKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") setMenuOpen(false);
        };
        document.addEventListener("mousedown", handlePointer);
        document.addEventListener("keydown", handleKey);
        return () => {
            document.removeEventListener("mousedown", handlePointer);
            document.removeEventListener("keydown", handleKey);
        };
    }, [menuOpen]);

    return (
        <div className={`w-full dark:bg-slate-800 md:min-w-[60%] md:max-w-[90%] relative bg-white shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] rounded-xl flex-col sm:flex gap-[20px] p-4 ${className}`}>
            <div className="w-full sm:w-[23.5%]">
                <img src={avatarSrc} alt={avatarAlt} className="w-[100%] h-[100px] object-cover sm:rounded-full"/>
            </div>

            <div className="w-full mt-5 sm:mt-0">
                <div className="flex sm:items-center justify-between w-full">
                    <div className="flex sm:flex-row flex-col sm:items-center sm:gap-[5px]">
                        <h2 className="text-[1.2rem] dark:text-[#abc2d3] font-bold">{authorName}</h2>
                        <span className="text-gray-400 dark:text-[#abc2d3]/90"> • {time}</span>
                    </div>

                    {menuItems.length > 0 && (
                        <div className="relative" ref={menuRef}>
                            <button
                                type="button"
                                aria-label="Post options"
                                aria-haspopup="menu"
                                aria-expanded={menuOpen}
                                aria-controls={menuId}
                                onClick={() => setMenuOpen(!menuOpen)}
                            >
                                <BsThreeDots className="text-gray-700 dark:text-[#abc2d3] text-[1.2rem] cursor-pointer"/>
                            </button>

                            <ul
                                id={menuId}
                                role="menu"
                                className={`${
                                    menuOpen
                                        ? "translate-y-0 opacity-100 z-20 h-auto visible"
                                        : "translate-y-[-10px] opacity-0 z-[-1] h-0 invisible"
                                } transition-all duration-200 bg-white w-max shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] py-1 rounded-md dark:bg-slate-900 absolute top-6 right-0`}
                            >
                                {menuItems.map(({icon: ItemIcon, label, onSelect, destructive}) => (
                                    <li key={label} role="none">
                                        <button
                                            type="button"
                                            role="menuitem"
                                            onClick={() => {
                                                setMenuOpen(false);
                                                onSelect?.();
                                            }}
                                            className={`w-full py-2 px-4 dark:hover:bg-slate-800/60 hover:bg-gray-100 cursor-pointer flex items-center gap-[8px] text-[0.9rem] ${
                                                destructive ? "text-red-500" : "text-gray-600 dark:text-[#abc2d3]"
                                            }`}
                                        >
                                            <ItemIcon/>
                                            {label}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <p className="text-gray-600 mt-3 dark:text-[#abc2d3]/90 text-[0.9rem]">{body}</p>

                <div className="flex items-center gap-[20px] mt-3">
                    {stats.map(({icon: StatIcon, label, count, onClick}) => (
                        <button
                            key={label}
                            type="button"
                            onClick={onClick}
                            className="flex items-center gap-[6px] text-gray-400 cursor-pointer hover:text-blue-700"
                        >
                            <StatIcon/>
                            <span className="sr-only">{label}:</span>
                            {count}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
