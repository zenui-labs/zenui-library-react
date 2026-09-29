import type {ComponentType} from "react";
import {Link} from "react-router-dom";
import {LuArrowRight, LuArrowUpRight} from "react-icons/lu";

// Live examples straight from the docs, so the landing page always shows the code people copy.
import IntegrationHubExample from "@/Examples/animations/animated-beam/IntegrationHub.example.tsx";
import StockWatchlistExample from "@/Examples/animations/number-ticker/StockWatchlist.example.tsx";
import HolographicCardExample from "@/Examples/animations/tilt-card/HolographicCard.example.tsx";
import CardFanExample from "@/Examples/animations/flip-cards/CardFan.example.tsx";
import NotificationStreamExample from "@/Examples/animations/animated-list/NotificationStream.example.tsx";
import ToggleSwitchesExample from "@/Examples/animations/micro-interactions/ToggleSwitches.example.tsx";
import BarRaceExample from "@/Examples/animations/animated-charts/BarRace.example.tsx";
import {Band, Reveal, SectionIntro} from "@/Components/Home/LandingKit.tsx";
import {cn} from "@utils/Style.ts";

interface Tile {
    title: string;
    url: string;
    example: ComponentType;
    /** Column span from 1024px up, out of 6. */
    span: string;
    /** Wide tiles also take both columns between 640px and 1024px; the grid packs the small ones around them. */
    wide?: boolean;
}

const tiles: Tile[] = [
    {title: "Integration hub", url: "/animations/animated-beam#integration-hub", example: IntegrationHubExample, span: "1024px:col-span-4", wide: true},
    {title: "Holographic card", url: "/animations/tilt-card#holographic-card", example: HolographicCardExample, span: "1024px:col-span-2"},
    {title: "Live stock watchlist", url: "/animations/number-ticker#stock-watchlist", example: StockWatchlistExample, span: "1024px:col-span-3", wide: true},
    {title: "Bar chart race", url: "/animations/animated-charts#bar-race", example: BarRaceExample, span: "1024px:col-span-3", wide: true},
    {title: "Card stack that fans out", url: "/animations/flip-cards#card-fan", example: CardFanExample, span: "1024px:col-span-2"},
    {title: "Notification stream", url: "/animations/animated-list#notification-stream", example: NotificationStreamExample, span: "1024px:col-span-2"},
    {title: "Toggle switches", url: "/animations/micro-interactions#toggle-switches", example: ToggleSwitchesExample, span: "1024px:col-span-2"},
];

const AnimationsBentoGrid = () => {
    return (
        <Band innerClassName="px-5 py-16 640px:px-8 1024px:px-12 1024px:py-24">
            <SectionIntro
                label="Animations"
                title="Motion that is ready to ship."
                description="Live examples from the library. Hover, click and drag them here, then open the page for the reusable component and its usage."
                action={
                    <Link to="/animations/installation" className="btn-ghost group h-10">
                        All animations
                        <LuArrowRight className="size-4 transition-transform group-hover:translate-x-0.5"/>
                    </Link>
                }
            />

            <div className="mt-10 grid grid-cols-1 gap-4 640px:grid-flow-row-dense 640px:grid-cols-2 1024px:grid-cols-6">
                {tiles.map((tile, index) => (
                    <Reveal key={tile.title} delay={(index % 3) * 0.06} className={cn(tile.span, tile.wide && "640px:col-span-2")}>
                        <div className="flex h-full min-h-[340px] flex-col overflow-hidden rounded-shell border border-hairline bg-surface">
                            <div className="flex flex-1 items-center justify-center overflow-hidden p-5 640px:p-8">
                                <tile.example/>
                            </div>
                            <Link to={tile.url}
                                  className="group flex items-center justify-between border-t border-hairline px-5 py-3.5 text-[0.85rem] font-medium text-ink">
                                {tile.title}
                                <LuArrowUpRight className="size-4 text-ink-subtle transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"/>
                            </Link>
                        </div>
                    </Reveal>
                ))}
            </div>
        </Band>
    );
};

export default AnimationsBentoGrid;
