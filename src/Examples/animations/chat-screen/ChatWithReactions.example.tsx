import {ChatWithReactions, type ChatMessage, type ChatUser} from "./ChatWithReactions";

const jane: ChatUser = {name: "Jane", avatar: "https://i.pravatar.cc/40?img=5"};
const you: ChatUser = {name: "You", avatar: "https://i.pravatar.cc/40?img=1"};

const now = new Date().toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"});

const messages: ChatMessage[] = [
    {id: "1", text: "Hey there, how's it going?", sender: "other", author: jane, timestamp: now},
    {id: "2", text: "How do you handle theming in ZenUI components?", sender: "other", author: jane, timestamp: now},
    {id: "3", text: "Does ZenUI support responsive design out of the box?", sender: "other", author: jane, timestamp: now},
];

const ChatWithReactionsExample = () => <ChatWithReactions defaultMessages={messages} currentUser={you}/>;

export default ChatWithReactionsExample;
