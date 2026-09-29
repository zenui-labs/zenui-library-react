import {Link, useLocation} from "react-router-dom";
import {LuArrowLeft, LuArrowRight} from "react-icons/lu";
import {findDocsPage} from "@utils/DocsNavigation.ts";
import {cn} from "@utils/Style.ts";

const PagerLink = ({to, label, title, direction}: {to: string; label: string; title: string; direction: "previous" | "next"}) => (
    <Link
        to={to}
        className={cn(
            "group flex min-w-0 flex-1 flex-col gap-1 rounded-panel border border-hairline bg-surface px-4 py-3.5 transition-colors hover:border-hairline-strong hover:bg-raised/60",
            direction === "next" && "items-end text-right"
        )}
    >
        <span className="flex items-center gap-1.5 text-[0.75rem] text-ink-subtle">
            {direction === "previous" && <LuArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5"/>}
            {label}
            {direction === "next" && <LuArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5"/>}
        </span>
        <span className="max-w-full truncate text-[0.9rem] font-medium text-ink first-letter:uppercase">{title}</span>
    </Link>
);

/**
 * Previous / next links. The order comes from Utils/DocsNavigation.js, so pages don't need to
 * keep their neighbours in sync. The old props are used only for pages outside the docs navigation.
 */
interface OverviewFooterProps {
    backUrl?: string;
    forwardUrl?: string;
    backName?: string;
    forwardName?: string;
    isBackButton?: boolean;
    isForwardButton?: boolean;
    width?: string;
}

const OverviewFooter = ({backUrl, forwardUrl, backName, forwardName, isBackButton = true, isForwardButton = true}: OverviewFooterProps) => {
    const {pathname} = useLocation();
    const match = findDocsPage(pathname);

    const previous = match ? match.previous : isBackButton && backUrl ? {url: backUrl, title: backName} : null;
    const next = match ? match.next : isForwardButton && forwardUrl ? {url: forwardUrl, title: forwardName} : null;

    if (!previous && !next) return null;

    return (
        <footer className="mt-16 flex w-full flex-col gap-3 border-t border-hairline pt-8 640px:flex-row">
            {previous ? <PagerLink to={previous.url} title={previous.title} label="Previous" direction="previous"/> : <span className="flex-1"/>}
            {next ? <PagerLink to={next.url} title={next.title} label="Next" direction="next"/> : <span className="flex-1"/>}
        </footer>
    );
};

export default OverviewFooter;
