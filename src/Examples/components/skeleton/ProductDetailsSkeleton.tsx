export interface ProductDetailsSkeletonProps {
    /** Number of thumbnail placeholders under the main image. */
    thumbnails?: number;
    /** Text read by screen readers while the product loads. */
    label?: string;
    className?: string;
}

const block = "dark:bg-slate-800 bg-[#e5eaf2]";

/** A placeholder for a product details page: gallery on the left, title, description, price and actions on the right. */
export const ProductDetailsSkeleton = ({
    thumbnails = 2,
    label = "Loading product",
    className = "",
}: ProductDetailsSkeletonProps) => (
    <div role="status" aria-busy="true" className={`flex gap-6 w-full animate-pulse motion-reduce:animate-none ${className}`}>
        <span className="sr-only">{label}</span>

        {/* Main image and thumbnails */}
        <div>
            <div className={`flex-1 h-[300px] ${block}`}/>
            <div className="flex gap-3 mt-3">
                {Array.from({length: thumbnails}, (_, index) => (
                    <div key={index} className={`w-[130px] h-[100px] ${block}`}/>
                ))}
            </div>
        </div>

        <div className="flex flex-col gap-4 w-full">
            {/* Title */}
            <div className={`w-[100%] h-[35px] ${block}`}/>
            {/* Description */}
            <div className={`w-[100%] h-[200px] ${block}`}/>
            {/* Price */}
            <div className={`w-[30%] h-[30px] ${block}`}/>
            {/* Quantity and wishlist */}
            <div className="flex items-center justify-between w-full">
                <div className={`w-[30%] h-[40px] ${block}`}/>
                <div className={`w-[40px] h-[40px] rounded-full ${block}`}/>
            </div>
            {/* Add to cart */}
            <div className={`w-[35%] h-[40px] ${block}`}/>
        </div>
    </div>
);
