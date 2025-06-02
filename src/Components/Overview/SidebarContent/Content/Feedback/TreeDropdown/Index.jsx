import React, {useState} from 'react';

// components
import OverviewFooter from '@shared/OverviewFooter.jsx';
import ContentHeader from '@shared/ContentHeader.jsx';

// contents for scrollspy
import {treeDropdownContents} from '@utils/ContentsConfig/FeedbackContents.js';
import {useScrollSpy} from '@/CustomHooks/useScrollSpy.js';

// react helmet
import {Helmet} from 'react-helmet';

// showing the code
import Showcode from '@shared/Component/ShowCode.jsx';

import ComponentDescription from "@shared/Component/ComponentDescription.jsx";
import ToggleTab from "@shared/Component/ToggleTab.jsx";
import ComponentWrapper from "@shared/Component/ComponentWrapper.jsx";
import ContentNavbar from "@shared/Component/ContentNavbar.jsx";
import WarningMessageCard from "@shared/Component/WarningMessageCard.jsx";
import ControlledTreeExample from "./ControlledTreeExample.jsx";
import DirectoryTreeExample from "./DirectoryTreeExample.jsx";
import SimpleTreeDropdownExmaple from "./SimpleTreeDropdownExmaple.jsx";
import TreeWithLineExample from "./TreeWithLineExample.jsx";

