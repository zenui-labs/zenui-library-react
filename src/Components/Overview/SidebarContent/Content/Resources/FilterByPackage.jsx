import {useState, useEffect, useRef} from 'react';
import {IoIosArrowDown} from "react-icons/io";

const FilterByPackage = ({setSelectedPackage}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState({
        name: 'All',
        slug: 'all',
    },);
    const selectRef = useRef(null);

    const platforms = [
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
                className={`w-full bg-white cursor-pointer border-border relative border rounded-normal px-10 py-2.5 text-gray-600 text-[0.9rem] dark:bg-slate-900 dark:border-darkBorderColor flex items-center pl-4`}
            >
                <p className={`${selectedOption ? 'text-gray-600 dark:text-darkSubTextColor' : 'text-gray-400'} text-[1rem] font-[400] mt-0.5`}>
                    {selectedOption ? selectedOption.name : 'Filter by Package'}
                </p>
            </div>

            {/* Dropdown icon */}
            <IoIosArrowDown
                size="20"
                className={`transition-all dark:text-darkSubTextColor duration-300 text-[1.3rem] absolute top-[55%] transform translate-y-[-50%] right-3 text-gray-400 ${
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
                                key={item.id}
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
