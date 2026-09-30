import {create} from 'zustand'
import {circularReveal} from "@/Helpers/viewTransition.ts";
import {embedPattern, embedTheme, isEmbed} from "@/Helpers/embed.ts";

const THEME_KEY = 'zenuiTheme';

export type Theme = 'light' | 'dark';
export type CodeLanguage = 'ts' | 'js';
export type PreviewPattern = 'dots' | 'grid' | 'plain';

interface ZenuiState {
    withDarkClasses: boolean;
    handleToggle: () => void;
    searchOpen: boolean;
    setSearchOpen: (open: boolean) => void;
    shortcutsOpen: boolean;
    setShortcutsOpen: (open: boolean) => void;
    previewPattern: PreviewPattern;
    setPreviewPattern: (pattern: PreviewPattern) => void;
    codeLanguage: CodeLanguage;
    setCodeLanguage: (language: CodeLanguage) => void;
    theme: Theme;
    toggleTheme: (event?: {clientX?: number; clientY?: number}) => void;
}

const readStorage = <T extends string>(key: string, allowed: readonly T[], fallback: T): T => {
    try {
        const value = localStorage.getItem(key) as T | null;
        if (value && allowed.includes(value)) return value;
    } catch { /* storage blocked */ }
    return fallback;
};

const writeStorage = (key: string, value: string) => {
    try {
        localStorage.setItem(key, value);
    } catch { /* storage blocked */ }
};

// Dark is the default until the visitor picks a theme.
const initialTheme = (): Theme => embedTheme ?? readStorage<Theme>(THEME_KEY, ['light', 'dark'], 'dark');

const applyTheme = (theme: Theme) => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    // A preview opened in embed mode must not change the visitor's saved theme.
    if (!isEmbed) writeStorage(THEME_KEY, theme);
};

const useZenuiStore = create<ZenuiState>()((set, get) => ({
    // Copy code with or without `dark:` classes
    withDarkClasses: true,
    handleToggle: () => set((state) => ({withDarkClasses: !state.withDarkClasses})),

    // Command palette and keyboard shortcut sheet
    searchOpen: false,
    setSearchOpen: (searchOpen) => set({searchOpen}),
    shortcutsOpen: false,
    setShortcutsOpen: (shortcutsOpen) => set({shortcutsOpen}),

    // Background pattern behind component previews, shared by every preview frame.
    previewPattern: embedPattern ?? readStorage<PreviewPattern>('zenuiPreviewPattern', ['dots', 'grid', 'plain'], 'plain'),
    setPreviewPattern: (previewPattern) => {
        writeStorage('zenuiPreviewPattern', previewPattern);
        set({previewPattern});
    },

    // Language used for code examples; JavaScript is generated from the TypeScript source.
    codeLanguage: readStorage<CodeLanguage>('zenuiCodeLanguage', ['ts', 'js'], 'ts'),
    setCodeLanguage: (codeLanguage) => {
        writeStorage('zenuiCodeLanguage', codeLanguage);
        set({codeLanguage});
    },

    theme: initialTheme(),

    // Pass the click event to grow the reveal from the pointer.
    toggleTheme: (event) => {
        const next: Theme = get().theme === 'light' ? 'dark' : 'light';
        circularReveal(() => {
            applyTheme(next);
            set({theme: next});
        }, {x: event?.clientX, y: event?.clientY});
    },
}))

applyTheme(useZenuiStore.getState().theme);

export default useZenuiStore;
