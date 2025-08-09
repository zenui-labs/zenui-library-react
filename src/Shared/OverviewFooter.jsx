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

            <div
                className="flex items-center flex-col 640px:flex-row gap-5 justify-between w-full dark:border-darkBorderColor border-t border-border pt-5">
                <img src="/footer_logo.png" alt="logo-image" className="w-[100px] 640px:w-[120px]"/>

                <div className="flex items-center gap-3">
                    <p className=" font-[600] text-[1rem] dark:text-darkSubTextColor/90 text-text">Support:</p>
                    <a href="https://ko-fi.com/zenuilabs" target="_blank"
                       className='bg-[#FFDD00] flex items-center gap-2 py-1.5 px-3 rounded-normal text-[0.9rem] font-medium' rel="noreferrer">
                        <img
                            src="https://i.ibb.co/SXWbR1v5/670f5a01229bf8a18f97a3c1-favion.png"
                            alt="sponser-image"
                            className="w-[25px]"
                        />
                        Keep ZenUI Brewing
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default OverviewFooter;
