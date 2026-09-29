import {Link} from "react-router-dom";
import {MdChevronRight} from "react-icons/md";
import {IoChevronBack} from "react-icons/io5";

export interface BreadcrumbLink {
    label: string;
    /** Route path passed to React Router's `Link`. */
    href: string;
}

export interface PageHeaderBreadcrumbProps {
    /** Page title shown above the breadcrumb. */
    title: string;
    /** The path from the first level to the current page. The last item is marked as the current page. */
    items: BreadcrumbLink[];
    /** Called when the back button is clicked. Defaults to going back one step in the browser history. */
    onBack?: () => void;
    /** Accessible name of the back button. */
    backLabel?: string;
    /** Accessible name of the breadcrumb navigation. */
    ariaLabel?: string;
    className?: string;
}

/** A page header with a back button, a title and a breadcrumb built with React Router links, for detail pages. */
export const PageHeaderBreadcrumb = ({
    title,
    items,
    onBack,
    backLabel = "Go back",
    ariaLabel = "Breadcrumb",
    className = "",
}: PageHeaderBreadcrumbProps) => (
    <div className={`flex items-center justify-between py-2 ${className}`}>
        <div className="flex items-center gap-3">
            <button
                type="button"
                aria-label={backLabel}
                onClick={() => (onBack ? onBack() : window.history.back())}
                className="p-2 rounded-full hover:bg-gray-200 bg-gray-100 dark:bg-slate-800 dark:hover:bg-gray-800 transition-colors"
            >
                <IoChevronBack className="w-5 h-5 text-gray-600 dark:text-gray-300" aria-hidden="true"/>
            </button>

            <div>
                <h1 className="text-xl font-semibold dark:text-white">{title}</h1>

                <nav aria-label={ariaLabel}>
                    <ol className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                        {items.map((crumb, index) => {
                            const isCurrent = index === items.length - 1;
                            return (
                                <li key={crumb.href} className="flex items-center">
                                    <Link
                                        to={crumb.href}
                                        aria-current={isCurrent ? "page" : undefined}
                                        className="hover:underline transition-colors"
                                    >
                                        {crumb.label}
                                    </Link>
                                    {!isCurrent && (
                                        <MdChevronRight className="w-3 h-3 mx-1 text-gray-400 dark:text-gray-500" aria-hidden="true"/>
                                    )}
                                </li>
                            );
                        })}
                    </ol>
                </nav>
            </div>
        </div>
    </div>
);
