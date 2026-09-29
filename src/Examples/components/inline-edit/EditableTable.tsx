import {useEffect, useId, useMemo, useRef, useState} from "react";
import type {KeyboardEvent} from "react";
import {AnimatePresence, motion, useReducedMotion} from "framer-motion";
import {LuCheck} from "react-icons/lu";

export type ProductStatus = "Active" | "Draft" | "Archived";

export interface Product {
    id: string;
    name: string;
    sku: string;
    price: number;
    stock: number;
    status: ProductStatus;
}

type ColumnKey = keyof Omit<Product, "id">;

interface Column {
    key: ColumnKey;
    label: string;
    kind: "text" | "money" | "count" | "status" | "readonly";
    align?: "right";
}

const statusStyles: Record<ProductStatus, string> = {
    Active: "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-400/10 dark:text-emerald-300 dark:ring-emerald-400/20",
    Draft: "bg-zinc-100 text-zinc-600 ring-zinc-500/20 dark:bg-white/5 dark:text-zinc-300 dark:ring-white/10",
    Archived: "bg-amber-50 text-amber-800 ring-amber-600/20 dark:bg-amber-400/10 dark:text-amber-300 dark:ring-amber-400/20",
};

const defaultColumnLabels: Record<ColumnKey, string> = {name: "Product", sku: "SKU", price: "Price", stock: "Stock", status: "Status"};

const validate = (column: Column, text: string): string | null => {
    const value = text.trim();
    if (column.kind === "text") return value ? null : "Name can’t be empty";
    if (column.kind === "money") return /^\d+(\.\d{1,2})?$/.test(value) ? null : "Use a price like 49.90";
    if (column.kind === "count") return /^\d+$/.test(value) ? null : "Use a whole number";
    return null;
};

const parse = (column: Column, text: string): Product[ColumnKey] =>
    column.kind === "money" || column.kind === "count" ? Number(text.trim()) : text.trim();

export interface EditableTableProps {
    /** Starting rows. Edits stay local until the user saves. */
    rows: Product[];
    /** Runs while the save button shows its saving state. Reject to keep the changes unsaved. */
    onSave?: (rows: Product[]) => Promise<void> | void;
    statuses?: ProductStatus[];
    /** ISO 4217 code used to format prices. */
    currency?: string;
    /** Stock below this number shows in amber. Zero always shows in red. */
    lowStock?: number;
    columnLabels?: Partial<Record<ColumnKey, string>>;
    /** Accessible name for the grid. */
    label?: string;
    hint?: string;
    className?: string;
}

