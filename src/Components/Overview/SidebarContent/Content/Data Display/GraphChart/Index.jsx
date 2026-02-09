import React, {useEffect, useState} from "react";
import {motion} from "framer-motion";
import {Helmet} from "react-helmet";

import OverviewFooter from "@shared/OverviewFooter";
import ContentHeader from "@shared/ContentHeader";
import Showcode from "@shared/Component/ShowCode.jsx";
import ComponentDescription from "@shared/Component/ComponentDescription.jsx";
import ToggleTab from "@shared/Component/ToggleTab.jsx";
import ComponentWrapper from "@shared/Component/ComponentWrapper.jsx";
import ContentNavbar from "@shared/Component/ContentNavbar.jsx";

import {graphChartContents} from "@utils/ContentsConfig/DataDisplayContents.js";
import {useScrollSpy} from "@/CustomHooks/useScrollSpy.js";

const GraphChart = () => {
    const sectionIds = graphChartContents.map((item) => item.href.slice(1));
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

    const [lineChartPreview, setLineChartPreview] = useState(true);
    const [lineChartCode, setLineChartCode] = useState(false);
    const [barChartPreview, setBarChartPreview] = useState(true);
    const [barChartCode, setBarChartCode] = useState(false);
    const [areaChartPreview, setAreaChartPreview] = useState(true);
    const [areaChartCode, setAreaChartCode] = useState(false);

    const data = [
        {month: "Jan", value: 400},
        {month: "Feb", value: 520},
        {month: "Mar", value: 480},
        {month: "Apr", value: 650},
        {month: "May", value: 580},
        {month: "Jun", value: 720},
    ];

    const chartWidth = windowSize.width < 640 ? 300 : 500;
    const chartHeight = 300;
    const maxValue = Math.max(...data.map((d) => d.value));
    const yAxisMax = Math.ceil(maxValue / 200) * 200;
    const yTickCount = 4;
    const yTicks = Array.from({length: yTickCount + 1}, (_, i) => Math.round((yAxisMax / yTickCount) * i));

    const pad = {top: 20, right: 20, bottom: 35, left: 50};
    const plotWidth = chartWidth - pad.left - pad.right;
    const plotHeight = chartHeight - pad.top - pad.bottom;

    const colors = [
        "#4b77be",
        "#f5ab35",
        "#e74c3c",
        "#96c0ce",
        "#2ecc71",
        "#c39bd3",
    ];

    const getPoints = () => {
        return data.map((item, index) => ({
            x: pad.left + (plotWidth / (data.length - 1)) * index,
            y: chartHeight - pad.bottom - (item.value / yAxisMax) * plotHeight,
            value: item.value,
        }));
    };

    const points = getPoints();

    const generateLinePath = () => {
        if (points.length === 0) return "";
        let path = `M ${points[0].x} ${points[0].y}`;
        for (let i = 1; i < points.length; i++) {
            path += ` L ${points[i].x} ${points[i].y}`;
        }
        return path;
    };

    const generateAreaPath = () => {
        const linePath = generateLinePath();
        if (linePath === "") return "";
        return (
            linePath +
            ` L ${points[points.length - 1].x} ${chartHeight - pad.bottom} L ${pad.left} ${chartHeight - pad.bottom} Z`
        );
    };

    const barGap = 0.6;
    const barSlotWidth = plotWidth / data.length;
    const barWidth = barSlotWidth * barGap;

    const renderGridAndAxes = (keyPrefix) => (
        <>
            {yTicks.map((tick, i) => {
                const y = chartHeight - pad.bottom - (tick / yAxisMax) * plotHeight;
                return (
                    <line
                        key={`${keyPrefix}-grid-${i}`}
                        x1={pad.left}
                        x2={chartWidth - pad.right}
                        y1={y}
                        y2={y}
                        stroke="currentColor"
                        strokeWidth="1"
                        className="stroke-gray-300 dark:stroke-gray-700"
                        opacity="0.5"
                    />
                );
            })}

            {yTicks.map((tick, i) => {
                const y = chartHeight - pad.bottom - (tick / yAxisMax) * plotHeight;
                return (
                    <text
                        key={`${keyPrefix}-ytick-${i}`}
                        x={pad.left - 8}
                        y={y + 4}
                        textAnchor="end"
                        className="text-[10px] dark:fill-gray-400 fill-gray-600"
                    >
                        {tick}
                    </text>
                );
            })}

            <line
                x1={pad.left}
                x2={chartWidth - pad.right}
                y1={chartHeight - pad.bottom}
                y2={chartHeight - pad.bottom}
                stroke="currentColor"
                strokeWidth="2"
                className="stroke-gray-400 dark:stroke-gray-600"
            />
            <line
                x1={pad.left}
                x2={pad.left}
                y1={pad.top}
                y2={chartHeight - pad.bottom}
                stroke="currentColor"
                strokeWidth="2"
                className="stroke-gray-400 dark:stroke-gray-600"
            />
        </>
    );

    return (
        <>
            <aside className="flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10">
                <div>
                    <ContentHeader
                        text={"animated line chart"}
                        id={"animated_line_chart"}
                    />

                    <ComponentDescription
                        text="An animated line chart that visualizes data trends with clean lines, animated data points, and labeled axes."/>

                    <ToggleTab
                        code={lineChartCode}
                        preview={lineChartPreview}
                        setPreview={setLineChartPreview}
                        setCode={setLineChartCode}
                    />

                    <ComponentWrapper>
                        {lineChartPreview && (
                            <div className="p-8 flex items-center flex-col gap-5 justify-center">
                                <svg
                                    width={chartWidth}
                                    height={chartHeight}
                                    className="mx-auto"
                                >
                                    {renderGridAndAxes("line")}

                                    <motion.path
                                        d={generateLinePath()}
                                        fill="none"
                                        stroke="#4b77be"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        initial={{pathLength: 0}}
                                        animate={{pathLength: 1}}
                                        transition={{
                                            duration: 1.5,
                                            ease: "easeInOut",
                                        }}
                                    />

                                    {points.map((point, index) => (
                                        <motion.circle
                                            key={`line-point-${index}`}
                                            cx={point.x}
                                            cy={point.y}
                                            r="5"
                                            fill="#4b77be"
                                            initial={{opacity: 0, r: 0}}
                                            animate={{opacity: 1, r: 5}}
                                            transition={{
                                                duration: 0.4,
                                                delay: 1 + index * 0.1,
                                                ease: "easeOut",
                                            }}
                                            whileHover={{r: 7}}
                                            className="cursor-pointer"
                                        />
                                    ))}

                                    {data.map((item, index) => (
                                        <text
                                            key={`line-label-${index}`}
                                            x={points[index].x}
                                            y={chartHeight - pad.bottom + 20}
                                            textAnchor="middle"
                                            className="text-xs dark:fill-gray-400 fill-gray-600"
                                        >
                                            {item.month}
                                        </text>
                                    ))}
                                </svg>

                                <div className="flex items-center gap-3 mt-2">
                                    <div className="w-4 h-4 rounded-sm" style={{backgroundColor: "#4b77be"}}/>
                                    <span className="text-sm dark:text-gray-300 text-gray-700">
                                        Monthly Trends
                                    </span>
                                </div>
                            </div>
                        )}

                        {lineChartCode && (
                            <Showcode
                                code={`import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const AnimatedLineChart = () => {
  const [windowSize, setWindowSize] = useState({ width: undefined });

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth });
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const data = [
    { month: "Jan", value: 400 },
    { month: "Feb", value: 520 },
    { month: "Mar", value: 480 },
    { month: "Apr", value: 650 },
    { month: "May", value: 580 },
    { month: "Jun", value: 720 }
  ];

  const chartWidth = windowSize.width < 640 ? 300 : 500;
  const chartHeight = 300;
  const maxValue = Math.max(...data.map(d => d.value));
  const yAxisMax = Math.ceil(maxValue / 200) * 200;
  const yTickCount = 4;
  const yTicks = Array.from({ length: yTickCount + 1 }, (_, i) =>
    Math.round((yAxisMax / yTickCount) * i)
  );
  const pad = { top: 20, right: 20, bottom: 35, left: 50 };
  const plotWidth = chartWidth - pad.left - pad.right;
  const plotHeight = chartHeight - pad.top - pad.bottom;

  const points = data.map((item, index) => ({
    x: pad.left + (plotWidth / (data.length - 1)) * index,
    y: chartHeight - pad.bottom - (item.value / yAxisMax) * plotHeight,
  }));

  const linePath = points
    .map((p, i) => \`\${i === 0 ? "M" : "L"} \${p.x} \${p.y}\`)
    .join(" ");

  return (
    <div className="flex flex-col items-center gap-4">
      <svg width={chartWidth} height={chartHeight}>
        {/* Grid lines and Y-axis labels */}
        {yTicks.map((tick, i) => {
          const y = chartHeight - pad.bottom - (tick / yAxisMax) * plotHeight;
          return (
            <g key={i}>
              <line x1={pad.left} x2={chartWidth - pad.right} y1={y} y2={y}
                stroke="#e5e7eb" strokeWidth="1" opacity="0.5" />
              <text x={pad.left - 8} y={y + 4} textAnchor="end"
                className="text-[10px]" fill="#9ca3af">{tick}</text>
            </g>
          );
        })}

        {/* Axes */}
        <line x1={pad.left} x2={chartWidth - pad.right}
          y1={chartHeight - pad.bottom} y2={chartHeight - pad.bottom}
          stroke="#9ca3af" strokeWidth="2" />
        <line x1={pad.left} x2={pad.left}
          y1={pad.top} y2={chartHeight - pad.bottom}
          stroke="#9ca3af" strokeWidth="2" />

        {/* Animated line */}
        <motion.path d={linePath} fill="none" stroke="#4b77be"
          strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }} />

        {/* Data points */}
        {points.map((point, index) => (
          <motion.circle key={index} cx={point.x} cy={point.y}
            r="5" fill="#4b77be"
            initial={{ opacity: 0, r: 0 }}
            animate={{ opacity: 1, r: 5 }}
            transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
            whileHover={{ r: 7 }} className="cursor-pointer" />
        ))}

        {/* X-axis labels */}
        {data.map((item, index) => (
          <text key={index} x={points[index].x}
            y={chartHeight - pad.bottom + 20}
            textAnchor="middle" fill="#9ca3af" className="text-xs">
            {item.month}
          </text>
        ))}
      </svg>

      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: "#4b77be" }} />
        <span className="text-sm text-gray-600">Monthly Trends</span>
      </div>
    </div>
  );
};

export default AnimatedLineChart;`}
                            />
                        )}
                    </ComponentWrapper>

                    <div className="mt-8">
                        <ContentHeader
                            text={"animated bar chart"}
                            id={"animated_bar_chart"}
                        />
                    </div>

                    <ComponentDescription
                        text="An animated bar chart with staggered entrance animations, labeled axes, and categorical data comparison."/>

                    <ToggleTab
                        code={barChartCode}
                        preview={barChartPreview}
                        setPreview={setBarChartPreview}
                        setCode={setBarChartCode}
                    />

                    <ComponentWrapper>
                        {barChartPreview && (
                            <div className="p-8 flex items-center flex-col gap-5 justify-center">
                                <svg
                                    width={chartWidth}
                                    height={chartHeight}
                                    className="mx-auto"
                                >
                                    {renderGridAndAxes("bar")}

                                    {data.map((item, index) => {
                                        const barHeight =
                                            (item.value / yAxisMax) * plotHeight;
                                        const x =
                                            pad.left +
                                            barSlotWidth * index +
                                            (barSlotWidth - barWidth) / 2;
                                        const y = chartHeight - pad.bottom - barHeight;

                                        return (
                                            <motion.rect
                                                key={`bar-${index}`}
                                                x={x}
                                                y={y}
                                                width={barWidth}
                                                height={barHeight}
                                                fill={colors[index]}
                                                initial={{scaleY: 0}}
                                                animate={{scaleY: 1}}
                                                style={{
                                                    transformOrigin: "bottom",
                                                    transformBox: "fill-box",
                                                }}
                                                transition={{
                                                    duration: 0.6,
                                                    delay: index * 0.1,
                                                    ease: "easeOut",
                                                }}
                                                whileHover={{opacity: 0.8}}
                                                className="cursor-pointer"
                                            />
                                        );
                                    })}

                                    {data.map((item, index) => (
                                        <text
                                            key={`bar-label-${index}`}
                                            x={
                                                pad.left +
                                                barSlotWidth * index +
                                                barSlotWidth / 2
                                            }
                                            y={chartHeight - pad.bottom + 20}
                                            textAnchor="middle"
                                            className="text-xs dark:fill-gray-400 fill-gray-600"
                                        >
                                            {item.month}
                                        </text>
                                    ))}
                                </svg>

                                <div className="flex items-center gap-3 mt-2">
                                    <div className="flex gap-1">
                                        {colors.slice(0, 3).map((color, i) => (
                                            <div
                                                key={`color-${i}`}
                                                className="w-4 h-4 rounded-sm"
                                                style={{backgroundColor: color}}
                                            />
                                        ))}
                                    </div>
                                    <span className="text-sm dark:text-gray-300 text-gray-700">
                                        Monthly Data
                                    </span>
                                </div>
                            </div>
                        )}

                        {barChartCode && (
                            <Showcode
                                code={`import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const AnimatedBarChart = () => {
  const [windowSize, setWindowSize] = useState({ width: undefined });

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth });
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const data = [
    { month: "Jan", value: 400 },
    { month: "Feb", value: 520 },
    { month: "Mar", value: 480 },
    { month: "Apr", value: 650 },
    { month: "May", value: 580 },
    { month: "Jun", value: 720 }
  ];

  const colors = ["#4b77be", "#f5ab35", "#e74c3c", "#96c0ce", "#2ecc71", "#c39bd3"];
  const chartWidth = windowSize.width < 640 ? 300 : 500;
  const chartHeight = 300;
  const maxValue = Math.max(...data.map(d => d.value));
  const yAxisMax = Math.ceil(maxValue / 200) * 200;
  const yTickCount = 4;
  const yTicks = Array.from({ length: yTickCount + 1 }, (_, i) =>
    Math.round((yAxisMax / yTickCount) * i)
  );
  const pad = { top: 20, right: 20, bottom: 35, left: 50 };
  const plotWidth = chartWidth - pad.left - pad.right;
  const plotHeight = chartHeight - pad.top - pad.bottom;
  const barSlotWidth = plotWidth / data.length;
  const barWidth = barSlotWidth * 0.6;

  return (
    <div className="flex flex-col items-center gap-4">
      <svg width={chartWidth} height={chartHeight}>
        {/* Grid lines and Y-axis labels */}
        {yTicks.map((tick, i) => {
          const y = chartHeight - pad.bottom - (tick / yAxisMax) * plotHeight;
          return (
            <g key={i}>
              <line x1={pad.left} x2={chartWidth - pad.right} y1={y} y2={y}
                stroke="#e5e7eb" strokeWidth="1" opacity="0.5" />
              <text x={pad.left - 8} y={y + 4} textAnchor="end"
                className="text-[10px]" fill="#9ca3af">{tick}</text>
            </g>
          );
        })}

        {/* Axes */}
        <line x1={pad.left} x2={chartWidth - pad.right}
          y1={chartHeight - pad.bottom} y2={chartHeight - pad.bottom}
          stroke="#9ca3af" strokeWidth="2" />
        <line x1={pad.left} x2={pad.left}
          y1={pad.top} y2={chartHeight - pad.bottom}
          stroke="#9ca3af" strokeWidth="2" />

        {/* Animated bars */}
        {data.map((item, index) => {
          const barHeight = (item.value / yAxisMax) * plotHeight;
          const x = pad.left + barSlotWidth * index + (barSlotWidth - barWidth) / 2;
          const y = chartHeight - pad.bottom - barHeight;

          return (
            <motion.rect key={index} x={x} y={y}
              width={barWidth} height={barHeight}
              fill={colors[index]}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              style={{ transformOrigin: "bottom", transformBox: "fill-box" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              whileHover={{ opacity: 0.8 }}
              className="cursor-pointer" />
          );
        })}

        {/* X-axis labels */}
        {data.map((item, index) => (
          <text key={index}
            x={pad.left + barSlotWidth * index + barSlotWidth / 2}
            y={chartHeight - pad.bottom + 20}
            textAnchor="middle" fill="#9ca3af" className="text-xs">
            {item.month}
          </text>
        ))}
      </svg>

      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          {colors.slice(0, 3).map((c, i) => (
            <div key={i} className="w-4 h-4 rounded-sm" style={{ backgroundColor: c }} />
          ))}
        </div>
        <span className="text-sm text-gray-600">Monthly Data</span>
      </div>
    </div>
  );
};

export default AnimatedBarChart;`}
                            />
                        )}
                    </ComponentWrapper>

                    {/* ANIMATED AREA CHART SECTION */}
                    <div className="mt-8">
                        <ContentHeader
                            text={"animated area chart"}
                            id={"animated_area_chart"}
                        />
                    </div>

                    <ComponentDescription
                        text="An animated area chart with gradient fill, combining line chart and shaded area visualization with labeled axes."/>

                    <ToggleTab
                        code={areaChartCode}
                        preview={areaChartPreview}
                        setPreview={setAreaChartPreview}
                        setCode={setAreaChartCode}
                    />

                    <ComponentWrapper>
                        {areaChartPreview && (
                            <div className="p-8 flex items-center flex-col gap-5 justify-center">
                                <svg
                                    width={chartWidth}
                                    height={chartHeight}
                                    className="mx-auto"
                                >
                                    <defs>
                                        <linearGradient
                                            id="areaGradient"
                                            x1="0%"
                                            y1="0%"
                                            x2="0%"
                                            y2="100%"
                                        >
                                            <stop
                                                offset="0%"
                                                stopColor="#96c0ce"
                                                stopOpacity="0.6"
                                            />
                                            <stop
                                                offset="100%"
                                                stopColor="#96c0ce"
                                                stopOpacity="0.1"
                                            />
                                        </linearGradient>
                                    </defs>

                                    {renderGridAndAxes("area")}

                                    {/* Animated area */}
                                    <motion.path
                                        d={generateAreaPath()}
                                        fill="url(#areaGradient)"
                                        initial={{opacity: 0}}
                                        animate={{opacity: 1}}
                                        transition={{
                                            duration: 1.5,
                                            ease: "easeInOut",
                                        }}
                                    />

                                    {/* Animated line */}
                                    <motion.path
                                        d={generateLinePath()}
                                        fill="none"
                                        stroke="#96c0ce"
                                        strokeWidth="3"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        initial={{pathLength: 0}}
                                        animate={{pathLength: 1}}
                                        transition={{
                                            duration: 1.5,
                                            ease: "easeInOut",
                                        }}
                                    />

                                    {/* Data points */}
                                    {points.map((point, index) => (
                                        <motion.circle
                                            key={`area-point-${index}`}
                                            cx={point.x}
                                            cy={point.y}
                                            r="4"
                                            fill="#96c0ce"
                                            initial={{opacity: 0, r: 0}}
                                            animate={{opacity: 1, r: 4}}
                                            transition={{
                                                duration: 0.4,
                                                delay: 1.2 + index * 0.1,
                                                ease: "easeOut",
                                            }}
                                            whileHover={{r: 6}}
                                            className="cursor-pointer"
                                        />
                                    ))}

                                    {data.map((item, index) => (
                                        <text
                                            key={`area-label-${index}`}
                                            x={points[index].x}
                                            y={chartHeight - pad.bottom + 20}
                                            textAnchor="middle"
                                            className="text-xs dark:fill-gray-400 fill-gray-600"
                                        >
                                            {item.month}
                                        </text>
                                    ))}
                                </svg>

                                <div className="flex items-center gap-3 mt-2">
                                    <div className="w-4 h-4 rounded-sm" style={{backgroundColor: "#96c0ce"}}/>
                                    <span className="text-sm dark:text-gray-300 text-gray-700">
                                        Performance Metrics
                                    </span>
                                </div>
                            </div>
                        )}

                        {areaChartCode && (
                            <Showcode
                                code={`import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const AnimatedAreaChart = () => {
  const [windowSize, setWindowSize] = useState({ width: undefined });

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth });
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const data = [
    { month: "Jan", value: 400 },
    { month: "Feb", value: 520 },
    { month: "Mar", value: 480 },
    { month: "Apr", value: 650 },
    { month: "May", value: 580 },
    { month: "Jun", value: 720 }
  ];

  const chartWidth = windowSize.width < 640 ? 300 : 500;
  const chartHeight = 300;
  const maxValue = Math.max(...data.map(d => d.value));
  const yAxisMax = Math.ceil(maxValue / 200) * 200;
  const yTickCount = 4;
  const yTicks = Array.from({ length: yTickCount + 1 }, (_, i) =>
    Math.round((yAxisMax / yTickCount) * i)
  );
  const pad = { top: 20, right: 20, bottom: 35, left: 50 };
  const plotWidth = chartWidth - pad.left - pad.right;
  const plotHeight = chartHeight - pad.top - pad.bottom;

  const points = data.map((item, index) => ({
    x: pad.left + (plotWidth / (data.length - 1)) * index,
    y: chartHeight - pad.bottom - (item.value / yAxisMax) * plotHeight,
  }));

  const linePath = points
    .map((p, i) => \`\${i === 0 ? "M" : "L"} \${p.x} \${p.y}\`)
    .join(" ");

  const areaPath = linePath +
    \` L \${points[points.length - 1].x} \${chartHeight - pad.bottom} L \${pad.left} \${chartHeight - pad.bottom} Z\`;

  return (
    <div className="flex flex-col items-center gap-4">
      <svg width={chartWidth} height={chartHeight}>
        <defs>
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#96c0ce" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#96c0ce" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Grid lines and Y-axis labels */}
        {yTicks.map((tick, i) => {
          const y = chartHeight - pad.bottom - (tick / yAxisMax) * plotHeight;
          return (
            <g key={i}>
              <line x1={pad.left} x2={chartWidth - pad.right} y1={y} y2={y}
                stroke="#e5e7eb" strokeWidth="1" opacity="0.5" />
              <text x={pad.left - 8} y={y + 4} textAnchor="end"
                className="text-[10px]" fill="#9ca3af">{tick}</text>
            </g>
          );
        })}

        {/* Axes */}
        <line x1={pad.left} x2={chartWidth - pad.right}
          y1={chartHeight - pad.bottom} y2={chartHeight - pad.bottom}
          stroke="#9ca3af" strokeWidth="2" />
        <line x1={pad.left} x2={pad.left}
          y1={pad.top} y2={chartHeight - pad.bottom}
          stroke="#9ca3af" strokeWidth="2" />

        {/* Area */}
        <motion.path d={areaPath} fill="url(#areaGradient)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }} />

        {/* Line */}
        <motion.path d={linePath} fill="none" stroke="#96c0ce"
          strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }} />

        {/* Data points */}
        {points.map((point, index) => (
          <motion.circle key={index} cx={point.x} cy={point.y}
            r="4" fill="#96c0ce"
            initial={{ opacity: 0, r: 0 }}
            animate={{ opacity: 1, r: 4 }}
            transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
            whileHover={{ r: 6 }} className="cursor-pointer" />
        ))}

        {/* X-axis labels */}
        {data.map((item, index) => (
          <text key={index} x={points[index].x}
            y={chartHeight - pad.bottom + 20}
            textAnchor="middle" fill="#9ca3af" className="text-xs">
            {item.month}
          </text>
        ))}
      </svg>

      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: "#96c0ce" }} />
        <span className="text-sm text-gray-600">Performance Metrics</span>
      </div>
    </div>
  );
};

export default AnimatedAreaChart;`}
                            />
                        )}
                    </ComponentWrapper>

                    <OverviewFooter
                        backName="Pie Chart"
                        backUrl="/components/pie-chart"
                        forwardUrl="/components/timeline"
                        forwardName="Timeline"
                    />
                </div>

                <ContentNavbar
                    contents={graphChartContents}
                    activeSection={activeSection}
                />
            </aside>

            <Helmet>
                <title>Data Display - Graph Chart</title>
            </Helmet>
        </>
    );
};

export default GraphChart;
