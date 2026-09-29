import {useState} from "react";
import {AnimatedSwitch, type AnimatedSwitchSize} from "./AnimatedSwitch";

const sizes: {size: AnimatedSwitchSize; label: string}[] = [
    {size: "lg", label: "Large switch"},
    {size: "md", label: "Medium switch"},
    {size: "sm", label: "Small switch"},
    {size: "xs", label: "Extra small switch"},
];

// All four sizes share one state, so toggling any of them toggles the rest.
const AnimatedSwitchExample = () => {
    const [enabled, setEnabled] = useState(false);

    return (
        <div className="flex flex-wrap items-center justify-center gap-5">
            {sizes.map(({size, label}) => (
                <AnimatedSwitch key={size} size={size} label={label} checked={enabled} onChange={setEnabled}/>
            ))}
        </div>
    );
};

export default AnimatedSwitchExample;
