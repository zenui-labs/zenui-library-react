import {useEffect, useId, useRef, useState, type ComponentType, type KeyboardEvent} from "react";
import {FiMessageCircle} from "react-icons/fi";

export interface Profile {
    name: string;
    role: string;
    /** Image URL used for both the trigger and the larger picture in the card. */
    avatar: string;
    /** Shows a green dot on the larger picture. */
    online?: boolean;
}

export interface SocialLink {
    /** Accessible name of the link, for example "LinkedIn". */
    label: string;
    href: string;
    icon: ComponentType<{className?: string}>;
}

export interface ProfileTooltipProps {
    profile: Profile;
    socials: SocialLink[];
    /** Heading above the social links. */
    socialsTitle?: string;
    actionLabel?: string;
    /** Screen reader text for the green dot. */
    onlineLabel?: string;
    /** Called when the action button at the bottom of the card is pressed. */
    onAction?: () => void;
    /** Milliseconds the card stays open after the pointer leaves, so it can move onto the card. */
    closeDelay?: number;
    className?: string;
}

/** A profile picture that opens a card with social links, name, role and a message button on hover, focus or tap. */
export const ProfileTooltip = ({
    profile,
    socials,
    socialsTitle = "Socials",
    actionLabel = "Send message",
    onlineLabel = "Online",
    onAction,
    closeDelay = 150,
    className = "",
}: ProfileTooltipProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const closeTimer = useRef<ReturnType<typeof setTimeout>>();
    const rootRef = useRef<HTMLDivElement>(null);
    const cardId = useId();

    const clearCloseTimer = () => {
        if (closeTimer.current) clearTimeout(closeTimer.current);
    };

    const open = () => {
        clearCloseTimer();
        setIsOpen(true);
    };

    const scheduleClose = () => {
        clearCloseTimer();
        closeTimer.current = setTimeout(() => setIsOpen(false), closeDelay);
    };

    useEffect(() => {
        const timer = closeTimer;
        return () => clearTimeout(timer.current);
    }, []);

    // Closes on a tap or click outside, which covers touch screens where there is no mouse leave.
    useEffect(() => {
        if (!isOpen) return;
        const handlePointerDown = (event: PointerEvent) => {
            if (event.target instanceof Node && !rootRef.current?.contains(event.target)) setIsOpen(false);
        };
        document.addEventListener("pointerdown", handlePointerDown);
        return () => document.removeEventListener("pointerdown", handlePointerDown);
    }, [isOpen]);

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Escape") {
            clearCloseTimer();
            setIsOpen(false);
        }
    };

    return (
        <div
            ref={rootRef}
            className={`relative w-fit h-full flex items-center justify-center ${className}`}
            onMouseEnter={open}
            onMouseLeave={scheduleClose}
            onFocus={open}
            onBlur={(event) => {
                // Stay open while focus moves between the trigger and the links inside the card.
                if (!event.currentTarget.contains(event.relatedTarget)) scheduleClose();
            }}
            onKeyDown={handleKeyDown}
        >
            {/* profile picture that opens the card */}
            <button
                type="button"
                aria-label={profile.name}
                aria-expanded={isOpen}
                aria-controls={cardId}
                onClick={open}
                className="rounded-full"
            >
                <img
                    src={profile.avatar}
                    alt=""
                    className="w-[50px] h-[50px] rounded-full object-cover border-[3px] cursor-pointer border-[#3B9DF8]"
                />
            </button>

            {/* card */}
            <div
                id={cardId}
                className={`${
                    isOpen ? "opacity-100 z-20 translate-y-0 visible" : "opacity-0 z-[-1] translate-y-[20px] invisible"
                } absolute bottom-full mb-4 left-[50%] transform translate-x-[-50%] bg-white w-[250px] rounded-md p-[15px] shadow-md transition-all dark:bg-slate-800 duration-300`}
            >
                {/* socials */}
                <div className="flex items-center justify-between dark:border-slate-700 border-b border-gray-200 pb-[7px]">
                    <p className="text-[1rem] font-[600] dark:text-[#abc2d3] text-gray-700">{socialsTitle}</p>
                    <div className="flex items-center gap-[8px]">
                        {socials.map(({label, href, icon: Icon}) => (
                            <a key={href} href={href} aria-label={label}>
                                <Icon className="text-[1.3rem] dark:text-[#abc2d3] text-gray-700 hover:text-[#3B9DF8] cursor-pointer hover:scale-[1.2] transition-all duration-200 ease-out"/>
                            </a>
                        ))}
                    </div>
                </div>

                {/* account details */}
                <div className="flex items-center justify-center flex-col mt-5">
                    <div className="relative">
                        <img src={profile.avatar} alt="" className="w-[80px] h-[80px] rounded-full object-cover"/>
                        {profile.online && (
                            <div className="w-[10px] h-[10px] rounded-full bg-green-400 absolute top-[7px] right-[8px] border-[2px] border-white">
                                <span className="sr-only">{onlineLabel}</span>
                            </div>
                        )}
                    </div>
                    <h4 className="text-[1.1rem] dark:text-[#abc2d3] font-[600] text-gray-700 mt-2">{profile.name}</h4>
                    <p className="text-[0.8rem] dark:text-[#abc2d3] text-gray-600">{profile.role}</p>
                </div>

                {/* action */}
                <button
                    type="button"
                    onClick={onAction}
                    className="flex mx-auto hover:underline items-center gap-[8px] font-[500] text-[0.9rem] text-[#3B9DF8] mt-4"
                >
                    <FiMessageCircle className="text-[1.1rem]" aria-hidden/>
                    {actionLabel}
                </button>

                {/* bottom arrow */}
                <div className="bg-white w-[15px] h-[15px] dark:bg-slate-800 rotate-[45deg] absolute bottom-[-7px] left-[50%] transform translate-x-[-50%]"/>
            </div>
        </div>
    );
};
