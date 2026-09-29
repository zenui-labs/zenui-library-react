import type {ComponentType} from "react";

export interface FooterLink {
    label: string;
    href: string;
}

export interface SocialLink {
    /** Read by screen readers, for example "Facebook". */
    label: string;
    href: string;
    icon: ComponentType<{className?: string}>;
}

export interface StoreFooterProps {
    links: FooterLink[];
    languages: string[];
    socialLinks: SocialLink[];
    /** Small links in the bottom row, such as terms and privacy. */
    legalLinks: FooterLink[];
    /** Called with the language a visitor picks. */
    onLanguageSelect?: (language: string) => void;
    linksTitle?: string;
    languagesTitle?: string;
    socialTitle?: string;
    className?: string;
}

/** A dark footer with a link column, a row of language buttons and social icons. */
export const StoreFooter = ({
    links,
    languages,
    socialLinks,
    legalLinks,
    onLanguageSelect,
    linksTitle = "About the store",
    languagesTitle = "Language",
    socialTitle = "Get in touch",
    className = "",
}: StoreFooterProps) => {
    return (
        <footer className={`bg-blue-950 rounded-xl w-full p-6 lg:p-9 ${className}`}>
            <div className="flex justify-between gap-[30px] flex-wrap w-full">
                <nav aria-label={linksTitle} className="lg:w-[25%]">
                    <h3 className="text-[1.2rem] font-semibold text-white mb-2">{linksTitle}</h3>
                    <div className="flex flex-col gap-[8px] text-white">
                        {links.map((link) => (
                            <span key={link.label}>
                                <a href={link.href} className="text-[0.9rem] hover:text-blue-400 cursor-pointer">{link.label}</a>
                            </span>
                        ))}
                    </div>
                </nav>

                <div className="lg:w-[45%]">
                    <h3 className="text-[1.2rem] font-semibold text-white mb-2">{languagesTitle}</h3>
                    <div className="flex text-white flex-wrap">
                        {languages.map((language) => (
                            <button
                                key={language}
                                type="button"
                                onClick={() => onLanguageSelect?.(language)}
                                className="text-[0.9rem] py-1.5 px-3 hover:bg-blue-400 rounded-md"
                            >
                                {language}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="lg:w-[20%]">
                    <h3 className="text-[1.2rem] font-semibold text-white mb-2">{socialTitle}</h3>
                    <div className="flex gap-[7px] text-white">
                        {socialLinks.map(({label, href, icon: Icon}) => (
                            <a
                                key={label}
                                href={href}
                                aria-label={label}
                                className="text-[1.2rem] p-1.5 cursor-pointer rounded-full hover:bg-blue-400"
                            >
                                <Icon/>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <div className="sm:flex-row flex-col flex sm:items-center gap-[15px] w-full justify-center mt-8">
                {legalLinks.map((link) => (
                    <a key={link.label} href={link.href} className="text-gray-400 cursor-pointer text-[0.8rem]">
                        {link.label}
                    </a>
                ))}
            </div>
        </footer>
    );
};
