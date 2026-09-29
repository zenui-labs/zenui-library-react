import {useEffect, useId, useMemo, useRef, useState} from "react";
import type {ChangeEvent, KeyboardEvent} from "react";
import {IoIosSearch} from "react-icons/io";
import {GoLinkExternal} from "react-icons/go";

export interface Product {
    id: string | number;
    name: string;
    image: string;
    href: string;
}

export interface ProductSearchBarProps {
    products: Product[];
    /** Search text when controlled. */
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    /** Called when a result is clicked. */
    onSelect?: (product: Product) => void;
    /** Shows the results when the component first renders. */
    defaultOpen?: boolean;
    placeholder?: string;
    /** Label read by screen readers for the search field. */
    inputLabel?: string;
    emptyText?: string;
    /** Longer product names are cut to this many characters. */
    maxNameLength?: number;
    className?: string;
}

const truncate = (text: string, maxLength: number, ellipsis = "...") =>
    text.length <= maxLength ? text : text.slice(0, maxLength - ellipsis.length) + ellipsis;

/** A search field that filters a product list by name and shows the matches in a dropdown. */
export const ProductSearchBar = ({
    products,
    value,
    defaultValue = "",
    onChange,
    onSelect,
    defaultOpen = false,
    placeholder = "Search...",
    inputLabel = "Search products",
    emptyText = "No products match your search.",
    maxNameLength = 60,
    className = "",
}: ProductSearchBarProps) => {
    const resultsId = useId();
    const rootRef = useRef<HTMLDivElement>(null);
    const [innerValue, setInnerValue] = useState(defaultValue);
    const [open, setOpen] = useState(defaultOpen);
    const query = value ?? innerValue;

    const filteredProducts = useMemo(() => {
        const search = query.trim().toLowerCase();
        return search ? products.filter((product) => product.name.toLowerCase().includes(search)) : products;
    }, [products, query]);

    // Closes the results when a click lands outside this search bar.
    useEffect(() => {
        const handleClick = (event: MouseEvent) => {
            if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
        };
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, []);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (value === undefined) setInnerValue(event.target.value);
        onChange?.(event.target.value);
        setOpen(true);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Escape") setOpen(false);
    };

    return (
        <div ref={rootRef} className={`relative w-full sm:w-[80%] ${className}`}>
            <input
                type="text"
                value={query}
                onChange={handleChange}
                onClick={() => setOpen(true)}
                onFocus={() => setOpen(true)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                aria-label={inputLabel}
                aria-expanded={open}
                aria-controls={resultsId}
                className="px-4 py-2 dark:border-slate-700 dark:bg-slate-900 dark:text-[#abc2d3] dark:placeholder:text-slate-500 border border-[#e5eaf2] rounded-md w-full pl-[40px] outline-none focus:border-[#3B9DF8]"
            />
            <IoIosSearch className="absolute dark:text-slate-500 top-[9px] left-2 text-[1.5rem] text-[#adadad]" aria-hidden/>

            <div
                id={resultsId}
                aria-hidden={!open}
                className={`${open ? "opacity-100 h-auto translate-y-0 mt-2" : "translate-y-[-10px] opacity-0 h-0 invisible"} bg-white shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] w-full transition-all duration-500 dark:bg-slate-900 overflow-hidden flex flex-col rounded-md`}
            >
                {filteredProducts.map((product) => (
                    <a
                        key={product.id}
                        href={product.href}
                        title={product.name}
                        onClick={() => onSelect?.(product)}
                        className="flex items-center justify-between w-full px-6 py-4 hover:bg-gray-50 dark:hover:bg-slate-800/50 cursor-pointer rounded-md"
                    >
                        <span className="flex items-center gap-[10px]">
                            <img src={product.image} alt="" className="w-[30px] h-[30px] object-cover"/>
                            <span className="text-[0.9rem] dark:text-[#abc2d3] sm:text-[1.1rem] text-gray-700 font-[400]">
                                {truncate(product.name, maxNameLength)}
                            </span>
                        </span>
                        <GoLinkExternal className="text-[1.3rem] dark:text-slate-500 text-gray-400 shrink-0" aria-hidden/>
                    </a>
                ))}

                {!filteredProducts.length && (
                    <p role="status" className="text-[0.9rem] py-3 dark:text-slate-500 text-[#a0a0a0] text-center">{emptyText}</p>
                )}
            </div>
        </div>
    );
};
