export const ChatWithReactionCodes = 'import {useState, useRef, useEffect} from "react";\n' +
    '\n' +
    '// framer motion\n' +
    'import {motion, AnimatePresence} from "framer-motion";\n' +
    '\n' +
    '// react icons\n' +
    'import {LuHeart, LuSend, LuThumbsUp} from "react-icons/lu";\n' +
    'import {FaRegSmile} from "react-icons/fa";\n' +
    '\n' +
    'const ChatScreenWithReaction = () => {\n' +
    '    const [messages, setMessages] = useState([\n' +
    '        {\n' +
    '            id: 1,\n' +
    '            text: "Hey there! How it going?",\n' +
    '            sender: "other",\n' +
    '            senderProfile: {name: "Jane", avatar: "https://i.pravatar.cc/40?img=5"},\n' +
    '            timestamp: new Date().toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"}),\n' +
    '            reaction: null\n' +
    '        },\n' +
    '        {\n' +
    '            id: 2,\n' +
    '            text: "How do you handle theming in ZenUI components?",\n' +
    '            sender: "other",\n' +
    '            senderProfile: {name: "Jane", avatar: "https://i.pravatar.cc/40?img=5"},\n' +
    '            timestamp: new Date().toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"}),\n' +
    '            reaction: null\n' +
    '        },\n' +
    '        {\n' +
    '            id: 3,\n' +
    '            text: "Does ZenUI support responsive design out of the box?",\n' +
    '            sender: "other",\n' +
    '            senderProfile: {name: "Jane", avatar: "https://i.pravatar.cc/40?img=5"},\n' +
    '            timestamp: new Date().toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"}),\n' +
    '            reaction: null\n' +
    '        },\n' +
    '    ]);\n' +
    '\n' +
    '    const [newMessage, setNewMessage] = useState("");\n' +
    '    const [reactingTo, setReactingTo] = useState(null);\n' +
    '    const messagesEndRef = useRef(null);\n' +
    '    const inputRef = useRef(null);\n' +
    '\n' +
    '    const scrollToBottom = () => {\n' +
    '        messagesEndRef.current?.scrollIntoView({behavior: "smooth"});\n' +
    '    };\n' +
    '\n' +
    '    useEffect(() => {\n' +
    '        scrollToBottom();\n' +
    '    }, [newMessage]);\n' +
    '\n' +
    '    const handleSendMessage = () => {\n' +
    '        if (newMessage.trim() === "") return;\n' +
    '\n' +
    '        const newId = messages.length ? Math.max(...messages.map(m => m.id)) + 1 : 1;\n' +
    '\n' +
    '        setMessages([\n' +
    '            ...messages,\n' +
    '            {\n' +
    '                id: newId,\n' +
    '                text: newMessage,\n' +
    '                sender: "me",\n' +
    '                senderProfile: {name: "You", avatar: "https://i.pravatar.cc/40?img=1"},\n' +
    '                timestamp: new Date().toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"}),\n' +
    '                reaction: null\n' +
    '            }\n' +
    '        ]);\n' +
    '\n' +
    '        setNewMessage("");\n' +
    '        if (inputRef.current) {\n' +
    '            inputRef.current.focus();\n' +
    '        }\n' +
    '    };\n' +
    '\n' +
    '    const handleKeyPress = (e) => {\n' +
    '        if (e.key === "Enter") {\n' +
    '            e.preventDefault();\n' +
    '            handleSendMessage();\n' +
    '        }\n' +
    '    };\n' +
    '\n' +
    '    const handleReaction = (messageId, reaction) => {\n' +
    '        setMessages(messages.map(message => {\n' +
    '            if (message.id === messageId) {\n' +
    '                const hasReaction = message.reaction === reaction;\n' +
    '                const updatedReaction = hasReaction ? null : reaction;\n' +
    '                return {...message, reaction: updatedReaction};\n' +
    '            }\n' +
    '            return message;\n' +
    '        }));\n' +
    '        setReactingTo(null);\n' +
    '    };\n' +
    '\n' +
    '    const toggleReactionMenu = (messageId) => {\n' +
    '        setReactingTo(reactingTo === messageId ? null : messageId);\n' +
    '    };\n' +
    '\n' +
    '    const messageVariants = {\n' +
    '        hidden: (message) => ({\n' +
    '            opacity: 0,\n' +
    '            y: 20,\n' +
    '            x: message.sender === "me" ? 50 : -50,\n' +
    '            scale: 0.8,\n' +
    '        }),\n' +
    '        visible: {\n' +
    '            opacity: 1,\n' +
    '            y: 0,\n' +
    '            x: 0,\n' +
    '            scale: 1,\n' +
    '            transition: {\n' +
    '                type: "spring",\n' +
    '                damping: 18,\n' +
    '                stiffness: 220\n' +
    '            }\n' +
    '        },\n' +
    '        exit: {\n' +
    '            opacity: 0,\n' +
    '            y: 10,\n' +
    '            scale: 0.8,\n' +
    '            transition: {duration: 0.2}\n' +
    '        }\n' +
    '    };\n' +
    '\n' +
    '    const reactionVariants = {\n' +
    '        hidden: {opacity: 0, y: 10},\n' +
    '        visible: {opacity: 1, y: 0},\n' +
    '        exit: {opacity: 0, y: 10}\n' +
    '    };\n' +
    '\n' +
    '    return (\n' +
    '        <div className="flex flex-col w-full">\n' +
    '            <div className="flex-1 p-2 md:p-4 overflow-y-auto">\n' +
    '                <AnimatePresence>\n' +
    '                    {messages.map((message) => (\n' +
    '                        <motion.div\n' +
    '                            key={message.id}\n' +
    '                            variants={messageVariants}\n' +
    '                            custom={message}\n' +
    '                            initial="hidden"\n' +
    '                            animate="visible"\n' +
    '                            exit="exit"\n' +
    '                            layout\n' +
    '                            className={`mb-4 flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}\n' +
    '                        >\n' +
    '                            <div className="relative max-w-md flex items-end gap-2">\n' +
    '                                {message.sender === "other" && (\n' +
    '                                    <img\n' +
    '                                        src={message.senderProfile?.avatar}\n' +
    '                                        alt={message.senderProfile?.name}\n' +
    '                                        className="w-8 h-8 rounded-full"\n' +
    '                                    />\n' +
    '                                )}\n' +
    '                                <div>\n' +
    '                                    <div\n' +
    '                                        className={`px-4 py-2 rounded-high text-black dark:text-[#d2e5f5] text-sm ${\n' +
    '                                            message.sender === "me"\n' +
    '                                                ? "bg-blue-50 dark:bg-blue-900/90 rounded-br-none"\n' +
    '                                                : "bg-gray-50 dark:bg-slate-800 rounded-bl-none"\n' +
    '                                        }`}\n' +
    '                                    >\n' +
    '                                        {message.text}\n' +
    '                                    </div>\n' +
    '                                    <div\n' +
    '                                        className={`${message.sender === "me" ? "text-right" : "text-left"} mt-1 text-xs text-gray-500 dark:text-[#abc2d3]/80 mt`}>\n' +
    '                                        {message.timestamp}\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                                {message.sender === "me" && (\n' +
    '                                    <img\n' +
    '                                        src={message.senderProfile?.avatar}\n' +
    '                                        alt={message.senderProfile?.name}\n' +
    '                                        className="w-8 h-8 rounded-full"\n' +
    '                                    />\n' +
    '                                )}\n' +
    '\n' +
    '                                {/* Reaction display */}\n' +
    '                                {message.reaction && (\n' +
    '                                    <span\n' +
    '                                        title={message.reaction}\n' +
    '                                        onClick={() => toggleReactionMenu(message.id)}\n' +
    '                                        className="bg-white absolute dark:bg-slate-800 dark:shadow-slate-900 -right-2 bottom-2 rounded-full min-h-[25px] min-w-[25px] flex items-center cursor-pointer justify-center shadow-md shadow-gray-100"\n' +
    '                                    >\n' +
    '                                        {message.reaction === "love" ?\n' +
    '                                            <LuHeart size={12} fill="red" color="red"/> : null}\n' +
    '                                        {message.reaction === "like" ?\n' +
    '                                            <LuThumbsUp size={12} fill="blue" color="blue"/> : null}\n' +
    '                                        {message.reaction === "smile" ?\n' +
    '                                            <FaRegSmile size={12} fill="gold" color="gold"/> : null}\n' +
    '                                    </span>\n' +
    '                                )}\n' +
    '\n' +
    '                                {/* Reaction button */}\n' +
    '                                {message.sender === "other" && !message.reaction && (\n' +
    '                                    <button\n' +
    '                                        onClick={() => toggleReactionMenu(message.id)}\n' +
    '                                        title="add reaction"\n' +
    '                                        className="absolute bottom-2 -right-2 bg-gray-100 rounded-full p-1 shadow-sm hover:bg-gray-200 dark:bg-slate-700 dark:text-[#d2e5f5] dark:hover:bg-slate-800 transition-colors"\n' +
    '                                    >\n' +
    '                                        <FaRegSmile size={14}/>\n' +
    '                                    </button>\n' +
    '                                )}\n' +
    '\n' +
    '                                {/* Reaction menu */}\n' +
    '                                <AnimatePresence>\n' +
    '                                    {reactingTo === message.id && (\n' +
    '                                        <motion.div\n' +
    '                                            variants={reactionVariants}\n' +
    '                                            initial="hidden"\n' +
    '                                            animate="visible"\n' +
    '                                            exit="exit"\n' +
    '                                            className="absolute z-30 dark:bg-slate-800 dark:border-slate-700 -bottom-6 right-0 bg-white rounded-full p-1 flex border border-border shadow-lg"\n' +
    '                                        >\n' +
    '                                            <button\n' +
    '                                                onClick={() => handleReaction(message.id, "love")}\n' +
    '                                                className="min-w-[25px] min-h-[25px] flex items-center justify-center hover:bg-gray-100 dark:hover:bg-slate-900 rounded-full"\n' +
    '                                            >\n' +
    '                                                <LuHeart size={15}\n' +
    '                                                         color={message.reaction === "love" ? "red" : "gray"}\n' +
    '                                                         className="dark:!text-[#d2e5f5]"/>\n' +
    '                                            </button>\n' +
    '                                            <button\n' +
    '                                                onClick={() => handleReaction(message.id, "like")}\n' +
    '                                                className="p-1 hover:bg-gray-100 dark:hover:bg-slate-900 rounded-full"\n' +
    '                                            >\n' +
    '                                                <LuThumbsUp size={15}\n' +
    '                                                            color={message.reaction === "like" ? "blue" : "gray"}\n' +
    '                                                            className="dark:!text-[#d2e5f5]"/>\n' +
    '                                            </button>\n' +
    '                                            <button\n' +
    '                                                onClick={() => handleReaction(message.id, "smile")}\n' +
    '                                                className="p-1 hover:bg-gray-100 dark:hover:bg-slate-900 rounded-full"\n' +
    '                                            >\n' +
    '                                                <FaRegSmile size={16}\n' +
    '                                                            color={message.reaction === "smile" ? "gold" : "gray"}\n' +
    '                                                            className="dark:!text-[#d2e5f5]"/>\n' +
    '                                            </button>\n' +
    '                                        </motion.div>\n' +
    '                                    )}\n' +
    '                                </AnimatePresence>\n' +
    '                            </div>\n' +
    '                        </motion.div>\n' +
    '                    ))}\n' +
    '                </AnimatePresence>\n' +
    '                <div ref={messagesEndRef}/>\n' +
    '            </div>\n' +
    '\n' +
    '            {/* Message Input */}\n' +
    '            <div className="bg-white dark:bg-[#020617] p-0 md:p-4">\n' +
    '                <div className="flex gap-2">\n' +
    '                    <input\n' +
    '                        ref={inputRef}\n' +
    '                        type="text"\n' +
    '                        value={newMessage}\n' +
    '                        onChange={(e) => setNewMessage(e.target.value)}\n' +
    '                        onKeyPress={handleKeyPress}\n' +
    '                        placeholder="Type a message..."\n' +
    '                        className="flex-1 px-4 py-3 border dark:bg-slate-900 dark:border-slate-700 dark:text-[#d2e5f5] rounded-full focus:outline-none focus:ring-2 focus:ring-[#0FABCA]"\n' +
    '                    />\n' +
    '                    <motion.button\n' +
    '                        whileTap={{scale: 0.95}}\n' +
    '                        onClick={handleSendMessage}\n' +
    '                        className="bg-[#0FABCA]/80 text-white min-w-[50px] rounded-full hover:bg-[#0FABCA] flex items-center justify-center focus:outline-none"\n' +
    '                    >\n' +
    '                        <LuSend size={20}/>\n' +
    '                    </motion.button>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    );\n' +
    '};\n' +
    '\n' +
    'export default ChatScreenWithReaction;\n'

