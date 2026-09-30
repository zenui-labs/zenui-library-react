import {KaraokeLyrics, type KaraokeLine} from "./KaraokeLyrics";

// Original lyrics written for this demo.
const lines: KaraokeLine[] = [
    {start: 3.2, text: "The last ferry leaves at a quarter to one"},
    {start: 7.6, text: "I'm counting the lights on the water for fun"},
    {start: 12, text: "You said you'd be late, but you never said when"},
    {start: 16.4, text: "So I'm folding the ticket and folding again"},
    {start: 27.5, text: "The harbour is humming a tune of its own"},
    {start: 31.9, text: "Every rope, every gull, every bell on the stone"},
    {start: 36.3, text: "If you're running, keep running, I'll hold the gate wide"},
    {start: 40.9, text: "There's a seat by the window, the warm side inside"},
    {start: 51, text: "And the engine turns over, the deck starts to sway"},
    {start: 55.4, text: "I can see you, I can see you, you're running my way"},
];

const KaraokeLyricsExample = () => <KaraokeLyrics title="Last Ferry" artist="Maren Holt" lines={lines} duration={63}/>;

export default KaraokeLyricsExample;
