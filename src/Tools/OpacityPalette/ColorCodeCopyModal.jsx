import React, {useEffect, useState} from 'react';
import {GoCopy} from "react-icons/go";
import {MdOutlineDone} from "react-icons/md";
import {RxCross2} from "react-icons/rx";

const ColorCodeCopyModal = ({isCopyClicked, setIsCopyClicked, clipboardColor}) => {

    const [hexCopied, setHexCopied] = useState(false);
    const [rgbCopied, setRgbCopied] = useState(false);
    const [hslCopied, setHslCopied] = useState(false);

    const { hex, rgb, hsl } = clipboardColor;

    const handleHexCopy = (colorCode) => {
        setHexCopied(true);
        window.navigator.clipboard.writeText(colorCode);
        setTimeout(() => {
            setHexCopied(false);
        }, 1000);
    };

    const handleRgbCopy = (colorCode) => {
        setRgbCopied(true);
        window.navigator.clipboard.writeText(colorCode);
        setTimeout(() => {
            setRgbCopied(false);
        }, 1000);
    };

    const handleHslCopy = (colorCode) => {
        setHslCopied(true);
        window.navigator.clipboard.writeText(colorCode);
        setTimeout(() => {
            setHslCopied(false);
        }, 1000);
    };

    useEffect(() => {
        const handleOutsideClick = (e) => {
            if (!e.target.closest('.colorCodeCopyModal') && !e.target.closest('.codeBox')) {
                setIsCopyClicked(false)
            }
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [isCopyClicked, setIsCopyClicked]);

    return (
            <div
                className={`${
                    isCopyClicked ? " visible" : " invisible"
                } w-full h-screen fixed top-0 left-0 z-[999] bg-[#0000002a] transition-all duration-300 flex items-center justify-center`}
            >
                <div
                    className={`${
                        isCopyClicked ? " scale-[1] opacity-100" : " scale-[0] opacity-0"
                    } p-8 max-w-[95%] dark:bg-slate-900 640px:max-w-[80%] bg-[#fff] colorCodeCopyModal rounded-lg transition-all duration-300 mx-auto mt-8`}
                >
                    <RxCross2 className='absolute top-3 right-3 p-2 dark:text-darkSubTextColor dark:hover:bg-slate-800 text-[2rem] hover:bg-gray-100 rounded-full cursor-pointer' onClick={()=> setIsCopyClicked(false)}/>
                    <h1 className='text-[1.3rem] font-[500] text-text dark:text-darkSubTextColor'>Copy To Clipboard</h1>

                    <div className='flex items-center gap-5 flex-wrap mt-10'>
                        <div>
                            <p className='text-[1rem] text-gray-600 dark:text-darkSubTextColor'>Hex Code</p>
                            <div
                                className=" w-max mt-1 bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-darkSubTextColor rounded-md py-3 px-4 tracking-wider font-mono font-[500] flex items-center justify-between gap-4">
                                {hex}
                                <GoCopy
                                    onClick={() => handleHexCopy(hex)}
                                    className={`${
                                        hexCopied ? " opacity-0 hidden" : " opacity-100 flex"
                                    } transition-all duration-300 cursor-pointer`}
                                />
                                <MdOutlineDone
                                    className={`${
                                        hexCopied ? " opacity-100 flex" : " opacity-0 hidden"
                                    } transition-all duration-300 cursor-pointer`}
                                />
                            </div>
                        </div>

                        <div>
                            <p className='text-[1rem] text-gray-600 dark:text-darkSubTextColor'>RGB Code</p>
                            <div
                                className=" w-max mt-1 bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-darkSubTextColor rounded-md py-3 px-4 tracking-wider font-mono font-[500] flex items-center justify-between gap-4">
                                {rgb}
                                <GoCopy
                                    onClick={() => handleRgbCopy(rgb)}
                                    className={`${
                                        rgbCopied ? " opacity-0 hidden" : " opacity-100 flex"
                                    } transition-all duration-300 cursor-pointer`}
                                />
                                <MdOutlineDone
                                    className={`${
                                        rgbCopied ? " opacity-100 flex" : " opacity-0 hidden"
                                    } transition-all duration-300 cursor-pointer`}
                                />
                            </div>
                        </div>

                        <div>
                            <p className='text-[1rem] text-gray-600 dark:text-darkSubTextColor'>HSL Code</p>
                            <div
                                className=" w-max mt-1 bg-gray-100 text-gray-700 dark:bg-slate-800 dark:text-darkSubTextColor rounded-md py-3 px-4 tracking-wider font-mono font-[500] flex items-center justify-between gap-4">
                                {hsl}
                                <GoCopy
                                    onClick={() => handleHslCopy(hsl)}
                                    className={`${
                                        hslCopied ? " opacity-0 hidden" : " opacity-100 flex"
                                    } transition-all duration-300 cursor-pointer`}
                                />
                                <MdOutlineDone
                                    className={`${
                                        hslCopied ? " opacity-100 flex" : " opacity-0 hidden"
                                    } transition-all duration-300 cursor-pointer`}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default ColorCodeCopyModal;
