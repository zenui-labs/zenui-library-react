import React, {useEffect} from 'react';

// data
import {feedbackData} from "../../Utils/FeedbackData.js";

// import aos animation
import "aos/dist/aos.css";
import AOS from "aos";

// component
import FeedbackCard from "./FeedbackCard.jsx"

const Feedback = () => {

    useEffect(() => {
        AOS.init({
            duration: 1000,
        });
    }, []);

    return (
        <section className='relative mt-14 max-w-[1300px] mx-auto'>

            <div>
                <h1 className='text-[1.5rem] 425px:text-[3rem] dark:text-darkTextColor font-[700] text-center px-8'>
                    Wall of Love<span className='heroText text-[#0FABCA] font-[500]'>Love</span>
                </h1>
                <p className='text-[0.9rem] dark:text-darkSubTextColor 640px:text-[1.1rem] text-center font-[400] text-black/60 px-8 w-full 1024px:w-[50%] mx-auto'>
                    Thoughts
                    from those who've
                    experienced ZenUI in action.
                </p>
            </div>

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
        </section>
    );
};

export default Feedback;
