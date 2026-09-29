import {StackedArea, type AreaSeries} from "./StackedArea";

// Weekly sessions in thousands, by traffic source.
const sources: AreaSeries[] = [
    {id: "organic", label: "Organic search", values: [22, 24, 23, 27, 29, 28, 31, 34, 33, 36, 38, 41], fill: "fill-indigo-500/80", stroke: "stroke-indigo-500", dot: "bg-indigo-500"},
    {id: "direct", label: "Direct", values: [14, 15, 17, 16, 18, 19, 18, 20, 22, 21, 23, 24], fill: "fill-sky-400/80", stroke: "stroke-sky-400", dot: "bg-sky-400"},
    {id: "referral", label: "Referral", values: [6, 7, 9, 8, 11, 10, 12, 11, 13, 15, 14, 16], fill: "fill-emerald-400/80", stroke: "stroke-emerald-400", dot: "bg-emerald-400"},
    {id: "social", label: "Social", values: [4, 5, 5, 9, 7, 6, 8, 12, 9, 10, 13, 11], fill: "fill-amber-400/80", stroke: "stroke-amber-400", dot: "bg-amber-400"},
];

const weeks = sources[0].values.map((_, index) => `Week ${index + 1}`);
const weekTicks = weeks.map((_, index) => `W${index + 1}`);

const StackedAreaExample = () => <StackedArea labels={weeks} axisLabels={weekTicks} series={sources}/>;

export default StackedAreaExample;
