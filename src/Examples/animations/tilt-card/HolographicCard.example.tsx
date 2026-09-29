import {HolographicCard, type CardStat} from "./HolographicCard";

const stats: CardStat[] = [
    {label: "Commits", value: "4,812"},
    {label: "Reviews", value: "1,093"},
    {label: "Streak", value: "212d"},
];

const HolographicCardExample = () => (
    <HolographicCard
        name="Ada Park"
        subtitle="Maintainer since 2019"
        label="Founding member"
        serial="#0042"
        stats={stats}
    />
);

export default HolographicCardExample;
