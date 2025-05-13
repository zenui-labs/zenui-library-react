import React from 'react';

// store
import useZenuiStore from "../Store/Index.js";

const AnimatedDarkBg = () => {

    const {theme} = useZenuiStore();

    return (
        <div
            className={`
                    fixed bottom-0 right-0 z-[-1]
                    w-[300vmax] h-[300vmax]
                    translate-x-1/2 translate-y-1/2
                    rounded-full bg-darkBgColor
                    transition-transform duration-[1100ms] ease-in-out
                    ${theme == 'dark' ? 'scale-100' : 'scale-0'}
                `}
        />
    );
};

export default AnimatedDarkBg;