import {useId, useState} from "react";
import type {ComponentType, FormEvent} from "react";

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

export interface FooterLogo {
    src: string;
    alt: string;
}

export interface NewsletterColumnsFooterProps {
    columns: FooterColumn[];
    logo: FooterLogo;
    /** Text in the bottom row, for example "© 2024 Acme. All rights reserved." */
    copyright: string;
    socialLinks: SocialLink[];
    /** Called with the trimmed email when the newsletter form is submitted. */
    onSubscribe?: (email: string) => void;
    newsletterTitle?: string;
    emailLabel?: string;
    placeholder?: string;
    submitLabel?: string;
    className?: string;
}

/** Link columns and a newsletter field above a bottom row with the logo, copyright and social icons. */
export const NewsletterColumnsFooter = ({
    columns,
    logo,
    copyright,
    socialLinks,
    onSubscribe,
    newsletterTitle = "Join a newsletter",
    emailLabel = "Your email",
    placeholder = "Email address",
    submitLabel = "Submit",
    className = "",
}: NewsletterColumnsFooterProps) => {
    const emailId = useId();
    const [email, setEmail] = useState("");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubscribe?.(email.trim());
        setEmail("");
    };

    return (
        <footer className={`bg-white dark:bg-slate-900 shadow-md rounded-xl w-full p-6 md:p-9 ${className}`}>
            <div className="flex justify-between gap-[30px] flex-wrap w-full">
                {columns.map((column) => (
                    <nav key={column.title} aria-label={column.title}>
                        <h3 className="text-[1.2rem] dark:text-[#abc2d3] font-semibold text-[#424242] mb-2">{column.title}</h3>
                        <div className="flex text-black flex-col gap-[10px]">
                            {column.links.map((link) => (
                                <a
                                    key={link.label}
                                    href={link.href}
                                    className="text-[0.9rem] dark:text-slate-400 text-[#424242] hover:text-[#3B9DF8] cursor-pointer transition-all duration-200"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </nav>
                ))}

                <div>
                    <h3 className="text-[1.2rem] dark:text-[#abc2d3] font-semibold text-[#424242] mb-2">{newsletterTitle}</h3>
                    <form onSubmit={handleSubmit} className="flex gap-[2px] flex-col text-[#424242] relative">
                        <label htmlFor={emailId} className="text-[0.9rem] dark:text-slate-400">{emailLabel}</label>
                        <input
                            id={emailId}
                            type="email"
                            name="email"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            placeholder={placeholder}
                            className="py-3 px-4 dark:bg-slate-900 dark:border-slate-700 dark:placeholder:text-slate-500 dark:text-[#abc2d3] w-full pr-[90px] rounded-md border border-[#3B9DF8] outline-none"
                        />
                        <button type="submit" className="px-4 h-[67%] rounded-r-md bg-[#3B9DF8] text-white absolute top-[24px] right-0">
                            {submitLabel}
                        </button>
                    </form>
                </div>
            </div>

            <div className="border-t border-gray-200 dark:border-slate-700 pt-[20px] mt-[40px] flex items-center justify-between w-full flex-wrap gap-[20px]">
                <img src={logo.src} alt={logo.alt} className="w-[130px]"/>

                <p className="text-[0.9rem] text-gray-600 dark:text-slate-500">{copyright}</p>

                <div className="flex items-center gap-[10px] text-[#424242]">
                    {socialLinks.map(({label, href, icon: Icon}) => (
                        <a
                            key={label}
                            href={href}
                            aria-label={label}
                            className="text-[1.2rem] p-1.5 cursor-pointer rounded-full hover:text-white hover:bg-[#3B9DF8] dark:text-slate-400 transition-all duration-300"
                        >
                            <Icon/>
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
};
