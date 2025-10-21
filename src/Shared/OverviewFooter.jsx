import React, {useState, useRef} from "react";

// icons
import {FaGithub} from "react-icons/fa";
import {BiSolidLike, BiSolidDislike} from "react-icons/bi";
import {FaHand} from "react-icons/fa6";

// utils style
import utils from "@utils";

import emailjs from '@emailjs/browser';
import {IoChevronBack} from "react-icons/io5";
import {Link} from "react-router-dom";

const OverviewFooter = ({backUrl, forwardUrl, backName, forwardName, isBackButton = true, isForwardButton = true}) => {

    return (
        <footer className="w-full 1024px:w-[90%] mt-8">

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
        </footer>
    );
};

export default OverviewFooter;
