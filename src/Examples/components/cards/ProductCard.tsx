import {useState} from "react";
import {BsEye, BsThreeDotsVertical} from "react-icons/bs";
import {FaHeart} from "react-icons/fa";
import {HiMiniShare} from "react-icons/hi2";
import {BiLike} from "react-icons/bi";

export interface ProductCardProps {
    name: string;
    imageSrc: string;
    imageAlt: string;
    description: string;
    /** Formatted price, for example "$25". */
    price: string;
    views: number;
    likes: number;
    priceLabel?: string;
    addToCartLabel?: string;
    /** Controlled favorite state. Leave it out to let the card manage its own state. */
    favorite?: boolean;
    defaultFavorite?: boolean;
    onFavoriteChange?: (favorite: boolean) => void;
    onAddToCart?: () => void;
    onShare?: () => void;
    onMoreClick?: () => void;
    className?: string;
}

/** A product card with an image, view and like counts, a price, favorite and share buttons, and an add to cart button. */
export const ProductCard = ({
    name,
    imageSrc,
    imageAlt,
    description,
    price,
    views,
    likes,
    priceLabel = "Price",
    addToCartLabel = "Add to cart",
    favorite,
    defaultFavorite = false,
    onFavoriteChange,
    onAddToCart,
    onShare,
    onMoreClick,
    className = "",
}: ProductCardProps) => {
    const [internalFavorite, setInternalFavorite] = useState(defaultFavorite);
    const isFavorite = favorite ?? internalFavorite;

    const toggleFavorite = () => {
        if (favorite === undefined) setInternalFavorite(!isFavorite);
        onFavoriteChange?.(!isFavorite);
    };

    return (
        <div className={`w-full md:w-[70%] shadow-lg dark:bg-slate-800 bg-white rounded ${className}`}>
            <img src={imageSrc} alt={imageAlt} className="w-full h-64 object-cover"/>
            <div className="flex w-full justify-between items-center p-4">
                <h2 className="font-semibold dark:text-[#abc2d3] text-3xl">{name}</h2>
                <button type="button" aria-label="More options" onClick={onMoreClick} className="rounded-full">
                    <BsThreeDotsVertical className="text-[#424242] dark:text-[#abc2d3] dark:hover:bg-slate-900/60 rounded-full text-[2.5rem] p-2 hover:bg-[#ececec] cursor-pointer"/>
                </button>
            </div>

            <div className="text-[#424242] dark:text-[#abc2d3] p-4">
                <div className="flex flex-row">
                    <span className="flex flex-row">
                        <BsEye className="text-2xl p-1" aria-hidden/>
                        <span className="sr-only">Views:</span> {views}
                    </span>
                    <span className="flex flex-row">
                        <BiLike className="text-2xl p-1" aria-hidden/>
                        <span className="sr-only">Likes:</span> {likes}
                    </span>
                </div>
                <p>{description}</p>
            </div>

            <div className="flex items-center justify-between w-full p-4">
                <div className="flex flex-col items-center gap-4">
                    <p className="text-[#424242] dark:text-[#abc2d3] text-[0.9rem]">
                        {priceLabel}: {price}
                    </p>
                    <div className="flex flex-row gap-5">
                        <button
                            type="button"
                            aria-label="Favorite"
                            aria-pressed={isFavorite}
                            onClick={toggleFavorite}
                            className={`${
                                isFavorite ? "text-[#ff3d3d]" : "text-[#424242] dark:text-[#abc2d3]"
                            } text-[1.4rem] cursor-pointer`}
                        >
                            <FaHeart/>
                        </button>
                        <button
                            type="button"
                            aria-label="Share"
                            onClick={onShare}
                            className="text-[#424242] dark:text-[#abc2d3] text-[1.4rem] cursor-pointer"
                        >
                            <HiMiniShare/>
                        </button>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={onAddToCart}
                    className="p-3 rounded dark:bg-slate-900 dark:border-slate-700 border bg-black text-white hover:bg-blue-700 hover:text-white"
                >
                    {addToCartLabel}
                </button>
            </div>
        </div>
    );
};
