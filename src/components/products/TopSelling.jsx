import React from "react";
import { newRequest, FEATURED_PRODUCT } from "../../api";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../product/Product";

const TopSellingProducts = () => {
  // GET FEATURED PRODUCTS
  const { data: featuredProducts } = useQuery({
    queryKey: ["featuredProducts"],
    queryFn: () =>
      newRequest.get(FEATURED_PRODUCT).then((res) => {
        return res.data;
      }),
  });

  return (
    <div className="grid w-full px-4 sm:px-20 xl:px-48 mt-10 lg:grid-cols-4 gap-5">
      {featuredProducts?.data?.data?.map((product) => {
        let discount =
          (product?.product?.unit_price * product?.product?.discount || 0) /
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
  );
};

export default TopSellingProducts;
