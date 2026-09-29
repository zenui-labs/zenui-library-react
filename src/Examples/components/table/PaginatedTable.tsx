import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import type {ComponentType, ReactNode} from "react";
import {HiOutlineArrowsUpDown} from "react-icons/hi2";
import {BsChevronLeft, BsChevronRight, BsThreeDotsVertical} from "react-icons/bs";
import {IoIosArrowDown} from "react-icons/io";

export type RowId = string | number;

export interface TableRow {
    id: RowId;
}

export interface TableColumn<T extends TableRow> {
    /** Field of the row shown in this column. Search and sort use its value. */
    key: Extract<keyof T, string>;
    header: string;
    /** Custom cell content. Defaults to the field value as text. */
    render?: (row: T) => ReactNode;
}

export interface TableAction {
    id: string;
    label: string;
    icon?: ComponentType<{className?: string}>;
}

export interface PaginatedTableProps<T extends TableRow> {
    rows: T[];
    columns: TableColumn<T>[];
    /** Items in each row's menu. The Actions column is hidden when this is empty. */
    actions?: TableAction[];
    onAction?: (actionId: string, row: T) => void;
    /** Names a row for screen readers in the menu button label. Defaults to the first column's value. */
    getRowLabel?: (row: T) => string;
    searchPlaceholder?: string;
    /** Accessible name of the search field. */
    searchLabel?: string;
    actionsHeader?: string;
    emptyMessage?: string;
    /** Choices in the rows per page menu. */
    pageSizeOptions?: number[];
    defaultPageSize?: number;
    /** Accessible name of the rows per page menu. */
    pageSizeLabel?: string;
    /** Text next to the rows per page menu. `from` is 0 when nothing matches. */
    formatSummary?: (from: number, to: number, total: number) => string;
    className?: string;
}

type SortDirection = "asc" | "desc";

interface SortConfig<T extends TableRow> {
    key: Extract<keyof T, string> | null;
    direction: SortDirection;
}

// Rows from this index on open their menu upward so it stays inside the table.
const OPEN_UPWARD_FROM = 3;

const textOf = (value: unknown) => (value === null || value === undefined ? "" : String(value));

const compareValues = (a: unknown, b: unknown) =>
    typeof a === "number" && typeof b === "number"
        ? a - b
        : textOf(a).localeCompare(textOf(b), undefined, {numeric: true, sensitivity: "base"});

interface RowMenuProps {
    open: boolean;
    upward: boolean;
    label: string;
    actions: TableAction[];
    onToggle: () => void;
    onClose: () => void;
    onSelect: (actionId: string) => void;
}

const RowMenu = ({open, upward, label, actions, onToggle, onClose, onSelect}: RowMenuProps) => {
    const rootRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!open) return;

        const handlePointerDown = (event: MouseEvent) => {
            if (!rootRef.current?.contains(event.target as Node)) onClose();
        };
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key !== "Escape") return;
            onClose();
            triggerRef.current?.focus();
        };

        document.addEventListener("mousedown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("mousedown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [open, onClose]);

    return (
        <div ref={rootRef}>
            <button
                ref={triggerRef}
                type="button"
                onClick={onToggle}
                aria-label={label}
                aria-haspopup="menu"
                aria-expanded={open}
                className="block cursor-pointer rounded text-gray-600 dark:text-[#abc2d3]"
            >
                <BsThreeDotsVertical aria-hidden/>
            </button>

            <div
                role="menu"
                aria-label={label}
                className={`${open ? "visible z-30 scale-[1] opacity-100" : "invisible z-[-1] scale-[0.8] opacity-0"} ${
                    upward ? "bottom-[90%]" : "top-[90%]"
                } absolute right-[80%] min-w-[160px] rounded-md bg-white p-1.5 shadow-md transition-all duration-100 dark:bg-slate-800`}
            >
                {actions.map(({id, label: actionLabel, icon: Icon}) => (
                    <button
                        key={id}
                        type="button"
                        role="menuitem"
                        onClick={() => {
                            onSelect(id);
                            onClose();
                        }}
                        className="flex w-full cursor-pointer items-center gap-[8px] rounded-md px-2 py-1.5 text-left text-[0.9rem] text-gray-700 transition-all duration-200 hover:bg-gray-50 dark:text-[#abc2d3] dark:hover:bg-slate-900/50"
                    >
                        {Icon && <Icon/>}
                        {actionLabel}
                    </button>
                ))}
            </div>
        </div>
    );
};

interface PageSizeSelectProps {
    value: number;
    options: number[];
    label: string;
    onChange: (size: number) => void;
}

