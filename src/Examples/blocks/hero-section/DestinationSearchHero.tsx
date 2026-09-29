import {useState} from "react";
import type {CSSProperties, FormEvent} from "react";

export interface DestinationSearchHeroProps {
    title: string;
    /** Optional illustration or photo behind the section. */
    backgroundImageSrc?: string;
    placeholder?: string;
    /** Accessible name for the search field. Defaults to the placeholder. */
    searchLabel?: string;
    buttonLabel?: string;
    /** Current query when the parent controls it. */
    value?: string;
    /** Starting query when the component manages its own state. */
    defaultValue?: string;
    onChange?: (value: string) => void;
    /** Runs when the form is submitted, with the trimmed query. */
    onSearch?: (query: string) => void;
    /** Color of the search button and the headline. */
    accentColor?: string;
    className?: string;
}

/** A search-first hero with a wide search field and a short headline over a tall illustration. */
export const DestinationSearchHero = ({
    title,
    backgroundImageSrc,
    placeholder = "Type your destination",
    searchLabel,
    buttonLabel = "Search",
    value,
    defaultValue = "",
    onChange,
    onSearch,
    accentColor = "#3C8F7C",
    className = "",
}: DestinationSearchHeroProps) => {
    const [innerValue, setInnerValue] = useState(defaultValue);
    const query = value ?? innerValue;

    const update = (next: string) => {
        if (value === undefined) setInnerValue(next);
        onChange?.(next);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSearch?.(query.trim());
    };

    return (
        <div
            className={`w-full h-full bg-[#EAFCFC] dark:bg-green-500/20 rounded-md ${className}`}
            style={{
                ...(backgroundImageSrc ? {backgroundImage: `url("${backgroundImageSrc}")`, backgroundSize: "cover"} : {}),
                "--hero-accent": accentColor,
            } as CSSProperties}
        >
            <header className="flex items-center justify-center flex-col mt-12 pb-[300px]">
                <form role="search" onSubmit={handleSubmit} className="relative w-[90%] lg:w-[80%]">
                    <input
                        type="text"
                        value={query}
                        onChange={(event) => update(event.target.value)}
                        placeholder={placeholder}
                        aria-label={searchLabel ?? placeholder}
                        className="bg-white dark:bg-green-800/30 dark:border dark:border-green-700/50 dark:placeholder:text-slate-500 dark:text-[#abc2d3] shadow-md w-full py-3 pl-4 rounded-md outline-none pr-[100px]"
                    />
                    <button
                        type="submit"
                        className="py-2 px-4 dark:border-green-700/50 bg-[color:var(--hero-accent)] text-white rounded-md absolute top-[4px] right-1 dark:hover:border-green-700/50 hover:text-[color:var(--hero-accent)] hover:bg-transparent hover:border-[color:var(--hero-accent)] border transition-all duration-200"
                    >
                        {buttonLabel}
                    </button>
                </form>

                <h1 className="text-[30px] dark:text-green-600 font-[500] text-center lg:text-start text-[color:var(--hero-accent)] mt-7">
                    {title}
                </h1>
            </header>
        </div>
    );
};
