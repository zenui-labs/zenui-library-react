import type {Example} from "../../types.ts";
import WaveLayoutSwitcher from "./WaveLayoutSwitcher.example.tsx";
import waveLayoutSwitcherSource from "./WaveLayoutSwitcher.example.tsx?raw";
import waveLayoutSwitcherComponentSource from "./WaveLayoutSwitcher.tsx?raw";
import DominoLayoutSwitcher from "./DominoLayoutSwitcher.example.tsx";
import dominoLayoutSwitcherSource from "./DominoLayoutSwitcher.example.tsx?raw";
import dominoLayoutSwitcherComponentSource from "./DominoLayoutSwitcher.tsx?raw";

const examples: Example[] = [
    {
        id: "wave-layout-switcher",
        title: "Wave layout switcher",
        description: "Cards switch between a list and a grid while a wave ripples across them one card after another.",
        component: WaveLayoutSwitcher,
        source: waveLayoutSwitcherSource,
        files: [{name: "WaveLayoutSwitcher.tsx", source: waveLayoutSwitcherComponentSource}],
        minHeight: 520,
    },
    {
        id: "domino-layout-switcher",
        title: "Domino layout switcher",
        description: "Cards flip over in turn like falling dominoes as they move between a list and a grid.",
        component: DominoLayoutSwitcher,
        source: dominoLayoutSwitcherSource,
        files: [{name: "DominoLayoutSwitcher.tsx", source: dominoLayoutSwitcherComponentSource}],
        minHeight: 520,
    },
];

export default examples;
