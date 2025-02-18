import { useState } from "react";
import LoginScreen from "../components/screens/auth/Login";
import RegisterScreen from "../components/screens/auth/Register";
import { Link } from "react-router-dom";

export default function About() {
  const [openLogin, setLoginOpen] = useState(false);
  const [openRegister, setRegisterOpen] = useState(false);
  return (
    <>
      <LoginScreen
        isOpen={openLogin}
        setIsOpen={setLoginOpen}
        setRegisterOpen={setRegisterOpen}
      />
      <RegisterScreen
        isOpen={openRegister}
        setIsOpen={setRegisterOpen}
        setLoginOpen={setLoginOpen}
      />
      {/* hero */}
      <div className="flex flex-col lg:flex-row lg:h-72 items-center">
        <img
          className="object-cover w-full h-full lg:flex-[0.4]"
          src="/about/hero-0.png"
          alt="about"
        />
        <img
          className="object-cover hidden lg:block w-full h-full lg:flex-[0.6]"
          src="/about/hero-1.png"
          alt="about"
        />
      </div>
      <div className="grid px-4 lg:px-0 lg:grid-cols-2 max-w-5xl mx-auto pt-7 lg:pt-14 py-14">
        <div className="flex items-center lg:items-start max-w-sm flex-col">
          <img
            className="w-full object-cover lg:object-contain"
            src="/about/whyus.png"
            alt="why us"
          />
          <h5 className="font-semibold text-2xl mt-3">
            Expert Advice for Every <br className="hidden lg:block" /> Adventure
          </h5>
          <p className="text-grey mt-1.5 text-justify">
            Whether you're planning your first camping trip or gearing up for an
            epic kayaking expedition, we're dedicated to providing you with the
            guidance and support you need to make informed decisions.
          </p>
          <Link className="font-semibold mt-3 text-linkblack underline underline-offset-4 tracking-[0.1px] text-sm">
            Contact Us
          </Link>
        </div>
        <div className="flex items-center mt-4 lg:mt-0 lg:items-start flex-col">
          <div className="flex items-center gap-2 font-semibold text-linkblack">
            <div className="w-3 h-3 bg-blue" />
            Why Rene?
          </div>
          <h5 className="text-2xl font-bold text-linkblack mt-3">
            Our Commitment to Quality
          </h5>
          <p className="mt-4">
            We believe that the right gear can make all the difference in your
            outdoor pursuits. That's why we carefully curate our selection to
            ensure that every product we offer meets our rigorous standards for
            quality, durability, and performance.
          </p>
          <p className="mt-3">
            From rugged kayaks and spacious tents to reliable rooftop carriers
            for your car, each item in our inventory is designed to withstand
            the demands of even the most challenging environments.
          </p>
          <div className="flex border mt-7 border-gray rounded p-5 flex-col">
            <div className="flex items-center gap-3 font-semibold text-linkblack">
              <img className="w-6 object-contain" src="/tick.png" alt="check" />
              Our Vision
            </div>
            <p className="px-8 mt-2 text-textgrey">
              To inspire and empower individuals to embrace the spirit of
              adventure, connect with nature, and unlock their full potential
              through outdoor exploration.
            </p>
          </div>
          <div className="flex border mt-5 border-gray rounded p-5 flex-col">
            <div className="flex items-center gap-3 font-semibold text-linkblack">
              <img className="w-6 object-contain" src="/tick.png" alt="check" />
              Our Mision
            </div>
            <p className="px-8 mt-2 text-textgrey">
              To provide adventurers of all skill levels with access to
              high-quality gear and equipment that enhances their outdoor
              experiences.
            </p>
          </div>
          <Link className="bg-blue text-white mt-7 w-44 flex items-center justify-center h-11">
            More About Us
          </Link>
        </div>
      </div>
      {/* Stats */}
      <div className="flex flex-col max-w-4xl mx-auto items-center justify-center py-14">
        <div className="flex items-center gap-2 font-semibold text-linkblack">
          <div className="w-3 h-3 bg-blue" />
          Work Process
        </div>
        <h5 className="font-semibold text-3xl my-7">How We Work</h5>
        <div className="grid lg:grid-cols-3 gap-5 mt-5">
          <div className="flex flex-col gap-2 bg-gray/30 rounded-lg p-9 items-center relative">
            <img
              className="h-12 absolute -top-4 object-contain"
              src="/about/count/2.png"
              alt="team memeber"
            />
            <h5 className="font-semibold mt-2 text-lg">Curated Selection</h5>
            <p className="text-sm text-center text-grey">
              We carefully handpick each product in our inventory, ensuring that
              it meets our stringent criteria for quality, durability, and
              performance.
            </p>
          </div>
          <div className="flex flex-col gap-2 bg-gray/30 rounded-lg p-9 items-center relative">
            <img
              className="h-12 absolute -top-4 object-contain"
              src="/about/count/0.png"
              alt="team memeber"
            />
            <h5 className="font-semibold mt-2 text-lg">Expert Guidance</h5>
            <p className="text-sm text-center text-grey">
              Navigating the world of outdoor gear can be overwhelming,
              especially if you're new to the scene. That's where our team of
              experts comes in.
            </p>
          </div>
          <div className="flex flex-col gap-2 bg-gray/30 rounded-lg p-9 items-center relative">
            <img
              className="h-12 absolute -top-4 object-contain"
              src="/about/count/1.png"
              alt="team memeber"
            />
            <h5 className="font-semibold mt-2 text-nowrap text-lg">
              Seamless Shopping Experience
            </h5>
            <p className="text-sm text-center text-grey">
              We believe that shopping for outdoor gear should be a hassle-free
              experience. That's why we've designed our website to be intuitive
              and user-friendly.
            </p>
          </div>
        </div>
      </div>
      <div
        className="lg:h-72 mb-10 lg:mb-0 justify-center flex-col lg:flex-row flex items-center gap-10 w-full bg-cover bg-no-repeat"
        style={{ backgroundImage: `url("/about/stats/hero.png")` }}
      >
        <img
          className="h-36 flex w-full object-contain items-center justify-center border-r border-gray"
          src="/about/stats/1.png"
          alt="stat"
        />
        <img
          className="h-36 flex w-full object-contain items-center justify-center border-r border-gray"
          src="/about/stats/2.png"
          alt="stat"
        />
        <img
          className="h-36 flex w-full object-contain items-center justify-center border-r border-gray"
          src="/about/stats/3.png"
          alt="stat"
        />
        <img
          className="h-36 flex w-full object-contain items-center justify-center border-gray"
          src="/about/stats/4.png"
          alt="stat"
        />
      </div>
      <div
        className="h-24 lg:h-80 flex-col flex w-full bg-cover bg-no-repeat"
        style={{ backgroundImage: `url("/about/Video.png")` }}
      ></div>
      <div className="flex flex-col max-w-4xl mx-auto items-center justify-center py-14">
        <div className="flex items-center gap-2 font-semibold text-linkblack">
          <div className="w-3 h-3 bg-blue" />
          Our Team
        </div>
        <h5 className="font-semibold text-3xl my-7">Meet Our Founders</h5>
        <div className="grid lg:grid-cols-3 gap-3">
          <img src="/about/team/1.png" alt="team memeber" />
          <img src="/about/team/2.png" alt="team memeber" />
          <img src="/about/team/3.png" alt="team memeber" />
        </div>
      </div>
    </>
  );
}
