import {IoChevronForward} from "react-icons/io5";
import {MagneticField} from "./MagneticField";

const MagneticFieldExample = () => (
    <MagneticField>
        <div className="relative z-10 mx-auto flex h-full w-full max-w-[700px] flex-col items-center justify-center px-5 py-10 text-center text-white md:py-0 lg:px-0">
            <span className="mb-4 rounded-full border border-gray-600 py-1.5 pl-5 pr-6 text-[0.9rem] backdrop-blur-md">
                ✨ Introducing ZenUI v2.3
            </span>

            <h1 className="text-[2rem] font-bold leading-[40px] lg:text-[3rem] lg:leading-[50px]">
                Open-Source UI Components & Templates Library
            </h1>

            <p className="mt-3 max-w-[700px] text-white/80">
                ZenUI Library is a Tailwind CSS component library for any need. It comes with UI examples, blocks,
                templates, icons, a color palette and more.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-3 min-[425px]:gap-6 md:mt-12 md:flex-row">
                <button
                    type="button"
                    className="group flex items-center gap-2 rounded-lg border border-[#0FABCA] bg-[#0FABCA] py-3 pl-5 pr-4 text-[1rem]"
                >
                    Browse Components
                    <IoChevronForward className="transition-all duration-200 group-hover:ml-1"/>
                </button>
                <button
                    type="button"
                    className="group flex items-center gap-2 rounded-lg border-2 border-[#0FABCA] py-3 pl-5 pr-4 text-[1rem]"
                >
                    Browse Templates
                    <IoChevronForward className="transition-all duration-200 group-hover:ml-1"/>
                </button>
            </div>
        </div>
    </MagneticField>
);

export default MagneticFieldExample;
