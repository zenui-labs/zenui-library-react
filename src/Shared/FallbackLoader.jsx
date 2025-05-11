import React from 'react';
import useZenuiStore from "@store";

const FallbackLoader = () => {

    const {theme} = useZenuiStore()

    return (
        <div
            className={`${theme === 'dark' ? 'bg-slate-900' : 'bg-white'} fixed z-[1000000000000000] w-full h-screen flex items-center justify-center`}>
            <img src='/logo.png' alt='zenui-logo' className='w-[130px] scale-animate'/>
        </div>
    );
};

export default FallbackLoader;
