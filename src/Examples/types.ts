import type {ComponentType, LazyExoticComponent} from "react";

export type ExampleSection = "Components" | "Animations" | "Blocks";

/** One example on a page. Preview and code come from the same `*.example.tsx` file. */
export interface Example {
    /** Anchor id, e.g. "spotlight-card". */
    id: string;
    title: string;
    /** One or two plain sentences: what it is and when to use it. */
    description: string;
    /** The live component. */
    component: ComponentType;
    /** Raw TypeScript source of the same file, imported with `?raw`. */
    source: string;
    /** "centered" pads and centers the preview; "full" lets blocks use the full frame width. */
    layout?: "centered" | "full";
    /** Minimum preview height in px (default 320). */
    minHeight?: number;
}

/** Navigation data for a page. `load` keeps each page's examples in its own chunk. */
export interface ExamplePageMeta {
    slug: string;
    section: ExampleSection;
    /** Sidebar group label, e.g. "Text" or "Marketing". An unknown label adds a new group. */
    group: string;
    title: string;
    description: string;
    status?: "new" | "updated";
    load: () => Promise<{default: Example[]}>;
}

export type LazyExamplePage = LazyExoticComponent<ComponentType>;
