export const DrawerTopCode = [
    {
        id: "app",
        displayText: "App.jsx",
        language: "jsx",
        code: 'import React, {useState} from "react";\n' +
            'import Drawer from "./Drawer.jsx"\n' +
            '\n' +
            'const App = () => {\n' +
            '    const [openDrawer, setOpenDrawer] = useState(false);\n' +
            '\n' +
            '    return (\n' +
            '        <>\n' +
            '            <button\n' +
            '                className="px-4 zenui_drawer_button py-2 bg-[#3B9DF8] text-[#fff] rounded-md"\n' +
            '                onClick={() => setOpenDrawer(true)}\n' +
            '            >\n' +
            '                Open Drawer\n' +
            '            </button>\n' +
            '\n' +
            '            {\n' +
            '                openDrawer && (\n' +
            '                    <Drawer\n' +
            '                        openDrawer={openDrawer}\n' +
            '                        setOpenDrawer={setOpenDrawer}\n' +
            '                    />\n' +
            '                )\n' +
            '            }\n' +
            '        </>\n' +
            '    );\n' +
            '};\n' +
            '\n' +
            'export default App;'
    },
    {
        id: "Drawer",
        displayText: "Drawer.jsx",
        language: "jsx",
        code: 'import React, {useEffect} from "react";\n' +
            '\n' +
            'const Drawer = ({openDrawer, setOpenDrawer}) => {\n' +
            '\n' +
            '    useEffect(() => {\n' +
            '        // to click ESC key off the drawer\n' +
            '        const handleKeydown = (event) => {\n' +
            '            event.preventDefault();\n' +
            '            if (event.key === \'Escape\') {\n' +
            '                setOpenDrawer(false);\n' +
            '            }\n' +
            '        }\n' +
            '\n' +
            '        // handle outside click to close drawer\n' +
            '        const handleClickOutside = (e) => {\n' +
            '            if (\n' +
            '                !e.target.closest(".zenui_drawer_button") &&\n' +
            '                !e.target.closest(".zenui_drawer")\n' +
            '            ) {\n' +
            '                setOpenDrawer(false);\n' +
            '            }\n' +
            '        };\n' +
            '\n' +
            '        document.addEventListener("click", handleClickOutside);\n' +
            '        document.addEventListener("keydown", handleKeydown);\n' +
            '        return () => {\n' +
            '            document.removeEventListener("click", handleClickOutside);\n' +
            '            document.removeEventListener("keydown", handleClickOutside);\n' +
            '        };\n' +
            '    }, []);\n' +
            '\n' +
            '    return (\n' +
            '        <div\n' +
            '            className={`${\n' +
            '                openDrawer ? " visible" : " invisible"\n' +
            '            } w-full h-screen fixed flex items-start justify-start top-0 left-0 z-[200000000] dark:bg-black/40 transition-all duration-300`}\n' +
            '        >\n' +
            '            <div\n' +
            '                className={`${\n' +
            '                    openDrawer\n' +
            '                        ? " translate-y-[0px] opacity-100"\n' +
            '                        : " translate-y-[-200px] opacity-0"\n' +
            '                } w-full dark:bg-slate-800 bg-[#fff] zenui_drawer transition-all shadow-[0px_0px_20px_0px_rgb(0,0,0,0.2)] duration-300 mx-auto`}\n' +
            '            >\n' +
            '                <div\n' +
            '                    className="flex md::flex-row flex-col justify-between w-full gap-5 px-8 py-10">\n' +
            '                    <p className="text-[1.2rem] dark:text-[#abc2d3] text-[#424242] w-full md:w-[70%]">\n' +
            '                        This site uses cookies and related technologies, as\n' +
            '                        described in our privacy policy, for purposes that may\n' +
            '                        include site operation, analytics, enhanced user\n' +
            '                        experience, or advertising. You may choose to consent to\n' +
            '                        our use of these technologies, or manage your own\n' +
            '                        preferences.\n' +
            '                    </p>\n' +
            '\n' +
            '                    <div\n' +
            '                        className="flex items-end justify-end gap-4 flex-col lg:flex-row w-full md:w-[20%]">\n' +
            '                        <button\n' +
            '                            className="py-2 w-full px-4 dark:border-slate-800 border border-[#d1d1d1] rounded-md outline-none bg-[#3B9DF8] text-[#fff]"\n' +
            '                            onClick={() => setOpenDrawer(false)}\n' +
            '                        >\n' +
            '                            Accept\n' +
            '                        </button>\n' +
            '                        <button\n' +
            '                            className="py-2 w-full dark:border-slate-700 dark:text-[#abc2d3] dark:hover:bg-slate-900/50 hover:bg-gray-100 px-4 border border-[#d1d1d1] rounded-md outline-none text-[#353535]"\n' +
            '                            onClick={() => setOpenDrawer(false)}\n' +
            '                        >\n' +
            '                            Decline\n' +
            '                        </button>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    );\n' +
            '};\n' +
            '\n' +
            'export default Drawer;'
    },
]

