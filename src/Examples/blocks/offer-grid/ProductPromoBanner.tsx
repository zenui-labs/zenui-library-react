import {HiArrowRight} from "react-icons/hi";

export interface ProductPromoBannerProps {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    /** Price shown in the round badge over the image, for example "$1999". */
    price: string;
    /** Blue label above the title, for example "SAVE UP TO $200.00". */
    badge?: string;
    ctaLabel?: string;
    /** Where the button goes. Without it the button calls `onShop`. */
    href?: string;
    onShop?: () => void;
    className?: string;
}

/** A wide promotion banner for a single product with a savings badge, a price bubble and a shop button. */
export const ProductPromoBanner = ({
    title,
    description,
    image,
    imageAlt,
    price,
    badge,
    ctaLabel = "Shop now",
    href,
    onShop,
    className = "",
}: ProductPromoBannerProps) => {
    const ctaClass =
        "bg-[#FA8232] flex w-max items-center gap-[10px] py-2 px-4 rounded-sm text-white text-[0.9rem] mt-3 uppercase group";
    const ctaContent = (
        <>
            {ctaLabel}
            <HiArrowRight className="group-hover:ml-1 transition-all duration-200" aria-hidden/>
        </>
    );

    return (
        <div
            className={`flex flex-col lg:flex-row justify-between items-center w-full lg:py-4 py-6 px-6 lg:px-8 gap-[20px] lg:gap-0 rounded-md bg-[#FFE7D6] ${className}`}
        >
            <div className="w-full lg:w-[30%] lg:pl-6">
                {badge && <span className="bg-[#2DA5F3] rounded-sm py-1.5 px-3 text-[0.8rem] font-normal text-white">{badge}</span>}
                <h4 className="text-[1.7rem] lg:text-[2rem] mt-2 font-semibold text-gray-800">{title}</h4>
                <p className="text-[1rem] mt-2 lg:mt-3 text-gray-700">{description}</p>
                {href ? (
                    <a href={href} onClick={onShop} className={ctaClass}>{ctaContent}</a>
                ) : (
                    <button type="button" onClick={onShop} className={ctaClass}>{ctaContent}</button>
                )}
            </div>

            <div className="relative">
                <p className="bg-[#FFCEAD] text-gray-900 p-4 rounded-full w-[80px] h-[80px] flex items-center justify-center font-medium border-4 border-white absolute top-1 lg:top-3 -left-3">
                    {price}
                </p>
                <img alt={imageAlt} src={image} className="w-[350px] rounded-l-md"/>
            </div>
        </div>
    );
};
