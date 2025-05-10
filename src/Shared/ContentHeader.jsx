import React from "react";

const ContentHeader = ({text, id, className}) => {
    return (
        <div className={`flex items-center gap-[20px] ${className}`}>
            <h1 id={id} className="font-[600] text-brandColor capitalize text-[1.5rem]">
                {text}
            </h1>
        </div>
    );
};

export default ContentHeader;
