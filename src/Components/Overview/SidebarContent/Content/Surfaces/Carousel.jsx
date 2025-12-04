import React, {useEffect, useState} from 'react';

import {Helmet} from 'react-helmet';

import ContentHeader from '@shared/ContentHeader';
import OverviewFooter from '@shared/OverviewFooter';
import Showcode from '@shared/Component/ShowCode.jsx';

import {carouselContents} from '@utils/ContentsConfig/SurfacesContents';
import {useScrollSpy} from '@/CustomHooks/useScrollSpy';

import {FiChevronLeft, FiChevronRight} from 'react-icons/fi';

import ComponentDescription from "@shared/Component/ComponentDescription.jsx";
import ToggleTab from "@shared/Component/ToggleTab.jsx";
import ComponentWrapper from "@shared/Component/ComponentWrapper.jsx";
import ContentNavbar from "@shared/Component/ContentNavbar.jsx";

const Carousel = () => {
    const sectionIds = carouselContents.map((item) => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    const [currentSlide1, setCurrentSlide1] = useState(0);
    const slides1 = [
        {id: 1, content: 'Carousel 1 - Slide 1 Content', imgSrc: "https://picsum.photos/id/11/600/400"},
        {id: 2, content: 'Carousel 1 - Slide 2 Content', imgSrc: "https://picsum.photos/id/13/600/400"},
        {id: 3, content: 'Carousel 1 - Slide 3 Content', imgSrc: "https://picsum.photos/id/29/600/400"},
    ];

    const [currentSlide2, setCurrentSlide2] = useState(0);
    const slides2 = [
        {id: 1, content: 'Carousel 2 - Slide 1 Content', imgSrc: "https://picsum.photos/id/57/600/400"},
        {id: 2, content: 'Carousel 2 - Slide 2 Content', imgSrc: "https://picsum.photos/id/58/600/400"},
        {id: 3, content: 'Carousel 2 - Slide 3 Content', imgSrc: "https://picsum.photos/id/49/600/400"},
    ];

    useEffect(() => {
        const autoSlide2 = setInterval(() => {
            setCurrentSlide2((prev) => (prev + 1) % slides2.length);
        }, 1500);

        return () => {
            clearInterval(autoSlide2);
        };
    }, [slides1.length, slides2.length]);

    const [carouselPreview1, setCarouselPreview1] = useState(true);
    const [carouselCode1, setCarouselCode1] = useState(false);

    const [carouselPreview2, setCarouselPreview2] = useState(true);
    const [carouselCode2, setCarouselCode2] = useState(false);

    const nextSlide1 = () => {
        setCurrentSlide1((prev) => (prev + 1) % slides1.length);
    };

    const prevSlide1 = () => {
        setCurrentSlide1((prev) => (prev - 1 + slides1.length) % slides1.length);
    };

    const nextSlide2 = () => {
        setCurrentSlide2((prev) => (prev + 1) % slides2.length);
    };

    const prevSlide2 = () => {
        setCurrentSlide2((prev) => (prev - 1 + slides2.length) % slides2.length);
    };


    const [carouselPreview3, setCarouselPreview3] = useState(true);
    const [carouselCode3, setCarouselCode3] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showImage, setShowImage] = useState(true);
    const slides3 = [
        {id: 1, content: 'Carousel 2 - Slide 1 Content', imgSrc: "https://picsum.photos/id/57/600/400"},
        {id: 2, content: 'Carousel 2 - Slide 2 Content', imgSrc: "https://picsum.photos/id/58/600/400"},
        {id: 3, content: 'Carousel 2 - Slide 3 Content', imgSrc: "https://picsum.photos/id/49/600/400"},
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setShowImage(false);
            setTimeout(() => {
                setCurrentIndex((currentIndex + 1) % slides3.length);
                setShowImage(true);
            }, 1000);
        }, 5000);

        return () => clearInterval(interval);
    }, [currentIndex]);


    return (
        <>
            <aside className='flex items-start gap-6 justify-between w-full 640px:pl-[2.5rem] px-6 640px:px-10'>
                <div className='w-full 425px:w-[80%]'>

                    <ContentHeader id='normal-carousel' text={'Carousel 1'}/>

                    <ComponentDescription text='This is a carousel component with manual navigation to cycle through
            slides.'/>

                    <ToggleTab setPreview={setCarouselPreview1} preview={carouselPreview1} code={carouselCode1}
                               setCode={setCarouselCode1}/>

                    <ComponentWrapper>
                        {carouselPreview1 && (
                            <div className='p-8 flex flex-col items-center gap-5 h-[200px] lg:h-[400px] justify-center'>
                                <div
                                    className='relative flex items-center border-black justify-center w-full max-h-full rounded-lg'>
                                    <FiChevronLeft
                                        className='absolute left-2 lg:left-5 transition-all duration-200 hover:backdrop-blur-md hover:bg-white/20 rounded-full p-0.5 lg:p-1 text-white text-[1.8rem] lg:text-[2.8rem] cursor-pointer'
                                        onClick={prevSlide1}
                                    />
                                    <img
                                        src={slides1[currentSlide1].imgSrc}
                                        alt={`Slide ${currentSlide1 + 1}`}
                                        className="w-full max-h-full rounded-lg object-cover"
                                    />
                                    <FiChevronRight
                                        className='absolute right-2 lg:right-5 transition-all duration-200 hover:backdrop-blur-md hover:bg-white/20 rounded-full p-0.5 lg:p-1 text-white text-[1.8rem] lg:text-[2.8rem] cursor-pointer'
                                        onClick={nextSlide1}
                                    />
                                </div>
                            </div>
                        )}

                        {carouselCode1 && (
                            <Showcode
                                code={`
import React, { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const CarouselComponent1 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { id: 1, content: 'Carousel 1 - Slide 1 Content', imgSrc: "/caorusel_image/carousel.jpg" },
    { id: 2, content: 'Carousel 1 - Slide 2 Content', imgSrc: "/caorusel_image/carousel-2.jpg" },
    { id: 3, content: 'Carousel 1 - Slide 3 Content', imgSrc: "/caorusel_image/carousel-3.jpg" },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative flex items-center border-black justify-center w-full max-h-full rounded-lg">
      <FiChevronLeft
          className='absolute left-2 1024px:left-5 transition-all duration-200 hover:backdrop-blur-md hover:bg-white/20 rounded-full p-0.5 1024px:p-1 text-white text-[1.8rem] 1024px:text-[2.8rem] cursor-pointer'
          onClick={prevSlide}
      />
          <img
            src={slides1[currentSlide1].imgSrc}
            alt={slides1[currentSlide1].content}
            className="w-full max-h-full rounded-lg object-cover"
          />
      <FiChevronRight
          className='absolute right-2 1024px:right-5 transition-all duration-200 hover:backdrop-blur-md hover:bg-white/20 rounded-full p-0.5 1024px:p-1 text-white text-[1.8rem] 1024px:text-[2.8rem] cursor-pointer'
          onClick={nextSlide}
      />
    </div>
  );
};

export default CarouselComponent1;
                                `}
                            />
                        )}
                    </ComponentWrapper>


                    <div className='mt-8'>
                        <ContentHeader id='second-carousel' text={'Carousel 2'}/>
                    </div>

                    <ComponentDescription text='This is a carousel component with automatic navigation to cycle
            through slides.'/>

                    <ToggleTab setPreview={setCarouselPreview2} preview={carouselPreview2} code={carouselCode2}
                               setCode={setCarouselCode2}/>

                    <ComponentWrapper>
                        {carouselPreview2 && (
                            <div className='p-8 flex flex-col items-center gap-5 h-[200px] lg:h-[400px] justify-center'>
                                <div className='relative flex items-center justify-center w-full max-h-full rounded-lg'>
                                    <FiChevronLeft
                                        className='absolute left-2 lg:left-5 transition-all duration-200 hover:backdrop-blur-md hover:bg-white/20 rounded-full p-0.5 lg:p-1 text-white text-[1.8rem] lg:text-[2.8rem] cursor-pointer'
                                        onClick={prevSlide2}
                                    />
                                    <img
                                        src={slides2[currentSlide2].imgSrc}
                                        alt={`Slide ${currentSlide2 + 1}`}
                                        className="w-full object-cover max-h-full rounded-lg"
                                    />
                                    <FiChevronRight
                                        className='absolute right-2 lg:right-5 transition-all duration-200 hover:backdrop-blur-md hover:bg-white/20 rounded-full p-0.5 lg:p-1 text-white text-[1.8rem] lg:text-[2.8rem] cursor-pointer'
                                        onClick={nextSlide2}
                                    />
                                </div>
                            </div>
                        )}

                        {carouselCode2 && (
                            <Showcode
                                code={`
import React, { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const CarouselComponent2 = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { id: 1, content: 'Carousel 2 - Slide 1 Content', imgSrc: "/caorusel_image/carousel.jpg" },
    { id: 2, content: 'Carousel 2 - Slide 2 Content', imgSrc: "/caorusel_image/carousel-2.jpg" },
    { id: 3, content: 'Carousel 2 - Slide 3 Content', imgSrc: "/caorusel_image/carousel-3.jpg" },
  ];

  useEffect(() => {
    const autoSlide = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 1500);

    return () => clearInterval(autoSlide);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative flex items-center justify-center w-full max-h-full rounded-lg">
      <FiChevronLeft
          className='absolute left-2 1024px:left-5 transition-all duration-200 hover:backdrop-blur-md hover:bg-white/20 rounded-full p-0.5 1024px:p-1 text-white text-[1.8rem] 1024px:text-[2.8rem] cursor-pointer'
          onClick={prevSlide}
      />
          <img
            src={slides1[currentSlide1].imgSrc}
            alt={slides1[currentSlide1].content}
            className="w-full object-cover rounded-lg max-h-full"
          />
      <FiChevronRight
          className='absolute right-2 1024px:right-5 transition-all duration-200 hover:backdrop-blur-md hover:bg-white/20 rounded-full p-0.5 1024px:p-1 text-white text-[1.8rem] 1024px:text-[2.8rem] cursor-pointer'
          onClick={nextSlide}
      />
    </div>
  );
};

export default CarouselComponent2;
                                `}
                            />
                        )}
                    </ComponentWrapper>


                    <div className='mt-8'>
                        <ContentHeader id='fading-carousel' text={'Fading Carousel'}/>

                    </div>
                    <ComponentDescription
                        text='This is a carousel component with automatic navigation and fading effect.'/>

                    <ToggleTab setPreview={setCarouselPreview3} preview={carouselPreview3} code={carouselCode3}
                               setCode={setCarouselCode3}/>

                    <ComponentWrapper>
                        {carouselPreview3 && (
                            <div
                                className='p-8 flex flex-col items-center gap-5 h-[200px] lg:h-[400px] justify-center'
                            >
                                <div className="relative w-full max-h-full h-full overflow-hidden">
                                    <div className="w-full h-full relative">
                                        {slides3.map((item, index) => (
                                            <img
                                                key={item.id}
                                                src={item.imgSrc}
                                                alt=""
                                                className={`absolute inset-0 w-full rounded-lg max-h-full object-cover transition-opacity duration-[10000ms] ease-out ${index === currentIndex && showImage ? "opacity-100" : "opacity-[0.05]"}`}/>))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {carouselCode3 && (
                            <Showcode
                                code={`
import React, { useState, useEffect } from "react";

const CarouselComponent3 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showImage, setShowImage] = useState(true);
  const slides3 = [
    {
      id: 1,
      content: "Carousel 3 - Slide 1 Content",
      imgSrc: "https://picsum.photos/id/57/600/400",
    },
    {
      id: 2,
      content: "Carousel 3 - Slide 2 Content",
      imgSrc: "https://picsum.photos/id/58/600/400",
    },
    {
      id: 3,
      content: "Carousel 3 - Slide 3 Content",
      imgSrc: "https://picsum.photos/id/49/600/400",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setShowImage(false);
      setTimeout(() => {
        setCurrentIndex((currentIndex + 1) % slides3.length);
        setShowImage(true);
      }, 1000);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className="relative w-full h-full max-h-full overflow-hidden">
      <div className="w-full h-full relative">
        {slides3.map((item, index) => (
          <img
            key={item.id}
            src={item.imgSrc}
            alt=""
            className={\`absolute inset-0 w-full h-full max-h-full rounded-lg object-cover transition-opacity duration-[10000ms] ease-out \${index === currentIndex && showImage ? "opacity-100" : "opacity-[0.05]"}\`}
          />
        ))}
      </div>
    </div>
  );
};

export default CarouselComponent3;

                                `}
                            />
                        )}
                    </ComponentWrapper>


                    <OverviewFooter
                        backUrl='/components/image-gallery'
                        backName='Image Gallery'
                        forwardName='Pagination'
                        forwardUrl='/components/pagination'
                    />
                </div>

                <ContentNavbar contents={carouselContents} activeSection={activeSection} width='35%'/>

            </aside>
            <Helmet>
                <title>Surfaces - Carousel</title>
            </Helmet>
        </>
    );
};

export default Carousel;
