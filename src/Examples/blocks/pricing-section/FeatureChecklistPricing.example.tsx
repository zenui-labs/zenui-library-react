import {FeatureChecklistPricing, type ChecklistPlan} from "./FeatureChecklistPricing";

const featureNames = ["HD video uploads", "Attachments and post scheduling", "Set your own rates", "Exclusive deals", "Advanced statistics"];

// Marks the first `count` features as included.
const featuresUpTo = (count: number) => featureNames.map((label, index) => ({label, included: index < count}));

const plans: ChecklistPlan[] = [
    {name: "Base", price: {monthly: "$19", annually: "$15"}, features: featuresUpTo(2)},
    {name: "Pro", price: {monthly: "$123", annually: "$99"}, features: featuresUpTo(4), featured: true, badge: "Save $40"},
    {name: "Enterprise", price: {monthly: "$189", annually: "$149"}, features: featuresUpTo(5)},
];

const FeatureChecklistPricingExample = () => (
    <div className="p-8">
        <FeatureChecklistPricing plans={plans}/>
    </div>
);

export default FeatureChecklistPricingExample;
