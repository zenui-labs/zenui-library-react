import {useState} from "react";

// components
import ContentHeader from "@shared/ContentHeader";
import {Helmet} from "react-helmet";
import BlockWrapper from "@shared/Block/BlockWrapper.tsx";
import BlockDescription from "@shared/Block/BlockDescription.tsx";
import BlockToggleTab from "@shared/Block/BlockToggleTab.tsx";
import BlocksShowCode from "@shared/Block/BlocksShowCode.tsx";
import BlocksFooter from "@shared/Block/BlocksFooter.tsx";
import ChatScreenWithReact from "@animations/Visuals/ChatScreen/ChatScreenWithReact.tsx";
import ChatScreenWithFileAttachment from "@animations/Visuals/ChatScreen/ChatScreenWithFileAttachment.tsx";
import {ChatWithReactionAndFileCodes, ChatWithReactionCodes} from "@animations/Visuals/ChatScreen/PreviewCodes.ts";

const Index = () => {
    const [googleLoginButtonPreview, setGoogleLoginButtonPreview] = useState(true);
    const [googleLoginButtonCode, setGoogleLoginButtonCode] = useState(false);


    return (
        <aside className="w-full 640px:pl-[2.5rem] px-6 640px:px-10">
            <div>
                <ContentHeader text={"chat screen with reaction system"} id={"chat-screen-with-reaction-system"}/>

                <BlockDescription
                    text='A real-time chat screen with an emoji reaction system for responding to individual messages.'/>

                <BlockToggleTab preview={googleLoginButtonPreview} setPreview={setGoogleLoginButtonPreview}
                                code={googleLoginButtonCode}
                                setCode={setGoogleLoginButtonCode}/>

                <BlockWrapper>
                    {googleLoginButtonPreview && (
                        <div className={`p-8 flex flex-wrap items-center gap-5 justify-center overflow-hidden`}>
                            <ChatScreenWithReact/>
                        </div>
                    )}

                    {googleLoginButtonCode && <BlocksShowCode code={ChatWithReactionCodes}/>
                    }
                </BlockWrapper>

                <div className='mt-8'>
                    <ContentHeader text={"chat screen with file select and batch processing"}
                                   id={"chat-screen-with-file-select-and-batch-processing"}/>
                </div>

                <BlockDescription
                    text='A chat screen that supports selecting files and processing them in batches, for sharing several files at once.'/>

                <BlockToggleTab preview={googleLoginButtonPreview} setPreview={setGoogleLoginButtonPreview}
                                code={googleLoginButtonCode}
                                setCode={setGoogleLoginButtonCode}/>

                <BlockWrapper>
                    {googleLoginButtonPreview && (
                        <div className={`p-8 flex flex-wrap items-center gap-5 justify-center overflow-hidden`}>
                            <ChatScreenWithFileAttachment/>
                        </div>
                    )}

                    {googleLoginButtonCode && <BlocksShowCode code={ChatWithReactionAndFileCodes}/>
                    }
                </BlockWrapper>

                <BlocksFooter backUrl='/animations/background-animations' backName='background animations'
                              forwardUrl='/animations/dropdown-animations' forwardName='dropdown animations'/>
            </div>

            <Helmet>
                <title>Visuals - Chat Screen</title>
            </Helmet>
        </aside>
    );
};

export default Index;
