import {useState} from "react";
import {OdometerCounter, type OdometerRegion} from "./OdometerCounter";

const initialRegions: OdometerRegion[] = [
    {name: "North America", count: 512_408, color: "bg-sky-500"},
    {name: "Europe", count: 431_977, color: "bg-violet-500"},
    {name: "Asia Pacific", count: 339_702, color: "bg-emerald-500"},
];

// New installs arrive every couple of seconds. Replace the random numbers with your own feed.
const OdometerCounterExample = () => {
    const [regions, setRegions] = useState(initialRegions);

    const addInstalls = () =>
        setRegions((current) => current.map((region) => ({...region, count: region.count + Math.floor(Math.random() * 24)})));

    return <OdometerCounter regions={regions} onPoll={addInstalls}/>;
};

export default OdometerCounterExample;
