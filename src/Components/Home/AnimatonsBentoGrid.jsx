import React from 'react';

import SectionHead from "./SectionHead.jsx";
import SectionWrapper from "./SectionWrapper.jsx";
import AnimatedTooltipExample from "@/Components/Home/AnimatedCards/AnimatedTooltipExample.jsx";
import MagicHoverCardExample from "@/Components/Home/AnimatedCards/MagicHoverCardExample.jsx";
import ScrambleTextExample from "@/Components/Home/AnimatedCards/ScrambleTextExample.jsx";
import StarfieldWarpExample from "@/Components/Home/AnimatedCards/StarfieldWarpExample.jsx";
import ShuffleSortExample from "@/Components/Home/AnimatedCards/ShuffleSortExample.jsx";
import {useNavigate} from "react-router-dom";

const AnimationsBentoGrid = () => {
 
    const navigate = useNavigate()

    return (
        <SectionWrapper className='!mt-36'>
            <SectionHead
                description={'Reusable UI components with smooth animations — built to speed up development and enhance user experience.'}
                isSubjet={'50+'}
                title={'Animated Components'}/>

            <div className='grid grid-cols-12 mt-14 min-h-[500px] gap-3'>
                <div
                    className='w-full h-full rounded-high border border-border dark:border-slate-700 min-h-[200px] 1024px:min-h-[300px] max-h-[500px] 1024px:max-h-[450px] p-5 flex flex-col items-center justify-center col-span-12 1024px:col-span-4'>
                    <AnimatedTooltipExample/>
                </div>
                <div
                    className='w-full h-full rounded-high border border-border dark:border-slate-700 min-h-[200px] 1024px:min-h-[300px] max-h-[500px] 1024px:max-h-[450px] p-5 flex flex-col items-center justify-center col-span-12 1024px:col-span-4'>
                    <MagicHoverCardExample/>
                </div>
                <div
                    className='w-full h-full rounded-high border border-border dark:border-slate-700 min-h-[200px] 1024px:min-h-[300px] max-h-[500px] 1024px:max-h-[450px] p-5 flex flex-col items-center justify-center col-span-12 1024px:col-span-4'>
                    <ScrambleTextExample/>
                </div>
                <div
                    className='w-full h-full rounded-high border border-border dark:border-slate-700 gap-2 min-h-[200px] 1024px:min-h-[300px] max-h-[500px] 1024px:max-h-[450px] p-5 flex flex-col items-center justify-center col-span-12 1024px:col-span-6'>
                    <ShuffleSortExample/>
                </div>
                <div
                    className='w-full h-full rounded-high border border-border dark:border-slate-700 min-h-[200px] 1024px:min-h-[300px] max-h-[500px] 1024px:max-h-[450px] p-5 flex flex-col items-center justify-center col-span-12 1024px:col-span-6'>
                    <StarfieldWarpExample/>
                </div>
            </div>

            <button
                onClick={() => navigate("/animations/installation")}
                className='py-3 px-6 640px:px-8 bg-[#0FABCA] text-white rounded-normal mx-auto mt-12 hover:bg-[#1cbedb] transition-all flex items-center justify-center gap-3 duration-300 group'
            >
                All Animated Components
            </button>
        </SectionWrapper>
    );
};

export default AnimationsBentoGrid;
