/** Removes Tailwind `dark:` classes from a code string when the visitor copies without them. */
const toggleThemeBaseClasses = (classString: string, isDark: boolean): string => {
    if (isDark) return classString;

    return classString.replace(/\s+dark:[^\s"]+/g, '');
};

export default toggleThemeBaseClasses;
