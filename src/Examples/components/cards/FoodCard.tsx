import type {ComponentType} from "react";

export interface FoodBadge {
    icon: ComponentType<{className?: string}>;
    /** Accessible name and tooltip, for example "Vegetarian". */
    label: string;
    /** Background and icon colors, for example "bg-green-300 text-green-900". */
    className: string;
}

export interface FoodCardProps {
    title: string;
    description: string;
    imageSrc: string;
    imageAlt: string;
    /** Formatted current price, for example "$13.90". */
    price: string;
    /** Formatted price before the discount. Leave it out to hide it. */
    originalPrice?: string;
    /** Small round icons next to the title, for example vegetarian or spicy. */
    badges?: FoodBadge[];
    ctaLabel?: string;
    onOrder?: () => void;
    className?: string;
}

/** A menu item card with icon badges, a photo, a description, a discounted price and an order button. */
export const FoodCard = ({
    title,
    description,
    imageSrc,
    imageAlt,
    price,
    originalPrice,
    badges = [],
    ctaLabel = "Order now",
    onOrder,
    className = "",
}: FoodCardProps) => (
    <div className={`w-full bg-white dark:bg-slate-800 md:max-w-[80%] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] rounded-md ${className}`}>
        <div className="flex items-center justify-between w-full p-4">
            <h2 className="text-[1.4rem] dark:text-[#abc2d3] font-semibold">{title}</h2>
            <div className="flex items-center gap-[5px]">
                {badges.map(({icon: Icon, label, className: badgeClassName}) => (
                    <span key={label} title={label}>
                        <Icon className={`py-[4px] rounded-full text-[1.5rem] ${badgeClassName}`}/>
                        <span className="sr-only">{label}</span>
                    </span>
                ))}
            </div>
        </div>
        <img src={imageSrc} alt={imageAlt} className="w-full"/>

        <div className="p-4">
            <p className="text-[1rem] dark:text-[#abc2d3]/90 text-gray-700">{description}</p>

            <div className="mt-5 flex sm:flex-row flex-col gap-[15px] sm:gap-[5px] sm:items-center justify-between w-full">
                <p className="text-[1.4rem] dark:text-[#abc2d3] font-semibold flex items-center gap-[4px]">
                    {price}
                    {originalPrice && (
                        <del className="text-[1rem] dark:text-[#abc2d3] text-red-500 font-[300]">{originalPrice}</del>
                    )}
                </p>

                <button
                    type="button"
                    onClick={onOrder}
                    className="py-2 px-6 border dark:border-slate-600 dark:text-[#abc2d3] border-gray-600 text-gray-700 rounded-md"
                >
                    {ctaLabel}
                </button>
            </div>
        </div>
    </div>
);
