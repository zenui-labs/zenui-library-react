import React, {useEffect, useState} from "react";
import ChatgptIcon from "@/SvgIcons/chatgpt-icon.jsx";
import ClaudeIcon from "@/SvgIcons/claude-icon.jsx";
import V0Icon from "@/SvgIcons/v0-icon.jsx";
import {IoChevronDownOutline} from "react-icons/io5";
import {LuCopy} from "react-icons/lu";
import {MdDone} from "react-icons/md";

export const PageActions = () => {
    const [open, setOpen] = useState(false);
    const [copied, setCopied] = useState(false);
    const [selected, setSelected] = useState("copy");
    const [pageHtml, setPageHtml] = useState("");
    const [pageUrl, setPageUrl] = useState("");

    const generatePrompt = (url) => `
Please analyze and explain the web page at: ${url}

Focus on:
- The purpose of the page (what it is meant to do).
- The structure and layout (sections, navigation, components).
- The main features or functionality provided.
- The design and user experience choices.
- Suggestions for improvements or best practices.

Explain clearly as if reviewing it for developers.
`;

    const actions = [
        {
            id: "copy",
            label: "Copy Page",
            icon: <LuCopy className="size-[14px]"/>,
            onClick: async () => {
                setCopied(true);
                await navigator.clipboard.writeText(pageHtml);
                setTimeout(() => {
                    setCopied(false);
                }, 2000);
            },
        },
        {
            id: "chatgpt",
            label: "Open in ChatGPT",
            icon: <ChatgptIcon/>,
            onClick: () => {
                window.open(
                    `https://chat.openai.com/?q=${encodeURIComponent(generatePrompt(pageUrl))}`,
                    "_blank"
                );
            },
        },
        {
            id: "claude",
            label: "Open in Claude",
            icon: <ClaudeIcon/>,
            onClick: () => {
                window.open(
                    `https://claude.ai/new?q=${encodeURIComponent(generatePrompt(pageUrl))}`,
                    "_blank"
                );
            },
        },
        {
            id: "v0",
            label: "Open in v0",
            icon: <V0Icon/>,
            onClick: () => {
                window.open(
                    `https://v0.app/?q=${encodeURIComponent(generatePrompt(pageUrl))}`,
                    "_blank"
                );
            },
        },
    ];

    const [selectedOption, setSelectedOption] = useState(actions[0]);

    console.log(selectedOption)

    useEffect(() => {
        if (typeof window !== "undefined") {
            setPageHtml(document.documentElement.outerHTML);
            setPageUrl(window.location.href);
        }

        document.addEventListener('click', (e) => {
            if (e.target.closest('.zenui_page_actions')) {
                return;
            }
            setOpen(false);
        }, false);

    }, []);

    const selectedAction = actions.find((a) => a.id === selected);

    return (
        <div className="relative mb-6 ml-6 1024px:ml-10">
            <div className='flex items-center'>
                <div
                    onClick={() => {
                        setSelected(selectedOption?.id);
                        setOpen(false);
                        selectedOption?.onClick();
                    }}
                    className="inline-flex items-center cursor-pointer dark:bg-darkBgColor dark:border-darkBorderColor dark:shadow-darkBorderColor dark:hover:bg-slate-800/60 dark:text-darkTextColor px-3 text-[0.8rem] py-1.5 bg-white border border-r-0 rounded-l-lg shadow-sm hover:bg-gray-50">
                    {
                        copied ? (
                            <MdDone size={14}/>
                        ) : (
                            selectedAction?.icon
                        )
                    }
                    <span className="ml-2">{selectedAction?.label}</span>
                </div>
                <button
                    onClick={() => setOpen(!open)}
                    className="zenui_page_actions dark:bg-darkBgColor dark:border-darkBorderColor dark:text-darkTextColor dark:shadow-darkBorderColor inline-flex items-center px-2 h-full text-[0.8rem] py-[7.4px] bg-white border rounded-r-lg shadow-sm dark:hover:bg-slate-800/60 hover:bg-gray-50"
                >
                    <IoChevronDownOutline className={`size-4 ${open ? "rotate-180" : ""} transition-all duration-200`}/>
                </button>
            </div>

            <div
                className={`${open ? 'translate-y-0 opacity-100 visible' : '-translate-y-3 opacity-0 invisible'} transition-all duration-200 absolute mt-1 w-48 rounded-lg dark:bg-gray-800 dark:shadow-darkBgColor shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 p-1 border border-gray-200 dark:border-darkBorderColor`}>
                {actions.map((action) => (
                    <button
                        key={action.id}
                        onClick={() => {
                            setSelected(action.id);
                            setSelectedOption(action);
                            setOpen(false);
                            action.onClick();
                        }}
                        className={`flex items-center dark:text-darkTextColor/70 text-gray-500 rounded-lg w-full px-3 py-2 text-left hover:bg-gray-100 dark:hover:bg-darkBgColor/40 ${
                            selected === action.id ? "bg-gray-50 dark:bg-darkBgColor/40 font-medium" : ""
                        }`}
                    >
                        {action.icon}
                        <span className="ml-2 text-[0.8rem] dark:text-darkTextColor text-gray-900">{action.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};
