import {PhotoBackgroundHero} from "./PhotoBackgroundHero";

const PhotoBackgroundHeroExample = () => (
    <div className="p-4 sm:p-8">
        <PhotoBackgroundHero
            title="Be fashionable this summer"
            description="Our end of season sale starts before the season does. Buy summer clothes now at 50% off."
            backgroundImageSrc="https://i.ibb.co/N1n4Pd0/michael-frattaroli-207280-unsplash.png"
            primaryAction={{label: "Catalog", href: "#"}}
            videoAction={{label: "Watch the collection video", href: "#"}}
        />
    </div>
);

export default PhotoBackgroundHeroExample;
