import {useEffect, useId, useMemo, useRef, useState} from "react";
import type {ComponentType, KeyboardEvent} from "react";
import {IoCheckmark, IoEyeOutline, IoSearch} from "react-icons/io5";
import {IoIosArrowDown, IoMdHeartEmpty} from "react-icons/io";
import {HiArrowsUpDown} from "react-icons/hi2";
import {FaStar} from "react-icons/fa";

export interface FilterProduct {
    id: string;
    name: string;
    price: number;
    /** Average rating from 0 to 5. */
    rating: number;
    reviews?: number;
    image: string;
    brand: string;
    /** Category names, matched against the category checkboxes. */
    categories: string[];
    /** Tag names, matched against the popular tag buttons. */
    tags?: string[];
}

export interface PriceRange {
    label: string;
    min: number;
    /** Leave out for no upper limit. */
    max?: number;
}

export interface SortOption {
    label: string;
    /** Sort function for this option. Leave out to keep the order of the products prop. */
    compare?: (a: FilterProduct, b: FilterProduct) => number;
}

export interface ProductFilters {
    search: string;
    categories: string[];
    brands: string[];
    tags: string[];
    minPrice: number;
    /** null means no upper limit. */
    maxPrice: number | null;
    /** Label of the selected sort option. */
    sort: string;
}

export interface ProductFilterPageProps {
    products: FilterProduct[];
    categories: string[];
    brands: string[];
    tags: string[];
    priceRanges: PriceRange[];
    sortOptions?: SortOption[];
    /** Highest value on the price slider. Defaults to the highest product price, rounded up to the next 100. */
    sliderMax?: number;
    formatPrice?: (price: number) => string;
    /** Runs whenever a filter or the sort order changes, for example to load results from a server. */
    onFiltersChange?: (filters: ProductFilters) => void;
    onWishlist?: (product: FilterProduct) => void;
    onCompare?: (product: FilterProduct) => void;
    onQuickView?: (product: FilterProduct) => void;
    categoryTitle?: string;
    priceTitle?: string;
    brandsTitle?: string;
    tagsTitle?: string;
    searchPlaceholder?: string;
    sortLabel?: string;
    emptyMessage?: string;
    className?: string;
}

const defaultSortOptions: SortOption[] = [
    {label: "Featured"},
    {label: "Most popular", compare: (a, b) => (b.reviews ?? 0) - (a.reviews ?? 0)},
    {label: "Price: low to high", compare: (a, b) => a.price - b.price},
    {label: "Price: high to low", compare: (a, b) => b.price - a.price},
    {label: "Highest rated", compare: (a, b) => b.rating - a.rating},
];

const defaultFormatPrice = (price: number) => `$${price}`;

const tooltipStyles =
    "absolute top-[-50px] transform translate-x-[-50%] left-[50%] w-max py-[7px] px-[20px] rounded-md bg-gray-800 text-[0.9rem] text-white font-[400] transition-all duration-200 pointer-events-none opacity-0 z-[-1] translate-y-[20px] group-hover/action:opacity-100 group-hover/action:z-[100] group-hover/action:translate-y-0 group-focus-within/action:opacity-100 group-focus-within/action:z-[100] group-focus-within/action:translate-y-0";

interface ActionButtonProps {
    label: string;
    icon: ComponentType<{className?: string}>;
    onClick?: () => void;
    /** Start offset and duration of the slide-in, so the three buttons arrive one after another. */
    motionClassName: string;
}

