import {SplitFlapBoard, type Flight} from "./SplitFlapBoard";

const flights: Flight[] = [
    {code: "TP 1452", city: "LISBON", gate: "B12", time: "14:35"},
    {code: "NH 212", city: "TOKYO", gate: "E4", time: "14:50"},
    {code: "KQ 101", city: "NAIROBI", gate: "C7", time: "15:05"},
    {code: "AC 865", city: "MONTREAL", gate: "A21", time: "15:20"},
    {code: "FI 455", city: "REYKJAVIK", gate: "D2", time: "15:40"},
];

const SplitFlapBoardExample = () => <SplitFlapBoard flights={flights}/>;

export default SplitFlapBoardExample;
