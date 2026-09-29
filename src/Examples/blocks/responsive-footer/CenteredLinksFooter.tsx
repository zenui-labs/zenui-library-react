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

export interface CenteredLinksFooterProps {
    links: FooterLink[];
    socialLinks: SocialLink[];
    /** Text in the bottom row, for example "© 2024 Acme. All rights reserved." */
    copyright: string;
    /** Name of the link list for screen readers. */
    navLabel?: string;
    className?: string;
}

/** A compact centered footer with one row of links, social icons and a copyright line. */
export const CenteredLinksFooter = ({
    links,
    socialLinks,
    copyright,
    navLabel = "Footer",
    className = "",
}: CenteredLinksFooterProps) => {
    return (
        <footer className={`bg-white dark:bg-slate-900 shadow-md rounded-xl w-full p-6 md:p-9 ${className}`}>
            <div className="flex justify-center gap-[30px] flex-wrap w-full sm:px-32">
                <nav aria-label={navLabel} className="flex justify-center sm:justify-between gap-[30px] w-full flex-wrap">
                    {links.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className="text-[0.9rem] dark:text-[#abc2d3] text-[#424242] hover:text-[#3B9DF8] cursor-pointer transition-all duration-200"
                        >
                            {link.label}
                        </a>
                    ))}
                </nav>

                <div className="flex items-center flex-wrap gap-[10px] text-[#424242]">
                    {socialLinks.map(({label, href, icon: Icon}) => (
                        <a
                            key={label}
                            href={href}
                            aria-label={label}
                            className="text-[1.2rem] p-1.5 cursor-pointer rounded-full hover:text-white hover:bg-[#3B9DF8] dark:text-[#abc2d3] transition-all duration-300"
                        >
                            <Icon/>
                        </a>
                    ))}
                </div>

                <div className="border-t dark:border-slate-700 border-gray-200 pt-[20px] flex items-center w-full flex-wrap gap-[20px] justify-center">
                    <p className="text-[0.8rem] dark:text-slate-500 sm:text-[0.9rem] text-gray-600">{copyright}</p>
                </div>
            </div>
        </footer>
    );
};
