import type {Example} from "../../types.ts";
import AnimatedLineChart from "./AnimatedLineChart.example.tsx";
import animatedLineChartSource from "./AnimatedLineChart.example.tsx?raw";
import animatedLineChartComponentSource from "./AnimatedLineChart.tsx?raw";
import AnimatedBarChart from "./AnimatedBarChart.example.tsx";
import animatedBarChartSource from "./AnimatedBarChart.example.tsx?raw";
import animatedBarChartComponentSource from "./AnimatedBarChart.tsx?raw";
import AnimatedAreaChart from "./AnimatedAreaChart.example.tsx";
import animatedAreaChartSource from "./AnimatedAreaChart.example.tsx?raw";
import animatedAreaChartComponentSource from "./AnimatedAreaChart.tsx?raw";

const examples: Example[] = [
    {
        id: "animated_line_chart",
        title: "Animated line chart",
        description: "A line chart for showing a trend over time. The line draws in, then each data point appears along labeled axes.",
        component: AnimatedLineChart,
        source: animatedLineChartSource,
        files: [{name: "AnimatedLineChart.tsx", source: animatedLineChartComponentSource}],
        minHeight: 420,
    },
    {
        id: "animated_bar_chart",
        title: "Animated bar chart",
        description: "A bar chart for comparing categories. Bars grow from the axis one after another.",
        component: AnimatedBarChart,
        source: animatedBarChartSource,
        files: [{name: "AnimatedBarChart.tsx", source: animatedBarChartComponentSource}],
        minHeight: 420,
    },
    {
        id: "animated_area_chart",
        title: "Animated area chart",
        description: "A line chart with a gradient filled area below it, for showing volume as well as the trend.",
        component: AnimatedAreaChart,
        source: animatedAreaChartSource,
        files: [{name: "AnimatedAreaChart.tsx", source: animatedAreaChartComponentSource}],
        minHeight: 420,
    },
];

export default examples;
