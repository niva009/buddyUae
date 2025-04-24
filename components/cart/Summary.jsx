'use client';

import useCurrencyFormatter from "../../utils/useCurrency";
import Link from "next/link";
import { ArrowRight, CreditCard, Truck } from "lucide-react";
import { CHECK_COUPON, newRequest } from "../../components/api/index";
import toast from "react-hot-toast";
import PropTypes from "prop-types";

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
  const formatCurrencyAED = useCurrencyFormatter();

  // Check coupon validity

  console.log("payment loader", paymentIntentLoader);

  const checkCouponValidity = async () => {
    try {
      const res = await newRequest(CHECK_COUPON, {
        params: { coupon: code },
      });

      if (res.status === 200) {
        localStorage.setItem("coupon", JSON.stringify(res.data.data));
        setSelectedCoupon(res.data.data);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Invalid coupon.");
      setCode("");
    }
  };

  return (
    <div className="flex h-96 col-span-5 flex-col">
      <div className="flex flex-col lg:pl-16">
        <div className="mt-8 shadow border p-5 gap-2 flex flex-col border-gray/50 rounded-lg">
          {type !== "address" && (
            <>
              <div className="flex items-center justify-between">
                <h5 className="text-lineblack text-md font-semibold">
                  Have a coupon?
                </h5>
                {setPopupOpen && (
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
                    onClick={checkCouponValidity}
                    className="text-blue cursor-pointer text-sm font-semibold"
                  >
                    Apply
                  </div>
                )}
              </div>
            </>
          )}

          <div className="font-semibold mt-2">Cart summary</div>

          <SummaryRow label="Subtotal" value={`AED ${formatCurrencyAED(subtotal)}`} />
          <SummaryRow label="Discount" value={`- AED ${formatCurrencyAED(discountAmount)}`} className="text-blue" />
          <SummaryRow label="Tax" value={`AED ${formatCurrencyAED(taxAmount)}`} className="text-[#6C7275]" />

          <div className="flex w-full my-3 mx-auto h-[0.7px] bg-gray/70" />

          <SummaryRow
            label="Total"
            value={`AED ${formatCurrencyAED(totalAmount)}`}
            labelClass="text-black font-bold"
            valueClass="text-black"
          />

{createPaymentIntent ? (
  <></>
  // <button
  //   onClick={createPaymentIntent}
  //   className="flex bg-blue capitalize items-center font-medium text-white justify-center h-12 rounded-lg gap-2 text-[0.94rem]"
  // >
  //   {paymentIntentLoader ? (
  //     <div className="flex items-center gap-3">
  //       <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
  //       <span className="whitespace-nowrap">Proceeding to payment</span>
  //     </div>
  //   ) : (
  //     <span className="whitespace-nowrap">Proceed to Payment</span>
  //   )}
  // </button>
) : (
  <Link
    href="/checkout"
    className="flex bg-blue capitalize items-center font-medium text-white justify-center h-12 rounded-lg gap-2 text-[0.94rem]"
  >
    Continue to Checkout <ArrowRight className="h-5" />
  </Link>
)}


          {havingDefaultAddress && (
            <button
              onClick={cashOnDelivery}
              className="flex bg-red-500 mt-2 capitalize text-white items-center font-bold justify-center h-12 rounded-lg gap-2 text-[0.94rem]"
            >
              {loader ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white" />
                  Proceeding...
                </>
              ) : (
                <>
                  <Truck className="h-5" />
                  Cash on delivery
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ label, value, className = "", labelClass = "", valueClass = "" }) {
  return (
    <div className={`flex justify-between mt-2 gap-0.5 font-medium text-[.84rem] ${className}`}>
      <span className={labelClass}>{label}</span>
      <span className={`font-semibold ${valueClass}`}>
        <span className="rs">{value}</span>
      </span>
    </div>
  );
}

CartSummary.propTypes = {
  subtotal: PropTypes.number.isRequired,
  totalAmount: PropTypes.number.isRequired,
  discountAmount: PropTypes.number.isRequired,
  taxAmount: PropTypes.number.isRequired,
  setPopupOpen: PropTypes.func.isRequired,
  code: PropTypes.string.isRequired,
  setCode: PropTypes.func.isRequired,
  setSelectedCoupon: PropTypes.func.isRequired,
  selectedCoupon: PropTypes.oneOfType([
    PropTypes.shape({ id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]) }),
    PropTypes.string, // If empty string used on clear
  ]),
  createPaymentIntent: PropTypes.func,
  havingDefaultAddress: PropTypes.bool.isRequired,
  cashOnDelivery: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  paymentIntentLoader: PropTypes.bool.isRequired,
  loader: PropTypes.bool.isRequired,
};
