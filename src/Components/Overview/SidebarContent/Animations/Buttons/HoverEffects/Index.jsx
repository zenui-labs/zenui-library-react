import React, {useState} from "react";

// components
import OverviewFooter from "@shared/OverviewFooter";
import ShowCode from "@shared/Component/ShowCode.jsx";
import ContentHeader from "@shared/ContentHeader";
import {Helmet} from "react-helmet";

// contents for scrollspy
import {useScrollSpy} from '@/CustomHooks/useScrollSpy.js';

import ComponentDescription from "@shared/Component/ComponentDescription.jsx";
import ToggleTab from "@shared/Component/ToggleTab.jsx";
import ComponentWrapper from "@shared/Component/ComponentWrapper.jsx";
import ContentNavbar from "@shared/Component/ContentNavbar.jsx";
import {HoverEffectContents} from "@utils/ContentsConfig/AnimationContents/ButtonContent.js";
import LinkPreviewExample from "@animations/Buttons/HoverEffects/LinkPreviewExample.jsx";
import AnimatedTooltipExample from "@animations/Buttons/HoverEffects/AnimatedTooltipExample.jsx";

const Index = () => {
    const sectionIds = HoverEffectContents.map(item => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    const [animatedTooltipPreview, setAnimatedTooltipPreview] = useState(true);
    const [animatedTooltipCode, setAnimatedTooltipCode] = useState(false);

    const [linkViewPreview, setLinkViewPreview] = useState(true);
    const [linkViewCode, setLinkViewCode] = useState(false);

    return (
        <aside className="flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10">
            <div>
                <ContentHeader text={"animated tooltip"} id={"animated-tooltip"}/>

                <ComponentDescription
                    text='An animated tooltip is a small, smoothly appearing UI element that displays helpful info when users hover or focus on an element.'/>

                <ToggleTab setCode={setAnimatedTooltipCode} code={animatedTooltipCode}
                           setPreview={setAnimatedTooltipPreview} preview={animatedTooltipPreview}/>

                <ComponentWrapper>
                    {animatedTooltipPreview && (
                        <div className="px-8 py-16 flex flex-col flex-wrap items-center gap-5 justify-center">
                            <AnimatedTooltipExample/>
                        </div>
                    )}

                    {animatedTooltipCode &&
                        <ShowCode code='
import React, {useState, useRef} from "react";
import {motion, AnimatePresence} from "framer-motion";

// data
const users = [
    {
        name: "Alice Johnson",
        profession: "UI/UX Designer",
        image: "https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?ga=GA1.1.1644450426.1718212441&semt=ais_hybrid&w=740",
    },
    {
        name: "David Smith",
        profession: "Frontend Developer",
        image: "https://img.freepik.com/premium-photo/casual-young-man-shirt_146377-2992.jpg?ga=GA1.1.1644450426.1718212441&semt=ais_hybrid&w=740",
    },
    {
        name: "Maria Lopez",
        profession: "Product Manager",
        image: "https://img.freepik.com/free-photo/cheerful-indian-businessman-smiling-closeup-portrait-jobs-career-campaign_53876-129416.jpg?ga=GA1.1.1644450426.1718212441&semt=ais_hybrid&w=740",
    },
    {
        name: "Emtiaz Lio",
        profession: "Backend Developer",
        image: "https://img.freepik.com/free-photo/handsome-unshaven-european-man-has-serious-self-confident-expression-wears-glasses_273609-17344.jpg?ga=GA1.1.1644450426.1718212441&semt=ais_hybrid&w=740",
    },
];

const AnimatedTooltip = () => {
    const containerRef = useRef(null);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [tooltipPosition, setTooltipPosition] = useState({x: 0, y: 0});

    const handleMouseMove = (e, index) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setHoveredIndex(index);
        setTooltipPosition({x, y});
    };

    return (
        <div
            ref={containerRef}
            className="relative flex items-center gap-[-20px] px-6"
        >
            {users.map((user, index) => (
                <div
                    key={index}
                    className={`relative z-[${index}0] -ml-4`}
                    onMouseEnter={(e) => handleMouseMove(e, index)}
                    onMouseMove={(e) => handleMouseMove(e, index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <img
                        src={user.image}
                        alt={user.name}
                        className="w-14 h-14 rounded-full object-cover border-2 dark:border-slate-700 border-white shadow-md hover:scale-105 transition-all duration-200 cursor-pointer"
                    />
                </div>
            ))}

            <AnimatePresence>
                {hoveredIndex !== null && (
                    <motion.div
                        initial={{opacity: 0, scale: 0.8}}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            x: tooltipPosition.x - 70,
                            y: tooltipPosition.y - 100,
                        }}
                        exit={{opacity: 0, scale: 0.8}}
                        transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 20,
                        }}
                        className="absolute w-max dark:bg-slate-800 dark:border-slate-700 bg-white border text-center shadow-lg px-5 rounded-lg py-2.5 pointer-events-none z-0"
                        style={{bottom: 0, left: 0}}
                    >
                        <h4 className="text-[1rem] font-semibold dark:text-[#d2e5f5] text-gray-800">
                            {users[hoveredIndex].name}
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-[#abc2d3]">{users[hoveredIndex].profession}</p>

                        {/* Tooltip */}
                        <div
                            className="absolute left-1/2 translate-x-[-50%] top-full z-[-1] w-4 h-4 bg-white rotate-45 border-gray-200 border-r dark:border-slate-700 dark:bg-slate-800 border-b -mt-2"></div>

                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AnimatedTooltip;
                        '
                        />}
                </ComponentWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"link preview"} id={"link-preview"}/>
                </div>

                <ComponentDescription
                    text='A link preview is a rich snippet that shows a webpage’s title, description, and thumbnail when a URL is pasted or hovered.'/>

                <ToggleTab setCode={setLinkViewCode} code={linkViewCode}
                           setPreview={setLinkViewPreview} preview={linkViewPreview}/>

                <ComponentWrapper>
                    {linkViewPreview && (
                        <div className="px-8 py-16 flex flex-col flex-wrap items-center gap-5 justify-center">
                            <LinkPreviewExample/>
                        </div>
                    )}

                    {linkViewCode &&
                        <ShowCode code='
import React, {useState, useRef} from "react";
import {motion, AnimatePresence} from "framer-motion";

const LinkPreviewExample = () => {
    const [hovered, setHovered] = useState(false);
    const [position, setPosition] = useState({x: 0, y: 0});
    const containerRef = useRef(null);

    const handleMouseMove = (e) => {
        const container = containerRef.current;
        if (container) {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            setPosition({x, y});
        }
    };

    return (
        <div
            ref={containerRef}
            className="relative inline-block"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onMouseMove={handleMouseMove}
        >
            <a
                href="https://zenui.net"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium dark:text-darkTextColor underline"
            >
                Hover to see ZenUI link preview
            </a>

            <AnimatePresence>
                {hovered && (
                    <motion.div
                        initial={{opacity: 0, scale: 0.95}}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            x: position.x - 100,
                            y: position.y - 40,
                        }}
                        exit={{opacity: 0, scale: 0.95}}
                        transition={{type: "spring", stiffness: 300, damping: 20}}
                        className="absolute z-50 w-64 rounded-lg border dark:bg-slate-800 dark:border-slate-700 bg-white p-3 shadow-lg pointer-events-none"
                        style={{bottom: 0, left: 0}}
                    >
                        <h4 className="text-lg font-semibold dark:text-[#d2e5f5]">ZenUI</h4>
                        <p className="text-xs text-gray-500 dark:text-[#abc2d3] mt-1">
                            A beautiful and modern React UI component library.
                        </p>
                        <img
                            src="https://camo.githubusercontent.com/9e8ab41e42e1b9eaba15f4f947fcd3e1ae7bfac3cf6fc1f3f784b7f84c26da36/68747470733a2f2f692e6962622e636f2e636f6d2f435774645231392f706f73742e706e67"
                            alt="ZenUI Preview"
                            className="mt-2 w-full rounded"
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LinkPreviewExample;
                        '
                        />}
                </ComponentWrapper>

                <OverviewFooter backUrl='/animations/reaction-trail' backName='reaction trail'
                                forwardUrl='/animations/text-effects' forwardName='text effects'/>
            </div>

            <ContentNavbar contents={HoverEffectContents} activeSection={activeSection}/>

            <Helmet>
                <title>Cards - Magnet Card</title>
            </Helmet>
        </aside>
    );
};

export default Index;
