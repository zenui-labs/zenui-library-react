import React from 'react';

// react icons
import {IoBugOutline} from "react-icons/io5";
import {GoLightBulb} from "react-icons/go";

const ContentNavbar = ({contents, activeSection, width = '40%'}) => {

    const repoUrl = "https://github.com/Asfak00/zenui-library";

    const handleCreateIssue = (type) => {
        const currentPath = window.location.pathname;
        const encodedPath = encodeURIComponent(currentPath);

        let url;

        if (type === "bug") {
            url = `${repoUrl}/issues/new?title=%5BBUG%5D:+${encodedPath}&labels=bug&template=bug_report.md`;
        } else if (type === "feature") {
            url = `${repoUrl}/issues/new?title=%5Bfeat%5D:+${encodedPath}&labels=enhancement&template=feature_request.md`;
        }

        window.open(url, "_blank");
    };
    return (
        <div className={`1024px:block sticky top-4 right-0 w-[${width}] hidden`}>
            <h2 className='text-[0.9rem] dark:text-darkSubTextColor font-[600] text-text tracking-widest'>
                CONTENTS
            </h2>
            <div className='max-h-[77vh] overflow-scroll' style={{scrollbarWidth: 'none'}}>
                <div className='flex flex-col border-l dark:border-darkBorderColor border-border mt-4 w-[70%]'>
                    {contents?.map((item) => (
                        <div key={item.id} className="relative group">
                            <div
                                className={`
                                absolute inset-y-0 left-0 bg-brandColor/5 dark:bg-slate-900 
                                transition-all duration-[400ms] ease-linear
                                ${activeSection === item.href.slice(1)
                                    ? 'w-full opacity-100'
                                    : 'w-0 opacity-0'}
                            `}
                            />
                            <a
                                href={item.href}
                                className={`
                                relative z-10 block text-[0.9rem] capitalize py-[8px] 
                                dark:text-darkSubTextColor/90 transition-width duration-300 
                                text-text border-l-2 border-transparent pl-4
                                ${activeSection === item.href.slice(1)
                                    ? 'text-brandColor !border-brandColor'
                                    : ''}
                            `}
                            >
                                {item.title}
                            </a>
                        </div>
                    ))}
                </div>

                <div className='mt-5 flex flex-col gap-3'>
                    <p className='text-[0.94rem] dark:text-darkSubTextColor/90 font-[500]'>
                        Contribute
                    </p>
                    <p
                        onClick={() => handleCreateIssue("bug")}
                        className='flex text-text hover:text-[#0FABCA] transition-all duration-200 cursor-pointer dark:text-darkSubTextColor/90 items-center gap-1.5'
                    >
                        <IoBugOutline/>
                        <span className='text-[0.94rem]'>Report an issue</span>
                    </p>
                    <p
                        onClick={() => handleCreateIssue("feature")}
                        className='flex text-text hover:text-[#0FABCA] transition-all duration-200 cursor-pointer dark:text-darkSubTextColor/90 items-center gap-1.5'
                    >
                        <GoLightBulb/>
                        <span className='text-[0.94rem]'>Request a feature</span>
                    </p>
                </div>

                <div className='p-3 mb-5 mt-3 max-w-[273px]'>
                    <div
                        className="relative origin-center -translate-x-3 rotate-6 p-6 duration-300 hover:rotate-0"
                    >
                        <div
                            className="absolute top-4 left-0 h-px w-full bg-[linear-gradient(to_right,_transparent_0%,_rgba(0,0,0,0.1)_9.27%,_rgba(0,0,0,0.15)_90.7%,_transparent_100%)] dark:bg-[linear-gradient(to_right,_transparent_0%,_rgba(255,255,255,0.1)_9.27%,_rgba(255,255,255,0.1)_90.7%,_transparent_100%)]"
                        ></div>
                        <div
                            className="absolute top-0 left-4 h-full w-px bg-[linear-gradient(to_bottom,_transparent_0%,_rgba(0,0,0,0.1)_9.27%,_rgba(0,0,0,0.15)_90.7%,_transparent_100%)] dark:bg-[linear-gradient(to_bottom,_transparent_0%,_rgba(255,255,255,0.1)_9.27%,_rgba(255,255,255,0.1)_90.7%,_transparent_100%)]"
                        ></div>
                        <a href='https://readmestudio.zenui.net/' target='_blank' rel='noreferrer'>
                            <img alt='softollyo.com' src='/small_ads_for_zenui.png'
                                 className='rounded-high max-w-[200px]'/>
                        </a>
                        <div
                            className="absolute top-0 right-4 h-full w-px bg-[linear-gradient(to_bottom,_transparent_0%,_rgba(0,0,0,0.1)_9.27%,_rgba(0,0,0,0.1)_90.7%,_transparent_100%)] dark:bg-[linear-gradient(to_bottom,_transparent_0%,_rgba(255,255,255,0.1)_9.27%,_rgba(255,255,255,0.1)_90.7%,_transparent_100%)]"
                        ></div>
                        <div
                            className="absolute bottom-4 left-0 h-px w-full bg-[linear-gradient(to_right,_transparent_0%,_rgba(0,0,0,0.1)_9.27%,_rgba(0,0,0,0.1)_90.7%,_transparent_100%)] dark:bg-[linear-gradient(to_right,_transparent_0%,_rgba(255,255,255,0.1)_9.27%,_rgba(255,255,255,0.1)_90.7%,_transparent_100%)]"
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContentNavbar;