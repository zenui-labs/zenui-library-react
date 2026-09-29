import {useState} from "react";

export interface ButtonPaginationProps {
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

/** Square page buttons between Previous and Next buttons. */
export const ButtonPagination = ({
    totalPages,
    page,
    defaultPage = 1,
    onPageChange,
    previousLabel = "Previous",
    nextLabel = "Next",
    ariaLabel = "Pagination",
    className = "",
}: ButtonPaginationProps) => {
    const [internalPage, setInternalPage] = useState(defaultPage);
    const currentPage = page ?? internalPage;

    const goTo = (next: number) => {
        const target = Math.min(Math.max(next, 1), totalPages);
        if (target === currentPage) return;
        if (page === undefined) setInternalPage(target);
        onPageChange?.(target);
    };

    return (
        <nav aria-label={ariaLabel} className={`flex items-center flex-wrap justify-center mt-4 ${className}`}>
            <button
                type="button"
                onClick={() => goTo(currentPage - 1)}
                disabled={currentPage === 1}
                className="mx-1 px-3 py-1 text-[0.9rem] dark:disabled:bg-slate-800 dark:disabled:text-slate-500 disabled:cursor-not-allowed dark:bg-slate-700 dark:text-[#abc2d3] sm:text-[1rem] rounded bg-gray-200 text-[#424242] disabled:opacity-50"
            >
                {previousLabel}
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
                        className={`mx-1 px-3 py-1 text-[0.9rem] sm:text-[1rem] rounded ${
                            active ? "bg-[#3B9DF8] text-white" : "bg-gray-200 dark:bg-slate-700 dark:text-[#abc2d3] text-gray-700"
                        }`}
                    >
                        {pageNumber}
                    </button>
                );
            })}
            <button
                type="button"
                onClick={() => goTo(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="mx-1 px-3 py-1 text-[0.9rem] sm:text-[1rem] dark:disabled:bg-slate-800 dark:disabled:text-slate-500 disabled:cursor-not-allowed dark:bg-slate-700 dark:text-[#abc2d3] rounded bg-gray-200 text-[#424242] disabled:opacity-50"
            >
                {nextLabel}
            </button>
        </nav>
    );
};