const Index = () => {
    const sectionIds = treeDropdownContents.map((item) => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    const [dataTreePreview, setDataTreePreview] = useState(true);
    const [dataTreeCode, setDataTreeCode] = useState(false);

    const [treeWithLinePreview, setTreeWithLinePreview] = useState(true);
    const [treeWithLineCode, setTreeWithLineCode] = useState(false);

    const [directoryTreePreview, setDirectoryTreePreview] = useState(true);
    const [directoryTreeCode, setDirectoryTreeCode] = useState(false);

    const [controlledTreePreview, setControlledTreePreview] = useState(true);
    const [controlledTreeCode, setControlledTreeCode] = useState(false);

    return (
        <>
            <aside className='flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10'>
                <div className='w-full 425px:w-[80%]'>
                    <WarningMessageCard>
                        <p className='text-[#d18e00] text-[0.9rem]'>
                            This component may include some features or patterns that might be
                            more advanced for beginner developers. However, we’ve made sure to
                            include detailed comments throughout the code to help you
                            understand how everything works and guide you in customizing it to
                            suit your needs.
                            <p className='mt-4'>
                                If you're new to React or component-based libraries, don’t
                                worry! Just follow the comments, and you’ll find it easier to
                                understand the logic and flow of the component.
                            </p>
                        </p>
                    </WarningMessageCard>

                    <ContentHeader text={'data tree'} id={'data_tree'}/>

                    <ComponentDescription text='A data tree is a hierarchical structure of nodes used to organize
            and navigate data efficiently, with a root node and branches of
            connected child nodes.'/>

                    <ToggleTab code={dataTreeCode} setCode={setDataTreeCode} setPreview={setDataTreePreview}
                               preview={dataTreePreview}/>

                    <ComponentWrapper>
                        {dataTreePreview && (
                            <div className='p-8 mb-4 flex items-center flex-col gap-5 justify-center'>
                                <div>
                                    <SimpleTreeDropdownExmaple/>
                                </div>
                            </div>
                        )}

                        {dataTreeCode && (
                            <Showcode
                                code='
import React, {useState} from "react";

// react icons
import {IoMdArrowDropdown, IoMdArrowDropright} from "react-icons/io";

const SimpleTreeDropdown = () => {

    // tree data
    const treeData = [
        {
            label: "Corporate Office",
            children: [
                {
                    label: "Finance Department",
                    children: [
                        {
                            label: "Accounting Team",
                            children: [{ label: "Payroll Management" }],
                        },
                        {
                            label: "Audit and Compliance",
                        },
                    ],
                },
                {
                    label: "Legal Department",
                },
            ],
        },
        {
            label: "Regional Office - Europe",
            children: [
                {
                    label: "Marketing Department",
                    children: [
                        {
                            label: "Digital Marketing",
                        },
                        {
                            label: "Market Research",
                        },
                    ],
                },
                {
                    label: "Operations Team",
                },
            ],
        },
    ];

    // Helper function to get all labels recursively
    const getAllLabels = (nodes) => {
        let labels = [];
        nodes.forEach((node) => {
            labels.push(node.label);
            if (node.children) {
                labels = labels.concat(getAllLabels(node.children));
            }
        });
        return labels;
    };

    // State to track which nodes are open, initialized with all labels
    const [openNodes, setOpenNodes] = useState(getAllLabels(treeData));

    // Toggle node open/close state
    const toggleNode = (node) => {
        if (openNodes.includes(node.label)) {
            setOpenNodes(openNodes.filter((n) => n !== node.label));
        } else {
            setOpenNodes([...openNodes, node.label]);
        }
    };

    // Check if node is open
    const isOpen = (node) => openNodes.includes(node.label);
    // Recursive rendering of tree nodes
    const renderTree = (nodes) => {
        return (
            <ul className="space-y-2">
                {nodes.map((node) => (
                    <li key={node.label} className="ml-2">
                        {/* Node Label */}
                        <div className="cursor-pointer py-1 px-3 flex items-center rounded-md gap-[5px] hover:bg-blue-50 hover:text-blue-800 group dark:text-[#abc2d3] dark:hover:bg-slate-800 dark:hover:text-[#abc2d3] transition-all text-[1rem] duration-200">
                            {node.children && (
                                <span className="text-gray-500 dark:text-[#abc2d3]">
                  {isOpen(node) ? (
                      <IoMdArrowDropdown
                          onClick={() => toggleNode(node)}
                          className="group-hover:text-blue-800 transition-all text-[1.2rem] duration-200"
                      />
                  ) : (
                      <IoMdArrowDropright
                          onClick={() => toggleNode(node)}
                          className="group-hover:text-blue-800 transition-all text-[1.2rem] duration-200"
                      />
                  )}
                </span>
                            )}
                            {node.label}
                        </div>

                        {/* children nodes */}
                        <div
                            className={`ml-6 overflow-hidden transition-all duration-500 ease-in-out ${
                                isOpen(node)
                                    ? "max-h-[500px] opacity-100"
                                    : "max-h-0 opacity-0"
                            }`}
                            style={{
                                transition:
                                    "max-height 0.3s ease-in-out, opacity 0.2s ease-in-out",
                            }}
                        >
                            <ul>{node.children && renderTree(node.children)}</ul>
                        </div>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div>
            {renderTree(treeData)}
        </div>
    );
};

export default SimpleTreeDropdown;
              '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader
                            text={'tree with line'}
                            id={'tree_with_line'}
                        />
                    </div>

                    <ComponentDescription text='A tree with lines shows hierarchical data, with nodes connected by
            lines to represent relationships.'/>

                    <ToggleTab code={treeWithLineCode} setCode={setTreeWithLineCode} setPreview={setTreeWithLinePreview}
                               preview={treeWithLinePreview}/>

                    <ComponentWrapper>
                        {treeWithLinePreview && (
                            <div className='p-8 mb-4 flex items-center flex-col gap-5 justify-center'>
                                <div>
                                    <TreeWithLineExample/>
                                </div>
                            </div>
                        )}

                        {treeWithLineCode && (
                            <Showcode
                                code='
import React, {useState} from "react";

// react icons
import {HiOutlineMinusSm} from "react-icons/hi";
import {GoPlus} from "react-icons/go";

const TreeWithLineDropdown = () => {

    // tree data
    const treeData = [
        {
            label: "Company Headquarters",
            children: [
                {
                    label: "HR Department",
                    children: [
                        {
                            label: "Employee Relations",
                            children: [{ label: "Benefits Team" }],
                        },
                        {
                            label: "Recruitment",
                            children: [{ label: "Talent Acquisition Team" }],
                        },
                    ],
                },
                {
                    label: "IT Department",
                    children: [
                        {
                            label: "Infrastructure Team",
                            children: [{ label: "Network Support" }],
                        },
                        {
                            label: "Software Development",
                            children: [{ label: "Frontend Team" }, { label: "Backend Team" }],
                        },
                    ],
                },
            ],
        },
        {
            label: "Regional Office",
            children: [
                {
                    label: "Sales Department",
                },
                {
                    label: "Customer Support",
                },
            ],
        },
    ];

    // Helper function to get all labels recursively
    const getAllLabels = (nodes) => {
        let labels = [];
        nodes.forEach((node) => {
            labels.push(node.label);
            if (node.children) {
                labels = labels.concat(getAllLabels(node.children));
            }
        });
        return labels;
    };

    // State to track which nodes are open
    const [openNodes, setOpenNodes] = useState(getAllLabels(treeData));

    // Toggle node open/close state
    const toggleNode = (node) => {
        if (openNodes.includes(node.label)) {
            setOpenNodes(openNodes.filter((n) => n !== node.label));
        } else {
            setOpenNodes([...openNodes, node.label]);
        }
    };

    // Check if node is open
    const isOpen = (node) => openNodes.includes(node.label);

    // Recursive rendering of tree nodes
    const renderTree = (nodes, level = 0) => {
        return (
            <ul className="space-y-2">
                {nodes.map((node, index) => (
                    <li key={node.label} className="ml-2 relative">
                        {/* Node Label */}
                        <div
                            className={`cursor-pointer py-1 px-3 flex items-center rounded-md gap-[10px] hover:bg-blue-50 hover:text-blue-800 group dark:text-[#abc2d3] dark:hover:text-[#abc2d3] dark:hover:bg-slate-800 transition-all duration-200`}
                        >
                            {node.children && (
                                <span className="text-gray-500 dark:text-[#abc2d3] z-10">
                  {isOpen(node) ? (
                      <HiOutlineMinusSm
                          onClick={() => toggleNode(node)}
                          className="group-hover:text-blue-800 text-[1.2rem] dark:bg-slate-900 dark:border-slate-700 bg-white transition-all duration-200 border border-gray-300"
                      />
                  ) : (
                      <GoPlus
                          onClick={() => toggleNode(node)}
                          className="group-hover:text-blue-800 transition-all duration-200 bg-white text-[1.2rem] border border-gray-300"
                      />
                  )}
                </span>
                            )}
                            {node.label}
                        </div>

                        {/* Border extension for parent node to connect to children */}

                        <div
                            style={{
                                transition:
                                    "max-height 0.3s ease-in-out, opacity 0.2s ease-in-out",
                            }}
                            className={`${
                                node.children && isOpen(node) && index !== nodes.length - 1
                                    ? "max-h-full opacity-100"
                                    : "max-h-0 opacity-0"
                            } transition-all duration-500 absolute dark:bg-slate-700 left-[21px] top-6 w-[1px] bg-gray-200 h-full`}
                        ></div>

                        {/* Render children nodes */}
                        <div
                            className={`ml-6 overflow-hidden transition-all duration-500 ease-in-out ${
                                isOpen(node)
                                    ? "max-h-[500px] opacity-100"
                                    : "max-h-0 opacity-0"
                            }`}
                            style={{
                                transition:
                                    "max-height 0.3s ease-in-out, opacity 0.2s ease-in-out",
                            }}
                        >
                            <ul>{node.children && renderTree(node.children, level + 1)}</ul>
                        </div>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div>
            {renderTree(treeData)}
        </div>
    );
};

export default TreeWithLineDropdown;
              '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader text={'directory tree'} id={'directory_tree'}/>
                    </div>

                    <ComponentDescription text='A directory tree is a hierarchical structure that displays folders
            and files in a system, organized by directories and subdirectories.'/>

                    <ToggleTab code={directoryTreeCode} preview={directoryTreePreview}
                               setPreview={setDirectoryTreePreview} setCode={setDirectoryTreeCode}/>

                    <ComponentWrapper>
                        {directoryTreePreview && (
                            <div className='p-8 mb-4 flex items-center flex-col gap-5 justify-center'>
                                <div>
                                    <DirectoryTreeExample/>
                                </div>
                            </div>
                        )}

                        {directoryTreeCode && (
                            <Showcode
                                code='
import React, {useState} from "react";

// react icons
import {FaRegFile, FaRegFolder, FaRegFolderOpen} from "react-icons/fa";

const DirectoryTreeDropdown = () => {

    // tree data
    const treeData = [
        {
            label: "Root Folder",
            children: [
                {
                    label: "Documents",
                    children: [
                        {
                            label: "Work",
                            children: [
                                { label: "Resume.docx" },
                                { label: "ProjectProposal.pdf" },
                            ],
                        },
                        {
                            label: "Personal",
                            children: [{ label: "VacationPlan.xlsx" }],
                        },
                    ],
                },
                {
                    label: "Legal",
                    children: [
                        { label: "Contract.pdf" },
                        { label: "TermsAndConditions.docx" },
                    ],
                },
            ],
        },
        {
            label: "Downloads",
            children: [
                {
                    label: "Software",
                    children: [{ label: "Installer.exe" }, { label: "ReadMe.txt" }],
                },
                {
                    label: "Images",
                    children: [
                        { label: "HolidayPhoto.jpg" },
                        { label: "ProfilePicture.png" },
                    ],
                },
            ],
        },
    ];

    // Helper function to get all labels recursively
    const getAllLabels = (nodes) => {
        let labels = [];
        nodes.forEach((node) => {
            labels.push(node.label);
            if (node.children) {
                labels = labels.concat(getAllLabels(node.children));
            }
        });
        return labels;
    };

    // State to track which nodes are open
    const [openNodes, setOpenNodes] = useState(getAllLabels(treeData));

    // Toggle node open/close state
    const toggleNode = (node) => {
        if (openNodes.includes(node.label)) {
            setOpenNodes(openNodes.filter((n) => n !== node.label));
        } else {
            setOpenNodes([...openNodes, node.label]);
        }
    };

    // Check if node is open
    const isOpen = (node) => openNodes.includes(node.label);

    // Recursive rendering of tree nodes
    const renderTree = (nodes) => {
        return (
            <ul className="space-y-2">
                {nodes.map((node) => (
                    <li key={node.label} className="ml-2">
                        {/* Node Label */}
                        <div className="cursor-pointer py-1 px-3 flex items-center rounded-md gap-[5px] hover:bg-blue-50 hover:text-blue-800 group dark:hover:text-[#abc2d3] dark:text-[#abc2d3] dark:hover:bg-slate-800 transition-all text-[1rem] duration-200">
                            {node.children && (
                                <span className="text-gray-500 dark:text-[#abc2d3]">
                  {isOpen(node) ? (
                      <FaRegFolderOpen
                          onClick={() => toggleNode(node)}
                          className="group-hover:text-blue-800 dark:group-hover:text-[#abc2d3] transition-all text-[1.2rem] duration-200"
                      />
                  ) : (
                      <FaRegFolder
                          onClick={() => toggleNode(node)}
                          className="group-hover:text-blue-800 dark:group-hover:text-[#abc2d3] transition-all text-[1.2rem] duration-200"
                      />
                  )}
                </span>
                            )}

                            {!node.children && (
                                <FaRegFile className="group-hover:text-blue-800 dark:group-hover:text-[#abc2d3] dark:text-[#abc2d3] text-gray-500 transition-all text-[1rem] duration-200" />
                            )}
                            {node.label}
                        </div>

                        {/* children nodes */}
                        <div
                            className={`ml-6 overflow-hidden transition-all duration-500 ease-in-out ${
                                isOpen(node)
                                    ? "max-h-[500px] opacity-100"
                                    : "max-h-0 opacity-0"
                            }`}
                            style={{
                                transition:
                                    "max-height 0.3s ease-in-out, opacity 0.2s ease-in-out",
                            }}
                        >
                            <ul>{node.children && renderTree(node.children)}</ul>
                        </div>
                    </li>
                ))}
            </ul>
        );
    }

    return (
        <div>
            {renderTree(treeData)}
        </div>
    );
};

export default DirectoryTreeDropdown;
              '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader
                            text={'Controlled Tree'}
                            id={'controlled_tree'}
                        />
                    </div>

                    <ComponentDescription text='A controlled tree checkbox is a tree structure with checkboxes for
            each node, where the checked state is programmatically managed for
            dynamic updates.'/>

                    <ToggleTab code={controlledTreeCode} preview={controlledTreePreview} setCode={setControlledTreeCode}
                               setPreview={setControlledTreePreview}/>

                    <ComponentWrapper>
                        {controlledTreePreview && (
                            <div className='p-8 mb-4 flex items-center flex-col gap-5 justify-center'>
                                <div>
                                    <ControlledTreeExample/>
                                </div>
                            </div>
                        )}

                        {controlledTreeCode && (
                            <Showcode
                                code='
import React, {useState} from "react";

// react icons
import {IoMdArrowDropdown, IoMdArrowDropright} from "react-icons/io";

const ControlledTreeDropdown = () => {

    // tree data
    const treeData = [
        {
            label: "University Campus",
            children: [
                {
                    label: "Faculty of Business and Economics",
                    children: [
                        {
                            label: "Department of Finance",
                            children: [{ label: "Corporate Finance Course" }],
                        },
                        {
                            label: "Department of Accounting",
                            children: [{ label: "Financial Accounting Course" }],
                        },
                    ],
                },
                {
                    label: "Faculty of Law",
                    children: [
                        { label: "International Law Course" },
                        { label: "Business Law Course" },
                    ],
                },
            ],
        },
        {
            label: "Regional Campus - Europe",
            children: [
                {
                    label: "Faculty of Arts and Humanities",
                    children: [
                        {
                            label: "Department of Literature",
                            children: [{ label: "Modern Literature Course" }],
                        },
                        {
                            label: "Department of Philosophy",
                            children: [{ label: "Ethics and Morality Course" }],
                        },
                    ],
                },
                {
                    label: "Faculty of Social Sciences",
                    children: [
                        { label: "Sociology Course" },
                        { label: "Political Science Course" },
                    ],
                },
            ],
        },
    ];

    // Helper function to get all labels recursively
    const getAllLabels = (nodes) => {
        let labels = [];
        nodes.forEach((node) => {
            labels.push(node.label);
            if (node.children) {
                labels = labels.concat(getAllLabels(node.children));
            }
        });
        return labels;
    };

    const [openNodes, setOpenNodes] = useState(getAllLabels(treeData));
    const [checkedNodes, setCheckedNodes] = useState({});

    // Toggle node open/close state
    const toggleNode = (node) => {
        if (openNodes.includes(node.label)) {
            setOpenNodes(openNodes.filter((n) => n !== node.label));
        } else {
            setOpenNodes([...openNodes, node.label]);
        }
    };

    // Check if node is open
    const isOpen = (node) => openNodes.includes(node.label);

    // Handle checkbox change for parent/child
    const handleCheckboxChange = (node, isChecked) => {
        const updatedCheckedNodes = { ...checkedNodes };

        const updateCheckedState = (node, isChecked) => {
            updatedCheckedNodes[node.label] = isChecked;

            if (node.children) {
                node.children.forEach((child) => {
                    updateCheckedState(child, isChecked);
                });
            }
        };

        updateCheckedState(node, isChecked);
        setCheckedNodes(updatedCheckedNodes);
    };

    // Recursive rendering of tree nodes
    const renderTree = (nodes, parent = null) => {
        return (
            <ul className="space-y-2">
                {nodes.map((node) => (
                    <li key={node.label} className="ml-2">
                        {/* Node Label */}
                        <div className="cursor-pointer py-1 px-3 flex items-center rounded-md gap-[5px] hover:bg-blue-50 hover:text-blue-800 group dark:text-[#abc2d3] dark:hover:bg-slate-800 dark:hover:text-[#abc2d3] transition-all text-[0.990rem] duration-200">
                            {node.children && (
                                <span className="text-gray-500">
                  {isOpen(node) ? (
                      <IoMdArrowDropdown
                          onClick={() => toggleNode(node)}
                          className="group-hover:text-blue-800 dark:group-hover:text-[#abc2d3] transition-all text-[1.2rem] duration-200"
                      />
                  ) : (
                      <IoMdArrowDropright
                          onClick={() => toggleNode(node)}
                          className="group-hover:text-blue-800 dark:group-hover:text-[#abc2d3] transition-all text-[1.2rem] duration-200"
                      />
                  )}
                </span>
                            )}
                            <label className="flex items-center gap-[10px] cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="hidden"
                                    checked={
                                        checkedNodes[node.label] === true ||
                                        checkedNodes[node.label] === "indeterminate"
                                    }
                                    indeterminate={
                                        checkedNodes[node.label] === "indeterminate" ? true : false
                                    }
                                    onChange={(e) => handleCheckboxChange(node, e.target.checked)}
                                />
                                <div className="relative">
                  <span
                      className={`${
                          checkedNodes[node.label]
                              ? "opacity-100 z-20 scale-[1]"
                              : "opacity-0 scale-[0.4] z-[-1]"
                      } transition-all duration-200 absolute top-0 left-0`}
                  >
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="Group 335">
                        <rect
                            id="Rectangle 331"
                            x="-0.00012207"
                            y="6.10352e-05"
                            width="20"
                            height="20"
                            rx="4"
                            className="fill-[#3B9DF8]"
                            stroke="#3B9DF8"
                        ></rect>
                        <path
                            id="Vector"
                            d="M8.19594 15.4948C8.0646 15.4949 7.93453 15.4681 7.81319 15.4157C7.69186 15.3633 7.58167 15.2865 7.48894 15.1896L4.28874 11.8566C4.10298 11.6609 3.99914 11.3965 3.99988 11.1213C4.00063 10.8461 4.10591 10.5824 4.29272 10.3878C4.47953 10.1932 4.73269 10.0835 4.99689 10.0827C5.26109 10.0819 5.51485 10.1901 5.70274 10.3836L8.19591 12.9801L14.2887 6.6335C14.4767 6.4402 14.7304 6.3322 14.9945 6.33307C15.2586 6.33395 15.5116 6.44362 15.6983 6.63815C15.8851 6.83268 15.9903 7.09627 15.9912 7.37137C15.992 7.64647 15.8883 7.91073 15.7027 8.10648L8.90294 15.1896C8.8102 15.2865 8.7 15.3633 8.57867 15.4157C8.45734 15.4681 8.32727 15.4949 8.19594 15.4948Z"
                            fill="white"
                        ></path>
                      </g>
                    </svg>
                  </span>

                                    <span
                                        className={`${
                                            !checkedNodes[node.label]
                                                ? "opacity-100 z-20 scale-[1]"
                                                : "opacity-0 scale-[0.4] z-[-1]"
                                        } transition-all duration-200`}
                                    >
                    <svg
                        width="18"
                        height="18"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="Group 335">
                        <rect
                            id="Rectangle 331"
                            x="-0.00012207"
                            y="6.10352e-05"
                            width="19"
                            height="19"
                            rx="4"
                            className="fill-transparent dark:stroke-slate-500"
                            stroke="#cccccc"
                        ></rect>
                      </g>
                    </svg>
                  </span>
                                </div>
                            </label>
                            {node.label}
                        </div>

                        {/* children nodes */}
                        <div
                            className={`ml-6 overflow-hidden transition-all duration-500 ease-in-out ${
                                isOpen(node)
                                    ? "max-h-[500px] opacity-100"
                                    : "max-h-0 opacity-0"
                            }`}
                            style={{
                                transition:
                                    "max-height 0.3s ease-in-out, opacity 0.2s ease-in-out",
                            }}
                        >
                            <ul>{node.children && renderTree(node.children, node)}</ul>
                        </div>
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <div>
            {renderTree(treeData)}
        </div>
    );
};

export default ControlledTreeDropdown;
              '
                            />
                        )}
                    </ComponentWrapper>

                    <OverviewFooter
                        backUrl='/components/skeleton'
                        backName='skeleton'
                        forwardName='alert message'
                        forwardUrl='/components/alert-message'
                    />
                </div>

                <ContentNavbar contents={treeDropdownContents} activeSection={activeSection}/>

            </aside>
            <Helmet>
                <title>Feedback - Tree Dropdown</title>
            </Helmet>
        </>
    );
};

export default Index;
