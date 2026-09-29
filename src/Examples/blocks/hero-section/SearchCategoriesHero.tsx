import {useState} from "react";
import type {CSSProperties, FormEvent} from "react";
import {CiSearch} from "react-icons/ci";
import {FaCircleCheck} from "react-icons/fa6";

export interface HeroCategory {
    name: string;
    description: string;
    /** Small illustration shown above the name. */
    iconSrc: string;
}

export interface SearchCategoriesHeroProps {
    title: string;
    /** A word or phrase inside `title` to show in the accent color. */
    highlight?: string;
    description: string;
    imageSrc: string;
    /** Leave empty when the image is decorative. */
    imageAlt?: string;
    /** Short selling points shown with check marks under the search field. */
    highlights: string[];
    /** Category tiles shown in a row below the hero. */
    categories: HeroCategory[];
    placeholder?: string;
    /** Accessible name for the search field. Defaults to the placeholder. */
    searchLabel?: string;
    /** Current query when the parent controls it. */
    value?: string;
    /** Starting query when the component manages its own state. */
    defaultValue?: string;
    onChange?: (value: string) => void;
    /** Runs when the form is submitted, with the trimmed query. */
    onSearch?: (query: string) => void;
    /** Color of the highlighted words and the search button. */
    accentColor?: string;
    className?: string;
}

const HighlightedTitle = ({title, highlight}: {title: string; highlight?: string}) => {
    const start = highlight ? title.indexOf(highlight) : -1;
    if (!highlight || start === -1) return <>{title}</>;
    return (
        <>
            {title.slice(0, start)}
            <span className="text-[color:var(--hero-accent)]">{highlight}</span>
            {title.slice(start + highlight.length)}
        </>
    );
};

export interface CategoryTileProps {
    category: HeroCategory;
}

/** One category tile: an icon, a name and a short description. */
export const CategoryTile = ({category}: CategoryTileProps) => (
    <div>
        <img src={category.iconSrc} alt="" className="w-[60px]"/>
        <h2 className="text-[18px] dark:text-[#abc2d3] font-[500]">{category.name}</h2>
        <p className="text-[14px] leading-[18px] dark:text-slate-400 text-gray-400 font-[300]">{category.description}</p>
    </div>
);

/** A store hero with a search field, check-marked selling points, a photo and a row of category tiles. */
export const SearchCategoriesHero = ({
    title,
    highlight,
    description,
    imageSrc,
    imageAlt = "",
    highlights,
    categories,
    placeholder = "Search here",
    searchLabel,
    value,
    defaultValue = "",
    onChange,
    onSearch,
    accentColor = "#F38160",
    className = "",
}: SearchCategoriesHeroProps) => {
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
            className={`w-full h-full bg-[#FBFBFB] dark:bg-slate-900 rounded-md ${className}`}
            style={{"--hero-accent": accentColor} as CSSProperties}
        >
            <header className="flex lg:flex-row flex-col gap-[50px] lg:gap-10 items-center p-8">
                <div className="w-full lg:w-[55%]">
                    <h1 className="text-[40px] dark:text-[#abc2d3] sm:text-[60px] font-[600] leading-[45px] sm:leading-[70px]">
                        <HighlightedTitle title={title} highlight={highlight}/>
                    </h1>
                    <p className="text-[18px] text-gray-400 dark:text-slate-400 mt-2">{description}</p>

                    <form role="search" onSubmit={handleSubmit} className="relative my-5">
                        <input
                            type="text"
                            value={query}
                            onChange={(event) => update(event.target.value)}
                            placeholder={placeholder}
                            aria-label={searchLabel ?? placeholder}
                            className="py-3 px-4 dark:text-[#abc2d3] dark:placeholder:text-slate-500 dark:bg-transparent dark:border-slate-700 dark:border w-full outline-none rounded-md bg-gray-100"
                        />
                        <button
                            type="submit"
                            aria-label="Search"
                            className="h-full absolute top-0 right-0 bg-[color:var(--hero-accent)] px-3 text-white text-[1.3rem] rounded-r-md"
                        >
                            <CiSearch aria-hidden/>
                        </button>
                    </form>

                    <ul className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-[15px] w-full sm:w-[80%]">
                        {highlights.map((item) => (
                            <li key={item} className="flex items-center dark:text-slate-400 gap-[5px] text-gray-400 text-[1rem]">
                                <FaCircleCheck aria-hidden className="text-[#F0B70D] text-[1.2rem]"/>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="w-full sm:w-[40%]">
                    <img src={imageSrc} alt={imageAlt} className="w-full h-full"/>
                </div>
            </header>

            <section className="p-8 mt-16 grid sm:grid-cols-2 grid-cols-1 lg:grid-cols-4 gap-[25px] flex-wrap">
                {categories.map((category) => (
                    <CategoryTile key={category.name} category={category}/>
                ))}
            </section>
        </div>
    );
};
