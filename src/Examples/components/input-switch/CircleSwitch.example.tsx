import {useState} from "react";
import {CircleSwitch, type CircleSwitchSize} from "./CircleSwitch";

const sizes: {size: CircleSwitchSize; label: string}[] = [
    {size: "lg", label: "Large switch"},
    {size: "md", label: "Medium switch"},
    {size: "sm", label: "Small switch"},
    {size: "xs", label: "Extra small switch"},
];

// All four sizes share one state, so toggling any of them toggles the rest.
const CircleSwitchExample = () => {
    const [enabled, setEnabled] = useState(false);

    return (
        <div className="flex flex-wrap items-center justify-center gap-5">
            {sizes.map(({size, label}) => (
                <CircleSwitch key={size} size={size} label={label} checked={enabled} onChange={setEnabled}/>
            ))}
        </div>
    );
};

export default CircleSwitchExample;
