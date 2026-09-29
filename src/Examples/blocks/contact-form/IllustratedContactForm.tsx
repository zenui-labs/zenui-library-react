import type {FormEvent} from "react";

export interface IllustratedContactValues {
    name: string;
    email: string;
    message: string;
}

export interface IllustratedContactFormProps {
    title?: string;
    description?: string;
    namePlaceholder?: string;
    emailPlaceholder?: string;
    messagePlaceholder?: string;
    submitLabel?: string;
    /** Illustration shown beside the form on large screens and below it on small ones. */
    imageSrc?: string;
    /** Leave empty when the illustration is decorative. */
    imageAlt?: string;
    /** Runs with the field values when the form is submitted. The page does not reload. */
    onSubmit?: (values: IllustratedContactValues) => void;
    className?: string;
}

const fieldClass =
    "peer border-[#383844] border rounded-md outline-none px-4 py-3 w-full bg-[#22222f] text-gray-400 transition-colors duration-300";

/** A dark contact card with a gradient submit button and an illustration beside the form. */
export const IllustratedContactForm = ({
    title = "Let’s connect constellations",
    description = "Reach out and tell us what you are working on. We read every message and reply within two days.",
    namePlaceholder = "Your name",
    emailPlaceholder = "Email address",
    messagePlaceholder = "Write message",
    submitLabel = "Send it to the moon",
    imageSrc = "https://i.ibb.co/h7rjVJS/Image.png",
    imageAlt = "",
    onSubmit,
    className = "",
}: IllustratedContactFormProps) => {
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
        <section
            className={`w-full lg:flex-row flex items-center gap-[30px] flex-col justify-between bg-[#0A0D17] p-[40px] rounded-xl ${className}`}
        >
            {/* form area */}
            <form className="lg:w-[60%] w-full" onSubmit={handleSubmit}>
                <div className="lg:w-[80%] w-full mx-auto">
                    <div className="text-white">
                        <h2 className="text-[1.7rem] font-[600] leading-[35px]">{title}</h2>
                        <p className="text-[0.9rem] mt-2 mb-8">{description}</p>
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
                        className="py-2.5 px-6 bg-gradient-to-r from-[#763AF5] to-[#A604F2] text-white rounded-md text-[1rem] mt-[10px] w-full"
                    >
                        {submitLabel}
                    </button>
                </div>
            </form>

            {/* image */}
            <div>
                <img src={imageSrc} alt={imageAlt} className="w-full"/>
            </div>
        </section>
    );
};
