import type {Example} from "../../types.ts";
import BillingTogglePricing from "./BillingTogglePricing.example.tsx";
import billingTogglePricingSource from "./BillingTogglePricing.example.tsx?raw";
import billingTogglePricingComponentSource from "./BillingTogglePricing.tsx?raw";
import FeatureChecklistPricing from "./FeatureChecklistPricing.example.tsx";
import featureChecklistPricingSource from "./FeatureChecklistPricing.example.tsx?raw";
import featureChecklistPricingComponentSource from "./FeatureChecklistPricing.tsx?raw";
import TwoPlanPricing from "./TwoPlanPricing.example.tsx";
import twoPlanPricingSource from "./TwoPlanPricing.example.tsx?raw";
import twoPlanPricingComponentSource from "./TwoPlanPricing.tsx?raw";
import HighlightedTierPricing from "./HighlightedTierPricing.example.tsx";
import highlightedTierPricingSource from "./HighlightedTierPricing.example.tsx?raw";
import highlightedTierPricingComponentSource from "./HighlightedTierPricing.tsx?raw";

const examples: Example[] = [
    {
        id: "pricing_section_1",
        title: "Pricing with billing toggle",
        description: "Three plan cards under a monthly and yearly switch, with the top plan on a dark card. Prices update when visitors change the billing period.",
        component: BillingTogglePricing,
        source: billingTogglePricingSource,
        files: [{name: "BillingTogglePricing.tsx", source: billingTogglePricingComponentSource}],
        layout: "full",
        minHeight: 720,
    },
    {
        id: "pricing_section_2",
        title: "Pricing with feature checklist",
        description: "Plan cards that list included and missing features, with a billing switch above them. Use it when the difference between plans is which features they unlock.",
        component: FeatureChecklistPricing,
        source: featureChecklistPricingSource,
        files: [{name: "FeatureChecklistPricing.tsx", source: featureChecklistPricingComponentSource}],
        layout: "full",
        minHeight: 760,
    },
    {
        id: "pricing_section_3",
        title: "Two plan pricing",
        description: "A per-user plan next to a highlighted flat-price plan with a tilted ribbon. Use it when you sell only two plans and want to steer larger teams to one of them.",
        component: TwoPlanPricing,
        source: twoPlanPricingSource,
        files: [{name: "TwoPlanPricing.tsx", source: twoPlanPricingComponentSource}],
        layout: "full",
        minHeight: 700,
    },
    {
        id: "pricing_section_4",
        title: "Pricing with highlighted tier",
        description: "Three plans with usage limits and a feature checklist, where the middle plan sits raised on a white card. Use it for free, paid and enterprise tiers.",
        component: HighlightedTierPricing,
        source: highlightedTierPricingSource,
        files: [{name: "HighlightedTierPricing.tsx", source: highlightedTierPricingComponentSource}],
        layout: "full",
        minHeight: 860,
    },
];

export default examples;
