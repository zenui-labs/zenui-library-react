import {MinimalArchive, type ArchiveAuthor, type ArchiveEntry} from "./MinimalArchive";

const author: ArchiveAuthor = {name: "Jonas Lindqvist", bio: "Staff engineer, writing since 2024"};

const entries: ArchiveEntry[] = [
    {slug: "boring-software", kind: "Essay", title: "In praise of boring software", date: "Sep 21", year: 2026, minutes: 9},
    {slug: "css-layers", kind: "Note", title: "Cascade layers finally made our CSS predictable", date: "Aug 30", year: 2026, minutes: 3},
    {slug: "local-first", kind: "Talk", title: "Local-first apps at scale, React Summit", date: "Jun 14", year: 2026, minutes: 28},
    {slug: "writing-rfcs", kind: "Essay", title: "How to write an RFC people will read", date: "May 2", year: 2026, minutes: 11},
    {slug: "sqlite-prod", kind: "Note", title: "Six months of SQLite in production", date: "Feb 9", year: 2026, minutes: 4},
    {slug: "second-system", kind: "Essay", title: "The second system is usually fine", date: "Nov 18", year: 2025, minutes: 7},
    {slug: "keyboard-first", kind: "Essay", title: "Designing keyboard-first interfaces", date: "Sep 3", year: 2025, minutes: 12},
    {slug: "dates", kind: "Note", title: "Store dates as dates, not strings", date: "Jul 22", year: 2025, minutes: 2},
    {slug: "state-machines", kind: "Talk", title: "State machines for UI developers, JSConf EU", date: "Apr 11", year: 2025, minutes: 32},
    {slug: "first-post", kind: "Note", title: "Starting a blog again", date: "Jan 1", year: 2024, minutes: 1},
];

const MinimalArchiveExample = () => <MinimalArchive entries={entries} author={author}/>;

export default MinimalArchiveExample;
