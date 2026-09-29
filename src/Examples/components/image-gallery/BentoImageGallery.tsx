export interface GalleryImage {
    src: string;
    /** Describes the image for screen readers. Use an empty string only for purely decorative images. */
    alt: string;
}

export interface BentoImageGalleryProps {
    images: GalleryImage[];
    className?: string;
}

// Tile spans for a four column grid. The pattern fills five full rows, so it repeats every nine images.
const TILE_SPANS = [
    "row-span-1 col-span-2",
    "row-span-2",
    "row-span-2",
    "col-span-2 row-span-2",
    "col-span-2 row-span-2",
    "col-span-2",
    "",
    "col-span-2",
    "",
];

/** A four column bento grid of wide, tall and large tiles. Add images in groups of nine to keep every row full. */
export const BentoImageGallery = ({images, className = ""}: BentoImageGalleryProps) => (
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
