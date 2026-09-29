import type {Example} from "../../types.ts";
import DragSwapGrid from "./DragSwapGrid.example.tsx";
import dragSwapGridSource from "./DragSwapGrid.example.tsx?raw";
import dragSwapGridComponentSource from "./DragSwapGrid.tsx?raw";
import MultiFileDropzone from "./MultiFileDropzone.example.tsx";
import multiFileDropzoneSource from "./MultiFileDropzone.example.tsx?raw";
import multiFileDropzoneComponentSource from "./MultiFileDropzone.tsx?raw";
import ImageDropzone from "./ImageDropzone.example.tsx";
import imageDropzoneSource from "./ImageDropzone.example.tsx?raw";
import imageDropzoneComponentSource from "./ImageDropzone.tsx?raw";
import DraggableProfileList from "./DraggableProfileList.example.tsx";
import draggableProfileListSource from "./DraggableProfileList.example.tsx?raw";
import draggableProfileListComponentSource from "./DraggableProfileList.tsx?raw";
import DragDropTodoBoard from "./DragDropTodoBoard.example.tsx";
import dragDropTodoBoardSource from "./DragDropTodoBoard.example.tsx?raw";
import dragDropTodoBoardComponentSource from "./DragDropTodoBoard.tsx?raw";

const examples: Example[] = [
    {
        id: "drag-&-drop-with-indicator",
        title: "Drag and drop with indicator",
        description: "A grid of tiles you can drag onto each other to swap them, with a dashed border that shows where the tile will land.",
        component: DragSwapGrid,
        source: dragSwapGridSource,
        files: [{name: "DragSwapGrid.tsx", source: dragSwapGridComponentSource}],
    },
    {
        id: "upload-multiple-files-with-drag-&-drop",
        title: "Upload multiple files with drag and drop",
        description: "A drop zone for uploading several files at once, with a progress bar and a cancel button for each file.",
        component: MultiFileDropzone,
        source: multiFileDropzoneSource,
        files: [{name: "MultiFileDropzone.tsx", source: multiFileDropzoneComponentSource}],
        minHeight: 420,
    },
    {
        id: "upload-image-with-drag-&-drop",
        title: "Upload image with drag and drop",
        description: "A drop zone for a single image. Drop a file or browse for one, and the zone shows it as a preview.",
        component: ImageDropzone,
        source: imageDropzoneSource,
        files: [{name: "ImageDropzone.tsx", source: imageDropzoneComponentSource}],
        minHeight: 380,
    },
    {
        id: "list-drag-&-drop",
        title: "List drag and drop",
        description: "A list of profile rows you can drag onto each other to rearrange them into a new order.",
        component: DraggableProfileList,
        source: draggableProfileListSource,
        files: [{name: "DraggableProfileList.tsx", source: draggableProfileListComponentSource}],
    },
    {
        id: "todo-app-with-drag-&-drop",
        title: "Todo app with drag and drop",
        description: "A todo board with two columns. Add tasks and drag them to the completed column, or back again to reopen them.",
        component: DragDropTodoBoard,
        source: dragDropTodoBoardSource,
        files: [{name: "DragDropTodoBoard.tsx", source: dragDropTodoBoardComponentSource}],
    },
];

export default examples;
