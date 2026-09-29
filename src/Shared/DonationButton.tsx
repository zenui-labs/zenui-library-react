import {LuCoffee} from "react-icons/lu";

const DonationButton = () => {
    return (
        <a
            href="https://ko-fi.com/zenuilabs"
            target="_blank"
            rel="noreferrer"
            className="group fixed bottom-5 right-5 z-[600] flex h-10 items-center gap-2 rounded-full border border-hairline bg-surface/90 pl-3 pr-4 text-[0.82rem] font-medium text-ink-muted shadow-float backdrop-blur transition-colors hover:text-ink"
        >
            <LuCoffee className="size-4 text-accent-strong transition-transform duration-300 group-hover:-rotate-12"/>
            Support ZenUI
        </a>
    );
};

export default DonationButton;
