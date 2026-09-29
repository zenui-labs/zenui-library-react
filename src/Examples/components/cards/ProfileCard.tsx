export interface ProfileCardStat {
    label: string;
    /** Formatted value, for example "80k". */
    value: string;
}

export interface ProfileCardProps {
    name: string;
    location: string;
    avatarSrc: string;
    avatarAlt: string;
    /** Background image for the banner at the top. */
    coverSrc: string;
    stats: ProfileCardStat[];
    className?: string;
}

/** A profile card with a banner image, a centered avatar, the person's name and location, and a row of statistics. */
export const ProfileCard = ({name, location, avatarSrc, avatarAlt, coverSrc, stats, className = ""}: ProfileCardProps) => (
    <div className={`w-full md:w-[60%] shadow-lg bg-white dark:bg-slate-800 rounded ${className}`}>
        <div
            className="w-full h-[150px] rounded-t-md relative bg-center"
            style={{backgroundImage: `url("${coverSrc}")`}}
        >
            <img
                src={avatarSrc}
                alt={avatarAlt}
                className="w-[80px] h-[80px] rounded-full border-white border-4 absolute -bottom-12 left-1/2 transform -translate-x-1/2 object-cover"
            />
        </div>

        <div className="w-full text-center mt-16">
            <h2 className="font-[600] dark:text-[#abc2d3] text-[1.4rem]">{name}</h2>
            <p className="text-[#424242] dark:text-[#abc2d3]/80 text-[0.9rem]">{location}</p>
        </div>

        <div className="w-full p-4 mt-8 border-t dark:border-slate-700 border-[#e5eaf2] flex items-center justify-between">
            {stats.map((stat) => (
                <div key={stat.label} className="flex items-center justify-center flex-col">
                    <p className="text-[1.2rem] dark:text-[#abc2d3] font-[600]">{stat.value}</p>
                    <p className="text-[#424242] dark:text-[#abc2d3]/80 text-[0.9rem]">{stat.label}</p>
                </div>
            ))}
        </div>
    </div>
);
