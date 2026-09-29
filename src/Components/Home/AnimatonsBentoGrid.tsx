import {Link} from "react-router-dom";
import {LuArrowRight, LuArrowUpRight} from "react-icons/lu";

import AnimatedTooltipExample from "@/Components/Home/AnimatedCards/AnimatedTooltipExample.tsx";
import MagicHoverCardExample from "@/Components/Home/AnimatedCards/MagicHoverCardExample.tsx";
import ScrambleTextExample from "@/Components/Home/AnimatedCards/ScrambleTextExample.tsx";
import StarfieldWarpExample from "@/Components/Home/AnimatedCards/StarfieldWarpExample.tsx";
import ShuffleSortExample from "@/Components/Home/AnimatedCards/ShuffleSortExample.tsx";
import {Band, Reveal, SectionIntro, SpotlightCard} from "@/Components/Home/LandingKit.tsx";
import {cn} from "@utils/Style.ts";

const tiles = [
    {title: "Animated tooltip", url: "/components/tooltip", span: "1024px:col-span-2", example: AnimatedTooltipExample},
    {title: "Magic hover card", url: "/animations/magic-card", span: "1024px:col-span-2", example: MagicHoverCardExample},
    {title: "Scramble text", url: "/animations/text-effects", span: "1024px:col-span-2", example: ScrambleTextExample},
    {title: "Shuffle and sort", url: "/animations/sorting-animation", span: "1024px:col-span-3", example: ShuffleSortExample},
    {title: "Starfield warp", url: "/animations/background-animations", span: "1024px:col-span-3", example: StarfieldWarpExample, bleed: true},
];

const AnimationsBentoGrid = () => {
    return (
        <Band innerClassName="px-5 py-16 640px:px-8 1024px:px-12 1024px:py-24">
            <SectionIntro
                label="Animations"
                title="Motion that is ready to ship."
                description="50+ animated components built with Framer Motion. Try them here, then open the page for the code."
                action={
                    <Link to="/animations/installation" className="btn-ghost group h-10">
                        All animations
                        <LuArrowRight className="size-4 transition-transform group-hover:translate-x-0.5"/>
                    </Link>
                }
            />

            <div className="mt-10 grid grid-cols-1 gap-4 640px:grid-cols-2 1024px:grid-cols-6">
                {tiles.map((tile, index) => (
                    <Reveal key={tile.title} delay={index * 0.06} className={cn(tile.span, index === 4 && "640px:col-span-2 1024px:col-span-3")}>
                        <SpotlightCard className="flex h-full min-h-[320px] flex-col">
                            {/* Bleed tiles fill this area edge to edge; their example positions itself with absolute inset-0. */}
                            <div className={cn("relative flex flex-1 items-center justify-center overflow-hidden", tile.bleed ? "min-h-[260px]" : "p-6")}>
                                <tile.example/>
                            </div>
                            <Link to={tile.url}
                                  className="group flex items-center justify-between border-t border-hairline px-5 py-3.5 text-[0.85rem] font-medium text-ink">
                                {tile.title}
                                <LuArrowUpRight className="size-4 text-ink-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"/>
                            </Link>
                        </SpotlightCard>
                    </Reveal>
                ))}
            </div>
        </Band>
    );
};

export default AnimationsBentoGrid;
