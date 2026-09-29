import type {ReactNode} from "react";
import {cn} from "@utils/Style.ts";

const SectionWrapper = ({children, className}: {children: ReactNode; className?: string}) => {
    return (
        <section className={cn("shell mt-16", className)}>
            {children}
        </section>
    );
};

export default SectionWrapper;
