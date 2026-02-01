import React, {useEffect} from 'react';

const DrawerTop = () => {
    const [openDrawer, setOpenDrawer] = React.useState(false);

    useEffect(() => {
        // to click ESC key off the drawer
        const handleKeydown = (event) => {
            event.preventDefault();

            if (event.key === "Escape") {
                setOpenDrawer(false);
            }
        }

        // handle outside click to close drawer
        const handleClickOutside = (e) => {
            if (
                !e.target.closest(".zenui_drawer_btn") &&
                !e.target.closest(".zenui_drawer")
            ) {
                setOpenDrawer(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        document.addEventListener("keydown", handleKeydown);
        return () => {
            document.removeEventListener("click", handleClickOutside);
            document.removeEventListener("keydown", handleClickOutside);
        };
    }, []);

    return (
        <>
            <div className='w-full flex items-center justify-center'>
                <button
                    className='px-4 py-2 zenui_drawer_btn bg-primary text-secondary rounded-md'
                    onClick={() => setOpenDrawer(true)}
                >
                    Open Drawer
                </button>
            </div>
            <div
                className={`${
                    openDrawer ? ' visible' : ' invisible'
                } w-full h-screen fixed top-0 left-0 z-[200000000] dark:bg-black/40 transition-all duration-300`}
            >
                <div
                    className={`${
                        openDrawer
                            ? ' translate-y-[0px] opacity-100'
                            : ' translate-y-[-200px] opacity-0'
                    } w-full dark:bg-slate-800 bg-secondary zenui_drawer transition-all shadow-[0px_0px_20px_0px_rgb(0,0,0,0.2)] duration-300 mx-auto`}
                >
                    <div
                        className='flex 640px::flex-row flex-col justify-between w-full gap-5 px-8 py-12'>
                        <p className='text-base md:text-[1.2rem] dark:text-[#abc2d3] text-text w-full 640px:w-[70%]'>
                            This site uses cookies and related technologies, as
                            described in our privacy policy, for purposes that may
                            include site operation, analytics, enhanced user
                            experience, or advertising. You may choose to consent to
                            our use of these technologies, or manage your own
                            preferences.
                        </p>

                        <div
                            className='flex items-end justify-end gap-4 flex-col 1024px:flex-row w-full 640px:w-[20%]'>
                            <button
                                className='py-2 w-full px-4 dark:border-slate-800 border border-[#d1d1d1] rounded-md outline-none bg-primary text-[#fff]'
                                onClick={() => setOpenDrawer(false)}
                            >
                                Accept
                            </button>
                            <button
                                className='py-2 w-full dark:border-slate-700 dark:text-[#abc2d3] dark:hover:bg-slate-900/50 hover:bg-gray-100 px-4 border border-[#d1d1d1] rounded-md outline-none text-[#353535]'
                                onClick={() => setOpenDrawer(false)}
                            >
                                Decline
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DrawerTop;