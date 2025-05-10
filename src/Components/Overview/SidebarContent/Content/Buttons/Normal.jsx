import React, {useState} from "react";

// components
import Showcode from "@shared/Component/ShowCode.jsx";
import OverviewFooter from "@shared/OverviewFooter";
import ContentHeader from "@shared/ContentHeader";
import {Helmet} from "react-helmet";
import {MdOutlineEdit, MdOutlineFileDownload, MdOutlineShoppingCart} from "react-icons/md";
import {FaArrowRightLong, FaPlus} from "react-icons/fa6";
import {RxCross2} from "react-icons/rx";
import {BiMessageDetail} from "react-icons/bi";
import {AiOutlineDelete} from "react-icons/ai";
import {IoCodeSlashOutline} from "react-icons/io5";
import {normalButtonContents} from "@utils/ContentsConfig/ButtonsContents.js";
import {useScrollSpy} from "@/CustomHooks/useScrollSpy.js";

import ComponentDescription from '@shared/Component/ComponentDescription.jsx';
import ComponentWrapper from '@shared/Component/ComponentWrapper.jsx';
import ToggleTab from '@shared/Component/ToggleTab.jsx';
import ContentNavbar from '@shared/Component/ContentNavbar.jsx';

const Normal = () => {
    const sectionIds = normalButtonContents.map(item => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    // normal button
    const [normalButtonPreview, setNormalButtonPreview] = useState(true);
    const [normalButtonCode, setNormalButtonCode] = useState(false);

    // app store button
    const [appStoreButtonPreview, setAppStoreButtonPreview] = useState(true);
    const [appStoreButtonCode, setAppStoreButtonCode] = useState(false);

    // play store button
    const [playStoreButtonPreview, setPlayStoreButtonPreview] = useState(true);
    const [playStoreButtonCode, setPlayStoreButtonCode] = useState(false);

    // download button
    const [downloadButtonPreview, setDownloadButtonPreview] = useState(true);
    const [downloadButtonCode, setDownloadButtonCode] = useState(false);

    // add to cart button
    const [addCartButtonPreview, setAddCartButtonPreview] = useState(true);
    const [addCartButtonCode, setAddCartButtonCode] = useState(false);

    // variants button
    const [variantButtonPreview, setVariantButtonPreview] = useState(true);
    const [variantButtonCode, setVariantButtonCode] = useState(false);

    // shape button
    const [shapeButtonPreview, setShapeButtonPreview] = useState(true);
    const [shapeButtonCode, setShapeButtonCode] = useState(false);

    return (
        <>
            <aside className="flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10">
                <div>
                    <ContentHeader text={"normal button"} id={"normal_button"}/>

                    <ComponentDescription text='Buttons like this are used a lot on our websites and are very easy
            to create but you can copy the codes from here to save your time.'/>

                    <ToggleTab code={normalButtonCode} setCode={setNormalButtonCode} preview={normalButtonPreview}
                               setPreview={setNormalButtonPreview}/>

                    <ComponentWrapper>
                        {normalButtonPreview && (
                            <div className="p-8 mb-4 flex items-center flex-wrap gap-5 justify-center">
                                <button
                                    className="px-6 py-2 border border-primary bg-primary text-secondary hover:bg-secondary hover:text-primary dark:hover:bg-transparent transition duration-300 rounded ">
                                    Button 1
                                </button>
                                <button
                                    className="px-6 py-2 border border-primary hover:bg-primary text-primary hover:text-secondary  transition duration-300 rounded ">
                                    Button 2
                                </button>
                                <button
                                    className="px-6 py-2 dark:border-slate-800 dark:text-[#abc2d3] dark:bg-slate-800 dark:hover:bg-transparent dark:hover:text-[#abc2d3] border border-[#3e3939] bg-[#000000] text-secondary hover:bg-secondary hover:text-[#000] transition duration-300 rounded ">
                                    Button 3
                                </button>
                                <button
                                    className="px-6 py-2 border dark:border-slate-800 dark:text-[#abc2d3] dark:hover:bg-slate-800 border-[#3e3939] hover:bg-[#000000] text-[#000] hover:text-secondary  transition duration-300 rounded ">
                                    Button 4
                                </button>
                                <button
                                    className="px-6 py-2 border border-[#9d3533] bg-[#DE3B37] text-secondary hover:bg-secondary hover:text-[#000] dark:hover:bg-transparent dark:hover:text-[#abc2d3] transition duration-300 rounded ">
                                    Button 5
                                </button>
                                <button
                                    className="px-6 py-2 border dark:text-[#abc2d3] border-[#9d3533] hover:bg-[#DE3B37] text-[#000] hover:text-secondary  transition duration-300 rounded ">
                                    Button 6
                                </button>
                            </div>
                        )}

                        {normalButtonCode && (
                            <Showcode
                                code='
import React from "react";

const Button = () => {

    return (
        <div className="p-8 mb-4 flex items-center flex-wrap gap-5 justify-center">
            <button
                className="px-6 py-2 border border-[#3B9DF8] bg-primary text-[#fff] hover:bg-secondary hover:text-[#3B9DF8] dark:hover:bg-transparent transition duration-300 rounded ">
                Button 1
            </button>
            <button
                className="px-6 py-2 border border-[#3B9DF8] hover:bg-[#3B9DF8] text-primary hover:text-[#fff]  transition duration-300 rounded ">
                Button 2
            </button>
            <button
                className="px-6 py-2 dark:border-slate-800 dark:text-[#abc2d3] dark:bg-slate-800 dark:hover:bg-transparent dark:hover:text-[#abc2d3] border border-[#3e3939] bg-[#000000] text-[#fff] hover:bg-secondary hover:text-[#000] transition duration-300 rounded ">
                Button 3
            </button>
            <button
                className="px-6 py-2 border dark:border-slate-800 dark:text-[#abc2d3] dark:hover:bg-slate-800 border-[#3e3939] hover:bg-[#000000] text-[#000] hover:text-[#fff]  transition duration-300 rounded ">
                Button 4
            </button>
            <button
                className="px-6 py-2 border border-[#9d3533] bg-[#DE3B37] text-[#fff] hover:bg-secondary hover:text-[#000] dark:hover:bg-transparent dark:hover:text-[#abc2d3] transition duration-300 rounded ">
                Button 5
            </button>
            <button
                className="px-6 py-2 border dark:text-[#abc2d3] border-[#9d3533] hover:bg-[#DE3B37] text-[#000] hover:text-[#fff] transition duration-300 rounded ">
                Button 6
            </button>
        </div>
    );
};

export default Button;
                    '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader text={"Appstore button"} id={"appstore_button"}/>
                    </div>

                    <ComponentDescription
                        text="Button designed for downloading or accessing apps on the App Store, linking directly to the app's store page."/>

                    <ToggleTab code={appStoreButtonCode} setCode={setAppStoreButtonCode}
                               setPreview={setAppStoreButtonPreview} preview={appStoreButtonPreview}/>

                    <ComponentWrapper>
                        {appStoreButtonPreview && (
                            <div className="p-8 mb-4 flex flex-col items-center flex-wrap gap-5 justify-center">
                                <button
                                    className="px-6 py-2 bg-black dark:bg-slate-800 rounded-md flex items-center gap-[17px]">
                                    <img src='https://i.ibb.co/xFjCsGm/download-1-removebg-preview.png' alt='apple logo'
                                         className='w-[35px]'/>
                                    <div>
                                        <span className='text-[0.8rem] font-[500] text-secondary'>Download on the</span>
                                        <h3 className='text-[1.5rem] font-[500] leading-[20px] mb-2 text-secondary'>AppStore</h3>
                                    </div>
                                </button>

                                <button
                                    className="px-6 py-2 border border-text dark:border-slate-600 rounded-md flex items-center gap-[17px]">
                                    <img src='https://i.ibb.co/6NFjc6z/download-removebg-preview.png' alt='apple logo'
                                         className='w-[32px]'/>
                                    <div>
                                        <span className='text-text text-[0.8rem] dark:text-[#abc2d3] font-[500]'>Download on the</span>
                                        <h3 className='text-[1.5rem] font-[500] dark:text-[#abc2d3] leading-[20px] mb-2'>AppStore</h3>
                                    </div>
                                </button>

                                <button
                                    className="px-6 py-2 bg-gradient-to-t from-pink-600 to-pink-300 rounded-md flex items-center gap-[17px]">
                                    <img src='https://i.ibb.co/xFjCsGm/download-1-removebg-preview.png' alt='apple logo'
                                         className='w-[35px]'/>
                                    <div>
                                        <span className='text-secondary text-[0.8rem] font-[500]'>Download on the</span>
                                        <h3 className='text-[1.5rem] font-[500] leading-[20px] mb-2 text-secondary'>AppStore</h3>
                                    </div>
                                </button>
                            </div>
                        )}

                        {appStoreButtonCode && (
                            <Showcode
                                code='
import React from "react";

const Button = () => {

    return (
        <div className="p-8 mb-4 flex flex-col items-center flex-wrap gap-5 justify-center">

            {/* bg black */}
            <button
                className="px-6 py-2 bg-black dark:bg-slate-800 rounded-md flex items-center gap-[17px]">
                <img src="https://i.ibb.co/xFjCsGm/download-1-removebg-preview.png" alt="apple logo"
                     className="w-[35px]"/>
                <div>
                    <span className="text-[0.8rem] font-[500] text-[#fff]">Download on the</span>
                    <h3 className="text-[1.5rem] font-[500] leading-[20px] mb-2 text-[#fff]">AppStore</h3>
                </div>
            </button>

            {/* icon black */}
            <button
                className="px-6 py-2 border border-[#424242] dark:border-slate-600 rounded-md flex items-center gap-[17px]">
                <img src="https://i.ibb.co/6NFjc6z/download-removebg-preview.png" alt="apple logo"
                     className="w-[32px]"/>
                <div>
                    <span className="text-[#424242] text-[0.8rem] dark:text-[#abc2d3] font-[500]">Download on the</span>
                    <h3 className="text-[1.5rem] font-[500] dark:text-[#abc2d3] leading-[20px] mb-2">AppStore</h3>
                </div>
            </button>

            {/* bg gradient */}
            <button
                className="px-6 py-2 bg-gradient-to-t from-pink-600 to-pink-300 rounded-md flex items-center gap-[17px]">
                <img src="https://i.ibb.co/xFjCsGm/download-1-removebg-preview.png" alt="apple logo"
                     className="w-[35px]"/>
                <div>
                    <span className="text-[#fff] text-[0.8rem] font-[500]">Download on the</span>
                    <h3 className="text-[1.5rem] font-[500] leading-[20px] mb-2 text-[#fff]">AppStore</h3>
                </div>
            </button>
        </div>
    );
};

export default Button;
                    '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader text={"playstore button"} id={"playstore_button"}/>
                    </div>

                    <ComponentDescription
                        text="Button for downloading or accessing apps on the Play Store, linking directly to the app's store page."/>

                    <ToggleTab code={playStoreButtonCode} setCode={setPlayStoreButtonCode}
                               preview={playStoreButtonPreview} setPreview={setPlayStoreButtonPreview}/>

                    <ComponentWrapper>
                        {playStoreButtonPreview && (
                            <div className="p-8 mb-4 flex flex-col items-center flex-wrap gap-5 justify-center">
                                <button
                                    className="px-6 py-2 bg-black dark:bg-slate-800 rounded-md flex items-center gap-[17px]">
                                    <img src='https://i.ibb.co/s9dSrDs/download-2-removebg-preview-1.png'
                                         alt='playstore logo'
                                         className='w-[35px]'/>
                                    <div className='flex items-start flex-col'>
                                        <span className='text-[0.850rem] font-[500] text-secondary'>Get it on</span>
                                        <h3 className='text-[1.5rem] font-[500] leading-[20px] mb-2 text-secondary'>Google
                                            Play</h3>
                                    </div>
                                </button>

                                <button
                                    className="px-6 py-2 border dark:border-slate-600 border-text rounded-md flex items-center gap-[17px]">
                                    <img src='https://i.ibb.co/s9dSrDs/download-2-removebg-preview-1.png'
                                         alt='playstore logo'
                                         className='w-[35px]'/>
                                    <div className='flex items-start flex-col'>
                                        <span className='text-[0.850rem] font-[500] dark:text-[#abc2d3] text-text'>Get it on</span>
                                        <h3 className='text-[1.5rem] font-[500] dark:text-[#abc2d3] leading-[20px] mb-2'>Google
                                            Play</h3>
                                    </div>
                                </button>

                                <button
                                    className="px-6 py-2 bg-black dark:bg-slate-900 rounded-md flex items-center gap-[17px]">
                                    <img src='https://i.ibb.co/0f4qnNX/images-removebg-preview.png' alt='playstore logo'
                                         className='w-[40px]'/>
                                    <div className='flex items-start flex-col'>
                                        <span className='text-[0.850rem] font-[500] text-secondary'>Get it on</span>
                                        <h3 className='text-[1.5rem] font-[500] leading-[20px] mb-2 text-secondary'>Google
                                            Play</h3>
                                    </div>
                                </button>


                                <button
                                    className="px-6 py-2 border dark:border-slate-600 border-text rounded-md flex items-center gap-[17px]">
                                    <img src='https://i.ibb.co/p1c3nqd/download-3-removebg-preview.png'
                                         alt='playstore logo'
                                         className='w-[35px]'/>
                                    <div className='flex items-start flex-col'>
                                        <span className='text-[0.850rem] font-[500] dark:text-[#abc2d3] text-text'>Get it on</span>
                                        <h3 className='text-[1.5rem] font-[500] dark:text-[#abc2d3] leading-[20px] mb-2'>Google
                                            Play</h3>
                                    </div>
                                </button>

                                <button
                                    className="px-6 py-2 bg-gradient-to-t from-pink-600 to-pink-300 rounded-md flex items-center gap-[17px]">
                                    <img src='https://i.ibb.co/0f4qnNX/images-removebg-preview.png' alt='playstore logo'
                                         className='w-[40px]'/>
                                    <div className='flex items-start flex-col'>
                                        <span className='text-[0.850rem] font-[500] text-secondary'>Get it on</span>
                                        <h3 className='text-[1.5rem] font-[500] leading-[20px] mb-2 text-secondary'>Google
                                            Play</h3>
                                    </div>
                                </button>
                            </div>
                        )}

                        {playStoreButtonCode && (
                            <Showcode
                                code='
import React from "react";

const Button = () => {

    return (
        <div className="p-8 mb-4 flex flex-col items-center flex-wrap gap-5 justify-center">

            {/* bg black */}
            <button
                className="px-6 py-2 bg-black dark:bg-slate-800 rounded-md flex items-center gap-[17px]">
                <img src="https://i.ibb.co/s9dSrDs/download-2-removebg-preview-1.png" alt="playstore logo"
                     className="w-[35px]"/>
                <div className="flex items-start flex-col">
                    <span className="text-[0.850rem] font-[500] text-[#fff]">Get it on</span>
                    <h3 className="text-[1.5rem] font-[500] leading-[20px] mb-2 text-[#fff]">Google Play</h3>
                </div>
            </button>

            {/* bordered */}
            <button
                className="px-6 py-2 border dark:border-slate-600 border-text rounded-md flex items-center gap-[17px]">
                <img src="https://i.ibb.co/s9dSrDs/download-2-removebg-preview-1.png" alt="playstore logo"
                     className="w-[35px]"/>
                <div className="flex items-start flex-col">
                    <span className="text-[0.850rem] font-[500] dark:text-[#abc2d3] text-text">Get it on</span>
                    <h3 className="text-[1.5rem] font-[500] dark:text-[#abc2d3] leading-[20px] mb-2">Google Play</h3>
                </div>
            </button>

            {/* white icon */}
            <button
                className="px-6 py-2 bg-black dark:bg-slate-900 rounded-md flex items-center gap-[17px]">
                <img src="https://i.ibb.co/0f4qnNX/images-removebg-preview.png" alt="playstore logo"
                     className="w-[40px]"/>
                <div className="flex items-start flex-col">
                    <span className="text-[0.850rem] font-[500] text-[#fff]">Get it on</span>
                    <h3 className="text-[1.5rem] font-[500] leading-[20px] mb-2 text-[#fff]">Google Play</h3>
                </div>
            </button>

            {/* black icon */}
            <button
                className="px-6 py-2 border dark:border-slate-600 border-text rounded-md flex items-center gap-[17px]">
                <img src="https://i.ibb.co/p1c3nqd/download-3-removebg-preview.png" alt="playstore logo"
                     className="w-[35px]"/>
                <div className="flex items-start flex-col">
                    <span className="text-[0.850rem] font-[500] dark:text-[#abc2d3] text-text">Get it on</span>
                    <h3 className="text-[1.5rem] font-[500] dark:text-[#abc2d3] leading-[20px] mb-2">Google Play</h3>
                </div>
            </button>

            {/* bg gradient */}
            <button
                className="px-6 py-2 bg-gradient-to-t from-pink-600 to-pink-300 rounded-md flex items-center gap-[17px]">
                <img src="https://i.ibb.co/0f4qnNX/images-removebg-preview.png" alt="playstore logo"
                     className="w-[40px]"/>
                <div className="flex items-start flex-col">
                    <span className="text-[0.850rem] font-[500] text-[#fff]">Get it on</span>
                    <h3 className="text-[1.5rem] font-[500] leading-[20px] mb-2 text-[#fff]">Google Play</h3>
                </div>
            </button>
        </div>
    );
};

export default Button;
                    '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader text={"download button"} id={"download_button"}/>
                    </div>

                    <ComponentDescription
                        text='Button for initiating file or content downloads, providing a direct link to download resources.'/>

                    <ToggleTab code={downloadButtonCode} setPreview={setDownloadButtonPreview}
                               preview={downloadButtonPreview} setCode={setDownloadButtonCode}/>

                    <ComponentWrapper>
                        {downloadButtonPreview && (
                            <div className="p-8 mb-4 flex items-center flex-wrap gap-5 justify-center">
                                <button
                                    className="px-4 py-2 bg-primary text-white text-[1.1rem] rounded-md flex items-center gap-[7px]">
                                    <MdOutlineFileDownload className='text-[1.4rem]'/> Download
                                </button>

                                <button
                                    className="px-4 py-2 border border-primary text-primary text-[1.1rem] rounded-md flex items-center gap-[7px]">
                                    Download <MdOutlineFileDownload className='text-[1.4rem]'/>
                                </button>

                                <button
                                    className="bg-primary text-white text-[1.1rem] rounded-md flex items-center">
                                    <span className='px-4 py-2'>Download</span>
                                    <div
                                        className='w-[40px] h-[43px] rounded-r-md bg-blue-500 hover:bg-blue-600 flex items-center justify-center'>
                                        <MdOutlineFileDownload className='text-[1.4rem]'/>
                                    </div>
                                </button>

                                <button
                                    className=" border border-primary text-primary text-[1.1rem] rounded-full flex items-center">
                                    <div
                                        className='w-[36px] h-[36px] rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center ml-1'>
                                        <MdOutlineFileDownload className='text-[1.4rem] text-white'/>
                                    </div>

                                    <span className='pr-4 pl-2 py-2'>Download</span>

                                </button>
                            </div>
                        )}

                        {downloadButtonCode && (
                            <Showcode
                                code='
import React from "react";

// react icons
import {MdOutlineFileDownload} from "react-icons/md";

const Button = () => {

    return (
        <>
            {/* solid color download button */}
            <button
                className="px-4 py-2 bg-[#3B9DF8] text-white text-[1.1rem] rounded-md flex items-center gap-[7px]">
                <MdOutlineFileDownload className="text-[1.4rem]"/> Download
            </button>

            {/* bordered download button */}
            <button
                className="px-4 py-2 border border-[#3B9DF8] text-[#3B9DF8] text-[1.1rem] rounded-md flex items-center gap-[7px]">
                Download <MdOutlineFileDownload className="text-[1.4rem]"/>
            </button>

            {/* button background solid color and icon background deep color button */}
            <button
                className="bg-[#3B9DF8] text-white text-[1.1rem] rounded-md flex items-center">
                <span className="px-4 py-2">Download</span>
                <div
                    className="w-[40px] h-[43px] rounded-r-md bg-blue-500 hover:bg-blue-600 flex items-center justify-center">
                    <MdOutlineFileDownload className="text-[1.4rem]"/>
                </div>
            </button>

            {/* bordered button and icon have background color */}
            <button
                className=" border border-[#3B9DF8] text-[#3B9DF8] text-[1.1rem] rounded-full flex items-center">
                <div
                    className="w-[36px] h-[36px] rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center ml-1">
                    <MdOutlineFileDownload className="text-[1.4rem] text-white"/>
                </div>

                <span className="pr-4 pl-2 py-2">Download</span>

            </button>
        </>
    );
};

export default Button;
                    '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader text={"add to cart button"} id={"add_to_cart_button"}/>
                    </div>

                    <ComponentDescription
                        text='Button that adds selected items to the shopping cart, streamlining the purchasing process.'/>

                    <ToggleTab code={addCartButtonCode} setCode={setAddCartButtonCode} preview={addCartButtonPreview}
                               setPreview={setAddCartButtonPreview}/>

                    <ComponentWrapper>
                        {addCartButtonPreview && (
                            <div className="p-8 mb-4 flex items-center flex-wrap gap-5 justify-center">
                                <button
                                    className="px-4 py-2 bg-primary text-white text-[1.1rem] rounded-md flex items-center gap-[7px]">
                                    <MdOutlineShoppingCart className='text-[1.4rem]'/> Add to cart
                                </button>

                                <button
                                    className=" border border-primary text-primary text-[1.1rem] rounded-full flex items-center">
                                    <div
                                        className='w-[36px] h-[36px] rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center ml-1'>
                                        <MdOutlineShoppingCart className='text-[1.4rem] text-white'/>
                                    </div>

                                    <span className='pr-4 pl-2 py-2'>Add to cart</span>

                                </button>
                            </div>
                        )}

                        {addCartButtonCode && (
                            <Showcode
                                code='
import React from "react";

// react icons
import {MdOutlineShoppingCart} from "react-icons/md";

const Button = () => {

    return (
        <>
            {/* solid background color cart button */}
            <button
                className="px-4 py-2 bg-[#3B9DF8] text-white text-[1.1rem] rounded-md flex items-center gap-[7px]">
                <MdOutlineShoppingCart className="text-[1.4rem]"/> Add to cart
            </button>

            {/* bordered cart button */}
            <button
                className=" border border-[#3B9DF8] text-[#3B9DF8] text-[1.1rem] rounded-full flex items-center">
                <div
                    className="w-[36px] h-[36px] rounded-full bg-blue-500 hover:bg-blue-600 flex items-center justify-center ml-1">
                    <MdOutlineShoppingCart className="text-[1.4rem] text-white"/>
                </div>

                <span className="pr-4 pl-2 py-2">Add to cart</span>

            </button>
        </>
    );
};

export default Button;
                    '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader text={"variants button"} id={"variants_button"}/>
                    </div>

                    <ComponentDescription
                        text='Button with multiple design variants, allowing customization in style, color, and size to fit different use cases.'/>

                    <ToggleTab code={variantButtonCode} setPreview={setVariantButtonPreview}
                               preview={variantButtonPreview} setCode={setVariantButtonCode}/>

                    <ComponentWrapper>
                        {variantButtonPreview && (
                            <div className="p-8 mb-4 flex items-center flex-wrap gap-5 justify-center">
                                <button
                                    className="px-4 py-2 bg-primary text-white text-[1.1rem] rounded-full flex items-center gap-[10px]">
                                    <FaPlus className='text-[1.1rem]'/> Create
                                </button>

                                <button
                                    className="bg-primary w-[40px] h-[40px] rounded-full flex items-center justify-center text-white">
                                    <FaPlus/>
                                </button>

                                <button
                                    className="bg-primary w-[40px] h-[40px] rounded-full flex items-center justify-center text-white">
                                    <RxCross2/>
                                </button>

                                <button
                                    className="border border-primary text-primary w-[40px] h-[40px] rounded-full flex items-center justify-center">
                                    <RxCross2/>
                                </button>

                                <button
                                    className="border border-primary text-primary w-[40px] h-[40px] rounded-md flex items-center justify-center">
                                    <BiMessageDetail className='text-[1.3rem]'/>
                                </button>

                                <button
                                    className="border border-primary text-primary w-[40px] h-[40px] rounded-md flex items-center justify-center">
                                    <AiOutlineDelete className='text-[1.3rem]'/>
                                </button>

                                <button
                                    className="bg-primary py-2 px-4 rounded-md flex items-center gap-[12px] text-[1rem] text-white">
                                    View page
                                    <FaArrowRightLong className='text-[1.1rem]'/>
                                </button>

                                <button
                                    className="bg-primary py-2 px-4 rounded-md flex items-center gap-[8px] text-[1rem] text-white">
                                    <MdOutlineEdit className='text-[1.1rem]'/>
                                    Edit
                                </button>

                                <button
                                    className="border border-primary text-primary py-2 px-4 rounded-md flex items-center gap-[8px] text-[1rem]">
                                    <IoCodeSlashOutline className='text-[1.2rem]'/>
                                    Developer
                                </button>
                            </div>
                        )}

                        {variantButtonCode && (
                            <Showcode
                                code='
import React from "react";

// react icons
import {FaArrowRightLong, FaPlus} from "react-icons/fa6";
import {RxCross2} from "react-icons/rx";
import {BiMessageDetail} from "react-icons/bi";
import {AiOutlineDelete} from "react-icons/ai";
import {MdOutlineEdit} from "react-icons/md";
import {IoCodeSlashOutline} from "react-icons/io5";

const Button = () => {

    return (
        <>
            {/* text with icon create button */}
            <button
                className="px-4 py-2 bg-[#3B9DF8] text-white text-[1.1rem] rounded-full flex items-center gap-[10px]">
                <FaPlus className="text-[1.1rem]"/> Create
            </button>

            {/* icon create button */}
            <button className="bg-[#3B9DF8] w-[40px] h-[40px] rounded-full flex items-center justify-center text-white">
                <FaPlus/>
            </button>

            {/* cross button with background color */}
            <button className="bg-primary w-[40px] h-[40px] rounded-full flex items-center justify-center text-white">
                <RxCross2/>
            </button>

            {/* bordered cross button */}
            <button
                className="border border-[#3B9DF8] text-[#3B9DF8] w-[40px] h-[40px] rounded-full flex items-center justify-center">
                <RxCross2/>
            </button>

            {/* bordered message button */}
            <button
                className="border border-[#3B9DF8] text-[#3B9DF8] w-[40px] h-[40px] rounded-md flex items-center justify-center">
                <BiMessageDetail className="text-[1.3rem]"/>
            </button>

            {/* bordered delete button */}
            <button
                className="border border-[#3B9DF8] text-[#3B9DF8] w-[40px] h-[40px] rounded-md flex items-center justify-center">
                <AiOutlineDelete className="text-[1.3rem]"/>
            </button>

            {/* view page button with arrow icon */}
            <button className="bg-[#3B9DF8] py-2 px-4 rounded-md flex items-center gap-[12px] text-[1rem] text-white">
                View page
                <FaArrowRightLong className="text-[1.1rem]"/>
            </button>

            {/* edit button with edit icon */}
            <button className="bg-[#3B9DF8] py-2 px-4 rounded-md flex items-center gap-[8px] text-[1rem] text-white">
                <MdOutlineEdit className="text-[1.1rem]"/>
                Edit
            </button>

            {/* bordered developer button with code icon */}
            <button
                className="border border-[#3B9DF8] text-[#3B9DF8] py-2 px-4 rounded-md flex items-center gap-[8px] text-[1rem]">
                <IoCodeSlashOutline className="text-[1.2rem]"/>
                Developer
            </button>

        </>
    );
};

export default Button;
                    '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader text={"buttons shape"} id={"buttons_shape"}/>
                    </div>

                    <ComponentDescription
                        text='Buttons with various shapes, offering options like rounded, square, or pill-shaped designs to match different UI styles.'/>

                    <ToggleTab code={shapeButtonCode} setCode={setShapeButtonCode} preview={shapeButtonPreview}
                               setPreview={setShapeButtonPreview}/>

                    <ComponentWrapper>
                        {shapeButtonPreview && (
                            <div className="p-8 mb-4 flex items-center flex-wrap gap-5 justify-center">
                                <button
                                    className='py-2.5 px-6 border border-primary text-primary rounded-tr-[30px] rounded-bl-[30px] hover:bg-primary hover:text-white transition-all duration-200'>
                                    ZenUI Library
                                </button>

                                <button
                                    className='py-2.5 px-6 border border-primary text-primary rounded-tl-[30px] rounded-br-[30px] hover:bg-primary hover:text-white transition-all duration-200'>
                                    ZenUI Library
                                </button>
                            </div>
                        )}

                        {shapeButtonCode && (
                            <Showcode
                                code='
import React from "react";

const Button = () => {

    return (
        <>
            {/* left side shape button */}
            <button
                className="py-2.5 px-6 border border-[#3B9DF8] text-[#3B9DF8] rounded-tr-[30px] rounded-bl-[30px] hover:bg-[#3B9DF8] hover:text-white transition-all duration-200">
                ZenUI Library
            </button>

            {/* right side shape button */}
            <button
                className="py-2.5 px-6 border border-[#3B9DF8] text-[#3B9DF8] rounded-tl-[30px] rounded-br-[30px] hover:bg-[#3B9DF8] hover:text-white transition-all duration-200">
                ZenUI Library
            </button>
        </>
    );
};

export default Button;
                    '
                            />
                        )}
                    </ComponentWrapper>

                    <OverviewFooter backUrl='/components/otp-input' backName='OTP input' forwardName='login button'
                                    forwardUrl='/components/login-buttons'/>
                </div>

                <ContentNavbar contents={normalButtonContents} activeSection={activeSection}/>

            </aside>
            <Helmet>
                <title>Buttons - Normal Button</title>
            </Helmet>
        </>
    );
};

export default Normal;
