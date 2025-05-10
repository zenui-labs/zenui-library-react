import React, {useEffect, useState} from "react";

// components
import ContentHeader from "@shared/ContentHeader";
import {Helmet} from "react-helmet";
import BlocksShowCode from "@shared/Block/BlocksShowCode.jsx";

// icons
import BlocksFooter from "@shared/Block/BlocksFooter.jsx";

import {HiArrowRight} from "react-icons/hi";
import BlockDescription from "@shared/Block/BlockDescription.jsx";
import BlockToggleTab from "@shared/Block/BlockToggleTab.jsx";
import BlockWrapper from "@shared/Block/BlockWrapper.jsx";


const OfferGrid = () => {

    const [offerGrid1Preview, setOfferGrid1Preview] = useState(true);
    const [offerGrid1Code, setOfferGrid1Code] = useState(false);

    const [offerGrid2Preview, setOfferGrid2Preview] = useState(true);
    const [offerGrid2Code, setOfferGrid2Code] = useState(false);

    const [offerGrid3Preview, setOfferGrid3Preview] = useState(true);
    const [offerGrid3Code, setOfferGrid3Code] = useState(false);

    const [offerGrid4Preview, setOfferGrid4Preview] = useState(true);
    const [offerGrid4Code, setOfferGrid4Code] = useState(false);

    const [offerGrid5Preview, setOfferGrid5Preview] = useState(true);
    const [offerGrid5Code, setOfferGrid5Code] = useState(false);

    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    const targetDate = '2025-03-31T23:59:59'

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = new Date(targetDate) - new Date();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            }
        };

        const timer = setInterval(calculateTimeLeft, 1000);
        calculateTimeLeft(); // Initial call

        return () => clearInterval(timer);
    }, [targetDate]);

    const formatNumber = (number) => number.toString().padStart(2, '0');

    return (
        <aside className="flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10">
            <div>
                <ContentHeader text={"Offer grid 1"} id={"offer_grid_1"}/>

                <BlockDescription
                    text='Explore exclusive e-commerce offers in a sleek grid layout—top deals, big savings, and premium brands, all at your fingertips!'/>

                <BlockToggleTab preview={offerGrid1Preview} setPreview={setOfferGrid1Preview} code={offerGrid1Code}
                                setCode={setOfferGrid1Code}/>

                <BlockWrapper>
                    {offerGrid1Preview && (
                        <div className={`p-8  flex flex-wrap items-center gap-5 justify-center overflow-hidden`}>

                            <div
                                className='grid grid-cols-1 1024px:grid-cols-2 gap-[15px] w-full 640px:w-[80%] min-h-[550px]'>

                                <div
                                    className='col-span-1 dark:bg-slate-900 overflow-hidden flex justify-between flex-col rounded-sm row-span-2 bg-[#f2f4f6] h-full py-8'>
                                    <div className='px-8'>
                                        <h4 className='text-[1.5rem] dark:text-[#abc2d3] font-medium text-gray-900'>Living
                                            Room</h4>
                                        <button
                                            className='flex w-max items-center hover:text-[#0FABCA] hover:border-[#0FABCA] dark:text-[#abc2d3] transition-all duration-300 gap-[10px] border-gray-900 text-[0.9rem] mt-2 group border-b'>
                                            Shop Now
                                            <HiArrowRight className='group-hover:ml-1 transition-all duration-200'/>
                                        </button>
                                    </div>

                                    <img alt='product/image'
                                         src='https://i.ibb.co.com/F7MBZqh/Paste-image-removebg-preview.png'
                                         className='w-[500px]'/>
                                </div>

                                <div
                                    className='bg-[#f2f4f6] dark:bg-slate-900 rounded-sm col-span-1 flex justify-between items-center px-4 overflow-hidden'>

                                    <div className='px-6 mt-auto pb-9'>
                                        <h4 className='text-[1.5rem] dark:text-[#abc2d3] font-medium text-gray-900'>Bedroom</h4>
                                        <button
                                            className='flex w-max items-center hover:text-[#0FABCA] hover:border-[#0FABCA] dark:text-[#abc2d3] transition-all duration-300 gap-[10px] border-gray-900 text-[0.9rem] mt-2 group border-b'>
                                            Shop Now
                                            <HiArrowRight className='group-hover:ml-1 transition-all duration-200'/>
                                        </button>
                                    </div>

                                    <img alt='product/image'
                                         src='https://i.ibb.co.com/PCw23Vs/Paste-image-1-removebg-preview.png'
                                         className='w-[200px] h-[200px]'/>

                                </div>

                                <div
                                    className='bg-[#f2f4f6] dark:bg-slate-900 rounded-sm col-span-1 flex justify-between items-center px-4 overflow-hidden'>

                                    <div className='px-6 mt-auto pb-9'>
                                        <h4 className='text-[1.5rem] dark:text-[#abc2d3] font-medium text-gray-900'>Kitchen</h4>
                                        <button
                                            className='flex w-max items-center hover:text-[#0FABCA] hover:border-[#0FABCA] dark:text-[#abc2d3] transition-all duration-300 gap-[10px] border-gray-900 text-[0.9rem] mt-2 group border-b'>
                                            Shop Now
                                            <HiArrowRight className='group-hover:ml-1 transition-all duration-200'/>
                                        </button>
                                    </div>

                                    <img alt='product/image'
                                         src='https://i.ibb.co.com/4FjR02m/Paste-image-2-removebg-preview.png'
                                         className='w-[200px] h-max'/>

                                </div>

                            </div>

                        </div>
                    )}

                    {offerGrid1Code && <BlocksShowCode code='
import React from "react";

// react icons
import {HiArrowRight} from "react-icons/hi";

const OfferGrid = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[15px] w-full sm:w-[80%] min-h-[550px]">

            {/* left card with row span 2 */}
            <div
                className="col-span-1 dark:bg-slate-900 overflow-hidden flex justify-between flex-col rounded-sm row-span-2 bg-[#f2f4f6] h-full py-8">
                <div className="px-8">
                    <h4 className="text-[1.5rem] dark:text-[#abc2d3] font-medium text-gray-900">Living Room</h4>
                    <button
                        className="flex w-max items-center hover:text-[#0FABCA] hover:border-[#0FABCA] dark:text-[#abc2d3] transition-all duration-300 gap-[10px] border-gray-900 text-[0.9rem] mt-2 group border-b">
                        Shop Now
                        <HiArrowRight className="group-hover:ml-1 transition-all duration-200"/>
                    </button>
                </div>

                <img alt="product/image" src="https://i.ibb.co.com/F7MBZqh/Paste-image-removebg-preview.png"
                     className="w-[500px]"/>
            </div>

            {/* right top card */}
            <div
                className="bg-[#f2f4f6] dark:bg-slate-900 rounded-sm col-span-1 flex justify-between items-center px-4 overflow-hidden">

                <div className="px-6 mt-auto pb-9">
                    <h4 className="text-[1.5rem] dark:text-[#abc2d3] font-medium text-gray-900">Bedroom</h4>
                    <button
                        className="flex w-max items-center hover:text-[#0FABCA] hover:border-[#0FABCA] dark:text-[#abc2d3] transition-all duration-300 gap-[10px] border-gray-900 text-[0.9rem] mt-2 group border-b">
                        Shop Now
                        <HiArrowRight className="group-hover:ml-1 transition-all duration-200"/>
                    </button>
                </div>

                <img alt="product/image" src="https://i.ibb.co.com/PCw23Vs/Paste-image-1-removebg-preview.png"
                     className="w-[200px] h-[200px]"/>

            </div>

            {/* right bottom card */}
            <div
                className="bg-[#f2f4f6] dark:bg-slate-900 rounded-sm col-span-1 flex justify-between items-center px-4 overflow-hidden">

                <div className="px-6 mt-auto pb-9">
                    <h4 className="text-[1.5rem] dark:text-[#abc2d3] font-medium text-gray-900">Kitchen</h4>
                    <button
                        className="flex w-max items-center hover:text-[#0FABCA] hover:border-[#0FABCA] dark:text-[#abc2d3] transition-all duration-300 gap-[10px] border-gray-900 text-[0.9rem] mt-2 group border-b">
                        Shop Now
                        <HiArrowRight className="group-hover:ml-1 transition-all duration-200"/>
                    </button>
                </div>

                <img alt="product/image" src="https://i.ibb.co.com/4FjR02m/Paste-image-2-removebg-preview.png"
                     className="w-[200px] h-max"/>

            </div>

        </div>
    );
};

