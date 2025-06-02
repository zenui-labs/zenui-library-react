import React from "react";

const Slider = ({value, onChange}) => {

    const handleChange = (event) => {
        onChange(Math.round(event.target.value)); // Round to the nearest integer
    };

    const handleClick = (event) => {
        const slider = event.target.getBoundingClientRect();
        const newValue = ((event.clientX - slider.left) / slider.width) * 100;
        onChange(Math.round(Math.min(Math.max(newValue, 0), 100))); // Round to the nearest integer
    };

    return (
        <div className="flex items-center justify-center">
            <div
                className="relative w-full h-3 dark:bg-slate-800 bg-gray-300 rounded-full cursor-pointer"
                onClick={handleClick}
            >
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={value}
                    onChange={handleChange}
                    className="absolute w-full h-3 top-0 z-20 opacity-0 cursor-pointer"
                />
                <div
                    className="absolute top-0 h-3 bg-[#0499B6] rounded-full"
                    style={{
                        width: `${value}%`,
                    }}
                />
                <div
                    className="absolute top-[50%] w-[22px] h-[22px] transform bg-[#0499B6] rounded-full -translate-x-1/2 translate-y-[-50%] dark:border-slate-300 cursor-pointer transition-transform duration-150 ease-in-out border-2 border-white"
                    style={{
                        left: `${value}%`,
                    }}
                />
            </div>
        </div>
    );
};

export default Slider;
                