export const DrawerBottomCode = [
    {
        id: "app",
        displayText: "App.jsx",
        language: "jsx",
        code: 'import React, {useState} from "react";\n' +
            'import Drawer from "./Drawer.jsx"\n' +
            '\n' +
            'const App = () => {\n' +
            '    const [openDrawer, setOpenDrawer] = useState(false);\n' +
            '\n' +
            '    return (\n' +
            '        <>\n' +
            '            <button\n' +
            '                className="px-4 zenui_drawer_button py-2 bg-[#3B9DF8] text-[#fff] rounded-md"\n' +
            '                onClick={() => setOpenDrawer(true)}\n' +
            '            >\n' +
            '                Open Drawer\n' +
            '            </button>\n' +
            '\n' +
            '            {\n' +
            '                openDrawer && (\n' +
            '                    <Drawer\n' +
            '                        openDrawer={openDrawer}\n' +
            '                        setOpenDrawer={setOpenDrawer}\n' +
            '                    />\n' +
            '                )\n' +
            '            }\n' +
            '        </>\n' +
            '    );\n' +
            '};\n' +
            '\n' +
            'export default App;'
    },
    {
        id: "Drawer",
        displayText: "Drawer.jsx",
        language: "jsx",
        code: 'import React, {useEffect} from "react";\n' +
            '\n' +
            'const Drawer = ({openDrawer, setOpenDrawer}) => {\n' +
            '\n' +
            '    useEffect(() => {\n' +
            '        // to click ESC key off the drawer\n' +
            '        const handleKeydown = (event) => {\n' +
            '            event.preventDefault();\n' +
            '            if (event.key === "Escape") {\n' +
            '                setOpenDrawer(false);\n' +
            '            }\n' +
            '        }\n' +
            '\n' +
            '        // handle outside click to close drawer\n' +
            '        const handleClickOutside = (e) => {\n' +
            '            if (\n' +
            '                !e.target.closest(".zenui_drawer_button") &&\n' +
            '                !e.target.closest(".zenui_drawer")\n' +
            '            ) {\n' +
            '                setOpenDrawer(false);\n' +
            '            }\n' +
            '        };\n' +
            '\n' +
            '        document.addEventListener("click", handleClickOutside);\n' +
            '        document.addEventListener("keydown", handleKeydown);\n' +
            '        return () => {\n' +
            '            document.removeEventListener("click", handleClickOutside);\n' +
            '            document.removeEventListener("keydown", handleClickOutside);\n' +
            '        };\n' +
            '    }, []);\n' +
            '\n' +
            '    return (\n' +
            '        <div\n' +
            '            className={`${\n' +
            '                openDrawer ? " visible" : " invisible"\n' +
            '            } w-full h-screen fixed flex items-end justify-end top-0 left-0 z-[200000000] dark:bg-black/40 transition-all duration-300`}\n' +
            '        >\n' +
            '            <div\n' +
            '                className={`${\n' +
            '                    openDrawer\n' +
            '                        ? " translate-y-[0px] opacity-100"\n' +
            '                        : " translate-y-[200px] opacity-0"\n' +
            '                } w-full dark:bg-slate-800 bg-[#fff] zenui_drawer transition-all shadow-[0px_0px_20px_0px_rgb(0,0,0,0.2)] duration-300 mx-auto mt-8`}\n' +
            '            >\n' +
            '                <div\n' +
            '                    className="flex md::flex-row flex-col justify-between w-full gap-5 px-8 py-12">\n' +
            '                    <p className="text-[1.2rem] dark:text-[#abc2d3] text-[#424242] w-full md:w-[70%]">\n' +
            '                        This site uses cookies and related technologies, as\n' +
            '                        described in our privacy policy, for purposes that may\n' +
            '                        include site operation, analytics, enhanced user\n' +
            '                        experience, or advertising. You may choose to consent to\n' +
            '                        our use of these technologies, or manage your own\n' +
            '                        preferences.\n' +
            '                    </p>\n' +
            '\n' +
            '                    <div\n' +
            '                        className="flex items-end justify-end gap-4 flex-col lg:flex-row w-full md:w-[20%]">\n' +
            '                        <button\n' +
            '                            className="py-2 w-full px-4 dark:border-slate-800 border border-[#d1d1d1] rounded-md outline-none bg-[#3B9DF8] text-[#fff]"\n' +
            '                            onClick={() => setOpenDrawer(false)}\n' +
            '                        >\n' +
            '                            Accept\n' +
            '                        </button>\n' +
            '                        <button\n' +
            '                            className="py-2 w-full dark:border-slate-700 dark:text-[#abc2d3] dark:hover:bg-slate-900/50 hover:bg-gray-100 px-4 border border-[#d1d1d1] rounded-md outline-none text-[#353535]"\n' +
            '                            onClick={() => setOpenDrawer(false)}\n' +
            '                        >\n' +
            '                            Decline\n' +
            '                        </button>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    );\n' +
            '};\n' +
            '\n' +
            'export default Drawer;'
    },
]

