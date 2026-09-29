import {LuBell, LuCalendarPlus, LuCamera, LuCompass, LuPenLine, LuSearch, LuUser} from "react-icons/lu";
import {MobileTabBar, type MobileTab, type QuickAction} from "./MobileTabBar";

const guides = [
    {title: "Coastal trails near Big Sur", meta: "12 routes, 4 to 9 miles", art: "from-sky-400 to-emerald-400"},
    {title: "Weekend in Oaxaca", meta: "Food, markets and mezcal", art: "from-amber-300 to-rose-400"},
];
const recent = ["Lisbon in three days", "Night markets in Taipei", "Dolomites hut to hut"];
const activity = [
    {who: "Leah", what: "saved your Oaxaca guide", when: "2m"},
    {who: "Sam", what: "invited you to Tahoe trip", when: "1h"},
    {who: "Noor", what: "commented on Big Sur trails", when: "3h"},
];
const stats = [["128", "Guides"], ["2.4k", "Followers"], ["19", "Countries"]];

const tabs: MobileTab[] = [
    {
        id: "explore",
        label: "Explore",
        icon: LuCompass,
        content: (
            <div className="space-y-3">
                {guides.map((card) => (
                    <div key={card.title} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100 dark:bg-slate-900 dark:ring-slate-800">
                        <div className={`h-24 bg-gradient-to-br ${card.art}`}/>
                        <div className="p-3">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{card.title}</p>
                            <p className="text-xs text-gray-500 dark:text-slate-400">{card.meta}</p>
                        </div>
                    </div>
                ))}
            </div>
        ),
    },
    {
        id: "search",
        label: "Search",
        icon: LuSearch,
        content: (
            <div>
                <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-2.5 text-sm text-gray-400 ring-1 ring-gray-200 dark:bg-slate-900 dark:text-slate-500 dark:ring-slate-800">
                    <LuSearch className="h-4 w-4" aria-hidden="true"/>
                    Places, guides, people
                </div>
                <p className="mt-5 text-xs font-medium uppercase tracking-wider text-gray-400 dark:text-slate-500">Recent</p>
                <ul className="mt-2 space-y-2.5 text-sm text-gray-700 dark:text-slate-300">
                    {recent.map((item) => (
                        <li key={item}>{item}</li>
                    ))}
                </ul>
            </div>
        ),
    },
    {
        id: "inbox",
        label: "Inbox",
        icon: LuBell,
        content: (
            <ul className="space-y-2">
                {activity.map((item) => (
                    <li key={item.who} className="flex items-center gap-3 rounded-xl bg-white p-3 ring-1 ring-gray-100 dark:bg-slate-900 dark:ring-slate-800">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 text-xs font-semibold text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300">{item.who[0]}</span>
                        <span className="flex-1 text-xs text-gray-700 dark:text-slate-300">
                            <span className="font-semibold text-gray-900 dark:text-white">{item.who}</span> {item.what}
                        </span>
                        <span className="text-[10px] text-gray-400">{item.when}</span>
                    </li>
                ))}
            </ul>
        ),
    },
    {
        id: "profile",
        label: "Profile",
        icon: LuUser,
        content: (
            <div className="flex flex-col items-center pt-4 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-400 to-fuchsia-500 text-lg font-semibold text-white">MR</span>
                <p className="mt-3 font-semibold text-gray-900 dark:text-white">Mara Reyes</p>
                <p className="text-xs text-gray-500 dark:text-slate-400">Oakland, 41 trips</p>
                <div className="mt-5 grid w-full grid-cols-3 gap-2 text-center">
                    {stats.map(([value, label]) => (
                        <div key={label} className="rounded-xl bg-white py-2 ring-1 ring-gray-100 dark:bg-slate-900 dark:ring-slate-800">
                            <p className="text-sm font-semibold text-gray-900 dark:text-white">{value}</p>
                            <p className="text-[10px] text-gray-500 dark:text-slate-400">{label}</p>
                        </div>
                    ))}
                </div>
            </div>
        ),
    },
];

const actions: QuickAction[] = [
    {label: "Photo", icon: LuCamera, x: -76, y: -64},
    {label: "Note", icon: LuPenLine, x: 0, y: -96},
    {label: "Event", icon: LuCalendarPlus, x: 76, y: -64},
];

const MobileTabBarExample = () => <MobileTabBar tabs={tabs} actions={actions}/>;

export default MobileTabBarExample;
