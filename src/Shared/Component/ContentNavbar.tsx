import {LuArrowUp, LuBug, LuLightbulb} from "react-icons/lu";
import {cn} from "@utils/Style.ts";

const REPO_URL = "https://github.com/Asfak00/zenui-library";

const issueUrl = (type) => {
    const path = encodeURIComponent(window.location.pathname);
    return type === "bug"
        ? `${REPO_URL}/issues/new?title=%5BBUG%5D:+${path}&labels=bug&template=bug_report.md`
        : `${REPO_URL}/issues/new?title=%5Bfeat%5D:+${path}&labels=enhancement&template=feature_request.md`;
};

/** "On this page" column for docs pages. */
interface ContentNavbarProps {
    contents: {id?: number | string; title: string; href: string}[];
    activeSection?: string | null;
    /** Accepted for older call sites; the column has a fixed width now. */
    width?: string;
}

const ContentNavbar = ({contents, activeSection}: ContentNavbarProps) => {
    return (
        <nav aria-label="On this page" className="sticky top-[84px] hidden w-[208px] shrink-0 1260px:block">
            <p className="eyebrow">On this page</p>

            <div className="scroll-thin mt-3 max-h-[calc(100vh-360px)] overflow-y-auto pr-1">
                <ul className="relative flex flex-col border-l border-hairline">
                    {contents?.map((item) => {
                        const active = activeSection === item.href.slice(1);
                        return (
                            <li key={item.id ?? item.href}>
                                <a
                                    href={item.href}
                                    className={cn(
                                        "-ml-px block border-l py-1.5 pl-3.5 text-[0.82rem] leading-snug transition-colors first-letter:uppercase",
                                        active
                                            ? "border-ink font-medium text-ink"
                                            : "border-transparent text-ink-subtle hover:border-hairline-strong hover:text-ink-muted"
                                    )}
                                >
                                    {item.title}
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </div>

            <div className="mt-6 flex flex-col gap-2 border-t border-hairline pt-5 text-[0.82rem]">
                <a href={issueUrl("bug")} target="_blank" rel="noreferrer"
                   className="flex items-center gap-2 text-ink-subtle transition-colors hover:text-ink">
                    <LuBug className="size-3.5"/> Report an issue
                </a>
                <a href={issueUrl("feature")} target="_blank" rel="noreferrer"
                   className="flex items-center gap-2 text-ink-subtle transition-colors hover:text-ink">
                    <LuLightbulb className="size-3.5"/> Request a feature
                </a>
                <button onClick={() => window.scrollTo({top: 0, behavior: "smooth"})}
                        className="flex items-center gap-2 text-left text-ink-subtle transition-colors hover:text-ink">
                    <LuArrowUp className="size-3.5"/> Back to top
                </button>
            </div>

            <div className="mt-6 flex flex-col gap-2.5">
                <a href="https://readmestudio.zenui.net/" target="_blank" rel="noreferrer" className="block overflow-hidden rounded-xl border border-hairline">
                    <img src="https://i.ibb.co.com/svzKxvxY/small-ads-for-zenui.png" alt="Readme Studio: build a GitHub README visually"
                         loading="lazy" className="w-full grayscale transition-[filter] duration-300 hover:grayscale-0"/>
                </a>
                <a href="https://react-hooks.zenui.net/" target="_blank" rel="noreferrer" className="block overflow-hidden rounded-xl border border-hairline">
                    <img src="https://i.ibb.co.com/wNSCP9X1/small-ads-for-zenui-1.png" alt="ZenUI React Hooks"
                         loading="lazy" className="w-full grayscale transition-[filter] duration-300 hover:grayscale-0"/>
                </a>
            </div>
        </nav>
    );
};

export default ContentNavbar;
