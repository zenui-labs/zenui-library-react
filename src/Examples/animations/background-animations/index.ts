import type {Example} from "../../types.ts";
import GridDistortion from "./GridDistortion.example.tsx";
import gridDistortionSource from "./GridDistortion.example.tsx?raw";
import gridDistortionComponentSource from "./GridDistortion.tsx?raw";
import StarfieldWarp from "./StarfieldWarp.example.tsx";
import starfieldWarpSource from "./StarfieldWarp.example.tsx?raw";
import starfieldWarpComponentSource from "./StarfieldWarp.tsx?raw";
import MagneticField from "./MagneticField.example.tsx";
import magneticFieldSource from "./MagneticField.example.tsx?raw";
import magneticFieldComponentSource from "./MagneticField.tsx?raw";
import CircuitBoard from "./CircuitBoard.example.tsx";
import circuitBoardSource from "./CircuitBoard.example.tsx?raw";
import circuitBoardComponentSource from "./CircuitBoard.tsx?raw";
import StringArt from "./StringArt.example.tsx";
import stringArtSource from "./StringArt.example.tsx?raw";
import stringArtComponentSource from "./StringArt.tsx?raw";

const examples: Example[] = [
    {
        id: "grid-distortion",
        title: "Grid distortion",
        description: "A grid of thin lines that bends away from the pointer like a stretched mesh. Drawn on a canvas behind a hero message.",
        component: GridDistortion,
        source: gridDistortionSource,
        files: [{name: "GridDistortion.tsx", source: gridDistortionComponentSource}],
        minHeight: 500,
    },
    {
        id: "starfield-warp",
        title: "Starfield warp",
        description: "Stars fly toward the viewer and stretch into streaks at high speed. The farther the pointer is from the center, the faster they travel.",
        component: StarfieldWarp,
        source: starfieldWarpSource,
        files: [{name: "StarfieldWarp.tsx", source: starfieldWarpComponentSource}],
        minHeight: 500,
    },
    {
        id: "magnetic-field",
        title: "Magnetic field",
        description: "Short colored lines turn away from the pointer like iron filings around a magnet, and grow brighter the closer they are.",
        component: MagneticField,
        source: magneticFieldSource,
        files: [{name: "MagneticField.tsx", source: magneticFieldComponentSource}],
        minHeight: 500,
    },
    {
        id: "circuit-board",
        title: "Circuit board",
        description: "Nodes and paths near the pointer light up like a powered circuit and fade slowly after it moves on.",
        component: CircuitBoard,
        source: circuitBoardSource,
        files: [{name: "CircuitBoard.tsx", source: circuitBoardComponentSource}],
        minHeight: 500,
    },
    {
        id: "string-art",
        title: "String art",
        description: "Colored threads run from a ring of pins to the pointer and form a geometric pattern that changes as it moves.",
        component: StringArt,
        source: stringArtSource,
        files: [{name: "StringArt.tsx", source: stringArtComponentSource}],
        minHeight: 500,
    },
];

export default examples;
