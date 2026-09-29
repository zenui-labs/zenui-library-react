import {TwoPlanPricing, type TwoPlanOffer} from "./TwoPlanPricing";

const plan: TwoPlanOffer = {
    name: "Workspace",
    description: "Ideal for freelancers, startups, or smaller teams.",
    features: ["Every feature, nothing held back", "500 GB storage for files and documents", "Month-to-month, pay as you go"],
    price: "$15",
    priceNote: "/user per month",
    summary: "We only bill you for employees.",
    details: "Invite clients, contractors and guests for free.",
};

const featuredPlan: TwoPlanOffer = {
    name: "Workspace",
    tag: "Pro unlimited",
    description: "Perfect for growing businesses, larger groups, and companies that want the best.",
    features: [
        "Every feature we offer, plus",
        "10x file and document storage (5 TB)",
        "First-in-line 24/7/365 priority support",
        "1:1 onboarding tour with our team",
        "Option to pay annually by check",
        "Annual billing for simpler accounting",
    ],
    price: "Unlimited users",
    priceNote: "just $299/month, billed annually",
    summary: "No per-user charges. Your whole organization for one fixed price.",
    details: "If you prefer to pay month-to-month, it’s $349/month.",
};

const TwoPlanPricingExample = () => (
    <div className="p-8">
        <TwoPlanPricing plan={plan} featuredPlan={featuredPlan}/>
    </div>
);

export default TwoPlanPricingExample;
