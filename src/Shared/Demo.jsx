import React, {useState} from "react";

const TextareaInput = () => {
    const [name, setName] = useState("");

    return (
        <label className="relative w-full md:w-[80%]">
             <textarea
                 name="name"
                 id="name"
                 value={name}
                 onChange={(e) => setName(e.target.value)}
                 className="peer dark:border-slate-700 dark:bg-transparent border-[#e5eaf2] border rounded-md outline-none px-4 min-h-[200px] py-3 dark:text-slate-400 w-full focus:border-[#3B9DF8] transition-colors duration-300"
             />
            <span
                className={`${name ? "-top-3 left-2 scale-[0.9] bg-white px-[4px]" : "left-5 top-3.5"} absolute dark:text-slate-500 dark:peer-focus:bg-[#020617] peer-focus:-top-3 peer-focus:bg-white peer-focus:left-2 peer-focus:scale-[0.9] peer-focus:text-[#3B9DF8] text-[#777777] peer-focus:px-1 transition-all duration-300`}>
                Write something about zenUI
            </span>
        </label>
    );
};

export default TextareaInput;