export const DrawerLeftCode = [
    {
        id: "app",
        displayText: "App.jsx",
        language: "jsx",
        code: 'import React, {useState} from "react";\n' +
            'import Drawer from "./Drawer.jsx"\n' +
            '\n' +
            'const App = () => {\n' +
            '    const [openDrawer, setOpenDrawer] = useState(false);\n' +
            '\n' +
            '    return (\n' +
            '        <>\n' +
            '            <button\n' +
            '                className="px-4 zenui_drawer_button py-2 bg-[#3B9DF8] text-[#fff] rounded-md"\n' +
            '                onClick={() => setOpenDrawer(true)}\n' +
            '            >\n' +
            '                Open Drawer\n' +
            '            </button>\n' +
            '\n' +
            '            {\n' +
            '                openDrawer && (\n' +
            '                    <Drawer\n' +
            '                        openDrawer={openDrawer}\n' +
            '                        setOpenDrawer={setOpenDrawer}\n' +
            '                    />\n' +
            '                )\n' +
            '            }\n' +
            '        </>\n' +
            '    );\n' +
            '};\n' +
            '\n' +
            'export default App;'
    },
    {
        id: "Drawer",
        displayText: "Drawer.jsx",
        language: "jsx",
        code: 'import React, {useEffect} from "react";\n' +
            '\n' +
            '// react icons\n' +
            'import {RxCross1} from "react-icons/rx";\n' +
            '\n' +
            'const Drawer = ({openDrawer, setOpenDrawer,}) => {\n' +
            '\n' +
            '    useEffect(() => {\n' +
            '        // to click ESC key off the drawer\n' +
            '        const handleKeydown = (event) => {\n' +
            '            event.preventDefault();\n' +
            '\n' +
            '            if (event.key === "Escape") {\n' +
            '                setOpenDrawer(false);\n' +
            '            }\n' +
            '        }\n' +
            '\n' +
            '        // handle outside click to close drawer\n' +
            '        const handleClickOutside = (e) => {\n' +
            '            if (\n' +
            '                !e.target.closest(".zenui_drawer_btn") &&\n' +
            '                !e.target.closest(".zenui_drawer")\n' +
            '            ) {\n' +
            '                setOpenDrawer(false);\n' +
            '            }\n' +
            '        };\n' +
            '\n' +
            '        document.addEventListener("click", handleClickOutside);\n' +
            '        document.addEventListener("keydown", handleKeydown);\n' +
            '        return () => {\n' +
            '            document.removeEventListener("click", handleClickOutside);\n' +
            '            document.removeEventListener("keydown", handleClickOutside);\n' +
            '        };\n' +
            '    }, []);\n' +
            '\n' +
            '    return (\n' +
            '        <div\n' +
            '            className={`${\n' +
            '                openDrawer ? " visible" : " invisible"\n' +
            '            } w-full h-screen fixed bg-[rgb(0,0,0,0.2)] top-0 left-0 z-[200000000] dark:bg-black/40 transition-all duration-300`}\n' +
            '        >\n' +
            '            <div\n' +
            '                className={`${\n' +
            '                    openDrawer\n' +
            '                        ? " translate-x-[0px] opacity-100"\n' +
            '                        : " translate-x-[-200px] opacity-0"\n' +
            '                } overflow-y-scroll zenui_drawer w-full md:w-[80%] lg:w-[40%] dark:bg-slate-800 h-screen bg-[#eceef6] transition-all duration-300`}\n' +
            '            >\n' +
            '                <div className="w-full flex items-end p-4 justify-end">\n' +
            '                    <RxCross1\n' +
            '                        className="p-2 w-fit dark:text-slate-300 dark:hover:bg-slate-900/50 text-[2.5rem] hover:bg-[#e7e7e7] rounded-full transition-all duration-300 cursor-pointer"\n' +
            '                        onClick={() => setOpenDrawer(false)}\n' +
            '                    />\n' +
            '                </div>\n' +
            '\n' +
            '                <div\n' +
            '                    className="flex items-start flex-col p-6 md:p-12 justify-between gap-8">\n' +
            '                    <div\n' +
            '                        className="bg-[#fff] dark:bg-slate-900 min-h-screen rounded-md p-6 w-full">\n' +
            '                        {/* steps */}\n' +
            '                        <div\n' +
            '                            className="flex items-center lg:flex-row flex-col justify-between w-full border-b border-[#d1d1d1] dark:border-slate-700 flex-wrap gap-y-6">\n' +
            '                            <div className="flex items-center flex-wrap gap-5">\n' +
            '                              <span className="text-[1rem] font-[500] text-[#3B9DF8] border-b border-[#3B9DF8] pb-3">\n' +
            '                                1.Cart\n' +
            '                              </span>\n' +
            '                                <span\n' +
            '                                    className="text-[1rem] dark:text-[#abc2d3] font-[500] text-[#424242] pb-3">\n' +
            '                                2. Shipping & Payment\n' +
            '                              </span>\n' +
            '                                <span\n' +
            '                                    className="text-[1rem] dark:text-[#abc2d3] font-[500] text-[#424242] pb-3">\n' +
            '                                3. Confimation\n' +
            '                              </span>\n' +
            '                            </div>\n' +
            '\n' +
            '                            <a\n' +
            '                                href="#"\n' +
            '                                className="underline text-[#3B9DF8] font-[500] pb-3"\n' +
            '                            >\n' +
            '                                Why is subscribing better?\n' +
            '                            </a>\n' +
            '                        </div>\n' +
            '\n' +
            '                        {/* products */}\n' +
            '                        <div\n' +
            '                            className="mt-12 flex items-start dark:border-slate-700 border-b border-[#d1d1d1] pb-6 justify-between w-full">\n' +
            '                            <div className="flex items-start gap-5">\n' +
            '                                <img\n' +
            '                                    src="https://img.freepik.com/free-photo/still-life-skincare-products_23-2149371284.jpg?t=st=1711125399~exp=1711128999~hmac=012d9b565ec8c14efb41ddb92d6adaa9a7902802e6c884a3051fb6d449837afe&w=740"\n' +
            '                                    alt="Still life of skincare products"\n' +
            '                                    className="w-[90px] h-[60px] object-cover rounded-md"\n' +
            '                                />\n' +
            '\n' +
            '                                <div className="">\n' +
            '                                    <h2 className="text-[1.2rem] font-[600] text-[#3B9DF8]">\n' +
            '                                        Still life of skincare products\n' +
            '                                    </h2>\n' +
            '                                    <p className="text-[1rem] dark:text-slate-400 font-[500] text-[#424242]">\n' +
            '                                        25 items\n' +
            '                                    </p>\n' +
            '                                </div>\n' +
            '                            </div>\n' +
            '\n' +
            '                            <div className="flex items-center gap-12">\n' +
            '                                <h3 className="text-[1.2rem] font-[600] dark:text-slate-400 text-[#6d6d6d]">\n' +
            '                                    $32{" "}\n' +
            '                                    <span className="text-[#3B9DF8] pl-1">$12</span>\n' +
            '                                </h3>\n' +
            '\n' +
            '                                <RxCross1 className="text-[#6d6d6d] dark:text-slate-400"/>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                        <div\n' +
            '                            className="mt-12 flex items-start dark:border-slate-700 border-b border-[#d1d1d1] pb-6 justify-between w-full">\n' +
            '                            <div className="flex items-start gap-5">\n' +
            '                                <img\n' +
            '                                    src="https://img.freepik.com/free-photo/levitating-music-headphones-display_23-2149817605.jpg?t=st=1711125916~exp=1711129516~hmac=26762a7dd8eb383d3eccccb2cc232b163699fd9bf408804d4ad09f8ea127f639&w=740"\n' +
            '                                    alt="Levitating music headphones display"\n' +
            '                                    className="w-[90px] h-[60px] object-cover rounded-md"\n' +
            '                                />\n' +
            '\n' +
            '                                <div className="">\n' +
            '                                    <h2 className="text-[1.2rem] font-[600] text-[#3B9DF8]">\n' +
            '                                        Still life of skincare products\n' +
            '                                    </h2>\n' +
            '                                    <p className="text-[1rem] dark:text-slate-400 font-[500] text-[#424242]">\n' +
            '                                        8 items\n' +
            '                                    </p>\n' +
            '                                </div>\n' +
            '                            </div>\n' +
            '\n' +
            '                            <div className="flex items-center gap-12">\n' +
            '                                <h3 className="text-[1.2rem] font-[600] dark:text-slate-400 text-[#6d6d6d]">\n' +
            '                                    $32{" "}\n' +
            '                                    <span className="text-[#3B9DF8] pl-1">$12</span>\n' +
            '                                </h3>\n' +
            '\n' +
            '                                <RxCross1 className="text-[#6d6d6d] dark:text-slate-400"/>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                        <div\n' +
            '                            className="mt-12 flex items-start dark:border-slate-700 border-b border-[#d1d1d1] pb-6 justify-between w-full">\n' +
            '                            <div className="flex items-start gap-5">\n' +
            '                                <img\n' +
            '                                    src="https://img.freepik.com/free-vector/set-aloe-vera-cosmetic-products_23-2147638007.jpg?t=st=1711125950~exp=1711129550~hmac=cdcb71b9735c22a4a1f74488397d71d0d32e20fed7c2ca003d8396db00961620&w=740"\n' +
            '                                    alt="Set of aloe vera cosmetic products"\n' +
            '                                    className="w-[90px] h-[60px] object-cover rounded-md"\n' +
            '                                />\n' +
            '\n' +
            '                                <div className="">\n' +
            '                                    <h2 className="text-[1.2rem] font-[600] text-[#3B9DF8]">\n' +
            '                                        Still life of skincare products\n' +
            '                                    </h2>\n' +
            '                                    <p className="text-[1rem] dark:text-slate-400 font-[500] text-[#424242]">\n' +
            '                                        2 items\n' +
            '                                    </p>\n' +
            '                                </div>\n' +
            '                            </div>\n' +
            '\n' +
            '                            <div className="flex items-center gap-12">\n' +
            '                                <h3 className="text-[1.2rem] font-[600] dark:text-slate-400 text-[#6d6d6d]">\n' +
            '                                    $32{" "}\n' +
            '                                    <span className="text-[#3B9DF8] pl-1">$12</span>\n' +
            '                                </h3>\n' +
            '\n' +
            '                                <RxCross1 className="text-[#6d6d6d] dark:text-slate-400"/>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '\n' +
            '                    <div className="w-full mr-8">\n' +
            '                        <div className="bg-[#fff] dark:bg-slate-900 rounded-md p-6 ">\n' +
            '                            <h3 className="text-[1rem] text-[#3B9DF8] dark:border-slate-700 font-[500] border-b border-[#d1d1d1] pb-4 text-center">\n' +
            '                                Order Summary\n' +
            '                            </h3>\n' +
            '\n' +
            '                            <div className="flex flex-col gap-5 mt-4">\n' +
            '                                <div className="flex items-center justify-between w-full">\n' +
            '                                    <h4 className="text-[1rem] font-[500] text-[#3B9DF8]">\n' +
            '                                        Item Total\n' +
            '                                    </h4>\n' +
            '                                    <span\n' +
            '                                        className="text-[#424242] dark:text-[#abc2d3] font-[500]">\n' +
            '                                  $180.00\n' +
            '                                </span>\n' +
            '                                </div>\n' +
            '\n' +
            '                                <div className="flex items-center justify-between w-full">\n' +
            '                                    <h4 className="text-[1rem] font-[500] text-[#3B9DF8]">\n' +
            '                                        Subcription savings (15% off)\n' +
            '                                    </h4>\n' +
            '                                    <span className="text-[#3B9DF8] font-[500]">\n' +
            '                                  - $18.00\n' +
            '                                </span>\n' +
            '                                </div>\n' +
            '\n' +
            '                                <div className="flex items-center justify-between w-full">\n' +
            '                                    <h4 className="text-[1rem] font-[500] text-[#3B9DF8]">\n' +
            '                                        Shipping\n' +
            '                                    </h4>\n' +
            '                                    <span className="text-[#3B9DF8] font-[500]">\n' +
            '                                  free\n' +
            '                                </span>\n' +
            '                                </div>\n' +
            '\n' +
            '                                <div\n' +
            '                                    className="flex items-center dark:border-slate-700 justify-between w-full border-t border-[#d1d1d1] pt-4">\n' +
            '                                    <h4 className="text-[1rem] dark:text-[#abc2d3] font-[500] text-[#424242]">\n' +
            '                                        Order Total\n' +
            '                                    </h4>\n' +
            '                                    <span\n' +
            '                                        className="text-[#424242] font-[500] dark:text-[#abc2d3]">\n' +
            '                                  $200.00\n' +
            '                                </span>\n' +
            '                                </div>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                        <button\n' +
            '                            className="w-full py-2 px-6 mt-6 tracking-widest bg-[#3B9DF8] rounded-md text-[#fff]">\n' +
            '                            Checkout\n' +
            '                        </button>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    );\n' +
            '};\n' +
            '\n' +
            'export default Drawer;'
    },
]

