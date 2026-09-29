import {CircuitBoard, type CircuitTrace} from "./CircuitBoard";

// Drawn on a 400 by 300 grid. The chip sits between x 160 to 240 and y 110 to 190.
const traces: CircuitTrace[] = [
    {id: "l1", direction: "in", pad: [24, 60], d: "M 24 60 H 80 L 100 80 V 120 L 110 130 H 160"},
    {id: "l2", direction: "in", pad: [24, 150], d: "M 24 150 H 160"},
    {id: "l3", direction: "in", pad: [24, 244], d: "M 24 244 H 70 L 100 214 V 180 L 110 170 H 160"},
    {id: "t1", direction: "in", pad: [140, 24], d: "M 140 24 V 50 L 180 90 V 110"},
    {id: "t2", direction: "in", pad: [200, 24], d: "M 200 24 V 110"},
    {id: "t3", direction: "in", pad: [260, 24], d: "M 260 24 V 50 L 220 90 V 110"},
    {id: "r1", direction: "out", pad: [376, 60], d: "M 240 130 H 290 L 300 120 V 80 L 320 60 H 376"},
    {id: "r2", direction: "out", pad: [376, 150], d: "M 240 150 H 376"},
    {id: "r3", direction: "out", pad: [376, 244], d: "M 240 170 H 290 L 300 180 V 214 L 330 244 H 376"},
    {id: "b1", direction: "out", pad: [140, 276], d: "M 180 190 V 210 L 140 250 V 276"},
    {id: "b2", direction: "out", pad: [200, 276], d: "M 200 190 V 276"},
    {id: "b3", direction: "out", pad: [260, 276], d: "M 220 190 V 210 L 260 250 V 276"},
];

const CircuitBoardExample = () => <CircuitBoard traces={traces} chipName="Halo R2" chipStat="2.1 TOPS"/>;

export default CircuitBoardExample;
