import type {Example} from "../../types.ts";
import ResizableLayout from "./ResizableLayout.example.tsx";
import resizableLayoutSource from "./ResizableLayout.example.tsx?raw";
import resizableLayoutComponentSource from "./ResizableLayout.tsx?raw";

const examples: Example[] = [
    {
        id: "hover-animated-card-1",
        title: "Resizable layout",
        description: "Two panels side by side with a divider you drag, or move with the arrow keys, to change the width of the left panel.",
        component: ResizableLayout,
        source: resizableLayoutSource,
        files: [{name: "ResizableLayout.tsx", source: resizableLayoutComponentSource}],
        minHeight: 580,
    },
];

export default examples;
