import {Link} from "react-router-dom";
import {LuArrowRight, LuArrowUpRight} from "react-icons/lu";

import {allComponents} from "@utils/AllComponents.ts";
import {docsNavigation} from "@utils/DocsNavigation.ts";
import {Band, Reveal, SectionIntro} from "@/Components/Home/LandingKit.tsx";

const categories = docsNavigation.find((section) => section.title === "Components").groups;
const half = Math.ceil(allComponents.length / 2);
const rows = [allComponents.slice(0, half), allComponents.slice(half)];

const Thumbnail = ({item}) => (
    <Link
        to={item.url}
        className="group relative block w-[260px] shrink-0 overflow-hidden rounded-2xl border border-hairline bg-surface transition-[border-color,transform] duration-300 hover:-translate-y-1 hover:border-hairline-strong"
    >
        <div className="flex h-[150px] items-center justify-center bg-white p-3 dark:bg-[#020617]">
            <img src={item.image} alt="" loading="lazy" className="max-h-full w-full object-contain"/>
        </div>
        <div className="flex items-center justify-between border-t border-hairline px-4 py-3">
            <span className="text-[0.85rem] font-medium capitalize text-ink">{item.title}</span>
            <LuArrowUpRight className="size-4 text-ink-subtle transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"/>
        </div>
    </Link>
);

const MarqueeRow = ({items, reverse = false, duration}: {items: typeof allComponents; reverse?: boolean; duration: number}) => (
    <div className="group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div
            className="flex w-max animate-marquee-x gap-4 pr-4 group-hover:[animation-play-state:paused]"
            style={{"--marquee-duration": `${duration}s`, animationDirection: reverse ? "reverse" : "normal"}}
        >
            {[...items, ...items].map((item, index) => (
                <Thumbnail key={`${item.url}-${index}`} item={item}/>
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
                <MarqueeRow items={rows[0]} duration={70}/>
                <MarqueeRow items={rows[1]} duration={80} reverse/>
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
