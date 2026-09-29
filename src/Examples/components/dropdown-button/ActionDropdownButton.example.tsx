import {MdDone} from "react-icons/md";
import {BiCopy, BiEdit} from "react-icons/bi";
import {ActionDropdownButton, type DropdownAction} from "./ActionDropdownButton";

const actions: DropdownAction[] = [
    {label: "Mark as read", icon: MdDone},
    {label: "Copy", icon: BiCopy},
    {label: "Edit", icon: BiEdit},
];

const ActionDropdownButtonExample = () => <ActionDropdownButton actions={actions}/>;

export default ActionDropdownButtonExample;
