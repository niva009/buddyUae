import { ArrowRight } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const offers = [
  {
    id: 1,
    title: "Special Offers",
    subtitle: "on Burglary Safes",
    description:
      "Defend your assets with our reliable burglary safes! Take advantage of special pricing and safeguard your valuables against theft.",
    image: "/img/product/bg2.png",
    backgroundImage: "/img/product/bg1.png",
  },
  {
    id: 2,
    title: "Limited Offers",
    subtitle: "on Shredders",
    description:
      "Protect your data with our high-performance shredders! Enjoy exclusive discounts and keep your sensitive information secure.",
    image: "/img/product/bg5.png",
    backgroundImage: "/img/product/bg1.png",
  },
  {
    id: 3,
    title: "Limited Offers",
    subtitle: "on Fire Safes",
    description:
      "Guard your valuables from fire damage! Our fire safes are now available at special prices. Secure your peace of mind today!",
    image: "/img/product/bg10.png",
    backgroundImage: "/img/product/bg1.png",
  },
  {
    id: 4,
    title: "Limited Offers",
    subtitle: "on Currency Counters",
    description:
      "Count cash with precision and speed! Save big on our advanced currency counting machines. Efficiency meets affordability, act now!",
    image: "/img/product/bg4.png",
    backgroundImage: "/img/product/bg1.png",
  },
];

export default function LimitedDeals() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % offers.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <div
        key={offers[currentIndex].id}
        className="lg:py-0 lg:grid text-center lg:text-left lg:grid-cols-2 bg-[#F6F6F6] py-8 lg:h-auto sm:px-20 xl:px-48"
      >
        <div className="flex flex-col gap-5 justify-center px-3">
          <div>
            <span className="lg:p-2 p-1 lg:text-[.7rem] text-[.7rem] bg-blue text-white font-medium rounded-sm px-2 lg:px-4">
              LIMITED TIME SALE
            </span>
          </div>
          <div data-aos="fade-right">
            <span className="lg:text-[2.58rem] text-[1.50rem] text-blue ">
              {offers[currentIndex].title}
            </span>{" "}
            <span className="pl-1 lg:text-[2.58rem] text-[1.50rem] lg:leading-[2.8rem] font-medium">
              {offers[currentIndex].subtitle}
            </span>
          </div>
          <div
            data-aos="fade-right"
            className="lg:w-[29rem] text-[.89rem] font-medium"
          >
            {offers[currentIndex].description}
          </div>
          <div
            onClick={() => {
              navigate("/store");
            }}
            data-aos="fade-right"
            className="text-[1rem] cursor-pointer justify-center lg:justify-start font-medium underline underline-offset-8 flex items-center"
          >
            <p>Shop Now &nbsp; </p>
            <p>
              <ArrowRight className="w-5" />
            </p>
          </div>
        </div>
        <div
          data-aos="fade-up"
          className="hidden lg:flex relative flex-col justify-between w-full lg:min-h-[70vh] rounded-lg bg-cover bg-center"
          style={{
            backgroundImage: `url(${offers[currentIndex].backgroundImage})`,
          }}
        >
          <img
            data-aos="fade-up"
            data-aos-duration="1300"
            src={offers[currentIndex].image}
            className="absolute object-contain w-[26rem] bottom-0 right-20"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
