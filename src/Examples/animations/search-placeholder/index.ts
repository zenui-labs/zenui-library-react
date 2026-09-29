import type {Example} from "../../types.ts";
import FadeInPlaceholderSearch from "./FadeInPlaceholderSearch.example.tsx";
import fadeInPlaceholderSearchSource from "./FadeInPlaceholderSearch.example.tsx?raw";
import fadeInPlaceholderSearchComponentSource from "./FadeInPlaceholderSearch.tsx?raw";
import TypewriterPlaceholderSearch from "./TypewriterPlaceholderSearch.example.tsx";
import typewriterPlaceholderSearchSource from "./TypewriterPlaceholderSearch.example.tsx?raw";
import typewriterPlaceholderSearchComponentSource from "./TypewriterPlaceholderSearch.tsx?raw";
import FlipPlaceholderSearch from "./FlipPlaceholderSearch.example.tsx";
import flipPlaceholderSearchSource from "./FlipPlaceholderSearch.example.tsx?raw";
import flipPlaceholderSearchComponentSource from "./FlipPlaceholderSearch.tsx?raw";
import SlidePlaceholderSearch from "./SlidePlaceholderSearch.example.tsx";
import slidePlaceholderSearchSource from "./SlidePlaceholderSearch.example.tsx?raw";
import slidePlaceholderSearchComponentSource from "./SlidePlaceholderSearch.tsx?raw";

const examples: Example[] = [
    {
        id: "fade-in-placeholder-animation",
        title: "Fade in placeholder",
        description: "The placeholder of a search input fades up to a new hint every few seconds. It pauses while the input has focus or text.",
        component: FadeInPlaceholderSearch,
        source: fadeInPlaceholderSearchSource,
        files: [{name: "FadeInPlaceholderSearch.tsx", source: fadeInPlaceholderSearchComponentSource}],
    },
    {
        id: "type-writer-placeholder-animation",
        title: "Typewriter placeholder",
        description: "The placeholder types itself out one character at a time behind a blinking cursor, then deletes and moves to the next hint.",
        component: TypewriterPlaceholderSearch,
        source: typewriterPlaceholderSearchSource,
        files: [{name: "TypewriterPlaceholderSearch.tsx", source: typewriterPlaceholderSearchComponentSource}],
    },
    {
        id: "flip-placeholder-animation",
        title: "Flip placeholder",
        description: "Placeholder hints rotate in and out on the horizontal axis, like cards turning over.",
        component: FlipPlaceholderSearch,
        source: flipPlaceholderSearchSource,
        files: [{name: "FlipPlaceholderSearch.tsx", source: flipPlaceholderSearchComponentSource}],
    },
    {
        id: "slide-in-out-placeholder-animation",
        title: "Slide in and out placeholder",
        description: "Each hint slides out to the left before the next one slides in from the right.",
        component: SlidePlaceholderSearch,
        source: slidePlaceholderSearchSource,
        files: [{name: "SlidePlaceholderSearch.tsx", source: slidePlaceholderSearchComponentSource}],
    },
];

export default examples;
