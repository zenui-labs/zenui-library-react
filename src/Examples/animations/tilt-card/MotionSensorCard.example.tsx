import {LuCloud, LuCloudSun, LuSun, LuWind} from "react-icons/lu";
import {MotionSensorCard, type HourlyForecast} from "./MotionSensorCard";

const hours: HourlyForecast[] = [
    {time: "Now", icon: LuCloudSun, temp: 18},
    {time: "2 PM", icon: LuSun, temp: 20},
    {time: "3 PM", icon: LuSun, temp: 21},
    {time: "4 PM", icon: LuCloud, temp: 19},
    {time: "5 PM", icon: LuWind, temp: 17},
];

const MotionSensorCardExample = () => (
    <MotionSensorCard
        city="San Francisco"
        temperature={18}
        condition="Partly cloudy"
        high={21}
        low={13}
        hours={hours}
    />
);

export default MotionSensorCardExample;
