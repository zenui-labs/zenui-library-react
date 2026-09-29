import type {CSSProperties} from "react";

export interface CircleFillCardProps {
    logoSrc: string;
    logoAlt?: string;
    title: string;
    /** Color of the circle behind the logo that grows to fill the card on hover. */
    fillColor?: string;
    className?: string;
}

/** A logo card where the circle behind the logo grows until it fills the whole card on hover. */
export const CircleFillCard = ({logoSrc, logoAlt = "", title, fillColor = "#bfdbfe", className = ""}: CircleFillCardProps) => (
    <div
        className={`w-full sm:w-[80%] md:w-[60%] shadow-md h-[350px] transition-all duration-300 overflow-hidden rounded-md dark:bg-slate-800 relative cursor-pointer group flex items-center justify-center flex-col gap-[10px] ${className}`}
        style={{"--circle-fill": fillColor} as CSSProperties}
    >
        {/* scalable background and image */}
        <div className="w-[100px] relative z-0 h-[100px] before:w-full before:h-full before:absolute before:top-0 before:left-0 before:z-[-1] group-hover:before:scale-[20] before:transition-all before:duration-700 before:rounded-full before:bg-[var(--circle-fill)] flex items-center justify-center">
            <img src={logoSrc} alt={logoAlt} className="w-[80px]"/>
        </div>

        {/* the title */}
        <h3 className="text-[1.5rem] dark:text-[#abc2d3] font-bold z-20">{title}</h3>
    </div>
);
