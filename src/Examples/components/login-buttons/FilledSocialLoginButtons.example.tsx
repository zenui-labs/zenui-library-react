import {FilledSocialLoginButtons, type SocialProvider} from "./FilledSocialLoginButtons";

const providers: SocialProvider[] = [
    {
        name: "GitHub",
        logoSrc: "https://i.ibb.co/w4xtRf9/download-10-removebg-preview.png",
        color: "#000000",
        className: "py-2 px-4 dark:bg-slate-800",
        logoClassName: "w-[35px]",
    },
    {
        name: "LinkedIn",
        logoSrc: "https://assets.website-files.com/632c941ea9199f8985f3fd52/632cacdc3a7f08d5fb21fa73_linkedin-white.svg",
        color: "#0a66c2",
        className: "py-[11px] px-[15px]",
    },
    {
        name: "Dribbble",
        logoSrc: "https://i.ibb.co/8BcCFQv/download-11-removebg-preview.png",
        color: "#ea4c89",
        className: "py-[11px] px-[19px]",
    },
    {
        name: "Facebook",
        logoSrc: "https://i.ibb.co/GP1q2C7/download-12-removebg-preview.png",
        color: "#1777f2",
        className: "py-[11px] px-[10px]",
    },
    {
        name: "Spotify",
        logoSrc: "https://assets.website-files.com/632c941ea9199f8985f3fd52/632cacdbd49f28d441099203_spotify-white.svg",
        color: "#1db954",
        className: "py-[11px] px-[19px]",
    },
    {
        name: "Microsoft",
        logoSrc: "https://assets.website-files.com/632c941ea9199f8985f3fd52/632c95c4b20dd0430d840a26_microsoft.svg",
        color: "#2f2f2f",
        className: "py-[11px] px-[10px]",
    },
];

const FilledSocialLoginButtonsExample = () => <FilledSocialLoginButtons providers={providers}/>;

export default FilledSocialLoginButtonsExample;
