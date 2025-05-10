import React, {useState} from "react";

// react helmet
import {Helmet} from "react-helmet";

// contents for scrollspy
import ContentHeader from "@shared/ContentHeader.jsx";
import GithubActivityGraphExample from "./GithubActivityGraphExample.jsx";
import BlocksFooter from "@shared/Block/BlocksFooter.jsx";
import GithubActivityGraphWithMonthExample from "./GithubActivityGraphWithMonthExample.jsx";
import CalculatingTotalActivityExample from "./CalculatingTotalActivityExample.jsx";
import BlocksShowCode from "@shared/Block/BlocksShowCode.jsx";

import BlockToggleTab from "@shared/Block/BlockToggleTab.jsx";
import BlockWrapper from "@shared/Block/BlockWrapper.jsx";
import BlockDescription from "@shared/Block/BlockDescription.jsx";

const GithubActivityGraph = () => {

    const [activityGraphPreview, setActivityGraphPreview] = useState(true)
    const [activityGraphCode, setActivityGraphCode] = useState(false)

    const [activityGraphWithMonthPreview, setActivityGraphWithMonthPreview] = useState(true)
    const [activityGraphWithMonthCode, setActivityGraphWithMonthCode] = useState(false)

    const [calculatingTotalActivityPreview, setCalculatingTotalActivityPreview] = useState(true)
    const [calculatingTotalActivityCode, setCalculatingTotalActivityCode] = useState(false)

    const activityGraphCodes = [
        {
            id: 'main_code',
            displayText: 'ActivityGraph.jsx',
            language: 'jsx',
            code: 'import React, { useState, useCallback } from \'react\';\n' +
                'import {activityData} from "./Data.js"\n' +
                '\n' +
                'const ActivityGraph = () => {\n' +
                '\n' +
                '    // tooltip\n' +
                '    const [tooltip, setTooltip] = useState({\n' +
                '        show: false,\n' +
                '        content: \'\',\n' +
                '        x: 0,\n' +
                '        y: 0,\n' +
                '        position: \'top\'\n' +
                '    });\n' +
                '\n' +
                '    // generate the dates data for showing the graph\n' +
                '    const generateDates = () => {\n' +
                '        const dates = [];\n' +
                '        const now = new Date();\n' +
                '        for (let i = 0; i < 52 * 7; i++) {\n' +
                '            const date = new Date(now);\n' +
                '            date.setDate(date.getDate() - i);\n' +
                '            const dateStr = date.toISOString().split(\'T\')[0];\n' +
                '            dates.unshift({\n' +
                '                date: dateStr,\n' +
                '                count: activityData[dateStr] || 0\n' +
                '            });\n' +
                '        }\n' +
                '        return dates;\n' +
                '    };\n' +
                '\n' +
                '    const data = generateDates();\n' +
                '    const weeks = [];\n' +
                '\n' +
                '    // set the weeks from the dates data\n' +
                '    for (let i = 0; i < data.length; i += 7) {\n' +
                '        weeks.push(data.slice(i, i + 7));\n' +
                '    }\n' +
                '\n' +
                '    // get the active color based on the activity logic\n' +
                '    const getActivityColor = (count) => {\n' +
                '        const isDarkMode = document.documentElement.classList.contains(\'dark\');\n' +
                '\n' +
                '        if (count === 0) return isDarkMode ? \'#0f172a\' : \'#ebedf0\';\n' +
                '\n' +
                '        if (isDarkMode) {\n' +
                '            if (count <= 2) return \'#0e4429\';\n' +
                '            if (count <= 4) return \'#006d32\';\n' +
                '            if (count <= 6) return \'#26a641\';\n' +
                '            return \'#39d353\';\n' +
                '        } else {\n' +
                '            if (count <= 2) return \'#9be9a8\';\n' +
                '            if (count <= 4) return \'#40c463\';\n' +
                '            if (count <= 6) return \'#30a14e\';\n' +
                '            return \'#216e39\';\n' +
                '        }\n' +
                '    };\n' +
                '\n' +
                '    // format the date\n' +
                '    const formatDate = (dateString) => {\n' +
                '        return new Date(dateString).toLocaleDateString(\'en-US\', {\n' +
                '            month: \'short\',\n' +
                '            day: \'numeric\',\n' +
                '            year: \'numeric\'\n' +
                '        });\n' +
                '    };\n' +
                '\n' +
                '    // handle mousemove for showing the tooltip at the current hovered position\n' +
                '    const handleMouseMove = useCallback((e, day) => {\n' +
                '        const rect = e.target.getBoundingClientRect();\n' +
                '        const tooltipWidth = 200;\n' +
                '        const tooltipHeight = 60;\n' +
                '        const windowWidth = window.innerWidth;\n' +
                '        const windowHeight = window.innerHeight;\n' +
                '        const scrollY = window.scrollY || window.pageYOffset;\n' +
                '\n' +
                '        // Calculate available space in different directions\n' +
                '        const spaceRight = windowWidth - rect.right;\n' +
                '        const spaceLeft = rect.left;\n' +
                '        const spaceTop = rect.top;\n' +
                '        const spaceBottom = windowHeight - rect.bottom;\n' +
                '\n' +
                '        // Determine optimal position\n' +
                '        let position = \'top\';\n' +
                '        let x = rect.left;\n' +
                '        let y = rect.top + scrollY;\n' +
                '\n' +
                '        // Horizontal position\n' +
                '        if (spaceRight < tooltipWidth / 2 && spaceLeft > tooltipWidth / 2) {\n' +
                '            x = rect.right - tooltipWidth;\n' +
                '        } else if (spaceLeft < tooltipWidth / 2 && spaceRight > tooltipWidth / 2) {\n' +
                '            x = rect.left;\n' +
                '        } else {\n' +
                '            x = rect.left - (tooltipWidth / 2) + (rect.width / 2);\n' +
                '        }\n' +
                '\n' +
                '        // Vertical position\n' +
                '        if (spaceTop < tooltipHeight && spaceBottom > tooltipHeight) {\n' +
                '            y = rect.bottom + scrollY + 5;\n' +
                '            position = \'bottom\';\n' +
                '        } else {\n' +
                '            y = rect.top + scrollY - tooltipHeight + 15;\n' +
                '            position = \'top\';\n' +
                '        }\n' +
                '\n' +
                '        // Ensure tooltip stays within window bounds\n' +
                '        x = Math.max(10, Math.min(windowWidth - tooltipWidth - 10, x));\n' +
                '\n' +
                '        setTooltip({\n' +
                '            show: true,\n' +
                '            content: `${day.count} contributions on ${formatDate(day.date)}`,\n' +
                '            x,\n' +
                '            y,\n' +
                '            position\n' +
                '        });\n' +
                '    }, []);\n' +
                '\n' +
                '    const handleMouseLeave = () => {\n' +
                '        setTooltip(prev => ({ ...prev, show: false }));\n' +
                '    };\n' +
                '\n' +
                '    return (\n' +
                '        <div className="p-6 w-full max-w-4xl">\n' +
                '            <h2 className="text-xl text-gray-800 font-bold dark:text-[#abc2d3] mb-4">Activity Contributions</h2>\n' +
                '\n' +
                '            <div className="flex flex-col gap-4">\n' +
                '                <div className="flex items-center gap-2 text-sm dark:text-[#abc2d3] text-gray-600">\n' +
                '                    <span>Less</span>\n' +
                '                    {[0, 1, 3, 5, 7].map((count, i) => (\n' +
                '                        <div key={i} className="flex flex-col items-center">\n' +
                '                            <div\n' +
                '                                className="w-3 h-3 border dark:border-slate-800 border-gray-200"\n' +
                '                                style={{ backgroundColor: getActivityColor(count) }}\n' +
                '                            />\n' +
                '                        </div>\n' +
                '                    ))}\n' +
                '                    <span>More</span>\n' +
                '                </div>\n' +
                '\n' +
                '                {/* the graph grid */}\n' +
                '                <div className="relative overflow-x-auto pb-1 scrollbar w-full">\n' +
                '                    <div className="flex gap-1">\n' +
                '                        {weeks.map((week, weekIndex) => (\n' +
                '                            <div key={weekIndex} className="flex flex-col gap-1">\n' +
                '                                {week.map((day, dayIndex) => (\n' +
                '                                    <div\n' +
                '                                        key={dayIndex}\n' +
                '                                        className="w-3 h-3 rounded-sm dark:border-slate-800 cursor-pointer transition-colors duration-200 border border-gray-200 hover:border-gray-400"\n' +
                '                                        style={{ backgroundColor: getActivityColor(day.count) }}\n' +
                '                                        onMouseMove={(e) => handleMouseMove(e, day)}\n' +
                '                                        onMouseLeave={handleMouseLeave}\n' +
                '                                    />\n' +
                '                                ))}\n' +
                '                            </div>\n' +
                '                        ))}\n' +
                '                    </div>\n' +
                '\n' +
                '                    {/* tooltip */}\n' +
                '                    {tooltip.show && (\n' +
                '                        <div\n' +
                '                            className="fixed z-50 px-3 py-2 dark:bg-slate-800 dark:text-[#abc2d3] text-sm text-white bg-gray-800 rounded-md pointer-events-none"\n' +
                '                            style={{\n' +
                '                                left: `${tooltip.x}px`,\n' +
                '                                top: `${tooltip.y}px`,\n' +
                '                                width: \'max-content\',\n' +
                '                                transition: \'transform 0.1s ease-out\'\n' +
                '                            }}\n' +
                '                        >\n' +
                '                            <div>{tooltip.content}</div>\n' +
                '                        </div>\n' +
                '                    )}\n' +
                '                </div>\n' +
                '\n' +
                '                {/* from and to date which graph you showing here */}\n' +
                '                <div className="flex justify-between text-sm dark:text-[#abc2d3] text-gray-600">\n' +
                '                    <span>{formatDate(data[0].date)}</span>\n' +
                '                    <span>{formatDate(data[data.length - 1].date)}</span>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    );\n' +
                '};\n' +
                '\n' +
                'export default ActivityGraph;'
        },
        {
            id: 'data',
            displayText: 'Data.js',
            language: 'js',
            code: '    export const activityData = {\n' +
                '        \'2024-01-01\': 1,\n' +
                '        \'2024-01-02\': 5,\n' +
                '        \'2024-01-03\': 2,\n' +
                '        \'2024-01-04\': 10,\n' +
                '        \'2024-01-05\': 5,\n' +
                '        \'2024-01-06\': 9,\n' +
                '        \'2024-01-16\': 4,\n' +
                '        \'2024-01-17\': 5,\n' +
                '        \'2024-01-18\': 9,\n' +
                '        \'2024-01-19\': 2,\n' +
                '        \'2024-01-20\': 10,\n' +
                '        \'2024-02-03\': 4,\n' +
                '        \'2024-02-04\': 3,\n' +
                '        \'2024-02-05\': 8,\n' +
                '        \'2024-02-06\': 7,\n' +
                '        \'2024-02-07\': 7,\n' +
                '        \'2024-02-08\': 1,\n' +
                '        \'2024-02-09\': 9,\n' +
                '        \'2024-02-10\': 9,\n' +
                '        \'2024-02-11\': 6,\n' +
                '        \'2024-02-12\': 4,\n' +
                '        \'2024-02-13\': 1,\n' +
                '        \'2024-02-14\': 2,\n' +
                '        \'2024-02-15\': 2,\n' +
                '        \'2024-02-16\': 4,\n' +
                '        \'2024-02-17\': 0,\n' +
                '        \'2024-02-18\': 5,\n' +
                '        \'2024-02-19\': 4,\n' +
                '        \'2024-02-20\': 9,\n' +
                '        \'2024-02-21\': 5,\n' +
                '        \'2024-02-22\': 3,\n' +
                '        \'2024-02-23\': 7,\n' +
                '        \'2024-02-24\': 6,\n' +
                '        \'2024-02-25\': 6,\n' +
                '        \'2024-02-26\': 9,\n' +
                '        \'2024-02-27\': 4,\n' +
                '        \'2024-02-28\': 2,\n' +
                '        \'2024-02-29\': 0,\n' +
                '        \'2024-03-01\': 3,\n' +
                '        \'2024-03-02\': 9,\n' +
                '        \'2024-03-03\': 4,\n' +
                '        \'2024-03-04\': 1,\n' +
                '        \'2024-03-05\': 9,\n' +
                '        \'2024-03-06\': 10,\n' +
                '        \'2024-03-07\': 4,\n' +
                '        \'2024-03-08\': 4,\n' +
                '        \'2024-03-09\': 3,\n' +
                '        \'2024-03-10\': 2,\n' +
                '        \'2024-03-11\': 10,\n' +
                '        \'2024-03-12\': 7,\n' +
                '        \'2024-03-13\': 3,\n' +
                '        \'2024-03-24\': 0,\n' +
                '        \'2024-03-25\': 1,\n' +
                '        \'2024-03-26\': 5,\n' +
                '        \'2024-03-27\': 0,\n' +
                '        \'2024-03-28\': 5,\n' +
                '        \'2024-03-29\': 4,\n' +
                '        \'2024-03-30\': 5,\n' +
                '        \'2024-03-31\': 7,\n' +
                '        \'2024-04-01\': 5,\n' +
                '        \'2024-04-02\': 0,\n' +
                '        \'2024-04-03\': 4,\n' +
                '        \'2024-04-04\': 6,\n' +
                '        \'2024-04-05\': 2,\n' +
                '        \'2024-04-06\': 10,\n' +
                '        \'2024-04-24\': 9,\n' +
                '        \'2024-04-25\': 2,\n' +
                '        \'2024-04-26\': 5,\n' +
                '        \'2024-04-27\': 3,\n' +
                '        \'2024-04-28\': 8,\n' +
                '        \'2024-04-29\': 6,\n' +
                '        \'2024-04-30\': 7,\n' +
                '        \'2024-05-01\': 7,\n' +
                '        \'2024-05-02\': 2,\n' +
                '        \'2024-05-03\': 3,\n' +
                '        \'2024-05-04\': 1,\n' +
                '        \'2024-05-05\': 1,\n' +
                '        \'2024-05-06\': 8,\n' +
                '        \'2024-05-07\': 5,\n' +
                '        \'2024-05-08\': 6,\n' +
                '        \'2024-05-09\': 1,\n' +
                '        \'2024-05-10\': 6,\n' +
                '        \'2024-05-11\': 10,\n' +
                '        \'2024-05-12\': 2,\n' +
                '        \'2024-05-13\': 10,\n' +
                '        \'2024-05-14\': 7,\n' +
                '        \'2024-05-15\': 6,\n' +
                '        \'2024-05-16\': 2,\n' +
                '        \'2024-05-17\': 5,\n' +
                '        \'2024-05-18\': 8,\n' +
                '        \'2024-05-19\': 8,\n' +
                '        \'2024-05-20\': 7,\n' +
                '        \'2024-05-21\': 9,\n' +
                '        \'2024-05-22\': 6,\n' +
                '        \'2024-05-23\': 2,\n' +
                '        \'2024-05-24\': 9,\n' +
                '        \'2024-05-25\': 9,\n' +
                '        \'2024-05-26\': 8,\n' +
                '        \'2024-05-27\': 3,\n' +
                '        \'2024-05-28\': 1,\n' +
                '        \'2024-05-29\': 6,\n' +
                '        \'2024-05-30\': 1,\n' +
                '        \'2024-05-31\': 8,\n' +
                '        \'2024-06-01\': 2,\n' +
                '        \'2024-06-02\': 10,\n' +
                '        \'2024-06-03\': 7,\n' +
                '        \'2024-06-04\': 4,\n' +
                '        \'2024-06-05\': 9,\n' +
                '        \'2024-06-06\': 5,\n' +
                '        \'2024-06-07\': 8,\n' +
                '        \'2024-06-08\': 10,\n' +
                '        \'2024-06-09\': 0,\n' +
                '        \'2024-06-10\': 0,\n' +
                '        \'2024-06-11\': 3,\n' +
                '        \'2024-06-12\': 4,\n' +
                '        \'2024-06-13\': 5,\n' +
                '        \'2024-06-14\': 6,\n' +
                '        \'2024-06-15\': 5,\n' +
                '        \'2024-06-16\': 0,\n' +
                '        \'2024-07-03\': 9,\n' +
                '        \'2024-07-04\': 6,\n' +
                '        \'2024-07-05\': 0,\n' +
                '        \'2024-07-06\': 8,\n' +
                '        \'2024-07-07\': 10,\n' +
                '        \'2024-07-08\': 3,\n' +
                '        \'2024-07-09\': 5,\n' +
                '        \'2024-07-10\': 0,\n' +
                '        \'2024-07-11\': 4,\n' +
                '        \'2024-07-12\': 0,\n' +
                '        \'2024-07-13\': 9,\n' +
                '        \'2024-07-14\': 6,\n' +
                '        \'2024-07-15\': 5,\n' +
                '        \'2024-07-16\': 6,\n' +
                '        \'2024-07-17\': 2,\n' +
                '        \'2024-07-18\': 6,\n' +
                '        \'2024-07-19\': 10,\n' +
                '        \'2024-07-20\': 8,\n' +
                '        \'2024-07-27\': 10,\n' +
                '        \'2024-07-28\': 6,\n' +
                '        \'2024-07-29\': 5,\n' +
                '        \'2024-07-30\': 1,\n' +
                '        \'2024-07-31\': 5,\n' +
                '        \'2024-08-01\': 5,\n' +
                '        \'2024-08-02\': 10,\n' +
                '        \'2024-08-03\': 2,\n' +
                '        \'2024-08-17\': 3,\n' +
                '        \'2024-08-18\': 1,\n' +
                '        \'2024-08-19\': 1,\n' +
                '        \'2024-08-20\': 0,\n' +
                '        \'2024-08-21\': 8,\n' +
                '        \'2024-08-22\': 10,\n' +
                '        \'2024-08-23\': 2,\n' +
                '        \'2024-08-24\': 7,\n' +
                '        \'2024-08-25\': 4,\n' +
                '        \'2024-08-26\': 9,\n' +
                '        \'2024-08-27\': 9,\n' +
                '        \'2024-08-28\': 7,\n' +
                '        \'2024-08-29\': 2,\n' +
                '        \'2024-08-30\': 2,\n' +
                '        \'2024-08-31\': 5,\n' +
                '        \'2024-09-01\': 3,\n' +
                '        \'2024-09-02\': 4,\n' +
                '        \'2024-09-03\': 1,\n' +
                '        \'2024-09-04\': 8,\n' +
                '        \'2024-09-05\': 8,\n' +
                '        \'2024-09-06\': 1,\n' +
                '        \'2024-09-07\': 8,\n' +
                '        \'2024-09-08\': 6,\n' +
                '        \'2024-09-09\': 0,\n' +
                '        \'2024-09-10\': 9,\n' +
                '        \'2024-09-11\': 10,\n' +
                '        \'2024-09-12\': 1,\n' +
                '        \'2024-09-13\': 8,\n' +
                '        \'2024-09-14\': 1,\n' +
                '        \'2024-09-15\': 5,\n' +
                '        \'2024-09-16\': 4,\n' +
                '        \'2024-09-17\': 7,\n' +
                '        \'2024-09-18\': 7,\n' +
                '        \'2024-09-19\': 8,\n' +
                '        \'2024-09-20\': 9,\n' +
                '        \'2024-09-21\': 9,\n' +
                '        \'2024-09-22\': 3,\n' +
                '        \'2024-09-23\': 5,\n' +
                '        \'2024-09-24\': 3,\n' +
                '        \'2024-09-25\': 6,\n' +
                '        \'2024-09-26\': 1,\n' +
                '        \'2024-09-27\': 6,\n' +
                '        \'2024-09-28\': 0,\n' +
                '        \'2024-09-29\': 4,\n' +
                '        \'2024-09-30\': 2,\n' +
                '        \'2024-10-01\': 3,\n' +
                '        \'2024-10-02\': 6,\n' +
                '        \'2024-10-03\': 10,\n' +
                '        \'2024-10-04\': 3,\n' +
                '        \'2024-10-24\': 1,\n' +
                '        \'2024-10-25\': 4,\n' +
                '        \'2024-10-26\': 0,\n' +
                '        \'2024-10-27\': 7,\n' +
                '        \'2024-10-28\': 6,\n' +
                '        \'2024-10-29\': 9,\n' +
                '        \'2024-10-30\': 5,\n' +
                '        \'2024-10-31\': 9,\n' +
                '        \'2024-11-01\': 0,\n' +
                '        \'2024-11-02\': 7,\n' +
                '        \'2024-11-03\': 7,\n' +
                '        \'2024-11-04\': 1,\n' +
                '        \'2024-11-05\': 8,\n' +
                '        \'2024-11-06\': 4,\n' +
                '        \'2024-11-07\': 0,\n' +
                '        \'2024-11-08\': 0,\n' +
                '        \'2024-11-09\': 6,\n' +
                '        \'2024-11-10\': 2,\n' +
                '        \'2024-11-11\': 10,\n' +
                '        \'2024-11-12\': 7,\n' +
                '        \'2024-11-13\': 7,\n' +
                '        \'2024-11-14\': 5,\n' +
                '        \'2024-11-15\': 7,\n' +
                '        \'2024-11-16\': 9,\n' +
                '        \'2024-11-17\': 5,\n' +
                '        \'2024-11-18\': 1,\n' +
                '        \'2024-11-19\': 0,\n' +
                '        \'2024-11-20\': 6,\n' +
                '        \'2024-11-21\': 8,\n' +
                '        \'2024-11-22\': 10,\n' +
                '        \'2024-11-23\': 1,\n' +
                '        \'2024-11-24\': 10,\n' +
                '        \'2024-11-25\': 4,\n' +
                '        \'2024-11-26\': 5,\n' +
                '        \'2024-11-27\': 0,\n' +
                '        \'2024-11-28\': 6,\n' +
                '        \'2024-11-29\': 6,\n' +
                '        \'2024-11-30\': 3,\n' +
                '        \'2024-12-01\': 8,\n' +
                '    };'
        },
    ]

    const activityGraphWithMonthCodes = [
        {
            id: 'main_code',
            displayText: 'ActivityGraph.jsx',
            language: 'jsx',
            code: 'import React, { useState, useCallback } from \'react\';\n' +
                'import {activityData} from "./Data.js"\n' +
                '\n' +
                'const ActivityGraph = () => {\n' +
                '    // tooltip\n' +
                '    const [tooltip, setTooltip] = useState({\n' +
                '        show: false,\n' +
                '        content: \'\',\n' +
                '        x: 0,\n' +
                '        y: 0,\n' +
                '        position: \'top\'\n' +
                '    });\n' +
                '\n' +
                '    // generate dates data\n' +
                '    const generateDates = () => {\n' +
                '        const dates = [];\n' +
                '        const now = new Date();\n' +
                '        for (let i = 0; i < 52 * 7; i++) {\n' +
                '            const date = new Date(now);\n' +
                '            date.setDate(date.getDate() - i);\n' +
                '            const dateStr = date.toISOString().split(\'T\')[0];\n' +
                '            dates.unshift({\n' +
                '                date: dateStr,\n' +
                '                count: activityData[dateStr] || 0\n' +
                '            });\n' +
                '        }\n' +
                '        return dates;\n' +
                '    };\n' +
                '\n' +
                '    // group the weeks by the data\n' +
                '    const groupDataByWeeks = (dates) => {\n' +
                '        const weeks = [];\n' +
                '        for (let i = 0; i < dates.length; i += 7) {\n' +
                '            weeks.push(dates.slice(i, i + 7));\n' +
                '        }\n' +
                '        return weeks;\n' +
                '    };\n' +
                '\n' +
                '    // get the month name from the dates data\n' +
                '    const getMonthLabels = (dates) => {\n' +
                '        const months = [];\n' +
                '        let currentMonth = \'\';\n' +
                '        let currentStartIndex = 0;\n' +
                '\n' +
                '        dates.forEach((date, index) => {\n' +
                '            const month = new Date(date.date).toLocaleString(\'default\', { month: \'short\' });\n' +
                '            if (month !== currentMonth) {\n' +
                '                if (currentMonth !== \'\') {\n' +
                '                    months.push({\n' +
                '                        month: currentMonth,\n' +
                '                        startIndex: currentStartIndex,\n' +
                '                        endIndex: Math.floor(index / 7)\n' +
                '                    });\n' +
                '                }\n' +
                '                currentMonth = month;\n' +
                '                currentStartIndex = Math.floor(index / 7);\n' +
                '            }\n' +
                '        });\n' +
                '\n' +
                '        // Add the last month\n' +
                '        months.push({\n' +
                '            month: currentMonth,\n' +
                '            startIndex: currentStartIndex,\n' +
                '            endIndex: Math.floor(dates.length / 7)\n' +
                '        });\n' +
                '\n' +
                '        return months;\n' +
                '    };\n' +
                '\n' +
                '    const data = generateDates();\n' +
                '    const weeks = groupDataByWeeks(data);\n' +
                '    const months = getMonthLabels(data);\n' +
                '\n' +
                '    // get the activity color based on the activity count\n' +
                '    const getActivityColor = (count) => {\n' +
                '        const isDarkMode = document.documentElement.classList.contains(\'dark\');\n' +
                '\n' +
                '        if (count === 0) return isDarkMode ? \'#0f172a\' : \'#ebedf0\';\n' +
                '\n' +
                '        if (isDarkMode) {\n' +
                '            if (count <= 2) return \'#0e4429\';\n' +
                '            if (count <= 4) return \'#006d32\';\n' +
                '            if (count <= 6) return \'#26a641\';\n' +
                '            return \'#39d353\';\n' +
                '        } else {\n' +
                '            if (count <= 2) return \'#9be9a8\';\n' +
                '            if (count <= 4) return \'#40c463\';\n' +
                '            if (count <= 6) return \'#30a14e\';\n' +
                '            return \'#216e39\';\n' +
                '        }\n' +
                '    };\n' +
                '\n' +
                '    // format the date\n' +
                '    const formatDate = (dateString) => {\n' +
                '        return new Date(dateString).toLocaleDateString(\'en-US\', {\n' +
                '            month: \'short\',\n' +
                '            day: \'numeric\',\n' +
                '            year: \'numeric\'\n' +
                '        });\n' +
                '    };\n' +
                '\n' +
                '    // handle mouse move for showing the tooltip current position\n' +
                '    const handleMouseMove = useCallback((e, day) => {\n' +
                '        const rect = e.target.getBoundingClientRect();\n' +
                '        const tooltipWidth = 200;\n' +
                '        const tooltipHeight = 60;\n' +
                '        const windowWidth = window.innerWidth;\n' +
                '        const windowHeight = window.innerHeight;\n' +
                '        const scrollY = window.scrollY || window.pageYOffset;\n' +
                '\n' +
                '        // Determine optimal position\n' +
                '        let position = \'top\';\n' +
                '        let x = rect.left;\n' +
                '        let y = rect.top + scrollY;\n' +
                '\n' +
                '        // Calculate available space in different directions\n' +
                '        const spaceRight = windowWidth - rect.right;\n' +
                '        const spaceLeft = rect.left;\n' +
                '        const spaceTop = rect.top;\n' +
                '        const spaceBottom = windowHeight - rect.bottom;\n' +
                '\n' +
                '        // Horizontal position\n' +
                '        if (spaceRight < tooltipWidth / 2 && spaceLeft > tooltipWidth / 2) {\n' +
                '            x = rect.right - tooltipWidth;\n' +
                '        } else if (spaceLeft < tooltipWidth / 2 && spaceRight > tooltipWidth / 2) {\n' +
                '            x = rect.left;\n' +
                '        } else {\n' +
                '            x = rect.left - (tooltipWidth / 2) + (rect.width / 2);\n' +
                '        }\n' +
                '\n' +
                '        // Vertical position\n' +
                '        if (spaceTop < tooltipHeight && spaceBottom > tooltipHeight) {\n' +
                '            y = rect.bottom + scrollY + 5;\n' +
                '            position = \'bottom\';\n' +
                '        } else {\n' +
                '            y = rect.top + scrollY - tooltipHeight + 15;\n' +
                '            position = \'top\';\n' +
                '        }\n' +
                '\n' +
                '        // Ensure tooltip stays within window bounds\n' +
                '        x = Math.max(10, Math.min(windowWidth - tooltipWidth - 10, x));\n' +
                '\n' +
                '        setTooltip({\n' +
                '            show: true,\n' +
                '            content: `${day.count} contributions on ${formatDate(day.date)}`,\n' +
                '            x,\n' +
                '            y,\n' +
                '            position\n' +
                '        });\n' +
                '    }, []);\n' +
                '\n' +
                '    const handleMouseLeave = () => {\n' +
                '        setTooltip(prev => ({ ...prev, show: false }));\n' +
                '    };\n' +
                '\n' +
                '    return (\n' +
                '        <div className="p-6 w-full max-w-4xl">\n' +
                '            <h2 className="text-xl text-gray-800 dark:text-[#abc2d3] font-bold mb-7">Activity Contributions</h2>\n' +
                '\n' +
                '            <div className="flex flex-col gap-4">\n' +
                '                <div className="relative overflow-x-auto pb-2 scrollbar">\n' +
                '                    <div className="flex">\n' +
                '                        <div className="w-full">\n' +
                '\n' +
                '                            {/* month names*/}\n' +
                '                            <div className="flex relative h-6 mb-1">\n' +
                '                                {months.map((monthData, index) => {\n' +
                '                                    const width = (monthData.endIndex - monthData.startIndex) * 16;\n' +
                '                                    const left = monthData.startIndex * 16;\n' +
                '                                    return (\n' +
                '                                        <div\n' +
                '                                            key={index}\n' +
                '                                            className="absolute dark:text-[#abc2d3] text-xs text-gray-600 text-center"\n' +
                '                                            style={{\n' +
                '                                                left: `${left}px`,\n' +
                '                                                width: `${width}px`\n' +
                '                                            }}\n' +
                '                                        >\n' +
                '                                            {monthData.month}\n' +
                '                                        </div>\n' +
                '                                    );\n' +
                '                                })}\n' +
                '                            </div>\n' +
                '\n' +
                '                            {/* graph */}\n' +
                '                            <div className="flex gap-1">\n' +
                '                                {weeks.map((week, weekIndex) => (\n' +
                '                                    <div key={weekIndex} className="flex flex-col gap-1">\n' +
                '                                        {week.map((day, dayIndex) => (\n' +
                '                                            <div\n' +
                '                                                key={dayIndex}\n' +
                '                                                className="w-3 h-3 rounded-sm cursor-pointer transition-colors duration-200 border border-gray-200 dark:border-slate-800 hover:border-gray-400"\n' +
                '                                                style={{ backgroundColor: getActivityColor(day.count) }}\n' +
                '                                                onMouseMove={(e) => handleMouseMove(e, day)}\n' +
                '                                                onMouseLeave={handleMouseLeave}\n' +
                '                                            />\n' +
                '                                        ))}\n' +
                '                                    </div>\n' +
                '                                ))}\n' +
                '                            </div>\n' +
                '\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '\n' +
                '                    {/* tooltip */}\n' +
                '                    {tooltip.show && (\n' +
                '                        <div\n' +
                '                            className="fixed z-50 px-3 dark:bg-slate-800 dark:text-[#abc2d3] py-2 text-sm text-white bg-gray-800 rounded-md pointer-events-none"\n' +
                '                            style={{\n' +
                '                                left: `${tooltip.x}px`,\n' +
                '                                top: `${tooltip.y}px`,\n' +
                '                                width: \'max-content\',\n' +
                '                                transition: \'transform 0.1s ease-out\'\n' +
                '                            }}\n' +
                '                        >\n' +
                '                            <div>{tooltip.content}</div>\n' +
                '                        </div>\n' +
                '                    )}\n' +
                '                </div>\n' +
                '\n' +
                '                <div className="flex items-center justify-end gap-2 dark:text-[#abc2d3] text-[0.8rem] text-gray-600">\n' +
                '                    <span>Less</span>\n' +
                '                    {[0, 1, 3, 5, 7].map((count, i) => (\n' +
                '                        <div key={i} className="flex flex-col items-center">\n' +
                '                            <div\n' +
                '                                className="w-3 h-3 border dark:border-slate-800 rounded-sm border-gray-200"\n' +
                '                                style={{backgroundColor: getActivityColor(count)}}\n' +
                '                            />\n' +
                '                        </div>\n' +
                '                    ))}\n' +
                '                    <span>More</span>\n' +
                '                </div>\n' +
                '\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    );\n' +
                '};\n' +
                '\n' +
                'export default ActivityGraph;'
        },
        {
            id: 'data',
            displayText: 'Data.js',
            language: 'js',
            code: '    export const activityData = {\n' +
                '        \'2024-01-01\': 1,\n' +
                '        \'2024-01-02\': 5,\n' +
                '        \'2024-01-03\': 2,\n' +
                '        \'2024-01-04\': 10,\n' +
                '        \'2024-01-05\': 5,\n' +
                '        \'2024-01-06\': 9,\n' +
                '        \'2024-01-16\': 4,\n' +
                '        \'2024-01-17\': 5,\n' +
                '        \'2024-01-18\': 9,\n' +
                '        \'2024-01-19\': 2,\n' +
                '        \'2024-01-20\': 10,\n' +
                '        \'2024-02-03\': 4,\n' +
                '        \'2024-02-04\': 3,\n' +
                '        \'2024-02-05\': 8,\n' +
                '        \'2024-02-06\': 7,\n' +
                '        \'2024-02-07\': 7,\n' +
                '        \'2024-02-08\': 1,\n' +
                '        \'2024-02-09\': 9,\n' +
                '        \'2024-02-10\': 9,\n' +
                '        \'2024-02-11\': 6,\n' +
                '        \'2024-02-12\': 4,\n' +
                '        \'2024-02-13\': 1,\n' +
                '        \'2024-02-14\': 2,\n' +
                '        \'2024-02-15\': 2,\n' +
                '        \'2024-02-16\': 4,\n' +
                '        \'2024-02-17\': 0,\n' +
                '        \'2024-02-18\': 5,\n' +
                '        \'2024-02-19\': 4,\n' +
                '        \'2024-02-20\': 9,\n' +
                '        \'2024-02-21\': 5,\n' +
                '        \'2024-02-22\': 3,\n' +
                '        \'2024-02-23\': 7,\n' +
                '        \'2024-02-24\': 6,\n' +
                '        \'2024-02-25\': 6,\n' +
                '        \'2024-02-26\': 9,\n' +
                '        \'2024-02-27\': 4,\n' +
                '        \'2024-02-28\': 2,\n' +
                '        \'2024-02-29\': 0,\n' +
                '        \'2024-03-01\': 3,\n' +
                '        \'2024-03-02\': 9,\n' +
                '        \'2024-03-03\': 4,\n' +
                '        \'2024-03-04\': 1,\n' +
                '        \'2024-03-05\': 9,\n' +
                '        \'2024-03-06\': 10,\n' +
                '        \'2024-03-07\': 4,\n' +
                '        \'2024-03-08\': 4,\n' +
                '        \'2024-03-09\': 3,\n' +
                '        \'2024-03-10\': 2,\n' +
                '        \'2024-03-11\': 10,\n' +
                '        \'2024-03-12\': 7,\n' +
                '        \'2024-03-13\': 3,\n' +
                '        \'2024-03-24\': 0,\n' +
                '        \'2024-03-25\': 1,\n' +
                '        \'2024-03-26\': 5,\n' +
                '        \'2024-03-27\': 0,\n' +
                '        \'2024-03-28\': 5,\n' +
                '        \'2024-03-29\': 4,\n' +
                '        \'2024-03-30\': 5,\n' +
                '        \'2024-03-31\': 7,\n' +
                '        \'2024-04-01\': 5,\n' +
                '        \'2024-04-02\': 0,\n' +
                '        \'2024-04-03\': 4,\n' +
                '        \'2024-04-04\': 6,\n' +
                '        \'2024-04-05\': 2,\n' +
                '        \'2024-04-06\': 10,\n' +
                '        \'2024-04-24\': 9,\n' +
                '        \'2024-04-25\': 2,\n' +
                '        \'2024-04-26\': 5,\n' +
                '        \'2024-04-27\': 3,\n' +
                '        \'2024-04-28\': 8,\n' +
                '        \'2024-04-29\': 6,\n' +
                '        \'2024-04-30\': 7,\n' +
                '        \'2024-05-01\': 7,\n' +
                '        \'2024-05-02\': 2,\n' +
                '        \'2024-05-03\': 3,\n' +
                '        \'2024-05-04\': 1,\n' +
                '        \'2024-05-05\': 1,\n' +
                '        \'2024-05-06\': 8,\n' +
                '        \'2024-05-07\': 5,\n' +
                '        \'2024-05-08\': 6,\n' +
                '        \'2024-05-09\': 1,\n' +
                '        \'2024-05-10\': 6,\n' +
                '        \'2024-05-11\': 10,\n' +
                '        \'2024-05-12\': 2,\n' +
                '        \'2024-05-13\': 10,\n' +
                '        \'2024-05-14\': 7,\n' +
                '        \'2024-05-15\': 6,\n' +
                '        \'2024-05-16\': 2,\n' +
                '        \'2024-05-17\': 5,\n' +
                '        \'2024-05-18\': 8,\n' +
                '        \'2024-05-19\': 8,\n' +
                '        \'2024-05-20\': 7,\n' +
                '        \'2024-05-21\': 9,\n' +
                '        \'2024-05-22\': 6,\n' +
                '        \'2024-05-23\': 2,\n' +
                '        \'2024-05-24\': 9,\n' +
                '        \'2024-05-25\': 9,\n' +
                '        \'2024-05-26\': 8,\n' +
                '        \'2024-05-27\': 3,\n' +
                '        \'2024-05-28\': 1,\n' +
                '        \'2024-05-29\': 6,\n' +
                '        \'2024-05-30\': 1,\n' +
                '        \'2024-05-31\': 8,\n' +
                '        \'2024-06-01\': 2,\n' +
                '        \'2024-06-02\': 10,\n' +
                '        \'2024-06-03\': 7,\n' +
                '        \'2024-06-04\': 4,\n' +
                '        \'2024-06-05\': 9,\n' +
                '        \'2024-06-06\': 5,\n' +
                '        \'2024-06-07\': 8,\n' +
                '        \'2024-06-08\': 10,\n' +
                '        \'2024-06-09\': 0,\n' +
                '        \'2024-06-10\': 0,\n' +
                '        \'2024-06-11\': 3,\n' +
                '        \'2024-06-12\': 4,\n' +
                '        \'2024-06-13\': 5,\n' +
                '        \'2024-06-14\': 6,\n' +
                '        \'2024-06-15\': 5,\n' +
                '        \'2024-06-16\': 0,\n' +
                '        \'2024-07-03\': 9,\n' +
                '        \'2024-07-04\': 6,\n' +
                '        \'2024-07-05\': 0,\n' +
                '        \'2024-07-06\': 8,\n' +
                '        \'2024-07-07\': 10,\n' +
                '        \'2024-07-08\': 3,\n' +
                '        \'2024-07-09\': 5,\n' +
                '        \'2024-07-10\': 0,\n' +
                '        \'2024-07-11\': 4,\n' +
                '        \'2024-07-12\': 0,\n' +
                '        \'2024-07-13\': 9,\n' +
                '        \'2024-07-14\': 6,\n' +
                '        \'2024-07-15\': 5,\n' +
                '        \'2024-07-16\': 6,\n' +
                '        \'2024-07-17\': 2,\n' +
                '        \'2024-07-18\': 6,\n' +
                '        \'2024-07-19\': 10,\n' +
                '        \'2024-07-20\': 8,\n' +
                '        \'2024-07-27\': 10,\n' +
                '        \'2024-07-28\': 6,\n' +
                '        \'2024-07-29\': 5,\n' +
                '        \'2024-07-30\': 1,\n' +
                '        \'2024-07-31\': 5,\n' +
                '        \'2024-08-01\': 5,\n' +
                '        \'2024-08-02\': 10,\n' +
                '        \'2024-08-03\': 2,\n' +
                '        \'2024-08-17\': 3,\n' +
                '        \'2024-08-18\': 1,\n' +
                '        \'2024-08-19\': 1,\n' +
                '        \'2024-08-20\': 0,\n' +
                '        \'2024-08-21\': 8,\n' +
                '        \'2024-08-22\': 10,\n' +
                '        \'2024-08-23\': 2,\n' +
                '        \'2024-08-24\': 7,\n' +
                '        \'2024-08-25\': 4,\n' +
                '        \'2024-08-26\': 9,\n' +
                '        \'2024-08-27\': 9,\n' +
                '        \'2024-08-28\': 7,\n' +
                '        \'2024-08-29\': 2,\n' +
                '        \'2024-08-30\': 2,\n' +
                '        \'2024-08-31\': 5,\n' +
                '        \'2024-09-01\': 3,\n' +
                '        \'2024-09-02\': 4,\n' +
                '        \'2024-09-03\': 1,\n' +
                '        \'2024-09-04\': 8,\n' +
                '        \'2024-09-05\': 8,\n' +
                '        \'2024-09-06\': 1,\n' +
                '        \'2024-09-07\': 8,\n' +
                '        \'2024-09-08\': 6,\n' +
                '        \'2024-09-09\': 0,\n' +
                '        \'2024-09-10\': 9,\n' +
                '        \'2024-09-11\': 10,\n' +
                '        \'2024-09-12\': 1,\n' +
                '        \'2024-09-13\': 8,\n' +
                '        \'2024-09-14\': 1,\n' +
                '        \'2024-09-15\': 5,\n' +
                '        \'2024-09-16\': 4,\n' +
                '        \'2024-09-17\': 7,\n' +
                '        \'2024-09-18\': 7,\n' +
                '        \'2024-09-19\': 8,\n' +
                '        \'2024-09-20\': 9,\n' +
                '        \'2024-09-21\': 9,\n' +
                '        \'2024-09-22\': 3,\n' +
                '        \'2024-09-23\': 5,\n' +
                '        \'2024-09-24\': 3,\n' +
                '        \'2024-09-25\': 6,\n' +
                '        \'2024-09-26\': 1,\n' +
                '        \'2024-09-27\': 6,\n' +
                '        \'2024-09-28\': 0,\n' +
                '        \'2024-09-29\': 4,\n' +
                '        \'2024-09-30\': 2,\n' +
                '        \'2024-10-01\': 3,\n' +
                '        \'2024-10-02\': 6,\n' +
                '        \'2024-10-03\': 10,\n' +
                '        \'2024-10-04\': 3,\n' +
                '        \'2024-10-24\': 1,\n' +
                '        \'2024-10-25\': 4,\n' +
                '        \'2024-10-26\': 0,\n' +
                '        \'2024-10-27\': 7,\n' +
                '        \'2024-10-28\': 6,\n' +
                '        \'2024-10-29\': 9,\n' +
                '        \'2024-10-30\': 5,\n' +
                '        \'2024-10-31\': 9,\n' +
                '        \'2024-11-01\': 0,\n' +
                '        \'2024-11-02\': 7,\n' +
                '        \'2024-11-03\': 7,\n' +
                '        \'2024-11-04\': 1,\n' +
                '        \'2024-11-05\': 8,\n' +
                '        \'2024-11-06\': 4,\n' +
                '        \'2024-11-07\': 0,\n' +
                '        \'2024-11-08\': 0,\n' +
                '        \'2024-11-09\': 6,\n' +
                '        \'2024-11-10\': 2,\n' +
                '        \'2024-11-11\': 10,\n' +
                '        \'2024-11-12\': 7,\n' +
                '        \'2024-11-13\': 7,\n' +
                '        \'2024-11-14\': 5,\n' +
                '        \'2024-11-15\': 7,\n' +
                '        \'2024-11-16\': 9,\n' +
                '        \'2024-11-17\': 5,\n' +
                '        \'2024-11-18\': 1,\n' +
                '        \'2024-11-19\': 0,\n' +
                '        \'2024-11-20\': 6,\n' +
                '        \'2024-11-21\': 8,\n' +
                '        \'2024-11-22\': 10,\n' +
                '        \'2024-11-23\': 1,\n' +
                '        \'2024-11-24\': 10,\n' +
                '        \'2024-11-25\': 4,\n' +
                '        \'2024-11-26\': 5,\n' +
                '        \'2024-11-27\': 0,\n' +
                '        \'2024-11-28\': 6,\n' +
                '        \'2024-11-29\': 6,\n' +
                '        \'2024-11-30\': 3,\n' +
                '        \'2024-12-01\': 8,\n' +
                '    };'
        },
    ]

    const calculatingTotalContributionCodes = [
        {
            id: 'main_code',
            displayText: 'ActivityGraph.jsx',
            language: 'jsx',
            code: 'import React, { useState, useCallback, useMemo } from \'react\';\n' +
                'import {activityData} from "./Data.js"\n' +
                '\n' +
                'const ActivityGraph = () => {\n' +
                '    // tooltip\n' +
                '    const [tooltip, setTooltip] = useState({\n' +
                '        show: false,\n' +
                '        content: \'\',\n' +
                '        x: 0,\n' +
                '        y: 0,\n' +
                '        position: \'top\'\n' +
                '    });\n' +
                '\n' +
                '    // generate the dates data\n' +
                '    const generateDates = () => {\n' +
                '        const dates = [];\n' +
                '        const now = new Date();\n' +
                '        for (let i = 0; i < 52 * 7; i++) {\n' +
                '            const date = new Date(now);\n' +
                '            date.setDate(date.getDate() - i);\n' +
                '            const dateStr = date.toISOString().split(\'T\')[0];\n' +
                '            dates.unshift({\n' +
                '                date: dateStr,\n' +
                '                count: activityData[dateStr] || 0\n' +
                '            });\n' +
                '        }\n' +
                '        return dates;\n' +
                '    };\n' +
                '\n' +
                '    // calculate the total activity\n' +
                '    const totalContributions = useMemo(() => {\n' +
                '        return Object.values(activityData).reduce((sum, count) => sum + count, 0);\n' +
                '    }, [activityData]);\n' +
                '\n' +
                '    // make group by the weeks\n' +
                '    const groupDataByWeeks = (dates) => {\n' +
                '        const weeks = [];\n' +
                '        for (let i = 0; i < dates.length; i += 7) {\n' +
                '            weeks.push(dates.slice(i, i + 7));\n' +
                '        }\n' +
                '        return weeks;\n' +
                '    };\n' +
                '\n' +
                '    // get the month name from the date\n' +
                '    const getMonthLabels = (dates) => {\n' +
                '        const months = [];\n' +
                '        let currentMonth = \'\';\n' +
                '        let currentStartIndex = 0;\n' +
                '\n' +
                '        dates.forEach((date, index) => {\n' +
                '            const month = new Date(date.date).toLocaleString(\'default\', { month: \'short\' });\n' +
                '            if (month !== currentMonth) {\n' +
                '                if (currentMonth !== \'\') {\n' +
                '                    months.push({\n' +
                '                        month: currentMonth,\n' +
                '                        startIndex: currentStartIndex,\n' +
                '                        endIndex: Math.floor(index / 7)\n' +
                '                    });\n' +
                '                }\n' +
                '                currentMonth = month;\n' +
                '                currentStartIndex = Math.floor(index / 7);\n' +
                '            }\n' +
                '        });\n' +
                '\n' +
                '        // Add the last month\n' +
                '        months.push({\n' +
                '            month: currentMonth,\n' +
                '            startIndex: currentStartIndex,\n' +
                '            endIndex: Math.floor(dates.length / 7)\n' +
                '        });\n' +
                '\n' +
                '        return months;\n' +
                '    };\n' +
                '\n' +
                '    const data = generateDates();\n' +
                '    const weeks = groupDataByWeeks(data);\n' +
                '    const months = getMonthLabels(data);\n' +
                '\n' +
                '    // get the activity color based on the activity count\n' +
                '    const getActivityColor = (count) => {\n' +
                '        const isDarkMode = document.documentElement.classList.contains(\'dark\');\n' +
                '\n' +
                '        if (count === 0) return isDarkMode ? \'#0f172a\' : \'#ebedf0\';\n' +
                '\n' +
                '        if (isDarkMode) {\n' +
                '            if (count <= 2) return \'#0e4429\';\n' +
                '            if (count <= 4) return \'#006d32\';\n' +
                '            if (count <= 6) return \'#26a641\';\n' +
                '            return \'#39d353\';\n' +
                '        } else {\n' +
                '            if (count <= 2) return \'#9be9a8\';\n' +
                '            if (count <= 4) return \'#40c463\';\n' +
                '            if (count <= 6) return \'#30a14e\';\n' +
                '            return \'#216e39\';\n' +
                '        }\n' +
                '    };\n' +
                '\n' +
                '    // format the date\n' +
                '    const formatDate = (dateString) => {\n' +
                '        return new Date(dateString).toLocaleDateString(\'en-US\', {\n' +
                '            month: \'short\',\n' +
                '            day: \'numeric\',\n' +
                '            year: \'numeric\'\n' +
                '        });\n' +
                '    };\n' +
                '\n' +
                '    // handle the mouse move for showing the tooltip in the current position\n' +
                '    const handleMouseMove = useCallback((e, day) => {\n' +
                '        const rect = e.target.getBoundingClientRect();\n' +
                '        const tooltipWidth = 200;\n' +
                '        const tooltipHeight = 60;\n' +
                '        const windowWidth = window.innerWidth;\n' +
                '        const windowHeight = window.innerHeight;\n' +
                '        const scrollY = window.scrollY || window.pageYOffset;\n' +
                '\n' +
                '        // Determine optimal position\n' +
                '        let position = \'top\';\n' +
                '        let x = rect.left;\n' +
                '        let y = rect.top + scrollY;\n' +
                '\n' +
                '        // Calculate available space in different directions\n' +
                '        const spaceRight = windowWidth - rect.right;\n' +
                '        const spaceLeft = rect.left;\n' +
                '        const spaceTop = rect.top;\n' +
                '        const spaceBottom = windowHeight - rect.bottom;\n' +
                '\n' +
                '        // Horizontal position\n' +
                '        if (spaceRight < tooltipWidth / 2 && spaceLeft > tooltipWidth / 2) {\n' +
                '            x = rect.right - tooltipWidth;\n' +
                '        } else if (spaceLeft < tooltipWidth / 2 && spaceRight > tooltipWidth / 2) {\n' +
                '            x = rect.left;\n' +
                '        } else {\n' +
                '            x = rect.left - (tooltipWidth / 2) + (rect.width / 2);\n' +
                '        }\n' +
                '\n' +
                '        // Vertical position\n' +
                '        if (spaceTop < tooltipHeight && spaceBottom > tooltipHeight) {\n' +
                '            y = rect.bottom + scrollY + 5;\n' +
                '            position = \'bottom\';\n' +
                '        } else {\n' +
                '            y = rect.top + scrollY - tooltipHeight + 15;\n' +
                '            position = \'top\';\n' +
                '        }\n' +
                '\n' +
                '        // Ensure tooltip stays within window bounds\n' +
                '        x = Math.max(10, Math.min(windowWidth - tooltipWidth - 10, x));\n' +
                '\n' +
                '        setTooltip({\n' +
                '            show: true,\n' +
                '            content: `${day.count} contributions on ${formatDate(day.date)}`,\n' +
                '            x,\n' +
                '            y,\n' +
                '            position\n' +
                '        });\n' +
                '    }, []);\n' +
                '\n' +
                '    const handleMouseLeave = () => {\n' +
                '        setTooltip(prev => ({ ...prev, show: false }));\n' +
                '    };\n' +
                '\n' +
                '    return (\n' +
                '        <div className="p-6 w-full max-w-4xl">\n' +
                '            <h2 className="text-xl font-bold dark:text-[#abc2d3] text-gray-800 mb-7">Activity Contributions ({totalContributions})</h2>\n' +
                '\n' +
                '            <div className="flex flex-col gap-4">\n' +
                '                <div className="relative overflow-x-auto pb-2 scrollbar">\n' +
                '                    <div className="flex">\n' +
                '                        <div className="w-full">\n' +
                '\n' +
                '                            {/* month names*/}\n' +
                '                            <div className="flex relative h-6 mb-1">\n' +
                '                                {months.map((monthData, index) => {\n' +
                '                                    const width = (monthData.endIndex - monthData.startIndex) * 16;\n' +
                '                                    const left = monthData.startIndex * 16;\n' +
                '                                    return (\n' +
                '                                        <div\n' +
                '                                            key={index}\n' +
                '                                            className="absolute text-xs dark:text-[#abc2d3] text-gray-600 text-center"\n' +
                '                                            style={{\n' +
                '                                                left: `${left}px`,\n' +
                '                                                width: `${width}px`\n' +
                '                                            }}\n' +
                '                                        >\n' +
                '                                            {monthData.month}\n' +
                '                                        </div>\n' +
                '                                    );\n' +
                '                                })}\n' +
                '                            </div>\n' +
                '\n' +
                '                            {/* graph */}\n' +
                '                            <div className="flex gap-1">\n' +
                '                                {weeks.map((week, weekIndex) => (\n' +
                '                                    <div key={weekIndex} className="flex flex-col gap-1">\n' +
                '                                        {week.map((day, dayIndex) => (\n' +
                '                                            <div\n' +
                '                                                key={dayIndex}\n' +
                '                                                className="w-3 h-3 rounded-sm dark:border-slate-800 cursor-pointer transition-colors duration-200 border border-gray-200 hover:border-gray-400"\n' +
                '                                                style={{ backgroundColor: getActivityColor(day.count) }}\n' +
                '                                                onMouseMove={(e) => handleMouseMove(e, day)}\n' +
                '                                                onMouseLeave={handleMouseLeave}\n' +
                '                                            />\n' +
                '                                        ))}\n' +
                '                                    </div>\n' +
                '                                ))}\n' +
                '                            </div>\n' +
                '\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '\n' +
                '                    {/* tooltip */}\n' +
                '                    {tooltip.show && (\n' +
                '                        <div\n' +
                '                            className="fixed z-50 px-3 dark:bg-slate-800 dark:text-[#abc2d3] py-2 text-sm text-white bg-gray-800 rounded-md pointer-events-none"\n' +
                '                            style={{\n' +
                '                                left: `${tooltip.x}px`,\n' +
                '                                top: `${tooltip.y}px`,\n' +
                '                                width: \'max-content\',\n' +
                '                                transition: \'transform 0.1s ease-out\'\n' +
                '                            }}\n' +
                '                        >\n' +
                '                            <div>{tooltip.content}</div>\n' +
                '                        </div>\n' +
                '                    )}\n' +
                '                </div>\n' +
                '\n' +
                '                <div className="flex items-center justify-end dark:text-[#abc2d3] gap-2 text-[0.8rem] text-gray-600">\n' +
                '                    <span>Less</span>\n' +
                '                    {[0, 1, 3, 5, 7].map((count, i) => (\n' +
                '                        <div key={i} className="flex flex-col items-center">\n' +
                '                            <div\n' +
                '                                className="w-3 h-3 border dark:border-slate-800 rounded-sm border-gray-200"\n' +
                '                                style={{backgroundColor: getActivityColor(count)}}\n' +
                '                            />\n' +
                '                        </div>\n' +
                '                    ))}\n' +
                '                    <span>More</span>\n' +
                '                </div>\n' +
                '\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    );\n' +
                '};\n' +
                '\n' +
                'export default ActivityGraph;'
        },
        {
            id: 'data',
            displayText: 'Data.js',
            language: 'js',
            code: '    export const activityData = {\n' +
                '        \'2024-01-01\': 1,\n' +
                '        \'2024-01-02\': 5,\n' +
                '        \'2024-01-03\': 2,\n' +
                '        \'2024-01-04\': 10,\n' +
                '        \'2024-01-05\': 5,\n' +
                '        \'2024-01-06\': 9,\n' +
                '        \'2024-01-16\': 4,\n' +
                '        \'2024-01-17\': 5,\n' +
                '        \'2024-01-18\': 9,\n' +
                '        \'2024-01-19\': 2,\n' +
                '        \'2024-01-20\': 10,\n' +
                '        \'2024-02-03\': 4,\n' +
                '        \'2024-02-04\': 3,\n' +
                '        \'2024-02-05\': 8,\n' +
                '        \'2024-02-06\': 7,\n' +
                '        \'2024-02-07\': 7,\n' +
                '        \'2024-02-08\': 1,\n' +
                '        \'2024-02-09\': 9,\n' +
                '        \'2024-02-10\': 9,\n' +
                '        \'2024-02-11\': 6,\n' +
                '        \'2024-02-12\': 4,\n' +
                '        \'2024-02-13\': 1,\n' +
                '        \'2024-02-14\': 2,\n' +
                '        \'2024-02-15\': 2,\n' +
                '        \'2024-02-16\': 4,\n' +
                '        \'2024-02-17\': 0,\n' +
                '        \'2024-02-18\': 5,\n' +
                '        \'2024-02-19\': 4,\n' +
                '        \'2024-02-20\': 9,\n' +
                '        \'2024-02-21\': 5,\n' +
                '        \'2024-02-22\': 3,\n' +
                '        \'2024-02-23\': 7,\n' +
                '        \'2024-02-24\': 6,\n' +
                '        \'2024-02-25\': 6,\n' +
                '        \'2024-02-26\': 9,\n' +
                '        \'2024-02-27\': 4,\n' +
                '        \'2024-02-28\': 2,\n' +
                '        \'2024-02-29\': 0,\n' +
                '        \'2024-03-01\': 3,\n' +
                '        \'2024-03-02\': 9,\n' +
                '        \'2024-03-03\': 4,\n' +
                '        \'2024-03-04\': 1,\n' +
                '        \'2024-03-05\': 9,\n' +
                '        \'2024-03-06\': 10,\n' +
                '        \'2024-03-07\': 4,\n' +
                '        \'2024-03-08\': 4,\n' +
                '        \'2024-03-09\': 3,\n' +
                '        \'2024-03-10\': 2,\n' +
                '        \'2024-03-11\': 10,\n' +
                '        \'2024-03-12\': 7,\n' +
                '        \'2024-03-13\': 3,\n' +
                '        \'2024-03-24\': 0,\n' +
                '        \'2024-03-25\': 1,\n' +
                '        \'2024-03-26\': 5,\n' +
                '        \'2024-03-27\': 0,\n' +
                '        \'2024-03-28\': 5,\n' +
                '        \'2024-03-29\': 4,\n' +
                '        \'2024-03-30\': 5,\n' +
                '        \'2024-03-31\': 7,\n' +
                '        \'2024-04-01\': 5,\n' +
                '        \'2024-04-02\': 0,\n' +
                '        \'2024-04-03\': 4,\n' +
                '        \'2024-04-04\': 6,\n' +
                '        \'2024-04-05\': 2,\n' +
                '        \'2024-04-06\': 10,\n' +
                '        \'2024-04-24\': 9,\n' +
                '        \'2024-04-25\': 2,\n' +
                '        \'2024-04-26\': 5,\n' +
                '        \'2024-04-27\': 3,\n' +
                '        \'2024-04-28\': 8,\n' +
                '        \'2024-04-29\': 6,\n' +
                '        \'2024-04-30\': 7,\n' +
                '        \'2024-05-01\': 7,\n' +
                '        \'2024-05-02\': 2,\n' +
                '        \'2024-05-03\': 3,\n' +
                '        \'2024-05-04\': 1,\n' +
                '        \'2024-05-05\': 1,\n' +
                '        \'2024-05-06\': 8,\n' +
                '        \'2024-05-07\': 5,\n' +
                '        \'2024-05-08\': 6,\n' +
                '        \'2024-05-09\': 1,\n' +
                '        \'2024-05-10\': 6,\n' +
                '        \'2024-05-11\': 10,\n' +
                '        \'2024-05-12\': 2,\n' +
                '        \'2024-05-13\': 10,\n' +
                '        \'2024-05-14\': 7,\n' +
                '        \'2024-05-15\': 6,\n' +
                '        \'2024-05-16\': 2,\n' +
                '        \'2024-05-17\': 5,\n' +
                '        \'2024-05-18\': 8,\n' +
                '        \'2024-05-19\': 8,\n' +
                '        \'2024-05-20\': 7,\n' +
                '        \'2024-05-21\': 9,\n' +
                '        \'2024-05-22\': 6,\n' +
                '        \'2024-05-23\': 2,\n' +
                '        \'2024-05-24\': 9,\n' +
                '        \'2024-05-25\': 9,\n' +
                '        \'2024-05-26\': 8,\n' +
                '        \'2024-05-27\': 3,\n' +
                '        \'2024-05-28\': 1,\n' +
                '        \'2024-05-29\': 6,\n' +
                '        \'2024-05-30\': 1,\n' +
                '        \'2024-05-31\': 8,\n' +
                '        \'2024-06-01\': 2,\n' +
                '        \'2024-06-02\': 10,\n' +
                '        \'2024-06-03\': 7,\n' +
                '        \'2024-06-04\': 4,\n' +
                '        \'2024-06-05\': 9,\n' +
                '        \'2024-06-06\': 5,\n' +
                '        \'2024-06-07\': 8,\n' +
                '        \'2024-06-08\': 10,\n' +
                '        \'2024-06-09\': 0,\n' +
                '        \'2024-06-10\': 0,\n' +
                '        \'2024-06-11\': 3,\n' +
                '        \'2024-06-12\': 4,\n' +
                '        \'2024-06-13\': 5,\n' +
                '        \'2024-06-14\': 6,\n' +
                '        \'2024-06-15\': 5,\n' +
                '        \'2024-06-16\': 0,\n' +
                '        \'2024-07-03\': 9,\n' +
                '        \'2024-07-04\': 6,\n' +
                '        \'2024-07-05\': 0,\n' +
                '        \'2024-07-06\': 8,\n' +
                '        \'2024-07-07\': 10,\n' +
                '        \'2024-07-08\': 3,\n' +
                '        \'2024-07-09\': 5,\n' +
                '        \'2024-07-10\': 0,\n' +
                '        \'2024-07-11\': 4,\n' +
                '        \'2024-07-12\': 0,\n' +
                '        \'2024-07-13\': 9,\n' +
                '        \'2024-07-14\': 6,\n' +
                '        \'2024-07-15\': 5,\n' +
                '        \'2024-07-16\': 6,\n' +
                '        \'2024-07-17\': 2,\n' +
                '        \'2024-07-18\': 6,\n' +
                '        \'2024-07-19\': 10,\n' +
                '        \'2024-07-20\': 8,\n' +
                '        \'2024-07-27\': 10,\n' +
                '        \'2024-07-28\': 6,\n' +
                '        \'2024-07-29\': 5,\n' +
                '        \'2024-07-30\': 1,\n' +
                '        \'2024-07-31\': 5,\n' +
                '        \'2024-08-01\': 5,\n' +
                '        \'2024-08-02\': 10,\n' +
                '        \'2024-08-03\': 2,\n' +
                '        \'2024-08-17\': 3,\n' +
                '        \'2024-08-18\': 1,\n' +
                '        \'2024-08-19\': 1,\n' +
                '        \'2024-08-20\': 0,\n' +
                '        \'2024-08-21\': 8,\n' +
                '        \'2024-08-22\': 10,\n' +
                '        \'2024-08-23\': 2,\n' +
                '        \'2024-08-24\': 7,\n' +
                '        \'2024-08-25\': 4,\n' +
                '        \'2024-08-26\': 9,\n' +
                '        \'2024-08-27\': 9,\n' +
                '        \'2024-08-28\': 7,\n' +
                '        \'2024-08-29\': 2,\n' +
                '        \'2024-08-30\': 2,\n' +
                '        \'2024-08-31\': 5,\n' +
                '        \'2024-09-01\': 3,\n' +
                '        \'2024-09-02\': 4,\n' +
                '        \'2024-09-03\': 1,\n' +
                '        \'2024-09-04\': 8,\n' +
                '        \'2024-09-05\': 8,\n' +
                '        \'2024-09-06\': 1,\n' +
                '        \'2024-09-07\': 8,\n' +
                '        \'2024-09-08\': 6,\n' +
                '        \'2024-09-09\': 0,\n' +
                '        \'2024-09-10\': 9,\n' +
                '        \'2024-09-11\': 10,\n' +
                '        \'2024-09-12\': 1,\n' +
                '        \'2024-09-13\': 8,\n' +
                '        \'2024-09-14\': 1,\n' +
                '        \'2024-09-15\': 5,\n' +
                '        \'2024-09-16\': 4,\n' +
                '        \'2024-09-17\': 7,\n' +
                '        \'2024-09-18\': 7,\n' +
                '        \'2024-09-19\': 8,\n' +
                '        \'2024-09-20\': 9,\n' +
                '        \'2024-09-21\': 9,\n' +
                '        \'2024-09-22\': 3,\n' +
                '        \'2024-09-23\': 5,\n' +
                '        \'2024-09-24\': 3,\n' +
                '        \'2024-09-25\': 6,\n' +
                '        \'2024-09-26\': 1,\n' +
                '        \'2024-09-27\': 6,\n' +
                '        \'2024-09-28\': 0,\n' +
                '        \'2024-09-29\': 4,\n' +
                '        \'2024-09-30\': 2,\n' +
                '        \'2024-10-01\': 3,\n' +
                '        \'2024-10-02\': 6,\n' +
                '        \'2024-10-03\': 10,\n' +
                '        \'2024-10-04\': 3,\n' +
                '        \'2024-10-24\': 1,\n' +
                '        \'2024-10-25\': 4,\n' +
                '        \'2024-10-26\': 0,\n' +
                '        \'2024-10-27\': 7,\n' +
                '        \'2024-10-28\': 6,\n' +
                '        \'2024-10-29\': 9,\n' +
                '        \'2024-10-30\': 5,\n' +
                '        \'2024-10-31\': 9,\n' +
                '        \'2024-11-01\': 0,\n' +
                '        \'2024-11-02\': 7,\n' +
                '        \'2024-11-03\': 7,\n' +
                '        \'2024-11-04\': 1,\n' +
                '        \'2024-11-05\': 8,\n' +
                '        \'2024-11-06\': 4,\n' +
                '        \'2024-11-07\': 0,\n' +
                '        \'2024-11-08\': 0,\n' +
                '        \'2024-11-09\': 6,\n' +
                '        \'2024-11-10\': 2,\n' +
                '        \'2024-11-11\': 10,\n' +
                '        \'2024-11-12\': 7,\n' +
                '        \'2024-11-13\': 7,\n' +
                '        \'2024-11-14\': 5,\n' +
                '        \'2024-11-15\': 7,\n' +
                '        \'2024-11-16\': 9,\n' +
                '        \'2024-11-17\': 5,\n' +
                '        \'2024-11-18\': 1,\n' +
                '        \'2024-11-19\': 0,\n' +
                '        \'2024-11-20\': 6,\n' +
                '        \'2024-11-21\': 8,\n' +
                '        \'2024-11-22\': 10,\n' +
                '        \'2024-11-23\': 1,\n' +
                '        \'2024-11-24\': 10,\n' +
                '        \'2024-11-25\': 4,\n' +
                '        \'2024-11-26\': 5,\n' +
                '        \'2024-11-27\': 0,\n' +
                '        \'2024-11-28\': 6,\n' +
                '        \'2024-11-29\': 6,\n' +
                '        \'2024-11-30\': 3,\n' +
                '        \'2024-12-01\': 8,\n' +
                '    };'
        },
    ]

    return (
        <>
            <aside className="w-full 640px:pl-[2.5rem] px-6 640px:px-10">

                <div>
                    <ContentHeader text={'github activity graph'} id={'github_activity_graph'}/>
                </div>

                <BlockDescription
                    text='Track your daily activities with a GitHub-style activity graph, showcasing your progress and habits in a visual grid format.'/>

                <BlockToggleTab code={activityGraphCode} setPreview={setActivityGraphPreview}
                                setCode={setActivityGraphCode} preview={activityGraphPreview}/>

                <BlockWrapper>
                    {activityGraphPreview && (
                        <div className='p-8 mb-4 flex items-center flex-col gap-5 justify-center'>
                            <GithubActivityGraphExample/>
                        </div>
                    )}

                    {activityGraphCode && (
                        <BlocksShowCode
                            code={activityGraphCodes}
                        />
                    )}
                </BlockWrapper>

                <div className='mt-8'>
                    <ContentHeader text={'github activity graph with month'} id={'github_activity_graph_with_month'}/>
                </div>

                <BlockDescription
                    text='Track your daily activities with a GitHub-style activity graph, showcasing your progress and habits in a visual grid format.'/>

                <BlockToggleTab code={activityGraphWithMonthCode} preview={activityGraphWithMonthPreview}
                                setCode={setActivityGraphWithMonthCode} setPreview={setActivityGraphWithMonthPreview}/>

                <BlockWrapper>
                    {activityGraphWithMonthPreview && (
                        <div className='p-8 mb-4 flex items-center flex-col gap-5 justify-center'>
                            <GithubActivityGraphWithMonthExample/>
                        </div>
                    )}

                    {activityGraphWithMonthCode && (
                        <BlocksShowCode
                            code={activityGraphWithMonthCodes}
                        />
                    )}
                </BlockWrapper>

                <div className='mt-8'>
                    <ContentHeader text={'calculating total activity'} id={'calculating_total_activity'}/>
                </div>

                <BlockDescription
                    text='Track your daily activities with a GitHub-style activity graph, showcasing your progress and habits in a visual grid format.'/>

                <BlockToggleTab code={calculatingTotalActivityCode} setPreview={setCalculatingTotalActivityPreview}
                                setCode={setCalculatingTotalActivityCode} preview={calculatingTotalActivityPreview}/>

                <BlockWrapper>
                    {calculatingTotalActivityPreview && (
                        <div className='p-8 mb-4 flex items-center flex-col gap-5 justify-center'>
                            <CalculatingTotalActivityExample/>
                        </div>
                    )}

                    {calculatingTotalActivityCode && (
                        <BlocksShowCode
                            code={calculatingTotalContributionCodes}
                        />
                    )}
                </BlockWrapper>

                <BlocksFooter
                    backUrl="/components/redo-undo"
                    backName="redo & undo"
                    forwardName="tooltip"
                    forwardUrl="/components/tooltip"
                />
            </aside>
            <Helmet>
                <title>Data Display - Github Activity Graph</title>
            </Helmet>
        </>
    );
};

export default GithubActivityGraph;
