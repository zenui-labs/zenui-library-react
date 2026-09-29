export interface BlurOverlayCardProps {
    imageSrc: string;
    imageAlt?: string;
    title: string;
    description: string;
    className?: string;
}

/** An image card that zooms its image on hover and fades in a blurred overlay with a centered title and text. */
export const BlurOverlayCard = ({imageSrc, imageAlt = "", title, description, className = ""}: BlurOverlayCardProps) => (
    <div className={`w-full sm:w-[80%] lg:w-[60%] shadow-md h-[350px] transition-all duration-300 overflow-hidden rounded-md relative cursor-pointer group ${className}`}>
        <img
            src={imageSrc}
            alt={imageAlt}
            className="w-full h-full object-cover group-hover:scale-[1.2] transition-all duration-300"
        />

        <div className="w-full h-full absolute top-0 left-0 backdrop-blur-lg flex items-center justify-center flex-col px-[20px] opacity-0 transition-all duration-300 group-hover:opacity-100">
            <h3 className="text-[1.5rem] text-white font-bold text-center leading-[30px] capitalize">{title}</h3>
            <p className="text-[1rem] text-white text-center mt-3 opacity-85">{description}</p>
        </div>
    </div>
);
