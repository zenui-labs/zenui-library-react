import {useState} from "react";

export interface RoundedPaginationProps {
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

/** Pill-shaped Previous and Next buttons around round page buttons that lift on hover. */
export const RoundedPagination = ({
    totalPages,
    page,
    defaultPage = 1,
    onPageChange,
    previousLabel = "Previous",
    nextLabel = "Next",
    ariaLabel = "Pagination",
    className = "",
}: RoundedPaginationProps) => {
    const [internalPage, setInternalPage] = useState(defaultPage);
    const currentPage = page ?? internalPage;

    const goTo = (next: number) => {
        const target = Math.min(Math.max(next, 1), totalPages);
        if (target === currentPage) return;
        if (page === undefined) setInternalPage(target);
        onPageChange?.(target);
    };

    return (
        <nav aria-label={ariaLabel} className={`flex items-center flex-wrap justify-center mt-8 space-x-4 ${className}`}>
            <button
                type="button"
                onClick={() => goTo(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-1 rounded-full bg-gray-200 text-gray-700 hover:bg-[#3B9DF8] hover:text-[#fff] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-gray-200 dark:bg-slate-700 dark:text-[#abc2d3] dark:disabled:bg-slate-800 dark:disabled:text-slate-500 dark:disabled:hover:bg-slate-800 dark:disabled:hover:text-slate-500 disabled:hover:text-gray-700 transition-all duration-300"
            >
                {previousLabel}
            </button>
            <div className="flex items-center space-x-2">
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
                            className={`mx-1 px-3 py-1 text-[0.9rem] sm:text-[1rem] rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all dark:bg-slate-700 dark:text-[#abc2d3] duration-300 transform hover:scale-105 ${
                                active ? "!bg-[#3B9DF8] !text-white shadow-lg" : ""
                            }`}
                        >
                            {pageNumber}
                        </button>
                    );
                })}
            </div>
            <button
                type="button"
                onClick={() => goTo(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-1 rounded-full bg-gray-200 text-gray-700 hover:bg-[#3B9DF8] hover:text-[#fff] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-gray-200 dark:bg-slate-700 dark:text-[#abc2d3] dark:disabled:bg-slate-800 dark:disabled:text-slate-500 dark:disabled:hover:bg-slate-800 dark:disabled:hover:text-slate-500 disabled:hover:text-gray-700 transition-all duration-300"
            >
                {nextLabel}
            </button>
        </nav>
    );
};
