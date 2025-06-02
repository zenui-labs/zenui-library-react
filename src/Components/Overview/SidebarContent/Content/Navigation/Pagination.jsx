import React, {useState} from 'react';

// components
import OverviewFooter from '@shared/OverviewFooter';
import ContentHeader from '@shared/ContentHeader';
import PageButton from './PageButton';

// contents for scrollspy
import {paginationContents} from '@utils/ContentsConfig/NavigationContents';
import {useScrollSpy} from '@/CustomHooks/useScrollSpy';

// react helmet
import {Helmet} from 'react-helmet';

// showing the code
import Showcode from '@shared/Component/ShowCode.jsx';
import {FaChevronLeft, FaChevronRight} from 'react-icons/fa';

import ComponentDescription from "@shared/Component/ComponentDescription.jsx";
import ToggleTab from "@shared/Component/ToggleTab.jsx";
import ComponentWrapper from "@shared/Component/ComponentWrapper.jsx";
import ContentNavbar from "@shared/Component/ContentNavbar.jsx";

const Pagination = () => {
    const sectionIds = paginationContents.map((item) => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    // animatedPagination
    const [animatedPaginationPreview, setAnimatedPaginationPreview] =
        useState(true);
    const [animatedPaginationCode, setAnimatedPaginationCode] = useState(false);

    // paginationWithButton
    const [paginationWithButtonPreview, setPaginationWithButtonPreview] =
        useState(true);
    const [paginationWithButtonCode, setPaginationWithButtonCode] =
        useState(false);

    // roundedButtonPagination
    const [roundedButtonPaginationPreview, setRoundedButtonPaginationPreview] =
        useState(true);
    const [roundedButtonPaginationCode, setRoundedButtonPaginationCode] =
        useState(false);

    // smartPagination
    const [smartPaginationPreview, setSmartPaginationPreview] =
        useState(true);
    const [smartPaginationCode, setSmartPaginationCode] =
        useState(false);

    // second pagination
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 5;

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];

        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handlePageClick(i)}
                    className={`mx-1 px-3 py-1 text-[0.9rem] 640px:text-[1rem] rounded ${
                        currentPage === i
                            ? 'bg-primary text-white'
                            : 'bg-gray-200 dark:bg-slate-700 dark:text-[#abc2d3] text-gray-700'
                    }`}
                >
                    {i}
                </button>
            );
        }

        return pageNumbers;
    };

    const renderPageNumbers2 = () => {
        const pageNumbers = [];

        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handlePageClick(i)}
                    className={`mx-1 px-4 py-2 text-[0.9rem] 640px:text-[1rem] rounded-full transform transition-all duration-300 ${
                        currentPage === i
                            ? 'bg-primary text-white scale-110 shadow-md'
                            : 'bg-transparent text-blue-600 hover:bg-blue-100'
                    }`}
                >
                    {i}
                </button>
            );
        }

        return pageNumbers;
    };

    const renderPageNumbers3 = () => {
        const pageNumbers = [];

        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handlePageClick(i)}
                    className={`mx-1 px-3 py-1 text-[0.9rem] 640px:text-[1rem] rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all dark:bg-slate-700 dark:text-[#abc2d3] duration-300 transform hover:scale-105 ${
                        currentPage === i ? '!bg-primary !text-white shadow-lg' : ''
                    }`}
                >
                    {i}
                </button>
            );
        }

        return pageNumbers;
    };

    // pagination 4 logic start

    const [currentPagePagination4, setCurrentPagePagination4] = useState(1);

    const FourPaginationTotalPages = 50;

    const handlePreviousPagination4 = () => {
        if (currentPagePagination4 > 1) {
            setCurrentPagePagination4((prev) => prev - 1);
        }
    };

    const handleNextPagination4 = () => {
        if (currentPagePagination4 < FourPaginationTotalPages) {
            setCurrentPagePagination4((prev) => prev + 1);
        }
    };

    const handlePageClick4 = (pageNumber) => {
        setCurrentPagePagination4(pageNumber);
    };

    const renderPageNumbersForPagination4 = () => {
        const pageNumbers = [];
        const startPage = Math.max(2, currentPagePagination4 - 1);
        const endPage = Math.min(
            FourPaginationTotalPages - 1,
            currentPagePagination4 + 1
        );

        pageNumbers.push(
            <PageButton
                key={1}
                pageNumber={1}
                isActive={currentPagePagination4 === 1}
                onClick={handlePageClick4}
            />
        );

        if (startPage > 2) {
            pageNumbers.push(
                <span key="start-dots" className="mx-1 px-2 dark:text-[#abc2d3] text-gray-500">
          ...
        </span>
            );
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <PageButton
                    key={i}
                    pageNumber={i}
                    isActive={currentPagePagination4 === i}
                    onClick={handlePageClick4}
                />
            );
        }

        if (endPage < FourPaginationTotalPages - 1) {
            pageNumbers.push(
                <span key="end-dots" className="mx-1 px-2 dark:text-[#abc2d3] text-gray-500">
          ...
        </span>
            );
        }

        pageNumbers.push(
            <PageButton
                key={FourPaginationTotalPages}
                pageNumber={FourPaginationTotalPages}
                isActive={currentPagePagination4 === FourPaginationTotalPages}
                onClick={handlePageClick4}
            />
        );

        return pageNumbers;
    };

    return (
        <>
            <aside className='flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10'>
                <div>
                    <ContentHeader
                        text={'animated pagination'}
                        id={'animated_pagination'}
                    />

                    <ComponentDescription text='An animated pagination component that seamlessly guides users
            through content with fluid transitions and intuitive design.'/>

                    <ToggleTab code={animatedPaginationCode} setCode={setAnimatedPaginationCode}
                               preview={animatedPaginationPreview} setPreview={setAnimatedPaginationPreview}/>

                    <ComponentWrapper>
                        {animatedPaginationPreview && (
                            <div className='640px:p-8 mb-4 flex items-center gap-5 justify-center'>
                                <div
                                    className='flex items-center flex-wrap justify-center mt-8 space-x-1 640px:space-x-2'>
                                    <button
                                        onClick={handlePrevious}
                                        disabled={currentPage === 1}
                                        className='mx-1 px-3.5 py-3.5 rounded-full bg-white text-blue-600 hover:bg-blue-100 transition-all duration-300 dark:bg-slate-700 dark:disabled:bg-slate-800 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
                                    >
                                        <FaChevronLeft/>
                                    </button>
                                    {renderPageNumbers2()}
                                    <button
                                        onClick={handleNext}
                                        disabled={currentPage === totalPages}
                                        className='mx-1 px-3.5 py-3.5 rounded-full bg-white text-blue-600 hover:bg-blue-100 transition-all duration-300 dark:bg-slate-700 dark:disabled:bg-slate-800 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
                                    >
                                        <FaChevronRight/>
                                    </button>
                                </div>
                            </div>
                        )}

                        {animatedPaginationCode && (
                            <Showcode
                                code='
import React, {useState} from "react";

// react icons
import {FaChevronLeft, FaChevronRight} from "react-icons/fa";

const Pagination = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 5;

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];

        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handlePageClick(i)}
                    className={`mx-1 px-4 py-2 text-[0.9rem] sm:text-[1rem] rounded-full transform transition-all duration-300 ${
                        currentPage === i
                            ? "bg-[#3B9DF8] text-white scale-110 shadow-md"
                            : "bg-transparent text-blue-600 hover:bg-blue-100"
                    }`}
                >
                    {i}
                </button>
            );
        }

        return pageNumbers;
    };

    return (
        <div className="flex items-center flex-wrap justify-center mt-8 space-x-1 sm:space-x-2">
            <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="mx-1 px-3.5 py-3.5 rounded-full bg-white text-blue-600 hover:bg-blue-100 transition-all duration-300 dark:bg-slate-700 dark:disabled:bg-slate-800 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
                <FaChevronLeft/>
            </button>
            {renderPageNumbers()}
            <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="mx-1 px-3.5 py-3.5 rounded-full bg-white text-blue-600 hover:bg-blue-100 transition-all duration-300 dark:bg-slate-700 dark:disabled:bg-slate-800 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
                <FaChevronRight/>
            </button>
        </div>
    );
};

