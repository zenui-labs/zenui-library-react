import {useCallback, useEffect, useRef, useState} from 'react';
import {AnimatePresence, motion} from "framer-motion";
import {LuCode2, LuKeyboard, LuListChecks, LuLoader2, LuRotateCcw} from "react-icons/lu";

import CodesSidebar, {KeyCap} from "./CodesSidebar.tsx";
import ShortcutCheatsheetModal from "./ShortcutCheatsheetModal.tsx";

const VALID_MODIFIERS = ['ctrl', 'alt', 'shift', 'meta'];
const VALID_KEYS = [
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
    'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'arrowup', 'arrowdown', 'arrowleft', 'arrowright',
    'enter', 'backspace', 'space', 'tab', 'escape'
];

const EASE = [0.16, 1, 0.3, 1];

const Generator = () => {
    const [shortcut, setShortcut] = useState('')
    const [detectedKeys, setDetectedKeys] = useState([])
    const [generatedCode, setGeneratedCode] = useState('')
    const [generatedKeys, setGeneratedKeys] = useState([])
    const [isGenerating, setIsGenerating] = useState(false)
    const [inputError, setInputError] = useState('');
    const [cheatsheetOpen, setCheatsheetOpen] = useState(false);
    const outputRef = useRef(null);

    const handleKeyDown = useCallback((event) => {
        // Keys pressed while the cheatsheet is open belong to the dialog (Escape closes it).
        if (cheatsheetOpen) return;

        // Only prevent default and detect keys if input is not focused
        if (document.activeElement.tagName !== 'INPUT') {
            const key = event.key.toLowerCase();

            // Normalize modifier keys
            const normalizedKey = key === 'control' ? 'ctrl' :
                key === 'meta' ? (navigator.platform.indexOf('Mac') > -1 ? 'cmd' : 'meta') :
                    key;

            // Let Tab and Enter keep working on a focused button or link so the page stays keyboard friendly.
            const onControl = ['BUTTON', 'A'].includes(document.activeElement.tagName);
            if (onControl && (normalizedKey === 'tab' || normalizedKey === 'enter') &&
                !event.ctrlKey && !event.altKey && !event.metaKey) {
                return;
            }

            // Validate detected key
            if ((VALID_MODIFIERS.includes(normalizedKey) || VALID_KEYS.includes(normalizedKey)) &&
                !detectedKeys.includes(normalizedKey)) {
                event.preventDefault();
                setDetectedKeys(prev => [...prev, normalizedKey]);
            }
        }
    }, [detectedKeys, cheatsheetOpen])

    const validateShortcut = (input) => {
        const keys = input.toLowerCase().split('+').map(k => k.trim());
        const invalidKeys = keys.filter(key =>
            !VALID_MODIFIERS.includes(key) && !VALID_KEYS.includes(key)
        );

        if (invalidKeys.length > 0) {
            setInputError(`Not supported: ${invalidKeys.map(k => k || '(empty)').join(', ')}. Check the list of supported keys.`);
            return false;
        }
        setInputError('');
        return true;
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [handleKeyDown])

    const generateCode = () => {
        if (!detectedKeys.length && !shortcut) {
            setInputError('Press a few keys or type a shortcut first.');
            return;
        }

        const keys = (shortcut || detectedKeys.join(' + ')).toLowerCase().split('+').map(k => k.trim());

        if (!validateShortcut(shortcut || detectedKeys.join(' + '))) {
            return;
        }

        setGeneratedCode('')
        setGeneratedKeys(keys)
        setIsGenerating(true)

        // On narrow screens the result sits below the form, so bring it into view.
        if (window.matchMedia('(max-width: 1023px)').matches) {
            requestAnimationFrame(() => outputRef.current?.scrollIntoView({behavior: 'smooth', block: 'start'}));
        }

        const functionName = `handle${keys.map(k => k.charAt(0).toUpperCase() + k.slice(1)).join('')}Shortcut`;

        const keyConditions = keys.map(key => {
            if (key === 'ctrl') return 'event.ctrlKey';
            if (key === 'alt') return 'event.altKey';
            if (key === 'shift') return 'event.shiftKey';
            if (key === 'meta' || key === 'cmd') return 'event.metaKey';
            return `event.key.toLowerCase() === '${key}'`;
        }).join(' && ');

        const code = `
/**
 * Handles the ${keys.join('+')} keyboard shortcut.
 * @param {KeyboardEvent} event - The keyboard event object.
 */
function ${functionName}(event) {
  if (${keyConditions}) {
    event.preventDefault();
    // Your custom logic here
    console.log('${keys.join('+')} shortcut detected!');
  }
}

// Add this event listener to your desired scope (e.g., window or a specific element)
document.addEventListener('keydown', ${functionName});

// To remove the event listener when it's no longer needed:
document.removeEventListener('keydown', ${functionName});
    `.trim();

        setTimeout(() => {
            setGeneratedCode(code);
            setIsGenerating(false);
        }, 2500);
    };

    return (
        <>
            <div className="grid gap-5 1024px:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] 1024px:gap-6">
                <section aria-label="Shortcut" className="panel p-5 shadow-card 640px:p-6">
                    {/* Key capture */}
                    <div className="flex items-center justify-between gap-3">
                        <h2 className="text-[0.95rem] font-semibold tracking-heading text-ink">Press the keys</h2>
                        {detectedKeys.length > 0 && (
                            <button
                                type="button"
                                onClick={() => setDetectedKeys([])}
                                className="btn-ghost h-8 gap-1.5 px-2.5 text-[0.8rem]"
                            >
                                <LuRotateCcw className="size-3.5"/>
                                Clear
                            </button>
                        )}
                    </div>
                    <p className="mt-1 text-[0.85rem] leading-relaxed text-ink-muted">
                        Keys are recorded in the order you press them, as long as the cursor is not in the text
                        field below.
                    </p>

                    <div
                        aria-live="polite"
                        className="mt-4 flex min-h-[132px] flex-wrap items-center justify-center gap-2 rounded-[12px] border border-dashed border-hairline-strong bg-raised/50 p-4"
                    >
                        {detectedKeys.length > 0 ? (
                            <AnimatePresence initial={false}>
                                {detectedKeys.map((key, index) => (
                                    <motion.span
                                        key={key}
                                        className="flex items-center gap-2"
                                        initial={{opacity: 0, scale: 0.9, y: 4}}
                                        animate={{opacity: 1, scale: 1, y: 0}}
                                        transition={{duration: 0.25, ease: EASE}}
                                    >
                                        {index > 0 && <span aria-hidden="true" className="text-ink-subtle">+</span>}
                                        <KeyCap size="lg">{key}</KeyCap>
                                    </motion.span>
                                ))}
                            </AnimatePresence>
                        ) : (
                            <span className="flex items-center gap-2 text-[0.9rem] text-ink-subtle">
                                <LuKeyboard className="size-4"/>
                                Waiting for keys
                            </span>
                        )}
                    </div>

                    {/* Divider */}
                    <div className="my-6 flex items-center gap-3 text-[0.8rem] text-ink-subtle">
                        <span className="h-px flex-1 bg-hairline"/>
                        or
                        <span className="h-px flex-1 bg-hairline"/>
                    </div>

                    {/* Manual input */}
                    <label htmlFor="manual-input" className="text-[0.95rem] font-semibold tracking-heading text-ink">
                        Type a shortcut
                    </label>
                    <input
                        id="manual-input"
                        type="text"
                        value={shortcut}
                        autoComplete="off"
                        spellCheck={false}
                        aria-invalid={Boolean(inputError)}
                        aria-describedby={inputError ? "shortcut-error" : "shortcut-hint"}
                        onChange={(e) => {
                            setShortcut(e.target.value);
                            setInputError('');
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') generateCode();
                        }}
                        placeholder="ctrl + shift + k"
                        className="mt-2 h-11 w-full rounded-[10px] border border-hairline-strong bg-surface px-3.5 font-mono text-[0.9rem] text-ink outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-ink-subtle focus:border-accent focus:ring-2 focus:ring-accent/20 focus-visible:outline-none aria-[invalid=true]:border-red-500"
                    />
                    {inputError ? (
                        <p id="shortcut-error" role="alert" className="mt-2 text-[0.83rem] text-red-600 dark:text-red-400">
                            {inputError}
                        </p>
                    ) : (
                        <p id="shortcut-hint" className="mt-2 text-[0.83rem] text-ink-subtle">
                            Separate keys with +. If you fill in both, the typed shortcut is used.
                        </p>
                    )}

                    {/* Actions */}
                    <div className="mt-6 flex flex-wrap items-center gap-2.5">
                        <button
                            type="button"
                            onClick={generateCode}
                            disabled={isGenerating}
                            aria-busy={isGenerating}
                            className="btn-accent"
                        >
                            {isGenerating ? <LuLoader2 className="size-4 animate-spin"/> : <LuCode2 className="size-4"/>}
                            {isGenerating ? 'Generating' : 'Generate code'}
                        </button>

                        <button type="button" onClick={() => setCheatsheetOpen(true)} className="btn-ghost">
                            <LuListChecks className="size-4 text-ink-muted"/>
                            Supported keys
                        </button>
                    </div>
                </section>

                <div ref={outputRef} className="flex scroll-mt-24 flex-col">
                    <CodesSidebar codes={generatedCode} isGenerating={isGenerating} keys={generatedKeys}/>
                </div>
            </div>

            <ShortcutCheatsheetModal isOpen={cheatsheetOpen} setIsOpen={setCheatsheetOpen} VALID_KEYS={VALID_KEYS}
                                     VALID_MODIFIERS={VALID_MODIFIERS}/>
        </>
    );
};

export default Generator;
