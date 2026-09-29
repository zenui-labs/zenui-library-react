import {useId, useState} from "react";
import type {FormEvent} from "react";
import {IoLocationOutline} from "react-icons/io5";
import {MdOutlineEmail, MdOutlineLocalPhone} from "react-icons/md";

export interface FooterLink {
    label: string;
    href: string;
}

export interface FooterColumn {
    title: string;
    links: FooterLink[];
}

export interface FooterLogo {
    src: string;
    alt: string;
}

export interface ContactNewsletterFooterProps {
    logo: FooterLogo;
    address?: string;
    email?: string;
    phone?: string;
    columns: FooterColumn[];
    /** Called with the trimmed email when the newsletter form is submitted. */
    onSubscribe?: (email: string) => void;
    newsletterTitle?: string;
    emailLabel?: string;
    placeholder?: string;
    submitLabel?: string;
    className?: string;
}

/** A light footer with a logo and contact details, link columns and a newsletter field. */
export const ContactNewsletterFooter = ({
    logo,
    address,
    email,
    phone,
    columns,
    onSubscribe,
    newsletterTitle = "Join a newsletter",
    emailLabel = "Your email",
    placeholder = "Email address",
    submitLabel = "Submit",
    className = "",
}: ContactNewsletterFooterProps) => {
    const emailId = useId();
    const [subscriberEmail, setSubscriberEmail] = useState("");

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSubscribe?.(subscriberEmail.trim());
        setSubscriberEmail("");
    };

    return (
        <footer className={`bg-white shadow-md dark:bg-slate-900 rounded-xl w-full p-6 sm:p-9 ${className}`}>
            <div className="flex justify-between gap-[30px] flex-col sm:flex-row flex-wrap w-full">
                <div className="w-full sm:w-[25%]">
                    <img src={logo.src} alt={logo.alt} className="w-[150px] mb-[20px]"/>
                    <address className="flex flex-col gap-[20px] text-[#3B9DF8] not-italic">
                        {address && (
                            <span className="text-[0.9rem] flex items-center gap-[8px]">
                                <IoLocationOutline className="text-[1.2rem] shrink-0" aria-hidden/>
                                {address}
                            </span>
                        )}
                        {email && (
                            <span>
                                <a href={`mailto:${email}`} className="text-[0.9rem] flex items-center gap-[8px] hover:text-blue-400 cursor-pointer">
                                    <MdOutlineEmail className="text-[1.1rem] shrink-0" aria-hidden/>
                                    {email}
                                </a>
                            </span>
                        )}
                        {phone && (
                            <span>
                                <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="text-[0.9rem] flex items-center gap-[8px] hover:text-blue-400 cursor-pointer">
                                    <MdOutlineLocalPhone className="text-[1.1rem] shrink-0" aria-hidden/>
                                    {phone}
                                </a>
                            </span>
                        )}
                    </address>
                </div>

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

                <div className="w-full">
                    <h3 className="text-[1.2rem] dark:text-[#abc2d3] font-semibold text-[#424242] mb-2">{newsletterTitle}</h3>
                    <form onSubmit={handleSubmit} className="flex gap-[2px] w-full sm:w-[40%] flex-col text-[#424242] relative">
                        <label htmlFor={emailId} className="text-[0.9rem] dark:text-slate-400">{emailLabel}</label>
                        <input
                            id={emailId}
                            type="email"
                            name="email"
                            autoComplete="email"
                            required
                            value={subscriberEmail}
                            onChange={(event) => setSubscriberEmail(event.target.value)}
                            placeholder={placeholder}
                            className="py-3 px-4 dark:bg-slate-900 dark:border-slate-700 dark:placeholder:text-slate-500 dark:text-[#abc2d3] pr-[90px] w-full rounded-md border border-[#3B9DF8] outline-none"
                        />
                        <button type="submit" className="px-4 h-[67%] rounded-r-md bg-[#3B9DF8] text-white absolute top-[24px] right-0">
                            {submitLabel}
                        </button>
                    </form>
                </div>
            </div>
        </footer>
    );
};
