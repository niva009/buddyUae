import { useEffect, useState } from "react";
import HeroHome from "../components/hero/Home";
import NewArrivalProducts from "../components/products/NewArrival";
import StatsHome from "../components/stats/Home";
import { Link } from "react-router-dom";
import { ArrowRight, Volume2, VolumeX } from "lucide-react";
import CategoryCard from "../components/home/category/Card";
import AOS from "aos";
import "aos/dist/aos.css";
import FeaturedProducts from "../components/products/FeaturedProduct";
import SubscribtionForm from "../components/forms/SubscribtionForm";
import ReactPlayer from "react-player";
import BrandCard from "../components/brands/Card";
import TopOffer from "../components/home/TopOffer";
import LimitedDeals from "../components/home/LimitedDeals";
import { Helmet } from "react-helmet-async";
import useSeoData from "../utils/useSeoData";

export default function Home() {
  useEffect(() => {
    AOS.init();
  }, []);

  const { seoData } = useSeoData();
  console.log(seoData);

  const [mute, setMute] = useState(true);

  return (
    <>
      <Helmet>
        <title>Buddy Star | Home Page</title>
        <meta
          name="description"
          content="Welcome to buddyuae.com,Your Office and Home Buddy , Explore our wide selection of Home and Office equipment"
        />
        <meta name="keywords" content={seoData?.home} />
        <meta property="og:title" content="Welcome to buddyuae.com" />
        <meta
          property="og:description"
          content="Welcome to buddyuae.com,Your Office and Home Buddy , Explore our wide selection of Home and Office equipment"
        />
        <meta property="og:image" content="/favicon.png" />
        <meta property="og:url" content="https://www.buddyuae.com" />
        <meta name="twitter:card" content="/favicon.png" />
        <meta name="twitter:title" content="Welcome to buddyuae.com" />
        <meta
          name="twitter:description"
          content="Welcome to buddyuae.com,Your Office and Home Buddy , Explore our wide selection of Home and Office equipment"
        />
        <meta name="twitter:image" content="/favicon.png"></meta>
      </Helmet>

      <HeroHome />
      <StatsHome />
      <div className="flex mx-auto gap-5 flex-col w-full px-4 sm:px-20 md:px-4 xl:px-48 mt-10 mb-10 lg:gap-5">
        <div className="text-2xl font-semibold">Shop by Category</div>
        <CategoryCard />
      </div>
      <LimitedDeals />
      <div className="mt-4 relative w-full px-4 md:px-8 lg:px-48">
        <div className="absolute z-50 ;g:top-4 px-3 lg:px-7 py-3 lg:py-7">
          {mute ? (
            <div onClick={() => setMute(!mute)}>
              <VolumeX className="text-white cursor-pointer" />
            </div>
          ) : (
            <div onClick={() => setMute(!mute)}>
              <Volume2 className="text-white cursor-pointer" />
            </div>
          )}
        </div>
        <ReactPlayer
          url={"/home/video.mp4"}
          width="100%"
          height="auto"
          playing
          loop
          muted={mute === true}
          className="object-cover !z-1"
        />
      </div>

      <div className="px-4 mt-14 lg:grid lg:grid-cols-2 gap-4 lg:px-48">
        <div className="flex flex-col gap-4">
          {/* First Block */}
          <div className="flex items-end bg-[url('/img/offerzone/offerzone1.png')] rounded-2xl bg-cover bg-center h-[18rem] lg:h-[22rem]">
            <div className="flex flex-col gap-4 p-6">
              <div className="text-2xl lg:text-3xl font-bold">
                Save on
                <span className="font-medium">
                  <br /> Printers
                </span>
              </div>
              <div className="font-bold bg-red-500 text-white px-5 h-9 rounded-md text-sm flex items-center gap-1">
                Coming Soon
              </div>
            </div>
          </div>

          {/* Two small blocks */}
          <div className="flex flex-col lg:grid md:grid md:grid-cols-2 lg:grid-cols-2 gap-5">
            <div className="bg-[url('/img/offerzone/offerzone3.png')] rounded-2xl bg-cover bg-center h-[18rem] lg:h-[19rem]">
              <div className="flex flex-col gap-4 p-6">
                <div className="text-2xl text-center font-bold">
                  Office Chairs
                  <span className="font-medium pl-1">at Discounted Rates</span>
                </div>
                <div className="mx-auto font-bold bg-red-500 text-white px-5 h-9 rounded-md text-sm flex items-center gap-1">
                  Coming Soon
                </div>
              </div>
            </div>
            <div className="bg-[url('/img/offerzone/offerzone4.png')] rounded-2xl bg-cover bg-center h-[18rem] lg:h-[19rem]">
              <div className="flex flex-col gap-4 text-white p-6">
                <div className="text-2xl text-center font-bold">
                  <span className="font-medium">
                    Affordable Storage
                    <br className="hidden lg:block" />
                  </span>
                  Solutions
                </div>
                <Link
                  to={`/store?category=19`}
                  className="text-[1rem] underline underline-offset-8 flex justify-center items-center gap-1"
                >
                  Shop Now <ArrowRight className="stroke-[1.4] w-[1.3rem]" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right section */}
        <div className="flex lg:pt-0 pt-5 flex-col gap-5">
          <div className="bg-[url('/img/offerzone/offerzone2.png')] rounded-2xl bg-cover bg-center h-[18rem] lg:h-[22rem]">
            <div className="flex flex-col gap-28 p-6">
              <div className="text-2xl lg:text-3xl font-bold">
                <span className="font-medium">Premium Safes at </span> <br />
                Unbeatable <br /> Prices
              </div>
              <Link
                to={`/store?category=3`}
                className="text-[1rem] underline underline-offset-8 flex items-center gap-1"
              >
                Shop Now <ArrowRight className="stroke-[1.4] w-[1.3rem]" />
              </Link>
            </div>
          </div>
          <div className="bg-[url('/img/offerzone/offerzone5.png')] rounded-2xl bg-cover bg-center h-[18rem] lg:h-[19rem]">
            <div className="flex flex-col gap-24 p-6">
              <div className="text-2xl font-medium">
                <p className="px-2 bg-black text-[1rem] mb-2 text-white w-fit rounded-sm">
                  LIMITED TIME DEAL
                </p>
                Home Decor <br /> Discounts Available
              </div>
              <div className="font-bold w-fit bg-red-500 text-white px-5 h-9 rounded-md text-sm flex items-center gap-1">
                Coming Soon
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="items-center justify-center py-14 flex-col gap-02">
        <div className="grid sm:grid-cols-2 lg:px-48 px-3">
          <div className="text-[1.5rem] font-semibold">Featured Products</div>
          <div className="flex sm:flex-col sm:text-end sm:justify-end font-semibold underline underline-offset-4">
            <Link to="/top-sellings" className="flex justify-end gap-2" href="">
              More Products <ArrowRight className="stroke-1 w-6" />{" "}
            </Link>
          </div>
        </div>
        <NewArrivalProducts />
      </div>
      <TopOffer />
      <div className="flex px-4 gap-10 text-black lg:px-48 flex-col bg-white w-full py-5 my-10">
        <div className="lg:text-[1.5rem] text-[1.2rem] py-4 font-semibold">
          Top Brands
        </div>
        <BrandCard />
      </div>
      <div className="items-center justify-center lg:py-0 lg:pb-14 md:py-14 flex-col gap-2">
        <div className="lg:grid flex items-center justify-between flex-row lg:grid-cols-2 lg:px-48 px-3">
          <div className="lg:text-[1.5rem] text-[1.2rem] py-4 font-semibold">
            New Arrivals
          </div>
          <div className="lg:flex flex-col text-end justify-end font-semibold underline underline-offset-4">
            <Link to="/new-arrival" className="flex justify-end gap-2" href="">
              View All <ArrowRight className="stroke-1 w-6" />{" "}
            </Link>
          </div>
        </div>
        <FeaturedProducts />
      </div>
      <div
        className="flex flex-col items-center justify-center w-auto lg:h-48 h-[13rem] lg:min-h-[17rem] rounded-lg bg-cover bg-center"
        style={{ backgroundImage: 'url("/img/product/exclusive.png ")' }}
      >
        <div className=" text-black flex gap-1  flex-col justify-center items-center ">
          <div className="lg:text-3xl text-center sm:text-center text-2xl font-semibold">
            Unlock EXCLUSIVE offers <br className="sm:hidden" /> and deals
          </div>
          <div className="text-[.95rem]">
            Sign up for deals, new products and promotions
          </div>
          <SubscribtionForm />
        </div>
      </div>
    </>
  );
}
