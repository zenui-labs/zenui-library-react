import {useEffect, useState} from "react";
import {SplitFlapBoard, type Departure} from "./SplitFlapBoard";

// Four snapshots of the same hour at Lisbon Terminal 1. The board only turns the flaps that change.
const snapshots: Departure[][] = [
    [
        {id: "tp1351", time: "14:05", destination: "Reykjavik", flight: "TP 1351", gate: "B12", status: "Boarding", lamp: "blink"},
        {id: "fr8412", time: "14:20", destination: "Marrakech", flight: "FR 8412", gate: "A03", status: "On time"},
        {id: "lh1173", time: "14:35", destination: "Frankfurt", flight: "LH 1173", gate: "B21", status: "On time"},
        {id: "tp0203", time: "14:50", destination: "New York", flight: "TP 203", gate: "C04", status: "Delayed", lamp: "on"},
        {id: "ib3107", time: "15:10", destination: "Madrid", flight: "IB 3107", gate: "A11", status: "On time"},
        {id: "ek0192", time: "15:25", destination: "Dubai", flight: "EK 192", gate: "C08", status: "Gate open"},
    ],
    [
        {id: "tp1351", time: "14:05", destination: "Reykjavik", flight: "TP 1351", gate: "B12", status: "Final call", lamp: "blink"},
        {id: "fr8412", time: "14:20", destination: "Marrakech", flight: "FR 8412", gate: "A03", status: "Boarding", lamp: "blink"},
        {id: "lh1173", time: "14:35", destination: "Frankfurt", flight: "LH 1173", gate: "B21", status: "On time"},
        {id: "tp0203", time: "15:40", destination: "New York", flight: "TP 203", gate: "C04", status: "Delayed", lamp: "on"},
        {id: "ib3107", time: "15:10", destination: "Madrid", flight: "IB 3107", gate: "A14", status: "Gate chg", lamp: "on"},
        {id: "ek0192", time: "15:25", destination: "Dubai", flight: "EK 192", gate: "C08", status: "Gate open"},
    ],
    [
        {id: "fr8412", time: "14:20", destination: "Marrakech", flight: "FR 8412", gate: "A03", status: "Final call", lamp: "blink"},
        {id: "lh1173", time: "14:35", destination: "Frankfurt", flight: "LH 1173", gate: "B21", status: "Boarding", lamp: "blink"},
        {id: "ib3107", time: "15:10", destination: "Madrid", flight: "IB 3107", gate: "A14", status: "On time"},
        {id: "ek0192", time: "15:25", destination: "Dubai", flight: "EK 192", gate: "C08", status: "Gate open"},
        {id: "tp0203", time: "15:40", destination: "New York", flight: "TP 203", gate: "C04", status: "Delayed", lamp: "on"},
        {id: "u24771", time: "15:45", destination: "Copenhagen", flight: "U2 4771", gate: "A07", status: "On time"},
    ],
    [
        {id: "lh1173", time: "14:35", destination: "Frankfurt", flight: "LH 1173", gate: "B21", status: "Final call", lamp: "blink"},
        {id: "ib3107", time: "15:10", destination: "Madrid", flight: "IB 3107", gate: "A14", status: "Boarding", lamp: "blink"},
        {id: "ek0192", time: "15:25", destination: "Dubai", flight: "EK 192", gate: "C08", status: "On time"},
        {id: "tp0203", time: "15:40", destination: "New York", flight: "TP 203", gate: "C04", status: "Delayed", lamp: "on"},
        {id: "u24771", time: "15:45", destination: "Copenhagen", flight: "U2 4771", gate: "A07", status: "On time"},
        {id: "tp1094", time: "16:00", destination: "Buenos Aires", flight: "TP 1094", gate: "C02", status: "Check-in"},
    ],
];

const SplitFlapBoardExample = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const timer = window.setInterval(() => setIndex((current) => (current + 1) % snapshots.length), 7000);
        return () => window.clearInterval(timer);
    }, []);

    return <SplitFlapBoard departures={snapshots[index]} title="Departures" subtitle="Partidas"/>;
};

export default SplitFlapBoardExample;
