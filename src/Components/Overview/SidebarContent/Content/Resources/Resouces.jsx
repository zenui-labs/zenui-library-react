import React, {useState, useEffect} from "react";
import {Helmet} from "react-helmet";
import {FaBookmark, FaRegBookmark} from "react-icons/fa";
import {RxExternalLink} from "react-icons/rx";
import {resourcesData} from "../../../../../Utils/ResourcesData.js"
import FilterByLanguages from "./FilterByLanguages.jsx";
import FilterByPackage from "./FilterByPackage.jsx";
import FilterByBookmarks from "./FilterByBookmarks.jsx";
import BlocksFooter from "../../../../../Shared/Block/BlocksFooter.jsx";

const Resources = () => {
    const [selectedLanguage, setSelectedLanguage] = useState({slug: 'all'})
    const [selectedPackage, setSelectedPackage] = useState({slug: 'all'})
    const [bookmark, setBookmark] = useState({slug: 'all'})
    const [searchValue, setSearchValue] = useState('')
    const [bookmarkedItems, setBookmarkedItems] = useState([]);
    const [filteredResources, setFilteredResources] = useState(resourcesData);

    useEffect(() => {
        const savedBookmarks = JSON.parse(localStorage.getItem('bookmarkedItems')) || [];
        setBookmarkedItems(savedBookmarks);
    }, []);

    useEffect(() => {

        const filtered = resourcesData.filter((resource) => {
            // Search filter
            const matchesSearch =
                !searchValue ||
                resource.name?.toLowerCase().includes(searchValue?.toLowerCase()) ||
                resource.description?.toLowerCase().includes(searchValue?.toLowerCase());

            // Language filter
            const matchesLanguage =
                selectedLanguage.slug === "all" ||
                resource.languages.includes(selectedLanguage.slug.toLowerCase());

            // Package filter
            const matchesPackage =
                selectedPackage.slug === "all" ||
                resource.languages.includes(selectedPackage.slug.toLowerCase()) ||
                (selectedPackage.slug === "npm" && resource.isNPM);

            // Bookmark filter
            const matchesBookmark =
                bookmark.slug === "all" ||
                (bookmark.slug === "bookmarks" && isBookmarked(resource.id));

            return matchesSearch && matchesLanguage && matchesPackage && matchesBookmark;
        });

        setFilteredResources(filtered);
    }, [selectedLanguage, selectedPackage, bookmark, searchValue, bookmarkedItems]);

    const handleSetSelectedLanguage = (item) => {
        setSelectedLanguage(item)
    }

    const handleSelectedPackage = (item) => {
        setSelectedPackage(item)
    }

    const handleBookmark = (item) => {
        setBookmark(item)
    }

    const toggleBookmark = (resourceId) => {
        setBookmarkedItems(prevBookmarks => {
            let updatedBookmarks;

            if (prevBookmarks.includes(resourceId)) {
                updatedBookmarks = prevBookmarks.filter(id => id !== resourceId);
            } else {
                updatedBookmarks = [...prevBookmarks, resourceId];
            }

            localStorage.setItem('bookmarkedItems', JSON.stringify(updatedBookmarks));

            return updatedBookmarks;
        });
    };

    const isBookmarked = (resourceId) => bookmarkedItems.includes(resourceId);

    return (
        <aside className='w-full 640px:pl-[2.5rem] px-6 640px:px-10'>
            <h1 className="text-[2rem] 425px:text-[2.7rem] font-[600] text-brandColor">
                Resources
            </h1>
            <p className="w-full text-text text-[1rem] dark:text-darkSubTextColor mb-5">
                {
                    `The Resources tab in ZenUI Library offers over ${resourcesData?.length}+ (more coming) carefully curated resources that developers truly
                need. From code snippets to design tools and development guides, everything is readily available to
                enhance your projects and boost your productivity. Explore and make the most of these essential tools!`
                }
            </p>

            {/* filters */}
            <div className='flex items-end flex-wrap gap-[10px]'>
                <div>
                    <p className='text-[0.9rem] font-[600] text-gray-500 mb-1 dark:text-darkSubTextColor'>Search:</p>
                    <input
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder='Search resource'
                        className='border-border dark:bg-slate-900 dark:border-darkBorderColor dark:text-darkSubTextColor border w-full 640px:w-[250px] rounded-normal outline-none px-4 py-2.5 focus:border-primary transition-colors duration-300'
                    />
                </div>
                <div className='w-full 1024px:w-fit'>
                    <p className='text-[0.9rem] font-[600] text-gray-500 mb-1 dark:text-darkSubTextColor'>Language:</p>
                    <FilterByLanguages selectedLanguage={selectedLanguage}
                                       setSelectedLanguage={handleSetSelectedLanguage}/>
                </div>
                <div className='w-full 1024px:w-fit'>
                    <p className='text-[0.9rem] font-[600] text-gray-500 mb-1 dark:text-darkSubTextColor'>Tool:</p>
                    <FilterByPackage setSelectedPackage={handleSelectedPackage}/>
                </div>
                <div className='w-full 1024px:w-fit'>
                    <p className='text-[0.9rem] font-[600] text-gray-500 mb-1 dark:text-darkSubTextColor'>Bookmark:</p>
                    <FilterByBookmarks setBookmark={handleBookmark}/>
                </div>
            </div>

            <div className='grid grid-cols-1 640px:grid-cols-2 gap-[15px] mt-8'>
                {filteredResources.map((resource) => (
                    <div key={resource.id} className='bg-gray-50 dark:bg-slate-900 p-[15px] rounded-high'>
                        <div className='flex items-start gap-[15px]'>
                            <img alt={resource.name} src={resource.logo}
                                 className='w-[40px] h-[40px] object-cover rounded-md mt-[7px]'/>

                            <div className='flex flex-col gap-[6px]'>
                                <h4 className='text-[1.3rem] font-[600] text-gray-700 capitalize dark:text-darkSubTextColor'>{resource.name}</h4>
                                <p className='text-[1rem] font-[400] text-gray-500 dark:text-darkSubTextColor/80'>{resource.description}</p>
                            </div>
                        </div>

                        <div className='flex items-center gap-[10px] justify-end mt-4'>
                            <a href={resource.websiteUrl} target='_blank'
                               className='py-2 px-3 bg-brandColor hover:bg-blue-500 transition-all duration-200 active:scale-[0.9] text-white rounded-md text-[0.9rem] flex items-center gap-[5px]'>
                                Visit website
                                <RxExternalLink className='text-[1.2rem] font-[500]'/>
                            </a>

                            <button onClick={() => toggleBookmark(resource.id)}
                                    className={`${isBookmarked(resource.id) ? 'bg-[#fcf2d6]' : ''} py-2.5 px-3 border border-yellow-500 rounded-md text-yellow-500`}>
                                {isBookmarked(resource.id) ? (
                                    <FaBookmark className="transition-all duration-300"/>
                                ) : (
                                    <FaRegBookmark className="transition-all duration-300"/>
                                )}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {
                !filteredResources?.length && (
                    <div className='flex items-center justify-center flex-col my-8'>
                        <img alt='empty/image' src='https://i.ibb.co.com/tL9Q9Qx/HR-looking-through-candidates-CVs.png'
                             className='w-[120px]'/>
                        <p className='text-[1rem] text-gray-500 dark:text-darkSubTextColor/70'>No Resource Found!</p>
                    </div>
                )
            }

            <BlocksFooter backUrl='/docs/installation' backName='installation' forwardName='Custom hooks'
                          forwardUrl='/custom-hooks'/>

            <Helmet>
                <title>Get-Started - Resources</title>
            </Helmet>
        </aside>
    );
};

export default Resources;