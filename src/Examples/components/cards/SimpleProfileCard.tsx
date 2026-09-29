export interface ProfileStat {
    label: string;
    /** Formatted value, for example "80k". */
    value: string;
}

export interface SimpleProfileCardProps {
    avatarSrc: string;
    avatarAlt: string;
    description: string;
    stats: ProfileStat[];
    title?: string;
    className?: string;
}

/** A profile card with an avatar that overlaps the top edge, a short description and a row of statistics. */
export const SimpleProfileCard = ({
    avatarSrc,
    avatarAlt,
    description,
    stats,
    title = "Description",
    className = "",
}: SimpleProfileCardProps) => (
    <div className={`w-full md:w-[60%] mt-16 md:mt-0 bg-white dark:bg-slate-800 shadow-lg rounded flex flex-col ${className}`}>
        <div className="w-full flex justify-center items-center">
            <img
                src={avatarSrc}
                alt={avatarAlt}
                className="w-[80px] h-[80px] rounded-full flex justify-center border-blue-800 border-2 -mt-16 object-cover"
            />
        </div>

        <div>
            <div className="w-full mt-3 px-2">
                <h2 className="font-[600] dark:text-[#abc2d3] text-center text-[1.4rem]">{title}</h2>
                <p className="text-[#424242] dark:text-[#abc2d3] text-[0.9rem]">{description}</p>
            </div>

            <div className="w-full p-4 mt-8 border-t dark:border-slate-600 border-[#e5eaf2] flex items-center justify-between">
                {stats.map((stat) => (
                    <div key={stat.label} className="flex items-center justify-center flex-col">
                        <p className="text-[1.2rem] dark:text-[#abc2d3] font-[600]">{stat.value}</p>
                        <p className="text-[#424242] dark:text-[#abc2d3]/80 text-[0.9rem]">{stat.label}</p>
                    </div>
                ))}
            </div>
        </div>
    </div>
);
