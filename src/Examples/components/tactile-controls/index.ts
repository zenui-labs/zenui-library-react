import type {Example} from "../../types.ts";
import RotaryKnob from "./RotaryKnob.example.tsx";
import rotaryKnobSource from "./RotaryKnob.example.tsx?raw";
import rotaryKnobComponentSource from "./RotaryKnob.tsx?raw";
import RotaryPhoneDial from "./RotaryPhoneDial.example.tsx";
import rotaryPhoneDialSource from "./RotaryPhoneDial.example.tsx?raw";
import rotaryPhoneDialComponentSource from "./RotaryPhoneDial.tsx?raw";
import TapeMeasure from "./TapeMeasure.example.tsx";
import tapeMeasureSource from "./TapeMeasure.example.tsx?raw";
import tapeMeasureComponentSource from "./TapeMeasure.tsx?raw";
import ChannelStrip from "./ChannelStrip.example.tsx";
import channelStripSource from "./ChannelStrip.example.tsx?raw";
import channelStripComponentSource from "./ChannelStrip.tsx?raw";
import BreakerPanel from "./BreakerPanel.example.tsx";
import breakerPanelSource from "./BreakerPanel.example.tsx?raw";
import breakerPanelComponentSource from "./BreakerPanel.tsx?raw";

const examples: Example[] = [
    {
        id: "rotary-knob",
        title: "Rotary knob",
        description: "A machined aluminium knob with an LED arc that clicks between detents. Drag up and down or around the rim, scroll to fine-tune, or use the arrow, Page and Home/End keys. Double click resets it.",
        component: RotaryKnob,
        source: rotaryKnobSource,
        files: [{name: "RotaryKnob.tsx", source: rotaryKnobComponentSource}],
        minHeight: 300,
    },
    {
        id: "rotary-phone-dial",
        title: "Rotary phone dial",
        description: "Enter a PIN by dragging a digit round to the finger stop. The dial winds back at a steady governed speed and the digit only counts once it is home. Typing digits dials them for you.",
        component: RotaryPhoneDial,
        source: rotaryPhoneDialSource,
        files: [{name: "RotaryPhoneDial.tsx", source: rotaryPhoneDialComponentSource}],
        minHeight: 460,
    },
    {
        id: "tape-measure",
        title: "Tape measure",
        description: "Pick a length by pulling a steel tape under a red hairline. Flicks coast and land on a tick, arrow keys step, and the blade flips between centimetres and inches.",
        component: TapeMeasure,
        source: tapeMeasureSource,
        files: [{name: "TapeMeasure.tsx", source: tapeMeasureComponentSource}],
        minHeight: 340,
    },
    {
        id: "channel-strip",
        title: "Channel strip",
        description: "A small mixing console with faders, mute and solo, and live LED meters with peak hold. The meters follow a simulated signal in time with the tempo and stop while off screen.",
        component: ChannelStrip,
        source: channelStripSource,
        files: [{name: "ChannelStrip.tsx", source: channelStripComponentSource}],
        minHeight: 420,
    },
    {
        id: "breaker-panel",
        title: "Breaker panel",
        description: "Feature flags as circuit breakers on a steel panel, with a main breaker that cuts them all. One breaker trips on its own and has to be reset. Arrow keys throw the focused breaker, and reduced motion drops the shake.",
        component: BreakerPanel,
        source: breakerPanelSource,
        files: [{name: "BreakerPanel.tsx", source: breakerPanelComponentSource}],
        minHeight: 620,
    },
];

export default examples;
