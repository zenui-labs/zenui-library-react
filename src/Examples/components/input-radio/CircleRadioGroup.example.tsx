import {useState} from "react";
import {CircleRadioGroup, type RadioOption} from "./CircleRadioGroup";

const plans: RadioOption[] = [
    {value: "free", label: "Free"},
    {value: "pro", label: "Pro"},
    {value: "team", label: "Team"},
];

const CircleRadioGroupExample = () => {
    const [plan, setPlan] = useState("pro");

    return <CircleRadioGroup label="Plan" options={plans} value={plan} onChange={setPlan}/>;
};

export default CircleRadioGroupExample;
