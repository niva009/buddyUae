import React, { useState } from "react";
import toast from "react-hot-toast";
import { QUANTITY_CART, newFormRequest } from "../../api";
import { useQueryClient } from "@tanstack/react-query";
import { useCartStore } from "../../lib/slice/cart";

export default function QuantityButton({
  quantity,
  productId,
  maxQuantity,
  customerId,
  type,
}) {
  const { updateCartItemQuantity } = useCartStore((state) => ({
    updateCartItemQuantity: state.updateCartItemQuantity,
  }));

  const [loader, setLoader] = useState(false);
  const queryClient = useQueryClient();
  const incrementCount = async () => {
    if (quantity >= maxQuantity) {
      toast("Quantity exceeded available stock", {
        icon: "😕",
      });
      return;
    }
    const newQuantity = quantity + 1;
    setLoader(true);
    updateCartItemQuantity(productId, newQuantity);
    if (customerId) {
      await handleQuantity(productId, newQuantity);
    }
    setLoader(false);
  };

  const decrementCount = async () => {
    const newQuantity = quantity > 1 ? quantity - 1 : quantity;
    updateCartItemQuantity(productId, newQuantity);
    setLoader(true);
    if (customerId) {
      await handleQuantity(productId, newQuantity);
    }

    setLoader(false);
  };

  const handleQuantity = async (productId, quantity) => {
    const formData = new FormData();
    formData.append("customer_id", customerId);
    formData.append("product_id", productId);
    formData.append("quantity", quantity);
    try {
      const res = await newFormRequest.post(QUANTITY_CART, formData);
      if (res?.status === 200) {
        queryClient.invalidateQueries(["cart"]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={` ${
        type == "inner" ? "h-10 px-3 w-fit" : "h-12 w-fit px-5"
      } flex text-blue font-medium text-[0.9rem] items-center gap-7 bg-[#F0F0F0] rounded-lg`}
    >
      <span onClick={decrementCount} className="cursor-pointer text-2xl">
        -
      </span>
      <span className="w-3 font-bold">
        {loader ? (
          <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-blue"></div>
        ) : (
          quantity
        )}
      </span>
      <span onClick={incrementCount} className="cursor-pointer text-xl">
        +
      </span>
    </div>
  );
}
