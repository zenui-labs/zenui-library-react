import {RidgelinePlot, type RidgelineSeries} from "./RidgelinePlot";

// Seeded so the ridges look the same on every load.
const mulberry32 = (seed: number) => () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

// Log-normal latencies. `missRate` adds a slower second hump for requests that miss the edge cache.
const latencies = (seed: number, median: number, spread: number, missRate = 0) => {
    const random = mulberry32(seed);
    return Array.from({length: 600}, () => {
        const normal = Math.sqrt(-2 * Math.log(random() || 1e-9)) * Math.cos(2 * Math.PI * random());
        const miss = random() < missRate ? 1.9 : 1;
        return median * miss * Math.exp(spread * normal);
    });
};

const regions: RidgelineSeries[] = [
    {id: "fra", label: "Frankfurt", code: "FRA", samples: latencies(1, 38, 0.28)},
    {id: "lhr", label: "London", code: "LHR", samples: latencies(2, 51, 0.3)},
    {id: "iad", label: "Virginia", code: "IAD", samples: latencies(3, 112, 0.22, 0.12)},
    {id: "pdx", label: "Oregon", code: "PDX", samples: latencies(4, 158, 0.2)},
    {id: "bom", label: "Mumbai", code: "BOM", samples: latencies(5, 171, 0.3, 0.25)},
    {id: "gru", label: "São Paulo", code: "GRU", samples: latencies(6, 204, 0.2)},
    {id: "sin", label: "Singapore", code: "SIN", samples: latencies(7, 146, 0.18, 0.42)},
    {id: "nrt", label: "Tokyo", code: "NRT", samples: latencies(8, 228, 0.16)},
    {id: "syd", label: "Sydney", code: "SYD", samples: latencies(9, 281, 0.17, 0.18)},
];

const RidgelinePlotExample = () => (
    <RidgelinePlot
        series={regions}
        domain={[0, 520]}
        ticks={[0, 100, 200, 300, 400, 500]}
        unit="ms"
        title="Checkout TTFB by region"
        subtitle="600 sampled requests per edge, origin in Frankfurt"
        summary="Checkout time to first byte for nine regions. Latency grows with distance from the Frankfurt origin, from a 38 ms median in Frankfurt to about 280 ms in Sydney. Singapore and Mumbai show a second, slower hump from cache misses."
    />
);

export default RidgelinePlotExample;
