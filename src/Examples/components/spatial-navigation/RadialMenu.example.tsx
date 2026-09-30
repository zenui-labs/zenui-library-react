import {useState} from "react";
import {
    LuArrowUpRight, LuCircle, LuFrame, LuHand, LuHash, LuImage, LuLayoutGrid, LuMessageCircle, LuMinus,
    LuMousePointer2, LuPencil, LuPenTool, LuSlice, LuSquare, LuStar, LuTriangle, LuType,
} from "react-icons/lu";
import {RadialMenu, type RadialItem} from "./RadialMenu";

const tools: RadialItem[] = [
    {id: "move", label: "Move", icon: LuMousePointer2, shortcut: "V"},
    {
        id: "frame", label: "Frame", icon: LuFrame, shortcut: "F", children: [
            {id: "frame-frame", label: "Frame", icon: LuFrame, shortcut: "F"},
            {id: "section", label: "Section", icon: LuLayoutGrid, shortcut: "⇧ S"},
            {id: "slice", label: "Slice", icon: LuSlice, shortcut: "S"},
        ],
    },
    {
        id: "shape", label: "Shape", icon: LuSquare, shortcut: "R", children: [
            {id: "rectangle", label: "Rect", icon: LuSquare, shortcut: "R"},
            {id: "ellipse", label: "Ellipse", icon: LuCircle, shortcut: "O"},
            {id: "polygon", label: "Polygon", icon: LuTriangle},
            {id: "star", label: "Star", icon: LuStar},
            {id: "line", label: "Line", icon: LuMinus, shortcut: "L"},
            {id: "arrow", label: "Arrow", icon: LuArrowUpRight, shortcut: "⇧ L"},
        ],
    },
    {
        id: "pen", label: "Pen", icon: LuPenTool, shortcut: "P", children: [
            {id: "pen-pen", label: "Pen", icon: LuPenTool, shortcut: "P"},
            {id: "pencil", label: "Pencil", icon: LuPencil, shortcut: "⇧ P"},
        ],
    },
    {id: "text", label: "Text", icon: LuType, shortcut: "T"},
    {id: "image", label: "Image", icon: LuImage, shortcut: "⇧ ⌘ K"},
    {id: "comment", label: "Comment", icon: LuMessageCircle, shortcut: "C"},
    {id: "hand", label: "Hand", icon: LuHand, shortcut: "H"},
];

const RadialMenuExample = () => {
    const [tool, setTool] = useState("move");

    return (
        <RadialMenu items={tools} value={tool} onSelect={(item) => setTool(item.id)} label="Onboarding artboard">
            <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 w-[200px] -translate-x-1/2 -translate-y-1/2">
                <p className="mb-1.5 flex items-center gap-1 text-[10px] text-zinc-400 dark:text-zinc-500">
                    <LuHash className="h-3 w-3"/>Onboarding / 02 · 390 × 844
                </p>
                <div className="h-[280px] rounded-md border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                    <div className="h-28 rounded bg-zinc-100 dark:bg-zinc-800"/>
                    <div className="mt-4 h-2.5 w-4/5 rounded-full bg-zinc-200 dark:bg-zinc-700"/>
                    <div className="mt-2 h-2 w-3/5 rounded-full bg-zinc-100 dark:bg-zinc-800"/>
                    <div className="mt-10 h-8 rounded-md bg-zinc-900 dark:bg-zinc-100"/>
                </div>
            </div>
        </RadialMenu>
    );
};

export default RadialMenuExample;
