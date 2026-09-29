import type {Example} from "../../types.ts";
import CommandPalette from "./CommandPalette.example.tsx";
import commandPaletteSource from "./CommandPalette.example.tsx?raw";
import CommandMenu from "./CommandMenu.example.tsx";
import commandMenuSource from "./CommandMenu.example.tsx?raw";
import PreviewPalette from "./PreviewPalette.example.tsx";
import previewPaletteSource from "./PreviewPalette.example.tsx?raw";
import SearchPopover from "./SearchPopover.example.tsx";
import searchPopoverSource from "./SearchPopover.example.tsx?raw";
import SpotlightPalette from "./SpotlightPalette.example.tsx";
import spotlightPaletteSource from "./SpotlightPalette.example.tsx?raw";
import SlashMenu from "./SlashMenu.example.tsx";
import slashMenuSource from "./SlashMenu.example.tsx?raw";
import SheetPalette from "./SheetPalette.example.tsx";
import sheetPaletteSource from "./SheetPalette.example.tsx?raw";

const examples: Example[] = [
    {
        id: "command-palette",
        title: "Command palette",
        description: "A searchable dialog that opens with a keyboard shortcut. Results are grouped, matches are highlighted and arrow keys move the selection.",
        component: CommandPalette,
        source: commandPaletteSource,
        minHeight: 540,
    },
    {
        id: "nested-command-menu",
        title: "Nested command menu",
        description: "An inline command list with sub-pages for picking an assignee, status or priority. Backspace on an empty search goes back a level.",
        component: CommandMenu,
        source: commandMenuSource,
        minHeight: 460,
    },
    {
        id: "preview-palette",
        title: "Palette with preview",
        description: "Search across docs, people and channels with a preview pane that follows the highlighted result. The preview hides on small screens, where each row shows a subtitle instead.",
        component: PreviewPalette,
        source: previewPaletteSource,
        minHeight: 520,
    },
    {
        id: "search-popover",
        title: "Header search with results",
        description: "An inline search field for an app header. Recent searches show on focus, and typing shows a loading state, category filters and highlighted matches.",
        component: SearchPopover,
        source: searchPopoverSource,
        minHeight: 560,
    },
    {
        id: "spotlight-calculator",
        title: "Spotlight with calculator",
        description: "A launcher on a frosted panel with quick action tiles. Type a sum or a percentage to get a result you can copy with Enter.",
        component: SpotlightPalette,
        source: spotlightPaletteSource,
        minHeight: 560,
    },
    {
        id: "slash-menu",
        title: "Slash command menu",
        description: "A block editor where typing / opens a filtered menu of block types. It is the same list-and-keyboard pattern as a palette, anchored to the text you are writing.",
        component: SlashMenu,
        source: slashMenuSource,
        minHeight: 600,
    },
    {
        id: "sheet-palette",
        title: "Bottom sheet palette",
        description: "Opens as a draggable bottom sheet on phones and a centered dialog on larger screens. Pinned items and recent history fill the empty state.",
        component: SheetPalette,
        source: sheetPaletteSource,
        minHeight: 480,
    },
];

export default examples;
