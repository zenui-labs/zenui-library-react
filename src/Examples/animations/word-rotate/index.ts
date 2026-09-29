import type {Example} from "../../types.ts";
import RotatingHeadline from "./RotatingHeadline.example.tsx";
import rotatingHeadlineSource from "./RotatingHeadline.example.tsx?raw";
import rotatingHeadlineComponentSource from "./RotatingHeadline.tsx?raw";
import GradientWordSwap from "./GradientWordSwap.example.tsx";
import gradientWordSwapSource from "./GradientWordSwap.example.tsx?raw";
import gradientWordSwapComponentSource from "./GradientWordSwap.tsx?raw";
import VerticalTicker from "./VerticalTicker.example.tsx";
import verticalTickerSource from "./VerticalTicker.example.tsx?raw";
import verticalTickerComponentSource from "./VerticalTicker.tsx?raw";
import TypewriterPrompt from "./TypewriterPrompt.example.tsx";
import typewriterPromptSource from "./TypewriterPrompt.example.tsx?raw";
import typewriterPromptComponentSource from "./TypewriterPrompt.tsx?raw";
import ScrambleWords from "./ScrambleWords.example.tsx";
import scrambleWordsSource from "./ScrambleWords.example.tsx?raw";
import scrambleWordsComponentSource from "./ScrambleWords.tsx?raw";
import MarkerSwipe from "./MarkerSwipe.example.tsx";
import markerSwipeSource from "./MarkerSwipe.example.tsx?raw";
import markerSwipeComponentSource from "./MarkerSwipe.tsx?raw";
import SplitFlapBoard from "./SplitFlapBoard.example.tsx";
import splitFlapBoardSource from "./SplitFlapBoard.example.tsx?raw";
import splitFlapBoardComponentSource from "./SplitFlapBoard.tsx?raw";

const examples: Example[] = [
    {
        id: "rotating-headline",
        title: "Rotating headline",
        description: "The highlighted word in a headline changes every few seconds and its pill resizes to fit. Use it for hero sections that describe several benefits.",
        component: RotatingHeadline,
        source: rotatingHeadlineSource,
        files: [{name: "RotatingHeadline.tsx", source: rotatingHeadlineComponentSource}],
        minHeight: 360,
    },
    {
        id: "gradient-word-swap",
        title: "Gradient word swap",
        description: "Each word slides up out of a blur in its own gradient while the space around it resizes. Progress segments underneath pause on hover and jump to a word when clicked.",
        component: GradientWordSwap,
        source: gradientWordSwapSource,
        files: [{name: "GradientWordSwap.tsx", source: gradientWordSwapComponentSource}],
        minHeight: 380,
    },
    {
        id: "vertical-ticker",
        title: "Vertical ticker",
        description: "A drum of words that turns one row at a time, with the previous and next words fading at the edges so readers can see the list continue.",
        component: VerticalTicker,
        source: verticalTickerSource,
        files: [{name: "VerticalTicker.tsx", source: verticalTickerComponentSource}],
        minHeight: 380,
    },
    {
        id: "typewriter-prompt",
        title: "Typewriter placeholder",
        description: "A prompt box whose placeholder types out example requests, holds with a blinking caret, then deletes them. It stops as soon as the field has focus or text.",
        component: TypewriterPrompt,
        source: typewriterPromptSource,
        files: [{name: "TypewriterPrompt.tsx", source: typewriterPromptComponentSource}],
    },
    {
        id: "scramble-words",
        title: "Scramble decode",
        description: "Each new word decodes from random characters that lock in from left to right. The text is written from requestAnimationFrame, so React does not re-render every frame.",
        component: ScrambleWords,
        source: scrambleWordsSource,
        files: [{name: "ScrambleWords.tsx", source: scrambleWordsComponentSource}],
        minHeight: 380,
    },
    {
        id: "marker-swipe",
        title: "Highlighter swipe",
        description: "A highlighter stroke sweeps in behind each phrase and leaves to the right on the way out, with a different marker color per phrase.",
        component: MarkerSwipe,
        source: markerSwipeSource,
        files: [{name: "MarkerSwipe.tsx", source: markerSwipeComponentSource}],
        minHeight: 380,
    },
    {
        id: "split-flap-board",
        title: "Split-flap board",
        description: "A departures board whose destination changes on mechanical-style flaps. Each changed letter flips through two random letters before it lands.",
        component: SplitFlapBoard,
        source: splitFlapBoardSource,
        files: [{name: "SplitFlapBoard.tsx", source: splitFlapBoardComponentSource}],
        minHeight: 360,
    },
];

export default examples;
