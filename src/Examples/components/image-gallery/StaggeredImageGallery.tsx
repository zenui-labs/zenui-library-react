export interface GalleryImage {
    src: string;
    /** Describes the image for screen readers. Use an empty string only for purely decorative images. */
    alt: string;
}

export interface StaggeredImageGalleryProps {
    images: GalleryImage[];
    className?: string;
}

// Tile spans for a four column grid where tall tiles alternate with short ones.
// The pattern fills three full rows, so it repeats every eight images.
const TILE_SPANS = ["", "row-span-2", "", "row-span-2", "row-span-2", "row-span-2", "", ""];

/** A four column gallery where tall tiles alternate between columns. Add images in groups of eight to keep every row full. */
export const StaggeredImageGallery = ({images, className = ""}: StaggeredImageGalleryProps) => (
    <div className={`grid grid-cols-4 gap-2 ${className}`}>
        {images.map((image, index) => (
            <img
                key={`${index}-${image.src}`}
                src={image.src}
                alt={image.alt}
                className={`w-full h-full object-cover ${TILE_SPANS[index % TILE_SPANS.length]}`}
            />
        ))}
    </div>
);
