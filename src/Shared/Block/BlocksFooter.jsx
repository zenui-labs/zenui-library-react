import React, {useState} from "react";

// icons
import {FaGithub} from "react-icons/fa";
import {BiSolidLike, BiSolidDislike} from "react-icons/bi";
import {FaHand} from "react-icons/fa6";

// utils style
import utils from "@utils/index.jsx";
import {Link} from "react-router-dom";
import {IoChevronBack} from "react-icons/io5";

const OverviewFooter = ({
                            width = '820px',
                            backUrl,
                            forwardUrl,
                            backName,
                            forwardName,
                            isBackButton = true,
                            isForwardButton = true
                        }) => {

    return (
        <footer className={`w-full max-w-[${width}] mt-8`}>

            {
                (isBackButton || isForwardButton) && (
                    <div className={`${isBackButton ? 'justify-between' : 'justify-end'} flex items-center w-full py-4`}>
                        {
                            isBackButton && (
                                <Link to={backUrl}
                                      className='flex items-center gap-[5px] text-[0.9rem] py-1.5 px-3 border border-gray-200 hover:bg-gray-200 dark:bg-slate-900 dark:text-darkSubTextColor dark:border-darkBorderColor dark:hover:bg-slate-800 capitalize transition-all duration-200 text-gray-500 rounded-md bg-gray-100'>
                                    <IoChevronBack className='text-[1rem] text-gray-500'/>
                                    {backName}
                                </Link>
                            )
                        }

                        {
                            isForwardButton && (
                                <Link to={forwardUrl}
                                      className='flex items-center gap-[5px] text-[0.9rem] py-1.5 px-3 border border-gray-200 hover:bg-gray-200 dark:bg-slate-900 dark:text-darkSubTextColor dark:border-darkBorderColor dark:hover:bg-slate-800 capitalize transition-all duration-200 text-gray-500 rounded-md bg-gray-100'>
                                    {forwardName}
                                    <IoChevronBack className='text-[1rem] text-gray-500 rotate-[180deg]'/>
                                </Link>
                            )
                        }
                    </div>
                )
            }

            <div
                className="flex items-center gap-5 dark:border-slate-700 justify-between w-full border-t border-border pt-5">
                <img src="/footer_logo.png" alt="logo-image" className="w-[120px] 640px:w-[120px]"/>

                <div className="flex items-center gap-3">
                    <p className=" font-[600] text-[1rem] text-text dark:text-darkSubTextColor/90">Support:</p>
                    <a href="https://buymeacoffee.com/zenuilibrary" target="_blank">
                        <img
                            src="https://www.codehim.com/wp-content/uploads/2022/09/bmc-button-640x180.png.webp"
                            alt="sponser-image"
                            className="w-[120px]"
                        />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default OverviewFooter;
