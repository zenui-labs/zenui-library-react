import React from 'react';
 
const Switch = ({label, checked, onChange}) => {
    return (
        <div className='flex items-center my-3 gap-[10px]'>
            <div
                onClick={() => onChange(!checked)}
                className={`${
                    checked ? " bg-[#0499B6]" : "bg-[#f0f0f0] dark:bg-slate-800"
                } w-[60px] h-[34px] cursor-pointer py-[0.138rem] px-[0.200rem] border transition-colors duration-500 border-[#e5eaf2] dark:border-slate-700 rounded-lg relative`}
            >
                <div
                    className={`${
                        checked
                            ? "bg-[#fff] translate-x-[26px] rotate-[90deg]"
                            : "dark:bg-slate-300 translate-x-[-1px] rotate-[0deg]"
                    } w-[26px] h-[28px] transition-all duration-500 rounded-md cursor-pointer`}
                    style={{boxShadow: "1px 2px 5px 2px rgb(0,0,0,0.1)"}}
                ></div>
            </div>
            <span className="text-sm font-medium dark:text-darkSubTextColor text-gray-700">{label}</span>
        </div>
    );
};

export default Switch;
