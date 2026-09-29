import {PhoneMockupHero} from "./PhoneMockupHero";

// Give each action an href to render a link, or an onClick to render a button.
const PhoneMockupHeroExample = () => (
    <div className="p-4 sm:p-8">
        <PhoneMockupHero
            title="Helping you sell your products faster"
            description="Open a store in an afternoon, list your products and take your first order the same day."
            imageSrc="https://i.ibb.co/kGnQZJ5/free-iphone-12-mini-mockup-scene-1-removebg-preview.png"
            backgroundImageSrc="https://i.ibb.co/x1rvpZs/0f-Y6ep3cd1c.png"
            primaryAction={{label: "Get started", href: "#"}}
            videoAction={{label: "How to set up a shop", href: "#"}}
        />
    </div>
);

export default PhoneMockupHeroExample;
