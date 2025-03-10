import React, { useRef, useState } from 'react';

// react helmet
import { Helmet } from 'react-helmet';

// components
import ContentHeader from '../../../../../Shared/ContentHeader';
import Showcode from '../../../../../Shared/Component/ShowCode.jsx';
import OverviewFooter from '../../../../../Shared/OverviewFooter';

// contents for scrollspy
import { animatedCardsContents } from '../../../../../Utils/ContentsConfig/SurfacesContents.js';
import { useScrollSpy } from '../../../../../CustomHooks/useScrollSpy';

// icons
import { FaArrowRightLong, FaXTwitter } from 'react-icons/fa6';
import { ImFacebook2 } from 'react-icons/im';
import { FaDribbble, FaRegHeart } from 'react-icons/fa';
import { MdOutlineTimer } from 'react-icons/md';

import ComponentDescription from "../../../../../Shared/Component/ComponentDescription.jsx";
import ToggleTab from "../../../../../Shared/Component/ToggleTab.jsx";
import ComponentWrapper from "../../../../../Shared/Component/ComponentWrapper.jsx";
import ContentNavbar from "../../../../../Shared/Component/ContentNavbar.jsx";

const AnimatedCards = () => {
  const sectionIds = animatedCardsContents.map((item) => item.href.slice(1));
  const activeSection = useScrollSpy(sectionIds);

  const [hovered, setHovered] = useState(null);

  const [isHovering, setIsHovering] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  // actions
  const [animatedCard1Preview, setAnimatedCard1Preview] = useState(true);
  const [animatedCard1Code, setAnimatedCard1Code] = useState(false);

  const [animatedCard2Preview, setAnimatedCard2Preview] = useState(true);
  const [animatedCard2Code, setAnimatedCard2Code] = useState(false);

  const [animatedCard3Preview, setAnimatedCard3Preview] = useState(true);
  const [animatedCard3Code, setAnimatedCard3Code] = useState(false);

  const [animatedCard4Preview, setAnimatedCard4Preview] = useState(true);
  const [animatedCard4Code, setAnimatedCard4Code] = useState(false);

  const [animatedCard5Preview, setAnimatedCard5Preview] = useState(true);
  const [animatedCard5Code, setAnimatedCard5Code] = useState(false);

  const [animatedCard6Preview, setAnimatedCard6Preview] = useState(true);
  const [animatedCard6Code, setAnimatedCard6Code] = useState(false);

  const [animatedCard7Preview, setAnimatedCard7Preview] = useState(true);
  const [animatedCard7Code, setAnimatedCard7Code] = useState(false);

  const [animatedCard8Preview, setAnimatedCard8Preview] = useState(true);
  const [animatedCard8Code, setAnimatedCard8Code] = useState(false);

  const [animatedCard9Preview, setAnimatedCard9Preview] = useState(true);
  const [animatedCard9Code, setAnimatedCard9Code] = useState(false);

  const [animatedCard10Preview, setAnimatedCard10Preview] = useState(true);
  const [animatedCard10Code, setAnimatedCard10Code] = useState(false);

  const [animatedCard11Preview, setAnimatedCard11Preview] = useState(true);
  const [animatedCard11Code, setAnimatedCard11Code] = useState(false);

  return (
    <>
      <aside className='flex items-start justify-between gap-6 w-full 640px:pl-[2.5rem] px-6 640px:px-10'>
        <div className='w-full 425px:w-[80%]'>
          <ContentHeader
            id='hover-animated-card-1'
            text={'hover animated card 1'}
          />

          <ComponentDescription text='This is a hover-animated card. Hover to reveal dynamic effects and
            animations.'/>

          <ToggleTab code={animatedCard1Code} setPreview={setAnimatedCard1Preview} setCode={setAnimatedCard1Code} preview={animatedCard1Preview}/>

          <ComponentWrapper>
            {animatedCard1Preview && (
                <div className='p-8 mb-4 flex items-center flex-col gap-5 justify-center'>
                  <div className='w-full 640px:w-[80%] 1024px:w-[60%] h-[350px] relative overflow-hidden group cursor-pointer rounded-md'>
                    {/*  image  */}
                    <img
                        src='https://img.freepik.com/free-photo/close-up-adorable-kitten-couch_23-2150782439.jpg?t=st=1728056952~exp=1728060552~hmac=6c6249502066e36b15e7d040c623af0bc46dd1dbda0274440f8a8de2b85288ca&w=360'
                        alt='animated_card'
                        className='w-full h-full object-cover group-hover:scale-[1.1] transition-all duration-700'
                    />

                    {/*  text  */}
                    <div className='absolute top-[50%] transform group-hover:translate-y-[-50%] transition-all duration-500 w-full h-full left-0 z-20 right-0 flex items-center justify-center flex-col'>
                      <h1 className='text-[1.5rem] font-bold text-white text-center capitalize'>
                        domestic cat
                      </h1>
                      <p className='text-center z-[1-] opacity-0 group-hover:z-20 group-hover:opacity-100 transition-all duration-700 text-white text-[0.9rem]'>
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry.
                      </p>
                      <button className='bg-gray-400 z-[1-] opacity-0 group-hover:z-20 group-hover:opacity-100 px-3 py-2 mt-3 hover:bg-gray-500 transition-all duration-1000 text-white rounded-md text-[0.9rem]'>
                        View Details
                      </button>
                    </div>

                    {/*  bottom shadow  */}
                    <div className='w-full opacity-0 z-[-1] group-hover:opacity-100 group-hover:z-10 transition-all duration-500 bg-gradient-to-b from-[rgb(0,0,0,0.001)] to-[rgb(0,0,0,0.5)] h-[100%] absolute bottom-0 left-0 right-0'></div>
                  </div>
                </div>
            )}

            {animatedCard1Code && (
                <Showcode
                    code='
        <div
            className="w-full sm:w-[80%] lg:w-[60%] h-[350px] relative overflow-hidden group cursor-pointer rounded-md">

            {/*  image  */}
            <img
                src="https://img.freepik.com/free-photo/close-up-adorable-kitten-couch_23-2150782439.jpg?t=st=1728056952~exp=1728060552~hmac=6c6249502066e36b15e7d040c623af0bc46dd1dbda0274440f8a8de2b85288ca&w=360"
                alt="animated_card"
                className="w-full h-full object-cover group-hover:scale-[1.1] transition-all duration-700"/>

            {/*  text  */}
            <div
                className="absolute top-[50%] transform group-hover:translate-y-[-50%] transition-all duration-500 w-full h-full left-0 z-20 right-0 flex items-center justify-center flex-col">
                <h1 className="text-[1.5rem] font-bold text-white text-center capitalize">domestic
                    cat</h1>
                <p className="text-center z-[1-] opacity-0 group-hover:z-20 group-hover:opacity-100 transition-all duration-700 text-white text-[0.9rem]">Lorem
                    Ipsum is simply dummy text of the printing and typesetting
                    industry.</p>
                <button
                    className="bg-gray-400 z-[1-] opacity-0 group-hover:z-20 group-hover:opacity-100 px-3 py-2 mt-3 hover:bg-gray-500 transition-all duration-1000 text-white rounded-md text-[0.9rem]">View
                    Details
                </button>
            </div>

            {/*  bottom shadow  */}
            <div
                className="w-full opacity-0 z-[-1] group-hover:opacity-100 group-hover:z-10 transition-all duration-500 bg-gradient-to-b from-[rgb(0,0,0,0.001)] to-[rgb(0,0,0,0.5)] h-[100%] absolute bottom-0 left-0 right-0"></div>
        </div>
                                '
                />
            )}
          </ComponentWrapper>

          <div className='mt-8'>
            <ContentHeader
              id='hover-animated-card-2'
              text={'hover animated card 2'}
            />
          </div>

          <ComponentDescription text='This is a hover-animated card. Hover to reveal dynamic effects and
            animations.'/>

          <ToggleTab code={animatedCard2Code} preview={animatedCard2Preview} setCode={setAnimatedCard2Code} setPreview={setAnimatedCard2Preview}/>

          <ComponentWrapper>
            {animatedCard2Preview && (
                <div className='p-8 mb-4 flex items-center flex-col gap-5 justify-center'>
                  <div className='w-full dark:bg-slate-800 640px:w-[90%] 1024px:w-[70%] bg-[#f2f8f9] px-[20px] py-[30px] relative overflow-hidden group cursor-pointer rounded-md before:bg-[#00838d] before:w-[38px] before:h-[38px] before:absolute before:top-0 before:right-0 before:rounded-bl-[35px] before:z-[-1] hover:before:scale-[38] before:transition-all before:ease-out before:duration-[300ms] z-[0]'>
                    {/*  arrow icon  */}
                    <FaArrowRightLong className='absolute top-2 z-20 right-2 text-[1rem] text-white' />

                    {/*  text  */}
                    <h3 className='text-[1.5rem] dark:text-[#abc2d3] font-bold transition-all duration-500 group-hover:text-white ease-out'>
                      ZenUI Library
                    </h3>
                    <p className='text-[0.9rem] dark:text-[#abc2d3] text-gray-500 transition-all ease-out duration-500 mt-1 group-hover:text-white'>
                      ZenUI Library is an Tailwind CSS components library for any
                      needs. Comes with UI examples & blocks, templates, Icons,
                      Color Palette and more.
                    </p>
                  </div>
                </div>
            )}

            {animatedCard2Code && (
                <Showcode
                    code='
import React from "react";

// react icons
import {FaArrowRightLong} from "react-icons/fa6";

const AnimatedCard = () => {

    return (
        <div
            className="w-full dark:bg-slate-800 sm:w-[90%] md:w-[70%] bg-[#f2f8f9] px-[20px] py-[30px] relative overflow-hidden group cursor-pointer rounded-md before:bg-[#00838d] before:w-[38px] before:h-[38px] before:absolute before:top-0 before:right-0 before:rounded-bl-[35px] before:z-[-1] hover:before:scale-[38] before:transition-all before:ease-out before:duration-[300ms] z-[0]">

            {/*  arrow icon  */}
            <FaArrowRightLong className="absolute top-2 z-20 right-2 text-[1rem] text-white"/>

            {/*  text  */}
            <h3 className="text-[1.5rem] dark:text-[#abc2d3] font-bold transition-all duration-500 group-hover:text-white ease-out">
                ZenUI Library
            </h3>
            <p className="text-[0.9rem] dark:text-[#abc2d3] text-gray-500 transition-all ease-out duration-500 mt-1 group-hover:text-white">
                ZenUI Library is an Tailwind CSS components library for any
                needs. Comes with UI examples & blocks, templates, Icons,
                Color Palette and more.
            </p>
        </div>
    );
};

export default AnimatedCard;
                    '
                />
            )}
          </ComponentWrapper>

          <div className='mt-8'>
            <ContentHeader
              id='hover-animated-card-3'
              text={'hover animated card 3'}
            />
          </div>

          <ComponentDescription text='This is a hover-animated card. Hover to reveal dynamic effects and
            animations.'/>

          <ToggleTab code={animatedCard3Code} setPreview={setAnimatedCard3Preview} setCode={setAnimatedCard3Code} preview={animatedCard3Preview}/>

          <ComponentWrapper>
            {animatedCard3Preview && (
                <div className='p-8 mb-4 flex items-center flex-col gap-5 justify-center'>
                  <div className='w-full 640px:w-[80%] 1024px:w-[60%] rounded-md relative group overflow-hidden'>
                    {/*  image  */}
                    <img
                        src='https://img.freepik.com/free-photo/indoor-picture-cheerful-handsome-young-man-having-folded-hands-looking-directly-smiling-sincerely-wearing-casual-clothes_176532-10257.jpg?t=st=1728139729~exp=1728143329~hmac=dd0870841ecbe138afdb639fee17206241a94b02b17e1e681ad16eba38f0bd7b&w=996'
                        alt='animated_cards'
                        className='w-full h-[350px] object-cover'
                    />

                    {/*  texts  */}
                    <div className='flex flex-col items-center justify-center backdrop-blur-md text-white absolute bottom-0 w-full pt-[15px] pb-[30px] translate-y-[200px] group-hover:translate-y-0 transition-all duration-[400ms] overflow-hidden'>
                      <h3 className='text-[1.7rem] translate-y-[-50px] group-hover:translate-y-0 transition-all duration-700 font-bold tracking-[5px] leading-[30px] opacity-0 group-hover:opacity-100'>
                        Jack Leo
                      </h3>
                      <p className='text-[1rem] translate-y-[100px] group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100'>
                        Product Designer
                      </p>

                      {/*  socials icons  */}
                      <div className='flex items-center gap-[20px] mt-[15px]'>
                        <div className='translate-y-[100px] group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100'>
                          <ImFacebook2 className='text-[1.3rem] text-white cursor-pointer hover:scale-[1.3] transition-all duration-200' />
                        </div>
                        <div className='translate-y-[100px] group-hover:translate-y-0 transition-all duration-[800ms] opacity-0 group-hover:opacity-100'>
                          <FaXTwitter className='text-[1.3rem] text-white cursor-pointer hover:scale-[1.3] transition-all duration-200' />
                        </div>
                        <div className='translate-y-[100px] group-hover:translate-y-0 transition-all duration-[1100ms] opacity-0 group-hover:opacity-100'>
                          <FaDribbble className='text-[1.3rem] text-white cursor-pointer hover:scale-[1.3] transition-all duration-200' />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            )}

            {animatedCard3Code && (
                <Showcode
                    code='
import React from "react";

// react icons
import {FaXTwitter} from "react-icons/fa6";
import {ImFacebook2} from "react-icons/im";
import {FaDribbble} from "react-icons/fa";

const AnimatedHoverCard = () => {

    return (
        <div
            className="w-full sm:w-[80%] lg:w-[60%] rounded-md relative group overflow-hidden">

            {/*  image  */}
            <img
                src="https://img.freepik.com/free-photo/indoor-picture-cheerful-handsome-young-man-having-folded-hands-looking-directly-smiling-sincerely-wearing-casual-clothes_176532-10257.jpg?t=st=1728139729~exp=1728143329~hmac=dd0870841ecbe138afdb639fee17206241a94b02b17e1e681ad16eba38f0bd7b&w=996"
                alt="animated_cards" className="w-full h-[350px] object-cover"/>

            {/*  texts  */}
            <div
                className="flex flex-col items-center justify-center backdrop-blur-md text-white absolute bottom-0 w-full pt-[15px] pb-[30px] translate-y-[200px] group-hover:translate-y-0 transition-all duration-[400ms] overflow-hidden">
                <h3 className="text-[1.7rem] translate-y-[-50px] group-hover:translate-y-0 transition-all duration-700 font-bold tracking-[5px] leading-[30px] opacity-0 group-hover:opacity-100">Jack
                    Leo</h3>
                <p className="text-[1rem] translate-y-[100px] group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100">Product
                    Designer</p>

                {/*  socials icons  */}
                <div className="flex items-center gap-[20px] mt-[15px]">
                    <div
                        className="translate-y-[100px] group-hover:translate-y-0 transition-all duration-500 opacity-0 group-hover:opacity-100">
                        <ImFacebook2
                            className="text-[1.3rem] text-white cursor-pointer hover:scale-[1.3] transition-all duration-200"/>
                    </div>
                    <div
                        className="translate-y-[100px] group-hover:translate-y-0 transition-all duration-[800ms] opacity-0 group-hover:opacity-100">
                        <FaXTwitter
                            className="text-[1.3rem] text-white cursor-pointer hover:scale-[1.3] transition-all duration-200"/>
                    </div>
                    <div
                        className="translate-y-[100px] group-hover:translate-y-0 transition-all duration-[1100ms] opacity-0 group-hover:opacity-100">
                        <FaDribbble
                            className="text-[1.3rem] text-white cursor-pointer hover:scale-[1.3] transition-all duration-200"/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnimatedHoverCard;
              '
                />
            )}
          </ComponentWrapper>

          <div className='mt-8'>
            <ContentHeader
              id='hover-animated-card-4'
              text={'hover animated card 4'}
            />
          </div>

          <ComponentDescription text='This is a hover-animated card. Hover to reveal dynamic effects and
            animations.'/>

          <ToggleTab code={animatedCard11Code} setCode={setAnimatedCard11Code} preview={animatedCard11Preview} setPreview={setAnimatedCard11Preview}/>

          <ComponentWrapper>
            {animatedCard11Preview && (
                <div className='p-8 mb-4 flex items-center flex-col gap-5 justify-center'>
                  <div
                      onMouseMove={handleMouseMove}
                      onMouseEnter={() => setIsHovering(true)}
                      onMouseLeave={() => setIsHovering(false)}
                      ref={cardRef}
                      className='w-full border dark:border-slate-700 relative overflow-hidden border-gray-200 rounded-lg p-[25px] cursor-pointer'
                  >
                    <h2 className='text-[1.5rem] font-bold text-[#DB06F9]'>
                      Web Developer
                    </h2>
                    <p className='text-gray-600 dark:text-[#abc2d3] text-[1rem] mt-2'>
                      A web developer builds and maintains websites, ensuring they
                      are functional, user-friendly, and visually appealing. They
                      use coding languages like HTML, CSS, and JavaScript to bring
                      designs to life and create seamless online experiences.
                    </p>

                    <img
                        src='https://i.ibb.co.com/Gx5pzCs/Programmer-working-remotely-with-cat-by-his-side.png'
                        alt='animated_card'
                        className='w-[140px] mt-3 float-right'
                    />

                    {isHovering && (
                        <div
                            className='absolute inset-0 pointer-events-none blur-[50px]'
                            style={{
                              background: `radial-gradient(circle 50px at ${mousePosition.x}px ${mousePosition.y}px, #DB06F9, transparent)`,
                            }}
                        />
                    )}
                  </div>
                </div>
            )}

            {animatedCard11Code && (
                <Showcode
                    code='
import React, {useRef, useState} from "react";

const AnimatedCard = () => {

    const [isHovering, setIsHovering] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        if (cardRef.current) {
            const rect = cardRef.current.getBoundingClientRect();
            setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            });
        }
    };

    return (
        <div
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            ref={cardRef}
            className="w-full border dark:border-slate-700 relative overflow-hidden border-gray-200 rounded-lg p-[25px] cursor-pointer"
        >
            <h2 className="text-[1.5rem] font-bold text-[#DB06F9]">
                Web Developer
            </h2>
            <p className="text-gray-600 dark:text-[#abc2d3] text-[1rem] mt-2">
                A web developer builds and maintains websites, ensuring they
                are functional, user-friendly, and visually appealing. They
                use coding languages like HTML, CSS, and JavaScript to bring
                designs to life and create seamless online experiences.
            </p>

            <img
                src="https://i.ibb.co.com/Gx5pzCs/Programmer-working-remotely-with-cat-by-his-side.png"
                alt="animated_card"
                className="w-[140px] mt-3 float-right"
            />

            {isHovering && (
                <div
                    className="absolute inset-0 pointer-events-none blur-[50px]"
                    style={{
                        background: `radial-gradient(circle 50px at ${mousePosition.x}px ${mousePosition.y}px, #DB06F9, transparent)`,
                    }}
                />
            )}
        </div>
    );
};

export default AnimatedCard;
              '
                />
            )}
          </ComponentWrapper>

          <div className='mt-8'>
            <ContentHeader
              id='hover-animated-card-5'
              text={'hover animated card 5'}
            />
          </div>

          <ComponentDescription text='This is a hover-animated card. Hover to reveal dynamic effects and
            animations.'/>

          <ToggleTab code={animatedCard4Code} setPreview={setAnimatedCard4Preview} preview={animatedCard4Preview} setCode={setAnimatedCard4Code}/>

          <ComponentWrapper>
            {animatedCard4Preview && (
                <div className='p-8 mb-4 flex items-center flex-col gap-5 justify-center'>
                  <div className='group [perspective:1000px] w-full 640px:w-[80%] 1024px:w-[60%] h-[350px]'>
                    <div className='relative w-full h-full transition-transform duration-[600ms] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]'>
                      {/* Front Side */}
                      <div className='absolute w-full h-full backface-hidden [backface-visibility:hidden]'>
                        <img
                            src='https://img.freepik.com/free-photo/social-media-marketing-concept-marketing-with-applications_23-2150063136.jpg?t=st=1728142095~exp=1728145695~hmac=01edb1d4b68f37689510f834a442804bd4fb7bf68d8f795d7d30f7cc87f79a8b&w=996'
                            alt='animated_card'
                            className='w-full h-full cursor-pointer object-cover rounded-lg shadow-lg'
                        />
                        <h2 className='text-[1.5rem] [text-shadow:2px_2px_4px_rgba(0,0,0,0.9)] font-bold text-white absolute bottom-5 left-5'>
                          Marketing Strategy
                        </h2>
                      </div>

                      {/* Back Side */}
                      <div className='absolute w-full dark:bg-slate-800 h-full bg-white rounded-lg shadow-lg [transform:rotateY(180deg)] [backface-visibility:hidden] p-[25px]'>
                        <h2 className='text-[1.2rem] dark:text-[#abc2d3] font-semibold text-gray-800 mb-4'>
                          Marketing Strategy
                        </h2>
                        <p className='text-gray-600 dark:text-[#abc2d3]/80'>
                          A marketing strategy is a plan to reach target
                          customers, promote products, and grow business. It uses
                          tools like ads, social media, and content to build brand
                          awareness and drive sales.
                        </p>
                        <a
                            href='https://zenui.net'
                            className='inline-block mt-4 text-blue-500 hover:underline'
                        >
                          Learn More
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
            )}

            {animatedCard4Code && (
                <Showcode
                    code='
import React from "react";

const AnimatedCard = () => {

    return (
        <div className="group [perspective:1000px] w-full sm:w-[80%] md:w-[60%] h-[350px]">
            <div
                className="relative w-full h-full transition-transform duration-[600ms] [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                {/* Front Side */}
                <div className="absolute w-full h-full backface-hidden [backface-visibility:hidden]">
                    <img
                        src="https://img.freepik.com/free-photo/social-media-marketing-concept-marketing-with-applications_23-2150063136.jpg?t=st=1728142095~exp=1728145695~hmac=01edb1d4b68f37689510f834a442804bd4fb7bf68d8f795d7d30f7cc87f79a8b&w=996"
                        alt="animated_card"
                        className="w-full h-full cursor-pointer object-cover rounded-lg shadow-lg"
                    />
                    <h2 className="text-[1.5rem] [text-shadow:2px_2px_4px_rgba(0,0,0,0.9)] font-bold text-white absolute bottom-5 left-5">
                        Marketing Strategy
                    </h2>
                </div>

                {/* Back Side */}
                <div
                    className="absolute w-full dark:bg-slate-800 h-full bg-white rounded-lg shadow-lg [transform:rotateY(180deg)] [backface-visibility:hidden] p-[25px]">
                    <h2 className="text-[1.2rem] dark:text-[#abc2d3] font-semibold text-gray-800 mb-4">
                        Marketing Strategy
                    </h2>
                    <p className="text-gray-600 dark:text-[#abc2d3]/80">
                        A marketing strategy is a plan to reach target
                        customers, promote products, and grow business. It uses
                        tools like ads, social media, and content to build brand
                        awareness and drive sales.
                    </p>
                    <a
                        href="https://zenui.net"
                        className="inline-block mt-4 text-blue-500 hover:underline"
                    >
                        Learn More
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AnimatedCard;
              '
                />
            )}
          </ComponentWrapper>

          <div className='mt-8'>
            <ContentHeader
              id='hover-animated-card-6'
              text={'hover animated card 6'}
            />
          </div>

          <ComponentDescription text='This is a hover-animated card. Hover to reveal dynamic effects and
            animations.'/>

          <ToggleTab code={animatedCard5Code} setCode={setAnimatedCard5Code} preview={animatedCard5Preview} setPreview={setAnimatedCard5Preview}/>

          <ComponentWrapper>
            {animatedCard5Preview && (
                <div className='p-8 mb-4 flex items-center flex-col gap-5 justify-center'>
                  <div className='w-full 640px:w-[80%] 1024px:w-[60%] h-[350px] overflow-hidden rounded-md relative cursor-pointer group'>
                    {/*  image  */}
                    <img
                        src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/pr-sample9.jpg'
                        alt='animated_card'
                        className='w-full h-full object-cover group-hover:scale-[1.15] group-hover:rotate-[8deg] transition-all duration-300 ease-out'
                    />

                    {/*  texts  */}
                    <div className='absolute bottom-0 left-0 py-[10px] px-[20px]'>
                      <h3 className='text-[2rem] font-bold text-white'>The</h3>
                      <h3 className='text-[2rem] font-bold text-yellow-500'>
                        Winter
                      </h3>
                      <h3 className='text-[2rem] font-bold text-white'>
                        Collection
                      </h3>
                    </div>
                  </div>
                </div>
            )}

            {animatedCard5Code && (
                <Showcode
                    code='
        <div
            className="w-full sm:w-[80%] lg:w-[60%] h-[350px] overflow-hidden rounded-md relative cursor-pointer group">

            {/*  image  */}
            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/pr-sample9.jpg"
                 alt="animated_card"
                 className="w-full h-full object-cover group-hover:scale-[1.15] group-hover:rotate-[8deg] transition-all duration-300 ease-out"/>

            {/*  texts  */}
            <div className="absolute bottom-0 left-0 py-[10px] px-[20px]">
                <h3 className="text-[2rem] font-bold text-white">The</h3>
                <h3 className="text-[2rem] font-bold text-yellow-500">Winter</h3>
                <h3 className="text-[2rem] font-bold text-white">Collection</h3>
            </div>
        </div>
              '
                />
            )}
          </ComponentWrapper>

          <div className='mt-8'>
            <ContentHeader
              id='hover-animated-card-7'
              text={'hover animated card 7'}
            />
          </div>

          <ComponentDescription text='This is a hover-animated card. Hover to reveal dynamic effects and
            animations.'/>

          <ToggleTab code={animatedCard6Code} setPreview={setAnimatedCard6Preview} preview={animatedCard6Preview} setCode={setAnimatedCard6Code}/>

          <ComponentWrapper>
            {animatedCard6Preview && (
                <div className='p-8 mb-4 flex items-center flex-col gap-5 justify-center'>
                  <div className='w-full 640px:w-[80%] 1024px:w-[60%] shadow-md h-[350px] hover:scale-[1.05] transition-all duration-300 overflow-hidden rounded-md relative cursor-pointer group'>
                    {/*  icons  */}
                    <div className='absolute top-0 left-0 opacity-100 z-[-1] group-hover:opacity-100 group-hover:z-[1] ease-out transition-all duration-300 flex items-center justify-between w-full p-[15px]'>
                      <FaRegHeart className='text-[1.1rem] dark:text-[#abc2d3] text-gray-600' />
                      <div className='flex items-center gap-[5px]'>
                        <MdOutlineTimer className='dark:text-orange-600 text-orange-700 text-[1.1rem]' />
                        <p className='text-[1rem] dark:text-orange-600 text-orange-700'>5 min</p>
                      </div>
                    </div>

                    {/*  image  */}
                    <img
                        src='https://images.pexels.com/photos/307008/pexels-photo-307008.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260'
                        alt='animated_card'
                        className='w-full h-[60%] object-cover group-hover:opacity-40 group-hover:h-full transition-all duration-300 ease-out'
                    />

                    {/*  texts  */}
                    <div className='absolute bottom-0 left-0 py-[20px] pb-[40px] px-[20px] w-full'>
                      <p className='text-[1rem] dark:text-[#abc2d3]/80 uppercase text-gray-600'>
                        Travel
                      </p>
                      <h3 className='text-[1.4rem] dark:text-[#abc2d3] font-bold text-gray-900'>
                        Discover the sea
                      </h3>
                      <p className='text-[0.9rem] dark:text-[#abc2d3]/90 text-gray-600 mt-2'>
                        by Jhon Doe
                      </p>
                    </div>
                  </div>
                </div>
            )}

            {animatedCard6Code && (
                <Showcode
                    code='
import React from "react";

// react icons
import {FaRegHeart} from "react-icons/fa";
import {MdOutlineTimer} from "react-icons/md";

const AnimatedCard = () => {

    return (
        <div
            className="w-full sm:w-[80%] md:w-[60%] shadow-md h-[350px] hover:scale-[1.05] transition-all duration-300 overflow-hidden rounded-md relative cursor-pointer group">
            {/*  icons  */}
            <div
                className="absolute top-0 left-0 opacity-100 z-[-1] group-hover:opacity-100 group-hover:z-[1] ease-out transition-all duration-300 flex items-center justify-between w-full p-[15px]">
                <FaRegHeart className="text-[1.1rem] dark:text-[#abc2d3] text-gray-600"/>
                <div className="flex items-center gap-[5px]">
                    <MdOutlineTimer className="dark:text-orange-600 text-orange-700 text-[1.1rem]"/>
                    <p className="text-[1rem] dark:text-orange-600 text-orange-700">5 min</p>
                </div>
            </div>

            {/*  image  */}
            <img
                src="https://images.pexels.com/photos/307008/pexels-photo-307008.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
                alt="animated_card"
                className="w-full h-[60%] object-cover group-hover:opacity-40 group-hover:h-full transition-all duration-300 ease-out"
            />

            {/*  texts  */}
            <div className="absolute bottom-0 left-0 py-[20px] pb-[40px] px-[20px] w-full">
                <p className="text-[1rem] dark:text-[#abc2d3]/80 uppercase text-gray-600">
                    Travel
                </p>
                <h3 className="text-[1.4rem] dark:text-[#abc2d3] font-bold text-gray-900">
                    Discover the sea
                </h3>
                <p className="text-[0.9rem] dark:text-[#abc2d3]/90 text-gray-600 mt-2">
                    by Jhon Doe
                </p>
            </div>
        </div>
    );
};

export default AnimatedCard;
              '
                />
            )}
          </ComponentWrapper>

          <div className='mt-8'>
            <ContentHeader
              id='hover-animated-card-8'
              text={'hover animated card 8'}
            />
          </div>

          <ComponentDescription text='This is a hover-animated card. Hover to reveal dynamic effects and
            animations.'/>

          <ToggleTab code={animatedCard7Code} setCode={setAnimatedCard7Code} preview={animatedCard7Preview} setPreview={setAnimatedCard7Preview}/>

          <ComponentWrapper>
            {animatedCard7Preview && (
                <div className='p-8 mb-4 flex items-center flex-col gap-5 justify-center'>
                  <div className='w-full 640px:w-[80%] 1024px:w-[60%] shadow-md hover:shadow-none z-0 bg-white rounded-md relative cursor-pointer group before:absolute before:top-0 hover:before:top-[10px] before:left-0 hover:before:left-[-10px] before:w-full before:h-full before:rounded-md before:bg-[#c0e6ed] dark:before:bg-slate-900 before:transition-all before:duration-300 before:z-[-1] after:w-full after:h-full after:absolute after:top-0 hover:after:top-[20px] after:left-0 hover:after:left-[-20px] after:rounded-md after:bg-[#d4f2f7] dark:after:bg-slate-900/60 after:z-[-2] after:transition-all after:duration-500'>
                    {/*  image  */}
                    <img
                        src='https://img.freepik.com/free-vector/futuristic-science-lab-background_23-2148495020.jpg?t=st=1728229546~exp=1728233146~hmac=5d458a6b808e0c510548aef0446697c3d452564def915e03e892d0ab604ca1ad&w=996'
                        alt='animated_card'
                        className='w-full h-[200px] rounded-t-md object-cover'
                    />

                    {/*  contents  */}
                    <div className='p-[18px] pt-2.5 dark:bg-slate-800 bg-white rounded-b-md'>
                      <h3 className='text-[1.5rem] font-bold text-[#0FABCA]'>
                        Science
                      </h3>
                      <p className='text-[1rem] dark:text-[#abc2d3] font-[400] text-gray-600'>
                        The science of today is the technology of tomorrow –
                        Edward Teller
                      </p>

                      <button className='w-full py-2 px-4 hover:bg-[#c0e6ed] hover:text-black text-[1rem] transition-all duration-300 bg-[#0FABCA] text-white rounded-md mt-5'>
                        Explore
                      </button>
                    </div>
                  </div>
                </div>
            )}

            {animatedCard7Code && (
                <Showcode
                    code='
import React from "react";

const AnimatedCard = () => {

    return (
        <div
            className="w-full sm:w-[80%] md:w-[60%] shadow-md hover:shadow-none z-0 bg-white rounded-md relative cursor-pointer group before:absolute before:top-0 hover:before:top-[10px] before:left-0 hover:before:left-[-10px] before:w-full before:h-full before:rounded-md before:bg-[#c0e6ed] dark:before:bg-slate-900 before:transition-all before:duration-300 before:z-[-1] after:w-full after:h-full after:absolute after:top-0 hover:after:top-[20px] after:left-0 hover:after:left-[-20px] after:rounded-md after:bg-[#d4f2f7] dark:after:bg-slate-900/60 after:z-[-2] after:transition-all after:duration-500">
            {/*  image  */}
            <img
                src="https://img.freepik.com/free-vector/futuristic-science-lab-background_23-2148495020.jpg?t=st=1728229546~exp=1728233146~hmac=5d458a6b808e0c510548aef0446697c3d452564def915e03e892d0ab604ca1ad&w=996"
                alt="animated_card"
                className="w-full h-[200px] rounded-t-md object-cover"
            />

            {/*  contents  */}
            <div className="p-[18px] pt-2.5 dark:bg-slate-800 bg-white rounded-b-md">
                <h3 className="text-[1.5rem] font-bold text-[#0FABCA]">
                    Science
                </h3>
                <p className="text-[1rem] dark:text-[#abc2d3] font-[400] text-gray-600">
                    The science of today is the technology of tomorrow –
                    Edward Teller
                </p>

                <button
                    className="w-full py-2 px-4 hover:bg-[#c0e6ed] hover:text-black text-[1rem] transition-all duration-300 bg-[#0FABCA] text-white rounded-md mt-5">
                    Explore
                </button>
            </div>
        </div>
    );
};

export default AnimatedCard;
              '
                />
            )}
          </ComponentWrapper>

          <div className='mt-8'>
            <ContentHeader
              id='hover-animated-card-9'
              text={'hover animated card 9'}
            />
          </div>

          <ComponentDescription text='This is a hover-animated card. Hover to reveal dynamic effects and
            animations.'/>

          <ToggleTab code={animatedCard8Code} setPreview={setAnimatedCard8Preview} preview={animatedCard8Preview} setCode={setAnimatedCard8Code}/>

          <ComponentWrapper>
            {animatedCard8Preview && (
                <div className='p-8 mb-4 flex items-center flex-col gap-5 justify-center'>
                  <div className='grid grid-cols-2 gap-6 w-full 1024px:w-[70%]'>
                    {[1, 2, 3, 4].map((item, index) => (
                        // card container
                        <div
                            key={index}
                            className={`relative transition-all w-full h-[200px] cursor-pointer duration-300 ease-in-out transform ${
                                hovered !== null && hovered !== index
                                    ? 'blur-sm scale-95'
                                    : 'scale-100'
                            } hover:scale-105 hover:z-10 hover:blur-none`}
                            onMouseEnter={() => setHovered(index)}
                            onMouseLeave={() => setHovered(null)}
                        >
                          {/*  image  */}
                          <img
                              src='https://img.freepik.com/free-photo/adorable-portrait-pet-surrounded-by-flowers_23-2151850055.jpg?t=st=1728230076~exp=1728233676~hmac=0d7901eef3fdf37539e5917e58b01344816e629ab705497179741fbf82f0038e&w=360'
                              alt='animated_card'
                              className='w-full h-full rounded-md object-cover'
                          />
                        </div>
                    ))}
                  </div>
                </div>
            )}

            {animatedCard8Code && (
                <Showcode
                    code='
import React, {useState} from "react";

const AnimatedHoverCard = () => {

    const [hovered, setHovered] = useState(null);

    return (
        <div className="grid grid-cols-2 gap-6 w-full lg:w-[70%]">
            {[1, 2, 3, 4].map((item, index) => (

                // card container
                <div
                    key={index}
                    className={`relative transition-all w-full h-[200px] cursor-pointer duration-300 ease-in-out transform ${
                        hovered !== null && hovered !== index
                            ? "blur-sm scale-95"
                            : "scale-100"
                    } hover:scale-105 hover:z-10 hover:blur-none`}
                    onMouseEnter={() => setHovered(index)}
                    onMouseLeave={() => setHovered(null)}
                >

                    {/*  image  */}
                    <img
                        src="https://img.freepik.com/free-photo/adorable-portrait-pet-surrounded-by-flowers_23-2151850055.jpg?t=st=1728230076~exp=1728233676~hmac=0d7901eef3fdf37539e5917e58b01344816e629ab705497179741fbf82f0038e&w=360"
                        alt="animated_card" className="w-full h-full rounded-md object-cover"/>
                </div>
            ))}
        </div>
    );
};

export default AnimatedHoverCard;
              '
                />
            )}
          </ComponentWrapper>

          <div className='mt-8'>
            <ContentHeader
              id='hover-animated-card-10'
              text={'hover animated card 10'}
            />
          </div>

          <ComponentDescription text='This is a hover-animated card. Hover to reveal dynamic effects and
            animations.'/>

          <ToggleTab code={animatedCard9Code} setPreview={setAnimatedCard9Preview} setCode={setAnimatedCard9Code} preview={animatedCard9Preview}/>

          <ComponentWrapper>
            {animatedCard9Preview && (
                <div className='p-8 mb-4 flex items-center flex-col gap-5 justify-center'>
                  <div className='w-full 640px:w-[80%] 1024px:w-[60%] shadow-md h-[350px] transition-all duration-300 overflow-hidden rounded-md relative cursor-pointer group'>
                    <img
                        src='https://img.freepik.com/free-photo/beautiful-rainbow-nature_23-2151498366.jpg?t=st=1728230691~exp=1728234291~hmac=4670c1df1a791e3506bdebcdc7aecc5d09bfd2ed8fff51551b39ad3f5f237899&w=996'
                        alt='animated_card'
                        className='w-full h-full object-cover group-hover:scale-[1.2] transition-all duration-300'
                    />

                    <div className='w-full h-full absolute top-0 left-0 backdrop-blur-lg flex items-center justify-center flex-col px-[20px] opacity-0 transition-all duration-300 group-hover:opacity-100'>
                      <h2 className='text-[1.5rem] text-white font-bold text-center leading-[30px] capitalize'>
                        Beautiful rainbow in nature
                      </h2>
                      <p className='text-[1rem] text-white text-center mt-3 opacity-85'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Lorem ipsum dolor sit amet
                      </p>
                    </div>
                  </div>
                </div>
            )}

            {animatedCard9Code && (
                <Showcode
                    code='
        <div
            className="w-full sm:w-[80%] lg:w-[60%] shadow-md h-[350px] transition-all duration-300 overflow-hidden rounded-md relative cursor-pointer group">

            <img
                src="https://img.freepik.com/free-photo/beautiful-rainbow-nature_23-2151498366.jpg?t=st=1728230691~exp=1728234291~hmac=4670c1df1a791e3506bdebcdc7aecc5d09bfd2ed8fff51551b39ad3f5f237899&w=996"
                alt="animated_card"
                className="w-full h-full object-cover group-hover:scale-[1.2] transition-all duration-300"/>

            <div
                className="w-full h-full absolute top-0 left-0 backdrop-blur-lg flex items-center justify-center flex-col px-[20px] opacity-0 transition-all duration-300 group-hover:opacity-100">
                <h2 className="text-[1.5rem] text-white font-bold text-center leading-[30px] capitalize">Beautiful
                    rainbow in nature</h2>
                <p className="text-[1rem] text-white text-center mt-3 opacity-85">Lorem ipsum
                    dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet</p>
            </div>
        </div>
              '
                />
            )}
          </ComponentWrapper>

          <div className='mt-8'>
            <ContentHeader
              id='hover-animated-card-11'
              text={'hover animated card 11'}
            />
          </div>

          <ComponentDescription text='This is a hover-animated card. Hover to reveal dynamic effects and
            animations.'/>

          <ToggleTab code={animatedCard10Code} preview={animatedCard10Preview} setCode={setAnimatedCard10Code} setPreview={setAnimatedCard10Preview}/>

          <ComponentWrapper>
            {animatedCard10Preview && (
                <div className='p-8 mb-4 flex items-center flex-col gap-5 justify-center'>
                  <div className='w-full 640px:w-[80%] 1024px:w-[60%] shadow-md h-[350px] transition-all duration-300 overflow-hidden rounded-md dark:bg-slate-800 relative cursor-pointer group flex items-center justify-center flex-col gap-[10px]'>
                    {/*  scalable background and image  */}
                    <div className='w-[100px] relative z-0 h-[100px] before:w-full before:h-full before:absolute before:top-0 before:left-0 before:z-[-1] group-hover:before:scale-[20] before:transition-all before:duration-700 before:rounded-full before:bg-blue-200 flex items-center justify-center'>
                      <img
                          src='https://i.ibb.co.com/0BZfPq6/darklogo.png'
                          alt='animated_card'
                          className='w-[80px]'
                      />
                    </div>

                    {/*  the title  */}
                    <h3 className='text-[1.5rem] dark:text-[#abc2d3] font-bold z-20'>
                      ZenUI Library
                    </h3>
                  </div>
                </div>
            )}

            {animatedCard10Code && (
                <Showcode
                    code='
import React from "react";

const AnimatedCard = () => {

    return (
        <div
            className="w-full sm:w-[80%] md:w-[60%] shadow-md h-[350px] transition-all duration-300 overflow-hidden rounded-md dark:bg-slate-800 relative cursor-pointer group flex items-center justify-center flex-col gap-[10px]">
            {/*  scalable background and image  */}
            <div
                className="w-[100px] relative z-0 h-[100px] before:w-full before:h-full before:absolute before:top-0 before:left-0 before:z-[-1] group-hover:before:scale-[20] before:transition-all before:duration-700 before:rounded-full before:bg-blue-200 flex items-center justify-center">
                <img
                    src="https://i.ibb.co.com/0BZfPq6/darklogo.png"
                    alt="animated_card"
                    className="w-[80px]"
                />
            </div>

            {/*  the title  */}
            <h3 className="text-[1.5rem] dark:text-[#abc2d3] font-bold z-20">
                ZenUI Library
            </h3>
        </div>
    );
};

export default AnimatedCard;
              '
                />
            )}
          </ComponentWrapper>

          <OverviewFooter
            backUrl='/components/cards'
            backName='cards'
            forwardName='image cropper'
            forwardUrl='/components/image-cropper'
          />
        </div>

        <ContentNavbar contents={animatedCardsContents} activeSection={activeSection} width='35%'/>

      </aside>
      <Helmet>
        <title>Surfaces - Animated Cards</title>
      </Helmet>
    </>
  );
};

export default AnimatedCards;
