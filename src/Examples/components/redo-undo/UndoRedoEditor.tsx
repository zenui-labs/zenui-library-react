import {useEffect, useRef, useState} from "react";
import type {KeyboardEvent} from "react";
import {LuRedo2, LuUndo2} from "react-icons/lu";

export interface UndoRedoEditorProps {
    /** HTML the editor starts with. It is also the first history entry. */
    initialContent?: string;
    /** History length. Past this, the oldest entries after the first one are dropped. */
    maxHistory?: number;
    /** Milliseconds without typing before the change is saved as one history entry. */
    saveDelay?: number;
    /** Called with the editor HTML each time a change is saved, undone or redone. */
    onChange?: (html: string) => void;
    /** Accessible name of the editable area. */
    label?: string;
    undoLabel?: string;
    redoLabel?: string;
    className?: string;
}

interface History {
    entries: string[];
    index: number;
}

const buttonClass = (disabled: boolean) =>
    `rounded px-3 py-2 ${
        disabled
            ? "cursor-not-allowed bg-gray-200 text-gray-500 dark:bg-slate-700"
            : "bg-[#3B9DF8] text-white hover:bg-blue-600"
    }`;

/**
 * A rich text area with its own undo history, driven by buttons and by Ctrl+Z, Ctrl+Y and Ctrl+Shift+Z
 * (Cmd on macOS). Typing is grouped into one entry after a short pause.
 */
export const UndoRedoEditor = ({
    initialContent = "",
    maxHistory = 30,
    saveDelay = 800,
    onChange,
    label = "Editor",
    undoLabel = "Undo",
    redoLabel = "Redo",
    className = "",
}: UndoRedoEditorProps) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    // The ref is read by timers and key handlers; the state only drives the button states.
    const historyRef = useRef<History>({entries: [initialContent], index: 0});
    const [history, setHistory] = useState<History>(historyRef.current);

    useEffect(() => {
        if (editorRef.current) editorRef.current.innerHTML = historyRef.current.entries[0];

        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
            timerRef.current = null;
        };
    }, []);

    const commit = (next: History) => {
        historyRef.current = next;
        setHistory(next);
        onChange?.(next.entries[next.index]);
    };

    const save = (html: string) => {
        const {entries, index} = historyRef.current;
        if (html === entries[index]) return;

        let next = [...entries.slice(0, index + 1), html];
        if (next.length > maxHistory) next = [next[0], ...next.slice(next.length - maxHistory + 1)];
        commit({entries: next, index: next.length - 1});
    };

    // Saves typing that is still waiting for the save delay, so undo never skips it.
    const flush = () => {
        if (timerRef.current === null) return;
        clearTimeout(timerRef.current);
        timerRef.current = null;
        if (editorRef.current) save(editorRef.current.innerHTML);
    };

    // Writes an entry back into the editor and puts the caret at the end.
    const restore = (html: string) => {
        const editor = editorRef.current;
        if (!editor) return;

        editor.innerHTML = html;
        if (document.hasFocus()) {
            const range = document.createRange();
            range.selectNodeContents(editor);
            range.collapse(false);
            const selection = window.getSelection();
            selection?.removeAllRanges();
            selection?.addRange(range);
            editor.focus();
        }
    };

    const move = (offset: number) => {
        flush();
        const {entries, index} = historyRef.current;
        const target = index + offset;
        if (target < 0 || target >= entries.length) return;

        commit({entries, index: target});
        restore(entries[target]);
    };

    const handleInput = () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            timerRef.current = null;
            if (editorRef.current) save(editorRef.current.innerHTML);
        }, saveDelay);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (!(event.ctrlKey || event.metaKey) || event.altKey) return;

        const key = event.key.toLowerCase();
        if (key === "z" && !event.shiftKey) {
            event.preventDefault();
            move(-1);
        } else if (key === "y" || (key === "z" && event.shiftKey)) {
            event.preventDefault();
            move(1);
        }
    };

    const canUndo = history.index > 0;
    const canRedo = history.index < history.entries.length - 1;

    return (
        <div className={`w-full ${className}`}>
            <div className="mb-4 flex gap-2">
                <button
                    type="button"
                    onClick={() => move(-1)}
                    disabled={!canUndo}
                    aria-label={undoLabel}
                    title={undoLabel}
                    className={buttonClass(!canUndo)}
                >
                    <LuUndo2 aria-hidden/>
                </button>

                <button
                    type="button"
                    onClick={() => move(1)}
                    disabled={!canRedo}
                    aria-label={redoLabel}
                    title={redoLabel}
                    className={buttonClass(!canRedo)}
                >
                    <LuRedo2 aria-hidden/>
                </button>
            </div>

            <div
                ref={editorRef}
                contentEditable
                role="textbox"
                aria-multiline="true"
                aria-label={label}
                onInput={handleInput}
                onKeyDown={handleKeyDown}
                className="min-h-64 cursor-text rounded-lg border border-gray-300 p-4 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#3B9DF8] dark:border-slate-600 dark:text-slate-300"
            />
        </div>
    );
};
