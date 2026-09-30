import {ChannelStrip, type MixerChannel} from "./ChannelStrip";

const channels: MixerChannel[] = [
    {id: "kick", name: "Kick", gain: -2, signal: {level: -9, pulse: 1, decay: 9, drift: 1}},
    {id: "bass", name: "Bass", gain: -4.5, signal: {level: -12, pulse: 2, decay: 3, drift: 1.5}},
    {id: "vox", name: "Vox", gain: 0, pan: 0, signal: {level: -14, gaps: 0.3, drift: 3}},
    {id: "keys", name: "Keys", gain: -9, pan: -0.4, signal: {level: -18, drift: 4}},
];

const ChannelStripExample = () => <ChannelStrip channels={channels} masterGain={-3} tempo={124}/>;

export default ChannelStripExample;
