import type {Example} from "../../types.ts";
import AnimatedTooltip from "./AnimatedTooltip.example.tsx";
import animatedTooltipSource from "./AnimatedTooltip.example.tsx?raw";
import animatedTooltipComponentSource from "./AnimatedTooltip.tsx?raw";
import LinkPreview from "./LinkPreview.example.tsx";
import linkPreviewSource from "./LinkPreview.example.tsx?raw";
import linkPreviewComponentSource from "./LinkPreview.tsx?raw";

const examples: Example[] = [
    {
        id: "animated-tooltip",
        title: "Animated tooltip",
        description: "A row of avatars where a tooltip with the person's name and title springs in and follows the pointer on hover or focus.",
        component: AnimatedTooltip,
        source: animatedTooltipSource,
        files: [{name: "AnimatedTooltip.tsx", source: animatedTooltipComponentSource}],
    },
    {
        id: "link-preview",
        title: "Link preview",
        description: "A link that shows a card with the page title, description and thumbnail while it is hovered or focused.",
        component: LinkPreview,
        source: linkPreviewSource,
        files: [{name: "LinkPreview.tsx", source: linkPreviewComponentSource}],
        minHeight: 560,
    },
];

export default examples;
