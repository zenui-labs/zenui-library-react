import React from "react";

const ContentHeader = ({ text, id, isPremium }) => {
  return (
    <div className={`flex items-center gap-[20px] ${isPremium && "mb-2"}`}>
      <h1
        id={id}
        className="font-[600] text-[#0471d6] capitalize text-[1.5rem]"
      >
        {text}
      </h1>

      {isPremium && (
        <span className="px-3 py-1 425px:py-1.5 bg-gradient-to-r from-[#0FABCA] to-[#DB06F9] text-white rounded-md text-[0.9rem]">
          Premium
        </span>
      )}
    </div>
  );
};

export default ContentHeader;
