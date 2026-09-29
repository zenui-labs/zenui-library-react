import {LuCalendar, LuCompass, LuFolder, LuImage, LuMail, LuMusic, LuSettings, LuTerminal, LuTrash2} from "react-icons/lu";
import {MagnifyingDock, type DockApp} from "./MagnifyingDock";

const apps: DockApp[] = [
    {name: "Files", icon: LuFolder, color: "from-sky-400 to-blue-600"},
    {name: "Browser", icon: LuCompass, color: "from-cyan-400 to-sky-600"},
    {name: "Mail", icon: LuMail, color: "from-blue-400 to-indigo-600", badge: 3},
    {name: "Calendar", icon: LuCalendar, color: "from-rose-400 to-red-600"},
    {name: "Photos", icon: LuImage, color: "from-amber-300 to-orange-500"},
    {name: "Music", icon: LuMusic, color: "from-pink-400 to-rose-600"},
    {name: "Terminal", icon: LuTerminal, color: "from-slate-600 to-slate-900"},
    {name: "Settings", icon: LuSettings, color: "from-gray-400 to-gray-600"},
];

const trash: DockApp[] = [{name: "Trash", icon: LuTrash2, color: "from-zinc-300 to-zinc-500"}];

const MagnifyingDockExample = () => <MagnifyingDock apps={apps} trailingApps={trash} defaultOpenApps={["Files", "Mail"]}/>;

export default MagnifyingDockExample;
