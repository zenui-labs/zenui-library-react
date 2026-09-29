import {ChatThread, type ChatAgent, type ChatMessage} from "./ChatThread";

const agent: ChatAgent = {name: "Sam Morgan", subtitle: "Billing support, usually replies in 2 min"};

const messages: ChatMessage[] = [
    {id: 1, author: "agent", text: "Hi Jordan, I'm Sam from Fieldnote billing. What can I help with?"},
    {id: 2, author: "you", text: "Our March invoice shows 14 seats, but we only have 11 people."},
    {id: 3, author: "agent", text: "Let me check. Three seats were added on March 2 and never removed."},
    {id: 4, author: "agent", text: "I removed them and refunded $54.00 to the card ending in 4242."},
    {id: 5, author: "you", text: "That was quick, thank you."},
    {id: 6, author: "agent", text: "Happy to help. The refund shows up in 3 to 5 business days."},
];

const ChatThreadExample = () => <ChatThread messages={messages} agent={agent}/>;

export default ChatThreadExample;
