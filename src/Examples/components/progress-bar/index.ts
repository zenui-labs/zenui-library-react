import type {Example} from "../../types.ts";
import BasicProgressBar from "./BasicProgressBar.example.tsx";
import basicProgressBarSource from "./BasicProgressBar.example.tsx?raw";
import basicProgressBarComponentSource from "./BasicProgressBar.tsx?raw";
import TooltipProgressBar from "./TooltipProgressBar.example.tsx";
import tooltipProgressBarSource from "./TooltipProgressBar.example.tsx?raw";
import tooltipProgressBarComponentSource from "./TooltipProgressBar.tsx?raw";
import LabeledProgressBar from "./LabeledProgressBar.example.tsx";
import labeledProgressBarSource from "./LabeledProgressBar.example.tsx?raw";
import labeledProgressBarComponentSource from "./LabeledProgressBar.tsx?raw";
import CircularProgressBar from "./CircularProgressBar.example.tsx";
import circularProgressBarSource from "./CircularProgressBar.example.tsx?raw";
import circularProgressBarComponentSource from "./CircularProgressBar.tsx?raw";
import StripedProgressBar from "./StripedProgressBar.example.tsx";
import stripedProgressBarSource from "./StripedProgressBar.example.tsx?raw";
import stripedProgressBarComponentSource from "./StripedProgressBar.tsx?raw";

const examples: Example[] = [
    {
        id: "basic_progress_bar",
        title: "Basic progress bar",
        description: "A simple bar that shows how much of a task or process is complete.",
        component: BasicProgressBar,
        source: basicProgressBarSource,
        files: [{name: "BasicProgressBar.tsx", source: basicProgressBarComponentSource}],
    },
    {
        id: "progress_bar_with_tooltip",
        title: "Progress bar with tooltip",
        description: "A progress bar with a tooltip that follows the end of the fill and shows the exact percentage.",
        component: TooltipProgressBar,
        source: tooltipProgressBarSource,
        files: [{name: "TooltipProgressBar.tsx", source: tooltipProgressBarComponentSource}],
    },
    {
        id: "progress_bar_with_showing_percentage",
        title: "Progress bar with percentage",
        description: "A progress bar with the completion percentage written under it.",
        component: LabeledProgressBar,
        source: labeledProgressBarSource,
        files: [{name: "LabeledProgressBar.tsx", source: labeledProgressBarComponentSource}],
    },
    {
        id: "circle_progress_bar",
        title: "Circle progress bar",
        description: "A circular progress bar with the completion percentage in the center.",
        component: CircularProgressBar,
        source: circularProgressBarSource,
        files: [{name: "CircularProgressBar.tsx", source: circularProgressBarComponentSource}],
    },
    {
        id: "striped_animated_progress_bar",
        title: "Striped animated progress bar",
        description: "A progress bar with moving diagonal stripes that show a task is still running.",
        component: StripedProgressBar,
        source: stripedProgressBarSource,
        files: [{name: "StripedProgressBar.tsx", source: stripedProgressBarComponentSource}],
    },
];

export default examples;
