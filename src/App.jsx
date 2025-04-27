import React, {useState, useEffect, Suspense} from "react";

// react router dom
import {Route, Routes} from "react-router-dom";

// home page
const HomePage = React.lazy(() => import("./Pages/HomePage"));

// documentation page
const OverviewPage = React.lazy(() => import("./Pages/OverviewPage"));
const FaqPage = React.lazy(() => import("./Pages/FaqPage"));
const TempletePage = React.lazy(() => import("./Pages/TempletePage"));

// inputs
const InputTextPage = React.lazy(() => import("./Pages/Components/Inputs/InputTextPage"));
const InputTextareaPage = React.lazy(() => import("./Pages/Components/Inputs/InputTextareaPage"));
const InputRadioPage = React.lazy(() => import("./Pages/Components/Inputs/InputRadioPage"));
const InputSwitchPage = React.lazy(() => import("./Pages/Components/Inputs/InputSwitchPage"));
const InputSelectPage = React.lazy(() => import("./Pages/Components/Inputs/InputSelectPage"));
const InputFilePage = React.lazy(() => import("./Pages/Components/Inputs/InputFilePage"));

// buttons pages
const NormalPage = React.lazy(() => import("./Pages/Components/Buttons/NormalPage"));
const AnimatedButtonPage = React.lazy(() => import("./Pages/Components/Buttons/AnimatedButtonPage"));

// all components
const AllComponentsPage = React.lazy(() => import("./Pages/Components/AllComponentsPage"));

// navigation pages
const PaginationPage = React.lazy(() => import("./Pages/Components/Navigation/PaginationPage"));
const TabsPage = React.lazy(() => import("./Pages/Components/Navigation/TabsPage"));
const ModalPage = React.lazy(() => import("./Pages/Components/Navigation/ModalPage"));
const ChipPage = React.lazy(() => import("./Pages/Components/Navigation/ChipPage"));

// feedback pages
const SkeletonPage = React.lazy(() => import("./Pages/Components/Feedback/SkeletonPage"));
const AlertMessagePage = React.lazy(() => import("./Pages/Components/Feedback/AlertMessagePage"));
const DialogPage = React.lazy(() => import("./Pages/Components/Feedback/DialogPage"));
const TestimonialPage = React.lazy(() => import("./Pages/Components/Feedback/TestimonialPage"));
const NotificationPage = React.lazy(() => import("./Pages/Components/Feedback/NotificationPage"));
const LoaderPage = React.lazy(() => import("./Pages/Components/Feedback/LoaderPage"));

// data display
const BadgePage = React.lazy(() => import("./Pages/Components/Data Display/BadgePage"));
const TooltipPage = React.lazy(() => import("./Pages/Components/Data Display/TooltipPage"));

// surface pages
const CardPage = React.lazy(() => import("./Pages/Components/Surfaces/CardPage"));
const AnimatedCardsPage = React.lazy(() => import("./Pages/Components/Surfaces/AnimatedCardsPage.jsx"));
const ImageGalleryPage = React.lazy(() => import("./Pages/Components/Surfaces/ImageGalleryPage"));
const AccordingPage = React.lazy(() => import("./Pages/Components/Surfaces/AccordingPage"));
const AppbarPage = React.lazy(() => import("./Pages/Components/Surfaces/AppbarPage"));

// e-commerce
import ProductCardPage from "./Pages/Components/ECommerce/ProductCardPage.jsx";
import AdsCardPage from "./Pages/Components/ECommerce/AdsCardPage.jsx";