export const DrawerRightCode = [
    {
        id: "app",
        displayText: "App.jsx",
        language: "jsx",
        code: 'import React, {useState} from "react";\n' +
            'import Drawer from "./Drawer.jsx"\n' +
            '\n' +
            'const App = () => {\n' +
            '    const [openDrawer, setOpenDrawer] = useState(false);\n' +
            '\n' +
            '    return (\n' +
            '        <>\n' +
            '            <button\n' +
            '                className="px-4 zenui_drawer_button py-2 bg-[#3B9DF8] text-[#fff] rounded-md"\n' +
            '                onClick={() => setOpenDrawer(true)}\n' +
            '            >\n' +
            '                Open Drawer\n' +
            '            </button>\n' +
            '\n' +
            '            {\n' +
            '                openDrawer && (\n' +
            '                    <Drawer\n' +
            '                        openDrawer={openDrawer}\n' +
            '                        setOpenDrawer={setOpenDrawer}\n' +
            '                    />\n' +
            '                )\n' +
            '            }\n' +
            '        </>\n' +
            '    );\n' +
            '};\n' +
            '\n' +
            'export default App;'
    },
    {
        id: "Drawer",
        displayText: "Drawer.jsx",
        language: "jsx",
        code: 'import React, {useEffect} from "react";\n' +
            '\n' +
            '// react icons\n' +
            'import {RxCross1} from "react-icons/rx";\n' +
            '\n' +
            'const Drawer = ({openDrawer, setOpenDrawer,}) => {\n' +
            '\n' +
            '    useEffect(() => {\n' +
            '        // to click ESC key off the drawer\n' +
            '        const handleKeydown = (event) => {\n' +
            '            event.preventDefault();\n' +
            '\n' +
            '            if (event.key === "Escape") {\n' +
            '                setOpenDrawer(false);\n' +
            '            }\n' +
            '        }\n' +
            '\n' +
            '        // handle outside click to close drawer\n' +
            '        const handleClickOutside = (e) => {\n' +
            '            if (\n' +
            '                !e.target.closest(".zenui_drawer_btn") &&\n' +
            '                !e.target.closest(".zenui_drawer")\n' +
            '            ) {\n' +
            '                setOpenDrawer(false);\n' +
            '            }\n' +
            '        };\n' +
            '\n' +
            '        document.addEventListener("click", handleClickOutside);\n' +
            '        document.addEventListener("keydown", handleKeydown);\n' +
            '        return () => {\n' +
            '            document.removeEventListener("click", handleClickOutside);\n' +
            '            document.removeEventListener("keydown", handleClickOutside);\n' +
            '        };\n' +
            '    }, []);\n' +
            '\n' +
            '    return (\n' +
            '        <div\n' +
            '            className={`${\n' +
            '                openDrawer ? " visible" : " invisible"\n' +
            '            } w-full h-screen fixed bg-[rgb(0,0,0,0.2)] top-0 left-0 z-[200000000] dark:bg-black/40 transition-all duration-300`}\n' +
            '        >\n' +
            '            <div\n' +
            '                className={`${\n' +
            '                    openDrawer\n' +
            '                        ? " translate-x-[0px] opacity-100"\n' +
            '                        : " translate-x-[200px] opacity-0"\n' +
            '                } overflow-y-scroll zenui_drawer w-full md:w-[80%] lg:w-[40%]  dark:bg-slate-800 h-screen bg-[#eceef6] transition-all duration-300 float-right`}\n' +
            '            >\n' +
            '                <div className="w-full flex items-end p-4 justify-end">\n' +
            '                    <RxCross1\n' +
            '                        className="p-2 w-fit dark:text-slate-400 dark:hover:bg-slate-900/50 text-[2.5rem] hover:bg-[#e7e7e7] rounded-full transition-all duration-300 cursor-pointer"\n' +
            '                        onClick={() => setOpenDrawer(false)}\n' +
            '                    />\n' +
            '                </div>\n' +
            '\n' +
            '                <div\n' +
            '                    className="flex items-start flex-col p-6 md:p-12 justify-between gap-8">\n' +
            '                    <div\n' +
            '                        className="bg-[#fff] dark:bg-slate-900 min-h-screen rounded-md p-6 w-full">\n' +
            '                        {/* steps */}\n' +
            '                        <div\n' +
            '                            className="flex items-center lg:flex-row flex-col justify-between w-full border-b border-[#d1d1d1] dark:border-slate-700 flex-wrap gap-y-6">\n' +
            '                            <div className="flex items-center gap-5">\n' +
            '                              <span className="text-[1rem] font-[500] text-[#3B9DF8] border-b border-[#3B9DF8] pb-3">\n' +
            '                                1.Cart\n' +
            '                              </span>\n' +
            '                                <span\n' +
            '                                    className="text-[1rem] dark:text-[#abc2d3] font-[500] text-[#424242] pb-3">\n' +
            '                                2. Shipping & Payment\n' +
            '                              </span>\n' +
            '                                <span\n' +
            '                                    className="text-[1rem] dark:text-[#abc2d3] font-[500] text-[#424242] pb-3">\n' +
            '                                3. Confirmation\n' +
            '                              </span>\n' +
            '                            </div>\n' +
            '\n' +
            '                            <a\n' +
            '                                href="#"\n' +
            '                                className="underline text-[#3B9DF8] font-[500] pb-3"\n' +
            '                            >\n' +
            '                                Why is subscribing better?\n' +
            '                            </a>\n' +
            '                        </div>\n' +
            '\n' +
            '                        {/* products */}\n' +
            '                        <div\n' +
            '                            className="mt-12 flex items-start dark:border-slate-700 border-b border-[#d1d1d1] pb-6 justify-between w-full">\n' +
            '                            <div className="flex items-start gap-5">\n' +
            '                                <img\n' +
            '                                    src="https://img.freepik.com/free-photo/still-life-skincare-products_23-2149371284.jpg?t=st=1711125399~exp=1711128999~hmac=012d9b565ec8c14efb41ddb92d6adaa9a7902802e6c884a3051fb6d449837afe&w=740"\n' +
            '                                    alt="Still life of skincare products"\n' +
            '                                    className="w-[90px] h-[60px] object-cover rounded-md"\n' +
            '                                />\n' +
            '\n' +
            '                                <div className="">\n' +
            '                                    <h2 className="text-[1.2rem] font-[600] text-[#3B9DF8]">\n' +
            '                                        Still life of skincare products\n' +
            '                                    </h2>\n' +
            '                                    <p className="text-[1rem] dark:text-slate-400 font-[500] text-[#424242]">\n' +
            '                                        25 items\n' +
            '                                    </p>\n' +
            '                                </div>\n' +
            '                            </div>\n' +
            '\n' +
            '                            <div className="flex items-center gap-12">\n' +
            '                                <h3 className="text-[1.2rem] font-[600] dark:text-slate-400 text-[#6d6d6d]">\n' +
            '                                    $32{" "}\n' +
            '                                    <span className="text-[#3B9DF8] pl-1">$12</span>\n' +
            '                                </h3>\n' +
            '\n' +
            '                                <RxCross1 className="text-[#6d6d6d] dark:text-slate-400"/>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                        <div\n' +
            '                            className="mt-12 flex items-start dark:border-slate-700 border-b border-[#d1d1d1] pb-6 justify-between w-full">\n' +
            '                            <div className="flex items-start gap-5">\n' +
            '                                <img\n' +
            '                                    src="https://img.freepik.com/free-photo/levitating-music-headphones-display_23-2149817605.jpg?t=st=1711125916~exp=1711129516~hmac=26762a7dd8eb383d3eccccb2cc232b163699fd9bf408804d4ad09f8ea127f639&w=740"\n' +
            '                                    alt="Levitating music headphones display"\n' +
            '                                    className="w-[90px] h-[60px] object-cover rounded-md"\n' +
            '                                />\n' +
            '\n' +
            '                                <div className="">\n' +
            '                                    <h2 className="text-[1.2rem] font-[600] text-[#3B9DF8]">\n' +
            '                                        Still life of skincare products\n' +
            '                                    </h2>\n' +
            '                                    <p className="text-[1rem] dark:text-slate-400 font-[500] text-[#424242]">\n' +
            '                                        8 items\n' +
            '                                    </p>\n' +
            '                                </div>\n' +
            '                            </div>\n' +
            '\n' +
            '                            <div className="flex items-center gap-12">\n' +
            '                                <h3 className="text-[1.2rem] font-[600] dark:text-slate-400 text-[#6d6d6d]">\n' +
            '                                    $32{" "}\n' +
            '                                    <span className="text-[#3B9DF8] pl-1">$12</span>\n' +
            '                                </h3>\n' +
            '\n' +
            '                                <RxCross1 className="text-[#6d6d6d] dark:text-slate-400"/>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                        <div\n' +
            '                            className="mt-12 flex items-start dark:border-slate-700 border-b border-[#d1d1d1] pb-6 justify-between w-full">\n' +
            '                            <div className="flex items-start gap-5">\n' +
            '                                <img\n' +
            '                                    src="https://img.freepik.com/free-vector/set-aloe-vera-cosmetic-products_23-2147638007.jpg?t=st=1711125950~exp=1711129550~hmac=cdcb71b9735c22a4a1f74488397d71d0d32e20fed7c2ca003d8396db00961620&w=740"\n' +
            '                                    alt="Set of aloe vera cosmetic products"\n' +
            '                                    className="w-[90px] h-[60px] object-cover rounded-md"\n' +
            '                                />\n' +
            '\n' +
            '                                <div className="">\n' +
            '                                    <h2 className="text-[1.2rem] font-[600] text-[#3B9DF8]">\n' +
            '                                        Still life of skincare products\n' +
            '                                    </h2>\n' +
            '                                    <p className="text-[1rem] dark:text-slate-400 font-[500] text-[#424242]">\n' +
            '                                        2 items\n' +
            '                                    </p>\n' +
            '                                </div>\n' +
            '                            </div>\n' +
            '\n' +
            '                            <div className="flex items-center gap-12">\n' +
            '                                <h3 className="text-[1.2rem] font-[600] dark:text-slate-400 text-[#6d6d6d]">\n' +
            '                                    $32{" "}\n' +
            '                                    <span className="text-[#3B9DF8] pl-1">$12</span>\n' +
            '                                </h3>\n' +
            '\n' +
            '                                <RxCross1 className="text-[#6d6d6d] dark:text-slate-400"/>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '\n' +
            '                    <div className="w-full mr-8">\n' +
            '                        <div className="bg-[#fff] dark:bg-slate-900 rounded-md p-6 ">\n' +
            '                            <h3 className="text-[1rem] text-[#3B9DF8] dark:border-slate-700 font-[500] border-b border-[#d1d1d1] pb-4 text-center">\n' +
            '                                Order Summary\n' +
            '                            </h3>\n' +
            '\n' +
            '                            <div className="flex flex-col gap-5 mt-4">\n' +
            '                                <div className="flex items-center justify-between w-full">\n' +
            '                                    <h4 className="text-[1rem] font-[500] text-[#3B9DF8]">\n' +
            '                                        Item Total\n' +
            '                                    </h4>\n' +
            '                                    <span\n' +
            '                                        className="text-[#424242] dark:text-[#abc2d3] font-[500]">\n' +
            '                                  $180.00\n' +
            '                                </span>\n' +
            '                                </div>\n' +
            '\n' +
            '                                <div className="flex items-center justify-between w-full">\n' +
            '                                    <h4 className="text-[1rem] font-[500] text-[#3B9DF8]">\n' +
            '                                        Subcription savings (15% off)\n' +
            '                                    </h4>\n' +
            '                                    <span className="text-[#3B9DF8] font-[500]">\n' +
            '                                  - $18.00\n' +
            '                                </span>\n' +
            '                                </div>\n' +
            '\n' +
            '                                <div className="flex items-center justify-between w-full">\n' +
            '                                    <h4 className="text-[1rem] font-[500] text-[#3B9DF8]">\n' +
            '                                        Shipping\n' +
            '                                    </h4>\n' +
            '                                    <span className="text-[#3B9DF8] font-[500]">\n' +
            '                                  free\n' +
            '                                </span>\n' +
            '                                </div>\n' +
            '\n' +
            '                                <div\n' +
            '                                    className="flex items-center dark:border-slate-700 justify-between w-full border-t border-[#d1d1d1] pt-4">\n' +
            '                                    <h4 className="text-[1rem] dark:text-[#abc2d3] font-[500] text-[#424242]">\n' +
            '                                        Order Total\n' +
            '                                    </h4>\n' +
            '                                    <span\n' +
            '                                        className="text-[#424242] dark:text-[#abc2d3] font-[500]">\n' +
            '                                  $200.00\n' +
            '                                </span>\n' +
            '                                </div>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                        <button\n' +
            '                            className="w-full py-2 px-6 mt-6 tracking-widest bg-[#3B9DF8] rounded-md text-[#fff]">\n' +
            '                            Checkout\n' +
            '                        </button>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    );\n' +
            '};\n' +
            '\n' +
            'export default Drawer;'
    },
]

