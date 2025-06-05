import {
    AnimationRoutes,
    BlockRoutes,
    ButtonRoutes,
    DataDisplayRoutes,
    DocsRoutes,
    ECommerceBlockRoutes,
    ECommerceComponentRoutes,
    FeedbackRoutes,
    InputRoutes,
    NavigationRoutes,
    RandomComponentRoutes,
    SurfaceRoutes,
} from '@/Routes/RouteConfig.js';

function routeToSearchData(route) {
    const path = route.path.replace(/^\//, '');
    let title = path
        .split('/')
        .pop()
        ?.replace(/-/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase()) ?? '';

    let description = `Page for ${title}`;
    let matched = [];

    if (route.path.startsWith('/docs/')) {
        matched = ['documentation', 'docs'];
        description = `Documentation page: ${title}`;
    } else if (route.path.startsWith('/components/')) {
        matched = ['component', 'ui', 'react', 'nextjs'];
        description = `Component example: ${title}`;
    } else if (route.path.startsWith('/blocks/')) {
        matched = ['block', 'layout', 'section'];
        description = `Block example: ${title}`;
    } else if (route.path.startsWith('/animations/')) {
        matched = ['animation', 'visual', 'effect'];
        description = `Animation example: ${title}`;
    }

    return {
        title: title,
        description: description,
        url: route.path,
        tags: matched,
    };
}

const componentsRoutes = [
    ...InputRoutes,
    ...ButtonRoutes,
    ...NavigationRoutes,
    ...FeedbackRoutes,
    ...SurfaceRoutes,
    ...DataDisplayRoutes,
    ...ECommerceComponentRoutes,
    ...RandomComponentRoutes,
];

const animationsRoutes = [
    ...AnimationRoutes
];

const blocksRoutes = [
    ...BlockRoutes,
    ...ECommerceBlockRoutes
];

const docsRoutes = [
    ...DocsRoutes,
];

// Build the search data
export const docsSearchData = docsRoutes.map(routeToSearchData);
export const componentsSearchData = componentsRoutes.map(routeToSearchData);
export const animationsSearchData = animationsRoutes.map(routeToSearchData);
export const blocksSearchData = blocksRoutes.map(routeToSearchData);

export default {docsSearchData, componentsSearchData, animationsSearchData, blocksSearchData};