import {motion} from "framer-motion";
import {LuCircle, LuFrame, LuHand, LuMessageCircle, LuMousePointer, LuPenTool, LuSquare, LuType} from "react-icons/lu";
import {EditorToolbarDock, type EditorCanvasState, type EditorTool} from "./EditorToolbarDock";

const tools: EditorTool[] = [
    {id: "move", label: "Move", shortcut: "V", icon: LuMousePointer, hint: "Click a layer to select it"},
    {id: "hand", label: "Hand", shortcut: "H", icon: LuHand, hint: "Drag to pan the canvas"},
    {id: "frame", label: "Frame", shortcut: "F", icon: LuFrame, hint: "Drag to draw a frame"},
    {id: "rectangle", label: "Rectangle", shortcut: "R", icon: LuSquare, hint: "Drag to draw a rectangle"},
    {id: "ellipse", label: "Ellipse", shortcut: "O", icon: LuCircle, hint: "Drag to draw an ellipse"},
    {id: "pen", label: "Pen", shortcut: "P", icon: LuPenTool, hint: "Click to add points, Enter to finish"},
    {id: "text", label: "Text", shortcut: "T", icon: LuType, hint: "Click anywhere to add text"},
    {id: "comment", label: "Comment", shortcut: "C", icon: LuMessageCircle, hint: "Click to leave a comment"},
];

const colors: string[] = ["#0f172a", "#6366f1", "#ec4899", "#f59e0b", "#10b981", "#0ea5e9"];

// A sample artboard that takes the selected fill color.
const Artboard = ({color}: EditorCanvasState) => (
    <div aria-hidden="true" className="absolute left-1/2 top-10 w-56 -translate-x-1/2 rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-200 dark:bg-slate-950 dark:ring-slate-800">
        <p className="text-[10px] text-gray-400 dark:text-slate-500">Onboarding / Welcome</p>
        <motion.div animate={{backgroundColor: color}} className="mt-2 h-16 rounded-lg"/>
        <div className="mt-3 h-2 w-3/4 rounded-full bg-gray-200 dark:bg-slate-800"/>
        <div className="mt-2 h-2 w-1/2 rounded-full bg-gray-100 dark:bg-slate-800/60"/>
    </div>
);

const EditorToolbarDockExample = () => (
    <EditorToolbarDock tools={tools} colors={colors} renderCanvas={(state) => <Artboard {...state}/>}/>
);

export default EditorToolbarDockExample;
