import type {ReactNode} from "react";

export interface TwoPlanOffer {
    name: string;
    /** Pill next to the name, for example "Pro unlimited". */
    tag?: string;
    description: string;
    /** Bullet points. On the highlighted plan they split into two columns. */
    features: string[];
    /** Main price text, for example "$15" or "Unlimited users". */
    price: string;
    /** Text after the price, for example "/user per month". */
    priceNote?: string;
    /** Bold line under the price. */
    summary: string;
    /** Regular line under the summary. */
    details?: string;
    /** Button text for this plan. Falls back to the section's `ctaLabel`. */
    ctaLabel?: string;
}

export interface TwoPlanPricingProps {
    /** The plan on the left, for smaller teams. */
    plan: TwoPlanOffer;
    /** The highlighted plan on the right, with a border and a tilted ribbon. */
    featuredPlan: TwoPlanOffer;
    title?: ReactNode;
    description?: ReactNode;
    /** Ribbon on the highlighted plan. Line breaks are kept. */
    ribbon?: string;
    ctaLabel?: string;
    onSelectPlan?: (plan: TwoPlanOffer) => void;
    className?: string;
}

const CtaButton = ({label, onClick}: {label: string; onClick: () => void}) => (
    <button type="button" onClick={onClick} className="py-2 px-4 text-white bg-[#2DA530] rounded-full text-[0.9rem]">
        {label}
    </button>
);

/** Two plans side by side: a per-user plan and a highlighted flat-price plan with a ribbon. */
export const TwoPlanPricing = ({
    plan,
    featuredPlan,
    title = "Another 2,272 organizations signed up last week.",
    description = (
        <>
            Two simple plans, each with a <b>30-day free trial</b>. No credit card required.
        </>
    ),
    ribbon = "Best value for\nlarger teams",
    ctaLabel = "Try for free",
    onSelectPlan,
    className = "",
}: TwoPlanPricingProps) => {
    const half = Math.ceil(featuredPlan.features.length / 2);
    const featureColumns = [featuredPlan.features.slice(0, half), featuredPlan.features.slice(half)].filter((column) => column.length);

    return (
        <section className={`w-full rounded-xl p-[20px] ${className}`}>
            <h2 className="text-[30px] sm:text-[40px] dark:text-[#abc2d3] font-[800] leading-[40px] text-center w-full sm:w-[80%] mx-auto">
                {title}
            </h2>
            <p className="text-[18px] font-[400] dark:text-slate-400 text-gray-800 w-full sm:w-[50%] text-center mx-auto mt-3">
                {description}
            </p>

            <div className="flex sm:flex-row flex-col gap-[50px] sm:gap-0 items-center mt-20">
                <div className="border border-gray-200 dark:border-slate-700 rounded-l-xl">
                    <div className="p-[25px]">
                        <h3 className="text-[1.3rem] font-[500] dark:text-[#abc2d3] text-gray-800">{plan.name}</h3>
                        <p className="text-[1rem] font-[400] dark:text-slate-400 text-gray-800 mb-[20px]">{plan.description}</p>

                        <ul className="list-disc dark:text-slate-400 marker:text-gray-400 pl-[16px] text-gray-700">
                            {plan.features.map((feature) => (
                                <li key={feature}>{feature}</li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-[#FCF4F2] p-[25px] dark:bg-slate-800 rounded-bl-xl">
                        <p className="text-[1.4rem] dark:text-[#abc2d3] flex items-end gap-[6px] font-[600]">
                            {plan.price}
                            {plan.priceNote && (
                                <span className="text-[1rem] dark:text-slate-400 text-gray-500 font-[400] mb-1">{plan.priceNote}</span>
                            )}
                        </p>
                        <p className="text-[1rem] dark:text-slate-400 mt-[10px] mb-[20px]">
                            <b>{plan.summary}</b>
                            {plan.details && (
                                <>
                                    <br/>
                                    {plan.details}
                                </>
                            )}
                        </p>

                        <CtaButton label={plan.ctaLabel ?? ctaLabel} onClick={() => onSelectPlan?.(plan)}/>
                    </div>
                </div>

                <div className="border-[3px] border-[#EC677C] rounded-xl relative">
                    {ribbon && (
                        <span className="bg-[#EB4866] text-white rounded-md px-5 uppercase text-[0.8rem] py-[7px] rotate-[-7deg] absolute top-[-30px] z-20 right-[-20px] whitespace-pre-line">
                            {ribbon}
                        </span>
                    )}

                    <div className="p-[25px]">
                        <div className="flex flex-col sm:flex-row items-center gap-[5px] sm:gap-[20px] mb-[10px]">
                            <h3 className="text-[1.3rem] dark:text-[#abc2d3] font-[500] text-gray-800">{featuredPlan.name}</h3>
                            {featuredPlan.tag && (
                                <span className="py-[5px] px-4 bg-[#FF7D0F] text-white rounded-full text-[0.6rem] sm:text-[0.9rem] uppercase">
                                    {featuredPlan.tag}
                                </span>
                            )}
                        </div>
                        <p className="text-[1rem] dark:text-slate-400 font-[400] text-gray-800 mb-[20px]">{featuredPlan.description}</p>

                        <div className="flex sm:flex-row flex-col justify-between gap-[20px]">
                            {featureColumns.map((column) => (
                                <ul key={column[0]} className="list-disc dark:text-slate-400 marker:text-[#EB4866] pl-[16px] text-gray-700">
                                    {column.map((feature) => (
                                        <li key={feature}>{feature}</li>
                                    ))}
                                </ul>
                            ))}
                        </div>
                    </div>

                    <div className="bg-[#FCF4F2] dark:bg-slate-800 p-[25px] rounded-b-xl">
                        <p className="text-[1.4rem] dark:text-[#abc2d3] sm:flex-row flex-col flex sm:items-end gap-[6px] font-[400]">
                            <b>{featuredPlan.price}</b>
                            {featuredPlan.priceNote && <span>{featuredPlan.priceNote}</span>}
                        </p>
                        <p className="text-[1rem] dark:text-slate-400 mt-[10px] mb-[20px]">
                            <b>{featuredPlan.summary}</b>
                            {featuredPlan.details && (
                                <>
                                    <br/>
                                    {featuredPlan.details}
                                </>
                            )}
                        </p>

                        <CtaButton label={featuredPlan.ctaLabel ?? ctaLabel} onClick={() => onSelectPlan?.(featuredPlan)}/>
                    </div>
                </div>
            </div>
        </section>
    );
};
