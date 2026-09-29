import {useState} from "react";

export interface PageButtonProps {
    pageNumber: number;
    isActive: boolean;
    onClick: (pageNumber: number) => void;
}

/** One page number button. Marks itself as the current page when active. */
export const PageButton = ({pageNumber, isActive, onClick}: PageButtonProps) => (
    <button
        type="button"
        aria-label={`Page ${pageNumber}`}
        aria-current={isActive ? "page" : undefined}
        onClick={() => onClick(pageNumber)}
        className={`px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
            isActive
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-[#abc2d3] hover:bg-blue-500 hover:text-white"
        }`}
    >
        {pageNumber}
    </button>
);

const Ellipsis = () => (
    <span className="mx-1 px-2 dark:text-[#abc2d3] text-gray-500" aria-hidden="true">
        ...
    </span>
);

export interface SmartPaginationProps {
    totalPages: number;
    /** The current page, starting at 1. Pass it with `onPageChange` to control the component. */
    page?: number;
    /** The page shown on first render when the component is uncontrolled. */
    defaultPage?: number;
    onPageChange?: (page: number) => void;
    /** How many pages to show on each side of the current page, between the first and last page. */
    siblingCount?: number;
    previousLabel?: string;
    nextLabel?: string;
    /** Accessible name of the pagination navigation. */
    ariaLabel?: string;
    className?: string;
}

/**
 * Pagination for long lists. It always shows the first and last page and the pages around the current one,
 * and replaces the gaps with an ellipsis.
 */
export const SmartPagination = ({
    totalPages,
    page,
    defaultPage = 1,
    onPageChange,
    siblingCount = 1,
    previousLabel = "Previous",
    nextLabel = "Next",
    ariaLabel = "Pagination",
    className = "",
}: SmartPaginationProps) => {
    const [internalPage, setInternalPage] = useState(defaultPage);
    const currentPage = page ?? internalPage;

    const goTo = (next: number) => {
        const target = Math.min(Math.max(next, 1), totalPages);
        if (target === currentPage) return;
        if (page === undefined) setInternalPage(target);
        onPageChange?.(target);
    };

    const startPage = Math.max(2, currentPage - siblingCount);
    const endPage = Math.min(totalPages - 1, currentPage + siblingCount);
    const middlePages: number[] = [];
    for (let pageNumber = startPage; pageNumber <= endPage; pageNumber++) middlePages.push(pageNumber);

    const disabledClass = "bg-gray-200 !text-gray-400 cursor-not-allowed";

    return (
        <nav
            aria-label={ariaLabel}
            className={`flex items-center justify-center flex-col sm:flex-row md:flex-col xl:flex-row mt-8 sm:space-x-4 space-y-4 sm:space-y-0 md:space-y-4 xl:space-y-0 py-7 pb-14 ${className}`}
        >
            <button
                type="button"
                onClick={() => goTo(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 bg-gray-200 dark:bg-slate-700 dark:text-[#abc2d3] text-gray-800 rounded-lg font-medium transition-colors duration-300 ${
                    currentPage === 1 ? disabledClass : ""
                }`}
            >
                {previousLabel}
            </button>
            <div className="flex gap-[5px] sm:gap-[8px]">
                <PageButton pageNumber={1} isActive={currentPage === 1} onClick={goTo}/>
                {startPage > 2 && <Ellipsis/>}
                {middlePages.map((pageNumber) => (
                    <PageButton key={pageNumber} pageNumber={pageNumber} isActive={currentPage === pageNumber} onClick={goTo}/>
                ))}
                {endPage < totalPages - 1 && <Ellipsis/>}
                {totalPages > 1 && (
                    <PageButton pageNumber={totalPages} isActive={currentPage === totalPages} onClick={goTo}/>
                )}
            </div>
            <button
                type="button"
                onClick={() => goTo(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 bg-gray-200 dark:bg-slate-700 dark:text-[#abc2d3] text-gray-800 rounded-lg font-medium transition-colors duration-300 ${
                    currentPage === totalPages ? disabledClass : ""
                }`}
            >
                {nextLabel}
            </button>
        </nav>
    );
};
