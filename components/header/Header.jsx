'use client'

import  { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Suspense } from 'react'

import {
  CircleUser,
  Heart,
  Power,
  Search,
  ShoppingCart,
  X,
} from "lucide-react";

import Link from "next/link";
import { useRouter,usePathname, useSearchParams  } from "next/navigation";
import useScroll from "../../hooks/useScroll";
import { webLinks } from "../../constant/link";
import { useUserStore } from "../../lib/slice/user";
import { useQuery } from "@tanstack/react-query";
import { PRODUCTS, newRequest } from "../../components/api/index";
import { useAuthScreenToggleStore } from "../../lib/slice/authScreen";
import { useWishlistStore } from "../../lib/slice/wishlist";
import { useCartStore } from "../../lib/slice/cart";
import SearchList from "./SearchList";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Header() {
  const { user, setUser } = useUserStore((state) => ({
    user: state.user,
    setUser: state.setUser,
  }));
  const navigate = useRouter();
  const pathname = usePathname();
const searchParams = useSearchParams();
  const { cartItems } = useCartStore((state) => ({
    cartItems: state.cartItems,
  }));
  // wishlist
  const { wishlistItems } = useWishlistStore((state) => ({
    wishlistItems: state.wishlistItems,
  }));

  const { setLoginOpen } = useAuthScreenToggleStore((state) => ({
    setLoginOpen: state.setLoginOpen,
  }));

  const [keyword, setKeyword] = useState("");
  const { data: products } = useQuery({
    queryKey: ["productsList", keyword],
    queryFn: () =>
      newRequest
        .get(PRODUCTS, {
          params: {
            search: keyword,
          },
        })
        .then((res) => res.data),
    enabled: !!keyword?.length > 0,
  });

  const scrollPosition = useScroll();


  // State to manage the visibility of the banner
  const [closeSignup, setCloseSignup] = useState(false);

  const currentPath = pathname + "?" + searchParams.toString();

  const isActive = (path) => {
    return currentPath === path;
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setKeyword("");
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isDropdownOpen && !event.target.closest(".dropdown-menu")) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleHome = () => {
    window.scrollTo(0, 0);
    navigate("/");
  };

  return (
    <div className="flex flex-col">
      {!closeSignup && (
        <div className="hidden lg:flex items-center bg-blue font-normal w-full text-white text-sm h-16">
          <div className="flex px-4 sm:px-20 xl:px-48 w-full justify-between relative 2xl:container items-center mx-auto">
            <div className="flex items-center gap-1 font-medium">
              Welcome to <span className="text-lg font-medium">buddyuae.com</span>
              <span className="mt-[2px]">,Your Office and Home Buddy</span>
            </div>
            <div className="flex flex-col font-bold justify-start text-start gap-1">
              <div>
                Call Us :{" "}
                <a
                  target="_blank"
                  href="tel:+971 54 771 7887"
                  className="text-[1.1rem]"
                >
                  +971 54 771 7887
                </a>
              </div>
              <div>Email : buddy@buddyuae.com</div>
            </div>
            <X
              onClick={() => setCloseSignup(true)}
              className="cursor-pointer absolute text-white top-3 right-5 h-5"
            />
          </div>
        </div>
      )}
      <div className="hidden lg:hidden items-center bg-blue font-normal w-full text-white text-sm h-10">
        <div className="flex flex-col font-bold justify-center text-center items-center w-full gap-1">
          <div>
            Call Us :{" "}
            <a
              target="_blank"
              href="tel:+971 54 771 7887"
              className="text-[1.1rem]"
            >
              +971 54 771 7887
            </a>
          </div>
        </div>
      </div>
      <header
        className={`navbar mx-auto justify-between w-full flex bg-transparent h-20 z-50 lg:px-4 sm:px-20 px-3 xl:px-48 ${
          scrollPosition > 70
            ? "bg-white !top-0 fixed shadow inset-x-0"
            : closeSignup
            ? "!top-0"
            : "top-10 2xl:container"
        }`}
      >
        <button onClick={handleHome}>
          <img
            className="w-52 lg:w-full lg:h-32 object-contain"
            src="/Logo_buddy-removebg-preview.png"
            alt="buddy star"
          />
        </button>
        <div
          className={`hidden ml-20 font-medium lg:flex ${
            scrollPosition > 70 ? "text-black" : "text-black"
          }`}
        ></div>
        <div className="lg:flex relative hidden w-full mx-12 lg:-ml-10">
          <div className="flex items-center hover:border transition-all duration-500 hover:border-blue text-black/30 w-full px-4 pe-2 h-10 rounded-full bg-[#F3F5F7]">
            <Search className="h-4" />
            <input
              type="text"
              onChange={(e) => {
                setKeyword(e.target.value);
                if (keyword?.length > 0) {
                  setDropdownOpen(true);
                }
              }}
              value={keyword}
              className="h-full text-black w-full text-sm px-3 bg-transparent"
              placeholder="Search Buddy"
            />
            <button
              onClick={() => {
                navigate(`/store?q=${keyword}`);
                setKeyword("");
              }}
              className="h-[2.01rem] w-28 rounded-full bg-blue text-white"
            >
              Search
            </button>
          </div>
          {keyword?.length > 1 && isDropdownOpen ? (
            <SearchList setKeyword={setKeyword} products={products} />
          ) : null}
        </div>

        <div className="flex text-sm lg:gap-7 lg:mr-2 gap-5 items-center">
          <Link href={"/wishlist"} className="flex flex-row relative ml-3 gap-1">
            <Heart className="text-[#2b2b2b]" />
            {wishlistItems?.length > 0 && (
              <div className="flex absolute -top-2 -right-3 bg-red-500 text-white h-5 w-5 text-xs font-bold items-center justify-center rounded-full">
                {wishlistItems?.length}
              </div>
            )}
          </Link>
          <Link href={"/cart"} className="flex flex-row relative gap-1">
            <ShoppingCart className="text-[#2b2b2b]" />
            {cartItems?.length > 0 && (
              <div className="flex absolute -top-3 -right-3.5 bg-black text-white h-5 w-5 text-xs font-bold items-center justify-center rounded-full">
                {cartItems?.length}
              </div>
            )}
          </Link>
          {user?.name ? (
            <Menu as="div" className="relative">
              <Menu.Button>
                <div className="flex mt-1.5 font-medium items-center lg:min-w-28 gap-2">
                  <CircleUser className="text-[#2b2b2b]" />
                  <span className="hidden lg:block">{user?.name}</span>
                </div>
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute text-[#777777] right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/profile"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 pt-3 pb-2 text-[0.9rem] text-gray-700"
                        )}
                      >
                        Profile
                      </Link>
                    )}
                  </Menu.Item>
                  <div className="flex w-[92%] mx-auto h-[0.7px] bg-gray/40" />
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        href="/orders"
                        className={classNames(
                          active ? "bg-gray-100" : "",
                          "block px-4 pt-3 pb-2 text-[0.9rem] text-gray-700"
                        )}
                      >
                        My Orders
                      </Link>
                    )}
                  </Menu.Item>
                  <div className="flex w-[92%] mx-auto h-[0.7px] bg-gray/40" />
                  <Menu.Item>
                    <button
                      onClick={() => {
                        localStorage.removeItem("secret_token");
                        localStorage.removeItem("user_id");
                        setUser({});
                      }}
                      className="bg-[#BF464608] px-4 py-3 w-full flex text-sm items-center justify-center text-[#D12323] font-medium"
                    >
                      <Power className="h-4" />
                      Logout
                    </button>
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          ) : (
            <div
              className="font-semibold hover:scale-[1.02] transition-all duration-500 cursor-pointer"
              onClick={() => setLoginOpen(true)}
            >
              <CircleUser className="text-[#2b2b2b]" />
            </div>
          )}
        </div>
      </header>
      <div className="lg:flex lg:justify-center py-0 bg-black text-white font-semibold lg:px-48 overflow-x-auto">
        <div className="flex flex-row md:justify-center w-full lg:justify-normal items-center">
          <ul className="menu menu-horizontal flex mx-auto flex-nowrap text-sm px-1 lg:space-x-4">
            {webLinks
              ?.filter((i) => i.name !== "Contact Us")
              .map((i) => (
                <li key={i?.id}>
                  <Link
                    href={i?.href}
                    className={`${
                      isActive(i.href) ? "text-blue font-bold" : "text-white"
                    } hover:text-blue lg:hidden transition-colors duration-300`}
                  >
                    {i?.name}
                  </Link>
                </li>
              ))}
            {webLinks?.map((i) => (
              <li key={i?.id}>
                <Link
                  href={i?.href}
                  className={`hidden lg:flex ${
                    isActive(i.href) ? "text-blue font-bold" : "text-white"
                  } hover:text-blue transition-colors duration-300`}
                >
                  {i?.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex lg:hidden relative w-full">
        <div className="flex items-center hover:border transition-all duration-500 hover:border-blue text-black/30 w-full px-4 pe-2 h-11 bg-[#F3F5F7]">
          <Search className="h-4" />
          <input
            type="text"
            onChange={(e) => {
              setKeyword(e.target.value);
              if (keyword?.length > 0) {
                setDropdownOpen(true);
              }
            }}
            value={keyword}
            className="h-full text-black w-full text-sm px-3 bg-transparent"
            placeholder="Search Buddy"
          />
          <button
            onClick={() => {
              navigate(`/store?q=${keyword}`);
              setKeyword("");
            }}
            className="h-[2.01rem] w-28 rounded-full bg-blue text-white"
          >
            Search
          </button>
        </div>
        {keyword?.length > 1 && isDropdownOpen ? (
          <SearchList setKeyword={setKeyword} products={products} />
        ) : null}
      </div>
    </div>
  );
}
