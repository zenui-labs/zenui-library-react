export interface PostListItemSkeletonProps {
    className?: string;
}

const bar = "dark:bg-slate-800 bg-[#e5eaf2]";

/** One row of the post list: a round thumbnail, a title bar and three lines of text. */
export const PostListItemSkeleton = ({className = ""}: PostListItemSkeletonProps) => (
    <div
        className={`w-full mx-auto dark:bg-slate-900 dark:border-slate-700 bg-white p-3 rounded-md border border-[#e5eaf2] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] animate-pulse motion-reduce:animate-none ${className}`}
    >
        <div className="flex items-center gap-[20px]">
            <div className="w-[40%] sm:w-[20%]">
                <div className={`w-[80px] h-[80px] rounded-full ${bar}`}/>
            </div>

            <div className="flex flex-col gap-[10px] w-[80%]">
                <div className={`w-[80%] h-[25px] rounded-md ${bar}`}/>

                <div className="flex flex-col gap-2">
                    <div className={`w-[90%] h-[7px] rounded-md ${bar}`}/>
                    <div className={`w-[80%] h-[7px] rounded-md ${bar}`}/>
                    <div className={`w-[50%] h-[7px] rounded-md ${bar}`}/>
                </div>
            </div>
        </div>
    </div>
);

export interface PostListSkeletonProps {
    /** Number of rows to show. */
    count?: number;
    /** Text read by screen readers while the list loads. */
    label?: string;
    className?: string;
}

/** A stack of post rows shown while a list of posts loads. */
export const PostListSkeleton = ({count = 3, label = "Loading posts", className = ""}: PostListSkeletonProps) => (
    <div role="status" aria-busy="true" className={`w-full flex flex-col gap-[20px] ${className}`}>
        <span className="sr-only">{label}</span>
        {Array.from({length: count}, (_, index) => (
            <PostListItemSkeleton key={index}/>
        ))}
    </div>
);
