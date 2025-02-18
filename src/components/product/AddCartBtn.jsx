import React from "react";
import { ADD_CART, newFormRequest } from "../../api";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "../../lib/slice/user";
import { useCartStore } from "../../lib/slice/cart";

export default function AddCartBtn({
  productDetails,
  loader,
  setLoader,
  quantity,
  discountedPrice,
}) {
  const queryClient = useQueryClient();
  const { user } = useUserStore((state) => ({
    user: state.user,
  }));

  const { addToCart } = useCartStore((state) => ({
    addToCart: state.addToCart,
  }));

  const handleAddToCart = async () => {
    if (!user?.name) {
      addToCart({
        name: productDetails?.product?.name,
        product_id: productDetails?.product?.id,
        attribute_id: 0,
        quantity: quantity,
        unit_price: productDetails?.product?.unit_price,
        color: "white",
        discount: discountedPrice,
        stock: productDetails?.product?.quantity,
        availableStock: 10,
        productImage: productDetails?.product?.thumbnail_img_link,
      });
    } else {
      setLoader(true);
      try {
        const formdata = new FormData();
        formdata.append("product_id", productDetails?.product?.id);
        formdata.append("customer_id", user?.id);
        formdata.append("unit_price", productDetails?.product?.unit_price);
        formdata.append("quantity", quantity);
        formdata.append("color", "white");
        formdata.append("attribute_id", 1);
        formdata.append("discount", discountedPrice);
        const res = await newFormRequest.post(ADD_CART, formdata);
        if (res?.status === 200) {
          toast.error(res?.data?.error);
          setLoader(false);
        } else if (res?.status === 201) {
          queryClient.invalidateQueries(["productDetails"]);
          queryClient.invalidateQueries(["cart"]);
          setLoader(false);
          toast.success(res?.data?.message);
        }
      } catch (error) {
        console.log(error);
        setLoader(false);
        if (error?.response?.data?.message) {
          toast.error(error?.response?.data?.message);
        } else {
          toast.error(error?.response?.data?.error);
        }
      }
    }
  };
  return (
    <button
      onClick={handleAddToCart}
      className="text-white flex items-center justify-center rounded-lg bg-blue h-12 w-full lg:px-28"
    >
      {loader ? (
        <div className="flex items-center gap-2">
          <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
          <span className="whitespace-nowrap"> Adding to cart</span>
        </div>
      ) : (
        "Add to cart"
      )}
    </button>
  );
}
