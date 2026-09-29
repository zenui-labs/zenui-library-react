export interface ImageGallerySkeletonProps {
    /** Text read by screen readers while the gallery loads. */
    label?: string;
    className?: string;
}

const tile = "dark:bg-slate-800 bg-[#e5eaf2]";

/** A placeholder for an image gallery: one tall image, two stacked images and a wide image below. */
export const ImageGallerySkeleton = ({label = "Loading gallery", className = ""}: ImageGallerySkeletonProps) => (
    <div role="status" aria-busy="true" className={`animate-pulse motion-reduce:animate-none ${className}`}>
        <span className="sr-only">{label}</span>

        <div className="flex gap-5">
            <div className={`w-[200px] h-[300px] ${tile}`}/>

            <div className="flex flex-col gap-5">
                <div className={`w-[200px] h-[140px] ${tile}`}/>
                <div className={`w-[200px] h-[140px] ${tile}`}/>
            </div>
        </div>

        <div className={`w-full h-[150px] mt-5 ${tile}`}/>
    </div>
);
