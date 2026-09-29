import {useEffect, useId, useRef, useState} from "react";
import type {MouseEvent} from "react";
import {AnimatePresence, motion} from "framer-motion";

export interface GalleryImage {
    id: string | number;
    title: string;
    description: string;
    src: string;
}

export interface ImageGalleryProps {
    images: GalleryImage[];
    className?: string;
}

// Column spans on the 5 column grid. Repeating 3, 2, 2, 3 keeps every row full.
const SPANS = ["md:col-span-3", "md:col-span-2", "md:col-span-2", "md:col-span-3"];

/**
 * A grid of images that blurs the others while one is hovered or focused. Selecting an image opens it
 * with its title and description in a dialog that closes on a backdrop click or Escape.
 */
export const ImageGallery = ({images, className = ""}: ImageGalleryProps) => {
    const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
    const [hoveredImageId, setHoveredImageId] = useState<GalleryImage["id"] | null>(null);
    const triggerRef = useRef<HTMLButtonElement | null>(null);
    const dialogRef = useRef<HTMLDivElement>(null);
    const titleId = useId();

    const open = (image: GalleryImage, trigger: HTMLButtonElement) => {
        triggerRef.current = trigger;
        setSelectedImage(image);
    };

    const close = () => {
        setSelectedImage(null);
        triggerRef.current?.focus();
    };

    const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) close();
    };

    useEffect(() => {
        if (!selectedImage) return;
        dialogRef.current?.focus();
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                setSelectedImage(null);
                triggerRef.current?.focus();
            }
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [selectedImage]);

    return (
        <>
            <div className={`grid grid-cols-1 md:grid-cols-5 gap-4 ${className}`}>
                {images.map((image, index) => {
                    const isOtherImageHovered = hoveredImageId !== null && hoveredImageId !== image.id;

                    return (
                        <motion.button
                            type="button"
                            key={image.id}
                            aria-label={`Open ${image.title}`}
                            className={`${SPANS[index % SPANS.length]} relative cursor-pointer rounded-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0FABCA] focus-visible:ring-offset-2 ${
                                isOtherImageHovered ? "blur-sm" : "blur-0"
                            }`}
                            onClick={(e) => open(image, e.currentTarget)}
                            onMouseEnter={() => setHoveredImageId(image.id)}
                            onMouseLeave={() => setHoveredImageId(null)}
                            onFocus={() => setHoveredImageId(image.id)}
                            onBlur={() => setHoveredImageId(null)}
                        >
                            <img
                                src={image.src}
                                alt={image.title}
                                className="w-full h-[250px] object-cover rounded-lg"
                            />
                        </motion.button>
                    );
                })}
            </div>

            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        className="fixed inset-0 z-[999999999] bg-black/50 dark:bg-black/70 flex items-center justify-center"
                        onClick={handleBackdropClick}
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                    >
                        <motion.div
                            ref={dialogRef}
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby={titleId}
                            tabIndex={-1}
                            className="bg-white dark:bg-slate-800 rounded-lg w-[95%] md:w-[80%] lg:w-[50%] p-5 focus:outline-none"
                            initial={{opacity: 0, scale: 0.5}}
                            animate={{opacity: 1, scale: 1}}
                            exit={{opacity: 0, scale: 0.5}}
                            transition={{duration: 0.3, type: "spring", stiffness: 400, damping: 22}}
                        >
                            <motion.img
                                src={selectedImage.src}
                                alt={selectedImage.title}
                                className="w-full h-[400px] object-cover rounded-lg"
                            />
                            <h3 id={titleId} className="mt-5 dark:text-[#d2e5f5] text-2xl font-semibold">
                                {selectedImage.title}
                            </h3>
                            <p className="text-gray-700 dark:text-[#d2e5f5]/70 mt-2">{selectedImage.description}</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};
