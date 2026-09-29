import type {Example} from "../../types.ts";
import RevenueBars from "./RevenueBars.example.tsx";
import revenueBarsSource from "./RevenueBars.example.tsx?raw";
import DrawnLine from "./DrawnLine.example.tsx";
import drawnLineSource from "./DrawnLine.example.tsx?raw";
import StorageDonut from "./StorageDonut.example.tsx";
import storageDonutSource from "./StorageDonut.example.tsx?raw";
import BarRace from "./BarRace.example.tsx";
import barRaceSource from "./BarRace.example.tsx?raw";
import SparklineCards from "./SparklineCards.example.tsx";
import sparklineCardsSource from "./SparklineCards.example.tsx?raw";
import RadialGauges from "./RadialGauges.example.tsx";
import radialGaugesSource from "./RadialGauges.example.tsx?raw";
import StackedArea from "./StackedArea.example.tsx";
import stackedAreaSource from "./StackedArea.example.tsx?raw";

const examples: Example[] = [
    {
        id: "revenue-bars",
        title: "Bar chart with tooltips",
        description: "Bars grow from the baseline when the chart scrolls into view. Hover or use the arrow keys to read each month, and switch years to watch the bars resize.",
        component: RevenueBars,
        source: revenueBarsSource,
        minHeight: 460,
    },
    {
        id: "drawn-line",
        title: "Line chart that draws itself",
        description: "The line draws in with a dot riding its tip, then keeps a soft pulse on the latest value. Switching metrics morphs the line into its new shape.",
        component: DrawnLine,
        source: drawnLineSource,
        minHeight: 440,
    },
    {
        id: "storage-donut",
        title: "Donut chart with legend",
        description: "Segments draw in one continuous sweep. Hovering a segment or focusing a legend row enlarges it and shows its share in the center.",
        component: StorageDonut,
        source: storageDonutSource,
        minHeight: 420,
    },
    {
        id: "bar-race",
        title: "Bar chart race",
        description: "A ranking that replays quarter by quarter, with rows sliding into their new order and values counting between readings. Pause it or scrub with the slider.",
        component: BarRace,
        source: barRaceSource,
        minHeight: 460,
    },
    {
        id: "sparkline-cards",
        title: "Sparkline cards",
        description: "KPI cards whose numbers count up and whose sparklines draw in on view. The live card scrolls left as each new reading arrives.",
        component: SparklineCards,
        source: sparklineCardsSource,
        minHeight: 420,
    },
    {
        id: "radial-gauges",
        title: "Radial gauges",
        description: "Ring gauges that fill and change color past each threshold, plus a dial whose needle overshoots slightly before it settles.",
        component: RadialGauges,
        source: radialGaugesSource,
        minHeight: 420,
    },
    {
        id: "stacked-area",
        title: "Stacked area chart",
        description: "Stacked bands rise from the baseline on view. Turning a source off in the legend flattens its band while the others restack around it.",
        component: StackedArea,
        source: stackedAreaSource,
        minHeight: 480,
    },
];

export default examples;
