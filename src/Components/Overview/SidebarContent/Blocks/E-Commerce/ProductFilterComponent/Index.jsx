import React, {useState} from "react";

// components
import ContentHeader from "@shared/ContentHeader";
import {Helmet} from "react-helmet";
import BlocksShowCode from "@shared/Block/BlocksShowCode.jsx";

// icons
import BlocksFooter from "@shared/Block/BlocksFooter.jsx";

// toggle card view
import {useToggleCardView} from "@/CustomHooks/ButtonToggle.js";
import ProductFilterExample1 from "./ProductFilterExample1.jsx";


const Index = () => {

    const [wrongRoute1Preview, setWrongRoute1Preview] = useState(true);
    const [wrongRoute1Code, setWrongRoute1Code] = useState(false);

    const toggleCardView = useToggleCardView()

    return (
        <aside className="flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10">
            <div>
                <ContentHeader text={"404 page 1"} id={"empty_page_1"}/>

                <p className="w-full text-text text-[1rem]">
                    A 404 page is a custom error page that informs users the requested page is not found, often offering
                    navigation links to guide them back to the homepage or other sections.
                </p>

                <div className="w-full border border-border rounded mt-8">
                    <div className="relative">
                        <div
                            className={`absolute top-0 left-0 w-[90px] h-[40px] z-[1] bg-border transition-all duration-500 ${wrongRoute1Preview ? 'translate-x-[0px] !w-[100px]' : 'translate-x-[107px] rounded-br'}`}></div>
                        <button
                            className={`${
                                wrongRoute1Preview && "text-tabTextColor"
                            } px-6 py-2 border-b z-[2] relative text-text border-border`}
                            onClick={() => toggleCardView(setWrongRoute1Preview, setWrongRoute1Code, true)}
                        >
                            Preview
                        </button>
                        <button
                            className={`${
                                wrongRoute1Code && "text-tabTextColor"
                            } px-6 py-2 border-r z-[2] relative text-text border-b rounded-br border-border`}
                            onClick={() => toggleCardView(setWrongRoute1Preview, setWrongRoute1Code, false)}
                        >
                            Code
                        </button>
                    </div>
                    {wrongRoute1Preview && (
                        <div className={`p-8  flex flex-wrap items-center gap-5 justify-center overflow-hidden`}>
                            <ProductFilterExample1/>
                        </div>
                    )}

                    {wrongRoute1Code && <BlocksShowCode code='
                    '/>
                    }
                </div>

                <BlocksFooter backUrl='/blocks/newsletter-form' backName='newsletter form'
                              forwardUrl='/blocks/empty-page' forwardName='empty page'/>
            </div>


            <Helmet>
                <title>Blocks - Product Details Page</title>
            </Helmet>
        </aside>
    );
};

export default Index;
