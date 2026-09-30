import {HorizonChart, type HorizonSeries} from "./HorizonChart";

const mulberry32 = (seed: number) => () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

// 24 hours at 5 minute resolution.
const SAMPLES = 288;
const times = Array.from({length: SAMPLES}, (_, i) => `${String(Math.floor(i / 12)).padStart(2, "0")}:${String((i % 12) * 5).padStart(2, "0")}`);
const at = (clock: string) => times.indexOf(clock);

interface Event {
    from: string;
    to: string;
    /** Percentage points above (or below) the weekly baseline at the peak of the event. */
    size: number;
}

// A smoothed random walk around the host's weekly baseline, plus the day's events as soft-edged bumps.
const host = (seed: number, events: Event[]) => {
    const random = mulberry32(seed);
    let drift = 0;
    return Array.from({length: SAMPLES}, (_, i) => {
        drift = drift * 0.92 + (random() - 0.5) * 2.6;
        const bumps = events.reduce((sum, event) => {
            const start = at(event.from);
            const end = at(event.to);
            const ramp = Math.min(1, Math.max(0, (i - start + 3) / 4), Math.max(0, (end - i + 3) / 4));
            return sum + event.size * ramp;
        }, 0);
        return Math.round((drift * 2.2 + bumps) * 10) / 10;
    });
};

const hosts: HorizonSeries[] = [
    {id: "api-fra-1", label: "api-fra-1", values: host(11, [{from: "14:10", to: "14:55", size: 24}, {from: "19:00", to: "21:30", size: 8}])},
    {id: "api-fra-2", label: "api-fra-2", values: host(12, [{from: "14:10", to: "14:50", size: 21}, {from: "19:00", to: "21:30", size: 7}])},
    {id: "api-iad-1", label: "api-iad-1", values: host(13, [{from: "09:00", to: "10:35", size: -26}])},
    {id: "api-iad-2", label: "api-iad-2", values: host(14, [{from: "09:00", to: "10:35", size: 17}])},
    {id: "worker-01", label: "worker-01", values: host(15, [{from: "02:00", to: "03:40", size: 29}, {from: "12:00", to: "12:30", size: -12}])},
    {id: "worker-02", label: "worker-02", values: host(16, [{from: "02:05", to: "03:20", size: 19}])},
    {id: "db-primary", label: "db-primary", values: host(17, [{from: "04:00", to: "04:45", size: 13}, {from: "14:15", to: "15:05", size: 16}])},
    {id: "db-replica", label: "db-replica", values: host(18, [{from: "22:00", to: "23:55", size: -9}])},
];

const HorizonChartExample = () => (
    <HorizonChart
        series={hosts}
        times={times}
        band={10}
        ticks={[0, at("06:00"), at("12:00"), at("18:00"), SAMPLES - 1]}
        unit="pp"
        legendLabels={["Quieter", "Busier"]}
        title="CPU against the weekly baseline"
        subtitle="Tuesday, 5 minute samples, percentage points"
        summary="CPU of eight hosts over a day, compared with their usual level. The Frankfurt API hosts run hot after the 14:10 deploy, api-iad-1 goes quiet while drained from 09:00 to 10:35 as api-iad-2 picks up its traffic, and the workers spike during the 02:00 batch."
    />
);

export default HorizonChartExample;
