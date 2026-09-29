import type {ReactNode} from "react";
import {HiArrowRight} from "react-icons/hi";

export interface CategoryOffer {
    title: string;
    image: string;
    imageAlt: string;
    /** Where "Shop now" goes. Without it the link renders as a button that calls `onShop`. */
    href?: string;
    /** Size classes for the image. Defaults fit the large card and the two small cards. */
    imageClassName?: string;
}

export interface CategoryOfferGridProps {
    /** The tall card on the left. */
    featured: CategoryOffer;
    /** The cards stacked on the right, usually two. */
    offers: CategoryOffer[];
    ctaLabel?: string;
    onShop?: (offer: CategoryOffer) => void;
    className?: string;
}

interface ShopLinkProps {
    offer: CategoryOffer;
    label: string;
    onShop?: (offer: CategoryOffer) => void;
}

const shopLinkClass =
    "flex w-max items-center hover:text-[#0FABCA] hover:border-[#0FABCA] dark:text-[#abc2d3] transition-all duration-300 gap-[10px] border-gray-900 text-[0.9rem] mt-2 group border-b";

const ShopLink = ({offer, label, onShop}: ShopLinkProps) => {
    const content: ReactNode = (
        <>
            {label}
            <HiArrowRight className="group-hover:ml-1 transition-all duration-200" aria-hidden/>
        </>
    );
    return offer.href ? (
        <a href={offer.href} onClick={() => onShop?.(offer)} className={shopLinkClass}>{content}</a>
    ) : (
        <button type="button" onClick={() => onShop?.(offer)} className={shopLinkClass}>{content}</button>
    );
};

/** A promo grid with one tall category card and smaller cards beside it, each with a "Shop now" link. */
export const CategoryOfferGrid = ({featured, offers, ctaLabel = "Shop now", onShop, className = ""}: CategoryOfferGridProps) => (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-[15px] w-full sm:w-[80%] min-h-[550px] ${className}`}>
        {/* Tall card that spans both rows */}
        <div className="col-span-1 dark:bg-slate-900 overflow-hidden flex justify-between flex-col rounded-sm row-span-2 bg-[#f2f4f6] h-full py-8">
            <div className="px-8">
                <h4 className="text-[1.5rem] dark:text-[#abc2d3] font-medium text-gray-900">{featured.title}</h4>
                <ShopLink offer={featured} label={ctaLabel} onShop={onShop}/>
            </div>
            <img alt={featured.imageAlt} src={featured.image} className={featured.imageClassName ?? "w-[500px]"}/>
        </div>

        {offers.map((offer) => (
            <div
                key={offer.title}
                className="bg-[#f2f4f6] dark:bg-slate-900 rounded-sm col-span-1 flex justify-between items-center px-4 overflow-hidden"
            >
                <div className="px-6 mt-auto pb-9">
                    <h4 className="text-[1.5rem] dark:text-[#abc2d3] font-medium text-gray-900">{offer.title}</h4>
                    <ShopLink offer={offer} label={ctaLabel} onShop={onShop}/>
                </div>
                <img alt={offer.imageAlt} src={offer.image} className={offer.imageClassName ?? "w-[200px] h-max"}/>
            </div>
        ))}
    </div>
);
