import {BillingTogglePricing, type PricingPlan} from "./BillingTogglePricing";

const plans: PricingPlan[] = [
    {
        name: "Starter",
        description: "Automate the tasks you repeat every day.",
        price: {monthly: "$24", yearly: "$19"},
        features: ["Multi-step workflows", "3 premium apps", "Teams of up to 2"],
    },
    {
        name: "Professional",
        description: "Advanced tools to take your work to the next level.",
        price: {monthly: "$65", yearly: "$54"},
        features: ["Multi-step workflows", "Unlimited premium apps", "Teams of up to 50", "Shared workspace"],
    },
    {
        name: "Company",
        description: "Automation plus enterprise-grade features.",
        price: {monthly: "$109", yearly: "$89"},
        features: [
            "Multi-step workflows",
            "Unlimited premium apps",
            "Unlimited team members",
            "Advanced admin",
            "Custom data retention",
        ],
        featured: true,
    },
];

const BillingTogglePricingExample = () => (
    <div className="p-8">
        <BillingTogglePricing plans={plans}/>
    </div>
);

export default BillingTogglePricingExample;
