import {OutlinedSocialLoginButtons, type SocialProvider} from "./OutlinedSocialLoginButtons";

const providers: SocialProvider[] = [
    {
        name: "GitHub",
        logoSrc: "https://assets.website-files.com/632c941ea9199f8985f3fd52/632c95c46041d682027a3c2a_github.svg",
        color: "#000000",
        className: "py-2 px-4 dark:border-slate-600 dark:text-[#abc2d3]",
        logoClassName: "w-[30px]",
    },
    {
        name: "LinkedIn",
        logoSrc: "https://assets.website-files.com/632c941ea9199f8985f3fd52/632c95c4b20dd0e861840a27_linkedin.svg",
        color: "#0a66c2",
        className: "py-[11px] px-[12px]",
    },
    {
        name: "Dribbble",
        logoSrc: "https://assets.website-files.com/632c941ea9199f8985f3fd52/632ca01585cf323fdd614a81_dribbble-svgrepo-com.svg",
        color: "#ea4c89",
        className: "py-[11px] px-[16px]",
    },
    {
        name: "Facebook",
        logoSrc: "https://assets.website-files.com/632c941ea9199f8985f3fd52/632c960d4839cf20aeafcad2_facebook.svg",
        color: "#1777f2",
        className: "py-[11px] px-[7px]",
    },
    {
        name: "Spotify",
        logoSrc: "https://assets.website-files.com/632c941ea9199f8985f3fd52/632c95c4c75f2ea0362f20b7_spotify.svg",
        color: "#1db954",
        className: "py-[11px] px-[16px]",
    },
    {
        name: "Microsoft",
        logoSrc: "https://assets.website-files.com/632c941ea9199f8985f3fd52/632c95c4b20dd0430d840a26_microsoft.svg",
        color: "#2f2f2f",
        className: "py-[11px] px-[7px] dark:border-slate-600 dark:text-[#abc2d3]",
    },
];

const OutlinedSocialLoginButtonsExample = () => <OutlinedSocialLoginButtons providers={providers}/>;

export default OutlinedSocialLoginButtonsExample;
