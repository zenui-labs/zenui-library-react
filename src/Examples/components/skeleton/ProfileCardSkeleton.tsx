export interface ProfileCardSkeletonProps {
    /** Text read by screen readers while the card loads. */
    label?: string;
    className?: string;
}

const bar = "dark:bg-slate-800 bg-[#e5eaf2]";

/** A placeholder for a profile card: cover, avatar, name, subtitle and three stats. */
export const ProfileCardSkeleton = ({label = "Loading profile", className = ""}: ProfileCardSkeletonProps) => (
    <div
        role="status"
        aria-busy="true"
        className={`w-full sm:w-[400px] border dark:border-slate-700 border-[#00000017] animate-pulse motion-reduce:animate-none rounded-md ${className}`}
    >
        <span className="sr-only">{label}</span>

        {/* Cover and avatar */}
        <div className="w-full bg-[#e5eaf2] dark:bg-slate-900 rounded-t-md h-[130px] relative">
            <div className="w-[120px] h-[120px] rounded-full dark:bg-slate-800 bg-[#cecece] absolute bottom-[-40%] right-1/2 transform translate-x-1/2"/>
        </div>

        {/* Name and subtitle */}
        <div className="flex flex-col gap-3 items-center justify-center w-full py-8 mt-12">
            <div className={`w-[70%] h-[35px] ${bar}`}/>
            <div className={`w-[50%] h-[20px] ${bar}`}/>
        </div>

        {/* Stats */}
        <div className="border-t p-4 dark:border-slate-700 border-gray-200 w-full flex items-center justify-between">
            {[0, 1, 2].map((stat) => (
                <div key={stat} className="w-[30%] flex flex-col gap-2">
                    <div className={`h-[35px] ${bar}`}/>
                    <div className={`h-[20px] ${bar}`}/>
                </div>
            ))}
        </div>
    </div>
);