export const DrawerFullScreenCode = [
    {
        id: "app",
        displayText: "App.jsx",
        language: "jsx",
        code: 'import React, {useState} from "react";\n' +
            'import Drawer from "./Drawer.jsx"\n' +
            '\n' +
            'const App = () => {\n' +
            '    const [openDrawer, setOpenDrawer] = useState(false);\n' +
            '\n' +
            '    return (\n' +
            '        <>\n' +
            '            <button\n' +
            '                className="px-4 zenui_drawer_button py-2 bg-[#3B9DF8] text-[#fff] rounded-md"\n' +
            '                onClick={() => setOpenDrawer(true)}\n' +
            '            >\n' +
            '                Open Drawer\n' +
            '            </button>\n' +
            '\n' +
            '            {\n' +
            '                openDrawer && (\n' +
            '                    <Drawer\n' +
            '                        openDrawer={openDrawer}\n' +
            '                        setOpenDrawer={setOpenDrawer}\n' +
            '                    />\n' +
            '                )\n' +
            '            }\n' +
            '        </>\n' +
            '    );\n' +
            '};\n' +
            '\n' +
            'export default App;'
    },
    {
        id: "Drawer",
        displayText: "Drawer.jsx",
        language: "jsx",
        code: 'import React, {useEffect} from "react";\n' +
            '\n' +
            '// react icons\n' +
            'import {RxCross1} from "react-icons/rx";\n' +
            '\n' +
            'const Drawer = ({openDrawer, setOpenDrawer,}) => {\n' +
            '\n' +
            '    useEffect(() => {\n' +
            '        // to click ESC key off the drawer\n' +
            '        const handleKeydown = (event) => {\n' +
            '            event.preventDefault();\n' +
            '\n' +
            '            if (event.key === "Escape") {\n' +
            '                setOpenDrawer(false);\n' +
            '            }\n' +
            '        }\n' +
            '\n' +
            '        // handle outside click to close drawer\n' +
            '        const handleClickOutside = (e) => {\n' +
            '            if (\n' +
            '                !e.target.closest(".zenui_drawer_btn") &&\n' +
            '                !e.target.closest(".zenui_drawer")\n' +
            '            ) {\n' +
            '                setOpenDrawer(false);\n' +
            '            }\n' +
            '        };\n' +
            '\n' +
            '        document.addEventListener("click", handleClickOutside);\n' +
            '        document.addEventListener("keydown", handleKeydown);\n' +
            '        return () => {\n' +
            '            document.removeEventListener("click", handleClickOutside);\n' +
            '            document.removeEventListener("keydown", handleClickOutside);\n' +
            '        };\n' +
            '    }, []);\n' +
            '\n' +
            '    return (\n' +
            '        <div\n' +
            '            className={`${\n' +
            '                openDrawer ? " visible" : " invisible"\n' +
            '            } w-full h-screen fixed flex items-end justify-end top-0 left-0 z-[200000000] dark:bg-black/40 transition-all duration-300`}\n' +
            '        >\n' +
            '            <div\n' +
            '                className={`${\n' +
            '                    openDrawer\n' +
            '                        ? " translate-y-[0px] opacity-100"\n' +
            '                        : " translate-y-[200px] opacity-0"\n' +
            '                } overflow-y-scroll w-full h-full dark:bg-slate-800 zenui_drawer bg-[#eceef6] transition-all duration-300 mx-auto mt-8`}\n' +
            '            >\n' +
            '                <div className="w-full flex items-end p-4 justify-end">\n' +
            '                    <RxCross1\n' +
            '                        className="p-2 text-[2.5rem] dark:text-[#abc2d3]/70 dark:hover:bg-slate-900/50 hover:bg-[#e7e7e7] rounded-full transition-all duration-300 cursor-pointer"\n' +
            '                        onClick={() => setOpenDrawer(false)}\n' +
            '                    />\n' +
            '                </div>\n' +
            '                <div\n' +
            '                    className="flex items-start lg:flex-row flex-col justify-between gap-8">\n' +
            '                    <div\n' +
            '                        className="bg-[#fff] dark:bg-slate-900 min-h-screen rounded-md p-6 w-full lg:w-[70%]">\n' +
            '                        {/* steps */}\n' +
            '                        <div\n' +
            '                            className="flex items-center lg:flex-row flex-col justify-between dark:border-slate-700 w-full border-b border-[#d1d1d1]">\n' +
            '                            <div className="flex items-center gap-5">\n' +
            '                            <span className="text-[1rem] font-[500] text-[#3B9DF8] border-b border-[#3B9DF8] pb-3">\n' +
            '                              1.Cart\n' +
            '                            </span>\n' +
            '                                <span\n' +
            '                                    className="text-[1rem] font-[500] dark:text-[#abc2d3] text-[#424242] pb-3">\n' +
            '                              2. Shipping & Payment\n' +
            '                            </span>\n' +
            '                                <span\n' +
            '                                    className="text-[1rem] font-[500] dark:text-[#abc2d3] text-[#424242] pb-3">\n' +
            '                              3. Confimation\n' +
            '                            </span>\n' +
            '                            </div>\n' +
            '\n' +
            '                            <a\n' +
            '                                href="#"\n' +
            '                                className="underline text-[#3B9DF8] font-[500] pb-3"\n' +
            '                            >\n' +
            '                                Why is subscribing better?\n' +
            '                            </a>\n' +
            '                        </div>\n' +
            '\n' +
            '                        {/* products */}\n' +
            '                        <div\n' +
            '                            className="mt-12 flex items-start border-b dark:border-slate-700 border-[#d1d1d1] pb-6 justify-between w-full">\n' +
            '                            <div className="flex items-start gap-5">\n' +
            '                                <img\n' +
            '                                    src="https://img.freepik.com/free-photo/still-life-skincare-products_23-2149371284.jpg?t=st=1711125399~exp=1711128999~hmac=012d9b565ec8c14efb41ddb92d6adaa9a7902802e6c884a3051fb6d449837afe&w=740"\n' +
            '                                    alt="Still life of skincare products"\n' +
            '                                    className="w-[90px] h-[60px] object-cover rounded-md"\n' +
            '                                />\n' +
            '\n' +
            '                                <div className="">\n' +
            '                                    <h2 className="text-[1.2rem] font-[600] text-[#3B9DF8]">\n' +
            '                                        Still life of skincare products\n' +
            '                                    </h2>\n' +
            '                                    <p className="text-[1rem] font-[500] dark:text-[#abc2d3] text-[#424242]">\n' +
            '                                        25 items\n' +
            '                                    </p>\n' +
            '                                </div>\n' +
            '                            </div>\n' +
            '\n' +
            '                            <div className="flex items-center gap-12">\n' +
            '                                <h3 className="text-[1.2rem] font-[600] dark:text-slate-500 text-[#6d6d6d]">\n' +
            '                                    $32 <span className="text-[#3B9DF8] pl-1">$12</span>\n' +
            '                                </h3>\n' +
            '\n' +
            '                                <RxCross1 className="text-[#6d6d6d] dark:text-slate-400"/>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                        <div\n' +
            '                            className="mt-12 flex items-start border-b dark:border-slate-700 border-[#d1d1d1] pb-6 justify-between w-full">\n' +
            '                            <div className="flex items-start gap-5">\n' +
            '                                <img\n' +
            '                                    src="https://img.freepik.com/free-photo/levitating-music-headphones-display_23-2149817605.jpg?t=st=1711125916~exp=1711129516~hmac=26762a7dd8eb383d3eccccb2cc232b163699fd9bf408804d4ad09f8ea127f639&w=740"\n' +
            '                                    alt="Levitating music headphones display"\n' +
            '                                    className="w-[90px] h-[60px] object-cover rounded-md"\n' +
            '                                />\n' +
            '\n' +
            '                                <div className="">\n' +
            '                                    <h2 className="text-[1.2rem] font-[600] text-[#3B9DF8]">\n' +
            '                                        Still life of skincare products\n' +
            '                                    </h2>\n' +
            '                                    <p className="text-[1rem] font-[500] dark:text-[#abc2d3] text-[#424242]">\n' +
            '                                        8 items\n' +
            '                                    </p>\n' +
            '                                </div>\n' +
            '                            </div>\n' +
            '\n' +
            '                            <div className="flex items-center gap-12">\n' +
            '                                <h3 className="text-[1.2rem] font-[600] dark:text-slate-500 text-[#6d6d6d]">\n' +
            '                                    $32 <span className="text-[#3B9DF8] pl-1">$12</span>\n' +
            '                                </h3>\n' +
            '\n' +
            '                                <RxCross1 className="text-[#6d6d6d] dark:text-slate-400"/>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                        <div\n' +
            '                            className="mt-12 flex items-start border-b dark:border-slate-700 border-[#d1d1d1] pb-6 justify-between w-full">\n' +
            '                            <div className="flex items-start gap-5">\n' +
            '                                <img\n' +
            '                                    src="https://img.freepik.com/free-vector/set-aloe-vera-cosmetic-products_23-2147638007.jpg?t=st=1711125950~exp=1711129550~hmac=cdcb71b9735c22a4a1f74488397d71d0d32e20fed7c2ca003d8396db00961620&w=740"\n' +
            '                                    alt="Set of aloe vera cosmetic products"\n' +
            '                                    className="w-[90px] h-[60px] object-cover rounded-md"\n' +
            '                                />\n' +
            '\n' +
            '                                <div className="">\n' +
            '                                    <h2 className="text-[1.2rem] font-[600] text-[#3B9DF8]">\n' +
            '                                        Still life of skincare products\n' +
            '                                    </h2>\n' +
            '                                    <p className="text-[1rem] dark:text-[#abc2d3] font-[500] text-[#424242]">\n' +
            '                                        2 items\n' +
            '                                    </p>\n' +
            '                                </div>\n' +
            '                            </div>\n' +
            '\n' +
            '                            <div className="flex items-center gap-12">\n' +
            '                                <h3 className="text-[1.2rem] font-[600] dark:text-slate-500 text-[#6d6d6d]">\n' +
            '                                    $32 <span className="text-[#3B9DF8] pl-1">$12</span>\n' +
            '                                </h3>\n' +
            '\n' +
            '                                <RxCross1 className="text-[#6d6d6d] dark:text-slate-400"/>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                    </div>\n' +
            '\n' +
            '                    <div className="w-full lg:w-[30%] mr-8">\n' +
            '                        <div className="bg-[#fff] dark:bg-slate-900 rounded-md p-6 ">\n' +
            '                            <h3 className="text-[1rem] text-[#3B9DF8] font-[500] dark:border-slate-700 border-b border-[#d1d1d1] pb-4 text-center">\n' +
            '                                Order Summary\n' +
            '                            </h3>\n' +
            '\n' +
            '                            <div className="flex flex-col gap-5 mt-4">\n' +
            '                                <div className="flex items-center justify-between w-full">\n' +
            '                                    <h4 className="text-[1rem] font-[500] text-[#3B9DF8]">\n' +
            '                                        Item Total\n' +
            '                                    </h4>\n' +
            '                                    <span className="text-[#424242] dark:text-[#abc2d3] font-[500]">\n' +
            '                                $180.00\n' +
            '                              </span>\n' +
            '                                </div>\n' +
            '\n' +
            '                                <div className="flex items-center justify-between w-full">\n' +
            '                                    <h4 className="text-[1rem] font-[500] text-[#3B9DF8]">\n' +
            '                                        Subcription savings (15% off)\n' +
            '                                    </h4>\n' +
            '                                    <span className="text-[#3B9DF8] font-[500]">\n' +
            '                                - $18.00\n' +
            '                              </span>\n' +
            '                                </div>\n' +
            '\n' +
            '                                <div className="flex items-center justify-between w-full">\n' +
            '                                    <h4 className="text-[1rem] font-[500] text-[#3B9DF8]">\n' +
            '                                        Shipping\n' +
            '                                    </h4>\n' +
            '                                    <span className="text-[#3B9DF8] font-[500]">\n' +
            '                                free\n' +
            '                              </span>\n' +
            '                                </div>\n' +
            '\n' +
            '                                <div\n' +
            '                                    className="flex items-center justify-between w-full dark:border-slate-700 border-t border-[#d1d1d1] pt-4">\n' +
            '                                    <h4 className="text-[1rem] font-[500] dark:text-[#abc2d3] text-[#424242]">\n' +
            '                                        Order Total\n' +
            '                                    </h4>\n' +
            '                                    <span className="text-[#424242] dark:text-[#abc2d3] font-[500]">\n' +
            '                                $200.00\n' +
            '                              </span>\n' +
            '                                </div>\n' +
            '                            </div>\n' +
            '                        </div>\n' +
            '                        <button\n' +
            '                            className="w-full py-2 px-6 mt-6 tracking-widest bg-[#3B9DF8] rounded-md text-[#fff]">\n' +
            '                            Checkout\n' +
            '                        </button>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '        </div>\n' +
            '    );\n' +
            '};\n' +
            '\n' +
            'export default Drawer;'
    },
]