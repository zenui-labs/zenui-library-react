import {ChangelogTimeline, type Release} from "./ChangelogTimeline";

const releases: Release[] = [
    {
        version: "3.18",
        date: "Sep 24, 2026",
        title: "Recurring issues and faster search",
        summary: "Set an issue to repeat weekly or monthly, and search now returns results as you type across every project.",
        latest: true,
        changes: [
            {kind: "New", text: "Recurring issues with custom schedules"},
            {kind: "Improved", text: "Search is 4 times faster on workspaces with over 50,000 issues"},
            {kind: "Fixed", text: "Due dates no longer shift by a day for users east of UTC"},
        ],
    },
    {
        version: "3.17",
        date: "Sep 10, 2026",
        title: "Project templates",
        summary: "Save any project as a template with its views, labels and automations, then reuse it across teams.",
        changes: [
            {kind: "New", text: "Project templates with default assignees"},
            {kind: "Improved", text: "Bulk edit now supports up to 500 issues at once"},
        ],
    },
    {
        version: "3.16",
        date: "Aug 27, 2026",
        title: "Audit log export",
        summary: "Admins on the Business plan can export the audit log as CSV or stream it to their SIEM.",
        changes: [
            {kind: "New", text: "Audit log export and streaming"},
            {kind: "Fixed", text: "Slack previews show the correct issue status"},
            {kind: "Fixed", text: "Keyboard shortcuts work again inside the command menu"},
        ],
    },
    {
        version: "3.15",
        date: "Aug 12, 2026",
        title: "Cycle reports",
        summary: "See scope changes, carry-over and completion rate for every cycle, with a chart you can paste into a doc.",
        changes: [
            {kind: "New", text: "Cycle reports with scope change tracking"},
            {kind: "Improved", text: "Faster load times for the roadmap view"},
        ],
    },
];

const ChangelogTimelineExample = () => <ChangelogTimeline releases={releases}/>;

export default ChangelogTimelineExample;
