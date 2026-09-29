import type {Example} from "../../types.ts";
import MagnifyingDock from "./MagnifyingDock.example.tsx";
import magnifyingDockSource from "./MagnifyingDock.example.tsx?raw";
import magnifyingDockComponentSource from "./MagnifyingDock.tsx?raw";
import LiveBadgeDock from "./LiveBadgeDock.example.tsx";
import liveBadgeDockSource from "./LiveBadgeDock.example.tsx?raw";
import liveBadgeDockComponentSource from "./LiveBadgeDock.tsx?raw";
import LaunchDock from "./LaunchDock.example.tsx";
import launchDockSource from "./LaunchDock.example.tsx?raw";
import launchDockComponentSource from "./LaunchDock.tsx?raw";
import VerticalDock from "./VerticalDock.example.tsx";
import verticalDockSource from "./VerticalDock.example.tsx?raw";
import verticalDockComponentSource from "./VerticalDock.tsx?raw";
import EditorToolbarDock from "./EditorToolbarDock.example.tsx";
import editorToolbarDockSource from "./EditorToolbarDock.example.tsx?raw";
import editorToolbarDockComponentSource from "./EditorToolbarDock.tsx?raw";
import MobileTabBar from "./MobileTabBar.example.tsx";
import mobileTabBarSource from "./MobileTabBar.example.tsx?raw";
import mobileTabBarComponentSource from "./MobileTabBar.tsx?raw";

const examples: Example[] = [
    {
        id: "magnifying-dock",
        title: "Magnifying dock",
        description: "App icons grow as the pointer gets closer, with labels on hover and focus and a bounce when an app opens. Use it for launchers and tool palettes.",
        component: MagnifyingDock,
        source: magnifyingDockSource,
        files: [{name: "MagnifyingDock.tsx", source: magnifyingDockComponentSource}],
        minHeight: 260,
    },
    {
        id: "live-badge-dock",
        title: "Dock with labels and live badges",
        description: "Icons rise in a wave around the pointer, open apps get an indicator, and notification badges pop in as they arrive. Opening an app clears its badge.",
        component: LiveBadgeDock,
        source: liveBadgeDockSource,
        files: [{name: "LiveBadgeDock.tsx", source: liveBadgeDockComponentSource}],
        minHeight: 240,
    },
    {
        id: "launch-dock",
        title: "Launch into a window",
        description: "An icon bounces while its app loads, then the window grows out of that icon and shrinks back into it on close. Escape closes and focus returns to the dock.",
        component: LaunchDock,
        source: launchDockSource,
        files: [{name: "LaunchDock.tsx", source: launchDockComponentSource}],
        minHeight: 500,
    },
    {
        id: "vertical-dock",
        title: "Vertical side rail",
        description: "A side navigation rail that magnifies along its length, with a sliding active marker and arrow key navigation. Use it for app shells and dashboards.",
        component: VerticalDock,
        source: verticalDockSource,
        files: [{name: "VerticalDock.tsx", source: verticalDockComponentSource}],
        minHeight: 540,
    },
    {
        id: "editor-toolbar-dock",
        title: "Editor toolbar",
        description: "A floating tool palette for a canvas editor with magnification, a sliding selection, shortcut hints and a color popover. Single-key shortcuts work while the canvas has focus.",
        component: EditorToolbarDock,
        source: editorToolbarDockSource,
        files: [{name: "EditorToolbarDock.tsx", source: editorToolbarDockComponentSource}],
        minHeight: 420,
    },
    {
        id: "mobile-tab-bar",
        title: "Mobile tab bar",
        description: "Tap a tab, or press and slide along the bar to magnify icons and release on the one you want. The center button fans out quick actions.",
        component: MobileTabBar,
        source: mobileTabBarSource,
        files: [{name: "MobileTabBar.tsx", source: mobileTabBarComponentSource}],
        minHeight: 640,
    },
];

export default examples;
