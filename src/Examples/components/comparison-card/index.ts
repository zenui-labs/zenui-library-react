import type {Example} from "../../types.ts";
import VerticalComparison from "./VerticalComparison.example.tsx";
import verticalComparisonSource from "./VerticalComparison.example.tsx?raw";
import verticalComparisonComponentSource from "./VerticalComparison.tsx?raw";
import HorizontalComparison from "./HorizontalComparison.example.tsx";
import horizontalComparisonSource from "./HorizontalComparison.example.tsx?raw";
import horizontalComparisonComponentSource from "./HorizontalComparison.tsx?raw";

const examples: Example[] = [
    {
        id: "vertical_comparison",
        title: "Vertical comparison",
        description: "Compares two images with a divider you drag up and down to reveal more of either one. The divider also moves with the arrow keys.",
        component: VerticalComparison,
        source: verticalComparisonSource,
        files: [{name: "VerticalComparison.tsx", source: verticalComparisonComponentSource}],
        minHeight: 420,
    },
    {
        id: "horizontal_comparison",
        title: "Horizontal comparison",
        description: "Compares two images with a divider you drag left and right to reveal more of either one. The divider also moves with the arrow keys.",
        component: HorizontalComparison,
        source: horizontalComparisonSource,
        files: [{name: "HorizontalComparison.tsx", source: horizontalComparisonComponentSource}],
        minHeight: 420,
    },
];

export default examples;
