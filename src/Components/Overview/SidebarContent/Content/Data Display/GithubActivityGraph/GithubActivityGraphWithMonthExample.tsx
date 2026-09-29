import { useState, useCallback } from 'react';

const GithubActivityGraphWithMonthExample = () => {

    // activity data
    const activityData = {
        '2024-01-01': 1,
        '2024-01-02': 5,
        '2024-01-03': 2,
        '2024-01-04': 10,
        '2024-01-05': 5,
        '2024-01-06': 9,
        '2024-01-16': 4,
        '2024-01-17': 5,
        '2024-01-18': 9,
        '2024-01-19': 2,
        '2024-01-20': 10,
        '2024-02-03': 4,
        '2024-02-04': 3,
        '2024-02-05': 8,
        '2024-02-06': 7,
        '2024-02-07': 7,
        '2024-02-08': 1,
        '2024-02-09': 9,
        '2024-02-10': 9,
        '2024-02-11': 6,
        '2024-02-12': 4,
        '2024-02-13': 1,
        '2024-02-14': 2,
        '2024-02-15': 2,
        '2024-02-16': 4,
        '2024-02-17': 0,
        '2024-02-18': 5,
        '2024-02-19': 4,
        '2024-02-20': 9,
        '2024-02-21': 5,
        '2024-02-22': 3,
        '2024-02-23': 7,
        '2024-02-24': 6,
        '2024-02-25': 6,
        '2024-02-26': 9,
        '2024-02-27': 4,
        '2024-02-28': 2,
        '2024-02-29': 0,
        '2024-03-01': 3,
        '2024-03-02': 9,
        '2024-03-03': 4,
        '2024-03-04': 1,
        '2024-03-05': 9,
        '2024-03-06': 10,
        '2024-03-07': 4,
        '2024-03-08': 4,
        '2024-03-09': 3,
        '2024-03-10': 2,
        '2024-03-11': 10,
        '2024-03-12': 7,
        '2024-03-13': 3,
        '2024-03-24': 0,
        '2024-03-25': 1,
        '2024-03-26': 5,
        '2024-03-27': 0,
        '2024-03-28': 5,
        '2024-03-29': 4,
        '2024-03-30': 5,
        '2024-03-31': 7,
        '2024-04-01': 5,
        '2024-04-02': 0,
        '2024-04-03': 4,
        '2024-04-04': 6,
        '2024-04-05': 2,
        '2024-04-06': 10,
        '2024-04-24': 9,
        '2024-04-25': 2,
        '2024-04-26': 5,
        '2024-04-27': 3,
        '2024-04-28': 8,
        '2024-04-29': 6,
        '2024-04-30': 7,
        '2024-05-01': 7,
        '2024-05-02': 2,
        '2024-05-03': 3,
        '2024-05-04': 1,
        '2024-05-05': 1,
        '2024-05-06': 8,
        '2024-05-07': 5,
        '2024-05-08': 6,
        '2024-05-09': 1,
        '2024-05-10': 6,
        '2024-05-11': 10,
        '2024-05-12': 2,
        '2024-05-13': 10,
        '2024-05-14': 7,
        '2024-05-15': 6,
        '2024-05-16': 2,
        '2024-05-17': 5,
        '2024-05-18': 8,
        '2024-05-19': 8,
        '2024-05-20': 7,
        '2024-05-21': 9,
        '2024-05-22': 6,
        '2024-05-23': 2,
        '2024-05-24': 9,
        '2024-05-25': 9,
        '2024-05-26': 8,
        '2024-05-27': 3,
        '2024-05-28': 1,
        '2024-05-29': 6,
        '2024-05-30': 1,
        '2024-05-31': 8,
        '2024-06-01': 2,
        '2024-06-02': 10,
        '2024-06-03': 7,
        '2024-06-04': 4,
        '2024-06-05': 9,
        '2024-06-06': 5,
        '2024-06-07': 8,
        '2024-06-08': 10,
        '2024-06-09': 0,
        '2024-06-10': 0,
        '2024-06-11': 3,
        '2024-06-12': 4,
        '2024-06-13': 5,
        '2024-06-14': 6,
        '2024-06-15': 5,
        '2024-06-16': 0,
        '2024-07-03': 9,
        '2024-07-04': 6,
        '2024-07-05': 0,
        '2024-07-06': 8,
        '2024-07-07': 10,
        '2024-07-08': 3,
        '2024-07-09': 5,
        '2024-07-10': 0,
        '2024-07-11': 4,
        '2024-07-12': 0,
        '2024-07-13': 9,
        '2024-07-14': 6,
        '2024-07-15': 5,
        '2024-07-16': 6,
        '2024-07-17': 2,
        '2024-07-18': 6,
        '2024-07-19': 10,
        '2024-07-20': 8,
        '2024-07-27': 10,
        '2024-07-28': 6,
        '2024-07-29': 5,
        '2024-07-30': 1,
        '2024-07-31': 5,
        '2024-08-01': 5,
        '2024-08-02': 10,
        '2024-08-03': 2,
        '2024-08-17': 3,
        '2024-08-18': 1,
        '2024-08-19': 1,
        '2024-08-20': 0,
        '2024-08-21': 8,
        '2024-08-22': 10,
        '2024-08-23': 2,
        '2024-08-24': 7,
        '2024-08-25': 4,
        '2024-08-26': 9,
        '2024-08-27': 9,
        '2024-08-28': 7,
        '2024-08-29': 2,
        '2024-08-30': 2,
        '2024-08-31': 5,
        '2024-09-01': 3,
        '2024-09-02': 4,
        '2024-09-03': 1,
        '2024-09-04': 8,
        '2024-09-05': 8,
        '2024-09-06': 1,
        '2024-09-07': 8,
        '2024-09-08': 6,
        '2024-09-09': 0,
        '2024-09-10': 9,
        '2024-09-11': 10,
        '2024-09-12': 1,
        '2024-09-13': 8,
        '2024-09-14': 1,
        '2024-09-15': 5,
        '2024-09-16': 4,
        '2024-09-17': 7,
        '2024-09-18': 7,
        '2024-09-19': 8,
        '2024-09-20': 9,
        '2024-09-21': 9,
        '2024-09-22': 3,
        '2024-09-23': 5,
        '2024-09-24': 3,
        '2024-09-25': 6,
        '2024-09-26': 1,
        '2024-09-27': 6,
        '2024-09-28': 0,
        '2024-09-29': 4,
        '2024-09-30': 2,
        '2024-10-01': 3,
        '2024-10-02': 6,
        '2024-10-03': 10,
        '2024-10-04': 3,
        '2024-10-24': 1,
        '2024-10-25': 4,
        '2024-10-26': 0,
        '2024-10-27': 7,
        '2024-10-28': 6,
        '2024-10-29': 9,
        '2024-10-30': 5,
        '2024-10-31': 9,
        '2024-11-01': 0,
        '2024-11-02': 7,
        '2024-11-03': 7,
        '2024-11-04': 1,
        '2024-11-05': 8,
        '2024-11-06': 4,
        '2024-11-07': 0,
        '2024-11-08': 0,
        '2024-11-09': 6,
        '2024-11-10': 2,
        '2024-11-11': 10,
        '2024-11-12': 7,
        '2024-11-13': 7,
        '2024-11-14': 5,
        '2024-11-15': 7,
        '2024-11-16': 9,
        '2024-11-17': 5,
        '2024-11-18': 1,
        '2024-11-19': 0,
        '2024-11-20': 6,
        '2024-11-21': 8,
        '2024-11-22': 10,
        '2024-11-23': 1,
        '2024-11-24': 10,
        '2024-11-25': 4,
        '2024-11-26': 5,
        '2024-11-27': 0,
        '2024-11-28': 6,
        '2024-11-29': 6,
        '2024-11-30': 3,
        '2024-12-01': 8,
    };

    // tooltip
    const [tooltip, setTooltip] = useState({
        show: false,
        content: '',
        x: 0,
        y: 0,
        position: 'top'
    });

    // generate dates data
    const generateDates = () => {
        const dates = [];
        const now = new Date();
        for (let i = 0; i < 52 * 7; i++) {
            const date = new Date(now);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];
            dates.unshift({
                date: dateStr,
                count: activityData[dateStr] || 0
            });
        }
        return dates;
    };

    // group the weeks by the data
    const groupDataByWeeks = (dates) => {
        const weeks = [];
        for (let i = 0; i < dates.length; i += 7) {
            weeks.push(dates.slice(i, i + 7));
        }
        return weeks;
    };

    // get the month name from the dates data
    const getMonthLabels = (dates) => {
        const months = [];
        let currentMonth = '';
        let currentStartIndex = 0;

        dates.forEach((date, index) => {
            const month = new Date(date.date).toLocaleString('default', { month: 'short' });
            if (month !== currentMonth) {
                if (currentMonth !== '') {
                    months.push({
                        month: currentMonth,
                        startIndex: currentStartIndex,
                        endIndex: Math.floor(index / 7)
                    });
                }
                currentMonth = month;
                currentStartIndex = Math.floor(index / 7);
            }
        });

        // Add the last month
        months.push({
            month: currentMonth,
            startIndex: currentStartIndex,
            endIndex: Math.floor(dates.length / 7)
        });

        return months;
    };

    const data = generateDates();
    const weeks = groupDataByWeeks(data);
    const months = getMonthLabels(data);

    // get the activity color based on the activity count
    const getActivityColor = (count) => {
        const isDarkMode = document.documentElement.classList.contains('dark');

        if (count === 0) return isDarkMode ? '#0f172a' : '#ebedf0';

        if (isDarkMode) {
            if (count <= 2) return '#0e4429';
            if (count <= 4) return '#006d32';
            if (count <= 6) return '#26a641';
            return '#39d353';
        } else {
            if (count <= 2) return '#9be9a8';
            if (count <= 4) return '#40c463';
            if (count <= 6) return '#30a14e';
            return '#216e39';
        }
    };

    // format the date
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    // handle mouse move for showing the tooltip current position
    const handleMouseMove = useCallback((e, day) => {
        const rect = e.target.getBoundingClientRect();
        const tooltipWidth = 200;
        const tooltipHeight = 60;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const scrollY = window.scrollY || window.pageYOffset;

        // Determine optimal position
        let position = 'top';
        let x = rect.left;
        let y = rect.top + scrollY;

        // Calculate available space in different directions
        const spaceRight = windowWidth - rect.right;
        const spaceLeft = rect.left;
        const spaceTop = rect.top;
        const spaceBottom = windowHeight - rect.bottom;

        // Horizontal position
        if (spaceRight < tooltipWidth / 2 && spaceLeft > tooltipWidth / 2) {
            x = rect.right - tooltipWidth;
        } else if (spaceLeft < tooltipWidth / 2 && spaceRight > tooltipWidth / 2) {
            x = rect.left;
        } else {
            x = rect.left - (tooltipWidth / 2) + (rect.width / 2);
        }

        // Vertical position
        if (spaceTop < tooltipHeight && spaceBottom > tooltipHeight) {
            y = rect.bottom + scrollY + 5;
            position = 'bottom';
        } else {
            y = rect.top + scrollY - tooltipHeight + 15;
            position = 'top';
        }

        // Ensure tooltip stays within window bounds
        x = Math.max(10, Math.min(windowWidth - tooltipWidth - 10, x));

        setTooltip({
            show: true,
            content: `${day.count} contributions on ${formatDate(day.date)}`,
            x,
            y,
            position
        });
    }, []);

    const handleMouseLeave = () => {
        setTooltip(prev => ({ ...prev, show: false }));
    };

    return (
        <div className="p-6 w-full max-w-4xl">
            <h2 className="text-xl text-gray-800 dark:text-[#abc2d3] font-bold mb-7">Activity Contributions</h2>

            <div className="flex flex-col gap-4">
                <div className="relative overflow-x-auto pb-2 scrollbar">
                    <div className="flex">
                        <div className="w-full">

                            {/* month names*/}
                            <div className="flex relative h-6 mb-1">
                                {months.map((monthData, index) => {
                                    const width = (monthData.endIndex - monthData.startIndex) * 16;
                                    const left = monthData.startIndex * 16;
                                    return (
                                        <div
                                            key={index}
                                            className="absolute dark:text-[#abc2d3] text-xs text-gray-600 text-center"
                                            style={{
                                                left: `${left}px`,
                                                width: `${width}px`
                                            }}
                                        >
                                            {monthData.month}
                                        </div>
                                    );
                                })}
                            </div>

                            {/* graph */}
                            <div className="flex gap-1">
                                {weeks.map((week, weekIndex) => (
                                    <div key={weekIndex} className="flex flex-col gap-1">
                                        {week.map((day, dayIndex) => (
                                            <div
                                                key={dayIndex}
                                                className="w-3 h-3 rounded-sm cursor-pointer transition-colors duration-200 border border-gray-200 dark:border-slate-800 hover:border-gray-400"
                                                style={{ backgroundColor: getActivityColor(day.count) }}
                                                onMouseMove={(e) => handleMouseMove(e, day)}
                                                onMouseLeave={handleMouseLeave}
                                            />
                                        ))}
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>

                    {/* tooltip */}
                    {tooltip.show && (
                        <div
                            className="fixed z-50 px-3 dark:bg-slate-800 dark:text-[#abc2d3] py-2 text-sm text-white bg-gray-800 rounded-md pointer-events-none"
                            style={{
                                left: `${tooltip.x}px`,
                                top: `${tooltip.y}px`,
                                width: 'max-content',
                                transition: 'transform 0.1s ease-out'
                            }}
                        >
                            <div>{tooltip.content}</div>
                        </div>
                    )}
                </div>

                <div className="flex items-center justify-end gap-2 dark:text-[#abc2d3] text-[0.8rem] text-gray-600">
                    <span>Less</span>
                    {[0, 1, 3, 5, 7].map((count, i) => (
                        <div key={i} className="flex flex-col items-center">
                            <div
                                className="w-3 h-3 border dark:border-slate-800 rounded-sm border-gray-200"
                                style={{backgroundColor: getActivityColor(count)}}
                            />
                        </div>
                    ))}
                    <span>More</span>
                </div>

            </div>
        </div>
    );
};

export default GithubActivityGraphWithMonthExample;