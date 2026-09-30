import type {Example} from "../../types.ts";
import RadialMenu from "./RadialMenu.example.tsx";
import radialMenuSource from "./RadialMenu.example.tsx?raw";
import radialMenuComponentSource from "./RadialMenu.tsx?raw";
import DrumPicker from "./DrumPicker.example.tsx";
import drumPickerSource from "./DrumPicker.example.tsx?raw";
import drumPickerComponentSource from "./DrumPicker.tsx?raw";
import FisheyeIndex from "./FisheyeIndex.example.tsx";
import fisheyeIndexSource from "./FisheyeIndex.example.tsx?raw";
import fisheyeIndexComponentSource from "./FisheyeIndex.tsx?raw";
import FolderTabs from "./FolderTabs.example.tsx";
import folderTabsSource from "./FolderTabs.example.tsx?raw";
import folderTabsComponentSource from "./FolderTabs.tsx?raw";
import MinimapScroller from "./MinimapScroller.example.tsx";
import minimapScrollerSource from "./MinimapScroller.example.tsx?raw";
import minimapScrollerComponentSource from "./MinimapScroller.tsx?raw";

const examples: Example[] = [
    {
        id: "radial-menu",
        title: "Radial tool menu",
        description: "A marking menu for canvas apps: hold, right-click or press Space, flick toward a tool and let go. Wedges are picked by direction, groups fan out into an outer ring, and arrow keys aim like a d-pad.",
        component: RadialMenu,
        source: radialMenuSource,
        files: [{name: "RadialMenu.tsx", source: radialMenuComponentSource}],
        minHeight: 520,
    },
    {
        id: "drum-picker",
        title: "Drum picker",
        description: "An iOS style wheel picker built as real 3D drums, with momentum, notched snapping and looping columns. It works with drag, scroll wheel, tap, arrow keys and type-ahead.",
        component: DrumPicker,
        source: drumPickerSource,
        files: [{name: "DrumPicker.tsx", source: drumPickerComponentSource}],
        minHeight: 420,
    },
    {
        id: "fisheye-index",
        title: "Fisheye index",
        description: "A dense table of contents that magnifies around the pointer like a vertical dock, with a preview of the chapter under the lens. Arrow keys move the lens and reduced motion removes the easing.",
        component: FisheyeIndex,
        source: fisheyeIndexSource,
        files: [{name: "FisheyeIndex.tsx", source: fisheyeIndexComponentSource}],
        minHeight: 620,
    },
    {
        id: "folder-tabs",
        title: "File folder tabs",
        description: "Tabs drawn as a stack of paper folders. The chosen folder lifts out of the stack and drops in front while the others slide back. Arrow keys, Home and End move between tabs.",
        component: FolderTabs,
        source: folderTabsSource,
        files: [{name: "FolderTabs.tsx", source: folderTabsComponentSource}],
        minHeight: 520,
    },
    {
        id: "minimap-scroller",
        title: "Minimap scroller",
        description: "A reading panel with a code editor style minimap measured from the real line lengths of any content. Drag the window, click to jump, or use the labelled heading ticks.",
        component: MinimapScroller,
        source: minimapScrollerSource,
        files: [{name: "MinimapScroller.tsx", source: minimapScrollerComponentSource}],
        minHeight: 520,
    },
];

export default examples;
