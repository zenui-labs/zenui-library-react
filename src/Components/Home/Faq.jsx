import React, {useState} from 'react';

import SectionHead from "./SectionHead.jsx";
import SectionWrapper from "./SectionWrapper.jsx";

const Faq = () => {

    const [isAccording1, setIsAccording1] = useState(null);
    const [isAccording2, setIsAccording2] = useState(null);
 
    const accordingData1 = [
        {
            title: "What is ZenUI Library?",
            description:
                "ZenUI Library is a free collection of UI components and templates designed for developers and businesses. It offers a variety of pre-built components, website templates, essential blocks, and SVG icons to help speed up web development.",
        },
        {
            title: "Is ZenUI Library free to use?",
            description:
                "Yes, ZenUI Library is completely free to use. It provides high-quality UI components and templates at no cost, making it accessible to everyone.",
        },
        {
            title: "Can I customize the components in ZenUI Library?",
            description:
                `Absolutely! All components in ZenUI Library are fully customizable. You can modify them to fit your project's design requirements using your preferred CSS framework or custom styles.`,
        },

        {
            title: `Do I need to attribute ZenUI Library when using it in my projects?`,
            description:
                `Attribution is appreciated but not required. You're free to use ZenUI Library in your projects without needing to give credit, although a mention would help support the project.`,
        },

        {
            title: `How often is ZenUI Library updated?`,
            description:
                `ZenUI Library is regularly updated with new components, templates, and features. The team behind ZenUI is committed to keeping the library fresh and relevant to current design trends.`,
        },
    ];
    // according data
    const accordingData2 = [
        {
            title: "Is ZenUI Library compatible with React and Vue?",
            description:
                "Yes, you can use every component in ZenUI Library with your React, Tailwind CSS, and Next.js projects. However, compatibility with Vue is coming soon, so stay tuned for updates!",
        },
        {
            title: "Can I contribute to ZenUI Library?",
            description:
                "Yes, contributions are welcome! If you’re a designer or developer who wants to contribute to the ZenUI Library, you can submit your components or templates. Your contributions will be credited on the website's 'About Us' section.",
        },
        {
            title: "What is the difference between ZenUI and other UI libraries?",
            description:
                `ZenUI Library stands out for its focus on simplicity and ease of use. It’s designed to be lightweight, customizable, and accessible, making it ideal for developers who need quick, high-quality solutions without the bloat of larger libraries. Additionally, unlike many other UI libraries, you don't need to install ZenUI Library in your project—just copy the code and use it without any dependencies. This makes integration fast and hassle-free.`,
        },

        {
            title: `Is there any documentation available for ZenUI Library?`,
            description:
                `Yes, ZenUI Library provides detailed documentation for each component and template. The documentation includes usage instructions, code examples, and customization tips to help you get started quickly.`,
        },

        {
            title: `How can I stay updated on ZenUI Library releases?`,
            description:
                `You can stay updated by following ZenUI Library on social media, subscribing to the newsletter, or checking the official website regularly. Updates and new releases are announced through these channels.`,
        },
    ];

    const handleClick1 = (index) => setIsAccording1((prevIndex) => (prevIndex === index ? null : index));

    const handleClick2 = (index) => setIsAccording2((prevIndex) => (prevIndex === index ? null : index));

    return (
        <SectionWrapper>
            <SectionHead title={'FAQ'} description={'Find\n' +
                '                    quick answers to common queries'}/>

            <section className='mt-14 mb-16 grid grid-cols-1 1024px:grid-cols-2 gap-[15px]'>
                <div className='flex-col flex gap-[15px]'>
                    {accordingData1?.map((according, index) => (
                        <article key={index}
                                 className="border dark:border-darkBorderColor/80 border-border rounded-high p-5">
                            <div
                                className="flex gap-2 cursor-pointer items-center justify-between w-full"
                                onClick={() => handleClick1(index)}>
                                <h2 className={`${isAccording1 === index ? 'dark:text-darkSubTextColor ' : ' dark:text-darkSubTextColor'} font-[600] text-[1.1rem]`}>
                                    {according.title}
                                </h2>
                                <svg
                                    className={`${isAccording1 === index ? 'fill-gray-700 dark:fill-darkSubTextColor' : 'dark:fill-darkSubTextColor'} shrink-0 ml-8`}
                                    width="16"
                                    height="16"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <rect
                                        y="7"
                                        width="16"
                                        height="2"
                                        rx="1"
                                        className={`transform origin-center transition duration-200 ease-out ${
                                            isAccording1 === index && "!rotate-180"
                                        }`}
                                    />
                                    <rect
                                        y="7"
                                        width="16"
                                        height="2"
                                        rx="1"
                                        className={`transform origin-center rotate-90 transition duration-200 ease-out ${
                                            isAccording1 === index && "!rotate-180"
                                        }`}
                                    />
                                </svg>
                            </div>
                            <div
                                className={`grid transition-all duration-300 overflow-hidden ease-in-out ${
                                    isAccording1 === index
                                        ? "grid-rows-[1fr] opacity-100 mt-4"
                                        : "grid-rows-[0fr] opacity-0"
                                }`}>
                                <p className="dark:text-darkSubTextColor text-[1rem] overflow-hidden">
                                    {according.description}
                                </p>
                            </div>
                        </article>
                    ))
                    }
                </div>
                <div className='flex-col flex gap-[15px]'>
                    {accordingData2?.map((according, index) => (
                        <article key={index}
                                 className="border dark:border-darkBorderColor/80 border-border rounded-high p-5">
                            <div
                                className="flex gap-2 cursor-pointer items-center justify-between w-full"
                                onClick={() => handleClick2(index)}>
                                <h2 className={`${isAccording2 === index ? 'dark:text-darkSubTextColor ' : ' dark:text-darkSubTextColor'} font-[600] text-[1.1rem]`}>
                                    {according.title}
                                </h2>
                                <svg
                                    className={`${isAccording2 === index ? 'fill-gray-700 dark:fill-darkSubTextColor' : 'dark:fill-darkSubTextColor'} shrink-0 ml-8`}
                                    width="16"
                                    height="16"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <rect
                                        y="7"
                                        width="16"
                                        height="2"
                                        rx="1"
                                        className={`transform origin-center transition duration-200 ease-out ${
                                            isAccording2 === index && "!rotate-180"
                                        }`}
                                    />
                                    <rect
                                        y="7"
                                        width="16"
                                        height="2"
                                        rx="1"
                                        className={`transform origin-center rotate-90 transition duration-200 ease-out ${
                                            isAccording2 === index && "!rotate-180"
                                        }`}
                                    />
                                </svg>
                            </div>
                            <div
                                className={`grid transition-all duration-300 overflow-hidden ease-in-out ${
                                    isAccording2 === index
                                        ? "grid-rows-[1fr] opacity-100 mt-4"
                                        : "grid-rows-[0fr] opacity-0"
                                }`}>
                                <p className="dark:text-darkSubTextColor text-[1rem] overflow-hidden">
                                    {according.description}
                                </p>
                            </div>
                        </article>
                    ))
                    }
                </div>
            </section>
        </SectionWrapper>
    );
};

export default Faq;
