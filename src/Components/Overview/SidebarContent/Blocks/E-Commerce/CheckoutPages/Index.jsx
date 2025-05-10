import React, {useState} from "react";

// components
import ContentHeader from "@shared/ContentHeader";
import {Helmet} from "react-helmet";
import BlocksShowCode from "@shared/Block/BlocksShowCode.jsx";

// icons
import BlocksFooter from "@shared/Block/BlocksFooter.jsx";

// toggle card view
import CheckoutPageExample1 from "./CheckoutPageExample1.jsx";
import CheckoutPageExample2 from "./CheckoutPageExample2.jsx";
import BlockDescription from "@shared/Block/BlockDescription.jsx";
import BlockToggleTab from "@shared/Block/BlockToggleTab.jsx";
import BlockWrapper from "@shared/Block/BlockWrapper.jsx";

const Index = () => {

    const [checkoutPage1Preview, setCheckoutPage1Preview] = useState(true);
    const [checkoutPage1Code, setCheckoutPage1Code] = useState(false);

    const [checkoutPage2Preview, setCheckoutPage2Preview] = useState(true);
    const [checkoutPage2Code, setCheckoutPage2Code] = useState(false);

    const checkoutPage1Codes = [
        {
            id: "mainComponent",
            displayText: "CheckoutPage.jsx",
            language: "jsx",
            code: 'import React, {useState} from "react";\n' +
                '\n' +
                '// data\n' +
                'import {countries, regions, cities} from "./Data.js";\n' +
                '\n' +
                '// global styles\n' +
                'import {globalStyles} from "./GlobalStyles.css";\n' +
                '\n' +
                '// select component \n' +
                'import Select from "./Select.jsx";\n' +
                '\n' +
                'const CheckoutPage = () => {\n' +
                '    const [selectedPayment, setSelectedPayment] = useState("credit-card")\n' +
                '    const [isChecked, setIsChecked] = useState(false)\n' +
                '\n' +
                '    const handleCheckboxChange = (event) => {\n' +
                '        if(event.target.checked){\n' +
                '            setIsChecked(true)\n' +
                '        }else {\n' +
                '            setIsChecked(false)\n' +
                '        }\n' +
                '    }\n' +
                '\n' +
                '    return (\n' +
                '        <div className="grid gap-8 grid-cols-1 md:grid-cols-3 w-full">\n' +
                '\n' +
                '            {/* Billing and Payment Form */}\n' +
                '            <div className="md:col-span-2 space-y-8 w-full">\n' +
                '\n' +
                '                {/* Billing Information */}\n' +
                '                <div className="w-full">\n' +
                '                    <h2 className="text-[1.5rem] dark:text-[#abc2d3] font-medium text-gray-700 mb-6">Billing Information</h2>\n' +
                '\n' +
                '                    <div className="grid grid-cols-1 gap-[16px]">\n' +
                '                        <div className="flex flex-col md:flex-row items-center gap-4">\n' +
                '                            <div className="w-full md:w-[50%]">\n' +
                '                                <label htmlFor="firstName" className={`${globalStyles.labelStyles}`}>\n' +
                '                                    First name\n' +
                '                                </label>\n' +
                '                                <input\n' +
                '                                    placeholder="First name"\n' +
                '                                    type="text"\n' +
                '                                    id="firstName"\n' +
                '                                    className={`${globalStyles.inputStyles}`}\n' +
                '                                />\n' +
                '                            </div>\n' +
                '                            <div className="w-full md:w-[50%]">\n' +
                '                                <label htmlFor="lastName" className={`${globalStyles.labelStyles}`}>\n' +
                '                                    Last name\n' +
                '                                </label>\n' +
                '                                <input\n' +
                '                                    placeholder="Last name"\n' +
                '                                    type="text"\n' +
                '                                    id="lastName"\n' +
                '                                    className={`${globalStyles.inputStyles}`}\n' +
                '                                />\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                        <div className="sm:col-span-2">\n' +
                '                            <label htmlFor="company" className={`${globalStyles.labelStyles}`}>\n' +
                '                                Company Name (Optional)\n' +
                '                            </label>\n' +
                '                            <input\n' +
                '                                placeholder="Company name"\n' +
                '                                type="text"\n' +
                '                                id="company"\n' +
                '                                className={`${globalStyles.inputStyles}`}\n' +
                '                            />\n' +
                '                        </div>\n' +
                '                        <div className="sm:col-span-2">\n' +
                '                            <label htmlFor="address" className={`${globalStyles.labelStyles}`}>\n' +
                '                                Address\n' +
                '                            </label>\n' +
                '                            <input\n' +
                '                                placeholder="Address"\n' +
                '                                type="text"\n' +
                '                                id="address"\n' +
                '                                className={`${globalStyles.inputStyles}`}\n' +
                '                            />\n' +
                '                        </div>\n' +
                '\n' +
                '                        <div className="flex flex-col md:flex-row items-center gap-4 w-full">\n' +
                '                            <div className="w-full md:w-[50%]">\n' +
                '                                <label htmlFor="country" className={`${globalStyles.labelStyles}`}>\n' +
                '                                    Country\n' +
                '                                </label>\n' +
                '                                <Select items={countries}/>\n' +
                '                            </div>\n' +
                '                            <div className="w-full md:w-[50%]">\n' +
                '                                <label htmlFor="state" className={`${globalStyles.labelStyles}`}>\n' +
                '                                    Region/State\n' +
                '                                </label>\n' +
                '                                <Select items={regions}/>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                        <div className="flex flex-col md:flex-row items-center gap-4 w-full">\n' +
                '                            <div className="w-full md:w-[50%]">\n' +
                '                                <label htmlFor="city" className={`${globalStyles.labelStyles}`}>\n' +
                '                                    City\n' +
                '                                </label>\n' +
                '                                <Select items={cities}/>\n' +
                '                            </div>\n' +
                '                            <div className="w-full md:w-[50%]">\n' +
                '                                <label htmlFor="zipCode" className={`${globalStyles.labelStyles}`}>\n' +
                '                                    Zip Code\n' +
                '                                </label>\n' +
                '                                <input\n' +
                '                                    placeholder="Zip code"\n' +
                '                                    type="text"\n' +
                '                                    id="zipCode"\n' +
                '                                    className={`${globalStyles.inputStyles}`}\n' +
                '                                />\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '\n' +
                '                        <div className="flex flex-col md:flex-row items-center gap-4 w-full">\n' +
                '                            <div className="w-full md:w-[50%]">\n' +
                '                                <label htmlFor="email" className={`${globalStyles.labelStyles}`}>\n' +
                '                                    Email\n' +
                '                                </label>\n' +
                '                                <input\n' +
                '                                    placeholder="Email address"\n' +
                '                                    type="email"\n' +
                '                                    id="email"\n' +
                '                                    className={`${globalStyles.inputStyles}`}\n' +
                '                                />\n' +
                '                            </div>\n' +
                '                            <div className="w-full md:w-[50%]">\n' +
                '                                <label htmlFor="phone" className={`${globalStyles.labelStyles}`}>\n' +
                '                                    Phone Number\n' +
                '                                </label>\n' +
                '                                <input\n' +
                '                                    placeholder="Phone number"\n' +
                '                                    type="tel"\n' +
                '                                    id="phone"\n' +
                '                                    className={`${globalStyles.inputStyles}`}\n' +
                '                                />\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '                    <div className="mt-4">\n' +
                '                        <label className="flex items-center gap-[10px] cursor-pointer">\n' +
                '                            <input type="checkbox" className="hidden" onChange={handleCheckboxChange}/>\n' +
                '                            {\n' +
                '                                isChecked ? (\n' +
                '                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"\n' +
                '                                         xmlns="http://www.w3.org/2000/svg">\n' +
                '                                        <g id="Group 335">\n' +
                '                                            <rect id="Rectangle 331" x="-0.00012207" y="6.10352e-05"\n' +
                '                                                  width="20"\n' +
                '                                                  height="20" rx="4" className="fill-[#0FABCA]"\n' +
                '                                                  stroke="#0FABCA"></rect>\n' +
                '                                            <path id="Vector"\n' +
                '                                                  d="M8.19594 15.4948C8.0646 15.4949 7.93453 15.4681 7.81319 15.4157C7.69186 15.3633 7.58167 15.2865 7.48894 15.1896L4.28874 11.8566C4.10298 11.6609 3.99914 11.3965 3.99988 11.1213C4.00063 10.8461 4.10591 10.5824 4.29272 10.3878C4.47953 10.1932 4.73269 10.0835 4.99689 10.0827C5.26109 10.0819 5.51485 10.1901 5.70274 10.3836L8.19591 12.9801L14.2887 6.6335C14.4767 6.4402 14.7304 6.3322 14.9945 6.33307C15.2586 6.33395 15.5116 6.44362 15.6983 6.63815C15.8851 6.83268 15.9903 7.09627 15.9912 7.37137C15.992 7.64647 15.8883 7.91073 15.7027 8.10648L8.90294 15.1896C8.8102 15.2865 8.7 15.3633 8.57867 15.4157C8.45734 15.4681 8.32727 15.4949 8.19594 15.4948Z"\n' +
                '                                                  fill="white"></path>\n' +
                '                                        </g>\n' +
                '                                    </svg>\n' +
                '                                ) : (\n' +
                '                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"\n' +
                '                                         xmlns="http://www.w3.org/2000/svg">\n' +
                '                                        <g id="Group 335">\n' +
                '                                            <rect id="Rectangle 331" x="-0.00012207" y="6.10352e-05"\n' +
                '                                                  width="20"\n' +
                '                                                  height="20" rx="4" className="fill-transparent dark:stroke-slate-400"\n' +
                '                                                  stroke="#ccc"></rect>\n' +
                '                                        </g>\n' +
                '                                    </svg>\n' +
                '                                )\n' +
                '                            }\n' +
                '\n' +
                '                            <span className="text-[0.9rem] dark:text-slate-400 text-gray-700">Ship to a different address</span>\n' +
                '                        </label>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '\n' +
                '                {/* Payment Options */}\n' +
                '                <div className="border border-gray-200 dark:border-slate-700 rounded-md">\n' +
                '                    <h2 className="text-[1.2rem] font-medium text-gray-700 dark:border-slate-700 border-b border-gray-200 px-5 py-3 dark:text-[#abc2d3]">Payment Option</h2>\n' +
                '                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full p-5">\n' +
                '                        <button\n' +
                '                            onClick={() => setSelectedPayment("cash")}\n' +
                '                            className={`flex flex-col items-center justify-center p-4 border rounded-lg ${\n' +
                '                                selectedPayment === "cash" ? "border-[#0FABCA]" : "border-gray-200 dark:border-slate-700"\n' +
                '                            }`}\n' +
                '                        >\n' +
                '                            <span className="text-2xl">💵</span>\n' +
                '                            <span\n' +
                '                                className="text-[0.9rem] dark:text-[#abc2d3] text-gray-700 font-[500] mt-2">Cash on Delivery</span>\n' +
                '                        </button>\n' +
                '                        <button\n' +
                '                            onClick={() => setSelectedPayment("credit-card")}\n' +
                '                            className={`flex flex-col items-center justify-center p-4 border rounded-lg ${\n' +
                '                                selectedPayment === "credit-card" ? "border-[#0FABCA]" : "border-gray-200 dark:border-slate-700"\n' +
                '                            }`}\n' +
                '                        >\n' +
                '                            <span className="text-2xl">💳</span>\n' +
                '                            <span\n' +
                '                                className="text-[0.9rem] dark:text-[#abc2d3] text-gray-700 font-[500] mt-2">Debit/Credit Card</span>\n' +
                '                        </button>\n' +
                '                    </div>\n' +
                '\n' +
                '                    {selectedPayment === "credit-card" && (\n' +
                '                        <div className=" px-5 pb-5 space-y-[16px]">\n' +
                '                            <div>\n' +
                '                                <label htmlFor="cardName" className={`${globalStyles.labelStyles}`}>\n' +
                '                                    Name on Card\n' +
                '                                </label>\n' +
                '                                <input\n' +
                '                                    placeholder="Name on card"\n' +
                '                                    type="text"\n' +
                '                                    id="cardName"\n' +
                '                                    className={`${globalStyles.inputStyles}`}\n' +
                '                                />\n' +
                '                            </div>\n' +
                '                            <div>\n' +
                '                                <label htmlFor="cardNumber" className={`${globalStyles.labelStyles}`}>\n' +
                '                                    Card Number\n' +
                '                                </label>\n' +
                '                                <input\n' +
                '                                    placeholder="Card number"\n' +
                '                                    type="text"\n' +
                '                                    id="cardNumber"\n' +
                '                                    className={`${globalStyles.inputStyles}`}\n' +
                '                                />\n' +
                '                            </div>\n' +
                '                            <div className="grid grid-cols-2 gap-4">\n' +
                '                                <div>\n' +
                '                                    <label htmlFor="expireDate" className={`${globalStyles.labelStyles}`}>\n' +
                '                                        Expire Date\n' +
                '                                    </label>\n' +
                '                                    <input\n' +
                '                                        type="text"\n' +
                '                                        id="expireDate"\n' +
                '                                        placeholder="MM/YY"\n' +
                '                                        className={`${globalStyles.inputStyles}`}\n' +
                '                                    />\n' +
                '                                </div>\n' +
                '                                <div>\n' +
                '                                    <label htmlFor="cvc" className={`${globalStyles.labelStyles}`}>\n' +
                '                                        CVC\n' +
                '                                    </label>\n' +
                '                                    <input\n' +
                '                                        placeholder="CVC"\n' +
                '                                        type="text"\n' +
                '                                        id="cvc"\n' +
                '                                        className={`${globalStyles.inputStyles}`}\n' +
                '                                    />\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                    )}\n' +
                '                </div>\n' +
                '\n' +
                '                {/* Additional Information */}\n' +
                '                <div>\n' +
                '                    <h2 className="text-[1.2rem] dark:text-[#abc2d3] font-medium text-gray-700 mb-4">Additional Information</h2>\n' +
                '                    <div>\n' +
                '                        <label htmlFor="notes" className={`${globalStyles.labelStyles}`}>\n' +
                '                            Order Notes (Optional)\n' +
                '                        </label>\n' +
                '                        <textarea\n' +
                '                            id="notes"\n' +
                '                            rows={4}\n' +
                '                            placeholder="Notes about your order e.g. special notes for delivery"\n' +
                '                            className={`${globalStyles.inputStyles} py-3`}\n' +
                '                        />\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '\n' +
                '            {/* Order Summary */}\n' +
                '            <div className="w-full">\n' +
                '                <div className="bg-white dark:bg-slate-900 dark:border-slate-700 rounded-md border border-gray-200 p-6">\n' +
                '                    <h2 className="text-[1.2rem] dark:text-[#abc2d3] font-medium text-gray-700 mb-6">Order Summary</h2>\n' +
                '                    <div className="space-y-4">\n' +
                '                        <div className="flex items-center space-x-4">\n' +
                '                            <div className="flex-shrink-0">\n' +
                '                                <img\n' +
                '                                    src="https://i.ibb.co.com/VNM4dX6/Image-24.png"\n' +
                '                                    alt="product/image"\n' +
                '                                    className="w-[50px] h-[50px] object-cover"\n' +
                '                                />\n' +
                '                            </div>\n' +
                '                            <div className="flex-1 min-w-0">\n' +
                '                                <p className="text-sm dark:text-[#abc2d3] font-medium text-gray-900 line-clamp-1">Canon EOS 1500D DSLR Camera Body+ 18</p>\n' +
                '                                <div className="flex items-center gap-[5px] mt-0.5">\n' +
                '                                    <p className="text-sm text-gray-500 dark:text-slate-400">2 x </p>\n' +
                '                                    <p className="text-sm text-[#0FABCA] font-[600]">$570</p>\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                        <div className="flex items-center space-x-4">\n' +
                '                            <div className="flex-shrink-0">\n' +
                '                                <img\n' +
                '                                    src="https://i.ibb.co.com/F0bn52F/Image-25.png"\n' +
                '                                    alt="product/image"\n' +
                '                                    className="w-[50px] h-[50px] object-cover"\n' +
                '                                />\n' +
                '                            </div>\n' +
                '                            <div className="flex-1 min-w-0">\n' +
                '                                <p className="text-sm dark:text-[#abc2d3] font-medium text-gray-900 line-clamp-1">Wired Over-Ear Gaming Headphones with U</p>\n' +
                '                                <div className="flex items-center gap-[5px] mt-0.5">\n' +
                '                                    <p className="text-sm text-gray-500 dark:text-slate-400">1 x </p>\n' +
                '                                    <p className="text-sm text-[#0FABCA] font-[600]">$100</p>\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '\n' +
                '                        <div className="pt-4 space-y-4">\n' +
                '                            <div className="flex justify-between text-sm">\n' +
                '                                <span className="text-gray-600 dark:text-[#abc2d3]">Sub-total</span>\n' +
                '                                <span className="font-medium text-gray-800 dark:text-[#abc2d3]">$670</span>\n' +
                '                            </div>\n' +
                '                            <div className="flex justify-between text-sm">\n' +
                '                                <span className="text-gray-600 dark:text-[#abc2d3]">Shipping</span>\n' +
                '                                <span className="font-medium text-green-500">Free</span>\n' +
                '                            </div>\n' +
                '                            <div className="flex justify-between text-sm">\n' +
                '                                <span className="text-gray-600 dark:text-[#abc2d3]">Discount</span>\n' +
                '                                <span className="font-medium text-gray-800 dark:text-[#abc2d3]">$20</span>\n' +
                '                            </div>\n' +
                '                            <div className="flex justify-between text-sm">\n' +
                '                                <span className="text-gray-600 dark:text-[#abc2d3]">Tax</span>\n' +
                '                                <span className="font-medium text-gray-800 dark:text-[#abc2d3]">$650</span>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '\n' +
                '                        <div className="border-t dark:border-slate-700 border-gray-200 pt-4">\n' +
                '                            <div className="flex justify-between">\n' +
                '                                <span className="text-base font-medium dark:text-[#abc2d3] text-gray-800">Total</span>\n' +
                '                                <span className="text-base font-medium dark:text-[#abc2d3] text-gray-800">$357.99 USD</span>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '\n' +
                '                        <button\n' +
                '                            className="w-full bg-[#0FABCA] text-white py-3 px-4 rounded-lg hover:bg-[#0FABCA]/90 transition-colors">\n' +
                '                            PLACE ORDER\n' +
                '                        </button>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    );\n' +
                '};\n' +
                '\n' +
                'export default CheckoutPage;'
        },
        {
            id: "data",
            displayText: "Data.js",
            language: "js",
            code: 'export const countries = ["United States", "Canada", "India", "Australia", "United Kingdom"];\n' +
                '    export const regions = ["California", "Ontario", "Maharashtra", "New South Wales", "England"];\n' +
                '    export const cities = ["Los Angeles", "Toronto", "Mumbai", "Sydney", "London"];'
        },
        {
            id: "global css",
            displayText: "GlobalStyles.css",
            language: "css",
            code: 'export const globalStyles = {\n' +
                '        inputStyles: "border border-gray-200 dark:text-[#abc2d3] dark:bg-slate-900 dark:border-slate-700 dark:placeholder:text-slate-500 w-full py-2 px-4 rounded-md mt-1 outline-none focus:border-[#0FABCA]",\n' +
                '        labelStyles: "text-[14px] font-[400] dark:text-[#abc2d3] text-gray-700"\n' +
                '    }'
        },
        {
            id: "selectComponent",
            displayText: "Select.jsx",
            language: "jsx",
            code: 'import React, {useState} from "react";\n' +
                '\n' +
                '// react icons\n' +
                'import {IoChevronDown} from "react-icons/io5";\n' +
                '\n' +
                'const Select = ({items}) => {\n' +
                '\n' +
                '    // close the dropdown is clicked outside\n' +
                '    document.addEventListener("click", function (event) {\n' +
                '        let target = event.target;\n' +
                '\n' +
                '        if (!target.closest(".dropdown")) {\n' +
                '            setIsActive(false);\n' +
                '        }\n' +
                '    });\n' +
                '\n' +
                '    // actions\n' +
                '    const [isActive, setIsActive] = useState(false);\n' +
                '    const [content, setContent] = useState("Select Option");\n' +
                '\n' +
                '    return (\n' +
                '        <button\n' +
                '            className="bg-[#fff] border dark:border-slate-700 dark:bg-slate-900 border-gray-200 rounded-md mt-1 justify-between px-3 py-2 flex items-center gap-8  relative cursor-pointer dropdown w-full"\n' +
                '            onClick={() => setIsActive(!isActive)}\n' +
                '        >\n' +
                '            <p className={`${content === "Select Option" ? "text-gray-400 dark:text-slate-500": "dark:text-[#abc2d3]"}`}>{content}</p>\n' +
                '            <IoChevronDown\n' +
                '                className={`${\n' +
                '                    isActive ? " rotate-[180deg]" : " rotate-0"\n' +
                '                } transition-all duration-300 dark:text-slate-500 text-gray-600 text-[1.2rem]`}\n' +
                '            />\n' +
                '            <div\n' +
                '                className={`${\n' +
                '                    isActive ? " opacity-100 scale-[1]" : " opacity-0 scale-[0.8] z-[-1]"\n' +
                '                } w-full absolute top-12 dark:bg-slate-800 left-0 right-0 z-40 bg-[#fff] rounded-xl flex flex-col  overflow-hidden transition-all duration-200 ease-in-out py-1`}\n' +
                '                style={{\n' +
                '                    boxShadow: "0 15px 40px -15px rgba(0, 0, 0, 0.2)",\n' +
                '                }}\n' +
                '            >\n' +
                '                {items?.map((option, index) => (\n' +
                '                    <p\n' +
                '                        className="py-2 px-4 text-left text-gray-800 dark:text-[#abc2d3] dark:hover:bg-slate-900/50 hover:bg-gray-50 transition-all duration-200"\n' +
                '                        key={index}\n' +
                '                        onClick={(e) => setContent(e.target.textContent)}\n' +
                '                    >\n' +
                '                        {option}\n' +
                '                    </p>\n' +
                '                ))}\n' +
                '            </div>\n' +
                '        </button>\n' +
                '    );\n' +
                '};\n' +
                '\n'
        },
    ]

    const checkoutPage2Codes = [
        {
            id: "mainComponent",
            displayText: "CheckoutPage.jsx",
            language: "jsx",
            code: 'import React from "react";\n' +
                '\n' +
                '// react icons\n' +
                'import {AiOutlinePlus} from "react-icons/ai";\n' +
                '\n' +
                '// global styles\n' +
                'import {globalStyles} from "./GlobalStyles.css";\n' +
                '\n' +
                'const CheckoutPage = () => {\n' +
                '\n' +
                '    return (\n' +
                '        <div className="w-full flex flex-col gap-8 md:gap-0 md:flex-row">\n' +
                '\n' +
                '            {/* Left Column - Order Summary */}\n' +
                '            <div className="bg-gray-50 dark:bg-slate-900 rounded-md p-4 md:p-8 flex-1">\n' +
                '\n' +
                '                {/* order summery */}\n' +
                '                <div>\n' +
                '                    <h2 className="text-[1.2rem] dark:text-[#abc2d3] text-gray-700 font-semibold mb-6">Your order</h2>\n' +
                '                    <div className="border dark:border-slate-700 border-gray-200 rounded-md">\n' +
                '                        <div className="flex flex-col md:flex-row md:items-center gap-4 p-4">\n' +
                '                            <div className="border relative border-gray-200 dark:border-slate-700 dark:bg-slate-800 w-max rounded-md bg-white">\n' +
                '                                <img src="https://i.ibb.co.com/x6fq6nC/Rectangle-516.png" alt="Nike Air Zoom Pegasus 39"\n' +
                '                                     className="w-20 h-20 object-cover rounded"/>\n' +
                '\n' +
                '                                <span\n' +
                '                                    className="px-[0.45rem] rounded-full dark:border-slate-500 dark:bg-slate-600 dark:text-[#abc2d3] absolute bg-white -top-2 -right-2 z-30 text-[0.9rem] text-gray-800 border border-gray-200 shadow-sm">1</span>\n' +
                '                            </div>\n' +
                '                            <div className="flex-1">\n' +
                '                                <h3 className="font-medium dark:text-[#abc2d3]">Nike Air Zoom Pegasus 39</h3>\n' +
                '                                <div className="flex items-center gap-[30px] mt-2">\n' +
                '                                    <p className="text-sm text-gray-500 dark:text-[#abc2d3]">Size: <b className="text-gray-800 dark:text-slate-400">XL</b></p>\n' +
                '                                    <p className="text-sm text-gray-500 dark:text-[#abc2d3]">Color: <b className="text-gray-800 dark:text-slate-400">Blue</b>\n' +
                '                                    </p>\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                            <span className="font-medium dark:text-[#abc2d3]">$28.00</span>\n' +
                '                        </div>\n' +
                '                        <div className="flex flex-col md:flex-row md:items-center dark:border-slate-700 gap-4 border-t p-4 border-gray-200">\n' +
                '                            <div className="border relative dark:border-slate-700 dark:bg-slate-800 border-gray-200 w-max rounded-md bg-white">\n' +
                '                                <img src="https://i.ibb.co.com/VJKrBt5/Rectangle-519.png"\n' +
                '                                     alt="Nike React Pegasus Trail 4"\n' +
                '                                     className="w-20 h-20 object-cover rounded"/>\n' +
                '\n' +
                '                                <span\n' +
                '                                    className="px-1.5 rounded-full dark:border-slate-500 dark:bg-slate-600 dark:text-[#abc2d3] absolute bg-white -top-2 -right-2 z-30 text-[0.9rem] text-gray-800 border border-gray-200 shadow-sm">3</span>\n' +
                '                            </div>\n' +
                '                            <div className="flex-1">\n' +
                '                                <h3 className="font-medium dark:text-[#abc2d3]">Nike Air Zoom Pegasus 39</h3>\n' +
                '                                <div className="flex items-center gap-[30px] mt-2">\n' +
                '                                    <p className="text-sm text-gray-500 dark:text-[#abc2d3]">Size: <b className="text-gray-800 dark:text-slate-400">XL</b></p>\n' +
                '                                    <p className="text-sm text-gray-500 dark:text-[#abc2d3]">Color: <b className="text-gray-800 dark:text-slate-400">Blue</b>\n' +
                '                                    </p>\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                            <span className="font-medium dark:text-[#abc2d3]">$28.00</span>\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '                    <div className="mt-6">\n' +
                '                        <h3 className="font-medium mb-2 text-[1rem] dark:text-[#abc2d3] text-gray-800">Discount Code</h3>\n' +
                '                        <div className="flex gap-2 relative">\n' +
                '                            <img alt="discount/png" src="https://i.ibb.co.com/r7rF8xK/ticket-discount.png"\n' +
                '                                 className="w-[25px] absolute transform top-[50%] translate-y-[-50%] left-2"/>\n' +
                '                            <input type="text" placeholder="BUYRI"\n' +
                '                                   className="border w-full dark:border-slate-700 dark:text-[#abc2d3] dark:placeholder:text-slate-500 border-gray-200 bg-transparent outline-none focus:border-[#0FABCA] rounded pl-10 pr-3 py-2"/>\n' +
                '                            <button\n' +
                '                                className="absolute top-[50%] transform translate-y-[-50%] right-5 text-[0.9rem] text-[#0FABCA]">Apply\n' +
                '                            </button>\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '                    <div className="mt-8 space-y-2 border-t dark:border-slate-700 border-gray-200 pt-6">\n' +
                '                        <div className="flex justify-between">\n' +
                '                            <span className="text-[1rem] dark:text-[#abc2d3] text-gray-500">Subtotal</span>\n' +
                '                            <span className="text-[1rem] dark:text-[#abc2d3] font-medium text-gray-800">$56.00</span>\n' +
                '                        </div>\n' +
                '                        <div className="flex justify-between">\n' +
                '                            <span className="text-[1rem] dark:text-[#abc2d3] text-gray-500">Shipping Cost</span>\n' +
                '                            <span className="text-[1rem] dark:text-[#abc2d3] font-medium text-gray-800">$8.00</span>\n' +
                '                        </div>\n' +
                '                        <div className="flex justify-between pb-3">\n' +
                '                            <span className="text-[1rem] dark:text-[#abc2d3] text-gray-500">Discount (10%)</span>\n' +
                '                            <span className="text-[1rem] dark:text-[#abc2d3] font-medium text-gray-800">-$13.00</span>\n' +
                '                        </div>\n' +
                '                        <div className="flex justify-between border-t dark:text-[#abc2d3] dark:border-slate-700 border-gray-200 pt-5 font-medium">\n' +
                '                            <span>Total</span>\n' +
                '                            <span className="text-[1rem] font-medium dark:text-[#abc2d3] text-gray-800">$51.00</span>\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '\n' +
                '            {/* Right Column - Checkout Form */}\n' +
                '            <div className="flex-1 md:px-8">\n' +
                '                <form className="space-y-6">\n' +
                '                    <div>\n' +
                '                        <label htmlFor="email"\n' +
                '                               className="text-[1rem] dark:text-[#abc2d3] font-medium text-gray-800 mb-1">Email</label>\n' +
                '                        <input type="email" id="email" placeholder="joylawson@gmail.com"\n' +
                '                               className={globalStyles.inputStyles}/>\n' +
                '                    </div>\n' +
                '                    <div>\n' +
                '                        <label htmlFor="phone" className="text-[1rem] dark:text-[#abc2d3] font-medium text-gray-800 mb-1">Phone\n' +
                '                            number</label>\n' +
                '                        <div className="flex gap-2">\n' +
                '                            <select\n' +
                '                                className="border rounded dark:border-slate-700 dark:bg-slate-900 dark:placeholder:text-slate-500 dark:text-[#abc2d3] px-3 py-2 border-gray-200 outline-none focus:border-[#0FABCA] mt-0.5 w-[100px]">\n' +
                '                                <option value="us">🇺🇸 +1</option>\n' +
                '                                <option value="uk">🇬🇧 +44</option>\n' +
                '                                <option value="in">🇮🇳 +91</option>\n' +
                '                                <option value="bd">🇧🇩 +880</option>\n' +
                '                                <option value="au">🇦🇺 +61</option>\n' +
                '                                <option value="ca">🇨🇦 +1</option>\n' +
                '                                <option value="de">🇩🇪 +49</option>\n' +
                '                                <option value="fr">🇫🇷 +33</option>\n' +
                '                                <option value="jp">🇯🇵 +81</option>\n' +
                '                                <option value="za">🇿🇦 +27</option>\n' +
                '                            </select>\n' +
                '                            <input type="tel" id="phone" placeholder="(201) 830-8210"\n' +
                '                                   className={globalStyles.inputStyles}/>\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '                    <div>\n' +
                '                        <div className="flex items-center justify-between mb-2">\n' +
                '                            <label className="text-[1rem] font-medium dark:text-[#abc2d3] text-gray-800">Payment method</label>\n' +
                '                            <button type="button" className="text-blue-600 text-right flex text-[0.9rem] items-center gap-[5px]">\n' +
                '                                <AiOutlinePlus/>\n' +
                '                                Add new\n' +
                '                            </button>\n' +
                '                        </div>\n' +
                '                        <div className="flex flex-col md:flex-row w-full gap-4">\n' +
                '                            <label\n' +
                '                                className="flex-1 flex items-center dark:border-slate-700 justify-between gap-2 border-gray-200 border rounded-lg p-4">\n' +
                '                                <div>\n' +
                '                                    <div className="dark:text-[#abc2d3]">\n' +
                '                                        <input type="radio" name="payment" value="card" className="form-radio"\n' +
                '                                               defaultChecked/>\n' +
                '                                        <span> **** 8304</span>\n' +
                '                                    </div>\n' +
                '\n' +
                '                                    <div className="flex items-center gap-[5px] pl-5 mt-0.5">\n' +
                '                                        <p className="text-[0.9rem] dark:text-slate-400 text-gray-500">Visa •</p>\n' +
                '                                        <p className="text-[0.9rem] dark:text-slate-400 text-gray-500 hover:text-[#0FABCA] cursor-pointer"> Edit</p>\n' +
                '                                    </div>\n' +
                '                                </div>\n' +
                '                                <img src="https://i.ibb.co.com/NFwm4jb/Visa.png" alt="Visa"\n' +
                '                                     className="w-[50px]"/>\n' +
                '                            </label>\n' +
                '                            <label\n' +
                '                                className="flex-1 flex items-center dark:border-slate-700 justify-between border-gray-200 gap-2 border rounded-lg p-4">\n' +
                '                                <div>\n' +
                '                                    <div className="dark:text-[#abc2d3]">\n' +
                '                                        <input type="radio" name="payment" value="paypal" className="form-radio"/>\n' +
                '                                        <span> **** 8304</span>\n' +
                '                                    </div>\n' +
                '\n' +
                '                                    <div className="flex items-center gap-[5px] pl-5 mt-0.5">\n' +
                '                                        <p className="text-[0.9rem] dark:text-slate-400 text-gray-500">Paypal •</p>\n' +
                '                                        <p className="text-[0.9rem] dark:text-slate-400 text-gray-500 hover:text-[#0FABCA] cursor-pointer"> Edit</p>\n' +
                '                                    </div>\n' +
                '                                </div>\n' +
                '                                <img src="https://i.ibb.co.com/W3ykxd5/paypal.png" alt="PayPal"\n' +
                '                                     className="w-[50px]"/>\n' +
                '                            </label>\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '                    <div>\n' +
                '                        <label htmlFor="cardHolder" className="text-[1rem] font-medium dark:text-[#abc2d3] text-gray-800 mb-1">Card\n' +
                '                            holder name</label>\n' +
                '                        <input type="text" id="cardHolder" placeholder="Ex. Jane Cooper"\n' +
                '                               className={globalStyles.inputStyles}/>\n' +
                '                    </div>\n' +
                '                    <div>\n' +
                '                        <label htmlFor="billingAddress"\n' +
                '                               className="text-[1rem] font-medium text-gray-800 dark:text-[#abc2d3] mb-1">Billing address</label>\n' +
                '                        <select id="billingAddress"\n' +
                '                                className="w-full border rounded dark:border-slate-700 dark:bg-slate-900 dark:placeholder:text-slate-500 dark:text-[#abc2d3] px-3 py-2 border-gray-200 outline-none focus:border-[#0FABCA] mt-0.5">\n' +
                '                            <option>United States</option>\n' +
                '                            <option>United Kingdom</option>\n' +
                '                            <option>India</option>\n' +
                '                            <option>Bangladesh</option>\n' +
                '                            <option>Australia</option>\n' +
                '                            <option>Canada</option>\n' +
                '                            <option>Germany</option>\n' +
                '                            <option>France</option>\n' +
                '                            <option>Japan</option>\n' +
                '                            <option>South Africa</option>\n' +
                '                        </select>\n' +
                '                    </div>\n' +
                '                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">\n' +
                '                        <div>\n' +
                '                            <label htmlFor="zipCode" className="text-[1rem] dark:text-[#abc2d3] font-medium text-gray-800 mb-1">Zip\n' +
                '                                code</label>\n' +
                '                            <input type="text" id="zipCode" placeholder="Ex. 73923"\n' +
                '                                   className={globalStyles.inputStyles}/>\n' +
                '                        </div>\n' +
                '                        <div>\n' +
                '                            <label htmlFor="city"\n' +
                '                                   className="text-[1rem] font-medium dark:text-[#abc2d3] text-gray-800 mb-1">City</label>\n' +
                '                            <input type="text" id="city" placeholder="Ex. New York"\n' +
                '                                   className={globalStyles.inputStyles}/>\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '                    <div className="flex items-center gap-2">\n' +
                '                        <input type="checkbox" id="sameAsShipping" className="form-checkbox"/>\n' +
                '                        <label htmlFor="sameAsShipping" className="text-sm dark:text-[#abc2d3] text-gray-600">Billing address is\n' +
                '                            same as shipping</label>\n' +
                '                    </div>\n' +
                '                    <button type="submit"\n' +
                '                            className="w-full bg-[#0FABCA] text-white py-3 rounded-lg hover:bg-[#0FABCA]/90">\n' +
                '                        Pay $51.00\n' +
                '                    </button>\n' +
                '                </form>\n' +
                '            </div>\n' +
                '        </div>\n' +
                '    );\n' +
                '};\n' +
                '\n' +
                'export default CheckoutPage;\n'
        },
        {
            id: "globalStyles",
            displayText: "GlobalStyles.css",
            language: "css",
            code: 'export const globalStyles = {\n' +
                '        inputStyles: "w-full border dark:border-slate-700 dark:bg-slate-900 dark:text-[#abc2d3] dark:placeholder:text-slate-500 rounded px-3 py-2 border-gray-200 outline-none focus:border-[#0FABCA] mt-0.5"\n' +
                '    }'
        },
    ]

    return (
        <aside className="flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10">
            <div>
                <ContentHeader text={"checkout page 1"} id={"checkout_page_1"}/>

                <BlockDescription
                    text='The checkout page is where users review items, add shipping details, choose payment, and confirm their purchase securely.'/>

                <BlockToggleTab preview={checkoutPage1Preview} setPreview={setCheckoutPage1Preview}
                                code={checkoutPage1Code} setCode={setCheckoutPage1Code}/>

                <BlockWrapper>
                    {checkoutPage1Preview && (
                        <div className={`p-8 flex flex-wrap items-center gap-5 justify-center overflow-hidden`}>
                            <CheckoutPageExample1/>
                        </div>
                    )}

                    {checkoutPage1Code && <BlocksShowCode code={checkoutPage1Codes}/>
                    }
                </BlockWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"checkout page 2"} id={"checkout_page_2"}/>
                </div>

                <BlockDescription
                    text='The checkout page is where users review items, add shipping details, choose payment, and confirm their purchase securely.'/>

                <BlockToggleTab preview={checkoutPage2Preview} setPreview={setCheckoutPage2Preview}
                                code={checkoutPage2Code} setCode={setCheckoutPage2Code}/>

                <BlockWrapper>
                    {checkoutPage2Preview && (
                        <div className={`p-8 flex flex-wrap items-center gap-5 justify-center overflow-hidden`}>
                            <CheckoutPageExample2/>
                        </div>
                    )}

                    {checkoutPage2Code && <BlocksShowCode code={checkoutPage2Codes}/>
                    }
                </BlockWrapper>

                <BlocksFooter backUrl='/blocks/product-details-page' backName='product details page'
                              forwardUrl='/blocks/responsive-search-bar' forwardName='responsive search bar'/>
            </div>


            <Helmet>
                <title>Blocks - Checkout Page</title>
            </Helmet>
        </aside>
    );
};

export default Index;
