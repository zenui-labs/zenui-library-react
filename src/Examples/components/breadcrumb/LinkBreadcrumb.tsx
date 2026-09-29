import {MdKeyboardArrowDown} from "react-icons/md";

export interface BreadcrumbLink {
    label: string;
    href: string;
}

export interface LinkBreadcrumbProps {
    /** The path from the first level to the current page. The last item is marked as the current page. */
    items: BreadcrumbLink[];
    /** Accessible name of the breadcrumb navigation. */
    ariaLabel?: string;
    className?: string;
}

/** A breadcrumb with links for moving back to earlier pages or sections. */
export const LinkBreadcrumb = ({items, ariaLabel = "Breadcrumb", className = ""}: LinkBreadcrumbProps) => (
    <nav aria-label={ariaLabel} className={className}>
        <ol className="flex items-center flex-wrap gap-[5px]">
            {items.map((item, index) => {
                const isCurrent = index === items.length - 1;
                return (
                    <li key={item.href} className="flex items-center gap-[5px]">
                        <a
                            href={item.href}
                            aria-current={isCurrent ? "page" : undefined}
                            className={`text-[0.9rem] hover:underline ${isCurrent ? "text-[#3B9DF8]" : "dark:text-[#abc2d3] text-[#424242]"}`}
                        >
                            {item.label}
                        </a>
                        {!isCurrent && (
                            <MdKeyboardArrowDown className="rotate-[-90deg] dark:text-[#abc2d3] text-[0.9rem]" aria-hidden="true"/>
                        )}
                    </li>
                );
            })}
        </ol>
    </nav>
);
