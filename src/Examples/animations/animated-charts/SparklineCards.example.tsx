import {LiveSparklineCard, SparklineCards, type SparklineKpi} from "./SparklineCards";

const kpis: SparklineKpi[] = [
    {
        label: "Revenue",
        value: 48290,
        format: (value) => `$${Math.round(value).toLocaleString("en-US")}`,
        change: "12.4%",
        good: true,
        up: true,
        data: [31, 33, 32, 36, 35, 39, 38, 41, 40, 44, 43, 48],
        tone: "sky",
    },
    {
        label: "Active users",
        value: 12840,
        change: "5.1%",
        good: true,
        up: true,
        data: [102, 108, 104, 110, 115, 112, 118, 116, 121, 119, 125, 128],
        tone: "violet",
    },
    {
        label: "Churn rate",
        value: 2.3,
        format: (value) => `${value.toFixed(1)}%`,
        change: "0.4 pts",
        good: true,
        up: false,
        data: [3.4, 3.1, 3.3, 2.9, 3.0, 2.8, 2.9, 2.6, 2.7, 2.5, 2.4, 2.3],
        tone: "emerald",
    },
];

const MIN = 180;
const MAX = 420;

// Stands in for a live feed: a random walk that stays inside the chart range.
const nextVisitors = (previous: number) => Math.round(Math.min(MAX - 20, Math.max(MIN + 20, previous + (Math.random() - 0.48) * 60)));

const SparklineCardsExample = () => (
    <SparklineCards items={kpis}>
        <LiveSparklineCard nextValue={nextVisitors} initialValue={300} min={MIN} max={MAX}/>
    </SparklineCards>
);

export default SparklineCardsExample;
