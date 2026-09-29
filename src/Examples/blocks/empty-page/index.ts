import type {Example} from "../../types.ts";
import NoTransactions from "./NoTransactions.example.tsx";
import noTransactionsSource from "./NoTransactions.example.tsx?raw";
import noTransactionsComponentSource from "./NoTransactions.tsx?raw";
import NoTasksLeft from "./NoTasksLeft.example.tsx";
import noTasksLeftSource from "./NoTasksLeft.example.tsx?raw";
import noTasksLeftComponentSource from "./NoTasksLeft.tsx?raw";
import EmptyPlaylist from "./EmptyPlaylist.example.tsx";
import emptyPlaylistSource from "./EmptyPlaylist.example.tsx?raw";
import emptyPlaylistComponentSource from "./EmptyPlaylist.tsx?raw";
import SignInRequired from "./SignInRequired.example.tsx";
import signInRequiredSource from "./SignInRequired.example.tsx?raw";
import signInRequiredComponentSource from "./SignInRequired.tsx?raw";
import NoMessages from "./NoMessages.example.tsx";
import noMessagesSource from "./NoMessages.example.tsx?raw";
import noMessagesComponentSource from "./NoMessages.tsx?raw";
import ResultNotFound from "./ResultNotFound.example.tsx";
import resultNotFoundSource from "./ResultNotFound.example.tsx?raw";
import resultNotFoundComponentSource from "./ResultNotFound.tsx?raw";
import EmptyInbox from "./EmptyInbox.example.tsx";
import emptyInboxSource from "./EmptyInbox.example.tsx?raw";
import emptyInboxComponentSource from "./EmptyInbox.tsx?raw";
import NoFavorites from "./NoFavorites.example.tsx";
import noFavoritesSource from "./NoFavorites.example.tsx?raw";
import noFavoritesComponentSource from "./NoFavorites.tsx?raw";
import SuccessState from "./SuccessState.example.tsx";
import successStateSource from "./SuccessState.example.tsx?raw";
import successStateComponentSource from "./SuccessState.tsx?raw";

const examples: Example[] = [
    {
        id: "empty_page_1",
        title: "Empty page 1",
        description: "An empty state for a transactions list that points people to their first transfer. Pass an action to add a button or link below the text.",
        component: NoTransactions,
        source: noTransactionsSource,
        files: [{name: "NoTransactions.tsx", source: noTransactionsComponentSource}],
        minHeight: 460,
    },
    {
        id: "empty_page_2",
        title: "Empty page 2",
        description: "An empty state for a finished task list, with an illustration and a short note of thanks. Pass an action to add a button or link below the text.",
        component: NoTasksLeft,
        source: noTasksLeftSource,
        files: [{name: "NoTasksLeft.tsx", source: noTasksLeftComponentSource}],
        minHeight: 460,
    },
    {
        id: "empty_page_3",
        title: "Empty page 3",
        description: "An empty state for a playlist or collection that has nothing in it yet. Pass an action to add a button or link below the text.",
        component: EmptyPlaylist,
        source: emptyPlaylistSource,
        files: [{name: "EmptyPlaylist.tsx", source: emptyPlaylistComponentSource}],
        minHeight: 460,
    },
    {
        id: "empty_page_4",
        title: "Empty page 4",
        description: "An empty state for content that only shows up after people log in. Pass an action to add a button or link below the text.",
        component: SignInRequired,
        source: signInRequiredSource,
        files: [{name: "SignInRequired.tsx", source: signInRequiredComponentSource}],
        minHeight: 460,
    },
    {
        id: "empty_page_5",
        title: "Empty page 5",
        description: "An empty state for a message list that explains where new messages will appear. Pass an action to add a button or link below the text.",
        component: NoMessages,
        source: noMessagesSource,
        files: [{name: "NoMessages.tsx", source: noMessagesComponentSource}],
        minHeight: 460,
    },
    {
        id: "empty_page_6",
        title: "Empty page 6",
        description: "An empty state for a search or detail view when the requested data is not available. Pass an action to add a button or link below the text.",
        component: ResultNotFound,
        source: resultNotFoundSource,
        files: [{name: "ResultNotFound.tsx", source: resultNotFoundComponentSource}],
        minHeight: 460,
    },
    {
        id: "empty_page_7",
        title: "Empty page 7",
        description: "An empty state for a chat inbox that tells people how to start a conversation. Pass an action to add a button or link below the text.",
        component: EmptyInbox,
        source: emptyInboxSource,
        files: [{name: "EmptyInbox.tsx", source: emptyInboxComponentSource}],
        minHeight: 460,
    },
    {
        id: "empty_page_8",
        title: "Empty page 8",
        description: "An empty state for a favorites list that explains how to add the first item. Pass an action to add a button or link below the text.",
        component: NoFavorites,
        source: noFavoritesSource,
        files: [{name: "NoFavorites.tsx", source: noFavoritesComponentSource}],
        minHeight: 460,
    },
    {
        id: "empty_page_9",
        title: "Empty page 9",
        description: "A confirmation card with an illustration, shown after changes are saved. Pass an action to add a button or link below the text.",
        component: SuccessState,
        source: successStateSource,
        files: [{name: "SuccessState.tsx", source: successStateComponentSource}],
        minHeight: 460,
    },
];

export default examples;
