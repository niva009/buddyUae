'use client';

import { newFormRequest, REMOVE_WISHLIST } from "../../components/api/index";
import { useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "../../lib/slice/user";
import toast from "react-hot-toast";
import Link from "next/link";
import { useWishlistStore } from "../../lib/slice/wishlist";
import useCurrencyFormatter from "../../utils/useCurrency";
import slugify from "slugify";

export default function Wishlist() {
  const { user } = useUserStore((state) => ({
    user: state.user,
  }));

  const formatCurrencyAED = useCurrencyFormatter();
  const queryClient = useQueryClient();

  const { wishlistItems, removeItemFromWishlist } = useWishlistStore(
    (state) => ({
      wishlistItems: state.wishlistItems,
      removeItemFromWishlist: state.removeItemFromWishlist,
    })
  );

  const handleProductClick = (product) => {
    localStorage.setItem("selectedProductId", product?.id);
  };

  const getProductSlug = (product) =>
    slugify(product?.name || "", { lower: true });

  const removeFromWishlist = async (id) => {
    if (!user?.id) {
      removeItemFromWishlist(id);
    } else {
      const formData = new FormData();
      formData.append("customer_id", user?.id);
      formData.append("product_id", id);
      try {
        const res = await newFormRequest.post(REMOVE_WISHLIST, formData);
        if (res?.status === 200) {
          removeItemFromWishlist(id);
          queryClient.invalidateQueries(["wishlist"]);
          toast.success(res?.data?.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="text-center text-[1.3rem] font-semibold pt-7 py-4">
        Your Wishlist
      </div>
      {wishlistItems?.length ? (
        <div className="px-4 mt-7 mb-20 min-h-96 sm:px-10 xl:px-48 lg:grid lg:gap-5 flex flex-col lg:grid-cols-12">
          <div className="flex flex-col col-span-9">
            <div className="overflow-x-auto">
              <table className="table">
                <thead>
                  <tr className="font-bold text-black text-[.9rem] border-b-1 border-[#6C7275]">
                    <th>Wishlisted Product</th>
                    <th>Price</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {wishlistItems?.map((i) => (
                    <tr key={i?.id}>
                      <td>
                        <div className="flex items-center gap-4">
                          <div className="avatar">
                            <Link
                              href={`/${getProductSlug(i)}`}
                              onClick={() => handleProductClick(i)}
                              className="mask w-12 flex items-center justify-center rounded-sm border-black/20 border lg:w-20 lg:h-24"
                            >
                              <img
                                className="object-contain w-full h-full"
                                src={i?.thumbnail_img_link}
                                alt={i?.name}
                              />
                            </Link>
                          </div>
                          <div className="flex items-center gap-2">
                            <Link
                              href={`/${getProductSlug(i)}`}
                              onClick={() => handleProductClick(i)}
                              className="font-bold max-w-48 w-48 lg:min-w-20 min-w-52 text-[.85rem]"
                            >
                              {i?.name}
                            </Link>
                            <div className="text-sm min-w-20 opacity-70 text-[.77rem] font-medium">
                              Color: Black
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="text-[.75rem] font-bold min-w-24">
                        <span className="mr-1">AED</span>
                        {formatCurrencyAED(i?.unit_price)}
                      </td>
                      <th>
                        <div className="text-sm gap-7 flex items-center lg:min-w-20 min-w-20">
                          <div
                            onClick={() => {
                              removeFromWishlist(i?.id);
                            }}
                            className="font-semibold cursor-pointer text-red-700"
                          >
                            Remove
                          </div>
                          <Link
                            href={`/${getProductSlug(i)}`}
                            onClick={() => handleProductClick(i)}
                            className="font-bold underline underline-offset-2 cursor-pointer text-blue"
                          >
                            Go to Product
                          </Link>
                        </div>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <img
          className="h-40 mx-auto my-14 object-contain"
          src="/cart/no-cart.png"
        />
      )}
    </>
  );
}
