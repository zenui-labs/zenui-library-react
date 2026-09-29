import type {ComponentType} from "react";
import {IoIosRocket} from "react-icons/io";
import {FaRegDotCircle} from "react-icons/fa";
import {BiRightArrowAlt} from "react-icons/bi";

export interface FeaturePricingCardProps {
    /** Plan name shown in the pill at the top right, for example "Enterprise". */
    plan: string;
    /** Formatted price, for example "$79.58". */
    price: string;
    tagline: string;
    features: string[];
    period?: string;
    ctaLabel?: string;
    icon?: ComponentType<{className?: string}>;
    /** Color of the header panel and the button. */
    accentColor?: string;
    onSelect?: () => void;
    className?: string;
}

/** A pricing card with a colored header for the plan and price, a feature list and a call to action. */
export const FeaturePricingCard = ({
    plan,
    price,
    tagline,
    features,
    period = "/ month",
    ctaLabel = "Get started",
    icon: Icon = IoIosRocket,
    accentColor = "#3B9DF8",
    onSelect,
    className = "",
}: FeaturePricingCardProps) => (
    <div className={`w-full lg:w-[80%] border bg-white dark:bg-slate-800 dark:border-slate-700 border-[#e5eaf2] p-2 rounded-2xl ${className}`}>
        <div className="w-full rounded-2xl p-4" style={{backgroundColor: accentColor}}>
            <div className="flex items-center justify-between w-full mb-5">
                <Icon className="text-white text-[3.5rem]"/>
                <span className="px-2 py-1 border border-white rounded-md text-[0.8rem] bg-white text-black uppercase">
                    {plan}
                </span>
            </div>
            <p className="text-[2.3rem] font-[800] text-white">
                {price} <span className="text-[1rem] font-[400]">{period}</span>
            </p>
            <p className="text-[1rem] text-white">{tagline}</p>
        </div>

        <ul className="flex flex-col px-8 text-[#424242] mt-6">
            {features.map((feature, index) => (
                <li
                    key={feature}
                    className={`flex items-center gap-2 py-3 dark:text-[#abc2d3] text-[1rem] ${
                        index < features.length - 1 ? "border-b border-[#e5eaf2]" : ""
                    }`}
                >
                    <FaRegDotCircle className="text-[1rem] dark:text-[#abc2d3] text-[#000]" aria-hidden/>
                    {feature}
                </li>
            ))}
        </ul>

        <div className="px-8 my-5">
            <button
                type="button"
                onClick={onSelect}
                className="px-4 py-2 border rounded-2xl text-white flex items-center gap-1 group uppercase"
                style={{backgroundColor: accentColor, borderColor: accentColor}}
            >
                {ctaLabel}
                <BiRightArrowAlt className="text-[1.4rem] group-hover:ml-3 transition-all duration-300"/>
            </button>
        </div>
    </div>
);
