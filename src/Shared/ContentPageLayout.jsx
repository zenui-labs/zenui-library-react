import React, {useContext} from 'react';

import MobileSidebar from "../Components/Overview/Sidebar/MobileSidebar.jsx";
import Navbar from "../Components/Home/Navbar.jsx";
import MobileNavbar from "../Components/Home/MobileNavbar.jsx";
import Sidebar from "../Components/Overview/Sidebar/index.jsx";
import {MenuContext} from "../Context/MenuContext.jsx";
import useZenuiStore from "../Store/Index.js";
import NewsBoard from "../Components/Home/NewsBoard.jsx";

const ContentPageLayout = ({children}) => {
    const {scrollY} = useContext(MenuContext);

    const {theme} = useZenuiStore();

    return (
        <div className=''>
            <Navbar/>
            <MobileNavbar/>
            <div className="flex w-full mx-auto max-w-[1700px]">
                <div className="1024px:w-[32%] 1260px:w-[28%] relative 1404px:w-[19%] 2000px:w-[18%] 1024px:mr-[3rem]">
                    <div
                        className={`bg-gradient-to-b dark:from-darkBgColor dark:to-darkBgColor/20 from-white to-white/20 z-30 absolute top-0 left-0 w-full h-[80px] transition-opacity duration-300
                            ${scrollY > 0 ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                    />
                    <Sidebar/>
                </div>

                <div
                    className="w-full h-[calc(100vh-76px)] overflow-y-auto pb-[2rem] pt-[5rem] 640px:py-[5rem] 1024px:py-[2rem] 1024px:px-[0.5rem] relative"
                    style={{scrollbarWidth: 'none'}}>
                    <MobileSidebar/>
                    {children}
                </div>
            </div>

            <div
                className={`
                    fixed bottom-0 right-0 z-[-1]
                    w-[230vmax] h-[230vmax]
                    translate-x-1/2 translate-y-1/2
                    rounded-full bg-darkBgColor
                    transition-transform duration-1000 ease-in-out
                    ${theme == 'dark' ? 'scale-100' : 'scale-0'}
                `}
            />
        </div>
    );
};

export default ContentPageLayout;
