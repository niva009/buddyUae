'use client';

import Link  from "next/link";
import QuantityButton from "../../components/product/QuantityButton";
import { X } from "lucide-react";
import { REMOVE_PRODUCT_FROM_CART, newFormRequest } from "../../components/api/index";
import { useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "../../lib/slice/user";
import toast from "react-hot-toast";
import useCurrencyFormatter from "../../utils/useCurrency";
import { useCartStore } from "../../lib/slice/cart";
import CartSummary from "../../components/cart/Summary";
import { useEffect, useState } from "react";
import CustomerCouponSelectScreen from "../../components/cart/SelectCoupon";

export default function Cart() {
  const { user } = useUserStore((state) => ({
    user: state.user,
  }));
  const { cartItems, removeItemFromCart } = useCartStore((state) => ({
    cartItems: state.cartItems,
    removeItemFromCart: state.removeItemFromCart,
  }));

  let appliedCoupon = localStorage.getItem("coupon");

  const [subtotal, setSubtotal] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [popupOpen, setPopupOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState("");
  const [code, setCode] = useState("");
  const [maxDiscountAmount, setMaxDiscountAmount] = useState(0);
  const [minAmmountForDiscountAmount, setMinAmmountForDiscountAmount] =
    useState(0);
  const TAX_RATE = 0.05;
  console.log(maxDiscountAmount);

  useEffect(() => {
    if (JSON.parse(appliedCoupon)?.id) {
      setSelectedCoupon(JSON.parse(appliedCoupon));
      setCode(JSON.parse(appliedCoupon)?.code);
    }
  }, [appliedCoupon]);

  useEffect(() => {
    let newSubtotal = 0;
    cartItems.forEach((item) => {
      if (item?.unit_price !== null) {
        const productSubtotal = item?.quantity * parseFloat(item?.unit_price);
        newSubtotal += productSubtotal;
      }
    });
    const newTaxAmount = newSubtotal * TAX_RATE;
    setSubtotal(newSubtotal);
    setTaxAmount(newTaxAmount);
  }, [cartItems]);

  useEffect(() => {
    if (selectedCoupon?.id) {
      let computedDiscount = (subtotal * selectedCoupon?.discount) / 100;

      // Ensure that the discount doesn't exceed the max discount amount
      if (computedDiscount > selectedCoupon?.max_discount) {
        computedDiscount = selectedCoupon?.max_discount;
      }

      setDiscountAmount(computedDiscount);
      setMaxDiscountAmount(selectedCoupon?.max_discount ?? 0);
      setMinAmmountForDiscountAmount(selectedCoupon?.min_amount ?? 0);
    }
  }, [selectedCoupon, subtotal]);

  useEffect(() => {
    if (selectedCoupon?.id) {
      if (subtotal >= minAmmountForDiscountAmount) {
        setTotalAmount(subtotal - discountAmount + taxAmount);
      } else {
        setTotalAmount(subtotal + taxAmount);
      }
    } else {
      setTotalAmount(subtotal + taxAmount);
    }
  }, [
    selectedCoupon,
    minAmmountForDiscountAmount,
    subtotal,
    discountAmount,
    taxAmount,
    setTotalAmount,
  ]);

  const formatCurrencyAED = useCurrencyFormatter();
  const queryClient = useQueryClient();

  const removeFromCart = async (id) => {
    if (!user?.id) {
      removeItemFromCart(id);
      toast.success("Item removed from cart");
      return;
    }
    const formData = new FormData();
    formData.append("product_id", id);
    formData.append("customer_id", user?.id);
    try {
      const res = await newFormRequest.post(REMOVE_PRODUCT_FROM_CART, formData);
      if (res?.data?.success === true) {
        removeItemFromCart(id);
        queryClient.invalidateQueries(["cartList"]);
        toast.success(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to remove");
    }
  };

  return (
    <div className="min-h-fit h-full pb-20">
      <div className="text-center text-[1.3rem] font-semibold py-4">
        Your Cart
      </div>
      <div className="relative flex-col itemce  lg:font-medium flex lg:flex-row gap-3 px-3 lg:gap-6 lg:pt-12 pt-3 sm:px-20 xl:px-48 bg-[#F3F5F7]">
        <div className="flex items-center pb-6 gap-2 border-b-2">
          <div className="w-7">
            <img src="/cart/1.1.png" alt="cart" />
          </div>
          <div className="">Shopping cart</div>
        </div>
        <div className="flex items-center pb-6 gap-2">
          <div className="w-7">
            <img src="/cart/1.2.png" alt="cart" />
          </div>
          <div className="text-[#b1b5c3]">Checkout details</div>
        </div>
        <div className=" flex items-center pb-6 gap-2">
          <div className="w-7">
            <img src="/cart/1.3.png" alt="cart" />
          </div>
          <div className="text-[#b1b5c3]">Order complete</div>
        </div>
        <div className="hidden absolute -top-11  right-44 col-span-3 justify-end lg:block items-center pb-6 gap-2">
          <img src="/cart/done.png" className=" lg:w-44 " alt="cart" />
        </div>
      </div>
      {cartItems?.length ? (
        <div className="px-4 mt-7 mb-20 sm:px-10 xl:px-48 lg:grid lg:gap-5 flex flex-col lg:grid-cols-12">
          <div className="flex flex-col col-span-7">
            <div className="overflow-x-auto overflow-x-min">
              <table className="table">
                <thead>
                  <tr className="font-bold text-black text-[.9rem] border-b-1 border-[#6C7275]">
                    <th className="">Product</th>
                    <th>Quantity</th>
                    <th>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems?.map((i) => (
                    <tr key={i?.product_id}>
                      <td>
                        <div className=" flex items-center gap-4">
                          <div className="avatar">
                            <Link
                              href={`/product/${i?.product_id}`}
                              className="mask w-12 border border-black/20 rounded-md overflow-hidden lg:w-20 lg:h-24"
                            >
                              <img
                                className="h-full w-full object-contain"
                                src={i?.productImage}
                                alt={i?.name}
                              />
                            </Link>
                          </div>
                          <div className="flex items-center gap-2">
                            <Link
                              href={`/product/${i?.product_id}`}
                              className="font-bold min-w-40 w-28 text-[.85rem]"
                            >
                              {i?.name}
                            </Link>
                          </div>
                        </div>
                      </td>
                      <td>
                        <QuantityButton
                          quantity={i?.quantity}
                          productId={i?.product_id}
                          maxQuantity={i?.stock}
                          customerId={user?.id}
                          type={"inner"}
                        />
                      </td>
                      <td className="text-[.75rem] font-semibold min-w-32 lg:min-w-28 p-1">
                        <div className="flex items-center gap-5">
                          <div className="flex items-center">
                            AED {formatCurrencyAED(i?.unit_price)}
                          </div>
                          <div className="text-sm opacity-70">
                            <div
                              onClick={() => removeFromCart(i?.product_id)}
                              className="font-semibold flex gap-1 items-center cursor-pointer text-red-700"
                            >
                              <X className="h-4 w-4" />
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <CartSummary
            subtotal={subtotal}
            totalAmount={totalAmount}
            discountAmount={discountAmount}
            taxAmount={taxAmount}
            setPopupOpen={setPopupOpen}
            code={code}
            setCode={setCode}
            setSelectedCoupon={setSelectedCoupon}
            selectedCoupon={selectedCoupon}
          />
          <CustomerCouponSelectScreen
            popupOpen={popupOpen}
            setPopupOpen={setPopupOpen}
            code={code}
            setCode={setCode}
            setSelectedCoupon={setSelectedCoupon}
          />
        </div>
      ) : (
        <img
          className="h-40 mx-auto my-14 object-contain"
          src="/cart/no-cart.png"
        />
      )}
    </div>
  );
}
