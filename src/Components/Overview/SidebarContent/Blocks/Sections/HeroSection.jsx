import React, {useState} from "react";

// components
import ContentHeader from "@shared/ContentHeader";
import {Helmet} from "react-helmet";
import BlocksShowCode from "@shared/Block/BlocksShowCode.jsx";

// icons
import {FaPlay} from "react-icons/fa";
import {CiSearch} from "react-icons/ci";
import BlocksFooter from "@shared/Block/BlocksFooter.jsx";
import {FaCircleCheck} from "react-icons/fa6";

import BlockDescription from "@shared/Block/BlockDescription.jsx";
import BlockToggleTab from "@shared/Block/BlockToggleTab.jsx";
import BlockWrapper from "@shared/Block/BlockWrapper.jsx";

const ResponsiveNavbar = () => {

    const [heroSection1Preview, setHeroSection1Preview] = useState(true);
    const [heroSection1Code, setHeroSection1Code] = useState(false);

    const [heroSection2Preview, setHeroSection2Preview] = useState(true);
    const [heroSection2Code, setHeroSection2Code] = useState(false);

    const [heroSection3Preview, setHeroSection3Preview] = useState(true);
    const [heroSection3Code, setHeroSection3Code] = useState(false);

    const [heroSection4Preview, setHeroSection4Preview] = useState(true);
    const [heroSection4Code, setHeroSection4Code] = useState(false);

    const [heroSection5Preview, setHeroSection5Preview] = useState(true);
    const [heroSection5Code, setHeroSection5Code] = useState(false);

    const [heroSection6Preview, setHeroSection6Preview] = useState(true);
    const [heroSection6Code, setHeroSection6Code] = useState(false);

    return (
        <aside className="flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10">
            <div>
                <ContentHeader text={"Hero Section 1"} id={"hero_section_1"}/>

                <BlockDescription
                    text=" A prominent section at the top of a webpage, typically featuring a large image or video, headline, and a call-to-action button, designed to grab attention and introduce the site's main content or purpose."/>

                <BlockToggleTab preview={heroSection1Preview} code={heroSection1Code} setCode={setHeroSection1Code}
                                setPreview={setHeroSection1Preview}/>

                <BlockWrapper>
                    {heroSection1Preview && (
                        <div className={`p-8  flex flex-wrap items-center gap-5 justify-center overflow-hidden`}>
                            <div className='w-full bg-[#DED3CA] h-full p-8 rounded-md'>

                                {/* header */}
                                <header
                                    className='flex 1260px:flex-row flex-col gap-[50px] 1260px:gap-0 items-center 1260px:mt-3'>
                                    <div>
                                        <h1 className='text-[40px] 1260px:text-[60px] leading-[45px] 1260px:leading-[65px] 1260px:text-start text-center'>Be
                                            fashionable with Barner Glasses</h1>
                                        <p className='text-[16px] mt-2 1260px:text-start text-center'>Revolutionizing
                                            the eyewear industry in the country with its omni-channel approach.</p>

                                        <div
                                            className='flex items-center flex-wrap 1260px:justify-start justify-center gap-[20px] mt-6'>
                                            <button
                                                className="px-6 min-w-fit py-[1px] bg-black rounded-md flex items-center gap-[12px]">
                                                <img src='https://i.ibb.co/Tgmf5Nr/images-3.png'
                                                     alt='apple logo'
                                                     className='w-[28px]'/>
                                                <div>
                                                    <span className='text-[0.6rem] font-[500] text-secondary'>Download on the</span>
                                                    <h3 className='text-[1.2rem] font-[500] leading-[20px] mb-2 text-secondary'>AppStore</h3>
                                                </div>
                                            </button>

                                            <button
                                                className="px-4 min-w-fit py-1.5 bg-black rounded-md flex items-center gap-[15px]">
                                                <img src='https://i.ibb.co/s9dSrDs/download-2-removebg-preview-1.png'
                                                     alt='playstore logo'
                                                     className='w-[25px]'/>
                                                <div className='flex items-start flex-col'>
                                                    <span
                                                        className='text-[0.6rem] font-[500] text-secondary'>Get it on</span>
                                                    <h3 className='text-[1.2rem] font-[500] leading-[20px] mb-2 text-secondary'>Google
                                                        Play</h3>
                                                </div>
                                            </button>
                                        </div>
                                    </div>

                                    {/* image */}
                                    <img src='https://i.ibb.co/JRRBNHr/Group-144.png' alt='image'
                                         className='w-full 1260px:w-[55%]'/>
                                </header>
                            </div>
                        </div>
                    )}

                    {heroSection1Code && <BlocksShowCode code='
import React from "react";

const HeroSection = () => {

    return (
        <div className="w-full bg-[#DED3CA] h-full p-8 rounded-md">

            {/* Main */}
            <header className="flex lg:flex-row flex-col gap-[50px] lg:gap-0 items-center lg:mt-3">
                <div>
                    <h1 className="text-[40px] lg:text-[60px] leading-[45px] lg:leading-[65px] lg:text-start text-center">Be
                        fashionable with Barner Glasses</h1>
                    <p className="text-[16px] mt-2 lg:text-start text-center">Revolutionizing the eyewear industry
                        in the country with its omni-channel approach.</p>

                    <div className="flex items-center flex-wrap lg:justify-start justify-center gap-[20px] mt-6">
                        <button
                            className="px-6 min-w-fit py-[1px] bg-black rounded-md flex items-center gap-[12px]">
                            <img src="https://i.ibb.co/Tgmf5Nr/images-3.png"
                                 alt="apple logo"
                                 className="w-[28px]"/>
                            <div>
                                <span className="text-[0.6rem] font-[500] text-secondary">Download on the</span>
                                <h3 className="text-[1.2rem] font-[500] leading-[20px] mb-2 text-secondary">AppStore</h3>
                            </div>
                        </button>

                        <button
                            className="px-4 min-w-fit py-1.5 bg-black rounded-md flex items-center gap-[15px]">
                            <img src="https://i.ibb.co/s9dSrDs/download-2-removebg-preview-1.png"
                                 alt="playstore logo"
                                 className="w-[25px]"/>
                            <div className="flex items-start flex-col">
                                <span className="text-[0.6rem] font-[500] text-secondary">Get it on</span>
                                <h3 className="text-[1.2rem] font-[500] leading-[20px] mb-2 text-secondary">Google
                                    Play</h3>
                            </div>
                        </button>
                    </div>
                </div>

                {/* image */}
                <img src="https://i.ibb.co/JRRBNHr/Group-144.png" alt="image" className="w-full lg:w-[55%]"/>
            </header>
        </div>
    );
};

export default HeroSection;
                    '/>
                    }
                </BlockWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"Hero Section 2"} id={"hero_section_2"}/>
                </div>

                <BlockDescription
                    text="A prominent section at the top of a webpage, typically featuring a large image or video, headline, and a call-to-action button, designed to grab attention and introduce the site's main content or purpose."/>

                <BlockToggleTab preview={heroSection1Preview} code={heroSection2Code}
                                setPreview={setHeroSection2Preview} setCode={setHeroSection2Code}/>

                <BlockWrapper>
                    {heroSection2Preview && (
                        <div className={`p-8 flex flex-wrap items-center gap-5 justify-center overflow-hidden`}>

                            <div className='w-full h-full rounded-md'
                                 style={{backgroundImage: "url('https://i.ibb.co/x1rvpZs/0f-Y6ep3cd1c.png')"}}>

                                {/* header */}
                                <header
                                    className='flex 1260px:flex-row flex-col gap-[50px] 1260px:gap-0 items-center 1260px:mt-3'>
                                    <div className='px-8 mt-8 1260px:mt-0 w-full 1260px:w-[50%]'>
                                        <h1 className='text-[40px] 1260px:text-[60px] leading-[45px] 1260px:leading-[65px] dark:text-[#abc2d3] font-[500]'>Helping
                                            you sell
                                            your products
                                            faster</h1>
                                        <p className='text-[16px] dark:text-[#abc2d3] mt-2'>You can read this text, but
                                            it doesn’t matter. It’s concept, not important for your life or life your
                                            friends</p>

                                        <div className='flex items-center flex-wrap gap-[20px] mt-6'>
                                            <button
                                                className='py-2 px-6 min-w-fit bg-black text-white rounded-full hover:bg-transparent dark:border-slate-700 dark:text-[#abc2d3] dark:hover:bg-slate-900 dark:hover:text-[#abc2d3] dark:hover:border-slate-700 hover:border-black hover:text-black transition-all duration-200 border'>Get
                                                Started
                                            </button>

                                            <button
                                                className='bg-gray-200 dark:bg-slate-900 dark:text-[#abc2d3] min-w-fit rounded-full py-1.5 px-2 flex items-center gap-[10px] '>
                                                <FaPlay
                                                    className='text-white dark:text-[#abc2d3] dark:bg-slate-800 bg-black rounded-full py-2 text-[2rem]'/>
                                                How to set up a shop
                                            </button>
                                        </div>
                                    </div>

                                    {/* image */}
                                    <div className='w-full 1260px:w-[50%]'>
                                        <img
                                            src='https://i.ibb.co/kGnQZJ5/free-iphone-12-mini-mockup-scene-1-removebg-preview.png'
                                            alt='image' className='w-full'/>
                                    </div>
                                </header>
                            </div>
                        </div>
                    )}

                    {heroSection2Code && <BlocksShowCode code='
import React from "react";

// react icons
import {FaPlay} from "react-icons/fa";

const HeroSection = () => {

    return (
        <div className="w-full h-full rounded-md"
             style={{backgroundImage: "url("https://i.ibb.co/x1rvpZs/0f-Y6ep3cd1c.png")"}}>

            {/* header */}
            <header className="flex lg:flex-row flex-col gap-[50px] lg:gap-0 items-center lg:mt-3">
                <div className="px-8 mt-8 lg:mt-0 w-full lg:w-[50%]">
                    <h1 className="text-[40px] lg:text-[60px] leading-[45px] dark:text-[#abc2d3] lg:leading-[65px] font-[500]">Helping
                        you sell
                        your products
                        faster</h1>
                    <p className="text-[16px] dark:text-[#abc2d3] mt-2">You can read this text, but it doesn’t matter. It’s concept, not
                        important for your life or life your friends</p>

                    <div className="flex items-center flex-wrap gap-[20px] mt-6">
                        <button
                            className="py-2 px-6 min-w-fit bg-black text-white rounded-full hover:bg-transparent dark:border-slate-700 dark:text-[#abc2d3] dark:hover:bg-slate-900 dark:hover:text-[#abc2d3] dark:hover:border-slate-700 hover:border-black hover:text-black transition-all duration-200 border">Get
                            Started
                        </button>

                        <button
                            className="bg-gray-200 min-w-fit dark:bg-slate-900 dark:text-[#abc2d3] rounded-full py-1.5 px-2 flex items-center gap-[10px] ">
                            <FaPlay className="text-white bg-black dark:text-[#abc2d3] dark:bg-slate-800 rounded-full py-2 text-[2rem]"/>
                            How to set up a shop
                        </button>
                    </div>
                </div>

                {/* image */}
                <div className="w-full lg:w-[50%]">
                    <img
                        src="https://i.ibb.co/kGnQZJ5/free-iphone-12-mini-mockup-scene-1-removebg-preview.png"
                        alt="image" className="w-full"/>
                </div>
            </header>
        </div>
    );
};

export default HeroSection;
                    '/>
                    }
                </BlockWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"Hero Section 3"} id={"hero_section_3"}/>
                </div>

                <BlockDescription
                    text="A prominent section at the top of a webpage, typically featuring a large image or video, headline, and a call-to-action button, designed to grab attention and introduce the site's main content or purpose."/>

                <BlockToggleTab preview={heroSection3Preview} code={heroSection3Code} setCode={setHeroSection3Code}
                                setPreview={setHeroSection3Preview}/>

                <BlockWrapper>
                    {heroSection3Preview && (
                        <div className={`p-8  flex flex-wrap items-center gap-5 justify-center overflow-hidden`}>
                            <div className='w-full h-full rounded-md' style={{
                                backgroundImage: "url('https://i.ibb.co/N1n4Pd0/michael-frattaroli-207280-unsplash.png')",
                                backgroundSize: 'cover'
                            }}>

                                {/* header */}
                                <header
                                    className='flex 1260px:flex-row flex-col gap-[50px] 1260px:gap-0 items-center 1260px:mt-3'>
                                    <div className='p-8 pb-[100px] w-full 1260px:w-[50%]'>
                                        <h1 className='text-[40px] 1260px:text-[60px] leading-[45px] 1260px:leading-[65px] dark:text-[#abc2d3] font-[500]'>Be
                                            fashionable this summer</h1>
                                        <p className='text-[16px] dark:text-[#abc2d3] mt-2'>We arranged a liquidation
                                            before the start of the season. Buy summer clothes now with a 50%
                                            discount</p>

                                        <div className='flex items-center flex-wrap gap-[20px] mt-6'>
                                            <button
                                                className='py-2 px-6 min-w-fit bg-[#64BCAE] text-white rounded-full hover:bg-transparent dark:border-slate-700 hover:border-[#64BCAE] hover:text-[#64BCAE] transition-all duration-200 border'>Catalog
                                            </button>

                                            <button
                                                className='bg-gray-200 dark:bg-slate-800 dark:text-[#abc2d3] min-w-fit rounded-full py-1.5 px-2 flex items-center gap-[10px] '>
                                                <FaPlay
                                                    className='text-white bg-[#64BCAE] rounded-full py-2 text-[2rem]'/>
                                                See video about collection
                                            </button>
                                        </div>
                                    </div>
                                </header>
                            </div>
                        </div>
                    )}

                    {heroSection3Code && <BlocksShowCode code='
import React from "react";

// react icons
import {FaPlay} from "react-icons/fa";

const HeroSection = () => {

    return (
        <div className="w-full h-full rounded-md" style={{
            backgroundImage: "url("https://i.ibb.co/N1n4Pd0/michael-frattaroli-207280-unsplash.png")",
            backgroundSize: "cover"
        }}>

            {/* header */}
            <header className="flex lg:flex-row flex-col gap-[50px] lg:gap-0 items-center lg:mt-3">
                <div className="p-8 pb-[100px] w-full lg:w-[50%]">
                    <h1 className="text-[40px] lg:text-[60px] dark:text-[#abc2d3] leading-[45px] lg:leading-[65px] font-[500]">Be
                        fashionable this summer</h1>
                    <p className="text-[16px] dark:text-[#abc2d3] mt-2">We arranged a liquidation before the start of the season. Buy summer
                        clothes now with a 50% discount</p>

                    <div className="flex items-center flex-wrap gap-[20px] mt-6">
                        <button
                            className="py-2 px-6 min-w-fit dark:border-slate-700 bg-[#64BCAE] text-white rounded-full hover:bg-transparent hover:border-[#64BCAE] hover:text-[#64BCAE] transition-all duration-200 border">Catalog
                        </button>

                        <button
                            className="bg-gray-200 min-w-fit dark:bg-slate-800 dark:text-[#abc2d3] rounded-full py-1.5 px-2 flex items-center gap-[10px] ">
                            <FaPlay className="text-white bg-[#64BCAE] rounded-full py-2 text-[2rem]"/>
                            See video about collection
                        </button>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default HeroSection;
                    '/>
                    }
                </BlockWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"Hero Section 3"} id={"hero_section_3"}/>
                </div>

                <BlockDescription
                    text="A prominent section at the top of a webpage, typically featuring a large image or video, headline, and a call-to-action button, designed to grab attention and introduce the site's main content or purpose."/>

                <BlockToggleTab preview={heroSection4Preview} setPreview={setHeroSection4Preview}
                                setCode={setHeroSection4Code} code={heroSection4Code}/>

                <BlockWrapper>
                    {heroSection4Preview && (
                        <div className={`p-8  flex flex-wrap items-center gap-5 justify-center overflow-hidden`}>
                            <div className='w-full h-full bg-[#EAFCFC] dark:bg-green-500/20 rounded-md' style={{
                                backgroundImage: "url('https://i.ibb.co/ZN2tbvw/Happy-smiling-man-riding-kick-scooter-on-sidewalk-1.png')",
                                backgroundSize: 'cover'
                            }}>

                                {/* header */}
                                <header className='flex items-center justify-center flex-col mt-12 pb-[300px]'>
                                    <div className='relative w-[90%] 1260px:w-[80%]'>
                                        <input placeholder='Type your destination'
                                               className='bg-white shadow-md w-full py-3 pl-4 rounded-md dark:bg-green-800/30 dark:border dark:border-green-700/50 dark:placeholder:text-slate-500 dark:text-[#abc2d3] outline-none pr-[100px]'/>
                                        <button
                                            className='py-2 px-4 dark:border-green-700/50 bg-[#3C8F7C] text-white rounded-md absolute top-[4px] right-1 hover:text-[#3C8F7C] hover:bg-transparent hover:border-[#3C8F7C] dark:hover:border-green-700/50 border transition-all duration-200'>Search
                                        </button>
                                    </div>

                                    <h1 className='text-[30px] dark:text-green-600 font-[500] text-center 1260px:text-start text-[#3C8F7C] mt-7'>
                                        Exploring a new city is easier now
                                    </h1>
                                </header>
                            </div>
                        </div>
                    )}

                    {heroSection4Code && <BlocksShowCode code='
import React from "react";

const HeroSection = () => {

    return (
        <div className="w-full h-full bg-[#EAFCFC] dark:bg-green-500/20 rounded-md" style={{
            backgroundImage: "url("https://i.ibb.co/ZN2tbvw/Happy-smiling-man-riding-kick-scooter-on-sidewalk-1.png")",
            backgroundSize: "cover"
        }}>

            {/* header */}
            <header className="flex items-center justify-center flex-col mt-12 pb-[300px]">
                <div className="relative w-[90%] lg:w-[80%]">
                    <input placeholder="Type your destination"
                           className="bg-white dark:bg-green-800/30 dark:border dark:border-green-700/50 dark:placeholder:text-slate-500 dark:text-[#abc2d3] shadow-md w-full py-3 pl-4 rounded-md outline-none pr-[100px]"/>
                    <button
                        className="py-2 px-4 dark:border-green-700/50  bg-[#3C8F7C] text-white rounded-md absolute top-[4px] right-1 dark:hover:border-green-700/50 hover:text-[#3C8F7C] hover:bg-transparent hover:border-[#3C8F7C] border transition-all duration-200">Search
                    </button>
                </div>

                <h1 className="text-[30px] dark:text-green-600 font-[500] text-center lg:text-start text-[#3C8F7C] mt-7">
                    Exploring a new city is easier now
                </h1>
            </header>
        </div>
    );
};

export default HeroSection;
                    '/>
                    }
                </BlockWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"Hero Section 4"} id={"hero_section_4"}/>
                </div>

                <BlockDescription
                    text="A prominent section at the top of a webpage, typically featuring a large image or video, headline, and a call-to-action button, designed to grab attention and introduce the site's main content or purpose."/>

                <BlockToggleTab preview={heroSection5Preview} code={heroSection5Code} setCode={setHeroSection5Code}
                                setPreview={setHeroSection5Preview}/>

                <BlockWrapper>
                    {heroSection5Preview && (
                        <div className={`p-8  flex flex-wrap items-center gap-5 justify-center overflow-hidden`}>
                            <div className='w-full h-full bg-[#FBFBFB] dark:bg-slate-900 rounded-md'>

                                {/* header */}
                                <header
                                    className='flex 1260px:flex-row flex-col gap-[50px] 1260px:gap-10 items-center p-8'>
                                    <div className='w-full 1260px:w-[55%]'>
                                        <h1 className='text-[40px] dark:text-[#abc2d3] 640px:text-[60px] font-[600] leading-[45px] 640px:leading-[70px]'>Let
                                            your <span className='text-[#F38160]'>groceries</span> come to you</h1>
                                        <p className='text-[18px] dark:text-slate-400 text-gray-400 mt-2'>Get fresh
                                            groceries online without stepping out to make delicious food with the
                                            freshest ingredients</p>
                                        <div className='relative my-5'>
                                            <input placeholder='Search here'
                                                   className='py-3 px-4 w-full outline-none rounded-md dark:text-[#abc2d3] dark:placeholder:text-slate-500 dark:bg-transparent dark:border-slate-700 dark:border bg-gray-100'/>
                                            <button
                                                className='h-full absolute top-0 right-0 bg-[#F38160] px-3 text-white text-[1.3rem] rounded-r-md'>
                                                <CiSearch/></button>
                                        </div>

                                        <div
                                            className='grid grid-cols-1 400px:grid-cols-2 gap-[15px] w-full 640px:w-[80%]'>
                                            <p className='flex items-center gap-[5px] dark:text-slate-400 text-gray-400 text-[1rem]'>
                                                <FaCircleCheck className='text-[#F0B70D] text-[1.2rem]'/>
                                                Fresh Vegetables
                                            </p>
                                            <p className='flex items-center gap-[5px] dark:text-slate-400 text-gray-400 text-[1rem]'>
                                                <FaCircleCheck className='text-[#F0B70D] text-[1.2rem]'/>
                                                100% Guarantee
                                            </p>
                                            <p className='flex items-center gap-[5px] dark:text-slate-400 text-gray-400 text-[1rem]'>
                                                <FaCircleCheck className='text-[#F0B70D] text-[1.2rem]'/>
                                                Cash on Delivery
                                            </p>
                                            <p className='flex items-center gap-[5px] dark:text-slate-400 text-gray-400 text-[1rem]'>
                                                <FaCircleCheck className='text-[#F0B70D] text-[1.2rem]'/>
                                                Fast Delivery
                                            </p>
                                        </div>
                                    </div>

                                    <div className='w-full 640px:w-[40%]'>
                                        <img
                                            src='https://i.ibb.co/61R7zbv/delivery-concept-handsome-african-american-deliver-AZUZTZ3-1.png'
                                            alt='image' className='w-full h-full'/>
                                    </div>
                                </header>

                                <section
                                    className='p-8 mt-16 grid 640px:grid-cols-2 grid-cols-1 1260px:grid-cols-4 gap-[25px] flex-wrap'>
                                    <div>
                                        <img src='https://i.ibb.co/XCM2bhM/Baby-food.png' alt='icon'
                                             className='w-[60px]'/>
                                        <h4 className='text-[18px] dark:text-[#abc2d3] font-[500]'>Honey</h4>
                                        <p className='text-[14px] dark:text-slate-400 leading-[18px] text-gray-400 font-[300]'>Lorem
                                            ipsum
                                            dolor sit amet, consectetur adipiscing elit.</p>
                                    </div>

                                    <div>
                                        <img src='https://i.ibb.co/J5Yd3cZ/Condiments.png' alt='icon'
                                             className='w-[60px]'/>
                                        <h4 className='text-[18px] dark:text-[#abc2d3] font-[500]'>Spices &
                                            Seasonings</h4>
                                        <p className='text-[14px] dark:text-slate-400 leading-[18px] text-gray-400 font-[300]'>Lorem
                                            ipsum
                                            dolor sit amet, consectetur adipiscing elit.</p>
                                    </div>

                                    <div>
                                        <img src='https://i.ibb.co/h2R9kny/Dairy.png' alt='icon'
                                             className='w-[60px]'/>
                                        <h4 className='text-[18px] dark:text-[#abc2d3] font-[500]'>Dairy Products</h4>
                                        <p className='text-[14px] dark:text-slate-400 leading-[18px] text-gray-400 font-[300]'>Lorem
                                            ipsum
                                            dolor sit amet, consectetur adipiscing elit.</p>
                                    </div>

                                    <div>
                                        <img src='https://i.ibb.co/HYHZfHQ/Grain-and-pasta.png' alt='icon'
                                             className='w-[60px]'/>
                                        <h4 className='text-[18px] dark:text-[#abc2d3] font-[500]'>Flour</h4>
                                        <p className='text-[14px] dark:text-slate-400 leading-[18px] text-gray-400 font-[300]'>Lorem
                                            ipsum
                                            dolor sit amet, consectetur adipiscing elit.</p>
                                    </div>

                                    <div>
                                        <img src='https://i.ibb.co/y5ZTLHv/Fruits-and-vegetables.png' alt='icon'
                                             className='w-[60px]'/>
                                        <h4 className='text-[18px] dark:text-[#abc2d3] font-[500]'>Vegetables &
                                            Fruits</h4>
                                        <p className='text-[14px] dark:text-slate-400 leading-[18px] text-gray-400 font-[300]'>Lorem
                                            ipsum
                                            dolor sit amet, consectetur adipiscing elit.</p>
                                    </div>

                                </section>
                            </div>
                        </div>
                    )}

                    {heroSection5Code && <BlocksShowCode code='
import React from "react";

// react icons
import {CiSearch} from "react-icons/ci";
import {FaCircleCheck} from "react-icons/fa6";

const HeroSection = () => {

    return (
        <div className="w-full h-full bg-[#FBFBFB] rounded-md">

            {/* header */}
            <header className="flex lg:flex-row flex-col gap-[50px] lg:gap-10 items-center p-8">
                <div className="w-full lg:w-[55%]">
                    <h1 className="text-[40px] dark:text-[#abc2d3] sm:text-[60px] font-[600] leading-[45px] sm:leading-[70px]">Let
                        your <span className="text-[#F38160]">groceries</span> come to you</h1>
                    <p className="text-[18px] text-gray-400 dark:text-slate-400 mt-2">Get fresh groceries online without stepping out to
                        make delicious food with the freshest ingredients</p>
                    <div className="relative my-5">
                        <input placeholder="Search here"
                               className="py-3 px-4 dark:text-[#abc2d3] dark:placeholder:text-slate-500 dark:bg-transparent dark:border-slate-700 dark:border w-full outline-none rounded-md bg-gray-100"/>
                        <button
                            className="h-full absolute top-0 right-0 bg-[#F38160] px-3 text-white text-[1.3rem] rounded-r-md">
                            <CiSearch/></button>
                    </div>

                    <div className="grid grid-cols-1 400px:grid-cols-2 gap-[15px] w-full sm:w-[80%]">
                        <p className="flex items-center dark:text-slate-400 gap-[5px] text-gray-400 text-[1rem]">
                            <FaCircleCheck className="text-[#F0B70D] text-[1.2rem]"/>
                            Fresh Vegetables
                        </p>
                        <p className="flex items-center dark:text-slate-400 gap-[5px] text-gray-400 text-[1rem]">
                            <FaCircleCheck className="text-[#F0B70D] text-[1.2rem]"/>
                            100% Guarantee
                        </p>
                        <p className="flex items-center dark:text-slate-400 gap-[5px] text-gray-400 text-[1rem]">
                            <FaCircleCheck className="text-[#F0B70D] text-[1.2rem]"/>
                            Cash on Delivery
                        </p>
                        <p className="flex items-center dark:text-slate-400 gap-[5px] text-gray-400 text-[1rem]">
                            <FaCircleCheck className="text-[#F0B70D] text-[1.2rem]"/>
                            Fast Delivery
                        </p>
                    </div>
                </div>

                <div className="w-full sm:w-[40%]">
                    <img src="https://i.ibb.co/61R7zbv/delivery-concept-handsome-african-american-deliver-AZUZTZ3-1.png"
                         alt="image" className="w-full h-full"/>
                </div>
            </header>

            <section className="p-8 mt-16 grid sm:grid-cols-2 grid-cols-1 lg:grid-cols-4 gap-[25px] flex-wrap">
                <div>
                    <img src="https://i.ibb.co/XCM2bhM/Baby-food.png" alt="icon"
                         className="w-[60px]"/>
                    <h4 className="text-[18px] dark:text-[#abc2d3] font-[500]">Honey</h4>
                    <p className="text-[14px] leading-[18px] dark:text-slate-400 text-gray-400 font-[300]">Lorem ipsum
                        dolor sit amet, consectetur adipiscing elit.</p>
                </div>

                <div>
                    <img src="https://i.ibb.co/J5Yd3cZ/Condiments.png" alt="icon"
                         className="w-[60px]"/>
                    <h4 className="text-[18px] dark:text-[#abc2d3] font-[500]">Spices & Seasonings</h4>
                    <p className="text-[14px] leading-[18px] dark:text-slate-400 text-gray-400 font-[300]">Lorem ipsum
                        dolor sit amet, consectetur adipiscing elit.</p>
                </div>

                <div>
                    <img src="https://i.ibb.co/h2R9kny/Dairy.png" alt="icon"
                         className="w-[60px]"/>
                    <h4 className="text-[18px] dark:text-[#abc2d3] font-[500]">Dairy Products</h4>
                    <p className="text-[14px] leading-[18px] dark:text-slate-400 text-gray-400 font-[300]">Lorem ipsum
                        dolor sit amet, consectetur adipiscing elit.</p>
                </div>

                <div>
                    <img src="https://i.ibb.co/HYHZfHQ/Grain-and-pasta.png" alt="icon"
                         className="w-[60px]"/>
                    <h4 className="text-[18px] dark:text-[#abc2d3] font-[500]">Flour</h4>
                    <p className="text-[14px] leading-[18px] dark:text-slate-400 text-gray-400 font-[300]">Lorem ipsum
                        dolor sit amet, consectetur adipiscing elit.</p>
                </div>

                <div>
                    <img src="https://i.ibb.co/y5ZTLHv/Fruits-and-vegetables.png" alt="icon"
                         className="w-[60px]"/>
                    <h4 className="text-[18px] dark:text-[#abc2d3] font-[500]">Vegetables & Fruits</h4>
                    <p className="text-[14px] leading-[18px] dark:text-slate-400 text-gray-400 font-[300]">Lorem ipsum
                        dolor sit amet, consectetur adipiscing elit.</p>
                </div>

            </section>
        </div>
    );
};

export default HeroSection;
                    '/>
                    }
                </BlockWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"Hero Section 5"} id={"hero_section_5"}/>
                </div>

                <BlockDescription
                    text="A prominent section at the top of a webpage, typically featuring a large image or video, headline, and a call-to-action button, designed to grab attention and introduce the site's main content or purpose."/>

                <BlockToggleTab preview={heroSection6Preview} code={heroSection6Code}
                                setPreview={setHeroSection6Preview} setCode={setHeroSection6Code}/>

                <BlockWrapper>
                    {heroSection6Preview && (
                        <div className={`p-8  flex flex-wrap items-center gap-5 justify-center overflow-hidden`}>
                            <div className='w-full bg-[#fff] dark:bg-slate-900 rounded-md relative'>

                                {/* header */}
                                <header
                                    className='flex 1260px:flex-row flex-col items-center gap-12 1260px:gap-0 justify-between px-8 mt-10'>

                                    <div className='w-full dark:text-[#abc2d3] 1260px:w-[45%]'>
                                        <p>Hi there!</p>
                                        <h1 className='text-[40px] 640px:text-[60px] font-semibold leading-[45px] 640px:leading-[70px]'>
                                            <span className='text-[#DC0155]'>Luxe</span> is here to be your assistance
                                        </h1>
                                        <p className='mt-2 text-[1rem]'>I am here ready to help you in making creative
                                            digital products</p>
                                    </div>

                                    <div className='w-full 1260px:w-[55%]'>
                                        <img src='https://i.ibb.co/syHFhNy/image.png' alt='image' className=''/>
                                    </div>
                                </header>

                                <section className='px-8 pb-[30px] mt-8'>
                                    <h1 className='text-[1.3rem] dark:text-[#abc2d3] font-semibold'>Our Service</h1>

                                    <div
                                        className='grid grid-cols-1 640px:grid-cols-2 1260px:grid-cols-3 gap-[20px] mt-10 w-[70%]'>
                                        <div>
                                            <img src="https://i.ibb.co/z721j8b/Vector.png" alt="Vector"
                                                 className='w-[30px]'/>
                                            <h4 className='text-[1.1rem] dark:text-[#abc2d3] mt-3'>Branding</h4>
                                            <p className='text-[0.9rem] text-gray-500 mt-1 dark:text-slate-400'>Lorem
                                                ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                        </div>
                                        <div>
                                            <img src="https://i.ibb.co/Qn78BRJ/Ui-Design.png" alt="Vector"
                                                 className='w-[30px]'/>
                                            <h4 className='text-[1.1rem] dark:text-[#abc2d3] mt-3'>UI/UX</h4>
                                            <p className='text-[0.9rem] text-gray-500 mt-1 dark:text-slate-400'>Lorem
                                                ipsum dolor sit amet,
                                                consectetur adipiscing elit.</p>
                                        </div>
                                        <div>
                                            <img src="https://i.ibb.co/GcsvXxk/Product.png" alt="Vector"
                                                 className='w-[30px]'/>
                                            <h4 className='text-[1.1rem] dark:text-[#abc2d3] mt-3'>Product Design</h4>
                                            <p className='text-[0.9rem] text-gray-500 mt-1 dark:text-slate-400'>Lorem
                                                ipsum dolor sit amet,
                                                consectetur adipiscing elit.</p>
                                        </div>
                                    </div>
                                </section>

                                {/* right blur shadow */}
                                <div
                                    className='w-[100px] h-[100px] bg-[#DC0155] blur-[90px] absolute bottom-[80px] right-[80px]'></div>
                            </div>
                        </div>
                    )}

                    {heroSection6Code && <BlocksShowCode code='
import React from "react";

const HeroSection = () => {

    return (
        <div className="w-full bg-[#fff] dark:bg-slate-900 rounded-md relative">

            {/* header */}
            <header
                className="flex lg:flex-row flex-col items-center gap-12 lg:gap-0 justify-between px-8 mt-10">

                <div className="w-full dark:text-[#abc2d3] lg:w-[45%]">
                    <p>Hi there!</p>
                    <h1 className="text-[40px] sm:text-[60px] font-semibold leading-[45px] sm:leading-[70px]">
                        <span className="text-[#DC0155]">Luxe</span> is here to be your assistance</h1>
                    <p className="mt-2 text-[1rem]">I am here ready to help you in making creative digital products</p>
                </div>

                <div className="w-full lg:w-[55%]">
                    <img src="https://i.ibb.co/syHFhNy/image.png" alt="image" className=""/>
                </div>
            </header>

            <section className="px-8 pb-[30px] mt-8">
                <h1 className="text-[1.3rem] font-semibold">Our Service</h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px] mt-10 w-[70%]">
                    <div>
                        <img src="https://i.ibb.co/z721j8b/Vector.png" alt="Vector" className="w-[30px]"/>
                        <h4 className="text-[1.1rem] dark:text-[#abc2d3] mt-3">Branding</h4>
                        <p className="text-[0.9rem] text-gray-500 mt-1 dark:text-slate-400">Lorem ipsum dolor sit amet, consectetur
                            adipiscing elit.</p>
                    </div>
                    <div>
                        <img src="https://i.ibb.co/Qn78BRJ/Ui-Design.png" alt="Vector"
                             className="w-[30px]"/>
                        <h4 className="text-[1.1rem] dark:text-[#abc2d3] mt-3">UI/UX</h4>
                        <p className="text-[0.9rem] text-gray-500 mt-1 dark:text-slate-400">Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit.</p>
                    </div>
                    <div>
                        <img src="https://i.ibb.co/GcsvXxk/Product.png" alt="Vector"
                             className="w-[30px]"/>
                        <h4 className="text-[1.1rem] dark:text-[#abc2d3] mt-3">Product Design</h4>
                        <p className="text-[0.9rem] text-gray-500 mt-1 dark:text-slate-400">Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit.</p>
                    </div>
                </div>
            </section>

            {/* right blur shadow */}
            <div className="w-[100px] h-[100px] bg-[#DC0155] blur-[90px] absolute bottom-[80px] right-[80px]"></div>
        </div>
    );
};

export default HeroSection;
                    '/>
                    }
                </BlockWrapper>

                <BlocksFooter width='full' backUrl='/blocks/responsive-navbar' backName='responsive navbar'
                              forwardName='pricing section' forwardUrl='/blocks/pricing-section'/>
            </div>


            <Helmet>
                <title>Blocks - Hero Section</title>
            </Helmet>
        </aside>
    );
};

export default ResponsiveNavbar;
