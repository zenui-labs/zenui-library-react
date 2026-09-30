import type {Example} from "../../types.ts";
import KineticWeightHero from "./KineticWeightHero.example.tsx";
import kineticWeightHeroSource from "./KineticWeightHero.example.tsx?raw";
import kineticWeightHeroComponentSource from "./KineticWeightHero.tsx?raw";
import PullCordHero from "./PullCordHero.example.tsx";
import pullCordHeroSource from "./PullCordHero.example.tsx?raw";
import pullCordHeroComponentSource from "./PullCordHero.tsx?raw";
import DotGlobeHero from "./DotGlobeHero.example.tsx";
import dotGlobeHeroSource from "./DotGlobeHero.example.tsx?raw";
import dotGlobeHeroComponentSource from "./DotGlobeHero.tsx?raw";
import DesktopHero from "./DesktopHero.example.tsx";
import desktopHeroSource from "./DesktopHero.example.tsx?raw";
import desktopHeroComponentSource from "./DesktopHero.tsx?raw";
import EclipseHero from "./EclipseHero.example.tsx";
import eclipseHeroSource from "./EclipseHero.example.tsx?raw";
import eclipseHeroComponentSource from "./EclipseHero.tsx?raw";

const examples: Example[] = [
    {
        id: "kinetic-weight-hero",
        title: "Kinetic weight",
        description: "A type-specimen hero where each letter of the headline gets heavier as the pointer gets close, like a lens moving through the type. Touch screens get a slow wave, the lens can be moved with the arrow keys, and reduced motion turns off the idle wave.",
        component: KineticWeightHero,
        source: kineticWeightHeroSource,
        files: [{name: "KineticWeightHero.tsx", source: kineticWeightHeroComponentSource}],
        layout: "full",
        minHeight: 600,
    },
    {
        id: "pull-cord-hero",
        title: "Pull cord",
        description: "The hero starts in a dark room. Pull the lamp's cord, a small physics rope, and a warm cone of light shows the headline; pull again to turn it off. A wall switch button works the same light from the keyboard.",
        component: PullCordHero,
        source: pullCordHeroSource,
        files: [{name: "PullCordHero.tsx", source: pullCordHeroComponentSource}],
        layout: "full",
        minHeight: 640,
    },
    {
        id: "dot-globe-hero",
        title: "Dot globe",
        description: "A dotted globe on a canvas, with arcs rising between cities and a log of each arrival. Drag or use the arrow keys to spin it and it slows to a stop. It pauses off screen and stops spinning on its own with reduced motion.",
        component: DotGlobeHero,
        source: dotGlobeHeroSource,
        files: [{name: "DotGlobeHero.tsx", source: dotGlobeHeroComponentSource}],
        layout: "full",
        minHeight: 620,
    },
    {
        id: "desktop-hero",
        title: "Desktop",
        description: "A hero laid out as a small retro desktop, with a live clock, icons, a dock and three windows you can drag, focus and minimise. Use it for developer tools: one window holds the pitch, one types the install command, one shows the changelog.",
        component: DesktopHero,
        source: desktopHeroSource,
        files: [{name: "DesktopHero.tsx", source: desktopHeroComponentSource}],
        layout: "full",
        minHeight: 640,
    },
    {
        id: "eclipse-hero",
        title: "Eclipse",
        description: "The moon follows the pointer across the sun and the sky darkens as it covers it. Near totality the diamond ring flashes and the corona appears, and the headline only fully shows at totality. Touch screens play a slow loop, and a slider controls the eclipse from the keyboard.",
        component: EclipseHero,
        source: eclipseHeroSource,
        files: [{name: "EclipseHero.tsx", source: eclipseHeroComponentSource}],
        layout: "full",
        minHeight: 640,
    },
];

export default examples;
