import {useState, useEffect, useRef} from 'react';
import {IoIosArrowDown} from "react-icons/io";

interface Option {
    name: string;
    slug: string;
    image?: string;
}

const FilterByPackage = ({setSelectedPackage}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<Option>({
        name: 'All',
        slug: 'all',
    },);
    const selectRef = useRef(null);

    const platforms: Option[] = [
        {
            name: 'All',
            slug: 'all'
        },
        {
            name: 'NPM',
            slug: 'npm'
        },
        {
            name: 'State Management',
            slug: 'state management'
        },
        {
            name: 'Project Ideas',
            slug: 'project ideas'
        },
        {
            name: 'Data Structure & Algorithm',
            slug: 'dsa'
        },
        {
            name: 'Problem Solving Platform',
            slug: 'problem solving platform'
        },
        {
            name: 'Learning Platform',
            slug: 'learning platform'
        },
        {
            name: 'Coding Practice Platform',
            slug: 'coding practice platform'
        },
        {
            name: 'Animation Library',
            slug: 'animation library'
        }
    ]

    const handleSelect = (item) => {
        setSelectedOption(item);
        setSelectedPackage(item)
        setIsOpen(false);
    };

    const handleBlur = () => {
        setTimeout(() => {
            setIsOpen(false);
        }, 200);
    };

    const handleClickOutside = (event) => {
        if (selectRef.current && !selectRef.current.contains(event.target)) {
            handleBlur();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative custom-select w-full 640px:min-w-[200px]" ref={selectRef}>
            {/* Selected name */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`flex h-[42px] w-full cursor-pointer items-center rounded-[10px] border border-hairline bg-surface pl-3.5 pr-10 text-[0.9rem] text-ink-muted relative`}
            >
                <p className={`${selectedOption ? 'text-ink' : 'text-ink-subtle'} text-[0.9rem] mt-0.5`}>
                    {selectedOption ? selectedOption.name : 'Filter by Package'}
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
                    className="absolute left-0 w-max mt-1 dark:border-darkBorderColor dark:bg-slate-900 border border-border rounded-normal bg-white shadow-lg z-20">
                    <div className="w-full overflow-auto py-1">
                        {platforms.map((item) => (
                            <p
                                key={item.slug}
                                onClick={() => handleSelect(item)}
                                className="cursor-pointer text-gray-600 dark:text-darkSubTextColor dark:hover:bg-slate-800 px-4 py-2 hover:bg-gray-50"
                            >
                                {item.name}
                            </p>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterByPackage;