const PageSizeSelect = ({value, options, label, onChange}: PageSizeSelectProps) => {
    const [open, setOpen] = useState(false);
    const rootRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;

        const handlePointerDown = (event: MouseEvent) => {
            if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
        };
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setOpen(false);
        };

        document.addEventListener("mousedown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("mousedown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [open]);

    return (
        <div ref={rootRef} className="relative w-44">
            <button
                type="button"
                onClick={() => setOpen((current) => !current)}
                aria-haspopup="listbox"
                aria-expanded={open}
                aria-label={`${label}: ${value}`}
                className="flex w-max items-center justify-between gap-[10px] rounded border border-gray-300 bg-white px-2 py-0.5 text-left shadow-sm hover:border-gray-400 focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-[#abc2d3] dark:hover:border-slate-700"
            >
                {value}
                <IoIosArrowDown aria-hidden className={`${open ? "rotate-[180deg]" : "rotate-0"} transition-all duration-200`}/>
            </button>

            {open && (
                <div
                    role="listbox"
                    aria-label={label}
                    className="absolute mt-1 w-max overflow-hidden rounded border border-gray-300 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-800 dark:text-[#abc2d3]"
                >
                    {options.map((option) => (
                        <button
                            key={option}
                            type="button"
                            role="option"
                            aria-selected={option === value}
                            onClick={() => {
                                onChange(option);
                                setOpen(false);
                            }}
                            className="block w-full cursor-pointer px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-slate-900/50"
                        >
                            {option}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

// Shows up to five page numbers, keeping the current page in the middle when it can.
const visiblePages = (currentPage: number, totalPages: number) =>
    Array.from({length: Math.min(5, totalPages)}, (_, i) => {
        if (totalPages <= 5 || currentPage <= 3) return i + 1;
        if (currentPage >= totalPages - 2) return totalPages - 4 + i;
        return currentPage - 2 + i;
    });

const defaultSummary = (from: number, to: number, total: number) => `Showing ${from} to ${to} of ${total} results`;

const pagerButton =
    "cursor-pointer rounded-md border border-gray-200 px-[10px] py-[5px] text-[0.9rem] hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-700 dark:text-[#abc2d3] dark:hover:bg-slate-900";

/** A searchable, sortable table split into pages, with a rows per page menu and page buttons under it. */
export function PaginatedTable<T extends TableRow>({
    rows,
    columns,
    actions = [],
    onAction,
    getRowLabel,
    searchPlaceholder = "Search...",
    searchLabel = "Search rows",
    actionsHeader = "Actions",
    emptyMessage = "No data found.",
    pageSizeOptions = [5, 10, 20, 50],
    defaultPageSize = 10,
    pageSizeLabel = "Rows per page",
    formatSummary = defaultSummary,
    className = "",
}: PaginatedTableProps<T>) {
    const [search, setSearch] = useState("");
    const [sortConfig, setSortConfig] = useState<SortConfig<T>>({key: null, direction: "asc"});
    const [openMenuId, setOpenMenuId] = useState<RowId | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(defaultPageSize);

    const filteredRows = useMemo(() => {
        const query = search.trim().toLowerCase();
        if (!query) return rows;
        return rows.filter((row) => columns.some((column) => textOf(row[column.key]).toLowerCase().includes(query)));
    }, [rows, columns, search]);

    const sortedRows = useMemo(() => {
        const {key, direction} = sortConfig;
        if (!key) return filteredRows;
        return [...filteredRows].sort((a, b) => compareValues(a[key], b[key]) * (direction === "asc" ? 1 : -1));
    }, [filteredRows, sortConfig]);

    const handleSort = (key: Extract<keyof T, string>) => {
        setSortConfig((current) => ({
            key,
            direction: current.key === key && current.direction === "asc" ? "desc" : "asc",
        }));
    };

    const totalPages = Math.max(1, Math.ceil(sortedRows.length / pageSize));
    // Stays in range when rows are removed or the search narrows the list.
    const page = Math.min(currentPage, totalPages);
    const pageRows = sortedRows.slice((page - 1) * pageSize, page * pageSize);
    const from = sortedRows.length ? (page - 1) * pageSize + 1 : 0;
    const to = Math.min(page * pageSize, sortedRows.length);

    const goToPage = (target: number) => setCurrentPage(Math.min(Math.max(1, target), totalPages));

    const closeMenu = useCallback(() => setOpenMenuId(null), []);
    const rowLabel = (row: T) => getRowLabel?.(row) ?? (columns[0] ? textOf(row[columns[0].key]) : textOf(row.id));
    const hasActions = actions.length > 0;

    return (
        <div className={`mx-auto w-full p-4 ${className}`}>
            <div className="mb-4 flex items-center justify-between">
                <input
                    placeholder={searchPlaceholder}
                    aria-label={searchLabel}
                    value={search}
                    onChange={(event) => {
                        setSearch(event.target.value);
                        setCurrentPage(1);
                    }}
                    className="max-w-sm rounded-md border border-gray-200 px-4 py-2.5 outline-none focus:border-blue-300 dark:border-slate-700 dark:bg-slate-900 dark:text-[#abc2d3] dark:placeholder:text-slate-500"
                />
            </div>

            <div className="w-full overflow-hidden rounded-md border border-gray-200 dark:border-slate-700">
                <table className="w-full text-sm">
                    <thead className="bg-gray-100 dark:bg-slate-900">
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={column.key}
                                    aria-sort={
                                        sortConfig.key === column.key
                                            ? sortConfig.direction === "asc" ? "ascending" : "descending"
                                            : "none"
                                    }
                                    className="cursor-pointer p-3 text-left font-medium text-gray-700 dark:text-[#abc2d3]"
                                >
                                    <button
                                        type="button"
                                        onClick={() => handleSort(column.key)}
                                        className="flex items-center gap-[5px] font-medium"
                                    >
                                        {column.header}
                                        <HiOutlineArrowsUpDown
                                            aria-hidden
                                            className="rounded-md p-[5px] text-[1.6rem] hover:bg-gray-200 dark:hover:bg-slate-800"
                                        />
                                    </button>
                                </th>
                            ))}
                            {hasActions && (
                                <th className="p-3 text-left font-medium text-gray-700 dark:text-[#abc2d3]">{actionsHeader}</th>
                            )}
                        </tr>
                    </thead>
                    <tbody>
                        {pageRows.map((row, index) => (
                            <tr
                                key={row.id}
                                className="border-t border-gray-200 hover:bg-gray-50 dark:border-slate-700 dark:hover:bg-slate-900"
                            >
                                {columns.map((column) => (
                                    <td key={column.key} className="p-3 dark:text-[#abc2d3]">
                                        {column.render ? column.render(row) : textOf(row[column.key])}
                                    </td>
                                ))}
                                {hasActions && (
                                    <td className="relative p-3">
                                        <RowMenu
                                            open={openMenuId === row.id}
                                            upward={index >= OPEN_UPWARD_FROM}
                                            label={`Actions for ${rowLabel(row)}`}
                                            actions={actions}
                                            onToggle={() => setOpenMenuId((current) => (current === row.id ? null : row.id))}
                                            onClose={closeMenu}
                                            onSelect={(actionId) => onAction?.(actionId, row)}
                                        />
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>

                {!pageRows.length && <p className="w-full py-6 text-center text-[0.9rem] text-gray-500">{emptyMessage}</p>}
            </div>

            <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-[5px]">
                    <div className="text-sm text-gray-500 dark:text-[#abc2d3]">{formatSummary(from, to, sortedRows.length)}</div>
                    <PageSizeSelect
                        value={pageSize}
                        options={pageSizeOptions}
                        label={pageSizeLabel}
                        onChange={(size) => {
                            setPageSize(size);
                            setCurrentPage(1);
                        }}
                    />
                </div>

                <nav aria-label="Pagination" className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => goToPage(page - 1)}
                        disabled={page === 1}
                        aria-label="Previous page"
                        className={pagerButton}
                    >
                        <BsChevronLeft aria-hidden/>
                    </button>

                    <div className="flex items-center gap-1">
                        {visiblePages(page, totalPages).map((pageNumber) => (
                            <button
                                key={pageNumber}
                                type="button"
                                onClick={() => goToPage(pageNumber)}
                                aria-label={`Page ${pageNumber}`}
                                aria-current={pageNumber === page ? "page" : undefined}
                                className={`${
                                    pageNumber === page ? "bg-black text-white dark:bg-slate-800" : ""
                                } rounded-md border border-gray-200 px-[10px] py-[1px] text-[0.9rem] dark:border-slate-700 dark:text-[#abc2d3] dark:hover:bg-slate-900`}
                            >
                                {pageNumber}
                            </button>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={() => goToPage(page + 1)}
                        disabled={page === totalPages}
                        aria-label="Next page"
                        className={pagerButton}
                    >
                        <BsChevronRight aria-hidden/>
                    </button>
                </nav>
            </div>
        </div>
    );
}
