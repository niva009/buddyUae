'use client';

import { useQuery } from "@tanstack/react-query";
import { newRequest, LIST_CART } from "../components/api/index";
import { useEffect, useState } from "react";

const useCartList = () => {
  const [userId, setUserId] = useState(null);

  // ✅ On mount, get user_id from localStorage (if user is not in Zustand)
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
      return res.data;
    },
    enabled: !!userId, // ✅ Fetch only when user_id is available
    staleTime: 70000000000,
    cacheTime: 70000000000,
  });

  return { cartList, isLoading };
};

export default useCartList;
