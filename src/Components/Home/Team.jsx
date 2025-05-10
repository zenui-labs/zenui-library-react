import React from 'react';
import {FaBehance, FaGithub} from "react-icons/fa";
import {FaXTwitter} from "react-icons/fa6";
import {FiFigma, FiLinkedin} from "react-icons/fi";
import {TeamData} from "../../Utils/TeamData.js";
import {DevContributorsData} from "../../Utils/DevContributorsData.js";
import {AiOutlineGlobal} from "react-icons/ai";
import ZenUIHeroBadge from "../../SvgIcons/ZenUIHeroBadge.jsx";
import SectionHead from "./SectionHead.jsx";
import SectionWrapper from "./SectionWrapper.jsx";

const Team = () => {
    return (
        <>
            <SectionWrapper>
                <SectionHead description={'Our design\n' +
                    '                        contributors provide the creative foundation for our components and blocks, helping us innovate\n' +
                    '                        and expand ZenUI’s offerings with their unique insights and designs.'}
                             isSubjet={'Design'} title={'Contributors'}/>


                <div className='mt-16 flex flex-wrap gap-[40px] justify-center'>
                    {
                        TeamData?.map((member, index) => (
                            <div className='flex flex-col justify-center items-center' key={index}>
                                <img
                                    src={member?.image}
                                    alt='profile/image'
                                    className='w-[200px] h-[200px] overflow-hidden hover:scale-[1.1] transition-all duration-300 rounded-full'/>

                                <h3 className='text-[1.3rem] font-[600] text-gray-700 leading-[25px] dark:text-darkTextColor mt-5'>{member?.name}</h3>
                                <p className='text-[1rem] text-gray-500 font-[300] dark:text-darkSubTextColor/80'>{member?.title}</p>

                                <div className='flex items-center gap-[10px] mt-4'>
                                    {
                                        member?.behanceLink && (
                                            <a href={member?.behanceLink}>
                                                <FaBehance
                                                    className='text-[1.4rem] text-gray-400 hover:text-[#0FABCA] cursor-pointer'/>
                                            </a>
                                        )
                                    }
                                    {
                                        member?.linkedinLink && (
                                            <a href={member?.linkedinLink}>
                                                <FiLinkedin
                                                    className='text-[1.5rem] text-gray-400 hover:text-[#0FABCA] cursor-pointer'/>
                                            </a>
                                        )
                                    }
                                    {
                                        member?.twitterLink && (
                                            <a href={member?.twitterLink}>
                                                <FaXTwitter
                                                    className='text-[1.4rem] text-gray-400 hover:text-[#0FABCA] cursor-pointer'/>
                                            </a>
                                        )
                                    }
                                    {
                                        member?.figmaLink && (
                                            <a href={member?.figmaLink}>
                                                <FiFigma
                                                    className='text-[1.4rem] text-gray-400 hover:text-[#0FABCA] cursor-pointer'/>
                                            </a>
                                        )
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </SectionWrapper>
            <SectionWrapper className='mt-24'>
                <SectionHead description={'Our\n' +
                    '                        development contributors lay the technical groundwork for ZenUI, bringing our components and\n' +
                    '                        blocks to life with their expertise and innovation. Their work is essential to our platform\'s\n' +
                    '                        growth and stability.'} isSubjet={'Dev'} title={'Contributors'}/>


                <div className='mt-16 flex flex-wrap gap-[40px] justify-center'>
                    {
                        DevContributorsData?.map((member, index) => (
                            <div className='flex flex-col justify-center items-center' key={index}>

                                <div className='w-[200px] h-[200px] relative'>
                                    <img
                                        src={member?.image}
                                        alt='profile/image'
                                        className='w-full h-full overflow-hidden hover:scale-[1.1] transition-all duration-300 rounded-full'/>

                                    {
                                        member.zenuiHero && (
                                            <div className='group'>
                                                <img alt='zenui hero bage'
                                                     src='https://i.ibb.co.com/8dfDxXz/best-contributor-badge.png'
                                                     className='absolute bottom-[-8px] cursor-pointer right-1 w-[70px]'/>

                                                <p className="group-hover:opacity-100 group-hover:z-[100] group-hover:translate-x-0 opacity-0 z-[-1] translate-x-[-20px] absolute top-[85%] hidden 1024px:block transform translate-y-[-50%] right-[-115px] w-fit py-[7px] px-[20px] rounded-md bg-gray-800 text-[0.9rem] text-white font-[400] transition-all duration-200">
                                                    ZenUI Hero

                                                    {/* arrow */}
                                                    <span
                                                        className="w-[8px] h-[8px] bg-gray-800 rotate-[45deg] absolute top-[50%] transform translate-y-[-50%] left-[-3%]"></span>
                                                </p>
                                            </div>
                                        )
                                    }
                                </div>

                                <h3 className='text-[1.3rem] font-[600] text-gray-700 dark:text-darkTextColor leading-[25px] mt-5'>{member?.name}</h3>
                                <p className='text-[1rem] text-gray-500 font-[300] dark:text-darkSubTextColor/80'>{member?.title}</p>

                                <div className='flex items-center gap-[10px] mt-4'>
                                    {
                                        member?.website && (
                                            <a href={member?.website}>
                                                <AiOutlineGlobal
                                                    className='text-[1.5rem] text-gray-400 hover:text-[#0FABCA] cursor-pointer'/>
                                            </a>
                                        )
                                    }
                                    {
                                        member?.linkedinLink && (
                                            <a href={member?.linkedinLink}>
                                                <FiLinkedin
                                                    className='text-[1.5rem] text-gray-400 hover:text-[#0FABCA] cursor-pointer'/>
                                            </a>
                                        )
                                    }
                                    {
                                        member?.twitterLink && (
                                            <a href={member?.twitterLink}>
                                                <FaXTwitter
                                                    className='text-[1.4rem] text-gray-400 hover:text-[#0FABCA] cursor-pointer'/>
                                            </a>
                                        )
                                    }
                                    {
                                        member?.githubLink && (
                                            <a href={member?.githubLink}>
                                                <FaGithub
                                                    className='text-[1.4rem] text-gray-400 hover:text-[#0FABCA] cursor-pointer'/>
                                            </a>
                                        )
                                    }
                                </div>
                            </div>
                        ))
                    }
                </div>
            </SectionWrapper>
        </>
    );
};

export default Team;
