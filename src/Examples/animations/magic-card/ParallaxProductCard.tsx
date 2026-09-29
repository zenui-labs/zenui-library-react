import {useRef, useState} from "react";
import type {MouseEvent} from "react";
import {motion} from "framer-motion";
import {FaRegStar, FaStar} from "react-icons/fa";

export interface ProductColor {
    /** Read by screen readers, for example "Red". */
    name: string;
    /** Tailwind background class for the swatch, for example "bg-red-600". */
    className: string;
}

export interface ParallaxProductCardProps {
    name: string;
    imageSrc: string;
    imageAlt: string;
    /** Whole stars out of 5. */
    rating: number;
    sizes: (string | number)[];
    colors: ProductColor[];
    /** Price as it should read, including the currency symbol. */
    price: string;
    /** Currency code shown after the price. */
    currency?: string;
    /** Selected size (controlled). */
    size?: string | number;
    /** Size selected at first when the component is uncontrolled. Defaults to the first size. */
    defaultSize?: string | number;
    onSizeChange?: (size: string | number) => void;
    /** Class name of the selected color (controlled). */
    color?: string;
    /** Color selected at first when the component is uncontrolled. Defaults to the first color. */
    defaultColor?: string;
    onColorChange?: (color: ProductColor) => void;
    sizesLabel?: string;
    colorsLabel?: string;
    actionLabel?: string;
    onAction?: () => void;
    /** How far the content drifts toward the pointer, in px. */
    depth?: number;
    className?: string;
}

/** A product card whose content and image drift with the pointer at different speeds, creating depth. */
export const ParallaxProductCard = ({
    name,
    imageSrc,
    imageAlt,
    rating,
    sizes,
    colors,
    price,
    currency = "USD",
    size,
    defaultSize,
    onSizeChange,
    color,
    defaultColor,
    onColorChange,
    sizesLabel = "Sizes",
    colorsLabel = "Colors",
    actionLabel = "More details",
    onAction,
    depth = 23,
    className = "",
}: ParallaxProductCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [mousePos, setMousePos] = useState({x: 0.5, y: 0.5});
    const [internalSize, setInternalSize] = useState<string | number | undefined>(defaultSize ?? sizes[0]);
    const [internalColor, setInternalColor] = useState<string | undefined>(defaultColor ?? colors[0]?.className);

    const selectedSize = size ?? internalSize;
    const selectedColor = color ?? internalColor;

    const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        setMousePos({
            x: (event.clientX - rect.left) / rect.width,
            y: (event.clientY - rect.top) / rect.height,
        });
    };

    const parallax = isHovered
        ? {x: (mousePos.x - 0.6) * depth, y: (mousePos.y - 0.6) * depth}
        : {x: 0, y: 0};
    const imageZoom = isHovered ? 1.2 : 1;

    const selectSize = (value: string | number) => {
        setInternalSize(value);
        onSizeChange?.(value);
    };

    const selectColor = (value: ProductColor) => {
        setInternalColor(value.className);
        onColorChange?.(value);
    };

    const stars = Math.max(0, Math.min(5, Math.round(rating)));

    return (
        <div
            ref={cardRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onMouseMove={handleMouseMove}
            className={`w-full md:w-80 rounded-[12px] bg-white dark:bg-slate-900 p-5 relative shadow-[0px_0px_10px_0px_rgba(0,0,0,0.07)] ${className}`}
        >
            <motion.div
                animate={{x: parallax.x, y: parallax.y}}
                transition={{type: "spring", stiffness: 120, damping: 12}}
                className="relative z-10"
            >
                <motion.img
                    src={imageSrc}
                    alt={imageAlt}
                    className="w-48 absolute top-[5px] -right-4 -translate-x-1/2 z-10 pointer-events-none"
                    animate={{scale: imageZoom, x: parallax.x, y: parallax.y}}
                    transition={{type: "spring", stiffness: 250, damping: 18}}
                />

                <div className="relative z-20 pt-32">
                    <h2 className="text-xl font-bold dark:text-[#d2e5f5] text-black mb-1">{name}</h2>

                    <div className="flex items-center gap-1" role="img" aria-label={`Rated ${stars} out of 5`}>
                        {Array.from({length: 5}, (_, index) =>
                            index < stars ? (
                                <FaStar key={index} className="text-yellow-400"/>
                            ) : (
                                <FaRegStar key={index} className="text-gray-500"/>
                            ),
                        )}
                    </div>

                    <p className="text-xs font-semibold uppercase dark:text-[#d2e5f5] text-gray-500 mt-4 mb-1.5">{sizesLabel}</p>
                    <div className="flex items-center gap-2" role="group" aria-label={sizesLabel}>
                        {sizes.map((option) => (
                            <button
                                type="button"
                                key={option}
                                onClick={() => selectSize(option)}
                                aria-pressed={selectedSize === option}
                                className={`w-8 h-8 rounded-full cursor-pointer flex items-center justify-center text-sm font-semibold ${
                                    selectedSize === option
                                        ? "bg-[#0FABCA] text-white"
                                        : "bg-gray-100 dark:bg-slate-700 dark:text-slate-400 text-gray-800"
                                }`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>

                    <p className="text-xs font-semibold uppercase text-gray-500 dark:text-[#d2e5f5] mt-4 mb-1.5">{colorsLabel}</p>
                    <div className="flex items-center gap-2 mb-4" role="group" aria-label={colorsLabel}>
                        {colors.map((option) => (
                            <button
                                type="button"
                                key={option.className}
                                onClick={() => selectColor(option)}
                                aria-label={option.name}
                                aria-pressed={selectedColor === option.className}
                                className={`w-5 h-5 outline cursor-pointer outline-offset-1 rounded-full ${
                                    selectedColor === option.className ? "outline-[#0FABCA]" : "outline-transparent"
                                } border-2 border-white dark:border-slate-900 ${option.className}`}
                            />
                        ))}
                    </div>

                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-1">
                            <p className="text-[#0FABCA] font-bold text-lg">{price}</p>
                            {currency && <p className="text-[1rem] dark:text-[#d2e5f5]/80 text-gray-500">{currency}</p>}
                        </div>
                        <button
                            type="button"
                            onClick={onAction}
                            className="bg-[#0FABCA] text-white px-4 py-2 rounded-[8px] text-sm hover:bg-[#0FABCA]/90 transition"
                        >
                            {actionLabel}
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};
