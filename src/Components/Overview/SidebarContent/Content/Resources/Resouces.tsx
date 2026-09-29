import {useState, useEffect} from "react";
import {Helmet} from "react-helmet";
import {FaBookmark, FaRegBookmark} from "react-icons/fa";
import {RxExternalLink} from "react-icons/rx";
import {resourcesData} from "@utils/ResourcesData.ts"
import FilterByLanguages from "./FilterByLanguages.tsx";
import FilterByPackage from "./FilterByPackage.tsx";
import FilterByBookmarks from "./FilterByBookmarks.tsx";
import OverviewFooter from "@shared/OverviewFooter.tsx";
import {DocsTitle} from "@shared/DocsProse.tsx";

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
        <div>
            <DocsTitle
                title="Resources"
                lead={`${resourcesData?.length} hand-picked tools, libraries and references for frontend work. Filter by language or tool, and bookmark the ones you use.`}
            />

            {/* filters */}
            <div className='mt-8 flex flex-wrap items-end gap-3'>
                <div>
                    <p className='eyebrow mb-1.5'>Search</p>
                    <input
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder='Search resources'
                        className='h-[42px] w-full rounded-[10px] border border-hairline bg-surface px-3.5 text-[0.9rem] text-ink outline-none transition-colors placeholder:text-ink-subtle focus:border-hairline-strong 640px:w-[250px]'
                    />
                </div>
                <div className='w-full 1024px:w-fit'>
                    <p className='eyebrow mb-1.5'>Language</p>
                    <FilterByLanguages selectedLanguage={selectedLanguage}
                                       setSelectedLanguage={handleSetSelectedLanguage}/>
                </div>
                <div className='w-full 1024px:w-fit'>
                    <p className='eyebrow mb-1.5'>Tool</p>
                    <FilterByPackage setSelectedPackage={handleSelectedPackage}/>
                </div>
                <div className='w-full 1024px:w-fit'>
                    <p className='eyebrow mb-1.5'>Bookmark</p>
                    <FilterByBookmarks setBookmark={handleBookmark}/>
                </div>
            </div>

            <div className='mt-8 grid grid-cols-1 gap-3 768px:grid-cols-2'>
                {filteredResources.map((resource) => (
                    <article key={resource.id} className='flex flex-col rounded-panel border border-hairline bg-surface p-4 transition-colors hover:border-hairline-strong'>
                        <div className='flex items-start gap-3.5'>
                            <img alt="" src={resource.logo} loading="lazy"
                                 className='size-10 shrink-0 rounded-lg border border-hairline object-cover'/>
                            <div className='min-w-0'>
                                <h2 className='text-[0.95rem] font-medium text-ink first-letter:uppercase'>{resource.name}</h2>
                                <p className='mt-1 text-[0.85rem] leading-relaxed text-ink-subtle'>{resource.description}</p>
                            </div>
                        </div>

                        <div className='mt-4 flex items-center justify-end gap-2 pt-1'>
                            <button onClick={() => toggleBookmark(resource.id)}
                                    aria-pressed={isBookmarked(resource.id)}
                                    aria-label={isBookmarked(resource.id) ? `Remove ${resource.name} from bookmarks` : `Bookmark ${resource.name}`}
                                    className={`icon-btn size-9 ${isBookmarked(resource.id) ? '!text-amber-500' : ''}`}>
                                {isBookmarked(resource.id) ? <FaBookmark className="size-3.5"/> : <FaRegBookmark className="size-3.5"/>}
                            </button>
                            <a href={resource.websiteUrl} target='_blank' rel="noreferrer" className='btn-ghost h-9 text-[0.82rem]'>
                                Visit website
                                <RxExternalLink className='size-3.5'/>
                            </a>
                        </div>
                    </article>
                ))}
            </div>

            {
                !filteredResources?.length && (
                    <p className='my-16 text-center text-[0.9rem] text-ink-subtle'>No resources match these filters.</p>
                )
            }

            <OverviewFooter/>

            <Helmet>
                <title>Resources | ZenUI Library</title>
            </Helmet>
        </div>
    );
};

export default Resources;