// randoms
const CodeSnippetPage = React.lazy(() => import("./Pages/Components/Randoms/CodeSnippetPage"));
const SnippetPage = React.lazy(() => import("./Pages/Components/Randoms/SnippetPage"));
const AboutUsPage = React.lazy(() => import("./Pages/AboutUsPage.jsx"));
const PrivacyPolicyPage = React.lazy(() => import("./Pages/PrivacyPolicyPage.jsx"));
const CookieModal = React.lazy(() => import("./Shared/CookieModal.jsx"));
const DropdownButtonPage = React.lazy(() => import("./Pages/Components/Buttons/DropdownButtonPage.jsx"));
const ResizableLayoutPage = React.lazy(() => import("./Pages/Components/Surfaces/ResizableLayoutPage.jsx"));
const OtpInputPage = React.lazy(() => import("./Pages/Components/Inputs/OtpInputPage.jsx"));

// blocks
const ResponsiveNavbarPage = React.lazy(() => import("./Pages/Blocks/Sections/ResponsiveNavbarPage.jsx"));
const AllBlocksPage = React.lazy(() => import("./Pages/Blocks/AllBlocksPage.jsx"));
const HeroSectionPage = React.lazy(() => import("./Pages/Blocks/Sections/HeroSectionPage.jsx"));
const ProgressBarPage = React.lazy(() => import("./Pages/Components/Navigation/ProgressBarPage.jsx"));
const ContactFormPage = React.lazy(() => import("./Pages/Blocks/Forms/ContactFormPage.jsx"));
const ResponsiveSearchbarPage = React.lazy(() => import("./Pages/Blocks/Randoms/ResponsiveSearchbarPage.jsx"));
const BreadcrumbPage = React.lazy(() => import("./Pages/Components/Navigation/BreadcrumbPage.jsx"));
const RatingPage = React.lazy(() => import("./Pages/Components/Navigation/RatingPage.jsx"));
const TimelinePage = React.lazy(() => import("./Pages/Components/Data Display/TimelinePage.jsx"));
const NumberInputPage = React.lazy(() => import("./Pages/Components/Inputs/NumberInputPage.jsx"));
const StrongPasswordPage = React.lazy(() => import("./Pages/Components/Inputs/StrongPasswordPage.jsx"));
const CheckboxInputPage = React.lazy(() => import("./Pages/Components/Inputs/CheckboxInputPage.jsx"));
const EmptyPage = React.lazy(() => import("./Pages/EmptyPage.jsx"))
const StepsPage = React.lazy(() => import("./Pages/Components/Navigation/StepsPage.jsx"));

// icons page
const IconsPage = React.lazy(() => import('./Pages/IconsPage.jsx'))
const ResponsiveFooterPage = React.lazy(() => import("./Pages/Blocks/Randoms/ResponsiveFooterPage.jsx"));
const AuthButtonPage = React.lazy(() => import("./Pages/Components/Buttons/AuthButtonPage.jsx"));

const OpacityPalettePage = React.lazy(() => import("./Pages/OpacityPalettePage.jsx"))
const WrongUrlErrorPage = React.lazy(() => import("./Pages/Blocks/EmptyPages/WrongRoutePage.jsx"));
const WrongRoutePage = React.lazy(() => import("./Pages/Blocks/EmptyPages/EmptyPage.jsx"));
const PricingSectionPage = React.lazy(() => import("./Pages/Blocks/Sections/PricingSectionPage.jsx"));
const NewsletterSectionPage = React.lazy(() => import("./Pages/Blocks/Forms/NewsletterSectionPage.jsx"));
const MultipageFormPage = React.lazy(() => import("./Pages/Blocks/Forms/MultipageFormPage.jsx"));
const ResponsiveSidebarPage = React.lazy(() => import("./Pages/Blocks/Randoms/ResponsiveSidebarPage.jsx"));
const InputSliderPage = React.lazy(() => import("./Pages/Components/Inputs/InputSliderPage.jsx"));

// e-commerce blocks
import OfferGridPage from "./Pages/Blocks/E-Commerce/OfferGridPage.jsx";
import ProductDetailsPage from "./Pages/Blocks/E-Commerce/ProductDetailsPage.jsx";
import ProductFilterPage from "./Pages/Blocks/E-Commerce/ProductFilterPage.jsx";
import CheckoutPage from "./Pages/Blocks/E-Commerce/CheckoutPage.jsx";

