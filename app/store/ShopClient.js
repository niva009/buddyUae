'use client';

import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import LoginScreen from "../../components/screens/auth/Login";
import RegisterScreen from "../../components/screens/auth/Register";
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
import CategoriesByType from "../../components/product/Categories";

export default function ShopClient() {
  const location = useSearchParams();

  const [mute, setMute] = useState(true);
  const searchParams = location;

  const brand = searchParams.get("brand");
  const category = searchParams.get("category");
  const productType = searchParams.get("product-type");
  const searchTerm = searchParams.get("q");

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [totalPages, setTotalPages] = useState();
  let pageLimit = 12;
  const [menuVisible, isMenuVisible] = useState(false);
  const [openLogin, setLoginOpen] = useState(false);
  const [openRegister, setRegisterOpen] = useState(false);

  useEffect(() => {
    setCurrentPage(1);
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedPrices([]);
  }, [location.toString()]);

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
        .then((res) => res.data),
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

  if (isLoading) {
    return (
      <div className="h-5 w-5 mx-auto my-40 animate-spin rounded-full border-b-2 border-blue"></div>
    );
  }

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

      {/* Hero Section */}
      {/* ... keep your hero section JSX as-is from your original code ... */}

      {/* Video Section */}
      {(productType === "home" || productType === "office") && (
        <div className="mt-4 relative w-full px-4 md:px-8 lg:px-48">
          <div className="absolute z-50 lg:top-4 px-3 lg:px-7 py-3 lg:py-7">
            {mute ? (
              <VolumeX
                className="text-white cursor-pointer"
                onClick={() => setMute(false)}
              />
            ) : (
              <Volume2
                className="text-white cursor-pointer"
                onClick={() => setMute(true)}
              />
            )}
          </div>
          <video
        autoPlay
        loop
        muted={mute}
        playsInline
        className="object-cover w-full h-auto !z-1"
      >
        <source
          src={
            productType === 'office'
              ? '/store/office.mp4'
              : '/store/home.mp4'
          }
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
        </div>
      )}

      {/* Categories */}
      {!category && (
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

      {/* Product Grid and Filters */}
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
              {products?.data?.data?.map((product) => (
                <ProductCard key={product?.id} product={product} />
              ))}
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
