import {MdKeyboardArrowDown} from "react-icons/md";

export interface BreadcrumbItem {
    label: string;
}

export interface PlainBreadcrumbProps {
    /** The path from the first level to the current page. The last item is shown as the current page. */
    items: BreadcrumbItem[];
    /** Accessible name of the breadcrumb navigation. */
    ariaLabel?: string;
    className?: string;
}

/** A breadcrumb that shows the path to the current page as plain text, without links. */
export const PlainBreadcrumb = ({items, ariaLabel = "Breadcrumb", className = ""}: PlainBreadcrumbProps) => (
    <nav aria-label={ariaLabel} className={className}>
        <ol className="flex items-center flex-wrap gap-[5px]">
            {items.map((item, index) => {
                const isCurrent = index === items.length - 1;
                return (
                    <li key={`${item.label}-${index}`} className="flex items-center gap-[5px]">
                        <span
                            aria-current={isCurrent ? "page" : undefined}
                            className={`text-[0.9rem] ${isCurrent ? "text-[#3B9DF8]" : "dark:text-[#abc2d3] text-[#424242]"}`}
                        >
                            {item.label}
                        </span>
                        {!isCurrent && (
                            <MdKeyboardArrowDown className="rotate-[-90deg] dark:text-[#abc2d3] text-[0.9rem]" aria-hidden="true"/>
                        )}
                    </li>
                );
            })}
        </ol>
    </nav>
);
