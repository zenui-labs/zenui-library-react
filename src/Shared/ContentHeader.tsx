import {cn} from "@utils/Style.ts";

/** Heading for one example on a docs page. The id feeds the table of contents and deep links. */
interface ContentHeaderProps {
    text: string;
    id?: string;
    className?: string;
}

const ContentHeader = ({text, id, className}: ContentHeaderProps) => {
    return (
        <h2 id={id} className={cn("group flex items-center gap-2 pt-8 text-[1.3rem] font-semibold tracking-heading text-ink", className)}>
            <span className="inline-block first-letter:uppercase">{text}</span>
            {id && (
                <a href={`#${id}`} aria-label={`Link to ${text}`}
                   className="font-normal text-ink-subtle opacity-0 transition-opacity hover:text-accent-strong focus-visible:opacity-100 group-hover:opacity-100">
                    #
                </a>
            )}
        </h2>
    );
};

export default ContentHeader;