const ActionButton = ({label, icon: Icon, onClick, motionClassName}: ActionButtonProps) => (
    <div
        className={`group/action relative w-max group-hover:translate-y-0 group-focus-within:translate-y-0 transition-all opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 ${motionClassName}`}
    >
        <button
            type="button"
            aria-label={label}
            onClick={onClick}
            className="block rounded-full bg-white p-2 text-gray-800 hover:bg-[#0FABCA] hover:text-white focus-visible:bg-[#0FABCA] focus-visible:text-white outline-none transition-all duration-200 cursor-pointer"
        >
            <Icon className="text-[1.3rem]"/>
        </button>

        {/* tooltip */}
        <span className={tooltipStyles} aria-hidden>
            {label}
            <span className="w-[8px] h-[8px] bg-gray-800 rotate-[45deg] absolute left-[50%] transform translate-x-[-50%] bottom-[-10%]"/>
        </span>
    </div>
);

export interface ProductFilterCardProps {
    product: FilterProduct;
    formatPrice?: (price: number) => string;
    onWishlist?: (product: FilterProduct) => void;
    onCompare?: (product: FilterProduct) => void;
    onQuickView?: (product: FilterProduct) => void;
    className?: string;
}

/** A product card with wishlist, compare and quick view buttons that slide in on hover or keyboard focus. */
export const ProductFilterCard = ({
    product,
    formatPrice = defaultFormatPrice,
    onWishlist,
    onCompare,
    onQuickView,
    className = "",
}: ProductFilterCardProps) => {
    const filledStars = Math.round(product.rating);

    return (
        <div className={`border border-gray-200 w-full relative rounded-md overflow-hidden ${className}`}>
            {/* product image */}
            <div className="group relative overflow-hidden cursor-pointer">
                <img alt={product.name} src={product.image} className="w-[240px] mx-auto mt-5"/>

                {/* action buttons */}
                <div className="absolute bg-[rgb(0,0,0,0.3)] z-30 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-all duration-300 bottom-0 left-0 flex items-center justify-center w-full h-full">
                    <div className="flex items-center gap-[15px] justify-center">
                        <ActionButton
                            label="Wishlist"
                            icon={IoMdHeartEmpty}
                            onClick={() => onWishlist?.(product)}
                            motionClassName="translate-y-[50px] duration-300"
                        />
                        <ActionButton
                            label="Compare"
                            icon={HiArrowsUpDown}
                            onClick={() => onCompare?.(product)}
                            motionClassName="translate-y-[80px] duration-500"
                        />
                        <ActionButton
                            label="Quick view"
                            icon={IoEyeOutline}
                            onClick={() => onQuickView?.(product)}
                            motionClassName="translate-y-[110px] duration-700"
                        />
                    </div>
                </div>
            </div>

            {/* product details */}
            <div className="p-4 pt-6">
                <div className="flex items-center gap-[10px]">
                    <div className="flex items-center space-x-1" role="img" aria-label={`Rated ${product.rating} out of 5`}>
                        {Array.from({length: 5}, (_, index) => (
                            <FaStar
                                key={index}
                                aria-hidden
                                className={index < filledStars ? "text-[#FA8232]" : "text-gray-300"}
                                size={15}
                            />
                        ))}
                    </div>
                    <span className="text-[0.8rem] text-gray-500">({product.rating})</span>
                </div>

                <h3 className="text-[1.1rem] text-gray-900 font-medium mb-2 mt-2">{product.name}</h3>
                <p className="text-[1.150rem] font-medium text-[#0FABCA] mt-1">{formatPrice(product.price)}</p>
            </div>
        </div>
    );
};

interface SortSelectProps {
    options: SortOption[];
    value: string;
    onChange: (label: string) => void;
}

