import {MessageBadge} from "./MessageBadge";

const MessageBadgeExample = () => (
    <div className="flex items-center flex-col gap-5 justify-center">
        <MessageBadge count={10}/>
        <MessageBadge/>
    </div>
);

export default MessageBadgeExample;
