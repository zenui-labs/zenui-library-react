import type {ReactNode} from "react";

export interface ShowcaseProduct {
    /** Plain text or markup, for example <>Macbook <b>Air</b></>. */
    title: ReactNode;
    description: string;
    image: string;
    imageAlt: string;
    /** Size classes for the image. Each slot has its own default. */
    imageClassName?: string;
}

export interface ShowcaseTile extends ShowcaseProduct {
    /** "light" uses a gray card, "dark" a charcoal one. */
    tone?: "light" | "dark";
}

export interface FeaturedShowcaseProduct extends ShowcaseProduct {
    /** Where the button goes. Without it the button calls `onShop`. */
    href?: string;
}

export interface ProductShowcaseGridProps {
    /** The white card at the top left. */
    primary: ShowcaseProduct;
    /** The tall card on the right with a "Shop now" button. */
    featured: FeaturedShowcaseProduct;
    /** Small cards at the bottom left, usually two. */
    tiles: ShowcaseTile[];
    ctaLabel?: string;
    onShop?: (product: FeaturedShowcaseProduct) => void;
    className?: string;
}

const tileStyles = {
    light: {
        card: "bg-[#EDEDED] dark:bg-slate-900",
        text: "z-30",
        title: "text-[1.3rem] text-gray-900 dark:text-[#abc2d3]",
        description: "dark:text-slate-400",
        image: "w-[80px]",
    },
    dark: {
        card: "bg-[#353535] h-full",
        text: "z-20",
        title: "text-[1.1rem] text-white",
        description: "",
        image: "w-[100px]",
    },
};

/** A product showcase grid with a wide lead card, a tall featured card and small tiles. */
export const ProductShowcaseGrid = ({primary, featured, tiles, ctaLabel = "Shop now", onShop, className = ""}: ProductShowcaseGridProps) => {
    const ctaClass =
        "inline-block w-max py-2 px-6 rounded-md border border-gray-900 text-gray-900 text-[0.9rem] hover:bg-gray-900 dark:text-[#abc2d3] dark:border-slate-700 transition-all duration-300 hover:text-white mt-5";

    return (
        <div className={`grid grid-cols-1 md:grid-cols-4 w-full md:h-[450px] ${className}`}>
            {/* Top left card */}
            <div className="col-span-1 md:col-span-2 overflow-hidden flex justify-between flex-col rounded-sm dark:bg-slate-900 dark:border-r dark:border-slate-700 dark:border-b row-span-1 md:row-span-2 bg-white h-[180px] md:h-full py-8 relative">
                <div className="px-8 absolute top-[50%] translate-y-[-50%] md:right-7 z-20 w-full md:w-[60%]">
                    <h4 className="text-[1.5rem] font-medium text-white md:text-gray-900 dark:text-[#abc2d3]">{primary.title}</h4>
                    <p className="text-[0.8rem] dark:text-slate-400 mt-1 text-[#909090] font-[300]">{primary.description}</p>
                </div>
                <img
                    alt={primary.imageAlt}
                    src={primary.image}
                    className={`${primary.imageClassName ?? "w-[230px]"} absolute -left-12 top-[50%] transform translate-y-[-50%]`}
                />
            </div>

            {/* Tall card on the right */}
            <div className="bg-[#EDEDED] dark:bg-slate-900 rounded-sm col-span-1 md:col-span-2 flex justify-between items-center px-4 overflow-hidden h-full row-span-3 relative">
                <div className="p-4 md:pl-5 z-30 w-full md:w-[60%]">
                    <h4 className="text-[2rem] font-[300] dark:text-[#abc2d3] text-gray-900">{featured.title}</h4>
                    <p className="text-[0.8rem] dark:text-slate-400 mt-1 text-[#909090] font-[300]">{featured.description}</p>
                    {featured.href ? (
                        <a href={featured.href} onClick={() => onShop?.(featured)} className={ctaClass}>{ctaLabel}</a>
                    ) : (
                        <button type="button" onClick={() => onShop?.(featured)} className={ctaClass}>{ctaLabel}</button>
                    )}
                </div>
                <img
                    alt={featured.imageAlt}
                    src={featured.image}
                    className={`${featured.imageClassName ?? "w-[100px] md:w-[180px]"} absolute top-[50%] transform translate-y-[-50%] right-0`}
                />
            </div>

            {/* Small cards at the bottom left */}
            {tiles.map((tile) => {
                const style = tileStyles[tile.tone ?? "light"];
                return (
                    <div
                        key={tile.image}
                        className={`overflow-hidden flex justify-between flex-col rounded-sm py-8 relative min-h-[140px] ${style.card}`}
                    >
                        <div className={`absolute top-[50%] transform translate-y-[-50%] right-6 w-[70%] md:w-[50%] ${style.text}`}>
                            <h4 className={`font-[300] ${style.title}`}>{tile.title}</h4>
                            <p className={`text-[0.8rem] mt-1 text-[#909090] font-[300] ${style.description}`}>{tile.description}</p>
                        </div>
                        <img
                            alt={tile.imageAlt}
                            src={tile.image}
                            className={`${tile.imageClassName ?? style.image} absolute top-[50%] left-0 transform translate-y-[-50%]`}
                        />
                    </div>
                );
            })}
        </div>
    );
};
