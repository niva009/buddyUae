import React from "react";
import useCurrencyFormatter from "../../utils/useCurrency";
import { Link } from "react-router-dom";
import { ArrowRight, CreditCard, Truck } from "lucide-react";
import { CHECK_COUPON, newRequest } from "../../api";
import toast from "react-hot-toast";

export default function CartSummary({
  subtotal,
  totalAmount,
  discountAmount,
  taxAmount,
  setPopupOpen,
  code,
  setCode,
  setSelectedCoupon,
  selectedCoupon,
  createPaymentIntent,
  havingDefaultAddress,
  cashOnDelivery,
  type,
  paymentIntentLoader,
  loader,
}) {
  // Check coupon validity
  const checCouponValidity = async () => {
    try {
      const res = await newRequest(CHECK_COUPON, {
        params: {
          coupon: code,
        },
      });
      if (res.status === 200) {
        localStorage.setItem("coupon", JSON.stringify(res.data.data));
        setSelectedCoupon(res.data.data);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      setCode("");
    }
  };

  const formatCurrencyAED = useCurrencyFormatter();
  return (
    <div className="flex h-96 col-span-5 flex-col">
      <div className=" flex flex-col lg:pl-16">
        <div className="mt-8 shadow border p-5 gap-2 flex flex-col border-gray/50 rounded-lg">
          {type != "address" ? (
            <>
              <div className="flex items-center justify-between">
                <h5 className="text-lineblack text-md font-semibold">
                  Have a coupon?
                </h5>
                {setPopupOpen == "" ? null : (
                  <div
                    onClick={() => setPopupOpen(true)}
                    className="text-lineblack capitalize underline underline-offset-4 cursor-pointer text-[0.8rem] items-center justify-center flex h-5 font-bold"
                  >
                    Select coupon
                  </div>
                )}
              </div>
              <p className="text-[.85rem] text-[#6C7275]">
                Add your code for an instant cart discount
              </p>
              <div className="flex border border-[#bebebe] rounded-sm justify-between h-10 items-center px-3">
                <div className="flex gap-2 items-center">
                  <img
                    src="/cart/Vector.png"
                    className="w-4 h-4 object-contain"
                    alt="icon"
                  />
                  <input
                    className="text-sm font-medium"
                    type="text"
                    placeholder="Coupon Code"
                    value={code}
                    maxLength={20}
                    onChange={(e) => {
                      setCode(e.target.value);
                      setSelectedCoupon("");
                    }}
                  />
                </div>
                {selectedCoupon?.id ? (
                  <div className="text-blue cursor-pointer text-sm font-bold">
                    Applied
                  </div>
                ) : (
                  <div
                    onClick={checCouponValidity}
                    className="text-blue cursor-pointer text-sm font-semibold"
                  >
                    Apply
                  </div>
                )}
              </div>
            </>
          ) : null}

          <div className="font-semibold mt-2">Cart summary</div>
          <div className="flex justify-between mt-2 gap-0.5 font-medium text-blue text-[.84rem]">
            <span className="text-black">Subtotal</span>
            <span className="font-semibold">
              <span className="rs font-semibold text-black">
                AED {formatCurrencyAED(subtotal)}
              </span>{" "}
            </span>
          </div>
          <div className="flex justify-between mt-2 gap-0.5 font-medium text-blue text-[.84rem]">
            <span className="text-blue">Discount</span>
            <span className="font-semibold">
              <span className="rs font-semibold">
                - AED {formatCurrencyAED(discountAmount)}
              </span>{" "}
            </span>
          </div>
          <div className="flex justify-between mt-2 gap-0.5 font-medium text-[#6C7275] text-[.84rem]">
            <span className="text-[#6C7275]">Tax</span>
            <span className="font-semibold">
              <span className="rs font-semibold">
                AED {formatCurrencyAED(taxAmount)}
              </span>
            </span>
          </div>
          <div className="flex w-full my-3 mx-auto h-[0.7px] bg-gray/70" />
          <div className="flex flex-col gap-5 pb-3">
            <div className="flex justify-between mt-2 gap-0.5 text-[#6C7275] text-[.84rem]">
              <span className="text-black font-bold">Total</span>
              <span className="font-semibold">
                <span className="rs text-black">
                  AED {formatCurrencyAED(totalAmount)}
                </span>
              </span>
            </div>
          </div>

          {createPaymentIntent ? (
            <button
              onClick={createPaymentIntent}
              className="flex bg-blue capitalize items-center font-medium text-white justify-center h-12 rounded-lg gap-2 text-[0.94rem]"
            >
              {paymentIntentLoader ? (
                <div className="flex items-center gap-3">
                  <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                  <span className="whitespace-nowrap">
                    Proceeding to payment
                  </span>
                </div>
              ) : (
                <>
                  <CreditCard className="h-5" />
                  Continue to Payment
                </>
              )}
            </button>
          ) : (
            <Link
              to={"/cart/checkout-details"}
              className="flex bg-blue capitalize items-center font-medium text-white justify-center h-12 rounded-lg gap-2 text-[0.94rem]"
            >
              Continue to Checkout <ArrowRight className="h-5" />
            </Link>
          )}

          {havingDefaultAddress ? (
            <button
              onClick={cashOnDelivery}
              className="flex bg-red-500 mt-2 capitalize text-white items-center font-bold justify-center h-12 rounded-lg gap-2 text-[0.94rem]"
            >
              {loader ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                  Proceeding...
                </>
              ) : (
                <>
                  <Truck className="h-5" />
                  Cash on delivery
                </>
              )}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
