import React, {useState} from "react";

// react helmet
import {Helmet} from "react-helmet";

// components
import ContentHeader from "@shared/ContentHeader";
import Showcode from "@shared/Component/ShowCode.jsx";
import OverviewFooter from "@shared/OverviewFooter";

// contents for scrollspy
import {testimonialContents} from '@utils/ContentsConfig/FeedbackContents';
import {useScrollSpy} from '@/CustomHooks/useScrollSpy';

// icons
import {FaQuoteLeft, FaRegStar, FaStar, FaQuoteRight} from "react-icons/fa";

import ComponentDescription from "@shared/Component/ComponentDescription.jsx";
import ToggleTab from "@shared/Component/ToggleTab.jsx";
import ComponentWrapper from "@shared/Component/ComponentWrapper.jsx";
import ContentNavbar from "@shared/Component/ContentNavbar.jsx";

const Testimonial = () => {
    const sectionIds = testimonialContents.map(item => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    // testimonial 1
    const [testimonial1Preview, setTestimonial1Preview] = useState(true);
    const [testimonial1Code, setTestimonial1Code] = useState(false);

    // testimonial 2
    const [testimonial2Preview, setTestimonial2Preview] = useState(true);
    const [testimonial2Code, setTestimonial2Code] = useState(false);

    // testimonial 3
    const [testimonial3Preview, setTestimonial3Preview] = useState(true);
    const [testimonial3Code, setTestimonial3Code] = useState(false);

    // testimonial 4
    const [testimonial4Preview, setTestimonial4Preview] = useState(true);
    const [testimonial4Code, setTestimonial4Code] = useState(false);

    // testimonial 5
    const [testimonial5Preview, setTestimonial5Preview] = useState(true);
    const [testimonial5Code, setTestimonial5Code] = useState(false);

    // testimonial 6
    const [testimonial6Preview, setTestimonial6Preview] = useState(true);
    const [testimonial6Code, setTestimonial6Code] = useState(false);

    // testimonial 7
    const [testimonial7Preview, setTestimonial7Preview] = useState(true);
    const [testimonial7Code, setTestimonial7Code] = useState(false);

    return (
        <>
            <aside className='flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10'>
                <div className='w-full 425px:w-[80%]'>
                    <ContentHeader text={'testimonial 1'} id={'testimonial_1'}/>

                    <ComponentDescription text='This is a testimonial component. Showcase user feedback and reviews
            with a stylish, engaging layout.'/>

                    <ToggleTab code={testimonial1Code} setCode={setTestimonial1Code} setPreview={setTestimonial1Preview}
                               preview={testimonial1Preview}/>

                    <ComponentWrapper>
                        {testimonial1Preview && (
                            <div className='p-8 pt-20 mb-4 flex items-center flex-col gap-5 justify-center'>
                                <div
                                    className='w-full 1024px:w-[70%] mt-8 1024px:mt-0 p-4 dark:bg-slate-800 bg-secondary shadow-2xl rounded-lg relative'>
                                    <FaQuoteLeft
                                        className=' absolute -top-2 left-[5%] dark:text-slate-400 text-[1.3rem] text-[#727272]'/>
                                    <img
                                        src='https://img.freepik.com/free-photo/confident-attractive-caucasian-guy-beige-pullon-smiling-broadly-while-standing-against-gray_176420-44508.jpg?size=626&ext=jpg&ga=GA1.1.71340048.1688965399&semt=sph'
                                        alt='demo/image'
                                        className='w-[100px] h-[100px] object-cover rounded-full absolute -top-10 left-1/2 transform -translate-x-1/2 border-4 border-primary'
                                    />
                                    <p className='text-text text-[0.9rem] dark:text-[#abc2d3] mt-16'>
                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                                        Vitae non, explicabo cum dolorem temporibus alias odio quod
                                        officiis nam. Debitis odio libero dolorum harum magnam
                                        inventore ut molestias rerum sapiente!
                                    </p>

                                    <div className='flex items-start mt-5 justify-between'>
                                        <div>
                                            <h2 className='text-[1.2rem] dark:text-[#abc2d3] font-[600]'>Jhone
                                                Dehon</h2>
                                            <p className='text-[1rem] dark:text-slate-400 text-[#727272]'>
                                                CEO of Miracle
                                            </p>
                                        </div>
                                        <div className='flex items-center gap-1'>
                                            <FaStar className='text-[1.3rem] text-[#ffba24]'/>
                                            <FaStar className='text-[1.3rem] text-[#ffba24]'/>
                                            <FaStar className='text-[1.3rem] text-[#ffba24]'/>
                                            <FaStar className='text-[1.3rem] text-[#ffba24]'/>
                                            <FaRegStar className='text-[#ffba24] text-[1.3rem]'/>
                                        </div>
                                    </div>
                                    <FaQuoteLeft
                                        className=' absolute -bottom-2 dark:text-slate-400 right-[5%] rotate-[180deg] text-[1.3rem] text-[#727272]'/>
                                </div>
                            </div>
                        )}

                        {testimonial1Code && (
                            <Showcode
                                code='
import React, {useState} from "react";

// react icons
import {FaQuoteLeft, FaRegStar, FaStar} from "react-icons/fa";

const Testimonial = () => {

    return (
        <div
            className="w-full md:w-[70%] mt-8 md:mt-0 p-4 dark:bg-slate-800 bg-white shadow-2xl rounded-lg relative">
            <FaQuoteLeft className=" absolute -top-2 left-[5%] dark:text-slate-400 text-[1.3rem] text-[#727272]"/>
            <img
                src="https://img.freepik.com/free-photo/confident-attractive-caucasian-guy-beige-pullon-smiling-broadly-while-standing-against-gray_176420-44508.jpg?size=626&ext=jpg&ga=GA1.1.71340048.1688965399&semt=sph"
                alt="demo/image"
                className="w-[100px] h-[100px] object-cover rounded-full absolute -top-10 left-1/2 transform -translate-x-1/2 border-4 border-primary"
            />
            <p className="text-[#424242] text-[0.9rem] dark:text-[#abc2d3] mt-16">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                Vitae non, explicabo cum dolorem temporibus alias odio quod
                officiis nam. Debitis odio libero dolorum harum magnam
                inventore ut molestias rerum sapiente!
            </p>

            <div className="flex items-start mt-5 justify-between">
                <div>
                    <h2 className="text-[1.2rem] dark:text-[#abc2d3] font-[600]">Jhone Dehon</h2>
                    <p className="text-[1rem] dark:text-slate-400 text-[#727272]">
                        CEO of Miracle
                    </p>
                </div>
                <div className="flex items-center gap-1">
                    <FaStar className="text-[1.3rem] text-[#ffba24]"/>
                    <FaStar className="text-[1.3rem] text-[#ffba24]"/>
                    <FaStar className="text-[1.3rem] text-[#ffba24]"/>
                    <FaStar className="text-[1.3rem] text-[#ffba24]"/>
                    <FaRegStar className="text-[#ffba24] text-[1.3rem]"/>
                </div>
            </div>
            <FaQuoteLeft
                className="absolute -bottom-2 dark:text-slate-400 right-[5%] rotate-[180deg] text-[1.3rem] text-[#727272]"/>
        </div>
    );
};

export default Testimonial;
              '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader text={'testimonial 2'} id={'testimonial_2'}/>
                    </div>

                    <ComponentDescription text='This is a testimonial component. Showcase user feedback and reviews
            with a stylish, engaging layout.'/>

                    <ToggleTab code={testimonial2Code} setCode={setTestimonial2Code} preview={testimonial2Preview}
                               setPreview={setTestimonial2Preview}/>

                    <ComponentWrapper>
                        {testimonial2Preview && (
                            <div className='p-8 mb-4 flex items-center flex-col gap-5 justify-center'>
                                <div
                                    className='w-full p-4 bg-secondary dark:bg-slate-800 shadow-2xl rounded-lg relative flex flex-col 1024px:flex-row items-start justify-between gap-6'>
                                    <div className='relative w-full 1024px:w-[50%]'>
                                        <img
                                            src='https://img.freepik.com/free-photo/front-view-smiley-man-holding-laptop_23-2148946208.jpg?size=626&ext=jpg&uid=R134535407&ga=GA1.1.71340048.1688965399&semt=ais'
                                            alt='demo/image'
                                            className='w-full h-full object-cover'
                                        />
                                        <FaQuoteRight
                                            className=' absolute -top-5 right-[-5%] text-[3rem] text-[#ffffff] bg-primary p-3 rounded-full'/>
                                    </div>
                                    <div className='w-full 1024px:w-[45%]'>
                                        <h3 className='text-[1.5rem] dark:text-[#abc2d3] font-[500] capitalize'>
                                            help us improve our productivity
                                        </h3>
                                        <p className='text-text text-[0.8rem] dark:text-slate-400 mt-2 text-justify'>
                                            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                                            Vitae non, explicabo cum dolorem temporibus alias odio
                                            quod officiis nam. Lorem ipsum dolor sit amet.
                                        </p>

                                        <div className='mt-4'>
                                            <h2 className='text-[1rem] dark:text-[#abc2d3] font-[500]'>Jhone Dehon</h2>
                                            <p className='text-[0.9rem] dark:text-slate-400 text-[#727272]'>
                                                CEO of Miracle
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {testimonial2Code && (
                            <Showcode
                                code='
import React from "react";

// react icons
import {FaQuoteRight} from "react-icons/fa";

const Testimonial = () => {

    return (
        <div
            className="w-full p-4 bg-white dark:bg-slate-800 shadow-2xl rounded-lg relative flex flex-col md:flex-row items-start justify-between gap-6">
            <div className="relative w-full md:w-[50%]">
                <img
                    src="https://img.freepik.com/free-photo/front-view-smiley-man-holding-laptop_23-2148946208.jpg?size=626&ext=jpg&uid=R134535407&ga=GA1.1.71340048.1688965399&semt=ais"
                    alt="demo/image"
                    className="w-full h-full object-cover"
                />
                <FaQuoteRight
                    className="absolute -top-5 right-[-5%] text-[3rem] text-[#ffffff] bg-[#3B9DF8] p-3 rounded-full"/>
            </div>
            <div className="w-full md:w-[45%]">
                <h3 className="text-[1.5rem] dark:text-[#abc2d3] font-[500] capitalize">
                    help us improve our productivity
                </h3>
                <p className="text-[#424242] text-[0.8rem] dark:text-slate-400 mt-2 text-justify">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Vitae non, explicabo cum dolorem temporibus alias odio
                    quod officiis nam. Lorem ipsum dolor sit amet.
                </p>

                <div className="mt-4">
                    <h2 className="text-[1rem] dark:text-[#abc2d3] font-[500]">Jhone Dehon</h2>
                    <p className="text-[0.9rem] dark:text-slate-400 text-[#727272]">
                        CEO of Miracle
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Testimonial;
              '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader text={'testimonial 3'} id={'testimonial_3'}/>
                    </div>

                    <ComponentDescription text='This is a testimonial component. Showcase user feedback and reviews
            with a stylish, engaging layout.'/>

                    <ToggleTab code={testimonial3Code} setCode={setTestimonial3Code} setPreview={setTestimonial3Preview}
                               preview={testimonial3Preview}/>

                    <ComponentWrapper>
                        {testimonial3Preview && (
                            <div className='p-8 mb-4 flex items-center flex-col gap-5 justify-center'>
                                <div
                                    className='w-full 1024px:w-[55%] dark:bg-slate-800 bg-secondary shadow-2xl rounded-lg p-6'>
                                    <h3 className='text-[1.5rem] dark:text-[#abc2d3] font-[500] capitalize'>
                                        help us improve our productivity
                                    </h3>
                                    <p className='dark:text-slate-400 text-justify text-[0.9rem] my-3 text-text'>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Atque nesciunt saepe quam doloremque nulla cumque vero
                                        sequi, repellendus vel reiciendis? Eos totam quidem ducimus
                                        amet, in fuga quia minus ab!
                                    </p>

                                    <div className='flex items-center gap-4 mt-4'>
                                        <img
                                            src='https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg&uid=R134535407&ga=GA1.1.71340048.1688965399&semt=sph'
                                            alt='demo/image'
                                            className='w-[40px] h-[40px] object-cover rounded-full'
                                        />
                                        <div>
                                            <h2 className='text-[1rem] dark:text-[#abc2d3] font-[500]'>Jhone Dehon</h2>
                                            <p className='text-[0.9rem] dark:text-slate-400 text-text'>CEO of
                                                Miracle</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {testimonial3Code && (
                            <Showcode
                                code='
import React from "react";

const Testimonial = () => {

    return (
        <div className="w-full md:w-[55%] dark:bg-slate-800 bg-white shadow-2xl rounded-lg p-6">
            <h3 className="text-[1.5rem] dark:text-[#abc2d3] font-[500] capitalize">
                help us improve our productivity
            </h3>
            <p className="dark:text-slate-400 text-justify text-[0.9rem] my-3 text-[#424242]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Atque nesciunt saepe quam doloremque nulla cumque vero
                sequi, repellendus vel reiciendis? Eos totam quidem ducimus
                amet, in fuga quia minus ab!
            </p>

            <div className="flex items-center gap-4 mt-4">
                <img
                    src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg&uid=R134535407&ga=GA1.1.71340048.1688965399&semt=sph"
                    alt="demo/image"
                    className="w-[40px] h-[40px] object-cover rounded-full"
                />
                <div>
                    <h2 className="text-[1rem] dark:text-[#abc2d3] font-[500]">Jhone Dehon</h2>
                    <p className="text-[0.9rem] dark:text-slate-400 text-text">CEO of Miracle</p>
                </div>
            </div>
        </div>
    );
};

export default Testimonial;
              '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader text={'testimonial 4'} id={'testimonial_4'}/>
                    </div>

                    <ComponentDescription text='This is a testimonial component. Showcase user feedback and reviews
            with a stylish, engaging layout.'/>

                    <ToggleTab code={testimonial4Code} setCode={setTestimonial4Code} preview={testimonial4Preview}
                               setPreview={setTestimonial4Preview}/>

                    <ComponentWrapper>
                        {testimonial4Preview && (
                            <div className='p-8 mb-4 flex items-center flex-col gap-5 justify-center'>
                                <div
                                    className='w-full z-0 1024px:w-[70%] dark:bg-slate-800 bg-secondary shadow-2xl rounded-lg p-6 flex items-center justify-center flex-col'>
                                    <img
                                        src='https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg&uid=R134535407&ga=GA1.1.71340048.1688965399&semt=sph'
                                        alt='demo/image'
                                        className='w-[150px] h-[150px] object-cover rounded-full'
                                    />
                                    <h3 className='text-[1.5rem] dark:text-[#abc2d3] font-[500] capitalize mt-4'>
                                        Jhone Dehon
                                    </h3>
                                    <p className='text-text text-[0.9rem] dark:text-slate-400'>London</p>

                                    <div className='flex items-center gap-1 my-4'>
                                        <FaStar className='text-[1.3rem] text-[#ffba24]'/>
                                        <FaStar className='text-[1.3rem] text-[#ffba24]'/>
                                        <FaStar className='text-[1.3rem] text-[#ffba24]'/>
                                        <FaStar className='text-[1.3rem] text-[#ffba24]'/>
                                        <FaRegStar className='text-[#ffba24] text-[1.3rem]'/>
                                    </div>

                                    <div className='relative'>
                                        <p className='dark:text-[#abc2d3] text-justify text-[0.9rem] my-3 text-text '>
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                            Atque nesciunt saepe quam doloremque nulla cumque vero
                                            sequi, repellendus vel reiciendis? Eos totam quidem
                                            ducimus amet, in fuga quia minus ab!
                                        </p>
                                        <FaQuoteRight
                                            className='text-[3rem] z-[-1] dark:text-slate-700 text-[#d1d1d169] absolute top-[-20%] left-0 '/>
                                        <FaQuoteLeft
                                            className='text-[3rem] z-[-1] dark:text-slate-700 text-[#d1d1d169] absolute bottom-[0%] right-0 '/>
                                    </div>
                                </div>
                            </div>
                        )}

                        {testimonial4Code && (
                            <Showcode
                                code='
import React from "react";

// react icons
import {FaQuoteLeft, FaQuoteRight, FaRegStar, FaStar} from "react-icons/fa";

const Testimonial = () => {

    return (
        <div
            className="w-full z-0 md:w-[70%] dark:bg-slate-800 bg-white shadow-2xl rounded-lg p-6 flex items-center justify-center flex-col">
            <img
                src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg&uid=R134535407&ga=GA1.1.71340048.1688965399&semt=sph"
                alt="demo/image"
                className="w-[150px] h-[150px] object-cover rounded-full"
            />
            <h3 className="text-[1.5rem] dark:text-[#abc2d3] font-[500] capitalize mt-4">
                Jhone Dehon
            </h3>
            <p className="text-[#424242] text-[0.9rem] dark:text-slate-400">London</p>

            <div className="flex items-center gap-1 my-4">
                <FaStar className="text-[1.3rem] text-[#ffba24]"/>
                <FaStar className="text-[1.3rem] text-[#ffba24]"/>
                <FaStar className="text-[1.3rem] text-[#ffba24]"/>
                <FaStar className="text-[1.3rem] text-[#ffba24]"/>
                <FaRegStar className="text-[#ffba24] text-[1.3rem]"/>
            </div>

            <div className="relative">
                <p className="dark:text-[#abc2d3] text-justify text-[0.9rem] my-3 text-[#424242]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Atque nesciunt saepe quam doloremque nulla cumque vero
                    sequi, repellendus vel reiciendis? Eos totam quidem
                    ducimus amet, in fuga quia minus ab!
                </p>
                <FaQuoteRight
                    className="text-[3rem] z-[-1] dark:text-slate-700 text-[#d1d1d169] absolute top-[-20%] left-0 "/>
                <FaQuoteLeft
                    className="text-[3rem] z-[-1] dark:text-slate-700 text-[#d1d1d169] absolute bottom-[0%] right-0 "/>
            </div>
        </div>
    );
};

export default Testimonial;
              '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader text={'testimonial 5'} id={'testimonial_5'}/>
                    </div>

                    <ComponentDescription text='This is a testimonial component. Showcase user feedback and reviews
            with a stylish, engaging layout.'/>

                    <ToggleTab code={testimonial5Code} setCode={setTestimonial5Code} setPreview={setTestimonial5Preview}
                               preview={testimonial5Preview}/>

                    <ComponentWrapper>
                        {testimonial5Preview && (
                            <div className='p-8 mb-4 flex items-center flex-col gap-5 justify-center'>
                                <div
                                    className='w-full 1024px:w-[75%] bg-primary text-secondary shadow-2xl rounded-lg p-6 relative'>
                                    <FaQuoteRight
                                        className='text-[4rem] text-[#e9e9e959] absolute top-[10%] right-[10%] '/>
                                    <div className='flex items-center gap-4 mt-4'>
                                        <img
                                            src='https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg&uid=R134535407&ga=GA1.1.71340048.1688965399&semt=sph'
                                            alt='demo/image'
                                            className='w-[40px] h-[40px] object-cover rounded-full'
                                        />
                                        <div>
                                            <h2 className='text-[1rem] font-[500]'>Jhone Dehon</h2>
                                            <p className='text-[0.9rem] text-[#e9e9e9]'>
                                                CEO of Miracle
                                            </p>
                                        </div>
                                    </div>

                                    <h2 className='text-[1.5rem] capitalize font-[500] mt-5 leading-[30px]'>
                                        such a life changing experience, higly recomanded!
                                    </h2>

                                    <p className=' text-justify text-[0.9rem] my-3 text-[#e9e9e9]'>
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                        Atque nesciunt saepe quam doloremque nulla cumque vero
                                        sequi, repellendus vel reiciendis? Eos totam quidem ducimus
                                        amet, in fuga quia minus ab!
                                    </p>
                                </div>
                            </div>
                        )}

                        {testimonial5Code && (
                            <Showcode
                                code='
import React from "react";

// react icons
import {FaQuoteRight} from "react-icons/fa";

const Testimonial = () => {

    return (
        <div className="w-full md:w-[75%] bg-[#3B9DF8] text-white shadow-2xl rounded-lg p-6 relative">
            <FaQuoteRight className="text-[4rem] text-[#e9e9e959] absolute top-[10%] right-[10%] "/>
            <div className="flex items-center gap-4 mt-4">
                <img
                    src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg&uid=R134535407&ga=GA1.1.71340048.1688965399&semt=sph"
                    alt="demo/image"
                    className="w-[40px] h-[40px] object-cover rounded-full"
                />
                <div>
                    <h2 className="text-[1rem] font-[500]">Jhone Dehon</h2>
                    <p className="text-[0.9rem] text-[#e9e9e9]">
                        CEO of Miracle
                    </p>
                </div>
            </div>

            <h2 className="text-[1.5rem] capitalize font-[500] mt-5 leading-[30px]">
                such a life changing experience, higly recomanded!
            </h2>

            <p className="text-justify text-[0.9rem] my-3 text-[#e9e9e9]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Atque nesciunt saepe quam doloremque nulla cumque vero
                sequi, repellendus vel reiciendis? Eos totam quidem ducimus
                amet, in fuga quia minus ab!
            </p>
        </div>
    );
};

export default Testimonial;
              '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader text={'testimonial 6'} id={'testimonial_6'}/>
                    </div>

                    <ComponentDescription text=' This is a testimonial component. Showcase user feedback and reviews
            with a stylish, engaging layout.'/>

                    <ToggleTab code={testimonial6Code} setCode={setTestimonial6Code} preview={testimonial6Preview}
                               setPreview={setTestimonial6Preview}/>

                    <ComponentWrapper>
                        {testimonial6Preview && (
                            <div className='p-8 mb-4 flex items-center flex-col gap-5 justify-center'>
                                <div
                                    className='w-full 1024px:w-[70%] dark:bg-slate-800 bg-secondary shadow-2xl rounded-lg '>
                                    <div className='relative'>
                                        <img
                                            src='https://img.freepik.com/free-photo/indoor-picture-cheerful-handsome-young-man-having-folded-hands-looking-directly-smiling-sincerely-wearing-casual-clothes_176532-10257.jpg?size=626&ext=jpg&uid=R134535407&ga=GA1.1.71340048.1688965399&semt=sph'
                                            alt='demo/image'
                                            className='w-full h-[200px] object-cover rounded-t-md border-b-[10px] border-[#e6e6e6]'
                                        />
                                        <FaQuoteRight
                                            className=' absolute -bottom-5 left-[5%] text-[3rem] text-[#ffffff] bg-primary p-3 rounded-full'/>
                                    </div>
                                    <div className='p-6'>
                                        <p className='dark:text-[#abc2d3] text-justify text-[0.9rem] my-3 text-text'>
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                            Atque nesciunt saepe quam doloremque nulla cumque vero
                                            sequi, repellendus vel reiciendis? Eos totam quidem
                                            ducimus amet, in fuga quia minus ab!
                                        </p>

                                        <div className='mt-4'>
                                            <h2 className='text-[1rem] dark:text-[#abc2d3] font-[500]'>Jhone Dehon</h2>
                                            <p className='text-[0.9rem] text-text dark:text-slate-400'>CEO of
                                                Miracle</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {testimonial6Code && (
                            <Showcode
                                code='
import React from "react";

// react icons
import {FaQuoteRight} from "react-icons/fa";

const Testimonial = () => {

    return (
        <div className="w-full md:w-[70%] dark:bg-slate-800 bg-white shadow-2xl rounded-lg ">
            <div className="relative">
                <img
                    src="https://img.freepik.com/free-photo/indoor-picture-cheerful-handsome-young-man-having-folded-hands-looking-directly-smiling-sincerely-wearing-casual-clothes_176532-10257.jpg?size=626&ext=jpg&uid=R134535407&ga=GA1.1.71340048.1688965399&semt=sph"
                    alt="demo/image"
                    className="w-full h-[200px] object-cover rounded-t-md border-b-[10px] border-[#e6e6e6]"
                />
                <FaQuoteRight
                    className=" absolute -bottom-5 left-[5%] text-[3rem] text-[#ffffff] bg-[#3B9DF8] p-3 rounded-full"/>
            </div>
            <div className="p-6">
                <p className="dark:text-[#abc2d3] text-justify text-[0.9rem] my-3 text-[#424242]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Atque nesciunt saepe quam doloremque nulla cumque vero
                    sequi, repellendus vel reiciendis? Eos totam quidem
                    ducimus amet, in fuga quia minus ab!
                </p>

                <div className="mt-4">
                    <h2 className="text-[1rem] dark:text-[#abc2d3] font-[500]">Jhone Dehon</h2>
                    <p className="text-[0.9rem] text-[#424242] dark:text-slate-400">CEO of Miracle</p>
                </div>
            </div>
        </div>
    );
};

export default Testimonial;
              '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader text={'testimonial 7'} id={'testimonial_7'}/>
                    </div>

                    <ComponentDescription text='This is a testimonial component. Showcase user feedback and reviews
            with a stylish, engaging layout.'/>

                    <ToggleTab code={testimonial7Code} setPreview={setTestimonial7Preview} preview={testimonial7Preview}
                               setCode={setTestimonial7Code}/>

                    <ComponentWrapper>
                        {testimonial7Preview && (
                            <div className='p-8 mb-4 flex items-center flex-col gap-5 justify-center'>
                                <div
                                    className='w-full border border-primary shadow-2xl rounded-lg flex flex-col 1024px:flex-row items-center justify-between gap-6 px-6 py-16'>
                                    <img
                                        src='https://img.freepik.com/free-photo/curly-man-with-broad-smile-shows-perfect-teeth-being-amused-by-interesting-talk-has-bushy-curly-dark-hair-stands-indoor-against-white-blank-wall_273609-17092.jpg?size=626&ext=jpg&uid=R134535407&ga=GA1.1.71340048.1688965399&semt=sph'
                                        alt='demo/image'
                                        className='w-[180px] h-[180px] object-cover rounded-full'
                                    />

                                    <div className='w-full 1024px:w-[65%] relative'>
                                        <div
                                            className='flex flex-col 1024px:flex-row flex-wrap gap-y-2 items-center justify-between relative'>
                                            <FaQuoteRight
                                                className=' absolute top-[-550%] 1024px:top-[-150%] left-[0%] text-[2rem] text-primary'/>
                                            <div className='flex items-center gap-2'>
                                                <h2 className='text-[1rem] dark:text-[#abc2d3] font-[500]'>
                                                    Jhone Dehon -
                                                </h2>
                                                <p className='text-[0.9rem] dark:text-[#abc2d3] text-[#9c9c9c]'>
                                                    CEO of Miracle
                                                </p>
                                            </div>
                                            <div className='flex items-center gap-1'>
                                                <FaStar className='text-[1.1rem] text-[#ffba24]'/>
                                                <FaStar className='text-[1.1rem] text-[#ffba24]'/>
                                                <FaStar className='text-[1.1rem] text-[#ffba24]'/>
                                                <FaStar className='text-[1.1rem] text-[#ffba24]'/>
                                                <FaRegStar className='text-[#ffba24] text-[1.1rem]'/>
                                            </div>
                                        </div>
                                        <h2 className='text-[1.5rem] dark:text-[#abc2d3] font-[500] capitalize mt-3'>
                                            amazing customer service
                                        </h2>
                                        <p className=' text-justify dark:text-[#abc2d3] text-[0.9rem] my-3 text-text'>
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                            Atque nesciunt saepe quam doloremque nulla cumque vero
                                            sequi, repellendus vel reiciendis? Eos totam quidem
                                            ducimus amet, in fuga quia minus ab!
                                        </p>
                                        <FaQuoteLeft
                                            className=' absolute bottom-[-10%] right-[0%] text-[2rem] text-primary'/>
                                    </div>
                                </div>
                            </div>
                        )}

                        {testimonial7Code && (
                            <Showcode
                                code='
import React from "react";

// react icons
import {FaQuoteLeft, FaQuoteRight, FaRegStar, FaStar} from "react-icons/fa";

const Testimonial = () => {

    return (
        <div
            className="w-full border border-[#3B9DF8] shadow-2xl rounded-lg flex flex-col md:flex-row items-center justify-between gap-6 px-6 py-16">
            <img
                src="https://img.freepik.com/free-photo/curly-man-with-broad-smile-shows-perfect-teeth-being-amused-by-interesting-talk-has-bushy-curly-dark-hair-stands-indoor-against-white-blank-wall_273609-17092.jpg?size=626&ext=jpg&uid=R134535407&ga=GA1.1.71340048.1688965399&semt=sph"
                alt="demo/image"
                className="w-[180px] h-[180px] object-cover rounded-full"
            />

            <div className="w-full md:w-[65%] relative">
                <div className="flex flex-col md:flex-row flex-wrap gap-y-2 items-center justify-between relative">
                    <FaQuoteRight
                        className=" absolute top-[-550%] md:top-[-150%] left-[0%] text-[2rem] text-[#3B9DF8]"/>
                    <div className="flex items-center gap-2">
                        <h2 className="text-[1rem] dark:text-[#abc2d3] font-[500]">
                            Jhone Dehon -
                        </h2>
                        <p className="text-[0.9rem] dark:text-[#abc2d3] text-[#9c9c9c]">
                            CEO of Miracle
                        </p>
                    </div>
                    <div className="flex items-center gap-1">
                        <FaStar className="text-[1.1rem] text-[#ffba24]"/>
                        <FaStar className="text-[1.1rem] text-[#ffba24]"/>
                        <FaStar className="text-[1.1rem] text-[#ffba24]"/>
                        <FaStar className="text-[1.1rem] text-[#ffba24]"/>
                        <FaRegStar className="text-[#ffba24] text-[1.1rem]"/>
                    </div>
                </div>
                <h2 className="text-[1.5rem] dark:text-[#abc2d3] font-[500] capitalize mt-3">
                    amazing customer service
                </h2>
                <p className="text-justify dark:text-[#abc2d3] text-[0.9rem] my-3 text-[#424242]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Atque nesciunt saepe quam doloremque nulla cumque vero
                    sequi, repellendus vel reiciendis? Eos totam quidem
                    ducimus amet, in fuga quia minus ab!
                </p>
                <FaQuoteLeft className="absolute bottom-[-10%] right-[0%] text-[2rem] text-[#3B9DF8]"/>
            </div>
        </div>
    );
};

export default Testimonial;
              '
                            />
                        )}
                    </ComponentWrapper>

                    <OverviewFooter
                        backUrl='/components/dialog-message'
                        backName='dialog'
                        forwardName='loader'
                        forwardUrl='/components/loader'
                    />
                </div>

                <ContentNavbar activeSection={activeSection} contents={testimonialContents}/>

            </aside>
            <Helmet>
                <title>Feedback - Testimonials</title>
            </Helmet>
        </>
    );
};

export default Testimonial;
