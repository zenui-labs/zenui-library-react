import {LuActivity, LuBike, LuCompass, LuDumbbell, LuFootprints, LuSun, LuUser, LuWaves} from "react-icons/lu";
import {MobileBottomNav} from "./MobileBottomNav";
import type {MobileDayValue, MobileFeedItem, MobilePlanItem, MobileProgram, MobileTab, MobileWorkoutType} from "./MobileBottomNav";

const tabs: MobileTab[] = [
    {id: "Today", icon: LuSun},
    {id: "Explore", icon: LuCompass},
    {id: "Activity", icon: LuActivity, badge: 2},
    {id: "Profile", icon: LuUser},
];

const plan: MobilePlanItem[] = [
    {id: "walk", title: "Morning walk", detail: "30 min, easy pace"},
    {id: "core", title: "Core circuit", detail: "4 rounds, 12 min"},
    {id: "stretch", title: "Evening stretch", detail: "10 min, hips and back"},
];

const programs: MobileProgram[] = [
    {title: "Couch to 5K, week 3", meta: "24 min, beginner", tone: "from-orange-400 to-rose-500"},
    {title: "Mobility for desk days", meta: "15 min, all levels", tone: "from-lime-400 to-emerald-500"},
    {title: "Hill intervals", meta: "32 min, intermediate", tone: "from-sky-400 to-indigo-500"},
];

const week: MobileDayValue[] = [
    {day: "M", value: 42}, {day: "T", value: 68}, {day: "W", value: 30}, {day: "T", value: 84},
    {day: "F", value: 56}, {day: "S", value: 92, highlight: true}, {day: "S", value: 64},
];

const feed: MobileFeedItem[] = [
    {text: "Maya liked your ride", when: "12 min ago", fresh: true},
    {text: "You earned the 5 day streak badge", when: "This morning", fresh: true},
    {text: "Leo finished Couch to 5K", when: "Yesterday"},
];

const workouts: MobileWorkoutType[] = [
    {label: "Run", icon: LuFootprints, tone: "bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300"},
    {label: "Ride", icon: LuBike, tone: "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300"},
    {label: "Swim", icon: LuWaves, tone: "bg-cyan-100 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-300"},
    {label: "Strength", icon: LuDumbbell, tone: "bg-lime-100 text-lime-700 dark:bg-lime-500/15 dark:text-lime-300"},
];

const MobileBottomNavExample = () => (
    <MobileBottomNav
        tabs={tabs}
        date="Tuesday, September 29"
        goals={[{label: "Steps", value: 7214, goal: 10000}, {label: "Active minutes", value: 27, goal: 60}]}
        plan={plan}
        defaultCompleted={["walk"]}
        streakMessage="You have moved 5 days in a row. Two more for a new personal best."
        programs={programs}
        week={week}
        feed={feed}
        profile={{name: "Ana Ribeiro", initials: "AR", subtitle: "Member since March 2025"}}
        stats={[{label: "Workouts", value: "184"}, {label: "Hours", value: "97"}, {label: "Best streak", value: "21"}]}
        workouts={workouts}
        searchPlaceholder="Search 600 workouts"
    />
);

export default MobileBottomNavExample;
