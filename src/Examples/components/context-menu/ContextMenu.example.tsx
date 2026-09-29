import {useState} from "react";
import {MdContentCopy} from "react-icons/md";
import {GoLink, GoShare} from "react-icons/go";
import {LuPencil} from "react-icons/lu";
import {AiOutlineDelete} from "react-icons/ai";
import {ContextMenu, type ContextMenuItem} from "./ContextMenu";

const items: ContextMenuItem[] = [
    {label: "Copy", icon: MdContentCopy},
    {label: "Copy link", icon: GoLink},
    {label: "Share", icon: GoShare},
    {label: "Rename", icon: LuPencil},
    {label: "Delete", icon: AiOutlineDelete, danger: true},
];

const ContextMenuExample = () => {
    const [lastAction, setLastAction] = useState("None yet");

    return (
        <div className="w-full">
            <ContextMenu items={items} onSelect={(item) => setLastAction(item.label)}>
                ZenUI Library is a free collection of templates and components for React. Right-click this text to
                open the menu.
            </ContextMenu>
            <p className="mt-3 text-sm text-gray-500 dark:text-slate-400">Last action: {lastAction}</p>
        </div>
    );
};

export default ContextMenuExample;
