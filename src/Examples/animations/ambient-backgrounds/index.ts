import type {Example} from "../../types.ts";
import MeteorShower from "./MeteorShower.example.tsx";
import meteorShowerSource from "./MeteorShower.example.tsx?raw";
import meteorShowerComponentSource from "./MeteorShower.tsx?raw";
import DotWave from "./DotWave.example.tsx";
import dotWaveSource from "./DotWave.example.tsx?raw";
import dotWaveComponentSource from "./DotWave.tsx?raw";
import AuroraBackground from "./AuroraBackground.example.tsx";
import auroraBackgroundSource from "./AuroraBackground.example.tsx?raw";
import auroraBackgroundComponentSource from "./AuroraBackground.tsx?raw";
import GradientMesh from "./GradientMesh.example.tsx";
import gradientMeshSource from "./GradientMesh.example.tsx?raw";
import gradientMeshComponentSource from "./GradientMesh.tsx?raw";
import ConstellationParticles from "./ConstellationParticles.example.tsx";
import constellationParticlesSource from "./ConstellationParticles.example.tsx?raw";
import constellationParticlesComponentSource from "./ConstellationParticles.tsx?raw";
import OceanWaves from "./OceanWaves.example.tsx";
import oceanWavesSource from "./OceanWaves.example.tsx?raw";
import oceanWavesComponentSource from "./OceanWaves.tsx?raw";
import StarfieldWarp from "./StarfieldWarp.example.tsx";
import starfieldWarpSource from "./StarfieldWarp.example.tsx?raw";
import starfieldWarpComponentSource from "./StarfieldWarp.tsx?raw";
import LightBeams from "./LightBeams.example.tsx";
import lightBeamsSource from "./LightBeams.example.tsx?raw";
import lightBeamsComponentSource from "./LightBeams.tsx?raw";

const examples: Example[] = [
    {
        id: "meteor-shower",
        title: "Meteor shower",
        description: "Streaks fall across a starry background behind a hero message. Use it for launch pages and announcements.",
        component: MeteorShower,
        source: meteorShowerSource,
        files: [{name: "MeteorShower.tsx", source: meteorShowerComponentSource}],
        layout: "full",
        minHeight: 420,
    },
    {
        id: "dot-wave",
        title: "Dot grid pulse",
        description: "A dot grid where pulses spread from random points and from every click, and dots light up near the pointer. Drawn on a canvas and paused while off screen.",
        component: DotWave,
        source: dotWaveSource,
        files: [{name: "DotWave.tsx", source: dotWaveComponentSource}],
        layout: "full",
        minHeight: 420,
    },
    {
        id: "aurora-background",
        title: "Aurora",
        description: "Soft blurred color fields drift on slow loops that never line up, like the northern lights, behind a launch announcement. The blobs move with transforms only and stop when hidden.",
        component: AuroraBackground,
        source: auroraBackgroundSource,
        files: [{name: "AuroraBackground.tsx", source: auroraBackgroundComponentSource}],
        layout: "full",
        minHeight: 460,
    },
    {
        id: "gradient-mesh",
        title: "Gradient mesh",
        description: "Colored light moves around on slow orbits and one glow follows the pointer. It is drawn on a tiny canvas that the browser scales up, so the mesh stays soft and cheap to render.",
        component: GradientMesh,
        source: gradientMeshSource,
        files: [{name: "GradientMesh.tsx", source: gradientMeshComponentSource}],
        layout: "full",
        minHeight: 460,
    },
    {
        id: "constellation-particles",
        title: "Constellation particles",
        description: "Floating particles link up with thin lines when they drift close, and the pointer pushes them aside. Particle count follows the section size.",
        component: ConstellationParticles,
        source: constellationParticlesSource,
        files: [{name: "ConstellationParticles.tsx", source: constellationParticlesComponentSource}],
        layout: "full",
        minHeight: 460,
    },
    {
        id: "ocean-waves",
        title: "Ocean waves",
        description: "Four layers of SVG waves roll at different speeds and directions along the bottom of a newsletter signup. Each layer loops without a seam.",
        component: OceanWaves,
        source: oceanWavesSource,
        files: [{name: "OceanWaves.tsx", source: oceanWavesComponentSource}],
        layout: "full",
        minHeight: 460,
    },
    {
        id: "starfield-warp",
        title: "Starfield warp",
        description: "A 3D starfield behind a 404 page. The vanishing point follows the pointer for parallax, and the warp button stretches the stars into streaks.",
        component: StarfieldWarp,
        source: starfieldWarpSource,
        files: [{name: "StarfieldWarp.tsx", source: starfieldWarpComponentSource}],
        layout: "full",
        minHeight: 460,
    },
    {
        id: "light-beams",
        title: "Light beams",
        description: "Beams of warm light sway from above, static film grain sits on top and a soft spotlight trails the pointer. Suited to film, music and event pages.",
        component: LightBeams,
        source: lightBeamsSource,
        files: [{name: "LightBeams.tsx", source: lightBeamsComponentSource}],
        layout: "full",
        minHeight: 460,
    },
];

export default examples;
