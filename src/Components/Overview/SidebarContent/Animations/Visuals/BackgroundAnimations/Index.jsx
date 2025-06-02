import React, {useState} from "react";

// components
import ContentHeader from "@shared/ContentHeader";
import {Helmet} from "react-helmet";
import BlockWrapper from "@shared/Block/BlockWrapper.jsx";
import BlockDescription from "@shared/Block/BlockDescription.jsx";
import BlockToggleTab from "@shared/Block/BlockToggleTab.jsx";
import BlocksShowCode from "@shared/Block/BlocksShowCode.jsx";
import BlocksFooter from "@shared/Block/BlocksFooter.jsx";
import MagneticFieldExample
    from "@/Components/Overview/SidebarContent/Animations/Visuals/BackgroundAnimations/MagneticFieldExample.jsx";
import CircuitBoardExample
    from "@/Components/Overview/SidebarContent/Animations/Visuals/BackgroundAnimations/CircuitBoardExample.jsx";
import StringArtExample
    from "@/Components/Overview/SidebarContent/Animations/Visuals/BackgroundAnimations/StringArtExample.jsx";
import GridDistortionExample
    from "@/Components/Overview/SidebarContent/Animations/Visuals/BackgroundAnimations/GridDistortionExample.jsx";
import StarfieldWarpExample
    from "@/Components/Overview/SidebarContent/Animations/Visuals/BackgroundAnimations/StarfieldWarpExample.jsx";
import {
    CircuitBoardCodes,
    GridDistroyCodes,
    MagneticFieldCodes,
    StarFieldWrapCodes, StringArtCodes
} from "@animations/Visuals/BackgroundAnimations/PreviewCodes.js";
import WarningMessageCard from "@shared/Component/WarningMessageCard.jsx";

const Index = () => {

    const [gridDistortionPreview, setGridDistortionPreview] = useState(true);
    const [gridDistortionCode, setGridDistortionCode] = useState(false);

    const [starFieldWrapPreview, setStarFieldWarpPreview] = useState(true);
    const [starFieldWarpCode, setStarFieldWarpCode] = useState(false);

    const [magneticFieldPreview, setMagneticFieldPreview] = useState(true);
    const [magneticFieldCode, setMagneticFieldCode] = useState(false);

    const [circuitBoardPreview, setCircuitBoardPreview] = useState(true);
    const [circuitBoardCode, setCircuitBoardCode] = useState(false);

    const [stringArtPreview, setStringArtPreview] = useState(true);
    const [stringArtCode, setStringArtCode] = useState(false);

    return (
        <aside className="w-full 640px:pl-[2.5rem] px-6 640px:px-10">

            <WarningMessageCard
                text="Reminder: Don’t forget to set a z-index on your child wrapper element. We recommend using a minimum value of 10 to ensure proper layering and avoid stacking issues."
                width={100}/>

            <div>
                <ContentHeader text={"Grid Distortion"} id={"grid-distortion"}/>

                <BlockDescription
                    text='Grid distortion animation with smooth, dynamic waves creating a futuristic digital mesh effect.'/>

                <BlockToggleTab preview={gridDistortionPreview} setPreview={setGridDistortionPreview}
                                code={gridDistortionCode}
                                setCode={setGridDistortionCode}/>

                <BlockWrapper>
                    {gridDistortionPreview && (
                        <div className={`p-8 flex flex-wrap items-center gap-5 justify-center overflow-hidden`}>
                            <GridDistortionExample/>
                        </div>
                    )}

                    {gridDistortionCode && <BlocksShowCode code={GridDistroyCodes}/>
                    }
                </BlockWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"Starfield Warp"} id={"starfield-warp"}/>
                </div>

                <BlockDescription
                    text='Starfield warp animation simulating stars streaking by at lightspeed for a deep space travel effect.'/>

                <BlockToggleTab preview={starFieldWrapPreview} setPreview={setStarFieldWarpPreview}
                                code={starFieldWarpCode}
                                setCode={setStarFieldWarpCode}/>

                <BlockWrapper>
                    {starFieldWrapPreview && (
                        <div className={`p-8 flex flex-wrap items-center gap-5 justify-center overflow-hidden`}>
                            <StarfieldWarpExample/>
                        </div>
                    )}

                    {starFieldWarpCode && <BlocksShowCode code={StarFieldWrapCodes}/>
                    }
                </BlockWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"Magnetic Field"} id={"magnetic-field"}/>
                </div>

                <BlockDescription
                    text='Magnetic field animation with flowing lines and pulses mimicking electromagnetic waves in motion.'/>

                <BlockToggleTab preview={magneticFieldPreview} setPreview={setMagneticFieldPreview}
                                code={magneticFieldCode}
                                setCode={setMagneticFieldCode}/>

                <BlockWrapper>
                    {magneticFieldPreview && (
                        <div className={`p-8 flex flex-wrap items-center gap-5 justify-center overflow-hidden`}>
                            <MagneticFieldExample/>
                        </div>
                    )}

                    {magneticFieldCode && <BlocksShowCode code={MagneticFieldCodes}/>
                    }
                </BlockWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"Circuit Board"} id={"circuit-board"}/>
                </div>

                <BlockDescription
                    text='Circuit board animation with glowing paths and pulses simulating data flow through electronic circuits.'/>

                <BlockToggleTab preview={circuitBoardPreview} setPreview={setCircuitBoardPreview}
                                code={circuitBoardCode}
                                setCode={setCircuitBoardCode}/>

                <BlockWrapper>
                    {circuitBoardPreview && (
                        <div className={`p-8 flex flex-wrap items-center gap-5 justify-center overflow-hidden`}>
                            <CircuitBoardExample/>
                        </div>
                    )}

                    {circuitBoardCode && <BlocksShowCode code={CircuitBoardCodes}/>
                    }
                </BlockWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"String Art"} id={"string-art"}/>
                </div>

                <BlockDescription
                    text='String art animation with dynamic threads forming geometric patterns in a mesmerizing loop.'/>

                <BlockToggleTab preview={stringArtPreview} setPreview={setStringArtPreview}
                                code={stringArtCode}
                                setCode={setStringArtCode}/>

                <BlockWrapper>
                    {stringArtPreview && (
                        <div className={`p-8 flex flex-wrap items-center gap-5 justify-center overflow-hidden`}>
                            <StringArtExample/>
                        </div>
                    )}

                    {stringArtCode && <BlocksShowCode code={StringArtCodes}/>
                    }
                </BlockWrapper>

                <BlocksFooter backUrl='/animations/text-effects' backName='text effects'
                              forwardUrl='/animations/chat-screen' forwardName='chat screen'/>
            </div>

            <Helmet>
                <title>Visuals - Background Animations</title>
            </Helmet>
        </aside>
    );
};

export default Index;
