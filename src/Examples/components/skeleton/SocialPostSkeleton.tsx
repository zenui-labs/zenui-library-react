export interface SocialPostSkeletonProps {
    /** Text read by screen readers while the post loads. */
    label?: string;
    className?: string;
}

const bar = "dark:bg-slate-800 bg-[#e5eaf2]";

/** A placeholder for a social post: avatar, author name, handle and two lines of text. */
export const SocialPostSkeleton = ({label = "Loading post", className = ""}: SocialPostSkeletonProps) => (
    <div
        role="status"
        aria-busy="true"
        className={`w-full sm:w-[450px] dark:bg-slate-900 dark:border-slate-700 bg-white p-6 border border-[#e5eaf2] rounded animate-pulse motion-reduce:animate-none ${className}`}
    >
        <span className="sr-only">{label}</span>

        <div className="flex items-center">
            <div className="w-[40%] sm:w-[20%]">
                <div className={`w-[60px] h-[60px] rounded-full ${bar}`}/>
            </div>

            <div className="flex flex-col gap-3 w-[80%]">
                <div className={`w-[60%] h-[25px] ${bar}`}/>
                <div className={`w-[80%] h-[15px] ${bar}`}/>
            </div>
        </div>

        <div className="mt-10 flex flex-col gap-3">
            <div className={`w-[90%] h-[15px] ${bar}`}/>
            <div className={`w-[80%] h-[15px] ${bar}`}/>
        </div>
    </div>
);
