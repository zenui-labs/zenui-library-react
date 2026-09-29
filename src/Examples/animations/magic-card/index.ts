import type {Example} from "../../types.ts";
import MagicHoverCard from "./MagicHoverCard.example.tsx";
import magicHoverCardSource from "./MagicHoverCard.example.tsx?raw";
import magicHoverCardComponentSource from "./MagicHoverCard.tsx?raw";
import RotatingGlowCard from "./RotatingGlowCard.example.tsx";
import rotatingGlowCardSource from "./RotatingGlowCard.example.tsx?raw";
import rotatingGlowCardComponentSource from "./RotatingGlowCard.tsx?raw";
import ParallaxProductCard from "./ParallaxProductCard.example.tsx";
import parallaxProductCardSource from "./ParallaxProductCard.example.tsx?raw";
import parallaxProductCardComponentSource from "./ParallaxProductCard.tsx?raw";

const examples: Example[] = [
    {
        id: "magic-hover-card",
        title: "Magic hover card",
        description: "A button that shows a preview panel which follows the pointer with spring physics. Keyboard focus opens the same panel.",
        component: MagicHoverCard,
        source: magicHoverCardSource,
        files: [{name: "MagicHoverCard.tsx", source: magicHoverCardComponentSource}],
        minHeight: 440,
    },
    {
        id: "rotating-glow-card",
        title: "Rotating glow card",
        description: "A card that tilts in 3D toward the pointer, with a spotlight that follows it and a glowing border.",
        component: RotatingGlowCard,
        source: rotatingGlowCardSource,
        files: [{name: "RotatingGlowCard.tsx", source: rotatingGlowCardComponentSource}],
        minHeight: 380,
    },
    {
        id: "3d-parallax-card",
        title: "3D parallax card",
        description: "A product card where the image and the content move at different speeds with the pointer, which creates depth. Size and color are selectable.",
        component: ParallaxProductCard,
        source: parallaxProductCardSource,
        files: [{name: "ParallaxProductCard.tsx", source: parallaxProductCardComponentSource}],
        minHeight: 500,
    },
];

export default examples;
