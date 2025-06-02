import React, {useState, useEffect} from "react";

// react helmet
import {Helmet} from "react-helmet";

// components
import ContentHeader from "@shared/ContentHeader";
import Showcode from "@shared/Component/ShowCode.jsx";
import OverviewFooter from "@shared/OverviewFooter";

// icons
import {useToggleCardView} from "@/CustomHooks/ButtonToggle.js";

const ResizableLayout = () => {
    const [contentActiveTab, setContentActiveTab] = useState(0);

    const toggleCardView = useToggleCardView()

    // actions
    const [animatedCard1Preview, setAnimatedCard1Preview] = useState(true);
    const [animatedCard1Code, setAnimatedCard1Code] = useState(false);

    // actions
    const [leftWidth, setLeftWidth] = useState(100); // Set default left container width
    const minLeftWidth = 100;
    const maxLeftWidth = 300;

    const handleMouseMove = (e) => {
        const newLeftWidth = e.clientX;
        console.log(leftWidth)
        if (newLeftWidth < 600 && newLeftWidth > 100) {
            console.log('inside')
            setLeftWidth(newLeftWidth);
        }
    };

    const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
    };

    const handleMouseDown = () => {
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
    };


    return (
        <>
            <aside className="flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10">
                <div className="w-full 425px:w-[80%]">
                    <ContentHeader id="hover-animated-card-1" text={"hover animated card 1"}/>

                    <p className=" text-text text-[1rem]">
                        This is a hover-animated card. Hover to reveal dynamic effects and animations.
                    </p>

                    <div className="w-full 425px:w-[80%] border border-border rounded mt-8">
                        <div className="relative">
                            <div
                                className={`absolute top-0 left-0 w-[90px] h-[40px] z-[1] bg-border transition-all duration-500 ${animatedCard1Preview ? 'translate-x-[0px] !w-[100px]' : 'translate-x-[106px] rounded-br'}`}></div>
                            <button
                                className={`${
                                    animatedCard1Preview && "text-tabTextColor"
                                } px-6 py-2 border-b z-[2] relative text-text border-border`}
                                onClick={() => toggleCardView(setAnimatedCard1Preview, setAnimatedCard1Code, true)}
                            >
                                Preview
                            </button>
                            <button
                                className={`${
                                    animatedCard1Code && "text-tabTextColor"
                                } px-6 py-2 border-r z-[2] relative text-text border-b rounded-br border-border`}
                                onClick={() => toggleCardView(setAnimatedCard1Preview, setAnimatedCard1Code, false)}
                            >
                                Code
                            </button>
                        </div>
                        {animatedCard1Preview && (
                            <div className="p-8 mb-4 flex items-center flex-col gap-5 justify-center">

                                <div className="flex h-[500px]">
                                    {leftWidth}
                                    {/* Left Resizable Container */}
                                    <div
                                        style={{width: `${leftWidth}px`}}
                                        className="bg-gray-300 transition-all duration-500"
                                    >
                                        Left Container
                                    </div>

                                    {/* Resizing Divider */}
                                    <div
                                        onMouseDown={handleMouseDown}
                                        className="w-2 bg-gray-500 cursor-col-resize"
                                    />

                                    {/* Right Container */}
                                    <div className="flex-1 bg-gray-100">
                                        Right Container
                                    </div>
                                </div>


                            </div>
                        )}

                        {animatedCard1Code && (
                            <Showcode
                                code=''
                            />
                        )}
                    </div>

                    <OverviewFooter/>
                </div>

                <div className="1024px:flex hidden flex-col gap-4 sticky top-4 right-0 w-[35%]">
                    <h2 className="text-[0.9rem] font-[600] text-text tracking-widest">
                        CONTENTS
                    </h2>
                    <a
                        href="#hover-animated-card-1"
                        className={`${
                            contentActiveTab === 1 && "!text-primary !border-primary"
                        } text-[0.9rem] text-[#5c5c5c] border-l border-transparent pl-4`}
                        onClick={() => setContentActiveTab(1)}
                    >
                        Hover Animated Card 1
                    </a>
                </div>
            </aside>
            <Helmet>
                <title>Surfaces - Resizable Layout</title>
            </Helmet>
        </>
    );
};

export default ResizableLayout;
