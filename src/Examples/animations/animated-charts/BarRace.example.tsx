import {BarRace, type RaceItem} from "./BarRace";

const quarters = ["Q1 2024", "Q2 2024", "Q3 2024", "Q4 2024", "Q1 2025", "Q2 2025", "Q3 2025", "Q4 2025"];

// Units sold per quarter, in the order of the quarters above.
const products: RaceItem[] = [
    {id: "runner", name: "Trail runner", color: "bg-sky-500", values: [4200, 5100, 6300, 5400, 6100, 7400, 8800, 8100]},
    {id: "hoodie", name: "Merino hoodie", color: "bg-violet-500", values: [5600, 3900, 3100, 7900, 6800, 4200, 3900, 9600]},
    {id: "shell", name: "Rain shell", color: "bg-emerald-500", values: [3100, 4800, 2600, 3500, 5200, 6900, 4100, 4700]},
    {id: "daypack", name: "Daypack 22L", color: "bg-amber-500", values: [2400, 3300, 5800, 3600, 3900, 5100, 7200, 5600]},
    {id: "mug", name: "Camp mug", color: "bg-rose-500", values: [1900, 2500, 3400, 4600, 2800, 3300, 4600, 6400]},
    {id: "socks", name: "Wool socks", color: "bg-teal-500", values: [3800, 3000, 2700, 6100, 4400, 3700, 3300, 7100]},
];

const BarRaceExample = () => <BarRace periods={quarters} items={products}/>;

export default BarRaceExample;
