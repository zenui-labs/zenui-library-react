import {SpiralCalendar, type SpiralDay} from "./SpiralCalendar";

const mulberry32 = (seed: number) => () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

// Weekly volume in km through the year: a spring half marathon, a summer build and the Berlin Marathon in September.
const volume: [dayOfYear: number, km: number][] = [
    [0, 32], [60, 44], [88, 52], [95, 30], [110, 34], [160, 46], [190, 58], [240, 78], [256, 60], [263, 12], [285, 30], [330, 40], [364, 26],
];
// Share of the week by weekday, Sunday first. Mondays and Fridays are rest days, Sunday is the long run.
const week = [0.36, 0, 0.17, 0.2, 0.15, 0, 0.12];
const races: Record<string, number> = {"2025-04-06": 21.1, "2025-09-21": 42.2};

const runs: SpiralDay[] = (() => {
    const random = mulberry32(2025);
    return Array.from({length: 365}, (_, dayOfYear) => {
        const date = new Date(Date.UTC(2025, 0, 1 + dayOfYear));
        const iso = date.toISOString().slice(0, 10);
        if (races[iso]) return {date: iso, value: races[iso]};
        const next = volume.findIndex(([day]) => day >= dayOfYear);
        const [d0, k0] = volume[Math.max(0, next - 1)];
        const [d1, k1] = volume[next];
        const weekly = d1 === d0 ? k1 : k0 + ((k1 - k0) * (dayOfYear - d0)) / (d1 - d0);
        const skipped = random() < 0.07 || (date.getUTCMonth() === 11 && date.getUTCDate() >= 24 && date.getUTCDate() <= 26);
        const km = skipped ? 0 : weekly * week[date.getUTCDay()] * (0.85 + random() * 0.3);
        return {date: iso, value: Math.round(km * 10) / 10};
    });
})();

const SpiralCalendarExample = () => (
    <SpiralCalendar
        data={runs}
        unit="km"
        max={30}
        legend={[0, 5, 15, 30]}
        annotations={[
            {date: "2025-04-06", label: "Half, 1:36:12"},
            {date: "2025-09-21", label: "Berlin, 3:24:50"},
        ]}
        title="Every run of 2025"
        subtitle="One turn per month, January at the center"
        summary="Daily running distance for 2025 on a spiral. Volume builds through spring to a half marathon in April, dips, then climbs through the summer to the Berlin Marathon on 21 September before a quiet autumn."
    />
);

export default SpiralCalendarExample;
