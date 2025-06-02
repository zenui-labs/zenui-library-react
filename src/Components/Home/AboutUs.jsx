// animation tilt
import Tilt from 'react-parallax-tilt';

// icons
import {FaFacebook, FaLinkedin} from "react-icons/fa";
import {FaXTwitter} from "react-icons/fa6";
import {SiGmail} from "react-icons/si";

// components
import Team from "./Team.jsx";
import SectionWrapper from "./SectionWrapper.jsx";
import MetricsCard from "./MetricsCard.jsx";

const Hero = () => {

    return (<>
        <>

            <SectionWrapper className='flex 1024px:flex-row flex-col gap-[50px] 1024px:flex-row-[60px]'>
                <Tilt>
                    <svg className="absolute -top-[999px] -left-[999px] w-0 h-0">
                        <defs>
                            <clipPath id="clip-goey6" clipPathUnits="objectBoundingBox">
                                <path
                                    d="M0.0249688 0 C0.0111789 0 0 0.0112775 0 0.0251889 V0.851385 C0 0.865297 0.0111789 0.876574 0.0249688 0.876574 H0.159775 A0.02 0.02 0 0 1 0.179775 0.896574 V0.974811 C0.179775 0.988723 0.190954 1 0.204744 1 H0.975031 C0.988821 1 1 0.988723 1 0.974811 V0.157431 C1 0.143519 0.988821 0.132242 0.975031 0.132242 H0.830237 A0.02 0.02 0 0 1 0.810237 0.112242 V0.0251889 C0.810237 0.0112775 0.799058 0 0.785268 0 H0.0249688 Z"
                                    fill="black"
                                />
                            </clipPath>
                        </defs>
                    </svg>

                    <figure style={{clipPath: 'url(#clip-goey6)'}} className="2xl:h-[44rem]">
                        <img
                            src="/asfak_ahmed_ceo_of_zenui.jpg"
                            alt="Description"
                            className="1024px:w-[650px] w-full object-cover transition-transform duration-300 hover:scale-105"
                        />
                    </figure>
                </Tilt>

                <div className='1024px:w-[70%] w-full'>
                    <h1 className='font-bold text-gray-800 text-[2.3rem] dark:text-darkTextColor 1024px:text-[3rem] leading-[40px]'>Asfak
                        Ahmed</h1>
                    <h4 className='text-[1rem] text-[#0FABCA] mt-2 dark:text-darkSubTextColor/80'>Founder &
                        Creator</h4>

                    <p className='mt-5 '>
                        <p className=' text-[1rem] dark:text-darkSubTextColor text-black/80'>
                            Welcome to ZenUI, A Open-Source React and Tailwind CSS UI components library dedicated
                            to
                            providing developers with the tools they need to create stunning, responsive websites
                            effortlessly. Founded by Asfak Ahmed, ZenUI aims to simplify the development process by
                            offering a comprehensive collection of pre-built UI components, website templates, and
                            more.
                        </p>

                        <p className='mt-4 text-[1rem] dark:text-darkSubTextColor text-black/80'>
                            Our mission is to empower developers to build beautiful, functional web applications
                            without
                            the hassle of designing from scratch. At ZenUI, we believe that great design and
                            seamless
                            functionality should be accessible to everyone. That's why we've meticulously crafted a
                            library of UI components that are not only visually appealing but also highly
                            customizable
                            and easy to integrate.
                        </p>

                        <p className='mt-4 text-[1rem] dark:text-darkSubTextColor text-black/80'>
                            Each component is designed with a focus on user experience, ensuring that your
                            applications
                            look great and perform flawlessly across all devices. Beyond our extensive library of UI
                            components and pre-built website templates, we also provide a rich collection of free
                            icons
                            with customization accessibility, essential blocks, and a versatile color palette. These
                            additional resources are thoughtfully designed to give developers the creative freedom
                            to
                            bring their vision to life, making ZenUI the go-to choice for modern web development.
                        </p>
                    </p>

                    <div className="flex items-center gap-4 mt-5">

                        <a href="https://web.facebook.com/asfak00" target='_blank' rel="noreferrer">
                            <FaFacebook
                                className="text-black/60 text-[1.4rem] hover:text-[#0FABCA] transition-colors duration-300"/>
                        </a>

                        <a href="https://www.linkedin.com/in/asfakahmed/" target='_blank' rel="noreferrer">
                            <FaLinkedin
                                className="text-black/60 text-[1.4rem] hover:text-[#0FABCA] transition-colors duration-300"/>
                        </a>

                        <a href="https://x.com/asfak00" target='_blank' rel="noreferrer">
                            <FaXTwitter
                                className="text-black/60 text-[1.4rem] hover:text-[#0FABCA] transition-colors duration-300"/>
                        </a>

                        <a href="mailto:asfakahmed680@gmail.com">
                            <SiGmail
                                className="text-black/60 text-[1.4rem] hover:text-[#0FABCA] transition-colors duration-300"/>
                        </a>
                    </div>

                </div>
            </SectionWrapper>

            <Team/>

            <MetricsCard/>
        </>
    </>);
};

export default Hero;
