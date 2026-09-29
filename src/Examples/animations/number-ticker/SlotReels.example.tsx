import {SlotReels, type Entrant} from "./SlotReels";

const entrants: Entrant[] = [
    {name: "Maya Chen", detail: "Portland"},
    {name: "Tomás Rivera", detail: "Austin"},
    {name: "Aisha Bello", detail: "Toronto"},
    {name: "Jonas Weber", detail: "Berlin"},
    {name: "Priya Nair", detail: "Bengaluru"},
    {name: "Liam O'Connor", detail: "Dublin"},
];

const SlotReelsExample = () => (
    <SlotReels
        entrants={entrants}
        eyebrow="Spring giveaway"
        description="2,418 entries, one pair of studio headphones."
    />
);

export default SlotReelsExample;
