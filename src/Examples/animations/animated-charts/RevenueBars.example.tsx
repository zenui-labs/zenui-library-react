import {RevenueBars, type BarSeries} from "./RevenueBars";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

// Revenue in thousands of dollars, one value per month.
const revenue: BarSeries[] = [
    {label: "2025", values: [18.2, 21.4, 24.9, 22.1, 27.6, 30.2, 28.4, 31.9, 35.5, 33.8, 38.1, 44.6]},
    {label: "2026", values: [26.4, 29.8, 34.1, 31.7, 38.9, 42.3, 40.2, 45.6, 49.8, 47.1, 52.4, 58.7]},
];

const RevenueBarsExample = () => <RevenueBars categories={months} series={revenue} ticks={[0, 15, 30, 45, 60]}/>;

export default RevenueBarsExample;