export default OfferGrid;
                    '/>
                    }
                </BlockWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"offer grid 2"} id={"offer_grid_2"}/>
                </div>

                <BlockDescription
                    text='Explore exclusive e-commerce offers in a sleek grid layout—top deals, big savings, and premium brands, all at your fingertips!'/>

                <BlockToggleTab preview={offerGrid2Preview} setPreview={setOfferGrid2Preview} code={offerGrid2Code}
                                setCode={setOfferGrid2Code}/>

                <BlockWrapper>
                    {offerGrid2Preview && (
                        <div className={`p-8  flex flex-wrap items-center gap-5 justify-center overflow-hidden`}>

                            <div
                                className='grid grid-cols-1 1024px:grid-cols-4 gap-[15px] w-full 640px:w-[80%] min-h-[400px]'>

                                <div
                                    className='col-span-1 1024px:col-span-2 overflow-hidden flex justify-between flex-col rounded-sm row-span-1 1024px:row-span-2 h-[170px] bg-black 1024px:h-full py-8 relative'>

                                    <div className='px-8 absolute bottom-8 z-20 w-full 1024px:w-[70%]'>
                                        <h4 className='text-[1.1rem] font-medium text-white'>PlayStation 5</h4>
                                        <p className='text-[0.8rem] mt-3 text-[#FAFAFA] font-[300]'>Black and White
                                            version of the PS5 coming out on sale.</p>
                                        <button
                                            className='w-max text-[#FAFAFA] font-[300] hover:text-[#0FABCA] hover:border-[#0FABCA] mt-3 transition-all duration-300 border-[#FAFAFA] text-[0.8rem] group border-b'>
                                            Shop Now
                                        </button>
                                    </div>

                                    <img alt='product/image'
                                         src='https://i.ibb.co.com/g9qmJxg/ps5-slim-goedkope-playstation-large-1.png'
                                         className='w-[350px] absolute bottom-0 left-[50%] transform translate-x-[-50%]'/>
                                </div>

                                <div
                                    className='bg-black rounded-sm col-span-1 1024px:col-span-2 flex justify-between items-center px-4 overflow-hidden relative min-h-[190px]'>

                                    <div className='absolute bottom-6 left-6 z-20 w-[70%] 1024px:w-[50%]'>
                                        <h4 className='text-[1.1rem] font-medium text-white'>Women’s Collections</h4>
                                        <p className='text-[0.8rem] mt-3 text-[#FAFAFA] font-[300]'>Featured woman
                                            collections that give you another vibe.</p>
                                        <button
                                            className='w-max text-[#FAFAFA] font-[300] hover:text-[#0FABCA] hover:border-[#0FABCA] mt-3 transition-all duration-300 border-[#FAFAFA] text-[0.8rem] group border-b'>
                                            Shop Now
                                        </button>
                                    </div>

                                    <img alt='product/image'
                                         src='https://i.ibb.co.com/7ghML0N/attractive-woman-wearing-hat-posing-black-background-1.png'
                                         className='w-[300px] absolute bottom-0 right-0'/>

                                </div>

                                <div
                                    className='bg-black rounded-sm col-span-1 flex justify-between items-center px-4 overflow-hidden relative min-h-[180px]'>

                                    <div className='absolute bottom-4 z-20 w-[90%]'>
                                        <h4 className='text-[1.1rem] font-medium text-white'>Speakers</h4>
                                        <p className='text-[0.8rem] mt-0.5 text-[#FAFAFA] font-[300]'>Amazon wireless
                                            speakers</p>
                                        <button
                                            className='w-max text-[#FAFAFA] font-[300] hover:text-[#0FABCA] hover:border-[#0FABCA] mt-2 transition-all duration-300 border-[#FAFAFA] text-[0.8rem] group border-b'>
                                            Shop Now
                                        </button>
                                    </div>

                                    <img alt='product/image'
                                         src='https://i.ibb.co.com/fd8DJYZ/69-694768-amazon-echo-png-clipart-transparent-amazon-echo-png-1.png'
                                         className='w-[120px] absolute top-[50%] left-[50%] transform translate-y-[-50%] translate-x-[-50%]'/>

                                </div>

                                <div
                                    className='bg-black rounded-sm col-span-1 flex justify-between items-center px-4 overflow-hidden relative min-h-[180px]'>

                                    <div className='absolute bottom-4 z-20 w-[90%]'>
                                        <h4 className='text-[1.1rem] font-medium text-white'>Perfume</h4>
                                        <p className='text-[0.8rem] mt-0.5 text-[#FAFAFA] font-[300]'>GUCCI INTENSE OUD
                                            EDP</p>
                                        <button
                                            className='w-max text-[#FAFAFA] font-[300] hover:text-[#0FABCA] hover:border-[#0FABCA] mt-2 transition-all duration-300 border-[#FAFAFA] text-[0.8rem] group border-b'>
                                            Shop Now
                                        </button>
                                    </div>

                                    <img alt='product/image'
                                         src='https://i.ibb.co.com/WxYLjFy/652e82cd70aa6522dd785109a455904c.png'
                                         className='w-[130px] absolute top-[50%] left-[50%] transform translate-y-[-50%] translate-x-[-50%]'/>

                                </div>

                            </div>

                        </div>
                    )}

                    {offerGrid2Code && <BlocksShowCode code='
import React from "react";

const OfferGrid = () => {

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-[15px] w-full sm:w-[80%] min-h-[400px]">

            <div
                className="col-span-1 lg:col-span-2 overflow-hidden flex justify-between flex-col rounded-sm row-span-1 lg:row-span-2 h-[170px] bg-black lg:h-full py-8 relative">

                <div className="px-8 absolute bottom-8 z-20 w-full lg:w-[70%]">
                    <h4 className="text-[1.1rem] font-medium text-white">PlayStation 5</h4>
                    <p className="text-[0.8rem] mt-3 text-[#FAFAFA] font-[300]">Black and White version of the PS5
                        coming out on sale.</p>
                    <button
                        className="w-max text-[#FAFAFA] font-[300] hover:text-[#0FABCA] hover:border-[#0FABCA] mt-3 transition-all duration-300 border-[#FAFAFA] text-[0.8rem] group border-b">
                        Shop Now
                    </button>
                </div>

                <img alt="product/image" src="https://i.ibb.co.com/g9qmJxg/ps5-slim-goedkope-playstation-large-1.png"
                     className="w-[350px] absolute bottom-0 left-[50%] transform translate-x-[-50%]"/>
            </div>

            <div
                className="bg-black rounded-sm col-span-1 lg:col-span-2 flex justify-between items-center px-4 overflow-hidden relative min-h-[190px]">

                <div className="absolute bottom-6 left-6 z-20 w-[70%] lg:w-[50%]">
                    <h4 className="text-[1.1rem] font-medium text-white">Women’s Collections</h4>
                    <p className="text-[0.8rem] mt-3 text-[#FAFAFA] font-[300]">Featured woman collections that give you
                        another vibe.</p>
                    <button
                        className="w-max text-[#FAFAFA] font-[300] hover:text-[#0FABCA] hover:border-[#0FABCA] mt-3 transition-all duration-300 border-[#FAFAFA] text-[0.8rem] group border-b">
                        Shop Now
                    </button>
                </div>

                <img alt="product/image"
                     src="https://i.ibb.co.com/7ghML0N/attractive-woman-wearing-hat-posing-black-background-1.png"
                     className="w-[300px] absolute bottom-0 right-0"/>

            </div>

            <div
                className="bg-black rounded-sm col-span-1 flex justify-between items-center px-4 overflow-hidden relative min-h-[180px]">

                <div className="absolute bottom-4 z-20 w-[90%]">
                    <h4 className="text-[1.1rem] font-medium text-white">Speakers</h4>
                    <p className="text-[0.8rem] mt-0.5 text-[#FAFAFA] font-[300]">Amazon wireless speakers</p>
                    <button
                        className="w-max text-[#FAFAFA] font-[300] hover:text-[#0FABCA] hover:border-[#0FABCA] mt-2 transition-all duration-300 border-[#FAFAFA] text-[0.8rem] group border-b">
                        Shop Now
                    </button>
                </div>

                <img alt="product/image"
                     src="https://i.ibb.co.com/fd8DJYZ/69-694768-amazon-echo-png-clipart-transparent-amazon-echo-png-1.png"
                     className="w-[120px] absolute top-[50%] left-[50%] transform translate-y-[-50%] translate-x-[-50%]"/>

            </div>

            <div
                className="bg-black rounded-sm col-span-1 flex justify-between items-center px-4 overflow-hidden relative min-h-[180px]">

                <div className="absolute bottom-4 z-20 w-[90%]">
                    <h4 className="text-[1.1rem] font-medium text-white">Perfume</h4>
                    <p className="text-[0.8rem] mt-0.5 text-[#FAFAFA] font-[300]">GUCCI INTENSE OUD EDP</p>
                    <button
                        className="w-max text-[#FAFAFA] font-[300] hover:text-[#0FABCA] hover:border-[#0FABCA] mt-2 transition-all duration-300 border-[#FAFAFA] text-[0.8rem] group border-b">
                        Shop Now
                    </button>
                </div>

                <img alt="product/image"
                     src="https://i.ibb.co.com/WxYLjFy/652e82cd70aa6522dd785109a455904c.png"
                     className="w-[130px] absolute top-[50%] left-[50%] transform translate-y-[-50%] translate-x-[-50%]"/>

            </div>

        </div>
    );
};

