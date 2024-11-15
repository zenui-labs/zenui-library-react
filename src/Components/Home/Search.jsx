import React, {useEffect, useState} from "react";

// react icons
import {CiSearch} from "react-icons/ci";

// search data
import {blocksSearchData, componentSearchData} from "../../Utils/SearchData.js";
import {LuLayoutTemplate} from "react-icons/lu";
import {RxSection} from "react-icons/rx";
import {Link} from "react-router-dom";

const Search = ({isSearchOpen}) => {

    const[filteredComponentData, setFilteredComponentData] = useState(componentSearchData);
    const[filteredBlocksData, setFilteredBlocksData] = useState(blocksSearchData);
    const [inputText, setInputText] = useState('')

    useEffect(() => {
        document.getElementById('zenui_search_input').focus()
    }, [isSearchOpen])

    useEffect(() => {
        const filterData = (dataArray) => {
            return dataArray.filter((data) =>
                data.title.toLowerCase().includes(inputText.toLowerCase())
            );
        };

        setFilteredComponentData(filterData(componentSearchData));
        setFilteredBlocksData(filterData(blocksSearchData));
    }, [inputText]);

    return (
        <main className="w-full h-screen fixed top-0 left-0 bg-[#00000057] !z-[1000] flex items-center justify-center">
            <div
                className={`${isSearchOpen ? 'scale-[1] opacity-100 z-[100]' : 'scale-[0.7] opacity-0 z-[-1]'} transition-all duration-500 zenuiSearchComponent bg-secondary w-[90%] 425px:w-[70%] 1024px:w-[40%] h-[80vh] p-6 rounded-md `}>
                <div className='relative bg-white pb-[10px]'>
                    <CiSearch
                        className='absolute top-[25px] transform -translate-y-1/2 left-4 text-[1.5rem] text-[#9da4b0]'/>
                    <input id='zenui_search_input' autoFocus maxLength='30'
                           onInput={(e) => setInputText(e.target.value)}
                           className='px-4 pl-12 py-3 w-full border rounded-md border-gray-200 focus:border-primary text-text focus:outline-none'
                           placeholder='Search Component' type='text'/>
                    <span
                        className='bg-gray-200 rounded-md px-3.5 py-1.5 text-gray-500 absolute top-[25px] transform -translate-y-1/2 right-1.5'>Esc</span>
                </div>

                <div className='h-[65vh]'>

                    {
                        filteredComponentData?.length > 0 && (
                            <div className='mt-5'>
                                <h3 className='text-gray-600 font-bold pb-[10px]'>Components</h3>

                                <div className={`${filteredBlocksData?.length <= 0 ? 'h-full' : 'max-h-[25vh]'} flex flex-col overflow-y-auto`}
                                     style={{scrollbarWidth: 'none'}}>
                                    {
                                        filteredComponentData?.map((component, index) => (
                                            <Link key={index} to={component.url}
                                                  className='flex items-center gap-[7px] py-3 px-3 text-gray-500 hover:text-secondary hover:bg-primary rounded-md'>
                                                <LuLayoutTemplate className='text-[1.4rem]'/>
                                                <p className='text-[1rem] font-[500]  capitalize '>{component.title}</p>
                                            </Link>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }

                    {
                        filteredBlocksData?.length > 0 && (
                            <div className='mt-5'>
                                <h3 className='text-gray-600 font-bold pb-[10px]'>Blocks</h3>

                                <div className='flex flex-col max-h-[20vh] 1024px:max-h-[25vh] overflow-y-auto'
                                     style={{scrollbarWidth: 'none'}}>
                                    {
                                        filteredBlocksData?.map((block, index) => (
                                            <Link key={index} to={block.url}
                                                  className='flex items-center gap-[7px] py-3 px-3 text-gray-500 hover:text-secondary hover:bg-primary rounded-md'>
                                                <RxSection className='text-[1.4rem]'/>
                                                <p className='text-[1rem] font-[500] capitalize'>{block.title}</p>
                                            </Link>
                                        ))
                                    }
                                </div>
                            </div>
                        )
                    }

                    {
                        (!filteredBlocksData?.length && !filteredComponentData?.length) && (
                            <div className='mt-5 flex items-center h-[90%] flex-col justify-center'>
                                <img src='/zenui_search_not_found.png' className='w-[60px]'/>
                                <p className='text-[0.9rem] text-text mt-2'>No Search found!</p>
                            </div>
                        )
                    }

                </div>

            </div>
        </main>
    );
};

export default Search;
