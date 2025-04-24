'use client';

import { useQuery } from "@tanstack/react-query";
import { newRequest, LIST_CART } from "../components/api/index";
import { useEffect, useState } from "react";

const useCartList = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem("user_id");
    if (id) {
      setUserId(id);
    } 
  }, []);

  console.log("user id lib", userId);

  const { data: cartList, isLoading } = useQuery({
    queryKey: ["cart", userId],
    queryFn: async () => {
      console.log("Fetching cart for user_id from localStorage:", userId);
      const res = await newRequest.get(LIST_CART, {
        params: { customer_id: userId },
      });

      console.log("responseee111111111", res);
      return res.data;
    },
    enabled: !!userId, 
  });

  return { cartList, isLoading };
};

export default useCartList;