import React from "react";

// shared components
import ContentHeader from "@shared/ContentHeader";

// react helmet
import {Helmet} from "react-helmet";
import BlocksFooter from "@shared/Block/BlocksFooter.jsx";

const Overview = () => {
    return (
        <aside className='w-full 640px:pl-[2.5rem] px-6 640px:px-10'>

            <h1 className="font-[600] pt-0 text-[2.5rem] 1024px:text-[3rem] uppercase text-brandColor">
                ZenUI Library
            </h1>
            <p className="w-full text-text dark:text-darkSubTextColor text-[1rem]">
                ZenUI is your ultimate destination for a comprehensive collection of UI components and designs, all
                available for free. Whether you're building a website from scratch or enhancing an existing one, ZenUI
                has
                everything you need to bring your vision to life.
            </p>

            <div className="mt-8 w-full text-text">
                <ContentHeader text={"About ZenUI"}/>
                <p className="mt-3 dark:text-darkSubTextColor">
                    ZenUI is a developer-friendly platform offering over 700+ meticulously crafted components and
                    templates. These resources are designed to save you time and elevate your creativity by providing
                    modern, reusable elements that fit seamlessly into any project.
                </p>
                <p className="mt-4 dark:text-darkSubTextColor">
                    Our collection includes an array of components and built-in web templates, enabling developers to
                    create stunning websites without the hassle of designing from scratch. Each element adheres to
                    contemporary design principles, ensuring that your projects are not only functional but also
                    visually
                    appealing.
                </p>
            </div>

            <div className="mt-8 w-full text-text">
                <ContentHeader text={"What will you get?"}/>
                <ul className="flex flex-col gap-3 list-disc ml-8 mt-3">
                    <li className="p-0 hover:bg-transparent border-none dark:text-darkSubTextColor hover:border-none hover:font-[400] hover:bg-secondary">
                        <b>Reusable Advanced Components:</b> Access a suite of highly customizable, production-ready
                        components built with best practices in mind. From complex forms to interactive tabs and
                        accordions, these components save development time while ensuring consistency across your
                        project.
                    </li>
                    <li className="p-0 hover:bg-transparent border-none dark:text-darkSubTextColor hover:border-none hover:font-[400] hover:bg-secondary">
                        <b>Multi-Page Website Templates:</b> Choose from a variety of pre-built multi-page templates,
                        perfect for businesses, blogs, and more. These templates are crafted to help you quickly
                        establish
                        an online presence.
                    </li>
                    <li className="p-0 hover:bg-transparent border-none dark:text-darkSubTextColor hover:border-none hover:font-[400] hover:bg-secondary">
                        <b>Website Blocks:</b> Access a wide range of essential UI blocks that you can mix and match
                        to
                        create unique page layouts effortlessly.
                    </li>
                    <li className="p-0 hover:bg-transparent border-none dark:text-darkSubTextColor hover:border-none hover:font-[400] hover:bg-secondary">
                        <b>SVG Icons:</b> Our growing library of SVG icons provides a modern touch to any project, with
                        easy integration and customization options.
                    </li>
                    <li className="p-0 hover:bg-transparent border-none dark:text-darkSubTextColor hover:border-none hover:font-[400] hover:bg-secondary">
                        <b>Animated Components:</b> Bring your website to life with a collection of ready-to-use
                        animated components using Framer-Motion. These subtle yet impactful animations improve user
                        engagement and provide a
                        polished, professional look to any design.
                    </li>
                    <li className="p-0 hover:bg-transparent border-none dark:text-darkSubTextColor hover:border-none hover:font-[400] hover:bg-secondary">
                        <b>Color Palette:</b> Introducing the custom color opacity palette. A versatile tool that
                        allows
                        you to explore different opacity variations of colors. Simply paste your color code, and the
                        palette will generate a range of opacity levels along with the corresponding HEX, RGB, and HSL
                        codes. Clicking on a color code instantly copies it to your clipboard, making color management a
                        breeze.
                    </li>
                </ul>
            </div>

            <div className="mt-8 w-full text-text">
                <ContentHeader text={"Advantages of ZenUI Library"}/>
                <ul className="flex flex-col gap-3 list-disc ml-8 mt-3">
                    <li className="p-0 hover:bg-transparent border-none dark:text-darkSubTextColor hover:border-none hover:font-[400] hover:bg-secondary">
                        <b>No Dependencies Needed:</b> ZenUI is entirely standalone, just copy the code and use it. No
                        external dependencies or additional setups are required, making integration fast and
                        hassle-free.
                    </li>
                    <li className="p-0 hover:bg-transparent border-none dark:text-darkSubTextColor hover:border-none hover:font-[400] hover:bg-secondary">
                        <b>Customizability:</b> Our codes are very structured so you can
                        customize them to your liking. You can customize the components
                        according to your business logic.
                    </li>
                    <li className="p-0 hover:bg-transparent border-none dark:text-darkSubTextColor hover:border-none hover:font-[400] hover:bg-secondary">
                        <b>Beautiful Design:</b> All the components follow the ZenUI modern
                        design. So you don't have to redesign to use them. More exciting
                        thing is that since there is no need to design, you save your
                        designing time.
                    </li>
                    <li className="p-0 hover:bg-transparent border-none dark:text-darkSubTextColor hover:border-none hover:font-[400] hover:bg-secondary">
                        <b>Pre build templetes:</b> ZenUI has many pre-built web templates.
                        You can create a website without using them without any code. We
                        have tried to follow the most modern design by following the design.
                        The ZenUI contains 20+ web templates.
                    </li>
                    <li className="p-0 hover:bg-transparent border-none dark:text-darkSubTextColor hover:border-none hover:font-[400] hover:bg-secondary">
                        <b>Community & Support:</b> ZenUI is more than just a library it's a community. Join other
                        developers, share your work, get feedback, and collaborate to push the boundaries of what's
                        possible.
                    </li>
                </ul>
            </div>

            <BlocksFooter isBackButton={false} forwardName='Installation' forwardUrl='/docs/installation'/>

            <Helmet>
                <title>Get-Started - Overview</title>
            </Helmet>
        </aside>
    );
};

export default Overview;
