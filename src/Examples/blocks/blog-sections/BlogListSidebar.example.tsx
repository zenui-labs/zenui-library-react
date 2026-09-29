import {BlogListSidebar, type ListPost, type PopularTag, type PostCategory} from "./BlogListSidebar";

const posts: ListPost[] = [
    {slug: "invoice-reminders", category: "Guides", title: "How to write invoice reminders that get paid", excerpt: "Five templates, the send schedule we tested across 12,000 invoices, and the one sentence that cut late payments by a third.", author: "Rosa Delgado", date: "Sep 24, 2026", minutes: 8},
    {slug: "multi-currency", category: "Product updates", title: "Multi-currency invoices are here", excerpt: "Bill clients in 38 currencies, lock exchange rates at send time and reconcile payouts in your home currency.", author: "Ethan Brooks", date: "Sep 17, 2026", minutes: 4},
    {slug: "studio-kaya", category: "Customer stories", title: "How Studio Kaya closed their books in two days, not two weeks", excerpt: "A 14 person design studio in Lisbon on replacing three tools with one and getting Fridays back.", author: "Rosa Delgado", date: "Sep 10, 2026", minutes: 6},
    {slug: "ledger-rewrite", category: "Engineering", title: "Rewriting our ledger without stopping the money", excerpt: "Double entry, idempotency keys and the shadow write period that let us migrate 41 million entries safely.", author: "Kenji Watanabe", date: "Sep 2, 2026", minutes: 15},
    {slug: "quarterly-taxes", category: "Guides", title: "Estimated quarterly taxes for freelancers, explained", excerpt: "When they are due, how to calculate them and how to set money aside automatically from every payment.", author: "Amara Nwosu", date: "Aug 26, 2026", minutes: 10},
    {slug: "support-engineer", category: "Hiring", title: "We are hiring a support engineer in Toronto", excerpt: "Help 40,000 small businesses get paid. Hybrid, with a real on-call rotation and a real budget for learning.", author: "Ethan Brooks", date: "Aug 19, 2026", minutes: 3},
    {slug: "recurring-billing", category: "Product updates", title: "Recurring billing now supports usage-based line items", excerpt: "Send a monthly invoice that adds metered usage on top of a fixed retainer, calculated on the last day of the period.", author: "Ethan Brooks", date: "Aug 12, 2026", minutes: 5},
    {slug: "bakery", category: "Customer stories", title: "A bakery, three locations and one shared cash drawer", excerpt: "Why Pan de Casa moved wholesale orders to Tally and what they learned about net 30 terms.", author: "Amara Nwosu", date: "Aug 5, 2026", minutes: 7},
];

const categories: PostCategory[] = [
    {name: "Guides", color: "bg-sky-500"},
    {name: "Product updates", color: "bg-violet-500"},
    {name: "Customer stories", color: "bg-amber-500"},
    {name: "Engineering", color: "bg-emerald-500"},
    {name: "Hiring", color: "bg-rose-500"},
];

const tags: PopularTag[] = [
    {label: "Invoicing"},
    {label: "Taxes"},
    {label: "Payments"},
    {label: "Reconciliation"},
    {label: "Freelancing", query: "freelancer"},
    {label: "Pricing"},
];

const BlogListSidebarExample = () => <BlogListSidebar posts={posts} categories={categories} tags={tags}/>;

export default BlogListSidebarExample;
