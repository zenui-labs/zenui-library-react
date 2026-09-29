export interface AppDownloadHeroProps {
    title: string;
    description: string;
    /** Product image shown beside the text on large screens and below it on small ones. */
    imageSrc: string;
    /** Leave empty when the image is decorative. */
    imageAlt?: string;
    /** Link to your App Store listing. */
    appStoreHref?: string;
    /** Link to your Google Play listing. */
    googlePlayHref?: string;
    className?: string;
}

interface StoreBadgeProps {
    href: string;
    logoSrc: string;
    logoClassName: string;
    caption: string;
    store: string;
    className: string;
    textClassName?: string;
}

// The store logos are decorative: the caption and store name already say where the link goes.
const StoreBadge = ({href, logoSrc, logoClassName, caption, store, className, textClassName = ""}: StoreBadgeProps) => (
    <a href={href} className={className}>
        <img src={logoSrc} alt="" className={logoClassName}/>
        <span className={textClassName}>
            <span className="text-[0.6rem] font-[500] text-white">{caption}</span>
            <span className="block text-[1.2rem] font-[500] leading-[20px] mb-2 text-white">{store}</span>
        </span>
    </a>
);

/** A hero with a headline, App Store and Google Play badges, and a product image on a warm beige panel. */
export const AppDownloadHero = ({
    title,
    description,
    imageSrc,
    imageAlt = "",
    appStoreHref = "#",
    googlePlayHref = "#",
    className = "",
}: AppDownloadHeroProps) => (
    <div className={`w-full bg-[#DED3CA] text-black h-full p-8 rounded-md ${className}`}>
        <header className="flex lg:flex-row flex-col gap-[50px] lg:gap-0 items-center lg:mt-3">
            <div>
                <h1 className="text-[40px] lg:text-[60px] leading-[45px] lg:leading-[65px] lg:text-start text-center">
                    {title}
                </h1>
                <p className="text-[16px] mt-2 lg:text-start text-center">{description}</p>

                <div className="flex items-center flex-wrap lg:justify-start justify-center gap-[20px] mt-6">
                    <StoreBadge
                        href={appStoreHref}
                        logoSrc="https://i.ibb.co/Tgmf5Nr/images-3.png"
                        logoClassName="w-[28px]"
                        caption="Download on the"
                        store="App Store"
                        className="px-6 min-w-fit py-[1px] bg-black rounded-md flex items-center gap-[12px]"
                        textClassName="block"
                    />
                    <StoreBadge
                        href={googlePlayHref}
                        logoSrc="https://i.ibb.co/s9dSrDs/download-2-removebg-preview-1.png"
                        logoClassName="w-[25px]"
                        caption="Get it on"
                        store="Google Play"
                        className="px-4 min-w-fit py-1.5 bg-black rounded-md flex items-center gap-[15px]"
                        textClassName="flex items-start flex-col"
                    />
                </div>
            </div>

            <img src={imageSrc} alt={imageAlt} className="w-full lg:w-[55%]"/>
        </header>
    </div>
);
