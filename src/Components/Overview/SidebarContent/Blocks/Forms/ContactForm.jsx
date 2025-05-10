import React, {useState} from "react";

// components
import ContentHeader from "@shared/ContentHeader.jsx";
import {Helmet} from "react-helmet";
import BlocksShowCode from "@shared/Block/BlocksShowCode.jsx";

// icons
import BlocksFooter from "@shared/Block/BlocksFooter.jsx";
import utils from "@utils/index.jsx";
import {IoLocationOutline} from "react-icons/io5";
import {MdOutlineCall, MdOutlineEmail} from "react-icons/md";
import {CgFacebook} from "react-icons/cg";
import {BsInstagram, BsLinkedin, BsTwitter} from "react-icons/bs";

import BlockDescription from "@shared/Block/BlockDescription.jsx";
import BlockToggleTab from "@shared/Block/BlockToggleTab.jsx";
import BlockWrapper from "@shared/Block/BlockWrapper.jsx";


const ContactForm = () => {

    const [contactForm1Preview, setContactForm1Preview] = useState(true)
    const [contactForm1Code, setContactForm1Code] = useState(false)

    const [contactForm2Preview, setContactForm2Preview] = useState(true)
    const [contactForm2Code, setContactForm2Code] = useState(false)

    const [contactForm3Preview, setContactForm3Preview] = useState(true)
    const [contactForm3Code, setContactForm3Code] = useState(false)

    const [contactForm4Preview, setContactForm4Preview] = useState(true)
    const [contactForm4Code, setContactForm4Code] = useState(false)

    return (
        <aside className="flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10">
            <div>
                <ContentHeader text={"Contact form 1"} id={"contact_form_1"}/>

                <BlockDescription
                    text='A form where users can submit inquiries or messages, typically including fields for name, email, and a message.'/>

                <BlockToggleTab preview={contactForm1Preview} setPreview={setContactForm1Preview}
                                setCode={setContactForm1Code} code={contactForm1Code}/>

                <BlockWrapper>
                    {contactForm1Preview && (
                        <div className={`p-8  flex flex-wrap items-center gap-5 justify-center overflow-hidden`}>
                            <section className='w-full'>

                                {/* title */}
                                <div className='w-full flex flex-col items-center justify-center'>
                                    <h1 className='text-[2rem] font-bold text-primary leading-[36px]'>Contact Us</h1>
                                    <p className='text-[1rem] dark:text-slate-400 text-text'>This is an animated button
                                        on click component.</p>
                                </div>

                                {/* form area */}
                                <form className='w-full mt-[50px]'>
                                    <div className='flex flex-col 640px:flex-row items-center gap-[20px]'>
                                        <div className='flex flex-col gap-[5px] w-full 640px:w-[50%]'>
                                            <label className="relative">
                                                <input type="text"
                                                       className="peer border-[#e5eaf2] border rounded-md outline-none px-4 py-3 dark:bg-transparent dark:border-slate-700 dark:placeholder:text-slate-500 dark:text-[#abc2d3] w-full focus:border-[#3B9DF8] transition-colors duration-300"
                                                />
                                                <span
                                                    className=" absolute top-3 left-5 peer-focus:-top-3 peer-focus:bg-white dark:peer-focus:bg-darkBgColor peer-focus:left-2 peer-focus:scale-[0.9] peer-focus:text-[#3B9DF8] text-[#777777] peer-focus:px-1 transition-all duration-300 ">
                                                    Your name
                                                </span>
                                            </label>
                                        </div>

                                        <div className='flex flex-col gap-[5px] w-full 640px:w-[50%]'>
                                            <label className="relative">
                                                <input type="email"
                                                       className="peer border-[#e5eaf2] border rounded-md outline-none px-4 py-3 w-full dark:bg-transparent dark:border-slate-700 dark:placeholder:text-slate-500 dark:text-[#abc2d3] focus:border-[#3B9DF8] transition-colors duration-300"
                                                />
                                                <span
                                                    className=" absolute top-3 left-5 peer-focus:-top-3 peer-focus:bg-white dark:peer-focus:bg-darkBgColor peer-focus:left-2 peer-focus:scale-[0.9] peer-focus:text-[#3B9DF8] text-[#777777] peer-focus:px-1 transition-all duration-300 ">
                                                    Email Address
                                                </span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className='flex flex-col gap-[5px] w-full mt-[20px]'>
                                        <label className="relative w-full">
                                            <textarea
                                                className="peer min-h-[200px] border-[#e5eaf2] border rounded-md outline-none dark:bg-transparent dark:border-slate-700 dark:placeholder:text-slate-500 dark:text-[#abc2d3] px-4 py-3 w-full focus:border-[#3B9DF8] transition-colors duration-300"
                                            ></textarea>
                                            <span
                                                className=" absolute top-3 left-5 peer-focus:-top-3 peer-focus:bg-white dark:peer-focus:bg-darkBgColor peer-focus:left-2 peer-focus:scale-[0.9] peer-focus:text-[#3B9DF8] text-[#777777] peer-focus:px-1 transition-all duration-300 ">
                                                    Write Message
                                                </span>
                                        </label>
                                    </div>


                                    <button type='submit' className={`${utils.buttonSecondary} mt-[10px]`}>Submit
                                    </button>

                                </form>
                            </section>
                        </div>
                    )}

                    {contactForm1Code && <BlocksShowCode code='
import React from "react";

const ContactForm = () => {
    return (
        <section className="w-full">

            {/* title */}
            <div className="w-full flex flex-col items-center justify-center">
                <h1 className="text-[2rem] font-bold text-[#3B9DF8] leading-[36px]">Contact Us</h1>
                <p className="text-[1rem] dark:text-slate-400 text-[#424242]">This is an animated button on click
                    component.</p>
            </div>

            {/* form area */}
            <form className="w-full mt-[50px]">
                <div className="flex flex-col sm:flex-row items-center gap-[20px]">
                    <div className="flex flex-col gap-[5px] w-full sm:w-[50%]">
                        <label className="relative">
                            <input type="text"
                                   className="peer border-[#e5eaf2] border rounded-md outline-none px-4 py-3 dark:bg-transparent dark:border-slate-700 dark:placeholder:text-slate-500 dark:text-[#abc2d3] w-full focus:border-[#3B9DF8] transition-colors duration-300"
                            />
                            <span
                                className=" absolute top-3 left-5 peer-focus:-top-3 peer-focus:bg-white dark:peer-focus:bg-darkBgColor peer-focus:left-2 peer-focus:scale-[0.9] peer-focus:text-[#3B9DF8] text-[#777777] peer-focus:px-1 transition-all duration-300 ">
                                                    Your name
                                                </span>
                        </label>
                    </div>

                    <div className="flex flex-col gap-[5px] w-full sm:w-[50%]">
                        <label className="relative">
                            <input type="email"
                                   className="peer border-[#e5eaf2] border rounded-md outline-none px-4 py-3 w-full dark:bg-transparent dark:border-slate-700 dark:placeholder:text-slate-500 dark:text-[#abc2d3] focus:border-[#3B9DF8] transition-colors duration-300"
                            />
                            <span
                                className=" absolute top-3 left-5 peer-focus:-top-3 peer-focus:bg-white dark:peer-focus:bg-darkBgColor peer-focus:left-2 peer-focus:scale-[0.9] peer-focus:text-[#3B9DF8] text-[#777777] peer-focus:px-1 transition-all duration-300 ">
                                                    Email Address
                                                </span>
                        </label>
                    </div>
                </div>

                <div className="flex flex-col gap-[5px] w-full mt-[20px]">
                    <label className="relative w-full">
                                            <textarea
                                                className="peer min-h-[200px] border-[#e5eaf2] border rounded-md outline-none dark:bg-transparent dark:border-slate-700 dark:placeholder:text-slate-500 dark:text-[#abc2d3] px-4 py-3 w-full focus:border-[#3B9DF8] transition-colors duration-300"
                                            ></textarea>
                        <span
                            className=" absolute top-3 left-5 peer-focus:-top-3 peer-focus:bg-white dark:peer-focus:bg-darkBgColor peer-focus:left-2 peer-focus:scale-[0.9] peer-focus:text-[#3B9DF8] text-[#777777] peer-focus:px-1 transition-all duration-300 ">
                                                    Write Message
                                                </span>
                    </label>
                </div>


                <button type="submit" className="py-2 px-6 border border-[#3B9DF8] text-[#3B9DF8] rounded font-[500] relative overflow-hidden z-10 mt-[10px]">Submit</button>

            </form>
        </section>
    );
};

export default ContactForm;
                    '/>
                    }
                </BlockWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"Contact form 3"} id={"contact_form_3"}/>
                </div>

                <BlockDescription
                    text='A form where users can submit inquiries or messages, typically including fields for name, email, and a message.'/>

                <BlockToggleTab preview={contactForm2Preview} setPreview={setContactForm2Preview}
                                code={contactForm2Code} setCode={setContactForm2Code}/>

                <BlockWrapper>
                    {contactForm2Preview && (
                        <div className={`p-8  flex flex-wrap items-center gap-5 justify-center overflow-hidden`}>
                            <section
                                className='w-full 1260px:flex-row flex items-center gap-[30px] flex-col justify-between bg-[#0A0D17] p-[40px] rounded-xl'>

                                {/* form area */}
                                <form className='1260px:w-[60%] w-full'>

                                    <div className='1260px:w-[80%] w-full mx-auto'>
                                        <div className='text-white'>
                                            <h1 className='text-[1.7rem] font-[600] leading-[35px]'>Let’s connect
                                                constellations</h1>
                                            <p className='text-[0.9rem] mt-2 mb-8'>Let's align our constellations! Reach
                                                out and
                                                let the magic of collaboration illuminate our skies.</p>
                                        </div>

                                        <div className='flex 640px:flex-row flex-col items-center gap-[20px]'>
                                            <div className='flex flex-col gap-[5px] w-full 640px:w-[50%]'>
                                                <input type="text"
                                                       placeholder='Your name'
                                                       className="peer border-[#383844] border rounded-md outline-none px-4 py-3 w-full bg-[#22222f] text-gray-400 transition-colors duration-300"
                                                />
                                            </div>

                                            <div className='flex flex-col gap-[5px] w-full 640px:w-[50%]'>
                                                <input type="email"
                                                       placeholder='Email address'
                                                       className="peer border-[#383844] border rounded-md outline-none px-4 py-3 w-full bg-[#22222f] text-gray-400 transition-colors duration-300"
                                                />
                                            </div>
                                        </div>

                                        <div className='flex flex-col gap-[5px] w-full mt-[20px]'>
                                            <textarea
                                                placeholder='Write message'
                                                className="peer min-h-[200px] border-[#383844] border rounded-md outline-none px-4 bg-[#22222f] py-3 w-full text-gray-400 transition-colors duration-300"
                                            ></textarea>
                                        </div>


                                        <button type='submit'
                                                className={`py-2.5 px-6 bg-gradient-to-r from-[#763AF5] to-[#A604F2] text-white rounded-md text-[1rem] mt-[10px] w-full`}>Send
                                            it to the moon
                                        </button>

                                    </div>

                                </form>

                                {/*  image  */}
                                <div className=''>
                                    <img src='https://i.ibb.co/h7rjVJS/Image.png' alt='image' className='w-full'/>
                                </div>
                            </section>
                        </div>
                    )}

                    {contactForm2Code && <BlocksShowCode code='
import React from "react";

const ContactForm = () => {

    return (
        <section
            className="w-full lg:flex-row flex items-center gap-[30px] flex-col justify-between bg-[#0A0D17] p-[40px] rounded-xl">

            {/* form area */}
            <form className="lg:w-[60%] w-full">

                <div className="lg:w-[80%] w-full mx-auto">
                    <div className="text-white">
                        <h1 className="text-[1.7rem] font-[600] leading-[35px]">Let’s connect constellations</h1>
                        <p className="text-[0.9rem] mt-2 mb-8">Let"s align our constellations! Reach out and
                            let the magic of collaboration illuminate our skies.</p>
                    </div>

                    <div className="flex sm:flex-row flex-col items-center gap-[20px]">
                        <div className="flex flex-col gap-[5px] w-full sm:w-[50%]">
                            <input type="text"
                                   placeholder="Your name"
                                   className="peer border-[#383844] border rounded-md outline-none px-4 py-3 w-full bg-[#22222f] text-gray-400 transition-colors duration-300"
                            />
                        </div>

                        <div className="flex flex-col gap-[5px] w-full sm:w-[50%]">
                            <input type="email"
                                   placeholder="Email address"
                                   className="peer border-[#383844] border rounded-md outline-none px-4 py-3 w-full bg-[#22222f] text-gray-400 transition-colors duration-300"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-[5px] w-full mt-[20px]">
                                            <textarea
                                                placeholder="Write message"
                                                className="peer min-h-[200px] border-[#383844] border rounded-md outline-none px-4 bg-[#22222f] py-3 w-full text-gray-400 transition-colors duration-300"
                                            ></textarea>
                    </div>


                    <button type="submit"
                            className={`py-2.5 px-6 bg-gradient-to-r from-[#763AF5] to-[#A604F2] text-white rounded-md text-[1rem] mt-[10px] w-full`}>Send
                        it to the moon
                    </button>

                </div>

            </form>

            {/*  image  */}
            <div className="">
                <img src="https://i.ibb.co/h7rjVJS/Image.png" alt="image" className="w-full"/>
            </div>
        </section>
    );
};

export default ContactForm;
                    '/>
                    }
                </BlockWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"Contact form 4"} id={"contact_form_4"}/>
                </div>

                <BlockDescription
                    text=' A form where users can submit inquiries or messages, typically including fields for name, email, and a message.'/>

                <BlockToggleTab preview={contactForm3Preview} setCode={setContactForm3Code}
                                setPreview={setContactForm3Preview} code={contactForm3Code}/>

                <BlockWrapper>
                    {contactForm3Preview && (
                        <div className={`p-8  flex flex-wrap items-center gap-5 justify-center overflow-hidden`}>
                            <section
                                className='w-full grid grid-cols-1 1260px:grid-cols-2 gap-[30px] boxShadow p-[40px] rounded-xl'>

                                {/* form area */}
                                <form className='w-full'>

                                    <div className='text-gray-800'>
                                        <h1 className='text-[2rem] dark:text-[#abc2d3] font-[600] leading-[35px]'>Get
                                            in <span className='text-green-400'>touch</span></h1>
                                        <p className='text-[0.9rem] dark:text-slate-400 mt-2 mb-8'>Let's align our
                                            constellations! Reach out and
                                            let the magic of collaboration illuminate our skies.</p>
                                    </div>

                                    <div className='flex 640px:flex-row flex-col items-center gap-[20px]'>
                                        <div className='flex flex-col gap-[5px] w-full 640px:w-[50%]'>
                                            <input type="text"
                                                   placeholder='Your name'
                                                   className="peer dark:bg-slate-900 dark:border-slate-700 dark:placeholder:text-slate-500 dark:text-[#abc2d3] border-gray-300 border rounded-md outline-none px-4 py-3 w-full text-gray-400 transition-colors duration-300"
                                            />
                                        </div>

                                        <div className='flex flex-col gap-[5px] w-full 640px:w-[50%]'>
                                            <input type="email"
                                                   placeholder='Email address'
                                                   className="peer dark:bg-slate-900 dark:border-slate-700 dark:placeholder:text-slate-500 dark:text-[#abc2d3] border-gray-300 border rounded-md outline-none px-4 py-3 w-full text-gray-400 transition-colors duration-300"
                                            />
                                        </div>
                                    </div>

                                    <div className='flex flex-col gap-[5px] w-full mt-[20px]'>
                                            <textarea
                                                placeholder='Write message'
                                                className="peer dark:bg-slate-900 dark:border-slate-700 dark:placeholder:text-slate-500 dark:text-[#abc2d3] min-h-[200px] border-gray-300 border rounded-md outline-none px-4 py-3 w-full text-gray-400 transition-colors duration-300"
                                            ></textarea>
                                    </div>


                                    <button type='submit'
                                            className='dark:text-[#abc2d3] py-2.5 px-6 bg-gray-800 text-white rounded-md text-[1rem] mt-[10px] w-full'>Submit
                                    </button>

                                </form>

                                {/*  image  */}
                                <div className='h-full'>
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57903.02583821205!2d91.81983571134349!3d24.900058347354335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375054d3d270329f%3A0xf58ef93431f67382!2sSylhet!5e0!3m2!1sen!2sbd!4v1723916219404!5m2!1sen!2sbd"
                                        allowFullScreen="" loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        className='w-full h-full rounded-md'></iframe>
                                </div>
                            </section>
                        </div>
                    )}

                    {contactForm3Code && <BlocksShowCode code='
import React from "react";

const ContactForm = () => {
    return (
        <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-[30px] shadow-md p-[40px] rounded-xl">

            {/* form area */}
            <form className="w-full">

                <div className="text-gray-800">
                    <h1 className="text-[2rem] dark:text-[#abc2d3] font-[600] leading-[35px]">Get in <span
                        className="text-green-400">touch</span></h1>
                    <p className="text-[0.9rem] dark:text-slate-400 mt-2 mb-8">Let"s align our constellations! Reach out
                        and
                        let the magic of collaboration illuminate our skies.</p>
                </div>

                <div className="flex sm:flex-row flex-col items-center gap-[20px]">
                    <div className="flex flex-col gap-[5px] w-full sm:w-[50%]">
                        <input type="text"
                               placeholder="Your name"
                               className="peer dark:bg-slate-900 dark:border-slate-700 dark:placeholder:text-slate-500 dark:text-[#abc2d3] border-gray-300 border rounded-md outline-none px-4 py-3 w-full text-gray-400 transition-colors duration-300"
                        />
                    </div>

                    <div className="flex flex-col gap-[5px] w-full sm:w-[50%]">
                        <input type="email"
                               placeholder="Email address"
                               className="peer dark:bg-slate-900 dark:border-slate-700 dark:placeholder:text-slate-500 dark:text-[#abc2d3] border-gray-300 border rounded-md outline-none px-4 py-3 w-full text-gray-400 transition-colors duration-300"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-[5px] w-full mt-[20px]">
                                            <textarea
                                                placeholder="Write message"
                                                className="peer dark:bg-slate-900 dark:border-slate-700 dark:placeholder:text-slate-500 dark:text-[#abc2d3] min-h-[200px] border-gray-300 border rounded-md outline-none px-4 py-3 w-full text-gray-400 transition-colors duration-300"
                                            ></textarea>
                </div>


                <button type="submit"
                        className="dark:text-[#abc2d3] py-2.5 px-6 bg-gray-800 text-white rounded-md text-[1rem] mt-[10px] w-full">Submit
                </button>

            </form>

            {/*  image  */}
            <div className="h-full">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57903.02583821205!2d91.81983571134349!3d24.900058347354335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375054d3d270329f%3A0xf58ef93431f67382!2sSylhet!5e0!3m2!1sen!2sbd!4v1723916219404!5m2!1sen!2sbd"
                    allowFullScreen="" loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade" className="w-full h-full rounded-md"></iframe>
            </div>
        </section>
    );
};

export default ContactForm;
                    '/>
                    }
                </BlockWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"Contact form 5"} id={"contact_form_5"}/>
                </div>

                <BlockDescription
                    text='A form where users can submit inquiries or messages, typically including fields for name, email, and a message.'/>

                <BlockToggleTab preview={contactForm4Preview} code={contactForm4Code}
                                setPreview={setContactForm4Preview} setCode={setContactForm4Code}/>

                <BlockWrapper>
                    {contactForm4Preview && (
                        <div className={`p-8  flex flex-wrap items-center gap-5 justify-center overflow-hidden`}>
                            <section
                                className='w-full grid grid-cols-1 1260px:grid-cols-2 gap-[35px] boxShadow p-[30px] rounded-xl'>

                                {/*  informations  */}
                                <aside
                                    className='w-full bg-gray-800 dark:bg-slate-900 flex flex-col justify-between p-[25px] rounded-md'>

                                    <div>
                                        <h1 className='text-[2rem] font-[600] leading-[35px] text-white'>Contact
                                            Information</h1>
                                        <p className='text-[0.9rem] mt-1 mb-8 text-white'>Say something to start a live
                                            chat!</p>
                                    </div>

                                    <div className='flex flex-col gap-[20px] text-gray-300'>
                                        <p className='flex items-center gap-[8px]'>
                                            <MdOutlineCall/>
                                            +8801305282768
                                        </p>
                                        <p className='flex items-center break-all gap-[8px]'>
                                            <MdOutlineEmail/>
                                            zenuilibrary@gmail.com
                                        </p>
                                        <p className='flex items-center gap-[8px]'>
                                            <IoLocationOutline/>
                                            Kulaura, Moulvibazar, Sylhet
                                        </p>
                                    </div>

                                    <div className='flex gap-[15px] flex-wrap text-black mt-8'>
                                        <a className='text-[1.3rem] p-1.5 cursor-pointer rounded-full bg-orange-500 text-white hover:bg-white hover:text-orange-500 transition-all duration-300  boxShadow'>
                                            <CgFacebook/>
                                        </a>
                                        <a className='text-[1.2rem] p-1.5 cursor-pointer rounded-full  bg-orange-500 text-white hover:bg-white hover:text-orange-500 transition-all duration-300 boxShadow'>
                                            <BsTwitter/>
                                        </a>
                                        <a className='text-[1.2rem] p-1.5 cursor-pointer rounded-full bg-orange-500 text-white hover:bg-white hover:text-orange-500 transition-all duration-300  boxShadow'>
                                            <BsInstagram/>
                                        </a>
                                        <a className='text-[1.2rem] p-1.5 cursor-pointer rounded-full  bg-orange-500 text-white hover:bg-white hover:text-orange-500 transition-all duration-300 boxShadow'>
                                            <BsLinkedin/>
                                        </a>
                                    </div>
                                </aside>

                                {/* form area */}
                                <form className='pt-[20px]'>
                                    <div className='flex flex-col 640px:flex-row items-center gap-[30px]'>
                                        <div className='flex flex-col gap-[5px] w-full 640px:w-[50%]'>
                                            <label className='text-[1rem] dark:text-[#abc2d3] text-gray-700'>First
                                                Name</label>
                                            <input type="text"
                                                   className="peer dark:bg-transparent dark:text-[#abc2d3] dark:border-slate-700 border-gray-300 border-b outline-none focus:border-primary w-full text-gray-400 transition-colors duration-300"
                                            />
                                        </div>

                                        <div className='flex flex-col gap-[5px] w-full 640px:w-[50%]'>
                                            <label className='text-[1rem] dark:text-[#abc2d3] text-gray-700'>Last
                                                Name</label>
                                            <input type="text"
                                                   className="peer dark:bg-transparent dark:text-[#abc2d3] dark:border-slate-700 border-gray-300 border-b outline-none focus:border-primary w-full text-gray-400 transition-colors duration-300"
                                            />
                                        </div>
                                    </div>

                                    <div className='flex flex-col 640px:flex-row items-center gap-[30px] mt-10'>
                                        <div className='flex flex-col gap-[5px] w-full 640px:w-[50%]'>
                                            <label className='text-[1rem] dark:text-[#abc2d3] text-gray-700'>Email
                                                Address</label>
                                            <input type="email"
                                                   className="peer dark:bg-transparent dark:text-[#abc2d3] dark:border-slate-700 border-gray-300 border-b outline-none focus:border-primary w-full text-gray-400 transition-colors duration-300"
                                            />
                                        </div>

                                        <div className='flex flex-col gap-[5px] w-full 640px:w-[50%]'>
                                            <label className='text-[1rem] dark:text-[#abc2d3] text-gray-700'>Phone
                                                Number</label>
                                            <input type="number"
                                                   className="peer dark:bg-transparent dark:text-[#abc2d3] dark:border-slate-700 border-gray-300 border-b outline-none focus:border-primary w-full text-gray-400 transition-colors duration-300"
                                            />
                                        </div>
                                    </div>

                                    <div className='flex flex-col gap-[5px] w-full mt-10'>
                                        <label className='text-[1rem] dark:text-[#abc2d3] text-gray-700'>Write
                                            Message</label>
                                        <textarea
                                            className="peer dark:bg-transparent dark:text-[#abc2d3] dark:border-slate-700 min-h-[100px] border-gray-300 border-b resize-none outline-none w-full text-gray-400 transition-colors focus:border-primary duration-300"
                                        ></textarea>
                                    </div>


                                    <div
                                        className='w-full flex items-center 640px:items-end justify-center 640px:justify-end mt-5'>
                                        <button type='submit'
                                                className='dark:border-slate-700 dark:text-[#abc2d3] dark:hover:bg-slate-900 dark:hover:text-[#abc2d3] dark:hover:border-slate-700 py-2.5 px-6 bg-gray-800 border transition-all duration-300 hover:border-gray-800 hover:text-gray-800 hover:bg-transparent text-white rounded-md text-[1rem] mt-[10px] w-max'>Send
                                            Message
                                        </button>
                                    </div>

                                </form>
                            </section>
                        </div>
                    )}

                    {contactForm4Code && <BlocksShowCode code='
import React from "react";

// react icons
import {MdOutlineCall, MdOutlineEmail} from "react-icons/md";
import {IoLocationOutline} from "react-icons/io5";
import {CgFacebook} from "react-icons/cg";
import {BsInstagram, BsLinkedin, BsTwitter} from "react-icons/bs";

const ContactForm = () => {
    return (
        <section className="w-full grid grid-cols-1 md:grid-cols-2 gap-[35px] boxShadow p-[30px] rounded-xl">

            {/*  informations  */}
            <aside className="w-full bg-gray-800 dark:bg-slate-900 flex flex-col justify-between p-[25px] rounded-md">

                <div>
                    <h1 className="text-[2rem] font-[600] leading-[35px] text-white">Contact
                        Information</h1>
                    <p className="text-[0.9rem] mt-1 mb-8 text-white">Say something to start a live
                        chat!</p>
                </div>

                <div className="flex flex-col gap-[20px] text-gray-300">
                    <p className="flex items-center gap-[8px]">
                        <MdOutlineCall/>
                        +8801305282768
                    </p>
                    <p className="flex items-center break-all gap-[8px]">
                        <MdOutlineEmail/>
                        zenuilibrary@gmail.com
                    </p>
                    <p className="flex items-center gap-[8px]">
                        <IoLocationOutline/>
                        Kulaura, Moulvibazar, Sylhet
                    </p>
                </div>

                <div className="flex gap-[15px] flex-wrap text-black mt-8">
                    <a className="text-[1.3rem] p-1.5 cursor-pointer rounded-full bg-orange-500 text-white hover:bg-white hover:text-orange-500 transition-all duration-300  boxShadow">
                        <CgFacebook/>
                    </a>
                    <a className="text-[1.2rem] p-1.5 cursor-pointer rounded-full  bg-orange-500 text-white hover:bg-white hover:text-orange-500 transition-all duration-300 boxShadow">
                        <BsTwitter/>
                    </a>
                    <a className="text-[1.2rem] p-1.5 cursor-pointer rounded-full bg-orange-500 text-white hover:bg-white hover:text-orange-500 transition-all duration-300  boxShadow">
                        <BsInstagram/>
                    </a>
                    <a className="text-[1.2rem] p-1.5 cursor-pointer rounded-full  bg-orange-500 text-white hover:bg-white hover:text-orange-500 transition-all duration-300 boxShadow">
                        <BsLinkedin/>
                    </a>
                </div>
            </aside>

            {/* form area */}
            <form className="pt-[20px]">
                <div className="flex flex-col sm:flex-row items-center gap-[30px]">
                    <div className="flex flex-col gap-[5px] w-full sm:w-[50%]">
                        <label className="text-[1rem] dark:text-[#abc2d3] text-gray-700">First Name</label>
                        <input type="text"
                               className="peer dark:bg-transparent dark:text-[#abc2d3] dark:border-slate-700 border-gray-300 border-b outline-none focus:border-[#3B9DF8] w-full text-gray-400 transition-colors duration-300"
                        />
                    </div>

                    <div className="flex flex-col gap-[5px] w-full sm:w-[50%]">
                        <label className="text-[1rem] dark:text-[#abc2d3] text-gray-700">Last Name</label>
                        <input type="text"
                               className="peer dark:bg-transparent dark:text-[#abc2d3] dark:border-slate-700 border-gray-300 border-b outline-none focus:border-[#3B9DF8] w-full text-gray-400 transition-colors duration-300"
                        />
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-[30px] mt-10">
                    <div className="flex flex-col gap-[5px] w-full sm:w-[50%]">
                        <label className="text-[1rem] dark:text-[#abc2d3] text-gray-700">Email Address</label>
                        <input type="email"
                               className="peer dark:bg-transparent dark:text-[#abc2d3] dark:border-slate-700 border-gray-300 border-b outline-none focus:border-[#3B9DF8] w-full text-gray-400 transition-colors duration-300"
                        />
                    </div>

                    <div className="flex flex-col gap-[5px] w-full sm:w-[50%]">
                        <label className="text-[1rem] dark:text-[#abc2d3] text-gray-700">Phone Number</label>
                        <input type="number"
                               className="peer dark:bg-transparent dark:text-[#abc2d3] dark:border-slate-700 border-gray-300 border-b outline-none focus:border-[#3B9DF8] w-full text-gray-400 transition-colors duration-300"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-[5px] w-full mt-10">
                    <label className="text-[1rem] dark:text-[#abc2d3] text-gray-700">Write Message</label>
                    <textarea
                        className="peer dark:bg-transparent dark:text-[#abc2d3] dark:border-slate-700 min-h-[100px] border-gray-300 border-b resize-none outline-none w-full text-gray-400 transition-colors focus:border-[#3B9DF8] duration-300"
                    ></textarea>
                </div>


                <div className="w-full flex items-center sm:items-end justify-center sm:justify-end mt-5">
                    <button type="submit"
                            className="dark:border-slate-700 dark:text-[#abc2d3] dark:hover:bg-slate-900 dark:hover:text-[#abc2d3] dark:hover:border-slate-700 py-2.5 px-6 bg-gray-800 border transition-all duration-300 hover:border-gray-800 hover:text-gray-800 hover:bg-transparent text-white rounded-md text-[1rem] mt-[10px] w-max">Send
                        Message
                    </button>
                </div>

            </form>
        </section>
    );
};

export default ContactForm;
                    '/>
                    }
                </BlockWrapper>

                <BlocksFooter backUrl='/blocks/responsive-footer' backName='responsive footer'
                              forwardName='multi step form' forwardUrl='/blocks/multi-step-form'/>
            </div>


            <Helmet>
                <title>Blocks - Contact Form</title>
            </Helmet>
        </aside>
    );
};

export default ContactForm;
