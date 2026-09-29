import {IoMdFootball} from "react-icons/io";
import {MdOutlineSportsCricket, MdOutlineSportsTennis} from "react-icons/md";
import {GiTennisRacket} from "react-icons/gi";
import {IconSelect, type IconSelectOption} from "./IconSelect";

const sports: IconSelectOption[] = [
    {label: "Football", icon: IoMdFootball},
    {label: "Cricket", icon: MdOutlineSportsCricket},
    {label: "Tennis", icon: MdOutlineSportsTennis},
    {label: "Badminton", icon: GiTennisRacket},
];

const IconSelectExample = () => <IconSelect options={sports}/>;

export default IconSelectExample;
