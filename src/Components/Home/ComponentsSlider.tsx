import {Link} from "react-router-dom";
import {LuArrowRight, LuArrowUpRight} from "react-icons/lu";

import {docsNavigation} from "@utils/DocsNavigation.ts";
import type {NavItem} from "@utils/DocsNavigation.ts";
import CatalogCard from "@shared/Catalog/CatalogCard.tsx";
import {Band, Reveal, SectionIntro} from "@/Components/Home/LandingKit.tsx";

// Same source as the docs sidebar and the catalog grid, so a new component page shows up here on its own.
const categories = docsNavigation.find((section) => section.title === "Components").groups;
const components: NavItem[] = categories.flatMap((group) => group.items);
const half = Math.ceil(components.length / 2);
const rows = [components.slice(0, half), components.slice(half)];

const MarqueeRow = ({items, reverse = false, duration}: {items: NavItem[]; reverse?: boolean; duration: number}) => (
    <div className="group/row flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div
            className="flex w-max animate-marquee-x gap-4 pr-4 group-hover/row:[animation-play-state:paused]"
            style={{"--marquee-duration": `${duration}s`, animationDirection: reverse ? "reverse" : "normal"}}
        >
            {[...items, ...items].map((item, index) => (
                <CatalogCard key={`${item.url}-${index}`} item={item} className="w-[260px] shrink-0"/>
            ))}
        </div>
    </div>
);

const ComponentsSlider = () => {
    return (
        <Band innerClassName="py-16 1024px:py-24">
            <div className="grid gap-10 px-5 640px:px-8 1024px:grid-cols-[1.1fr_1fr] 1024px:items-end 1024px:px-12">
                <SectionIntro
                    label="Components"
                    title="800+ components, grouped the way you look for them."
                    description="Forms, navigation, feedback, data display and more. Hover a row to pause it, click a card to open its page."
                />
                <Reveal delay={0.1} className="flex flex-wrap gap-2 1024px:justify-end">
                    {categories.map((group) => (
                        <Link
                            key={group.label}
                            to={group.items[0].url}
                            className="group flex h-9 items-center gap-2 rounded-full border border-hairline bg-surface pl-3.5 pr-2.5 text-[0.82rem] text-ink-muted transition-colors hover:border-hairline-strong hover:text-ink"
                        >
                            {group.label}
                            <LuArrowUpRight className="size-3.5 text-ink-subtle transition-colors group-hover:text-ink"/>
                        </Link>
                    ))}
                </Reveal>
            </div>

            <div className="mt-10 flex flex-col gap-4">
                <MarqueeRow items={rows[0]} duration={120}/>
                <MarqueeRow items={rows[1]} duration={135} reverse/>
            </div>

            <div className="mt-12 flex justify-center">
                <Link to="/components/all-components" className="btn-ghost group h-11 px-5">
                    See every component
                    <LuArrowRight className="size-4 transition-transform group-hover:translate-x-0.5"/>
                </Link>
            </div>
        </Band>
    );
};

export default ComponentsSlider;
