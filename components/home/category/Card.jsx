// import { useQuery } from "@tanstack/react-query";
import React from "react";
// import { newRequest, FEATURED_CATEGORY } from "../../../api";
import Link from "next/link";

export default function CategoryCard() {
  // GET FEATURED_CATEGORY
  // const { data: featuredCategory, isLoading } = useQuery({
  //   queryKey: ["featuredCategory"],
  //   queryFn: () =>
  //     newRequest.get(FEATURED_CATEGORY).then((res) => {
  //       return res.data;
  //     }),
  // });
  return (
    // <div className="grid w-full lg:grid-cols-3 gap-5">
    //   {categories?.map((i) => (
    //     <div
    //       key={i?.id}
    //       className="group flex relative flex-col justify-between w-full lg:h-48 h-[30rem] lg:min-h-[470px] rounded-xl bg-cover bg-center"
    //       style={{ backgroundImage: `url(${i?.bg})` }}
    //     >
    //       <div className="flex flex-col p-6 gap-3 text-white justify-center text-start">
    //         <div className="flex text-xl font-medium group-hover:text-[1.52rem] ease-in duration-300">
    //           {i?.title}
    //         </div>
    //         <div className="text-justify flex text-sm">{i?.text}</div>
    //       </div>
    //       <div className="text-center justify-center flex">
    //         <img
    //           src={i?.img}
    //           className="object-contain h-48 absolute bottom-14"
    //           alt={i?.title}
    //         />
    //       </div>
    //       <div className="flex flex-col p-6 justify-center text-center group-hover:bg-gradient-to-t from-black group-hover:rounded-lg to-transparent group-hover:z-10 group-hover:pt-28">
    //         <div className="flex justify-center">
    //           <Link
    //             to={`/store?category=${i?.category?.id}`}
    //             className="h-10 w-40 z-0 font-semibold bg-blue  text-[0.94rem] rounded-lg flex items-center justify-center px-7 text-white  bg-blue-500 hover:bg-blue-600  transform transition-transform duration-1000 opacity-0 group-hover:opacity-100 group-hover:-translate-y-5"
    //           >
    //             Shop Now
    //           </Link>
    //         </div>
    //       </div>
    //     </div>
    //   ))}
    // </div>
    <div className="grid w-full md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div
        className="group flex relative flex-col justify-between w-full lg:h-48 h-[30rem] lg:min-h-[470px] rounded-xl bg-cover bg-center"
        style={{ backgroundImage: `url(/img/categories/bg/bg2.png)` }}
      >
        <div className="flex flex-col p-6 gap-3 text-white justify-center text-start">
          <div className="flex text-xl font-medium group-hover:text-[1.52rem] ease-in duration-300">
            Fire Safes
          </div>
          <div className="text-justify flex text-sm">
            Safeguard your valuables and documents with our top-rated fire
            safes, built to endure extreme temperatures and flame damage.
          </div>
        </div>
        <div className="text-center justify-center flex">
          <img
            src={"/home/card/Fire-Safes-card.png"}
            className="object-contain h-56 md:h-64 lg:h-56 absolute bottom-3"
            alt="Locker"
          />
        </div>
        <div className="flex flex-col p-6 justify-center text-center group-hover:bg-gradient-to-t from-black group-hover:rounded-lg to-transparent group-hover:z-10 group-hover:pt-28">
          <div className="flex justify-center">
            <Link
              href={`/store?category=12`}
              className="h-10 w-40 z-0 font-semibold bg-blue  text-[0.94rem] rounded-lg flex items-center justify-center px-7 text-white  bg-blue-500 hover:bg-blue-600  transform transition-transform duration-1000 opacity-0 group-hover:opacity-100 group-hover:-translate-y-5"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
      <div
        className="group flex relative flex-col justify-between w-full lg:h-48 h-[30rem] lg:min-h-[470px] rounded-xl bg-cover bg-center"
        style={{ backgroundImage: `url(/img/categories/bg/bg2.png` }}
      >
        <div className="flex flex-col p-6 gap-3 text-white justify-center text-start">
          <div className="flex text-xl font-medium group-hover:text-[1.52rem] ease-in duration-300">
            Filing Cabinets
          </div>
          <div className="text-justify flex text-sm">
            Stay organized with our versatile filing cabinets, available in
            various sizes and styles for home, office.
          </div>
        </div>
        <div className="text-center justify-center flex">
          <img
            src={"/home/card/card-2.png"}
            className="object-contain h-56 md:h-72 lg:h-60 absolute bottom-2"
            alt="Locker"
          />
        </div>
        <div className="flex flex-col p-6 justify-center text-center group-hover:bg-gradient-to-t from-black group-hover:rounded-lg to-transparent group-hover:z-10 group-hover:pt-28">
          <div className="flex justify-center">
            <Link
              href={`/store?category=11`}
              className="h-10 w-40 z-0 font-semibold bg-blue  text-[0.94rem] rounded-lg flex items-center justify-center px-7 text-white  bg-blue-500 hover:bg-blue-600  transform transition-transform duration-1000 opacity-0 group-hover:opacity-100 group-hover:-translate-y-5"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
      <div
        className="group flex relative flex-col justify-between w-full lg:h-48 h-[30rem] lg:min-h-[470px] rounded-xl bg-cover bg-center"
        style={{ backgroundImage: `url(/img/categories/bg/bg2.png` }}
      >
        <div className="flex flex-col p-6 gap-3 text-white justify-center text-start">
          <div className="flex text-xl font-medium group-hover:text-[1.52rem] ease-in duration-300">
            Burglary Safes
          </div>
          <div className="text-justify flex text-sm">
            Protect your valuables with our robust burglary safes, designed to
            resist tampering and break-ins.
          </div>
        </div>
        <div className="text-center justify-center flex">
          <img
            src={"/home/card/card-3.png"}
            className="object-contain h-56 md:h-60 lg:h-56 lg-56 absolute bottom-6"
            alt="Locker"
          />
        </div>
        <div className="flex flex-col p-6 justify-center text-center group-hover:bg-gradient-to-t from-black group-hover:rounded-lg to-transparent group-hover:z-10 group-hover:pt-28">
          <div className="flex justify-center">
            <Link
              href={`/store?category=13`}
              className="h-10 w-40 z-0 font-semibold bg-blue  text-[0.94rem] rounded-lg flex items-center justify-center px-7 text-white  bg-blue-500 hover:bg-blue-600  transform transition-transform duration-1000 opacity-0 group-hover:opacity-100 group-hover:-translate-y-5"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
      <div
        className="group flex relative flex-col justify-between w-full lg:h-48 h-[30rem] lg:min-h-[470px] rounded-xl bg-cover bg-center"
        style={{ backgroundImage: `url(/img/categories/bg/bg2.png` }}
      >
        <div className="flex flex-col p-6 gap-3 text-white justify-center text-start">
          <div className="flex text-xl font-medium group-hover:text-[1.52rem] ease-in duration-300">
            Premium Safes
          </div>
          <div className="text-justify flex text-sm">
            Experience top-tier protection and style with our Premium Luxury
            Fire Safes. Combining advanced fire resistance with elegant design,
            these safes offer customizable interiors, exquisite finishes, and
            cutting-edge locking systems for safeguarding valuable assets and
            documents.
          </div>
        </div>
        <div className="text-center justify-center flex">
          <img
            src={"/home/card/card-4.png"}
            className="object-contain h-64 md:h-56 lg:h-56 absolute bottom-4"
            alt="Locker"
          />
        </div>
        <div className="flex flex-col p-6 justify-center text-center group-hover:bg-gradient-to-t from-black group-hover:rounded-lg to-transparent group-hover:z-10 group-hover:pt-28">
          <div className="flex justify-center">
            <Link
              href={`/store?category=14`}
              className="h-10 w-40 z-0 font-semibold bg-blue  text-[0.94rem] rounded-lg flex items-center justify-center px-7 text-white  bg-blue-500 hover:bg-blue-600  transform transition-transform duration-1000 opacity-0 group-hover:opacity-100 group-hover:-translate-y-5"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
      <div
        className="group flex relative flex-col justify-between w-full lg:h-48 h-[30rem] lg:min-h-[470px] rounded-xl bg-cover bg-center"
        style={{ backgroundImage: `url(/home/card/wall.jpg` }}
      >
        <div className="flex flex-col p-6 gap-3 text-white justify-center text-start">
          <div className="flex text-xl font-medium group-hover:text-[1.52rem] ease-in duration-300">
            Vault Doors
          </div>
          <div className="text-justify flex text-sm">
            Secure your valuables with our premium Vault Doors, featuring
            advanced locks and heavy-duty construction for maximum protection.
          </div>
        </div>
        <div className="text-center justify-center flex">
          <img
            src={"/home/card/card-5.png"}
            className="object-contain h-60 md:h-60 lg:h-56 absolute bottom-6"
            alt="Locker"
          />
        </div>
        <div className="flex flex-col p-6 justify-center text-center group-hover:bg-gradient-to-t from-black group-hover:rounded-lg to-transparent group-hover:z-10 group-hover:pt-28">
          <div className="flex justify-center">
            <Link
              href={`/store?category=15`}
              className="h-10 w-40 z-0 font-semibold bg-blue  text-[0.94rem] rounded-lg flex items-center justify-center px-7 text-white  bg-blue-500 hover:bg-blue-600  transform transition-transform duration-1000 opacity-0 group-hover:opacity-100 group-hover:-translate-y-5"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
      <div
        className="group flex relative flex-col justify-between w-full lg:h-48 h-[30rem] lg:min-h-[470px] rounded-xl bg-cover bg-center"
        style={{ backgroundImage: `url(/img/categories/bg/bg2.png` }}
      >
        <div className="flex flex-col p-6 gap-3 text-white justify-center text-start">
          <div className="flex text-xl font-medium group-hover:text-[1.52rem] ease-in duration-300">
            Mobile Shelving System
          </div>
          <div className="text-justify flex text-sm">
            Maximize storage efficiency with our Mobile Shelving Systems,
            featuring rolling shelves that move smoothly along tracks
          </div>
        </div>
        <div className="text-center justify-center flex">
          <img
            src={"/home/card/card-6.jpg"}
            className="object-contain h-56 absolute bottom-5"
            alt="Locker"
          />
        </div>
        <div className="flex flex-col p-6 justify-center text-center group-hover:bg-gradient-to-t from-black group-hover:rounded-lg to-transparent group-hover:z-10 group-hover:pt-28">
          <div className="flex justify-center">
            <Link
              href={`/store?category=16`}
              className="h-10 w-40 z-0 font-semibold bg-blue  text-[0.94rem] rounded-lg flex items-center justify-center px-7 text-white  bg-blue-500 hover:bg-blue-600  transform transition-transform duration-1000 opacity-0 group-hover:opacity-100 group-hover:-translate-y-5"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
      <div
        className="group flex relative flex-col justify-between w-full lg:h-48 h-[30rem] lg:min-h-[470px] rounded-xl bg-cover bg-center"
        style={{ backgroundImage: `url(/img/categories/bg/bg2.png` }}
      >
        <div className="flex flex-col p-6 gap-3 text-white justify-center text-start">
          <div className="flex text-xl font-medium group-hover:text-[1.52rem] ease-in duration-300">
            Paper Shredders, Laminating and Binding machines.
          </div>
          <div className="text-justify flex text-sm">
            Securely protect your confidential information with our efficient
            paper shredders, designed to transform sensitive documents into
            unreadable particles.
          </div>
        </div>
        <div className="text-center justify-center flex">
          <img
            src={"/home/card/card-7.png"}
            className="object-contain h-64 lg:h-64 md:h-60 absolute bottom-1"
            alt="Locker"
          />
        </div>
        <div className="flex flex-col p-6 justify-center text-center group-hover:bg-gradient-to-t from-black group-hover:rounded-lg to-transparent group-hover:z-10 group-hover:pt-28">
          <div className="flex justify-center">
            <Link
              href={`/store?category=17`}
              className="h-10 w-40 z-0 font-semibold bg-blue  text-[0.94rem] rounded-lg flex items-center justify-center px-7 text-white  bg-blue-500 hover:bg-blue-600  transform transition-transform duration-1000 opacity-0 group-hover:opacity-100 group-hover:-translate-y-5"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
      <div
        className="group flex relative flex-col justify-between w-full lg:h-48 h-[30rem] lg:min-h-[470px] rounded-xl bg-cover bg-center"
        style={{ backgroundImage: `url(/home/card/Fire-Safes-bg.png` }}
      >
        <div className="flex flex-col p-6 gap-3 text-white justify-center text-start">
          <div className="flex text-xl font-medium group-hover:text-[1.52rem] ease-in duration-300">
            Currency Counting Machines
          </div>
          <div className="text-justify flex text-sm">
            Streamline your cash handling with our advanced currency counting
            machines, designed for rapid, accurate, and error-free processing of
            banknotes
          </div>
        </div>
        <div className="text-center justify-center flex">
          <img
            src={"/home/card/card-8.png"}
            className="object-contain h-48 lg:h-52 md:h-60 absolute bottom-12"
            alt="Locker"
          />
        </div>
        <div className="flex flex-col p-6 justify-center text-center group-hover:bg-gradient-to-t from-black group-hover:rounded-lg to-transparent group-hover:z-10 group-hover:pt-28">
          <div className="flex justify-center">
            <Link
              href={`/store?category=10`}
              className="h-10 w-40 z-0 font-semibold bg-blue  text-[0.94rem] rounded-lg flex items-center justify-center px-7 text-white  bg-blue-500 hover:bg-blue-600  transform transition-transform duration-1000 opacity-0 group-hover:opacity-100 group-hover:-translate-y-5"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
      <div
        className="group flex relative flex-col justify-between w-full lg:h-48 h-[30rem] lg:min-h-[470px] rounded-xl bg-cover bg-center"
        style={{ backgroundImage: `url(/home/card/wall.jpg)` }}
      >
        <div className="flex flex-col p-6 gap-3 text-white justify-center text-start">
          <div className="flex text-xl font-medium group-hover:text-[1.52rem] ease-in duration-300">
            Interactive Displays
          </div>
          <div className="text-justify flex text-sm">
            Elevate your presentations and engagements with our interactive
            displays, designed to deliver an immersive, touch-responsive
            experience that captivates and connects with your audience
          </div>
        </div>
        <div className="text-center justify-center flex">
          <img
            src={"/home/card/card-9.png"}
            className="object-contain h-52 lg:h-60 md:h-52 absolute bottom-0"
            alt="Locker"
          />
        </div>
        <div className="flex flex-col p-6 justify-center text-center group-hover:bg-gradient-to-t from-black group-hover:rounded-lg to-transparent group-hover:z-10 group-hover:pt-28">
          <div className="flex justify-center">
            <div className="h-10 w-40 z-0 font-semibold bg-red-500 text-[0.94rem] rounded-lg flex items-center justify-center px-7 text-white  bg-blue-500 hover:bg-blue-600  transform transition-transform duration-1000 opacity-0 group-hover:opacity-100 group-hover:-translate-y-5">
              Coming soon!
            </div>
          </div>
        </div>
      </div>
      <div
        className="group flex relative flex-col justify-between w-full lg:h-48 h-[30rem] lg:min-h-[470px] rounded-xl bg-cover bg-center"
        style={{ backgroundImage: `url(/home/card/back.png` }}
      >
        <div className="flex flex-col p-6 gap-3 text-white justify-center text-start">
          <div className="flex text-xl font-medium group-hover:text-[1.52rem] ease-in duration-300">
            Flip charts and White Boards
          </div>
          <div className="text-justify flex text-sm">
            Capture ideas and inspire creativity with our versatile flip charts,
            designed to enhance brainstorming sessions and presentations with
            ease and clarity.
          </div>
        </div>
        <div className="text-center justify-center flex">
          <img
            src={"/home/card/card-10.jpg"}
            className="object-contain h-72 absolute bottom-0"
            alt="Locker"
          />
        </div>
        <div className="flex flex-col p-6 justify-center text-center group-hover:bg-gradient-to-t from-black group-hover:rounded-lg to-transparent group-hover:z-10 group-hover:pt-28">
          <div className="flex justify-center">
            <Link
              href={`/store?category=1`}
              className="h-10 w-40 z-0 font-semibold bg-blue  text-[0.94rem] rounded-lg flex items-center justify-center px-7 text-white  bg-blue-500 hover:bg-blue-600  transform transition-transform duration-1000 opacity-0 group-hover:opacity-100 group-hover:-translate-y-5"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>
      <div
        className="group flex relative flex-col justify-between w-full lg:h-48 h-[30rem] lg:min-h-[470px] rounded-xl bg-cover bg-center"
        style={{ backgroundImage: `url(/home/card/wall.jpg)` }}
      >
        <div className="flex flex-col p-6 gap-3 text-white justify-center text-start">
          <div className="flex text-xl font-medium group-hover:text-[1.52rem] ease-in duration-300">
            Furniture
          </div>
          <div className="text-justify flex text-sm">
            Elevate your workspace with our stylish and functional office
            furniture, crafted to enhance comfort and productivity. From
            ergonomic chairs to versatile desks, our collection combines quality
            and design to create a workspace that works for you.
          </div>
        </div>
        <div className="text-center justify-center flex">
          <img
            src={"/home/card/card-11.png"}
            className="object-contain h-64 lg:h-60 md:h-60 absolute right-0 bottom-2"
            alt="Locker"
          />
        </div>
        <div className="flex flex-col p-6 justify-center text-center group-hover:bg-gradient-to-t from-black group-hover:rounded-lg to-transparent group-hover:z-10 group-hover:pt-28">
          <div className="flex justify-center">
            <div className="h-10 w-40 z-0 font-semibold bg-red-500 text-[0.94rem] rounded-lg flex items-center justify-center px-7 text-white  bg-blue-500 hover:bg-blue-600  transform transition-transform duration-1000 opacity-0 group-hover:opacity-100 group-hover:-translate-y-5">
              Coming soon!
            </div>
          </div>
        </div>
      </div>
      <div
        className="group flex relative flex-col justify-between w-full lg:h-48 h-[30rem] lg:min-h-[470px] rounded-xl bg-cover bg-center"
        style={{ backgroundImage: `url(/home/card/wall.jpg)` }}
      >
        <div className="flex flex-col p-6 gap-3 text-white justify-center text-start">
          <div className="flex text-xl font-medium group-hover:text-[1.52rem] ease-in duration-300">
            Other Security Products
          </div>
          <div className="text-justify flex text-sm">
            Explore our diverse selection of miscellaneous security items,
            designed to enhance safety and protect your assets. From advanced
            surveillance tools to secure access solutions, we provide the
            essential components to fortify your security strategy.
          </div>
        </div>
        <div className="text-center justify-center flex">
          <img
            src={"/home/card/others.png"}
            className="object-contain w-[90%] md:w-[79%] absolute  bottom-3 inset-x-0 mx-auto"
            alt="Locker"
          />
        </div>
        <div className="flex flex-col p-6 justify-center text-center group-hover:bg-gradient-to-t from-black group-hover:rounded-lg to-transparent group-hover:z-10 group-hover:pt-28">
          <div className="flex justify-center">
            <div className="h-10 w-40 z-0 font-semibold bg-red-500 text-[0.94rem] rounded-lg flex items-center justify-center px-7 text-white  bg-blue-500 hover:bg-blue-600  transform transition-transform duration-1000 opacity-0 group-hover:opacity-100 group-hover:-translate-y-5">
              Coming soon!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