export const ChatWithReactionAndFileCodes = 'import {useState, useRef, useEffect} from "react";\n' +
    '\n' +
    '// framer motion\n' +
    'import {motion, AnimatePresence} from "framer-motion";\n' +
    '\n' +
    '// react icons\n' +
    'import {LuHeart, LuSend, LuThumbsUp, LuPaperclip, LuX, LuLoader2, LuFile} from "react-icons/lu";\n' +
    'import {FaRegSmile} from "react-icons/fa";\n' +
    'import {FiImage} from "react-icons/fi";\n' +
    '\n' +
    'const ChatScreenWithFileAttachment = () => {\n' +
    '    const [messages, setMessages] = useState([\n' +
    '        {\n' +
    '            id: 1,\n' +
    '            text: "Hey there! How it going?",\n' +
    '            sender: "other",\n' +
    '            senderProfile: {name: "Jane", avatar: "https://i.pravatar.cc/40?img=5"},\n' +
    '            timestamp: new Date().toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"}),\n' +
    '            reaction: null,\n' +
    '            attachments: []\n' +
    '        },\n' +
    '        {\n' +
    '            id: 2,\n' +
    '            text: "How do you handle theming in ZenUI components?",\n' +
    '            sender: "other",\n' +
    '            senderProfile: {name: "Jane", avatar: "https://i.pravatar.cc/40?img=5"},\n' +
    '            timestamp: new Date().toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"}),\n' +
    '            reaction: null,\n' +
    '            attachments: []\n' +
    '        },\n' +
    '        {\n' +
    '            id: 3,\n' +
    '            text: "Does ZenUI support responsive design out of the box?",\n' +
    '            sender: "other",\n' +
    '            senderProfile: {name: "Jane", avatar: "https://i.pravatar.cc/40?img=5"},\n' +
    '            timestamp: new Date().toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"}),\n' +
    '            reaction: null,\n' +
    '            attachments: []\n' +
    '        },\n' +
    '    ]);\n' +
    '\n' +
    '    const [newMessage, setNewMessage] = useState("");\n' +
    '    const [reactingTo, setReactingTo] = useState(null);\n' +
    '    const [attachments, setAttachments] = useState([]);\n' +
    '    const [isUploading, setIsUploading] = useState(false);\n' +
    '    const [totalAttachments, setTotalAttachments] = useState(0);\n' +
    '\n' +
    '    const messagesEndRef = useRef(null);\n' +
    '    const inputRef = useRef(null);\n' +
    '    const fileInputRef = useRef(null);\n' +
    '\n' +
    '    const scrollToBottom = () => {\n' +
    '        messagesEndRef.current?.scrollIntoView({behavior: "smooth"});\n' +
    '    };\n' +
    '\n' +
    '    useEffect(() => {\n' +
    '        scrollToBottom();\n' +
    '    }, [messages]);\n' +
    '\n' +
    '    const handleSendMessage = () => {\n' +
    '        if (newMessage.trim() === "" && attachments.length === 0) return;\n' +
    '\n' +
    '        const newId = messages.length ? Math.max(...messages.map(m => m.id)) + 1 : 1;\n' +
    '\n' +
    '        setMessages([\n' +
    '            ...messages,\n' +
    '            {\n' +
    '                id: newId,\n' +
    '                text: newMessage,\n' +
    '                sender: "me",\n' +
    '                senderProfile: {name: "You", avatar: "https://i.pravatar.cc/40?img=1"},\n' +
    '                timestamp: new Date().toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"}),\n' +
    '                reaction: null,\n' +
    '                attachments: [...attachments]\n' +
    '            }\n' +
    '        ]);\n' +
    '\n' +
    '        setNewMessage("");\n' +
    '        setAttachments([]);\n' +
    '        if (inputRef.current) {\n' +
    '            inputRef.current.focus();\n' +
    '        }\n' +
    '    };\n' +
    '\n' +
    '    const handleKeyPress = (e) => {\n' +
    '        if (e.key === "Enter" && !e.shiftKey) {\n' +
    '            e.preventDefault();\n' +
    '            handleSendMessage();\n' +
    '        }\n' +
    '    };\n' +
    '\n' +
    '    const handleFileUpload = (e) => {\n' +
    '        const files = Array.from(e.target.files);\n' +
    '        if (files.length === 0) return;\n' +
    '\n' +
    '        setTotalAttachments(files.length)\n' +
    '\n' +
    '        setIsUploading(true);\n' +
    '\n' +
    '        // Simulate file upload with timeout\n' +
    '        setTimeout(() => {\n' +
    '            const newAttachments = files.map(file => ({\n' +
    '                id: Math.random().toString(36).substring(2, 9),\n' +
    '                name: file.name,\n' +
    '                size: file.size,\n' +
    '                type: file.type,\n' +
    '                url: URL.createObjectURL(file)\n' +
    '            }));\n' +
    '\n' +
    '            setAttachments([...attachments, ...newAttachments]);\n' +
    '            setIsUploading(false);\n' +
    '        }, 1500);\n' +
    '\n' +
    '        if (fileInputRef.current) {\n' +
    '            fileInputRef.current.value = "";\n' +
    '        }\n' +
    '    };\n' +
    '\n' +
    '    const handleRemoveAttachment = (attachmentId) => {\n' +
    '        setAttachments(attachments.filter(attachment => attachment.id !== attachmentId));\n' +
    '    };\n' +
    '\n' +
    '    const handleAttachmentClick = () => {\n' +
    '        fileInputRef.current?.click();\n' +
    '    };\n' +
    '\n' +
    '    const handleReaction = (messageId, reaction) => {\n' +
    '        setMessages(messages.map(message => {\n' +
    '            if (message.id === messageId) {\n' +
    '                const hasReaction = message.reaction === reaction;\n' +
    '                const updatedReaction = hasReaction ? null : reaction;\n' +
    '                return {...message, reaction: updatedReaction};\n' +
    '            }\n' +
    '            return message;\n' +
    '        }));\n' +
    '        setReactingTo(null);\n' +
    '    };\n' +
    '\n' +
    '    const toggleReactionMenu = (messageId) => {\n' +
    '        setReactingTo(reactingTo === messageId ? null : messageId);\n' +
    '    };\n' +
    '\n' +
    '    const messageVariants = {\n' +
    '        hidden: (message) => ({\n' +
    '            opacity: 0,\n' +
    '            y: 20,\n' +
    '            x: message.sender === "me" ? 50 : -50,\n' +
    '            scale: 0.8,\n' +
    '        }),\n' +
    '        visible: {\n' +
    '            opacity: 1,\n' +
    '            y: 0,\n' +
    '            x: 0,\n' +
    '            scale: 1,\n' +
    '            transition: {\n' +
    '                type: "spring",\n' +
    '                damping: 18,\n' +
    '                stiffness: 220\n' +
    '            }\n' +
    '        },\n' +
    '        exit: {\n' +
    '            opacity: 0,\n' +
    '            y: 10,\n' +
    '            scale: 0.8,\n' +
    '            transition: {duration: 0.2}\n' +
    '        }\n' +
    '    };\n' +
    '\n' +
    '    const reactionVariants = {\n' +
    '        hidden: {opacity: 0, y: 10},\n' +
    '        visible: {opacity: 1, y: 0},\n' +
    '        exit: {opacity: 0, y: 10}\n' +
    '    };\n' +
    '\n' +
    '    // Format file size for display\n' +
    '    const formatFileSize = (bytes) => {\n' +
    '        if (bytes < 1024) return bytes + " B";\n' +
    '        else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";\n' +
    '        else return (bytes / 1048576).toFixed(1) + " MB";\n' +
    '    };\n' +
    '\n' +
    '    return (\n' +
    '        <div className="flex flex-col w-full h-full">\n' +
    '            <div className="flex-1 p-2 md:p-4 overflow-y-auto">\n' +
    '                <AnimatePresence>\n' +
    '                    {messages.map((message) => (\n' +
    '                        <motion.div\n' +
    '                            key={message.id}\n' +
    '                            variants={messageVariants}\n' +
    '                            custom={message}\n' +
    '                            initial="hidden"\n' +
    '                            animate="visible"\n' +
    '                            exit="exit"\n' +
    '                            layout\n' +
    '                            className={`mb-4 flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}\n' +
    '                        >\n' +
    '                            <div className="relative max-w-md flex items-end gap-2">\n' +
    '                                {message.sender === "other" && (\n' +
    '                                    <img\n' +
    '                                        src={message.senderProfile?.avatar}\n' +
    '                                        alt={message.senderProfile?.name}\n' +
    '                                        className="w-8 h-8 rounded-full"\n' +
    '                                    />\n' +
    '                                )}\n' +
    '                                <div>\n' +
    '                                    <div\n' +
    '                                        className={`p-3 rounded-high text-black dark:text-[#d2e5f5] text-sm ${\n' +
    '                                            message.sender === "me"\n' +
    '                                                ? "bg-blue-50 dark:bg-blue-900/90 rounded-br-none"\n' +
    '                                                : "bg-gray-50 dark:bg-slate-800 rounded-bl-none"\n' +
    '                                        }`}\n' +
    '                                    >\n' +
    '                                        {/* File attachments in message */}\n' +
    '                                        {message.attachments && message.attachments.length > 0 && (\n' +
    '                                            <div className="mb-2">\n' +
    '                                                {message.attachments.map((attachment) => (\n' +
    '                                                    <div\n' +
    '                                                        key={attachment.id}\n' +
    '                                                        className="flex items-center p-2 mb-2 bg-white rounded-md border border-gray-200 dark:bg-slate-800 dark:border-slate-700"\n' +
    '                                                    >\n' +
    '                                                        <div className="p-2 bg-gray-100 dark:bg-slate-900 rounded-md">\n' +
    '                                                            {attachment.type.includes("image/") ? <FiImage size={16}/> :\n' +
    '                                                                <LuFile size={16}/>}\n' +
    '                                                        </div>\n' +
    '                                                        <div className="ml-2 flex-1 max-w-[330px]">\n' +
    '                                                            <span\n' +
    '                                                                className="text-xs break-words  font-medium">{attachment.name}</span>\n' +
    '                                                            <p className="text-xs dark:text-[#d2e5f5]/70 text-gray-500">{formatFileSize(attachment.size)}</p>\n' +
    '                                                        </div>\n' +
    '                                                    </div>\n' +
    '                                                ))}\n' +
    '                                            </div>\n' +
    '                                        )}\n' +
    '                                        {message.text}\n' +
    '                                    </div>\n' +
    '                                    <div\n' +
    '                                        className={`${message.sender === "me" ? "text-right" : "text-left"} mt-1 text-xs text-gray-500 dark:text-[#abc2d3]/70 mt`}>\n' +
    '                                        {message.timestamp}\n' +
    '                                    </div>\n' +
    '                                </div>\n' +
    '                                {message.sender === "me" && (\n' +
    '                                    <img\n' +
    '                                        src={message.senderProfile?.avatar}\n' +
    '                                        alt={message.senderProfile?.name}\n' +
    '                                        className="w-8 h-8 rounded-full"\n' +
    '                                    />\n' +
    '                                )}\n' +
    '\n' +
    '                                {/* Reaction display */}\n' +
    '                                {message.reaction && (\n' +
    '                                    <span\n' +
    '                                        title={message.reaction}\n' +
    '                                        onClick={() => toggleReactionMenu(message.id)}\n' +
    '                                        className="bg-white absolute -right-2 bottom-2 rounded-full min-h-[25px] min-w-[25px] flex items-center cursor-pointer justify-center shadow-md shadow-gray-100 dark:bg-slate-700 dark:shadow-slate-800"\n' +
    '                                    >\n' +
    '                                        {message.reaction === "love" ?\n' +
    '                                            <LuHeart size={12} fill="red" color="red"/> : null}\n' +
    '                                        {message.reaction === "like" ?\n' +
    '                                            <LuThumbsUp size={12} fill="blue" color="blue"/> : null}\n' +
    '                                        {message.reaction === "smile" ?\n' +
    '                                            <FaRegSmile size={12} fill="gold" color="gold"/> : null}\n' +
    '                                    </span>\n' +
    '                                )}\n' +
    '\n' +
    '                                {/* Reaction button */}\n' +
    '                                {message.sender === "other" && !message.reaction && (\n' +
    '                                    <button\n' +
    '                                        onClick={() => toggleReactionMenu(message.id)}\n' +
    '                                        title="add reaction"\n' +
    '                                        className="absolute bottom-2 -right-2 bg-gray-100 rounded-full p-1 shadow-sm hover:bg-gray-200 dark:bg-slate-700 dark:text-[#d2e5f5] dark:hover:bg-slate-800 transition-colors"\n' +
    '                                    >\n' +
    '                                        <FaRegSmile size={14}/>\n' +
    '                                    </button>\n' +
    '                                )}\n' +
    '\n' +
    '                                {/* Reaction menu */}\n' +
    '                                <AnimatePresence>\n' +
    '                                    {reactingTo === message.id && (\n' +
    '                                        <motion.div\n' +
    '                                            variants={reactionVariants}\n' +
    '                                            initial="hidden"\n' +
    '                                            animate="visible"\n' +
    '                                            exit="exit"\n' +
    '                                            className="absolute z-30 -bottom-6 right-0 bg-white rounded-full p-1 flex border border-border dark:bg-slate-800 dark:border-slate-700 shadow-lg"\n' +
    '                                        >\n' +
    '                                            <button\n' +
    '                                                onClick={() => handleReaction(message.id, "love")}\n' +
    '                                                className="min-w-[25px] min-h-[25px] flex items-center justify-center hover:bg-gray-100 dark:hover:bg-slate-900 rounded-full"\n' +
    '                                            >\n' +
    '                                                <LuHeart size={15}\n' +
    '                                                         color={message.reaction === "love" ? "red" : "gray"}\n' +
    '                                                         className="dark:!text-[#d2e5f5]"/>\n' +
    '                                            </button>\n' +
    '                                            <button\n' +
    '                                                onClick={() => handleReaction(message.id, "like")}\n' +
    '                                                className="p-1 hover:bg-gray-100 dark:hover:bg-slate-900 rounded-full"\n' +
    '                                            >\n' +
    '                                                <LuThumbsUp size={15}\n' +
    '                                                            color={message.reaction === "like" ? "blue" : "gray"}\n' +
    '                                                            className="dark:!text-[#d2e5f5]"/>\n' +
    '                                            </button>\n' +
    '                                            <button\n' +
    '                                                onClick={() => handleReaction(message.id, "smile")}\n' +
    '                                                className="p-1 hover:bg-gray-100 dark:hover:bg-slate-900 rounded-full"\n' +
    '                                            >\n' +
    '                                                <FaRegSmile size={16}\n' +
    '                                                            color={message.reaction === "smile" ? "gold" : "gray"}\n' +
    '                                                            className="dark:!text-[#d2e5f5]"/>\n' +
    '                                            </button>\n' +
    '                                        </motion.div>\n' +
    '                                    )}\n' +
    '                                </AnimatePresence>\n' +
    '                            </div>\n' +
    '                        </motion.div>\n' +
    '                    ))}\n' +
    '                </AnimatePresence>\n' +
    '                <div ref={messagesEndRef}/>\n' +
    '            </div>\n' +
    '\n' +
    '            {/* Message Input */}\n' +
    '            <div className="bg-white dark:bg-slate-900 dark:border-slate-700 p-4 pb-3 border border-border rounded-lg">\n' +
    '                {/* Attachments preview */}\n' +
    '                {(attachments.length || isUploading) && (\n' +
    '                    <div className="mb-2 flex flex-wrap gap-2">\n' +
    '                        {isUploading && (\n' +
    '                            Array.from({length: totalAttachments}).map((_, index) => (\n' +
    '                                <div\n' +
    '                                    key={index}\n' +
    '                                    className="bg-gray-50 dark:bg-slate-800 dark:border-slate-700 dark:text-[#d2e5f5] p-2 rounded-md border border-gray-200 flex items-center gap-2">\n' +
    '                                    <LuLoader2 className="animate-spin" size={16}/>\n' +
    '                                    <span className="text-sm">Uploading...</span>\n' +
    '                                </div>\n' +
    '                            ))\n' +
    '                        )}\n' +
    '\n' +
    '                        {attachments.map(file => (\n' +
    '\n' +
    '                            file.type.startsWith("image/") ? (\n' +
    '                                <div key={file.id} className="relative group">\n' +
    '                                    <img src={file.url} alt={file.name}\n' +
    '                                         className="w-[80px] object-cover h-[60px] dark:border-slate-700 border border-border p-1 rounded-lg"/>\n' +
    '\n' +
    '                                    <button\n' +
    '                                        onClick={() => handleRemoveAttachment(file.id)}\n' +
    '                                        className="p-1 invisible dark:bg-slate-700 dark:text-[#d2e5f5] group-hover:visible absolute top-0 right-0 bg-gray-100 hover:bg-gray-200 rounded-full scale-[0.8] group-hover:scale-100 transition-all duration-200 ease-in"\n' +
    '                                    >\n' +
    '                                        <LuX size={14}/>\n' +
    '                                    </button>\n' +
    '                                </div>\n' +
    '                            ) : (\n' +
    '                                <div key={file.id}\n' +
    '                                     className="pl-2 pr-3.5 py-2 dark:border-slate-700 rounded-lg border border-border flex items-center gap-2 group relative">\n' +
    '                                    <LuFile className="text-[2.2rem] text-gray-600 dark:text-[#d2e5f5]/70"/>\n' +
    '                                    <div>\n' +
    '                                        <p className="text-sm dark:text-[#d2e5f5] max-w-xs truncate">{file.name}</p>\n' +
    '                                        <p\n' +
    '                                            className="text-xs mt-0.5 dark:text-[#d2e5f5]/70 text-gray-500">{formatFileSize(file.size)}</p>\n' +
    '                                    </div>\n' +
    '                                    <button\n' +
    '                                        onClick={() => handleRemoveAttachment(file.id)}\n' +
    '                                        className="p-1 invisible dark:bg-slate-700 dark:text-[#d2e5f5] group-hover:visible scale-[0.8] group-hover:scale-100 transition-all duration-200 absolute top-0 right-0 bg-gray-100 hover:bg-gray-200 rounded-full ease-in"\n' +
    '                                    >\n' +
    '                                        <LuX size={14}/>\n' +
    '                                    </button>\n' +
    '                                </div>\n' +
    '                            )\n' +
    '\n' +
    '                        ))}\n' +
    '                    </div>\n' +
    '                )}\n' +
    '\n' +
    '                <div className="flex gap-2">\n' +
    '                    <input\n' +
    '                        ref={inputRef}\n' +
    '                        type="text"\n' +
    '                        value={newMessage}\n' +
    '                        onChange={(e) => setNewMessage(e.target.value)}\n' +
    '                        onKeyPress={handleKeyPress}\n' +
    '                        placeholder="Type a message..."\n' +
    '                        className="w-[70%] md:flex-1 pr-4 py-1 border-none dark:bg-transparent dark:text-[#d2e5f5] focus:outline-none focus:ring-0"\n' +
    '                    />\n' +
    '\n' +
    '                    {/* Hidden file input */}\n' +
    '                    <input\n' +
    '                        type="file"\n' +
    '                        ref={fileInputRef}\n' +
    '                        onChange={handleFileUpload}\n' +
    '                        className="hidden"\n' +
    '                        multiple\n' +
    '                    />\n' +
    '\n' +
    '                    {/* File attachment button */}\n' +
    '                    <motion.button\n' +
    '                        whileTap={{scale: 0.95}}\n' +
    '                        onClick={handleAttachmentClick}\n' +
    '                        className="bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-[#d2e5f5] dark:hover:bg-slate-600/50 min-w-[30px] p-2.5 rounded-full hover:bg-gray-200 flex items-center justify-center focus:outline-none"\n' +
    '                        disabled={isUploading}\n' +
    '                    >\n' +
    '                        <LuPaperclip size={18}/>\n' +
    '                    </motion.button>\n' +
    '\n' +
    '                    <motion.button\n' +
    '                        whileTap={{scale: 0.95}}\n' +
    '                        onClick={handleSendMessage}\n' +
    '                        className="bg-[#0FABCA]/80 text-white min-w-[30px] p-2.5 rounded-full hover:bg-[#0FABCA] flex items-center justify-center focus:outline-none"\n' +
    '                    >\n' +
    '                        <LuSend size={18}/>\n' +
    '                    </motion.button>\n' +
    '                </div>\n' +
    '            </div>\n' +
    '        </div>\n' +
    '    );\n' +
    '};\n' +
    '\n' +
    'export default ChatScreenWithFileAttachment;'