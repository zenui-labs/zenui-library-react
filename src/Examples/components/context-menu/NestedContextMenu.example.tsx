import {useState} from "react";
import {MdContentCopy} from "react-icons/md";
import {GoLink, GoShare} from "react-icons/go";
import {LuPencil} from "react-icons/lu";
import {AiOutlineDelete} from "react-icons/ai";
import {IoCloudDownloadOutline} from "react-icons/io5";
import {GrCloudUpload} from "react-icons/gr";
import {NestedContextMenu, type NestedMenuItem} from "./NestedContextMenu";

const items: NestedMenuItem[] = [
    {label: "Copy", icon: MdContentCopy},
    {
        label: "Share",
        icon: GoShare,
        submenu: [
            {label: "Download", icon: IoCloudDownloadOutline},
            {label: "Upload", icon: GrCloudUpload},
            {label: "Copy link", icon: GoLink},
        ],
    },
    {label: "Rename", icon: LuPencil},
    {label: "Delete", icon: AiOutlineDelete, danger: true},
];

const NestedContextMenuExample = () => {
    const [lastAction, setLastAction] = useState("None yet");

    return (
        <div className="w-full">
            <NestedContextMenu items={items} onSelect={(item) => setLastAction(item.label)}>
                ZenUI Library is a free collection of templates and components for React. Right-click this text and
                hover Share to see the submenu.
            </NestedContextMenu>
            <p className="mt-3 text-sm text-gray-500 dark:text-slate-400">Last action: {lastAction}</p>
        </div>
    );
};

export default NestedContextMenuExample;
