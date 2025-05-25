import React, {lazy} from 'react';

// Documentation Routes
const DocsRoutes = [
    {path: "/docs/overview", component: lazy(() => import("@pages/OverviewPage"))},
    {path: "/docs/resources", component: lazy(() => import("@pages/ResourcesPage"))},
    {path: "/docs/installation", component: lazy(() => import("@pages/InstallationPage"))},
    {path: "/custom-hooks", component: lazy(() => import("@pages/ReactCustomHooksPage"))},
    {path: "/templates", component: lazy(() => import("@pages/TempletePage"))},
];

// Input Component Routes
const InputRoutes = [
    {path: "/components/input-text", component: lazy(() => import("@pages/Components/Inputs/InputTextPage"))},
    {path: "/components/input-textarea", component: lazy(() => import("@pages/Components/Inputs/InputTextareaPage"))},
    {path: "/components/input-switch", component: lazy(() => import("@pages/Components/Inputs/InputSwitchPage"))},
    {path: "/components/otp-input", component: lazy(() => import("@pages/Components/Inputs/OtpInputPage"))},
    {path: "/components/input-select", component: lazy(() => import("@pages/Components/Inputs/InputSelectPage"))},
    {path: "/components/input-radio", component: lazy(() => import("@pages/Components/Inputs/InputRadioPage"))},
    {path: "/components/input-file", component: lazy(() => import("@pages/Components/Inputs/InputFilePage"))},
    {path: "/components/input-number", component: lazy(() => import("@pages/Components/Inputs/NumberInputPage"))},
    {path: "/components/strong-password", component: lazy(() => import("@pages/Components/Inputs/StrongPasswordPage"))},
    {path: "/components/input-checkbox", component: lazy(() => import("@pages/Components/Inputs/CheckboxInputPage"))},
    {path: "/components/input-range", component: lazy(() => import("@pages/Components/Inputs/InputSliderPage"))},
];

// Button Component Routes
const ButtonRoutes = [
    {path: "/components/normal-button", component: lazy(() => import("@pages/Components/Buttons/NormalPage"))},
    {path: "/components/login-buttons", component: lazy(() => import("@pages/Components/Buttons/AuthButtonPage"))},
    {
        path: "/components/dropdown-button",
        component: lazy(() => import("@pages/Components/Buttons/DropdownButtonPage"))
    },
    {
        path: "/components/animated-button",
        component: lazy(() => import("@pages/Components/Buttons/AnimatedButtonPage"))
    },
];

// Navigation Component Routes
const NavigationRoutes = [
    {path: "/components/pagination", component: lazy(() => import("@pages/Components/Navigation/PaginationPage"))},
    {path: "/components/tabs", component: lazy(() => import("@pages/Components/Navigation/TabsPage"))},
    {path: "/components/modal", component: lazy(() => import("@pages/Components/Navigation/ModalPage"))},
    {path: "/components/progress-bar", component: lazy(() => import("@pages/Components/Navigation/ProgressBarPage"))},
    {path: "/components/chip", component: lazy(() => import("@pages/Components/Navigation/ChipPage"))},
    {path: "/components/marquee", component: lazy(() => import("@pages/Components/Navigation/MarqueePage"))},
    {path: "/components/timer", component: lazy(() => import("@pages/Components/Navigation/TimerPage"))},
    {path: "/components/breadcrumb", component: lazy(() => import("@pages/Components/Navigation/BreadcrumbPage"))},
    {path: "/components/rating", component: lazy(() => import("@pages/Components/Navigation/RatingPage"))},
    {path: "/components/stepper", component: lazy(() => import("@pages/Components/Navigation/StepsPage"))},
];

// Feedback Component Routes
const FeedbackRoutes = [
    {path: "/components/context-menu", component: lazy(() => import("@pages/Components/Feedback/ContextMenuPage"))},
    {path: "/components/skeleton", component: lazy(() => import("@pages/Components/Feedback/SkeletonPage"))},
    {path: "/components/alert-message", component: lazy(() => import("@pages/Components/Feedback/AlertMessagePage"))},
    {path: "/components/dialog-message", component: lazy(() => import("@pages/Components/Feedback/DialogPage"))},
    {path: "/components/tree-dropdown", component: lazy(() => import("@pages/Components/Feedback/TreeDropdownPage"))},
    {path: "/components/loader", component: lazy(() => import("@pages/Components/Feedback/LoaderPage"))},
    {path: "/components/testimonials", component: lazy(() => import("@pages/Components/Feedback/TestimonialPage"))},
    {path: "/components/notification", component: lazy(() => import("@pages/Components/Feedback/NotificationPage"))},
];

