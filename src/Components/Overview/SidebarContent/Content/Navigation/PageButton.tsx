const PageButton = ({ pageNumber, isActive, onClick }) => (
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

export default PageButton;