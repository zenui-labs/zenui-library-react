import type {Example} from "../../types.ts";
import BlurInWords from "./BlurInWords.example.tsx";
import blurInWordsSource from "./BlurInWords.example.tsx?raw";
import LetterPullUp from "./LetterPullUp.example.tsx";
import letterPullUpSource from "./LetterPullUp.example.tsx?raw";
import BlockWipeReveal from "./BlockWipeReveal.example.tsx";
import blockWipeRevealSource from "./BlockWipeReveal.example.tsx?raw";
import HighlighterMarks from "./HighlighterMarks.example.tsx";
import highlighterMarksSource from "./HighlighterMarks.example.tsx?raw";
import GradientSweep from "./GradientSweep.example.tsx";
import gradientSweepSource from "./GradientSweep.example.tsx?raw";
import HoverWaveLetters from "./HoverWaveLetters.example.tsx";
import hoverWaveLettersSource from "./HoverWaveLetters.example.tsx?raw";
import CircularText from "./CircularText.example.tsx";
import circularTextSource from "./CircularText.example.tsx?raw";
import GlitchText from "./GlitchText.example.tsx";
import glitchTextSource from "./GlitchText.example.tsx?raw";

const examples: Example[] = [
    {
        id: "blur-in-words",
        title: "Blur in words",
        description: "Words come into focus one after another as the headline scrolls into view. Use it for hero headlines and section intros.",
        component: BlurInWords,
        source: blurInWordsSource,
        minHeight: 400,
    },
    {
        id: "letter-pull-up",
        title: "Letter pull up",
        description: "Letters rise out of a clipped line and tilt upright as they land, line by line. Use it for large display type on landing pages.",
        component: LetterPullUp,
        source: letterPullUpSource,
        minHeight: 400,
    },
    {
        id: "block-wipe-reveal",
        title: "Block wipe reveal",
        description: "A solid bar sweeps across each line and leaves the text behind it. Use it for editorial intros, reports and portfolio titles.",
        component: BlockWipeReveal,
        source: blockWipeRevealSource,
        minHeight: 420,
    },
    {
        id: "highlighter-marks",
        title: "Highlighter marks",
        description: "Highlights, a hand drawn circle and a squiggle underline draw themselves across a quote in sequence. Use it to point at the numbers in a testimonial.",
        component: HighlighterMarks,
        source: highlighterMarksSource,
        minHeight: 400,
    },
    {
        id: "gradient-sweep",
        title: "Gradient sweep",
        description: "A band of color passes through the letters on a loop, and the announcement link runs one sweep on hover. The loop pauses off screen.",
        component: GradientSweep,
        source: gradientSweepSource,
        minHeight: 380,
    },
    {
        id: "hover-wave-letters",
        title: "Hover wave letters",
        description: "Letters near the pointer rise and tilt away from it, so moving across the word sends a wave through it. Keyboard focus plays the same wave.",
        component: HoverWaveLetters,
        source: hoverWaveLettersSource,
        minHeight: 380,
    },
    {
        id: "circular-text",
        title: "Circular text badge",
        description: "A label set on a circle turns slowly around a call to action and speeds up on hover or focus. Use it for booking links and studio sites.",
        component: CircularText,
        source: circularTextSource,
        minHeight: 400,
    },
    {
        id: "glitch-text",
        title: "Glitch text",
        description: "Colored slices of the headline jump sideways in short bursts, on hover, on a timer and when retrying. Use it for error, offline and 404 pages.",
        component: GlitchText,
        source: glitchTextSource,
        minHeight: 420,
    },
];

export default examples;
