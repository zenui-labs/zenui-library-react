export interface GalleryImage {
    src: string;
    /** Describes the image for screen readers. Use an empty string only for purely decorative images. */
    alt: string;
}

export interface SimpleImageGalleryProps {
    images: GalleryImage[];
    className?: string;
}

/** A three column grid that shows each image at its natural aspect ratio. */
export const SimpleImageGallery = ({images, className = ""}: SimpleImageGalleryProps) => (
    <div className={`grid grid-cols-3 gap-3 ${className}`}>
        {images.map((image, index) => (
            <img key={`${index}-${image.src}`} src={image.src} alt={image.alt}/>
        ))}
    </div>
);
