import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { ASPER_TYPE_CATEGORY, newRequest } from "../../api";

export default function CategoriesByType({
  productType,
  setSelectedCategories,
  selectedCategories,
  brand,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  let pageLimit = 100;
  // GET
  const { data: categoriesPerType } = useQuery({
    queryKey: ["categoriesPerType", brand, currentPage, productType],
    queryFn: () =>
      newRequest
        .get(ASPER_TYPE_CATEGORY, {
          params: {
            page: currentPage,
            product_type:
              productType == "office" ? 2 : productType == "home" ? 1 : 0,
            brand_id: brand ? parseInt(brand) : null,
            limit: pageLimit,
          },
        })
        .then((res) => {
          return res.data;
        }),
  });

  const handleCategoryClick = (id) => {
    setSelectedCategories((prev) =>
      prev?.includes(id) ? prev?.filter((catId) => catId !== id) : [...prev, id]
    );
  };
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
  return (
    <div className="lg:grid flex border-b border-b-black/10 pb-7 lg:mb-14 w-full md:grid-cols-6 gap-5 lg:overflow-x-hidden overflow-x-auto whitespace-nowrap">
      {categoriesPerType?.category?.data?.map((category) => (
        <div
          onClick={() => handleCategoryClick(category?.id)}
          key={category?.id}
          className="flex cursor-pointer items-center flex-col gap-3"
        >
          <div
            className={`flex items-center overflow-hidden justify-center h-36 w-36 bg-white border border-black/15 rounded-full ${
              selectedCategories?.includes(category?.id)
                ? "border-8 border-blue/70"
                : ""
            }`}
          >
            <div className="h-24 w-24 overflow-hidden">
              <img
                src={category?.icon}
                alt={category?.name}
                className="h-full w-full object-contain"
              />
            </div>
          </div>
          <h5 className="text-base font-bold w-36 text-center whitespace-normal overflow-hidden text-ellipsis">
            {category?.name}
          </h5>
        </div>
      ))}
    </div>
  );
}
