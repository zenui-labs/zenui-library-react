import {HighlightedTierPricing, type TierPlan} from "./HighlightedTierPricing";

const plans: TierPlan[] = [
    {
        name: "Starter",
        tagline: "Quick video messages",
        price: "Free",
        ctaLabel: "Sign up for free",
        limits: ["Up to 50 lite creators", "Up to 25 videos per person", "Up to 5 minutes per video"],
        featuresTitle: "Key features",
        features: ["HD video uploads", "Attachments and post scheduling", "Set your own rates", "Exclusive deals", "Advanced statistics"],
    },
    {
        name: "Business",
        tagline: "Advanced recording and analytics",
        price: "$12.50",
        priceUnit: "USD/creator/mo (annually)",
        ctaLabel: "Start a 14-day free trial",
        limits: ["Unlimited creators", "Unlimited videos", "Unlimited recording length", "Up to 50 lite creators"],
        featuresTitle: "Everything in Starter, plus",
        features: ["Custom branding", "Engagement insights", "Links inside videos", "Password protected videos", "Video uploads"],
        featured: true,
    },
    {
        name: "Enterprise",
        tagline: "Advanced admin and security",
        price: "Let’s talk",
        ctaLabel: "Contact sales",
        limits: ["Unlimited members", "Unlimited videos", "Unlimited recording length"],
        featuresTitle: "Everything in Business, plus",
        features: [
            "SSO (SAML) and SCIM",
            "Advanced content privacy",
            "Custom data retention policies",
            "Salesforce integration",
            "Zoom integration",
        ],
    },
];

const HighlightedTierPricingExample = () => (
    <div className="p-8">
        <HighlightedTierPricing plans={plans}/>
    </div>
);

export default HighlightedTierPricingExample;
