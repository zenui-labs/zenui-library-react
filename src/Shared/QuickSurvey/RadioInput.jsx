import React from "react";

const RadioInput = ({label, selected, onChange}) => {

    return (
        <div className="flex items-center gap-2">
            <div
                className={` w-[18px] h-[18px] border border-[#0FABCA]  rounded-full flex items-center justify-center cursor-pointer `}
                onClick={() => onChange(label)}
            >
                <div
                    className={`${
                        selected
                            ? "bg-[#0FABCA] scale-[1]"
                            : "bg-transparent scale-[0.7]"
                    } w-[10px] h-[10px] transition-all duration-200 rounded-full`}
                ></div>
            </div>
            <p
                className='text-[0.9rem] dark:text-darkSubTextColor text-text/90 cursor-pointer'
                onClick={() => onChange(label)}
            >
                {label}
            </p>
        </div>
    );
};

export default RadioInput;
