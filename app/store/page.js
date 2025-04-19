'use client';

import { useEffect, useState } from "react";
import LoginScreen from "../../components/screens/auth/Login";
import RegisterScreen from "../../components/screens/auth/Register";
import { useSearchParams } from 'next/navigation';
import Link from "next/link";
import Filter from "../../components/filters/Filter";
import Pagination from "../../components/pagination/Pagination";
import {
  PRODUCTS,
  BRAND_PRODUCTS,
  newRequest,
  CATEGORY_PRODUCT,
} from "../../components/api/index";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../../components/product/Product";
import { ListFilter, Volume2, VolumeX } from "lucide-react";
import ReactPlayer from "react-player";
import CategoriesByType from "../../components/product/Categories";
import { Helmet } from "react-helmet-async";
import useSeoData from "../../utils/useSeoData";

export default function Shop() {
  const { seoData } = useSeoData();
  const location = useSearchParams();

  const [mute, setMute] = useState(true);
  const searchParams = new URLSearchParams(location.search);
  const brand = searchParams.get("brand");
  const category = searchParams.get("category");
  const productType = searchParams.get("product-type");
  let searchTerm = searchParams.get("q");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState("");
  const [selectedBrands, setSelectedBrands] = useState("");
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [totalPages, setTotalPages] = useState();
  let pageLimit = 12;
  const [menuVisible, isMenuVisible] = useState(false);

  useEffect(() => {
    setCurrentPage(1);
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedPrices([]);
  }, [location]);

  // GET PRODUCTS
  const { data: products, isLoading } = useQuery({
    queryKey: [
      "products",
      currentPage,
      brand,
      selectedCategories,
      selectedPrices,
      category,
      productType,
      searchTerm,
      selectedBrands,
    ],
    queryFn: () =>
      newRequest
        .get(
          `${brand ? BRAND_PRODUCTS : category ? CATEGORY_PRODUCT : PRODUCTS}`,
          {
            params: {
              page: currentPage,
              search: searchTerm,
              brand_id: brand ? parseInt(brand) : "",
              category_id: category ? parseInt(category) : "",
              category: JSON.stringify(selectedCategories),
              price: JSON.stringify(selectedPrices),
              brand: JSON.stringify(selectedBrands),
              product_type:
                productType == "office" ? 2 : productType == "home" ? 1 : null,
              limit: pageLimit,
            },
          }
        )
        .then((res) => {
          return res.data;
        }),
  });

  useEffect(() => {
    setTotalPages(products?.data?.last_page);
  }, [products]);

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const generatePageNumbers = () => {
    const visiblePageCount = 7;
    const halfVisiblePages = Math.floor(visiblePageCount / 2);
    const startPage = Math.max(1, currentPage - halfVisiblePages);
    const endPage = Math.min(totalPages, startPage + visiblePageCount - 1);
    const pageNumbers = [];
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const pageNumbers = generatePageNumbers();

  const [openLogin, setLoginOpen] = useState(false);
  const [openRegister, setRegisterOpen] = useState(false);

  if (isLoading) {
    return (
      <div className="h-5 w-5 mx-auto my-40 animate-spin rounded-full border-b-2 border-blue"></div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Buddy Star | {productType ?? "Store"}</title>
        <meta
          name="description"
          content="Welcome to buddyuae.com,Your Office and Home Buddy , Explore our wide selection of Home and Office equipment"
        />
        <meta
          name="keywords"
          content={
            productType === "office"
              ? seoData?.office_buddy
              : seoData?.home_buddy
          }
        />
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
      {category ? (
        <div className="px-4 lg:px-48 py-3 lg:py-8">
          <div
            className=" relative flex h-56 py-5 justify-between bg-gray/30 items-center  bg-no-repeat bg-cover"
            style={{ backgroundImage: 'url("/product/officeequipment.png")' }}
          >
            <div className="flex px-12 flex-col text-white">
              <div className="text-sm  px-4 text-start   breadcrumbs">
                <ul>
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li className=" capitalize font-medium">Category</li>
                </ul>
              </div>
              <h5 className="text-4xl  my-2 font-semibold  max-w-md">
                Office/Home Equipment
              </h5>
            </div>
          </div>
        </div>
      ) : (
        <div className="px-4 md:px-16 lg:px-48 py-8 pb-0">
          {productType === "office" ? (
            <div
              className="relative items-center flex flex-col md:flex-row lg:h-[30rem] md:h-[30rem] sm:h-[25rem] h-[17rem] w-full lg:gap-0 gap-y-8 md:gap-y-0 md:gap-x-16 bg-gray/30 bg-no-repeat bg-cover"
              style={{ backgroundImage: 'url("store/home-buddy.1.png")' }}
            >
              <div className="flex px-4 lg:pb-24 sm:px-8 md:px-16 py-5 flex-col text-white lg:pl-36">
                <div className="text-sm lg:mb-4 text-start breadcrumbs">
                  <ul>
                    <li>
                      <Link href="/">Home</Link>
                    </li>
                    <li className="capitalize font-medium">Store</li>
                  </ul>
                </div>
                <h5 className="text-xl sm:text-2xl md:text-[40px] my-2 lg:mb-11 font-medium max-w-md">
                  Office Buddy
                </h5>
                <div className="max-w-[29rem] border-t border-[#FFFFFF66] my-4 md:my-6 md:mt-16 py-4 text-balance">
                  <p className="text-[1.rem] font-light">
                    Discover office essentials, from ergonomic furniture to
                    advanced electronics, for a productive and modern workspace.
                  </p>
                </div>
              </div>

              <div className="hidden lg:flex justify-center md:justify-end sm:pb-12 items-end mt-4 md:mt-10">
                <img
                  className="w-48 lg:w-72 sm:w-36 md:w-96"
                  src="/store/home1.png"
                  alt=""
                />
              </div>
            </div>
          ) : productType === "home" ? (
            <div
              className="relative flex flex-col md:flex-row py-5 w-full md:h-[30] lg:h-[30rem] gap-y-4 md:gap-y-0 md:gap-x-16 lg:gap-x-24 bg-gray/30 bg-no-repeat bg-cover"
              style={{ backgroundImage: 'url("/store/home-buddy.png")' }}
            >
              <div className="flex px-4 lg:pb-24 sm:px-8 md:px-16 py-5 flex-col text-white lg:pl-36">
                <div className="text-sm lg:mb-4 text-start breadcrumbs">
                  <ul>
                    <li>
                      <Link href="/">Home</Link>
                    </li>
                    <li className="capitalize font-medium">Store</li>
                  </ul>
                </div>
                <h5 className="text-xl sm:text-2xl md:text-[40px] my-2 lg:mb-11 font-medium max-w-md">
                  Home Buddy
                </h5>
                <div className="max-w-md border-t border-[#FFFFFF66] my-4 md:mt-5 py-4 md:text-balance">
                  <p>
                    Discover home essentials, from innovative appliances to
                    stylish furniture, for a functional and beautiful living
                    space
                  </p>
                </div>
              </div>
              <div className="hidden lg:flex justify-center md:justify-end items-end">
                <img
                  className="w-44 lg:w-56 md:w-36"
                  src="/store/home.png"
                  alt="Office"
                />
              </div>
            </div>
          ) : (
            <div
              className="relative flex flex-col md:flex-row py-5 w-full md:h-[30] lg:h-[30rem] gap-y-4 md:gap-y-0 md:gap-x-16 lg:gap-x-24 bg-gray/30 bg-no-repeat bg-cover"
              style={{ backgroundImage: 'url("/store/home-buddy.png")' }}
            >
              <div className="flex px-4 lg:pb-24 sm:px-8 md:px-16 py-5 flex-col text-white lg:pl-36">
                <div className="text-sm lg:mb-4 text-start breadcrumbs">
                  <ul>
                    <li>
                      <Link href="/">Home</Link>
                    </li>
                    <li className="capitalize font-medium">Store</li>
                  </ul>
                </div>
                <h5 className="text-xl sm:text-2xl md:text-[40px] my-2 lg:mb-11 font-medium max-w-md">
                  Shop Now
                </h5>
                <div className="max-w-md border-t border-[#FFFFFF66] my-4 md:mt-5 py-4 md:text-balance">
                  <p>
                    Discover home essentials, from innovative appliances to
                    stylish furniture, for a functional and beautiful living
                    space
                  </p>
                </div>
              </div>
              <div className="flex justify-center md:justify-end items-end">
                <img
                  className="w-36 sm:w-28 lg:w-56 md:w-36"
                  src="/store/home.png"
                  alt="Office"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {productType === "home" || productType === "office" ? (
        <div className="mt-4 relative w-full px-4 md:px-8 lg:px-48">
          <div className="absolute z-50 lg:top-4 px-3 lg:px-7 py-3 lg:py-7">
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
            url={
              productType === "office"
                ? "./store/office.mp4"
                : "./store/home.mp4"
            }
            width="100%"
            height="auto"
            playing
            loop
            muted={mute === true}
            className="object-cover !z-1"
          />
        </div>
      ) : null}

      {category ? null : (
        <div className="flex pt-7 px-4 md:px-8 lg:px-48 flex-col items-start gap-7">
          <div className="text-xl capitalize font-bold">
            {productType || "All"} Categories
          </div>
          <CategoriesByType
            productType={productType}
            setSelectedCategories={setSelectedCategories}
            selectedCategories={selectedCategories}
            brand={brand}
          />
        </div>
      )}

      <div className="flex px-4 lg:pt-0 sm:px-20 xl:px-48 justify-center lg:py-14 py-6 flex-col gap-5">
        <div className="flex justify-between items-center lg:justify-start">
          <button
            onClick={() => isMenuVisible(true)}
            className="bg-blue rounded font-semibold flex items-center justify-center gap-2 w-fit px-4 h-10 my-2 text-white lg:hidden"
          >
            <ListFilter className="h-5" /> Filter
          </button>
          <h5 className="lg:hidden text-lineblack text-[1rem] lg:text-2xl font-semibold w-fit">
            Products
          </h5>
        </div>
        <div className="flex lg:flex-row flex-col gap-5 w-full">
          <Filter
            productType={productType}
            menuVisible={menuVisible}
            isMenuVisible={isMenuVisible}
            selectedPrices={selectedPrices}
            setSelectedPrices={setSelectedPrices}
            selectedBrands={selectedBrands}
            setSelectedBrands={setSelectedBrands}
            selectedCategories={selectedCategories}
            type={brand ? "brand" : ""}
            categoryId={category}
          />
          <div className="flex flex-col gap-8 lg:gap-2.5 w-full">
            <div className="grid w-full md:grid-cols-2 lg:grid-cols-4 gap-5">
              {products?.data?.data?.map((product) => {
                // let discount = (product?.unit_price * product?.discount) / 100;
                // let discountedPrice = product?.unit_price - discount;
                return (
                  <ProductCard
                    key={product?.id}
                    product={product}
                    // discountedPrice={discountedPrice}
                  />
                );
              })}
            </div>
            <Pagination
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              goToNextPage={goToNextPage}
              goToPreviousPage={goToPreviousPage}
              totalPages={totalPages}
              pageNumbers={pageNumbers}
            />
          </div>
        </div>
      </div>
    </>
  );
}
