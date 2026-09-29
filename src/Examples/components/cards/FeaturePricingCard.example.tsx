import {FeaturePricingCard} from "./FeaturePricingCard";

const features = [
    "Unlimited campaigns",
    "Advanced audience segments",
    "Custom reports and exports",
    "Single sign-on",
    "Dedicated account manager",
];

const FeaturePricingCardExample = () => (
    <FeaturePricingCard
        plan="Enterprise"
        price="$79.58"
        tagline="True power of marketing"
        features={features}
    />
);

export default FeaturePricingCardExample;
