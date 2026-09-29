import type {Example} from "../../types.ts";
import UndoRedoButtonsEditor from "./UndoRedoButtonsEditor.example.tsx";
import undoRedoButtonsEditorSource from "./UndoRedoButtonsEditor.example.tsx?raw";
import undoRedoButtonsEditorComponentSource from "./UndoRedoButtonsEditor.tsx?raw";
import UndoRedoShortcutEditor from "./UndoRedoShortcutEditor.example.tsx";
import undoRedoShortcutEditorSource from "./UndoRedoShortcutEditor.example.tsx?raw";
import undoRedoShortcutEditorComponentSource from "./UndoRedoShortcutEditor.tsx?raw";
import UndoRedoEditor from "./UndoRedoEditor.example.tsx";
import undoRedoEditorSource from "./UndoRedoEditor.example.tsx?raw";
import undoRedoEditorComponentSource from "./UndoRedoEditor.tsx?raw";

const examples: Example[] = [
    {
        id: "redo-undo-using-button",
        title: "Undo and redo with buttons",
        description: "An editor with undo and redo buttons above it. Typing is saved as one step after a short pause, and a button is disabled when there is nothing left to undo or redo.",
        component: UndoRedoButtonsEditor,
        source: undoRedoButtonsEditorSource,
        files: [{name: "UndoRedoButtonsEditor.tsx", source: undoRedoButtonsEditorComponentSource}],
        minHeight: 400,
    },
    {
        id: "redo-undo-using-keyboard-shortcut",
        title: "Undo and redo with keyboard shortcuts",
        description: "An editor that undoes with Ctrl+Z and redoes with Ctrl+Y or Ctrl+Shift+Z while it has focus. Use Cmd instead of Ctrl on macOS.",
        component: UndoRedoShortcutEditor,
        source: undoRedoShortcutEditorSource,
        files: [{name: "UndoRedoShortcutEditor.tsx", source: undoRedoShortcutEditorComponentSource}],
        minHeight: 340,
    },
    {
        id: "redo-undo-using-button-and-keyboard-shortcut",
        title: "Undo and redo with buttons and shortcuts",
        description: "An editor that supports both on-screen buttons and keyboard shortcuts for undo and redo, sharing one history.",
        component: UndoRedoEditor,
        source: undoRedoEditorSource,
        files: [{name: "UndoRedoEditor.tsx", source: undoRedoEditorComponentSource}],
        minHeight: 400,
    },
];

export default examples;
