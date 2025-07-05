import React, {useEffect, useState} from 'react';
import {RxCross1} from "react-icons/rx";

const DrawerRight = () => {
    const [openDrawer, setOpenDrawer] = useState(false);

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
            <button
                className='px-4 py-2 zenui_drawer_btn bg-primary text-secondary rounded-md'
                onClick={() => setOpenDrawer(true)}
            >
                Open Drawer
            </button>

            <div
                className={`${
                    openDrawer ? ' visible' : ' invisible'
                } w-full h-screen fixed bg-[rgb(0,0,0,0.2)] top-0 left-0 z-[200000000] dark:bg-black/40 transition-all duration-300`}
            >
                <div
                    className={`${
                        openDrawer
                            ? ' translate-x-[0px] opacity-100'
                            : ' translate-x-[200px] opacity-0'
                    } overflow-y-scroll zenui_drawer w-full 640px:w-[80%] 1024px:w-[40%]  dark:bg-slate-800 h-screen bg-[#eceef6] transition-all duration-300 float-right`}
                >
                    <div className='w-full flex items-end p-4 justify-end'>
                        <RxCross1
                            className='p-2 w-fit dark:text-slate-400 dark:hover:bg-slate-900/50 text-[2.5rem] hover:bg-[#e7e7e7] rounded-full transition-all duration-300 cursor-pointer'
                            onClick={() => setOpenDrawer(false)}
                        />
                    </div>

                    <div
                        className='flex items-start flex-col p-6 640px:p-12 justify-between gap-8'>
                        <div
                            className='bg-[#fff] dark:bg-slate-900 min-h-screen rounded-md p-6 w-full'>
                            {/* steps */}
                            <div
                                className='flex items-center 1024px:flex-row flex-col justify-between w-full border-b border-[#d1d1d1] dark:border-slate-700 flex-wrap gap-y-6'>
                                <div className='flex items-center gap-5'>
                              <span className='text-[1rem] font-[500] text-primary border-b border-primary pb-3'>
                                1.Cart
                              </span>
                                    <span
                                        className='text-[1rem] dark:text-[#abc2d3] font-[500] text-text pb-3'>
                                2. Shipping & Payment
                              </span>
                                    <span
                                        className='text-[1rem] dark:text-[#abc2d3] font-[500] text-text pb-3'>
                                3. Confirmation
                              </span>
                                </div>

                                <a
                                    href='#'
                                    className='underline text-primary font-[500] pb-3'
                                >
                                    Why is subscribing better?
                                </a>
                            </div>

                            {/* products */}
                            <div
                                className='mt-12 flex items-start dark:border-slate-700 border-b border-[#d1d1d1] pb-6 justify-between w-full'>
                                <div className='flex items-start gap-5'>
                                    <img
                                        src='https://img.freepik.com/free-photo/still-life-skincare-products_23-2149371284.jpg?t=st=1711125399~exp=1711128999~hmac=012d9b565ec8c14efb41ddb92d6adaa9a7902802e6c884a3051fb6d449837afe&w=740'
                                        alt='Still life of skincare products'
                                        className='w-[90px] h-[60px] object-cover rounded-md'
                                    />

                                    <div className=''>
                                        <h2 className='text-[1.2rem] font-[600] text-primary'>
                                            Still life of skincare products
                                        </h2>
                                        <p className='text-[1rem] dark:text-slate-400 font-[500] text-text'>
                                            25 items
                                        </p>
                                    </div>
                                </div>

                                <div className='flex items-center gap-12'>
                                    <h3 className='text-[1.2rem] font-[600] dark:text-slate-400 text-[#6d6d6d]'>
                                        $32{' '}
                                        <span className='text-primary pl-1'>$12</span>
                                    </h3>

                                    <RxCross1 className='text-[#6d6d6d] dark:text-slate-400'/>
                                </div>
                            </div>
                            <div
                                className='mt-12 flex items-start dark:border-slate-700 border-b border-[#d1d1d1] pb-6 justify-between w-full'>
                                <div className='flex items-start gap-5'>
                                    <img
                                        src='https://img.freepik.com/free-photo/levitating-music-headphones-display_23-2149817605.jpg?t=st=1711125916~exp=1711129516~hmac=26762a7dd8eb383d3eccccb2cc232b163699fd9bf408804d4ad09f8ea127f639&w=740'
                                        alt='Levitating music headphones display'
                                        className='w-[90px] h-[60px] object-cover rounded-md'
                                    />

                                    <div className=''>
                                        <h2 className='text-[1.2rem] font-[600] text-primary'>
                                            Still life of skincare products
                                        </h2>
                                        <p className='text-[1rem] dark:text-slate-400 font-[500] text-text'>
                                            8 items
                                        </p>
                                    </div>
                                </div>

                                <div className='flex items-center gap-12'>
                                    <h3 className='text-[1.2rem] font-[600] dark:text-slate-400 text-[#6d6d6d]'>
                                        $32{' '}
                                        <span className='text-primary pl-1'>$12</span>
                                    </h3>

                                    <RxCross1 className='text-[#6d6d6d] dark:text-slate-400'/>
                                </div>
                            </div>
                            <div
                                className='mt-12 flex items-start dark:border-slate-700 border-b border-[#d1d1d1] pb-6 justify-between w-full'>
                                <div className='flex items-start gap-5'>
                                    <img
                                        src='https://img.freepik.com/free-vector/set-aloe-vera-cosmetic-products_23-2147638007.jpg?t=st=1711125950~exp=1711129550~hmac=cdcb71b9735c22a4a1f74488397d71d0d32e20fed7c2ca003d8396db00961620&w=740'
                                        alt='Set of aloe vera cosmetic products'
                                        className='w-[90px] h-[60px] object-cover rounded-md'
                                    />

                                    <div className=''>
                                        <h2 className='text-[1.2rem] font-[600] text-primary'>
                                            Still life of skincare products
                                        </h2>
                                        <p className='text-[1rem] dark:text-slate-400 font-[500] text-text'>
                                            2 items
                                        </p>
                                    </div>
                                </div>

                                <div className='flex items-center gap-12'>
                                    <h3 className='text-[1.2rem] font-[600] dark:text-slate-400 text-[#6d6d6d]'>
                                        $32{' '}
                                        <span className='text-primary pl-1'>$12</span>
                                    </h3>

                                    <RxCross1 className='text-[#6d6d6d] dark:text-slate-400'/>
                                </div>
                            </div>
                        </div>

                        <div className='w-full mr-8'>
                            <div className='bg-[#fff] dark:bg-slate-900 rounded-md p-6 '>
                                <h3 className='text-[1rem] text-primary dark:border-slate-700 font-[500] border-b border-[#d1d1d1] pb-4 text-center'>
                                    Order Summary
                                </h3>

                                <div className='flex flex-col gap-5 mt-4'>
                                    <div className='flex items-center justify-between w-full'>
                                        <h4 className='text-[1rem] font-[500] text-primary'>
                                            Item Total
                                        </h4>
                                        <span
                                            className='text-text dark:text-[#abc2d3] font-[500]'>
                                  $180.00
                                </span>
                                    </div>

                                    <div className='flex items-center justify-between w-full'>
                                        <h4 className='text-[1rem] font-[500] text-primary'>
                                            Subcription savings (15% off)
                                        </h4>
                                        <span className='text-primary font-[500]'>
                                  - $18.00
                                </span>
                                    </div>

                                    <div className='flex items-center justify-between w-full'>
                                        <h4 className='text-[1rem] font-[500] text-primary'>
                                            Shipping
                                        </h4>
                                        <span className='text-primary font-[500]'>
                                  free
                                </span>
                                    </div>

                                    <div
                                        className='flex items-center dark:border-slate-700 justify-between w-full border-t border-[#d1d1d1] pt-4'>
                                        <h4 className='text-[1rem] dark:text-[#abc2d3] font-[500] text-text'>
                                            Order Total
                                        </h4>
                                        <span
                                            className='text-text dark:text-[#abc2d3] font-[500]'>
                                  $200.00
                                </span>
                                    </div>
                                </div>
                            </div>
                            <button
                                className='w-full py-2 px-6 mt-6 tracking-widest bg-primary rounded-md text-[#fff]'>
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DrawerRight;