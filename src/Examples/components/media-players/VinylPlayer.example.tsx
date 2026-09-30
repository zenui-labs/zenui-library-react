import {VinylPlayer, type VinylTrack} from "./VinylPlayer";

const tracks: VinylTrack[] = [
    {id: "a1", title: "Salt on the Antenna", duration: 222},
    {id: "a2", title: "Tidewater Signals", duration: 254},
    {id: "a3", title: "Paper Harbour", duration: 187},
    {id: "a4", title: "Night Bus to Ravensworth", duration: 301},
    {id: "a5", title: "Low Sun, Long Shadow", duration: 243},
];

const VinylPlayerExample = () => (
    <VinylPlayer
        album={{title: "Coastal Static", artist: "Ines Varga Trio", label: "Halyard Records", catalog: "HLY-014", year: 1978}}
        tracks={tracks}
        labelColor="#e4572e"
    />
);

export default VinylPlayerExample;
