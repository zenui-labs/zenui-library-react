import type {Example} from "../../types.ts";
import PieChart from "./PieChart.example.tsx";
import pieChartSource from "./PieChart.example.tsx?raw";
import pieChartComponentSource from "./PieChart.tsx?raw";
import DonutChart from "./DonutChart.example.tsx";
import donutChartSource from "./DonutChart.example.tsx?raw";
import donutChartComponentSource from "./DonutChart.tsx?raw";

const examples: Example[] = [
    {
        id: "fill_pie_chart",
        title: "Fill pie chart",
        description: "A solid pie chart that shows each category as a slice sized by its share of the whole, with percentage labels and a legend.",
        component: PieChart,
        source: pieChartSource,
        files: [{name: "PieChart.tsx", source: pieChartComponentSource}],
        minHeight: 480,
    },
    {
        id: "bordered_pie_chart",
        title: "Bordered pie chart",
        description: "A donut style pie chart with a hollow center, so each category reads as a band of the ring. The inner radius sets the size of the hole.",
        component: DonutChart,
        source: donutChartSource,
        files: [{name: "DonutChart.tsx", source: donutChartComponentSource}],
        minHeight: 480,
    },
];

export default examples;
