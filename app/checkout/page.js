'use client';


import { useRouter } from 'next/navigation'
import Link from "next/link";
import React from 'react';
import {
  ADDRESSES,
  CASH_ON_DELIVERY,
  CONTINUE_PAYMENT,
  DEFAULT_ADDRESS,
  DELETE_ADDRESS,
  newFormRequest,
  newRequest,
} from "../../components/api/index";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import useCartList from "../../utils/cartList";
import { useEffect, useState } from "react";
import WeightForm from "../../components/forms/WeightForm";
import CartSummary from "../../components/cart/Summary";
import { useAuthScreenToggleStore } from "../../lib/slice/authScreen";
import ToastPopup from "../../components/screens/ToastPopup";
import { useCartStore } from "../../lib/slice/cart";



export default function ChooseAddress() {
  const [paymentIntentLoader, setPaymentIntentLoader] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState("");
  const [user,setUser] = useState("");


  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = localStorage.getItem("user_id");
      const coupon = localStorage.getItem("coupon");

      setUser(auth || ""); // fallback to empty string
      if (coupon) {
        try {
          const parsed = JSON.parse(coupon);
          setAppliedCoupon(parsed);
        } catch (error) {
          console.warn("Failed to parse coupon from localStorage:", error);
        }
      }
    }
  }, []);

  console.log("user complete info", user);

  const { setLoginOpen } = useAuthScreenToggleStore((state) => ({
    setLoginOpen: state.setLoginOpen,
  }));

  const { cartItems, clearCart } = useCartStore((state) => ({
    cartItems: state.cartItems,
    clearCart: state.clearCart,
  }));

  console.log("cartitems", cartItems);

  // GET CART
  const { cartList, isLoading } = useCartList();

  console.log("cart items", cartList);

  const [subtotal, setSubtotal] = useState(0);
  const [taxAmount, setTaxAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [selectedCoupon, setSelectedCoupon] = useState("");
  const [code, setCode] = useState("");
  const [maxDiscountAmount, setMaxDiscountAmount] = useState(0);
  const [minAmmountForDiscountAmount, setMinAmmountForDiscountAmount] =
    useState(0);
  const TAX_RATE = 0.05; 

  useEffect(() => {
    if (appliedCoupon?.id) {
      setSelectedCoupon(appliedCoupon);
      setCode(appliedCoupon.code || "");
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
    taxAmount,
    setTotalAmount,
  ]);

  const navigate = useRouter();
  const [loader, setLoader] = useState(false);
  const [weightId, setWeightId] = useState("");

  const queryClient = useQueryClient();
  const { data: address } = useQuery({
    queryKey: ["address", user],
    queryFn: () =>
      newRequest
        .get(ADDRESSES, { params: { customer_id: user } })
        .then((res) => res.data),
    enabled: !!user,
  });

  const havingDefaultAddress = address?.data?.some(
    (i) => i?.is_default_address === true
  );

  let selectedAddress = address?.data?.filter((i) => i?.is_default_address);

  const handleDeleteAddress = async (address) => {
    const formData = new FormData();
    formData.append("customer_id", user);
    formData.append("address_id", address);
    try {
      const res = await newFormRequest.post(DELETE_ADDRESS, formData);
      if (res?.status === 200) {
        queryClient.invalidateQueries(["address"]);
        toast.success(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const ChangeAddress = async (address) => {
    const formData = new FormData();
    formData.append("customer_id", user);
    formData.append("address_id", address);
    formData.append("is_default_address", 1);
    try {
      const res = await newFormRequest.post(DEFAULT_ADDRESS, formData);
      if (res?.status === 200) {
        queryClient.invalidateQueries(["address"]);
        toast.success(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  let productsInCart = cartList?.cart_items?.map((i) => {
    return {
      product_id: parseInt(i?.product_id),
      price: parseFloat(i?.unit_price).toFixed(2),
      discount: parseFloat(discountAmount).toFixed(2),
      quantity: parseInt(i?.quantity),
    };
  });

  console.log("product in cart", productsInCart);

  const isWeightIdRequired =
    cartList?.total_weight > 100 &&
    cartList?.weight_form_details?.id === undefined
      ? true
      : false;

  // Function to create payment intent
  const createPaymentIntent = async () => {
    if (!user) {
      setLoginOpen(true);
      return;
    }
    if (!havingDefaultAddress) {
      toast.error("Please add a delivery address");
      return;
    }
    if (isWeightIdRequired) {
      toast.custom(
        <ToastPopup message={"Please Fill Delivery Location Details"} />,
        {
          duration: Infinity,
        }
      );
      return;
    }
    setPaymentIntentLoader(true);
    try {
      const formData = {
        customer_id: parseInt(user),
        shipping_address: `${selectedAddress?.[0]?.flat_building},${selectedAddress?.[0]?.city},${selectedAddress?.[0]?.state}`,
        sub_total: parseFloat(subtotal),
        discount_amount: parseFloat(discountAmount).toFixed(2),
        grand_total: parseFloat(totalAmount),
        product_array: productsInCart,
        weight_form_id: parseInt(weightId),
        payment_type: "online",
        tax_amount: parseInt(taxAmount),
        address_id: parseInt(selectedAddress?.[0]?.id),
      };
      const response = await newRequest.post(CONTINUE_PAYMENT, formData);
      if (response?.status === 200) {
        localStorage.removeItem("coupon");
        localStorage.setItem("py_id", response?.data?.data?.order_id);
        addClientSecret(response?.data?.data?.client_secret);
        navigate.push("/checkout");
      } else {
        setPaymentIntentLoader(false);
        toast.error("Failed to create payment intent");
      }
    } catch (error) {
      setPaymentIntentLoader(false);
      console.log(error);
      console.error("Error creating payment intent:", error);
    }
  };

  // Cash on delivery
  const cashOnDelivery = async () => {
    if (havingDefaultAddress === false) {
      toast.error("Please add a delivery address");
      return;
    }
    if (isWeightIdRequired) {
      toast.custom(
        <ToastPopup message={"Please Fill Delivery Location Details"} />,
        {
          duration: Infinity,
        }
      );
      return;
    }
    setLoader(true);
    try {
      const formData = {
        customer_id: parseInt(user),
        shipping_address: `${selectedAddress?.[0]?.flat_building},${selectedAddress?.[0]?.city},${selectedAddress?.[0]?.state}`,
        sub_total: parseFloat(subtotal),
        discount_amount: parseFloat(discountAmount).toFixed(2),
        grand_total: parseFloat(totalAmount),
        product_array: productsInCart,
        weight_form_id: parseInt(weightId),
        payment_type: "cash_on_delivery",
        tax_amount: parseInt(taxAmount),
        address_id: parseInt(selectedAddress?.[0]?.id),
      };

      console.log("formdatacod",formData);
      const response = await newRequest.post(CASH_ON_DELIVERY, formData);
      if (response?.status === 200) {
        clearCart();
        localStorage.removeItem("coupon");
        navigate("/ordercomplete");
      } else {
        setLoader(false);
        toast.error("Some error occurred");
      }
    } catch (error) {
      setLoader(false);
      console.log(error);
      console.error("Error creating payment intent:", error);
    }
  };

  const handleSaveAddress = () => {
    if (!user) {
      setLoginOpen(true);
      return;
    }
    navigate.push("/save-address");
  };

  return (
    <div className="min-h-fit h-full pb-20">
      <div className="text-sm px-4 sm:px-20 xl:px-48 breadcrumbs">
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>  
            <Link href="/cart">Cart</Link>
          </li>
          <li className="text-blue capitalize font-medium">Address</li>
        </ul>
      </div>
      <div className="relative w-full font-medium flex flex-col lg:flex-row gap-6 pt-7 px-3 justify-center bg-[#F3F5F7]">
        <div className="flex items-center pb-6 gap-2 border-b-2 border-green-600">
          <div className="w-7">
            <img src="/cart/greentick.png" alt="cart" />
          </div>
          <div className="text-green-600">Shopping cart</div>
        </div>
        <div className="flex items-center pb-6 gap-2 border-b-2 ">
          <div className="w-7">
            <img src="/cart/2active.png" alt="cart" />
          </div>
          <div className="">Checkout details</div>
        </div>
        <div className=" flex items-center pb-6 gap-2">
          <div className="w-7">
            <img src="/cart/1.3.png" alt="cart" />
          </div>
          <div className="text-[#b1b5c3]">Order complete</div>
        </div>
      </div>
      {isLoading ? (
        <div className="h-5 w-5 mx-auto my-28 animate-spin rounded-full border-b-2 border-blue"></div>
      ) : (
        <div className="px-4 mt-7 mb-7 lg:mb-20 sm:px-20 xl:px-48 lg:grid gap-10 lg:grid-cols-12">
          <div className="flex flex-col lg:col-span-7 w-full">
            {address?.data
              ?.sort((a, b) => b?.is_default_address - a?.is_default_address)
              .map((i) => (
                <React.Fragment key={i?.id}>
              <div
                className={`flex lg:p-3 py-3 items-center p-2 md:p-0 justify-between ${
                  i?.is_default_address === true
                    ? "border rounded border-black/10"
                    : ""
                }`}
              >
                <div className="flex items-start gap-2">
                  <input
                    onChange={() => ChangeAddress(i?.id)}
                    checked={i?.is_default_address === true}
                    type="radio"
                    className="w-4 h-4 mt-1.5"
                  />
                  <div className="flex flex-col gap-2">
                    <div className="text-lg capitalize font-semibold flex gap-2">
                      {i?.name}{" "}
                      <div className="badge font-semibold text-[0.7rem] uppercase badge-outline border-blue border-2 px-1.5 flex items-center justify-center h-6 rounded text-[#3AA39F]">
                        {i?.address_type}
                      </div>
                    </div>
                    <div className="text-[.85rem] max-w-[17rem] font-medium">
                      {i?.pincode}, {i?.flat_building}, {i?.address}, {i?.city}, {i?.state}, {i?.locality}, {i?.land_mark}
                    </div>
                    <div className="text-[.85rem] font-medium">
                      Contact - <span>{i?.phone}</span>
                    </div>
                  </div>
                </div>
                <div className="flex text-[0.94rem] gap-2">
                  <Link
                    href={`/cart/save-address/${i?.id}`}
                    className="font-semibold"
                  >
                    Edit
                  </Link>
                  <div className="text-gray">|</div>
                  <div
                    onClick={() => handleDeleteAddress(i?.id)}
                    className="font-semibold cursor-pointer text-red-500"
                  >
                    Remove
                  </div>
                </div>
              </div>
              <div className="flex w-full my-4 mx-auto h-[0.7px] bg-gray/70" />
            </React.Fragment>
              ))}
            <button
              onClick={handleSaveAddress}
              className="flex gap-2 pb-4 my-5 px-5 items-center font-semibold text-green-700"
            >
              <span className="text-xl">+</span> <p>Add New Address</p>
            </button>
          </div>
          <CartSummary
            subtotal={subtotal}
            totalAmount={totalAmount}
            discountAmount={discountAmount}
            taxAmount={taxAmount}
            setPopupOpen={""}
            code={code}
            setCode={setCode}
            setSelectedCoupon={setSelectedCoupon}
            selectedCoupon={selectedCoupon}
            createPaymentIntent={createPaymentIntent}
            havingDefaultAddress={havingDefaultAddress}
            cashOnDelivery={cashOnDelivery}
            type={"address"}
            paymentIntentLoader={paymentIntentLoader}
            loader={loader}
            
          />
        </div>
      )}
      {isWeightIdRequired && havingDefaultAddress ? (
        <WeightForm weightId={weightId} setWeightId={setWeightId} user={user} />
      ) : null}
    </div>
  );
}
