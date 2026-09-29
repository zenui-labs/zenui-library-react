import type {Example} from "../../types.ts";
import DefaultOpenAccordion from "./DefaultOpenAccordion.example.tsx";
import defaultOpenAccordionSource from "./DefaultOpenAccordion.example.tsx?raw";
import defaultOpenAccordionComponentSource from "./DefaultOpenAccordion.tsx?raw";
import BorderedAccordion from "./BorderedAccordion.example.tsx";
import borderedAccordionSource from "./BorderedAccordion.example.tsx?raw";
import borderedAccordionComponentSource from "./BorderedAccordion.tsx?raw";
import BackgroundAccordion from "./BackgroundAccordion.example.tsx";
import backgroundAccordionSource from "./BackgroundAccordion.example.tsx?raw";
import backgroundAccordionComponentSource from "./BackgroundAccordion.tsx?raw";

const examples: Example[] = [
    {
        id: "default_open",
        title: "Default open",
        description: "An accordion that starts with the first item open, so its content is visible right away.",
        component: DefaultOpenAccordion,
        source: defaultOpenAccordionSource,
        files: [{name: "DefaultOpenAccordion.tsx", source: defaultOpenAccordionComponentSource}],
        minHeight: 480,
    },
    {
        id: "border_according",
        title: "Border accordion",
        description: "An accordion with a border around each item. The plus icon turns into a close icon while an item is open.",
        component: BorderedAccordion,
        source: borderedAccordionSource,
        files: [{name: "BorderedAccordion.tsx", source: borderedAccordionComponentSource}],
        minHeight: 480,
    },
    {
        id: "background_according",
        title: "Background accordion",
        description: "An accordion with filled headers and a lighter panel, so each item stays distinct as it opens and closes.",
        component: BackgroundAccordion,
        source: backgroundAccordionSource,
        files: [{name: "BackgroundAccordion.tsx", source: backgroundAccordionComponentSource}],
        minHeight: 480,
    },
];

export default examples;
