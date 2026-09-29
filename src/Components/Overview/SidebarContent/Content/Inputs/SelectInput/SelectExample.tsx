import {useEffect, useState} from 'react';

// react icons
import {IoChevronDown} from "react-icons/io5";

const SelectExample = () => {
    const [isActive, setIsActive] = useState(false);
    const [content, setContent] = useState('Select Option');

    const options = ['Football', 'Cricket', 'Tennis', 'Badminton'];

    // outside click to off dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            let target = event.target as HTMLElement;

            if (!target.closest('.dropdown')) {
                setIsActive(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className='p-8 mb-4 flex items-center flex-col gap-5 justify-center'>
            <button
                className='bg-[#fff] dark:bg-transparent dark:border-slate-600 dark:text-[#abc2d3] border border-[#d1d1d1] rounded-md w-[80%] justify-between px-3 py-2 flex items-center gap-8  relative cursor-pointer dropdown'
                onClick={() => setIsActive(!isActive)}
            >
                {content}
                <IoChevronDown
                    className={`${
                        isActive ? ' rotate-[180deg]' : ' rotate-0'
                    } transition-all duration-300 text-[1.2rem]`}
                />
                <div
                    className={`${
                        isActive
                            ? ' z-[1] opacity-100 scale-[1]'
                            : ' z-[-1] opacity-0 scale-[0.8]'
                    } w-full absolute top-12 left-0 right-0 z-40 dark:bg-slate-800 bg-[#fff] rounded-xl flex flex-col overflow-hidden transition-all duration-300 ease-in-out`}
                    style={{
                        boxShadow: '0 15px 60px -15px rgba(0, 0, 0, 0.3)',
                    }}
                >
                    {options?.map((option, index) => (
                        <p
                            className='py-2 px-4 dark:hover:bg-slate-900/40 hover:bg-[#ececec] transition-all duration-200'
                            key={index}
                            onClick={(e) => setContent(e.currentTarget.textContent ?? '')}
                        >
                            {option}
                        </p>
                    ))}
                </div>
            </button>
        </div>
    );
};

export default SelectExample;
