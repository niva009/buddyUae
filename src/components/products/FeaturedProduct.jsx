import React from "react";
import { newRequest, LATEST_PRODUCT } from "../../api";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const FeaturedProducts = () => {
  const { data: latestProducts } = useQuery({
    queryKey: ["latestProducts"],
    queryFn: () =>
      newRequest.get(LATEST_PRODUCT).then((res) => {
        return res.data;
      }),
  });

  console.log(latestProducts);

  return (
    <div className="grid w-full px-4 sm:px-20 py-4 md:px-6 md:gap-8 xl:px-48 mt-5 md:grid-cols-2 lg:grid-cols-4 gap-2">
      {latestProducts?.data?.data?.slice(0, 4)?.map((product) => {
        return (
          <Link
            to={`/product/${product?.product_id}`}
            key={product?.product_id}
            className="flex flex-col gap-2"
          >
            <div className="bg-white border border-blue/20 py-4 h-80 flex rounded-2xl justify-center items-center">
              <img
                className="object-contain h-56 w-full"
                src={product?.product?.thumbnail_img_link}
                alt={product?.product?.name}
              />
            </div>
            <div className="text-sm font-semibold lg:py-2 pt-2 pb-6 flex justify-center items-center">
              {product?.product?.name}
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default FeaturedProducts;
