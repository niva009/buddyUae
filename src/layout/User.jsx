import { Link, Outlet, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import {
  newRequest,
  GET_PROFILE,
  MULTIPLE_WISHLIST,
  MULTIPLE_ADD_CART,
} from "../api/index";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import { useUserStore } from "../lib/slice/user";
import { useEffect } from "react";
import LoginScreen from "../components/screens/auth/Login";
import RegisterScreen from "../components/screens/auth/Register";
import { useWishlistStore } from "../lib/slice/wishlist";
import { useCartStore } from "../lib/slice/cart";
import useWishList from "../utils/wishList";
import useCartList from "../utils/cartList";
import VerifyOtpScreen from "../components/screens/auth/VerifyOtp";
import ForgotPasswordScreen from "../components/screens/auth/ForgotPassword";

export const UserLayout = () => {
  // USER AUTH AND ACCESS PROFILE
  const user_id = localStorage.getItem("user_id");
  const { setUser } = useUserStore((state) => ({
    setUser: state.setUser,
  }));

  // GET USER DETAIL
  const { data: customerProfile } = useQuery({
    queryKey: ["customerProfile", user_id],
    queryFn: () =>
      newRequest
        .get(GET_PROFILE, { params: { user_id: user_id } })
        .then((res) => {
          return res.data;
        }),
    retry: 1,
    enabled: !!user_id,
  });

  useEffect(() => {
    if (customerProfile) {
      setUser(customerProfile?.data);
    }
  }, [customerProfile, user_id]);

  // WISHLIST ADD AND STORE
  const { wishlistItems, saveWishlist } = useWishlistStore((state) => ({
    wishlistItems: state.wishlistItems,
    saveWishlist: state.saveWishlist,
  }));

  // get wishlist from db
  const { wishlist } = useWishList();

  useEffect(() => {
    if (wishlist?.wishlistItems?.length > 0) {
      saveWishlist(wishlist?.wishlistItems);
    }
  }, [customerProfile, wishlist]);

  // save local wishlist items to db when user is log in
  useEffect(() => {
    if (customerProfile && wishlistItems?.length > 0) {
      storeWishlistToDB();
    }
  }, [customerProfile, wishlistItems]);

  const storeWishlistToDB = async () => {
    try {
      const res = await newRequest.post(MULTIPLE_WISHLIST, {
        customer_id: user_id,
        products: wishlistItems?.map((wishlistItem) => ({
          product_id: wishlistItem?.id,
        })),
      });
      if (res.status === 200) {
        // console.log("Saved wishlist to db");
      }
    } catch (error) {
      // console.log(error);
    }
  };

  // CART STORE AND SAVE
  const { cartItems, saveCart } = useCartStore((state) => ({
    cartItems: state.cartItems,
    saveCart: state.saveCart,
  }));

  // get cart from db
  const { cartList } = useCartList();

  useEffect(() => {
    if (cartList?.cart_items?.length > 0) {
      saveCart(cartList?.cart_items);
    }
  }, [customerProfile, cartList]);

  // save local cart items to db when user is log in
  useEffect(() => {
    if (customerProfile && cartItems?.length > 0) {
      storeCartToDB();
    }
  }, [customerProfile, cartItems]);

  const storeCartToDB = async () => {
    try {
      const res = await newRequest.post(MULTIPLE_ADD_CART, {
        customer_id: user_id,
        products: cartItems,
      });
      if (res.status === 200) {
        // console.log("Saved cart to db");
      }
    } catch (error) {
      // console.log(error);
    }
  };

  useEffect(() => {
    const s1 = document.createElement("script");
    const s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = "https://embed.tawk.to/668944e4e1e4f70f24ee2290/1i243a8aa";
    s1.charset = "UTF-8";
    s1.setAttribute("crossorigin", "*");
    s0.parentNode.insertBefore(s1, s0);
    return () => {
      s1.remove();
    };
  }, []);

  const location = useLocation();

  return (
    <>
      <LoginScreen />
      <RegisterScreen />
      <VerifyOtpScreen />
      <ForgotPasswordScreen />
      <div className="bg-white w-screen overflow-x-hidden">
        {location?.pathname == "/terms-and-conditions" ||
        location?.pathname == "/privacy-policy" ||
        location?.pathname == "/cancellation-policy" ||
        location?.pathname == "/shopping-policy" ||
        location?.pathname == "/faq" ? null : (
          <Header />
        )}
        <div className="2xl:container mx-auto">
          <Outlet />
        </div>
        {location?.pathname == "/terms-and-conditions" ||
        location?.pathname == "/privacy-policy" ||
        location?.pathname == "/cancellation-policy" ||
        location?.pathname == "/shopping-policy" ||
        location?.pathname == "/faq" ? null : (
          <Footer />
        )}
      </div>
      <Link
        to="https://wa.me/+971547717887"
        target="_blank"
        className="fixed bottom-5 left-7 flex h-16 w-16 cursor-pointer items-center justify-center gap-2 rounded-full shadow-2xl transition-all duration-500 hover:scale-[1.04]"
      >
        <div className="relative h-16 w-16">
          <img
            className="w-full h-full object-contain"
            src={"/whatsapp.png"}
            alt={"go to whatsapp"}
          />
        </div>
      </Link>
    </>
  );
};
