import {BumpChart, type BumpSeries} from "./BumpChart";

const quarters = ["Q1 '24", "Q2 '24", "Q3 '24", "Q4 '24", "Q1 '25", "Q2 '25", "Q3 '25", "Q4 '25"];

// Share of merged pull requests per language. The chart ranks them itself.
const languages: BumpSeries[] = [
    {id: "ts", label: "TypeScript", values: [34.1, 33.0, 31.8, 30.9, 29.4, 27.2, 26.5, 28.8]},
    {id: "py", label: "Python", values: [22.8, 23.9, 25.1, 21.7, 24.6, 28.3, 29.9, 27.6]},
    {id: "go", label: "Go", values: [15.2, 15.8, 16.4, 22.0, 16.1, 15.0, 13.1, 12.4]},
    {id: "kt", label: "Kotlin", values: [11.0, 9.1, 8.2, 7.9, 6.3, 5.8, 5.1, 4.6]},
    {id: "swift", label: "Swift", values: [9.6, 10.3, 10.6, 9.8, 8.8, 8.4, 8.0, 7.9]},
    {id: "rust", label: "Rust", values: [7.3, 7.9, 7.9, 7.7, 14.7, 14.6, 17.4, 18.7]},
];

const BumpChartExample = () => (
    <BumpChart
        periods={quarters}
        series={languages}
        title="Merged PRs by language"
        subtitle="Northwind monorepo, share of merged pull requests"
        summary="Language rank by share of merged pull requests over eight quarters. TypeScript and Python trade first place, Rust climbs from sixth to third after Q4 2024, and Kotlin slides to last."
    />
);

export default BumpChartExample;
