import {SocialPostGrid, type SocialPost} from "./SocialPostGrid";

const posts: SocialPost[] = [
    {id: "p1", name: "Dana Whitfield", handle: "danawhit", initials: "DW", avatar: "from-pink-400 to-rose-500", verified: true, text: "Moved our docs site to @inkwell over the weekend. Search went from 'useless' to 'people actually use it'. Build time 4m to 38s. #docs", date: "Sep 21", replies: 14, reposts: 32, likes: 418},
    {id: "p2", name: "Oscar Pham", handle: "oscarbuilds", initials: "OP", avatar: "from-sky-400 to-blue-600", text: "The versioned docs feature in @inkwell is exactly what we needed. v2 and v3 side by side, one config line.", date: "Sep 19", replies: 3, reposts: 8, likes: 96},
    {id: "p3", name: "Priya Anand", handle: "priya_dx", initials: "PA", avatar: "from-emerald-400 to-teal-600", verified: true, text: "Hot take: your API reference should be generated from the OpenAPI spec, and your guides should be written by humans. @inkwell is the first tool I've used that treats those as different jobs.", date: "Sep 17", replies: 41, reposts: 77, likes: 1204, attachment: {title: "API reference", caption: "Generated from openapi.yaml · 214 endpoints", code: "GET /v2/invoices/{id}"}},
    {id: "p4", name: "Marco Bellini", handle: "marcob", initials: "MB", avatar: "from-amber-400 to-orange-500", text: "Support tickets tagged 'how do I' dropped 30% in the month after we relaunched our docs. Not a coincidence. #devrel", date: "Sep 12", replies: 9, reposts: 21, likes: 233},
    {id: "p5", name: "Yuki Tanaka", handle: "yukit", initials: "YT", avatar: "from-violet-400 to-purple-600", text: "Tiny thing I love: every code block in @inkwell has a copy button that strips the shell prompt. Someone there has pasted a $ into a terminal before.", date: "Sep 9", replies: 6, reposts: 12, likes: 187},
    {id: "p6", name: "Ben Carter", handle: "bencodes", initials: "BC", avatar: "from-cyan-400 to-sky-600", verified: true, text: "We localized our docs into 6 languages with the translation workflow. Reviewers get a diff per page instead of a 400 page PDF. #i18n", date: "Sep 4", replies: 5, reposts: 18, likes: 142},
];

const SocialPostGridExample = () => (
    <SocialPostGrid posts={posts} moreLink={{label: "Read more from the community", href: "#"}}/>
);

export default SocialPostGridExample;
