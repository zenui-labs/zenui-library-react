import {useEffect, useState} from "react";

import {CiMenuFries} from "react-icons/ci";
import Content from "./Content.jsx";

const MobileSidebar = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        const handleClick = (event) => {
            if (!event.target.closest('.mobileSidebar') && !event.target.closest('.mobilesidebarIcon')) {
                setSidebarOpen(false)
            }
        };

        document.addEventListener('click', handleClick);
        return () => {
            document.removeEventListener('click', handleClick);
        };
    }, [])

    return (
        <>
            <div
                className='w-full 1024px:hidden bg-border py-3 sticky top-0 px-6 640px:px-10 dark:bg-slate-800 640px:pr-7 z-30'>
                <CiMenuFries
                    className='text-[1.7rem] dark:text-darkTextColor rotate-[180deg] text-text mobilesidebarIcon'
                    onClick={() => setSidebarOpen(true)}/>
            </div>
            <aside
                className={` ${sidebarOpen ? 'translate-x-0 opacity-100 z-40' : 'translate-x-[-200px] opacity-0 z-[-1]'} py-6 px-6 640px:px-10 dark:bg-slate-900 border-r h-[100vh] border-border flex-col gap-4 overflow-y-scroll fixed top-0 left-0 w-[80%] 640px:w-[340px] bg-secondary z-50 flex mobileSidebar transition-all duration-500`}>
                <Content/>
            </aside>
        </>
    );
};

export default MobileSidebar;
