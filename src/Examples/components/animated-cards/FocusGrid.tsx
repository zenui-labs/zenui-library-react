import {useState} from "react";

export interface FocusGridItem {
    src: string;
    alt: string;
}

export interface FocusGridProps {
    items: FocusGridItem[];
    className?: string;
}

/** An image grid where the hovered image grows and every other image blurs and shrinks slightly. */
export const FocusGrid = ({items, className = ""}: FocusGridProps) => {
    const [hovered, setHovered] = useState<number | null>(null);

    return (
        <div className={`grid grid-cols-2 gap-6 w-full lg:w-[70%] ${className}`}>
            {items.map((item, index) => (
                // card container
                <div
                    key={`${index}-${item.src}`}
                    className={`relative transition-all w-full h-[200px] cursor-pointer duration-300 ease-in-out transform ${
                        hovered !== null && hovered !== index ? "blur-sm scale-95" : "scale-100"
                    } hover:scale-105 hover:z-10 hover:blur-none`}
                    onMouseEnter={() => setHovered(index)}
                    onMouseLeave={() => setHovered(null)}
                >
                    {/* image */}
                    <img src={item.src} alt={item.alt} className="w-full h-full rounded-md object-cover"/>
                </div>
            ))}
        </div>
    );
};
