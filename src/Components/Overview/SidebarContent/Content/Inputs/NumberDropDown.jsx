import { useState } from "react";

const countries = [
  {
    name: "United States",
    code: "+1",
    flag: <span className="me-2">🇺🇸</span>,
  },
  {
    name: "Bangladesh",
    code: "+880",
    flag: <span className="me-2">🇧🇩</span>,
  },
  {
    name: "United Kingdom",
    code: "+44",
    flag: <span className="me-2">🇬🇧</span>,
  },
  {
    name: "Canada",
    code: "+1",
    flag: <span className="me-2">🇨🇦</span>,
  },
  {
    name: "Australia",
    code: "+61",
    flag: <span className="me-2">🇦🇺</span>,
  },
  {
    name: "Germany",
    code: "+49",
    flag: <span className="me-2">🇩🇪</span>,
  },
  {
    name: "France",
    code: "+33",
    flag: <span className="me-2">🇫🇷</span>,
  },
  {
    name: "Brazil",
    code: "+55",
    flag: <span className="me-2">🇧🇷</span>,
  },
  {
    name: "Mexico",
    code: "+52",
    flag: <span className="me-2">🇲🇽</span>,
  },
  {
    name: "Japan",
    code: "+81",
    flag: <span className="me-2">🇯🇵</span>,
  },
  {
    name: "South Korea",
    code: "+82",
    flag: <span className="me-2">🇰🇷</span>,
  },
  {
    name: "China",
    code: "+86",
    flag: <span className="me-2">🇨🇳</span>,
  },
  {
    name: "Russia",
    code: "+7",
    flag: <span className="me-2">🇷🇺</span>,
  },
  {
    name: "Italy",
    code: "+39",
    flag: <span className="me-2">🇮🇹</span>,
  },
  {
    name: "Spain",
    code: "+34",
    flag: <span className="me-2">🇪🇸</span>,
  },
  {
    name: "South Africa",
    code: "+27",
    flag: <span className="me-2">🇿🇦</span>,
  },
  {
    name: "Argentina",
    code: "+54",
    flag: <span className="me-2">🇦🇷</span>,
  },
  {
    name: "Egypt",
    code: "+20",
    flag: <span className="me-2">🇪🇬</span>,
  },
];


export default function NumberDropdown({ selectedCountry, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (country) => {
    onSelect(country);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="flex items-center py-2.5 px-4 text-sm font-medium text-gray-900 dark:text-[#8b99a9] border-y border-l border-gray-300 dark:border-[#58667c] rounded-s-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedCountry.flag}
        {selectedCountry.code}
        <svg className="w-2.5 h-2.5 ms-2.5" fill="none" viewBox="0 0 10 6">
          <path
            d="M1 1l4 4 4-4"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-60 ">
          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200 max-h-[200px] overflow-x-auto">
            {countries.map((country) => (
              <li key={country.code}>
                <button
                  type="button"
                  className="inline-flex w-full px-4 py-2 text-sm text-gray-700"
                  onClick={() => handleSelect(country)}
                >
                  <span className="inline-flex items-center">
                    {country.flag}
                    {country.name} ({country.code})
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}