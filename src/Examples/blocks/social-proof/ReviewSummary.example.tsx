import {ReviewSummary, type AspectScore, type RatingDistribution, type Review} from "./ReviewSummary";

const reviews: Review[] = [
    {id: "r1", name: "Lena Fischer", role: "Operations lead, 40 person agency", rating: 5, title: "Replaced three tools for us", body: "Time tracking, invoicing and capacity planning finally live in one place. Our project managers stopped keeping side spreadsheets within a month.", date: "Sep 18, 2026", iso: "2026-09-18", helpful: 24, verified: true},
    {id: "r2", name: "Rahul Mehta", role: "Founder, design studio", rating: 5, title: "Invoices go out the day a project ends", body: "Billable hours flow straight into invoices. We get paid about 12 days faster than last year.", date: "Sep 2, 2026", iso: "2026-09-02", helpful: 17, verified: true},
    {id: "r3", name: "Grace Nakamura", role: "Finance manager", rating: 4, title: "Great reports, a few rough edges", body: "The profitability report is the best I have used. Exporting to our accounting system needs a manual mapping step that I hope they automate.", date: "Aug 27, 2026", iso: "2026-08-27", helpful: 9, verified: true},
    {id: "r4", name: "Tom Albright", role: "Developer, consultancy", rating: 5, title: "The timer just works", body: "Browser extension, desktop app and phone all stay in sync. I have not lost a tracked hour since we switched.", date: "Aug 11, 2026", iso: "2026-08-11", helpful: 6, verified: false},
    {id: "r5", name: "Sofia Marino", role: "Studio manager", rating: 3, title: "Good, but mobile needs work", body: "Desktop is excellent. Approving timesheets on the phone takes too many taps, which matters when I am on site with clients.", date: "Jul 30, 2026", iso: "2026-07-30", helpful: 12, verified: true},
    {id: "r6", name: "Kwame Asante", role: "COO, engineering firm", rating: 2, title: "Onboarding took longer than promised", body: "The product is solid once it is set up, but importing five years of project history took us three weeks and several support calls.", date: "Jul 14, 2026", iso: "2026-07-14", helpful: 8, verified: true},
];

// Distribution across all 1,286 reviews, used for the bars and the average.
const distribution: RatingDistribution = {5: 934, 4: 241, 3: 72, 2: 27, 1: 12};

const aspects: AspectScore[] = [
    {label: "Ease of use", score: 4.8},
    {label: "Customer support", score: 4.7},
    {label: "Value for money", score: 4.5},
    {label: "Setup", score: 4.1},
];

const ReviewSummaryExample = () => <ReviewSummary reviews={reviews} distribution={distribution} aspects={aspects}/>;

export default ReviewSummaryExample;
