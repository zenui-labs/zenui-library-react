import {CassetteDeck, type CassetteTrack} from "./CassetteDeck";

const tracks: CassetteTrack[] = [
    {title: "Overpass", artist: "Juno Ashby", duration: 221},
    {title: "Glasshouse Summer", artist: "The Marlow Set", duration: 252},
    {title: "Radio Silence at Kettle Point", artist: "Pell & Rook", duration: 235},
    {title: "Slow Headlights", artist: "Dana Oduya", duration: 288},
    {title: "Wire Fences", artist: "Cinder Youth", duration: 200},
];

const CassetteDeckExample = () => (
    <CassetteDeck title="night drive, aug '91" side="A" tracks={tracks} tapeType="C60 · Type II · High bias"/>
);

export default CassetteDeckExample;
