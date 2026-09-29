import type {ReactNode} from "react";

/** Centered heading for standalone pages. `isSubjet` renders as a small label above the title. */
const SectionHead = ({isSubjet, title, description}: {isSubjet?: string; title: ReactNode; description?: ReactNode}) => {
    return (
        <div className="mx-auto flex max-w-[720px] flex-col items-center text-center">
            {isSubjet && <p className="eyebrow">{isSubjet}</p>}
            <h1 className="mt-3 text-balance text-[2.2rem] font-semibold leading-[1.08] tracking-display text-ink 640px:text-[2.8rem]">
                {title}
            </h1>
            {description && (
                <p className="mt-4 text-pretty text-[1rem] leading-relaxed text-ink-muted 640px:text-[1.05rem]">
                    {description}
                </p>
            )}
        </div>
    );
};

export default SectionHead;
