import type {ComponentType} from "react";
import {IoIosInformationCircle} from "react-icons/io";

export interface TitledImage {
    src: string;
    /** Describes the image for screen readers. Use an empty string only for purely decorative images. */
    alt: string;
    title: string;
    /** Second line under the title, for example the photographer's handle. */
    subtitle?: string;
}

export interface TitleBarImageTileProps {
    image: TitledImage;
    /** Called when the info button on the tile is pressed. */
    onInfo?: (image: TitledImage) => void;
    /** Icon shown in the info button. */
    infoIcon?: ComponentType<{className?: string}>;
    /** Accessible label for the info button. Receives the image title. */
    infoLabel?: (title: string) => string;
}

/** A single image with a blurred title bar across its bottom edge. */
export const TitleBarImageTile = ({
    image,
    onInfo,
    infoIcon: InfoIcon = IoIosInformationCircle,
    infoLabel = (title) => `More about ${title}`,
}: TitleBarImageTileProps) => (
    <div className="relative">
        <img src={image.src} alt={image.alt} className="w-full h-full object-cover"/>

        <div className="w-full px-4 py-2 backdrop-blur-[2px] absolute bottom-0 left-0 flex justify-between">
            <div>
                <h3 className="text-[1rem] font-[600]">{image.title}</h3>
                {image.subtitle && <p className="text-[0.9rem]">{image.subtitle}</p>}
            </div>
            <button type="button" aria-label={infoLabel(image.title)} onClick={() => onInfo?.(image)} className="self-start">
                <InfoIcon className="text-[1.4rem] cursor-pointer text-[#00000093]"/>
            </button>
        </div>
    </div>
);

export interface TitleBarImageGalleryProps extends Omit<TitleBarImageTileProps, "image"> {
    images: TitledImage[];
    className?: string;
}

/** A responsive grid of images, each with a title, a subtitle and an info button. */
export const TitleBarImageGallery = ({images, className = "", ...tileProps}: TitleBarImageGalleryProps) => (
    <div className={`grid grid-cols-2 sm:grid-cols-3 gap-2 ${className}`}>
        {images.map((image, index) => (
            <TitleBarImageTile key={`${index}-${image.src}`} image={image} {...tileProps}/>
        ))}
    </div>
);
