import type {Example} from "../../types.ts";
import VerticalImageAccordion from "./VerticalImageAccordion.example.tsx";
import verticalImageAccordionSource from "./VerticalImageAccordion.example.tsx?raw";
import verticalImageAccordionComponentSource from "./VerticalImageAccordion.tsx?raw";
import CircleImageAccordion from "./CircleImageAccordion.example.tsx";
import circleImageAccordionSource from "./CircleImageAccordion.example.tsx?raw";
import circleImageAccordionComponentSource from "./CircleImageAccordion.tsx?raw";
import HoverImageAccordion from "./HoverImageAccordion.example.tsx";
import hoverImageAccordionSource from "./HoverImageAccordion.example.tsx?raw";
import hoverImageAccordionComponentSource from "./HoverImageAccordion.tsx?raw";
import StaggeredTextAccordion from "./StaggeredTextAccordion.example.tsx";
import staggeredTextAccordionSource from "./StaggeredTextAccordion.example.tsx?raw";
import staggeredTextAccordionComponentSource from "./StaggeredTextAccordion.tsx?raw";

const examples: Example[] = [
    {
        id: "clickable-vertical-accordion",
        title: "Clickable vertical accordion",
        description: "Stacked image panels where clicking a closed panel opens it to show its text and action buttons. Use it for destinations, collections or featured categories.",
        component: VerticalImageAccordion,
        source: verticalImageAccordionSource,
        files: [{name: "VerticalImageAccordion.tsx", source: verticalImageAccordionComponentSource}],
        minHeight: 640,
    },
    {
        id: "circle-accordion",
        title: "Circle accordion",
        description: "Round image thumbnails that grow into a large circle with a title, text and a button when clicked. Closed circles show their position number.",
        component: CircleImageAccordion,
        source: circleImageAccordionSource,
        files: [{name: "CircleImageAccordion.tsx", source: circleImageAccordionComponentSource}],
        minHeight: 420,
    },
    {
        id: "hovered-horizontal-accordion",
        title: "Hovered horizontal accordion",
        description: "Image panels side by side that widen on hover or keyboard focus to reveal their details, with no clicks needed.",
        component: HoverImageAccordion,
        source: hoverImageAccordionSource,
        files: [{name: "HoverImageAccordion.tsx", source: hoverImageAccordionComponentSource}],
        minHeight: 540,
    },
    {
        id: "staggered-text-with-progress-bar",
        title: "Staggered text with progress bar",
        description: "An accordion whose body text appears word by word while a gradient bar fills along the bottom of the open item.",
        component: StaggeredTextAccordion,
        source: staggeredTextAccordionSource,
        files: [{name: "StaggeredTextAccordion.tsx", source: staggeredTextAccordionComponentSource}],
        minHeight: 520,
    },
];

export default examples;