export default OfferGrid;
                    '/>
                    }
                </BlockWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"offer grid 3"} id={"offer_grid-3"}/>
                </div>

                <BlockDescription
                    text='Explore exclusive e-commerce offers in a sleek grid layout—top deals, big savings, and premium brands, all at your fingertips!'/>

                <BlockToggleTab preview={offerGrid3Preview} setPreview={setOfferGrid3Preview} code={offerGrid3Code}
                                setCode={setOfferGrid3Code}/>

                <BlockWrapper>
                    {offerGrid3Preview && (
                        <div className={`p-8  flex flex-wrap items-center gap-5 justify-center overflow-hidden`}>

                            <div className="grid grid-cols-1 1024px:grid-cols-4 w-full 1024px:h-[450px]">

                                <div
                                    className='col-span-1 1024px:col-span-2 overflow-hidden flex justify-between flex-col rounded-sm dark:bg-slate-900 dark:border-r dark:border-slate-700 dark:border-b row-span-1 1024px:row-span-2 bg-white h-[180px] 1024px:h-full py-8 relative'>

                                    <div
                                        className='px-8 absolute top-[50%] translate-y-[-50%] 1024px:right-7 z-20 w-full 1024px:w-[60%]'>
                                        <h4 className='text-[1.5rem] font-medium text-white 1024px:text-gray-900 dark:text-[#abc2d3]'>PlayStation
                                            5</h4>
                                        <p className='text-[0.8rem] dark:text-slate-400 mt-1 text-[#909090] font-[300]'>Incredibly
                                            powerful CPUs, GPUs, and an SSD with integrated I/O will redefine your
                                            PlayStation experience.</p>
                                    </div>

                                    <img alt='product/image'
                                         src='https://i.ibb.co.com/g9qmJxg/ps5-slim-goedkope-playstation-large-1.png'
                                         className='w-[230px] absolute -left-12 top-[50%] transform translate-y-[-50%]'/>
                                </div>

                                <div
                                    className='bg-[#EDEDED] dark:bg-slate-900 rounded-sm col-span-1 1024px:col-span-2 flex justify-between items-center px-4 overflow-hidden h-full row-span-3 relative'>

                                    <div className='p-4 1024px:pl-5 z-30 w-full 1024px:w-[60%]'>
                                        <h4 className='text-[2rem] font-[300] dark:text-[#abc2d3] text-gray-900'>Macbook <b
                                            className='text-gray-900 dark:text-[#abc2d3] font-semibold'>Air</b></h4>
                                        <p className='text-[0.8rem] dark:text-slate-400 mt-1 text-[#909090] font-[300]'>The
                                            new 15‑inch MacBook Air makes room for more of what you love with a spacious
                                            Liquid Retina display.</p>
                                        <button
                                            className='w-max py-2 px-6 rounded-md border border-gray-900 text-gray-900 text-[0.9rem] hover:bg-gray-900 dark:text-[#abc2d3] dark:border-slate-700 transition-all duration-300 hover:text-white mt-5'>
                                            Shop Now
                                        </button>
                                    </div>

                                    <img alt='product/image'
                                         src='https://i.ibb.co.com/JKqHn1w/Mac-Book-Pro-14.png'
                                         className='w-[100px] 1024px:w-[180px] absolute top-[50%] transform translate-y-[-50%] right-0'/>

                                </div>

                                <div
                                    className='overflow-hidden flex dark:bg-slate-900 justify-between flex-col rounded-sm bg-[#EDEDED] py-8 relative min-h-[140px]'>

                                    <div
                                        className='absolute top-[50%] transform translate-y-[-50%] right-6 z-200 w-[70%] 1024px:w-[50%] z-30'>
                                        <h4 className='text-[1.3rem] font-[300] dark:text-[#abc2d3] text-gray-900'>Apple <br/>
                                            AirPods <b className='font-semibold'>Max</b></h4>
                                        <p className='text-[0.8rem] mt-1 dark:text-slate-400 text-[#909090] font-[300]'>Computational
                                            audio. Listen, it's powerful</p>
                                    </div>

                                    <img alt='product/image'
                                         src='https://i.ibb.co.com/BKfpK5b/hero-gnfk5g59t0qe-xlarge-2x-1.png'
                                         className='w-[80px] absolute top-[50%] left-0 transform translate-y-[-50%]'/>
                                </div>

                                <div
                                    className='overflow-hidden flex justify-between flex-col rounded-sm bg-[#353535] py-8 relative min-h-[140px] h-full'>

                                    <div
                                        className='absolute top-[50%] translate-y-[-50%] right-6 z-20 w-[70%] 1024px:w-[50%]'>
                                        <h4 className='text-[1.1rem] font-[300] text-white'>Apple <br/>
                                            Vision <b className='font-semibold'>Pro</b></h4>
                                        <p className='text-[0.8rem] mt-1 text-[#909090] font-[300]'>An immersive way to
                                            experience entertainment</p>
                                    </div>

                                    <img alt='product/image'
                                         src='https://i.ibb.co.com/Bq7NGbQ/image-36-1.png'
                                         className='w-[100px] absolute left-0 top-[50%] transform translate-y-[-50%]'/>
                                </div>

                            </div>

                        </div>
                    )}

                    {offerGrid3Code && <BlocksShowCode code='
import React from "react";

const OfferGrid = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 w-full md:h-[450px]">

            {/* top left card */}
            <div
                className="col-span-1 md:col-span-2 overflow-hidden flex justify-between flex-col rounded-sm dark:bg-slate-900 dark:border-r dark:border-slate-700 dark:border-b row-span-1 md:row-span-2 bg-white h-[180px] md:h-full py-8 relative">

                <div className="px-8 absolute top-[50%] translate-y-[-50%] md:right-7 z-20 w-full md:w-[60%]">
                    <h4 className="text-[1.5rem] font-medium text-white md:text-gray-900 dark:text-[#abc2d3]">PlayStation
                        5</h4>
                    <p className="text-[0.8rem] dark:text-slate-400 mt-1 text-[#909090] font-[300]">Incredibly powerful
                        CPUs, GPUs, and an SSD with integrated I/O will redefine your PlayStation experience.</p>
                </div>

                <img alt="product/image"
                     src="https://i.ibb.co.com/g9qmJxg/ps5-slim-goedkope-playstation-large-1.png"
                     className="w-[230px] absolute -left-12 top-[50%] transform translate-y-[-50%]"/>
            </div>

            {/* right card with col span 2 */}
            <div
                className="bg-[#EDEDED] dark:bg-slate-900 rounded-sm col-span-1 md:col-span-2 flex justify-between items-center px-4 overflow-hidden h-full row-span-3 relative">

                <div className="p-4 md:pl-5 z-30 w-full md:w-[60%]">
                    <h4 className="text-[2rem] font-[300] dark:text-[#abc2d3] text-gray-900">Macbook <b
                        className="text-gray-900 dark:text-[#abc2d3] font-semibold">Air</b></h4>
                    <p className="text-[0.8rem] dark:text-slate-400 mt-1 text-[#909090] font-[300]">The new 15‑inch
                        MacBook Air makes room for more of what you love with a spacious Liquid Retina display.</p>
                    <button
                        className="w-max py-2 px-6 rounded-md border border-gray-900 text-gray-900 text-[0.9rem] hover:bg-gray-900 dark:text-[#abc2d3] dark:border-slate-700 transition-all duration-300 hover:text-white mt-5">
                        Shop Now
                    </button>
                </div>

                <img alt="product/image"
                     src="https://i.ibb.co.com/JKqHn1w/Mac-Book-Pro-14.png"
                     className="w-[100px] md:w-[180px] absolute top-[50%] transform translate-y-[-50%] right-0"/>

            </div>

            {/* left bottom first card */}
            <div
                className="overflow-hidden flex dark:bg-slate-900 justify-between flex-col rounded-sm bg-[#EDEDED] py-8 relative min-h-[140px]">

                <div
                    className="absolute top-[50%] transform translate-y-[-50%] right-6 z-200 w-[70%] md:w-[50%] z-30">
                    <h4 className="text-[1.3rem] font-[300] dark:text-[#abc2d3] text-gray-900">Apple <br/>
                        AirPods <b className="font-semibold">Max</b></h4>
                    <p className="text-[0.8rem] mt-1 dark:text-slate-400 text-[#909090] font-[300]">Computational audio.
                        Listen, it"s powerful</p>
                </div>

                <img alt="product/image"
                     src="https://i.ibb.co.com/BKfpK5b/hero-gnfk5g59t0qe-xlarge-2x-1.png"
                     className="w-[80px] absolute top-[50%] left-0 transform translate-y-[-50%]"/>
            </div>

            {/* left bottom second card */}
            <div
                className="overflow-hidden flex justify-between flex-col rounded-sm bg-[#353535] py-8 relative min-h-[140px] h-full">

                <div className="absolute top-[50%] translate-y-[-50%] right-6 z-20 w-[70%] md:w-[50%]">
                    <h4 className="text-[1.1rem] font-[300] text-white">Apple <br/>
                        Vision <b className="font-semibold">Pro</b></h4>
                    <p className="text-[0.8rem] mt-1 text-[#909090] font-[300]">An immersive way to experience
                        entertainment</p>
                </div>

                <img alt="product/image"
                     src="https://i.ibb.co.com/Bq7NGbQ/image-36-1.png"
                     className="w-[100px] absolute left-0 top-[50%] transform translate-y-[-50%]"/>
            </div>

        </div>
    );
};

