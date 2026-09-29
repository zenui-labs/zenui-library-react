import type {Example} from "../../types.ts";
import PrimarySnippet from "./PrimarySnippet.example.tsx";
import primarySnippetSource from "./PrimarySnippet.example.tsx?raw";
import primarySnippetComponentSource from "./PrimarySnippet.tsx?raw";
import BackgroundSnippet from "./BackgroundSnippet.example.tsx";
import backgroundSnippetSource from "./BackgroundSnippet.example.tsx?raw";
import backgroundSnippetComponentSource from "./BackgroundSnippet.tsx?raw";
import BorderedSnippet from "./BorderedSnippet.example.tsx";
import borderedSnippetSource from "./BorderedSnippet.example.tsx?raw";
import borderedSnippetComponentSource from "./BorderedSnippet.tsx?raw";
import PlainSnippet from "./PlainSnippet.example.tsx";
import plainSnippetSource from "./PlainSnippet.example.tsx?raw";
import plainSnippetComponentSource from "./PlainSnippet.tsx?raw";

const examples: Example[] = [
    {
        id: "primary_snippet",
        title: "Primary snippet",
        description: "A command on a gray background with a button that copies it in one click.",
        component: PrimarySnippet,
        source: primarySnippetSource,
        files: [{name: "PrimarySnippet.tsx", source: primarySnippetComponentSource}],
    },
    {
        id: "background_snippet",
        title: "Background snippet",
        description: "A command on a solid color background with a copy button.",
        component: BackgroundSnippet,
        source: backgroundSnippetSource,
        files: [{name: "BackgroundSnippet.tsx", source: backgroundSnippetComponentSource}],
    },
    {
        id: "bordered_snippet",
        title: "Bordered snippet",
        description: "A command in an outlined box with a copy button, in a blue or a gray tone.",
        component: BorderedSnippet,
        source: borderedSnippetSource,
        files: [{name: "BorderedSnippet.tsx", source: borderedSnippetComponentSource}],
    },
    {
        id: "without_icon_snippet",
        title: "Snippet without icon",
        description: "A command on a gray background without a copy button, for display only.",
        component: PlainSnippet,
        source: plainSnippetSource,
        files: [{name: "PlainSnippet.tsx", source: plainSnippetComponentSource}],
    },
];

export default examples;
