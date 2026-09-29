import type {Example} from "../../types.ts";
import BoxedCountdown from "./BoxedCountdown.example.tsx";
import boxedCountdownSource from "./BoxedCountdown.example.tsx?raw";
import boxedCountdownComponentSource from "./BoxedCountdown.tsx?raw";
import MinimalCountdown from "./MinimalCountdown.example.tsx";
import minimalCountdownSource from "./MinimalCountdown.example.tsx?raw";
import minimalCountdownComponentSource from "./MinimalCountdown.tsx?raw";
import CardCountdown from "./CardCountdown.example.tsx";
import cardCountdownSource from "./CardCountdown.example.tsx?raw";
import cardCountdownComponentSource from "./CardCountdown.tsx?raw";
import SplitDigitCountdown from "./SplitDigitCountdown.example.tsx";
import splitDigitCountdownSource from "./SplitDigitCountdown.example.tsx?raw";
import splitDigitCountdownComponentSource from "./SplitDigitCountdown.tsx?raw";
import InlineCountdown from "./InlineCountdown.example.tsx";
import inlineCountdownSource from "./InlineCountdown.example.tsx?raw";
import inlineCountdownComponentSource from "./InlineCountdown.tsx?raw";
import RingCountdown from "./RingCountdown.example.tsx";
import ringCountdownSource from "./RingCountdown.example.tsx?raw";
import ringCountdownComponentSource from "./RingCountdown.tsx?raw";

const examples: Example[] = [
    {
        id: "timer-style-1",
        title: "Timer style 1",
        description: "A countdown to a date with days, hours, minutes and seconds in tinted boxes. It stops at zero and can call a function when time is up.",
        component: BoxedCountdown,
        source: boxedCountdownSource,
        files: [{name: "BoxedCountdown.tsx", source: boxedCountdownComponentSource}],
    },
    {
        id: "timer-style-2",
        title: "Timer style 2",
        description: "A light countdown with large accent numbers and small labels, for places where boxes would feel heavy.",
        component: MinimalCountdown,
        source: minimalCountdownSource,
        files: [{name: "MinimalCountdown.tsx", source: minimalCountdownComponentSource}],
    },
    {
        id: "timer-style-3",
        title: "Timer style 3",
        description: "Each unit sits on a blue card with its label on a strip along the bottom, over a tinted panel. Works well as a sale or launch banner.",
        component: CardCountdown,
        source: cardCountdownSource,
        files: [{name: "CardCountdown.tsx", source: cardCountdownComponentSource}],
    },
    {
        id: "timer-style-4",
        title: "Timer style 4",
        description: "Every digit gets its own tile on a gradient, with colons between hours, minutes and seconds. The first unit also counts the days left, so two days read as 48 hours.",
        component: SplitDigitCountdown,
        source: splitDigitCountdownSource,
        files: [{name: "SplitDigitCountdown.tsx", source: splitDigitCountdownComponentSource}],
    },
    {
        id: "timer-style-5",
        title: "Timer style 5",
        description: "A compact one-line countdown with short marks after days, hours and minutes, then smaller seconds. Fits next to a price or a heading.",
        component: InlineCountdown,
        source: inlineCountdownSource,
        files: [{name: "InlineCountdown.tsx", source: inlineCountdownComponentSource}],
    },
    {
        id: "timer-style-6",
        title: "Timer style 6",
        description: "Each unit is a ring that empties as its value drops. Change the size, stroke and color, or show days as well.",
        component: RingCountdown,
        source: ringCountdownSource,
        files: [{name: "RingCountdown.tsx", source: ringCountdownComponentSource}],
    },
];

export default examples;