export default OfferGrid;
                    '/>
                    }
                </BlockWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"offer grid 4"} id={"offer_grid_4"}/>
                </div>

                <BlockDescription
                    text='Explore exclusive e-commerce offers in a sleek grid layout—top deals, big savings, and premium brands, all at your fingertips!'/>

                <BlockToggleTab preview={offerGrid4Preview} setPreview={setOfferGrid4Preview} code={offerGrid4Code}
                                setCode={setOfferGrid4Code}/>

                <BlockWrapper>
                    {offerGrid4Preview && (
                        <div className={`p-8  flex flex-wrap items-center gap-5 justify-center overflow-hidden`}>

                            <div className='grid grid-cols-1 1024px:grid-cols-2 rounded-md'>

                                <img alt='product/image' src='https://i.ibb.co.com/wpZ3Vhc/Paste-image.png'
                                     className='w-full h-full rounded-t-md 1024px:rounded-l-md'/>

                                <div className='bg-[#ffd37c] rounded-b-md 1024px:rounded-r-md p-5 1024px:p-12'>
                                    <span className='text-[0.9rem] font-semibold text-blue-600'>PROMOTION</span>
                                    <h4 className='text-[1.5rem] 1024px:text-[1.8rem] font-medium mt-2'>Hurry up! 40%
                                        OFF</h4>
                                    <p className='text-[0.9rem] font-normal text-gray-900 mt-2'>Thousands of high tech
                                        are waiting for you</p>

                                    <div className='mt-5'>
                                        <p className='text-[0.9rem] font-normal text-gray-900'>Offer expires in:</p>
                                        <div className='flex items-center gap-[10px] mt-2'>
                                            <div className='flex items-center justify-center flex-col'>
                                                <h5 className='py-1.5 1024px:py-2 px-2.5 1024px:px-3 bg-white rounded-sm text-[1.3rem] font-semibold'>{formatNumber(timeLeft.days)}</h5>
                                                <span className='text-[0.7rem]'>Days</span>
                                            </div>
                                            <div className='flex items-center justify-center flex-col'>
                                                <h5 className='py-1.5 1024px:py-2 px-2.5 1024px:px-3 bg-white rounded-sm text-[1.3rem] font-semibold'>{formatNumber(timeLeft.hours)}</h5>
                                                <span className='text-[0.7rem]'>Hours</span>
                                            </div>
                                            <div className='flex items-center justify-center flex-col'>
                                                <h5 className='py-1.5 1024px:py-2 px-2.5 1024px:px-3 bg-white rounded-sm text-[1.3rem] font-semibold'>{formatNumber(timeLeft.minutes)}</h5>
                                                <span className='text-[0.7rem]'>Minutes</span>
                                            </div>
                                            <div className='flex items-center justify-center flex-col'>
                                                <h5 className='py-1.5 1024px:py-2 px-2.5 1024px:px-3 bg-white rounded-sm text-[1.3rem] font-semibold'>{formatNumber(timeLeft.seconds)}</h5>
                                                <span className='text-[0.7rem]'>Seconds</span>
                                            </div>
                                        </div>
                                    </div>

                                    <button className='py-2 px-6 rounded-md bg-black text-white mt-5 text-[1rem]'>Shop
                                        Now
                                    </button>
                                </div>

                            </div>

                        </div>
                    )}

                    {offerGrid4Code && <BlocksShowCode code='
import React, {useEffect, useState} from "react";

const OfferGrid = () => {

    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });
    const targetDate = "2024-12-31T23:59:59"

    useEffect(() => {
        const calculateTimeLeft = () => {
            const difference = new Date(targetDate) - new Date();

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    minutes: Math.floor((difference / 1000 / 60) % 60),
                    seconds: Math.floor((difference / 1000) % 60)
                });
            }
        };

        const timer = setInterval(calculateTimeLeft, 1000);
        calculateTimeLeft();

        return () => clearInterval(timer);
    }, [targetDate]);

    const formatNumber = (number) => number.toString().padStart(2, "0");

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 rounded-md">

            <img alt="product/image" src="https://i.ibb.co.com/wpZ3Vhc/Paste-image.png"
                 className="w-full h-full rounded-t-md lg:rounded-l-md"/>

            <div className="bg-[#ffd37c] rounded-b-md lg:rounded-r-md p-5 lg:p-12">
                <span className="text-[0.9rem] font-semibold text-blue-600">PROMOTION</span>
                <h4 className="text-[1.5rem] lg:text-[1.8rem] font-medium mt-2">Hurry up! 40% OFF</h4>
                <p className="text-[0.9rem] font-normal text-gray-900 mt-2">Thousands of high tech
                    are waiting for you</p>

                <div className="mt-5">
                    <p className="text-[0.9rem] font-normal text-gray-900">Offer expires in:</p>
                    <div className="flex items-center gap-[10px] mt-2">
                        <div className="flex items-center justify-center flex-col">
                            <h5 className="py-1.5 lg:py-2 px-2.5 lg:px-3 bg-white rounded-sm text-[1.3rem] font-semibold">{formatNumber(timeLeft.days)}</h5>
                            <span className="text-[0.7rem]">Days</span>
                        </div>
                        <div className="flex items-center justify-center flex-col">
                            <h5 className="py-1.5 lg:py-2 px-2.5 lg:px-3 bg-white rounded-sm text-[1.3rem] font-semibold">{formatNumber(timeLeft.hours)}</h5>
                            <span className="text-[0.7rem]">Hours</span>
                        </div>
                        <div className="flex items-center justify-center flex-col">
                            <h5 className="py-1.5 lg:py-2 px-2.5 lg:px-3 bg-white rounded-sm text-[1.3rem] font-semibold">{formatNumber(timeLeft.minutes)}</h5>
                            <span className="text-[0.7rem]">Minutes</span>
                        </div>
                        <div className="flex items-center justify-center flex-col">
                            <h5 className="py-1.5 lg:py-2 px-2.5 lg:px-3 bg-white rounded-sm text-[1.3rem] font-semibold">{formatNumber(timeLeft.seconds)}</h5>
                            <span className="text-[0.7rem]">Seconds</span>
                        </div>
                    </div>
                </div>

                <button className="py-2 px-6 rounded-md bg-black text-white mt-5 text-[1rem]">Shop Now</button>
            </div>

        </div>
    );
};

