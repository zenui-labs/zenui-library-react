import {useState, type ComponentType} from "react";
import {FiArrowUpRight} from "react-icons/fi";
import {RiHeartAddLine, RiHeartFill} from "react-icons/ri";

export interface DealPerk {
    label: string;
    icon: ComponentType<{className?: string}>;
}

export interface GadgetDeal {
    brand: string;
    /** Full product name, clamped to two lines. */
    description: string;
    image: string;
    price: string;
    /** Discount shown next to the price, for example "35% off". */
    discount?: string;
    /** Tab at the top of the card, for example "Best value". Leave it out to hide it. */
    badge?: string;
    /** Short extras under the price, such as free shipping. */
    perks?: DealPerk[];
}

export interface GadgetDealCardProps {
    product: GadgetDeal;
    /** When set, the deal button is a link to this URL. */
    href?: string;
    onViewDeal?: () => void;
    /** Whether the heart is filled (controlled). */
    favorite?: boolean;
    defaultFavorite?: boolean;
    onFavoriteChange?: (favorite: boolean) => void;
    viewDealLabel?: string;
    addToFavoritesLabel?: string;
    removeFromFavoritesLabel?: string;
    className?: string;
}

// Uses the prop when it is set, otherwise keeps the value in local state.
function useControllableState<T>(value: T | undefined, defaultValue: T, onChange?: (next: T) => void) {
    const [internal, setInternal] = useState<T>(defaultValue);
    const current = value !== undefined ? value : internal;
    const setValue = (next: T) => {
        if (value === undefined) setInternal(next);
        onChange?.(next);
    };
    return [current, setValue] as const;
}

const DEAL_CLASS =
    "py-[9px] px-4 text-white rounded-2xl grow justify-center flex items-center gap-[0.5rem] hover:bg-[#01849b] text-[1rem] bg-[#0FABCA] transition-all duration-200";

/** A deal card with a badge, the brand, a discount, perks such as free shipping, a deal button and a favorite toggle. */
export const GadgetDealCard = ({
    product,
    href,
    onViewDeal,
    favorite,
    defaultFavorite = false,
    onFavoriteChange,
    viewDealLabel = "View deal",
    addToFavoritesLabel = "Add to favorites",
    removeFromFavoritesLabel = "Remove from favorites",
    className = "",
}: GadgetDealCardProps) => {
    const [isFavorite, setIsFavorite] = useControllableState(favorite, defaultFavorite, onFavoriteChange);

    const dealContent = (
        <>
            {viewDealLabel}
            <FiArrowUpRight className="text-[1.3rem]" aria-hidden/>
        </>
    );

    return (
        <div className={`border border-gray-300 dark:border-slate-700 w-full md:w-[60%] relative rounded-2xl overflow-hidden ${className}`}>
            {product.badge && (
                <span className="bg-red-500 rounded-b-md px-3 py-1 text-[0.9rem] text-white absolute top-0 left-4">{product.badge}</span>
            )}

            <img alt={product.description} src={product.image} className="w-full mt-6"/>

            <div className="p-4 pt-0">
                <h3 className="text-[1.4rem] dark:text-[#abc2d3] font-semibold mb-1 mt-2">{product.brand}</h3>

                <span className="text-[0.9rem] dark:text-slate-400 font-normal text-gray-500 line-clamp-2">{product.description}</span>

                {/* price & discount */}
                <div className="flex items-center mt-3 gap-[15px]">
                    <p className="text-[1.150rem] dark:text-[#abc2d3] font-semibold mt-1">{product.price}</p>
                    {product.discount && (
                        <p className="border text-green-600 text-[0.8rem] border-green-400 px-2 py-1 rounded-md">{product.discount}</p>
                    )}
                </div>

                {/* perks */}
                {product.perks && product.perks.length > 0 && (
                    <div className="flex items-center border-t dark:border-slate-700 border-gray-300 mt-3 gap-[15px] pt-[5px]">
                        {product.perks.map(({label, icon: Icon}) => (
                            <div key={label} className="flex items-center gap-[6px] dark:text-slate-400 text-gray-400 text-[0.9rem]">
                                <Icon/>
                                <p>{label}</p>
                            </div>
                        ))}
                    </div>
                )}

                {/* actions */}
                <div className="flex items-center justify-between mt-7 gap-[15px]">
                    {href ? (
                        <a href={href} onClick={onViewDeal} className={DEAL_CLASS}>
                            {dealContent}
                        </a>
                    ) : (
                        <button type="button" onClick={onViewDeal} className={DEAL_CLASS}>
                            {dealContent}
                        </button>
                    )}
                    <button
                        type="button"
                        aria-pressed={isFavorite}
                        aria-label={isFavorite ? removeFromFavoritesLabel : addToFavoritesLabel}
                        onClick={() => setIsFavorite(!isFavorite)}
                        className="p-[9px] rounded-full border-2 border-[#0FABCA]"
                    >
                        {isFavorite ? (
                            <RiHeartFill className="text-[#0FABCA] text-[1.3rem]"/>
                        ) : (
                            <RiHeartAddLine className="text-[#0FABCA] text-[1.3rem]"/>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};
