import {Link} from "react-router-dom";
import {LuArrowUpRight} from "react-icons/lu";

import {cn} from "@utils/Style.ts";
import type {NavItem} from "@utils/DocsNavigation.ts";
import {catalogArt} from "./art/index.ts";

/**
 * One docs page as a card: its illustration on the dotted stage, its title underneath. Shared by the catalog grids
 * and the home page rows, so a page looks the same wherever it is listed.
 */

const slugOf = (url: string) => url.split("/").pop() ?? url;

// Shown only if a page has no illustration yet: its initials on the stage, so a list never has a hole.
const FallbackArt = ({title}: {title: string}) => (
    <span className="font-mono text-2xl font-medium tracking-tight text-ink/25">
        {title.split(/\s+/).slice(0, 2).map((word) => word[0]?.toUpperCase()).join("")}
    </span>
);

const CatalogCard = ({item, className}: {item: NavItem; className?: string}) => {
    const Art = catalogArt[slugOf(item.url)];

    return (
        <Link
            to={item.url}
            className={cn(
                "group block overflow-hidden rounded-panel border border-hairline bg-surface transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-hairline-strong hover:shadow-float",
                className
            )}
        >
            <div
                aria-hidden="true"
                className="relative flex h-[150px] items-center justify-center overflow-hidden bg-canvas [background-image:radial-gradient(rgb(var(--ink)/0.07)_1px,transparent_1.2px)] [background-size:14px_14px]"
            >
                {/* A soft light that brightens the stage under the illustration on hover. */}
                <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_45%,rgb(var(--accent)/0.10),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"/>
                <div className="relative h-full w-full p-3">
                    {Art ? <Art/> : <div className="flex h-full items-center justify-center"><FallbackArt title={item.title}/></div>}
                </div>
                {item.status && (
                    <span className="absolute right-2.5 top-2.5 rounded-full bg-accent-soft px-1.5 py-px font-mono text-[0.6rem] font-medium uppercase tracking-wider text-accent-strong">
                        {item.status}
                    </span>
                )}
            </div>
            <div className="flex items-center justify-between border-t border-hairline px-4 py-3">
                <span className="text-[0.875rem] font-medium text-ink first-letter:uppercase">{item.title}</span>
                <LuArrowUpRight className="size-4 text-ink-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"/>
            </div>
        </Link>
    );
};

export default CatalogCard;
