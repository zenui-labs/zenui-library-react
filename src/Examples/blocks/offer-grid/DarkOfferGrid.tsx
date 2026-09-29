export interface DarkOffer {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    /** Where "Shop now" goes. Without it the link renders as a button that calls `onShop`. */
    href?: string;
    /** Size classes for the image, for example "w-[120px]". Each slot has its own default. */
    imageClassName?: string;
}

export interface DarkOfferGridProps {
    /** The large tile on the left. */
    featured: DarkOffer;
    /** The wide tile at the top right. */
    secondary: DarkOffer;
    /** Small tiles under the wide tile, usually two. */
    offers: DarkOffer[];
    ctaLabel?: string;
    onShop?: (offer: DarkOffer) => void;
    className?: string;
}

interface ShopLinkProps {
    offer: DarkOffer;
    label: string;
    spacing: string;
    onShop?: (offer: DarkOffer) => void;
}

const ShopLink = ({offer, label, spacing, onShop}: ShopLinkProps) => {
    const className = `inline-block w-max text-[#FAFAFA] font-[300] hover:text-[#0FABCA] hover:border-[#0FABCA] ${spacing} transition-all duration-300 border-[#FAFAFA] text-[0.8rem] group border-b`;
    return offer.href ? (
        <a href={offer.href} onClick={() => onShop?.(offer)} className={className}>{label}</a>
    ) : (
        <button type="button" onClick={() => onShop?.(offer)} className={className}>{label}</button>
    );
};

/** A dark promo grid with a large product tile, a wide collection tile and small tiles below. */
export const DarkOfferGrid = ({featured, secondary, offers, ctaLabel = "Shop now", onShop, className = ""}: DarkOfferGridProps) => (
    <div className={`grid grid-cols-1 lg:grid-cols-4 gap-[15px] w-full sm:w-[80%] min-h-[400px] ${className}`}>
        <div className="col-span-1 lg:col-span-2 overflow-hidden flex justify-between flex-col rounded-sm row-span-1 lg:row-span-2 h-[170px] bg-black lg:h-full py-8 relative">
            <div className="px-8 absolute bottom-8 z-20 w-full lg:w-[70%]">
                <h4 className="text-[1.1rem] font-medium text-white">{featured.title}</h4>
                <p className="text-[0.8rem] mt-3 text-[#FAFAFA] font-[300]">{featured.description}</p>
                <ShopLink offer={featured} label={ctaLabel} spacing="mt-3" onShop={onShop}/>
            </div>
            <img
                alt={featured.imageAlt}
                src={featured.image}
                className={`${featured.imageClassName ?? "w-[350px]"} absolute bottom-0 left-[50%] transform translate-x-[-50%]`}
            />
        </div>

        <div className="bg-black rounded-sm col-span-1 lg:col-span-2 flex justify-between items-center px-4 overflow-hidden relative min-h-[190px]">
            <div className="absolute bottom-6 left-6 z-20 w-[70%] lg:w-[50%]">
                <h4 className="text-[1.1rem] font-medium text-white">{secondary.title}</h4>
                <p className="text-[0.8rem] mt-3 text-[#FAFAFA] font-[300]">{secondary.description}</p>
                <ShopLink offer={secondary} label={ctaLabel} spacing="mt-3" onShop={onShop}/>
            </div>
            <img
                alt={secondary.imageAlt}
                src={secondary.image}
                className={`${secondary.imageClassName ?? "w-[300px]"} absolute bottom-0 right-0`}
            />
        </div>

        {offers.map((offer) => (
            <div
                key={offer.title}
                className="bg-black rounded-sm col-span-1 flex justify-between items-center px-4 overflow-hidden relative min-h-[180px]"
            >
                <div className="absolute bottom-4 z-20 w-[90%]">
                    <h4 className="text-[1.1rem] font-medium text-white">{offer.title}</h4>
                    <p className="text-[0.8rem] mt-0.5 text-[#FAFAFA] font-[300]">{offer.description}</p>
                    <ShopLink offer={offer} label={ctaLabel} spacing="mt-2" onShop={onShop}/>
                </div>
                <img
                    alt={offer.imageAlt}
                    src={offer.image}
                    className={`${offer.imageClassName ?? "w-[120px]"} absolute top-[50%] left-[50%] transform translate-y-[-50%] translate-x-[-50%]`}
                />
            </div>
        ))}
    </div>
);