// Surface Component Routes
const SurfaceRoutes = [
    {path: "/components/cards", component: lazy(() => import("@pages/Components/Surfaces/CardPage"))},
    {path: "/components/drag-and-drop", component: lazy(() => import("@pages/Components/Surfaces/DragAndDropPage"))},
    {
        path: "/components/comparison-card",
        component: lazy(() => import("@pages/Components/Surfaces/ComparisonCardPage"))
    },
    {path: "/components/image-cropper", component: lazy(() => import("@pages/Components/Surfaces/ImageCropperPage"))},
    {path: "/components/animated-cards", component: lazy(() => import("@pages/Components/Surfaces/AnimatedCardsPage"))},
    {path: "/components/image-gallery", component: lazy(() => import("@pages/Components/Surfaces/ImageGalleryPage"))},
    {path: "/components/carousel", component: lazy(() => import("@pages/Components/Surfaces/CarouselPage"))},
    {path: "/components/according", component: lazy(() => import("@pages/Components/Surfaces/AccordingPage"))},
    {path: "/components/appbar", component: lazy(() => import("@pages/Components/Surfaces/AppbarPage"))},
    {
        path: "/components/resizable-layout",
        component: lazy(() => import("@pages/Components/Surfaces/ResizableLayoutPage"))
    },
];

// Data Display Component Routes
const DataDisplayRoutes = [
    {path: "/components/badge", component: lazy(() => import("@pages/Components/Data Display/BadgePage"))},
    {path: "/components/table", component: lazy(() => import("@pages/Components/Data Display/TablePage"))},
    {
        path: "/components/github-activity-graph",
        component: lazy(() => import("@pages/Components/Data Display/GithubActivityGraphPage"))
    },
    {path: "/components/pie-chart", component: lazy(() => import("@pages/Components/Data Display/PieChartPage"))},
    {path: "/components/tooltip", component: lazy(() => import("@pages/Components/Data Display/TooltipPage"))},
    {path: "/components/redo-undo", component: lazy(() => import("@pages/Components/Data Display/RedoUndoPage"))},
    {path: "/components/timeline", component: lazy(() => import("@pages/Components/Data Display/TimelinePage"))},
];

// E-commerce Component Routes
const ECommerceComponentRoutes = [
    {path: "/components/product-card", component: lazy(() => import("@pages/Components/ECommerce/ProductCardPage"))},
    {path: "/components/ads-card", component: lazy(() => import("@pages/Components/ECommerce/AdsCardPage"))},
];

// Random Component Routes
const RandomComponentRoutes = [
    {path: "/components/code", component: lazy(() => import("@pages/Components/Randoms/CodeSnippetPage"))},
    {path: "/components/snippet", component: lazy(() => import("@pages/Components/Randoms/SnippetPage"))},
];

// Block Routes
const BlockRoutes = [
    {path: "/blocks/all-blocks", component: lazy(() => import("@pages/Blocks/AllBlocksPage"))},
    {path: "/blocks/responsive-navbar", component: lazy(() => import("@pages/Blocks/Sections/ResponsiveNavbarPage"))},
    {path: "/blocks/hero-section", component: lazy(() => import("@pages/Blocks/Sections/HeroSectionPage"))},
    {path: "/blocks/contact-form", component: lazy(() => import("@pages/Blocks/Forms/ContactFormPage"))},
    {
        path: "/blocks/responsive-search-bar",
        component: lazy(() => import("@pages/Blocks/Randoms/ResponsiveSearchbarPage"))
    },
    {path: "/blocks/responsive-footer", component: lazy(() => import("@pages/Blocks/Randoms/ResponsiveFooterPage"))},
    {path: "/blocks/404-page", component: lazy(() => import("@pages/Blocks/EmptyPages/WrongRoutePage"))},
    {path: "/blocks/pricing-section", component: lazy(() => import("@pages/Blocks/Sections/PricingSectionPage"))},
    {path: "/blocks/newsletter-form", component: lazy(() => import("@pages/Blocks/Forms/NewsletterSectionPage"))},
    {path: "/blocks/multi-step-form", component: lazy(() => import("@pages/Blocks/Forms/MultipageFormPage"))},
    {path: "/blocks/responsive-sidebar", component: lazy(() => import("@pages/Blocks/Randoms/ResponsiveSidebarPage"))},
    {path: "/blocks/empty-page", component: lazy(() => import("@pages/Blocks/EmptyPages/EmptyPage"))},
];

