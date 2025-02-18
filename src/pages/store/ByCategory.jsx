import { useEffect, useState } from "react";
import LoginScreen from "../../components/screens/auth/Login";
import RegisterScreen from "../../components/screens/auth/Register";
import { Link, useParams } from "react-router-dom";
import Filter from "../../components/filters/Filter";
import { CATEGORY_PRODUCT, newRequest } from "../../api";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../../components/product/Product";
import Pagination from "../../components/pagination/Pagination";
import useSeoData from "../../utils/useSeoData";
import { Helmet } from "react-helmet-async";

export default function ShopByCategory() {
  const { category } = useParams();
  const { seoData } = useSeoData();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [selectedCategories, setSelectedCategories] = useState("");
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [menuVisible, isMenuVisible] = useState(false);
  let pageLimit = 12;

  // GET CATEGORY PRODUCTS
  const { data: latestProducts } = useQuery({
    queryKey: [
      "latestProducts",
      currentPage,
      category,
      selectedCategories,
      selectedPrices,
    ],
    queryFn: () =>
      newRequest
        .get(CATEGORY_PRODUCT, {
          params: {
            page: currentPage,
            limit: pageLimit,
            category_id: parseInt(category),
            category: JSON.stringify(selectedCategories),
            price: JSON.stringify(selectedPrices),
          },
        })
        .then((res) => {
          return res.data;
        }),
  });

  useEffect(() => {
    setTotalPages(latestProducts?.data?.last_page);
  }, [latestProducts]);

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
  return (
    <>
      <Helmet>
        <title>Buddy Star | Category Page</title>
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
      <>
        <div className="text-sm px-4 sm:px-20 xl:px-48 breadcrumbs">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li className="text-blue capitalize font-medium">
              {param === "top-sellings" ? "Top Sellings" : "New Arrivals"}
            </li>
          </ul>
        </div>
        {/* hero */}
        <div className="flex px-4 sm:px-20 xl:px-48 py-5 justify-between bg-[#FEFFD1] items-center">
          <div className="flex flex-col">
            <h5 className="text-3xl my-2 font-black text-linkblack max-w-md">
              Be ahead of the curve with our newest arrivals.
            </h5>
            <p className="text-lg mt-2 font-medium">Discover What's New!</p>
          </div>
          <img className="h-60" src="/store/hero0.png" alt="brand hero" />
        </div>
      </>
      <div className="flex px-4 sm:px-20 xl:px-48 justify-center py-14 flex-col gap-5">
        <button
          onClick={() => isMenuVisible(true)}
          class="bg-blue rounded-lg py-2-3 px-4 text-white lg:hidden"
        >
          Filter
        </button>
        <h5 className="flex text-lineblack items-start text-2xl font-semibold w-fit">
          Products
        </h5>
        <div className="flex gap-5 w-full">
          {/* filter */}
          <Filter
            menuVisible={menuVisible}
            isMenuVisible={isMenuVisible}
            selectedPrices={selectedPrices}
            setSelectedPrices={setSelectedPrices}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
          <div className="flex flex-col gap-2.5 w-full">
            <div className="flex justify-between w-full items-center">
              <div></div>
              <div className="flex text-grey/80 font-medium items-center gap-3 text-sm">
                <span> Showing 1-10 of 100 Products</span>
                <span>
                  Sort by:{" "}
                  <span className="text-blue font-medium">Most Popular</span>
                </span>
              </div>
            </div>
            <div className="grid w-full lg:grid-cols-4 gap-5">
              {latestProducts?.data?.data?.map((product) => {
                let discount =
                  (product?.product?.unit_price * product?.product?.discount) /
                  100;
                let discountedPrice = product?.product?.unit_price - discount;
                return (
                  <ProductCard
                    key={product?.id}
                    product={product?.product}
                    discountedPrice={discountedPrice}
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
