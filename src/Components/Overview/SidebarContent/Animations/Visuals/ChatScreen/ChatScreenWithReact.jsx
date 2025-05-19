import {useState, useRef, useEffect} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {LuHeart, LuSend, LuThumbsUp} from "react-icons/lu";
import {FaRegSmile} from "react-icons/fa";

const ChatScreenWithReact = () => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hey there! How's it going?",
            sender: 'other',
            senderProfile: {name: 'Jane', avatar: 'https://i.pravatar.cc/40?img=5'},
            timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
            reaction: null
        },
        {
            id: 2,
            text: "How do you handle theming in ZenUI components?",
            sender: 'other',
            senderProfile: {name: 'Jane', avatar: 'https://i.pravatar.cc/40?img=5'},
            timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
            reaction: null
        },
        {
            id: 3,
            text: "Does ZenUI support responsive design out of the box?",
            sender: 'other',
            senderProfile: {name: 'Jane', avatar: 'https://i.pravatar.cc/40?img=5'},
            timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
            reaction: null
        },
    ]);

    const [newMessage, setNewMessage] = useState('');
    const [reactingTo, setReactingTo] = useState(null);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
    };

    useEffect(() => {
        scrollToBottom();
    }, [newMessage]);

    const handleSendMessage = () => {
        if (newMessage.trim() === '') return;

        const newId = messages.length ? Math.max(...messages.map(m => m.id)) + 1 : 1;

        setMessages([
            ...messages,
            {
                id: newId,
                text: newMessage,
                sender: 'me',
                senderProfile: {name: 'You', avatar: 'https://i.pravatar.cc/40?img=1'},
                timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
                reaction: null
            }
        ]);

        setNewMessage('');
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleReaction = (messageId, reaction) => {
        setMessages(messages.map(message => {
            if (message.id === messageId) {
                const hasReaction = message.reaction === reaction;
                const updatedReaction = hasReaction ? null : reaction;
                return {...message, reaction: updatedReaction};
            }
            return message;
        }));
        setReactingTo(null);
    };

    const toggleReactionMenu = (messageId) => {
        setReactingTo(reactingTo === messageId ? null : messageId);
    };

    const messageVariants = {
        hidden: (message) => ({
            opacity: 0,
            y: 20,
            x: message.sender === 'me' ? 50 : -50,
            scale: 0.8,
        }),
        visible: {
            opacity: 1,
            y: 0,
            x: 0,
            scale: 1,
            transition: {
                type: "spring",
                damping: 18,
                stiffness: 220
            }
        },
        exit: {
            opacity: 0,
            y: 10,
            scale: 0.8,
            transition: {duration: 0.2}
        }
    };

    const reactionVariants = {
        hidden: {opacity: 0, y: 10},
        visible: {opacity: 1, y: 0},
        exit: {opacity: 0, y: 10}
    };

    return (
        <div className="flex flex-col w-full">
            {/* Messages Container */}
            <div className="flex-1 p-4 overflow-y-auto">
                <AnimatePresence>
                    {messages.map((message) => (
                        <motion.div
                            key={message.id}
                            variants={messageVariants}
                            custom={message}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            layout
                            className={`mb-4 flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className="relative max-w-md flex items-end gap-2">
                                {message.sender === 'other' && (
                                    <img
                                        src={message.senderProfile?.avatar}
                                        alt={message.senderProfile?.name}
                                        className="w-8 h-8 rounded-full"
                                    />
                                )}
                                <div>
                                    <div
                                        className={`px-4 py-2 rounded-high text-black text-sm ${
                                            message.sender === 'me'
                                                ? 'bg-blue-50 rounded-br-none'
                                                : 'bg-gray-50 rounded-bl-none'
                                        }`}
                                    >
                                        {message.text}
                                    </div>
                                    <div
                                        className={`${message.sender === 'me' ? 'text-right' : 'text-left'} mt-1 text-xs text-gray-500 mt`}>
                                        {message.timestamp}
                                    </div>
                                </div>
                                {message.sender === 'me' && (
                                    <img
                                        src={message.senderProfile?.avatar}
                                        alt={message.senderProfile?.name}
                                        className="w-8 h-8 rounded-full"
                                    />
                                )}

                                {/* Reaction display */}
                                {message.reaction && (
                                    <span
                                        title={message.reaction}
                                        onClick={() => toggleReactionMenu(message.id)}
                                        className="bg-white absolute -right-2 bottom-2 rounded-full min-h-[25px] min-w-[25px] flex items-center cursor-pointer justify-center shadow-md shadow-gray-100"
                                    >
                                        {message.reaction === 'love' ?
                                            <LuHeart size={12} fill="red" color="red"/> : null}
                                        {message.reaction === 'like' ?
                                            <LuThumbsUp size={12} fill="blue" color="blue"/> : null}
                                        {message.reaction === 'smile' ?
                                            <FaRegSmile size={12} fill="gold" color="gold"/> : null}
                                    </span>
                                )}

                                {/* Reaction button */}
                                {message.sender === 'other' && !message.reaction && (
                                    <button
                                        onClick={() => toggleReactionMenu(message.id)}
                                        title="add reaction"
                                        className="absolute bottom-2 -right-2 bg-gray-100 rounded-full p-1 shadow-sm hover:bg-gray-200 transition-colors"
                                    >
                                        <FaRegSmile size={14}/>
                                    </button>
                                )}

                                {/* Reaction menu */}
                                <AnimatePresence>
                                    {reactingTo === message.id && (
                                        <motion.div
                                            variants={reactionVariants}
                                            initial="hidden"
                                            animate="visible"
                                            exit="exit"
                                            className="absolute z-30 -bottom-6 right-0 bg-white rounded-full p-1 flex border border-border shadow-lg"
                                        >
                                            <button
                                                onClick={() => handleReaction(message.id, 'love')}
                                                className="min-w-[25px] min-h-[25px] flex items-center justify-center hover:bg-gray-100 rounded-full"
                                            >
                                                <LuHeart size={15}
                                                         color={message.reaction === 'love' ? 'red' : 'gray'}/>
                                            </button>
                                            <button
                                                onClick={() => handleReaction(message.id, 'like')}
                                                className="p-1 hover:bg-gray-100 rounded-full"
                                            >
                                                <LuThumbsUp size={15}
                                                            color={message.reaction === 'like' ? 'blue' : 'gray'}/>
                                            </button>
                                            <button
                                                onClick={() => handleReaction(message.id, 'smile')}
                                                className="p-1 hover:bg-gray-100 rounded-full"
                                            >
                                                <FaRegSmile size={16}
                                                            color={message.reaction === 'smile' ? 'gold' : 'gray'}/>
                                            </button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                <div ref={messagesEndRef}/>
            </div>

            {/* Message Input */}
            <div className="bg-white p-4">
                <div className="flex gap-2">
                    <input
                        ref={inputRef}
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-brandColor"
                    />
                    <motion.button
                        whileTap={{scale: 0.95}}
                        onClick={handleSendMessage}
                        className="bg-brandColor/80 text-white min-w-[50px] rounded-full hover:bg-brandColor flex items-center justify-center focus:outline-none"
                    >
                        <LuSend size={20}/>
                    </motion.button>
                </div>
            </div>
        </div>
    );
};

export default ChatScreenWithReact;
