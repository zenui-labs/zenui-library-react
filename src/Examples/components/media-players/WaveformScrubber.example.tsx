import {WaveformScrubber, type WaveformChapter} from "./WaveformScrubber";

const chapters: WaveformChapter[] = [
    {time: 0, title: "Cold open"},
    {time: 142, title: "Who keeps the light now"},
    {time: 610, title: "Forty-one steps, twice a night"},
    {time: 1210, title: "The fog signal log"},
    {time: 1745, title: "What automation missed"},
    {time: 2140, title: "Listener letters"},
];

const WaveformScrubberExample = () => (
    <WaveformScrubber
        show="Field Notes · Episode 47"
        badge="E47"
        title="The last keeper of Carrick Ness"
        duration={2304}
        seed={47}
        chapters={chapters}
    />
);

export default WaveformScrubberExample;
