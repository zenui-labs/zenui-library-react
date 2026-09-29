import type {Example} from "../../types.ts";
import MagnetProjectCard from "./MagnetProjectCard.example.tsx";
import magnetProjectCardSource from "./MagnetProjectCard.example.tsx?raw";
import magnetProjectCardComponentSource from "./MagnetProjectCard.tsx?raw";
import MagnetTiltCard from "./MagnetTiltCard.example.tsx";
import magnetTiltCardSource from "./MagnetTiltCard.example.tsx?raw";
import magnetTiltCardComponentSource from "./MagnetTiltCard.tsx?raw";

const examples: Example[] = [
    {
        id: "basic-magnet-card",
        title: "Basic magnet card",
        description: "A project card that is pulled gently toward the cursor and tilts a little on hover.",
        component: MagnetProjectCard,
        source: magnetProjectCardSource,
        files: [{name: "MagnetProjectCard.tsx", source: magnetProjectCardComponentSource}],
        minHeight: 520,
    },
    {
        id: "3d-magnet-card",
        title: "3D magnet card",
        description: "A card with a stronger magnetic pull that tilts in 3D and grows slightly as the cursor moves across it.",
        component: MagnetTiltCard,
        source: magnetTiltCardSource,
        files: [{name: "MagnetTiltCard.tsx", source: magnetTiltCardComponentSource}],
        minHeight: 480,
    },
];

export default examples;
