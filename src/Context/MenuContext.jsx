import {createContext, useState} from "react";
import PropTypes from "prop-types";

const MenuContext = createContext({
    scrollY: 0,
    setScrollY: () => {
    },
});

const MenuProvider = ({children}) => {
    const [scrollY, setScrollY] = useState(0);
    return <MenuContext.Provider value={{
        scrollY,
        setScrollY
    }}>{children}</MenuContext.Provider>;
};
MenuProvider.propTypes = {
    children: PropTypes.node,
}

export {MenuProvider, MenuContext};