import type {Example} from "../../types.ts";
import AnimatedPagination from "./AnimatedPagination.example.tsx";
import animatedPaginationSource from "./AnimatedPagination.example.tsx?raw";
import animatedPaginationComponentSource from "./AnimatedPagination.tsx?raw";
import ButtonPagination from "./ButtonPagination.example.tsx";
import buttonPaginationSource from "./ButtonPagination.example.tsx?raw";
import buttonPaginationComponentSource from "./ButtonPagination.tsx?raw";
import RoundedPagination from "./RoundedPagination.example.tsx";
import roundedPaginationSource from "./RoundedPagination.example.tsx?raw";
import roundedPaginationComponentSource from "./RoundedPagination.tsx?raw";
import SmartPagination from "./SmartPagination.example.tsx";
import smartPaginationSource from "./SmartPagination.example.tsx?raw";
import smartPaginationComponentSource from "./SmartPagination.tsx?raw";

const examples: Example[] = [
    {
        id: "animated_pagination",
        title: "Animated pagination",
        description: "Round page buttons that scale up when selected, with arrow buttons for the previous and next page.",
        component: AnimatedPagination,
        source: animatedPaginationSource,
        files: [{name: "AnimatedPagination.tsx", source: animatedPaginationComponentSource}],
    },
    {
        id: "pagination_with_button",
        title: "Pagination with buttons",
        description: "Page number buttons between Previous and Next buttons for moving through pages of content.",
        component: ButtonPagination,
        source: buttonPaginationSource,
        files: [{name: "ButtonPagination.tsx", source: buttonPaginationComponentSource}],
    },
    {
        id: "pagination_with_rounded_button",
        title: "Pagination with rounded buttons",
        description: "Pill-shaped Previous and Next buttons around round page numbers that grow slightly on hover.",
        component: RoundedPagination,
        source: roundedPaginationSource,
        files: [{name: "RoundedPagination.tsx", source: roundedPaginationComponentSource}],
    },
    {
        id: "smarter_pagination_component",
        title: "Smarter pagination",
        description: "Pagination for long lists that keeps the first and last page visible and shows only the pages around the current one.",
        component: SmartPagination,
        source: smartPaginationSource,
        files: [{name: "SmartPagination.tsx", source: smartPaginationComponentSource}],
    },
];

export default examples;
