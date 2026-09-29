import {useState, type ComponentType} from "react";
import {FaStar} from "react-icons/fa";
import {HiArrowsUpDown} from "react-icons/hi2";
import {IoMdHeartEmpty} from "react-icons/io";
import {IoEyeOutline} from "react-icons/io5";

export interface GadgetProduct {
    name: string;
    image: string;
    price: string;
    /** Label in the top left corner, for example "HOT". Leave it out to hide it. */
    badge?: string;
    /** Star rating from 1 to 5. */
    rating: number;
    /** Shown in parentheses after the stars, for example the review count. */
    ratingNote?: string;
}

export interface GadgetQuickViewCardLabels {
    wishlist: string;
    compare: string;
    quickView: string;
}

export interface GadgetQuickViewCardProps {
    product: GadgetProduct;
    onWishlist?: () => void;
    onCompare?: () => void;
    onQuickView?: () => void;
    onRate?: (rating: number) => void;
    labels?: Partial<GadgetQuickViewCardLabels>;
    className?: string;
}

const DEFAULT_LABELS: GadgetQuickViewCardLabels = {
    wishlist: "Wishlist",
    compare: "Compare",
    quickView: "Quick view",
};

interface QuickActionProps {
    label: string;
    icon: ComponentType<{className?: string}>;
    /** Start offset and duration, so the three buttons rise one after another. */
    motionClassName: string;
    onClick?: () => void;
}

const QuickAction = ({label, icon: Icon, motionClassName, onClick}: QuickActionProps) => {
    const [tooltipVisible, setTooltipVisible] = useState(false);

    return (
        <div
            onMouseEnter={() => setTooltipVisible(true)}
            onMouseLeave={() => setTooltipVisible(false)}
            className={`relative w-max group-hover:translate-y-0 group-focus-within:translate-y-0 transition-all opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 ${motionClassName}`}
        >
            <button
                type="button"
                aria-label={label}
                onClick={onClick}
                onFocus={() => setTooltipVisible(true)}
                onBlur={() => setTooltipVisible(false)}
                className="block rounded-full bg-white p-2 hover:bg-[#0FABCA] hover:text-white transition-all duration-200 cursor-pointer"
            >
                <Icon className="text-[1.3rem]"/>
            </button>

            {/* tooltip */}
            <p
                aria-hidden
                className={`${tooltipVisible ? "opacity-100 z-[100] translate-y-0" : "opacity-0 z-[-1] translate-y-[20px]"} absolute top-[-50px] transform translate-x-[-50%] left-[50%] w-max py-[7px] px-[20px] rounded-md bg-gray-800 text-[0.9rem] text-white font-[400] transition-all duration-200`}
            >
                {label}
                <span className="w-[8px] h-[8px] bg-gray-800 rotate-[45deg] absolute left-[50%] transform translate-x-[-50%] bottom-[-10%]"/>
            </p>
        </div>
    );
};

/** A gadget card whose image dims on hover and shows wishlist, compare and quick view buttons with tooltips. */
export const GadgetQuickViewCard = ({
    product,
    onWishlist,
    onCompare,
    onQuickView,
    onRate,
    labels,
    className = "",
}: GadgetQuickViewCardProps) => {
    const text = {...DEFAULT_LABELS, ...labels};
    const [rating, setRating] = useState(product.rating);

    const handleRate = (value: number) => {
        setRating(value);
        onRate?.(value);
    };

    return (
        <div className={`border border-gray-300 dark:border-slate-700 w-full md:w-[60%] relative rounded-2xl overflow-hidden ${className}`}>
            {product.badge && (
                <span className="bg-red-500 rounded-sm px-3 py-1 z-10 text-[0.9rem] text-white absolute top-3 left-3">{product.badge}</span>
            )}

            {/* image with hover actions */}
            <div className="group relative overflow-hidden cursor-pointer">
                <img alt={product.name} src={product.image} className="w-[240px] mx-auto mt-5"/>

                <div className="absolute bg-[rgb(0,0,0,0.3)] z-30 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-all duration-300 bottom-0 left-0 flex items-center justify-center w-full h-full">
                    <div className="flex items-center gap-[15px] justify-center">
                        <QuickAction
                            label={text.wishlist}
                            icon={IoMdHeartEmpty}
                            motionClassName="translate-y-[50px] duration-300"
                            onClick={onWishlist}
                        />
                        <QuickAction
                            label={text.compare}
                            icon={HiArrowsUpDown}
                            motionClassName="translate-y-[80px] duration-500"
                            onClick={onCompare}
                        />
                        <QuickAction
                            label={text.quickView}
                            icon={IoEyeOutline}
                            motionClassName="translate-y-[110px] duration-700"
                            onClick={onQuickView}
                        />
                    </div>
                </div>
            </div>

            <div className="p-4 pt-6">
                <div className="flex items-center gap-[10px]">
                    <div className="flex items-center space-x-1" role="group" aria-label={`Rated ${rating} out of 5`}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                aria-label={`Rate ${star} out of 5`}
                                onClick={() => handleRate(star)}
                                className="flex cursor-pointer"
                            >
                                <FaStar className={star <= rating ? "text-[#FA8232]" : "text-gray-300"} size={15}/>
                            </button>
                        ))}
                    </div>
                    {product.ratingNote && (
                        <span className="text-[0.8rem] dark:text-slate-400 text-gray-500">({product.ratingNote})</span>
                    )}
                </div>

                <h3 className="text-[1.1rem] dark:text-[#abc2d3] text-gray-900 font-medium mb-2 mt-2">{product.name}</h3>
                <p className="text-[1.150rem] font-medium text-[#0FABCA] mt-1">{product.price}</p>
            </div>
        </div>
    );
};
