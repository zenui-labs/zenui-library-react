import type {CSSProperties} from "react";

export interface HeroService {
    name: string;
    description: string;
    /** Small icon image shown above the name. */
    iconSrc: string;
}

export interface IntroServicesHeroProps {
    /** Short greeting above the headline. */
    eyebrow?: string;
    title: string;
    /** A word or phrase inside `title` to show in the accent color, such as your name. */
    highlight?: string;
    description: string;
    imageSrc: string;
    /** Leave empty when the image is decorative. */
    imageAlt?: string;
    services: HeroService[];
    servicesTitle?: string;
    /** Color of the highlighted words and the soft glow in the corner. */
    accentColor?: string;
    className?: string;
}

const HighlightedTitle = ({title, highlight}: {title: string; highlight?: string}) => {
    const start = highlight ? title.indexOf(highlight) : -1;
    if (!highlight || start === -1) return <>{title}</>;
    return (
        <>
            {title.slice(0, start)}
            <span className="text-[color:var(--hero-accent)]">{highlight}</span>
            {title.slice(start + highlight.length)}
        </>
    );
};

export interface ServiceItemProps {
    service: HeroService;
}

/** One service: an icon, a name and a short description. */
export const ServiceItem = ({service}: ServiceItemProps) => (
    <div>
        <img src={service.iconSrc} alt="" className="w-[30px]"/>
        <h3 className="text-[1.1rem] dark:text-[#abc2d3] mt-3">{service.name}</h3>
        <p className="text-[0.9rem] text-gray-500 mt-1 dark:text-slate-400">{service.description}</p>
    </div>
);

/** A personal or studio hero with a greeting, a headline, a portrait and a list of services below. */
export const IntroServicesHero = ({
    eyebrow,
    title,
    highlight,
    description,
    imageSrc,
    imageAlt = "",
    services,
    servicesTitle = "Our services",
    accentColor = "#DC0155",
    className = "",
}: IntroServicesHeroProps) => (
    <div
        className={`w-full bg-[#fff] dark:bg-slate-900 rounded-md relative ${className}`}
        style={{"--hero-accent": accentColor} as CSSProperties}
    >
        <header className="flex lg:flex-row flex-col items-center gap-12 lg:gap-0 justify-between px-8 mt-10">
            <div className="w-full dark:text-[#abc2d3] lg:w-[45%]">
                {eyebrow && <p>{eyebrow}</p>}
                <h1 className="text-[40px] sm:text-[60px] font-semibold leading-[45px] sm:leading-[70px]">
                    <HighlightedTitle title={title} highlight={highlight}/>
                </h1>
                <p className="mt-2 text-[1rem]">{description}</p>
            </div>

            <div className="w-full lg:w-[55%]">
                <img src={imageSrc} alt={imageAlt}/>
            </div>
        </header>

        <section className="px-8 pb-[30px] mt-8">
            <h2 className="text-[1.3rem] dark:text-[#abc2d3] font-semibold">{servicesTitle}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[20px] mt-10 w-[70%]">
                {services.map((service) => (
                    <ServiceItem key={service.name} service={service}/>
                ))}
            </div>
        </section>

        {/* Soft glow in the bottom right corner */}
        <div
            aria-hidden
            className="w-[100px] h-[100px] bg-[color:var(--hero-accent)] blur-[90px] absolute bottom-[80px] right-[80px] pointer-events-none"
        />
    </div>
);
