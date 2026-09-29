import {useState, type ReactNode} from "react";
import {MdOutlineDone} from "react-icons/md";
import {RxCross1} from "react-icons/rx";

export type BillingPeriod = "monthly" | "annually";

export interface PlanFeature {
    label: string;
    /** False shows the feature crossed out and dimmed. */
    included: boolean;
}

export interface ChecklistPlan {
    name: string;
    /** Price for each billing period, for example {monthly: "$19", annually: "$15"}. */
    price: Record<BillingPeriod, string>;
    features: PlanFeature[];
    /** Shows the plan on a dark card, raised above the others. */
    featured?: boolean;
    /** Small label next to the plan name, for example "Save $40". */
    badge?: string;
    /** Button text for this plan. Falls back to the section's `ctaLabel`. */
    ctaLabel?: string;
}

export interface ChecklistPlanCardProps {
    plan: ChecklistPlan;
    period: BillingPeriod;
    /** Small text after the price. */
    priceSuffix?: string;
    ctaLabel?: string;
    onSelect?: (plan: ChecklistPlan) => void;
}

/** One plan with a checklist of included and missing features, then the price and a button. */
export const ChecklistPlanCard = ({plan, period, priceSuffix = "/month", ctaLabel = "Choose", onSelect}: ChecklistPlanCardProps) => {
    const featured = plan.featured ?? false;

    return (
        <div
            className={`w-full flex flex-col max-w-[280px] justify-between h-full rounded-xl ${
                featured
                    ? "bg-gray-800 p-[25px] sm:mb-[70px]"
                    : "dark:bg-slate-800 bg-white shadow-[0px_0px_3px_0px_rgba(0,0,0,0.1)] p-[20px]"
            }`}
        >
            <div>
                <div className="flex items-center justify-between w-full">
                    <h3 className={`text-[1.5rem] font-[600] mt-3 ${featured ? "dark:text-slate-300 text-white" : "dark:text-[#abc2d3]"}`}>
                        {plan.name}
                    </h3>
                    {plan.badge && (
                        <span className="rounded-md px-4 py-[5px] dark:bg-purple-600/30 bg-[#f8f4ff] text-[#8645FF] text-[0.8rem]">
                            {plan.badge}
                        </span>
                    )}
                </div>

                <ul className="flex flex-col gap-[10px] mt-5">
                    {plan.features.map((feature) => {
                        const Icon = feature.included ? MdOutlineDone : RxCross1;
                        const tone = feature.included
                            ? featured
                                ? "text-gray-200 dark:text-slate-300"
                                : "text-gray-500 dark:text-slate-400"
                            : featured
                                ? "text-gray-500 dark:text-slate-500"
                                : "text-gray-300 dark:text-slate-500";
                        const iconTone = feature.included
                            ? featured
                                ? "text-gray-200 dark:text-slate-300"
                                : "text-gray-800 dark:text-slate-400"
                            : tone;

                        return (
                            <li key={feature.label} className={`text-[1rem] flex items-center gap-[10px] ${tone}`}>
                                <Icon aria-hidden className={`text-[1.5rem] shrink-0 p-1 rounded-full ${iconTone}`}/>
                                <span className="sr-only">{feature.included ? "Included:" : "Not included:"}</span>
                                {feature.label}
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div className="mt-8">
                <div className="flex items-end gap-[8px]">
                    <p className={`text-[1.8rem] font-[800] ${featured ? "dark:text-slate-300 text-white" : "dark:text-[#abc2d3]"}`}>
                        {plan.price[period]}
                    </p>
                    <span className={`text-[1rem] dark:text-slate-400 mb-2 ${featured ? "text-gray-300" : "text-gray-400"}`}>
                        {priceSuffix}
                    </span>
                </div>

                <button
                    type="button"
                    onClick={() => onSelect?.(plan)}
                    className={`py-[14px] px-4 w-full rounded-md mt-3 ${
                        featured ? "bg-[#8645FF] text-white" : "dark:bg-purple-300/10 bg-[#f8f4ff] text-[#8645FF]"
                    }`}
                >
                    {plan.ctaLabel ?? ctaLabel}
                </button>
            </div>
        </div>
    );
};

export interface FeatureChecklistPricingProps {
    plans: ChecklistPlan[];
    title?: ReactNode;
    description?: ReactNode;
    /** Selected billing period when controlled. */
    period?: BillingPeriod;
    /** Starting billing period when uncontrolled. */
    defaultPeriod?: BillingPeriod;
    onPeriodChange?: (period: BillingPeriod) => void;
    /** Called with the plan and billing period when a plan button is pressed. */
    onSelectPlan?: (plan: ChecklistPlan, period: BillingPeriod) => void;
    priceSuffix?: string;
    monthlyLabel?: string;
    annualLabel?: string;
    ctaLabel?: string;
    className?: string;
}

/** A centered pricing section with a billing switch and plan cards that list included and missing features. */
export const FeatureChecklistPricing = ({
    plans,
    title = "The right plan for your business",
    description = "We have several plans to showcase your business and get discovered as a creative entrepreneur. Everything you need.",
    period,
    defaultPeriod = "monthly",
    onPeriodChange,
    onSelectPlan,
    priceSuffix,
    monthlyLabel = "Bill monthly",
    annualLabel = "Bill annually",
    ctaLabel,
    className = "",
}: FeatureChecklistPricingProps) => {
    const [internalPeriod, setInternalPeriod] = useState<BillingPeriod>(defaultPeriod);
    const current = period ?? internalPeriod;
    const annual = current === "annually";

    const togglePeriod = () => {
        const next: BillingPeriod = annual ? "monthly" : "annually";
        if (period === undefined) setInternalPeriod(next);
        onPeriodChange?.(next);
    };

    return (
        <section className={`w-full rounded-xl p-[20px] ${className}`}>
            <h2 className="text-[30px] font-[500] leading-[40px] dark:text-[#abc2d3] text-center">{title}</h2>
            <p className="text-[18px] font-[400] dark:text-slate-400 text-gray-400 w-full sm:w-[50%] text-center mx-auto mt-2">
                {description}
            </p>

            <div className="w-full flex-col sm:flex-row flex items-center justify-center mt-8 gap-[20px]">
                <p className={`text-[1rem] dark:text-slate-400 text-gray-800 ${annual ? "font-[400]" : "font-[600]"}`} aria-hidden>
                    {monthlyLabel}
                </p>
                <button
                    type="button"
                    role="switch"
                    aria-checked={annual}
                    aria-label={annualLabel}
                    onClick={togglePeriod}
                    className={`${
                        annual ? "bg-[#3B9DF8]" : "bg-[#f0f0f0] dark:bg-slate-800"
                    } w-[57px] h-[30px] px-[0.150rem] py-[0.160rem] dark:border-slate-700 cursor-pointer border transition-colors duration-500 border-[#e5eaf2] rounded-full relative`}
                >
                    <span
                        className={`${
                            annual ? "translate-x-[27px]" : "translate-x-[0px] dark:bg-slate-200"
                        } block w-[23px] h-[23px] transition-all duration-500 rounded-full bg-[#fff]`}
                        style={{boxShadow: "1px 2px 5px 2px rgb(0,0,0,0.1)"}}
                    />
                </button>
                <p className={`text-[1rem] dark:text-slate-400 text-gray-800 ${annual ? "font-[600]" : "font-[400]"}`} aria-hidden>
                    {annualLabel}
                </p>
            </div>

            <div className="flex items-center flex-wrap dark:bg-slate-900 bg-white py-[30px] gap-[30px] sm:px-[40px] rounded-xl mt-10">
                {plans.map((plan) => (
                    <ChecklistPlanCard
                        key={plan.name}
                        plan={plan}
                        period={current}
                        priceSuffix={priceSuffix}
                        ctaLabel={ctaLabel}
                        onSelect={(selected) => onSelectPlan?.(selected, current)}
                    />
                ))}
            </div>
        </section>
    );
};
