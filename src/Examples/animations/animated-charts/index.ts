import type {Example} from "../../types.ts";
import RevenueBars from "./RevenueBars.example.tsx";
import revenueBarsSource from "./RevenueBars.example.tsx?raw";
import revenueBarsComponentSource from "./RevenueBars.tsx?raw";
import DrawnLine from "./DrawnLine.example.tsx";
import drawnLineSource from "./DrawnLine.example.tsx?raw";
import drawnLineComponentSource from "./DrawnLine.tsx?raw";
import StorageDonut from "./StorageDonut.example.tsx";
import storageDonutSource from "./StorageDonut.example.tsx?raw";
import storageDonutComponentSource from "./StorageDonut.tsx?raw";
import BarRace from "./BarRace.example.tsx";
import barRaceSource from "./BarRace.example.tsx?raw";
import barRaceComponentSource from "./BarRace.tsx?raw";
import SparklineCards from "./SparklineCards.example.tsx";
import sparklineCardsSource from "./SparklineCards.example.tsx?raw";
import sparklineCardsComponentSource from "./SparklineCards.tsx?raw";
import RadialGauges from "./RadialGauges.example.tsx";
import radialGaugesSource from "./RadialGauges.example.tsx?raw";
import radialGaugesComponentSource from "./RadialGauges.tsx?raw";
import StackedArea from "./StackedArea.example.tsx";
import stackedAreaSource from "./StackedArea.example.tsx?raw";
import stackedAreaComponentSource from "./StackedArea.tsx?raw";

const examples: Example[] = [
    {
        id: "revenue-bars",
        title: "Bar chart with tooltips",
        description: "Bars grow from the baseline when the chart scrolls into view. Hover or use the arrow keys to read each month, and switch years to watch the bars resize.",
        component: RevenueBars,
        source: revenueBarsSource,
        files: [{name: "RevenueBars.tsx", source: revenueBarsComponentSource}],
        minHeight: 460,
    },
    {
        id: "drawn-line",
        title: "Line chart that draws itself",
        description: "The line draws in with a dot riding its tip, then keeps a soft pulse on the latest value. Switching metrics morphs the line into its new shape.",
        component: DrawnLine,
        source: drawnLineSource,
        files: [{name: "DrawnLine.tsx", source: drawnLineComponentSource}],
        minHeight: 440,
    },
    {
        id: "storage-donut",
        title: "Donut chart with legend",
        description: "Segments draw in one continuous sweep. Hovering a segment or focusing a legend row enlarges it and shows its share in the center.",
        component: StorageDonut,
        source: storageDonutSource,
        files: [{name: "StorageDonut.tsx", source: storageDonutComponentSource}],
        minHeight: 420,
    },
    {
        id: "bar-race",
        title: "Bar chart race",
        description: "A ranking that replays quarter by quarter, with rows sliding into their new order and values counting between readings. Pause it or scrub with the slider.",
        component: BarRace,
        source: barRaceSource,
        files: [{name: "BarRace.tsx", source: barRaceComponentSource}],
        minHeight: 460,
    },
    {
        id: "sparkline-cards",
        title: "Sparkline cards",
        description: "KPI cards whose numbers count up and whose sparklines draw in on view. The live card scrolls left as each new reading arrives.",
        component: SparklineCards,
        source: sparklineCardsSource,
        files: [{name: "SparklineCards.tsx", source: sparklineCardsComponentSource}],
        minHeight: 420,
    },
    {
        id: "radial-gauges",
        title: "Radial gauges",
        description: "Ring gauges that fill and change color past each threshold, plus a dial whose needle overshoots slightly before it settles.",
        component: RadialGauges,
        source: radialGaugesSource,
        files: [{name: "RadialGauges.tsx", source: radialGaugesComponentSource}],
        minHeight: 420,
    },
    {
        id: "stacked-area",
        title: "Stacked area chart",
        description: "Stacked bands rise from the baseline on view. Turning a source off in the legend flattens its band while the others restack around it.",
        component: StackedArea,
        source: stackedAreaSource,
        files: [{name: "StackedArea.tsx", source: stackedAreaComponentSource}],
        minHeight: 480,
    },
];

export default examples;
