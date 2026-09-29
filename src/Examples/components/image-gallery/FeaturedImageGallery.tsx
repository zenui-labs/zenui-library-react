export interface GalleryImage {
    src: string;
    /** Describes the image for screen readers. Use an empty string only for purely decorative images. */
    alt: string;
}

export interface FeaturedImageGalleryProps {
    images: GalleryImage[];
    className?: string;
}

// Tile spans for a three column grid: a large featured tile, two side tiles and a full width banner.
// The pattern fills three full rows, so it repeats every four images.
const TILE_SPANS = ["row-span-2 col-span-2", "col-span-1", "col-span-1", "col-span-3"];

/** A three column gallery that leads with a large featured image and closes with a full width banner. */
export const FeaturedImageGallery = ({images, className = ""}: FeaturedImageGalleryProps) => (
    <div className={`grid grid-cols-3 gap-2 ${className}`}>
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
