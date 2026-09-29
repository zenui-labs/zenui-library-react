import {ScrollCountUp, type CountMetric} from "./ScrollCountUp";

const years = [2021, 2022, 2023, 2024, 2025];

const metrics: CountMetric[] = [
    {label: "Revenue", values: [1.2, 3.4, 7.9, 14.6, 24.8], format: (value) => `$${value.toFixed(1)}M`},
    {label: "Customers", values: [180, 910, 2640, 6120, 12480], format: (value) => Math.round(value).toLocaleString("en-US")},
    {label: "Countries", values: [3, 9, 18, 31, 46], format: (value) => String(Math.round(value))},
];

const ScrollCountUpExample = () => (
    <ScrollCountUp
        periods={years}
        metrics={metrics}
        eyebrow="Five years of Harbor"
        footer="Thank you to the 12,480 teams who build with Harbor."
        ariaLabel="Company year in review, scroll to move through the years"
    />
);

export default ScrollCountUpExample;
