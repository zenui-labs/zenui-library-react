import type {Example} from "../../types.ts";
import VinylPlayer from "./VinylPlayer.example.tsx";
import vinylPlayerSource from "./VinylPlayer.example.tsx?raw";
import vinylPlayerComponentSource from "./VinylPlayer.tsx?raw";
import CassetteDeck from "./CassetteDeck.example.tsx";
import cassetteDeckSource from "./CassetteDeck.example.tsx?raw";
import cassetteDeckComponentSource from "./CassetteDeck.tsx?raw";
import WaveformScrubber from "./WaveformScrubber.example.tsx";
import waveformScrubberSource from "./WaveformScrubber.example.tsx?raw";
import waveformScrubberComponentSource from "./WaveformScrubber.tsx?raw";
import RadioTuner from "./RadioTuner.example.tsx";
import radioTunerSource from "./RadioTuner.example.tsx?raw";
import radioTunerComponentSource from "./RadioTuner.tsx?raw";
import KaraokeLyrics from "./KaraokeLyrics.example.tsx";
import karaokeLyricsSource from "./KaraokeLyrics.example.tsx?raw";
import karaokeLyricsComponentSource from "./KaraokeLyrics.tsx?raw";

const examples: Example[] = [
    {
        id: "vinyl-player",
        title: "Turntable",
        description: "A record player whose platter spins up and coasts down, with a tonearm that swings on and tracks inward. Grab the record to scratch through the side, or use the arrow keys to skip.",
        component: VinylPlayer,
        source: vinylPlayerSource,
        files: [{name: "VinylPlayer.tsx", source: vinylPlayerComponentSource}],
        minHeight: 520,
    },
    {
        id: "cassette-deck",
        title: "Cassette deck",
        description: "A tape deck with latching piano keys and reels that trade tape as it plays, the emptier one spinning faster. The mechanical counter follows the take-up reel, just like a real one.",
        component: CassetteDeck,
        source: cassetteDeckSource,
        files: [{name: "CassetteDeck.tsx", source: cassetteDeckComponentSource}],
        minHeight: 560,
    },
    {
        id: "waveform-scrubber",
        title: "Podcast waveform",
        description: "A voice waveform that fills as it plays, previews where you are about to jump and marks chapters with notches. Space plays, arrow keys seek and Page Up or Page Down move between chapters.",
        component: WaveformScrubber,
        source: waveformScrubberSource,
        files: [{name: "WaveformScrubber.tsx", source: waveformScrubberComponentSource}],
        minHeight: 360,
    },
    {
        id: "radio-tuner",
        title: "FM radio tuner",
        description: "An analog dial where station names light up as the needle gets close and the static clears as it locks on. Drag the dial, turn the knob or use the arrow keys.",
        component: RadioTuner,
        source: radioTunerSource,
        files: [{name: "RadioTuner.tsx", source: radioTunerComponentSource}],
        minHeight: 460,
    },
    {
        id: "karaoke-lyrics",
        title: "Synced lyrics",
        description: "Lyrics that follow the song word by word with a soft fill wipe, while sung lines drift up and blur. Click any line to jump to it; reduced motion drops the blur and the scrolling spring.",
        component: KaraokeLyrics,
        source: karaokeLyricsSource,
        files: [{name: "KaraokeLyrics.tsx", source: karaokeLyricsComponentSource}],
        minHeight: 520,
    },
];

export default examples;
