import React, {useState} from "react";

// components
import OverviewFooter from "@shared/OverviewFooter";
import ShowCode from "@shared/Component/ShowCode.jsx";
import ContentHeader from "@shared/ContentHeader";
import {Helmet} from "react-helmet";

import {useScrollSpy} from '@/CustomHooks/useScrollSpy.js';

import ComponentDescription from "@shared/Component/ComponentDescription.jsx";
import ToggleTab from "@shared/Component/ToggleTab.jsx";
import ComponentWrapper from "@shared/Component/ComponentWrapper.jsx";
import ContentNavbar from "@shared/Component/ContentNavbar.jsx";
import {
    RevealCardContents
} from "@utils/ContentsConfig/AnimationContents/CardContents.js";
import BasicSwipeCardExample from "./BasicSwipeCardExample.jsx";
import ElasticSwipeCardExample from "./ElasticSwipeCardExample.jsx";
import RotateSwipeCardExample from "./RotateSwipeCardExample.jsx";

const Index = () => {
    const sectionIds = RevealCardContents.map(item => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    const [basicSwipeCardPreview, setBasicSwipeCardPreview] = useState(true);
    const [basicSwipeCardCode, setBasicSwipeCardCode] = useState(false);

    const [elasticSwipeCardPreview, setElasticSwipeCardPreview] = useState(true);
    const [elasticSwipeCardCode, setElasticSwipeCardCode] = useState(false);

    const [rotateSwipeCardPreview, setRotateSwipeCardPreview] = useState(true);
    const [rotateSwipeCardCode, setRotateSwipeCardCode] = useState(false);

    return (
        <aside className="flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10">
            <div>
                <ContentHeader text={"Basic Swipe reveal Card"} id={"basic-swipe-reveal-card"}/>

                <ComponentDescription
                    text='A simple swipe interaction that reveals card content with a clean sliding motion.'/>

                <ToggleTab setCode={setBasicSwipeCardCode} code={basicSwipeCardCode}
                           setPreview={setBasicSwipeCardPreview} preview={basicSwipeCardPreview}/>

                <ComponentWrapper>
                    {basicSwipeCardPreview && (
                        <div className="p-8 flex flex-col flex-wrap items-center gap-5 justify-center">
                            <BasicSwipeCardExample/>
                        </div>
                    )}

                    {basicSwipeCardCode &&
                        <ShowCode code='
import React, {useState, useRef} from "react";

// framer motion
import {motion, AnimatePresence, useMotionValue, useTransform} from "framer-motion";

// react icons
import {AiOutlineDelete} from "react-icons/ai";
import {MdOutlineDone} from "react-icons/md";

const BasicSwipeCard = () => {
    const [isLeftRevealed, setIsLeftRevealed] = useState(false);
    const [isRightRevealed, setIsRightRevealed] = useState(false);
    const x = useMotionValue(0);
    const isDragging = useRef(false);

    const leftActionsOpacity = useTransform(x, [-80, -40, 0], [1, 0.5, 0]);
    const rightActionsOpacity = useTransform(x, [0, 40, 80], [0, 0.5, 1]);

    const handleDragEnd = () => {
        const xValue = x.get();
        isDragging.current = false;

        if (xValue < -40) {
            setIsRightRevealed(true);
            setIsLeftRevealed(false);
        } else if (xValue > 40) {
            setIsLeftRevealed(true);
            setIsRightRevealed(false);
        } else {
            setIsLeftRevealed(false);
            setIsRightRevealed(false);
        }
    };

    const resetCard = () => {
        setIsLeftRevealed(false);
        setIsRightRevealed(false);
        x.set(0);
    };

    const handleAction = (action) => {
        console.log(`Executing action: ${action}`);
        resetCard();
    };

    return (
        <div className="flex items-center justify-center w-full max-w-md mx-auto">
            <div className="relative w-full overflow-hidden bg-white rounded-md shadow-[2px_1px_15px_rgba(0,0,0,0.07)]">

                {/* Left Actions */}
                <div
                    className="absolute top-0 left-0 h-full flex items-center justify-start pl-[19px] bg-green-600 w-1/3"
                    style={{opacity: leftActionsOpacity}}
                >
                    <button
                        onClick={() => handleAction("Mark as Read")}
                        className="p-2 mr-1 bg-green-700/70 text-white rounded-full"
                    >
                        <MdOutlineDone className="text-[1.5rem]"/>
                    </button>
                </div>

                {/* Right Actions */}
                <div
                    className="absolute top-0 right-0 h-full flex items-center justify-end pr-[19px] bg-red-500 w-1/3"
                    style={{opacity: rightActionsOpacity}}
                >
                    <button
                        onClick={() => handleAction("Delete")}
                        className="p-2 bg-red-600 text-white rounded-full"
                    >
                        <AiOutlineDelete className="text-[1.5rem]"/>
                    </button>
                </div>

                {/* Main Card */}
                <AnimatePresence initial={false}>
                    <motion.div
                        className="bg-white dark:bg-slate-800 p-5 w-full z-10 relative"
                        drag="x"
                        dragConstraints={{left: 0, right: 0}}
                        dragElastic={0.2}
                        onDragStart={() => (isDragging.current = true)}
                        onDragEnd={handleDragEnd}
                        initial={{x: 0}}
                        animate={{
                            x: isLeftRevealed ? 80 : isRightRevealed ? -80 : 0,
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 250,
                            damping: 25,
                        }}
                        style={{x}}
                    >
                        <div
                            className="flex items-center cursor-grab active:cursor-grabbing"
                            onClick={() => {
                                if (!isDragging.current) resetCard();
                            }}
                        >
                            <div
                                className="h-10 w-10 bg-gray-300 dark:bg-slate-900 dark:text-[#abc2d3] rounded-full flex items-center justify-center text-gray-600 font-bold text-sm">
                                JD
                            </div>
                            <div className="ml-3 flex-grow">
                                <h3 className="text-base dark:text-[#d2e5f5] font-medium text-gray-800">John
                                    Doe</h3>
                                <p className="text-gray-600 text-xs dark:text-[#abc2d3]">Swipe to see actions</p>
                            </div>
                            <div className="text-gray-500 dark:text-[#abc2d3] text-xs">3:45 PM</div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}

export default BasicSwipeCard;
                        '
                        />}
                </ComponentWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"elastic Swipe reveal Card"} id={"elastic-swipe-reveal-card"}/>
                </div>

                <ComponentDescription
                    text='A swipe-to-reveal card with a smooth, elastic animation for a playful feel.'/>

                <ToggleTab setCode={setElasticSwipeCardCode} code={elasticSwipeCardCode}
                           setPreview={setElasticSwipeCardPreview} preview={elasticSwipeCardPreview}/>

                <ComponentWrapper>
                    {elasticSwipeCardPreview && (
                        <div className="p-8 flex flex-col flex-wrap items-center gap-5 justify-center">
                            <ElasticSwipeCardExample/>
                        </div>
                    )}

                    {elasticSwipeCardCode &&
                        <ShowCode code='
import React, {useState} from "react";

// framer motion
import {useMotionValue, motion} from "framer-motion";

// react icons
import {FaRegHeart} from "react-icons/fa";
import {MdDoNotDisturbAlt} from "react-icons/md";

const ElasticSwipeCard = () => {
    const [isOpen, setIsOpen] = useState(null);
    const x = useMotionValue(0);

    const handleDragEnd = () => {
        const xValue = x.get();
        if (xValue < -30) setIsOpen("right");
        else if (xValue > 30) setIsOpen("left");
        else setIsOpen(null);
    };

    return (
        <div className="flex items-center justify-center w-full max-w-md mx-auto">
            <div className="relative w-full overflow-hidden bg-white dark:bg-slate-900 rounded-md shadow-[2px_1px_15px_rgba(0,0,0,0.07)]">

                {/* Left actions */}
                <div className="absolute inset-y-0 left-0 flex items-center bg-pink-500 px-3">
                    <button onClick={() => setIsOpen(null)} className="p-1 text-white">
                        <FaRegHeart className="text-[1.35rem]"/>
                    </button>
                </div>

                {/* Right actions */}
                <div className="absolute inset-y-0 right-0 flex items-center bg-orange-500 px-3">
                    <button onClick={() => setIsOpen(null)} className="p-1 text-white">
                        <MdDoNotDisturbAlt className="text-[1.5rem]"/>
                    </button>
                </div>

                {/* Card content */}
                <motion.div
                    className="bg-white dark:bg-slate-800 p-5 w-full z-10 relative"
                    drag="x"
                    dragConstraints={{left: 0, right: 0}}
                    onDragEnd={handleDragEnd}
                    animate={{x: isOpen === "left" ? 60 : isOpen === "right" ? -60 : 0}}
                    transition={{
                        type: "spring",
                        stiffness: 150,
                        damping: 8,
                        mass: 1
                    }}
                    style={{x}}
                    onClick={() => setIsOpen(null)}
                >
                    <div
                        className="flex items-center cursor-grab active:cursor-grabbing"
                    >
                        <div
                            className="h-10 w-10 bg-gray-300 dark:bg-slate-900 dark:text-[#abc2d3] rounded-full flex items-center justify-center text-gray-600 font-bold text-sm">
                            JD
                        </div>
                        <div className="ml-3 flex-grow">
                            <h3 className="text-base dark:text-[#d2e5f5] font-medium text-gray-800">John Doe</h3>
                            <p className="text-gray-600 text-xs dark:text-[#abc2d3]">Swipe to see actions</p>
                        </div>
                        <div className="text-gray-500 dark:text-[#abc2d3] text-xs">3:45 PM</div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default ElasticSwipeCard;
                        '
                        />}
                </ComponentWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"Rotate Swipe reveal Card"} id={"rotate-swipe-reveal-card"}/>
                </div>

                <ComponentDescription
                    text='Reveals content with a swipe that rotates the card for a dynamic 3D effect.'/>

                <ToggleTab setCode={setRotateSwipeCardCode} code={rotateSwipeCardCode}
                           setPreview={setRotateSwipeCardPreview} preview={rotateSwipeCardPreview}/>

                <ComponentWrapper>
                    {rotateSwipeCardPreview && (
                        <div className="p-8 flex flex-col flex-wrap items-center gap-5 justify-center">
                            <RotateSwipeCardExample/>
                        </div>
                    )}

                    {rotateSwipeCardCode &&
                        <ShowCode code='
import React, {useState} from "react";

// framer motion
import {useMotionValue, useTransform, motion} from "framer-motion";

// react icons
import {FaRegBookmark} from "react-icons/fa";
import {MdOutlineFileDownload} from "react-icons/md";

const RotateSwipeCard = () => {
    const [isOpen, setIsOpen] = useState(null);
    const x = useMotionValue(0);

    const rotate = useTransform(x, [-100, 0, 100], [-5, 0, 5]);

    const scale = useTransform(x, [-100, 0, 100], [0.95, 1, 0.95]);

    const handleDragEnd = () => {
        const xValue = x.get();
        if (xValue < -30) setIsOpen("right");
        else if (xValue > 30) setIsOpen("left");
        else setIsOpen(null);
    };

    return (
        <div className="flex items-center justify-center w-full max-w-md mx-auto">
            <div className="relative w-full overflow-hidden dark:bg-slate-900 bg-white rounded-md shadow-[2px_1px_15px_rgba(0,0,0,0.07)]">
                {/* Left actions */}
                <div className="absolute inset-y-0 left-0 flex items-center bg-blue-500 px-3">
                    <button onClick={() => setIsOpen(null)} className="p-1 text-white">
                        <MdOutlineFileDownload className="text-[1.5rem]"/>
                    </button>
                </div>

                {/* Right actions */}
                <div className="absolute inset-y-0 right-0 flex items-center bg-purple-500 px-3.5">
                    <button onClick={() => setIsOpen(null)} className="p-1 text-white">
                        <FaRegBookmark className="text-[1.1rem]"/>
                    </button>
                </div>

                {/* Card content */}
                <motion.div
                    className="bg-white dark:bg-slate-800 p-5 w-full z-10 relative"
                    drag="x"
                    dragConstraints={{left: 0, right: 0}}
                    onDragEnd={handleDragEnd}
                    animate={{
                        x: isOpen === "left" ? 60 : isOpen === "right" ? -60 : 0,
                    }}
                    transition={{type: "spring", stiffness: 400, damping: 25}}
                    style={{x, rotate, scale}}
                    onClick={() => setIsOpen(null)}
                >
                    <div
                        className="flex items-center cursor-grab active:cursor-grabbing"
                    >
                        <div
                            className="h-10 w-10 bg-gray-300 dark:bg-slate-900 dark:text-[#abc2d3] rounded-full flex items-center justify-center text-gray-600 font-bold text-sm">
                            JD
                        </div>
                        <div className="ml-3 flex-grow">
                            <h3 className="text-base dark:text-[#d2e5f5] font-medium text-gray-800">John Doe</h3>
                            <p className="text-gray-600 text-xs dark:text-[#abc2d3]">Swipe to see actions</p>
                        </div>
                        <div className="text-gray-500 dark:text-[#abc2d3] text-xs">3:45 PM</div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default RotateSwipeCard;
                        '
                        />}
                </ComponentWrapper>

                <OverviewFooter backUrl='/animations/magic-card' backName='magic card'
                                forwardUrl='/animations/magnet-card' forwardName='magnet card'/>
            </div>

            <ContentNavbar contents={RevealCardContents} activeSection={activeSection}/>

            <Helmet>
                <title>Cards - Reveal Card</title>
            </Helmet>
        </aside>
    );
};

export default Index;
