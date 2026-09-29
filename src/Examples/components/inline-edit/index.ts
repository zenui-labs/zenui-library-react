import type {Example} from "../../types.ts";
import InlineEdit from "./InlineEdit.example.tsx";
import inlineEditSource from "./InlineEdit.example.tsx?raw";
import EditableHeading from "./EditableHeading.example.tsx";
import editableHeadingSource from "./EditableHeading.example.tsx?raw";
import PropertyPanel from "./PropertyPanel.example.tsx";
import propertyPanelSource from "./PropertyPanel.example.tsx?raw";
import NoteWithUndo from "./NoteWithUndo.example.tsx";
import noteWithUndoSource from "./NoteWithUndo.example.tsx?raw";
import OptimisticRename from "./OptimisticRename.example.tsx";
import optimisticRenameSource from "./OptimisticRename.example.tsx?raw";
import EditableTable from "./EditableTable.example.tsx";
import editableTableSource from "./EditableTable.example.tsx?raw";
import ScrubInput from "./ScrubInput.example.tsx";
import scrubInputSource from "./ScrubInput.example.tsx?raw";

const examples: Example[] = [
    {
        id: "inline-edit",
        title: "Inline edit",
        description: "Settings values that turn into a field when clicked, with validation and a saving state. Enter saves and Escape cancels.",
        component: InlineEdit,
        source: inlineEditSource,
        minHeight: 420,
    },
    {
        id: "editable-heading",
        title: "Editable heading",
        description: "A title and summary that look like plain text and can be edited in place. Changes save when the field loses focus.",
        component: EditableHeading,
        source: editableHeadingSource,
    },
    {
        id: "property-panel",
        title: "Property panel",
        description: "Project properties that each edit with the right control: a list for status and owner, a date field, and an amount with a currency picker.",
        component: PropertyPanel,
        source: propertyPanelSource,
        minHeight: 440,
    },
    {
        id: "note-with-undo",
        title: "Note with undo",
        description: "A multi-line note that grows as you type and saves with Command or Control and Enter. After saving, an undo bar counts down before it closes.",
        component: NoteWithUndo,
        source: noteWithUndoSource,
        minHeight: 420,
    },
    {
        id: "optimistic-rename",
        title: "Optimistic rename",
        description: "Channel names update the moment you press Enter. If the server rejects the name, the row rolls back, shakes and explains why.",
        component: OptimisticRename,
        source: optimisticRenameSource,
        minHeight: 440,
    },
    {
        id: "editable-table",
        title: "Editable table",
        description: "A spreadsheet style grid where arrow keys move between cells and Enter or typing starts an edit. Changed cells are marked until you save or discard.",
        component: EditableTable,
        source: editableTableSource,
        minHeight: 460,
    },
    {
        id: "scrub-input",
        title: "Scrub to edit",
        description: "Number fields from a design tool. Drag a label left or right to change the value, or type a number or a sum like 240/2.",
        component: ScrubInput,
        source: scrubInputSource,
        minHeight: 460,
    },
];

export default examples;
