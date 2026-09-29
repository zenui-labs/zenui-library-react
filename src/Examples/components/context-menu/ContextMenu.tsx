import {useCallback, useEffect, useRef, useState, type ComponentType, type MouseEvent, type ReactNode} from "react";

export interface ContextMenuItem {
    label: string;
    icon: ComponentType<{className?: string}>;
    onSelect?: () => void;
    /** Shows the item in red, for destructive actions such as delete. */
    danger?: boolean;
}

export interface ContextMenuProps {
    items: ContextMenuItem[];
    /** Content of the area that opens the menu on right-click. */
    children: ReactNode;
    /** Called with the picked item, after the item's own `onSelect`. */
    onSelect?: (item: ContextMenuItem) => void;
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

/** An area that opens a menu of actions at the pointer on right-click. */
export const ContextMenu = ({items, children, onSelect, className = ""}: ContextMenuProps) => {
    const [open, setOpen] = useState(false);
    const [anchor, setAnchor] = useState<Point>({x: 0, y: 0});
    const [placement, setPlacement] = useState<Point>({x: 0, y: 0});
    const [height, setHeight] = useState(0);
    const triggerRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const closeTimer = useRef<number>();

    // Collapses the menu, then unmounts it once the height transition has finished.
    const close = useCallback(() => {
        setHeight(0);
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

    const handleSelect = (item: ContextMenuItem) => {
        item.onSelect?.();
        onSelect?.(item);
        close();
    };

    return (
        <>
            <div
                ref={triggerRef}
                onContextMenu={handleContextMenu}
                className={`w-full cursor-pointer dark:bg-slate-800 dark:border-slate-700 dark:text-[#abc2d3] bg-gray-50 border-gray-300 rounded-md border p-4 text-[1rem] ${className}`}
            >
                {children}
            </div>

            {open && (
                <div
                    ref={menuRef}
                    className="fixed bg-white overflow-hidden dark:bg-slate-800 dark:border-slate-700 transition-all duration-200 shadow-md rounded-lg py-2 w-48 border border-gray-200"
                    style={{top: placement.y, left: placement.x, height, zIndex: 50}}
                >
                    {items.map((item) => {
                        const Icon = item.icon;
                        return (
                            <button
                                key={item.label}
                                type="button"
                                onClick={() => handleSelect(item)}
                                className={`${
                                    item.danger ? "hover:bg-red-50 dark:hover:bg-red-900/30" : "hover:bg-gray-50 dark:hover:bg-slate-900/50"
                                } w-full px-4 py-2 text-left flex items-center gap-3 text-sm text-gray-600 dark:text-[#abc2d3]`}
                            >
                                <span
                                    aria-hidden="true"
                                    className={`${
                                        item.danger ? "text-red-500 dark:text-red-500" : "text-gray-600 dark:text-[#abc2d3]"
                                    } text-[1.1rem]`}
                                >
                                    <Icon/>
                                </span>
                                <span className={item.danger ? "text-red-500" : ""}>{item.label}</span>
                            </button>
                        );
                    })}
                </div>
            )}
        </>
    );
};
