import {PullCordHero} from "./PullCordHero";

const PullCordHeroExample = () => (
    <PullCordHero
        eyebrow="Tallow Lighting · The 2700 bulb"
        headline="Warmer the lower you go."
        description="Tallow bulbs drift from 2700 K down to 1800 K as they dim, the way filament used to. 806 lumens, E26 and E27, works with the dimmer you already own."
        primaryAction={{label: "Shop the 2700, $24", href: "#shop"}}
        secondaryAction={{label: "How warm dimming works", href: "#how"}}
    />
);

export default PullCordHeroExample;
