import React, {useEffect} from 'react';

// data
import {feedbackData} from "../../Utils/FeedbackData.js";

// import aos animation
import "aos/dist/aos.css";
import AOS from "aos";

// component
import FeedbackCard from "./FeedbackCard.jsx"
import SectionHead from "./SectionHead.jsx";
import SectionWrapper from "./SectionWrapper.jsx";

const Feedback = () => {

    useEffect(() => {
        AOS.init({
            duration: 1000,
        });
    }, []);

    return (
        <SectionWrapper className='relative'>
            <SectionHead isSubjet={'Wall Of'} title={'Love'} description={'Thoughts\n' +
                '                    from those who\'ve\n' +
                '                    experienced ZenUI in action.'}/>

            <div className='w-full mt-14 grid grid-cols-1 640px:grid-cols-3 gap-[20px]'>

                <div className='flex flex-col gap-[20px]'>
                    {
                        feedbackData?.slice(0, 6)?.map((feedback, index) => (
                            <FeedbackCard key={index} feedback={feedback}/>
                        ))
                    }
                </div>
                <div className='flex flex-col gap-[20px]'>
                    {
                        feedbackData?.slice(6, 11)?.map((feedback, index) => (
                            <FeedbackCard key={index} feedback={feedback}/>
                        ))
                    }
                </div>

                <div className='flex flex-col gap-[20px]'>
                    {feedbackData?.slice(11, 16)?.map((feedback, index) => (
                        <FeedbackCard key={index} feedback={feedback}/>
                    ))}
                </div>
            </div>

            {/* bottom shadow card */}
            <div
                className='w-full h-[100px] 640px:h-[300px] z-10 bg-gradient-to-t dark:from-darkBgColor from-white top-[rgb(255,255,255,0.8)] absolute bottom-0 left-0 right-0'></div>
        </SectionWrapper>
    );
};

export default Feedback;
