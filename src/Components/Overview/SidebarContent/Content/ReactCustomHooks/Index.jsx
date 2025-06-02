import React, {useState, useEffect} from "react";
import {Helmet} from "react-helmet";
import BlocksFooter from "@shared/Block/BlocksFooter.jsx";
import {CustomHooksData} from "@utils/CustomHooksData.js";
import HookCodeModal from "./HookCodeModal.jsx";

const ReactCustomHooks = () => {
    const [open, setOpen] = useState(false);
    const [hookObj, setHookObj] = useState({});
    const [searchedvalue, setSearchedvalue] = useState(null);
    const [filteredHooksData, setFilteredHooksData] = useState(CustomHooksData);

    const handleGetCodeClick = (hook) => {
        setHookObj(hook)
        setOpen(true)
    }

    const handleOnChange = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchedvalue(value);

        if (!value) {
            setFilteredHooksData(CustomHooksData);
        } else {
            setFilteredHooksData(
                CustomHooksData?.filter((hook) =>
                    hook.name.toLowerCase().includes(value) ||
                    hook.keywords.some((keyword) =>
                        keyword.toLowerCase().includes(value)
                    )
                )
            );
        }
    };

    return (
        <aside className='w-full 640px:pl-[2.5rem] px-6 640px:px-10'>
            <h1 className="text-[2rem] 425px:text-[2.7rem] font-[600] text-brandColor">
                Custom Hooks
            </h1>
            <p className="w-full text-text text-[1rem] dark:text-darkSubTextColor mb-5">
                {
                    `The Custom Hooks section in ZenUI Library provides a collection of custom hooks designed to simplify complex functionality, helping developers build better applications faster. With over ${CustomHooksData?.length}+ hooks (and more on the way), these resources include essentials like state management, API handling, event listeners, and UI logic tailored to address common development needs. Each hook is carefully curated to offer efficient, reusable solutions that integrate seamlessly into any React project.`
                }
            </p>

            {/*  search area  */}
            <div>
                <input type='text' placeholder='Search hook...' onChange={handleOnChange}
                       className='py-3 px-4 dark:bg-slate-900 dark:border-darkBorderColor dark:text-darkSubTextColor border border-gray-200 mt-4 rounded-normal focus:border-[#0FABCA] outline-none w-full 640px:w-[50%]'/>
            </div>

            <div className='grid grid-cols-1 640px:grid-cols-2 1024px:grid-cols-3 gap-[20px] mt-10'>
                {
                    filteredHooksData?.map((customHook, index) => (
                        <div key={index}
                             className='rounded-high z-0 overflow-hidden relative dark:border-darkBorderColor border border-border flex flex-col h-full'>
                            <div
                                className='relative bg-white dark:bg-darkBgColor px-4 text-center min-h-[160px] flex items-center capitalize justify-center'>
                                {/*  top blur  */}
                                <div
                                    className='bg-gradient-to-t from-transparent dark:opacity-30 dark:to-[#0FABCA] to-[#b2e2ea] w-full h-[50%] absolute top-0 left-0 z-0'></div>

                                <p className='text-[1.4rem] z-10 font-[600] text-[#0FABCA]'>{customHook?.name}</p>

                                {/*  bottom blur  */}
                                <div
                                    className='w-full bg-gradient-to-b absolute flex items-end justify-center bottom-0 left-0  from-transparent to-[#dbbaef] dark:to-[#9A04F5] dark:opacity-20 h-[50%] z-0'></div>
                            </div>

                            <div className='p-[20px] bg-white dark:bg-slate-900 flex flex-col flex-grow'>
                                <div className='flex-grow'>
                                    <p className='text-[0.9rem] dark:text-darkSubTextColor/90 text-gray-600 mt-1'><b
                                        className='text-gray-700 dark:text-darkSubTextColor'>Description:</b> {customHook?.description}
                                    </p>

                                    <p className='text-[0.9rem] text-gray-600 mt-3 dark:text-darkSubTextColor/90'><b
                                        className='text-gray-700 dark:text-darkSubTextColor'>Usage
                                        Scenario:</b> {customHook?.usages}</p>

                                    <p className='text-[0.9rem] text-gray-600 mt-3 dark:text-darkSubTextColor/90'><b
                                        className='text-gray-700 dark:text-darkSubTextColor'>Behavior:</b> {customHook?.behavior}
                                    </p>
                                </div>
                                <button onClick={() => handleGetCodeClick(customHook)}
                                        className='py-3 px-4 bg-gray-300 dark:bg-slate-600 dark:text-darkSubTextColor hover:bg-[#0FABCA] transition-all duration-200 rounded-normal w-full mt-8 uppercase text-[0.9rem] text-gray-600 hover:text-white font-[500]'>Get
                                    Code
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>
            {
                !filteredHooksData?.length && (
                    <div className='flex flex-col items-center justify-center py-12'>
                        <img alt='empty/image' src='https://i.ibb.co.com/ZM5YC1t/Webhook.png' className='w-[50px] '/>
                        <p className='text-[1rem] text-gray-400 font-[500] mt-2'>No hook found!</p>
                    </div>
                )
            }

            {
                open && (
                    <HookCodeModal setOpen={setOpen} hook={hookObj}/>
                )
            }

            <BlocksFooter backUrl='/docs/resources' backName='resources' forwardName='templates'
                          forwardUrl='/templates'/>

            <Helmet>
                <title>Get-Started - Custom Hooks</title>
            </Helmet>
        </aside>
    );
};

export default ReactCustomHooks;