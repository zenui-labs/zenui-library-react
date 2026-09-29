import type {Example} from "../../types.ts";
import HorizontalMarquee from "./HorizontalMarquee.example.tsx";
import horizontalMarqueeSource from "./HorizontalMarquee.example.tsx?raw";
import horizontalMarqueeComponentSource from "./HorizontalMarquee.tsx?raw";
import VerticalMarquee from "./VerticalMarquee.example.tsx";
import verticalMarqueeSource from "./VerticalMarquee.example.tsx?raw";
import verticalMarqueeComponentSource from "./VerticalMarquee.tsx?raw";

const examples: Example[] = [
    {
        id: "horizontal_marquee",
        title: "Horizontal marquee",
        description: "Two rows of links that scroll sideways in opposite directions in a continuous loop. Hover or focus a row to pause it.",
        component: HorizontalMarquee,
        source: horizontalMarqueeSource,
        files: [{name: "HorizontalMarquee.tsx", source: horizontalMarqueeComponentSource}],
    },
    {
        id: "vertical_marquee",
        title: "Vertical marquee",
        description: "Two columns of links that scroll up and down in a continuous loop. Hover or focus a column to pause it.",
        component: VerticalMarquee,
        source: verticalMarqueeSource,
        files: [{name: "VerticalMarquee.tsx", source: verticalMarqueeComponentSource}],
        minHeight: 400,
    },
];

export default examples;
