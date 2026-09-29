import {useRef, useState} from "react";
import {LiveMetric, type LiveSample} from "./LiveMetric";

interface Traffic {
    rps: number;
    latency: number;
    errors: number;
}

// A bounded random walk, so the numbers drift like real traffic instead of jumping around.
// In your app, read the latest values from your metrics API or a socket instead.
const nextTraffic = (last: Traffic): Traffic => {
    const drift = (value: number, spread: number, min: number, max: number) => Math.min(max, Math.max(min, value + (Math.random() - 0.5) * spread));
    return {
        rps: Math.round(drift(last.rps, 380, 1600, 3400)),
        latency: Math.round(drift(last.latency, 18, 82, 190)),
        errors: Number(drift(last.errors, 0.12, 0.02, 0.9).toFixed(2)),
    };
};

const seedTraffic = () => {
    const history: Traffic[] = [{rps: 2400, latency: 118, errors: 0.21}];
    for (let index = 1; index < 40; index++) history.push(nextTraffic(history[index - 1]));
    return history;
};

const toSample = (traffic: Traffic): LiveSample => ({
    value: traffic.rps,
    stats: [
        {label: "p95 latency", value: `${traffic.latency} ms`, tone: traffic.latency > 160 ? "warning" : "default"},
        {label: "Error rate", value: `${traffic.errors.toFixed(2)}%`, tone: traffic.errors > 0.5 ? "critical" : "default"},
    ],
});

const LiveMetricExample = () => {
    const [history] = useState(seedTraffic);
    const latest = useRef(history[history.length - 1]);

    const getNextSample = () => {
        latest.current = nextTraffic(latest.current);
        return toSample(latest.current);
    };

    return <LiveMetric initialSamples={history.map(toSample)} getNextSample={getNextSample}/>;
};

export default LiveMetricExample;
