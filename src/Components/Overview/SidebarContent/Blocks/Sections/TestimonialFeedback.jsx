import React, {useState, useEffect} from "react";

// components
import ContentHeader from "@shared/ContentHeader";
import {Helmet} from "react-helmet";
import BlocksShowCode from "@shared/Block/BlocksShowCode.jsx";

// icons
import BlocksFooter from "@shared/Block/BlocksFooter.jsx";
import {MdOutlineDone} from "react-icons/md";
import {RxCross1} from "react-icons/rx";


const Testimonial = () => {

    // search bar
    const [searchbarPreview, setSearchbarPreview] = useState(true);
    const [searchbarCode, setSearchbarCode] = useState(false);

    const handleSearchbarPreview = () => {
        setSearchbarPreview(true)
        setSearchbarCode(false);
    }

    const handleSearchbarCode = () => {
        setSearchbarCode(true);
        setSearchbarPreview(false);
    }

    const content = [
        'website',
        'programming',
        'zenui',
        'component',
        'template',
    ]

    const [filteredData, setFilteredData] = useState([])
    const [inputText, setInputText] = useState('')
    const [inputFocus, setInputFocus] = useState(false)

    useEffect(() => {
        const filtered = content?.filter((text) => {
            if (inputText !== '') {
                return text.toLowerCase().includes(inputText)
            }
        })

        setFilteredData(filtered)

    }, [inputText]);


    // basic navbar actions
    const [basicNavbarOpen, setBasicNavbarOpen] = useState(false)
    const [toggle, setToggle] = useState(false)

    const [pricing1, setPricing1] = useState(false)

    return (
        <aside
            className="flex items-start justify-between gap-6 pt-[9.5rem] !px-5 425px:!px-10 1024px:!pl-[5rem] 1024px:pt-[4.5rem]">
            <div>
                <ContentHeader text={"Pricing section 1"} id={"pricing_section_1"}/>

                <p className="w-full text-text text-[1rem]">
                    This is an animated button on click component. Enjoy dynamic responses with captivating animations
                    upon clicking.
                </p>

                <div className="w-full border border-border rounded mt-8">
                    <div className="relative">
                        <div
                            className={`absolute top-0 left-0 w-[90px] h-[40px] z-[1] bg-border transition-all duration-500 ${searchbarPreview ? 'translate-x-[0px] !w-[100px]' : 'translate-x-[100px] rounded-br'}`}></div>
                        <button
                            className={`${
                                searchbarPreview && "text-tabTextColor"
                            } px-6 py-2 border-b z-[2] relative text-text border-border`}
                            onClick={handleSearchbarPreview}
                        >
                            Preview
                        </button>
                        <button
                            className={`${
                                searchbarCode && "text-tabTextColor"
                            } px-6 py-2 border-r z-[2] relative text-text border-b rounded-br border-border`}
                            onClick={handleSearchbarCode}
                        >
                            Code
                        </button>
                    </div>
                    {searchbarPreview && (
                        <div
                            className={` ${basicNavbarOpen ? 'pb-56' : 'pb-8'} p-8  flex flex-wrap items-center gap-5 justify-center overflow-hidden`}>

                            <section className='w-full rounded-xl p-[20px]'>
                                <h1 className='text-[30px] font-[500] leading-[40px]'>Plans & Pricing</h1>
                                <div className='w-full flex items-center justify-between'>
                                    <p className='text-[18px] font-[400] text-gray-400 w-[50%] mt-2'>Whether your
                                        time-saving automation needs are large or small, we’re here to help you
                                        scale.</p>

                                    <div className='flex items-center bg-white rounded-full boxShadow w-max'>
                                        <button
                                            className={`${pricing1 ? 'bg-[#BB6BD9] text-white' : 'bg-transparent text-text'} px-4 py-2.5 rounded-full transition-all duration-300`}
                                            onClick={() => setPricing1(true)}>monthly
                                        </button>
                                        <button
                                            className={`${!pricing1 ? 'bg-[#BB6BD9] text-white' : 'bg-transparent text-text'} px-4 py-2.5 transition-all duration-300 rounded-full`}
                                            onClick={() => setPricing1(false)}>Yearly
                                        </button>
                                    </div>
                                </div>

                                {/*  pricing cards  */}
                                <div
                                    className='grid grid-cols-3 bg-white toastshadow py-[30px] gap-[50px] px-[40px] rounded-xl mt-10'>
                                    <div className='w-full flex flex-col justify-between h-full'>
                                        <div>
                                            <div className='flex items-end gap-[8px]'>
                                                <h3 className='text-[1.8rem] font-[800]'>$19</h3>
                                                <span className='text-[1rem] text-gray-400 mb-2'>/month</span>
                                            </div>

                                            <h3 className='text-[1.5rem] font-[500] mt-3'>Starter</h3>
                                            <p className='text-[1rem] text-gray-500'>Unleash the power of
                                                automation.</p>

                                            <div className='flex flex-col gap-[10px] mt-5'>
                                                <p className='text-[1rem] text-gray-500 flex items-center gap-[10px]'>
                                                    <MdOutlineDone
                                                        className='text-[1.3rem] p-1 rounded-full bg-[#dacfe2] text-[#BB6BD9]'/>
                                                    Multi-step Zaps
                                                </p>
                                                <p className='text-[1rem] text-gray-500 flex items-center gap-[10px]'>
                                                    <MdOutlineDone
                                                        className='text-[1.3rem] p-1 rounded-full bg-[#dacfe2] text-[#BB6BD9]'/>
                                                    3 Premium Apps
                                                </p>
                                                <p className='text-[1rem] text-gray-500 flex items-center gap-[10px]'>
                                                    <MdOutlineDone
                                                        className='text-[1.3rem] p-1 rounded-full bg-[#dacfe2] text-[#BB6BD9]'/>
                                                    2 Users team
                                                </p>
                                            </div>
                                        </div>

                                        <button
                                            className='py-2.5 px-4 w-full bg-[#857d9c] text-white rounded-full mt-16'>Choose
                                            plan
                                        </button>
                                    </div>

                                    <div className='w-full flex flex-col justify-between h-full'>
                                        <div>
                                            <div className='flex items-end gap-[8px]'>
                                                <h3 className='text-[1.8rem] font-[800]'>$54</h3>
                                                <span className='text-[1rem] text-gray-400 mb-2'>/month</span>
                                            </div>

                                            <h3 className='text-[1.5rem] font-[500] mt-3'>Professional</h3>
                                            <p className='text-[1rem] text-gray-500'>Advanced tools to take your work to
                                                the next level.</p>

                                            <div className='flex flex-col gap-[10px] mt-5'>
                                                <p className='text-[1rem] text-gray-500 flex items-center gap-[10px]'>
                                                    <MdOutlineDone
                                                        className='text-[1.3rem] p-1 rounded-full bg-[#dacfe2] text-[#BB6BD9]'/>
                                                    Multi-step Zaps
                                                </p>
                                                <p className='text-[1rem] text-gray-500 flex items-center gap-[10px]'>
                                                    <MdOutlineDone
                                                        className='text-[1.3rem] p-1 rounded-full bg-[#dacfe2] text-[#BB6BD9]'/>
                                                    Unlimited Premium
                                                </p>
                                                <p className='text-[1rem] text-gray-500 flex items-center gap-[10px]'>
                                                    <MdOutlineDone
                                                        className='text-[1.3rem] p-1 rounded-full bg-[#dacfe2] text-[#BB6BD9]'/>
                                                    50 Users team
                                                </p>
                                                <p className='text-[1rem] text-gray-500 flex items-center gap-[10px]'>
                                                    <MdOutlineDone
                                                        className='text-[1.3rem] p-1 rounded-full bg-[#dacfe2] text-[#BB6BD9]'/>
                                                    Shared Workspace
                                                </p>
                                            </div>
                                        </div>

                                        <button
                                            className='py-2.5 px-4 w-full bg-[#857d9c] text-white rounded-full mt-16'>Choose
                                            plan
                                        </button>
                                    </div>

                                    <div
                                        className='w-full flex flex-col justify-between h-full bg-[#231D4F] text-white p-[25px] rounded-xl'>
                                        <div>

                                            <div
                                                className='bg-[#393360] rounded-full px-4 py-[5px] mb-6 text-[0.8rem] text-[#BB6BD9] w-max ml-auto'>
                                                Most Popular
                                            </div>

                                            <div className='flex items-end gap-[8px]'>
                                                <h3 className='text-[1.8rem] font-[800]'>$89</h3>
                                                <span className='text-[1rem] text-gray-300 mb-2'>/month</span>
                                            </div>

                                            <h3 className='text-[1.5rem] font-[500] mt-3'>Company</h3>
                                            <p className='text-[1rem] text-gray-300'>Automation plus enterprise-grade
                                                features.</p>

                                            <div className='flex flex-col gap-[10px] mt-5'>
                                                <p className='text-[1rem] text-gray-200 flex items-center gap-[10px]'>
                                                    <MdOutlineDone
                                                        className='text-[1.3rem] p-1 rounded-full bg-[#393360] text-[#fff]'/>
                                                    Multi-step Zaps
                                                </p>
                                                <p className='text-[1rem] text-gray-200 flex items-center gap-[10px]'>
                                                    <MdOutlineDone
                                                        className='text-[1.3rem] p-1 rounded-full bg-[#393360] text-[#fff]'/>
                                                    Unlimited Premium
                                                </p>
                                                <p className='text-[1rem] text-gray-200 flex items-center gap-[10px]'>
                                                    <MdOutlineDone
                                                        className='text-[1.3rem] p-1 rounded-full bg-[#393360] text-[#fff]'/>
                                                    Unlimited Users Team
                                                </p>
                                                <p className='text-[1rem] text-gray-200 flex items-center gap-[10px]'>
                                                    <MdOutlineDone
                                                        className='text-[1.3rem] p-1 rounded-full bg-[#393360] text-[#fff]'/>
                                                    Advanced Admin
                                                </p>
                                                <p className='text-[1rem] text-gray-200 flex items-center gap-[10px]'>
                                                    <MdOutlineDone
                                                        className='text-[1.3rem] p-1 rounded-full bg-[#393360] text-[#fff]'/>
                                                    Custom Data Retention
                                                </p>
                                            </div>
                                        </div>

                                        <button
                                            className='py-2.5 px-4 w-full bg-[#BB6BD9] text-white rounded-full mt-16'>Choose
                                            plan
                                        </button>
                                    </div>
                                </div>
                            </section>

                        </div>
                    )}

                    {searchbarCode && <BlocksShowCode code='
                    '/>
                    }
                </div>

                <div className='mt-8'>
                    <ContentHeader text={"Pricing section 2"} id={"pricing_section_2"}/>
                </div>

                <p className="w-full text-text text-[1rem]">
                    This is an animated button on click component. Enjoy dynamic responses with captivating animations
                    upon clicking.
                </p>

                <div className="w-full border border-border rounded mt-8">
                    <div className="relative">
                        <div
                            className={`absolute top-0 left-0 w-[90px] h-[40px] z-[1] bg-border transition-all duration-500 ${searchbarPreview ? 'translate-x-[0px] !w-[100px]' : 'translate-x-[100px] rounded-br'}`}></div>
                        <button
                            className={`${
                                searchbarPreview && "text-tabTextColor"
                            } px-6 py-2 border-b z-[2] relative text-text border-border`}
                            onClick={handleSearchbarPreview}
                        >
                            Preview
                        </button>
                        <button
                            className={`${
                                searchbarCode && "text-tabTextColor"
                            } px-6 py-2 border-r z-[2] relative text-text border-b rounded-br border-border`}
                            onClick={handleSearchbarCode}
                        >
                            Code
                        </button>
                    </div>
                    {searchbarPreview && (
                        <div
                            className={` ${basicNavbarOpen ? 'pb-56' : 'pb-8'} p-8  flex flex-wrap items-center gap-5 justify-center overflow-hidden`}>

                            <section className='w-full rounded-xl p-[20px]'>
                                <h1 className='text-[30px] font-[500] leading-[40px] text-center'>The Right Plan for
                                    Your Business</h1>
                                <p className='text-[18px] font-[400] text-gray-400 w-[50%] text-center mx-auto mt-2'>We
                                    have several powerful plans to showcase your business and get discovered
                                    as a creative entrepreneurs. Everything you need.</p>

                                <div className='w-full flex items-center justify-center mt-8 gap-[20px]'>
                                    <p className='text-[1rem] font-[600] text-gray-800'>Bill Monthly</p>
                                    <div
                                        className={`${
                                            toggle ? " bg-[#3B9DF8]" : "bg-[#f0f0f0]"
                                        } w-[57px] h-[30px] px-[0.150rem] py-[0.160rem] cursor-pointer border transition-colors duration-500 border-[#e5eaf2]  rounded-full relative`}
                                        onClick={() => setToggle(!toggle)}
                                    >
                                        <div
                                            className={`${
                                                toggle ? " translate-x-[27px]" : "translate-x-[0px]"
                                            } w-[23px] h-[23px] pb-1 transition-all duration-500 rounded-full bg-[#fff]`}
                                            style={{boxShadow: "1px 2px 5px 2px rgb(0,0,0,0.1)"}}
                                        ></div>
                                    </div>
                                    <p className='text-[1rem] font-[400] text-gray-800'>Bill Annualy</p>
                                </div>

                                {/*  pricing cards  */}
                                <div
                                    className='flex items-center bg-white py-[30px] gap-[30px] px-[40px] rounded-xl mt-10'>
                                    <div
                                        className='w-full flex flex-col justify-between h-full bg-white toastshadow rounded-xl p-[20px]'>
                                        <div>

                                            <h3 className='text-[1.5rem] font-[600] mt-3'>Base</h3>

                                            <div className='flex flex-col gap-[10px] mt-5'>
                                                <p className='text-[1rem] text-gray-500 flex items-center gap-[10px]'>
                                                    <MdOutlineDone
                                                        className='text-[1.5rem] p-1 rounded-full text-gray-800'/>
                                                    Upload Video with HD
                                                    Resolution
                                                </p>
                                                <p className='text-[1rem] text-gray-500 flex items-center gap-[10px]'>
                                                    <MdOutlineDone
                                                        className='text-[1.5rem] p-1 rounded-full text-gray-800'/>
                                                    Attachment & Post Scheduling
                                                </p>
                                                <p className='text-[1rem] text-gray-300 flex items-center gap-[10px]'>
                                                    <RxCross1
                                                        className='text-[1.5rem] p-1 rounded-full text-gray-300'/>
                                                    Set your rates
                                                </p>
                                                <p className='text-[1rem] text-gray-300 flex items-center gap-[10px]'>
                                                    <RxCross1
                                                        className='text-[1.5rem] p-1 rounded-full text-gray-300'/>
                                                    Exclusive Deals
                                                </p>
                                                <p className='text-[1rem] text-gray-300 flex items-center gap-[10px]'>
                                                    <RxCross1
                                                        className='text-[1.5rem] p-1 rounded-full text-gray-300'/>
                                                    Advanced Statistics
                                                </p>
                                            </div>
                                        </div>

                                        <div className='mt-8'>
                                            <div className='flex items-end gap-[8px]'>
                                                <h3 className='text-[1.8rem] font-[800]'>$19</h3>
                                                <span className='text-[1rem] text-gray-400 mb-2'>/month</span>
                                            </div>

                                            <button
                                                className='py-[14px] px-4 w-full bg-[#f8f4ff] text-[#8645FF] rounded-md mt-3'>Choose
                                            </button>
                                        </div>
                                    </div>

                                    <div
                                        className='w-full flex flex-col justify-between h-full bg-gray-800 rounded-xl p-[25px] mb-[70px]'>
                                        <div className=''>

                                            <div className='flex items-center justify-between w-full'>
                                                <h3 className='text-[1.5rem] font-[600] mt-3 text-white'>Pro</h3>
                                                <span
                                                    className='rounded-md px-4 py-[5px] bg-[#f8f4ff] text-[#8645FF] text-[0.8rem]'>
                                                    Save $40
                                                </span>
                                            </div>

                                            <div className='flex flex-col gap-[10px] mt-5'>
                                                <p className='text-[1rem] text-gray-200 flex items-center gap-[10px]'>
                                                    <MdOutlineDone
                                                        className='text-[1.5rem] p-1 rounded-full text-gray-200'/>
                                                    Upload Video with HD
                                                    Resolution
                                                </p>
                                                <p className='text-[1rem] text-gray-200 flex items-center gap-[10px]'>
                                                    <MdOutlineDone
                                                        className='text-[1.5rem] p-1 rounded-full text-gray-200'/>
                                                    Attachment & Post Scheduling
                                                </p>
                                                <p className='text-[1rem] text-gray-200 flex items-center gap-[10px]'>
                                                    <MdOutlineDone
                                                        className='text-[1.5rem] p-1 rounded-full text-gray-200'/>
                                                    Set your rates
                                                </p>
                                                <p className='text-[1rem] text-gray-200 flex items-center gap-[10px]'>
                                                    <MdOutlineDone
                                                        className='text-[1.5rem] p-1 rounded-full text-gray-200'/>
                                                    Exclusive Deals
                                                </p>
                                                <p className='text-[1rem] text-gray-500 flex items-center gap-[10px]'>
                                                    <RxCross1
                                                        className='text-[1.5rem] p-1 rounded-full text-gray-500'/>
                                                    Advanced Statistics
                                                </p>
                                            </div>
                                        </div>

                                        <div className='mt-8'>
                                            <div className='flex items-end gap-[8px]'>
                                                <h3 className='text-[1.8rem] font-[800] text-white'>$123</h3>
                                                <span className='text-[1rem] text-gray-300 mb-2'>/month</span>
                                            </div>

                                            <button
                                                className='py-[14px] px-4 w-full bg-[#8645FF] text-white rounded-md mt-3'>Choose
                                            </button>
                                        </div>
                                    </div>

                                    <div
                                        className='w-full flex flex-col justify-between h-full bg-white toastshadow rounded-xl p-[20px]'>
                                        <div>

                                            <h3 className='text-[1.5rem] font-[600] mt-3'>Enterprise</h3>

                                            <div className='flex flex-col gap-[10px] mt-5'>
                                                <p className='text-[1rem] text-gray-500 flex items-center gap-[10px]'>
                                                    <MdOutlineDone
                                                        className='text-[1.5rem] p-1 rounded-full text-gray-800'/>
                                                    Upload Video with HD
                                                    Resolution
                                                </p>
                                                <p className='text-[1rem] text-gray-500 flex items-center gap-[10px]'>
                                                    <MdOutlineDone
                                                        className='text-[1.5rem] p-1 rounded-full text-gray-800'/>
                                                    Attachment & Post Scheduling
                                                </p>
                                                <p className='text-[1rem] text-gray-800 flex items-center gap-[10px]'>
                                                    <MdOutlineDone
                                                        className='text-[1.5rem] p-1 rounded-full text-gray-800'/>
                                                    Set your rates
                                                </p>
                                                <p className='text-[1rem] text-gray-800 flex items-center gap-[10px]'>
                                                    <MdOutlineDone
                                                        className='text-[1.5rem] p-1 rounded-full text-gray-800'/>
                                                    Exclusive Deals
                                                </p>
                                                <p className='text-[1rem] text-gray-800 flex items-center gap-[10px]'>
                                                    <MdOutlineDone
                                                        className='text-[1.5rem] p-1 rounded-full text-gray-800'/>
                                                    Advanced Statistics
                                                </p>
                                            </div>
                                        </div>

                                        <div className='mt-8'>
                                            <div className='flex items-end gap-[8px]'>
                                                <h3 className='text-[1.8rem] font-[800]'>$189</h3>
                                                <span className='text-[1rem] text-gray-400 mb-2'>/month</span>
                                            </div>

                                            <button
                                                className='py-[14px] px-4 w-full bg-[#f8f4ff] text-[#8645FF] rounded-md mt-3'>Choose
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </section>

                        </div>
                    )}

                    {searchbarCode && <BlocksShowCode code='
                    '/>
                    }
                </div>

                <div className='mt-8'>
                    <ContentHeader text={"Pricing section 3"} id={"pricing_section_3"}/>
                </div>

                <p className="w-full text-text text-[1rem]">
                    This is an animated button on click component. Enjoy dynamic responses with captivating animations
                    upon clicking.
                </p>

                <div className="w-full border border-border rounded mt-8">
                    <div className="relative">
                        <div
                            className={`absolute top-0 left-0 w-[90px] h-[40px] z-[1] bg-border transition-all duration-500 ${searchbarPreview ? 'translate-x-[0px] !w-[100px]' : 'translate-x-[100px] rounded-br'}`}></div>
                        <button
                            className={`${
                                searchbarPreview && "text-tabTextColor"
                            } px-6 py-2 border-b z-[2] relative text-text border-border`}
                            onClick={handleSearchbarPreview}
                        >
                            Preview
                        </button>
                        <button
                            className={`${
                                searchbarCode && "text-tabTextColor"
                            } px-6 py-2 border-r z-[2] relative text-text border-b rounded-br border-border`}
                            onClick={handleSearchbarCode}
                        >
                            Code
                        </button>
                    </div>
                    {searchbarPreview && (
                        <div
                            className={` ${basicNavbarOpen ? 'pb-56' : 'pb-8'} p-8  flex flex-wrap items-center gap-5 justify-center overflow-hidden`}>

                            <section className='w-full rounded-xl p-[20px]'>
                                <h1 className='text-[40px] font-[800] leading-[40px] text-center w-[80%] mx-auto'>Another
                                    2,272 organizations signed up last week.</h1>
                                <p className='text-[18px] font-[400] text-gray-800 w-[50%] text-center mx-auto mt-3'>Two
                                    simple plans, each with a <b>30-day free trial</b>. No credit card required.</p>

                                {/*  pricing cards  */}
                                <div className='flex items-center mt-20'>
                                    <div className='border border-gray-200 rounded-l-xl'>
                                        <div className=' p-[25px]'>
                                            <h1 className='text-[1.3rem] font-[500] text-gray-800'>Basecamp</h1>
                                            <h3 className='text-[1rem] font-[400] text-gray-800 mb-[20px]'>Ideal for
                                                freelancers,
                                                startups, or smaller teams.</h3>

                                            <ul className='list-disc marker:text-gray-400 pl-[16px] text-gray-700'>
                                                <li>Every feature, nothing held back</li>
                                                <li>500 GB storage for files & documents</li>
                                                <li>Month-to-month, pay as you go</li>
                                            </ul>
                                        </div>

                                        <div className='bg-[#FCF4F2] p-[25px] rounded-bl-xl'>
                                            <h2 className='text-[1.4rem] flex items-end gap-[6px] font-[600]'>
                                                $15
                                                <span className='text-[1rem] text-gray-500 font-[400] mb-1'>/user per month</span>
                                            </h2>
                                            <p className='text-[1rem] mt-[10px] mb-[20px]'>
                                                <b>We only bill you for employees.</b> <br/>
                                                Invite clients, contractors and guests for free.
                                            </p>

                                            <button
                                                className='py-2 px-4 text-white bg-[#2DA530] rounded-full text-[0.9rem]'>Try
                                                for Free
                                            </button>
                                        </div>
                                    </div>

                                    <div className='border-[3px] border-[#EC677C] rounded-xl relative'>

                                        {/*  badge  */}
                                        <span
                                            className='bg-[#EB4866] text-white rounded-md px-5 uppercase text-[0.8rem] py-[7px] rotate-[-7deg] absolute top-[-30px] z-20 right-[-20px]'>
                                            Best value for <br/>
                                            larger teams
                                        </span>

                                        <div className=' p-[25px]'>
                                            <div className='flex items-center gap-[20px] mb-[10px]'>
                                                <h1 className='text-[1.3rem] font-[500] text-gray-800'>Basecamp</h1>
                                                <span
                                                    className='py-[5px] px-4 bg-[#FF7D0F] text-white rounded-full text-[0.9rem] uppercase'>Pro Unlimited</span>
                                            </div>
                                            <h3 className='text-[1rem] font-[400] text-gray-800 mb-[20px]'>Perfect for
                                                growing businesses, larger groups,
                                                and companies that want the best.</h3>

                                            <div className='flex justify-between gap-[20px]'>
                                                <ul className='list-disc marker:text-[#EB4866] pl-[16px] text-gray-700'>
                                                    <li>Every feature we offer, plus…</li>
                                                    <li>10x file & document storage (5 TB)</li>
                                                    <li>First-in-line 24/7/365 Priority Support</li>
                                                </ul>

                                                <ul className='list-disc marker:text-[#EB4866] pl-[16px] text-gray-700'>
                                                    <li>1:1 onboarding tour with our team</li>
                                                    <li>Option to pay annually by check</li>
                                                    <li>Annual billing for simplified accounting</li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className='bg-[#FCF4F2] p-[25px] rounded-b-xl'>
                                            <h2 className='text-[1.4rem] flex items-end gap-[6px] font-[400]'>
                                                <b>Unlimited users</b> just $299/month, billed annually
                                            </h2>
                                            <p className='text-[1rem] mt-[10px] mb-[20px]'>
                                                <b>No per-user charges. Your whole organization for one fixed price.</b>
                                                <br/>
                                                If you prefer to pay month-to-month, it’s $349/month.
                                            </p>

                                            <button
                                                className='py-2 px-4 text-white bg-[#2DA530] rounded-full text-[0.9rem]'>Try
                                                for Free
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </section>

                        </div>
                    )}

                    {searchbarCode && <BlocksShowCode code='
                    '/>
                    }
                </div>

                <div className='mt-8'>
                    <ContentHeader text={"Pricing section 4"} id={"pricing_section_4"}/>
                </div>

                <p className="w-full text-text text-[1rem]">
                    This is an animated button on click component. Enjoy dynamic responses with captivating animations
                    upon clicking.
                </p>

                <div className="w-full border border-border rounded mt-8">
                    <div className="relative">
                        <div
                            className={`absolute top-0 left-0 w-[90px] h-[40px] z-[1] bg-border transition-all duration-500 ${searchbarPreview ? 'translate-x-[0px] !w-[100px]' : 'translate-x-[100px] rounded-br'}`}></div>
                        <button
                            className={`${
                                searchbarPreview && "text-tabTextColor"
                            } px-6 py-2 border-b z-[2] relative text-text border-border`}
                            onClick={handleSearchbarPreview}
                        >
                            Preview
                        </button>
                        <button
                            className={`${
                                searchbarCode && "text-tabTextColor"
                            } px-6 py-2 border-r z-[2] relative text-text border-b rounded-br border-border`}
                            onClick={handleSearchbarCode}
                        >
                            Code
                        </button>
                    </div>
                    {searchbarPreview && (
                        <div
                            className={` ${basicNavbarOpen ? 'pb-56' : 'pb-8'} p-8  flex flex-wrap items-center gap-5 justify-center overflow-hidden`}>

                            <section className='w-full rounded-xl p-[20px]'>
                                <h1 className='text-[40px] font-[800] leading-[40px] text-center w-[80%] mx-auto'>Choose
                                    the plan that fits your needs.</h1>

                                {/*  pricing cards  */}
                                <div className='grid grid-cols-3 gap-[10px] mt-20'>
                                    <div className='p-[30px] rounded-xl bg-[#eff0ff]'>
                                        <h1 className='text-[2rem] font-[500] text-[#3D2E7C]'>Starter</h1>
                                        <p className='text-[1rem] text-[#3D2E7C] font-[400]'>Quick video messages</p>
                                        <h4 className='text-[1.7rem] font-[400] text-[#3D2E7C] mt-3'>free</h4>

                                        <button className='bg-[#565ADD] my-6 py-3 px-4 rounded-full text-white'>Sign Up,
                                            It’s Free
                                        </button>

                                        <ul className='list-disc marker:text-[#3D2E7C] pl-[40px] flex flex-col gap-[8px]     text-[#3D2E7C] text-[0.9rem]'>
                                            <li>Up to 50 Creators Lite</li>
                                            <li>Up to 25 videos/person</li>
                                            <li>Up to 5 mins/video</li>
                                        </ul>

                                        <div
                                            className='flex flex-col gap-[10px] mt-5 pt-[30px] border-t border-[#D1D1F7]'>

                                            <p className='text-[1rem] text-[#2B1C50]'>Key Features</p>

                                            <p className='text-[0.9rem] text-[#2B1C50] flex items-center gap-[8px]'>
                                                <MdOutlineDone
                                                    className='text-[1.4rem] p-1 rounded-full text-[#2B1C50]'/>
                                                Upload Video with HD
                                                Resolution
                                            </p>
                                            <p className='text-[0.9rem] text-[#2B1C50] flex items-center gap-[8px]'>
                                                <MdOutlineDone
                                                    className='text-[1.4rem] p-1 rounded-full text-[#2B1C50]'/>
                                                Attachment & Post Scheduling
                                            </p>
                                            <p className='text-[0.9rem] text-[#2B1C50] flex items-center gap-[8px]'>
                                                <MdOutlineDone
                                                    className='text-[1.4rem] p-1 rounded-full text-[#2B1C50]'/>
                                                Set your rates
                                            </p>
                                            <p className='text-[0.9rem] text-[#2B1C50] flex items-center gap-[8px]'>
                                                <MdOutlineDone
                                                    className='text-[1.4rem] p-1 rounded-full text-[#2B1C50]'/>
                                                Exclusive Deals
                                            </p>
                                            <p className='text-[0.9rem] text-[#2B1C50] flex items-center gap-[8px]'>
                                                <MdOutlineDone
                                                    className='text-[1.4rem] p-1 rounded-full text-[#2B1C50]'/>
                                                Advanced Statistics
                                            </p>
                                        </div>
                                    </div>
                                    <div className='p-[30px] rounded-xl bg-[#fff] boxShadow scale-[1.1]'>
                                        <h1 className='text-[2rem] font-[500] text-[#3D2E7C]'>Business</h1>
                                        <p className='text-[1rem] text-[#3D2E7C] font-[400]'>Advanced recording &
                                            analytics</p>
                                        <h4 className='text-[1.7rem] font-[400] text-[#3D2E7C] mt-3 flex items-center gap-[5px]'>$12.50
                                            <span className='text-[0.8rem]'>USD/Creator/mo (annually)</span></h4>

                                        <button className='bg-[#565ADD] my-6 py-3 px-4 rounded-full text-white'>Start
                                            Free 14-Day Trial
                                        </button>

                                        <ul className='list-disc marker:text-[#3D2E7C] pl-[40px] flex flex-col gap-[8px]     text-[#3D2E7C] text-[0.9rem]'>
                                            <li> Unlimited Creators</li>
                                            <li> Unlimited videos</li>
                                            <li>Unlimited recording length</li>
                                            <li>Up to 50 Creators Lite</li>
                                        </ul>

                                        <div
                                            className='flex flex-col gap-[10px] mt-5 pt-[30px] border-t border-[#D1D1F7]'>

                                            <p className='text-[1rem] text-[#2B1C50]'>Everything in Starter, plus</p>

                                            <p className='text-[0.9rem] text-[#2B1C50] flex items-center gap-[8px]'>
                                                <MdOutlineDone
                                                    className='text-[1.4rem] p-1 rounded-full text-[#2B1C50]'/>
                                                Custom branding
                                            </p>
                                            <p className='text-[0.9rem] text-[#2B1C50] flex items-center gap-[8px]'>
                                                <MdOutlineDone
                                                    className='text-[1.4rem] p-1 rounded-full text-[#2B1C50]'/>
                                                Engagement insights
                                            </p>
                                            <p className='text-[0.9rem] text-[#2B1C50] flex items-center gap-[8px]'>
                                                <MdOutlineDone
                                                    className='text-[1.4rem] p-1 rounded-full text-[#2B1C50]'/>
                                                Embed links in video
                                            </p>
                                            <p className='text-[0.9rem] text-[#2B1C50] flex items-center gap-[8px]'>
                                                <MdOutlineDone
                                                    className='text-[1.4rem] p-1 rounded-full text-[#2B1C50]'/>
                                                Password protected videos
                                            </p>
                                            <p className='text-[0.9rem] text-[#2B1C50] flex items-center gap-[8px]'>
                                                <MdOutlineDone
                                                    className='text-[1.4rem] p-1 rounded-full text-[#2B1C50]'/>
                                                Video uploads
                                            </p>
                                        </div>
                                    </div>
                                    <div className='p-[30px] rounded-xl bg-[#eff0ff]'>
                                        <h1 className='text-[2rem] font-[500] text-[#3D2E7C]'>Enterprise</h1>
                                        <p className='text-[1rem] text-[#3D2E7C] font-[400]'>Advanced admin &
                                            security</p>
                                        <h4 className='text-[1.7rem] font-[400] text-[#3D2E7C] mt-3'>Let’s Talk</h4>

                                        <button className='bg-[#565ADD] my-6 py-3 px-4 rounded-full text-white'>Contact
                                            Sales
                                        </button>

                                        <ul className='list-disc marker:text-[#3D2E7C] pl-[40px] flex flex-col gap-[8px]     text-[#3D2E7C] text-[0.9rem]'>
                                            <li>Unlimited Members</li>
                                            <li> Unlimited videos</li>
                                            <li>Unlimited recording length</li>
                                        </ul>

                                        <div
                                            className='flex flex-col gap-[10px] mt-5 pt-[30px] border-t border-[#D1D1F7]'>

                                            <p className='text-[1rem] text-[#2B1C50]'>Everything in Business, plus</p>

                                            <p className='text-[0.9rem] text-[#2B1C50] flex items-center gap-[8px]'>
                                                <MdOutlineDone
                                                    className='text-[1.4rem] p-1 rounded-full text-[#2B1C50]'/>
                                                SSO (SAML) and SCIM
                                            </p>
                                            <p className='text-[0.9rem] text-[#2B1C50] flex items-center gap-[8px]'>
                                                <MdOutlineDone
                                                    className='text-[1.4rem] p-1 rounded-full text-[#2B1C50]'/>
                                                Advanced content privacy
                                            </p>
                                            <p className='text-[0.9rem] text-[#2B1C50] flex items-center gap-[8px]'>
                                                <MdOutlineDone
                                                    className='text-[1.4rem] p-1 rounded-full text-[#2B1C50]'/>
                                                Custom data retention policies
                                            </p>
                                            <p className='text-[0.9rem] text-[#2B1C50] flex items-center gap-[8px]'>
                                                <MdOutlineDone
                                                    className='text-[1.4rem] p-1 rounded-full text-[#2B1C50]'/>
                                                Salesforce integration
                                            </p>
                                            <p className='text-[0.9rem] text-[#2B1C50] flex items-center gap-[8px]'>
                                                <MdOutlineDone
                                                    className='text-[1.4rem] p-1 rounded-full text-[#2B1C50]'/>
                                                Zoom integration
                                            </p>
                                        </div>
                                    </div>
                                </div>

                            </section>

                        </div>
                    )}

                    {searchbarCode && <BlocksShowCode code='
                    '/>
                    }
                </div>

                <BlocksFooter/>
            </div>


            <Helmet>
                <title>Blocks - Responsive Searchbar</title>
            </Helmet>
        </aside>
    );
};

export default Testimonial;
