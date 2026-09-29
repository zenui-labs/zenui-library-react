import type {Example} from "../../types.ts";
import ActivityGraph from "./ActivityGraph.example.tsx";
import activityGraphSource from "./ActivityGraph.example.tsx?raw";
import activityGraphComponentSource from "./ActivityGraph.tsx?raw";
import ActivityGraphWithMonths from "./ActivityGraphWithMonths.example.tsx";
import activityGraphWithMonthsSource from "./ActivityGraphWithMonths.example.tsx?raw";
import activityGraphWithMonthsComponentSource from "./ActivityGraphWithMonths.tsx?raw";
import ActivityGraphWithTotal from "./ActivityGraphWithTotal.example.tsx";
import activityGraphWithTotalSource from "./ActivityGraphWithTotal.example.tsx?raw";
import activityGraphWithTotalComponentSource from "./ActivityGraphWithTotal.tsx?raw";

const examples: Example[] = [
    {
        id: "github_activity_graph",
        title: "GitHub activity graph",
        description: "A GitHub style grid of daily activity that makes progress and habits easy to see. Hover a day to read its count.",
        component: ActivityGraph,
        source: activityGraphSource,
        files: [{name: "ActivityGraph.tsx", source: activityGraphComponentSource}],
        minHeight: 340,
    },
    {
        id: "github_activity_graph_with_month",
        title: "GitHub activity graph with months",
        description: "The same activity grid with month labels above the columns and the legend below.",
        component: ActivityGraphWithMonths,
        source: activityGraphWithMonthsSource,
        files: [{name: "ActivityGraphWithMonths.tsx", source: activityGraphWithMonthsComponentSource}],
        minHeight: 340,
    },
    {
        id: "calculating_total_activity",
        title: "Activity graph with total",
        description: "An activity grid with month labels that adds up the days shown and puts the total in the heading.",
        component: ActivityGraphWithTotal,
        source: activityGraphWithTotalSource,
        files: [{name: "ActivityGraphWithTotal.tsx", source: activityGraphWithTotalComponentSource}],
        minHeight: 340,
    },
];

export default examples;
