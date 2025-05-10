import React, {useState} from "react";

// components
import ContentHeader from "@shared/ContentHeader";
import {Helmet} from "react-helmet";
import BlocksShowCode from "@shared/Block/BlocksShowCode.jsx";
import BlocksFooter from "@shared/Block/BlocksFooter.jsx";
import BlockDescription from "@shared/Block/BlockDescription.jsx";
import BlockToggleTab from "@shared/Block/BlockToggleTab.jsx";
import BlockWrapper from "@shared/Block/BlockWrapper.jsx";


const Empty = () => {

    const [emptyPage1Preview, setEmptyPage1Preview] = useState(true);
    const [emptyPage1Code, setEmptyPage1Code] = useState(false);

    const [emptyPage2Preview, setEmptyPage2Preview] = useState(true);
    const [emptyPage2Code, setEmptyPage2Code] = useState(false);

    const [emptyPage3Preview, setEmptyPage3Preview] = useState(true);
    const [emptyPage3Code, setEmptyPage3Code] = useState(false);

    const [emptyPage4Preview, setEmptyPage4Preview] = useState(true);
    const [emptyPage4Code, setEmptyPage4Code] = useState(false);

    const [emptyPage5Preview, setEmptyPage5Preview] = useState(true);
    const [emptyPage5Code, setEmptyPage5Code] = useState(false);

    const [emptyPage6Preview, setEmptyPage6Preview] = useState(true);
    const [emptyPage6Code, setEmptyPage6Code] = useState(false);

    const [emptyPage7Preview, setEmptyPage7Preview] = useState(true);
    const [emptyPage7Code, setEmptyPage7Code] = useState(false);

    const [emptyPage8Preview, setEmptyPage8Preview] = useState(true);
    const [emptyPage8Code, setEmptyPage8Code] = useState(false);

    const [emptyPage9Preview, setEmptyPage9Preview] = useState(true);
    const [emptyPage9Code, setEmptyPage9Code] = useState(false);

    return (
        <aside className="flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10">
            <div>
                <ContentHeader text={"empty page 1"} id={"empty_page_1"}/>

                <BlockDescription
                    text='An empty page design features minimal content, often with a message or icon indicating no data is available, alongside a call-to-action button or navigation to help users proceed.'/>

                <BlockToggleTab code={emptyPage1Code} setCode={setEmptyPage1Code} setPreview={setEmptyPage1Preview}
                                preview={emptyPage1Preview}/>

                <BlockWrapper>
                    {emptyPage1Preview && (
                        <div className={`p-8  flex flex-wrap items-center gap-5 justify-center overflow-hidden`}>

                            <div
                                className='shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] dark:bg-slate-900 p-6 640px:px-20 640px:py-14 flex items-center justify-center flex-col gap-[4px] rounded-xl'>
                                <img src='https://i.ibb.co/z8VbyRc/Charco-Mobile-Life.png' alt='empty/image'
                                     className='w-full 640px:w-[200px]'/>

                                <h1 className='text-[1.4rem] dark:text-[#abc2d3] mt-6 font-[500] text-black'>No
                                    transactions yet</h1>

                                <p className='text-[0.9rem] dark:text-slate-400 text-gray-500'> Make Your First
                                    Transfer</p>
                            </div>

                        </div>
                    )}

                    {emptyPage1Code && <BlocksShowCode code='
import React from "react";

const EmptyPage = () => {

    return (
        <div
            className="shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] dark:bg-slate-900 p-6 sm:px-20 sm:py-14 flex items-center justify-center flex-col gap-[4px] rounded-xl">
            <img src="https://i.ibb.co/z8VbyRc/Charco-Mobile-Life.png" alt="empty/image"
                 className="w-full sm:w-[200px]"/>

            <h1 className="text-[1.4rem] dark:text-[#abc2d3] mt-6 font-[500] text-black">No transactions yet</h1>

            <p className="text-[0.9rem] dark:text-slate-400 text-gray-500"> Make Your First Transfer</p>
        </div>
    );
};

export default EmptyPage;
                    '/>
                    }
                </BlockWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"empty page 2"} id={"empty_page_2"}/>
                </div>

                <BlockDescription
                    text='An empty page design features minimal content, often with a message or icon indicating no data is available, alongside a call-to-action button or navigation to help users proceed.'/>

                <BlockToggleTab code={emptyPage2Code} setCode={setEmptyPage2Code} setPreview={setEmptyPage2Preview}
                                preview={emptyPage2Preview}/>

                <BlockWrapper>
                    {emptyPage2Preview && (
                        <div className={`p-8  flex flex-wrap items-center gap-5 justify-center overflow-hidden`}>

                            <div
                                className='shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] dark:bg-slate-900 p-6 640px:px-20 640px:py-14 flex items-center justify-center flex-col gap-[4px] rounded-xl'>
                                <img src='https://i.ibb.co/ZfTb1sJ/Amigos-Standing.png' alt='empty/image'
                                     className='w-full 640px:w-[200px]'/>

                                <h1 className='text-[1.4rem] dark:text-[#abc2d3] mt-6 font-[500] text-black'>No tasks
                                    left</h1>

                                <p className='text-[0.9rem] dark:text-slate-400 text-gray-500'>You’ve done a great
                                    job</p>
                            </div>

                        </div>
                    )}

                    {emptyPage2Code && <BlocksShowCode code='
import React from "react";

const EmptyPage = () => {

    return (
        <div
            className="shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] dark:bg-slate-900 p-6 sm:px-20 sm:py-14 flex items-center justify-center flex-col gap-[4px] rounded-xl">
            <img src="https://i.ibb.co/ZfTb1sJ/Amigos-Standing.png" alt="empty/image" className="wfull sm:w-[200px]"/>

            <h1 className="text-[1.4rem] dark:text-[#abc2d3] mt-6 font-[500] text-black">No tasks left</h1>

            <p className="text-[0.9rem] dark:text-slate-400 text-gray-500">You’ve done a great job</p>
        </div>
    );
};

export default EmptyPage;
                    '/>
                    }
                </BlockWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"empty page 3"} id={"empty_page_3"}/>
                </div>

                <BlockDescription
                    text='An empty page design features minimal content, often with a message or icon indicating no data is available, alongside a call-to-action button or navigation to help users proceed.'/>

                <BlockToggleTab code={emptyPage3Code} setCode={setEmptyPage3Code} setPreview={setEmptyPage3Preview}
                                preview={emptyPage3Preview}/>

                <BlockWrapper>
                    {emptyPage3Preview && (
                        <div className={`p-8  flex flex-wrap items-center gap-5 justify-center overflow-hidden`}>

                            <div
                                className='shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] dark:bg-slate-900 p-6 640px:px-20 640px:py-14 flex items-center justify-center flex-col gap-[4px] rounded-xl'>
                                <img src='https://i.ibb.co/X3P0nnK/Group-1.png' alt='empty/image'
                                     className='w-full 640px:w-[200px]'/>

                                <h1 className='text-[1.4rem] dark:text-[#abc2d3] mt-6 font-[500] text-black'>Empty
                                    Playlist</h1>

                                <p className='text-[0.9rem] dark:text-slate-400 text-gray-500'>You haven't added any
                                    song yet</p>
                            </div>

                        </div>
                    )}

                    {emptyPage3Code && <BlocksShowCode code='
import React from "react";

const EmptyPage = () => {

    return (
        <div
            className="shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] dark:bg-slate-900 p-6 sm:px-20 sm:py-14 flex items-center justify-center flex-col gap-[4px] rounded-xl">
            <img src="https://i.ibb.co/X3P0nnK/Group-1.png" alt="empty/image" className="w-full sm:w-[200px]"/>

            <h1 className="text-[1.4rem] dark:text-[#abc2d3] mt-6 font-[500] text-black">Empty Playlist</h1>

            <p className="text-[0.9rem] dark:text-slate-400 text-gray-500">You haven"t added any song yet</p>
        </div>
    );
};

export default EmptyPage;
                    '/>
                    }
                </BlockWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"empty page 4"} id={"empty_page_4"}/>
                </div>

                <BlockDescription
                    text='An empty page design features minimal content, often with a message or icon indicating no data is available, alongside a call-to-action button or navigation to help users proceed.'/>

                <BlockToggleTab code={emptyPage4Code} setCode={setEmptyPage4Code} setPreview={setEmptyPage4Preview}
                                preview={emptyPage4Preview}/>

                <BlockWrapper>
                    {emptyPage4Preview && (
                        <div className={`p-8  flex flex-wrap items-center gap-5 justify-center overflow-hidden`}>

                            <div
                                className='shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] dark:bg-slate-900 p-6 640px:px-20 640px:py-14 flex items-center justify-center flex-col gap-[4px] rounded-xl'>
                                <img src='https://i.ibb.co/m5DrBt1/Group-2.png' alt='empty/image'
                                     className='w-full 640px:w-[200px]'/>

                                <h1 className='text-[1.4rem] dark:text-[#abc2d3] mt-6 font-[500] text-black'>No
                                    Result</h1>

                                <p className='text-[0.9rem] dark:text-slate-400 text-gray-500'>Please Login to view more
                                    updates</p>
                            </div>

                        </div>
                    )}

                    {emptyPage4Code && <BlocksShowCode code='
import React from "react";

const EmptyPage = () => {

    return (
        <div
            className="shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] dark:bg-slate-900 p-6 sm:px-20 sm:py-14 flex items-center justify-center flex-col gap-[4px] rounded-xl">
            <img src="https://i.ibb.co/m5DrBt1/Group-2.png" alt="empty/image" className="w-full sm:w-[200px]"/>

            <h1 className="text-[1.4rem] dark:text-[#abc2d3] mt-6 font-[500] text-black">No Result</h1>

            <p className="text-[0.9rem] dark:text-slate-400 text-gray-500">Please Login to view more updates</p>
        </div>
    );
};

export default EmptyPage;
                    '/>
                    }
                </BlockWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"empty page 5"} id={"empty_page_5"}/>
                </div>

                <BlockDescription
                    text='An empty page design features minimal content, often with a message or icon indicating no data is available, alongside a call-to-action button or navigation to help users proceed.'/>

                <BlockToggleTab code={emptyPage5Code} setCode={setEmptyPage5Code} setPreview={setEmptyPage5Preview}
                                preview={emptyPage5Preview}/>

                <BlockWrapper>
                    {emptyPage5Preview && (
                        <div className={`p-8  flex flex-wrap items-center gap-5 justify-center overflow-hidden`}>

                            <div
                                className='shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] dark:bg-slate-900 p-6 640px:px-20 640px:py-14 flex items-center justify-center flex-col gap-[4px] rounded-xl'>
                                <img src='https://i.ibb.co/JrfVWx9/Message.png' alt='empty/image'
                                     className='w-full 640px:w-[200px]'/>

                                <h1 className='text-[1.4rem] dark:text-[#abc2d3] mt-6 font-[500] text-black'>No
                                    Messages</h1>

                                <p className='text-[0.9rem] dark:text-slate-400 text-gray-500'>When you have messages
                                    you’ll see them here</p>
                            </div>

                        </div>
                    )}

                    {emptyPage5Code && <BlocksShowCode code='
import React from "react";

const EmptyPage = () => {

    return (
        <div
            className="shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] dark:bg-slate-900 p-6 sm:px-20 sm:py-14 flex items-center justify-center flex-col gap-[4px] rounded-xl">
            <img src="https://i.ibb.co/JrfVWx9/Message.png" alt="empty/image" className="w-full sm:w-[200px]"/>

            <h1 className="text-[1.4rem] mt-6 dark:text-[#abc2d3] font-[500] text-black">No Messages</h1>

            <p className="text-[0.9rem] dark:text-slate-400 text-gray-500">When you have messages you’ll see them here</p>
        </div>
    );
};

export default EmptyPage;
                    '/>
                    }
                </BlockWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"empty page 6"} id={"empty_page_6"}/>
                </div>

                <BlockDescription
                    text='An empty page design features minimal content, often with a message or icon indicating no data is available, alongside a call-to-action button or navigation to help users proceed.'/>

                <BlockToggleTab code={emptyPage6Code} setCode={setEmptyPage6Code} setPreview={setEmptyPage6Preview}
                                preview={emptyPage6Preview}/>

                <BlockWrapper>
                    {emptyPage6Preview && (
                        <div className={`p-8  flex flex-wrap items-center gap-5 justify-center overflow-hidden`}>

                            <div
                                className='shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] dark:bg-slate-900 p-6 640px:px-20 640px:py-14 flex items-center justify-center flex-col gap-[4px] rounded-xl'>
                                <img src='https://i.ibb.co/cgfgxGH/Illustrations.png' alt='empty/image'
                                     className='w-full 640px:w-[200px]'/>

                                <h1 className='text-[1.4rem] dark:text-[#abc2d3] mt-6 font-[500] text-black'>Result Not
                                    Found</h1>

                                <p className='text-[0.9rem] dark:text-slate-400 text-gray-500'>Whoops ... this
                                    information is not available for a moment</p>
                            </div>

                        </div>
                    )}

                    {emptyPage6Code && <BlocksShowCode code='
import React from "react";

const EmptyPage = () => {

    return (
        <div
            className="shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] dark:bg-slate-900 p-6 sm:px-20 sm:py-14 flex items-center justify-center flex-col gap-[4px] rounded-xl">
            <img src="https://i.ibb.co/cgfgxGH/Illustrations.png" alt="empty/image" className="w-full sm:w-[200px]"/>

            <h1 className="text-[1.4rem] mt-6 dark:text-[#abc2d3] font-[500] text-black">Result Not Found</h1>

            <p className="text-[0.9rem] dark:text-slate-400 text-gray-500">Whoops ... this information is not available for a moment</p>
        </div>
    );
};

export default EmptyPage;
                    '/>
                    }
                </BlockWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"empty page 7"} id={"empty_page_7"}/>
                </div>

                <BlockDescription
                    text='An empty page design features minimal content, often with a message or icon indicating no data is available, alongside a call-to-action button or navigation to help users proceed.'/>

                <BlockToggleTab code={emptyPage7Code} setCode={setEmptyPage7Code} setPreview={setEmptyPage7Preview}
                                preview={emptyPage7Preview}/>

                <BlockWrapper>
                    {emptyPage7Preview && (
                        <div className={`p-8  flex flex-wrap items-center gap-5 justify-center overflow-hidden`}>

                            <div
                                className='shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] dark:bg-slate-900 p-6 640px:px-20 640px:py-14 flex items-center justify-center flex-col gap-[4px] rounded-xl'>
                                <img src='https://i.ibb.co/nmSDvYj/Illustrations-1.png' alt='empty/image'
                                     className='w-full 640px:w-[200px]'/>

                                <h1 className='text-[1.4rem] dark:text-[#abc2d3] mt-3 font-[500] text-black'>Your inbox
                                    is empty</h1>

                                <p className='text-[0.9rem] dark:text-slate-400 text-gray-500'>Pick a person from left
                                    menu and start your conversation</p>
                            </div>

                        </div>
                    )}

                    {emptyPage7Code && <BlocksShowCode code='
import React from "react";

const EmptyPage = () => {

    return (
        <div
            className="shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] dark:bg-slate-900 p-6 sm:px-20 sm:py-14 flex items-center justify-center flex-col gap-[4px] rounded-xl">
            <img src="https://i.ibb.co/nmSDvYj/Illustrations-1.png" alt="empty/image"
                 className="w-full sm:w-[200px]"/>

            <h1 className="text-[1.4rem] dark:text-[#abc2d3] mt-3 font-[500] text-black">Your inbox is empty</h1>

            <p className="text-[0.9rem] dark:text-slate-400 text-gray-500">Pick a person from left menu and start your conversation</p>
        </div>
    );
};

export default EmptyPage;
                    '/>
                    }
                </BlockWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"empty page 8"} id={"empty_page_8"}/>
                </div>

                <BlockDescription
                    text='An empty page design features minimal content, often with a message or icon indicating no data is available, alongside a call-to-action button or navigation to help users proceed.'/>

                <BlockToggleTab code={emptyPage8Code} setCode={setEmptyPage8Code} setPreview={setEmptyPage8Preview}
                                preview={emptyPage8Preview}/>

                <BlockWrapper>
                    {emptyPage8Preview && (
                        <div className={`p-8  flex flex-wrap items-center gap-5 justify-center overflow-hidden`}>

                            <div
                                className='shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] dark:bg-slate-900 p-6 640px:px-20 640px:py-14 flex items-center justify-center flex-col gap-[4px] rounded-xl'>
                                <img src='https://i.ibb.co/6nSHrGp/Favorite-illustration.png' alt='empty/image'
                                     className='w-full 640px:w-[200px]'/>

                                <h1 className='text-[1.4rem] dark:text-[#abc2d3] mt-3 font-[500] text-black'>No
                                    Favourites</h1>

                                <p className='text-[0.9rem] dark:text-slate-400 text-gray-500'>You can add an item to
                                    your favourites by clicking “Star Icon”</p>
                            </div>

                        </div>
                    )}

                    {emptyPage8Code && <BlocksShowCode code='
import React from "react";

const EmptyPage = () => {

    return (
        <div
            className="shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] dark:bg-slate-900 p-6 sm:px-20 sm:py-14 flex items-center justify-center flex-col gap-[4px] rounded-xl">
            <img src="https://i.ibb.co/6nSHrGp/Favorite-illustration.png" alt="empty/image"
                 className="w-full sm:w-[200px]"/>

            <h1 className="text-[1.4rem] dark:text-[#abc2d3] mt-3 font-[500] text-black">No Favourites</h1>

            <p className="text-[0.9rem] dark:text-slate-400 text-gray-500">You can add an item to your favourites by clicking “Star
                Icon”</p>
        </div>
    );
};

export default EmptyPage;
                    '/>
                    }
                </BlockWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"empty page 9"} id={"empty_page_9"}/>
                </div>

                <BlockDescription
                    text='An empty page design features minimal content, often with a message or icon indicating no data is available, alongside a call-to-action button or navigation to help users proceed.'/>

                <BlockToggleTab code={emptyPage9Code} setCode={setEmptyPage9Code} setPreview={setEmptyPage9Preview}
                                preview={emptyPage9Preview}/>

                <BlockWrapper>
                    {emptyPage9Preview && (
                        <div className={`p-8  flex flex-wrap items-center gap-5 justify-center overflow-hidden`}>

                            <div
                                className='shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] dark:bg-slate-900 p-6 640px:px-20 640px:py-14 flex items-center justify-center flex-col gap-[4px] rounded-xl'>
                                <img src='https://i.ibb.co/qW8ztPd/Successful-illustration.png' alt='empty/image'
                                     className='w-full 640px:w-[200px]'/>

                                <h1 className='text-[1.4rem] dark:text-[#abc2d3] mt-3 font-[500] text-black'>Successful</h1>

                                <p className='text-[0.9rem] dark:text-slate-400 text-gray-500'>Your changes were made
                                    successfully</p>
                            </div>

                        </div>
                    )}

                    {emptyPage9Code && <BlocksShowCode code='
import React from "react";

const EmptyPage = () => {

    return (
        <div
            className="shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] dark:bg-slate-900 p-6 sm:px-20 sm:py-14 flex items-center justify-center flex-col gap-[4px] rounded-xl">
            <img src="https://i.ibb.co/qW8ztPd/Successful-illustration.png" alt="empty/image"
                 className="w-full sm:w-[200px]"/>

            <h1 className="text-[1.4rem] dark:text-[#abc2d3] mt-3 font-[500] text-black">Successful</h1>

            <p className="text-[0.9rem] dark:text-slate-400 text-gray-500">Your changes were made successfully</p>
        </div>
    );
};

export default EmptyPage;
                    '/>
                    }
                </BlockWrapper>

                <BlocksFooter backUrl='/blocks/404-page' backName='404 page' forwardName='offer grid'
                              forwardUrl='/blocks/offer-grid'/>
            </div>


            <Helmet>
                <title>Blocks - Empty Page</title>
            </Helmet>
        </aside>
    );
};

export default Empty;
