import {useState} from "react";
import {SquareRadioGroup, type RadioOption} from "./SquareRadioGroup";

const deliveryOptions: RadioOption[] = [
    {value: "standard", label: "Standard"},
    {value: "express", label: "Express"},
    {value: "pickup", label: "Pickup"},
];

const SquareRadioGroupExample = () => {
    const [delivery, setDelivery] = useState("standard");

    return <SquareRadioGroup label="Delivery" options={deliveryOptions} value={delivery} onChange={setDelivery}/>;
};

export default SquareRadioGroupExample;
