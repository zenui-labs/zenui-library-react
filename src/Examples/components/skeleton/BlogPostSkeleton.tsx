export interface BlogPostCardSkeletonProps {
    className?: string;
}

const bar = "dark:bg-slate-700 bg-[#e5eaf2]";

/** One blog post card: title lines and an author row on the left, a cover image on the right. */
export const BlogPostCardSkeleton = ({className = ""}: BlogPostCardSkeletonProps) => (
    <div
        className={`w-full mx-auto dark:bg-slate-900 dark:border-slate-700 bg-white p-4 rounded-md border border-[#e5eaf2] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] animate-pulse motion-reduce:animate-none ${className}`}
    >
        <div className="flex gap-[20px]">
            <div className="flex flex-col justify-between w-full sm:w-[80%]">
                {/* Title and excerpt */}
                <div className="flex flex-col gap-2">
                    <div className={`w-[90%] h-[7px] rounded-md ${bar}`}/>
                    <div className={`w-[90%] h-[7px] rounded-md ${bar}`}/>
                    <div className={`w-[80%] h-[7px] rounded-md ${bar}`}/>
                </div>

                {/* Author */}
                <div className="flex items-center gap-[10px] w-full">
                    <div className={`w-[40px] h-[40px] rounded-full ${bar}`}/>

                    <div className="flex flex-col gap-2 w-[80%]">
                        <div className={`w-[60%] h-[7px] rounded-md ${bar}`}/>
                        <div className={`w-[50%] h-[7px] rounded-md ${bar}`}/>
                    </div>
                </div>
            </div>

            {/* Cover image */}
            <div className="w-[40%] sm:w-[35%]">
                <div className={`w-[120px] h-[120px] rounded-md ${bar}`}/>
            </div>
        </div>
    </div>
);

export interface BlogPostSkeletonProps {
    /** Number of post cards to show. */
    count?: number;
    /** Text read by screen readers while the posts load. */
    label?: string;
    className?: string;
}

/** A list of blog post cards shown while posts load. */
export const BlogPostSkeleton = ({count = 1, label = "Loading articles", className = ""}: BlogPostSkeletonProps) => (
    <div role="status" aria-busy="true" className={`w-full flex flex-col gap-[20px] ${className}`}>
        <span className="sr-only">{label}</span>
        {Array.from({length: count}, (_, index) => (
            <BlogPostCardSkeleton key={index}/>
        ))}
    </div>
);
