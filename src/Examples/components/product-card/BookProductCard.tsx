export interface BookProduct {
    title: string;
    image: string;
    /** Genre shown above the title, for example "Biography". */
    category: string;
    author: string;
    price: string;
    /** Small label on the cover, for example "Best". Leave it out to hide the badge. */
    badge?: string;
}

export interface BookProductCardProps {
    product: BookProduct;
    /** Word before the author name. */
    byLabel?: string;
    className?: string;
}

/** A borderless book card with a cover, an optional badge, the genre, the author and the price. */
export const BookProductCard = ({product, byLabel = "By", className = ""}: BookProductCardProps) => (
    <div className={`w-full md:w-[55%] relative rounded-md overflow-hidden ${className}`}>
        {product.badge && (
            <span className="bg-red-500 rounded-sm px-3 py-1 text-[0.9rem] text-white absolute top-3 left-3">{product.badge}</span>
        )}

        <img alt={product.title} src={product.image} className="w-full"/>

        <div className="mt-2">
            <span className="text-gray-400 dark:text-slate-400 text-[0.9rem]">{product.category}</span>
            <h3 className="text-[1.1rem] dark:text-[#abc2d3] font-medium mt-2">{product.title}</h3>
            <p className="text-[0.9rem] dark:text-slate-400 text-gray-400 mt-1">
                {byLabel} {product.author}
            </p>
            <p className="text-[1.1rem] font-semibold mt-1 text-[#0FABCA]">{product.price}</p>
        </div>
    </div>
);
