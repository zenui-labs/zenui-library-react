export interface GamePlayer {
    avatarSrc: string;
    name: string;
}

export interface GameCardProps {
    title: string;
    imageSrc: string;
    imageAlt: string;
    /** Avatars stacked over the bottom edge of the image. */
    players: GamePlayer[];
    /** Text in the last bubble of the avatar stack, for example "18+". Leave it out to hide the bubble. */
    moreLabel?: string;
    /** Small line above the title. */
    eyebrow?: string;
    ctaLabel?: string;
    onPlay?: () => void;
    className?: string;
}

/** Each avatar sits 5% further from the right edge than the next one, so the stack overlaps. */
const STEP = 5;

/** A game card with a cover image, a stack of player avatars, a title and a play button. */
export const GameCard = ({
    title,
    imageSrc,
    imageAlt,
    players,
    moreLabel,
    eyebrow = "Recommended",
    ctaLabel = "Play",
    onPlay,
    className = "",
}: GameCardProps) => {
    // The stack ends 5% from the right edge, and the bubble takes that last slot.
    const offset = moreLabel ? 2 : 1;

    return (
        <div className={`bg-white dark:bg-slate-800 rounded-md shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] relative w-full md:max-w-[60%] ${className}`}>
            <img src={imageSrc} alt={imageAlt} className="w-full h-[200px] object-cover rounded-t-md"/>

            <div className="relative">
                <div className="flex items-center">
                    {players.map((player, index) => (
                        <img
                            key={player.avatarSrc}
                            src={player.avatarSrc}
                            alt={player.name}
                            title={player.name}
                            className="w-[30px] h-[30px] object-cover rounded-full border border-white absolute -top-3"
                            style={{right: `${(players.length - 1 - index + offset) * STEP}%`}}
                        />
                    ))}
                    {moreLabel && (
                        <div className="w-[30px] h-[30px] rounded-full border border-white bg-[#e5eaf2] text-[#424242] absolute -top-3 right-[5%] flex items-center justify-center">
                            <p className="text-[0.7rem]">{moreLabel}</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="p-3">
                <p className="text-[1rem] dark:text-[#abc2d3]/90 text-gray-300">{eyebrow}</p>
                <h2 className="text-[20px] font-bold text-black dark:text-[#abc2d3] leading-[24px] mt-0.5">{title}</h2>

                <button type="button" onClick={onPlay} className="py-2 px-4 bg-blue-500 text-white rounded-md min-w-[40%] mt-3">
                    {ctaLabel}
                </button>
            </div>
        </div>
    );
};
