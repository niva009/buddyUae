import { useEffect, useState } from "react";
import LoginScreen from "../../components/screens/auth/Login";
import RegisterScreen from "../../components/screens/auth/Register";
import { Link, useParams } from "react-router-dom";
import Filter from "../../components/filters/Filter";
import { FEATURED_PRODUCT, LATEST_PRODUCT, newRequest } from "../../api";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../../components/product/Product";
import Pagination from "../../components/pagination/Pagination";
import CategoriesByType from "../../components/product/Categories";
import { ListFilter } from "lucide-react";
import { Helmet } from "react-helmet-async";
import useSeoData from "../../utils/useSeoData";

export default function NewArrivals() {
  const { param } = useParams();
  const { seoData } = useSeoData();
  const [menuVisible, isMenuVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [selectedCategories, setSelectedCategories] = useState("");
  const [selectedBrands, setSelectedBrands] = useState("");
  const [selectedPrices, setSelectedPrices] = useState([]);

  let pageLimit = 12;
  // GET LATEST PRODUCTS
  const { data: latestProducts } = useQuery({
    queryKey: [
      "latestProducts",
      currentPage,
      param,
      selectedPrices,
      selectedBrands,
      selectedCategories,
    ],
    queryFn: () =>
      newRequest
        .get(
          `${param === "top-sellings" ? FEATURED_PRODUCT : LATEST_PRODUCT}`,
          {
            params: {
              page: currentPage,
              limit: pageLimit,
              category: JSON.stringify(selectedCategories),
              price: JSON.stringify(selectedPrices),
              brand: JSON.stringify(selectedBrands),
            },
          }
        )
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
        <title>Buddy Star | New Arrivals</title>
        <meta
          name="description"
          content="Welcome to buddyuae.com,Your Office and Home Buddy , Explore our wide selection of Home and Office equipment"
        />
        <meta name="keywords" content={seoData?.home_buddy} />
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

          <img
            className="h-60 hidden lg:block"
            src="/store/hero0.png"
            alt="brand hero"
          />
        </div>
      </>
      <div className="flex pt-7 px-4 md:px-8 lg:px-48 flex-col items-start gap-7">
        <div className="text-xl capitalize font-bold">All Categories</div>
        <CategoriesByType
          productType={""}
          setSelectedCategories={setSelectedCategories}
          selectedCategories={selectedCategories}
        />
      </div>
      <div className="flex px-4 sm:px-20 xl:px-48 justify-center py-8 lg:py-14 flex-col gap-5">
        <div className="flex lg:justify-start justify-between">
          <button
            onClick={() => isMenuVisible(true)}
            className="bg-blue rounded font-semibold flex items-center justify-center gap-2 w-fit px-4 h-10 my-2 text-white lg:hidden"
          >
            <ListFilter className="h-5" /> Filter
          </button>
          <h5 className="flex text-lineblack items-start text-2xl font-semibold w-fit">
            Products
          </h5>
        </div>
        <div className="flex gap-5 w-full">
          <Filter
            productType={""}
            menuVisible={menuVisible}
            isMenuVisible={isMenuVisible}
            selectedPrices={selectedPrices}
            setSelectedPrices={setSelectedPrices}
            selectedBrands={selectedBrands}
            setSelectedBrands={setSelectedBrands}
          />
          <div className="flex flex-col lg:gap-2.5 gap-4 w-full">
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
