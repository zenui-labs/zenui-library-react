import {useState, type ChangeEvent, type FormEvent, type InputHTMLAttributes} from "react";
import {IoSearch} from "react-icons/io5";

/** `icon`: a square icon button on the right. `text`: a text button on the right. `pill`: a rounded field on a colored bar. */
export type SearchInputVariant = "icon" | "text" | "pill";

export interface SearchInputProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "value" | "defaultValue" | "onChange" | "type"> {
    variant?: SearchInputVariant;
    /** Query for a controlled input. */
    value?: string;
    /** Starting query for an uncontrolled input. */
    defaultValue?: string;
    onChange?: (value: string) => void;
    /** Called with the query when the button is clicked or Enter is pressed. */
    onSearch?: (query: string) => void;
    /** Accessible name for the field. */
    label?: string;
    /** Text of the button in the `text` variant, and the accessible name of the icon buttons. */
    buttonLabel?: string;
    className?: string;
}

/** A search field with a submit button, in one of three styles. */
export const SearchInput = ({
    variant = "icon",
    value,
    defaultValue = "",
    onChange,
    onSearch,
    label = "Search",
    buttonLabel = "Search",
    placeholder = "Search...",
    className = "",
    ...props
}: SearchInputProps) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const query = value ?? internalValue;

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInternalValue(event.target.value);
        onChange?.(event.target.value);
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        onSearch?.(query);
    };

    const inputProps = {
        type: "text",
        value: query,
        onChange: handleChange,
        "aria-label": label,
        placeholder,
        ...props,
    };

    if (variant === "pill") {
        return (
            <form
                role="search"
                onSubmit={handleSubmit}
                className={`bg-[#3B9DF8] py-4 w-full px-5 flex items-center justify-center rounded-full relative ${className}`}
            >
                <button type="submit" aria-label={buttonLabel} className="ml-auto flex cursor-pointer">
                    <IoSearch className="text-[1.3rem] text-white" aria-hidden/>
                </button>
                <input
                    {...inputProps}
                    className="border dark:bg-slate-900 dark:border-none dark:placeholder:text-slate-500 dark:text-[#abc2d3] border-[#e5eaf2] absolute top-[2px] left-[3px] h-[90%] w-[85%] py-3 px-4 outline-none rounded-full"
                />
            </form>
        );
    }

    return (
        <form role="search" onSubmit={handleSubmit} className={`w-full relative ${className}`}>
            <input
                {...inputProps}
                className="border dark:border-slate-600 bg-transparent dark:placeholder:text-slate-500 dark:text-[#abc2d3] border-[#e5eaf2] py-3 pl-4 pr-[65px] outline-none w-full rounded-md"
            />
            {variant === "text" ? (
                <button
                    type="submit"
                    className="bg-gray-300 dark:bg-slate-900 dark:border-slate-600 dark:border dark:text-slate-300 text-gray-500 absolute top-0 right-0 h-full px-5 flex items-center justify-center rounded-r-md cursor-pointer hover:bg-gray-400 hover:text-gray-200"
                >
                    {buttonLabel}
                </button>
            ) : (
                <button
                    type="submit"
                    aria-label={buttonLabel}
                    className="bg-gray-300 dark:bg-slate-900 dark:border dark:border-slate-600 dark:text-slate-400 text-gray-500 absolute top-0 right-0 h-full px-5 flex items-center justify-center rounded-r-md cursor-pointer hover:bg-gray-400 group"
                >
                    <IoSearch className="text-[1.3rem] group-hover:text-gray-200" aria-hidden/>
                </button>
            )}
        </form>
    );
};
