import type {Example} from "../../types.ts";
import BlurInWords from "./BlurInWords.example.tsx";
import blurInWordsSource from "./BlurInWords.example.tsx?raw";
import blurInWordsComponentSource from "./BlurInWords.tsx?raw";
import LetterPullUp from "./LetterPullUp.example.tsx";
import letterPullUpSource from "./LetterPullUp.example.tsx?raw";
import letterPullUpComponentSource from "./LetterPullUp.tsx?raw";
import BlockWipeReveal from "./BlockWipeReveal.example.tsx";
import blockWipeRevealSource from "./BlockWipeReveal.example.tsx?raw";
import blockWipeRevealComponentSource from "./BlockWipeReveal.tsx?raw";
import HighlighterMarks from "./HighlighterMarks.example.tsx";
import highlighterMarksSource from "./HighlighterMarks.example.tsx?raw";
import highlighterMarksComponentSource from "./HighlighterMarks.tsx?raw";
import GradientSweep from "./GradientSweep.example.tsx";
import gradientSweepSource from "./GradientSweep.example.tsx?raw";
import gradientSweepComponentSource from "./GradientSweep.tsx?raw";
import HoverWaveLetters from "./HoverWaveLetters.example.tsx";
import hoverWaveLettersSource from "./HoverWaveLetters.example.tsx?raw";
import hoverWaveLettersComponentSource from "./HoverWaveLetters.tsx?raw";
import CircularText from "./CircularText.example.tsx";
import circularTextSource from "./CircularText.example.tsx?raw";
import circularTextComponentSource from "./CircularText.tsx?raw";
import GlitchText from "./GlitchText.example.tsx";
import glitchTextSource from "./GlitchText.example.tsx?raw";
import glitchTextComponentSource from "./GlitchText.tsx?raw";

const examples: Example[] = [
    {
        id: "blur-in-words",
        title: "Blur in words",
        description: "Words come into focus one after another as the headline scrolls into view. Use it for hero headlines and section intros.",
        component: BlurInWords,
        source: blurInWordsSource,
        files: [{name: "BlurInWords.tsx", source: blurInWordsComponentSource}],
        minHeight: 400,
    },
    {
        id: "letter-pull-up",
        title: "Letter pull up",
        description: "Letters rise out of a clipped line and tilt upright as they land, line by line. Use it for large display type on landing pages.",
        component: LetterPullUp,
        source: letterPullUpSource,
        files: [{name: "LetterPullUp.tsx", source: letterPullUpComponentSource}],
        minHeight: 400,
    },
    {
        id: "block-wipe-reveal",
        title: "Block wipe reveal",
        description: "A solid bar sweeps across each line and leaves the text behind it. Use it for editorial intros, reports and portfolio titles.",
        component: BlockWipeReveal,
        source: blockWipeRevealSource,
        files: [{name: "BlockWipeReveal.tsx", source: blockWipeRevealComponentSource}],
        minHeight: 420,
    },
    {
        id: "highlighter-marks",
        title: "Highlighter marks",
        description: "Highlights, a hand drawn circle and a squiggle underline draw themselves across a quote in sequence. Use it to point at the numbers in a testimonial.",
        component: HighlighterMarks,
        source: highlighterMarksSource,
        files: [{name: "HighlighterMarks.tsx", source: highlighterMarksComponentSource}],
        minHeight: 400,
    },
    {
        id: "gradient-sweep",
        title: "Gradient sweep",
        description: "A band of color passes through the letters on a loop, and the announcement link runs one sweep on hover. The loop pauses off screen.",
        component: GradientSweep,
        source: gradientSweepSource,
        files: [{name: "GradientSweep.tsx", source: gradientSweepComponentSource}],
        minHeight: 380,
    },
    {
        id: "hover-wave-letters",
        title: "Hover wave letters",
        description: "Letters near the pointer rise and tilt away from it, so moving across the word sends a wave through it. Keyboard focus plays the same wave.",
        component: HoverWaveLetters,
        source: hoverWaveLettersSource,
        files: [{name: "HoverWaveLetters.tsx", source: hoverWaveLettersComponentSource}],
        minHeight: 380,
    },
    {
        id: "circular-text",
        title: "Circular text badge",
        description: "A label set on a circle turns slowly around a call to action and speeds up on hover or focus. Use it for booking links and studio sites.",
        component: CircularText,
        source: circularTextSource,
        files: [{name: "CircularText.tsx", source: circularTextComponentSource}],
        minHeight: 400,
    },
    {
        id: "glitch-text",
        title: "Glitch text",
        description: "Colored slices of the headline jump sideways in short bursts, on hover, on a timer and when retrying. Use it for error, offline and 404 pages.",
        component: GlitchText,
        source: glitchTextSource,
        files: [{name: "GlitchText.tsx", source: glitchTextComponentSource}],
        minHeight: 420,
    },
];

export default examples;
