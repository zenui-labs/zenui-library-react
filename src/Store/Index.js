import {create} from 'zustand'

const useZenuiStore = create((set) => ({
    withDarkClasses: true,
    handleToggle: () => set((state) => ({withDarkClasses: !state.withDarkClasses})),
    theme: localStorage.getItem('zenuiTheme') || 'light',
    toggleTheme: () => set((state) => {
        const newTheme = state.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('zenuiTheme', newTheme);
        return {theme: newTheme};
    }),
}))

export default useZenuiStore;