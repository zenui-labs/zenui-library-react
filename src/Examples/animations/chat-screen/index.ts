import type {Example} from "../../types.ts";
import ChatWithReactions from "./ChatWithReactions.example.tsx";
import chatWithReactionsSource from "./ChatWithReactions.example.tsx?raw";
import chatWithReactionsComponentSource from "./ChatWithReactions.tsx?raw";
import ChatWithAttachments from "./ChatWithAttachments.example.tsx";
import chatWithAttachmentsSource from "./ChatWithAttachments.example.tsx?raw";
import chatWithAttachmentsComponentSource from "./ChatWithAttachments.tsx?raw";

const examples: Example[] = [
    {
        id: "chat-screen-with-reaction-system",
        title: "Chat screen with reactions",
        description: "A chat thread where messages slide in from the sender's side and incoming messages take an emoji reaction from a small menu.",
        component: ChatWithReactions,
        source: chatWithReactionsSource,
        files: [{name: "ChatWithReactions.tsx", source: chatWithReactionsComponentSource}],
        minHeight: 440,
    },
    {
        id: "chat-screen-with-file-select-and-batch-processing",
        title: "Chat screen with file attachments",
        description: "A chat thread that takes several files at once. They upload as a batch, wait above the input and are sent with the next message.",
        component: ChatWithAttachments,
        source: chatWithAttachmentsSource,
        files: [{name: "ChatWithAttachments.tsx", source: chatWithAttachmentsComponentSource}],
        minHeight: 480,
    },
];

export default examples;
