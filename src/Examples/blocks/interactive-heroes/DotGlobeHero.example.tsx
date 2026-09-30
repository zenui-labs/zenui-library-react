import {DotGlobeHero, type GlobeCity, type GlobeRoute} from "./DotGlobeHero";

const cities: GlobeCity[] = [
    {id: "fra", code: "FRA", name: "Frankfurt", lat: 50.1, lon: 8.7},
    {id: "iad", code: "IAD", name: "Ashburn", lat: 39.0, lon: -77.5},
    {id: "gru", code: "GRU", name: "São Paulo", lat: -23.5, lon: -46.6},
    {id: "jnb", code: "JNB", name: "Johannesburg", lat: -26.2, lon: 28.0},
    {id: "bom", code: "BOM", name: "Mumbai", lat: 19.1, lon: 72.9},
    {id: "sin", code: "SIN", name: "Singapore", lat: 1.35, lon: 103.8},
    {id: "nrt", code: "NRT", name: "Tokyo", lat: 35.7, lon: 139.7},
    {id: "syd", code: "SYD", name: "Sydney", lat: -33.9, lon: 151.2},
];

// One purge fanning out from Frankfurt, with the time each region confirmed it.
const routes: GlobeRoute[] = [
    {from: "fra", to: "iad", label: "41 ms"},
    {from: "fra", to: "bom", label: "58 ms"},
    {from: "fra", to: "jnb", label: "79 ms"},
    {from: "fra", to: "sin", label: "84 ms"},
    {from: "fra", to: "gru", label: "96 ms"},
    {from: "fra", to: "nrt", label: "112 ms"},
    {from: "fra", to: "syd", label: "138 ms"},
];

const DotGlobeHeroExample = () => (
    <DotGlobeHero
        eyebrow="Kestrel Edge · 31 regions"
        headline="Purge once. Gone everywhere in 150 ms."
        description="Kestrel is a CDN cache for teams that deploy on Fridays. Tag a response, purge the tag, and every point of presence drops it before your deploy log stops scrolling."
        primaryAction={{label: "Start free, 1 TB a month", href: "#signup"}}
        secondaryAction={{label: "Read the purge benchmark", href: "#benchmark"}}
        cities={cities}
        routes={routes}
        logTitle="Purge · tag:pricing"
        initialLongitude={30}
        stats={[
            {value: "148 ms", label: "p50 global purge"},
            {value: "31", label: "cities, 6 continents"},
            {value: "99.995%", label: "uptime SLA"},
        ]}
    />
);

export default DotGlobeHeroExample;
