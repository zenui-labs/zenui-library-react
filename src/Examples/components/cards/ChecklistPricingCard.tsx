import {MdDone} from "react-icons/md";
import {RxCross1} from "react-icons/rx";

export interface PricingFeature {
    label: string;
    /** False shows a red cross instead of a check. */
    included: boolean;
}

export interface ChecklistPricingCardProps {
    plan: string;
    tagline: string;
    /** Amount without the currency, for example "49.50". */
    price: string;
    features: PricingFeature[];
    currency?: string;
    period?: string;
    ctaLabel?: string;
    featuresHeading?: string;
    /** Color of the plan name, the button, the check icons and the bottom bar. */
    accentColor?: string;
    onSelect?: () => void;
    className?: string;
}

/** A pricing card with a large price, a buy button and a checklist of included and excluded features. */
export const ChecklistPricingCard = ({
    plan,
    tagline,
    price,
    features,
    currency = "$",
    period = "per month",
    ctaLabel = "Buy now",
    featuresHeading = "What you will get",
    accentColor = "#3B9DF8",
    onSelect,
    className = "",
}: ChecklistPricingCardProps) => (
    <div className={`w-full md:w-[80%] border bg-white dark:bg-slate-800 dark:border-slate-700 border-[#e5eaf2] shadow-lg ${className}`}>
        <div className="w-full flex items-center justify-center flex-col p-6">
            <h2 className="text-[1.5rem] font-[600]" style={{color: accentColor}}>{plan}</h2>
            <p className="text-[#424242] dark:text-[#abc2d3] text-[1rem]">{tagline}</p>

            <div className="flex mt-6 gap-1">
                <p className="font-[800] dark:text-[#abc2d3] text-[4rem] leading-[4rem]">{price}</p>
                <span className="text-[1.2rem] dark:text-[#abc2d3] font-[500]">{currency}</span>
            </div>
            <p className="text-[#424242] dark:text-[#abc2d3]/70 text-[0.9rem]">{period}</p>

            <button
                type="button"
                onClick={onSelect}
                className="px-12 py-2 rounded-3xl text-white text-[1rem] my-6"
                style={{backgroundColor: accentColor}}
            >
                {ctaLabel}
            </button>
        </div>

        <h3 className="text-[1.2rem] dark:text-[#abc2d3] font-[600] text-[#424242] mt-3 px-6">{featuresHeading}</h3>
        <ul className="flex gap-3 flex-col py-4 px-6">
            {features.map((feature) => (
                <li
                    key={feature.label}
                    className={`flex items-center ${feature.included ? "gap-2" : "gap-3"} dark:text-[#abc2d3] text-[#424242] text-[1rem]`}
                >
                    {feature.included ? (
                        <MdDone className="text-[1.5rem]" style={{color: accentColor}} aria-hidden/>
                    ) : (
                        <RxCross1 className="text-[#e73939] text-[1.2rem]" aria-hidden/>
                    )}
                    <span className="sr-only">{feature.included ? "Included:" : "Not included:"}</span>
                    {feature.label}
                </li>
            ))}
        </ul>
        <div className="w-full h-[10px]" style={{backgroundColor: accentColor}}/>
    </div>
);
