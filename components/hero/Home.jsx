import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from 'next/link'

export default function HeroHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const slides = [
    {
      imgSrc: "/bannerleft.png",
      slideText: "Elevate Your Office.\nBrowse Now!",
      description:
        "Explore Our Collection for Stylish and Functional Solutions to Transform Your Workspace.",
      buttonLink: "store?product-type=office",
      buttonText: "View Office Solutions",
    },
    {
      imgSrc: "/bannerright.png",
      slideText: "Enhance Your Home.\nBrowse Now!",
      description:
        "Discover Our Collection for Stylish and Functional Solutions to Elevate Your Home Space.",
      buttonLink: "store?product-type=home",
      buttonText: "View Home Solutions",
    },
  ];

  // Detect mobile view on component mount and resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Automatically change the slide every 5 seconds in mobile view
  useEffect(() => {
    if (isMobile) {
      const slideInterval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
      }, 10000);
      return () => clearInterval(slideInterval);
    }
  }, [isMobile, slides.length]);

  // Touch event handlers
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;

    if (distance > 50) {
      // Swiped left
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    } else if (distance < -50) {
      // Swiped right
      setCurrentSlide(
        (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
      );
    }

    // Reset touch states
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <>
      <div
        className="flex flex-col lg:flex-row h-[470px]  justify-between relative lg:hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
              currentSlide === index
                ? "translate-x-0"
                : currentSlide > index
                ? "-translate-x-full"
                : "translate-x-full"
            } w-full h-[470px] lg:h-[52vh] lg:min-h-[60vh] flex flex-col justify-start lg:justify-center overflow-hidden`}
          >
            <img
              className="group-hover:scale-[1.2] object-cover h-full w-full transition-all duration-1000"
              src={slide.imgSrc}
              alt={`slide-${index}`}
            />
            <div className="absolute inset-0 flex items-end justify-center w-full h-full">
              <img
                className="object-contain h-[14rem] lg:h-[24.8rem] z-20"
                src="/img/banner/slideman.png"
                alt="cart"
              />
            </div>
            <div className="flex absolute md:w-full lg:items-start my-14 lg:my-0 items-center flex-col lg:pl-28 gap-4">
              <div className="lg:text-[2.7rem] text-2xl text-center lg:text-left leading-[1.2] font-bold">
                <span className="bg-gradient-to-b from-stone-700 to-white bg-clip-text text-transparent whitespace-pre-line">
                  {slide.slideText}
                </span>
              </div>

              <div className="text-center lg:text-left font-medium text-[.85rem] text-white">
                {slide.description}
              </div>
              <Link
                href={slide.buttonLink}
                className="h-10 w-auto flex gap-2 font-semibold bg-white group-hover:text-white group-hover:bg-blue text-[0.94rem] rounded-lg items-center justify-center px-4 text-blue"
              >
                <div>{slide.buttonText}</div>
                {index === 0 ? (
                  <div className="hidden group-hover:block transition-all duration-1000">
                    <ArrowRight />
                  </div>
                ) : (
                  <div className="hidden group-hover:block transition-all duration-1000">
                    <ArrowLeft />
                  </div>
                )}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop view */}
      <div className="hidden lg:flex flex-col lg:flex-row justify-between relative">
        <div className=" w-full group overflow-hidden h-[470px] lg:h-[52vh] lg:min-h-[60vh] flex-col justify-start lg:justify-center flex">
          <img
            className="group-hover:scale-[1.2] object-cover h-full w-full transition-all duration-1000"
            src="/bannerleft.png"
            alt=""
          />
          <div className="absolute inset-0 flex items-end justify-center w-full h-full">
            <img
              className=" object-contain  h-[14rem] lg:h-[24.8rem]  z-20 "
              src="/img/banner/slideman.png"
              alt="cart"
            />
          </div>

          <div className="flex absolute lg:items-start my-14 lg:my-0 items-center flex-col lg:pl-28 gap-4">
            <div className="lg:text-[2.7rem]  text-2xl  text-center lg:text-left leading-[1.2] font-bold">
              <span className=" bg-gradient-to-b from-stone-700 to-white bg-clip-text text-transparent">
                Elevate Your Office.
                <br className="hidden lg:block" />
                Browse Now!{" "}
              </span>
            </div>

            <div className="text-center lg:text-left font-medium text-[.85rem] text-white">
              Explore Our Collection for Stylish and Functional Solutions to{" "}
              <br className="hidden lg:block" />
              Transform Your Workspace.
            </div>
            <Link
              href={`store?product-type=office`}
              className="h-10 w-auto flex gap-2 font-semibold bg-white group-hover:text-white group-hover:bg-blue text-[0.94rem] rounded-lg items-center justify-center px-4 text-blue"
            >
              <div>View Office Solutions </div>
              <div className="hidden group-hover:block transition-all duration-1000">
                <ArrowRight className="" />
              </div>
            </Link>
          </div>
        </div>

        <div className="hidden w-full group overflow-hidden h-[52vh] lg:min-h-[60vh] flex-col justify-center lg:flex">
          <img
            className="group-hover:scale-[1.2] object-cover h-full w-full transition-all duration-1000"
            src="/bannerright.png"
            alt=""
          />
          <div className="flex absolute right-0 lg:items-end items-center flex-col lg:pr-28 gap-4">
            <div className="text-[2.7rem] text-center  lg:text-right leading-[1.2] font-bold">
              <span className=" bg-gradient-to-b from-stone-700 to-white bg-clip-text text-transparent">
                Enhance Your Home.
                <br className="hidden lg:block" />
                Browse Now!{" "}
              </span>
            </div>

            <div className="text-center lg:text-right font-medium text-[.85rem] text-white">
              Discover Our Collection for Stylish and Functional Solutions to
              <br className="hidden lg:block" />
              Elevate Your Home Space
            </div>
            <Link
              href={`store?product-type=home`}
              className="h-10 w-auto flex gap-2 font-semibold group-hover:text-white group-hover:bg-blue bg-white text-[0.94rem] rounded-lg items-center justify-center px-4 text-blue"
            >
              <span className="hidden group-hover:block transition-all duration-1000">
                <ArrowLeft />
              </span>
              View Home Solutions{" "}
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
