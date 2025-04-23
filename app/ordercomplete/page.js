'use client';


import Link from "next/link";
import { CONFIRM_ORDER, newRequest } from "../../components/api/index";
// import bgImage from "/cart/bg.png";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useCartStore } from "../../lib/slice/cart";

export default function OrderComplete() {
//   const location = useLocation();
  const [loader, setLoader] = useState(false);
  const queryClient = useQueryClient();
  let payment_id = localStorage.getItem("py_id");
//   const queryParams = new URLSearchParams(location.search);
//   const paymentIntent = queryParams.get("payment_intent");
//   const redirectStatus = queryParams.get("redirect_status");
//   const paymentIntentClientSecret = queryParams.get(
//     "payment_intent_client_secret"
//   );

  const { clearCart } = useCartStore((state) => ({
    clearCart: state.clearCart,
  }));

  const confirmPayment = async () => {
    setLoader(true);
    const formData = new FormData();
    formData.append("order_id", payment_id);
    formData.append("payment_client_secret", paymentIntentClientSecret);
    formData.append("payment_status", redirectStatus);
    formData.append("payment_intent", paymentIntent);
    try {
      const res = await newRequest.post(CONFIRM_ORDER, formData);
      if (res?.status === 200) {
        localStorage.removeItem("py_id");
        setLoader(false);
        clearCart();
        queryClient.invalidateQueries(["cartList"]);
      }
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

//   useEffect(() => {
//     if (paymentIntent) {
//       confirmPayment();
//     }
//   }, [paymentIntent]);

  return (
    <>
      {loader ? (
        <div className="flex items-center justify-center min-h-96">
          <div className="h-7 w-7 animate-spin rounded-full border-b-2 border-blue"></div>
        </div>
      ) : (
        <>
          <div className="relative font-medium lg:flex flex-col px-3 lg:flex-row gap-6 pt-7 justify-center sm:px-20 xl:px-48 bg-[#F3F5F7] hidden">
            <div className="flex items-center pb-6 gap-2 border-b-2 border-green-500">
              <div className="w-7">
                <img src="/cart/greentick.png" alt="cart" />
              </div>
              <div className="text-green-500">Shopping cart</div>
            </div>
            <div className="flex items-center pb-6 gap-2 border-b-2 border-green-500">
              <div className="w-7">
                <img src="/cart/greentick.png" alt="cart" />
              </div>
              <div className="text-green-500">Checkout details</div>
            </div>
            <div className=" flex items-center pb-6 gap-2 border-b-2">
              <div className="w-7">
                <img src="/cart/3active.png" alt="cart" />
              </div>
              <div className="">Order complete</div>
            </div>
          </div>
          <div className="mt-7 mb-20 sm:px-10 mx-auto max-w-4xl p-4 md:p-0">
            <div
              className="lg:relative justify-center items-center lg:justify-start flex lg:px-20 border border-gray h-[32rem] lg:py-12 pb-5 rounded-lg"
            //   style={{
            //     backgroundImage: `url(${bgImage})`,
            //     backgroundSize: "cover",
            //     backgroundPosition: "center",
            //   }}
            >
              <div className="flex flex-col items-center lg:items-left justify-center gap-4 lg:pb-12">
                <div className="flex">
                  <img
                    src="/cart/ordergif.gif"
                    alt="cart"
                    className="object-contain h-28"
                  />
                </div>
                <div className="font-bold text-2xl">
                  Order Placed Succesfully
                </div>
                <div className="text-center lg:text-left text-sm leading-6 text-[#6C7275] font-medium">
                  Your order has been successfully placed. Get ready <br />
                  for an exciting delivery!
                </div>
                <div className="bg-[#c8c8c8] p-[.01rem] lg:w-96"></div>
                <div className="flex flex-col pt-4 gap-5 justify-center text-center">
                  <Link
                    href="/orders"
                    className="p-2 bg-white rounded-md px-20 lg:px-28 font-semibold"
                  >
                    Go to Your Orders
                  </Link>
                  <Link
                    href="/"
                    className="p-2 bg-blue text-white rounded-md px-20 lg:px-28 font-medium"
                  >
                    Back to Home
                  </Link>
                </div>
              </div>
              <div className="">
                <img
                  src="/cart/cart1.png"
                  className="object-contain h-96 hidden lg:block"
                  alt="order success"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
