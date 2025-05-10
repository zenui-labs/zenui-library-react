import React, {useState, useEffect, Suspense} from "react";

// react router dom
import {Route, Routes} from "react-router-dom";

// home page
const HomePage = React.lazy(() => import("@pages/HomePage"));

// documentation page
const OverviewPage = React.lazy(() => import("@pages/OverviewPage"));
const TempletePage = React.lazy(() => import("@pages/TempletePage"));

// inputs
const InputTextPage = React.lazy(() => import("@pages/Components/Inputs/InputTextPage"));
const InputTextareaPage = React.lazy(() => import("@pages/Components/Inputs/InputTextareaPage"));
const InputRadioPage = React.lazy(() => import("@pages/Components/Inputs/InputRadioPage"));
const InputSwitchPage = React.lazy(() => import("@pages/Components/Inputs/InputSwitchPage"));
const InputSelectPage = React.lazy(() => import("@pages/Components/Inputs/InputSelectPage"));
const InputFilePage = React.lazy(() => import("@pages/Components/Inputs/InputFilePage"));

// buttons pages
const NormalPage = React.lazy(() => import("@pages/Components/Buttons/NormalPage"));
const AnimatedButtonPage = React.lazy(() => import("@pages/Components/Buttons/AnimatedButtonPage"));

// all components
const AllComponentsPage = React.lazy(() => import("@pages/Components/AllComponentsPage"));

// navigation pages
const PaginationPage = React.lazy(() => import("@pages/Components/Navigation/PaginationPage"));
const TabsPage = React.lazy(() => import("@pages/Components/Navigation/TabsPage"));
const ModalPage = React.lazy(() => import("@pages/Components/Navigation/ModalPage"));
const ChipPage = React.lazy(() => import("@pages/Components/Navigation/ChipPage"));

// feedback pages
const SkeletonPage = React.lazy(() => import("@pages/Components/Feedback/SkeletonPage"));
const AlertMessagePage = React.lazy(() => import("@pages/Components/Feedback/AlertMessagePage"));
const DialogPage = React.lazy(() => import("@pages/Components/Feedback/DialogPage"));
const TestimonialPage = React.lazy(() => import("@pages/Components/Feedback/TestimonialPage"));
const NotificationPage = React.lazy(() => import("@pages/Components/Feedback/NotificationPage"));
const LoaderPage = React.lazy(() => import("@pages/Components/Feedback/LoaderPage"));

// data display
const BadgePage = React.lazy(() => import("@pages/Components/Data Display/BadgePage"));
const TooltipPage = React.lazy(() => import("@pages/Components/Data Display/TooltipPage"));

// surface pages
const CardPage = React.lazy(() => import("@pages/Components/Surfaces/CardPage"));
const AnimatedCardsPage = React.lazy(() => import("@pages/Components/Surfaces/AnimatedCardsPage.jsx"));
const ImageGalleryPage = React.lazy(() => import("@pages/Components/Surfaces/ImageGalleryPage"));
const AccordingPage = React.lazy(() => import("@pages/Components/Surfaces/AccordingPage"));
const AppbarPage = React.lazy(() => import("@pages/Components/Surfaces/AppbarPage"));

// e-commerce
import ProductCardPage from "@pages/Components/ECommerce/ProductCardPage.jsx";
import AdsCardPage from "@pages/Components/ECommerce/AdsCardPage.jsx";

// randoms
const CodeSnippetPage = React.lazy(() => import("@pages/Components/Randoms/CodeSnippetPage"));
const SnippetPage = React.lazy(() => import("@pages/Components/Randoms/SnippetPage"));
const AboutUsPage = React.lazy(() => import("@pages/AboutUsPage.jsx"));
const PrivacyPolicyPage = React.lazy(() => import("@pages/PrivacyPolicyPage.jsx"));
const CookieModal = React.lazy(() => import("./Shared/CookieModal.jsx"));
const DropdownButtonPage = React.lazy(() => import("@pages/Components/Buttons/DropdownButtonPage.jsx"));
const ResizableLayoutPage = React.lazy(() => import("@pages/Components/Surfaces/ResizableLayoutPage.jsx"));
const OtpInputPage = React.lazy(() => import("@pages/Components/Inputs/OtpInputPage.jsx"));

