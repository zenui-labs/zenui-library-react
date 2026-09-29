import {useState} from "react";

export interface FollowProfileCardProps {
    name: string;
    role: string;
    avatarSrc: string;
    avatarAlt: string;
    /** Controlled follow state. Leave it out to let the card manage its own state. */
    following?: boolean;
    defaultFollowing?: boolean;
    onFollowingChange?: (following: boolean) => void;
    followLabel?: string;
    followingLabel?: string;
    className?: string;
}

/** A centered profile card with a round avatar, a name, a role and a follow button. */
export const FollowProfileCard = ({
    name,
    role,
    avatarSrc,
    avatarAlt,
    following,
    defaultFollowing = false,
    onFollowingChange,
    followLabel = "Follow",
    followingLabel = "Following",
    className = "",
}: FollowProfileCardProps) => {
    const [internalFollowing, setInternalFollowing] = useState(defaultFollowing);
    const isFollowing = following ?? internalFollowing;

    return (
        <div className={`bg-white dark:bg-slate-800 rounded-md shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] w-full md:max-w-[60%] px-4 py-8 flex items-center justify-center flex-col ${className}`}>
            <img src={avatarSrc} alt={avatarAlt} className="w-[100px] h-[100px] rounded-full object-cover"/>

            <h2 className="text-[1.3rem] font-[500] leading-[24px] dark:text-[#abc2d3] mt-4">{name}</h2>
            <p className="text-[0.9rem] text-gray-500 font-[400] dark:text-[#abc2d3]/80">{role}</p>
            <button
                type="button"
                aria-pressed={isFollowing}
                onClick={() => {
                    if (following === undefined) setInternalFollowing(!isFollowing);
                    onFollowingChange?.(!isFollowing);
                }}
                className="py-1.5 mt-3 px-6 border border-blue-500 rounded-md text-blue-500"
            >
                {isFollowing ? followingLabel : followLabel}
            </button>
        </div>
    );
};
