import {ActivityGraphWithMonths, type ActivityData} from "./ActivityGraphWithMonths";

// Builds a year of sample counts ending today, with quiet days mixed in like real activity.
const buildSampleActivity = (): ActivityData => {
    const data: ActivityData = {};
    const today = new Date();
    let seed = 7;
    const random = () => {
        seed = (seed * 16807) % 2147483647;
        return seed / 2147483647;
    };
    for (let i = 0; i < 364; i++) {
        const day = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
        if (random() < 0.3) continue;
        const key = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, "0")}-${String(day.getDate()).padStart(2, "0")}`;
        data[key] = Math.floor(random() * 11);
    }
    return data;
};

const activity = buildSampleActivity();

const ActivityGraphWithMonthsExample = () => <ActivityGraphWithMonths data={activity}/>;

export default ActivityGraphWithMonthsExample;
