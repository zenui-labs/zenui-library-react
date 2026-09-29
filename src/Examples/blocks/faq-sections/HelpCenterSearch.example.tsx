import {LuCreditCard, LuPlug, LuSettings, LuShieldCheck, LuSmartphone, LuUsers} from "react-icons/lu";
import {HelpCenterSearch, type HelpArticle, type HelpCategory} from "./HelpCenterSearch";

const articles: HelpArticle[] = [
    {id: "a1", title: "Invite teammates to your workspace", category: "Account", summary: "Send invites by email or share a link that only works for your company domain.", minutes: 2},
    {id: "a2", title: "Change your billing email or card", category: "Billing", summary: "Update payment details from Settings, Billing. Changes apply to the next invoice.", minutes: 1},
    {id: "a3", title: "Download past invoices", category: "Billing", summary: "Every invoice is available as a PDF for seven years, with your tax ID included.", minutes: 1},
    {id: "a4", title: "Connect Slack notifications", category: "Integrations", summary: "Choose which projects post to which channels, and mute updates outside work hours.", minutes: 3},
    {id: "a5", title: "Set up two factor authentication", category: "Security", summary: "Use an authenticator app or a hardware key. Admins can require it for everyone.", minutes: 2},
    {id: "a6", title: "Export all of your data", category: "Account", summary: "Request a full export as CSV and JSON. Large exports arrive by email within an hour.", minutes: 2},
    {id: "a7", title: "Use the mobile app offline", category: "Mobile", summary: "Recent projects sync to your phone and changes upload when you reconnect.", minutes: 3},
    {id: "a8", title: "Sync with Google Calendar", category: "Integrations", summary: "Due dates appear on your calendar and moving an event updates the task.", minutes: 2},
    {id: "a9", title: "Cancel or pause a subscription", category: "Billing", summary: "Pause for up to three months without losing data, or cancel at the end of the period.", minutes: 2},
    {id: "a10", title: "Add guests to a project", category: "Teams", summary: "Guests see only the projects you share with them and never count as a paid seat.", minutes: 2},
    {id: "a11", title: "Change a member's role", category: "Teams", summary: "Switch between Admin, Member and Viewer. Only admins can manage billing.", minutes: 1},
];

const categories: HelpCategory[] = [
    {name: "Account", icon: LuSettings, description: "Profile, workspace and data export"},
    {name: "Billing", icon: LuCreditCard, description: "Plans, invoices and payment methods"},
    {name: "Integrations", icon: LuPlug, description: "Slack, calendars and the API"},
    {name: "Security", icon: LuShieldCheck, description: "Sign in, SSO and permissions"},
    {name: "Mobile", icon: LuSmartphone, description: "iOS and Android apps"},
    {name: "Teams", icon: LuUsers, description: "Roles, guests and shared projects"},
];

const HelpCenterSearchExample = () => (
    <HelpCenterSearch articles={articles} categories={categories} popularIds={["a2", "a5", "a4", "a6"]}/>
);

export default HelpCenterSearchExample;
