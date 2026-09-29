import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import type {ComponentType, ReactNode} from "react";
import {HiOutlineArrowsUpDown} from "react-icons/hi2";
import {BsThreeDotsVertical} from "react-icons/bs";

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

export interface SearchableTableProps<T extends TableRow> {
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
    className?: string;
}

type SortDirection = "asc" | "desc";

interface SortConfig<T extends TableRow> {
    key: Extract<keyof T, string> | null;
    direction: SortDirection;
}

// Rows from this index on open their menu upward so it stays inside the table.
const OPEN_UPWARD_FROM = 2;

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

/** A table with a search field that filters rows as you type, sortable columns and a menu of actions on each row. */
export function SearchableTable<T extends TableRow>({
    rows,
    columns,
    actions = [],
    onAction,
    getRowLabel,
    searchPlaceholder = "Search...",
    searchLabel = "Search rows",
    actionsHeader = "Actions",
    emptyMessage = "No data found.",
    className = "",
}: SearchableTableProps<T>) {
    const [search, setSearch] = useState("");
    const [sortConfig, setSortConfig] = useState<SortConfig<T>>({key: null, direction: "asc"});
    const [openMenuId, setOpenMenuId] = useState<RowId | null>(null);

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

    const closeMenu = useCallback(() => setOpenMenuId(null), []);
    const rowLabel = (row: T) => getRowLabel?.(row) ?? (columns[0] ? textOf(row[columns[0].key]) : textOf(row.id));
    const hasActions = actions.length > 0;

    return (
        <div className={`mx-auto w-full p-4 ${className}`}>
            <div className="mb-4">
                <input
                    placeholder={searchPlaceholder}
                    aria-label={searchLabel}
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
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
                        {sortedRows.map((row, index) => (
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

                {!sortedRows.length && <p className="w-full py-6 text-center text-[0.9rem] text-gray-500">{emptyMessage}</p>}
            </div>
        </div>
    );
}
