import type {ComponentType} from "react";

export interface FooterLink {
    label: string;
    href: string;
}

export interface FooterColumn {
    title: string;
    links: FooterLink[];
}

export interface SocialLink {
    /** Read by screen readers, for example "Facebook". */
    label: string;
    href: string;
    icon: ComponentType<{className?: string}>;
}

export interface MultiColumnFooterProps {
    columns: FooterColumn[];
    socialLinks: SocialLink[];
    /** Small links in the bottom row, such as privacy policy and terms. */
    legalLinks: FooterLink[];
    /** Text in the bottom row, for example "© 2024 Acme. All rights reserved." */
    copyright: string;
    socialTitle?: string;
    /** Name of the bottom link list for screen readers. */
    legalLabel?: string;
    className?: string;
}

/** A sitemap footer with several link columns, social icons and a legal row. */
export const MultiColumnFooter = ({
    columns,
    socialLinks,
    legalLinks,
    copyright,
    socialTitle = "Get in touch",
    legalLabel = "Legal",
    className = "",
}: MultiColumnFooterProps) => {
    return (
        <footer className={`bg-white dark:bg-slate-900 shadow-md rounded-xl w-full p-6 md:p-9 ${className}`}>
            <div className="flex justify-between gap-[30px] flex-wrap w-full">
                {columns.map((column) => (
                    <nav key={column.title} aria-label={column.title}>
                        <h3 className="text-[1.2rem] dark:text-[#abc2d3] font-semibold text-[#424242] mb-2">{column.title}</h3>
                        <div className="flex flex-col gap-[8px] text-black">
                            {column.links.map((link) => (
                                <span key={link.label}>
                                    <a href={link.href} className="text-[0.9rem] dark:text-slate-400 hover:text-blue-400 cursor-pointer">
                                        {link.label}
                                    </a>
                                </span>
                            ))}
                        </div>
                    </nav>
                ))}

                <div>
                    <h3 className="text-[1.2rem] dark:text-[#abc2d3] font-semibold text-[#424242] mb-2">{socialTitle}</h3>
                    <div className="flex gap-[7px] text-black">
                        {socialLinks.map(({label, href, icon: Icon}) => (
                            <a
                                key={label}
                                href={href}
                                aria-label={label}
                                className="text-[1.2rem] p-1.5 cursor-pointer hover:text-white transition-all duration-300 dark:text-slate-400 rounded-full hover:bg-blue-400"
                            >
                                <Icon/>
                            </a>
                        ))}
                    </div>
                </div>
            </div>

            <div className="md:flex-row border-t dark:border-slate-700 border-gray-200 pt-[20px] flex-col flex items-center gap-[15px] w-full justify-between mt-8">
                <nav aria-label={legalLabel} className="flex flex-wrap gap-y-[6px] gap-x-[15px] sm:gap-[15px] text-gray-400">
                    {legalLinks.map((link) => (
                        <span key={link.label}>
                            <a href={link.href} className="text-[0.9rem] dark:text-slate-500 hover:text-blue-400 cursor-pointer">
                                {link.label}
                            </a>
                        </span>
                    ))}
                </nav>

                <p className="text-gray-400 dark:text-slate-500 text-[0.8rem]">{copyright}</p>
            </div>
        </footer>
    );
};
