'use client';

import React from "react";

export default function StatsHome() {
  return (
    <div className=" h-auto flex items-center justify-center w-full sm:px-20 md:px-4 xl:px-48">
      <div className="flex md:grid md:grid-cols-2 lg:flex flex-col gap-5 lg:gap-0 lg:flex-row py-6 items-center justify-between w-full text-white">
        <div className="py-8 flex p-5 text-center md:text-center sm:text-left rounded-sm bg-[#F3F5F7] text-black gap-2 w-96  lg:w-64 flex-col border-r border-white/50 ">
          <div className="flex justify-center lg:justify-start">
            <img
              src="/img/icons/freeshopping.png"
              className="object-contain h-8"
              alt="freeshopping"
            />
          </div>
          <div className="text-base font-semibold pb-">Free Shipping</div>
          <div className="text-[#8e8e8e] text-xs font-medium">
            Order above AED 300 (within Dubai)
          </div>
        </div>
        <div className="flex p-5 text-center md:text-center sm:text-left rounded-sm bg-[#F3F5F7] text-black gap-2 py-8 w-96  lg:w-64 flex-col border-r border-white/50 ">
          <div className="flex justify-center lg:justify-start">
            <img
              src="/img/icons/securepayments.png"
              className="object-contain h-8"
              alt="securepayments"
            />
          </div>
          <div className="text-base font-semibold">Secure Payments</div>
          <div className="text-[#8e8e8e] text-xs font-medium">
            Secured by Stripe
          </div>
        </div>
        <div className="flex p-5 text-center md:text-center sm:text-left rounded-sm bg-[#F3F5F7] text-black gap-2 py-8 w-96  lg:w-64 flex-col border-r border-white/50 ">
          <div className="flex justify-center lg:justify-start">
            <img
              src="/img/icons/24-7support.png"
              className="object-contain h-8"
              alt="support"
            />
          </div>
          <div className="text-base font-semibold">24/7 Support</div>
          <div className="text-[#8e8e8e] text-xs font-medium">
            Phone and Email support
          </div>
        </div>
        <div className="flex p-5 text-center md:text-center sm:text-left rounded-sm bg-[#F3F5F7] text-black gap-2 py-8 w-96  lg:w-64 flex-col border-r border-white/50 ">
          <div className="flex justify-center lg:justify-start">
            <img
              src="/img/icons/easyreturns.png"
              className="object-contain h-8"
              alt="easy returns"
            />
          </div>
          <div className="text-base font-semibold">Easy Returns</div>
          <div className="text-[#8e8e8e] text-xs font-medium">
            Hassle free Returns
          </div>
        </div>
      </div>
    </div>
  );
}
