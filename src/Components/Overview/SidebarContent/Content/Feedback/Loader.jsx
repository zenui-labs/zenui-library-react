import React, {useState} from "react";

// react helmet
import {Helmet} from "react-helmet";

// components
import ContentHeader from "@shared/ContentHeader";
import Showcode from "@shared/Component/ShowCode.jsx";
import OverviewFooter from "@shared/OverviewFooter";

// contents for scrollspy
import {loaderContents} from '@utils/ContentsConfig/FeedbackContents';
import {useScrollSpy} from '@/CustomHooks/useScrollSpy';

// icons
import {FiLoader} from "react-icons/fi";
import {TbLoader3} from "react-icons/tb";

import ComponentDescription from "@shared/Component/ComponentDescription.jsx";
import ToggleTab from "@shared/Component/ToggleTab.jsx";
import ComponentWrapper from "@shared/Component/ComponentWrapper.jsx";
import ContentNavbar from "@shared/Component/ContentNavbar.jsx";

const Loader = () => {
    const sectionIds = loaderContents.map(item => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    // circle loader
    const [circleLoaderPreview, setCircleLoaderPreview] = useState(true);
    const [circleLoaderCode, setCircleLoaderCode] = useState(false);

    // dashed Loader
    const [dashedLoaderPreview, setDashedLoaderPreview] = useState(true);
    const [dashedLoaderCode, setDashedLoaderCode] = useState(false);

    // dashed Loader
    const [opacityLoaderPreview, setOpacityLoaderPreview] = useState(true);
    const [opacityLoaderCode, setOpacityLoaderCode] = useState(false);

    // wave Loader
    const [waveLoaderPreview, setWaveLoaderPreview] = useState(true);
    const [waveLoaderCode, setWaveLoaderCode] = useState(false);

    // chase Loader
    const [chaseLoaderPreview, setChaseLoaderPreview] = useState(true);
    const [chaseLoaderCode, setChaseLoaderCode] = useState(false);

    // chase Loader
    const [dotLoaderPreview, setDotLoaderPreview] = useState(true);
    const [dotLoaderCode, setDotLoaderCode] = useState(false);

    // shape Loader
    const [shapeLoaderPreview, setShapeLoaderPreview] = useState(true);
    const [shapeLoaderCode, setShapeLoaderCode] = useState(false);

    // flip Loader
    const [flipLoaderPreview, setFlipLoaderPreview] = useState(true);
    const [flipLoaderCode, setFlipLoaderCode] = useState(false);

    const spinnerDivs = Array.from({length: 10}).map((_, index) => {
        const delay = (index + 1) * 0.1;
        const rotation = (index + 1) * 36;
        const translation = 150;

        return (
            <div
                key={index}
                className="absolute w-[50%] h-[140%] bg-primary"
                style={{
                    '--delay': delay,
                    '--rotation': rotation,
                    '--translation': translation,
                    transform: `rotate(calc(var(--rotation) * 1deg)) translate(0, calc(var(--translation) * 1%))`,
                    animation: `spinner-animation 1s calc(var(--delay) * 1s) infinite ease`
                }}
            ></div>
        );
    });

    const sharedStyle = {
        content: '""',
        width: '100%',
        height: '100%',
        display: 'block',
        border: '5.6px solid #3B9DF8',
        borderRadius: '50%',
        boxShadow: '0 -33.6px 0 -5.6px #3B9DF8',
        position: 'absolute',
        animation: 'spinner-rotate 1.25s infinite ease'
    };

    const items = Array.from({length: 9});

    return (
        <>
            <aside className="flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10">
                <div>
                    <ContentHeader id={"circle_loader"} text={"circle loader"}/>

                    <ComponentDescription
                        text='This is a circle loader component. Indicate loading status with a sleek, circular animation.'/>

                    <ToggleTab setCode={setCircleLoaderCode} code={circleLoaderCode} preview={circleLoaderPreview}
                               setPreview={setCircleLoaderPreview}/>

                    <ComponentWrapper>
                        {circleLoaderPreview && (
                            <div className="p-8 mb-4 flex items-center gap-12 justify-center">
                                <div
                                    className="w-10 h-10 animate-[spin_1s_linear_infinite] rounded-full border-4 border-r-primary border-[#3b9df84b]"></div>

                                <FiLoader className="text-[2.8rem] animate-spin text-primary"/>

                                <TbLoader3 className="text-[2.8rem] animate-spin text-primary"/>
                            </div>
                        )}

                        {circleLoaderCode && (
                            <Showcode
                                code='
// icons
import { FiLoader } from "react-icons/fi";
import { TbLoader3 } from "react-icons/tb";

const Loader = () => {
  return (
    <>
      <div className="w-10 h-10 animate-[spin_1s_linear_infinite] rounded-full border-4 border-r-[#3B9DF8] border-[#3b9df84b]"></div>

      <FiLoader className="text-[2.8rem] animate-spin text-[#3B9DF8]" />

      <TbLoader3 className="text-[2.8rem] animate-spin text-[#3B9DF8]" />
    </>
  );
};

export default Loader;
              '
                            />
                        )}
                    </ComponentWrapper>

                    <div className="mt-8">
                        <ContentHeader id={"dashed_loader"} text={"dashed loader"}/>
                    </div>

                    <ComponentDescription
                        text='This is a dashed loader component. Show loading progress with a dynamic, dashed-line animation.'/>

                    <ToggleTab setCode={setDashedLoaderCode} code={dashedLoaderCode} setPreview={setDashedLoaderPreview}
                               preview={dashedLoaderPreview}/>

                    <ComponentWrapper>
                        {dashedLoaderPreview && (
                            <div className="p-8 mb-4 flex items-center flex-col gap-5 justify-center">
                                <div
                                    className="w-10 h-10 animate-spin rounded-full border-dashed border-8 border-[#3b9df8]"></div>
                            </div>
                        )}

                        {dashedLoaderCode && (
                            <Showcode
                                code='
  <div className="w-10 h-10 animate-spin rounded-full border-dashed border-8 border-[#3b9df8]"></div>
              '
                            />
                        )}
                    </ComponentWrapper>

                    <div className="mt-8">
                        <ContentHeader id={"opacity_loader"} text={"opacity loader"}/>
                    </div>

                    <ComponentDescription text='This is an opacity loader component. Display loading status with a subtle opacity animation for sleek
            transitions.'/>

                    <ToggleTab setCode={setOpacityLoaderCode} code={opacityLoaderCode} preview={opacityLoaderPreview}
                               setPreview={setOpacityLoaderPreview}/>

                    <ComponentWrapper>
                        {opacityLoaderPreview && (
                            <div className="p-8 mb-4 flex items-center flex-col gap-5 justify-center">
                                <div
                                    className="w-7 h-7 animate-[ping_2s_linear_infinite] rounded-full border-2 border-[#3b9df8] flex items-center justify-center">
                                    <div
                                        className="w-5 h-5 animate-[ping_2s_linear_3s_infinite] rounded-full border-2 border-[#3b9df8]"></div>
                                </div>
                            </div>
                        )}

                        {opacityLoaderCode && (
                            <Showcode
                                code='
<div className="w-7 h-7 animate-[ping_2s_linear_infinite] rounded-full border-2 border-[#3b9df8] flex items-center justify-center">

<div className="w-5 h-5 animate-[ping_2s_linear_3s_infinite] rounded-full border-2 border-[#3b9df8]"></div>
              </div>
              '
                            />
                        )}
                    </ComponentWrapper>

                    <div className="mt-8">
                        <ContentHeader id={"wave_loader"} text={"wave loader"}/>
                    </div>

                    <ComponentDescription
                        text='This is a wave loader component. Show loading progress with a dynamic, wave-like animation.'/>

                    <ToggleTab setCode={setWaveLoaderCode} code={waveLoaderCode} setPreview={setWaveLoaderPreview}
                               preview={waveLoaderPreview}/>

                    <ComponentWrapper>
                        {waveLoaderPreview && (
                            <div className="p-8 mb-4 flex items-center flex-col gap-5 justify-center">
                                <div className='my-10'>
                                    <div className="absolute w-[9px] h-[9px]">
                                        {spinnerDivs}
                                        <style>
                                            {`
          @keyframes spinner-animation {
            0%, 10%, 20%, 30%, 50%, 60%, 70%, 80%, 90%, 100% {
              transform: rotate(calc(var(--rotation) * 1deg)) translate(0, calc(var(--translation) * 1%));
            }
            50% {
              transform: rotate(calc(var(--rotation) * 1deg)) translate(0, calc(var(--translation) * 1.5%));
            }
          }
        `}
                                        </style>
                                    </div>
                                </div>
                            </div>
                        )}

                        {waveLoaderCode && (
                            <Showcode
                                code="
import React from 'react';

const Loader = () => {
    const spinnerDivs = Array.from({ length: 10 }).map((_, index) => {
        const delay = (index + 1) * 0.1;
        const rotation = (index + 1) * 36;
        const translation = 150;

        return (
            <div key={index} className='absolute w-[50%] h-[140%] bg-primary'
                style={{
                    '--delay': delay,
              '--rotation': rotation,
              '--translation': translation,
              transform: `rotate(calc(var(--rotation) * 1deg)) translate(0, calc(var(--translation) * 1%))`,
              animation: `spinner-animation 1s calc(var(--delay) * 1s) infinite ease`}}
            ></div> );
          });


    return (
          <div className='absolute w-[9px] h-[9px]'>
            {spinnerDivs}
            <style>
              {`
                @keyframes spinner-animation {
                0%, 10%, 20%, 30%, 50%, 60%, 70%, 80%, 90%, 100% {
                transform: rotate(calc(var(--rotation) * 1deg)) translate(0, calc(var(--translation) * 1%));
               }
               50% {
                transform: rotate(calc(var(--rotation) * 1deg)) translate(0, calc(var(--translation) * 1.5%));
               }
              }
            `}
            </style>
          </div>
          );
          };

export default Loader;
          "
                            />
                        )}
                    </ComponentWrapper>

                    <div className="mt-8">
                        <ContentHeader id={"chase_loader"} text={"chase loader"}/>
                    </div>

                    <ComponentDescription
                        text='This is a chase animation loader component. Display loading progress with an engaging, sequential movement.'/>

                    <ToggleTab setCode={setChaseLoaderCode} code={chaseLoaderCode} preview={chaseLoaderPreview}
                               setPreview={setChaseLoaderPreview}/>

                    <ComponentWrapper>
                        {chaseLoaderPreview && (
                            <div className="p-8 mb-4 flex items-center flex-col gap-5 justify-center">
                                <div className='my-10'>
                                    <div className="relative w-[22.4px] h-[22.4px]">
                                        <div
                                            style={{
                                                ...sharedStyle,
                                                animation: 'spinner-b4c8mmmd 0.5s backwards, spinner-rotate 1.25s 0.5s infinite ease'
                                            }}
                                        ></div>
                                        <div
                                            style={{
                                                ...sharedStyle,
                                                animationDelay: '0s, 1.25s'
                                            }}
                                        ></div>
                                        <style>
                                            {`
          @keyframes spinner-b4c8mmmd {
            from {
              box-shadow: 0 0 0 -5.6px #474bff;
            }
          }

          @keyframes spinner-rotate {
            to {
              transform: rotate(360deg);
            }
          }
        `}
                                        </style>
                                    </div>
                                </div>
                            </div>
                        )}

                        {chaseLoaderCode && (
                            <Showcode
                                code="
import React from 'react';

const Loader = () => {
    const sharedStyle = {
        content: '',
        width: '100%',
        height: '100%',
        display: 'block',
        border: '5.6px solid #3B9DF8',
        borderRadius: '50%',
        boxShadow: '0 -33.6px 0 -5.6px #3B9DF8',
        position: 'absolute',
        animation: 'spinner-rotate 1.25s infinite ease'
    };

  return (
      <div className='relative w-[22.4px] h-[22.4px]'>
              <div
              style={{
              ...sharedStyle,
              animation: 'spinner-b4c8mmmd 0.5s backwards, spinner-rotate 1.25s 0.5s infinite ease'
            }}
              ></div>
              <div
              style={{
              ...sharedStyle,
              animationDelay: '0s, 1.25s'
            }}
          ></div>
          <style>
            {`
          @keyframes spinner-b4c8mmmd {
            from {
              box-shadow: 0 0 0 -5.6px #474bff;
            }
          }

          @keyframes spinner-rotate {
            to {
              transform: rotate(360deg);
            }
          }
        `}
          </style>
        </div>
        );};

export default Loader;
        "
                            />
                        )}
                    </ComponentWrapper>

                    <div className="mt-8">
                        <ContentHeader id={"dot_loader"} text={"dot loader"}/>
                    </div>

                    <ComponentDescription
                        text='This is a dot animation loader component. Show loading progress with rhythmic dot movement for visual feedback.'/>

                    <ToggleTab setCode={setDotLoaderCode} code={dotLoaderCode} setPreview={setDotLoaderPreview}
                               preview={dotLoaderPreview}/>

                    <ComponentWrapper>
                        {dotLoaderPreview && (
                            <div className="p-8 mb-4 flex items-center flex-col gap-5 justify-center">
                                <div className='my-10'>
                                    <div
                                        className="w-[56px] h-[56px]"
                                        style={{
                                            '--c': 'radial-gradient(farthest-side, #3B9DF8 92%, transparent)',
                                            background: `
          var(--c) 50% 0,
          var(--c) 50% 100%,
          var(--c) 100% 50%,
          var(--c) 0 50%
        `,
                                            backgroundSize: '13.4px 13.4px',
                                            backgroundRepeat: 'no-repeat',
                                            animation: 'spinner-kh173p 1s infinite'
                                        }}
                                    >
                                        <style>
                                            {`
          @keyframes spinner-kh173p {
            to {
              transform: rotate(0.5turn);
            }
          }
        `}
                                        </style>
                                    </div>
                                </div>
                            </div>
                        )}

                        {dotLoaderCode && (
                            <Showcode
                                code="
import React from 'react';

const Loader = () => {

  return (
          <div
              className='w-[56px] h-[56px]'
              style={{
              '--c': 'radial-gradient(farthest-side, #3B9DF8 92%, transparent)',
              background: `
                  var(--c) 50% 0,
                  var(--c) 50% 100%,
                  var(--c) 100% 50%,
                  var(--c) 0 50%
              `,
              backgroundSize: '13.4px 13.4px',
              backgroundRepeat: 'no-repeat',
              animation: 'spinner-kh173p 1s infinite'
            }}
              >
              <style>
            {`
          @keyframes spinner-kh173p {
            to {
              transform: rotate(0.5turn);
              }
            }
            `}
              </style>
              </div>
              )
              ;
            };

export default Loader;
            "
                            />
                        )}
                    </ComponentWrapper>

                    <div className="mt-8">
                        <ContentHeader id={"shape_loader"} text={"shape loader"}/>
                    </div>

                    <ComponentDescription
                        text='This is a shape animation loader component. Display loading progress with dynamic shape transformations for visual appeal.'/>

                    <ToggleTab setCode={setShapeLoaderCode} code={shapeLoaderCode} preview={shapeLoaderPreview}
                               setPreview={setShapeLoaderPreview}/>

                    <ComponentWrapper>
                        {shapeLoaderPreview && (
                            <div className="p-8 mb-4 flex items-center flex-col gap-5 justify-center">
                                <div className='my-10'>
                                    <div className="relative w-[44.8px] h-[44.8px] text-primary">
                                        <div
                                            className="absolute inset-0 rounded-full"
                                            style={{
                                                background: `
            radial-gradient(10.08px at bottom right, transparent 94%, currentColor) top left,
            radial-gradient(10.08px at bottom left, transparent 94%, currentColor) top right,
            radial-gradient(10.08px at top right, transparent 94%, currentColor) bottom left,
            radial-gradient(10.08px at top left, transparent 94%, currentColor) bottom right
          `,
                                                backgroundSize: '22.4px 22.4px',
                                                backgroundRepeat: 'no-repeat',
                                                animation: 'shapes-77ngqcmd 1.5s infinite cubic-bezier(0.3,1,0,1)'
                                            }}
                                        ></div>
                                        <style>
                                            {`
          @keyframes shapes-77ngqcmd {
            33% {
              inset: -11.2px;
              transform: rotate(0deg);
            }
            66% {
              inset: -11.2px;
              transform: rotate(90deg);
            }
            100% {
              inset: 0;
              transform: rotate(90deg);
            }
          }
        `}
                                        </style>
                                    </div>
                                </div>
                            </div>
                        )}

                        {shapeLoaderCode && (
                            <Showcode
                                code="
import React from 'react';

const Loader = () => {

  return (
      <div className='relative w-[44.8px] h-[44.8px] text-primary'>
              <div
              className='absolute inset-0 rounded-full'
              style={{
              background: `
                  radial-gradient(10.08px at bottom right, transparent 94%, currentColor) top left,
                  radial-gradient(10.08px at bottom left, transparent 94%, currentColor) top right,
                  radial-gradient(10.08px at top right, transparent 94%, currentColor) bottom left,
                  radial-gradient(10.08px at top left, transparent 94%, currentColor) bottom right
              `,
              backgroundSize: '22.4px 22.4px',
              backgroundRepeat: 'no-repeat',
              animation: 'shapes-77ngqcmd 1.5s infinite cubic-bezier(0.3,1,0,1)'
            }}
              ></div>
              <style>
            {`
          @keyframes shapes-77ngqcmd {
            33% {
              inset: -11.2px;
              transform: rotate(0deg);
            }
            66% {
              inset: -11.2px;
              transform: rotate(90deg);
            }
            100% {
              inset: 0;
              transform: rotate(90deg);
            }
          }
        `}
          </style>
        </div>
        ) ;
        };

export default Loader;
        "
                            />
                        )}
                    </ComponentWrapper>

                    <div className="mt-8">
                        <ContentHeader id={"flip_loader"} text={"flip loader"}/>
                    </div>

                    <ComponentDescription
                        text='This is a flip animation loader component. Showcase loading progress with engaging flip animations for visual interest.'/>

                    <ToggleTab setCode={setFlipLoaderCode} code={flipLoaderCode} setPreview={setFlipLoaderPreview}
                               preview={flipLoaderPreview}/>

                    <ComponentWrapper>
                        {flipLoaderPreview && (
                            <div className="p-8 mb-4 flex items-center flex-col gap-5 justify-center">
                                <div className='my-10'>
                                    <div className="grid grid-cols-3 grid-rows-3 w-[67.2px] h-[67.2px]">
                                        {items.map((_, index) => (
                                            <div
                                                key={index}
                                                className="bg-primary"
                                                style={{
                                                    animation: `flipping-18i5bq 1.5s ${index * 0.1}s infinite backwards`
                                                }}
                                            ></div>
                                        ))}
                                        <style>
                                            {`
          @keyframes flipping-18i5bq {
            0% {
              transform: perspective(67.2px) rotateX(-90deg);
            }
            50%, 75% {
              transform: perspective(67.2px) rotateX(0);
            }
            100% {
              opacity: 0;
              transform: perspective(67.2px) rotateX(0);
            }
          }
        `}
                                        </style>
                                    </div>
                                </div>
                            </div>
                        )}

                        {flipLoaderCode && (
                            <Showcode
                                code="
import React from 'react';

const Loader = () => {

    const items = Array.from({ length: 9 });

  return (
      <div className='grid grid-cols-3 grid-rows-3 w-[67.2px] h-[67.2px]'>
            {items.map((_, index) => (
              <div
              key={index}
            className='bg-primary'
            style={{
              animation: `flipping-18i5bq 1.5s ${index * 0.1}s infinite backwards`
            }}
          ></div>
          ))}
          <style>
            {`
          @keyframes flipping-18i5bq {
            0% {
              transform: perspective(67.2px) rotateX(-90deg);
            }
            50%, 75% {
              transform: perspective(67.2px) rotateX(0);
            }
            100% {
              opacity: 0;
              transform: perspective(67.2px) rotateX(0);
            }
          }
        `}
          </style>
        </div>
        ) ;
        };

export default Loader;
        "
                            />
                        )}
                    </ComponentWrapper>

                    <OverviewFooter backUrl='/components/testimonials' backName='testimonial' forwardName='notification'
                                    forwardUrl='/components/notification'/>
                </div>

                <ContentNavbar contents={loaderContents} activeSection={activeSection}/>

            </aside>
            <Helmet>
                <title>Feedback - Loader</title>
            </Helmet>
        </>
    );
};

export default Loader;