export default OfferGrid;
                    '/>
                    }
                </BlockWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"offer grid 5"} id={"offer_grid_5"}/>
                </div>

                <BlockDescription
                    text='Explore exclusive e-commerce offers in a sleek grid layout—top deals, big savings, and premium brands, all at your fingertips!'/>

                <BlockToggleTab preview={offerGrid5Preview} setPreview={setOfferGrid5Preview} code={offerGrid5Code}
                                setCode={setOfferGrid5Code}/>

                <BlockWrapper>
                    {offerGrid5Preview && (
                        <div className={`p-8  flex flex-wrap items-center gap-5 justify-center overflow-hidden`}>

                            <div
                                className='flex flex-col 1024px:flex-row justify-between items-center w-full 1024px:py-4 py-6 px-6 1024px:px-8 gap-[20px] 1024px:gap-0 rounded-md bg-[#FFE7D6]'>

                                <div className='w-full 1024px:w-[30%] 1024px:pl-6'>

                                    <span
                                        className='bg-[#2DA5F3] rounded-sm py-1.5 px-3 text-[0.8rem] font-normal text-white'>SAVE UP TO $200.00</span>

                                    <h4 className='text-[1.7rem] 1024px:text-[2rem] mt-2 font-semibold text-gray-800'>Macbook
                                        Pro</h4>

                                    <p className='text-[1rem] mt-2 1024px:mt-3 text-gray-700'>Apple M1 Max Chip. 32GB
                                        Unified Memory, 1TB SSD Storage</p>

                                    <button
                                        className='bg-[#FA8232] flex items-center gap-[10px] py-2 px-4 rounded-sm text-white text-[0.9rem] mt-3 uppercase group'>
                                        Shop Now
                                        <HiArrowRight className='group-hover:ml-1 transition-all duration-200'/>
                                    </button>
                                </div>

                                <div className='relative'>

                                    <p className='bg-[#FFCEAD] text-gray-900 p-4 rounded-full w-[80px] h-[80px] flex items-center justify-center font-medium border-4 border-white absolute top-1 1024px:top-3 -left-3'>$1999</p>

                                    <img alt='product/image' src='https://i.ibb.co.com/zSm0TRR/Image-6.png'
                                         className='w-[350px] rounded-l-md'/>

                                </div>

                            </div>

                        </div>
                    )}

                    {offerGrid5Code && <BlocksShowCode code='
import React from "react";

// react icons
import {HiArrowRight} from "react-icons/hi";

const OfferGrid = () => {

    return (
        <div className="flex flex-col lg:flex-row justify-between items-center w-full lg:py-4 py-6 px-6 lg:px-8 gap-[20px] lg:gap-0 rounded-md bg-[#FFE7D6]">

            <div className="w-full lg:w-[30%] lg:pl-6">

                <span className="bg-[#2DA5F3] rounded-sm py-1.5 px-3 text-[0.8rem] font-normal text-white">SAVE UP TO $200.00</span>

                <h4 className="text-[1.7rem] lg:text-[2rem] mt-2 font-semibold text-gray-800">Macbook Pro</h4>

                <p className="text-[1rem] mt-2 lg:mt-3 text-gray-700">Apple M1 Max Chip. 32GB Unified Memory, 1TB SSD Storage</p>

                <button
                    className="bg-[#FA8232] flex items-center gap-[10px] py-2 px-4 rounded-sm text-white text-[0.9rem] mt-3 uppercase group">
                    Shop Now
                    <HiArrowRight className="group-hover:ml-1 transition-all duration-200"/>
                </button>
            </div>

            <div className="relative">

                <p className="bg-[#FFCEAD] text-gray-900 p-4 rounded-full w-[80px] h-[80px] flex items-center justify-center font-medium border-4 border-white absolute top-1 lg:top-3 -left-3">$1999</p>

                <img alt="product/image" src="https://i.ibb.co.com/zSm0TRR/Image-6.png"
                     className="w-[350px] rounded-l-md"/>

            </div>

        </div>
    );
};

export default OfferGrid;
                    '/>
                    }
                </BlockWrapper>

                <BlocksFooter backUrl='/blocks/empty-page' backName='empty page'
                              forwardUrl='/blocks/product-details-page' forwardName='product details page'/>
            </div>


            <Helmet>
                <title>Blocks - Offer Grid</title>
            </Helmet>
        </aside>
    );
};

export default OfferGrid;
