import React, { useState, useRef, useEffect } from 'react';
import {BsCopy} from "react-icons/bs";
import {IoMdDoneAll} from "react-icons/io";
import {RxCross2} from "react-icons/rx";

const ColorPickerFromImage = ({image, isCustomPickerOpen, setIsCustomPickerOpen, colors, setColors, setImage}) => {
    const [color, setColor] = useState('#fff');
    const [hoverColor, setHoverColor] = useState('');
    const [rgb, setRgb] = useState('rgb(0,0,0)');
    const canvasRef = useRef(null);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [hexColorCopied, setHexColorCopied] = useState(false)
    const [rgbColorCopied, setRgbColorCopied] = useState(false)

    const handleMouseMove = (event) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();

        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const x = (event.clientX - rect.left) * scaleX;
        const y = (event.clientY - rect.top) * scaleY;

        const imageData = ctx.getImageData(x, y, 1, 1).data;
        const rgbValue = `rgb(${imageData[0]}, ${imageData[1]}, ${imageData[2]})`;
        const hexValue = rgbToHex(imageData[0], imageData[1], imageData[2]);

        setHoverColor(hexValue);
        setCursorPosition({ x: event.clientX - 430, y: event.clientY - 100 });
    };

    const handleCanvasClick = (event) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const rect = canvas.getBoundingClientRect();

        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const x = (event.clientX - rect.left) * scaleX;
        const y = (event.clientY - rect.top) * scaleY;

        const imageData = ctx.getImageData(x, y, 1, 1).data;
        const rgbValue = `rgb(${imageData[0]}, ${imageData[1]}, ${imageData[2]})`;
        const hexValue = rgbToHex(imageData[0], imageData[1], imageData[2]);

        setRgb(rgbValue);
        setColor(hexValue);
    };

    const rgbToHex = (r, g, b) => {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas || !image) return;
        const ctx = canvas.getContext('2d');

        const img = new Image();
        img.src = image;

        img.onload = function () {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
        };
    }, [image]);

    useEffect(() => {
        document.addEventListener('click', (event)=> {
            if(!event.target.closest('.custom-color-picker-from-image') && !event.target.closest('.color-picker-upload-image-btn')){
                setIsCustomPickerOpen(false)
                setImage(null)
            }
        })
    }, [isCustomPickerOpen]);

    const handleGenerateButtonClick = () => {
        setColors([rgb, ...colors]);
        setIsCustomPickerOpen(false)
    }

    const handleOnMouseLeave = () => {
        setHoverColor('')
    }

    const handleHexColorClick = (e, code) => {
        e.preventDefault()
        setIsCustomPickerOpen(true)
        navigator.clipboard.writeText(code)
        setHexColorCopied(true)

        setTimeout(()=> {
            setHexColorCopied(false)
        }, 2000)
    }

    const handleRgbColorClick = (e, code) => {
        e.preventDefault()
        setIsCustomPickerOpen(true)
        navigator.clipboard.writeText(code)
        setRgbColorCopied(true)

        setTimeout(()=> {
            setRgbColorCopied(false)
        }, 2000)
    }

    return (
        <div className={`${
            isCustomPickerOpen ? " visible" : " invisible"
        } flex flex-col items-center transition-all duration-300 justify-center fixed left-0 right-0 top-0 bg-[#0000002a] w-full h-screen z-[1500]`}>
            <div className={`${
                isCustomPickerOpen ? " scale-[1] opacity-100" : " scale-[0] opacity-0"
            } bg-white custom-color-picker-from-image w-[95%] dark:bg-slate-800 640px:w-[60%] 1024px:w-[45%] transition-all duration-300 rounded-md h-[90vh] overflow-y-auto 640px:h-auto p-[20px] 640px:p-[30px] overflow-hidden`}>

                <RxCross2 className='p-2 text-[2.2rem] mb-2 dark:text-darkSubTextColor dark:hover:bg-slate-900 float-right hover:bg-gray-100 rounded-full cursor-pointer' onClick={()=> setIsCustomPickerOpen(false)}/>

               <div className='relative zenui_code_snippet h-[300px] overflow-auto w-full rounded-md mx-auto'>
                   {image && (
                       <canvas
                           ref={canvasRef}
                           onMouseMove={handleMouseMove}
                           onClick={handleCanvasClick}
                           onMouseLeave={handleOnMouseLeave}
                           className="bg-gray-200 border border-gray-200 rounded-md cursor-crosshair"
                       ></canvas>
                   )}

                   {hoverColor && (
                       <div className='border hidden 1024px:block 1404px:hidden border-gray-200 shadow-md'
                           style={{
                               position: 'fixed',
                               top: cursorPosition.y + 70,
                               left: cursorPosition.x + 100,
                               backgroundColor: hoverColor,
                               width: '30px',
                               height: '30px',
                               borderRadius: '50%',
                               pointerEvents: 'none',
                               zIndex: 1000,
                           }}
                       ></div>
                   )}

                   {hoverColor && (
                       <div className='border hidden 1404px:block 1605px:hidden border-gray-200 shadow-md'
                           style={{
                               position: 'fixed',
                               top: cursorPosition.y + 25,
                               left: cursorPosition.x + 15,
                               backgroundColor: hoverColor,
                               width: '30px',
                               height: '30px',
                               borderRadius: '50%',
                               pointerEvents: 'none',
                               zIndex: 1000,
                           }}
                       ></div>
                   )}

                   {hoverColor && (
                       <div className='border hidden 1605px:block border-gray-200 shadow-md'
                           style={{
                               position: 'fixed',
                               top: cursorPosition.y - 50,
                               left: cursorPosition.x - 80,
                               backgroundColor: hoverColor,
                               width: '30px',
                               height: '30px',
                               borderRadius: '50%',
                               pointerEvents: 'none',
                               zIndex: 1000,
                           }}
                       ></div>
                   )}
               </div>

                <h3 className='text-[1.1rem] font-bold text-gray-500 mt-5 dark:text-darkSubTextColor'>Selected Color:</h3>
                {color && (
                    <div className="mt-3 flex 640px:flex-row flex-col 640px:items-center">
                        <div
                            className="w-16 h-[55px] border dark:border-slate-500 border-gray-200 rounded-md mr-2"
                            style={{ backgroundColor: color }}
                        ></div>
                        <div>
                            <div className='flex items-center gap-[10px]'>
                                <p className=" text-gray-600 dark:text-darkSubTextColor"><b className='text-gray-500 mr-2 dark:text-darkSubTextColor'>Hex Color:</b> {color}</p>
                                {
                                    hexColorCopied ? (
                                        <button
                                             className='w-[35px] h-[35px] rounded-full hover:bg-gray-100 cursor-pointer flex items-center justify-center dark:hover:bg-slate-900'>
                                            <IoMdDoneAll className='text-[1.1rem] text-gray-500 dark:text-darkSubTextColor'/>
                                        </button>
                                    ) : (
                                        <button type='button' onClick={(e)=>handleHexColorClick(e,color)}
                                             className='w-[35px] h-[35px] rounded-full hover:bg-gray-100 cursor-pointer flex items-center justify-center dark:hover:bg-slate-900'>
                                            <BsCopy className='text-[1rem] text-gray-500 dark:text-darkSubTextColor'/>
                                        </button>
                                    )
                                }
                            </div>

                            <div className='flex gap-[10px] items-center'>
                                <p className=" text-gray-600 dark:text-darkSubTextColor"><b className='text-gray-500 mr-2 dark:text-darkSubTextColor'>RGB Color:</b> {rgb}</p>

                                {
                                    rgbColorCopied ? (
                                        <button
                                             className='w-[35px] h-[35px] rounded-full hover:bg-gray-100 cursor-pointer flex items-center justify-center dark:hover:bg-slate-900'>
                                            <IoMdDoneAll className='text-[1.1rem] text-gray-500 dark:text-darkSubTextColor'/>
                                        </button>
                                    ) : (
                                        <button type='button' onClick={(e)=>handleRgbColorClick(e,rgb)}
                                             className='w-[35px] h-[35px] rounded-full hover:bg-gray-100 cursor-pointer flex items-center justify-center dark:hover:bg-slate-900'>
                                            <BsCopy className='text-[1rem] text-gray-500 dark:text-darkSubTextColor'/>
                                        </button>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                )}

                <div className='w-full flex items-end justify-end mt-6'>
                    <button onClick={handleGenerateButtonClick}
                        className='py-2.5 px-3.5 bg-[#0FABCA] active:scale-[0.8] transition-all duration-300 rounded-md text-[1rem] font-semibold text-white'>Generate
                        Palettes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ColorPickerFromImage;
