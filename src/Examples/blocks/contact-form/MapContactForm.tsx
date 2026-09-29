import type {FormEvent, ReactNode} from "react";

export interface MapContactValues {
    name: string;
    email: string;
    message: string;
}

export interface MapContactFormProps {
    /** Heading above the form. Pass a node to style part of it, as the default does. */
    title?: ReactNode;
    description?: string;
    namePlaceholder?: string;
    emailPlaceholder?: string;
    messagePlaceholder?: string;
    submitLabel?: string;
    /** A Google Maps embed URL, or any page that can be shown in an iframe. */
    mapSrc?: string;
    /** Accessible name for the map frame. */
    mapTitle?: string;
    /** Runs with the field values when the form is submitted. The page does not reload. */
    onSubmit?: (values: MapContactValues) => void;
    className?: string;
}

const fieldClass =
    "peer dark:bg-slate-900 dark:border-slate-700 dark:placeholder:text-slate-500 dark:text-[#abc2d3] border-gray-300 border rounded-md outline-none px-4 py-3 w-full text-gray-400 transition-colors duration-300";

const defaultMapSrc =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57903.02583821205!2d91.81983571134349!3d24.900058347354335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x375054d3d270329f%3A0xf58ef93431f67382!2sSylhet!5e0!3m2!1sen!2sbd!4v1723916219404!5m2!1sen!2sbd";

/** A contact form next to an embedded map, for pages where visitors may want to find you in person. */
export const MapContactForm = ({
    title = (
        <>
            Get in <span className="text-green-400">touch</span>
        </>
    ),
    description = "Reach out and tell us what you are working on. We read every message and reply within two days.",
    namePlaceholder = "Your name",
    emailPlaceholder = "Email address",
    messagePlaceholder = "Write message",
    submitLabel = "Submit",
    mapSrc = defaultMapSrc,
    mapTitle = "Office location on a map",
    onSubmit,
    className = "",
}: MapContactFormProps) => {
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        onSubmit?.({
            name: String(data.get("name") ?? ""),
            email: String(data.get("email") ?? ""),
            message: String(data.get("message") ?? ""),
        });
    };

    return (
        <section className={`w-full grid grid-cols-1 md:grid-cols-2 gap-[30px] shadow-md p-[40px] rounded-xl ${className}`}>
            {/* form area */}
            <form className="w-full" onSubmit={handleSubmit}>
                <div className="text-gray-800">
                    <h2 className="text-[2rem] dark:text-[#abc2d3] font-[600] leading-[35px]">{title}</h2>
                    <p className="text-[0.9rem] dark:text-slate-400 mt-2 mb-8">{description}</p>
                </div>

                <div className="flex sm:flex-row flex-col items-center gap-[20px]">
                    <div className="flex flex-col gap-[5px] w-full sm:w-[50%]">
                        <input
                            type="text"
                            name="name"
                            autoComplete="name"
                            required
                            placeholder={namePlaceholder}
                            aria-label={namePlaceholder}
                            className={fieldClass}
                        />
                    </div>

                    <div className="flex flex-col gap-[5px] w-full sm:w-[50%]">
                        <input
                            type="email"
                            name="email"
                            autoComplete="email"
                            required
                            placeholder={emailPlaceholder}
                            aria-label={emailPlaceholder}
                            className={fieldClass}
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-[5px] w-full mt-[20px]">
                    <textarea
                        name="message"
                        required
                        placeholder={messagePlaceholder}
                        aria-label={messagePlaceholder}
                        className={`${fieldClass} min-h-[200px]`}
                    />
                </div>

                <button
                    type="submit"
                    className="dark:text-[#abc2d3] py-2.5 px-6 bg-gray-800 text-white rounded-md text-[1rem] mt-[10px] w-full"
                >
                    {submitLabel}
                </button>
            </form>

            {/* map */}
            <div className="h-full">
                <iframe
                    src={mapSrc}
                    title={mapTitle}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full min-h-[300px] rounded-md"
                />
            </div>
        </section>
    );
};