// layout playground page
const LayoutPlaygroundPage = React.lazy(() => import("./Pages/LayoutPlaygroundPage.jsx"));
const TreeDropdownPage = React.lazy(() => import("./Pages/Components/Feedback/TreeDropdownPage.jsx"));
const InstallationPage = React.lazy(() => import("./Pages/InstallationPage.jsx"));
const DragAndDropPage = React.lazy(() => import("./Pages/Components/Surfaces/DragAndDropPage.jsx"));
const ResourcesPage = React.lazy(() => import("./Pages/ResourcesPage.jsx"));
const ContextMenuPage = React.lazy(() => import("./Pages/Components/Feedback/ContextMenuPage.jsx"));
const ReactCustomHooksPage = React.lazy(() => import("./Pages/ReactCustomHooksPage.jsx"));
const TablePage = React.lazy(() => import("./Pages/Components/Data Display/TablePage.jsx"));
const PieChartPage = React.lazy(() => import("./Pages/Components/Data Display/PieChartPage.jsx"));
const CarouselPage = React.lazy(() => import("./Pages/Components/Surfaces/CarouselPage.jsx"));

const SemanticTagMasterPage = React.lazy(() => import("./Pages/SemanticTagMasterPage.jsx"));

const ImageCropperPage = React.lazy(() => import("./Pages/Components/Surfaces/ImageCropperPage.jsx"));

const MarqueePage = React.lazy(() => import("./Pages/Components/Navigation/MarqueePage.jsx"));

const RedoUndoPage = React.lazy(() => import("./Pages/Components/Data Display/RedoUndoPage.jsx"));

// become zenui hero docs
import ZenUIHeroDocsPage from "./Pages/ZenUIHeroDocsPage.jsx";
import TimerPage from "./Pages/Components/Navigation/TimerPage.jsx";
import ShortcutGeneratorPage from "./Pages/ShortcutGeneratorPage.jsx";
import AIGeneratorPage from "./Pages/AIGeneratorPage.jsx";
import { MenuProvider } from "./Context/MenuContext.jsx";
import GithubActivityGraphPage from "./Pages/Components/Data Display/GithubActivityGraphPage.jsx";
import ComparisonCardPage from "./Pages/Components/Surfaces/ComparisonCardPage.jsx";
import LazyImagePackagePlaygroundPage from "./Pages/LazyImagePackagePlaygroundPage.jsx";
import AnimationInstallationPage from "./Pages/Animations/InstallationPage.jsx";
import MagicCardsPage from "./Pages/Animations/Cards/MagicCardsPage.jsx";
import RevealCardPage from "./Pages/Animations/Cards/RevealCardPage.jsx";
import usePageTracking from "./CustomHooks/usePageTracking.js";
import MagnetCardPage from "./Pages/Animations/Cards/MagnetCardPage.jsx";
import SortingAnimationPage from "./Pages/Animations/Layouts/SortingAnimationPage.jsx";
import GridSwitcherPage from "./Pages/Animations/Layouts/GridSwitcherPage.jsx";


