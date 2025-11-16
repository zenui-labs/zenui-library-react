import React, { useState, useEffect } from 'react';
// components
import OverviewFooter from '@shared/OverviewFooter';
import ContentHeader from '@shared/ContentHeader';
import ComponentDescription from '@shared/Component/ComponentDescription.jsx';
import ToggleTab from '@shared/Component/ToggleTab.jsx';
import ComponentWrapper from '@shared/Component/ComponentWrapper.jsx';
import ContentNavbar from '@shared/Component/ContentNavbar.jsx';
import Showcode from '@shared/Component/ShowCode.jsx';
import PropTypes from 'prop-types'; 
// scrollspy
import { breadcrumbContents } from '@utils/ContentsConfig/NavigationContents';
import { useScrollSpy } from '@/CustomHooks/useScrollSpy';

// helmet
import { Helmet } from 'react-helmet';

// icons
import { MdKeyboardArrowDown, MdArrowBackIos, MdChevronRight } from 'react-icons/md';

// react-router
import { Link, useNavigate } from 'react-router-dom';

const Breadcrumb = () => {
  const sectionIds = breadcrumbContents.map((item) => item.href.slice(1));
  const activeSection = useScrollSpy(sectionIds);

  // non clickable
  const [nonClickablePreview, setNonClickablePreview] = useState(true);
  const [nonClickableCode, setNonClickableCode] = useState(false);

  // clickable
  const [clickablePreview, setClickablePreview] = useState(true);
  const [clickableCode, setClickableCode] = useState(false);

  // dropdown breadcrumb
  const [dropdownBreadcrumbPreview, setDropdownBreadcrumbPreview] = useState(true);
  const [dropdownBreadcrumbCode, setDropdownBreadcrumbCode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // customizable breadcrumb
  const [customizableBreadcrumbPreview, setCustomizableBreadcrumbPreview] = useState(true);
  const [customizableBreadcrumbCode, setCustomizableBreadcrumbCode] = useState(false);

  // BreadcrumbV2
  const [v2Preview, setV2Preview] = useState(true);
  const [v2Code, setV2Code] = useState(false);

  const nonClickableItems = [
    { label: 'Home', path: '/' },
    { label: 'Category', path: '/category' },
    { label: 'Sub Category', path: '/sub-category' },
    { label: 'Current Page', path: '/current-page' },
  ];

  const dropdownBreadcrumbArray = [
    { label: 'Home', path: '/' },
    { label: 'Category', path: '/category' },
    { label: 'Sub Category', path: '/sub-category' },
    { label: 'About Us', path: '/about-us' },
    { label: 'Contact Us', path: '/contact-us' },
    { label: 'Current Page', path: '/current-page' },
  ];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !e.target.closest('.dropdownModal') &&
        !e.target.closest('.dropdownButton')
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // BreadcrumbV2 Component
  const Breadcrumb = ({ title, breadcrumbs = [] }) => {
    const navigate = useNavigate();

    return (
      <div className="flex items-center justify-between py-2">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <MdArrowBackIos className="w-4 h-4 text-gray-600 dark:text-gray-300" />
          </button>

          <div>
            <h1 className="text-xl font-semibold dark:text-white">{title}</h1>

            <nav className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
              {breadcrumbs.map((crumb, index) => (
                <div key={index} className="flex items-center">
                  <Link
                    to={crumb.href}
                    className="hover:underline transition-colors"
                  >
                    {crumb.label}
                  </Link>
                  {index < breadcrumbs.length - 1 && (
                    <MdChevronRight className="w-3 h-3 mx-1 text-gray-400 dark:text-gray-500" />
                  )}
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <aside className="flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10">
        <div className="flex-1">
          {/* 1. Non-clickable */}
          <ContentHeader text="non clickable breadcrumb" id="non_clickable_breadcrumb" />
          <ComponentDescription
            text="A breadcrumb navigation that displays the user's path but with non-clickable links, serving as a visual guide without interactive functionality."
          />
          <ToggleTab
            code={nonClickableCode}
            setCode={setNonClickableCode}
            setPreview={setNonClickablePreview}
            preview={nonClickablePreview}
          />
          <ComponentWrapper>
            {nonClickablePreview && (
              <div className="p-8 mb-4 flex flex-wrap items-center gap-5 justify-center">
                <ol className="flex items-center flex-wrap gap-[5px]">
                  {nonClickableItems.map((item, index) => (
                    <React.Fragment key={index}>
                      <li
                        className={`text-[0.9rem] dark:text-[#abc2d3] text-text ${
                          index === nonClickableItems.length - 1 && '!text-primary'
                        }`}
                      >
                        {item.label}
                      </li>
                      {index !== nonClickableItems.length - 1 && (
                        <MdKeyboardArrowDown className="rotate-[-90deg] dark:text-[#abc2d3] text-[0.9rem]" />
                      )}
                    </React.Fragment>
                  ))}
                </ol>
              </div>
            )}
            {nonClickableCode && (
              <Showcode
                code={`
import React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

const Breadcrumb = () => {
  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Category", path: "/category" },
    { label: "Sub Category", path: "/sub-category" },
    { label: "Current Page", path: "/current-page" },
  ];

  return (
    <ol className="flex items-center gap-[5px]">
      {breadcrumbItems.map((item, index) => (
        <React.Fragment key={index}>
          <li
            className={\`text-[0.9rem] dark:text-[#abc2d3] text-text \${index === breadcrumbItems.length - 1 && "!text-primary"}\`}
          >
            {item.label}
          </li>
          {index !== breadcrumbItems.length - 1 && (
            <MdKeyboardArrowDown className="rotate-[-90deg] dark:text-[#abc2d3] text-[0.9rem]" />
          )}
        </React.Fragment>
      ))}
    </ol>
  );
};

export default Breadcrumb;
                `}
              />
            )}
          </ComponentWrapper>

          {/* 2. Clickable */}
          <div className="mt-8">
            <ContentHeader text="clickable breadcrumb" id="clickable_breadcrumb" />
          </div>
          <ComponentDescription
            text="A breadcrumb navigation with clickable links, allowing users to easily navigate back to previous pages or sections."
          />
          <ToggleTab
            code={clickableCode}
            setCode={setClickableCode}
            preview={clickablePreview}
            setPreview={setClickablePreview}
          />
          <ComponentWrapper>
            {clickablePreview && (
              <div className="p-8 mb-4 flex flex-wrap items-center gap-5 justify-center">
                <div className="flex items-center flex-wrap gap-[5px]">
                  {nonClickableItems.map((item, index) => (
                    <React.Fragment key={index}>
                      <a
                        href={item.path}
                        className={`text-[0.9rem] dark:text-[#abc2d3] text-text hover:underline ${
                          index === nonClickableItems.length - 1 && '!text-primary'
                        }`}
                      >
                        {item.label}
                      </a>
                      {index !== nonClickableItems.length - 1 && (
                        <MdKeyboardArrowDown className="rotate-[-90deg] dark:text-[#abc2d3] text-[0.9rem]" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
            {clickableCode && (
              <Showcode
                code={`
import React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

const Breadcrumb = () => {
  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Category", path: "/category" },
    { label: "Sub Category", path: "/sub-category" },
    { label: "Current Page", path: "/current-page" },
  ];

  return (
    <div className="flex items-center gap-[5px]">
      {breadcrumbItems.map((item, index) => (
        <React.Fragment key={index}>
          <a
            href={item.path}
            className={\`text-[0.9rem] dark:text-[#abc2d3] text-text hover:underline \${index === breadcrumbItems.length - 1 && "!text-primary"}\`}
          >
            {item.label}
          </a>
          {index !== breadcrumbItems.length - 1 && (
            <MdKeyboardArrowDown className="rotate-[-90deg] dark:text-[#abc2d3] text-[0.9rem]" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumb;
                `}
              />
            )}
          </ComponentWrapper>

          {/* 3. Dropdown Breadcrumb */}
          <div className="mt-8">
            <ContentHeader text="dropdown breadcrumb" id="dropdown_breadcrumb" />
          </div>
          <ComponentDescription
            text="A breadcrumb navigation with a dropdown that appears after a certain number of links, allowing users to access additional navigation options from the dropdown menu."
          />
          <ToggleTab
            code={dropdownBreadcrumbCode}
            setCode={setDropdownBreadcrumbCode}
            setPreview={setDropdownBreadcrumbPreview}
            preview={dropdownBreadcrumbPreview}
          />
          <ComponentWrapper>
            {dropdownBreadcrumbPreview && (
              <div
                className={`${
                  dropdownOpen ? 'mb-[8rem]' : 'mb-4'
                } p-8 flex flex-wrap items-center gap-5 justify-center transition-all duration-300`}
              >
                <div className="flex items-center gap-[5px]">
                  {dropdownBreadcrumbArray.slice(0, 3).map((item, index) => (
                    <React.Fragment key={index}>
                      <a
                        href={item.path}
                        className={`text-[0.9rem] dark:text-[#abc2d3] text-text hover:underline ${
                          index === 2 && '!text-primary'
                        }`}
                      >
                        {item.label}
                      </a>
                      {index !== 2 && (
                        <MdKeyboardArrowDown className="rotate-[-90deg] dark:text-[#abc2d3] text-[0.9rem]" />
                      )}
                    </React.Fragment>
                  ))}

                  <div className="relative">
                    <p
                      className="dropdownButton dark:text-[#abc2d3] cursor-pointer"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                      ....
                    </p>
                    <div
                      className={`${
                        dropdownOpen
                          ? 'translate-y-0 opacity-100 z-30'
                          : 'translate-y-[-20px] opacity-0 z-[-1]'
                      } flex flex-col text-[0.8rem] dark:bg-slate-800 dark:text-[#abc2d3] bg-white boxShadow dropdownModal transition-all duration-300 rounded-md py-1 absolute top-[25px] right-0 640px:left-[-20px] w-max`}
                    >
                      {dropdownBreadcrumbArray.slice(3).map((item, index) => (
                        <a
                          href={item.path}
                          key={index}
                          className="w-full hover:bg-gray-100 dark:hover:bg-slate-900/40 px-8 py-2 cursor-pointer"
                        >
                          {item.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {dropdownBreadcrumbCode && (
              <Showcode
                code={`
import React, { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

const Breadcrumb = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Category", path: "/category" },
    { label: "Sub Category", path: "/sub-category" },
    { label: "About Us", path: "/about-us" },
    { label: "Contact Us", path: "/contact-us" },
    { label: "Current Page", path: "/current-page" },
  ];

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".dropdownModal") && !e.target.closest(".dropdownButton")) {
      setDropdownOpen(false);
    }
  });

  return (
    <div className="flex items-center gap-[5px]">
      {breadcrumbItems.slice(0, 3).map((item, index) => (
        <React.Fragment key={index}>
          <a
            href={item.path}
            className={\`text-[0.9rem] dark:text-[#abc2d3] text-text hover:underline \${index === 2 && "!text-primary"}\`}
          >
            {item.label}
          </a>
          {index !== 2 && (
            <MdKeyboardArrowDown className="rotate-[-90deg] dark:text-[#abc2d3] text-[0.9rem]" />
          )}
        </React.Fragment>
      ))}

      <div className="relative">
        <p className="dropdownButton cursor-pointer" onClick={() => setDropdownOpen(!dropdownOpen)}>
          ....
        </p>
        <div
          className={\`\${dropdownOpen ? "translate-y-0 opacity-100 z-30" : "translate-y-[-20px] opacity-0 z-[-1]"} 
          flex flex-col text-[0.8rem] dark:bg-slate-800 dark:text-[#abc2d3] bg-white boxShadow dropdownModal 
          transition-all duration-300 rounded-md py-1 absolute top-[25px] right-0 640px:left-[-20px] w-max\`}
        >
          {breadcrumbItems.slice(3).map((item, index) => (
            <a
              href={item.path}
              key={index}
              className="w-full hover:bg-gray-100 dark:hover:bg-slate-900/40 px-8 py-2 cursor-pointer"
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
                `}
              />
            )}
          </ComponentWrapper>

          {/* 4. Customizable */}
          <div className="mt-8">
            <ContentHeader text="customizable breadcrumb" id="customizable_breadcrumb" />
          </div>
          <ComponentDescription
            text="A breadcrumb with fully customizable background, text color and active-item styling."
          />
          <ToggleTab
            code={customizableBreadcrumbCode}
            setCode={setCustomizableBreadcrumbCode}
            preview={customizableBreadcrumbPreview}
            setPreview={setCustomizableBreadcrumbPreview}
          />
          <ComponentWrapper>
            {customizableBreadcrumbPreview && (
              <div
                className={`${
                  dropdownOpen ? 'mb-[8rem]' : 'mb-4'
                } p-8 flex flex-wrap items-center gap-5 justify-center transition-all duration-300`}
              >
                <div className="flex flex-col gap-[10px]">
                  {/* Blue */}
                  <ol className="flex items-center flex-wrap gap-[5px] dark:bg-blue-800/20 bg-blue-50 py-2.5 px-3 rounded-md">
                    {nonClickableItems.map((item, index) => (
                      <React.Fragment key={index}>
                        <li
                          className={`text-[0.9rem] dark:text-blue-600 text-blue-900 ${
                            index === nonClickableItems.length - 1 && 'font-bold'
                          }`}
                        >
                          {item.label}
                        </li>
                        {index !== nonClickableItems.length - 1 && (
                          <MdKeyboardArrowDown className="rotate-[-90deg] text-blue-900 text-[0.9rem]" />
                        )}
                      </React.Fragment>
                    ))}
                  </ol>

                  {/* Orange */}
                  <ol className="flex items-center flex-wrap gap-[5px] dark:bg-orange-800/20 bg-orange-50 py-2.5 px-3 rounded-md">
                    {nonClickableItems.map((item, index) => (
                      <React.Fragment key={index}>
                        <li
                          className={`text-[0.9rem] dark:text-orange-600 text-orange-900 ${
                            index === nonClickableItems.length - 1 && 'font-bold'
                          }`}
                        >
                          {item.label}
                        </li>
                        {index !== nonClickableItems.length - 1 && (
                          <MdKeyboardArrowDown className="rotate-[-90deg] text-orange-900 text-[0.9rem]" />
                        )}
                      </React.Fragment>
                    ))}
                  </ol>

                  {/* Green */}
                  <ol className="flex items-center flex-wrap gap-[5px] dark:bg-green-800/20 bg-green-50 py-2.5 px-3 rounded-md">
                    {nonClickableItems.map((item, index) => (
                      <React.Fragment key={index}>
                        <li
                          className={`text-[0.9rem] dark:text-green-600 text-green-900 ${
                            index === nonClickableItems.length - 1 && 'font-bold'
                          }`}
                        >
                          {item.label}
                        </li>
                        {index !== nonClickableItems.length - 1 && (
                          <MdKeyboardArrowDown className="rotate-[-90deg] text-green-900 text-[0.9rem]" />
                        )}
                      </React.Fragment>
                    ))}
                  </ol>
                </div>
              </div>
            )}
            {customizableBreadcrumbCode && (
              <Showcode
                code={`
import React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

const Breadcrumb = () => {
  const breadcrumbItems = [
    { label: "Home", path: "/" },
    { label: "Category", path: "/category" },
    { label: "Sub Category", path: "/sub-category" },
    { label: "Current Page", path: "/current-page" },
  ];

  return (
    <div className="flex flex-col gap-[10px]">
      {/* Blue */}
      <ol className="flex items-center gap-[5px] dark:bg-blue-800/20 bg-blue-50 py-2.5 px-3 rounded-md">
        {breadcrumbItems.map((item, index) => (
          <React.Fragment key={index}>
            <li
              className={\`text-[0.9rem] dark:text-blue-600 text-blue-900 \${index === breadcrumbItems.length - 1 && "font-bold"}\`}
            >
              {item.label}
            </li>
            {index !== breadcrumbItems.length - 1 && (
              <MdKeyboardArrowDown className="rotate-[-90deg] text-blue-900 text-[0.9rem]" />
            )}
          </React.Fragment>
        ))}
      </ol>

      {/* Orange & Green similar... */}
    </div>
  );
};

export default Breadcrumb;
                `}
              />
            )}
          </ComponentWrapper>

          {/* 5. BreadcrumbV2 (New Component) */}
          <div className="mt-8">
            <ContentHeader text="Breadcrumb  (with back button & title)" id="breadcrumb_v2" />
          </div>
          <ComponentDescription
            text="A modern breadcrumb that shows a page title, a back-arrow button, and fully clickable links using React-Router. Ideal for detail pages."
          />
          <ToggleTab
            code={v2Code}
            setCode={setV2Code}
            preview={v2Preview}
            setPreview={setV2Preview}
          />
          <ComponentWrapper>
            {v2Preview && (
              <div className="p-8 mb-4  rounded-lg">
                <Breadcrumb
                  title="Product Detail"
                  breadcrumbs={[
                    { label: 'Home', href: '/' },
                    { label: 'Shop', href: '/shop' },
                    { label: 'Electronics', href: '/shop/electronics' },
                    { label: 'Laptop', href: '/shop/electronics/laptop' },
                  ]}
                />
              </div>
            )}
            {v2Code && (
              <Showcode
                code={`
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdArrowBackIos, MdChevronRight } from "react-icons/md";

const Breadcrumb = ({ title, breadcrumbs = [] }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <MdArrowBackIos className="w-4 h-4 text-gray-600 dark:text-gray-300" />
        </button>

        <div>
          <h1 className="text-xl font-semibold dark:text-white">{title}</h1>

          <nav className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center">
                <Link
                  to={crumb.href}
                  className="hover:underline transition-colors"
                >
                  {crumb.label}
                </Link>
                {index < breadcrumbs.length - 1 && (
                  <MdChevronRight className="w-3 h-3 mx-1 text-gray-400 dark:text-gray-500" />
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
                `}
              />
            )}
          </ComponentWrapper>

          {/* Footer */}
          <OverviewFooter
            backUrl="/components/chip"
            backName="chip"
            forwardName="rating"
            forwardUrl="/components/rating"
          />
        </div>

        {/* Right Sidebar */}
        <ContentNavbar activeSection={activeSection} contents={breadcrumbContents} />
      </aside>

      <Helmet>
        <title>Navigation - Breadcrumb</title>
      </Helmet>
    </>
  );
};
Breadcrumb.propTypes = {
  title: PropTypes.string.isRequired,
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string.isRequired,
    })
  ),
};
export default Breadcrumb;



