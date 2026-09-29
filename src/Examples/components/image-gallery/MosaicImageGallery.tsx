export interface GalleryImage {
    src: string;
    /** Describes the image for screen readers. Use an empty string only for purely decorative images. */
    alt: string;
}

export interface MosaicImageGalleryProps {
    images: GalleryImage[];
    className?: string;
}

// Tile spans for a four column grid. The pattern fills two full rows, so it repeats every five images.
const TILE_SPANS = ["col-span-2", "", "row-span-2", "", "col-span-2"];

/** A four column mosaic that mixes wide and tall tiles. Add images in groups of five to keep every row full. */
export const MosaicImageGallery = ({images, className = ""}: MosaicImageGalleryProps) => (
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
