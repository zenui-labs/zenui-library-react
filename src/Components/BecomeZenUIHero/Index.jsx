import React from 'react';
import MetricsCard from "@/Components/Home/MetricsCard.jsx";

const BecomeZenUIHero = () => {
    return (
        <section className='px-6 1024px:px-12 py-10 overflow-hidden'>
            <img alt='zenui-hero/image' loading='lazy' src='https://i.ibb.co.com/LtKGtCS/become-zenui-hero-poster.png'
                 className='rounded-md w-[1000px] mx-auto'/>

            {/* details */}
            <div className='w-full 1024px:max-w-[1000px] mx-auto mt-6'>
                <h1 className='text-[1.9rem] 640px:text-[2.2rem] font-semibold dark:text-darkTextColor text-gray-900'>ZenUI
                    Hero: How to Join the Hall of Fame</h1>
                <p className='text-[1rem] text-gray-700 mt-2 640px:mt-0.5 dark:text-darkSubTextColor'>Welcome to the
                    official guide on how to become a <b>ZenUI
                        Hero</b>! ZenUI Heroes are elite contributors
                    whose efforts have significantly impacted the ZenUI Library and its community. Your dedication to
                    improving ZenUI can earn you a spot among these exceptional individuals.</p>

                <div className='mt-9'>
                    <h4 className='text-[1.5rem] font-semibold text-gray-900 dark:text-darkTextColor'>🌟 What is a ZenUI
                        Hero?</h4>
                    <p className='text-[1rem] text-gray-700 mt-1 ml-2 dark:text-darkSubTextColor'>A <b>ZenUI Hero</b> is
                        a title awarded to contributors
                        who go above and beyond in helping ZenUI grow,
                        solve critical issues, or make extensive contributions to the library. This recognition reflects
                        your skill, commitment, and value as a community member.</p>
                </div>

                <div className='mt-9 relative'>
                    <h4 className='text-[1.5rem] font-semibold text-gray-900 dark:text-darkTextColor'>🛠️ How to Become a
                        ZenUI Hero?</h4>
                    <p className='text-[1rem] text-gray-700 mt-1 ml-2 dark:text-darkSubTextColor'>To achieve the <b>ZenUI
                        Hero</b> badge, you must:</p>

                    <p className='mt-4 font-semibold ml-2 text-[1.1rem] text-gray-900 dark:text-darkSubTextColor'>1.
                        Solve a Critical Issue</p>
                    <p className='text-[1rem] text-gray-700 ml-6 mt-1 dark:text-darkSubTextColor'>A critical issue is a
                        problem that:</p>

                    <ul className='list-disc ml-14 mb-5 mt-4 text-gray-700 dark:text-darkSubTextColor flex flex-col gap-[8px]'>
                        <li>Breaks the <b>user experience</b> (e.g., navigation or features not working as expected).
                        </li>
                        <li>Prevents the ZenUI Library from being <b>user-friendly</b> or functional.</li>
                        <li>Poses a risk of <b>data loss</b> or a <b>major system failure.</b></li>
                    </ul>

                    {/* badge */}
                    <img alt='zenui hero bage'
                         src='https://i.ibb.co.com/8dfDxXz/best-contributor-badge.png'
                         className='absolute top-[-50px] dark:z-[1] z-[-1] cursor-pointer right-[-220px] w-[400px] animation-bounce-zenui-hero-badge opacity-20'/>

                    <div
                        className='text-[0.9rem] text-gray-700 dark:border-slate-400 dark:bg-slate-800 dark:text-darkSubTextColor border-l-2 bg-yellow-50 border-yellow-500 ml-5 px-5 rounded-md py-3 my-5 w-max'>
                        <b>Example: Fixing a bug that causes a complete layout crash when resizing components.</b></div>

                    <p className='mt-9 font-semibold ml-2 text-[1.1rem] text-gray-900 dark:text-darkSubTextColor'>2.
                        Make Significant
                        Contributions</p>
                    <p className='text-[1rem] text-gray-700 dark:text-darkSubTextColor ml-6 mt-1'>If you haven't tackled
                        a critical issue, you can
                        still earn the badge through <b>huge
                            contributions</b>. This means:</p>

                    <ul className='list-disc mt-4 ml-14 mb-5 dark:text-darkSubTextColor text-gray-700 flex flex-col gap-[8px]'>
                        <li>Submitting <b>10-20+ meaningful contributions</b> to the library.( don't worry, if you
                            solved any critical issue and it's much critical or important for ZenUI Library you will be
                            eligible for the badge )
                        </li>
                        <li>Contributions may include bug fixes, feature implementations, performance optimizations,
                            or improving documentation.
                        </li>
                    </ul>

                    <div
                        className='text-[0.9rem] text-gray-700 border-l-2 dark:bg-slate-800 dark:border-slate-400 dark:text-darkSubTextColor bg-yellow-50 border-yellow-500 ml-5 px-5 rounded-md py-3 my-5 w-max'>
                        <b>Tip: Consistency matters. Show dedication and quality in every contribution.</b></div>
                </div>

                <div className='mt-14'>
                    <h4 className='text-[1.5rem] font-semibold text-gray-900 dark:text-darkTextColor'>📋 Eligibility
                        Criteria</h4>

                    <ul className='list-disc ml-14 mb-5 mt-2 text-gray-700 dark:text-darkSubTextColor flex flex-col gap-[8px]'>
                        <li>You must follow ZenUI’s <b className='underline'><a
                            href='https://github.com/Asfak00/zenui-library/blob/production/CODE_OF_CONDUCT.md'
                            target='_blank'>code of conduct</a></b> and respect the community guidelines.
                        </li>
                        <li>All contributions should align with the ZenUI Library’s <b>mission</b> to provide
                            high-quality UI
                            components and templates.
                        </li>
                        <li>Contributions should be made via the ZenUI Library's official <b className='underline'><a
                            href='https://github.com/Asfak00/zenui-library' target='_blank'>GitHub repository.</a></b>
                        </li>
                    </ul>
                </div>

                <div className='mt-9'>
                    <h4 className='text-[1.5rem] font-semibold text-gray-900 dark:text-darkTextColor'>🏆 Benefits of
                        Becoming a ZenUI Hero</h4>
                    <p className='text-[1rem] text-gray-700 mt-1 ml-2 dark:text-darkSubTextColor'>As a ZenUI Hero,
                        you’ll receive:</p>

                    <p className='mt-5 font-semibold ml-2 text-[1.1rem] text-gray-900 dark:text-darkSubTextColor'>1.
                        Recognition:</p>

                    <ul className='list-disc ml-14 mb-5 mt-2 dark:text-darkSubTextColor text-gray-700 flex flex-col gap-[8px]'>
                        <li>Your name and profile will be featured on the <b className='underline'><a
                            href='https://zenui.net/about-us' target='_blank'>ZenUI Heroes Wall of Fame</a></b> on the
                            official
                            ZenUI Library website.
                        </li>
                        <li>A badge of honor will be displayed alongside your profile.</li>
                    </ul>

                    <p className='mt-7 font-semibold ml-2 dark:text-darkSubTextColor text-[1.1rem] text-gray-900'>2.
                        Exclusive Perks:</p>

                    <ul className='list-disc ml-14 mb-5 mt-2 dark:text-darkSubTextColor text-gray-700 flex flex-col gap-[8px]'>
                        <li>Early access to ZenUI’s beta features and updates.</li>
                        <li>Priority support from the core team.</li>
                        <li>Exclusive invitations to ZenUI events and contests.</li>
                    </ul>

                    <p className='mt-7 font-semibold ml-2 text-[1.1rem] dark:text-darkSubTextColor text-gray-900'>3.
                        Networking Opportunities:</p>

                    <ul className='list-disc ml-14 mb-5 mt-2 dark:text-darkSubTextColor text-gray-700 flex flex-col gap-[8px]'>
                        <li>Connect with a global community of top developers.</li>
                        <li>Gain visibility in the industry and enhance your portfolio.</li>
                    </ul>
                </div>

                <div className='mt-9 relative'>
                    <h4 className='text-[1.5rem] font-semibold text-gray-900 dark:text-darkTextColor'>✨ Tips to
                        Succeed</h4>

                    <ul className='list-disc ml-14 mb-5 mt-3 dark:text-darkSubTextColor text-gray-700 flex flex-col gap-[8px]'>
                        <li>Focus on quality over quantity, even when making multiple contributions.
                        </li>
                        <li>Stay active in discussions on community channels.</li>
                        <li>Provide detailed descriptions of your fixes or features.</li>
                        <li>Collaborate with other contributors to solve complex issues.</li>
                    </ul>

                    {/* badge */}
                    <img alt='zenui hero bage'
                         src='https://i.ibb.co.com/8dfDxXz/best-contributor-badge.png'
                         className='absolute top-[-50px] dark:z-[1] z-[-1] cursor-pointer left-[-200px] 1024px:left-[-420px] w-[400px] animation-bounce-zenui-hero-badge opacity-20'/>
                </div>

                <div className='mt-9'>
                    <h4 className='text-[1.5rem] font-semibold text-gray-900 dark:text-darkTextColor'>❓ Need Help?</h4>
                    <p className='text-[1rem] text-gray-700 mt-1 ml-3 dark:text-darkSubTextColor'>If you have questions
                        or need guidance, feel free to reach out:</p>

                    <ul className='list-disc ml-14 mb-5 mt-5 dark:text-darkSubTextColor text-gray-700 flex flex-col gap-[8px]'>
                        <li><b>Facebook</b>: Join ongoing conversations in the ZenUI community.
                        </li>
                        <li><b>Discord</b>: Contact the core team for support (link available on the ZenUI Library
                            website).
                        </li>
                    </ul>
                </div>

                <p className='text-center 640px:text-start text-[1rem] dark:text-darkSubTextColor text-gray-700 mb-2 mt-16'>We
                    look forward to seeing your contributions and welcoming you as the next <b>ZenUI Hero</b>!</p>
                <b className='text-center flex items-center dark:text-darkSubTextColor justify-center 640px:justify-start text-[1rem] text-gray-700'>Start
                    contributing today and make a difference!</b>
            </div>

            <MetricsCard/>
        </section>
    );
};

export default BecomeZenUIHero;
