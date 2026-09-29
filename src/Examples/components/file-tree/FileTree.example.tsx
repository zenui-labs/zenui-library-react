import {FileTree, type TreeNode} from "./FileTree";

const tree: TreeNode[] = [
    {
        name: "src",
        children: [
            {
                name: "components",
                children: [{name: "Button.tsx"}, {name: "CommandPalette.tsx"}, {name: "FileTree.tsx"}],
            },
            {name: "hooks", children: [{name: "useHotkeys.ts"}, {name: "useMediaQuery.ts"}]},
            {name: "App.tsx"},
            {name: "main.tsx"},
            {name: "index.css"},
        ],
    },
    {name: "public", children: [{name: "favicon.svg"}, {name: "og-image.png"}]},
    {name: "package.json"},
    {name: "tsconfig.json"},
    {name: "README.md"},
];

const FileTreeExample = () => (
    <FileTree nodes={tree} defaultExpanded={["src", "src/components"]} defaultValue="src/components/FileTree.tsx"/>
);

export default FileTreeExample;
