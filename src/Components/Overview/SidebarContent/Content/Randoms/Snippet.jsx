import React, {useState} from 'react';

// components
import OverviewFooter from '@shared/OverviewFooter';
import ContentHeader from '@shared/ContentHeader';

// contents for scrollspy
import {snippetContents} from '@utils/ContentsConfig/RandomContent';
import {useScrollSpy} from '@/CustomHooks/useScrollSpy';

// react helmet
import {Helmet} from 'react-helmet';

// icons
import {MdOutlineDone} from 'react-icons/md';
import {GoCopy} from 'react-icons/go';

// showing the code
import Showcode from '@shared/Component/ShowCode.jsx';

import ComponentDescription from "@shared/Component/ComponentDescription.jsx";
import ToggleTab from "@shared/Component/ToggleTab.jsx";
import ComponentWrapper from "@shared/Component/ComponentWrapper.jsx";
import ContentNavbar from "@shared/Component/ContentNavbar.jsx";

const Snippet = () => {
    const sectionIds = snippetContents.map((item) => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    // Primary Snippet
    const [primarySnippetPreview, setPrimarySnippetPreview] = useState(true);
    const [primarySnippetCode, setPrimarySnippetCode] = useState(false);

    // Primary Snippet
    const [backgroundSnippetPreview, setBackgroundSnippetPreview] =
        useState(true);
    const [backgroundSnippetCode, setBackgroundSnippetCode] = useState(false);

    // border Snippet
    const [borderSnippetPreview, setBorderSnippetPreview] = useState(true);
    const [borderSnippetCode, setBorderSnippetCode] = useState(false);

    // border Snippet
    const [withoutIconSnippetPreview, setWithoutIconSnippetPreview] =
        useState(true);
    const [withoutIconSnippetCode, setWithoutIconSnippetCode] = useState(false);

    // actions
    const [isCopy, setIsCopy] = useState(false);
    const [backgroundSnippet, setBackgroundSnippet] = useState(false);
    const [border1, setBorder1] = useState(false);
    const [border2, setBorder2] = useState(false);
    const handlePrimaryCopy = (text, setState) => {
        setState(true);
        window.navigator.clipboard.writeText(text);
        setTimeout(() => {
            setState(false);
        }, 1000);
    };

    return (
        <>
            <aside className='flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10'>
                <div>
                    <ContentHeader text={'primary Snippet'} id={'primary_snippet'}/>

                    <ComponentDescription text='This is a primary code snippet component with a copy button for easy
            code duplication.'/>

                    <ToggleTab code={primarySnippetCode} setPreview={setPrimarySnippetPreview}
                               setCode={setPrimarySnippetCode} preview={primarySnippetPreview}/>

                    <ComponentWrapper>
                        {primarySnippetPreview && (
                            <div className='p-8 mb-4 flex items-center flex-col gap-5 justify-center'>
                                <div
                                    className='bg-[#d1d1d180] dark:bg-slate-800 dark:text-[#abc2d3] text-[#000000] rounded-md py-1 px-4 tracking-wider font-mono font-[500] flex items-center justify-between gap-4'>
                                    $ npm i @zenui
                                    <GoCopy
                                        onClick={() => handlePrimaryCopy('npm i @zenui', setIsCopy)}
                                        className={`${
                                            isCopy ? ' opacity-0 hidden' : ' opacity-100 flex'
                                        } transition-all duration-300 cursor-pointer`}
                                    />
                                    <MdOutlineDone
                                        className={`${
                                            isCopy ? ' opacity-100 flex' : ' opacity-0 hidden'
                                        } transition-all duration-300 cursor-pointer`}
                                    />
                                </div>
                            </div>
                        )}

                        {primarySnippetCode && (
                            <Showcode
                                code='
// icons
import { MdOutlineDone } from "react-icons/md";
import { GoCopy } from "react-icons/go";

const Snippet = () => {
  const [isCopy, setIsCopy] = useState(false);

  const handleCopy = (text) => {
    setIsCopy(true);
    window.navigator.clipboard.writeText(text);
    setTimeout(() => {
      setIsCopy(false);
    }, 1000);
  };
  return (
    <div className="bg-[#d1d1d180] dark:bg-slate-800 dark:text-[#abc2d3] text-[#000000] rounded-md py-1 px-4 tracking-wider font-mono font-[500] flex items-center justify-between gap-4">
      $ npm i @zenui
      <GoCopy
        onClick={() => handleCopy("npm i @zenui")}
        className={`${
          isCopy ? " opacity-0 hidden" : " opacity-100 flex"
        } transition-all duration-300 cursor-pointer`}
      />
      <MdOutlineDone
        className={`${
          isCopy ? " opacity-100 flex" : " opacity-0 hidden"
        } transition-all duration-300 cursor-pointer`}
      />
    </div>
  );
};

export default Snippet;
                '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader
                            text={'background Snippet'}
                            id={'background_snippet'}
                        />
                    </div>

                    <ComponentDescription text='This is a primary code snippet with background color and a copy
            button for convenient code sharing.'/>

                    <ToggleTab code={backgroundSnippetCode} setPreview={setBackgroundSnippetPreview}
                               setCode={setBackgroundSnippetCode} preview={backgroundSnippetPreview}/>

                    <ComponentWrapper>
                        {backgroundSnippetPreview && (
                            <div className='p-8 mb-4 flex items-center flex-col gap-5 justify-center'>
                                <div
                                    className='bg-primary text-[#fff] rounded-md py-1 px-4 tracking-wider font-mono font-[500] flex items-center justify-between gap-4'>
                                    $ npm i @zenui
                                    <GoCopy
                                        onClick={() =>
                                            handlePrimaryCopy('npm i @zenui', setBackgroundSnippet)
                                        }
                                        className={`${
                                            backgroundSnippet
                                                ? ' opacity-0 hidden'
                                                : ' opacity-100 flex'
                                        } transition-all duration-300 cursor-pointer`}
                                    />
                                    <MdOutlineDone
                                        className={`${
                                            backgroundSnippet
                                                ? ' opacity-100 flex'
                                                : ' opacity-0 hidden'
                                        } transition-all duration-300 cursor-pointer`}
                                    />
                                </div>
                            </div>
                        )}

                        {backgroundSnippetCode && (
                            <Showcode
                                code='
// icons
import { MdOutlineDone } from "react-icons/md";
import { GoCopy } from "react-icons/go";

const Snippet = () => {
  const [isCopy, setIsCopy] = useState(false);

  const handleCopy = (text) => {
    setIsCopy(true);
    window.navigator.clipboard.writeText(text);
    setTimeout(() => {
      setIsCopy(false);
    }, 1000);
  };
  return (
    <div className="bg-[#3B9DF8] text-[#fff] rounded-md py-1 px-4 tracking-wider font-mono font-[500] flex items-center justify-between gap-4">
      $ npm i @zenui
      <GoCopy
        onClick={() => handleCopy("npm i @zenui")}
        className={`${
          isCopy ? " opacity-0 hidden" : " opacity-100 flex"
        } transition-all duration-300 cursor-pointer`}
      />
      <MdOutlineDone
        className={`${
          isCopy ? " opacity-100 flex" : " opacity-0 hidden"
        } transition-all duration-300 cursor-pointer`}
      />
    </div>
  );
};

export default Snippet;
                '
                            />
                        )}
                    </ComponentWrapper>

                    <div class='mt-8'>
                        <ContentHeader text={'Bordered Snippet'} id={'bordered_snippet'}/>
                    </div>

                    <ComponentDescription text='This is a primary code snippet with border color and a copy button
            for efficient code sharing and reuse.'/>

                    <ToggleTab code={borderSnippetCode} setPreview={setBorderSnippetPreview}
                               setCode={setBorderSnippetCode} preview={borderSnippetPreview}/>

                    <ComponentWrapper>
                        {borderSnippetPreview && (
                            <div className='p-8 mb-4 flex items-center flex-col gap-5 justify-center'>
                                <div
                                    className='border border-primary dark:border-blue-800 text-primary rounded-md py-1 px-4 tracking-wider font-mono font-[500] flex items-center justify-between gap-4'>
                                    $ npm i @zenui
                                    <GoCopy
                                        onClick={() =>
                                            handlePrimaryCopy('npm i @zenui', setBorder1)
                                        }
                                        className={`${
                                            border1 ? ' opacity-0 hidden' : ' opacity-100 flex'
                                        } transition-all duration-300 cursor-pointer`}
                                    />
                                    <MdOutlineDone
                                        className={`${
                                            border1 ? ' opacity-100 flex' : ' opacity-0 hidden'
                                        } transition-all duration-300 cursor-pointer`}
                                    />
                                </div>

                                <div
                                    className='border border-border dark:border-slate-700 dark:text-[#abc2d3] text-text rounded-md py-1 px-4 tracking-wider font-mono font-[500] flex items-center justify-between gap-4'>
                                    $ npm i @zenui
                                    <GoCopy
                                        onClick={() =>
                                            handlePrimaryCopy('npm i @zenui', setBorder2)
                                        }
                                        className={`${
                                            border2 ? ' opacity-0 hidden' : ' opacity-100 flex'
                                        } transition-all duration-300 cursor-pointer`}
                                    />
                                    <MdOutlineDone
                                        className={`${
                                            border2 ? ' opacity-100 flex' : ' opacity-0 hidden'
                                        } transition-all duration-300 cursor-pointer`}
                                    />
                                </div>
                            </div>
                        )}

                        {borderSnippetCode && (
                            <Showcode
                                code='
// icons
import { MdOutlineDone } from "react-icons/md";
import { GoCopy } from "react-icons/go";

const Snippet = () => {
  const [isCopy1, setIsCopy1] = useState(false);
  const [isCopy2, setIsCopy2] = useState(false);

  const handleCopy = (text, setState) => {
    setState(true);
    window.navigator.clipboard.writeText(text);
    setTimeout(() => {
      setState(false);
    }, 1000);
  };
  return (
    <>
      <div className="border border-[#3B9DF8] dark:border-blue-800 text-[#3B9DF8] rounded-md py-1 px-4 tracking-wider font-mono font-[500] flex items-center justify-between gap-4">
        $ npm i @zenui
        <GoCopy
          onClick={() => handleCopy("npm i @zenui", setIsCopy1)}
          className={`${
            isCopy1 ? " opacity-0 hidden" : " opacity-100 flex"
          } transition-all duration-300 cursor-pointer`}
        />
        <MdOutlineDone
          className={`${
            isCopy1 ? " opacity-100 flex" : " opacity-0 hidden"
          } transition-all duration-300 cursor-pointer`}
        />
      </div>

      <div className="border border-[#e5eaf2] dark:border-slate-700 dark:text-[#abc2d3] text-[#424242] rounded-md py-1 px-4 tracking-wider font-mono font-[500] flex items-center justify-between gap-4">
        $ npm i @zenui
        <GoCopy
          onClick={() => handleCopy("npm i @zenui", setIsCopy2)}
          className={`${
            isCopy2 ? " opacity-0 hidden" : " opacity-100 flex"
          } transition-all duration-300 cursor-pointer`}
        />
        <MdOutlineDone
          className={`${
            isCopy2 ? " opacity-100 flex" : " opacity-0 hidden"
          } transition-all duration-300 cursor-pointer`}
        />
      </div>
    </>
  );
};

export default Snippet;
                '
                            />
                        )}
                    </ComponentWrapper>

                    <div className='mt-8'>
                        <ContentHeader
                            text={'without icon Snippet'}
                            id={'without_icon_snippet'}
                        />
                    </div>

                    <ComponentDescription text='This is a primary code snippet with a gray background for clear code
            display without a copy button.'/>

                    <ToggleTab code={withoutIconSnippetCode} setPreview={setWithoutIconSnippetPreview}
                               setCode={setWithoutIconSnippetCode} preview={withoutIconSnippetPreview}/>

                    <ComponentWrapper>
                        {withoutIconSnippetPreview && (
                            <div className='p-8 mb-4 flex items-center flex-col gap-5 justify-center'>
                                <div
                                    className='bg-[#d1d1d180] text-[#000] dark:bg-slate-800 dark:text-[#abc2d3] rounded-md py-1 px-4 tracking-wider font-mono font-[500] flex items-center justify-between gap-4'>
                                    $ npm i @zenui
                                </div>
                            </div>
                        )}

                        {withoutIconSnippetCode && (
                            <Showcode
                                code='
<div className="bg-[#d1d1d180] text-[#000] dark:bg-slate-800 dark:text-[#abc2d3] rounded-md py-1 px-4 tracking-wider font-mono font-[500] flex items-center justify-between gap-4">
   $ npm i @zenui
</div>
                '
                            />
                        )}
                    </ComponentWrapper>

                    <OverviewFooter
                        backUrl='/components/code'
                        backName='code'
                        forwardName='all blocks'
                        forwardUrl='/blocks/all-blocks'
                    />
                </div>

                <ContentNavbar activeSection={activeSection} contents={snippetContents}/>

            </aside>
            <Helmet>
                <title>Randoms - Snippet</title>
            </Helmet>
        </>
    );
};

export default Snippet;
