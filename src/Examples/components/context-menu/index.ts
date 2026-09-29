import type {Example} from "../../types.ts";
import ContextMenu from "./ContextMenu.example.tsx";
import contextMenuSource from "./ContextMenu.example.tsx?raw";
import contextMenuComponentSource from "./ContextMenu.tsx?raw";
import NestedContextMenu from "./NestedContextMenu.example.tsx";
import nestedContextMenuSource from "./NestedContextMenu.example.tsx?raw";
import nestedContextMenuComponentSource from "./NestedContextMenu.tsx?raw";

const examples: Example[] = [
    {
        id: "context_menu",
        title: "Context menu",
        description: "A menu that opens at the pointer on right-click and lists actions for the item under it. Escape or a click outside closes it.",
        component: ContextMenu,
        source: contextMenuSource,
        files: [{name: "ContextMenu.tsx", source: contextMenuComponentSource}],
        minHeight: 360,
    },
    {
        id: "context_menu_with_dropdown",
        title: "Context menu with dropdown",
        description: "A right-click menu with items that open a submenu of more actions on hover or click.",
        component: NestedContextMenu,
        source: nestedContextMenuSource,
        files: [{name: "NestedContextMenu.tsx", source: nestedContextMenuComponentSource}],
        minHeight: 360,
    },
];

export default examples;
