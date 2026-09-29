import type {Example} from "../../types.ts";
import AppDownloadHero from "./AppDownloadHero.example.tsx";
import appDownloadHeroSource from "./AppDownloadHero.example.tsx?raw";
import appDownloadHeroComponentSource from "./AppDownloadHero.tsx?raw";
import PhoneMockupHero from "./PhoneMockupHero.example.tsx";
import phoneMockupHeroSource from "./PhoneMockupHero.example.tsx?raw";
import phoneMockupHeroComponentSource from "./PhoneMockupHero.tsx?raw";
import PhotoBackgroundHero from "./PhotoBackgroundHero.example.tsx";
import photoBackgroundHeroSource from "./PhotoBackgroundHero.example.tsx?raw";
import photoBackgroundHeroComponentSource from "./PhotoBackgroundHero.tsx?raw";
import DestinationSearchHero from "./DestinationSearchHero.example.tsx";
import destinationSearchHeroSource from "./DestinationSearchHero.example.tsx?raw";
import destinationSearchHeroComponentSource from "./DestinationSearchHero.tsx?raw";
import SearchCategoriesHero from "./SearchCategoriesHero.example.tsx";
import searchCategoriesHeroSource from "./SearchCategoriesHero.example.tsx?raw";
import searchCategoriesHeroComponentSource from "./SearchCategoriesHero.tsx?raw";
import IntroServicesHero from "./IntroServicesHero.example.tsx";
import introServicesHeroSource from "./IntroServicesHero.example.tsx?raw";
import introServicesHeroComponentSource from "./IntroServicesHero.tsx?raw";

const examples: Example[] = [
    {
        id: "hero_section_1",
        title: "Hero section 1",
        description: "A hero on a beige panel with a headline, App Store and Google Play badges and a large product image. Use it to launch a mobile app or a store with an app.",
        component: AppDownloadHero,
        source: appDownloadHeroSource,
        files: [{name: "AppDownloadHero.tsx", source: appDownloadHeroComponentSource}],
        layout: "full",
        minHeight: 560,
    },
    {
        id: "hero_section_2",
        title: "Hero section 2",
        description: "A split hero with a headline, a main button, a video button and a phone mockup. Use it when a short walkthrough video helps people get started.",
        component: PhoneMockupHero,
        source: phoneMockupHeroSource,
        files: [{name: "PhoneMockupHero.tsx", source: phoneMockupHeroComponentSource}],
        layout: "full",
        minHeight: 620,
    },
    {
        id: "hero_section_3",
        title: "Hero section 3",
        description: "A hero set on a full photo with the headline, a main button and a video button on the left half. Use it for a seasonal campaign or a collection launch.",
        component: PhotoBackgroundHero,
        source: photoBackgroundHeroSource,
        files: [{name: "PhotoBackgroundHero.tsx", source: photoBackgroundHeroComponentSource}],
        layout: "full",
        minHeight: 520,
    },
    {
        id: "hero-section-destination-search",
        title: "Hero section 4",
        description: "A search-first hero with a wide search field and a short headline over a tall illustration. Use it when searching is the first thing people come to do.",
        component: DestinationSearchHero,
        source: destinationSearchHeroSource,
        files: [{name: "DestinationSearchHero.tsx", source: destinationSearchHeroComponentSource}],
        layout: "full",
        minHeight: 560,
    },
    {
        id: "hero_section_4",
        title: "Hero section 5",
        description: "A store hero with a search field, check-marked selling points, a photo and a row of category tiles. Use it on the home page of a grocery or delivery store.",
        component: SearchCategoriesHero,
        source: searchCategoriesHeroSource,
        files: [{name: "SearchCategoriesHero.tsx", source: searchCategoriesHeroComponentSource}],
        layout: "full",
        minHeight: 900,
    },
    {
        id: "hero_section_5",
        title: "Hero section 6",
        description: "A personal hero with a greeting, a highlighted name, a portrait and a list of services below. Use it on a freelancer or studio portfolio.",
        component: IntroServicesHero,
        source: introServicesHeroSource,
        files: [{name: "IntroServicesHero.tsx", source: introServicesHeroComponentSource}],
        layout: "full",
        minHeight: 820,
    },
];

export default examples;
