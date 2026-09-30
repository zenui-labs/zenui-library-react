import type {Example} from "../../types.ts";
import HangingTags from "./HangingTags.example.tsx";
import hangingTagsSource from "./HangingTags.example.tsx?raw";
import hangingTagsComponentSource from "./HangingTags.tsx?raw";
import GravityText from "./GravityText.example.tsx";
import gravityTextSource from "./GravityText.example.tsx?raw";
import gravityTextComponentSource from "./GravityText.tsx?raw";
import LiquidGauge from "./LiquidGauge.example.tsx";
import liquidGaugeSource from "./LiquidGauge.example.tsx?raw";
import liquidGaugeComponentSource from "./LiquidGauge.tsx?raw";
import PluckString from "./PluckString.example.tsx";
import pluckStringSource from "./PluckString.example.tsx?raw";
import pluckStringComponentSource from "./PluckString.tsx?raw";
import BubbleWrap from "./BubbleWrap.example.tsx";
import bubbleWrapSource from "./BubbleWrap.example.tsx?raw";
import bubbleWrapComponentSource from "./BubbleWrap.tsx?raw";

const examples: Example[] = [
    {
        id: "hanging-tags",
        title: "Hanging badges",
        description: "Conference badges hang from a rail on verlet rope strings. Drag one and let go and it swings, bumps its neighbours and settles. Arrow keys nudge a focused badge, and with reduced motion they hang still.",
        component: HangingTags,
        source: hangingTagsSource,
        files: [{name: "HangingTags.tsx", source: hangingTagsComponentSource}],
        minHeight: 440,
    },
    {
        id: "gravity-text",
        title: "Gravity text",
        description: "A headline whose letters fall into a pile as rigid bodies with spin, friction and bounce. Throw them around, sweep through the pile, then reassemble them on springs. Good for a 404 or an empty state.",
        component: GravityText,
        source: gravityTextSource,
        files: [{name: "GravityText.tsx", source: gravityTextComponentSource}],
        minHeight: 480,
    },
    {
        id: "liquid-gauge",
        title: "Liquid gauge",
        description: "A flask filled to a value, with a spring-mass liquid surface that sloshes when you drag the flask or stir past it, and a reading that inverts under the liquid. Arrow keys shake it; it is a meter for screen readers.",
        component: LiquidGauge,
        source: liquidGaugeSource,
        files: [{name: "LiquidGauge.tsx", source: liquidGaugeComponentSource}],
        minHeight: 520,
    },
    {
        id: "pluck-string",
        title: "Plucked string dividers",
        description: "Section dividers that behave like guitar strings of different gauges. Sweep the pointer across one to bend and release it into a decaying vibration, or focus it and press Enter.",
        component: PluckString,
        source: pluckStringSource,
        files: [{name: "PluckString.tsx", source: pluckStringComponentSource}],
        minHeight: 560,
    },
    {
        id: "bubble-wrap",
        title: "Bubble wrap",
        description: "A sheet of bubbles that squash, pop with a puff of air and jolt their neighbours. It counts pops and rolls in a new sheet. Arrow keys move between bubbles and Space pops.",
        component: BubbleWrap,
        source: bubbleWrapSource,
        files: [{name: "BubbleWrap.tsx", source: bubbleWrapComponentSource}],
        minHeight: 480,
    },
];

export default examples;