const App = () => {
    const [isCookie, setIsCookie] = useState(false)

    usePageTracking()

    let Title = document.title;
    window.addEventListener('blur', () => {
        document.title = 'Get more components 😍';
    })

    window.addEventListener('focus', () => {
        document.title = Title;
    })

    return (
        <Suspense>
            <MenuProvider>
            {/* all routes */}
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/about-us" element={<AboutUsPage/>}/>
                <Route path="/privacy-policy" element={<PrivacyPolicyPage/>}/>

                {/* documentation */}
                <Route path="/docs/overview" element={<OverviewPage/>}/>
                <Route path="/docs/resources" element={<ResourcesPage/>}/>
                <Route path="/custom-hooks" element={<ReactCustomHooksPage/>}/>
                <Route path="/docs/installation" element={<InstallationPage/>}/>
                <Route path="/templates" element={<TempletePage/>}/>

                {/* components */}

                <Route
                    path="/components/all-components"
                    element={<AllComponentsPage/>}
                />

                {/* inputs */}
                <Route path="/components/input-text" element={<InputTextPage/>}/>
                <Route
                    path="/components/input-textarea"
                    element={<InputTextareaPage/>}
                />
                <Route path="/components/input-switch" element={<InputSwitchPage/>}/>
                <Route path="/components/otp-input" element={<OtpInputPage/>}/>
                <Route path="/components/input-select" element={<InputSelectPage/>}/>
                <Route path="/components/input-radio" element={<InputRadioPage/>}/>
                <Route path="/components/input-file" element={<InputFilePage/>}/>
                <Route path="/components/input-number" element={<NumberInputPage/>}/>
                <Route path="/components/strong-password" element={<StrongPasswordPage/>}/>
                <Route path="/components/input-checkbox" element={<CheckboxInputPage/>}/>
                <Route path="/components/input-range" element={<InputSliderPage/>}/>

                {/* buttons */}
                <Route path="/components/normal-button" element={<NormalPage/>}/>
                <Route path="/components/login-buttons" element={<AuthButtonPage/>}/>
                <Route path="/components/dropdown-button" element={<DropdownButtonPage/>}/>
                <Route
                    path="/components/animated-button"
                    element={<AnimatedButtonPage/>}
                />

                {/* navigation */}
                <Route path="/components/pagination" element={<PaginationPage/>}/>
                <Route path="/components/tabs" element={<TabsPage/>}/>
                <Route path="/components/modal" element={<ModalPage/>}/>
                <Route path="/components/progress-bar" element={<ProgressBarPage/>}/>
                <Route path="/components/chip" element={<ChipPage/>}/>
                <Route path="/components/marquee" element={<MarqueePage/>}/>
                <Route path="/components/timer" element={<TimerPage/>}/>
                <Route path="/components/breadcrumb" element={<BreadcrumbPage/>}/>
                <Route path="/components/rating" element={<RatingPage/>}/>
                <Route path="/components/stepper" element={<StepsPage/>}/>

                {/* feedback */}
                <Route path="/components/context-menu" element={<ContextMenuPage/>}/>
                <Route path="/components/skeleton" element={<SkeletonPage/>}/>
                <Route
                    path="/components/alert-message"
                    element={<AlertMessagePage/>}
                />
                <Route path="/components/dialog-message" element={<DialogPage/>}/>
                <Route path="/components/tree-dropdown" element={<TreeDropdownPage/>}/>
                <Route path="/components/loader" element={<LoaderPage/>}/>
                <Route path="/components/testimonials" element={<TestimonialPage/>}/>
                <Route path="/components/notification" element={<NotificationPage/>}/>

                {/* surface */}
                <Route path="/components/cards" element={<CardPage/>}/>
                <Route path="/components/drag-and-drop" element={<DragAndDropPage/>}/>
                <Route path="/components/comparison-card" element={<ComparisonCardPage/>}/>
                <Route path="/components/image-cropper" element={<ImageCropperPage/>}/>
                <Route path="/components/animated-cards" element={<AnimatedCardsPage/>}/>
                <Route
                    path="/components/image-gallery"
                    element={<ImageGalleryPage/>}
                />
                <Route path="/components/carousel" element={<CarouselPage />}/>
                <Route path="/components/according" element={<AccordingPage/>}/>
                <Route path="/components/appbar" element={<AppbarPage/>}/>
                <Route path="/components/resizable-layout" element={<ResizableLayoutPage/>}/>

                {/* data display */}
                <Route path="/components/badge" element={<BadgePage/>}/>
                <Route path="/components/table" element={<TablePage/>}/>
                <Route path="/components/github-activity-graph" element={<GithubActivityGraphPage/>}/>
                <Route path="/components/pie-chart" element={<PieChartPage/>}/>
                <Route path="/components/tooltip" element={<TooltipPage/>}/>
                <Route path="/components/redo-undo" element={<RedoUndoPage/>}/>
                <Route path="/components/timeline" element={<TimelinePage/>}/>

                {/* e-commerce */}
                <Route path="/components/product-card" element={<ProductCardPage/>}/>
                <Route path="/components/ads-card" element={<AdsCardPage/>}/>

                {/* randoms */}
                <Route path="/components/code" element={<CodeSnippetPage/>}/>
                <Route path="/components/snippet" element={<SnippetPage/>}/>


                {/*  all blocks route  */}
                <Route path="/blocks/all-blocks" element={<AllBlocksPage/>}/>
                <Route path="/blocks/responsive-navbar" element={<ResponsiveNavbarPage/>}/>
                <Route path="/blocks/hero-section" element={<HeroSectionPage/>}/>
                <Route path="/blocks/contact-form" element={<ContactFormPage/>}/>
                <Route path="/blocks/responsive-search-bar" element={<ResponsiveSearchbarPage/>}/>
                <Route path="/blocks/responsive-footer" element={<ResponsiveFooterPage/>}/>
                <Route path="/blocks/404-page" element={<WrongUrlErrorPage/>}/>
                <Route path="/blocks/pricing-section" element={<PricingSectionPage/>}/>
                <Route path="/blocks/newsletter-form" element={<NewsletterSectionPage/>}/>
                <Route path="/blocks/multi-step-form" element={<MultipageFormPage/>}/>
                <Route path="/blocks/responsive-sidebar" element={<ResponsiveSidebarPage/>}/>
                <Route path="/blocks/empty-page" element={<WrongRoutePage/>}/>

                {/* e-commerce blocks */}
                <Route path="/blocks/offer-grid" element={<OfferGridPage/>}/>
                <Route path="/blocks/product-details-page" element={<ProductDetailsPage/>}/>
                <Route path="/blocks/product-filter-page" element={<ProductFilterPage/>}/>
                <Route path="/blocks/checkout-page" element={<CheckoutPage/>}/>

                {/* animations route */}
                <Route path="/animations/installation" element={<AnimationInstallationPage/>}/>

                {/* animation cards */}
                <Route path="/animations/magic-card" element={<MagicCardsPage/>}/>
                <Route path="/animations/reveal-card" element={<RevealCardPage/>}/>
                <Route path="/animations/magnet-card" element={<MagnetCardPage/>}/>

                {/* layouts animation */}
                <Route path="/animations/sorting-animation" element={<SortingAnimationPage/>}/>
                <Route path="/animations/grid-switcher" element={<GridSwitcherPage/>}/>

                {/*  icons  */}
                <Route path="/icons" element={<IconsPage/>}/>

                {/* opacity palette */}
                <Route path='/color-palette' element={<OpacityPalettePage/>}/>

                {/* layout playground */}
                <Route path='/layout-playground' element={<LayoutPlaygroundPage/>}/>

                {/* layout playground */}
                <Route path='/shortcut-generator' element={<ShortcutGeneratorPage/>}/>
                
                {/* AI Generator */}
                <Route path="/config-generator" element={<AIGeneratorPage/>}/>

                {/* become ZenUI Hero */}
                <Route path='/zenui-hero-docs' element={<ZenUIHeroDocsPage/>}/>

                {/* zenui lazy image package */}
                <Route path='/zenui-image-react-playground' element={<LazyImagePackagePlaygroundPage/>}/>

                {/* Tag master */}
                <Route path='/semantic-tag-master' element={<SemanticTagMasterPage/>}/>

                {/*  empty route  */}
                <Route path="*" element={<EmptyPage/>}/>

            </Routes>

            <CookieModal isModalOpen={isCookie} setisModalOpen={setIsCookie}/>
            </MenuProvider>
        </Suspense>
    );
};

export default App;
