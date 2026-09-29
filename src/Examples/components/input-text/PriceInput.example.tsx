import {FaBangladeshiTakaSign} from "react-icons/fa6";
import {FaEuroSign} from "react-icons/fa";
import {IoLogoUsd} from "react-icons/io";
import {PriceInput, type Currency} from "./PriceInput";

const currencies: Currency[] = [
    {code: "USD", icon: IoLogoUsd},
    {code: "EUR", icon: FaEuroSign},
    {code: "BDT", icon: FaBangladeshiTakaSign},
];

const PriceInputExample = () => (
    <div className="w-full md:w-[80%]">
        <PriceInput currencies={currencies} name="price" min={0}/>
    </div>
);

export default PriceInputExample;
