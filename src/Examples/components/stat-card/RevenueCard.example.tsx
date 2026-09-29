import {RevenueCard, type DailyValue} from "./RevenueCard";

// Sample data: 180 days with a steady upward trend, a weekend dip and some daily noise.
const buildDays = (): DailyValue[] => {
    let seed = 11;
    const random = () => {
        seed = (seed * 16807) % 2147483647;
        return seed / 2147483647;
    };
    const weekday = [0.78, 0.96, 1.04, 1.08, 1.06, 1, 0.82];
    const end = new Date(2026, 8, 28);
    return Array.from({length: 180}, (_, index) => {
        const date = new Date(end);
        date.setDate(end.getDate() - (179 - index));
        const value = (2600 + index * 12) * weekday[date.getDay()] * (0.9 + random() * 0.2);
        return {date, value: Math.round(value)};
    });
};

const revenue = buildDays();

const RevenueCardExample = () => <RevenueCard data={revenue}/>;

export default RevenueCardExample;
