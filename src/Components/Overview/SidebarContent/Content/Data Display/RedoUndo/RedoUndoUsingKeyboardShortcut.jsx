import {useEffect, useRef, useState} from 'react';

// react icons

function RedoUndoUsingKeyboardShortcut() {
    const MAX_HISTORY_LENGTH = 30;
    const SAVE_DELAY = 800;

    const editorRef = useRef(null);
    const [history, setHistory] = useState(['Start typing here...']);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isUndoRedo, setIsUndoRedo] = useState(false);
    const timerRef = useRef(null);
    const lastContentRef = useRef('Start typing here...');

    useEffect(() => {
        if (isUndoRedo && editorRef.current) {
            editorRef.current.innerHTML = history[currentIndex];
            lastContentRef.current = history[currentIndex];
            setIsUndoRedo(false);

            if (document.hasFocus()) {
                try {
                    const range = document.createRange();
                    const sel = window.getSelection();
                    range.selectNodeContents(editorRef.current);
                    range.collapse(false);
                    sel.removeAllRanges();
                    sel.addRange(range);
                    editorRef.current.focus();
                } catch (e) {
                    console.error("Selection error handled");
                }
            }
        }
    }, [currentIndex, isUndoRedo, history]);

    useEffect(() => {
        if (editorRef.current) {
            editorRef.current.innerHTML = history[0];
            lastContentRef.current = history[0];
        }

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
                timerRef.current = null;
            }
        };
    }, []);

    const saveToHistory = (newContent) => {
        if (newContent !== lastContentRef.current) {
            let newHistory = history.slice(0, currentIndex + 1);
            newHistory.push(newContent);

            if (newHistory.length > MAX_HISTORY_LENGTH) {
                const itemsToRemove = newHistory.length - MAX_HISTORY_LENGTH;
                if (itemsToRemove > 0) {
                    const firstItem = newHistory[0];
                    newHistory = [firstItem, ...newHistory.slice(itemsToRemove + 1)];
                    const newIndex = Math.max(0, currentIndex - itemsToRemove);
                    setCurrentIndex(newIndex);
                }
            } else {
                setCurrentIndex(newHistory.length - 1);
            }

            setHistory(newHistory);
            lastContentRef.current = newContent;
        }
    };

    const handleChange = () => {
        if (!editorRef.current) return;

        const newContent = editorRef.current.innerHTML;

        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
            saveToHistory(newContent);
            timerRef.current = null;
        }, SAVE_DELAY);
    };

    const handleUndo = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;

            if (editorRef.current && editorRef.current.innerHTML !== lastContentRef.current) {
                saveToHistory(editorRef.current.innerHTML);
            }
        }

        if (currentIndex > 0) {
            setIsUndoRedo(true);
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleRedo = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }

        if (currentIndex < history.length - 1) {
            setIsUndoRedo(true);
            setCurrentIndex(currentIndex + 1);
        }
    };

    useEffect(() => {
        const handleKeyDown = (event) => {

            if (document.activeElement !== editorRef.current) return;

            if (event.ctrlKey || event.metaKey) {
                if (event.key === 'Z') {
                    event.preventDefault();
                    handleUndo();
                } else if (event.key === 'Y') {
                    event.preventDefault();
                    handleRedo();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div className='w-full'>
            <div
                ref={editorRef}
                contentEditable={true}
                onInput={handleChange}
                className="min-h-64 p-4 dark:text-slate-300 dark:border-slate-600 cursor-text border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
        </div>
    );
}

export default RedoUndoUsingKeyboardShortcut;