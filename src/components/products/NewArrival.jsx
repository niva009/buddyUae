import React from "react";
import { newRequest, FEATURED_PRODUCT } from "../../api";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../product/Product";

const NewArrivalProducts = () => {
  // GET LATEST PRODUCTS
  const { data: featuredProducts } = useQuery({
    queryKey: ["featuredProducts"],
    queryFn: () =>
      newRequest.get(FEATURED_PRODUCT).then((res) => {
        return res.data;
      }),
  });

  return (
    <div className="grid w-full px-4 sm:px-20 md:px-4 xl:px-48 mt-10 md:grid-cols-2 md:gap-6 lg:grid-cols-5 gap-2.5">
      {featuredProducts?.data?.data?.slice(0, 5)?.map((product) => {
        let discount =
          (product?.product?.unit_price * product?.product?.discount) / 100;
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
  );
};

export default NewArrivalProducts;
