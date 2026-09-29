import {useId, type ReactNode} from "react";
import {FiMenu} from "react-icons/fi";
import {FaRegCircleUser} from "react-icons/fa6";

export interface ProfileAppBarProps {
    /** Brand shown next to the menu button. Pass text or your own logo element. */
    logo?: ReactNode;
    /** Shows the profile button when true. */
    signedIn?: boolean;
    onMenuClick?: () => void;
    onProfileClick?: () => void;
    menuLabel?: string;
    profileLabel?: string;
    className?: string;
}

/** An app bar with a menu button and logo on the left and a profile button on the right while signed in. */
export const ProfileAppBar = ({
    logo = "Logo",
    signedIn = true,
    onMenuClick,
    onProfileClick,
    menuLabel = "Open menu",
    profileLabel = "Open profile",
    className = "",
}: ProfileAppBarProps) => (
    <div className={`p-4 bg-[#3B9DF8] w-full flex items-center justify-between ${className}`}>
        <div className="flex items-center gap-4">
            <button type="button" aria-label={menuLabel} onClick={onMenuClick} className="text-white">
                <FiMenu className="text-white text-[1.7rem] cursor-pointer" aria-hidden/>
            </button>
            <h2 className="text-[1.3rem] text-white font-[600]">{logo}</h2>
        </div>
        {signedIn && (
            <button type="button" aria-label={profileLabel} onClick={onProfileClick} className="text-white">
                <FaRegCircleUser className="text-white text-[1.5rem] cursor-pointer" aria-hidden/>
            </button>
        )}
    </div>
);

export interface SignOutSwitchProps {
    /** True while the user is signed out. */
    checked: boolean;
    onChange: (checked: boolean) => void;
    label?: string;
    className?: string;
}

/** A small switch that signs the user out and back in. */
export const SignOutSwitch = ({checked, onChange, label = "Log out", className = ""}: SignOutSwitchProps) => {
    const labelId = useId();

    return (
        <div className={`flex items-center gap-3 ${className}`}>
            <button
                type="button"
                role="switch"
                aria-checked={checked}
                aria-labelledby={labelId}
                onClick={() => onChange(!checked)}
                className={`${
                    checked ? "bg-[#b3b3b3]" : "bg-[#83c2fd]"
                } cursor-pointer px-4 py-2 rounded-lg before:bg-transparent before:w-[20px] before:h-[20px] before:rounded-full before:absolute relative before:top-[-12%] before:right-[-15%] before:cursor-pointer after:bg-[#3B9DF8] after:absolute after:top-[-12%] after:left-[-15%] after:cursor-pointer after:h-[20px] after:w-[20px] after:rounded-full transition-all duration-300 ${
                    checked ? "after:!bg-transparent before:!bg-[#3B9DF8]" : ""
                }`}
            />
            <span id={labelId} className={`text-[1.2rem] font-[500] ${checked ? "text-[#424242] dark:text-[#abc2d3]" : "text-[#3B9DF8]"}`}>
                {label}
            </span>
        </div>
    );
};