// A searchable dropdown for the sort order.
const SortSelect = ({options, value, onChange}: SortSelectProps) => {
    const listId = useId();
    const rootRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const handleMouseDown = (event: MouseEvent) => {
            if (rootRef.current && !rootRef.current.contains(event.target as Node)) setIsOpen(false);
        };
        document.addEventListener("mousedown", handleMouseDown);
        return () => document.removeEventListener("mousedown", handleMouseDown);
    }, []);

    const filteredOptions = options.filter((option) => option.label.toLowerCase().includes(search.toLowerCase()));

    const choose = (label: string) => {
        onChange(label);
        setIsOpen(false);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Escape") setIsOpen(false);
    };

    return (
        <div ref={rootRef} className="relative flex-1" onKeyDown={handleKeyDown}>
            <input
                type="text"
                role="combobox"
                aria-label="Sort by"
                aria-expanded={isOpen}
                aria-controls={listId}
                aria-autocomplete="list"
                placeholder="Search..."
                value={isOpen ? search : value}
                onChange={(event) => setSearch(event.target.value)}
                onFocus={() => {
                    setSearch("");
                    setIsOpen(true);
                }}
                className="w-full border border-gray-300 rounded-md px-3 py-2 pr-10 text-gray-800 focus:outline-none"
            />

            <IoIosArrowDown
                aria-hidden
                className={`${isOpen ? "rotate-[180deg]" : "rotate-0"} pointer-events-none transition-all duration-300 text-[1.3rem] absolute top-[50%] transform translate-y-[-50%] right-3 text-gray-500`}
            />

            {isOpen && (
                <div
                    id={listId}
                    role="listbox"
                    className="absolute left-0 w-full min-w-[200px] mt-1 border border-gray-200 rounded-md bg-white shadow-lg z-50"
                >
                    <div className="w-full overflow-auto">
                        {filteredOptions.map((option) => (
                            <button
                                key={option.label}
                                type="button"
                                role="option"
                                aria-selected={option.label === value}
                                onClick={() => choose(option.label)}
                                className="w-full text-left text-gray-800 cursor-pointer px-3 py-2 flex items-center hover:bg-gray-200"
                            >
                                <IoCheckmark
                                    aria-hidden
                                    className={`${option.label === value ? "scale-[1] opacity-100" : "scale-[0.5] opacity-0"} mr-2 transition-all duration-300 w-6 h-6 shrink-0 text-[#0FABCA]`}
                                />
                                {option.label}
                            </button>
                        ))}

                        {filteredOptions.length === 0 && (
                            <p className="text-center text-[0.9rem] text-gray-500 py-8">No options found</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

const toggle = (list: string[], value: string) =>
    list.includes(value) ? list.filter((item) => item !== value) : [...list, value];

/** A product listing with category, price, brand and tag filters in a sidebar, plus search and sorting above the grid. */
export const ProductFilterPage = ({
    products,
    categories,
    brands,
    tags,
    priceRanges,
    sortOptions = defaultSortOptions,
    sliderMax,
    formatPrice = defaultFormatPrice,
    onFiltersChange,
    onWishlist,
    onCompare,
    onQuickView,
    categoryTitle = "Category",
    priceTitle = "Price range",
    brandsTitle = "Popular brands",
    tagsTitle = "Popular tags",
    searchPlaceholder = "Search...",
    sortLabel = "Sort by:",
    emptyMessage = "No products match these filters.",
    className = "",
}: ProductFilterPageProps) => {
    const uid = useId();
    const [filters, setFilters] = useState<ProductFilters>({
        search: "",
        categories: [],
        brands: [],
        tags: [],
        minPrice: 0,
        maxPrice: null,
        sort: sortOptions[0]?.label ?? "",
    });

    const update = (patch: Partial<ProductFilters>) => {
        const next = {...filters, ...patch};
        setFilters(next);
        onFiltersChange?.(next);
    };

    const rangeMax = sliderMax ?? Math.max(100, Math.ceil(Math.max(0, ...products.map((p) => p.price)) / 100) * 100);
    const sliderValue = Math.min(filters.maxPrice ?? rangeMax, rangeMax);
    const sliderPercent = (sliderValue / rangeMax) * 100;

    const visibleProducts = useMemo(() => {
        const query = filters.search.trim().toLowerCase();
        const result = products.filter((product) => {
            const searchMatch = product.name.toLowerCase().includes(query);
            const categoryMatch =
                filters.categories.length === 0 || filters.categories.some((category) => product.categories.includes(category));
            const priceMatch =
                product.price >= filters.minPrice && (filters.maxPrice === null || product.price <= filters.maxPrice);
            const brandMatch = filters.brands.length === 0 || filters.brands.includes(product.brand);
            const tagMatch = filters.tags.length === 0 || filters.tags.some((tag) => product.tags?.includes(tag));
            return searchMatch && categoryMatch && priceMatch && brandMatch && tagMatch;
        });
        const compare = sortOptions.find((option) => option.label === filters.sort)?.compare;
        return compare ? [...result].sort(compare) : result;
    }, [products, filters, sortOptions]);

    const isRangeActive = (range: PriceRange) =>
        filters.minPrice === range.min && filters.maxPrice === (range.max ?? null);

    return (
        <section className={`flex flex-col md:flex-row bg-white w-full gap-[20px] p-4 ${className}`}>
            {/* left side */}
            <aside className="w-full md:w-[25%] text-gray-700">
                {/* categories */}
                <h5 className="text-[1.2rem] font-medium text-gray-800 mb-4">{categoryTitle}</h5>
                <div className="flex flex-col gap-[12px]">
                    {categories.map((category) => (
                        <label key={category} className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                className="accent-[#0FABCA]"
                                checked={filters.categories.includes(category)}
                                onChange={() => update({categories: toggle(filters.categories, category)})}
                            />
                            {category}
                        </label>
                    ))}
                </div>

                {/* prices */}
                <div className="border-t border-b border-gray-300 mt-6 py-6">
                    <h5 className="text-[1.2rem] font-medium text-gray-800 mb-4">{priceTitle}</h5>

                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <p className="text-[0.9rem] text-gray-700">{formatPrice(filters.minPrice)}</p>
                            <p className="text-[0.9rem] text-gray-700">{formatPrice(sliderValue)}</p>
                        </div>
                        <div className="relative w-full h-2.5 bg-gray-300 rounded-full cursor-pointer">
                            <input
                                type="range"
                                min={0}
                                max={rangeMax}
                                value={sliderValue}
                                aria-label="Maximum price"
                                onChange={(event) => {
                                    const next = Number(event.target.value);
                                    update({maxPrice: next >= rangeMax ? null : next});
                                }}
                                className="peer absolute w-full h-2.5 top-0 z-20 opacity-0 cursor-pointer"
                            />
                            <div className="absolute top-0 h-2.5 bg-[#0FABCA] rounded-full" style={{width: `${sliderPercent}%`}}/>
                            <div
                                className="absolute top-[50%] w-[22px] h-[22px] transform bg-[#0FABCA] rounded-full -translate-x-1/2 translate-y-[-50%] cursor-pointer transition-transform duration-150 ease-in-out border-2 border-white peer-focus-visible:ring-2 peer-focus-visible:ring-[#0FABCA]/40"
                                style={{left: `${sliderPercent}%`}}
                            />
                        </div>
                    </div>

                    <div className="flex gap-2 mt-5">
                        <input
                            type="number"
                            min={0}
                            placeholder="Min price"
                            aria-label="Minimum price"
                            value={filters.minPrice === 0 ? "" : filters.minPrice}
                            onChange={(event) => update({minPrice: Number(event.target.value) || 0})}
                            className="w-full min-w-0 border border-gray-300 rounded-md px-3 py-1.5 outline-none focus:border-[#0FABCA]"
                        />
                        <input
                            type="number"
                            min={0}
                            placeholder="Max price"
                            aria-label="Maximum price"
                            value={filters.maxPrice === null ? "" : filters.maxPrice}
                            onChange={(event) =>
                                update({maxPrice: event.target.value === "" ? null : Number(event.target.value)})
                            }
                            className="w-full min-w-0 border border-gray-300 rounded-md px-3 py-1.5 outline-none focus:border-[#0FABCA]"
                        />
                    </div>

                    {/* price ranges */}
                    <div className="flex flex-col gap-[12px] mt-[16px]">
                        {priceRanges.map((range) => {
                            const active = isRangeActive(range);
                            return (
                                <label
                                    key={range.label}
                                    className="flex cursor-pointer items-center gap-[8px] text-[1rem] text-gray-800"
                                >
                                    <input
                                        type="radio"
                                        name={`${uid}-price`}
                                        className="peer sr-only"
                                        checked={active}
                                        onChange={() => update({minPrice: range.min, maxPrice: range.max ?? null})}
                                    />
                                    <span
                                        aria-hidden
                                        className={`${active ? "border-[#0FABCA]" : "border-gray-300"} w-[20px] transition-all duration-300 h-[20px] rounded-full border relative peer-focus-visible:ring-2 peer-focus-visible:ring-[#0FABCA]/40`}
                                    >
                                        <span
                                            className={`${active ? "bg-[#0FABCA]" : "bg-transparent"} w-[13px] h-[13.5px] transition-all duration-300 rounded-full absolute top-[50%] transform translate-y-[-50%] left-[50%] translate-x-[-50%]`}
                                        />
                                    </span>
                                    {range.label}
                                </label>
                            );
                        })}
                    </div>
                </div>

                {/* popular brands */}
                <div className="mt-6 border-b border-gray-200 pb-6">
                    <h5 className="text-[1.2rem] font-medium text-gray-800 mb-4">{brandsTitle}</h5>

                    <div className="grid grid-cols-2 gap-[15px]">
                        {brands.map((brand) => (
                            <label key={brand} className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="accent-[#0FABCA]"
                                    checked={filters.brands.includes(brand)}
                                    onChange={() => update({brands: toggle(filters.brands, brand)})}
                                />
                                {brand}
                            </label>
                        ))}
                    </div>
                </div>

                {/* popular tags */}
                <div className="mt-6">
                    <h5 className="text-[1.2rem] font-medium text-gray-800 mb-4">{tagsTitle}</h5>

                    <div className="flex items-center flex-wrap gap-[8px]">
                        {tags.map((tag) => {
                            const active = filters.tags.includes(tag);
                            return (
                                <button
                                    key={tag}
                                    type="button"
                                    aria-pressed={active}
                                    onClick={() => update({tags: toggle(filters.tags, tag)})}
                                    className={`m-1 px-3 py-1 rounded ${active ? "bg-[#0FABCA] text-white" : "bg-gray-200 text-gray-800"}`}
                                >
                                    {tag}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </aside>

            {/* right side */}
            <main className="w-full md:w-[75%]">
                {/* topbar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-[50px] w-full">
                    <div className="w-full relative">
                        <input
                            type="search"
                            placeholder={searchPlaceholder}
                            aria-label="Search products"
                            value={filters.search}
                            onChange={(event) => update({search: event.target.value})}
                            className="border border-[#e5eaf2] py-2 pl-4 pr-[65px] outline-none w-full rounded-md text-gray-800"
                        />

                        <IoSearch
                            aria-hidden
                            className="text-[1.3rem] text-gray-600 absolute top-[50%] transform translate-y-[-50%] right-4"
                        />
                    </div>

                    <div className="flex items-center gap-[10px] shrink-0">
                        <p className="text-[1rem] text-gray-700 font-medium whitespace-nowrap">{sortLabel}</p>
                        <SortSelect options={sortOptions} value={filters.sort} onChange={(sort) => update({sort})}/>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[16px] w-full mt-[20px]">
                    {visibleProducts.map((product) => (
                        <ProductFilterCard
                            key={product.id}
                            product={product}
                            formatPrice={formatPrice}
                            onWishlist={onWishlist}
                            onCompare={onCompare}
                            onQuickView={onQuickView}
                        />
                    ))}
                </div>

                {visibleProducts.length === 0 && (
                    <div className="text-[1rem] text-gray-500 text-center mt-20" role="status">
                        {emptyMessage}
                    </div>
                )}
            </main>
        </section>
    );
};
