import React, {useEffect, useState} from "react";
import Fuse from 'fuse.js';
import {CiSearch} from "react-icons/ci";
import {blocksSearchData, componentSearchData} from "../../Utils/SearchData.js";
import {LuLayoutTemplate} from "react-icons/lu";
import {RxSection} from "react-icons/rx";
import {Link, useNavigate} from "react-router-dom";

const Search = ({isSearchOpen, setIsSearchOpen}) => {
    const [inputText, setInputText] = useState("");
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const [isKeyboardActive, setIsKeyboardActive] = useState(false);
    const navigate = useNavigate();

    // Combine and prepare search data for Fuse.js
    const combinedSearchData = [
        ...componentSearchData.map(item => ({...item, type: 'component'})),
        ...blocksSearchData.map(item => ({...item, type: 'block'}))
    ];

    // Fuse.js configuration
    const fuse = new Fuse(combinedSearchData, {
        keys: [
            {name: 'title', weight: 2},
            {name: 'description', weight: 1},
            {name: 'tags', weight: 1}
        ],
        threshold: 0.3,
        includeScore: true,
        useExtendedSearch: true
    });

    // Search results based on Fuse.js
    const searchResults = inputText
        ? fuse.search(inputText).map(result => result.item)
        : combinedSearchData;


    // Separate components and blocks
    const filteredComponentData = searchResults.filter(item => item.type === 'component');
    const filteredBlocksData = searchResults.filter(item => item.type === 'block');

    const allItems = searchResults;

    useEffect(() => {
        let timeout = null;
        if (isSearchOpen) {
            setInputText("");
            setFocusedIndex(-1);
            timeout = setTimeout(() => {
                const searchInput = document.getElementById("zenui_search_input");
                if (searchInput) {
                    searchInput.focus();
                }
            }, 50);
        }
        return () => timeout && clearTimeout(timeout);
    }, [isSearchOpen]);

    const handleKeyDown = (e) => {
        const totalItems = allItems.length;

        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                setIsKeyboardActive(true);
                setFocusedIndex(prev => {
                    if (prev >= totalItems - 1) return 0;
                    return prev + 1;
                });
                break;

            case "ArrowUp":
                e.preventDefault();
                setIsKeyboardActive(true);
                setFocusedIndex(prev => {
                    if (prev <= 0) return totalItems - 1;
                    return prev - 1;
                });
                break;

            case "Enter":
                e.preventDefault();
                if (focusedIndex >= 0 && focusedIndex < totalItems) {
                    const selectedItem = allItems[focusedIndex];
                    handleItemClick(selectedItem);
                }
                break;

            case "Escape":
                e.preventDefault();
                setIsSearchOpen(false);
                setInputText("");
                setFocusedIndex(-1);
                break;
        }
    };

    const handleMouseMove = () => {
        setIsKeyboardActive(false);
    };

    const handleItemClick = (item) => {
        if (!item) return;

        navigate(item.url);

        setInputText("");
        setFocusedIndex(-1);
        setIsSearchOpen(false);
    };

    useEffect(() => {
        if (focusedIndex >= 0) {
            document.getElementById(`search-item-${focusedIndex}`)?.scrollIntoView({
                block: "center",
                behavior: "smooth",
            });
        }
    }, [focusedIndex]);

    const highlightText = (text, searchText) => {
        if (!searchText || !text) return text;
        if (Array.isArray(text)) {
            return text.map(item => highlightText(item, searchText)).join(', ');
        }
        const regex = new RegExp(`(${searchText})`, "gi");
        return text.replace(regex, "<mark class='bg-yellow-200 text-gray-900'>$1</mark>");
    };

    return (
        <main
            className='w-full h-screen fixed top-0 left-0 bg-black/70 z-[1000] flex items-center justify-center'>
            <div
                className={`${
                    isSearchOpen
                        ? 'scale-[1] opacity-100 z-[100]'
                        : 'scale-[0.7] opacity-0 z-[-1]'
                } transition-all duration-500 zenuiSearchComponent dark:bg-slate-900 bg-secondary w-[90%] 425px:w-[70%] 1024px:w-[40%] h-[80vh] p-6 rounded-high`}
            >
                <div className='relative bg-white dark:bg-slate-900 pb-[10px]'>
                    <CiSearch
                        className='absolute top-[25px] transform -translate-y-1/2 left-4 text-[1.5rem] text-[#9da4b0]'/>
                    <input
                        id='zenui_search_input'
                        maxLength='30'
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className='px-4 pl-12 dark:bg-slate-800 dark:border-slate-700 dark:placeholder:text-slate-500 dark:text-darkTextColor py-3 w-full border rounded-normal border-gray-200 focus:border-primary text-text focus:outline-none'
                        placeholder='Search Component'
                        type='text'
                        autoFocus={isSearchOpen}
                    />
                </div>

                <div className='h-[65vh] overflow-y-auto' style={{scrollbarWidth: 'none'}}>
                    {filteredComponentData?.length > 0 && (
                        <div className='sticky top-0 dark:bg-slate-900 bg-white z-10'>
                            <h3 className='font-bold dark:text-darkTextColor pb-[10px]'>Components</h3>
                        </div>
                    )}
                    <div className='flex flex-col pr-2'>
                        {filteredComponentData?.map((component, index) => (
                            <Link
                                id={`search-item-${index}`}
                                key={index}
                                to={component.url}
                                onMouseMove={handleMouseMove}
                                className={`flex group items-start gap-[10px] py-3 px-3 text-gray-500 
                  ${isKeyboardActive
                                    ? focusedIndex === index
                                        ? 'bg-gray-50 dark:bg-slate-800/50'
                                        : 'text-gray-500'
                                    : 'hover:bg-gray-50 dark:hover:bg-slate-800/50'
                                } rounded-md transition-colors`}
                            >
                                <LuLayoutTemplate
                                    className='text-[1.4rem] dark:text-darkSubTextColor flex-shrink-0 mt-1'/>
                                <div className='flex-1 min-w-0'>
                                    <p
                                        className='text-[1rem] font-[500] dark:text-darkSubTextColor text-gray-600 capitalize'
                                        dangerouslySetInnerHTML={{
                                            __html: highlightText(component.title, inputText),
                                        }}
                                    />
                                    {component.description && (
                                        <p
                                            className={`text-sm font-[300] dark:text-darkSubTextColor/60 mt-0.5 truncate text-gray-500`}
                                            dangerouslySetInnerHTML={{
                                                __html: highlightText(component.description, inputText),
                                            }}
                                        />
                                    )}
                                    {component.tags && (
                                        <div className='flex flex-wrap gap-1 mt-2'>
                                            {component.tags.map((tag, tagIndex) => (
                                                <span
                                                    key={tagIndex}
                                                    className={`text-xs group-hover:bg-gray-200 dark:group-hover:bg-slate-800 dark:group-hover:text-darkSubTextColor px-2 py-0.5 rounded-full ${
                                                        focusedIndex === index
                                                            ? 'bg-gray-200 dark:bg-slate-800 dark:text-darkSubTextColor'
                                                            : 'bg-gray-100 text-gray-600 dark:bg-slate-800 dark:text-darkSubTextColor'
                                                    }`}
                                                >
                          {tag}
                        </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                    {filteredBlocksData?.length > 0 && (
                        <div className='sticky top-0 bg-white dark:bg-slate-900 z-10 mt-5'>
                            <h3 className='dark:text-darkTextColor font-bold pb-[10px]'>Blocks</h3>
                        </div>
                    )}
                    <div className='flex flex-col pr-2 pb-7'>
                        {filteredBlocksData?.map((block, index) => {
                            const blockIndex = filteredComponentData.length + index;
                            return (
                                <Link
                                    id={`search-item-${blockIndex}`}
                                    key={blockIndex}
                                    to={block.url}
                                    onMouseMove={handleMouseMove}
                                    className={`flex items-start group gap-[10px] py-3 px-3 text-gray-500 
                    ${isKeyboardActive
                                        ? focusedIndex === blockIndex
                                            ? 'bg-gray-50 dark:bg-slate-800/50'
                                            : 'text-gray-500'
                                        : 'hover:bg-gray-50 dark:hover:bg-slate-800/50'
                                    } rounded-md transition-colors`}
                                >
                                    <RxSection className='text-[1.4rem] dark:text-darkSubTextColor flex-shrink-0 mt-1'/>
                                    <div className='flex-1 min-w-0'>
                                        <p
                                            className='text-[1rem] dark:text-darkSubTextColor text-gray-600 font-[500] capitalize'
                                            dangerouslySetInnerHTML={{
                                                __html: highlightText(block.title, inputText),
                                            }}
                                        />
                                        {block.description && (
                                            <p
                                                className={`text-sm font-[300] dark:text-darkSubTextColor/60 mt-0.5 truncate text-gray-500`}
                                                dangerouslySetInnerHTML={{
                                                    __html: highlightText(block.description, inputText),
                                                }}
                                            />
                                        )}
                                        {block.tags && (
                                            <div className='flex flex-wrap gap-1 mt-2'>
                                                {block.tags.map((tag, tagIndex) => (
                                                    <span
                                                        key={tagIndex}
                                                        className={`text-xs px-2 group-hover:bg-gray-200 dark:group-hover:bg-slate-800 dark:group-hover:text-darkSubTextColor py-0.5 rounded-full ${
                                                            focusedIndex === blockIndex
                                                                ? 'bg-gray-200 dark:bg-slate-800 dark:text-darkSubTextColor'
                                                                : 'bg-gray-100 text-gray-600 dark:bg-slate-800 dark:text-darkSubTextColor'
                                                        }`}
                                                    >
                            {tag}
                          </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    {!filteredBlocksData?.length && !filteredComponentData?.length && (
                        <div className='mt-5 flex items-center h-[90%] flex-col justify-center'>
                            <img src='/zenui_search_not_found.png' className='w-[60px]'/>
                            <p className='text-[0.9rem] text-text mt-2'>No Search found!</p>
                        </div>
                    )}
                </div>

                {/* Bottom Navigation */}
                <div
                    className='w-full hidden 1024px:block fixed bottom-0 left-0 dark:bg-slate-800 dark:border-slate-700 bg-white border-t border-gray-200 rounded-b-high'>
                    <div className='flex flex-wrap gap-[15px] p-3'>
                        <div className='flex items-center gap-[5px]'>
              <span
                  className='bg-gray-100 dark:bg-slate-900 dark:text-darkSubTextColor text-gray-500 px-2 flex items-center justify-center py-1 rounded font-semibold text-[0.7rem] w-5 h-5 text-center'>
                ↑
              </span>
                            <span className='text-[0.7rem] dark:text-darkSubTextColor text-gray-500 capitalize'>up navigate</span>
                        </div>
                        <div className='flex items-center gap-[5px]'>
              <span
                  className='bg-gray-100 dark:bg-slate-900 dark:text-darkSubTextColor text-gray-500 px-2 py-1 flex items-center justify-center rounded font-semibold text-[0.7rem] w-5 h-5 text-center'>
                ↓
              </span>
                            <span className='text-[0.7rem] dark:text-darkSubTextColor text-gray-500 capitalize'>down navigate</span>
                        </div>
                        <div className='flex items-center gap-[5px]'>
              <span
                  className='bg-gray-100 dark:bg-slate-900 dark:text-darkSubTextColor text-gray-500 px-2 py-1 flex items-center justify-center rounded font-semibold text-[0.7rem] w-5 h-5 text-center'>
                ↵
              </span>
                            <span
                                className='text-[0.7rem] dark:text-darkSubTextColor text-gray-500 capitalize'>select</span>
                        </div>
                        <div className='flex items-center gap-2'>
              <span
                  className='bg-gray-100 dark:bg-slate-900 dark:text-darkSubTextColor text-gray-500 px-2 py-1 flex items-center justify-center rounded font-semibold text-[0.7rem] w-8 h-5 text-center'>
                Esc
              </span>
                            <span
                                className='text-[0.7rem] dark:text-darkSubTextColor text-gray-500 capitalize'>close</span>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Search;