// blocks
const ResponsiveNavbarPage = React.lazy(() => import("@pages/Blocks/Sections/ResponsiveNavbarPage.jsx"));
const AllBlocksPage = React.lazy(() => import("@pages/Blocks/AllBlocksPage.jsx"));
const HeroSectionPage = React.lazy(() => import("@pages/Blocks/Sections/HeroSectionPage.jsx"));
const ProgressBarPage = React.lazy(() => import("@pages/Components/Navigation/ProgressBarPage.jsx"));
const ContactFormPage = React.lazy(() => import("@pages/Blocks/Forms/ContactFormPage.jsx"));
const ResponsiveSearchbarPage = React.lazy(() => import("@pages/Blocks/Randoms/ResponsiveSearchbarPage.jsx"));
const BreadcrumbPage = React.lazy(() => import("@pages/Components/Navigation/BreadcrumbPage.jsx"));
const RatingPage = React.lazy(() => import("@pages/Components/Navigation/RatingPage.jsx"));
const TimelinePage = React.lazy(() => import("@pages/Components/Data Display/TimelinePage.jsx"));
const NumberInputPage = React.lazy(() => import("@pages/Components/Inputs/NumberInputPage.jsx"));
const StrongPasswordPage = React.lazy(() => import("@pages/Components/Inputs/StrongPasswordPage.jsx"));
const CheckboxInputPage = React.lazy(() => import("@pages/Components/Inputs/CheckboxInputPage.jsx"));
const EmptyPage = React.lazy(() => import("@pages/EmptyPage.jsx"))
const StepsPage = React.lazy(() => import("@pages/Components/Navigation/StepsPage.jsx"));

// icons page
const IconsPage = React.lazy(() => import('@pages/IconsPage.jsx'))
const ResponsiveFooterPage = React.lazy(() => import("@pages/Blocks/Randoms/ResponsiveFooterPage.jsx"));
const AuthButtonPage = React.lazy(() => import("@pages/Components/Buttons/AuthButtonPage.jsx"));

const OpacityPalettePage = React.lazy(() => import("@pages/OpacityPalettePage.jsx"))
const WrongUrlErrorPage = React.lazy(() => import("@pages/Blocks/EmptyPages/WrongRoutePage.jsx"));
const WrongRoutePage = React.lazy(() => import("@pages/Blocks/EmptyPages/EmptyPage.jsx"));
const PricingSectionPage = React.lazy(() => import("@pages/Blocks/Sections/PricingSectionPage.jsx"));
const NewsletterSectionPage = React.lazy(() => import("@pages/Blocks/Forms/NewsletterSectionPage.jsx"));
const MultipageFormPage = React.lazy(() => import("@pages/Blocks/Forms/MultipageFormPage.jsx"));
const ResponsiveSidebarPage = React.lazy(() => import("@pages/Blocks/Randoms/ResponsiveSidebarPage.jsx"));
const InputSliderPage = React.lazy(() => import("@pages/Components/Inputs/InputSliderPage.jsx"));

// e-commerce blocks
import OfferGridPage from "@pages/Blocks/E-Commerce/OfferGridPage.jsx";
import ProductDetailsPage from "@pages/Blocks/E-Commerce/ProductDetailsPage.jsx";
import ProductFilterPage from "@pages/Blocks/E-Commerce/ProductFilterPage.jsx";
import CheckoutPage from "@pages/Blocks/E-Commerce/CheckoutPage.jsx";

