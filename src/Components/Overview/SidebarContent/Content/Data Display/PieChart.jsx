import React, {useState, useEffect} from "react";

// react helmet
import {Helmet} from "react-helmet";

// components
import OverviewFooter from "@shared/OverviewFooter";
import ContentHeader from "@shared/ContentHeader";
import Showcode from "@shared/Component/ShowCode.jsx";

// scrollspy
import {pieChartContents} from "@utils/ContentsConfig/DataDisplayContents.js";
import {useScrollSpy} from "@/CustomHooks/useScrollSpy.js";

import ComponentDescription from "@shared/Component/ComponentDescription.jsx";
import ToggleTab from "@shared/Component/ToggleTab.jsx";
import ComponentWrapper from "@shared/Component/ComponentWrapper.jsx";
import ContentNavbar from "@shared/Component/ContentNavbar.jsx";

const PieChart = () => {

    const sectionIds = pieChartContents.map((item) => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);
    const [windowSize, setWindowSize] = useState({
        width: undefined,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
            });
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const [fillPieChartPreview, setFillPieChartPreview] = useState(true);
    const [fillPieChartCode, setFillPieChartCode] = useState(false);

    const [borderedPieCharPreview, setBorderedPieChartPreview] = useState(true);
    const [borderedPieChartCode, setBorderedPieChartCode] = useState(false);

    const data = [
        {name: 'Marketing', value: 15.2},
        {name: 'Sales', value: 18.2},
        {name: 'Finance', value: 12.1},
        {name: 'Human Resources', value: 9.1},
        {name: 'IT', value: 24.2},
        {name: 'Operations', value: 21.2}
    ]

    const width = windowSize.width < 376 ? 250 : 400
    const height = windowSize.width < 376 ? 250 : 400
    const colors = [
        '#4b77be',
        '#f5ab35',
        '#e74c3c',
        '#96c0ce',
        '#2ecc71',
        '#c39bd3'
    ]

    // Add safety check
    if (!Array.isArray(data) || data.length === 0) {
        return (
            <div className="flex items-center justify-center w-full h-full border rounded-lg p-4">
                <p className="text-gray-500">No data available</p>
            </div>
        );
    }

    const total = data.reduce((sum, item) => sum + (Number(item.value) || 0), 0);
    if (total === 0) {
        return (
            <div className="flex items-center justify-center w-full h-full border rounded-lg p-4">
                <p className="text-gray-500">Invalid data values</p>
            </div>
        );
    }

    const radius = Math.min(width, height) / 3;
    const centerX = width / 2;
    const centerY = height / 2;

    // Calculate pie slices
    let startAngle = 0;
    const slices = data.map((item, index) => {
        const value = Number(item.value) || 0;
        const percentage = (value / total) * 100;
        const angle = (percentage / 100) * 2 * Math.PI;

        // Calculate SVG arc path
        const endAngle = startAngle + angle;
        const x1 = centerX + radius * Math.cos(startAngle);
        const y1 = centerY + radius * Math.sin(startAngle);
        const x2 = centerX + radius * Math.cos(endAngle);
        const y2 = centerY + radius * Math.sin(endAngle);

        // Calculate label position (middle of the slice)
        const labelAngle = startAngle + angle / 2;
        const labelRadius = radius * 0.7;
        const labelX = centerX + labelRadius * Math.cos(labelAngle);
        const labelY = centerY + labelRadius * Math.sin(labelAngle);

        const slice = {
            path: `M ${centerX},${centerY} L ${x1},${y1} A ${radius},${radius} 0 ${angle > Math.PI ? 1 : 0},1 ${x2},${y2} Z`,
            percentage,
            color: colors[index % colors.length],
            labelX,
            labelY,
            name: item.name || `Slice ${index + 1}`
        };

        startAngle = endAngle;
        return slice;
    });

    // second pie chart
    if (!Array.isArray(data) || data.length === 0) {
        return (
            <div className="flex items-center justify-center w-full h-full border rounded-lg p-4">
                <p className="text-gray-500">No data available</p>
            </div>
        );
    }

    const total2 = data.reduce((sum, item) => sum + (Number(item.value) || 0), 0);

    if (total2 === 0) {
        return (
            <div className="flex items-center justify-center w-full h-full border rounded-lg p-4">
                <p className="text-gray-500">Invalid data values</p>
            </div>
        );
    }

    const innerRadius = 0.5
    const radius2 = Math.min(width, height) / 3;
    const centerX2 = width / 2;
    const centerY2 = height / 2;

    // Calculate donut slices
    let startAngle2 = 0;
    const slices2 = data.map((item, index) => {
        const value = Number(item.value) || 0;
        const percentage = (value / total) * 100;
        const angle = (percentage / 100) * 2 * Math.PI;

        // Calculate SVG arc path
        const endAngle = startAngle + angle;
        const outerX1 = centerX + radius * Math.cos(startAngle);
        const outerY1 = centerY + radius * Math.sin(startAngle);
        const outerX2 = centerX + radius * Math.cos(endAngle);
        const outerY2 = centerY + radius * Math.sin(endAngle);
        const innerX1 = centerX + radius * innerRadius * Math.cos(startAngle);
        const innerY1 = centerY + radius * innerRadius * Math.sin(startAngle);
        const innerX2 = centerX + radius * innerRadius * Math.cos(endAngle);
        const innerY2 = centerY + radius * innerRadius * Math.sin(endAngle);

        // Calculate label position (middle of the slice)
        const labelAngle = startAngle + angle / 2;
        const labelRadius = radius * (1 - innerRadius) / 2 + radius * innerRadius;
        const labelX = centerX + labelRadius * Math.cos(labelAngle);
        const labelY = centerY + labelRadius * Math.sin(labelAngle);

        const slice = {
            path: `M ${centerX},${centerY} L ${outerX1},${outerY1} A ${radius},${radius} 0 ${angle > Math.PI ? 1 : 0},1 ${outerX2},${outerY2} L ${innerX2},${innerY2} A ${radius * innerRadius},${radius * innerRadius} 0 ${angle > Math.PI ? 1 : 0},0 ${innerX1},${innerY1} Z`,
            percentage,
            color: colors[index % colors.length],
            labelX,
            labelY,
            name: item.name || `Slice ${index + 1}`
        };

        startAngle = endAngle;
        return slice;
    });

    return (
        <>
            <aside className="flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10">
                <div>
                    <ContentHeader text={"fill pie chart"} id={"fill_pie_chart"}/>

                    <ComponentDescription
                        text="A pie chart visually represents data as slices of a circle, with each slice showing a category's proportion of the whole."/>

                    <ToggleTab code={fillPieChartCode} preview={fillPieChartPreview} setPreview={setFillPieChartPreview}
                               setCode={setFillPieChartCode}/>

                    <ComponentWrapper>
                        {fillPieChartPreview && (
                            <div className="p-8 mb-4 flex items-center flex-col gap-5 justify-center">
                                <div className="relative cursor-pointer">
                                    <svg width={width} height={height - 30} className="overflow-visible mx-auto">
                                        {/* Pie Slices */}
                                        {slices.map((slice, index) => (
                                            <path
                                                key={index}
                                                d={slice.path}
                                                fill={slice.color}
                                                className="transition-opacity duration-200 hover:opacity-80"
                                            />
                                        ))}

                                        {/* Percentage Labels */}
                                        {slices.map((slice, index) => (
                                            <text
                                                key={`label-${index}`}
                                                x={slice.labelX}
                                                y={slice.labelY}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                                fill="#efefef"
                                                className="text-[0.6rem] 400px:text-[1rem] "
                                            >
                                                {`${slice.percentage.toFixed(1)}%`}
                                            </text>
                                        ))}
                                    </svg>

                                    {/* Department Breakdown */}
                                    <div
                                        className="flex flex-wrap justify-center mt-4 400px:mt-0 gap-x-[20px] gap-y-[10px] px-[30px] items-center">
                                        {slices.map((slice, index) => (
                                            <div key={`legend-${index}`} className="flex items-center">
                                                <div
                                                    className="w-3 h-3 mr-2"
                                                    style={{backgroundColor: slice.color}}
                                                />
                                                <span
                                                    className="text-[0.7rem] dark:text-[#abc2d3] 400px:text-[0.9rem]">{slice.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {fillPieChartCode && (
                            <Showcode
                                code='
import React, {useEffect, useState} from "react";


const PieChart = () => {

    const [windowSize, setWindowSize] = useState({
        width: undefined,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
            });
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const data = [
        {name: "Marketing", value: 15.2},
        {name: "Sales", value: 18.2},
        {name: "Finance", value: 12.1},
        {name: "Human Resources", value: 9.1},
        {name: "IT", value: 24.2},
        {name: "Operations", value: 21.2}
    ]

    const width = windowSize.width < 376 ? 250 : 400
    const height = windowSize.width < 376 ? 250 : 400
    const colors = [
        "#4b77be",
        "#f5ab35",
        "#e74c3c",
        "#96c0ce",
        "#2ecc71",
        "#c39bd3"
    ]

    // Add safety check
    if (!Array.isArray(data) || data.length === 0) {
        return (
            <div className="flex items-center justify-center w-full h-full border rounded-lg p-4">
                <p className="text-gray-500">No data available</p>
            </div>
        );
    }

    const total = data.reduce((sum, item) => sum + (Number(item.value) || 0), 0);

    if (total === 0) {
        return (
            <div className="flex items-center justify-center w-full h-full border rounded-lg p-4">
                <p className="text-gray-500">Invalid data values</p>
            </div>
        );
    }

    const radius = Math.min(width, height) / 3;
    const centerX = width / 2;
    const centerY = height / 2;

    // Calculate pie slices
    let startAngle = 0;
    const slices = data.map((item, index) => {
        const value = Number(item.value) || 0;
        const percentage = (value / total) * 100;
        const angle = (percentage / 100) * 2 * Math.PI;

        // Calculate SVG arc path
        const endAngle = startAngle + angle;
        const x1 = centerX + radius * Math.cos(startAngle);
        const y1 = centerY + radius * Math.sin(startAngle);
        const x2 = centerX + radius * Math.cos(endAngle);
        const y2 = centerY + radius * Math.sin(endAngle);

        // Calculate label position (middle of the slice)
        const labelAngle = startAngle + angle / 2;
        const labelRadius = radius * 0.7;
        const labelX = centerX + labelRadius * Math.cos(labelAngle);
        const labelY = centerY + labelRadius * Math.sin(labelAngle);

        const slice = {
            path: `M ${centerX},${centerY} L ${x1},${y1} A ${radius},${radius} 0 ${angle > Math.PI ? 1 : 0},1 ${x2},${y2} Z`,
            percentage,
            color: colors[index % colors.length],
            labelX,
            labelY,
            name: item.name || `Slice ${index + 1}`
        };

        startAngle = endAngle;
        return slice;
    });

    return (
        <div className="relative cursor-pointer">
            <svg width={width} height={height - 30} className="overflow-visible mx-auto">
                {/* Pie Slices */}
                {slices.map((slice, index) => (
                    <path
                        key={index}
                        d={slice.path}
                        fill={slice.color}
                        className="transition-opacity duration-200 hover:opacity-80"
                    />
                ))}

                {/* Percentage Labels */}
                {slices.map((slice, index) => (
                    <text
                        key={`label-${index}`}
                        x={slice.labelX}
                        y={slice.labelY}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="#efefef"
                        className="text-[0.6rem] sm:text-[1rem] "
                    >
                        {`${slice.percentage.toFixed(1)}%`}
                    </text>
                ))}
            </svg>

            {/* Department Breakdown */}
            <div
                className="flex flex-wrap justify-center mt-4 sm:mt-0 gap-x-[20px] gap-y-[10px] px-[30px] items-center">
                {slices.map((slice, index) => (
                    <div key={`legend-${index}`} className="flex items-center">
                        <div
                            className="w-3 h-3 mr-2"
                            style={{backgroundColor: slice.color}}
                        />
                        <span className="text-[0.7rem] dark:text-[#abc2d3] sm:text-[0.9rem]">{slice.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PieChart;
          '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader text={"bordered pie chart"} id={"bordered_pie_chart"}/>
                    </div>

                    <ComponentDescription
                        text=' A bordered pie chart shows data in slices with clear borders, making it easier to distinguish each segment’s proportion.'/>

                    <ToggleTab code={borderedPieChartCode} preview={borderedPieCharPreview}
                               setCode={setBorderedPieChartCode} setPreview={setBorderedPieChartPreview}/>

                    <ComponentWrapper>
                        {borderedPieCharPreview && (
                            <div className="p-8 mb-4 flex items-center flex-col gap-5 justify-center">
                                <div className="relative">
                                    <svg width={width} height={height - 30}
                                         className="overflow-visible mx-auto cursor-pointer">
                                        {/* Donut Slices */}
                                        {slices2.map((slice, index) => (
                                            <path
                                                key={index}
                                                d={slice.path}
                                                fill={slice.color}
                                                className="transition-opacity duration-200 hover:opacity-80"
                                            />
                                        ))}

                                        {/* Percentage Labels */}
                                        {slices2.map((slice, index) => (
                                            <text
                                                key={`label-${index}`}
                                                x={slice.labelX}
                                                y={slice.labelY}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                                fill="#efefef"
                                                className="text-[0.6rem] 400px:text-[0.9rem]"
                                            >
                                                {`${slice.percentage.toFixed(1)}%`}
                                            </text>
                                        ))}
                                    </svg>

                                    {/* Department Breakdown */}
                                    <div
                                        className="flex flex-wrap justify-center mt-4 400px:mt-0 gap-x-[20px] gap-y-[10px] px-[30px] items-center">
                                        {slices2.map((slice, index) => (
                                            <div key={`legend-${index}`} className="flex items-center">
                                                <div
                                                    className="w-3 h-3 mr-2"
                                                    style={{backgroundColor: slice.color}}
                                                />
                                                <span
                                                    className="text-[0.7rem] dark:text-[#abc2d3] 400px:text-[0.9rem]">{slice.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {borderedPieChartCode && (
                            <Showcode
                                code='
import React, {useEffect, useState} from "react";


const PieChart = () => {

    const [windowSize, setWindowSize] = useState({
        width: undefined,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
            });
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const data = [
        {name: "Marketing", value: 15.2},
        {name: "Sales", value: 18.2},
        {name: "Finance", value: 12.1},
        {name: "Human Resources", value: 9.1},
        {name: "IT", value: 24.2},
        {name: "Operations", value: 21.2}
    ]

    const width = windowSize.width < 376 ? 250 : 400
    const height = windowSize.width < 376 ? 250 : 400
    const colors = [
        "#4b77be",
        "#f5ab35",
        "#e74c3c",
        "#96c0ce",
        "#2ecc71",
        "#c39bd3"
    ]

    if (!Array.isArray(data) || data.length === 0) {
        return (
            <div className="flex items-center justify-center w-full h-full border rounded-lg p-4">
                <p className="text-gray-500">No data available</p>
            </div>
        );
    }

    const total = data.reduce((sum, item) => sum + (Number(item.value) || 0), 0);

    if (total === 0) {
        return (
            <div className="flex items-center justify-center w-full h-full border rounded-lg p-4">
                <p className="text-gray-500">Invalid data values</p>
            </div>
        );
    }

    const innerRadius = 0.5
    const radius = Math.min(width, height) / 3;
    const centerX = width / 2;
    const centerY = height / 2;

    // Calculate donut slices
    let startAngle = 0;
    const slices = data.map((item, index) => {
        const value = Number(item.value) || 0;
        const percentage = (value / total) * 100;
        const angle = (percentage / 100) * 2 * Math.PI;

        // Calculate SVG arc path
        const endAngle = startAngle + angle;
        const outerX1 = centerX + radius * Math.cos(startAngle);
        const outerY1 = centerY + radius * Math.sin(startAngle);
        const outerX2 = centerX + radius * Math.cos(endAngle);
        const outerY2 = centerY + radius * Math.sin(endAngle);
        const innerX1 = centerX + radius * innerRadius * Math.cos(startAngle);
        const innerY1 = centerY + radius * innerRadius * Math.sin(startAngle);
        const innerX2 = centerX + radius * innerRadius * Math.cos(endAngle);
        const innerY2 = centerY + radius * innerRadius * Math.sin(endAngle);

        // Calculate label position (middle of the slice)
        const labelAngle = startAngle + angle / 2;
        const labelRadius = radius * (1 - innerRadius) / 2 + radius * innerRadius;
        const labelX = centerX + labelRadius * Math.cos(labelAngle);
        const labelY = centerY + labelRadius * Math.sin(labelAngle);

        const slice = {
            path: `M ${centerX},${centerY} L ${outerX1},${outerY1} A ${radius},${radius} 0 ${angle > Math.PI ? 1 : 0},1 ${outerX2},${outerY2} L ${innerX2},${innerY2} A ${radius * innerRadius},${radius * innerRadius} 0 ${angle > Math.PI ? 1 : 0},0 ${innerX1},${innerY1} Z`,
            percentage,
            color: colors[index % colors.length],
            labelX,
            labelY,
            name: item.name || `Slice ${index + 1}`
        };

        startAngle = endAngle;
        return slice;
    });

    return (
        <div className="relative">
            <svg width={width} height={height - 30}
                 className="overflow-visible mx-auto cursor-pointer">
                {/* Donut Slices */}
                {slices.map((slice, index) => (
                    <path
                        key={index}
                        d={slice.path}
                        fill={slice.color}
                        className="transition-opacity duration-200 hover:opacity-80"
                    />
                ))}

                {/* Percentage Labels */}
                {slices.map((slice, index) => (
                    <text
                        key={`label-${index}`}
                        x={slice.labelX}
                        y={slice.labelY}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="#efefef"
                        className="text-[0.6rem] sm:text-[0.9rem]"
                    >
                        {`${slice.percentage.toFixed(1)}%`}
                    </text>
                ))}
            </svg>

            {/* Department Breakdown */}
            <div
                className="flex flex-wrap justify-center mt-4 sm:mt-0 gap-x-[20px] gap-y-[10px] px-[30px] items-center">
                {slices.map((slice, index) => (
                    <div key={`legend-${index}`} className="flex items-center">
                        <div
                            className="w-3 h-3 mr-2"
                            style={{backgroundColor: slice.color}}
                        />
                        <span className="text-[0.7rem] dark:text-[#abc2d3] sm:text-[0.9rem]">{slice.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PieChart;
          '
                            />
                        )}
                    </ComponentWrapper>

                    <OverviewFooter backName='tooltip' backUrl='/components/tooltip' forwardUrl='/components/timeline'
                                    forwardName='Timeline'/>
                </div>


                <ContentNavbar contents={pieChartContents} activeSection={activeSection}/>

            </aside>
            <Helmet>
                <title>Data Display - Pie Chart</title>
            </Helmet>
        </>
    );
};

export default PieChart;
