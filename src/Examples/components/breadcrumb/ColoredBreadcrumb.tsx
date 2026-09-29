import {MdKeyboardArrowDown} from "react-icons/md";

export interface BreadcrumbItem {
    label: string;
}

/** Tailwind classes for one color theme. */
export interface BreadcrumbToneClasses {
    /** Background of the bar. */
    container: string;
    /** Text color of the items. */
    item: string;
    /** Color of the arrows between items. */
    separator: string;
}

export type BreadcrumbTone = "blue" | "orange" | "green";

const breadcrumbTones: Record<BreadcrumbTone, BreadcrumbToneClasses> = {
    blue: {container: "dark:bg-blue-800/20 bg-blue-50", item: "dark:text-blue-600 text-blue-900", separator: "text-blue-900"},
    orange: {container: "dark:bg-orange-800/20 bg-orange-50", item: "dark:text-orange-600 text-orange-900", separator: "text-orange-900"},
    green: {container: "dark:bg-green-800/20 bg-green-50", item: "dark:text-green-600 text-green-900", separator: "text-green-900"},
};

export interface ColoredBreadcrumbProps {
    /** The path from the first level to the current page. The last item is shown in bold as the current page. */
    items: BreadcrumbItem[];
    /** A preset color name, or your own classes for the background, text and arrows. */
    tone?: BreadcrumbTone | BreadcrumbToneClasses;
    /** Classes for the current page item. */
    currentClassName?: string;
    /** Accessible name of the breadcrumb navigation. */
    ariaLabel?: string;
    className?: string;
}

/** A breadcrumb on a tinted bar, with a color theme and a style for the current page. */
export const ColoredBreadcrumb = ({
    items,
    tone = "blue",
    currentClassName = "font-bold",
    ariaLabel = "Breadcrumb",
    className = "",
}: ColoredBreadcrumbProps) => {
    const classes = typeof tone === "string" ? breadcrumbTones[tone] : tone;

    return (
        <nav aria-label={ariaLabel} className={className}>
            <ol className={`flex items-center flex-wrap gap-[5px] py-2.5 px-3 rounded-md ${classes.container}`}>
                {items.map((item, index) => {
                    const isCurrent = index === items.length - 1;
                    return (
                        <li key={`${item.label}-${index}`} className="flex items-center gap-[5px]">
                            <span
                                aria-current={isCurrent ? "page" : undefined}
                                className={`text-[0.9rem] ${classes.item} ${isCurrent ? currentClassName : ""}`}
                            >
                                {item.label}
                            </span>
                            {!isCurrent && (
                                <MdKeyboardArrowDown className={`rotate-[-90deg] text-[0.9rem] ${classes.separator}`} aria-hidden="true"/>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};
