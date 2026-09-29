import {DrawnLine, type LineMetric} from "./DrawnLine";

// Thirty days of made-up but believable numbers, generated the same way on every render.
const series = (base: number, swing: number, growth: number, seed: number) =>
    Array.from({length: 30}, (_, day) => {
        const weekly = Math.sin((day + seed) * 0.9) * swing;
        const noise = Math.sin(day * 12.9898 + seed * 78.233) * swing * 0.35;
        return Math.round(base + day * growth + weekly + noise);
    });

const dates = Array.from({length: 30}, (_, day) => new Date(2026, 8, day + 1).toLocaleDateString("en-US", {month: "short", day: "numeric"}));

const metrics: LineMetric[] = [
    {id: "visitors", label: "Visitors", values: series(4200, 520, 38, 1)},
    {id: "signups", label: "Sign-ups", values: series(180, 34, 2.4, 4)},
    {id: "revenue", label: "Revenue", values: series(2600, 460, 21, 7), format: (value) => `$${value.toLocaleString("en-US")}`},
];

const DrawnLineExample = () => <DrawnLine labels={dates} metrics={metrics}/>;

export default DrawnLineExample;
