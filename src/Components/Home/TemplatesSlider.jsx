import {FaRegEye} from "react-icons/fa";
import {HiOutlineTemplate} from "react-icons/hi";
import {HomeTemplatesData1, HomeTemplatesData2} from "@utils/HomeTemplatesData.js";
import SectionHead from "./SectionHead.jsx";
import SectionWrapper from "./SectionWrapper.jsx";
import React from "react";
import {useNavigate} from "react-router-dom";

const TemplatesSlider = () => {

    const navigate = useNavigate();

    return (
        <SectionWrapper className='my-28'>
            <SectionHead
                description={'Free, ready-to-use templates to build your projects at lightning speed, perfect for anyone looking to save time without sacrificing quality.'}
                isSubjet={'20+'} title={'Pre-built Templates'}/>

            <div
                className="slider-container w-full inline-flex mt-14 flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_300px,_black_calc(100%-300px),transparent_100%)] mb-5"
            >
                <div
                    className="flex items-center gap-5 w-[50%] 1404px:w-[20%] mx-auto justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none allComponentSliderLeft">
                    {
                        HomeTemplatesData1?.map((template, index) => (
                            <div
                                key={index}
                                className="bg-gray-50 h-full min-w-fit flex flex-col justify-between rounded-high border border-border group relative overflow-hidden"
                            >
                                <img
                                    src={template.image}
                                    alt={template.title}
                                    className="w-[400px] h-[230px] rounded-md object-fill "
                                />

                                <div
                                    className='translate-y-[300px] opacity-0 z-[-1] group-hover:translate-y-0 group-hover:opacity-100 group-hover:z-20 transition-all duration-300 cursor-pointer bg-gradient-to-b absolute flex items-end justify-center top-0 left-0  from-transparent to-[#0FABCA] w-full h-full pb-[40px] gap-[10px]'>
                                    <a href={template?.liveLink}
                                       className='bg-white px-[12px] py-[8px] rounded-md flex items-center gap-2 text-[1rem] hover:scale-[1.05] transition-all duration-300'>
                                        <FaRegEye/> View</a>
                                    <a href={template?.githubLink}
                                       className='bg-white px-[12px] py-[8px] rounded-md flex items-center gap-2 text-[1rem] hover:scale-[1.05] transition-all duration-300'>
                                        <HiOutlineTemplate className='text-[1.1rem]'/> Get Template</a>
                                </div>

                            </div>
                        ))
                    }

                </div>
            </div>

            <div
                className="slider-container w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_300px,_black_calc(100%-300px),transparent_100%)] mb-5"
            >
                <div
                    className="flex items-center gap-5 w-[50%] 1404px:w-[20%] mx-auto justify-center md:justify-start [&_li]:mx-8 [&_img]:max-w-none allComponentSliderRight">
                    {
                        HomeTemplatesData2?.map((template, index) => (
                            <div
                                key={index}
                                className="bg-gray-50 h-full min-w-fit flex flex-col justify-between rounded-high border border-border group relative"
                            >
                                <img
                                    src={template.image}
                                    alt={template.title}
                                    className="w-[400px] h-[230px] rounded-md object-fill"
                                />

                                <div
                                    className='translate-y-[300px] opacity-0 z-[-1] group-hover:translate-y-0 group-hover:opacity-100 group-hover:z-20 transition-all duration-300 cursor-pointer bg-gradient-to-b absolute flex items-end justify-center top-0 left-0  from-transparent to-[#0FABCA] w-full h-full pb-[40px] gap-[10px]'>
                                    <a href={template?.liveLink}
                                       className='bg-white px-[12px] py-[8px] rounded-md flex items-center gap-2 text-[1rem] hover:scale-[1.05] transition-all duration-300'>
                                        <FaRegEye/> View</a>
                                    <a href={template?.githubLink}
                                       className='bg-white px-[12px] py-[8px] rounded-md flex items-center gap-2 text-[1rem] hover:scale-[1.05] transition-all duration-300'>
                                        <HiOutlineTemplate className='text-[1.1rem]'/> Get Template</a>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>

            <div className='flex items-center justify-center mt-8'>
                <button
                    onClick={() => navigate("/templates")}
                    className='py-3 px-6 640px:px-8 bg-[#0FABCA] text-white rounded-normal hover:bg-[#1cbedb] transition-all flex items-center justify-center gap-3 duration-300 group'
                >
                    Get All Templates
                </button>
            </div>

        </SectionWrapper>
    );
};

export default TemplatesSlider;
