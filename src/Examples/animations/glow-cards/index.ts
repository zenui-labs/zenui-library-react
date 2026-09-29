import type {Example} from "../../types.ts";
import SpotlightGrid from "./SpotlightGrid.example.tsx";
import spotlightGridSource from "./SpotlightGrid.example.tsx?raw";
import spotlightGridComponentSource from "./SpotlightGrid.tsx?raw";
import BorderBeamCard from "./BorderBeamCard.example.tsx";
import borderBeamCardSource from "./BorderBeamCard.example.tsx?raw";
import borderBeamCardComponentSource from "./BorderBeamCard.tsx?raw";
import PointerBorderCard from "./PointerBorderCard.example.tsx";
import pointerBorderCardSource from "./PointerBorderCard.example.tsx?raw";
import pointerBorderCardComponentSource from "./PointerBorderCard.tsx?raw";
import PlanPickerGlow from "./PlanPickerGlow.example.tsx";
import planPickerGlowSource from "./PlanPickerGlow.example.tsx?raw";
import planPickerGlowComponentSource from "./PlanPickerGlow.tsx?raw";
import AuroraPromptCard from "./AuroraPromptCard.example.tsx";
import auroraPromptCardSource from "./AuroraPromptCard.example.tsx?raw";
import auroraPromptCardComponentSource from "./AuroraPromptCard.tsx?raw";
import GlassSweepTiles from "./GlassSweepTiles.example.tsx";
import glassSweepTilesSource from "./GlassSweepTiles.example.tsx?raw";
import glassSweepTilesComponentSource from "./GlassSweepTiles.tsx?raw";
import NeonStatusCard from "./NeonStatusCard.example.tsx";
import neonStatusCardSource from "./NeonStatusCard.example.tsx?raw";
import neonStatusCardComponentSource from "./NeonStatusCard.tsx?raw";

const examples: Example[] = [
    {
        id: "spotlight-grid",
        title: "Pointer spotlight grid",
        description: "A soft light follows the pointer across a grid of feature cards and lights up the borders it passes. Use it for feature sections and settings overviews.",
        component: SpotlightGrid,
        source: spotlightGridSource,
        files: [{name: "SpotlightGrid.tsx", source: spotlightGridComponentSource}],
    },
    {
        id: "border-beam-card",
        title: "Border beam card",
        description: "A short beam of light travels around the edge of a card. Use it to mark a recommended plan or the one card you want people to notice.",
        component: BorderBeamCard,
        source: borderBeamCardSource,
        files: [{name: "BorderBeamCard.tsx", source: borderBeamCardComponentSource}],
        minHeight: 560,
    },
    {
        id: "pointer-border-card",
        title: "Border that faces the pointer",
        description: "The bright part of a gradient border turns toward the pointer and glows brighter as it gets closer. Use it for a deploy summary, a key action or a featured integration.",
        component: PointerBorderCard,
        source: pointerBorderCardSource,
        files: [{name: "PointerBorderCard.tsx", source: pointerBorderCardComponentSource}],
        minHeight: 540,
    },
    {
        id: "plan-picker-glow",
        title: "Plan picker with traveling glow",
        description: "A glow and gradient ring glide to the selected plan, and a fainter glow previews the card under the pointer. Built on native radio inputs.",
        component: PlanPickerGlow,
        source: planPickerGlowSource,
        files: [{name: "PlanPickerGlow.tsx", source: planPickerGlowComponentSource}],
        minHeight: 520,
    },
    {
        id: "aurora-prompt-card",
        title: "Aurora prompt card",
        description: "Blurred color drifts behind an assistant prompt and grows brighter while the input has focus or an answer is loading. Motion pauses off screen.",
        component: AuroraPromptCard,
        source: auroraPromptCardSource,
        files: [{name: "AuroraPromptCard.tsx", source: auroraPromptCardComponentSource}],
        minHeight: 480,
    },
    {
        id: "glass-sweep-tiles",
        title: "Glass tiles with light sweep",
        description: "Frosted control tiles where a band of light sweeps across the glass on hover, focus and toggle. Use it for smart home panels and quick settings.",
        component: GlassSweepTiles,
        source: glassSweepTilesSource,
        files: [{name: "GlassSweepTiles.tsx", source: glassSweepTilesComponentSource}],
        minHeight: 480,
    },
    {
        id: "neon-status-card",
        title: "Neon status sign",
        description: "A neon sign that flickers on when the switch is flipped and then hums with a slow glow. Use it for live, recording or open status.",
        component: NeonStatusCard,
        source: neonStatusCardSource,
        files: [{name: "NeonStatusCard.tsx", source: neonStatusCardComponentSource}],
        minHeight: 420,
    },
];

export default examples;
