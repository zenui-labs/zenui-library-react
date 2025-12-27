import React, {useState, useEffect} from 'react';

// react helmet
import {Helmet} from 'react-helmet';

// components
import ContentHeader from '@shared/ContentHeader';
import OverviewFooter from '@shared/OverviewFooter';
import Showcode from '@shared/Component/ShowCode.jsx';

// contents for scrollspy
import {carouselContents} from '@utils/ContentsConfig/SurfacesContents';
import {useScrollSpy} from '@/CustomHooks/useScrollSpy';

// icons
import {FiChevronLeft, FiChevronRight} from 'react-icons/fi';

import ComponentDescription from "@shared/Component/ComponentDescription.jsx";
import ToggleTab from "@shared/Component/ToggleTab.jsx";
import ComponentWrapper from "@shared/Component/ComponentWrapper.jsx";
import ContentNavbar from "@shared/Component/ContentNavbar.jsx";

const Carousel = () => {
    const sectionIds = carouselContents.map((item) => item.href.slice(1));
    const activeSection = useScrollSpy(sectionIds);

    // Carousel state for first carousel
    const [currentSlide1, setCurrentSlide1] = useState(0);
    const slides1 = [
        {id: 1, content: 'Carousel 1 - Slide 1 Content', imgSrc: "https://picsum.photos/id/11/600/400"},
        {id: 2, content: 'Carousel 1 - Slide 2 Content', imgSrc: "https://picsum.photos/id/13/600/400"},
        {id: 3, content: 'Carousel 1 - Slide 3 Content', imgSrc: "https://picsum.photos/id/29/600/400"},
    ];

    // Carousel state for second carousel
    const [currentSlide2, setCurrentSlide2] = useState(0);
    const slides2 = [
        {id: 1, content: 'Carousel 2 - Slide 1 Content', imgSrc: "https://picsum.photos/id/57/600/400"},
        {id: 2, content: 'Carousel 2 - Slide 2 Content', imgSrc: "https://picsum.photos/id/58/600/400"},
        {id: 3, content: 'Carousel 2 - Slide 3 Content', imgSrc: "https://picsum.photos/id/49/600/400"},
    ];

    // Carousel state for third carousel (smooth with fade)
    const [currentSlide3, setCurrentSlide3] = useState(0);
    const slides3 = [
        {id: 1, content: 'Carousel 3 - Slide 1 Content', imgSrc: "https://picsum.photos/id/20/600/400"},
        {id: 2, content: 'Carousel 3 - Slide 2 Content', imgSrc: "https://picsum.photos/id/25/600/400"},
        {id: 3, content: 'Carousel 3 - Slide 3 Content', imgSrc: "https://picsum.photos/id/28/600/400"},
    ];

    // Auto-advance carousel every 3 seconds for both carousels
    useEffect(() => {
        const autoSlide2 = setInterval(() => {
            setCurrentSlide2((prev) => (prev + 1) % slides2.length);
        }, 1500);

        const autoSlide3 = setInterval(() => {
            setCurrentSlide3((prev) => (prev + 1) % slides3.length);
        }, 3000);

        return () => {
            clearInterval(autoSlide2);
            clearInterval(autoSlide3);
        };
    }, [slides1.length, slides2.length, slides3.length]);

    // first carousel slide
    const [carouselPreview1, setCarouselPreview1] = useState(true);
    const [carouselCode1, setCarouselCode1] = useState(false);

    const handleCarouselPreview1 = () => {
        setCarouselPreview1(true);
        setCarouselCode1(false);
    };

    const handleCarouselCode1 = () => {
        setCarouselCode1(true);
        setCarouselPreview1(false);
    };

    // second carousel slide
    const [carouselPreview2, setCarouselPreview2] = useState(true);
    const [carouselCode2, setCarouselCode2] = useState(false);

    const handleCarouselPreview2 = () => {
        setCarouselPreview2(true);
        setCarouselCode2(false);
    };

    const handleCarouselCode2 = () => {
        setCarouselCode2(true);
        setCarouselPreview2(false);
    };

    // third carousel slide
    const [carouselPreview3, setCarouselPreview3] = useState(true);
    const [carouselCode3, setCarouselCode3] = useState(false);

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

    const nextSlide3 = () => {
        setCurrentSlide3((prev) => (prev + 1) % slides3.length);
    };

    const prevSlide3 = () => {
        setCurrentSlide3((prev) => (prev - 1 + slides3.length) % slides3.length);
    };

    const goToSlide3 = (index) => {
        setCurrentSlide3(index);
    };

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
                            <div className='p-8 mb-4 flex flex-col items-center gap-5  h-[400px] justify-center'>
                                <div
                                    className='relative flex items-center border-black justify-center w-full h-[200px] rounded-lg'>
                                    <FiChevronLeft
                                        className='absolute left-5 text-secondary text-[1.8rem] cursor-pointer'
                                        onClick={prevSlide1}
                                    />
                                    <div className='text-[1.3rem] text-secondary font-[600] flex flex-col items-center'>
                                        {/* Display the content text */}
                                        {/* <p className='mb-2'>{slides1[currentSlide1].content}</p> */}

                                        {/* Display the image */}
                                        <img
                                            src={slides1[currentSlide1].imgSrc}
                                            alt={`Slide ${currentSlide1 + 1}`}
                                            className="w-full object-cover mb-2"
                                        />
                                    </div>

                                    <FiChevronRight
                                        className='absolute right-5 text-secondary text-[1.8rem] cursor-pointer'
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
    <div className="relative flex items-center justify-center w-full h-[200px] rounded-lg">
      <FiChevronLeft
          className="absolute left-5 text-secondary text-[1.8rem] cursor-pointer"
          onClick={prevSlide}
      />
      <div className="text-[1.3rem] text-secondary font-[600]">
        {
          <img
            src={slides1[currentSlide1].imgSrc}
            alt={slides1[currentSlide1].content}
            className="w-full object-cover text-black"
          />
        }
      </div>
      <FiChevronRight
          className="absolute right-5 text-secondary text-[1.8rem] cursor-pointer"
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

                    {/* Second Carousel Container */}
                    <div className='mt-8'>
                        <ContentHeader id='second-carousel' text={'Carousel 2'}/>
                    </div>

                    <ComponentDescription text='This is a carousel component with automatic navigation to cycle
            through slides.'/>

                    <ToggleTab setPreview={setCarouselPreview2} preview={carouselPreview2} code={carouselCode2}
                               setCode={setCarouselCode2}/>

                    <ComponentWrapper>
                        {carouselPreview2 && (
                            <div className='p-8 mb-4 flex flex-col items-center gap-5 h-[400px] justify-center'>
                                <div className='relative flex items-center justify-center w-full h-[200px] rounded-lg'>
                                    <FiChevronLeft
                                        className='absolute left-5 text-secondary text-[1.8rem] cursor-pointer'
                                        onClick={prevSlide2}
                                    />
                                    <div className='text-[1.3rem] text-secondary font-[600]'>
                                        {/* {slides2[currentSlide2].content} */}
                                        {/* Display the image */}
                                        <img
                                            src={slides2[currentSlide2].imgSrc}
                                            alt={`Slide ${currentSlide2 + 1}`}
                                            className="w-full object-cover mb-2"
                                        />
                                    </div>
                                    <FiChevronRight
                                        className='absolute right-5 text-secondary text-[1.8rem] cursor-pointer'
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
    <div className="relative flex items-center justify-center w-full h-[200px] rounded-lg">
      <FiChevronLeft
          className="absolute left-5 text-secondary text-[1.8rem] cursor-pointer"
          onClick={prevSlide}
      />
      <div className="text-[1.3rem] text-secondary font-[600]">
        {
          <img
            src={slides1[currentSlide1].imgSrc}
            alt={slides1[currentSlide1].content}
            className="w-full object-cover text-black"
          />
        }
      </div>
      <FiChevronRight
          className="absolute right-5 text-secondary text-[1.8rem] cursor-pointer"
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

                    {/* Third Carousel Container */}
                    <div className='mt-8'>
                        <ContentHeader id='smooth-carousel' text={'Carousel 3'}/>
                    </div>

                    <ComponentDescription text='This is a smooth carousel component with fade transitions and dot
            indicators for enhanced visual experience.'/>

                    <ToggleTab setPreview={setCarouselPreview3} preview={carouselPreview3} code={carouselCode3}
                               setCode={setCarouselCode3}/>

                    <ComponentWrapper>
                        {carouselPreview3 && (
                            <div className='p-8 mb-4 flex flex-col items-center gap-5 h-[450px] justify-center'>
                                <div className='relative flex items-center justify-center w-full h-[250px] rounded-lg overflow-hidden'>
                                    <FiChevronLeft
                                        className='absolute left-5 z-10 text-secondary bg-black/50 hover:bg-black/70 p-2 rounded-full text-[2.5rem] cursor-pointer transition-all duration-300'
                                        onClick={prevSlide3}
                                    />
                                    
                                    {slides3.map((slide, index) => (
                                        <div
                                            key={slide.id}
                                            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                                                index === currentSlide3 ? 'opacity-100' : 'opacity-0'
                                            }`}
                                        >
                                            <img
                                                src={slide.imgSrc}
                                                alt={`Slide ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ))}

                                    <FiChevronRight
                                        className='absolute right-5 z-10 text-secondary bg-black/50 hover:bg-black/70 p-2 rounded-full text-[2.5rem] cursor-pointer transition-all duration-300'
                                        onClick={nextSlide3}
                                    />

                                    {/* Dot Indicators */}
                                    <div className='absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10'>
                                        {slides3.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => goToSlide3(index)}
                                                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                                    index === currentSlide3
                                                        ? 'bg-white w-8'
                                                        : 'bg-white/50 hover:bg-white/80'
                                                }`}
                                                aria-label={`Go to slide ${index + 1}`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {carouselCode3 && (
                            <Showcode
                                code={`
import React, { useState, useEffect } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const SmoothCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { id: 1, content: 'Carousel 3 - Slide 1 Content', imgSrc: "/carousel_image/carousel.jpg" },
    { id: 2, content: 'Carousel 3 - Slide 2 Content', imgSrc: "/carousel_image/carousel-2.jpg" },
    { id: 3, content: 'Carousel 3 - Slide 3 Content', imgSrc: "/carousel_image/carousel-3.jpg" },
  ];

  useEffect(() => {
    const autoSlide = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(autoSlide);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative flex items-center justify-center w-full h-[250px] rounded-lg overflow-hidden">
      <FiChevronLeft
        className="absolute left-5 z-10 text-white bg-black/50 hover:bg-black/70 p-2 rounded-full text-[2.5rem] cursor-pointer transition-all duration-300"
        onClick={prevSlide}
      />
      
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={\`absolute inset-0 transition-opacity duration-700 ease-in-out \${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }\`}
        >
          <img
            src={slide.imgSrc}
            alt={\`Slide \${index + 1}\`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      <FiChevronRight
        className="absolute right-5 z-10 text-white bg-black/50 hover:bg-black/70 p-2 rounded-full text-[2.5rem] cursor-pointer transition-all duration-300"
        onClick={nextSlide}
      />

      {/* Dot Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={\`w-3 h-3 rounded-full transition-all duration-300 \${
              index === currentSlide
                ? 'bg-white w-8'
                : 'bg-white/50 hover:bg-white/80'
            }\`}
            aria-label={\`Go to slide \${index + 1}\`}
          />
        ))}
      </div>
    </div>
  );
};

export default SmoothCarousel;
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
