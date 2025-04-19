// react router dom
import OverviewIcon from "../../../SvgIcons/OverviewIcon.jsx";
import InstallationIcon from "../../../SvgIcons/InstallationIcon.jsx";
import ResourceIcon from "../../../SvgIcons/ResourceIcon.jsx";
import TemplatesIcon from "../../../SvgIcons/TemplatesIcon.jsx";
import HookIcon from "../../../SvgIcons/HookIcon.jsx";
import {CollapseMenu, DefaultMenu} from "./children/Menu/index.jsx";

const Content = () => {
    return (
        <>
            {/*  get starts  */}
            <DefaultMenu
                items={[
                    {
                        bgColor: "bg-blue-600",
                        borderColor: "border-blue-600",
                        textColor: "text-blue-600",
                        title: "Overview",
                        icon: OverviewIcon,
                        url: "/docs/overview",
                    },
                    {
                        bgColor: "bg-green-600",
                        borderColor: "border-green-600",
                        textColor: "text-green-600",
                        title: "Installation",
                        icon: InstallationIcon,
                        url: "/docs/installation",
                    },
                    {
                        bgColor: "bg-purple-600",
                        borderColor: "border-purple-600",
                        textColor: "text-purple-600",
                        title: "Resources",
                        icon: ResourceIcon,
                        url: "/docs/resources",
                    },
                    {
                        bgColor: "bg-[#DB06F9]",
                        borderColor: "border-[#DB06F9]",
                        textColor: "text-[#DB06F9]",
                        title: "Custom Hooks",
                        icon: HookIcon,
                        url: "/custom-hooks",
                    },
                    {
                        bgColor: "bg-indigo-600",
                        borderColor: "border-indigo-600",
                        textColor: "text-indigo-600",
                        title: "Templates",
                        icon: TemplatesIcon,
                        url: "/templates",
                    },
                ]}
            />
            {/*  components  */}
            <CollapseMenu
                title="Components"
                items={[
                    {
                        title: "All Components",
                        url: "/components/all-components",
                    },
                    {
                        label: "FORM",
                    },
                    {
                        title: "Input",
                        url: "/components/input-text",
                        parent: 'FORM'
                    },
                    {
                        title: "Textarea",
                        url: "/components/input-textarea",
                        parent: 'FORM'
                    },
                    {
                        title: "Number",
                        url: "/components/input-number",
                        parent: 'FORM'
                    },
                    {
                        title: "Checkbox",
                        url: "/components/input-checkbox",
                        parent: 'FORM'
                    },
                    {
                        title: "Switch",
                        url: "/components/input-switch",
                        parent: 'FORM'
                    },
                    {
                        title: "Strong Password",
                        url: "/components/strong-password",
                        parent: 'FORM'
                    },
                    {
                        title: "Select",
                        url: "/components/input-select",
                        parent: 'FORM'
                    },
                    {
                        title: "Radio",
                        url: "/components/input-radio",
                        parent: 'FORM'
                    },
                    {
                        title: "Range",
                        url: "/components/input-range",
                        parent: 'FORM'
                    },
                    {
                        title: "File",
                        url: "/components/input-file",
                        parent: 'FORM'
                    },
                    {
                        title: "OTP Input",
                        url: "/components/otp-input",
                        parent: 'FORM'
                    },
                    {
                        label: "BUTTONS",
                    },
                    {
                        title: "Normal Button",
                        url: "/components/normal-button",
                        parent: 'BUTTONS'
                    },
                    {
                        title: "Login Button",
                        url: "/components/login-buttons",
                        parent: 'BUTTONS'
                    },
                    {
                        title: "Dropdown Button",
                        url: "/components/dropdown-button",
                        parent: 'BUTTONS'
                    },
                    {
                        title: "Animated Button",
                        url: "/components/animated-button",
                        parent: 'BUTTONS'
                    },
                    {
                        label: "SURFACES",
                    },
                    {
                        title: "Drag & Drop",
                        url: "/components/drag-and-drop",
                        parent: 'SURFACES'
                    },
                    {
                        title: "Comparison Card",
                        url: "/components/comparison-card",
                        parent: 'SURFACES',
                    },
                    {
                        title: "Cards",
                        url: "/components/cards",
                    },
                    {
                        title: "Animated Cards",
                        url: "/components/animated-cards",
                        parent: 'SURFACES'
                    },
                    {
                        title: "Image Cropper",
                        url: "/components/image-cropper",
                        parent: 'SURFACES',
                        isNewComponent: true
                    },
                    {
                        title: "Accordion",
                        url: "/components/according",
                        parent: 'SURFACES'
                    },
                    {
                        title: "App bar",
                        url: "/components/appbar",
                        parent: 'SURFACES'
                    },
                    {
                        title: "Image Gallery",
                        url: "/components/image-gallery",
                        parent: 'SURFACES'
                    },
                    {
                        title: "Carousel",
                        url: "/components/carousel",
                        parent: 'SURFACES'
                    },
                    {
                        label: "NAVIGATION",
                    },
                    {
                        title: "Pagination",
                        url: "/components/pagination",
                        parent: 'NAVIGATION'
                    },
                    {
                        title: "Progress Bar",
                        url: "/components/progress-bar",
                        parent: 'NAVIGATION'
                    },
                    {
                        title: "Chip",
                        url: "/components/chip",
                        parent: 'NAVIGATION'
                    },
                    {
                        title: "Marquee",
                        url: "/components/marquee",
                        parent: 'NAVIGATION',
                        isNewComponent: true
                    },
                    {
                        title: "Timer",
                        url: "/components/timer",
                        parent: 'NAVIGATION'
                    },
                    {
                        title: "Breadcrumb",
                        url: "/components/breadcrumb",
                        parent: 'NAVIGATION'
                    },
                    {
                        title: "Rating",
                        url: "/components/rating",
                        parent: 'NAVIGATION'
                    },
                    {
                        title: "Stepper",
                        url: "/components/stepper",
                        parent: 'NAVIGATION'
                    },
                    {
                        title: "Modal",
                        url: "/components/modal",
                        parent: 'NAVIGATION'
                    },
                    {
                        title: "Tabs",
                        url: "/components/tabs",
                        parent: 'NAVIGATION'
                    },
                    {
                        label: "FEEDBACK",
                    },
                    {
                        title: "Context Menu",
                        url: "/components/context-menu",
                        parent: 'FEEDBACK'
                    },
                    {
                        title: "Skeleton",
                        url: "/components/skeleton",
                        parent: 'FEEDBACK'
                    },
                    {
                        title: "Tree Dropdown",
                        url: "/components/tree-dropdown",
                        parent: 'FEEDBACK'
                    },
                    {
                        title: "Alert Message",
                        url: "/components/alert-message",
                        parent: 'FEEDBACK'
                    },
                    {
                        title: "Dialog",
                        url: "/components/dialog-message",
                        parent: 'FEEDBACK'
                    },
                    {
                        title: "Testimonial",
                        url: "/components/testimonials",
                        parent: 'FEEDBACK'
                    },
                    {
                        title: "Loader",
                        url: "/components/loader",
                        parent: 'FEEDBACK'
                    },
                    {
                        title: "Notification",
                        url: "/components/notification",
                        parent: 'FEEDBACK'
                    },
                    {
                        label: "DATA DISPLAY",
                    },
                    {
                        title: "Badge",
                        url: "/components/badge",
                        parent: 'DATA DISPLAY'
                    },
                    {
                        title: "Table",
                        url: "/components/table",
                        parent: 'DATA DISPLAY'
                    },
                    {
                        title: "Redo & Undo",
                        url: "/components/redo-undo",
                        parent: 'DATA DISPLAY',
                        isNewComponent: true
                    },
                    {
                        title: "Github Activity Graph",
                        url: "/components/github-activity-graph",
                        parent: 'DATA DISPLAY',
                    },
                    {
                        title: "Tooltip",
                        url: "/components/tooltip",
                        parent: 'DATA DISPLAY'
                    },
                    {
                        title: "Pie Chart",
                        url: "/components/pie-chart",
                        parent: 'DATA DISPLAY'
                    },
                    {
                        title: "Timeline",
                        url: "/components/timeline",
                        parent: 'DATA DISPLAY',
                    },
                    {
                        label: "E-COMMERCE",
                    },
                    {
                        title: "Product Card",
                        url: "/components/product-card",
                        parent: 'E-COMMERCE',
                    },
                    {
                        title: "Ads Card",
                        url: "/components/ads-card",
                        parent: 'E-COMMERCE',
                    },
                    {
                        label: "RANDOMS",
                    },
                    {
                        title: "Code",
                        url: "/components/code",
                        parent: 'RANDOMS'
                    },
                    {
                        title: "Snippet",
                        url: "/components/snippet",
                        parent: 'RANDOMS'
                    },
                ]}
            />
            {/*  animations  */}
            <CollapseMenu
                title={"Animations"}
                isNewComponent={true}
                items={[
                    {
                        title: "Installation",
                        url: "/animations/installation",
                    },
                    {
                        label: "CARDS",
                    },
                    {
                        title: "Magic Card",
                        url: "/animations/magic-card",
                        parent: 'CARDS'
                    },
                    {
                        title: "Reveal Card",
                        url: "/animations/reveal-card",
                        parent: 'CARDS'
                    },
                    {
                        title: "Magnet Card",
                        url: "/animations/magnet-card",
                        parent: 'CARDS'
                    },
                    {
                        label: "LAYOUTS",
                    },
                    {
                        title: "Sorting Animation",
                        url: "/animations/sorting-animation",
                        parent: 'LAYOUTS'
                    },
                    {
                        title: "Grid Switcher",
                        url: "/animations/grid-switcher",
                        parent: 'LAYOUTS'
                    },
                    {
                        title: "Expandable Grid",
                        url: "/animations/expandable-grid",
                        parent: 'LAYOUTS'
                    },
                    {
                        label: "BUTTONS",
                    },
                    {
                        title: "Reaction Trail",
                        url: "/animations/reaction-trail",
                        parent: 'BUTTONS'
                    },
                    {
                        title: "Pop Animation",
                        url: "/animations/pop-animation",
                        parent: 'BUTTONS'
                    },
                ]}
            />
            {/*  blocks  */}
            <CollapseMenu
                title={"Blocks"}
                items={[
                    {
                        title: "All Blocks",
                        url: "/blocks/all-blocks",
                    },
                    {
                        label: "SECTIONS",
                    },
                    {
                        title: "Responsive Navbar",
                        url: "/blocks/responsive-navbar",
                        parent: 'Sections'
                    },
                    {
                        title: "Hero Section",
                        url: "/blocks/hero-section",
                        parent: 'Sections'
                    },
                    {
                        title: "Pricing Section",
                        url: "/blocks/pricing-section",
                        parent: 'Sections'
                    },
                    {
                        title: "Responsive Footer",
                        url: "/blocks/responsive-footer",
                        parent: 'Sections'
                    },
                    {
                        label: "FORM",
                    },
                    {
                        title: "Contact Form",
                        url: "/blocks/contact-form",
                        parent: 'Form'
                    },
                    {
                        title: "Multi-Step Form",
                        url: "/blocks/multi-step-form",
                        parent: 'Form'
                    },
                    {
                        title: "Newsletter Form",
                        url: "/blocks/newsletter-form",
                        parent: 'Form'
                    },
                    {
                        label: "EMPTY PAGES",
                    },
                    {
                        title: "404 Page",
                        url: "/blocks/404-page",
                        parent: 'Empty Pages'
                    },
                    {
                        title: "Empty Page",
                        url: "/blocks/empty-page",
                        parent: 'Empty Pages'
                    },
                    {
                        label: "E-COMMERCE",
                    },
                    {
                        title: "Offer Grid",
                        url: "/blocks/offer-grid",
                        parent: 'E-Commerce',
                    },
                    {
                        title: "Product Details Page",
                        url: "/blocks/product-details-page",
                        parent: 'E-Commerce',
                    },
                    {
                        title: "Checkout Page",
                        url: "/blocks/checkout-page",
                        parent: 'E-Commerce',
                    },
                    {
                        label: "RANDOM",
                    },
                    {
                        title: "Responsive Search Bar",
                        url: "/blocks/responsive-search-bar",
                        parent: 'Random'
                    },
                    {
                        title: "Responsive Sidebar",
                        url: "/blocks/responsive-sidebar",
                        parent: 'Random'
                    },
                ]}
            />
        </>
    )
}

export default Content