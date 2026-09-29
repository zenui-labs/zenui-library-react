import type {ComponentType} from "react";
import {RiTeamFill} from "react-icons/ri";
import {BsThreeDotsVertical} from "react-icons/bs";

export interface TeamMember {
    avatarSrc: string;
    name: string;
}

export interface TeamCardProps {
    title: string;
    imageSrc: string;
    imageAlt: string;
    /** Small label under the image, for example the team's discipline. */
    tag: string;
    members: TeamMember[];
    /** Text in the last bubble of the avatar stack, for example "18+". Leave it out to hide the bubble. */
    moreLabel?: string;
    heading?: string;
    icon?: ComponentType<{className?: string}>;
    onMoreClick?: () => void;
    className?: string;
}

/** Each avatar sits 5% further from the right edge than the next one, so the stack overlaps. */
const STEP = 5;

/** A team card with a header, a cover image, a project name, a tag and an overlapping stack of member avatars. */
export const TeamCard = ({
    title,
    imageSrc,
    imageAlt,
    tag,
    members,
    moreLabel,
    heading = "Teams",
    icon: Icon = RiTeamFill,
    onMoreClick,
    className = "",
}: TeamCardProps) => {
    const offset = moreLabel ? 1 : 0;

    return (
        <div className={`w-full md:w-[60%] bg-white dark:bg-slate-800 rounded shadow-lg p-4 ${className}`}>
            <div className="w-full flex items-center justify-between mb-4">
                <div className="flex items-center dark:text-[#abc2d3] gap-2">
                    <Icon className="text-[2rem] p-2 dark:text-[#abc2d3] rounded-full bg-[#3b9df828] text-[#3B9DF8]"/>
                    <h3>{heading}</h3>
                </div>
                <button type="button" aria-label="More options" onClick={onMoreClick} className="rounded-full">
                    <BsThreeDotsVertical className="text-[2rem] p-2 dark:text-[#abc2d3] rounded-full bg-[#3b9df828] text-[#3B9DF8] cursor-pointer"/>
                </button>
            </div>

            <img src={imageSrc} alt={imageAlt} className="rounded-lg"/>

            <h2 className="font-[600] dark:text-[#abc2d3] text-[1.3rem] py-4">{title}</h2>

            <div className="w-full flex items-center justify-between relative">
                <span className="py-1 px-4 dark:text-[#abc2d3] bg-[#3b9df828] text-[#2367a7] rounded">{tag}</span>
                <div className="w-[50%] h-full">
                    <div className="flex items-center">
                        {members.map((member, index) => (
                            <img
                                key={member.avatarSrc}
                                src={member.avatarSrc}
                                alt={member.name}
                                title={member.name}
                                className="w-[30px] h-[30px] object-cover rounded-full border border-white absolute top-0"
                                style={{right: `${(members.length - 1 - index + offset) * STEP}%`}}
                            />
                        ))}
                        {moreLabel && (
                            <div className="w-[30px] h-[30px] rounded-full border border-white bg-[#e5eaf2] text-[#424242] absolute top-0 right-[0%] flex items-center justify-center">
                                <p className="text-[0.7rem]">{moreLabel}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
