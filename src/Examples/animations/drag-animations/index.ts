import type {Example} from "../../types.ts";
import DragSortList from "./DragSortList.example.tsx";
import dragSortListSource from "./DragSortList.example.tsx?raw";
import dragSortListComponentSource from "./DragSortList.tsx?raw";
import DirectionLockDrag from "./DirectionLockDrag.example.tsx";
import directionLockDragSource from "./DirectionLockDrag.example.tsx?raw";
import directionLockDragComponentSource from "./DirectionLockDrag.tsx?raw";
import SwipeCardStack from "./SwipeCardStack.example.tsx";
import swipeCardStackSource from "./SwipeCardStack.example.tsx?raw";
import swipeCardStackComponentSource from "./SwipeCardStack.tsx?raw";

const examples: Example[] = [
    {
        id: "drag-&-drop-animation",
        title: "Drag and drop animation",
        description: "A list of cards you reorder by dragging one over another, while the rest slide into their new places. Use it for task lists, playlists or priorities.",
        component: DragSortList,
        source: dragSortListSource,
        files: [{name: "DragSortList.tsx", source: dragSortListComponentSource}],
        minHeight: 820,
    },
    {
        id: "drag-position-lock",
        title: "Drag position lock",
        description: "A draggable image that locks to the first direction you drag in, horizontal or vertical, and springs back to where it started when released.",
        component: DirectionLockDrag,
        source: directionLockDragSource,
        files: [{name: "DirectionLockDrag.tsx", source: directionLockDragComponentSource}],
    },
    {
        id: "3d-drag-stack",
        title: "3D drag stack",
        description: "A stack of cards where you drag the front card sideways to throw it off, tilting as it goes, and the card behind it moves forward.",
        component: SwipeCardStack,
        source: swipeCardStackSource,
        files: [{name: "SwipeCardStack.tsx", source: swipeCardStackComponentSource}],
        minHeight: 380,
    },
];

export default examples;
