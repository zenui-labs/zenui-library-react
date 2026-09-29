import {useEffect, useRef, useState} from "react";
import {useInView} from "framer-motion";
import {LuCalendar, LuCamera, LuFolder, LuMail, LuMessageCircle, LuMusic, LuNewspaper} from "react-icons/lu";
import {LiveBadgeDock, type LiveBadgeApp} from "./LiveBadgeDock";

const apps: LiveBadgeApp[] = [
    {id: "files", name: "Files", icon: LuFolder, tint: "bg-sky-500"},
    {id: "mail", name: "Mail", icon: LuMail, tint: "bg-blue-600"},
    {id: "chat", name: "Chat", icon: LuMessageCircle, tint: "bg-emerald-500"},
    {id: "calendar", name: "Calendar", icon: LuCalendar, tint: "bg-rose-500"},
    {id: "news", name: "News", icon: LuNewspaper, tint: "bg-orange-500"},
    {id: "camera", name: "Camera", icon: LuCamera, tint: "bg-zinc-700"},
    {id: "music", name: "Music", icon: LuMusic, tint: "bg-pink-500"},
];

// Apps that receive the simulated notifications below.
const notifying = ["mail", "chat", "calendar"];

const LiveBadgeDockExample = () => {
    const ref = useRef<HTMLElement>(null);
    const inView = useInView(ref);
    const [activeId, setActiveId] = useState("files");
    const [badges, setBadges] = useState<Record<string, number>>({mail: 2, chat: 0, calendar: 1});

    // Stands in for a real feed: every few seconds an app in the background gets a notification.
    useEffect(() => {
        if (!inView) return;
        const id = window.setInterval(() => {
            if (document.hidden) return;
            const candidates = notifying.filter((appId) => appId !== activeId);
            const appId = candidates[Math.floor(Math.random() * candidates.length)];
            if (!appId) return;
            setBadges((current) => ({...current, [appId]: Math.min((current[appId] ?? 0) + 1, 99)}));
        }, 3200);
        return () => window.clearInterval(id);
    }, [inView, activeId]);

    return (
        <LiveBadgeDock
            ref={ref}
            apps={apps}
            defaultOpenIds={["files", "mail"]}
            activeId={activeId}
            onActiveChange={setActiveId}
            badges={badges}
            onBadgesChange={setBadges}
        />
    );
};

export default LiveBadgeDockExample;