// E-commerce Block Routes
const ECommerceBlockRoutes = [
    {path: "/blocks/offer-grid", component: lazy(() => import("@pages/Blocks/E-Commerce/OfferGridPage"))},
    {
        path: "/blocks/product-details-page",
        component: lazy(() => import("@pages/Blocks/E-Commerce/ProductDetailsPage"))
    },
    {path: "/blocks/product-filter-page", component: lazy(() => import("@pages/Blocks/E-Commerce/ProductFilterPage"))},
    {path: "/blocks/checkout-page", component: lazy(() => import("@pages/Blocks/E-Commerce/CheckoutPage"))},
];

// Animation Routes
const AnimationRoutes = [
    {path: "/animations/installation", component: lazy(() => import("@pages/Animations/InstallationPage"))},
    {path: "/animations/magic-card", component: lazy(() => import("@pages/Animations/Cards/MagicCardsPage"))},
    {path: "/animations/reveal-card", component: lazy(() => import("@pages/Animations/Cards/RevealCardPage"))},
    {path: "/animations/magnet-card", component: lazy(() => import("@pages/Animations/Cards/MagnetCardPage"))},
    {
        path: "/animations/sorting-animation",
        component: lazy(() => import("@pages/Animations/Layouts/SortingAnimationPage"))
    },
    {
        path: "/animations/layout-switcher",
        component: lazy(() => import("@pages/Animations/Layouts/LayoutSwitcherPage"))
    },
    {path: "/animations/reaction-trail", component: lazy(() => import("@pages/Animations/Buttons/ReactionTrailPage"))},
    {path: "/animations/text-effects", component: lazy(() => import("@pages/Animations/Visuals/TextEffectsPage"))},
    {
        path: "/animations/background-animations",
        component: lazy(() => import("@pages/Animations/Visuals/BackgroundAniamtionsPage"))
    },
    {
        path: "/animations/dropdown-animations",
        component: lazy(() => import("@pages/Animations/Visuals/DropdownAnimationsPage"))
    },
    {
        path: "/animations/drag-animations",
        component: lazy(() => import("@pages/Animations/Layouts/DragAnimationsPage"))
    },
    {
        path: "/animations/gallery-view",
        component: lazy(() => import("@pages/Animations/Visuals/GalleryViewPage"))
    },
    {
        path: "/animations/hover-effects",
        component: lazy(() => import("@pages/Animations/Buttons/HoverEffectsPage"))
    },
    {
        path: "/animations/chat-screen",
        component: lazy(() => import("@pages/Animations/Visuals/ChatScreenPage"))
    },
    {
        path: "/animations/animated-accordion",
        component: lazy(() => import("@pages/Animations/Layouts/AnimatedAccordionPage"))
    },
];

// Misc Routes
const MiscRoutes = [
    {path: "/", component: lazy(() => import("@pages/HomePage"))},
    {path: "/about-us", component: lazy(() => import("@pages/AboutUsPage"))},
    {path: "/privacy-policy", component: lazy(() => import("@pages/PrivacyPolicyPage"))},
    {path: "/components/all-components", component: lazy(() => import("@pages/Components/AllComponentsPage"))},
    {path: "/icons", component: lazy(() => import("@pages/IconsPage"))},
    {path: "/color-palette", component: lazy(() => import("@pages/OpacityPalettePage"))},
    {path: "/layout-playground", component: lazy(() => import("@pages/LayoutPlaygroundPage"))},
    {path: "/shortcut-generator", component: lazy(() => import("@pages/ShortcutGeneratorPage"))},
    {path: "/config-generator", component: lazy(() => import("@pages/AIGeneratorPage"))},
    {path: "/zenui-hero-docs", component: lazy(() => import("@pages/ZenUIHeroDocsPage"))},
    {path: "/zenui-image-react-playground", component: lazy(() => import("@pages/LazyImagePackagePlaygroundPage"))},
    {path: "/semantic-tag-master", component: lazy(() => import("@pages/SemanticTagMasterPage"))},
    {path: "*", component: lazy(() => import("@pages/EmptyPage"))},
];

// Combine all routes
const routes = [
    ...DocsRoutes,
    ...InputRoutes,
    ...ButtonRoutes,
    ...NavigationRoutes,
    ...FeedbackRoutes,
    ...SurfaceRoutes,
    ...DataDisplayRoutes,
    ...ECommerceComponentRoutes,
    ...RandomComponentRoutes,
    ...BlockRoutes,
    ...ECommerceBlockRoutes,
    ...AnimationRoutes,
    ...MiscRoutes,
];

export {
    routes,
    DocsRoutes,
    InputRoutes,
    ButtonRoutes,
    NavigationRoutes,
    FeedbackRoutes,
    SurfaceRoutes,
    DataDisplayRoutes,
    ECommerceComponentRoutes,
    RandomComponentRoutes,
    BlockRoutes,
    ECommerceBlockRoutes,
    AnimationRoutes,
    MiscRoutes,
};