/** A spreadsheet style grid. Arrow keys move between cells, Enter or typing edits, and changed cells are marked until saved. */
export const EditableTable = ({
    rows: initialRows,
    onSave,
    statuses = ["Active", "Draft", "Archived"],
    currency = "USD",
    lowStock = 10,
    columnLabels,
    label = "Products",
    hint = "Arrow keys move. Enter or typing edits, Tab moves right, Esc cancels.",
    className = "",
}: EditableTableProps) => {
    const labels = {...defaultColumnLabels, ...columnLabels};
    const columns: Column[] = [
        {key: "name", label: labels.name, kind: "text"},
        {key: "sku", label: labels.sku, kind: "readonly"},
        {key: "price", label: labels.price, kind: "money", align: "right"},
        {key: "stock", label: labels.stock, kind: "count", align: "right"},
        {key: "status", label: labels.status, kind: "status"},
    ];
    const money = useMemo(() => new Intl.NumberFormat("en-US", {style: "currency", currency}), [currency]);
    const [rows, setRows] = useState<Product[]>(initialRows);
    const [saved, setSaved] = useState<Product[]>(initialRows);
    const [active, setActive] = useState({row: 0, col: 0});
    const [editing, setEditing] = useState(false);
    const [draft, setDraft] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const cellRefs = useRef(new Map<string, HTMLTableCellElement>());
    const interacted = useRef(false);
    const typedStart = useRef(false);
    const arrowChange = useRef(false);
    const helpId = useId();
    const reduceMotion = useReducedMotion();

    // Move keyboard focus with the active cell, but never on first render.
    useEffect(() => {
        if (!editing && interacted.current) cellRefs.current.get(`${active.row}-${active.col}`)?.focus();
    }, [active, editing]);

    const isDirty = (rowIndex: number, key: ColumnKey) => rows[rowIndex][key] !== saved[rowIndex][key];
    const changes = rows.reduce((sum, _, index) => sum + columns.filter((column) => isDirty(index, column.key)).length, 0);

    const move = (row: number, col: number) => {
        interacted.current = true;
        setActive({row: Math.min(Math.max(row, 0), rows.length - 1), col: Math.min(Math.max(col, 0), columns.length - 1)});
    };

    const startEditing = (initial?: string) => {
        const column = columns[active.col];
        if (column.kind === "readonly") return;
        typedStart.current = initial !== undefined;
        setDraft(initial ?? String(rows[active.row][column.key]));
        setError(null);
        setEditing(true);
    };

    const commit = (value: string, then?: {row: number; col: number}) => {
        const column = columns[active.col];
        const problem = validate(column, value);
        if (problem) {
            setError(problem);
            return;
        }
        setRows((current) => current.map((row, index) => (index === active.row ? {...row, [column.key]: parse(column, value)} : row)));
        setEditing(false);
        setError(null);
        interacted.current = true;
        if (then) move(then.row, then.col);
        else setActive({...active});
    };

    const cancel = () => {
        setEditing(false);
        setError(null);
        setActive({...active});
    };

    const onCellKeyDown = (event: KeyboardEvent<HTMLTableCellElement>) => {
        if (editing) return;
        const {row, col} = active;
        switch (event.key) {
            case "ArrowDown":
                move(row + 1, col);
                break;
            case "ArrowUp":
                move(row - 1, col);
                break;
            case "ArrowRight":
                move(row, col + 1);
                break;
            case "ArrowLeft":
                move(row, col - 1);
                break;
            case "Home":
                move(event.ctrlKey ? 0 : row, 0);
                break;
            case "End":
                move(event.ctrlKey ? rows.length - 1 : row, columns.length - 1);
                break;
            case "Enter":
            case "F2":
                startEditing();
                break;
            default:
                // Typing starts editing and replaces the value, like a spreadsheet.
                if (event.key.length === 1 && !event.metaKey && !event.ctrlKey && columns[col].kind !== "status") {
                    startEditing(event.key);
                    break;
                }
                return;
        }
        event.preventDefault();
    };

    const onEditorKeyDown = (event: KeyboardEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (event.key === "Escape") {
            event.preventDefault();
            cancel();
        } else if (event.key === "Enter") {
            event.preventDefault();
            commit(event.currentTarget.value, {row: active.row + 1, col: active.col});
        } else if (event.key === "Tab") {
            event.preventDefault();
            commit(event.currentTarget.value, {row: active.row, col: active.col + (event.shiftKey ? -1 : 1)});
        }
    };

    const save = async () => {
        const snapshot = rows;
        setSaving(true);
        try {
            await onSave?.(snapshot);
            setSaved(snapshot);
        } catch {
            // Leave the changes marked so the user can try again.
        } finally {
            setSaving(false);
        }
    };

    const renderValue = (product: Product, column: Column) => {
        if (column.kind === "money") return money.format(product.price);
        if (column.kind === "count")
            return <span className={product.stock === 0 ? "text-rose-600 dark:text-rose-400" : product.stock < lowStock ? "text-amber-600 dark:text-amber-400" : ""}>{product.stock}</span>;
        if (column.kind === "status")
            return <span className={`inline-flex h-6 items-center rounded-full px-2 text-xs font-medium ring-1 ring-inset ${statusStyles[product.status]}`}>{product.status}</span>;
        if (column.kind === "readonly") return <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400">{product.sku}</span>;
        return product.name;
    };

    return (
        <div className={`w-full max-w-3xl overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-white/10 dark:bg-zinc-900 ${className}`}>
            <div className="overflow-x-auto">
                <table role="grid" aria-label={label} aria-describedby={helpId} className="w-full min-w-[620px] border-collapse text-sm">
                    <thead>
                        <tr className="border-b border-zinc-200 bg-zinc-50/80 text-xs text-zinc-500 dark:border-white/10 dark:bg-white/[0.02] dark:text-zinc-400">
                            {columns.map((column) => (
                                <th key={column.key} scope="col" className={`px-3 py-2.5 font-medium first:pl-5 last:pr-5 ${column.align === "right" ? "text-right" : "text-left"}`}>
                                    {column.label}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((product, rowIndex) => (
                            <tr key={product.id} className="border-b border-zinc-100 last:border-0 dark:border-white/[0.06]">
                                {columns.map((column, colIndex) => {
                                    const isActive = active.row === rowIndex && active.col === colIndex;
                                    const isEditing = isActive && editing;
                                    const dirty = isDirty(rowIndex, column.key);
                                    return (
                                        <td
                                            key={column.key}
                                            ref={(element) => {
                                                const key = `${rowIndex}-${colIndex}`;
                                                if (element) cellRefs.current.set(key, element);
                                                else cellRefs.current.delete(key);
                                            }}
                                            role="gridcell"
                                            tabIndex={isActive && !editing ? 0 : -1}
                                            aria-readonly={column.kind === "readonly" || undefined}
                                            onKeyDown={onCellKeyDown}
                                            onClick={() => move(rowIndex, colIndex)}
                                            onDoubleClick={() => {
                                                move(rowIndex, colIndex);
                                                if (column.kind !== "readonly") {
                                                    typedStart.current = false;
                                                    setDraft(String(product[column.key]));
                                                    setError(null);
                                                    setEditing(true);
                                                }
                                            }}
                                            className={`relative h-11 px-3 outline-none first:pl-5 last:pr-5 ${column.align === "right" ? "text-right tabular-nums" : ""} ${
                                                dirty ? "bg-amber-50/70 dark:bg-amber-400/[0.06]" : ""
                                            } ${isActive ? "z-10 shadow-[inset_0_0_0_2px_theme(colors.indigo.500)]" : ""} text-zinc-800 dark:text-zinc-100`}
                                        >
                                            {dirty && (
                                                <>
                                                    <span className="absolute right-1 top-1 size-1.5 rounded-full bg-amber-500" aria-hidden/>
                                                    <span className="sr-only">Edited, </span>
                                                </>
                                            )}
                                            {isEditing ? (
                                                column.kind === "status" ? (
                                                    <select
                                                        autoFocus
                                                        defaultValue={product.status}
                                                        // Picking with the mouse saves at once; arrow keys only preview until Enter or Tab.
                                                        onChange={(event) => {
                                                            if (arrowChange.current) arrowChange.current = false;
                                                            else commit(event.target.value);
                                                        }}
                                                        onKeyDown={(event) => {
                                                            if (event.key.startsWith("Arrow")) arrowChange.current = true;
                                                            onEditorKeyDown(event);
                                                        }}
                                                        onBlur={(event) => commit(event.target.value)}
                                                        aria-label={`${column.label} for ${product.name}`}
                                                        className="h-8 rounded-md border border-zinc-300 bg-white px-2 text-sm text-zinc-900 outline-none dark:border-white/15 dark:bg-zinc-800 dark:text-zinc-100"
                                                    >
                                                        {statuses.map((status) => (
                                                            <option key={status}>{status}</option>
                                                        ))}
                                                    </select>
                                                ) : (
                                                    <div className="relative">
                                                        <input
                                                            autoFocus
                                                            value={draft}
                                                            inputMode={column.kind === "text" ? "text" : "decimal"}
                                                            onChange={(event) => {
                                                                setDraft(event.target.value);
                                                                setError(null);
                                                            }}
                                                            onKeyDown={onEditorKeyDown}
                                                            onFocus={(event) => {
                                                                // Typing into a cell keeps the caret after the typed key; Enter selects the value.
                                                                const field = event.currentTarget;
                                                                if (typedStart.current) field.setSelectionRange(field.value.length, field.value.length);
                                                                else field.select();
                                                            }}
                                                            onBlur={(event) => (validate(column, event.target.value) ? cancel() : commit(event.target.value))}
                                                            aria-label={`${column.label} for ${product.name}`}
                                                            aria-invalid={Boolean(error)}
                                                            className={`h-8 w-full rounded-md bg-white px-2 text-sm text-zinc-900 outline-none ring-2 dark:bg-zinc-950 dark:text-zinc-100 ${
                                                                column.align === "right" ? "text-right" : ""
                                                            } ${error ? "ring-rose-500" : "ring-transparent"}`}
                                                        />
                                                        {error && (
                                                            <span role="alert" className="absolute left-0 top-full z-20 mt-1.5 whitespace-nowrap rounded-md bg-rose-600 px-2 py-1 text-xs font-medium text-white shadow-lg">
                                                                {error}
                                                            </span>
                                                        )}
                                                    </div>
                                                )
                                            ) : (
                                                renderValue(product, column)
                                            )}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex min-h-14 flex-wrap items-center justify-between gap-3 border-t border-zinc-200 px-5 py-2.5 dark:border-white/10">
                <p id={helpId} className="text-xs text-zinc-500 dark:text-zinc-400">
                    {hint}
                </p>
                <AnimatePresence mode="wait" initial={false}>
                    {changes > 0 ? (
                        <motion.div
                            key="pending"
                            className="flex items-center gap-2"
                            initial={reduceMotion ? {opacity: 0} : {opacity: 0, y: 6}}
                            animate={{opacity: 1, y: 0}}
                            exit={{opacity: 0}}
                        >
                            <span className="text-xs font-medium text-amber-700 dark:text-amber-300" aria-live="polite">
                                {changes} unsaved {changes === 1 ? "change" : "changes"}
                            </span>
                            <button
                                type="button"
                                onClick={() => setRows(saved)}
                                disabled={saving}
                                className="h-8 rounded-lg px-3 text-xs font-medium text-zinc-600 transition hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 disabled:opacity-50 dark:text-zinc-300 dark:hover:bg-white/5"
                            >
                                Discard
                            </button>
                            <button
                                type="button"
                                onClick={save}
                                disabled={saving}
                                className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-indigo-600 px-3 text-xs font-medium text-white transition hover:bg-indigo-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500/60 focus-visible:ring-offset-2 disabled:cursor-wait disabled:opacity-80 dark:focus-visible:ring-offset-zinc-900"
                            >
                                {saving && <span className="size-3 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden/>}
                                {saving ? "Saving" : "Save changes"}
                            </button>
                        </motion.div>
                    ) : (
                        <motion.span
                            key="clean"
                            className="flex items-center gap-1.5 text-xs text-zinc-400 dark:text-zinc-500"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                        >
                            <LuCheck className="size-3.5" aria-hidden/>
                            All changes saved
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

