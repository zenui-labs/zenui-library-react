import {useState, useRef, useEffect} from 'react';
import {motion, AnimatePresence} from 'framer-motion';
import {LuHeart, LuSend, LuThumbsUp, LuPaperclip, LuX, LuLoader2, LuFile} from "react-icons/lu";
import {FaRegSmile} from "react-icons/fa";
import {FiImage} from "react-icons/fi";

const ChatScreenWithFileAttachment = () => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hey there! How's it going?",
            sender: 'other',
            senderProfile: {name: 'Jane', avatar: 'https://i.pravatar.cc/40?img=5'},
            timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
            reaction: null,
            attachments: []
        },
        {
            id: 2,
            text: "How do you handle theming in ZenUI components?",
            sender: 'other',
            senderProfile: {name: 'Jane', avatar: 'https://i.pravatar.cc/40?img=5'},
            timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
            reaction: null,
            attachments: []
        },
        {
            id: 3,
            text: "Does ZenUI support responsive design out of the box?",
            sender: 'other',
            senderProfile: {name: 'Jane', avatar: 'https://i.pravatar.cc/40?img=5'},
            timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
            reaction: null,
            attachments: []
        },
    ]);

    const [newMessage, setNewMessage] = useState('');
    const [reactingTo, setReactingTo] = useState(null);
    const [attachments, setAttachments] = useState([]);
    const [isUploading, setIsUploading] = useState(false);
    const [totalAttachments, setTotalAttachments] = useState(0);

    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);
    const fileInputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: 'smooth'});
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = () => {
        if (newMessage.trim() === '' && attachments.length === 0) return;

        const newId = messages.length ? Math.max(...messages.map(m => m.id)) + 1 : 1;

        setMessages([
            ...messages,
            {
                id: newId,
                text: newMessage,
                sender: 'me',
                senderProfile: {name: 'You', avatar: 'https://i.pravatar.cc/40?img=1'},
                timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
                reaction: null,
                attachments: [...attachments]
            }
        ]);

        setNewMessage('');
        setAttachments([]);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        setTotalAttachments(files.length)

        setIsUploading(true);

        // Simulate file upload with timeout
        setTimeout(() => {
            const newAttachments = files.map(file => ({
                id: Math.random().toString(36).substring(2, 9),
                name: file.name,
                size: file.size,
                type: file.type,
                url: URL.createObjectURL(file)
            }));

            setAttachments([...attachments, ...newAttachments]);
            setIsUploading(false);
        }, 1500);

        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleRemoveAttachment = (attachmentId) => {
        setAttachments(attachments.filter(attachment => attachment.id !== attachmentId));
    };

    const handleAttachmentClick = () => {
        fileInputRef.current?.click();
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

    // Format file size for display
    const formatFileSize = (bytes) => {
        if (bytes < 1024) return bytes + ' B';
        else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
        else return (bytes / 1048576).toFixed(1) + ' MB';
    };

    return (
        <div className="flex flex-col w-full h-full">
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
                                        className={`p-3 rounded-high text-black text-sm ${
                                            message.sender === 'me'
                                                ? 'bg-blue-50 rounded-br-none'
                                                : 'bg-gray-50 rounded-bl-none'
                                        }`}
                                    >
                                        {/* File attachments in message */}
                                        {message.attachments && message.attachments.length > 0 && (
                                            <div className="mb-2">
                                                {message.attachments.map((attachment) => (
                                                    <div
                                                        key={attachment.id}
                                                        className="flex items-center p-2 mb-2 bg-white rounded-md border border-gray-200"
                                                    >
                                                        <div className="p-2 bg-gray-100 rounded-md">
                                                            {attachment.type.includes("image/") ? <FiImage size={16}/> :
                                                                <LuFile size={16}/>}
                                                        </div>
                                                        <div className="ml-2 flex-1 max-w-[330px]">
                                                            <span
                                                                className="text-xs break-words  font-medium">{attachment.name}</span>
                                                            <p className="text-xs text-gray-500">{formatFileSize(attachment.size)}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
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
            <div className="bg-white p-4 pb-3 border border-border rounded-lg">
                {/* Attachments preview */}
                {(attachments.length > 0 || isUploading) && (
                    <div className="mb-2 flex flex-wrap gap-2">
                        {isUploading && (
                            Array.from({length: totalAttachments}).map((_, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-50 p-2 rounded-md border border-gray-200 flex items-center gap-2">
                                    <LuLoader2 className="animate-spin" size={16}/>
                                    <span className="text-sm">Uploading...</span>
                                </div>
                            ))
                        )}

                        {attachments.map(file => (

                            file.type.startsWith('image/') ? (
                                <div key={file.id} className='relative group'>
                                    <img src={file.url} alt={file.name}
                                         className='w-[80px] object-cover h-[60px] border border-border p-1 rounded-lg'/>

                                    <button
                                        onClick={() => handleRemoveAttachment(file.id)}
                                        className="p-1 invisible group-hover:visible absolute top-0 right-0 bg-gray-100 hover:bg-gray-200 rounded-full scale-[0.8] group-hover:scale-100 transition-all duration-200 ease-in"
                                    >
                                        <LuX size={14}/>
                                    </button>
                                </div>
                            ) : (
                                <div key={file.id}
                                     className="pl-2 pr-3.5 py-2 rounded-lg border border-border flex items-center gap-2 group relative">
                                    <LuFile className='text-[2.2rem] text-gray-600'/>
                                    <div>
                                        <p className="text-sm max-w-xs truncate">{file.name}</p>
                                        <p
                                            className="text-xs mt-0.5 text-gray-500">{formatFileSize(file.size)}</p>
                                    </div>
                                    <button
                                        onClick={() => handleRemoveAttachment(file.id)}
                                        className="p-1 invisible group-hover:visible scale-[0.8] group-hover:scale-100 transition-all duration-200 absolute top-0 right-0 bg-gray-100 hover:bg-gray-200 rounded-full ease-in"
                                    >
                                        <LuX size={14}/>
                                    </button>
                                </div>
                            )

                        ))}
                    </div>
                )}

                <div className="flex gap-2">
                    <input
                        ref={inputRef}
                        type="text"
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type a message..."
                        className="flex-1 pr-4 py-1 border-none focus:outline-none focus:ring-0"
                    />

                    {/* Hidden file input */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileUpload}
                        className="hidden"
                        multiple
                    />

                    {/* File attachment button */}
                    <motion.button
                        whileTap={{scale: 0.95}}
                        onClick={handleAttachmentClick}
                        className="bg-gray-100 text-gray-600 min-w-[30px] p-2.5 rounded-full hover:bg-gray-200 flex items-center justify-center focus:outline-none"
                        disabled={isUploading}
                    >
                        <LuPaperclip size={18}/>
                    </motion.button>

                    <motion.button
                        whileTap={{scale: 0.95}}
                        onClick={handleSendMessage}
                        className="bg-brandColor/80 text-white min-w-[30px] p-2.5 rounded-full hover:bg-brandColor flex items-center justify-center focus:outline-none"
                    >
                        <LuSend size={18}/>
                    </motion.button>
                </div>
            </div>
        </div>
    );
};

export default ChatScreenWithFileAttachment;