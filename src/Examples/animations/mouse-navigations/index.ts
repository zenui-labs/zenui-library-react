import type {Example} from "../../types.ts";
import WheelScrollTabs from "./WheelScrollTabs.example.tsx";
import wheelScrollTabsSource from "./WheelScrollTabs.example.tsx?raw";
import wheelScrollTabsComponentSource from "./WheelScrollTabs.tsx?raw";
import DragScrollTabs from "./DragScrollTabs.example.tsx";
import dragScrollTabsSource from "./DragScrollTabs.example.tsx?raw";
import dragScrollTabsComponentSource from "./DragScrollTabs.tsx?raw";

const examples: Example[] = [
    {
        id: "scroll-tabs-with-mouse",
        title: "Scroll tabs with mouse",
        description: "A row of tabs that scrolls sideways with the mouse wheel or trackpad when it overflows. The picked tab moves to the center and its panel animates in.",
        component: WheelScrollTabs,
        source: wheelScrollTabsSource,
        files: [{name: "WheelScrollTabs.tsx", source: wheelScrollTabsComponentSource}],
        minHeight: 440,
    },
    {
        id: "scroll-tabs-with-mouse-and-dragging",
        title: "Scroll tabs with mouse and dragging",
        description: "A row of tabs you scroll by dragging the bar with the mouse or a finger. Use it for long tab lists on touch screens and in narrow layouts.",
        component: DragScrollTabs,
        source: dragScrollTabsSource,
        files: [{name: "DragScrollTabs.tsx", source: dragScrollTabsComponentSource}],
        minHeight: 440,
    },
];

export default examples;
