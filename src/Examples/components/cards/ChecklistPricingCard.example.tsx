import {ChecklistPricingCard, type PricingFeature} from "./ChecklistPricingCard";

const features: PricingFeature[] = [
    {label: "5 users", included: true},
    {label: "50GB storage", included: true},
    {label: "Priority email support", included: true},
    {label: "Unlimited users", included: false},
    {label: "100GB storage", included: false},
    {label: "24/7 live chat support", included: false},
];

const ChecklistPricingCardExample = () => (
    <ChecklistPricingCard
        plan="Standard"
        tagline="Ideal for growing businesses"
        price="49.50"
        features={features}
    />
);

export default ChecklistPricingCardExample;
