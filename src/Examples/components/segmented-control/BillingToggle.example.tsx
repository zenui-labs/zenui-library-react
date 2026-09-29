import {BillingToggle, type BillingPlan} from "./BillingToggle";

const plans: BillingPlan[] = [
    {
        name: "Starter",
        blurb: "For small teams getting organized.",
        price: {monthly: 12, yearly: 10},
        features: ["Up to 10 members", "Unlimited projects", "Email support"],
    },
    {
        name: "Team",
        blurb: "For teams that ship every week.",
        price: {monthly: 24, yearly: 19},
        features: ["Unlimited members", "Roadmaps and cycles", "Priority support"],
        featured: true,
    },
];

const BillingToggleExample = () => <BillingToggle plans={plans}/>;

export default BillingToggleExample;
