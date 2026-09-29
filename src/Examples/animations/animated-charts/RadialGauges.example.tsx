import {useState} from "react";
import {LuCpu, LuHardDrive, LuMemoryStick} from "react-icons/lu";
import {RadialGauges} from "./RadialGauges";

interface Reading {
    cpu: number;
    memory: number;
    disk: number;
    network: number;
}

// Snapshots to cycle through with the refresh button.
const readings: Reading[] = [
    {cpu: 64, memory: 78, disk: 41, network: 612},
    {cpu: 91, memory: 83, disk: 42, network: 874},
    {cpu: 37, memory: 59, disk: 42, network: 238},
    {cpu: 72, memory: 88, disk: 43, network: 455},
];

const RadialGaugesExample = () => {
    const [index, setIndex] = useState(0);
    const reading = readings[index];

    return (
        <RadialGauges
            title="api-west-2"
            subtitle={`Reading ${index + 1} of ${readings.length}`}
            gauges={[
                {label: "CPU", value: reading.cpu, icon: LuCpu},
                {label: "Memory", value: reading.memory, icon: LuMemoryStick},
                {label: "Disk", value: reading.disk, icon: LuHardDrive},
            ]}
            dial={{label: "Network throughput", value: reading.network, max: 1000, unit: "Mbps", unitLabel: "megabits per second"}}
            onRefresh={() => setIndex((current) => (current + 1) % readings.length)}
        />
    );
};

export default RadialGaugesExample;
