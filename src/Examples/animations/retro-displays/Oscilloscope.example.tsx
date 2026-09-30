import {Oscilloscope, type LissajousPreset} from "./Oscilloscope";

const presets: LissajousPreset[] = [
    {label: "1:1", shape: "circle", x: 1, y: 1, phase: 90},
    {label: "1:2", shape: "figure eight", x: 1, y: 2, phase: 0},
    {label: "3:2", shape: "knot", x: 3, y: 2, phase: 90},
];

const OscilloscopeExample = () => (
    <Oscilloscope presets={presets} initial={{x: 3, y: 2, phase: 90}} driftRate={14} model="XY-7 · Dual trace"/>
);

export default OscilloscopeExample;
