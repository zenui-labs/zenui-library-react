import {examplePages, examplePagePath} from "@/Examples/registry.ts";

// Single source for the docs sidebar, the mobile menu, breadcrumbs and the previous/next pager.
// Order here is the reading order used by the pager.

export interface NavItem {
    title: string;
    url: string;
    icon?: string;
    status?: "new" | "updated";
}

export interface NavGroup {
    label: string;
    items: NavItem[];
}

export interface NavSection {
    title: string;
    items: NavItem[];
    groups?: NavGroup[];
}

export const docsNavigation: NavSection[] = [
    {
        title: "Getting started",
        items: [
            {title: "Overview", url: "/docs/overview", icon: "overview"},
            {title: "Installation", url: "/docs/installation", icon: "installation"},
            {title: "What's new in v4", url: "/docs/whats-new", icon: "whatsNew", status: "new"},
            {title: "Resources", url: "/docs/resources", icon: "resources"},
            {title: "Templates", url: "/templates", icon: "templates"},
        ],
    },
    {
        title: "Components",
        items: [{title: "All components", url: "/components/all-components"}],
        groups: [
            {
                label: "Form",
                items: [
                    {title: "Input", url: "/components/input-text"},
                    {title: "Textarea", url: "/components/input-textarea"},
                    {title: "Number input", url: "/components/input-number"},
                    {title: "Checkbox", url: "/components/input-checkbox"},
                    {title: "Switch", url: "/components/input-switch"},
                    {title: "Strong password", url: "/components/strong-password"},
                    {title: "Select", url: "/components/input-select"},
                    {title: "Radio", url: "/components/input-radio"},
                    {title: "Range", url: "/components/input-range"},
                    {title: "File input", url: "/components/input-file"},
                    {title: "OTP input", url: "/components/otp-input"},
                ],
            },
            {
                label: "Buttons",
                items: [
                    {title: "Button", url: "/components/normal-button"},
                    {title: "Login button", url: "/components/login-buttons"},
                    {title: "Dropdown button", url: "/components/dropdown-button"},
                    {title: "Animated button", url: "/components/animated-button", status: "updated"},
                ],
            },
            {
                label: "Surfaces",
                items: [
                    {title: "Drag and drop", url: "/components/drag-and-drop"},
                    {title: "Comparison card", url: "/components/comparison-card"},
                    {title: "Cards", url: "/components/cards"},
                    {title: "Drawer", url: "/components/drawer", status: "new"},
                    {title: "Animated cards", url: "/components/animated-cards"},
                    {title: "Image cropper", url: "/components/image-cropper"},
                    {title: "Accordion", url: "/components/according"},
                    {title: "App bar", url: "/components/appbar"},
                    {title: "Image gallery", url: "/components/image-gallery"},
                    {title: "Carousel", url: "/components/carousel", status: "updated"},
                ],
            },
            {
                label: "Navigation",
                items: [
                    {title: "Pagination", url: "/components/pagination"},
                    {title: "Progress bar", url: "/components/progress-bar", status: "updated"},
                    {title: "Chip", url: "/components/chip"},
                    {title: "Marquee", url: "/components/marquee"},
                    {title: "Timer", url: "/components/timer"},
                    {title: "Breadcrumb", url: "/components/breadcrumb", status: "updated"},
                    {title: "Rating", url: "/components/rating"},
                    {title: "Stepper", url: "/components/stepper"},
                    {title: "Modal", url: "/components/modal", status: "updated"},
                    {title: "Tabs", url: "/components/tabs"},
                ],
            },
            {
                label: "Feedback",
                items: [
                    {title: "Context menu", url: "/components/context-menu"},
                    {title: "Skeleton", url: "/components/skeleton"},
                    {title: "Tree dropdown", url: "/components/tree-dropdown"},
                    {title: "Alert", url: "/components/alert-message"},
                    {title: "Dialog", url: "/components/dialog-message"},
                    {title: "Testimonial", url: "/components/testimonials"},
                    {title: "Loader", url: "/components/loader"},
                    {title: "Notification", url: "/components/notification"},
                    {title: "Toast", url: "/components/toast", status: "new"},
                ],
            },
            {
                label: "Data display",
                items: [
                    {title: "Badge", url: "/components/badge"},
                    {title: "Table", url: "/components/table"},
                    {title: "Undo and redo", url: "/components/redo-undo"},
                    {title: "GitHub activity graph", url: "/components/github-activity-graph"},
                    {title: "Tooltip", url: "/components/tooltip"},
                    {title: "Pie chart", url: "/components/pie-chart"},
                    {title: "Graph chart", url: "/components/graph-chart", status: "new"},
                    {title: "Timeline", url: "/components/timeline"},
                    {title: "Calendar", url: "/components/calendar", status: "new"},
                ],
            },
            {
                label: "E-commerce",
                items: [
                    {title: "Product card", url: "/components/product-card"},
                    {title: "Ads card", url: "/components/ads-card"},
                ],
            },
            {
                label: "Other",
                items: [
                    {title: "Code block", url: "/components/code"},
                    {title: "Snippet", url: "/components/snippet"},
                ],
            },
        ],
    },
    {
        title: "Animations",
        items: [
            {title: "All animations", url: "/animations/all-animations"},
            {title: "Installation", url: "/animations/installation"},
        ],
        groups: [
            {
                label: "Cards",
                items: [
                    {title: "Magic card", url: "/animations/magic-card"},
                    {title: "Reveal card", url: "/animations/reveal-card"},
                    {title: "Magnet card", url: "/animations/magnet-card"},
                ],
            },
            {
                label: "Layouts",
                items: [
                    {title: "Sorting", url: "/animations/sorting-animation"},
                    {title: "Layout switcher", url: "/animations/layout-switcher"},
                    {title: "Drag", url: "/animations/drag-animations"},
                    {title: "Accordion", url: "/animations/animated-accordion"},
                ],
            },
            {
                label: "Buttons",
                items: [
                    {title: "Reaction trail", url: "/animations/reaction-trail", status: "updated"},
                    {title: "Hover effects", url: "/animations/hover-effects"},
                ],
            },
            {
                label: "Visuals",
                items: [
                    {title: "Text effects", url: "/animations/text-effects", status: "updated"},
                    {title: "Backgrounds", url: "/animations/background-animations"},
                    {title: "Chat screen", url: "/animations/chat-screen"},
                    {title: "Dropdowns", url: "/animations/dropdown-animations"},
                    {title: "Mouse navigation", url: "/animations/mouse-navigations", status: "new"},
                    {title: "Gallery view", url: "/animations/gallery-view"},
                    {title: "Search placeholder", url: "/animations/search-placeholder", status: "new"},
                ],
            },
        ],
    },
    {
        title: "Blocks",
        items: [{title: "All blocks", url: "/blocks/all-blocks"}],
        groups: [
            {
                label: "Sections",
                items: [
                    {title: "Navbar", url: "/blocks/responsive-navbar"},
                    {title: "Hero", url: "/blocks/hero-section"},
                    {title: "Pricing", url: "/blocks/pricing-section"},
                    {title: "Footer", url: "/blocks/responsive-footer"},
                ],
            },
            {
                label: "Forms",
                items: [
                    {title: "Contact form", url: "/blocks/contact-form"},
                    {title: "Multi-step form", url: "/blocks/multi-step-form"},
                    {title: "Newsletter form", url: "/blocks/newsletter-form"},
                ],
            },
            {
                label: "Empty states",
                items: [
                    {title: "404 page", url: "/blocks/404-page"},
                    {title: "Empty page", url: "/blocks/empty-page"},
                ],
            },
            {
                label: "E-commerce",
                items: [
                    {title: "Offer grid", url: "/blocks/offer-grid"},
                    {title: "Product details", url: "/blocks/product-details-page"},
                    {title: "Checkout", url: "/blocks/checkout-page"},
                ],
            },
            {
                label: "Other",
                items: [
                    {title: "Search bar", url: "/blocks/responsive-search-bar"},
                    {title: "Sidebar", url: "/blocks/responsive-sidebar"},
                ],
            },
        ],
    },
];

