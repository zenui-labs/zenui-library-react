import {createContext, useState, type Dispatch, type ReactNode, type SetStateAction} from "react";

interface MenuContextValue {
    scrollY: number;
    setScrollY: Dispatch<SetStateAction<number>>;
}

// Keeps the docs sidebar scroll position while pages change.
const MenuContext = createContext<MenuContextValue>({
    scrollY: 0,
    setScrollY: () => {},
});

const MenuProvider = ({children}: {children: ReactNode}) => {
    const [scrollY, setScrollY] = useState(0);
    return <MenuContext.Provider value={{scrollY, setScrollY}}>{children}</MenuContext.Provider>;
};

export {MenuProvider, MenuContext};
