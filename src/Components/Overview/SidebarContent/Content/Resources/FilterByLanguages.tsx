import {useState, useEffect, useRef} from 'react';

// icons
import {IoIosArrowDown} from "react-icons/io";

interface Option {
    name: string;
    slug: string;
    image?: string;
}

const FilterByLanguages = ({setSelectedLanguage, selectedLanguage}) => {
    const [search, setSearch] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<Option>({
        name: 'All',
        slug: 'all',
    },);
    const selectRef = useRef(null);

    const platforms: Option[] = [
        {
            name: 'All',
            slug: 'all',
        },
        {
            name: 'Javascript',
            slug: 'javascript',
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/900px-JavaScript-logo.png'
        },
        {
            name: 'ReactJS',
            slug: 'react',
            image: 'https://cdn.iconscout.com/icon/free/png-512/free-react-logo-icon-download-in-svg-png-gif-file-formats--company-brand-world-logos-vol-4-pack-icons-282599.png'
        },
        {
            name: 'NextJS',
            slug: 'nextjs',
            image: 'https://pbs.twimg.com/profile_images/1565710214019444737/if82cpbS_400x400.jpg'
        },
        {
            name: 'CSS',
            slug: 'css',
            image: 'https://i.ibb.co.com/xPG7SLT/CSS3-logo-svg.png'
        },
        {
            name: 'VueJS',
            slug: 'vue',
            image: 'https://res.cloudinary.com/ddxwdqwkr/image/upload/v1690837534/patterns.dev/Images/vue/intro/vue.png'
        },
    ]

    const handleSelect = (item) => {
        setSelectedOption(item);
        setSelectedLanguage(item)
        setSearch('');
        setIsOpen(false);
    };

    const handleBlur = () => {
        setTimeout(() => {
            setIsOpen(false);
        }, 200);
    };


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                handleBlur();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative custom-select w-full 640px:w-[180px]" ref={selectRef}>
            {/* Selected image and name */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`relative flex h-[42px] w-full cursor-pointer items-center rounded-[10px] border border-hairline bg-surface pr-10 text-[0.9rem] text-ink-muted ${!selectedOption?.image && '!pl-4'} ${selectedOption ? 'pl-[44px]' : 'pl-4'}`}
            >
                {selectedOption && (
                    selectedOption?.image && (
                        <img
                            src={selectedOption.image}
                            alt={selectedOption.name}
                            className="absolute left-3 top-1/2 -translate-y-1/2 object-cover rounded-md w-5 h-5"
                        />
                    )
                )}
                <p className={`${selectedOption ? 'text-ink' : 'text-ink-subtle'} text-[0.9rem]`}>
                    {selectedOption ? selectedOption.name : 'Select Language'}
                </p>
            </div>

            {/* Dropdown icon */}
            <IoIosArrowDown
                size="20"
                className={`transition-all duration-300 text-[1.1rem] absolute top-1/2 -translate-y-1/2 right-3 text-ink-subtle ${
                    isOpen ? 'rotate-180' : 'rotate-0'
                }`}
            />

            {/* Dropdown menu */}
            {isOpen && (
                <div
                    className="absolute left-0 z-20 mt-1.5 w-full rounded-xl border border-hairline bg-surface p-1 shadow-float">
                    <div className="w-full overflow-auto py-1">
                        {platforms.map((item) => (
                            <p
                                key={item.slug}
                                onClick={() => handleSelect(item)}
                                className={`${!item.image && 'pl-[45px]'} flex cursor-pointer items-center rounded-lg px-3 py-2 text-[0.875rem] text-ink-muted hover:bg-raised hover:text-ink`}
                            >
                                {
                                    item.image && (
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="mr-2 transition-all duration-300 object-cover rounded-md w-6 h-6"
                                        />
                                    )
                                }
                                {item.name}
                            </p>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterByLanguages;
