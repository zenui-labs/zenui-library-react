import type {Example} from "../../types.ts";
import FileTree from "./FileTree.example.tsx";
import fileTreeSource from "./FileTree.example.tsx?raw";
import SearchableTree from "./SearchableTree.example.tsx";
import searchableTreeSource from "./SearchableTree.example.tsx?raw";
import SelectableTree from "./SelectableTree.example.tsx";
import selectableTreeSource from "./SelectableTree.example.tsx?raw";
import EditableTree from "./EditableTree.example.tsx";
import editableTreeSource from "./EditableTree.example.tsx?raw";
import ColumnBrowser from "./ColumnBrowser.example.tsx";
import columnBrowserSource from "./ColumnBrowser.example.tsx?raw";
import StorageTree from "./StorageTree.example.tsx";
import storageTreeSource from "./StorageTree.example.tsx?raw";
import ChangedFiles from "./ChangedFiles.example.tsx";
import changedFilesSource from "./ChangedFiles.example.tsx?raw";

const examples: Example[] = [
    {
        id: "file-tree",
        title: "File tree",
        description: "A project explorer that follows the tree keyboard pattern. Arrow keys move, open and close folders.",
        component: FileTree,
        source: fileTreeSource,
        minHeight: 480,
    },
    {
        id: "searchable-tree",
        title: "Searchable tree",
        description: "A filter field above the tree that keeps only matching files, opens the folders on their path and highlights the match. Arrow down moves from the field into the tree.",
        component: SearchableTree,
        source: searchableTreeSource,
        minHeight: 520,
    },
    {
        id: "editable-tree",
        title: "Editable tree",
        description: "Create, rename and delete pages and folders in place. Names are checked for duplicates, and a deleted item can be restored from the undo bar.",
        component: EditableTree,
        source: editableTreeSource,
        minHeight: 460,
    },
    {
        id: "selectable-tree",
        title: "Selectable tree",
        description: "Checkboxes with a mixed state for partly selected folders, sizes on every row and a meter that warns when the selection will not fit.",
        component: SelectableTree,
        source: selectableTreeSource,
        minHeight: 560,
    },
    {
        id: "column-browser",
        title: "Column browser",
        description: "A Finder style column view with breadcrumbs and a details panel for the selected file. Small screens show one column at a time with a back button.",
        component: ColumnBrowser,
        source: columnBrowserSource,
        minHeight: 460,
    },
    {
        id: "storage-tree",
        title: "Storage tree",
        description: "A disk usage view that sorts folders by size, shows each item's share of the disk and breaks the total down by file type.",
        component: StorageTree,
        source: storageTreeSource,
        minHeight: 560,
    },
    {
        id: "changed-files",
        title: "Changed files",
        description: "A review list of changed files grouped by folder, with change type, line counts and a viewed checkbox.",
        component: ChangedFiles,
        source: changedFilesSource,
        minHeight: 520,
    },
];

export default examples;
