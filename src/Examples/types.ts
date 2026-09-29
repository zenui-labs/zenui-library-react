import type {ComponentType, LazyExoticComponent} from "react";

export type ExampleSection = "Components" | "Animations" | "Blocks";

/** A reusable component file shown in the code view, e.g. {name: "KpiCards.tsx", source: kpiCardsSource}. */
export interface ExampleFile {
    name: string;
    source: string;
}

/**
 * One example on a page. The preview renders `component` from `<Name>.example.tsx`, and the code view shows the
 * same file. Reusable examples keep the component itself in `<Name>.tsx` (listed in `files`) and use the example
 * file only to pass demo data to it, so the code view shows the component first and the usage second.
 */
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
    /** Reusable component files this example imports, in the order a developer should copy them. */
    files?: ExampleFile[];
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
    /** Routed but left out of the sidebar, search and pager. */
    unlisted?: boolean;
    /** Plain text shown above the examples, for requirements such as a package to install. `code` spans in backticks. */
    notice?: string;
    load: () => Promise<{default: Example[]}>;
}

export type LazyExamplePage = LazyExoticComponent<ComponentType>;
