import type {Example} from "../../types.ts";
import CopyButtons from "./CopyButtons.example.tsx";
import copyButtonsSource from "./CopyButtons.example.tsx?raw";
import copyButtonsComponentSource from "./CopyButtons.tsx?raw";
import CopyField from "./CopyField.example.tsx";
import copyFieldSource from "./CopyField.example.tsx?raw";
import copyFieldComponentSource from "./CopyField.tsx?raw";
import CodeBlockCopy from "./CodeBlockCopy.example.tsx";
import codeBlockCopySource from "./CodeBlockCopy.example.tsx?raw";
import codeBlockCopyComponentSource from "./CodeBlockCopy.tsx?raw";
import CopyToast from "./CopyToast.example.tsx";
import copyToastSource from "./CopyToast.example.tsx?raw";
import copyToastComponentSource from "./CopyToast.tsx?raw";
import ColorFormats from "./ColorFormats.example.tsx";
import colorFormatsSource from "./ColorFormats.example.tsx?raw";
import colorFormatsComponentSource from "./ColorFormats.tsx?raw";
import SecretsTable from "./SecretsTable.example.tsx";
import secretsTableSource from "./SecretsTable.example.tsx?raw";
import secretsTableComponentSource from "./SecretsTable.tsx?raw";
import CitationCopy from "./CitationCopy.example.tsx";
import citationCopySource from "./CitationCopy.example.tsx?raw";
import citationCopyComponentSource from "./CitationCopy.tsx?raw";

const examples: Example[] = [
    {
        id: "copy-buttons",
        title: "Copy buttons",
        description: "Icon, label and swatch buttons that copy a value and confirm it for a moment. Falls back to an older method when the Clipboard API is not available.",
        component: CopyButtons,
        source: copyButtonsSource,
        files: [{name: "CopyButtons.tsx", source: copyButtonsComponentSource}],
    },
    {
        id: "copy-field",
        title: "Copy field",
        description: "Read-only fields for invite links and keys, with a copy action and an option to reveal a hidden value.",
        component: CopyField,
        source: copyFieldSource,
        files: [{name: "CopyField.tsx", source: copyFieldComponentSource}],
        minHeight: 420,
    },
    {
        id: "code-block-copy",
        title: "Code block copy",
        description: "An install command with package manager tabs and a highlighted code sample, each with its own copy button that confirms in place.",
        component: CodeBlockCopy,
        source: codeBlockCopySource,
        files: [{name: "CodeBlockCopy.tsx", source: codeBlockCopyComponentSource}],
        minHeight: 520,
    },
    {
        id: "copy-with-toast",
        title: "Copy with toast",
        description: "Contact details that copy when clicked and confirm with a small toast. Toasts stack, dismiss on their own and can be closed early.",
        component: CopyToast,
        source: copyToastSource,
        files: [{name: "CopyToast.tsx", source: copyToastComponentSource}],
        minHeight: 520,
    },
    {
        id: "color-formats",
        title: "Copy format menu",
        description: "A split button that copies a color as HEX, RGB, HSL or a CSS variable. The format you pick from the menu becomes the default.",
        component: ColorFormats,
        source: colorFormatsSource,
        files: [{name: "ColorFormats.tsx", source: colorFormatsComponentSource}],
        minHeight: 480,
    },
    {
        id: "secrets-table",
        title: "Secrets table",
        description: "Environment variables with icon copy buttons on each row, per row reveal, key rotation with an inline confirm and a copy as .env action.",
        component: SecretsTable,
        source: secretsTableSource,
        files: [{name: "SecretsTable.tsx", source: secretsTableComponentSource}],
        minHeight: 460,
    },
    {
        id: "citation-copy",
        title: "Citation copy",
        description: "Switch between APA, MLA, Chicago and BibTeX and copy the citation as plain text, while the preview keeps its formatting.",
        component: CitationCopy,
        source: citationCopySource,
        files: [{name: "CitationCopy.tsx", source: citationCopyComponentSource}],
        minHeight: 460,
    },
];

export default examples;
