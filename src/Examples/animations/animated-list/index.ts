import type {Example} from "../../types.ts";
import NotificationStream from "./NotificationStream.example.tsx";
import notificationStreamSource from "./NotificationStream.example.tsx?raw";
import ChatThread from "./ChatThread.example.tsx";
import chatThreadSource from "./ChatThread.example.tsx?raw";
import ToastStack from "./ToastStack.example.tsx";
import toastStackSource from "./ToastStack.example.tsx?raw";
import LiveLeaderboard from "./LiveLeaderboard.example.tsx";
import liveLeaderboardSource from "./LiveLeaderboard.example.tsx?raw";
import SortableTodoList from "./SortableTodoList.example.tsx";
import sortableTodoListSource from "./SortableTodoList.example.tsx?raw";
import StaggeredSearch from "./StaggeredSearch.example.tsx";
import staggeredSearchSource from "./StaggeredSearch.example.tsx?raw";

const examples: Example[] = [
    {
        id: "notification-stream",
        title: "Notification stream",
        description: "New notifications drop in at the top and push older ones down. The feed pauses on hover and has a pause button.",
        component: NotificationStream,
        source: notificationStreamSource,
        minHeight: 400,
    },
    {
        id: "chat-thread",
        title: "Chat thread",
        description: "A support conversation plays itself out, with a typing indicator before each reply and bubbles that spring in from their own side. It starts when scrolled into view and can be replayed.",
        component: ChatThread,
        source: chatThreadSource,
        minHeight: 520,
    },
    {
        id: "toast-stack",
        title: "Toast stack",
        description: "Toasts pile up as a stack of cards and fan out on hover or focus, which also pauses their timers. Swipe a toast sideways to dismiss it.",
        component: ToastStack,
        source: toastStackSource,
        minHeight: 440,
    },
    {
        id: "live-leaderboard",
        title: "Live leaderboard",
        description: "A sales leaderboard that re-sorts as deals close. Rows slide to their new rank, totals count up and a badge shows how far each person moved.",
        component: LiveLeaderboard,
        source: liveLeaderboardSource,
        minHeight: 520,
    },
    {
        id: "sortable-todo-list",
        title: "Sortable to-do list",
        description: "Reorder tasks by dragging the handle or with the arrow keys. Checking a task draws the tick and a strike line, and removed tasks slide out while the rest close the gap.",
        component: SortableTodoList,
        source: sortableTodoListSource,
        minHeight: 480,
    },
    {
        id: "staggered-search",
        title: "Staggered search results",
        description: "A command palette where results cascade in after a short search delay, with skeleton rows while it waits. The active row highlight slides between results as you use the arrow keys.",
        component: StaggeredSearch,
        source: staggeredSearchSource,
        minHeight: 480,
    },
];

export default examples;
