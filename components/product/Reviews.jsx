import React from "react";
import RatingStars from "./Star";
import { parseDate } from "../../utils";

export default function Reviews({ data }) {
  return (
    <div className="flex mt-5 flex-wrap w-full gap-2 justify-center">
      {data?.data?.data?.map((i) => (
        <div className="flex w-80 border p-3 border-gray rounded-xl">
          <div className="flex flex-col items-start">
            <div className="flex text-2xl items-center">
              <RatingStars rating={i?.rating} />
            </div>
            <div className="flex items-center gap-1">
              <p className="text-base text-lineblack font-semibold">
                {i?.customer?.name}
              </p>
              <img className="h-5 mt-[1px]" src="/verifed.png" alt="verified" />
            </div>
            <p className="text-[0.9rem] mt-1 text-grey">{i?.comments}</p>
            <p className="text-[0.9rem] mt-1 text-grey">
              Posted on {parseDate(i?.created_at)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
