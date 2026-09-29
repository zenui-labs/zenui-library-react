import {useCallback, useEffect, useRef, useState, type ComponentType, type MouseEvent, type ReactNode} from "react";
import {BsChevronRight} from "react-icons/bs";

export interface NestedMenuItem {
    label: string;
    icon: ComponentType<{className?: string}>;
    /** Called when the item is picked. Items with a submenu open it instead. */
    onSelect?: () => void;
    /** Shows the item in red, for destructive actions such as delete. */
    danger?: boolean;
    /** Items shown in a submenu to the right. Opens on hover or click. */
    submenu?: NestedMenuItem[];
}

export interface NestedContextMenuProps {
    items: NestedMenuItem[];
    /** Content of the area that opens the menu on right-click. */
    children: ReactNode;
    /** Called with the picked item, after the item's own `onSelect`. Not called for items that open a submenu. */
    onSelect?: (item: NestedMenuItem) => void;
    className?: string;
}

interface Point {
    x: number;
    y: number;
}

// Space kept between the menu and the edge of the viewport.
const EDGE = 8;
// Matches the menu's duration-200 height transition.
const CLOSE_DELAY = 200;

/** A right-click menu whose items can open a submenu with more actions. */
export const NestedContextMenu = ({items, children, onSelect, className = ""}: NestedContextMenuProps) => {
    const [open, setOpen] = useState(false);
    const [anchor, setAnchor] = useState<Point>({x: 0, y: 0});
    const [placement, setPlacement] = useState<Point>({x: 0, y: 0});
    const [height, setHeight] = useState(0);
    // Label of the item whose submenu is open.
    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
    const [submenuHeight, setSubmenuHeight] = useState(0);
    const triggerRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const submenuRef = useRef<HTMLDivElement>(null);
    const closeTimer = useRef<number>();

    const closeSubmenu = () => {
        setOpenSubmenu(null);
        setSubmenuHeight(0);
    };

    // Collapses the menu, then unmounts it once the height transition has finished.
    const close = useCallback(() => {
        setHeight(0);
        setOpenSubmenu(null);
        setSubmenuHeight(0);
        window.clearTimeout(closeTimer.current);
        closeTimer.current = window.setTimeout(() => setOpen(false), CLOSE_DELAY);
    }, []);

    useEffect(() => () => window.clearTimeout(closeTimer.current), []);

    const handleContextMenu = (event: MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        window.clearTimeout(closeTimer.current);
        // The menu is fixed, so it needs viewport coordinates. These stay correct when the page is scrolled.
        const point = {x: event.clientX, y: event.clientY};
        setAnchor(point);
        setPlacement(point);
        setOpen(true);
    };

    // Expands the menu to its full height after it mounts and keeps it inside the viewport.
    useEffect(() => {
        if (!open) return;
        const timer = window.setTimeout(() => {
            const menu = menuRef.current;
            if (!menu) return;
            setHeight(menu.scrollHeight);
            setPlacement({
                x: Math.max(EDGE, Math.min(anchor.x, window.innerWidth - menu.offsetWidth - EDGE)),
                y: Math.max(EDGE, Math.min(anchor.y, window.innerHeight - menu.scrollHeight - EDGE)),
            });
        }, 0);
        return () => window.clearTimeout(timer);
    }, [open, anchor]);

    // Expands the submenu after it mounts.
    useEffect(() => {
        if (!openSubmenu) return;
        const timer = window.setTimeout(() => {
            if (submenuRef.current) setSubmenuHeight(submenuRef.current.scrollHeight);
        }, 0);
        return () => window.clearTimeout(timer);
    }, [openSubmenu]);

    // Closes on a click outside the menu, a right-click elsewhere on the page, or Escape.
    useEffect(() => {
        if (!open) return;
        const handleClick = (event: globalThis.MouseEvent) => {
            if (!menuRef.current?.contains(event.target as Node)) close();
        };
        const handleContextMenuOutside = (event: globalThis.MouseEvent) => {
            if (!triggerRef.current?.contains(event.target as Node)) close();
        };
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") close();
        };
        document.addEventListener("click", handleClick);
        document.addEventListener("contextmenu", handleContextMenuOutside);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("click", handleClick);
            document.removeEventListener("contextmenu", handleContextMenuOutside);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [open, close]);

    const handleSelect = (item: NestedMenuItem) => {
        item.onSelect?.();
        onSelect?.(item);
        close();
    };

    const handleItemClick = (item: NestedMenuItem) => {
        if (!item.submenu) {
            handleSelect(item);
            return;
        }
        // A click toggles the submenu, so it also opens by keyboard and touch.
        if (openSubmenu === item.label) closeSubmenu();
        else setOpenSubmenu(item.label);
    };

    return (
        <>
            <div
                ref={triggerRef}
                onContextMenu={handleContextMenu}
                className={`w-full cursor-pointer dark:bg-slate-800 dark:border-slate-700 dark:text-[#abc2d3] bg-blue-50 border-blue-300 rounded-md border p-4 text-[1rem] ${className}`}
            >
                {children}
            </div>

            {open && (
                <div
                    ref={menuRef}
                    className={`${
                        openSubmenu ? "overflow-visible" : "overflow-hidden"
                    } fixed bg-white transition-all dark:bg-slate-800 dark:border-slate-700 duration-200 shadow-md rounded-lg py-2 w-48 border border-gray-200`}
                    style={{top: placement.y, left: placement.x, height, zIndex: 50}}
                >
                    {items.map((item) => {
                        const Icon = item.icon;
                        const submenuOpen = openSubmenu === item.label;

                        return (
                            <div
                                key={item.label}
                                className="relative"
                                onMouseEnter={() => item.submenu && setOpenSubmenu(item.label)}
                                onMouseLeave={() => item.submenu && closeSubmenu()}
                            >
                                <button
                                    type="button"
                                    onClick={() => handleItemClick(item)}
                                    aria-haspopup={item.submenu ? "true" : undefined}
                                    aria-expanded={item.submenu ? submenuOpen : undefined}
                                    className={`w-full px-4 py-2 text-left flex items-center text-gray-600 dark:text-[#abc2d3] justify-between text-sm ${
                                        item.danger ? "hover:bg-red-50 dark:hover:bg-red-900/20" : "hover:bg-gray-50 dark:hover:bg-slate-900/50"
                                    }`}
                                >
                                    <span className="flex items-center gap-3">
                                        <span
                                            aria-hidden="true"
                                            className={`${
                                                item.danger ? "text-red-500 dark:text-red-500" : "text-gray-600 dark:text-[#abc2d3]"
                                            } text-[1.1rem]`}
                                        >
                                            <Icon/>
                                        </span>
                                        <span className={item.danger ? "text-red-500" : ""}>{item.label}</span>
                                    </span>
                                    {item.submenu && (
                                        <span aria-hidden="true">
                                            <BsChevronRight className="w-4 h-4 text-gray-400"/>
                                        </span>
                                    )}
                                </button>

                                {item.submenu && submenuOpen && (
                                    <div
                                        ref={submenuRef}
                                        className="absolute overflow-hidden transition-all duration-200 left-full top-0 bg-white shadow-md dark:bg-slate-800 dark:border-slate-700 rounded-lg py-2 w-48 border border-gray-200 ml-0.5"
                                        style={{height: submenuHeight}}
                                    >
                                        {item.submenu.map((subItem) => {
                                            const SubIcon = subItem.icon;
                                            return (
                                                <button
                                                    key={subItem.label}
                                                    type="button"
                                                    onClick={() => handleSelect(subItem)}
                                                    className={`w-full px-4 py-2 text-left flex items-center gap-3 text-sm dark:text-[#abc2d3] text-gray-600 ${
                                                        subItem.danger ? "hover:bg-red-50 dark:hover:bg-red-900/20" : "hover:bg-gray-50 dark:hover:bg-slate-900/50"
                                                    }`}
                                                >
                                                    <span
                                                        aria-hidden="true"
                                                        className={`${
                                                            subItem.danger ? "text-red-500" : "text-gray-600 dark:text-[#abc2d3]"
                                                        } text-[1.1rem]`}
                                                    >
                                                        <SubIcon/>
                                                    </span>
                                                    <span className={subItem.danger ? "text-red-500" : ""}>{subItem.label}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </>
    );
};
