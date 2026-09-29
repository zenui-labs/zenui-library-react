import {AppDownloadHero} from "./AppDownloadHero";

// Point the store links at your app listings.
const AppDownloadHeroExample = () => (
    <div className="p-4 sm:p-8">
        <AppDownloadHero
            title="Be fashionable with Barner Glasses"
            description="Frames and lenses you can order online, try in a store or have delivered to your door."
            imageSrc="https://i.ibb.co/JRRBNHr/Group-144.png"
            appStoreHref="#"
            googlePlayHref="#"
        />
    </div>
);

export default AppDownloadHeroExample;
