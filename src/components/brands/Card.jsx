import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef } from "react";
import { newRequest, TOP_BRAND_LIST } from "../../api";
import { Link } from "react-router-dom";

export default function BrandCard() {
  const { data: topBrandsList } = useQuery({
    queryKey: ["topBrandsList"],
    queryFn: () =>
      newRequest.get(TOP_BRAND_LIST).then((res) => {
        return res.data;
      }),
  });

  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;

    const scroll = () => {
      if (scrollContainer) {
        scrollContainer.scrollLeft += 2;

        if (
          scrollContainer.scrollLeft + scrollContainer.clientWidth >=
          scrollContainer.scrollWidth
        ) {
          scrollContainer.scrollLeft = 0;
        }
      }
    };

    const intervalId = setInterval(scroll, 30);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div
      ref={scrollRef}
      className="flex w-full items-center gap-5 justify-evenly pb-5 lg:pb-0 overflow-x-invisible overflow-x-auto whitespace-nowrap"
    >
      {topBrandsList?.data?.data?.map((brand) => (
        <Link
          to={`/store/?brand=${brand?.brands?.id}`}
          key={brand?.brands?.id}
          className="flex font-semibold border min-w-36 mb-5 p-4 px-4 border-black/20 rounded-sm text-[0.9rem] flex-col items-center gap-3"
        >
          <img
            className="h-20 w-20 object-contain"
            src={brand?.brands?.image_path}
            alt={brand?.brands?.name}
          />
        </Link>
      ))}
    </div>
  );
}
