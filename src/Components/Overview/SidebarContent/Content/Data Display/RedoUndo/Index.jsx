import React, {useState} from "react";

// react helmet
import {Helmet} from "react-helmet";

// components
import OverviewFooter from "@shared/OverviewFooter";
import ContentHeader from "@shared/ContentHeader";
import Showcode from "@shared/Component/ShowCode.jsx";

// scrollspy
import {redoUndoContents} from "@utils/ContentsConfig/DataDisplayContents.js";
import {useScrollSpy} from "@/CustomHooks/useScrollSpy.js";

import ComponentDescription from "@shared/Component/ComponentDescription.jsx";
import ToggleTab from "@shared/Component/ToggleTab.jsx";
import ComponentWrapper from "@shared/Component/ComponentWrapper.jsx";
import ContentNavbar from "@shared/Component/ContentNavbar.jsx";
import RedoUndoUsingButton from "./RedoUndoUsingButton.jsx";
import RedoUndoUsingKeyboardShortcut from "./RedoUndoUsingKeyboardShortcut.jsx";
import RedoUndoUsingButtonAndKeyboardShortcut from "./RedoUndoUsingButtonAndKeyboardShortcut.jsx";

const RedoUndo = () => {

    const sectionIds = redoUndoContents.map((item) => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    const [usingButtonPreview, setUsingButtonPreview] = useState(true);
    const [usingButtonCode, setUsingButtonCode] = useState(false);

    const [usingKeyboardShortcutPreview, setUsingKeyboardShortcutPreview] = useState(true);
    const [usingKeyboardShortcutCode, setUsingKeyboardShortcutCode] = useState(false);

    const [usingShortcutAndButtonPreview, setUsingShortcutAndButtonPreview] = useState(true);
    const [usingShortcutAndButtonCode, setUsingShortcutAndButtonCode] = useState(false);

    return (
        <>
            <aside className="flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10">
                <div>
                    <ContentHeader text={"Redo Undo using button"} id={"redo-undo-using-button"}/>

                    <ComponentDescription
                        text="Undo and redo actions can be performed using dedicated buttons in the UI."/>

                    <ToggleTab code={usingButtonCode} preview={usingButtonPreview} setPreview={setUsingButtonPreview}
                               setCode={setUsingButtonCode}/>

                    <ComponentWrapper>
                        {usingButtonPreview && (
                            <div className="p-8 flex items-center flex-col gap-5 justify-center">
                                <RedoUndoUsingButton/>
                            </div>
                        )}

                        {usingButtonCode && (
                            <Showcode
                                code='
import {useState, useRef, useEffect} from "react";

// react icons
import {LuRedo2, LuUndo2} from "react-icons/lu";

function RedoUndoUsingButton() {
    const MAX_HISTORY_LENGTH = 30;
    const SAVE_DELAY = 800;

    const editorRef = useRef(null);
    const [history, setHistory] = useState(["Start typing here..."]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isUndoRedo, setIsUndoRedo] = useState(false);
    const timerRef = useRef(null);
    const lastContentRef = useRef("Start typing here...");

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
                    console.log("Selection error handled");
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

    return (
        <div className="w-full">
            <div className="flex gap-2 mb-4">
                <button
                    onClick={handleUndo}
                    disabled={currentIndex <= 0}
                    className={`px-3 py-2 rounded ${
                        currentIndex <= 0
                            ? "bg-gray-200 text-gray-500 dark:bg-slate-700 cursor-not-allowed"
                            : "bg-[#3B9DF8] text-white hover:bg-blue-600"
                    }`}
                >
                    <LuUndo2/>
                </button>

                <button
                    onClick={handleRedo}
                    disabled={currentIndex >= history.length - 1}
                    className={`px-3 py-2 rounded ${
                        currentIndex >= history.length - 1
                            ? "bg-gray-200 text-gray-500 dark:bg-slate-700 cursor-not-allowed"
                            : "bg-[#3B9DF8] text-white hover:bg-blue-600"
                    }`}
                >
                    <LuRedo2 />
                </button>
            </div>

            <div
                ref={editorRef}
                contentEditable={true}
                onInput={handleChange}
                className="w-full p-4 cursor-text border dark:text-slate-300 dark:border-slate-600 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B9DF8] focus:border-transparent"
            />

        </div>
    );
}

export default RedoUndoUsingButton;'
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader text={"Redo Undo using keyboard shortcut"}
                                       id={"redo-undo-using-keyboard-shortcut"}/>
                    </div>

                    <ComponentDescription text='Supports undo and redo using keyboard shortcuts: Ctrl+Z and Ctrl+Y'/>

                    <ToggleTab code={usingKeyboardShortcutCode} preview={usingKeyboardShortcutPreview}
                               setCode={setUsingKeyboardShortcutCode} setPreview={setUsingKeyboardShortcutPreview}/>

                    <ComponentWrapper>
                        {usingKeyboardShortcutPreview && (
                            <div className="p-8 flex items-center flex-col gap-5 justify-center">
                                <RedoUndoUsingKeyboardShortcut/>
                            </div>
                        )}

                        {usingKeyboardShortcutCode && (
                            <Showcode
                                code='
import {useState, useRef, useEffect} from "react";

function RedoUndoUsingKeyboardShortcut() {
    const MAX_HISTORY_LENGTH = 30;
    const SAVE_DELAY = 800;

    const editorRef = useRef(null);
    const [history, setHistory] = useState(["Start typing here..."]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isUndoRedo, setIsUndoRedo] = useState(false);
    const timerRef = useRef(null);
    const lastContentRef = useRef("Start typing here...");

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
                    console.log("Selection error handled");
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
            if (event.ctrlKey || event.metaKey) {
                if (event.key === "Z") {
                    event.preventDefault();
                    handleUndo();
                } else if (event.key === "Y") {
                    event.preventDefault();
                    handleRedo();
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    return (
        <div className="w-full">
            <div
                ref={editorRef}
                contentEditable={true}
                onInput={handleChange}
                className="min-h-64 p-4 cursor-text border dark:text-slate-300 dark:border-slate-600 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B9DF8] focus:border-transparent"
            />
        </div>
    );
}

export default RedoUndoUsingKeyboardShortcut;'
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader text={"redo undo using button and keyboard shortcut"}
                                       id={"redo-undo-using-button-and-keyboard-shortcut"}/>
                    </div>

                    <ComponentDescription
                        text='Undo and redo features are available using buttons and keyboard shortcuts for easier editing.'/>

                    <ToggleTab code={usingShortcutAndButtonCode} preview={usingShortcutAndButtonPreview}
                               setCode={setUsingShortcutAndButtonCode} setPreview={setUsingShortcutAndButtonPreview}/>

                    <ComponentWrapper>
                        {usingShortcutAndButtonPreview && (
                            <div className="p-8 flex items-center flex-col gap-5 justify-center">
                                <RedoUndoUsingButtonAndKeyboardShortcut/>
                            </div>
                        )}

                        {usingShortcutAndButtonCode && (
                            <Showcode
                                code='
import {useState, useRef, useEffect} from "react";

// react icons
import {LuRedo2, LuUndo2} from "react-icons/lu";

function RedoUndoUsingButtonAndKeyboard() {
    const MAX_HISTORY_LENGTH = 30;
    const SAVE_DELAY = 800;

    const editorRef = useRef(null);
    const [history, setHistory] = useState(["Start typing here..."]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isUndoRedo, setIsUndoRedo] = useState(false);
    const timerRef = useRef(null);
    const lastContentRef = useRef("Start typing here...");

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
                    console.log("Selection error handled");
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
            if (event.ctrlKey || event.metaKey) {
                if (event.key === "Z") {
                    event.preventDefault();
                    handleUndo();
                } else if (event.key === "Y") {
                    event.preventDefault();
                    handleRedo();
                }
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, []);


    return (
        <div className="w-full">
            <div className="flex gap-2 mb-4">
                <button
                    onClick={handleUndo}
                    disabled={currentIndex <= 0}
                    className={`px-3 py-2 rounded ${
                        currentIndex <= 0
                            ? "bg-gray-200 text-gray-500 dark:bg-slate-700 cursor-not-allowed"
                            : "bg-[#3B9DF8] text-white hover:bg-blue-600"
                    }`}
                >
                    <LuUndo2/>
                </button>

                <button
                    onClick={handleRedo}
                    disabled={currentIndex >= history.length - 1}
                    className={`px-3 py-2 rounded ${
                        currentIndex >= history.length - 1
                            ? "bg-gray-200 text-gray-500 dark:bg-slate-700 cursor-not-allowed"
                            : "bg-[#3B9DF8] text-white hover:bg-blue-600"
                    }`}
                >
                    <LuRedo2 />
                </button>
            </div>

            <div
                ref={editorRef}
                contentEditable={true}
                onInput={handleChange}
                className="min-h-64 p-4 cursor-text border dark:text-slate-300 dark:border-slate-600 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3B9DF8] focus:border-transparent"
            />

        </div>
    );
}

export default RedoUndoUsingButtonAndKeyboard;'
                            />
                        )}
                    </ComponentWrapper>

                    <OverviewFooter backName='table' backUrl='/components/table'
                                    forwardUrl='/components/github-activity-graph'
                                    forwardName='github activity graph'/>
                </div>


                <ContentNavbar contents={redoUndoContents} activeSection={activeSection}/>

            </aside>
            <Helmet>
                <title>Data Display - Redo & Undo</title>
            </Helmet>
        </>
    );
};

export default RedoUndo;
