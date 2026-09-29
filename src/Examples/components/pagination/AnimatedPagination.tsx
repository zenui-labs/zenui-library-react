import {useState} from "react";
import {FaChevronLeft, FaChevronRight} from "react-icons/fa";

export interface AnimatedPaginationProps {
    totalPages: number;
    /** The current page, starting at 1. Pass it with `onPageChange` to control the component. */
    page?: number;
    /** The page shown on first render when the component is uncontrolled. */
    defaultPage?: number;
    onPageChange?: (page: number) => void;
    previousLabel?: string;
    nextLabel?: string;
    /** Accessible name of the pagination navigation. */
    ariaLabel?: string;
    className?: string;
}

/** Round page buttons that grow when selected, with arrow buttons for the previous and next page. */
export const AnimatedPagination = ({
    totalPages,
    page,
    defaultPage = 1,
    onPageChange,
    previousLabel = "Previous page",
    nextLabel = "Next page",
    ariaLabel = "Pagination",
    className = "",
}: AnimatedPaginationProps) => {
    const [internalPage, setInternalPage] = useState(defaultPage);
    const currentPage = page ?? internalPage;

    const goTo = (next: number) => {
        const target = Math.min(Math.max(next, 1), totalPages);
        if (target === currentPage) return;
        if (page === undefined) setInternalPage(target);
        onPageChange?.(target);
    };

    return (
        <nav
            aria-label={ariaLabel}
            className={`flex items-center flex-wrap justify-center mt-8 space-x-1 sm:space-x-2 ${className}`}
        >
            <button
                type="button"
                aria-label={previousLabel}
                onClick={() => goTo(currentPage - 1)}
                disabled={currentPage === 1}
                className="mx-1 px-3.5 py-3.5 rounded-full bg-white text-blue-600 hover:bg-blue-100 transition-all duration-300 dark:bg-slate-700 dark:disabled:bg-slate-800 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
                <FaChevronLeft aria-hidden="true"/>
            </button>
            {Array.from({length: totalPages}, (_, index) => {
                const pageNumber = index + 1;
                const active = currentPage === pageNumber;
                return (
                    <button
                        key={pageNumber}
                        type="button"
                        aria-label={`Page ${pageNumber}`}
                        aria-current={active ? "page" : undefined}
                        onClick={() => goTo(pageNumber)}
                        className={`mx-1 px-4 py-2 text-[0.9rem] sm:text-[1rem] rounded-full transform transition-all duration-300 ${
                            active ? "bg-[#3B9DF8] text-white scale-110 shadow-md" : "bg-transparent text-blue-600 hover:bg-blue-100"
                        }`}
                    >
                        {pageNumber}
                    </button>
                );
            })}
            <button
                type="button"
                aria-label={nextLabel}
                onClick={() => goTo(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="mx-1 px-3.5 py-3.5 rounded-full bg-white text-blue-600 hover:bg-blue-100 transition-all duration-300 dark:bg-slate-700 dark:disabled:bg-slate-800 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
                <FaChevronRight aria-hidden="true"/>
            </button>
        </nav>
    );
};
