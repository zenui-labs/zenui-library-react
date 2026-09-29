import type {Example} from "../../types.ts";
import RoundedTooltip from "./RoundedTooltip.example.tsx";
import roundedTooltipSource from "./RoundedTooltip.example.tsx?raw";
import roundedTooltipComponentSource from "./RoundedTooltip.tsx?raw";
import ArrowTooltip from "./ArrowTooltip.example.tsx";
import arrowTooltipSource from "./ArrowTooltip.example.tsx?raw";
import arrowTooltipComponentSource from "./ArrowTooltip.tsx?raw";
import SlideTooltip from "./SlideTooltip.example.tsx";
import slideTooltipSource from "./SlideTooltip.example.tsx?raw";
import slideTooltipComponentSource from "./SlideTooltip.tsx?raw";
import ProfileTooltip from "./ProfileTooltip.example.tsx";
import profileTooltipSource from "./ProfileTooltip.example.tsx?raw";
import profileTooltipComponentSource from "./ProfileTooltip.tsx?raw";
import ClickTooltip from "./ClickTooltip.example.tsx";
import clickTooltipSource from "./ClickTooltip.example.tsx?raw";
import clickTooltipComponentSource from "./ClickTooltip.tsx?raw";

const examples: Example[] = [
    {
        id: "rounded_tooltip",
        title: "Rounded tooltip",
        description: "A rounded tooltip that shows a short hint below a button on hover or keyboard focus.",
        component: RoundedTooltip,
        source: roundedTooltipSource,
        files: [{name: "RoundedTooltip.tsx", source: roundedTooltipComponentSource}],
    },
    {
        id: "arrow_tooltip",
        title: "Arrow tooltip",
        description: "A tooltip with an arrow that points at its button. Put the arrow on the left, in the center or on the right.",
        component: ArrowTooltip,
        source: arrowTooltipSource,
        files: [{name: "ArrowTooltip.tsx", source: arrowTooltipComponentSource}],
    },
    {
        id: "relative_animation",
        title: "Relative animation",
        description: "A tooltip that slides in on the top, right, bottom or left of its button, so the placement can follow the layout.",
        component: SlideTooltip,
        source: slideTooltipSource,
        files: [{name: "SlideTooltip.tsx", source: slideTooltipComponentSource}],
    },
    {
        id: "profile_tooltip",
        title: "Profile tooltip",
        description: "A profile picture that opens a card with social links, the name, the role and a message button on hover, focus or tap.",
        component: ProfileTooltip,
        source: profileTooltipSource,
        files: [{name: "ProfileTooltip.tsx", source: profileTooltipComponentSource}],
    },
    {
        id: "clicked_tooltip",
        title: "Clicked tooltip",
        description: "A tooltip that opens on click to explain a specific piece of content. A click outside or Escape closes it.",
        component: ClickTooltip,
        source: clickTooltipSource,
        files: [{name: "ClickTooltip.tsx", source: clickTooltipComponentSource}],
    },
];

export default examples;
