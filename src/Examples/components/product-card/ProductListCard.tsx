export interface ListProduct {
    name: string;
    image: string;
    price: string;
}

export interface ProductListCardProps {
    product: ListProduct;
    className?: string;
}

/** A horizontal bordered card for product lists: image on the left, name and price on the right. Stacks on small screens. */
export const ProductListCard = ({product, className = ""}: ProductListCardProps) => (
    <div className={`w-full md:w-[80%] border dark:border-slate-700 border-gray-300 rounded-md px-4 flex flex-col md:flex-row md:items-center md:gap-[10px] ${className}`}>
        <img alt={product.name} src={product.image} className="w-[120px]"/>

        <div className="pb-4 md:pb-0">
            <h3 className="text-[1.1rem] dark:text-[#abc2d3] font-medium line-clamp-2">{product.name}</h3>
            <p className="text-[1rem] font-medium text-[#0FABCA] mt-1">{product.price}</p>
        </div>
    </div>
);
