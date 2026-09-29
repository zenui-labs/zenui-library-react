import {useState, type ReactNode} from "react";
import {MdOutlineDone} from "react-icons/md";

export type BillingCycle = "monthly" | "yearly";

export interface PricingPlan {
    name: string;
    description: string;
    /** Price for each billing cycle, for example {monthly: "$24", yearly: "$19"}. */
    price: Record<BillingCycle, string>;
    features: string[];
    /** Shows the plan on a dark card with the featured badge. */
    featured?: boolean;
    /** Button text for this plan. Falls back to the section's `ctaLabel`. */
    ctaLabel?: string;
}

export interface PlanCardProps {
    plan: PricingPlan;
    billing: BillingCycle;
    /** Small text after the price. */
    priceSuffix?: string;
    featuredBadge?: string;
    ctaLabel?: string;
    onSelect?: (plan: PricingPlan) => void;
}

/** One plan with its price, description, feature checklist and a button. */
export const PlanCard = ({
    plan,
    billing,
    priceSuffix = "/month",
    featuredBadge = "Most popular",
    ctaLabel = "Choose plan",
    onSelect,
}: PlanCardProps) => {
    const featured = plan.featured ?? false;

    return (
        <div
            className={`w-full flex flex-col justify-between h-full ${
                featured ? "bg-[#231D4F] text-white p-[25px] rounded-xl" : ""
            }`}
        >
            <div>
                {featured && featuredBadge && (
                    <div className="bg-[#393360] rounded-full px-4 py-[5px] mb-6 text-[0.8rem] text-[#BB6BD9] w-max ml-auto">
                        {featuredBadge}
                    </div>
                )}

                <div className="flex items-end gap-[8px]">
                    <p className={`text-[1.8rem] font-[800] ${featured ? "" : "dark:text-[#abc2d3]"}`}>{plan.price[billing]}</p>
                    <span className={`text-[1rem] mb-2 ${featured ? "text-gray-300" : "text-gray-400 dark:text-slate-400"}`}>
                        {priceSuffix}
                    </span>
                </div>

                <h3 className={`text-[1.5rem] font-[500] mt-3 ${featured ? "" : "dark:text-[#abc2d3]"}`}>{plan.name}</h3>
                <p className={`text-[1rem] ${featured ? "text-gray-300" : "dark:text-slate-400 text-gray-500"}`}>
                    {plan.description}
                </p>

                <ul className="flex flex-col gap-[10px] mt-5">
                    {plan.features.map((feature) => (
                        <li
                            key={feature}
                            className={`text-[1rem] flex items-center gap-[10px] ${
                                featured ? "text-gray-200" : "text-gray-500 dark:text-slate-400"
                            }`}
                        >
                            <MdOutlineDone
                                aria-hidden
                                className={`text-[1.3rem] shrink-0 p-1 rounded-full ${
                                    featured
                                        ? "bg-[#393360] text-[#fff]"
                                        : "dark:bg-purple-500/20 bg-[#dacfe2] text-[#BB6BD9]"
                                }`}
                            />
                            {feature}
                        </li>
                    ))}
                </ul>
            </div>

            <button
                type="button"
                onClick={() => onSelect?.(plan)}
                className={`py-2.5 px-4 w-full rounded-full mt-16 ${
                    featured
                        ? "bg-[#BB6BD9] text-white"
                        : "bg-[#857d9c] dark:bg-purple-400/20 dark:text-[#abc2d3] text-white"
                }`}
            >
                {plan.ctaLabel ?? ctaLabel}
            </button>
        </div>
    );
};

export interface BillingTogglePricingProps {
    plans: PricingPlan[];
    title?: ReactNode;
    description?: ReactNode;
    /** Selected billing cycle when controlled. */
    billing?: BillingCycle;
    /** Starting billing cycle when uncontrolled. */
    defaultBilling?: BillingCycle;
    onBillingChange?: (billing: BillingCycle) => void;
    /** Called with the plan and billing cycle when a plan button is pressed. */
    onSelectPlan?: (plan: PricingPlan, billing: BillingCycle) => void;
    priceSuffix?: string;
    monthlyLabel?: string;
    yearlyLabel?: string;
    featuredBadge?: string;
    ctaLabel?: string;
    className?: string;
}

/** A pricing section with a monthly and yearly switch above a row of plan cards. */
export const BillingTogglePricing = ({
    plans,
    title = "Plans and pricing",
    description = "Whether your time-saving automation needs are large or small, we’re here to help you scale.",
    billing,
    defaultBilling = "yearly",
    onBillingChange,
    onSelectPlan,
    priceSuffix,
    monthlyLabel = "Monthly",
    yearlyLabel = "Yearly",
    featuredBadge,
    ctaLabel,
    className = "",
}: BillingTogglePricingProps) => {
    const [internalBilling, setInternalBilling] = useState<BillingCycle>(defaultBilling);
    const current = billing ?? internalBilling;

    const changeBilling = (next: BillingCycle) => {
        if (billing === undefined) setInternalBilling(next);
        onBillingChange?.(next);
    };

    const options: {value: BillingCycle; label: string}[] = [
        {value: "monthly", label: monthlyLabel},
        {value: "yearly", label: yearlyLabel},
    ];

    return (
        <section className={`w-full rounded-xl p-[20px] ${className}`}>
            <h2 className="text-[30px] font-[500] dark:text-[#abc2d3] leading-[40px]">{title}</h2>
            <div className="w-full sm:flex-row flex-col gap-[30px] flex items-center justify-between">
                <p className="text-[18px] font-[400] text-gray-400 dark:text-slate-400 w-full sm:w-[50%] mt-2">{description}</p>

                <div
                    role="group"
                    aria-label="Billing period"
                    className="flex items-center dark:bg-slate-800 bg-white rounded-full w-max shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)]"
                >
                    {options.map((option) => {
                        const active = current === option.value;
                        return (
                            <button
                                key={option.value}
                                type="button"
                                aria-pressed={active}
                                onClick={() => changeBilling(option.value)}
                                className={`${
                                    active ? "bg-[#BB6BD9] text-white" : "bg-transparent text-[#424242] dark:text-[#abc2d3]"
                                } px-4 py-2.5 rounded-full transition-all duration-300`}
                            >
                                {option.label}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 dark:bg-slate-900 bg-white shadow-[0px_0px_3px_0px_rgba(0,0,0,0.1)] py-[30px] gap-[50px] px-[20px] sm:px-[40px] rounded-xl mt-10">
                {plans.map((plan) => (
                    <PlanCard
                        key={plan.name}
                        plan={plan}
                        billing={current}
                        priceSuffix={priceSuffix}
                        featuredBadge={featuredBadge}
                        ctaLabel={ctaLabel}
                        onSelect={(selected) => onSelectPlan?.(selected, current)}
                    />
                ))}
            </div>
        </section>
    );
};
