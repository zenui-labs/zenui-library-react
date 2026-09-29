import {LuAppWindow, LuBellOff, LuFileText, LuMonitorUp, LuStickyNote, LuTimer} from "react-icons/lu";
import {SpotlightPalette, type QuickAction, type SpotlightItem} from "./SpotlightPalette";

const items: SpotlightItem[] = [
    {id: "notes", label: "Notes", kind: "App", icon: LuStickyNote, tint: "from-amber-300 to-amber-500"},
    {id: "calendar", label: "Calendar", kind: "App", icon: LuAppWindow, tint: "from-rose-400 to-red-500"},
    {id: "figma", label: "Figma", kind: "App", icon: LuAppWindow, tint: "from-violet-400 to-fuchsia-500"},
    {id: "invoice", label: "Invoice 2026-09 Northwind.pdf", kind: "File", icon: LuFileText, tint: "from-sky-400 to-blue-500", detail: "Documents / Billing"},
    {id: "brief", label: "Brand refresh brief.docx", kind: "File", icon: LuFileText, tint: "from-sky-400 to-blue-500", detail: "Shared / Marketing"},
    {id: "focus", label: "Start a 25 minute focus timer", kind: "Action", icon: LuTimer, tint: "from-emerald-400 to-teal-500", isAction: true},
    {id: "share", label: "Share screen", kind: "Action", icon: LuMonitorUp, tint: "from-indigo-400 to-indigo-600", isAction: true},
];

const quickActions: QuickAction[] = [
    {id: "note", label: "New note", icon: LuStickyNote},
    {id: "timer", label: "Focus timer", icon: LuTimer},
    {id: "share", label: "Share screen", icon: LuMonitorUp},
    {id: "dnd", label: "Do not disturb", icon: LuBellOff, toggle: true, onStatus: "Do not disturb is on until 5 PM", offStatus: "Do not disturb is off"},
];

const SpotlightPaletteExample = () => (
    <SpotlightPalette
        items={items}
        quickActions={quickActions}
        hint="Try “18% of 2,450”, “(12 + 4) * 3” or “fig”."
    />
);

export default SpotlightPaletteExample;
