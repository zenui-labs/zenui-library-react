import { lazy } from "react";
import { examplePages, examplePagePath } from "@/Examples/registry.ts";

// Documentation Routes
const DocsRoutes = [
  {
    path: "/docs/overview",
    component: lazy(() => import("@pages/OverviewPage")),
  },
  {
    path: "/docs/whats-new",
    component: lazy(() => import("@pages/WhatsNewPage")),
  },
  {
    path: "/docs/resources",
    component: lazy(() => import("@pages/ResourcesPage")),
  },
  {
    path: "/docs/installation",
    component: lazy(() => import("@pages/InstallationPage")),
  },
  { path: "/templates", component: lazy(() => import("@pages/TempletePage")) },
];

// Overview pages for each section. Every component, animation and block page is registered in src/Examples.
const SectionRoutes = [
  {
    path: "/components/all-components",
    component: lazy(() => import("@pages/Components/AllComponentsPage")),
  },
  {
    path: "/blocks/all-blocks",
    component: lazy(() => import("@pages/Blocks/AllBlocksPage")),
  },
  {
    path: "/animations/all-animations",
    component: lazy(() => import("@pages/Animations/AllAnimationsPage")),
  },
  {
    path: "/animations/installation",
    component: lazy(() => import("@pages/Animations/InstallationPage")),
  },
];

// Pages registered in src/Examples share one page component.
const ExamplePage = lazy(() => import("@pages/ExamplePage"));
const ExampleRoutes = examplePages.map((page) => ({ path: examplePagePath(page), component: ExamplePage }));

// Misc Routes
const MiscRoutes = [
  { path: "/", component: lazy(() => import("@pages/HomePage")) },
  {
    path: "/contributors",
    component: lazy(() => import("@pages/ContributorsPage")),
  },
  {
    path: "/privacy-policy",
    component: lazy(() => import("@pages/PrivacyPolicyPage")),
  },
  { path: "/icons", component: lazy(() => import("@pages/IconsPage")) },
  {
    path: "/color-palette",
    component: lazy(() => import("@pages/OpacityPalettePage")),
  },
  {
    path: "/shortcut-generator",
    component: lazy(() => import("@pages/ShortcutGeneratorPage")),
  },
  {
    path: "/config-generator",
    component: lazy(() => import("@pages/AIGeneratorPage")),
  },
  {
    path: "/zenui-hero-docs",
    component: lazy(() => import("@pages/ZenUIHeroDocsPage")),
  },
  {
    path: "/zenui-image-react-playground",
    component: lazy(() => import("@pages/LazyImagePackagePlaygroundPage")),
  },
  {
    path: "/semantic-tag-master",
    component: lazy(() => import("@pages/SemanticTagMasterPage")),
  },
  { path: "*", component: lazy(() => import("@pages/EmptyPage")) },
];

// MiscRoutes ends with the catch-all, so it stays last.
const routes = [...DocsRoutes, ...SectionRoutes, ...ExampleRoutes, ...MiscRoutes];

export { routes, DocsRoutes, SectionRoutes, ExampleRoutes, MiscRoutes };
