import type {Example} from "../../types.ts";
import DataTree from "./DataTree.example.tsx";
import dataTreeSource from "./DataTree.example.tsx?raw";
import dataTreeComponentSource from "./DataTree.tsx?raw";
import LineTree from "./LineTree.example.tsx";
import lineTreeSource from "./LineTree.example.tsx?raw";
import lineTreeComponentSource from "./LineTree.tsx?raw";
import DirectoryTree from "./DirectoryTree.example.tsx";
import directoryTreeSource from "./DirectoryTree.example.tsx?raw";
import directoryTreeComponentSource from "./DirectoryTree.tsx?raw";
import CheckboxTree from "./CheckboxTree.example.tsx";
import checkboxTreeSource from "./CheckboxTree.example.tsx?raw";
import checkboxTreeComponentSource from "./CheckboxTree.tsx?raw";

const examples: Example[] = [
    {
        id: "data_tree",
        title: "Data tree",
        description: "A collapsible tree that organizes information as a hierarchy, from root nodes down to their children.",
        component: DataTree,
        source: dataTreeSource,
        files: [{name: "DataTree.tsx", source: dataTreeComponentSource}],
    },
    {
        id: "tree_with_line",
        title: "Tree with line",
        description: "A tree with plus and minus toggles and guide lines that show how the items in the hierarchy relate.",
        component: LineTree,
        source: lineTreeSource,
        files: [{name: "LineTree.tsx", source: lineTreeComponentSource}],
    },
    {
        id: "directory_tree",
        title: "Directory tree",
        description: "A file browser tree with folders you can open and close and the files inside them.",
        component: DirectoryTree,
        source: directoryTreeSource,
        files: [{name: "DirectoryTree.tsx", source: directoryTreeComponentSource}],
    },
    {
        id: "controlled_tree",
        title: "Controlled tree",
        description: "A tree with a checkbox on every node. Checking a parent checks its children, and the selection can be controlled from outside.",
        component: CheckboxTree,
        source: checkboxTreeSource,
        files: [{name: "CheckboxTree.tsx", source: checkboxTreeComponentSource}],
    },
];

export default examples;
