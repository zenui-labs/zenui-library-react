import type {ExamplePageMeta, ExampleSection} from "./types.ts";
import {componentsPages} from "./components/pages.ts";
import {animationsPages} from "./animations/pages.ts";
import {blocksPages} from "./blocks/pages.ts";

export const examplePages: ExamplePageMeta[] = [...componentsPages, ...animationsPages, ...blocksPages];

const sectionPath: Record<ExampleSection, string> = {
    Components: "/components",
    Animations: "/animations",
    Blocks: "/blocks",
};

export const examplePagePath = (page: ExamplePageMeta) => `${sectionPath[page.section]}/${page.slug}`;

export const findExamplePage = (pathname: string) => examplePages.find((page) => examplePagePath(page) === pathname) ?? null;
