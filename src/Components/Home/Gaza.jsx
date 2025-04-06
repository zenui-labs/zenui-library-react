import React from 'react';

const Gaza = () => {
    return (
        <main className='fixed bg-gradient-to-r from-[#e9e9e9] to-[#E2E2E2] flex items-center justify-center top-0 left-0 w-full h-screen z-[10000000000000000]'>
            <img src='/strike_banner.svg' alt='banner' className='w-[80%] z-40 opacity-[90%] 425px:w-[50%] 1024px:w-[30%]'/>

            <h1 className='text-[2.2rem] 1024px:text-[7rem] font-bold absolute top-12 1024px:top-0'>If You're From Israel</h1>
            <h1 className='text-[2.2rem] 1024px:text-[7rem] font-bold absolute bottom-12 1024px:bottom-0'>Don't Use ZenUI</h1>
        </main>
    );
};

export default Gaza;
