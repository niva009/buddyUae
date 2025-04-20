'use Client';

import { BRAND_LIST, newRequest } from "../../components/api/index";
import { useQuery } from "@tanstack/react-query";
import { priceFilterList } from "../../constant/data";

export default function Filter({
  productType,
  menuVisible,
  isMenuVisible,
  selectedPrices,
  setSelectedPrices,
  selectedBrands,
  setSelectedBrands,
  selectedCategories,
  type,
  categoryId,
}) {
  const { data: brandList } = useQuery({
    queryKey: ["brandList", categoryId, selectedCategories],
    queryFn: () =>
      newRequest
        .get(BRAND_LIST, {
          params: {
            product_type:
              productType == "office" ? 2 : productType == "home" ? 1 : 0,
            category: JSON.stringify(selectedCategories),
            category_id: categoryId ?? null,
          },
        })
        .then((res) => {
          return res.data;
        }),
    enabled: !!type !== "brand",
  });

  const handleBrandClick = (id) => {
    setSelectedBrands((prev) =>
      prev?.includes(id) ? prev?.filter((catId) => catId !== id) : [...prev, id]
    );
  };

  const handlePriceClick = (range) => {
    setSelectedPrices((prev) =>
      prev?.some(
        (priceRange) =>
          priceRange.min === range.min && priceRange.max === range.max
      )
        ? prev?.filter(
            (priceRange) =>
              !(priceRange.min === range.min && priceRange.max === range.max)
          )
        : [...prev, range]
    );
  };

  const isPriceSelected = (range) => {
    return selectedPrices?.some(
      (priceRange) =>
        priceRange.min === range.min && priceRange.max === range.max
    );
  };

  console.log("brandList", brandList);
console.log("priceFilterList", priceFilterList);



  return (
    <>
      {menuVisible && (
        <div
          className="fixed inset-0 bg-black/30 z-50"
          onClick={() => isMenuVisible(false)}
        ></div>
      )}

      {/* Filter Sidebar */}
      <div
        className={`w-80 ${
          menuVisible ? "block" : "hidden"
        } fixed lg:relative top-0 lg:z-auto z-50 left-0 bottom-0 lg:flex flex-col h-fit pb-7 bg-white`}
      >
        <div className="flex justify-between font-bold text-xl gap-2 items-center px-5 py-3.5">
          <div className="flex gap-2 items-center">
            <img
              src="/logo/filter 05.png"
              className="object-contain h-5"
              alt=""
            />
            <p>Filter</p>
          </div>
          <button
            onClick={() => isMenuVisible(false)}
            className="lg:hidden h-8 flex items-center justify-center bg-blue rounded-full w-8 text-center text-sm text-white font-normal"
          >
            X
          </button>
        </div>
        {type === "brand" ? null : (
          <div className="flex text-[.85rem] gap-3 flex-col font-semibold text-black/70 pt-7">
            <h3 className="text-black font-bold text-lg px-5">Brands</h3>
            <div className="max-h-32 capitalize overflow-auto flex flex-col gap-2.5 pl-5 overflow-y-custom">
              {brandList?.brands?.map((i) => (
                <div key={i?.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedBrands?.includes(i?.id)}
                    onChange={() => handleBrandClick(i?.id)}
                    className="size-4"
                  />
                  <p
                    className={`cursor-pointer ${
                      selectedBrands?.includes(i?.id) ? "text-blue" : ""
                    }`}
                  >
                 {typeof i?.name === "string" ? i.name : "Unnamed"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="flex text-[.85rem] justify-between gap-3 flex-col px-5 font-semibold text-black/70 pt-4">
          <p className="font-bold text-lg text-black">PRICE</p>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              className="size-4"
              checked={selectedPrices?.length === priceFilterList?.length}
              onChange={() =>
                setSelectedPrices(
                  selectedPrices?.length === priceFilterList?.length
                    ? []
                    : priceFilterList.map((i) => ({
                        min: i?.start,
                        max: i?.end,
                      }))
                )
              }
            />
            <p>All Price</p>
          </div>
          {priceFilterList?.map((i) => (
  <div
    key={i?.start + "-" + i?.end}
    onClick={() => handlePriceClick({ min: i?.start, max: i?.end })}
    className="flex gap-2 items-center cursor-pointer"
  >
    <input
      type="checkbox"
      checked={isPriceSelected({ min: i?.start, max: i?.end })}
      onChange={() => handlePriceClick({ min: i?.start, max: i?.end })} // Add onChange here
      className="size-4"
    />
    <p>
      AED {i?.start} - {i?.end >= 100000 ? "Above" : i?.end}
    </p>
  </div>
))}

        </div>
        <button className="bg-blue mt-10 font-medium text-[0.9rem] text-white w-[90%] mx-auto rounded-full flex items-center justify-center h-11">
          Apply Filter
        </button>
      </div>
    </>
  );
}
