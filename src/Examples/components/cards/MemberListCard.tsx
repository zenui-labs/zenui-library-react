export interface Member {
    name: string;
    role: string;
    avatarSrc: string;
}

export interface MemberListCardProps {
    title: string;
    description: string;
    members: Member[];
    /** Text on the left of the footer, for example "543 students". */
    footerText: string;
    followLabel?: string;
    viewAllLabel?: string;
    onFollow?: (member: Member) => void;
    onViewAll?: () => void;
    className?: string;
}

/** A card listing people with their photo, name, role and a follow button, with a footer that links to the full list. */
export const MemberListCard = ({
    title,
    description,
    members,
    footerText,
    followLabel = "Follow",
    viewAllLabel = "View all members",
    onFollow,
    onViewAll,
    className = "",
}: MemberListCardProps) => (
    <div className={`w-full bg-white dark:bg-slate-800 md:max-w-[80%] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] rounded-md ${className}`}>
        <div className="p-4">
            <h2 className="text-[1.5rem] dark:text-[#abc2d3] font-semibold">{title}</h2>
            <p className="text-[0.9rem] dark:text-[#abc2d3]/80 text-gray-500">{description}</p>
        </div>

        <ul className="mt-4">
            {members.map((member) => (
                <li
                    key={member.name}
                    className="flex sm:flex-row flex-col dark:hover:bg-slate-700 sm:items-center w-full justify-between py-3 hover:bg-gray-100 px-4"
                >
                    <div className="flex gap-[10px]">
                        <img src={member.avatarSrc} alt="" className="w-[60px] h-[60px] object-cover rounded-full"/>
                        <div className="flex flex-col">
                            <h3 className="text-[1.2rem] dark:text-[#abc2d3] font-semibold">{member.name}</h3>
                            <span className="text-[0.9rem] dark:text-[#abc2d3]/80 text-gray-500">{member.role}</span>
                        </div>
                    </div>

                    <button
                        type="button"
                        aria-label={`${followLabel} ${member.name}`}
                        onClick={() => onFollow?.(member)}
                        className="py-2 w-max sm:m-0 mx-auto px-6 bg-purple-500 text-white rounded-md"
                    >
                        {followLabel}
                    </button>
                </li>
            ))}
        </ul>

        <div className="bg-gray-100 dark:bg-slate-600 p-4 rounded-b-md flex items-center justify-between w-full">
            <span className="text-[0.9rem] dark:text-[#abc2d3] text-gray-400">{footerText}</span>
            <button
                type="button"
                onClick={onViewAll}
                className="text-[0.9rem] dark:text-[#abc2d3] text-gray-700 font-[500] uppercase"
            >
                {viewAllLabel}
            </button>
        </div>
    </div>
);
