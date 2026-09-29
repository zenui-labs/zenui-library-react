import type {Example} from "../../types.ts";
import TopConsentDrawer from "./TopConsentDrawer.example.tsx";
import topConsentDrawerSource from "./TopConsentDrawer.example.tsx?raw";
import topConsentDrawerComponentSource from "./TopConsentDrawer.tsx?raw";
import BottomConsentDrawer from "./BottomConsentDrawer.example.tsx";
import bottomConsentDrawerSource from "./BottomConsentDrawer.example.tsx?raw";
import bottomConsentDrawerComponentSource from "./BottomConsentDrawer.tsx?raw";
import LeftCartDrawer from "./LeftCartDrawer.example.tsx";
import leftCartDrawerSource from "./LeftCartDrawer.example.tsx?raw";
import leftCartDrawerComponentSource from "./LeftCartDrawer.tsx?raw";
import RightCartDrawer from "./RightCartDrawer.example.tsx";
import rightCartDrawerSource from "./RightCartDrawer.example.tsx?raw";
import rightCartDrawerComponentSource from "./RightCartDrawer.tsx?raw";
import FullScreenCartDrawer from "./FullScreenCartDrawer.example.tsx";
import fullScreenCartDrawerSource from "./FullScreenCartDrawer.example.tsx?raw";
import fullScreenCartDrawerComponentSource from "./FullScreenCartDrawer.tsx?raw";

const examples: Example[] = [
    {
        id: "drawer_top",
        title: "Drawer top",
        description: "A drawer that slides down from the top of the screen, shown here as a cookie consent banner.",
        component: TopConsentDrawer,
        source: topConsentDrawerSource,
        files: [{name: "TopConsentDrawer.tsx", source: topConsentDrawerComponentSource}],
    },
    {
        id: "drawer_bottom",
        title: "Drawer bottom",
        description: "A drawer that slides up from the bottom of the screen, shown here as a cookie consent banner.",
        component: BottomConsentDrawer,
        source: bottomConsentDrawerSource,
        files: [{name: "BottomConsentDrawer.tsx", source: bottomConsentDrawerComponentSource}],
    },
    {
        id: "drawer_left",
        title: "Drawer left",
        description: "A drawer that slides in from the left side of the screen, shown here as a shopping cart with an order summary.",
        component: LeftCartDrawer,
        source: leftCartDrawerSource,
        files: [{name: "LeftCartDrawer.tsx", source: leftCartDrawerComponentSource}],
    },
    {
        id: "drawer_right",
        title: "Drawer right",
        description: "A drawer that slides in from the right side of the screen, shown here as a shopping cart with an order summary.",
        component: RightCartDrawer,
        source: rightCartDrawerSource,
        files: [{name: "RightCartDrawer.tsx", source: rightCartDrawerComponentSource}],
    },
    {
        id: "full_screen_drawer",
        title: "Full screen drawer",
        description: "A drawer that covers the whole viewport, for content that needs more room, such as a full cart and order summary.",
        component: FullScreenCartDrawer,
        source: fullScreenCartDrawerSource,
        files: [{name: "FullScreenCartDrawer.tsx", source: fullScreenCartDrawerComponentSource}],
    },
];

export default examples;
