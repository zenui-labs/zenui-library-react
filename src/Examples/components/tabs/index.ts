import type {Example} from "../../types.ts";
import BorderTabs from "./BorderTabs.example.tsx";
import borderTabsSource from "./BorderTabs.example.tsx?raw";
import borderTabsComponentSource from "./BorderTabs.tsx?raw";
import AnimatedTabs from "./AnimatedTabs.example.tsx";
import animatedTabsSource from "./AnimatedTabs.example.tsx?raw";
import animatedTabsComponentSource from "./AnimatedTabs.tsx?raw";
import BottomBorderTabs from "./BottomBorderTabs.example.tsx";
import bottomBorderTabsSource from "./BottomBorderTabs.example.tsx?raw";
import bottomBorderTabsComponentSource from "./BottomBorderTabs.tsx?raw";
import TopBorderTabs from "./TopBorderTabs.example.tsx";
import topBorderTabsSource from "./TopBorderTabs.example.tsx?raw";
import topBorderTabsComponentSource from "./TopBorderTabs.tsx?raw";
import SquareBorderTabs from "./SquareBorderTabs.example.tsx";
import squareBorderTabsSource from "./SquareBorderTabs.example.tsx?raw";
import squareBorderTabsComponentSource from "./SquareBorderTabs.tsx?raw";
import PillTabs from "./PillTabs.example.tsx";
import pillTabsSource from "./PillTabs.example.tsx?raw";
import pillTabsComponentSource from "./PillTabs.tsx?raw";
import IconToggleTabs from "./IconToggleTabs.example.tsx";
import iconToggleTabsSource from "./IconToggleTabs.example.tsx?raw";
import iconToggleTabsComponentSource from "./IconToggleTabs.tsx?raw";

const examples: Example[] = [
    {
        id: "Border_navigation",
        title: "Border tabs",
        description: "Tabs with a border on every side. The selected tab fills with the accent color.",
        component: BorderTabs,
        source: borderTabsSource,
        files: [{name: "BorderTabs.tsx", source: borderTabsComponentSource}],
    },
    {
        id: "animated_tab",
        title: "Animated tabs",
        description: "Tabs on a rounded track with a pill that slides to the selected tab. The pill sizes itself to each label.",
        component: AnimatedTabs,
        source: animatedTabsSource,
        files: [{name: "AnimatedTabs.tsx", source: animatedTabsComponentSource}],
    },
    {
        id: "bottom_border_navigation",
        title: "Bottom border tabs",
        description: "Tabs that mark the selected tab with a colored bottom border.",
        component: BottomBorderTabs,
        source: bottomBorderTabsSource,
        files: [{name: "BottomBorderTabs.tsx", source: bottomBorderTabsComponentSource}],
    },
    {
        id: "top_border_navigation",
        title: "Top border tabs",
        description: "Tabs on a gray strip that mark the selected tab with a colored top border.",
        component: TopBorderTabs,
        source: topBorderTabsSource,
        files: [{name: "TopBorderTabs.tsx", source: topBorderTabsComponentSource}],
    },
    {
        id: "Squre_border_navigation",
        title: "Square border tabs",
        description: "Folder style tabs. The selected tab is outlined on three sides and opens into the content below.",
        component: SquareBorderTabs,
        source: squareBorderTabsSource,
        files: [{name: "SquareBorderTabs.tsx", source: squareBorderTabsComponentSource}],
    },
    {
        id: "box_navigation",
        title: "Pill tabs",
        description: "Tabs on a rounded track that mark the selected tab with a filled pill.",
        component: PillTabs,
        source: pillTabsSource,
        files: [{name: "PillTabs.tsx", source: pillTabsComponentSource}],
    },
    {
        id: "toggle_button",
        title: "Icon toggle tabs",
        description: "Round icon tabs where the selected one widens to show its label on the accent color. Built on radio inputs, so arrow keys move the selection.",
        component: IconToggleTabs,
        source: iconToggleTabsSource,
        files: [{name: "IconToggleTabs.tsx", source: iconToggleTabsComponentSource}],
    },
];

export default examples;
