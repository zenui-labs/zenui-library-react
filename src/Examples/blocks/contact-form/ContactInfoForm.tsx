import {useId} from "react";
import type {ComponentType, FormEvent} from "react";

export interface ContactDetail {
    icon: ComponentType<{className?: string}>;
    /** The text shown, for example a phone number or street address. */
    label: string;
    /** Optional link, for example `tel:` or `mailto:`. */
    href?: string;
}

export interface ContactSocialLink {
    /** Accessible name, for example "Facebook". */
    label: string;
    href: string;
    icon: ComponentType<{className?: string}>;
}

export interface ContactInfoValues {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    message: string;
}

export interface ContactInfoFormProps {
    details: ContactDetail[];
    socialLinks?: ContactSocialLink[];
    title?: string;
    description?: string;
    submitLabel?: string;
    /** Runs with the field values when the form is submitted. The page does not reload. */
    onSubmit?: (values: ContactInfoValues) => void;
    className?: string;
}

const labelClass = "text-[1rem] dark:text-[#abc2d3] text-gray-700";
const fieldClass =
    "peer dark:bg-transparent dark:text-[#abc2d3] dark:border-slate-700 border-gray-300 border-b outline-none focus:border-[#3B9DF8] w-full text-gray-400 transition-colors duration-300";
const socialClass =
    "text-[1.2rem] p-1.5 cursor-pointer rounded-full bg-orange-500 text-white hover:bg-white hover:text-orange-500 transition-all duration-300 shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)]";

/** A contact form with a dark side panel that lists your phone, email, address and social links. */
export const ContactInfoForm = ({
    details,
    socialLinks = [],
    title = "Contact information",
    description = "Say something to start a live chat.",
    submitLabel = "Send message",
    onSubmit,
    className = "",
}: ContactInfoFormProps) => {
    const id = useId();

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const read = (key: string) => String(data.get(key) ?? "");
        onSubmit?.({
            firstName: read("firstName"),
            lastName: read("lastName"),
            email: read("email"),
            phone: read("phone"),
            message: read("message"),
        });
    };

    return (
        <section
            className={`w-full grid grid-cols-1 md:grid-cols-2 gap-[35px] shadow-[0px_0px_10px_0px_rgba(0,0,0,0.1)] p-[30px] rounded-xl ${className}`}
        >
            {/* information */}
            <aside className="w-full bg-gray-800 dark:bg-slate-900 flex flex-col justify-between p-[25px] rounded-md">
                <div>
                    <h2 className="text-[2rem] font-[600] leading-[35px] text-white">{title}</h2>
                    <p className="text-[0.9rem] mt-1 mb-8 text-white">{description}</p>
                </div>

                <ul className="flex flex-col gap-[20px] text-gray-300">
                    {details.map(({icon: Icon, label, href}) => (
                        <li key={label}>
                            {href ? (
                                <a href={href} className="flex items-center break-all gap-[8px] hover:text-white">
                                    <Icon className="shrink-0"/>
                                    {label}
                                </a>
                            ) : (
                                <p className="flex items-center break-all gap-[8px]">
                                    <Icon className="shrink-0"/>
                                    {label}
                                </p>
                            )}
                        </li>
                    ))}
                </ul>

                {socialLinks.length > 0 && (
                    <div className="flex gap-[15px] flex-wrap mt-8">
                        {socialLinks.map(({label, href, icon: Icon}) => (
                            <a key={label} href={href} aria-label={label} className={socialClass}>
                                <Icon/>
                            </a>
                        ))}
                    </div>
                )}
            </aside>

            {/* form area */}
            <form className="pt-[20px]" onSubmit={handleSubmit}>
                <div className="flex flex-col sm:flex-row items-center gap-[30px]">
                    <div className="flex flex-col gap-[5px] w-full sm:w-[50%]">
                        <label htmlFor={`${id}-first`} className={labelClass}>First name</label>
                        <input id={`${id}-first`} name="firstName" type="text" autoComplete="given-name" required className={fieldClass}/>
                    </div>

                    <div className="flex flex-col gap-[5px] w-full sm:w-[50%]">
                        <label htmlFor={`${id}-last`} className={labelClass}>Last name</label>
                        <input id={`${id}-last`} name="lastName" type="text" autoComplete="family-name" className={fieldClass}/>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-[30px] mt-10">
                    <div className="flex flex-col gap-[5px] w-full sm:w-[50%]">
                        <label htmlFor={`${id}-email`} className={labelClass}>Email address</label>
                        <input id={`${id}-email`} name="email" type="email" autoComplete="email" required className={fieldClass}/>
                    </div>

                    <div className="flex flex-col gap-[5px] w-full sm:w-[50%]">
                        <label htmlFor={`${id}-phone`} className={labelClass}>Phone number</label>
                        <input id={`${id}-phone`} name="phone" type="tel" autoComplete="tel" className={fieldClass}/>
                    </div>
                </div>

                <div className="flex flex-col gap-[5px] w-full mt-10">
                    <label htmlFor={`${id}-message`} className={labelClass}>Write message</label>
                    <textarea
                        id={`${id}-message`}
                        name="message"
                        required
                        className={`${fieldClass} min-h-[100px] resize-none`}
                    />
                </div>

                <div className="w-full flex items-center sm:items-end justify-center sm:justify-end mt-5">
                    <button
                        type="submit"
                        className="dark:border-slate-700 dark:text-[#abc2d3] dark:hover:bg-slate-900 dark:hover:text-[#abc2d3] dark:hover:border-slate-700 py-2.5 px-6 bg-gray-800 border transition-all duration-300 hover:border-gray-800 hover:text-gray-800 hover:bg-transparent text-white rounded-md text-[1rem] mt-[10px] w-max"
                    >
                        {submitLabel}
                    </button>
                </div>
            </form>
        </section>
    );
};
