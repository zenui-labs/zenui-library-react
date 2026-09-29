import type {Example} from "../../types.ts";
import ComparisonTable from "./ComparisonTable.example.tsx";
import comparisonTableSource from "./ComparisonTable.example.tsx?raw";
import UsVsAlternatives from "./UsVsAlternatives.example.tsx";
import usVsAlternativesSource from "./UsVsAlternatives.example.tsx?raw";
import FeatureMatrix from "./FeatureMatrix.example.tsx";
import featureMatrixSource from "./FeatureMatrix.example.tsx?raw";
import CompareTwoPlans from "./CompareTwoPlans.example.tsx";
import compareTwoPlansSource from "./CompareTwoPlans.example.tsx?raw";
import SeatPlanPicker from "./SeatPlanPicker.example.tsx";
import seatPlanPickerSource from "./SeatPlanPicker.example.tsx?raw";
import ApiLimitsTable from "./ApiLimitsTable.example.tsx";
import apiLimitsTableSource from "./ApiLimitsTable.example.tsx?raw";
import ProductSpecCompare from "./ProductSpecCompare.example.tsx";
import productSpecCompareSource from "./ProductSpecCompare.example.tsx?raw";

const examples: Example[] = [
    {
        id: "plan-comparison-table",
        title: "Plan comparison table",
        description: "A full feature comparison across three plans, grouped by category, with a monthly and yearly price switch. Use it below pricing cards when buyers need the details.",
        component: ComparisonTable,
        source: comparisonTableSource,
        layout: "full",
        minHeight: 900,
    },
    {
        id: "us-vs-alternatives",
        title: "Us versus alternatives",
        description: "A checklist comparing your product with the tools buyers use today, with a highlighted column, partial support notes and a legend. Use it on a why-switch or competitor page.",
        component: UsVsAlternatives,
        source: usVsAlternativesSource,
        layout: "full",
        minHeight: 780,
    },
    {
        id: "feature-matrix",
        title: "Feature matrix with tooltips",
        description: "A four-plan matrix with a sticky header and first column, collapsible feature groups and an info tooltip on every row. Use it when the full list is long and needs explaining.",
        component: FeatureMatrix,
        source: featureMatrixSource,
        layout: "full",
        minHeight: 860,
    },
    {
        id: "compare-two-plans",
        title: "Compare two plans side by side",
        description: "Two plan pickers with a swap button and an only differences switch that filters the rows. Use it when there are many plans and buyers are choosing between neighbors.",
        component: CompareTwoPlans,
        source: compareTwoPlansSource,
        layout: "full",
        minHeight: 900,
    },
    {
        id: "seat-plan-picker",
        title: "Plan picker with seat slider",
        description: "A seat slider and must-have features that recalculate each plan's monthly total, dim plans that do not fit and mark the best fit. Use it for per-seat pricing.",
        component: SeatPlanPicker,
        source: seatPlanPickerSource,
        layout: "full",
        minHeight: 860,
    },
    {
        id: "api-limits-table",
        title: "API rate limits table",
        description: "A developer docs table of rate limits per endpoint and tier with a unit switch, plan highlight and copyable response headers. Use it in API reference pages.",
        component: ApiLimitsTable,
        source: apiLimitsTableSource,
        layout: "full",
        minHeight: 860,
    },
    {
        id: "product-spec-compare",
        title: "Product spec comparison",
        description: "Three products with color pickers, add to bag buttons and spec rows where numeric values get bars and a best badge. Use it on a store's compare page.",
        component: ProductSpecCompare,
        source: productSpecCompareSource,
        layout: "full",
        minHeight: 980,
    },
];

export default examples;
