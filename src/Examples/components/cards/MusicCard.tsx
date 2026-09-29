import {useState} from "react";
import {FaArrowAltCircleLeft, FaArrowAltCircleRight, FaHeart} from "react-icons/fa";
import {HiMiniShare} from "react-icons/hi2";
import {MdPlayArrow} from "react-icons/md";

export interface MusicCardProps {
    title: string;
    artist: string;
    imageSrc: string;
    imageAlt: string;
    /** Controlled favorite state. Leave it out to let the card manage its own state. */
    favorite?: boolean;
    defaultFavorite?: boolean;
    onFavoriteChange?: (favorite: boolean) => void;
    onPrevious?: () => void;
    onPlay?: () => void;
    onNext?: () => void;
    onShare?: () => void;
    className?: string;
}

/** A track card with the title, artist and player controls beside the cover image, plus favorite and share buttons. */
export const MusicCard = ({
    title,
    artist,
    imageSrc,
    imageAlt,
    favorite,
    defaultFavorite = false,
    onFavoriteChange,
    onPrevious,
    onPlay,
    onNext,
    onShare,
    className = "",
}: MusicCardProps) => {
    const [internalFavorite, setInternalFavorite] = useState(defaultFavorite);
    const isFavorite = favorite ?? internalFavorite;

    const toggleFavorite = () => {
        if (favorite === undefined) setInternalFavorite(!isFavorite);
        onFavoriteChange?.(!isFavorite);
    };

    return (
        <div className={`w-full md:w-[80%] shadow-lg dark:bg-slate-800 bg-white rounded ${className}`}>
            <div className="grid grid-cols-12 w-full items-center bg-black text-white">
                <div className="grid col-span-5 justify-center gap-3">
                    <div>
                        <h2 className="text-2xl">{title}</h2>
                        <p>{artist}</p>
                    </div>
                    <div className="flex flex-row gap-3">
                        <button type="button" aria-label="Previous track" onClick={onPrevious}>
                            <FaArrowAltCircleLeft className="text-2xl"/>
                        </button>
                        <button type="button" aria-label="Play" onClick={onPlay}>
                            <MdPlayArrow className="text-2xl"/>
                        </button>
                        <button type="button" aria-label="Next track" onClick={onNext}>
                            <FaArrowAltCircleRight className="text-2xl"/>
                        </button>
                    </div>
                </div>

                <div className="grid col-span-7">
                    <img src={imageSrc} alt={imageAlt} className="w-full h-64 object-cover"/>
                </div>
            </div>

            <div className="flex items-center justify-between w-full p-4">
                <div className="flex items-center gap-4">
                    <button
                        type="button"
                        aria-label="Favorite"
                        aria-pressed={isFavorite}
                        onClick={toggleFavorite}
                        className={`${
                            isFavorite ? "text-[#ff3d3d]" : "text-[#424242] dark:text-[#abc2d3]"
                        } text-[1.4rem] cursor-pointer`}
                    >
                        <FaHeart/>
                    </button>
                    <button
                        type="button"
                        aria-label="Share"
                        onClick={onShare}
                        className="text-[#424242] dark:text-[#abc2d3] text-[1.4rem] cursor-pointer"
                    >
                        <HiMiniShare/>
                    </button>
                </div>
            </div>
        </div>
    );
};
