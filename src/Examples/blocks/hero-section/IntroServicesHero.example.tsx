import {IntroServicesHero, type HeroService} from "./IntroServicesHero";

const services: HeroService[] = [
    {name: "Branding", description: "Logos, color palettes and type systems that work across every channel.", iconSrc: "https://i.ibb.co/z721j8b/Vector.png"},
    {name: "UI/UX", description: "Research, wireframes and interfaces for web and mobile apps.", iconSrc: "https://i.ibb.co/Qn78BRJ/Ui-Design.png"},
    {name: "Product design", description: "From first sketch to a tested prototype your team can build.", iconSrc: "https://i.ibb.co/GcsvXxk/Product.png"},
];

const IntroServicesHeroExample = () => (
    <div className="p-4 sm:p-8">
        <IntroServicesHero
            eyebrow="Hi there"
            title="Luxe is here to be your assistant"
            highlight="Luxe"
            description="I help teams design and ship creative digital products."
            imageSrc="https://i.ibb.co/syHFhNy/image.png"
            services={services}
        />
    </div>
);

export default IntroServicesHeroExample;