export default Pagination;
                    '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader
                            text={'pagination with button'}
                            id={'pagination_with_button'}
                        />
                    </div>

                    <ComponentDescription text='Pagination featuring user-friendly buttons for effortless navigation
            through content, enhancing accessibility and interaction.'/>

                    <ToggleTab code={paginationWithButtonCode} setPreview={setPaginationWithButtonPreview}
                               preview={paginationWithButtonPreview} setCode={setPaginationWithButtonCode}/>

                    <ComponentWrapper>
                        {paginationWithButtonPreview && (
                            <div className='640px:p-8 mb-4 flex items-center gap-5 justify-center'>
                                <div className='flex items-center flex-wrap justify-center mt-4'>
                                    <button
                                        onClick={handlePrevious}
                                        disabled={currentPage === 1}
                                        className='mx-1 px-3 py-1  text-[0.9rem] dark:disabled:bg-slate-800 dark:disabled:text-slate-500 disabled:cursor-not-allowed dark:bg-slate-700 dark:text-[#abc2d3] 640px:text-[1rem] rounded bg-gray-200 text-text disabled:opacity-50'
                                    >
                                        Previous
                                    </button>
                                    {renderPageNumbers()}
                                    <button
                                        onClick={handleNext}
                                        disabled={currentPage === totalPages}
                                        className='mx-1 px-3 py-1 text-[0.9rem] 640px:text-[1rem] dark:disabled:bg-slate-800 dark:disabled:text-slate-500 disabled:cursor-not-allowed dark:bg-slate-700 dark:text-[#abc2d3] rounded bg-gray-200 text-text disabled:opacity-50'
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}

                        {paginationWithButtonCode && (
                            <Showcode
                                code='
import React, {useState} from "react";

const Pagination = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 5;

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];

        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handlePageClick(i)}
                    className={`mx-1 px-3 py-1 text-[0.9rem] sm:text-[1rem] rounded ${
                        currentPage === i
                            ? "bg-[#3B9DF8] text-white"
                            : "bg-gray-200 dark:bg-slate-700 dark:text-[#abc2d3] text-gray-700"
                    }`}
                >
                    {i}
                </button>
            );
        }

        return pageNumbers;
    };

    return (
        <div className="flex items-center flex-wrap justify-center mt-4">
            <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="mx-1 px-3 py-1  text-[0.9rem] dark:disabled:bg-slate-800 dark:disabled:text-slate-500 disabled:cursor-not-allowed dark:bg-slate-700 dark:text-[#abc2d3] sm:text-[1rem] rounded bg-gray-200 text-text disabled:opacity-50"
            >
                Previous
            </button>
            {renderPageNumbers()}
            <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className="mx-1 px-3 py-1 text-[0.9rem] sm:text-[1rem] dark:disabled:bg-slate-800 dark:disabled:text-slate-500 disabled:cursor-not-allowed dark:bg-slate-700 dark:text-[#abc2d3] rounded bg-gray-200 text-text disabled:opacity-50"
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
                    '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader
                            text={'pagination with rounded button'}
                            id={'pagination_with_rounded_button'}
                        />
                    </div>

                    <ComponentDescription text='Pagination with rounded buttons offering smooth navigation through
            content, enhancing both aesthetics and usability.'/>

                    <ToggleTab code={roundedButtonPaginationCode} setCode={setRoundedButtonPaginationCode}
                               preview={roundedButtonPaginationPreview} setPreview={setRoundedButtonPaginationPreview}/>

                    <ComponentWrapper>
                        {roundedButtonPaginationPreview && (
                            <div className='640px:p-8 mb-4 flex items-center gap-5 justify-center'>
                                <div className='flex items-center flex-wrap justify-center mt-8 space-x-4'>
                                    <button
                                        onClick={handlePrevious}
                                        disabled={currentPage === 1}
                                        className='px-4 py-1 rounded-full bg-gray-200 text-gray-700 hover:bg-primary hover:text-secondary disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-gray-200 dark:bg-slate-700 dark:text-[#abc2d3] dark:disabled:bg-slate-800 dark:disabled:text-slate-500 dark:disabled:hover:bg-slate-800 dark:disabled:hover:text-slate-500 disabled:hover:text-gray-700 transition-all duration-300'
                                    >
                                        Previous
                                    </button>
                                    <div className='flex items-center space-x-2'>
                                        {renderPageNumbers3()}
                                    </div>
                                    <button
                                        onClick={handleNext}
                                        disabled={currentPage === totalPages}
                                        className={`px-4 py-1 rounded-full bg-gray-200 text-gray-700 hover:bg-primary hover:text-secondary dark:bg-slate-700 dark:text-[#abc2d3] dark:disabled:bg-slate-800 dark:disabled:text-slate-500 dark:disabled:hover:bg-slate-800 dark:disabled:hover:text-slate-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-700 transition-all duration-300 ${
                                            currentPage === totalPages
                                                ? 'opacity-50 cursor-not-allowed'
                                                : ''
                                        }`}
                                    >
                                        Next
                                    </button>
                                </div>
                            </div>
                        )}

                        {roundedButtonPaginationCode && (
                            <Showcode
                                code='
import React, {useState} from "react";

const Pagination = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 5;

    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePageClick = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];

        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    onClick={() => handlePageClick(i)}
                    className={`mx-1 px-3 py-1 text-[0.9rem] sm:text-[1rem] rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all dark:bg-slate-700 dark:text-[#abc2d3] duration-300 transform hover:scale-105 ${
                        currentPage === i ? "!bg-[#3B9DF8] !text-white shadow-lg" : ""
                    }`}
                >
                    {i}
                </button>
            );
        }

        return pageNumbers;
    };

    return (
        <div className="flex items-center flex-wrap justify-center mt-8 space-x-4">
            <button
                onClick={handlePrevious}
                disabled={currentPage === 1}
                className="px-4 py-1 rounded-full bg-gray-200 text-gray-700 hover:bg-[#3B9DF8] hover:text-[#fff] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-gray-200 dark:bg-slate-700 dark:text-[#abc2d3] dark:disabled:bg-slate-800 dark:disabled:text-slate-500 dark:disabled:hover:bg-slate-800 dark:disabled:hover:text-slate-500 disabled:hover:text-gray-700 transition-all duration-300"
            >
                Previous
            </button>
            <div className="flex items-center space-x-2">
                {renderPageNumbers()}
            </div>
            <button
                onClick={handleNext}
                disabled={currentPage === totalPages}
                className={`px-4 py-1 rounded-full bg-gray-200 text-gray-700 hover:bg-[#3B9DF8] hover:text-[#fff] dark:bg-slate-700 dark:text-[#abc2d3] dark:disabled:bg-slate-800 dark:disabled:text-slate-500 dark:disabled:hover:bg-slate-800 dark:disabled:hover:text-slate-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-700 transition-all duration-300 ${
                    currentPage === totalPages
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                }`}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
                    '
                            />
                        )}
                    </ComponentWrapper>

                    <div className="mt-8">
                        <ContentHeader
                            text={"smarter pagination component"}
                            id={"smarter_pagination_component"}
                        />
                    </div>

                    <ComponentDescription text='A smarter pagination component that dynamically adjusts the range of
            visible page numbers based on the current page, ensuring a seamless
            and intuitive user experience.'/>

                    <ToggleTab code={smartPaginationCode} setPreview={setSmartPaginationPreview}
                               preview={smartPaginationPreview} setCode={setSmartPaginationCode}/>

                    <ComponentWrapper>
                        {smartPaginationPreview && (
                            <div
                                className="flex items-center justify-center flex-col 640px:flex-row 1024px:flex-col 1360px:flex-row mt-8 640px:space-x-4 space-y-4 640px:space-y-0 1024px:space-y-4 1360px:space-y-0 py-7 pb-14">

                                <button
                                    onClick={handlePreviousPagination4}
                                    disabled={currentPagePagination4 === 1}
                                    className={`px-4 py-2 bg-gray-200 dark:bg-slate-700 dark:text-[#abc2d3] text-gray-800 rounded-lg font-medium transition-colors duration-300 ${
                                        currentPagePagination4 === 1
                                            ? "bg-gray-200 !text-gray-400 cursor-not-allowed"
                                            : ""
                                    }`}
                                >
                                    Previous
                                </button>
                                <div className="flex gap-[5px] 640px:gap-[8px]">
                                    {renderPageNumbersForPagination4()}
                                </div>
                                <button
                                    onClick={handleNextPagination4}
                                    disabled={currentPagePagination4 === FourPaginationTotalPages}
                                    className={`px-4 py-2 bg-gray-200 dark:bg-slate-700 dark:text-[#abc2d3] text-gray-800 rounded-lg font-medium transition-colors duration-300 ${
                                        currentPagePagination4 === FourPaginationTotalPages
                                            ? "bg-gray-200 !text-gray-400 cursor-not-allowed"
                                            : ""
                                    }`}
                                >
                                    Next
                                </button>

                            </div>
                        )}

                        {smartPaginationCode && (
                            <Showcode
                                code='
import React, {useState} from "react";

const Pagination = () => {
    const [currentPagePagination, setCurrentPagePagination] = useState(1);

    const paginationTotalPages = 50;

    const handlePreviousPagination = () => {
        if (currentPagePagination > 1) {
            setCurrentPagePagination((prev) => prev - 1);
        }
    };

    const handleNextPagination = () => {
        if (currentPagePagination < paginationTotalPages) {
            setCurrentPagePagination((prev) => prev + 1);
        }
    };

    const handlePageClick = (pageNumber) => {
        setCurrentPagePagination(pageNumber);
    };

    const renderPageNumbersForPagination = () => {
        const pageNumbers = [];
        const startPage = Math.max(2, currentPagePagination - 1);
        const endPage = Math.min(
            paginationTotalPages - 1,
            currentPagePagination + 1
        );

        pageNumbers.push(
            <PageButton
                key={1}
                pageNumber={1}
                isActive={currentPagePagination === 1}
                onClick={handlePageClick}
            />
        );

        if (startPage > 2) {
            pageNumbers.push(
                <span key="start-dots" className="mx-1 px-2 dark:text-[#abc2d3] text-gray-500">
          ...
        </span>
            );
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <PageButton
                    key={i}
                    pageNumber={i}
                    isActive={currentPagePagination === i}
                    onClick={handlePageClick}
                />
            );
        }

        if (endPage < paginationTotalPages - 1) {
            pageNumbers.push(
                <span key="end-dots" className="mx-1 px-2 dark:text-[#abc2d3] text-gray-500">
          ...
        </span>
            );
        }

        pageNumbers.push(
            <PageButton
                key={paginationTotalPages}
                pageNumber={paginationTotalPages}
                isActive={currentPagePagination === paginationTotalPages}
                onClick={handlePageClick}
            />
        );

        return pageNumbers;
    };

    return (
        <div
            className="flex items-center justify-center flex-col sm:flex-row md:flex-col 1360px:flex-row mt-8 sm:space-x-4 space-y-4 sm:space-y-0 md:space-y-4 1360px:space-y-0 py-7 pb-14">

            <button
                onClick={handlePreviousPagination}
                disabled={currentPagePagination === 1}
                className={`px-4 py-2 bg-gray-200 dark:bg-slate-700 dark:text-[#abc2d3] text-gray-800 rounded-lg font-medium transition-colors duration-300 ${
                    currentPagePagination === 1
                        ? "bg-gray-200 !text-gray-400 cursor-not-allowed"
                        : ""
                }`}
            >
                Previous
            </button>
            <div className="flex gap-[5px] sm:gap-[8px]">
                {renderPageNumbersForPagination()}
            </div>
            <button
                onClick={handleNextPagination}
                disabled={currentPagePagination === paginationTotalPages}
                className={`px-4 py-2 bg-gray-200 dark:bg-slate-700 dark:text-[#abc2d3] text-gray-800 rounded-lg font-medium transition-colors duration-300 ${
                    currentPagePagination === paginationTotalPages
                        ? "bg-gray-200 !text-gray-400 cursor-not-allowed"
                        : ""
                }`}
            >
                Next
            </button>

        </div>
    );
};

export default Pagination;

export const PageButton = ({ pageNumber, isActive, onClick }) => (
    <button
        onClick={() => onClick(pageNumber)}
        className={`px-4 py-2 rounded-lg font-medium transition-colors duration-300 ${
            isActive
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-gray-100 text-gray-600 dark:bg-slate-700 dark:text-[#abc2d3] hover:bg-blue-500 hover:text-white"
        }`}
    >
        {pageNumber}
    </button>
);
                    '
                            />
                        )}
                    </ComponentWrapper>

                    <OverviewFooter backUrl='/components/carousel' backName='Carousel' forwardName='progress bar'
                                    forwardUrl='/components/progress-bar'/>
                </div>

                <ContentNavbar contents={paginationContents} activeSection={activeSection}/>

            </aside>
            <Helmet>
                <title>Navigation - Pagination</title>
            </Helmet>
        </>
    );
};

export default Pagination;
