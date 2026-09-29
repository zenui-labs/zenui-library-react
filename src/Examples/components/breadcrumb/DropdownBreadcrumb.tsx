import {useEffect, useId, useRef, useState} from "react";
import {MdKeyboardArrowDown} from "react-icons/md";

export interface BreadcrumbLink {
    label: string;
    href: string;
}

export interface DropdownBreadcrumbProps {
    /** Every level of the path, in order. Items after `visibleCount` move into the dropdown. */
    items: BreadcrumbLink[];
    /** How many items stay visible before the rest collapse into the dropdown. */
    visibleCount?: number;
    /** Accessible name of the button that opens the dropdown. */
    moreLabel?: string;
    /** Accessible name of the breadcrumb navigation. */
    ariaLabel?: string;
    className?: string;
}

/** A breadcrumb that collapses the deeper levels into a dropdown once the path is longer than `visibleCount`. */
export const DropdownBreadcrumb = ({
    items,
    visibleCount = 3,
    moreLabel = "Show more pages",
    ariaLabel = "Breadcrumb",
    className = "",
}: DropdownBreadcrumbProps) => {
    const [open, setOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuId = useId();

    const visibleItems = items.slice(0, visibleCount);
    const hiddenItems = items.slice(visibleCount);

    // Closes the dropdown on a click outside it or on Escape.
    useEffect(() => {
        if (!open) return;
        const handleClick = (event: MouseEvent) => {
            if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
        };
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setOpen(false);
                buttonRef.current?.focus();
            }
        };
        document.addEventListener("click", handleClick);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("click", handleClick);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [open]);

    return (
        <nav aria-label={ariaLabel} className={className}>
            <ol className="flex items-center gap-[5px]">
                {visibleItems.map((item, index) => {
                    const isLast = index === visibleItems.length - 1;
                    return (
                        <li key={item.href} className="flex items-center gap-[5px]">
                            <a
                                href={item.href}
                                className={`text-[0.9rem] hover:underline ${isLast ? "text-[#3B9DF8]" : "dark:text-[#abc2d3] text-[#424242]"}`}
                            >
                                {item.label}
                            </a>
                            {!isLast && (
                                <MdKeyboardArrowDown className="rotate-[-90deg] dark:text-[#abc2d3] text-[0.9rem]" aria-hidden="true"/>
                            )}
                        </li>
                    );
                })}

                {hiddenItems.length > 0 && (
                    <li>
                        <div ref={rootRef} className="relative">
                            <button
                                ref={buttonRef}
                                type="button"
                                aria-label={moreLabel}
                                aria-expanded={open}
                                aria-controls={menuId}
                                onClick={() => setOpen((current) => !current)}
                                className="dark:text-[#abc2d3] cursor-pointer"
                            >
                                ....
                            </button>
                            <ul
                                id={menuId}
                                className={`${
                                    open ? "translate-y-0 opacity-100 z-30 visible" : "translate-y-[-20px] opacity-0 z-[-1] invisible"
                                } flex flex-col text-[0.8rem] dark:bg-slate-800 dark:text-[#abc2d3] bg-white shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] transition-all duration-300 rounded-md py-1 absolute top-[25px] right-0 sm:left-[-20px] w-max`}
                            >
                                {hiddenItems.map((item) => (
                                    <li key={item.href}>
                                        <a
                                            href={item.href}
                                            onClick={() => setOpen(false)}
                                            className="block w-full hover:bg-gray-100 dark:hover:bg-slate-900/40 px-8 py-2 cursor-pointer"
                                        >
                                            {item.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </li>
                )}
            </ol>
        </nav>
    );
};