// layout playground page
const LayoutPlaygroundPage = React.lazy(() => import("@pages/LayoutPlaygroundPage.jsx"));
const TreeDropdownPage = React.lazy(() => import("@pages/Components/Feedback/TreeDropdownPage.jsx"));
const InstallationPage = React.lazy(() => import("@pages/InstallationPage.jsx"));
const DragAndDropPage = React.lazy(() => import("@pages/Components/Surfaces/DragAndDropPage.jsx"));
const ResourcesPage = React.lazy(() => import("@pages/ResourcesPage.jsx"));
const ContextMenuPage = React.lazy(() => import("@pages/Components/Feedback/ContextMenuPage.jsx"));
const ReactCustomHooksPage = React.lazy(() => import("@pages/ReactCustomHooksPage.jsx"));
const TablePage = React.lazy(() => import("@pages/Components/Data Display/TablePage.jsx"));
const PieChartPage = React.lazy(() => import("@pages/Components/Data Display/PieChartPage.jsx"));
const CarouselPage = React.lazy(() => import("@pages/Components/Surfaces/CarouselPage.jsx"));

const SemanticTagMasterPage = React.lazy(() => import("@pages/SemanticTagMasterPage.jsx"));

const ImageCropperPage = React.lazy(() => import("@pages/Components/Surfaces/ImageCropperPage.jsx"));

const MarqueePage = React.lazy(() => import("@pages/Components/Navigation/MarqueePage.jsx"));

const RedoUndoPage = React.lazy(() => import("@pages/Components/Data Display/RedoUndoPage.jsx"));

// become zenui hero docs
import ZenUIHeroDocsPage from "@pages/ZenUIHeroDocsPage.jsx";
import TimerPage from "@pages/Components/Navigation/TimerPage.jsx";
import ShortcutGeneratorPage from "@pages/ShortcutGeneratorPage.jsx";
import AIGeneratorPage from "@pages/AIGeneratorPage.jsx";
import {MenuProvider} from "./Context/MenuContext.jsx";
import GithubActivityGraphPage from "@pages/Components/Data Display/GithubActivityGraphPage.jsx";
import ComparisonCardPage from "@pages/Components/Surfaces/ComparisonCardPage.jsx";
import LazyImagePackagePlaygroundPage from "@pages/LazyImagePackagePlaygroundPage.jsx";
import AnimationInstallationPage from "@pages/Animations/InstallationPage.jsx";
import MagicCardsPage from "@pages/Animations/Cards/MagicCardsPage.jsx";
import RevealCardPage from "@pages/Animations/Cards/RevealCardPage.jsx";
import usePageTracking from "./CustomHooks/usePageTracking.js";
import MagnetCardPage from "@pages/Animations/Cards/MagnetCardPage.jsx";
import SortingAnimationPage from "@pages/Animations/Layouts/SortingAnimationPage.jsx";
import GridSwitcherPage from "@pages/Animations/Layouts/GridSwitcherPage.jsx";
import ReactionTrailPage from "@pages/Animations/Buttons/ReactionTrailPage.jsx";
import TextEffectsPage from "@pages/Animations/Visuals/TextEffectsPage.jsx";
import BackgroundAniamtionsPage from "@pages/Animations/Visuals/BackgroundAniamtionsPage.jsx";


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

    useEffect(() => {
        const widget = document.querySelector('#replicate-widget-container');

        if (widget && widget.shadowRoot) {
            const shadowRoot = widget.shadowRoot;
            const style = document.createElement('style');
            style.textContent = `
      #feedbackWidget {
        z-index: 1000 !important;
      }
      .eGjSGs {
    background-color: #0FABCA !important;
}
    `;
            shadowRoot.appendChild(style);
        }
    }, []);

    return (
        <>
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
                        <Route path="/components/carousel" element={<CarouselPage/>}/>
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

                        {/* buttons animation */}
                        <Route path="/animations/reaction-trail" element={<ReactionTrailPage/>}/>

                        {/* visuals animation */}
                        <Route path="/animations/text-effects" element={<TextEffectsPage/>}/>
                        <Route path="/animations/background-animations" element={<BackgroundAniamtionsPage/>}/>

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
        </>
    );
};

export default App;
