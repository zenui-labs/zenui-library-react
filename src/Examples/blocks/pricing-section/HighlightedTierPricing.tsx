import type {ReactNode} from "react";
import {MdOutlineDone} from "react-icons/md";

export interface TierPlan {
    name: string;
    /** Short line under the name. */
    tagline: string;
    /** Price text, for example "$12.50", "Free" or "Let’s talk". */
    price: string;
    /** Small text after the price, for example "USD/creator/mo (annually)". */
    priceUnit?: string;
    ctaLabel: string;
    /** Usage limits shown as a bullet list under the button. */
    limits: string[];
    /** Heading above the feature checklist, for example "Everything in Starter, plus". */
    featuresTitle: string;
    features: string[];
    /** Shows the plan on a white card, slightly larger than the others. */
    featured?: boolean;
}

export interface TierCardProps {
    plan: TierPlan;
    onSelect?: (plan: TierPlan) => void;
}

/** One plan with its price, a button, usage limits and a feature checklist. */
export const TierCard = ({plan, onSelect}: TierCardProps) => {
    const featured = plan.featured ?? false;

    return (
        <div
            className={`p-[30px] rounded-xl ${
                featured
                    ? "dark:bg-gray-800 bg-[#fff] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] sm:scale-[1.1]"
                    : "dark:bg-blue-300/10 bg-[#eff0ff]"
            }`}
        >
            <h3 className="text-[2rem] font-[500] dark:text-[#abc2d3] text-[#3D2E7C]">{plan.name}</h3>
            <p className="text-[1rem] dark:text-slate-400 text-[#3D2E7C] font-[400]">{plan.tagline}</p>
            <p
                className={`text-[1.7rem] font-[400] text-[#3D2E7C] mt-3 flex items-center gap-[5px] ${
                    featured ? "dark:text-[#abc2d3]" : "dark:text-slate-400"
                }`}
            >
                {plan.price}
                {plan.priceUnit && <span className="text-[0.8rem]">{plan.priceUnit}</span>}
            </p>

            <button type="button" onClick={() => onSelect?.(plan)} className="bg-[#565ADD] my-6 py-3 px-4 rounded-full text-white">
                {plan.ctaLabel}
            </button>

            <ul
                className={`list-disc marker:text-[#3D2E7C] pl-[20px] sm:pl-[40px] flex flex-col gap-[8px] dark:text-slate-400 text-[#3D2E7C] text-[0.9rem] ${
                    featured ? "dark:marker:text-purple-300/70" : "dark:marker:text-purple-300/50"
                }`}
            >
                {plan.limits.map((limit) => (
                    <li key={limit}>{limit}</li>
                ))}
            </ul>

            <div className="flex flex-col gap-[10px] dark:border-slate-700 mt-5 pt-[30px] border-t border-[#D1D1F7]">
                <p className="text-[1rem] dark:text-[#abc2d3] text-[#2B1C50]">{plan.featuresTitle}</p>

                <ul className="flex flex-col gap-[10px]">
                    {plan.features.map((feature) => (
                        <li key={feature} className="text-[0.9rem] text-[#2B1C50] dark:text-slate-400 flex items-center gap-[8px]">
                            <MdOutlineDone aria-hidden className="text-[1.4rem] shrink-0 dark:text-slate-400 p-1 rounded-full text-[#2B1C50]"/>
                            {feature}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export interface HighlightedTierPricingProps {
    plans: TierPlan[];
    title?: ReactNode;
    onSelectPlan?: (plan: TierPlan) => void;
    className?: string;
}

/** A row of plan cards on soft backgrounds, with the featured plan raised on a white card. */
export const HighlightedTierPricing = ({
    plans,
    title = "Choose the plan that fits your needs.",
    onSelectPlan,
    className = "",
}: HighlightedTierPricingProps) => (
    <section className={`w-full rounded-xl p-[20px] ${className}`}>
        <h2 className="text-[30px] sm:text-[40px] font-[800] leading-[40px] text-center w-full sm:w-[80%] mx-auto dark:text-[#abc2d3]">
            {title}
        </h2>

        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[10px] sm:mt-20 mt-10">
            {plans.map((plan) => (
                <TierCard key={plan.name} plan={plan} onSelect={onSelectPlan}/>
            ))}
        </div>
    </section>
);