// Add pages registered in src/Examples to their section, creating groups that don't exist yet. A page that replaces
// a legacy page at the same URL takes over that sidebar entry in place, so the reading order stays the same.
for (const page of examplePages) {
    const section = docsNavigation.find((entry) => entry.title === page.section);
    if (!section || page.unlisted) continue;
    const url = examplePagePath(page);
    const existing = [...section.items, ...(section.groups ?? []).flatMap((entry) => entry.items)].find((item) => item.url === url);
    if (existing) {
        existing.title = page.title;
        if (page.status) existing.status = page.status;
        continue;
    }
    section.groups ??= [];
    let group = section.groups.find((entry) => entry.label === page.group);
    if (!group) {
        group = {label: page.group, items: []};
        section.groups.push(group);
    }
    group.items.push({title: page.title, url: examplePagePath(page), ...(page.status ? {status: page.status} : {})});
}

export const toolsNavigation = [
    {title: "ShortKey", url: "/shortcut-generator", description: "Turn a key combination into a ready-to-use handler.", icon: "keyboard"},
    {title: "Color palette", url: "/color-palette", description: "Shades, opacity steps and colors pulled from an image.", icon: "palette"},
    {title: "Icons", url: "/icons", description: "400+ SVG icons you can resize, recolor and copy.", icon: "icons"},
    {title: "Config AI", url: "/config-generator", description: "Describe a brand and get a Tailwind CSS v4 theme back.", icon: "config", status: "updated"},
    {title: "Semantic TagMaster", url: "/semantic-tag-master", description: "When to use each semantic HTML tag, with examples.", icon: "html"},
];

/** Every page in reading order, with its section and group for breadcrumbs. */
export interface FlatNavItem extends NavItem {
    section: string;
    group?: string;
}

export const flatDocsNavigation: FlatNavItem[] = docsNavigation.flatMap((section) => [
    ...section.items.map((item) => ({...item, section: section.title})),
    ...(section.groups ?? []).flatMap((group) =>
        group.items.map((item) => ({...item, section: section.title, group: group.label}))
    ),
]);

export const findDocsPage = (pathname) => {
    const index = flatDocsNavigation.findIndex((item) => item.url === pathname);
    if (index === -1) return null;
    return {
        page: flatDocsNavigation[index],
        previous: flatDocsNavigation[index - 1] ?? null,
        next: flatDocsNavigation[index + 1] ?? null,
    };
};
