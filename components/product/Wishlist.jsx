'use Client'; 

import { Heart } from "lucide-react";
import React from "react";
import { ADD_WISHLIST, newFormRequest, REMOVE_WISHLIST } from "../api/index";
import { useUserStore } from "../../lib/slice/user";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useWishlistStore } from "../../lib/slice/wishlist";

export default function WishlistProduct({ type, productId, product }) {
  // user
  const { user } = useUserStore((state) => ({
    user: state.user,
  }));

  // wishlist
  const { addToWishlist, wishlistItems, removeItemFromWishlist } =
    useWishlistStore((state) => ({
      addToWishlist: state.addToWishlist,
      wishlistItems: state.wishlistItems,
      removeItemFromWishlist: state.removeItemFromWishlist,
    }));

  const queryClient = useQueryClient();
  let isAlreadyWishlisted = wishlistItems?.some(
    (item) => item?.id == productId
  );

  const handleAddToWishlist = async () => {
    try {
      if (user?.id) {
        const formData = new FormData();
        formData.append("product_id", productId);
        formData.append("customer_id", user?.id);
        const response = await newFormRequest.post(ADD_WISHLIST, formData);
        if (response.status == 200) {
          toast.success("Product added to wishlist");
          queryClient.invalidateQueries(["wishlist"]);
        }
      } else {
        addToWishlist(product);
      }
    } catch (error) {
      console.log(error);
      if (error?.response?.status === 401) {
        toast.error("You must be logged in to add to wishlist");
      } else {
        toast.error("Error adding product to wishlist");
      }
    }
  };
  const removeFromWishlist = async () => {
    if (user?.id) {
      const formData = new FormData();
      formData.append("customer_id", user?.id);
      formData.append("product_id", productId);
      try {
        const res = await newFormRequest.post(REMOVE_WISHLIST, formData);
        if (res?.status === 200) {
          removeItemFromWishlist(productId);
          queryClient.invalidateQueries(["wishlist"]);
          toast.success(res?.data?.message);
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      removeItemFromWishlist(productId);
    }
  };

  return (
    <>
      {type == "outer" ? (
        <div
          onClick={() => {
            isAlreadyWishlisted ? removeFromWishlist() : handleAddToWishlist();
          }}
          className="rounded-full cursor-pointer shadow-md hidden group-hover:flex transition-all duration-500 absolute text-white h-7 w-7 top-3 right-2 font-semibold text-sm items-center justify-center p-1 bg-white"
        >
          <Heart
            fill={`${isAlreadyWishlisted ? "red" : "transparent"}`}
            className={` h-4 ${
              isAlreadyWishlisted ? "text-red-500" : "text-black"
            }`}
          />
        </div>
      ) : (
        <div
          onClick={() => {
            isAlreadyWishlisted ? removeFromWishlist() : handleAddToWishlist();
          }}
          className={`rounded-lg cursor-pointer min-w-64 w-full flex gap-1 transition-all duration-500 h-12 border font-semibold items-center justify-center ${
            isAlreadyWishlisted
              ? "border-2 bg-red-500 text-white"
              : "text-black"
          }`}
        >
          <Heart
            fill={`${isAlreadyWishlisted ? "white" : "transparent"}`}
            className={` h-4 ${
              isAlreadyWishlisted ? "text-white" : "text-black"
            }`}
          />
          {isAlreadyWishlisted ? "Wishlisted" : "Wishlist"}
        </div>
      )}
    </>
  );
}
