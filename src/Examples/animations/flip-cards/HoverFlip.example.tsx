import {TripCards, type Trip} from "./HoverFlip";

const trips: Trip[] = [
    {
        id: "lisbon",
        city: "Lisbon",
        country: "Portugal",
        nights: 5,
        price: 1240,
        season: "April to June",
        highlights: ["Tram 28 and an Alfama walking tour", "Day trip to Sintra palaces", "Fado dinner in Bairro Alto"],
        gradient: "from-amber-400 via-orange-500 to-rose-500",
    },
    {
        id: "kyoto",
        city: "Kyoto",
        country: "Japan",
        nights: 7,
        price: 2890,
        season: "March to May",
        highlights: ["Sunrise at Fushimi Inari", "Tea ceremony in Gion", "Arashiyama bamboo grove by bike"],
        gradient: "from-rose-400 via-fuchsia-500 to-indigo-500",
    },
    {
        id: "reykjavik",
        city: "Reykjavik",
        country: "Iceland",
        nights: 4,
        price: 1780,
        season: "September to March",
        highlights: ["Golden Circle day tour", "Northern lights boat trip", "Evening at the Sky Lagoon"],
        gradient: "from-sky-400 via-cyan-500 to-emerald-500",
    },
];

const HoverFlipExample = () => <TripCards trips={trips}/>;

export default HoverFlipExample;
