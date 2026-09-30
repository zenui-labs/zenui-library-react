import type {CSSProperties, ReactNode} from "react";
import {cn} from "@utils/Style.ts";

/**
 * Building blocks for the catalog thumbnails. Every illustration is drawn with the site tokens, so it follows the
 * theme, and animates on `group-hover` (the whole catalog card is the group). Keep illustrations abstract: shapes
 * and bars stand in for text, and one accent color marks the interesting part.
 */

interface PartProps {
    className?: string;
    style?: CSSProperties;
    children?: ReactNode;
}

/** A surface panel, like a card or a window. */
export const Panel = ({className, style, children}: PartProps) => (
    <div style={style} className={cn("rounded-[10px] border border-hairline bg-surface shadow-card", className)}>
        {children}
    </div>
);

/** A line of placeholder text. Set the width with a class, e.g. `w-16`. */
export const Line = ({className, style}: PartProps) => (
    <span style={style} className={cn("block h-[5px] rounded-full bg-ink/15", className)}/>
);

/** A heavier line for headings. */
export const Heading = ({className, style}: PartProps) => (
    <span style={style} className={cn("block h-[7px] rounded-full bg-ink/40", className)}/>
);

/** A small filled circle, e.g. an avatar or a status dot. */
export const Dot = ({className, style}: PartProps) => (
    <span style={style} className={cn("block size-2 shrink-0 rounded-full bg-ink/20", className)}/>
);

/** A button shape. `accent` fills it with the site accent. */
export const Button = ({className, style, accent = false, children}: PartProps & {accent?: boolean}) => (
    <span
        style={style}
        className={cn(
            "flex h-5 items-center justify-center gap-1 rounded-md px-2.5",
            accent ? "bg-accent shadow-[inset_0_1px_0_rgb(255_255_255/0.25)]" : "border border-hairline-strong bg-surface",
            className
        )}
    >
        {children ?? <span className={cn("block h-[4px] w-7 rounded-full", accent ? "bg-white/85 dark:bg-[#04151a]/70" : "bg-ink/30")}/>}
    </span>
);

/** Centers an illustration in the thumbnail and scales it as one piece. */
export const Scene = ({className, style, children}: PartProps) => (
    <div style={style} className={cn("relative flex h-full w-full items-center justify-center", className)}>
        {children}
    </div>
);

/** Easing shared by hover motion, so every thumbnail moves with the same character. */
export const EASE = "ease-[cubic-bezier(0.16,1,0.3,1)]";

/** A thumbnail. Illustrations receive nothing and render inside a 16:9-ish stage. */
export type Art = () => JSX.Element;
