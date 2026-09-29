import type {Example} from "../../types.ts";
import CodeBlock from "./CodeBlock.example.tsx";
import codeBlockSource from "./CodeBlock.example.tsx?raw";
import codeBlockComponentSource from "./CodeBlock.tsx?raw";

const examples: Example[] = [
    {
        id: "code",
        title: "Code",
        description: "A code block for showing commands and short snippets with clear formatting.",
        component: CodeBlock,
        source: codeBlockSource,
        files: [{name: "CodeBlock.tsx", source: codeBlockComponentSource}],
    },
];

export default examples;
