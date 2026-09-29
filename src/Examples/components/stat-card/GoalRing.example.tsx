import {GoalRing, type GoalSegment} from "./GoalRing";

const regions: GoalSegment[] = [
    {id: "all", label: "All", achieved: 951_000, target: 1_200_000},
    {id: "emea", label: "EMEA", achieved: 368_000, target: 400_000},
    {id: "amer", label: "Americas", achieved: 462_000, target: 520_000},
    {id: "apac", label: "APAC", achieved: 121_000, target: 280_000},
];

// The quarter runs Jul 1 to Sep 30. 79 of 92 days have passed.
const GoalRingExample = () => <GoalRing segments={regions} daysTotal={92} daysPassed={79}/>;

export default GoalRingExample;
