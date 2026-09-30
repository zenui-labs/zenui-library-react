import type {Example} from "../../types.ts";
import SplitFlapBoard from "./SplitFlapBoard.example.tsx";
import splitFlapBoardSource from "./SplitFlapBoard.example.tsx?raw";
import splitFlapBoardComponentSource from "./SplitFlapBoard.tsx?raw";
import NixieClock from "./NixieClock.example.tsx";
import nixieClockSource from "./NixieClock.example.tsx?raw";
import nixieClockComponentSource from "./NixieClock.tsx?raw";
import DotMatrixSign from "./DotMatrixSign.example.tsx";
import dotMatrixSignSource from "./DotMatrixSign.example.tsx?raw";
import dotMatrixSignComponentSource from "./DotMatrixSign.tsx?raw";
import CrtTerminal from "./CrtTerminal.example.tsx";
import crtTerminalSource from "./CrtTerminal.example.tsx?raw";
import crtTerminalComponentSource from "./CrtTerminal.tsx?raw";
import Oscilloscope from "./Oscilloscope.example.tsx";
import oscilloscopeSource from "./Oscilloscope.example.tsx?raw";
import oscilloscopeComponentSource from "./Oscilloscope.tsx?raw";

const examples: Example[] = [
    {
        id: "split-flap-board",
        title: "Split-flap board",
        description: "A departures board where every character is a flap that turns through the alphabet in order until it reaches its new letter. Use it for schedules, scores or any list that changes in place. Screen readers get the final text, and reduced motion swaps the flaps instantly.",
        component: SplitFlapBoard,
        source: splitFlapBoardSource,
        files: [{name: "SplitFlapBoard.tsx", source: splitFlapBoardComponentSource}],
        minHeight: 440,
    },
    {
        id: "nixie-clock",
        title: "Nixie clock",
        description: "A live clock in glowing Nixie tubes, with the unlit numerals visible behind the lit one. Once a minute each tube spins through every digit before it settles. The brass button runs the spin on demand.",
        component: NixieClock,
        source: nixieClockSource,
        files: [{name: "NixieClock.tsx", source: nixieClockComponentSource}],
        minHeight: 380,
    },
    {
        id: "dot-matrix-sign",
        title: "Dot-matrix sign",
        description: "An LED sign drawn on a canvas with its own 5 by 7 font. Messages scroll, blink or wipe in, with an optional fixed badge for a route or counter number. It comes in amber, green or red and stops while off screen.",
        component: DotMatrixSign,
        source: dotMatrixSignSource,
        files: [{name: "DotMatrixSign.tsx", source: dotMatrixSignComponentSource}],
        minHeight: 360,
    },
    {
        id: "crt-terminal",
        title: "CRT terminal",
        description: "A CRT monitor that boots with a memory test, then accepts help, ls, date, whoami, echo and clear, with arrow-key history. The power button collapses the picture to a line, then a fading dot.",
        component: CrtTerminal,
        source: crtTerminalSource,
        files: [{name: "CrtTerminal.tsx", source: crtTerminalComponentSource}],
        minHeight: 560,
    },
    {
        id: "oscilloscope",
        title: "Oscilloscope",
        description: "A phosphor oscilloscope tracing Lissajous figures with afterglow. Turn the X, Y and phase knobs by dragging or with the arrow keys, or pick a preset. It pauses off screen and draws a still figure with reduced motion.",
        component: Oscilloscope,
        source: oscilloscopeSource,
        files: [{name: "Oscilloscope.tsx", source: oscilloscopeComponentSource}],
        minHeight: 460,
    },
];

export default examples;
