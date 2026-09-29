import {AiOutlineDelete, AiOutlineSchedule} from "react-icons/ai";
import {LuSaveAll} from "react-icons/lu";
import {SendDropdownButton, type SendOption} from "./SendDropdownButton";

const options: SendOption[] = [
    {label: "Schedule for later", icon: AiOutlineSchedule},
    {label: "Save draft", icon: LuSaveAll},
    {label: "Delete", icon: AiOutlineDelete},
];

const SendDropdownButtonExample = () => <SendDropdownButton options={options}/>;

export default SendDropdownButtonExample;
