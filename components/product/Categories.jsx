'use client';

import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { ASPER_TYPE_CATEGORY, newRequest } from "../../components/api/index";

export default function CategoriesByType({
  productType,
  setSelectedCategories,
  selectedCategories,
  brand,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageLimit = 100;

  // Fetch categories
  const { data: categoriesPerType, isLoading } = useQuery({
    queryKey: ["categoriesPerType", brand, currentPage, productType],
    queryFn: () =>
      newRequest
        .get(ASPER_TYPE_CATEGORY, {
          params: {
            page: currentPage,
            product_type:
              productType === "office" ? 2 : productType === "home" ? 1 : 0,
            brand_id: brand ? parseInt(brand) : null,
            limit: pageLimit,
          },
        })
        .then((res) => res.data),
  });

  const totalPages = categoriesPerType?.category?.last_page || 1;

  const handleCategoryClick = (id) => {
    setSelectedCategories((prev) =>
      prev?.includes(id)
        ? prev.filter((catId) => catId !== id)
        : [...prev, id]
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
    <div className="w-full">
      <div className="lg:grid flex border-b border-b-black/10 pb-7 lg:mb-14 w-full md:grid-cols-6 gap-5 lg:overflow-x-hidden overflow-x-auto whitespace-nowrap">
        {isLoading ? (
          <div className="col-span-full text-center">Loading...</div>
        ) : categoriesPerType?.category?.data?.length ? (
          categoriesPerType.category.data.map((category) => (
            <div
              onClick={() => handleCategoryClick(category.id)}
              key={category.id}
              className="flex cursor-pointer items-center flex-col gap-3"
            >
              <div
                className={`flex items-center overflow-hidden justify-center h-36 w-36 bg-white border border-black/15 rounded-full ${
                  selectedCategories?.includes(category.id)
                    ? "border-8 border-blue/70"
                    : ""
                }`}
              >
                <div className="h-24 w-24 overflow-hidden">
                  <img
                    src={category.icon}
                    alt={category.name}
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>
              <h5 className="text-base font-bold w-36 text-center whitespace-normal overflow-hidden text-ellipsis">
                {category.name}
              </h5>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center">No categories found.</div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="px-4 py-2 font-semibold">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
